import { supabase } from './supabase';
import type { PostWithRelations, PostCategory, PostTag } from '../types/database';

export async function fetchPostWithRelations(postId: number): Promise<PostWithRelations> {
  const { data: post, error } = await supabase
    .from('posts')
    .select(`
      *,
      categories:post_categories_posts(
        category:post_categories(*)
      ),
      tags:post_tags_posts(
        tag:post_tags(*)
      ),
      author_profile:user_profiles(*)
    `)
    .eq('id', postId)
    .single();

  if (error) throw error;
  return post;
}

export async function fetchCategories(): Promise<PostCategory[]> {
  const { data, error } = await supabase
    .from('post_categories')
    .select('*')
    .order('name');

  if (error) throw error;
  return data;
}

export async function fetchTags(): Promise<PostTag[]> {
  const { data, error } = await supabase
    .from('post_tags')
    .select('*')
    .order('name');

  if (error) throw error;
  return data;
}