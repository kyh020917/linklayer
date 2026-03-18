'use client';

import { useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';

type ThemeId = 'coder-dark'|'coder-light'|'gamer-dark'|'gamer-light'|'soft-dark'|'soft-light'|'minimal-dark'|'minimal-light';

const mono = "'Fira Code', monospace";

// ── 미니 링크 행 ──────────────────────────────
function MiniLink({ color, label, bg, border, textColor, leftBar }: any) {
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '5px', background: bg, border: `1px solid ${border}`, borderRadius: '4px', padding: '4px 7px', marginBottom: '3px', overflow: 'hidden' }}>
      {leftBar && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '2px', background: color }} />}
      {!leftBar && <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: color, flexShrink: 0 }} />}
      <span style={{ fontSize: '8px', color: textColor, flex: 1 }}>{label}</span>
    </div>
  );
}

// ── 각 테마 미리보기 카드 ──────────────────────────────
function ThemeCard({ id, selected, onClick }: { id: ThemeId; selected: boolean; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  const configs: Record<ThemeId, { bg: string; border: string; hoverBorder: string; accentColor: string; preview: React.ReactNode }> = {
    'coder-dark': {
      bg: '#11111a', border: '#1c1c28', hoverBorder: 'rgba(96,165,250,.4)', accentColor: '#60a5fa',
      preview: (
        <div style={{ padding: '10px', paddingTop: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginBottom: '7px', paddingBottom: '6px', borderBottom: '1px solid #1c1c28' }}>
            {['#ff5f57','#ffbd2e','#28ca41'].map((c,i) => <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: c }} />)}
            <div style={{ fontFamily: mono, fontSize: '6px', color: '#1e1e2e', background: '#0a0a12', borderRadius: '2px', padding: '1px 5px', flex: 1, marginLeft: '4px' }}>linklayer.com/me</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#0a0a12', border: '1px solid #1c1c28', borderRadius: '5px', padding: '5px', marginBottom: '6px' }}>
            <div style={{ width: '20px', height: '20px', borderRadius: '5px', background: 'linear-gradient(135deg,#1e2a4e,#2a1e4e)', border: '1px solid rgba(96,165,250,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', flexShrink: 0 }}>👨‍💻</div>
            <div>
              <div style={{ fontFamily: mono, fontSize: '7px', color: '#60a5fa' }}>devlog</div>
              <div style={{ fontFamily: mono, fontSize: '5px', color: '#1e1e2e', marginTop: '1px' }}>open to work</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '2px', marginBottom: '5px' }}>
            {[{t:'TS',bg:'#1e2a4e',c:'#60a5fa'},{t:'Rust',bg:'#2e1a0a',c:'#f97316'},{t:'Go',bg:'#0a2a1e',c:'#4ade80'}].map(x => (
              <div key={x.t} style={{ fontFamily: mono, fontSize: '5px', padding: '1px 4px', borderRadius: '2px', background: x.bg, color: x.c }}>{x.t}</div>
            ))}
          </div>
          <MiniLink color="#f97316" label="GitHub" bg="#0a0a12" border="#1c1c28" textColor="#444466" />
          <MiniLink color="#ef4444" label="YouTube" bg="#0a0a12" border="#1c1c28" textColor="#444466" />
          <MiniLink color="#60a5fa" label="Portfolio" bg="#0a0a12" border="#1c1c28" textColor="#444466" />
          <div style={{ display: 'flex', justifyContent: 'space-between', background: '#070710', borderRadius: '2px', padding: '2px 6px', marginTop: '4px' }}>
            <span style={{ fontFamily: mono, fontSize: '5px', color: '#3c6adc' }}>TS</span>
            <span style={{ fontFamily: mono, fontSize: '5px', color: '#00ff87', display: 'flex', alignItems: 'center', gap: '2px' }}>
              <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#00ff87', display: 'inline-block' }} />online
            </span>
          </div>
        </div>
      ),
    },
    'coder-light': {
      bg: '#f5f4f0', border: '#e0ddd8', hoverBorder: '#aac0e8', accentColor: '#3c6adc',
      preview: (
        <div style={{ padding: '10px', paddingTop: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginBottom: '7px', paddingBottom: '6px', borderBottom: '1px solid #e0ddd8' }}>
            {['#ff5f57','#ffbd2e','#28ca41'].map((c,i) => <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: c }} />)}
            <div style={{ fontFamily: mono, fontSize: '6px', color: '#b0aaa0', background: '#ede9e4', borderRadius: '2px', padding: '1px 5px', flex: 1, marginLeft: '4px' }}>linklayer.com/me</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#fff', border: '1px solid #e8e4de', borderRadius: '5px', padding: '5px', marginBottom: '6px' }}>
            <div style={{ width: '20px', height: '20px', borderRadius: '5px', background: 'linear-gradient(135deg,#dbeafe,#ede9fe)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', flexShrink: 0 }}>👨‍💻</div>
            <div>
              <div style={{ fontSize: '8px', fontWeight: 600, color: '#1e1e2e' }}>devlog</div>
              <div style={{ fontFamily: mono, fontSize: '5px', color: '#8888a0' }}>@devlog</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '2px', marginBottom: '5px' }}>
            {[{t:'TS',bg:'#dbeafe',c:'#1d4ed8'},{t:'Rust',bg:'#fef3c7',c:'#92400e'},{t:'Go',bg:'#d1fae5',c:'#065f46'}].map(x => (
              <div key={x.t} style={{ fontFamily: mono, fontSize: '5px', padding: '1px 4px', borderRadius: '2px', background: x.bg, color: x.c }}>{x.t}</div>
            ))}
          </div>
          <MiniLink color="#f97316" label="GitHub" bg="#fff" border="#e8e4de" textColor="#555" />
          <MiniLink color="#ef4444" label="YouTube" bg="#fff" border="#e8e4de" textColor="#555" />
          <MiniLink color="#3c6adc" label="Portfolio" bg="#fff" border="#e8e4de" textColor="#555" />
          <div style={{ display: 'flex', justifyContent: 'space-between', background: '#1e1e2e', borderRadius: '2px', padding: '2px 6px', marginTop: '4px' }}>
            <span style={{ fontFamily: mono, fontSize: '5px', color: '#3c6adc' }}>TS</span>
            <span style={{ fontFamily: mono, fontSize: '5px', color: '#00ff87' }}>● online</span>
          </div>
        </div>
      ),
    },
    'gamer-dark': {
      bg: '#05050a', border: '#141420', hoverBorder: 'rgba(0,255,135,.4)', accentColor: '#00ff87',
      preview: (
        <div style={{ padding: '10px', paddingTop: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '3px 6px', background: 'rgba(0,255,135,.04)', border: '1px solid rgba(0,255,135,.1)', borderRadius: '3px', marginBottom: '8px' }}>
            <span style={{ fontFamily: mono, fontSize: '5px', color: '#00ff87', letterSpacing: '1px' }}>LINKLAYER</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '2px', fontFamily: mono, fontSize: '6px', color: '#00ff87' }}>
              <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#00ff87', boxShadow: '0 0 3px #00ff87', display: 'inline-block' }} />ONLINE
            </span>
          </div>
          <div style={{ position: 'relative', width: '30px', height: '30px', margin: '0 auto 6px' }}>
            {[{top:'-1px',left:'-1px',bw:'1.5px 0 0 1.5px'},{top:'-1px',right:'-1px',bw:'1.5px 1.5px 0 0'},{bottom:'-1px',left:'-1px',bw:'0 0 1.5px 1.5px'},{bottom:'-1px',right:'-1px',bw:'0 1.5px 1.5px 0'}].map((p,i)=>(
              <div key={i} style={{ position:'absolute', width:'4px', height:'4px', borderColor:'#00ff87', borderStyle:'solid', borderWidth:p.bw as any, ...p as any, opacity:.5 }} />
            ))}
            <div style={{ width:'30px', height:'30px', borderRadius:'7px', background:'#0c0c14', border:'1px solid rgba(0,255,135,.2)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:mono, fontSize:'9px', color:'#00ff87', fontWeight:500 }}>XD</div>
          </div>
          <div style={{ fontSize: '7px', fontWeight: 700, color: '#d0d0d0', textAlign: 'center', marginBottom: '2px' }}>DarkBlade99</div>
          <div style={{ textAlign: 'center', marginBottom: '6px' }}>
            <span style={{ fontFamily: mono, fontSize: '5px', color: '#00ff87', background: 'rgba(0,255,135,.06)', border: '1px solid rgba(0,255,135,.18)', borderRadius: '2px', padding: '1px 5px' }}>◆ DIAMOND</span>
          </div>
          <MiniLink color="#ff4e4e" label="YouTube" bg="rgba(255,255,255,.02)" border="rgba(255,255,255,.05)" textColor="#666" leftBar />
          <MiniLink color="#9147ff" label="Twitch" bg="rgba(255,255,255,.02)" border="rgba(255,255,255,.05)" textColor="#666" leftBar />
          <MiniLink color="#5865f2" label="Discord" bg="rgba(255,255,255,.02)" border="rgba(255,255,255,.05)" textColor="#666" leftBar />
        </div>
      ),
    },
    'gamer-light': {
      bg: '#f0f9f3', border: '#bce8cc', hoverBorder: '#6ac89a', accentColor: '#007a38',
      preview: (
        <div style={{ padding: '10px', paddingTop: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '3px 6px', background: 'rgba(0,140,60,.06)', border: '1px solid rgba(0,140,60,.14)', borderRadius: '3px', marginBottom: '8px' }}>
            <span style={{ fontFamily: mono, fontSize: '5px', color: '#007a38', letterSpacing: '1px' }}>LINKLAYER</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '2px', fontFamily: mono, fontSize: '6px', color: '#007a38' }}>
              <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#007a38', display: 'inline-block' }} />ONLINE
            </span>
          </div>
          <div style={{ width: '30px', height: '30px', borderRadius: '7px', background: '#e0f2e8', border: '1px solid rgba(0,140,60,.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: mono, fontSize: '9px', color: '#007a38', fontWeight: 500, margin: '0 auto 6px' }}>XD</div>
          <div style={{ fontSize: '7px', fontWeight: 700, color: '#1a3a1a', textAlign: 'center', marginBottom: '2px' }}>DarkBlade99</div>
          <div style={{ textAlign: 'center', marginBottom: '6px' }}>
            <span style={{ fontFamily: mono, fontSize: '5px', color: '#007a38', background: 'rgba(0,140,60,.08)', border: '1px solid rgba(0,140,60,.2)', borderRadius: '2px', padding: '1px 5px' }}>◆ DIAMOND</span>
          </div>
          <MiniLink color="#ff4e4e" label="YouTube" bg="rgba(255,255,255,.8)" border="rgba(0,0,0,.07)" textColor="#2a4a2a" leftBar />
          <MiniLink color="#9147ff" label="Twitch" bg="rgba(255,255,255,.8)" border="rgba(0,0,0,.07)" textColor="#2a4a2a" leftBar />
          <MiniLink color="#5865f2" label="Discord" bg="rgba(255,255,255,.8)" border="rgba(0,0,0,.07)" textColor="#2a4a2a" leftBar />
        </div>
      ),
    },
    'soft-dark': {
      bg: '#180e14', border: '#2a1820', hoverBorder: 'rgba(220,100,140,.4)', accentColor: '#e06090',
      preview: (
        <div style={{ padding: '10px', paddingTop: '16px', textAlign: 'center' }}>
          <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg,#3e1a28,#2e1040)', border: '2px solid rgba(220,100,140,.28)', margin: '0 auto 7px', boxShadow: '0 0 10px rgba(220,100,140,.12)' }} />
          <div style={{ fontSize: '8px', color: '#e0b0c0', fontWeight: 500, marginBottom: '2px' }}>@dirinzero</div>
          <div style={{ fontSize: '6px', color: '#5a2a3a', marginBottom: '8px', lineHeight: 1.5 }}>Seoul 🇰🇷 · INFP ♡</div>
          {['✦ Private page ✦', 'contact ☆', 'Instagram', 'TikTok'].map(t => (
            <div key={t} style={{ height: '18px', borderRadius: '999px', background: 'rgba(220,100,140,.08)', border: '1px solid rgba(220,100,140,.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '3px' }}>
              <span style={{ fontSize: '7px', color: '#c05070' }}>{t}</span>
            </div>
          ))}
        </div>
      ),
    },
    'soft-light': {
      bg: 'linear-gradient(155deg,#f6f0ea,#ece3d8)', border: '#ddd4c8', hoverBorder: '#c0a898', accentColor: '#8a7060',
      preview: (
        <div style={{ padding: '10px', paddingTop: '16px', textAlign: 'center' }}>
          <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg,#e8ddd5,#d0c4ba)', border: '2.5px solid rgba(255,255,255,.9)', margin: '0 auto 7px', boxShadow: '0 3px 8px rgba(0,0,0,.08)' }} />
          <div style={{ fontSize: '8px', color: '#3a3028', fontWeight: 500, marginBottom: '2px' }}>@dirinzero</div>
          <div style={{ fontSize: '6px', color: '#9a8880', marginBottom: '8px', lineHeight: 1.5 }}>Seoul 🇰🇷 · INFP ♡</div>
          {['✦ Private page ✦', 'contact ☆', 'Instagram', 'TikTok'].map(t => (
            <div key={t} style={{ height: '18px', borderRadius: '999px', background: 'rgba(255,255,255,.72)', border: '1px solid rgba(0,0,0,.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '3px', backdropFilter: 'blur(4px)' }}>
              <span style={{ fontSize: '7px', color: '#5a4a42' }}>{t}</span>
            </div>
          ))}
        </div>
      ),
    },
    'minimal-dark': {
      bg: '#0f0f0e', border: '#1c1c1a', hoverBorder: '#3a3a38', accentColor: '#e8e8e4',
      preview: (
        <div style={{ padding: '10px', paddingTop: '16px' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#1c1c1a', border: '1px solid #2a2a28', margin: '0 auto 8px' }} />
          <div style={{ fontSize: '8px', fontWeight: 600, color: '#ddd', textAlign: 'center', marginBottom: '2px', letterSpacing: '-.2px' }}>yourname</div>
          <div style={{ fontSize: '6px', color: '#3a3a38', textAlign: 'center', marginBottom: '8px' }}>Designer · Seoul</div>
          {['Portfolio', 'Instagram', 'Newsletter', 'Shop'].map(t => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#181816', border: '1px solid #222220', borderRadius: '4px', padding: '4px 7px', marginBottom: '3px' }}>
              <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#ccc', flexShrink: 0 }} />
              <span style={{ fontSize: '7px', color: '#555' }}>{t}</span>
            </div>
          ))}
        </div>
      ),
    },
    'minimal-light': {
      bg: '#f9f9f8', border: '#e0e0dc', hoverBorder: '#c4c4c0', accentColor: '#1a1a18',
      preview: (
        <div style={{ padding: '10px', paddingTop: '16px' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#e8e8e4', margin: '0 auto 8px' }} />
          <div style={{ fontSize: '8px', fontWeight: 600, color: '#1a1a18', textAlign: 'center', marginBottom: '2px', letterSpacing: '-.2px' }}>yourname</div>
          <div style={{ fontSize: '6px', color: '#bbb', textAlign: 'center', marginBottom: '8px' }}>Designer · Seoul</div>
          {['Portfolio', 'Instagram', 'Newsletter', 'Shop'].map(t => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#fff', border: '1px solid #e4e4e0', borderRadius: '4px', padding: '4px 7px', marginBottom: '3px' }}>
              <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#1a1a18', flexShrink: 0 }} />
              <span style={{ fontSize: '7px', color: '#666' }}>{t}</span>
            </div>
          ))}
        </div>
      ),
    },
  };

  const cfg = configs[id];
  const isSelected = selected;
  const modeLabel = id.endsWith('-dark') ? 'DARK' : 'LIGHT';

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: cfg.bg,
        border: `1px solid ${isSelected ? cfg.accentColor : hovered ? cfg.hoverBorder : cfg.border}`,
        borderRadius: '10px',
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        transition: 'all .2s',
        transform: hovered && !isSelected ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: isSelected ? `0 0 0 2px ${cfg.accentColor}44` : 'none',
        padding: 0,
        textAlign: 'left',
        width: '100%',
      }}
    >
      {/* 모드 라벨 */}
      <div style={{ position: 'absolute', top: '7px', left: '7px', fontFamily: mono, fontSize: '7px', fontWeight: 600, padding: '2px 6px', borderRadius: '2px', letterSpacing: '.3px', zIndex: 10, background: isSelected ? cfg.accentColor + '22' : 'rgba(0,0,0,.3)', color: isSelected ? cfg.accentColor : '#888', border: `1px solid ${isSelected ? cfg.accentColor + '44' : 'transparent'}` }}>
        {modeLabel}
      </div>
      {/* 선택 체크 */}
      {isSelected && (
        <div style={{ position: 'absolute', top: '7px', right: '7px', width: '16px', height: '16px', borderRadius: '50%', background: cfg.accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, fontSize: '9px' }}>✓</div>
      )}
      {cfg.preview}
    </button>
  );
}

// ── 카테고리 헤더 ──────────────────────────────
function CategoryLabel({ label, accent, sub }: { label: string; accent: string; sub: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'rgba(255,255,255,.02)', borderBottom: '1px solid rgba(255,255,255,.05)', borderRadius: '8px 8px 0 0' }}>
      <span style={{ fontFamily: mono, fontSize: '10px', fontWeight: 600, color: accent, letterSpacing: '.5px' }}>{label}</span>
      <span style={{ fontSize: '10px', color: '#2a2a3a' }}>{sub}</span>
    </div>
  );
}

