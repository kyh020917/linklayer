'use client';

import Link from 'next/link';
import { Outfit, Fira_Code } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap' });
const firaCode = Fira_Code({ subsets: ['latin'], variable: '--font-fira', display: 'swap', weight: ['400', '500'] });

export default function LandingPage() {
  const mono = "var(--font-fira), 'Fira Code', monospace";
  const sans = "var(--font-outfit), 'Outfit', sans-serif";
  const G = '#00ff87';

  return (
    <div className={`${outfit.variable} ${firaCode.variable}`}
      style={{ background: '#07070d', minHeight: '100vh', fontFamily: sans, color: '#e8e8ee' }}>

      {/* NAV */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 48px', borderBottom: '1px solid rgba(255,255,255,.06)', position: 'sticky', top: 0, background: 'rgba(7,7,13,.97)', backdropFilter: 'blur(12px)', zIndex: 100 }}>
        <span style={{ fontFamily: mono, fontSize: '16px', fontWeight: 500, letterSpacing: '-.3px' }}>
          link<span style={{ color: G }}>.</span>layer
        </span>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {/* ✅ #3a3a5a → #888 */}
          <Link href="/login" style={{ fontSize: '13px', color: '#888', padding: '7px 16px', borderRadius: '7px' }}>login</Link>
          <Link href="/signup" style={{ fontSize: '13px', fontWeight: 700, background: G, color: '#07070d', padding: '8px 20px', borderRadius: '8px', letterSpacing: '-.2px' }}>
            시작하기 →
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ maxWidth: '820px', margin: '0 auto', padding: '96px 48px 72px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: mono, fontSize: '11px', color: G, background: 'rgba(0,255,135,.06)', border: '1px solid rgba(0,255,135,.14)', padding: '5px 14px', borderRadius: '4px', marginBottom: '28px', letterSpacing: '.3px' }}>
          <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: G, display: 'inline-block' }} />
          8가지 테마 · 다크 & 라이트 버전
        </div>
        <h1 style={{ fontSize: 'clamp(40px,5.5vw,68px)', fontWeight: 800, lineHeight: 1.06, letterSpacing: '-2.5px', color: '#f0f0f4', marginBottom: '20px' }}>
          {/* ✅ #1a1a2e → #666 */}
          <span style={{ color: '#666' }}>모든 링크를</span> 한 곳에,<br />
          <span style={{ background: 'linear-gradient(90deg,#00ff87,#00cfff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>나답게.</span>
        </h1>
        {/* ✅ #4a4a6a → #8888aa */}
        <p style={{ fontSize: '17px', fontWeight: 300, color: '#8888aa', lineHeight: 1.75, maxWidth: '500px', margin: '0 auto 44px' }}>
          코더든, 게이머든, 감성러든 —<br />
          {/* ✅ #6a6a9a → #9a9acc */}
          <span style={{ color: '#9a9acc', fontFamily: mono, fontSize: '14px' }}>linklayer.com/내이름</span> 하나로 전부 연결하세요.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <Link href="/signup" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: G, color: '#07070d', fontWeight: 700, fontSize: '15px', padding: '13px 28px', borderRadius: '9px', letterSpacing: '-.2px' }}>
            내 페이지 만들기 →
          </Link>
          {/* ✅ #2a2a4a → #888 */}
          <Link href="/login" style={{ display: 'inline-flex', alignItems: 'center', color: '#888', fontSize: '14px', fontWeight: 500, padding: '13px 22px', borderRadius: '9px', border: '1px solid rgba(255,255,255,.12)' }}>
            데모 보기
          </Link>
        </div>
      </div>

      {/* 테마 그리드 */}
      <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 40px 100px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '28px', paddingBottom: '18px', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
          <div>
            <div style={{ fontFamily: mono, fontSize: '11px', color: G, letterSpacing: '.5px', marginBottom: '7px' }}>// CHOOSE YOUR THEME</div>
            <div style={{ fontSize: '24px', fontWeight: 700, letterSpacing: '-1px', color: '#f0f0f4' }}>4가지 테마 × 2가지 모드</div>
          </div>
          {/* ✅ #111128 → #666 */}
          <div style={{ fontFamily: mono, fontSize: '11px', color: '#666' }}>가입 후 언제든 변경 가능</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <CategoryBox accent="#60a5fa" label="CODER" sub="개발자 · 코더">
            <CoderDarkCard mono={mono} />
            <CoderLightCard mono={mono} />
          </CategoryBox>
          <CategoryBox accent="#00ff87" label="GAMER" sub="게이머 · 스트리머">
            <GamerDarkCard mono={mono} />
            <GamerLightCard mono={mono} />
          </CategoryBox>
          <CategoryBox accent="#e06090" label="SOFT" sub="감성 · 인플루언서">
            <SoftDarkCard />
            <SoftLightCard />
          </CategoryBox>
          <CategoryBox accent="#888" label="MINIMAL" sub="미니멀 · 모두에게">
            <MinimalDarkCard />
            <MinimalLightCard />
          </CategoryBox>
        </div>
      </div>

      {/* FEATURES */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,.07)', borderBottom: '1px solid rgba(255,255,255,.07)', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: 'rgba(255,255,255,.06)' }}>
        {[
          { n: '01 // THEMES',    h: '8가지 테마',   d: '다크/라이트 각 4종. 클릭 하나로 언제든 바꿔요.' },
          { n: '02 // ANALYTICS', h: '클릭 분석',     d: '어떤 링크가 얼마나 클릭됐는지 실시간 확인.' },
          { n: '03 // URL',       h: '커스텀 슬러그', d: 'linklayer.com/내이름 — 지금 선점하세요.' },
        ].map(f => (
          <div key={f.n} style={{ background: '#07070d', padding: '28px 32px' }}>
            <div style={{ fontFamily: mono, fontSize: '10px', color: G, marginBottom: '10px', letterSpacing: '.5px' }}>{f.n}</div>
            <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#ccc', marginBottom: '6px', letterSpacing: '-.3px' }}>{f.h}</h3>
            {/* ✅ #222238 → #666 */}
            <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.7, fontWeight: 300 }}>{f.d}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '64px 40px 80px' }}>
        <div style={{ background: 'linear-gradient(135deg,#0c0c16,#0a0a12)', border: '1px solid rgba(255,255,255,.09)', borderRadius: '14px', padding: '40px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 700, letterSpacing: '-1px', color: '#f0f0f4', marginBottom: '8px' }}>
              지금 바로{' '}
              <span style={{ background: 'linear-gradient(90deg,#00ff87,#00cfff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>슬러그 선점</span>
              하세요
            </div>
            {/* ✅ #2a2a4a → #888 */}
            <div style={{ fontSize: '14px', color: '#888', lineHeight: 1.7, fontWeight: 300 }}>인기 username은 금방 없어집니다. 지금 무료로 잡아두세요.</div>
            {/* ✅ #1a1a2e → #666 */}
            <div style={{ fontFamily: mono, fontSize: '12px', color: '#666', marginTop: '10px' }}>
              linklayer.com/<span style={{ color: '#6688ff' }}>yourname</span>
            </div>
          </div>
          <Link href="/signup" style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: '8px', background: G, color: '#07070d', fontWeight: 700, fontSize: '15px', padding: '14px 30px', borderRadius: '9px', whiteSpace: 'nowrap' }}>
            무료 시작 →
          </Link>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,.06)', padding: '18px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: mono, fontSize: '13px', color: '#555' }}>
          link<span style={{ color: G }}>.</span>layer
        </span>
        {/* ✅ #0a0a14 → #444 */}
        <span style={{ fontFamily: mono, fontSize: '11px', color: '#444' }}>© 2025 // built for creators</span>
      </footer>
    </div>
  );
}

