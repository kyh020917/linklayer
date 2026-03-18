'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import type { Profile, Link as LinkType, ItemType } from '@/lib/types';
import {
  ExternalLink, GripVertical, Edit2, Trash2,
  Eye, EyeOff, BarChart2, Copy, Check, Plus, LogOut, Camera, Loader2,
  Link2, Mail, Phone, MessageSquare, Type
} from 'lucide-react';
import ThemePicker from './ThemePicker';
import UsernameEditor from '@/components/UsernameEditor';

interface Props { profile: Profile; links: LinkType[] }

const ITEM_TYPES: { id: ItemType; label: string; icon: React.ReactNode; placeholder: string; hint: string }[] = [
  { id: 'link',    label: '링크',      icon: <Link2 size={14} />,         placeholder: 'instagram.com/username', hint: 'URL 주소' },
  { id: 'email',   label: '이메일',    icon: <Mail size={14} />,          placeholder: 'hello@example.com',      hint: '이메일 주소' },
  { id: 'phone',   label: '전화번호',  icon: <Phone size={14} />,         placeholder: '010-1234-5678',          hint: '전화번호' },
  { id: 'discord', label: '디스코드',  icon: <MessageSquare size={14} />, placeholder: 'username',               hint: '디스코드 아이디' },
  { id: 'text',    label: '텍스트',    icon: <Type size={14} />,          placeholder: '한마디 소개글...',       hint: '자유 텍스트' },
];

function getItemTypeConfig(type: ItemType) {
  return ITEM_TYPES.find(t => t.id === type) || ITEM_TYPES[0];
}