// ── 메인 ThemePicker ──────────────────────────────
export default function ThemePicker({ userId, currentTheme }: { userId: string; currentTheme?: string }) {
  const [selected, setSelected] = useState<ThemeId>((currentTheme as ThemeId) || 'minimal-light');
  const [saving, setSaving] = useState(false);
  const supabase = createClient();

  const handleSelect = async (id: ThemeId) => {
    setSelected(id);
    setSaving(true);
    await supabase.from('profiles').update({ theme: id }).eq('id', userId);
    setSaving(false);
  };

  const categories = [
    { label: 'CODER', accent: '#60a5fa', sub: '개발자 · 코더', ids: ['coder-dark', 'coder-light'] as ThemeId[] },
    { label: 'GAMER', accent: '#00ff87', sub: '게이머 · 스트리머', ids: ['gamer-dark', 'gamer-light'] as ThemeId[] },
    { label: 'SOFT',  accent: '#e06090', sub: '감성 · 인플루언서', ids: ['soft-dark',  'soft-light']  as ThemeId[] },
    { label: 'MINIMAL', accent: '#888', sub: '미니멀 · 모두에게', ids: ['minimal-dark','minimal-light'] as ThemeId[] },
  ];

  return (
    <div style={{ marginBottom: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <span style={{ fontFamily: mono, fontSize: '11px', color: '#00ff87', letterSpacing: '.5px' }}>// THEME</span>
        <span style={{ fontFamily: mono, fontSize: '10px', color: saving ? '#00ff87' : '#1a1a2e' }}>
          {saving ? '저장 중...' : selected}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {categories.map(cat => (
          <div key={cat.label} style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', borderRadius: '10px', overflow: 'hidden' }}>
            <CategoryLabel label={cat.label} accent={cat.accent} sub={cat.sub} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', padding: '8px' }}>
              {cat.ids.map(id => (
                <ThemeCard key={id} id={id} selected={selected === id} onClick={() => handleSelect(id)} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