// ── 카테고리 박스 ──
function CategoryBox({ accent, label, sub, children }: { accent: string; label: string; sub: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#0c0c14', border: '1px solid rgba(255,255,255,.07)', borderRadius: '14px', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 18px', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
        <span style={{ fontFamily: "'Fira Code', monospace", fontSize: '11px', fontWeight: 500, color: accent, letterSpacing: '.5px' }}>{label}</span>
        {/* ✅ #1e1e2e → #666 */}
        <span style={{ fontSize: '11px', color: '#666' }}>{sub}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', padding: '10px' }}>
        {children}
      </div>
    </div>
  );
}

// ── 카드 래퍼 ──
function Card({ bg, border, hoverBorder, hoverShadow, modeLabel, modeLabelStyle, children }: any) {
  return (
    <div style={{ background: bg, border: `1px solid ${border}`, borderRadius: '10px', overflow: 'hidden', position: 'relative', cursor: 'pointer', transition: 'transform .2s, box-shadow .2s' }}
      onMouseEnter={e => { const d = e.currentTarget as HTMLDivElement; d.style.transform = 'translateY(-4px)'; d.style.borderColor = hoverBorder; d.style.boxShadow = hoverShadow; }}
      onMouseLeave={e => { const d = e.currentTarget as HTMLDivElement; d.style.transform = 'translateY(0)'; d.style.borderColor = border; d.style.boxShadow = 'none'; }}>
      <div style={{ position: 'absolute', top: '8px', left: '8px', fontFamily: "'Fira Code', monospace", fontSize: '8px', fontWeight: 500, padding: '2px 7px', borderRadius: '2px', letterSpacing: '.3px', zIndex: 10, ...modeLabelStyle }}>{modeLabel}</div>
      <div style={{ padding: '12px', paddingTop: '28px' }}>{children}</div>
    </div>
  );
}

