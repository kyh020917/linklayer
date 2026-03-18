import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import DashboardClient from './_components/DashboardClient';

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles').select('*').eq('id', user.id).single();

  const { data: links } = await supabase
    .from('links').select('*').eq('user_id', user.id)
    .order('sort_order', { ascending: true });

  return <DashboardClient profile={profile} links={links || []} />;
}
