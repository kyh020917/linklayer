'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Check, X, Loader2, Edit2 } from 'lucide-react';

interface Props {
  userId: string;
  currentUsername: string;
  onUpdate: (newUsername: string) => void;
}

export default function UsernameEditor({ userId, currentUsername, onUpdate }: Props) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(currentUsername);
  const [checking, setChecking] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const supabase = createClient();

  const mono = "'Fira Code', monospace";
  const sans = "'Outfit', sans-serif";

  const validate = (val: string) => /^[a-z0-9_]{3,20}$/.test(val);

  // 타이핑 멈추면 중복 확인
  useEffect(() => {
    if (!editing) return;
    if (value === currentUsername) { setAvailable(null); return; }
    if (!validate(value)) { setAvailable(null); return; }

    setChecking(true);
    setAvailable(null);
    const timer = setTimeout(async () => {
      const { data } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', value)
        .single();
      setAvailable(!data);
      setChecking(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [value, editing]);

  const handleSave = async () => {
    if (!validate(value)) { setError('영문 소문자, 숫자, _만 사용 가능 (3~20자)'); return; }
    if (available === false) { setError('이미 사용 중인 아이디예요'); return; }
    if (value === currentUsername) { setEditing(false); return; }

    setSaving(true);
    setError('');

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ username: value })
      .eq('id', userId);

    if (updateError) {
      setError('저장 중 오류가 발생했어요');
      setSaving(false);
      return;
    }

    onUpdate(value);
    setEditing(false);
    setSaving(false);
  };

  const handleCancel = () => {
    setValue(currentUsername);
    setAvailable(null);
    setError('');
    setEditing(false);
  };

  const statusColor = () => {
    if (value === currentUsername) return '#666';
    if (checking) return '#888';
    if (!validate(value) && value.length > 0) return '#ff6b6b';
    if (available === true) return '#00ff87';
    if (available === false) return '#ff6b6b';
    return '#666';
  };

  const statusText = () => {
    if (value === currentUsername) return '현재 아이디';
    if (value.length > 0 && value.length < 3) return '최소 3자 이상 입력하세요';
    if (value.length > 0 && !/^[a-z0-9_]*$/.test(value)) return '영문 소문자, 숫자, _만 사용 가능';
    if (checking) return '확인 중...';
    if (available === true) return `✓ linklayer.com/${value} 사용 가능!`;
    if (available === false) return '✗ 이미 사용 중인 아이디예요';
    return '';
  };

  if (!editing) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
        <span style={{ fontFamily: mono, fontSize: '11px', color: '#666' }}>@{currentUsername}</span>
        <button
          onClick={() => { setValue(currentUsername); setEditing(true); }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', display: 'flex', alignItems: 'center', color: '#444' }}
          title="아이디 변경"
        >
          <Edit2 size={11} />
        </button>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: '4px' }}>
      {/* 인풋 행 */}
      <div style={{
        display: 'flex', alignItems: 'center',
        background: 'rgba(255,255,255,0.05)',
        border: `1px solid ${available === true && value !== currentUsername ? 'rgba(0,255,135,0.4)' : available === false ? 'rgba(255,107,107,0.4)' : 'rgba(255,255,255,0.12)'}`,
        borderRadius: '8px', overflow: 'hidden',
        transition: 'border-color .2s',
      }}>
        <span style={{ fontFamily: mono, fontSize: '10px', color: '#555', padding: '7px 8px 7px 12px', whiteSpace: 'nowrap', flexShrink: 0 }}>
          linklayer.com/
        </span>
        <input
          value={value}
          onChange={e => {
            const cleaned = e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '');
            setValue(cleaned);
            setError('');
          }}
          maxLength={20}
          autoFocus
          style={{
            flex: 1, background: 'transparent', border: 'none', outline: 'none',
            fontFamily: mono, fontSize: '11px', color: '#e0e0e0',
            padding: '7px 4px', minWidth: 0,
          }}
        />
        {/* 상태 아이콘 */}
        <div style={{ padding: '0 8px', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          {checking && <Loader2 size={12} color="#888" style={{ animation: 'spin 1s linear infinite' }} />}
          {!checking && available === true && value !== currentUsername && <Check size={12} color="#00ff87" />}
          {!checking && available === false && <X size={12} color="#ff6b6b" />}
        </div>
        {/* 저장/취소 버튼 */}
        <div style={{ display: 'flex', borderLeft: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 }}>
          <button
            onClick={handleSave}
            disabled={saving || available === false || (value !== currentUsername && available !== true && validate(value))}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '7px 10px', color: '#00ff87', display: 'flex', alignItems: 'center',
              opacity: saving ? 0.5 : 1,
            }}
            title="저장"
          >
            {saving ? <Loader2 size={13} style={{ animation: 'spin 1s linear infinite' }} /> : <Check size={13} />}
          </button>
          <button
            onClick={handleCancel}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '7px 10px', color: '#666', display: 'flex', alignItems: 'center', borderLeft: '1px solid rgba(255,255,255,0.08)' }}
            title="취소"
          >
            <X size={13} />
          </button>
        </div>
      </div>

      {/* 상태 메시지 */}
      {(statusText() || error) && (
        <div style={{ fontFamily: mono, fontSize: '10px', color: error ? '#ff6b6b' : statusColor(), marginTop: '5px', paddingLeft: '2px' }}>
          {error || statusText()}
        </div>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