function LkRow({ color, label, count, bg, border, textColor, countColor }: any) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', background: bg, border: `1px solid ${border}`, borderRadius: '4px', padding: '4px 7px', marginBottom: '3px' }}>
      <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: color, flexShrink: 0 }} />
      <span style={{ fontSize: '8px', color: textColor, flex: 1 }}>{label}</span>
      <span style={{ fontFamily: "'Fira Code', monospace", fontSize: '7px', color: countColor }}>{count}</span>
    </div>
  );
}

function CoderDarkCard({ mono }: { mono: string }) {
  return (
    <Card bg="#11111a" border="#1c1c28" hoverBorder="rgba(96,165,250,.3)" hoverShadow="0 8px 28px rgba(96,165,250,.07)"
      modeLabel="DARK" modeLabelStyle={{ background: 'rgba(96,165,250,.1)', color: '#60a5fa', border: '1px solid rgba(96,165,250,.2)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginBottom: '7px', paddingBottom: '6px', borderBottom: '1px solid #1c1c28' }}>
        {['#ff5f57','#ffbd2e','#28ca41'].map((c,i) => <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: c }} />)}
        <div style={{ fontFamily: mono, fontSize: '6px', color: '#556', background: '#0a0a12', borderRadius: '2px', padding: '1px 5px', flex: 1, marginLeft: '4px' }}>linklayer.com/me</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#0a0a12', border: '1px solid #1c1c28', borderRadius: '5px', padding: '5px', marginBottom: '6px' }}>
        <div style={{ width: '20px', height: '20px', borderRadius: '5px', background: 'linear-gradient(135deg,#1e2a4e,#2a1e4e)', border: '1px solid rgba(96,165,250,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', flexShrink: 0 }}>👨‍💻</div>
        <div>
          <div style={{ fontFamily: mono, fontSize: '7px', color: '#60a5fa' }}>devlog</div>
          <div style={{ fontFamily: mono, fontSize: '5px', color: '#556', marginTop: '1px' }}>open to work</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '2px', marginBottom: '5px' }}>
        {[{t:'TS',bg:'#1e2a4e',c:'#60a5fa'},{t:'Rust',bg:'#2e1a0a',c:'#f97316'},{t:'Go',bg:'#0a2a1e',c:'#4ade80'}].map(x => (
          <div key={x.t} style={{ fontFamily: mono, fontSize: '6px', padding: '1px 4px', borderRadius: '2px', background: x.bg, color: x.c }}>{x.t}</div>
        ))}
      </div>
      <LkRow color="#f97316" label="GitHub" count="★1.2k" bg="#0a0a12" border="#1c1c28" textColor="#7788aa" countColor="#556" />
      <LkRow color="#ef4444" label="YouTube" count="↑840" bg="#0a0a12" border="#1c1c28" textColor="#7788aa" countColor="#556" />
      <LkRow color="#60a5fa" label="Portfolio" count="↑320" bg="#0a0a12" border="#1c1c28" textColor="#7788aa" countColor="#556" />
      <div style={{ display: 'flex', justifyContent: 'space-between', background: '#070710', borderRadius: '2px', padding: '2px 6px', marginTop: '4px' }}>
        <span style={{ fontFamily: mono, fontSize: '5px', color: '#3c6adc' }}>TS</span>
        <span style={{ fontFamily: mono, fontSize: '5px', color: '#00ff87', display: 'flex', alignItems: 'center', gap: '2px' }}>
          <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#00ff87', display: 'inline-block' }} />online
        </span>
      </div>
    </Card>
  );
}

