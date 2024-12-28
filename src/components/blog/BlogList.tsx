import React from 'react';
import { Link } from 'react-router-dom';
import BlogCard from './BlogCard';
import Button from '../ui/Button';
import { Plus } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import type { Post } from '../../types/blog';

interface BlogListProps {
  posts: Post[];
}

export default function BlogList({ posts }: BlogListProps) {
  const { user } = useAuth();

  return (
    <div>
      {user && (
        <div className="mb-8 flex justify-end">
          <Button as={Link} to="/blog/create">
            <Plus className="h-5 w-5 mr-2" />
            Create Post
          </Button>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}