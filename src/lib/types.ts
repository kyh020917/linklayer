export type Theme =
  | 'coder-dark'   | 'coder-light'
  | 'gamer-dark'   | 'gamer-light'
  | 'soft-dark'    | 'soft-light'
  | 'minimal-dark' | 'minimal-light';

export type ItemType = 'link' | 'email' | 'phone' | 'discord' | 'text';

export interface Profile {
  id: string;
  username: string;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  theme: Theme;
  created_at: string;
}

export interface Link {
  id: string;
  user_id: string;
  title: string;
  url: string;           // link타입: URL / 나머지: 값 (이메일주소, 전화번호 등)
  icon_url: string | null;
  sort_order: number;
  is_active: boolean;
  click_count: number;
  item_type: ItemType;
  created_at: string;
}
