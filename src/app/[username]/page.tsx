import { notFound } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import PublicProfileClient from './_components/PublicProfileClient';
import type { Metadata } from 'next';

interface Props { params: Promise<{ username: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const supabase = await createServerSupabaseClient();
  const { data: profile } = await supabase.from('profiles').select('display_name, bio').eq('username', username).single();
  if (!profile) return { title: 'Not Found' };
  return {
    title: `${profile.display_name || username} | LinkLayer`,
    description: profile.bio || `${username}의 링크 모음`,
  };
}

export default async function PublicProfilePage({ params }: Props) {
  const { username } = await params;
  const supabase = await createServerSupabaseClient();

  const { data: profile } = await supabase.from('profiles').select('*').eq('username', username).single();
  if (!profile) notFound();

  const { data: links } = await supabase
    .from('links').select('*')
    .eq('user_id', profile.id).eq('is_active', true)
    .order('sort_order', { ascending: true });

  return <PublicProfileClient profile={profile} links={links || []} />;
}