function CoderLightCard({ mono }: { mono: string }) {
  return (
    <Card bg="#f5f4f0" border="#e0ddd8" hoverBorder="#aac0e8" hoverShadow="0 8px 28px rgba(60,100,220,.1)"
      modeLabel="LIGHT" modeLabelStyle={{ background: 'rgba(60,100,220,.08)', color: '#3c6adc', border: '1px solid rgba(60,100,220,.2)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginBottom: '7px', paddingBottom: '6px', borderBottom: '1px solid #e0ddd8' }}>
        {['#ff5f57','#ffbd2e','#28ca41'].map((c,i) => <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: c }} />)}
        <div style={{ fontFamily: mono, fontSize: '6px', color: '#888', background: '#ede9e4', borderRadius: '2px', padding: '1px 5px', flex: 1, marginLeft: '4px' }}>linklayer.com/me</div>
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
          <div key={x.t} style={{ fontFamily: mono, fontSize: '6px', padding: '1px 4px', borderRadius: '2px', background: x.bg, color: x.c }}>{x.t}</div>
        ))}
      </div>
      <LkRow color="#f97316" label="GitHub" count="★1.2k" bg="#fff" border="#e8e4de" textColor="#555" countColor="#aaa" />
      <LkRow color="#ef4444" label="YouTube" count="↑840" bg="#fff" border="#e8e4de" textColor="#555" countColor="#aaa" />
      <LkRow color="#3c6adc" label="Portfolio" count="↑320" bg="#fff" border="#e8e4de" textColor="#555" countColor="#aaa" />
      <div style={{ display: 'flex', justifyContent: 'space-between', background: '#1e1e2e', borderRadius: '2px', padding: '2px 6px', marginTop: '4px' }}>
        <span style={{ fontFamily: mono, fontSize: '5px', color: '#3c6adc' }}>TS</span>
        <span style={{ fontFamily: mono, fontSize: '5px', color: '#00ff87' }}>● online</span>
      </div>
    </Card>
  );
}

