'use client';

import type { Profile, Link } from '@/lib/types';
import { CoderDark, CoderLight, GamerDark, GamerLight, SoftDark, SoftLight, MinimalDark, MinimalLight } from './themes';

interface Props { profile: Profile; links: Link[] }

export default function PublicProfileClient({ profile, links }: Props) {
  const theme = (profile.theme as string) || 'minimal-light';
  switch (theme) {
    case 'coder-dark':    return <CoderDark    profile={profile} links={links} />;
    case 'coder-light':   return <CoderLight   profile={profile} links={links} />;
    case 'gamer-dark':    return <GamerDark    profile={profile} links={links} />;
    case 'gamer-light':   return <GamerLight   profile={profile} links={links} />;
    case 'soft-dark':     return <SoftDark     profile={profile} links={links} />;
    case 'soft-light':    return <SoftLight    profile={profile} links={links} />;
    case 'minimal-dark':  return <MinimalDark  profile={profile} links={links} />;
    default:              return <MinimalLight profile={profile} links={links} />;
  }
}
