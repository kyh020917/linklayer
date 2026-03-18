'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

type Mode = 'login' | 'signup';

export default function AuthForm({ mode }: { mode: Mode }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  const supabase = createClient();

  const mono = "'Fira Code', monospace";
  const sans = "'Outfit', sans-serif";

  // ── username 유효성 검사 ──
  const validateUsername = (val: string) => /^[a-zA-Z0-9_]{3,20}$/.test(val);

  // ── username 중복 확인 ──
  const checkUsername = async (val: string) => {
    if (!validateUsername(val)) { setUsernameAvailable(null); return; }
    setCheckingUsername(true);
    const { data } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', val)
      .single();
    setUsernameAvailable(!data);
    setCheckingUsername(false);
  };

  const handleUsernameChange = (val: string) => {
    // 소문자 + 숫자 + _ 만 허용, 공백 제거
    const cleaned = val.toLowerCase().replace(/[^a-z0-9_]/g, '');
    setUsername(cleaned);
    setUsernameAvailable(null);
    if (cleaned.length >= 3) {
      // 타이핑 멈춘 후 500ms 뒤 확인
      const timer = setTimeout(() => checkUsername(cleaned), 500);
      return () => clearTimeout(timer);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (mode === 'signup') {
      // username 검증
      if (!validateUsername(username)) {
        setError('아이디는 영문/숫자/_만 사용 가능하고 3~20자여야 해요.');
        setLoading(false);
        return;
      }
      if (usernameAvailable === false) {
        setError('이미 사용 중인 아이디예요. 다른 걸 골라주세요!');
        setLoading(false);
        return;
      }

      // 회원가입
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username }, // 메타데이터로 username 전달
        },
      });

      if (signUpError) { setError(signUpError.message); setLoading(false); return; }

      // 트리거가 생성한 profile의 username을 원하는 값으로 업데이트
      if (data.user) {
        await supabase
          .from('profiles')
          .update({ username, display_name: username })
          .eq('id', data.user.id);
      }

      setSuccess('이메일을 확인해 주세요! 인증 링크를 보냈습니다.');
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) { setError('이메일 또는 비밀번호가 올바르지 않습니다.'); setLoading(false); return; }
      router.push('/dashboard');
      router.refresh();
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
  };

  // username 상태 표시
  const getUsernameStatus = () => {
    if (username.length === 0) return null;
    if (username.length < 3) return { color: '#666', text: '최소 3자 이상 입력하세요' };
    if (checkingUsername) return { color: '#888', text: '확인 중...' };
    if (usernameAvailable === true) return { color: '#00ff87', text: `✓ linklayer.com/${username} 사용 가능!` };
    if (usernameAvailable === false) return { color: '#ff6b6b', text: '✗ 이미 사용 중인 아이디예요' };
    return null;
  };

  const status = mode === 'signup' ? getUsernameStatus() : null;

  return (
    <div style={{ minHeight: '100vh', background: '#07070d', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', position: 'relative', overflow: 'hidden', fontFamily: sans }}>
      {/* 배경 */}
      <div style={{ position: 'fixed', top: '-20%', left: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,255,135,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '-20%', right: '-10%', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,207,255,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '420px' }}>
        {/* 로고 */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{ fontFamily: mono, fontSize: '20px', fontWeight: 500, color: '#e8e8ee', textAlign: 'center', marginBottom: '8px' }}>
            link<span style={{ color: '#00ff87' }}>.</span>layer
          </div>
        </Link>
        <div style={{ fontFamily: mono, fontSize: '11px', color: '#2a2a4a', textAlign: 'center', marginBottom: '28px' }}>
          {mode === 'login' ? '// 다시 오셨군요 👋' : '// 나만의 링크 페이지를 만들어요 🚀'}
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '28px' }}>
          {success ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: '36px', marginBottom: '14px' }}>📬</div>
              <p style={{ color: '#e8e8ee', fontWeight: 600, fontSize: '15px', marginBottom: '8px' }}>이메일을 확인해 주세요!</p>
              <p style={{ color: '#333', fontSize: '13px', lineHeight: 1.7 }}>{success}</p>
              <div style={{ marginTop: '16px', fontFamily: mono, fontSize: '11px', color: '#1a1a2e' }}>
                인증 후 <span style={{ color: '#00ff87' }}>linklayer.com/{username}</span> 으로 접속하세요
              </div>
            </div>
          ) : (
            <>
              {/* Google 로그인 */}
              <button onClick={handleGoogleLogin}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '11px', background: 'transparent', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '9px', color: '#555', fontSize: '13px', cursor: 'pointer', fontFamily: sans, marginBottom: '20px' }}
                onMouseEnter={e => { (e.currentTarget).style.borderColor = 'rgba(255,255,255,0.15)'; (e.currentTarget).style.color = '#aaa'; }}
                onMouseLeave={e => { (e.currentTarget).style.borderColor = 'rgba(255,255,255,0.08)'; (e.currentTarget).style.color = '#555'; }}>
                <svg width="16" height="16" viewBox="0 0 18 18">
                  <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
                  <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
                  <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z"/>
                  <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z"/>
                </svg>
                Google로 계속하기
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
                <span style={{ fontFamily: mono, fontSize: '10px', color: '#1a1a2e' }}>or</span>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
              </div>

              <form onSubmit={handleSubmit}>

                {/* ── 회원가입 전용: username 필드 ── */}
                {mode === 'signup' && (
                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', fontFamily: mono, fontSize: '10px', color: '#333', marginBottom: '6px', letterSpacing: '0.3px' }}>
                      MY URL
                    </label>
                    {/* URL 프리뷰 인풋 */}
                    <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.04)', border: `1px solid ${usernameAvailable === true ? 'rgba(0,255,135,0.4)' : usernameAvailable === false ? 'rgba(255,107,107,0.4)' : 'rgba(255,255,255,0.08)'}`, borderRadius: '9px', overflow: 'hidden', transition: 'border-color .2s' }}>
                      <span style={{ fontFamily: mono, fontSize: '11px', color: '#1a1a2e', padding: '10px 10px 10px 14px', whiteSpace: 'nowrap', flexShrink: 0 }}>
                        linklayer.com/
                      </span>
                      <input
                        type="text"
                        placeholder="내아이디"
                        value={username}
                        onChange={e => handleUsernameChange(e.target.value)}
                        required
                        maxLength={20}
                        style={{ flex: 1, background: 'transparent', border: 'none', padding: '10px 14px 10px 0', fontSize: '13px', color: '#e0e0e0', fontFamily: mono, outline: 'none', minWidth: 0 }}
                      />
                    </div>
                    {/* 상태 메시지 */}
                    {status && (
                      <div style={{ fontFamily: mono, fontSize: '10px', color: status.color, marginTop: '6px', paddingLeft: '2px' }}>
                        {status.text}
                      </div>
                    )}
                  </div>
                )}

                {/* 이메일 */}
                <label style={{ display: 'block', fontFamily: mono, fontSize: '10px', color: '#333', marginBottom: '6px', letterSpacing: '0.3px' }}>
                  EMAIL
                </label>
                <input type="email" placeholder="dev@example.com" value={email}
                  onChange={e => setEmail(e.target.value)} required
                  style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '9px', padding: '10px 14px', fontSize: '13px', color: '#e0e0e0', fontFamily: sans, outline: 'none', marginBottom: '14px' }}
                />

                {/* 비밀번호 */}
                <label style={{ display: 'block', fontFamily: mono, fontSize: '10px', color: '#333', marginBottom: '6px', letterSpacing: '0.3px' }}>
                  PASSWORD
                </label>
                <div style={{ position: 'relative', marginBottom: '20px' }}>
                  <input type={showPw ? 'text' : 'password'} placeholder="••••••••" value={password}
                    onChange={e => setPassword(e.target.value)} required minLength={6}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '9px', padding: '10px 44px 10px 14px', fontSize: '13px', color: '#e0e0e0', fontFamily: sans, outline: 'none' }}
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)}
                    style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#2a2a4a', cursor: 'pointer', fontFamily: mono, fontSize: '10px' }}>
                    {showPw ? 'HIDE' : 'SHOW'}
                  </button>
                </div>

                {/* 에러 */}
                {error && (
                  <div style={{ color: '#ff6b6b', fontSize: '12px', background: 'rgba(255,107,107,0.08)', border: '1px solid rgba(255,107,107,0.2)', borderRadius: '8px', padding: '9px 12px', marginBottom: '14px', lineHeight: 1.5 }}>
                    {error}
                  </div>
                )}

                {/* 제출 버튼 */}
                <button type="submit" disabled={loading || (mode === 'signup' && usernameAvailable === false)}
                  style={{ width: '100%', background: loading ? '#00aa55' : '#00ff87', color: '#07070d', fontWeight: 700, fontSize: '14px', padding: '12px', borderRadius: '9px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: sans, letterSpacing: '-0.2px', transition: 'background .15s', opacity: (mode === 'signup' && usernameAvailable === false) ? 0.5 : 1 }}>
                  {loading ? '...' : mode === 'login' ? '로그인 →' : '내 페이지 만들기 →'}
                </button>
              </form>

              <p style={{ textAlign: 'center', fontFamily: mono, fontSize: '11px', color: '#1a1a2e', marginTop: '20px' }}>
                {mode === 'login' ? (
                  <>계정이 없으신가요?&nbsp;<Link href="/signup" style={{ color: '#00ff87' }}>회원가입</Link></>
                ) : (
                  <>이미 계정이 있으신가요?&nbsp;<Link href="/login" style={{ color: '#00ff87' }}>로그인</Link></>
                )}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