export default function DashboardClient({ profile: initialProfile, links: initialLinks }: Props) {
  const [profile, setProfile] = useState(initialProfile);
  const [links, setLinks] = useState(initialLinks);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingLink, setEditingLink] = useState<LinkType | null>(null);
  const [newLink, setNewLink] = useState({ title: '', url: '', item_type: 'link' as ItemType });
  const [loading, setLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [dragId, setDragId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();
  const router = useRouter();

  const mono = "'Fira Code', monospace";
  const sans = "'Outfit', sans-serif";

  const profileUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/${profile.username}`;

  const copyUrl = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { alert('5MB 이하 파일만 업로드 가능해요!'); return; }
    setAvatarLoading(true);
    try {
      const ext = file.name.split('.').pop();
      const fileName = `${profile.id}-${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage.from('avatars').upload(fileName, file, { upsert: true });
      if (uploadError) {
        const reader = new FileReader();
        reader.onload = async (ev) => {
          const base64 = ev.target?.result as string;
          const { error } = await supabase.from('profiles').update({ avatar_url: base64 }).eq('id', profile.id);
          if (!error) setProfile(prev => ({ ...prev, avatar_url: base64 }));
          setAvatarLoading(false);
        };
        reader.readAsDataURL(file); return;
      }
      const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(fileName);
      const { error } = await supabase.from('profiles').update({ avatar_url: publicUrl }).eq('id', profile.id);
      if (!error) setProfile(prev => ({ ...prev, avatar_url: publicUrl }));
    } catch (err) { console.error(err); }
    setAvatarLoading(false);
  };

  const handleAddLink = async () => {
    if (!newLink.title || !newLink.url) return;
    setLoading(true);
    const value = newLink.item_type === 'link' && !newLink.url.startsWith('http')
      ? `https://${newLink.url}` : newLink.url;
    const { data, error } = await supabase.from('links')
      .insert({ user_id: profile.id, title: newLink.title, url: value, sort_order: links.length, item_type: newLink.item_type })
      .select().single();
    if (!error && data) { setLinks(prev => [...prev, data]); setNewLink({ title: '', url: '', item_type: 'link' }); setShowAddForm(false); }
    setLoading(false);
  };

  const handleDeleteLink = async (id: string) => {
    await supabase.from('links').delete().eq('id', id);
    setLinks(prev => prev.filter(l => l.id !== id));
  };

  const handleToggleActive = async (link: LinkType) => {
    await supabase.from('links').update({ is_active: !link.is_active }).eq('id', link.id);
    setLinks(prev => prev.map(l => l.id === link.id ? { ...l, is_active: !l.is_active } : l));
  };

  const handleUpdateLink = async () => {
    if (!editingLink) return;
    const { error } = await supabase.from('links').update({ title: editingLink.title, url: editingLink.url }).eq('id', editingLink.id);
    if (!error) { setLinks(prev => prev.map(l => l.id === editingLink.id ? editingLink : l)); setEditingLink(null); }
  };

  const handleDragStart = (id: string) => setDragId(id);
  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!dragId || dragId === targetId) return;
    const di = links.findIndex(l => l.id === dragId);
    const ti = links.findIndex(l => l.id === targetId);
    const nl = [...links]; const [r] = nl.splice(di, 1); nl.splice(ti, 0, r);
    setLinks(nl);
  };
  const handleDragEnd = async () => {
    setDragId(null);
    for (let i = 0; i < links.length; i++) await supabase.from('links').update({ sort_order: i }).eq('id', links[i].id);
  };
  const handleLogout = async () => { await supabase.auth.signOut(); router.push('/'); };

  const initial = (profile.display_name || profile.username)[0].toUpperCase();
  const currentTypeConfig = getItemTypeConfig(newLink.item_type);

  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: '#e0e0e0', fontFamily: sans, outline: 'none',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#07070d', fontFamily: sans }}>
      <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarChange} />

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '24px 16px 60px' }}>

        {/* 헤더 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <span style={{ fontFamily: mono, fontSize: '16px', fontWeight: 500, color: '#e8e8ee' }}>
            link<span style={{ color: '#00ff87' }}>.</span>layer
          </span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Link href={`/${profile.username}`} target="_blank"
              style={{ padding: '8px', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.12)', borderRadius: '8px', display: 'flex', alignItems: 'center', color: '#888' }}>
              <ExternalLink size={16} />
            </Link>
            <button onClick={handleLogout}
              style={{ padding: '8px', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.12)', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#888' }}>
              <LogOut size={16} />
            </button>
          </div>
        </div>

        {/* 프로필 카드 */}
        <div style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)', borderRadius: '14px', padding: '20px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            {/* 아바타 */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div
                onClick={() => fileInputRef.current?.click()}
                style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'linear-gradient(135deg,rgba(0,255,135,.15),rgba(0,207,255,.1))', border: '1px solid rgba(0,255,135,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', cursor: 'pointer' }}>
                {avatarLoading ? <Loader2 size={20} color="#00ff87" />
                  : profile.avatar_url ? <img src={profile.avatar_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <span style={{ fontFamily: mono, fontSize: '20px', fontWeight: 700, color: '#00ff87' }}>{initial}</span>}
              </div>
              <button onClick={() => fileInputRef.current?.click()}
                style={{ position: 'absolute', bottom: '-6px', right: '-6px', width: '22px', height: '22px', borderRadius: '50%', background: '#00ff87', border: '2px solid #07070d', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0 }}>
                <Camera size={11} color="#07070d" />
              </button>
            </div>

            {/* 이름 + username 편집 */}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#e8e8ee', letterSpacing: '-.3px', marginBottom: '4px' }}>
                {profile.display_name || profile.username}
              </div>

              {/* ✅ UsernameEditor 컴포넌트 */}
              <UsernameEditor
                userId={profile.id}
                currentUsername={profile.username}
                onUpdate={(newUsername) => {
                  setProfile(prev => ({ ...prev, username: newUsername }));
                }}
              />

              <div style={{ fontFamily: mono, fontSize: '10px', color: '#444', marginTop: '4px' }}>
                사진을 클릭해서 변경
              </div>
            </div>
          </div>

          {/* URL 복사 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)', borderRadius: '8px', padding: '10px 14px' }}>
            <span style={{ fontFamily: mono, fontSize: '11px', color: '#666', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{profileUrl}</span>
            <button onClick={copyUrl} style={{ background: 'none', border: 'none', cursor: 'pointer', color: copied ? '#00ff87' : '#666', display: 'flex' }}>
              {copied ? <Check size={15} /> : <Copy size={15} />}
            </button>
          </div>
        </div>

        {/* 통계 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px', marginBottom: '20px' }}>
          {[
            { v: links.length, l: '// ITEMS' },
            { v: links.filter(l => l.is_active).length, l: '// ACTIVE' },
            { v: links.filter(l => !l.item_type || l.item_type === 'link').reduce((a, l) => a + l.click_count, 0), l: '// CLICKS' },
          ].map(s => (
            <div key={s.l} style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)', borderRadius: '10px', padding: '14px', textAlign: 'center' }}>
              <div style={{ fontFamily: mono, fontSize: '20px', fontWeight: 600, color: '#00ff87', marginBottom: '3px' }}>{s.v}</div>
              <div style={{ fontFamily: mono, fontSize: '9px', color: '#666', letterSpacing: '.3px' }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* 테마 */}
        <ThemePicker userId={profile.id} currentTheme={(profile as any).theme} />

        {/* 아이템 목록 */}
        <div style={{ marginBottom: '8px' }}>
          <div style={{ fontFamily: mono, fontSize: '11px', color: '#00ff87', marginBottom: '12px', letterSpacing: '.5px' }}>// MY ITEMS</div>
          {links.length === 0 && (
            <div style={{ textAlign: 'center', padding: '32px', color: '#555', fontSize: '13px' }}>
              아직 추가된 항목이 없어요. 아래 버튼으로 추가하세요!
            </div>
          )}
          {links.map(link => {
            const type = getItemTypeConfig(link.item_type || 'link');
            return (
              <div key={link.id} draggable
                onDragStart={() => handleDragStart(link.id)}
                onDragOver={e => handleDragOver(e, link.id)}
                onDragEnd={handleDragEnd}
                style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)', borderRadius: '10px', padding: '12px 14px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px', opacity: dragId === link.id ? 0.5 : link.is_active ? 1 : 0.4, transition: 'opacity .15s' }}>
                {editingLink?.id === link.id ? (
                  <div style={{ flex: 1 }}>
                    <input value={editingLink.title} onChange={e => setEditingLink({ ...editingLink, title: e.target.value })}
                      style={{ ...inputStyle, marginBottom: '7px' }} placeholder="제목" />
                    <input value={editingLink.url} onChange={e => setEditingLink({ ...editingLink, url: e.target.value })}
                      style={{ ...inputStyle, marginBottom: '8px' }} placeholder="값" />
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={handleUpdateLink} style={{ flex: 1, background: '#00ff87', color: '#07070d', fontWeight: 700, fontSize: '13px', padding: '9px', borderRadius: '7px', border: 'none', cursor: 'pointer', fontFamily: sans }}>저장</button>
                      <button onClick={() => setEditingLink(null)} style={{ flex: 1, background: 'rgba(255,255,255,.05)', color: '#888', fontSize: '13px', padding: '9px', borderRadius: '7px', border: '1px solid rgba(255,255,255,.1)', cursor: 'pointer', fontFamily: sans }}>취소</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <GripVertical size={16} color="#444" style={{ cursor: 'grab', flexShrink: 0 }} />
                    {/* 타입 아이콘 */}
                    <div style={{ width: '28px', height: '28px', borderRadius: '7px', background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', flexShrink: 0 }}>
                      {type.icon}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '13px', fontWeight: 500, color: '#e0e0e0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{link.title}</div>
                      <div style={{ fontFamily: mono, fontSize: '10px', color: '#666', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{link.url}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                      {(!link.item_type || link.item_type === 'link') && (
                        <span style={{ fontFamily: mono, fontSize: '10px', color: '#555', display: 'flex', alignItems: 'center', gap: '3px' }}>
                          <BarChart2 size={10} color="#555" />{link.click_count}
                        </span>
                      )}
                      <button onClick={() => handleToggleActive(link)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: '3px' }}>
                        {link.is_active ? <Eye size={14} color="#00ff87" /> : <EyeOff size={14} color="#555" />}
                      </button>
                      <button onClick={() => setEditingLink(link)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: '3px' }}>
                        <Edit2 size={14} color="#666" />
                      </button>
                      <button onClick={() => handleDeleteLink(link.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: '3px' }}>
                        <Trash2 size={14} color="#ff6b6b" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* 추가 폼 */}
        {showAddForm ? (
          <div style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)', borderRadius: '12px', padding: '18px' }}>
            <div style={{ fontFamily: mono, fontSize: '10px', color: '#00ff87', marginBottom: '14px' }}>// ADD ITEM</div>
            {/* 타입 선택 */}
            <div style={{ display: 'flex', gap: '6px', marginBottom: '14px', flexWrap: 'wrap' }}>
              {ITEM_TYPES.map(t => (
                <button key={t.id} onClick={() => setNewLink(prev => ({ ...prev, item_type: t.id, url: '' }))}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '5px',
                    padding: '6px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', fontFamily: sans,
                    background: newLink.item_type === t.id ? 'rgba(0,255,135,.15)' : 'rgba(255,255,255,.04)',
                    border: `1px solid ${newLink.item_type === t.id ? 'rgba(0,255,135,.4)' : 'rgba(255,255,255,.1)'}`,
                    color: newLink.item_type === t.id ? '#00ff87' : '#666',
                    transition: 'all .15s',
                  }}>
                  {t.icon}{t.label}
                </button>
              ))}
            </div>
            <label style={{ display: 'block', fontFamily: mono, fontSize: '10px', color: '#666', marginBottom: '5px' }}>제목</label>
            <input placeholder={`예: 내 ${currentTypeConfig.label}`} value={newLink.title}
              onChange={e => setNewLink({ ...newLink, title: e.target.value })}
              style={{ ...inputStyle, marginBottom: '10px' }} />
            <label style={{ display: 'block', fontFamily: mono, fontSize: '10px', color: '#666', marginBottom: '5px' }}>{currentTypeConfig.hint}</label>
            <input placeholder={currentTypeConfig.placeholder} value={newLink.url}
              onChange={e => setNewLink({ ...newLink, url: e.target.value })}
              style={{ ...inputStyle, marginBottom: '12px' }} />
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={handleAddLink} disabled={loading || !newLink.title || !newLink.url}
                style={{ flex: 1, background: loading ? '#00aa55' : '#00ff87', color: '#07070d', fontWeight: 700, fontSize: '13px', padding: '10px', borderRadius: '7px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: sans, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', opacity: (!newLink.title || !newLink.url) ? 0.5 : 1 }}>
                {loading && <Loader2 size={14} />}
                {loading ? '추가 중...' : '추가하기 →'}
              </button>
              <button onClick={() => { setShowAddForm(false); setNewLink({ title: '', url: '', item_type: 'link' }); }}
                style={{ flex: 1, background: 'rgba(255,255,255,.04)', color: '#888', fontSize: '13px', padding: '10px', borderRadius: '7px', border: '1px solid rgba(255,255,255,.1)', cursor: 'pointer', fontFamily: sans }}>
                취소
              </button>
            </div>
          </div>
        ) : (
          <button onClick={() => setShowAddForm(true)}
            style={{ width: '100%', background: 'transparent', border: '1px dashed rgba(255,255,255,.15)', borderRadius: '10px', padding: '14px', color: '#555', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontFamily: sans }}
            onMouseEnter={e => { (e.currentTarget).style.borderColor = 'rgba(0,255,135,.4)'; (e.currentTarget).style.color = '#00ff87'; }}
            onMouseLeave={e => { (e.currentTarget).style.borderColor = 'rgba(255,255,255,.15)'; (e.currentTarget).style.color = '#555'; }}>
            <Plus size={16} /> 새 항목 추가
          </button>
        )}
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
