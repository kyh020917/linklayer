// ============================================
// src/components/PlatformIcon.tsx
// 플랫폼별 SVG 아이콘 컴포넌트
// ============================================

interface IconProps {
  size?: number;
  color?: string;
}

// ── 각 플랫폼 SVG 아이콘 ──────────────────────────────

export function InstagramIcon({ size = 20, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke={color} strokeWidth="1.8" fill="none"/>
      <circle cx="12" cy="12" r="5" stroke={color} strokeWidth="1.8" fill="none"/>
      <circle cx="17.5" cy="6.5" r="1.2" fill={color}/>
    </svg>
  );
}

export function YoutubeIcon({ size = 20, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="5" width="20" height="14" rx="3" stroke={color} strokeWidth="1.8" fill="none"/>
      <path d="M10 9l5 3-5 3V9z" fill={color}/>
    </svg>
  );
}

export function XIcon({ size = 20, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 4l16 16M20 4L4 20" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function TikTokIcon({ size = 20, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

export function DiscordIcon({ size = 20, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.056a19.9 19.9 0 0 0 5.993 3.03.077.077 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" fill={color}/>
      <circle cx="8.5" cy="13" r="1.5" fill="none" stroke={color} strokeWidth="1.5"/>
      <circle cx="15.5" cy="13" r="1.5" fill="none" stroke={color} strokeWidth="1.5"/>
    </svg>
  );
}

export function GithubIcon({ size = 20, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" fill={color}/>
    </svg>
  );
}

export function TwitchIcon({ size = 20, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 2L2 6v14h5v2h3l2-2h4l5-5V2H4zm15 11l-3 3h-4l-2 2v-2H6V4h13v9z" fill={color}/>
      <path d="M18 7h-2v5h2V7zM13 7h-2v5h2V7z" fill={color}/>
    </svg>
  );
}

export function SpotifyIcon({ size = 20, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.8" fill="none"/>
      <path d="M8 15.5c2.5-1 5.5-1 7.5 0M7 12c3-1.5 7-1.5 10 0M8.5 8.5c2.5-1 5.5-1 7 .5" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

export function LinkedInIcon({ size = 20, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="4" stroke={color} strokeWidth="1.8" fill="none"/>
      <path d="M7 10v7M7 7v.5" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M11 17v-4a2 2 0 0 1 4 0v4M11 10v7" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

export function NaverIcon({ size = 20, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="4" stroke={color} strokeWidth="1.8" fill="none"/>
      <path d="M7 17V7l5 7V7M14 7v10" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

export function KakaoIcon({ size = 20, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="11" rx="9" ry="7.5" stroke={color} strokeWidth="1.8" fill="none"/>
      <path d="M8 14l1.5-4h1L12 13l1.5-3h1L16 14" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

export function ThreadsIcon({ size = 20, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2C6.5 2 4 6 4 12s2.5 10 8 10c4 0 7-2.5 7-6 0-2.5-1.5-4-4-4s-4 2-4 4.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      <path d="M15 8c-1-1.5-2.5-2-4-1.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

export function MailIcon({ size = 20, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="16" rx="3" stroke={color} strokeWidth="1.8" fill="none"/>
      <path d="M2 7l10 7 10-7" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

export function PhoneIcon({ size = 20, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" stroke={color} strokeWidth="1.8" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

export function TextIcon({ size = 20, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 7V5h16v2M9 5v14M15 5v14M7 19h5M12 19h5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

export function LinkIcon({ size = 20, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M10 14a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M14 10a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

// ── 플랫폼 감지 + 아이콘 + 색상 매핑 ──────────────────────────────

export interface PlatformInfo {
  name: string;
  color: string;
  bgColor: string;
  Icon: React.ComponentType<IconProps>;
}

export function getPlatformInfo(url: string): PlatformInfo {
  const low = url.toLowerCase();

  if (low.includes('instagram.com'))  return { name: 'Instagram', color: '#e1306c', bgColor: 'rgba(225,48,108,0.12)', Icon: InstagramIcon };
  if (low.includes('youtube.com') || low.includes('youtu.be')) return { name: 'YouTube', color: '#ff4e4e', bgColor: 'rgba(255,78,78,0.12)', Icon: YoutubeIcon };
  if (low.includes('twitter.com') || low.includes('x.com'))   return { name: 'X (Twitter)', color: '#e8e8e8', bgColor: 'rgba(232,232,232,0.1)', Icon: XIcon };
  if (low.includes('tiktok.com'))    return { name: 'TikTok', color: '#69c9d0', bgColor: 'rgba(105,201,208,0.12)', Icon: TikTokIcon };
  if (low.includes('discord.gg') || low.includes('discord.com')) return { name: 'Discord', color: '#5865f2', bgColor: 'rgba(88,101,242,0.12)', Icon: DiscordIcon };
  if (low.includes('github.com'))    return { name: 'GitHub', color: '#aaa', bgColor: 'rgba(170,170,170,0.1)', Icon: GithubIcon };
  if (low.includes('twitch.tv'))     return { name: 'Twitch', color: '#9147ff', bgColor: 'rgba(145,71,255,0.12)', Icon: TwitchIcon };
  if (low.includes('spotify.com'))   return { name: 'Spotify', color: '#1db954', bgColor: 'rgba(29,185,84,0.12)', Icon: SpotifyIcon };
  if (low.includes('linkedin.com'))  return { name: 'LinkedIn', color: '#0a66c2', bgColor: 'rgba(10,102,194,0.12)', Icon: LinkedInIcon };
  if (low.includes('naver.com'))     return { name: 'Naver', color: '#03c75a', bgColor: 'rgba(3,199,90,0.12)', Icon: NaverIcon };
  if (low.includes('kakao.com') || low.includes('kakaotalk')) return { name: 'KakaoTalk', color: '#f9e000', bgColor: 'rgba(249,224,0,0.12)', Icon: KakaoIcon };
  if (low.includes('threads.net'))   return { name: 'Threads', color: '#aaa', bgColor: 'rgba(170,170,170,0.1)', Icon: ThreadsIcon };

  return { name: 'Link', color: '#888', bgColor: 'rgba(136,136,136,0.1)', Icon: LinkIcon };
}

// ── 타입별 아이콘 ──────────────────────────────
import type { ItemType } from '@/lib/types';

export function getTypeIcon(type: ItemType, url: string) {
  if (type === 'link')    return getPlatformInfo(url);
  if (type === 'email')   return { name: 'Email',   color: '#60a5fa', bgColor: 'rgba(96,165,250,0.12)',  Icon: MailIcon };
  if (type === 'phone')   return { name: 'Phone',   color: '#4ade80', bgColor: 'rgba(74,222,128,0.12)',  Icon: PhoneIcon };
  if (type === 'discord') return { name: 'Discord', color: '#5865f2', bgColor: 'rgba(88,101,242,0.12)', Icon: DiscordIcon };
  if (type === 'text')    return { name: 'Text',    color: '#a78bfa', bgColor: 'rgba(167,139,250,0.12)', Icon: TextIcon };
  return { name: 'Link', color: '#888', bgColor: 'rgba(136,136,136,0.1)', Icon: LinkIcon };
}
