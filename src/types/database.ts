// Database types for Supabase
export interface UserProfile {
  id: string;
  user_id: string;
  is_admin: boolean;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

export interface PostCategory {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
}

export interface PostTag {
  id: number;
  name: string;
  slug: string;
  created_at: string;
}

export interface PostWithRelations extends Post {
  categories?: PostCategory[];
  tags?: PostTag[];
  author_profile?: UserProfile;
}