import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import Card from '../components/ui/Card';
import Section from '../components/ui/Section';
import { motion } from 'framer-motion';

interface Post {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  created_at: string;
  author: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Section
      title="Blog"
      subtitle="Stay updated with our latest insights and developments"
    >
      {loading ? (
        <div className="flex justify-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Card key={post.id} className="p-6">
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{post.author}</span>
                <span>{new Date(post.created_at).toLocaleDateString()}</span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </Section>
  );
}