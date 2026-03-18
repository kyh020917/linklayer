'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Profile, Link, ItemType } from '@/lib/types';
import { ExternalLink, Copy } from 'lucide-react';
import { getTypeIcon } from '@/components/PlatformIcon';

interface Props { profile: Profile; links: Link[] }

// ── 클릭 핸들러 ──
function useItemAction() {
  const supabase = createClient();
  return async (link: Link) => {
    const type = (link.item_type || 'link') as ItemType;
    if (type === 'link') {
      await supabase.rpc('increment_click_count', { link_id: link.id });
      window.open(link.url, '_blank', 'noopener,noreferrer');
    } else if (type === 'email') {
      window.location.href = `mailto:${link.url}`;
    } else if (type === 'phone') {
      window.location.href = `tel:${link.url}`;
    }
  };
}

// ── 복사 버튼 래퍼 ──
function CopyItem({ value, children }: { value: string; children: React.ReactNode }) {
  const [copied, setCopied] = useState(false);
  return (
    <div onClick={() => { navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      style={{ position: 'relative', cursor: 'copy' }}>
      {children}
      {copied && (
        <div style={{ position: 'absolute', top: '-28px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,.8)', color: '#fff', fontSize: '10px', padding: '4px 10px', borderRadius: '5px', whiteSpace: 'nowrap', zIndex: 20, pointerEvents: 'none' }}>
          복사됨! ✓
        </div>
      )}
    </div>
  );
}

// ── 공통 브랜딩 ──
function Brand({ color, mono = false }: { color: string; mono?: boolean }) {
  return (
    <div style={{ textAlign: 'center', marginTop: '36px' }}>
      <a href="/" style={{ fontFamily: mono ? "'Fira Code',monospace" : 'inherit', fontSize: '10px', color, textDecoration: 'none' }}>
        link.layer
      </a>
    </div>
  );
}

// ── 아이콘 박스 공통 스타일 생성 ──
function iconBox(bg: string, border: string) {
  return {
    width: '34px', height: '34px', borderRadius: '8px',
    background: bg, border: `1px solid ${border}`,
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  } as React.CSSProperties;
}

// ════════════════════════════════════════════
// CODER DARK
// ════════════════════════════════════════════
export function CoderDark({ profile, links }: Props) {
  const handleAction = useItemAction();
  const tc = links.reduce((s, l) => s + l.click_count, 0);

  return (
    <div style={{ minHeight: '100vh', background: '#12121a', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: '60px', fontFamily: "'Space Grotesk',sans-serif" }}>
      {/* 브라우저 바 */}
      <div style={{ width: '100%', background: '#0e0e16', borderBottom: '1px solid #1e1e2e', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '6px', position: 'sticky', top: 0, zIndex: 10 }}>
        {['#ff5f57', '#ffbd2e', '#28ca41'].map((c, i) => <div key={i} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />)}
        <div style={{ flex: 1, background: '#0a0a10', border: '1px solid #1e1e2e', borderRadius: '4px', padding: '3px 10px', fontFamily: "'Fira Code',monospace", fontSize: '11px', color: '#5566aa', marginLeft: '6px' }}>
          linklayer.com/{profile.username}
        </div>
      </div>

      <div style={{ width: '100%', maxWidth: '440px', padding: '24px 20px 0' }}>
        {/* 프로필 */}
        <div style={{ background: '#0e0e16', border: '1px solid #1e1e2e', borderRadius: '12px', padding: '18px', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '12px', background: 'linear-gradient(135deg,#1e2a4e,#2a1e4e)', border: '1px solid rgba(100,180,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0, overflow: 'hidden' }}>
              {profile.avatar_url ? <img src={profile.avatar_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : '👨‍💻'}
            </div>
            <div>
              <div style={{ fontFamily: "'Fira Code',monospace", fontSize: '14px', fontWeight: 600, color: '#64b4ff' }}>{profile.display_name || profile.username}</div>
              <div style={{ fontFamily: "'Fira Code',monospace", fontSize: '11px', color: '#5566aa', marginTop: '2px' }}>@{profile.username}</div>
            </div>
          </div>
          {profile.bio && <p style={{ fontFamily: "'Fira Code',monospace", fontSize: '12px', color: '#6677aa', lineHeight: 1.7, marginBottom: '12px' }}>{profile.bio}</p>}
          <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
            {[{ t: `${links.length} items`, bg: '#0e2a1e', c: '#4ade80' }, { t: `${tc} clicks`, bg: '#1e2a4e', c: '#64b4ff' }].map(x => (
              <div key={x.t} style={{ fontFamily: "'Fira Code',monospace", fontSize: '10px', background: x.bg, color: x.c, padding: '2px 8px', borderRadius: '3px' }}>{x.t}</div>
            ))}
          </div>
        </div>

        {/* 구분선 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <div style={{ flex: 1, height: '1px', background: '#1e1e2e' }} />
          <span style={{ fontFamily: "'Fira Code',monospace", fontSize: '9px', color: '#334455', letterSpacing: '0.5px' }}>// links</span>
          <div style={{ flex: 1, height: '1px', background: '#1e1e2e' }} />
        </div>

        {/* 링크 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {links.map(link => {
            const type = (link.item_type || 'link') as ItemType;
            const info = getTypeIcon(type, link.url);
            const { Icon } = info;
            const isCopyable = type === 'discord' || type === 'text';
            const isClickable = type === 'link' || type === 'email' || type === 'phone';
            const getDomain = (url: string) => { try { return new URL(url).hostname.replace('www.', ''); } catch { return url; } };

            const content = (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#0e0e16', border: '1px solid #1e1e2e', borderRadius: '8px', padding: '11px 14px', transition: 'all .15s' }}>
                <div style={iconBox(info.bgColor, info.color + '33')}>
                  <Icon size={16} color={info.color} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "'Fira Code',monospace", fontSize: '12px', color: '#8899bb', fontWeight: 500 }}>{link.title}</div>
                  {type === 'link' && <div style={{ fontSize: '10px', color: '#445566', marginTop: '1px' }}>{getDomain(link.url)}</div>}
                  {(type === 'email' || type === 'phone') && <div style={{ fontFamily: "'Fira Code',monospace", fontSize: '10px', color: '#445566', marginTop: '1px' }}>{link.url}</div>}
                  {(type === 'discord' || type === 'text') && <div style={{ fontFamily: "'Fira Code',monospace", fontSize: '10px', color: '#556677', marginTop: '2px' }}>{link.url}</div>}
                </div>
                {isCopyable && <Copy size={13} color="#334455" style={{ flexShrink: 0 }} />}
                {type === 'link' && <ExternalLink size={12} color="#334455" style={{ flexShrink: 0 }} />}
              </div>
            );

            if (isCopyable) return <CopyItem key={link.id} value={link.url}>{content}</CopyItem>;
            if (isClickable) return (
              <button key={link.id} onClick={() => handleAction(link)} style={{ all: 'unset', display: 'block', cursor: 'pointer', width: '100%' }}
                onMouseEnter={e => { const d = (e.currentTarget as HTMLElement).querySelector('div') as HTMLDivElement; if (d) { d.style.borderColor = info.color + '44'; d.style.background = '#141424'; } }}
                onMouseLeave={e => { const d = (e.currentTarget as HTMLElement).querySelector('div') as HTMLDivElement; if (d) { d.style.borderColor = '#1e1e2e'; d.style.background = '#0e0e16'; } }}>
                {content}
              </button>
            );
            return <div key={link.id}>{content}</div>;
          })}
        </div>

        {/* 상태바 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', background: '#0a0a10', border: '1px solid #1e1e2e', borderRadius: '6px', padding: '5px 12px', marginTop: '16px' }}>
          <span style={{ fontFamily: "'Fira Code',monospace", fontSize: '9px', color: '#3c6adc' }}>TS TypeScript</span>
          <span style={{ fontFamily: "'Fira Code',monospace", fontSize: '9px', color: '#555' }}>UTF-8</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: "'Fira Code',monospace", fontSize: '9px', color: '#00ff87' }}>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#00ff87', boxShadow: '0 0 4px #00ff87', display: 'inline-block' }} />online
          </span>
        </div>
        <Brand color="#2a2a3a" mono />
      </div>
    </div>
  );
}

// ════════════════════════════════════════════
// CODER LIGHT
// ════════════════════════════════════════════
export function CoderLight({ profile, links }: Props) {
  const handleAction = useItemAction();
  const tc = links.reduce((s, l) => s + l.click_count, 0);

  return (
    <div style={{ minHeight: '100vh', background: '#f4f2ef', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: '60px', fontFamily: "'Space Grotesk',sans-serif" }}>
      <div style={{ width: '100%', background: '#ece9e4', borderBottom: '1px solid #dddad4', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '6px', position: 'sticky', top: 0, zIndex: 10 }}>
        {['#ff5f57', '#ffbd2e', '#28ca41'].map((c, i) => <div key={i} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />)}
        <div style={{ flex: 1, background: '#faf9f7', border: '1px solid #dddad4', borderRadius: '4px', padding: '3px 10px', fontFamily: "'Fira Code',monospace", fontSize: '11px', color: '#9a9890', marginLeft: '6px' }}>linklayer.com/{profile.username}</div>
      </div>
      <div style={{ width: '100%', maxWidth: '440px', padding: '24px 20px 0' }}>
        <div style={{ background: '#fff', border: '1px solid #e8e4de', borderRadius: '12px', padding: '18px', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '12px', background: 'linear-gradient(135deg,#dbeafe,#ede9fe)', border: '1px solid #e0daf8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0, overflow: 'hidden' }}>
              {profile.avatar_url ? <img src={profile.avatar_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : '👨‍💻'}
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#1e1e2e', letterSpacing: '-0.3px' }}>{profile.display_name || profile.username}</div>
              <div style={{ fontFamily: "'Fira Code',monospace", fontSize: '11px', color: '#8888a0', marginTop: '2px' }}>@{profile.username}</div>
            </div>
          </div>
          {profile.bio && <p style={{ fontSize: '13px', color: '#555', lineHeight: 1.65, marginBottom: '12px' }}>{profile.bio}</p>}
          <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
            {[{ t: `${links.length} items`, bg: '#f0fdf4', c: '#166534' }, { t: `${tc} clicks`, bg: '#eff6ff', c: '#1d4ed8' }].map(x => (
              <div key={x.t} style={{ fontFamily: "'Fira Code',monospace", fontSize: '10px', background: x.bg, color: x.c, padding: '2px 8px', borderRadius: '3px' }}>{x.t}</div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <div style={{ flex: 1, height: '1px', background: '#e8e4de' }} /><span style={{ fontFamily: "'Fira Code',monospace", fontSize: '9px', color: '#b0aaa0', letterSpacing: '0.5px' }}>links</span><div style={{ flex: 1, height: '1px', background: '#e8e4de' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {links.map(link => {
            const type = (link.item_type || 'link') as ItemType;
            const info = getTypeIcon(type, link.url);
            const { Icon } = info;
            const isCopyable = type === 'discord' || type === 'text';
            const getDomain = (url: string) => { try { return new URL(url).hostname.replace('www.', ''); } catch { return url; } };
            const content = (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#fff', border: '1px solid #e8e4de', borderRadius: '8px', padding: '11px 14px', transition: 'all .15s' }}>
                <div style={iconBox(info.bgColor, info.color + '44')}>
                  <Icon size={16} color={info.color} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#1e1e2e' }}>{link.title}</div>
                  {type === 'link' && <div style={{ fontFamily: "'Fira Code',monospace", fontSize: '10px', color: '#aaa', marginTop: '1px' }}>{getDomain(link.url)}</div>}
                  {(type === 'email' || type === 'phone') && <div style={{ fontFamily: "'Fira Code',monospace", fontSize: '10px', color: '#aaa', marginTop: '1px' }}>{link.url}</div>}
                  {(type === 'discord' || type === 'text') && <div style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>{link.url}</div>}
                </div>
                {isCopyable && <Copy size={13} color="#ccc" style={{ flexShrink: 0 }} />}
                {type === 'link' && <ExternalLink size={12} color="#ccc" style={{ flexShrink: 0 }} />}
              </div>
            );
            if (isCopyable) return <CopyItem key={link.id} value={link.url}>{content}</CopyItem>;
            if (type !== 'text') return (
              <button key={link.id} onClick={() => handleAction(link)} style={{ all: 'unset', display: 'block', cursor: 'pointer', width: '100%' }}
                onMouseEnter={e => { const d = (e.currentTarget as HTMLElement).querySelector('div') as HTMLDivElement; if (d) { d.style.borderColor = info.color + '55'; } }}
                onMouseLeave={e => { const d = (e.currentTarget as HTMLElement).querySelector('div') as HTMLDivElement; if (d) { d.style.borderColor = '#e8e4de'; } }}>
                {content}
              </button>
            );
            return <div key={link.id}>{content}</div>;
          })}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', background: '#1e1e2e', borderRadius: '6px', padding: '5px 12px', marginTop: '16px' }}>
          <span style={{ fontFamily: "'Fira Code',monospace", fontSize: '9px', color: '#3c6adc' }}>TS TypeScript</span>
          <span style={{ fontFamily: "'Fira Code',monospace", fontSize: '9px', color: '#00ff87' }}>● online</span>
        </div>
        <Brand color="#c8c4be" mono />
      </div>
    </div>
  );
}

// ════════════════════════════════════════════
// GAMER DARK
// ════════════════════════════════════════════
export function GamerDark({ profile, links }: Props) {
  const handleAction = useItemAction();
  const tc = links.reduce((s, l) => s + l.click_count, 0);
  return (
    <div style={{ minHeight: '100vh', background: '#06060a', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: '60px', fontFamily: "'Space Grotesk',sans-serif", position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse 60% 40% at 50% 0%,rgba(0,200,100,.07) 0%,transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,255,100,.012) 3px,rgba(0,255,100,.012) 4px)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', zIndex: 10, width: '100%', background: 'rgba(6,6,10,0.9)', borderBottom: '1px solid rgba(0,255,100,0.1)', padding: '13px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backdropFilter: 'blur(10px)' }}>
        <span style={{ fontFamily: "'Fira Code',monospace", fontSize: '10px', fontWeight: 700, color: '#00ff87', letterSpacing: '2px' }}>LINKLAYER</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontFamily: "'Fira Code',monospace", fontSize: '10px', color: '#00ff87', letterSpacing: '1px' }}>
          <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#00ff87', boxShadow: '0 0 5px #00ff87', display: 'inline-block' }} />ONLINE
        </span>
      </div>
      <div style={{ position: 'relative', zIndex: 5, width: '100%', maxWidth: '400px', padding: '32px 20px 0', textAlign: 'center' }}>
        <div style={{ position: 'relative', width: '80px', height: '80px', margin: '0 auto 14px' }}>
          {[{ top: 0, left: 0, bw: '2px 0 0 2px' }, { top: 0, right: 0, bw: '2px 2px 0 0' }, { bottom: 0, left: 0, bw: '0 0 2px 2px' }, { bottom: 0, right: 0, bw: '0 2px 2px 0' }].map((p, i) => (
            <div key={i} style={{ position: 'absolute', width: '10px', height: '10px', borderColor: '#00ff87', borderStyle: 'solid', borderWidth: p.bw as any, ...p as any, opacity: .6 }} />
          ))}
          <div style={{ width: '80px', height: '80px', borderRadius: '16px', background: 'linear-gradient(135deg,#0a0a10,#141420)', border: '1px solid rgba(0,255,100,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Fira Code',monospace", fontSize: '22px', fontWeight: 700, color: '#00ff87', boxShadow: '0 0 20px rgba(0,255,100,0.1)', overflow: 'hidden' }}>
            {profile.avatar_url ? <img src={profile.avatar_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : (profile.display_name || profile.username)[0].toUpperCase()}
          </div>
        </div>
        <div style={{ fontSize: '18px', fontWeight: 700, color: '#f0f0f0', letterSpacing: '0.3px', marginBottom: '4px' }}>{profile.display_name || profile.username}</div>
        <div style={{ fontFamily: "'Fira Code',monospace", fontSize: '11px', color: '#555', marginBottom: '8px' }}>linklayer.com/{profile.username}</div>
        {profile.bio && <div style={{ fontFamily: "'Fira Code',monospace", fontSize: '12px', color: '#666', lineHeight: 1.6, marginBottom: '8px' }}>{profile.bio}</div>}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'rgba(0,255,100,0.06)', border: '1px solid rgba(0,255,100,0.2)', borderRadius: '3px', padding: '3px 10px', fontFamily: "'Fira Code',monospace", fontSize: '11px', color: '#00ff87', letterSpacing: '0.5px', marginBottom: '24px' }}>◆ CREATOR</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg,transparent,rgba(0,255,100,0.15),transparent)' }} />
          <span style={{ fontFamily: "'Fira Code',monospace", fontSize: '9px', color: '#444', letterSpacing: '2px' }}>CHANNELS</span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg,rgba(0,255,100,0.15),transparent)' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', textAlign: 'left' }}>
          {links.map(link => {
            const type = (link.item_type || 'link') as ItemType;
            const info = getTypeIcon(type, link.url);
            const { Icon } = info;
            const isCopyable = type === 'discord' || type === 'text';
            const getDomain = (url: string) => { try { return new URL(url).hostname.replace('www.', ''); } catch { return url; } };
            const content = (
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '7px', padding: '12px 14px', overflow: 'hidden', transition: 'all 0.2s' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '2px', background: info.color, borderRadius: '7px 0 0 7px' }} />
                <div style={iconBox(info.bgColor, info.color + '44')}>
                  <Icon size={16} color={info.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#c8c8c8', letterSpacing: '0.2px' }}>{link.title}</div>
                  {type === 'link' && <div style={{ fontSize: '11px', color: '#555', marginTop: '1px' }}>{getDomain(link.url)}</div>}
                  {(type === 'email' || type === 'phone') && <div style={{ fontFamily: "'Fira Code',monospace", fontSize: '10px', color: '#555', marginTop: '1px' }}>{link.url}</div>}
                  {(type === 'discord' || type === 'text') && <div style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>{link.url}</div>}
                </div>
                {isCopyable && <Copy size={12} color="#444" style={{ flexShrink: 0 }} />}
              </div>
            );
            if (isCopyable) return <CopyItem key={link.id} value={link.url}>{content}</CopyItem>;
            if (type !== 'text') return (
              <button key={link.id} onClick={() => handleAction(link)} style={{ all: 'unset', display: 'block', cursor: 'pointer', width: '100%' }}
                onMouseEnter={e => { const d = (e.currentTarget as HTMLElement).querySelector('div') as HTMLDivElement; if (d) { d.style.background = 'rgba(0,255,100,0.04)'; d.style.borderColor = 'rgba(0,255,100,0.2)'; d.style.transform = 'translateX(3px)'; } }}
                onMouseLeave={e => { const d = (e.currentTarget as HTMLElement).querySelector('div') as HTMLDivElement; if (d) { d.style.background = 'rgba(255,255,255,0.025)'; d.style.borderColor = 'rgba(255,255,255,0.06)'; d.style.transform = 'translateX(0)'; } }}>
                {content}
              </button>
            );
            return <div key={link.id}>{content}</div>;
          })}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '7px', marginTop: '20px' }}>
          {[{ v: String(links.length), l: 'ITEMS' }, { v: String(tc), l: 'CLICKS' }, { v: String(links.filter(l => l.is_active).length), l: 'ACTIVE' }].map(s => (
            <div key={s.l} style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '7px', padding: '10px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Fira Code',monospace", fontSize: '15px', fontWeight: 700, color: '#00ff87' }}>{s.v}</div>
              <div style={{ fontFamily: "'Fira Code',monospace", fontSize: '9px', color: '#444', letterSpacing: '0.5px', marginTop: '2px' }}>{s.l}</div>
            </div>
          ))}
        </div>
        <Brand color="#222" mono />
      </div>
    </div>
  );
}

// ════════════════════════════════════════════
// GAMER LIGHT
// ════════════════════════════════════════════
export function GamerLight({ profile, links }: Props) {
  const handleAction = useItemAction();
  return (
    <div style={{ minHeight: '100vh', background: '#f2faf4', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: '60px', fontFamily: "'Space Grotesk',sans-serif" }}>
      <div style={{ width: '100%', background: 'rgba(242,250,244,0.95)', borderBottom: '1px solid rgba(0,140,60,0.15)', padding: '13px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 10 }}>
        <span style={{ fontFamily: "'Fira Code',monospace", fontSize: '10px', fontWeight: 700, color: '#00843c', letterSpacing: '2px' }}>LINKLAYER</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontFamily: "'Fira Code',monospace", fontSize: '10px', color: '#00843c', letterSpacing: '1px' }}><span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#00843c', display: 'inline-block' }} />ONLINE</span>
      </div>
      <div style={{ width: '100%', maxWidth: '400px', padding: '32px 20px 0', textAlign: 'center' }}>
        <div style={{ position: 'relative', width: '80px', height: '80px', margin: '0 auto 14px' }}>
          {[{ top: 0, left: 0, bw: '2px 0 0 2px' }, { top: 0, right: 0, bw: '2px 2px 0 0' }, { bottom: 0, left: 0, bw: '0 0 2px 2px' }, { bottom: 0, right: 0, bw: '0 2px 2px 0' }].map((p, i) => (
            <div key={i} style={{ position: 'absolute', width: '10px', height: '10px', borderColor: '#00843c', borderStyle: 'solid', borderWidth: p.bw as any, ...p as any, opacity: .5 }} />
          ))}
          <div style={{ width: '80px', height: '80px', borderRadius: '16px', background: '#e8f5ec', border: '1px solid rgba(0,140,60,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Fira Code',monospace", fontSize: '22px', fontWeight: 700, color: '#00843c', overflow: 'hidden' }}>
            {profile.avatar_url ? <img src={profile.avatar_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : (profile.display_name || profile.username)[0].toUpperCase()}
          </div>
        </div>
        <div style={{ fontSize: '18px', fontWeight: 700, color: '#1a3a1a', marginBottom: '4px' }}>{profile.display_name || profile.username}</div>
        <div style={{ fontFamily: "'Fira Code',monospace", fontSize: '11px', color: '#7aaf8a', marginBottom: '8px' }}>linklayer.com/{profile.username}</div>
        {profile.bio && <div style={{ fontSize: '13px', color: '#556655', lineHeight: 1.6, marginBottom: '8px' }}>{profile.bio}</div>}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'rgba(0,140,60,0.08)', border: '1px solid rgba(0,140,60,0.2)', borderRadius: '3px', padding: '3px 10px', fontFamily: "'Fira Code',monospace", fontSize: '11px', color: '#00843c', marginBottom: '24px' }}>◆ CREATOR</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(0,140,60,0.15)' }} /><span style={{ fontFamily: "'Fira Code',monospace", fontSize: '9px', color: '#9acfaa', letterSpacing: '2px' }}>CHANNELS</span><div style={{ flex: 1, height: '1px', background: 'rgba(0,140,60,0.15)' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', textAlign: 'left' }}>
          {links.map(link => {
            const type = (link.item_type || 'link') as ItemType;
            const info = getTypeIcon(type, link.url);
            const { Icon } = info;
            const isCopyable = type === 'discord' || type === 'text';
            const getDomain = (url: string) => { try { return new URL(url).hostname.replace('www.', ''); } catch { return url; } };
            const content = (
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(0,0,0,0.07)', borderRadius: '7px', padding: '12px 14px', overflow: 'hidden', transition: 'all 0.2s' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '2px', background: info.color }} />
                <div style={iconBox(info.bgColor, info.color + '55')}>
                  <Icon size={16} color={info.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#1a3a1a' }}>{link.title}</div>
                  {type !== 'text' && <div style={{ fontFamily: "'Fira Code',monospace", fontSize: '10px', color: '#7aaf8a', marginTop: '1px' }}>{type === 'link' ? getDomain(link.url) : link.url}</div>}
                  {type === 'text' && <div style={{ fontSize: '12px', color: '#556655', marginTop: '2px', lineHeight: 1.5 }}>{link.url}</div>}
                </div>
                {isCopyable && <Copy size={12} color="#9acfaa" style={{ flexShrink: 0 }} />}
              </div>
            );
            if (isCopyable) return <CopyItem key={link.id} value={link.url}>{content}</CopyItem>;
            if (type !== 'text') return (
              <button key={link.id} onClick={() => handleAction(link)} style={{ all: 'unset', display: 'block', cursor: 'pointer', width: '100%' }}
                onMouseEnter={e => { const d = (e.currentTarget as HTMLElement).querySelector('div') as HTMLDivElement; if (d) { d.style.background = '#fff'; d.style.transform = 'translateX(3px)'; } }}
                onMouseLeave={e => { const d = (e.currentTarget as HTMLElement).querySelector('div') as HTMLDivElement; if (d) { d.style.background = 'rgba(255,255,255,0.8)'; d.style.transform = 'translateX(0)'; } }}>
                {content}
              </button>
            );
            return <div key={link.id}>{content}</div>;
          })}
        </div>
        <Brand color="#9acfaa" />
      </div>
    </div>
  );
}

// ════════════════════════════════════════════
// SOFT DARK
// ════════════════════════════════════════════
export function SoftDark({ profile, links }: Props) {
  const handleAction = useItemAction();
  return (
    <div style={{ minHeight: '100vh', background: '#1a1014', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '56px 16px 60px', fontFamily: "'DM Sans',sans-serif", position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'fixed', top: '-10%', left: '20%', width: '350px', height: '350px', borderRadius: '50%', background: 'rgba(220,120,160,0.12)', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '360px', textAlign: 'center' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg,#3e1a28,#2e1040)', border: '2.5px solid rgba(220,120,160,0.3)', margin: '0 auto 14px', overflow: 'hidden', boxShadow: '0 0 24px rgba(220,120,160,0.15)' }}>
          {profile.avatar_url && <img src={profile.avatar_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
        </div>
        <div style={{ fontSize: '16px', color: '#e8c0d0', fontWeight: 500, marginBottom: '4px' }}>{profile.display_name || profile.username}</div>
        <div style={{ fontSize: '12px', color: '#8a5060', marginBottom: '6px' }}>@{profile.username}</div>
        {profile.bio && <div style={{ fontSize: '12px', color: '#8a5060', lineHeight: 1.65, marginBottom: '20px' }}>{profile.bio}</div>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '20px' }}>
          {links.map(link => {
            const type = (link.item_type || 'link') as ItemType;
            const info = getTypeIcon(type, link.url);
            const { Icon } = info;
            const isCopyable = type === 'discord' || type === 'text';
            const content = (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minHeight: '48px', borderRadius: '999px', background: 'rgba(220,120,160,0.08)', border: '1px solid rgba(220,120,160,0.2)', padding: '10px 20px', position: 'relative', transition: 'all .2s' }}>
                <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: info.bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={14} color={info.color} />
                </div>
                <span style={{ fontSize: '13px', color: '#e090b0', flex: 1, textAlign: 'left' }}>{link.title}</span>
                {(type === 'email' || type === 'phone') && <span style={{ fontSize: '11px', color: '#8a5060' }}>{link.url}</span>}
                {isCopyable && <Copy size={11} color="#8a5060" />}
              </div>
            );
            if (isCopyable) return <CopyItem key={link.id} value={link.url}>{content}</CopyItem>;
            if (type !== 'text') return <button key={link.id} onClick={() => handleAction(link)} style={{ all: 'unset', display: 'block', cursor: 'pointer', width: '100%' }}>{content}</button>;
            return <div key={link.id}>{content}</div>;
          })}
        </div>
        <Brand color="#5a2a3a" />
      </div>
    </div>
  );
}

// ════════════════════════════════════════════
// SOFT LIGHT
// ════════════════════════════════════════════
export function SoftLight({ profile, links }: Props) {
  const handleAction = useItemAction();
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg,#f7f2ed,#ede5dc)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '56px 16px 60px', fontFamily: "'DM Sans',sans-serif", position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'fixed', top: '-10%', left: '30%', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255,200,180,0.3)', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '360px', textAlign: 'center' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg,#e8ddd5,#d4c8bc)', margin: '0 auto 14px', border: '3px solid rgba(255,255,255,0.9)', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
          {profile.avatar_url && <img src={profile.avatar_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
        </div>
        <div style={{ fontSize: '16px', color: '#3d3530', fontWeight: 500, marginBottom: '4px' }}>{profile.display_name || profile.username}</div>
        <div style={{ fontSize: '12px', color: '#9a8880', marginBottom: '6px' }}>@{profile.username}</div>
        {profile.bio && <div style={{ fontSize: '12px', color: '#9a8880', lineHeight: 1.65, marginBottom: '20px' }}>{profile.bio}</div>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '20px' }}>
          {links.map(link => {
            const type = (link.item_type || 'link') as ItemType;
            const info = getTypeIcon(type, link.url);
            const { Icon } = info;
            const isCopyable = type === 'discord' || type === 'text';
            const content = (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minHeight: '48px', borderRadius: '999px', background: 'rgba(255,255,255,0.75)', border: '1px solid rgba(0,0,0,0.08)', backdropFilter: 'blur(10px)', padding: '10px 20px', position: 'relative', transition: 'all .2s' }}>
                <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: info.bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={14} color={info.color} />
                </div>
                <span style={{ fontSize: '13px', color: '#5a4a42', flex: 1, textAlign: 'left' }}>{link.title}</span>
                {(type === 'email' || type === 'phone') && <span style={{ fontSize: '11px', color: '#9a8880' }}>{link.url}</span>}
                {isCopyable && <Copy size={11} color="#c0b0a8" />}
              </div>
            );
            if (isCopyable) return <CopyItem key={link.id} value={link.url}>{content}</CopyItem>;
            if (type !== 'text') return (
              <button key={link.id} onClick={() => handleAction(link)} style={{ all: 'unset', display: 'block', cursor: 'pointer', width: '100%' }}
                onMouseEnter={e => { const d = (e.currentTarget as HTMLElement).querySelector('div') as HTMLDivElement; if (d) { d.style.background = 'rgba(255,255,255,0.95)'; d.style.transform = 'translateY(-1px)'; } }}
                onMouseLeave={e => { const d = (e.currentTarget as HTMLElement).querySelector('div') as HTMLDivElement; if (d) { d.style.background = 'rgba(255,255,255,0.75)'; d.style.transform = 'translateY(0)'; } }}>
                {content}
              </button>
            );
            return <div key={link.id}>{content}</div>;
          })}
        </div>
        <Brand color="rgba(0,0,0,0.2)" />
      </div>
    </div>
  );
}

// ════════════════════════════════════════════
// MINIMAL DARK
// ════════════════════════════════════════════
export function MinimalDark({ profile, links }: Props) {
  const handleAction = useItemAction();
  return (
    <div style={{ minHeight: '100vh', background: '#111110', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 16px', fontFamily: "'Inter',sans-serif" }}>
      <div style={{ width: '100%', maxWidth: '360px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: '#1e1e1c', border: '1px solid #2e2e2c', margin: '0 auto 14px', overflow: 'hidden' }}>
            {profile.avatar_url && <img src={profile.avatar_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
          </div>
          <div style={{ fontSize: '16px', fontWeight: 600, color: '#e8e8e4', letterSpacing: '-0.3px', marginBottom: '4px' }}>{profile.display_name || profile.username}</div>
          {profile.bio && <div style={{ fontSize: '13px', color: '#666', lineHeight: 1.6 }}>{profile.bio}</div>}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
          {links.map(link => {
            const type = (link.item_type || 'link') as ItemType;
            const info = getTypeIcon(type, link.url);
            const { Icon } = info;
            const isCopyable = type === 'discord' || type === 'text';
            const content = (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#1a1a18', border: '1px solid #2a2a26', borderRadius: '9px', padding: '13px 15px', transition: 'all 0.15s' }}>
                <div style={iconBox(info.bgColor, info.color + '44')}>
                  <Icon size={15} color={info.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', color: '#aaa' }}>{link.title}</div>
                  {(type === 'email' || type === 'phone' || type === 'discord') && <div style={{ fontSize: '11px', color: '#555', marginTop: '1px' }}>{link.url}</div>}
                  {type === 'text' && <div style={{ fontSize: '12px', color: '#666', marginTop: '2px', lineHeight: 1.5 }}>{link.url}</div>}
                </div>
                {isCopyable ? <Copy size={13} color="#444" /> : type === 'link' && <ExternalLink size={13} color="#333" />}
              </div>
            );
            if (isCopyable) return <CopyItem key={link.id} value={link.url}>{content}</CopyItem>;
            if (type !== 'text') return (
              <button key={link.id} onClick={() => handleAction(link)} style={{ all: 'unset', display: 'block', cursor: 'pointer', width: '100%' }}
                onMouseEnter={e => { const d = (e.currentTarget as HTMLElement).querySelector('div') as HTMLDivElement; if (d) { d.style.borderColor = '#3a3a38'; d.style.transform = 'translateY(-1px)'; } }}
                onMouseLeave={e => { const d = (e.currentTarget as HTMLElement).querySelector('div') as HTMLDivElement; if (d) { d.style.borderColor = '#2a2a26'; d.style.transform = 'translateY(0)'; } }}>
                {content}
              </button>
            );
            return <div key={link.id}>{content}</div>;
          })}
        </div>
        <Brand color="#2a2a28" />
      </div>
    </div>
  );
}

// ════════════════════════════════════════════
// MINIMAL LIGHT
// ════════════════════════════════════════════
export function MinimalLight({ profile, links }: Props) {
  const handleAction = useItemAction();
  return (
    <div style={{ minHeight: '100vh', background: '#fafaf9', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 16px', fontFamily: "'Inter',sans-serif" }}>
      <div style={{ width: '100%', maxWidth: '360px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: '#eaeae6', margin: '0 auto 14px', overflow: 'hidden' }}>
            {profile.avatar_url && <img src={profile.avatar_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
          </div>
          <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a18', letterSpacing: '-0.3px', marginBottom: '4px' }}>{profile.display_name || profile.username}</div>
          {profile.bio && <div style={{ fontSize: '13px', color: '#999', lineHeight: 1.6 }}>{profile.bio}</div>}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
          {links.map(link => {
            const type = (link.item_type || 'link') as ItemType;
            const info = getTypeIcon(type, link.url);
            const { Icon } = info;
            const isCopyable = type === 'discord' || type === 'text';
            const content = (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#fff', border: '1px solid #e8e8e4', borderRadius: '9px', padding: '13px 15px', transition: 'all 0.15s' }}>
                <div style={iconBox(info.bgColor, info.color + '44')}>
                  <Icon size={15} color={info.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', color: '#3a3a38' }}>{link.title}</div>
                  {(type === 'email' || type === 'phone' || type === 'discord') && <div style={{ fontSize: '11px', color: '#bbb', marginTop: '1px' }}>{link.url}</div>}
                  {type === 'text' && <div style={{ fontSize: '12px', color: '#888', marginTop: '2px', lineHeight: 1.5 }}>{link.url}</div>}
                </div>
                {isCopyable ? <Copy size={13} color="#ccc" /> : type === 'link' && <ExternalLink size={13} color="#ccc" />}
              </div>
            );
            if (isCopyable) return <CopyItem key={link.id} value={link.url}>{content}</CopyItem>;
            if (type !== 'text') return (
              <button key={link.id} onClick={() => handleAction(link)} style={{ all: 'unset', display: 'block', cursor: 'pointer', width: '100%' }}
                onMouseEnter={e => { const d = (e.currentTarget as HTMLElement).querySelector('div') as HTMLDivElement; if (d) { d.style.borderColor = '#d0d0cc'; d.style.transform = 'translateY(-1px)'; } }}
                onMouseLeave={e => { const d = (e.currentTarget as HTMLElement).querySelector('div') as HTMLDivElement; if (d) { d.style.borderColor = '#e8e8e4'; d.style.transform = 'translateY(0)'; } }}>
                {content}
              </button>
            );
            return <div key={link.id}>{content}</div>;
          })}
        </div>
        <Brand color="#d0d0cc" />
      </div>
    </div>
  );
}