function GamerDarkCard({ mono }: { mono: string }) {
  const links = [{c:'#ff4e4e',ic:'▶',l:'YouTube',v:'2.1k↑'},{c:'#9147ff',ic:'◉',l:'Twitch',v:'890↑'},{c:'#5865f2',ic:'◈',l:'Discord',v:'430↑'}];
  return (
    <Card bg="#05050a" border="#141420" hoverBorder="rgba(0,255,135,.3)" hoverShadow="0 8px 28px rgba(0,255,135,.06)"
      modeLabel="DARK" modeLabelStyle={{ background: 'rgba(0,255,135,.07)', color: '#00ff87', border: '1px solid rgba(0,255,135,.18)' }}>
      <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',padding:'3px 6px',background:'rgba(0,255,135,.04)',border:'1px solid rgba(0,255,135,.1)',borderRadius:'3px',marginBottom:'8px' }}>
        <span style={{ fontFamily:mono,fontSize:'5px',color:'#00ff87',letterSpacing:'1px' }}>LINKLAYER</span>
        <span style={{ display:'flex',alignItems:'center',gap:'2px',fontFamily:mono,fontSize:'6px',color:'#00ff87' }}>
          <span style={{ width:'3px',height:'3px',borderRadius:'50%',background:'#00ff87',boxShadow:'0 0 3px #00ff87',display:'inline-block' }}/>ONLINE
        </span>
      </div>
      <div style={{ position:'relative',width:'30px',height:'30px',margin:'0 auto 6px' }}>
        {[{top:'-1px',left:'-1px',bw:'1.5px 0 0 1.5px'},{top:'-1px',right:'-1px',bw:'1.5px 1.5px 0 0'},{bottom:'-1px',left:'-1px',bw:'0 0 1.5px 1.5px'},{bottom:'-1px',right:'-1px',bw:'0 1.5px 1.5px 0'}].map((p,i)=>(
          <div key={i} style={{ position:'absolute',width:'4px',height:'4px',borderColor:'#00ff87',borderStyle:'solid',borderWidth:p.bw as any,...p as any,opacity:.5 }} />
        ))}
        <div style={{ width:'30px',height:'30px',borderRadius:'7px',background:'#0c0c14',border:'1px solid rgba(0,255,135,.2)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:mono,fontSize:'9px',color:'#00ff87',fontWeight:500 }}>XD</div>
      </div>
      <div style={{ fontSize:'7px',fontWeight:700,color:'#d0d0d0',textAlign:'center',marginBottom:'2px' }}>DarkBlade99</div>
      <div style={{ textAlign:'center',marginBottom:'6px' }}>
        <span style={{ fontFamily:mono,fontSize:'5px',color:'#00ff87',background:'rgba(0,255,135,.06)',border:'1px solid rgba(0,255,135,.18)',borderRadius:'2px',padding:'1px 5px' }}>◆ DIAMOND</span>
      </div>
      {links.map(l => (
        <div key={l.l} style={{ position:'relative',display:'flex',alignItems:'center',gap:'5px',background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.07)',borderRadius:'4px',padding:'4px 7px',marginBottom:'3px',overflow:'hidden' }}>
          <div style={{ position:'absolute',left:0,top:0,bottom:0,width:'2px',background:l.c }} />
          <div style={{ width:'12px',height:'12px',borderRadius:'3px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'7px',color:l.c,flexShrink:0 }}>{l.ic}</div>
          <span style={{ fontSize:'8px',color:'#888',flex:1 }}>{l.l}</span>
          {/* ✅ #1a1a1a → #555 */}
          <span style={{ fontFamily:mono,fontSize:'7px',color:'#555' }}>{l.v}</span>
        </div>
      ))}
    </Card>
  );
}

function GamerLightCard({ mono }: { mono: string }) {
  const links = [{c:'#ff4e4e',ic:'▶',l:'YouTube'},{c:'#9147ff',ic:'◉',l:'Twitch'},{c:'#5865f2',ic:'◈',l:'Discord'}];
  return (
    <Card bg="#f0f9f3" border="#bce8cc" hoverBorder="#6ac89a" hoverShadow="0 8px 28px rgba(0,140,60,.1)"
      modeLabel="LIGHT" modeLabelStyle={{ background: 'rgba(0,140,60,.07)', color: '#007a38', border: '1px solid rgba(0,140,60,.18)' }}>
      <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',padding:'3px 6px',background:'rgba(0,140,60,.06)',border:'1px solid rgba(0,140,60,.14)',borderRadius:'3px',marginBottom:'8px' }}>
        <span style={{ fontFamily:mono,fontSize:'5px',color:'#007a38',letterSpacing:'1px' }}>LINKLAYER</span>
        <span style={{ display:'flex',alignItems:'center',gap:'2px',fontFamily:mono,fontSize:'6px',color:'#007a38' }}><span style={{ width:'3px',height:'3px',borderRadius:'50%',background:'#007a38',display:'inline-block' }}/>ONLINE</span>
      </div>
      <div style={{ width:'30px',height:'30px',borderRadius:'7px',background:'#e0f2e8',border:'1px solid rgba(0,140,60,.22)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:mono,fontSize:'9px',color:'#007a38',fontWeight:500,margin:'0 auto 6px' }}>XD</div>
      <div style={{ fontSize:'7px',fontWeight:700,color:'#1a3a1a',textAlign:'center',marginBottom:'2px' }}>DarkBlade99</div>
      <div style={{ textAlign:'center',marginBottom:'6px' }}>
        <span style={{ fontFamily:mono,fontSize:'5px',color:'#007a38',background:'rgba(0,140,60,.08)',border:'1px solid rgba(0,140,60,.2)',borderRadius:'2px',padding:'1px 5px' }}>◆ DIAMOND</span>
      </div>
      {links.map(l => (
        <div key={l.l} style={{ position:'relative',display:'flex',alignItems:'center',gap:'5px',background:'rgba(255,255,255,.8)',border:'1px solid rgba(0,0,0,.07)',borderRadius:'4px',padding:'4px 7px',marginBottom:'3px',overflow:'hidden' }}>
          <div style={{ position:'absolute',left:0,top:0,bottom:0,width:'2px',background:l.c }} />
          <div style={{ width:'12px',height:'12px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'7px',color:l.c,flexShrink:0 }}>{l.ic}</div>
          <span style={{ fontSize:'8px',color:'#2a4a2a',flex:1 }}>{l.l}</span>
        </div>
      ))}
    </Card>
  );
}

function SoftDarkCard() {
  return (
    <Card bg="#180e14" border="#2a1820" hoverBorder="rgba(220,100,140,.3)" hoverShadow="0 8px 28px rgba(220,100,140,.07)"
      modeLabel="DARK" modeLabelStyle={{ background: 'rgba(220,100,140,.08)', color: '#e06090', border: '1px solid rgba(220,100,140,.2)' }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ width:'34px',height:'34px',borderRadius:'50%',background:'linear-gradient(135deg,#3e1a28,#2e1040)',border:'2px solid rgba(220,100,140,.28)',margin:'0 auto 7px',boxShadow:'0 0 10px rgba(220,100,140,.12)' }} />
        <div style={{ fontSize:'8px',color:'#e0b0c0',fontWeight:500,marginBottom:'2px' }}>@dirinzero</div>
        {/* ✅ #5a2a3a → #a06070 */}
        <div style={{ fontSize:'6px',color:'#a06070',marginBottom:'8px',lineHeight:1.5 }}>Seoul 🇰🇷 · INFP ♡</div>
        {['✦ Private page ✦','contact ☆','Instagram','TikTok'].map(t => (
          <div key={t} style={{ height:'18px',borderRadius:'999px',background:'rgba(220,100,140,.1)',border:'1px solid rgba(220,100,140,.2)',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'3px' }}>
            <span style={{ fontSize:'7px',color:'#e080a0' }}>{t}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function SoftLightCard() {
  return (
    <Card bg="linear-gradient(155deg,#f6f0ea,#ece3d8)" border="#ddd4c8" hoverBorder="#c0a898" hoverShadow="0 8px 28px rgba(100,60,30,.1)"
      modeLabel="LIGHT" modeLabelStyle={{ background: 'rgba(0,0,0,.05)', color: '#8a7060', border: '1px solid rgba(0,0,0,.09)' }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ width:'34px',height:'34px',borderRadius:'50%',background:'linear-gradient(135deg,#e8ddd5,#d0c4ba)',border:'2.5px solid rgba(255,255,255,.9)',margin:'0 auto 7px',boxShadow:'0 3px 8px rgba(0,0,0,.08)' }} />
        <div style={{ fontSize:'8px',color:'#3a3028',fontWeight:500,marginBottom:'2px' }}>@dirinzero</div>
        <div style={{ fontSize:'6px',color:'#9a8880',marginBottom:'8px',lineHeight:1.5 }}>Seoul 🇰🇷 · INFP ♡</div>
        {['✦ Private page ✦','contact ☆','Instagram','TikTok'].map(t => (
          <div key={t} style={{ height:'18px',borderRadius:'999px',background:'rgba(255,255,255,.72)',border:'1px solid rgba(0,0,0,.07)',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'3px',backdropFilter:'blur(4px)' }}>
            <span style={{ fontSize:'7px',color:'#5a4a42' }}>{t}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function MinimalDarkCard() {
  return (
    <Card bg="#0f0f0e" border="#1c1c1a" hoverBorder="#3a3a38" hoverShadow="0 8px 28px rgba(255,255,255,.02)"
      modeLabel="DARK" modeLabelStyle={{ background: 'rgba(255,255,255,.05)', color: '#888', border: '1px solid rgba(255,255,255,.1)' }}>
      <div style={{ width:'28px',height:'28px',borderRadius:'6px',background:'#1c1c1a',border:'1px solid #2a2a28',margin:'0 auto 8px' }} />
      <div style={{ fontSize:'8px',fontWeight:600,color:'#ddd',textAlign:'center',marginBottom:'2px',letterSpacing:'-.2px' }}>yourname</div>
      {/* ✅ #3a3a38 → #777 */}
      <div style={{ fontSize:'6px',color:'#777',textAlign:'center',marginBottom:'8px' }}>Designer · Seoul</div>
      {['Portfolio','Instagram','Newsletter','Shop'].map(t => (
        <div key={t} style={{ display:'flex',alignItems:'center',gap:'4px',background:'#181816',border:'1px solid #2a2a28',borderRadius:'4px',padding:'4px 7px',marginBottom:'3px' }}>
          <div style={{ width:'3px',height:'3px',borderRadius:'50%',background:'#ccc',flexShrink:0 }} />
          <span style={{ fontSize:'7px',color:'#888',flex:1,textAlign:'left' }}>{t}</span>
        </div>
      ))}
    </Card>
  );
}

function MinimalLightCard() {
  return (
    <Card bg="#f9f9f8" border="#e0e0dc" hoverBorder="#c4c4c0" hoverShadow="0 8px 28px rgba(0,0,0,.07)"
      modeLabel="LIGHT" modeLabelStyle={{ background: 'rgba(0,0,0,.04)', color: '#888', border: '1px solid rgba(0,0,0,.08)' }}>
      <div style={{ width:'28px',height:'28px',borderRadius:'6px',background:'#e8e8e4',margin:'0 auto 8px' }} />
      <div style={{ fontSize:'8px',fontWeight:600,color:'#1a1a18',textAlign:'center',marginBottom:'2px',letterSpacing:'-.2px' }}>yourname</div>
      <div style={{ fontSize:'6px',color:'#999',textAlign:'center',marginBottom:'8px' }}>Designer · Seoul</div>
      {['Portfolio','Instagram','Newsletter','Shop'].map(t => (
        <div key={t} style={{ display:'flex',alignItems:'center',gap:'4px',background:'#fff',border:'1px solid #e4e4e0',borderRadius:'4px',padding:'4px 7px',marginBottom:'3px' }}>
          <div style={{ width:'3px',height:'3px',borderRadius:'50%',background:'#1a1a18',flexShrink:0 }} />
          <span style={{ fontSize:'7px',color:'#666',flex:1,textAlign:'left' }}>{t}</span>
        </div>
      ))}
    </Card>
  );
}
