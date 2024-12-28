import { z } from 'zod';

export const postSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  excerpt: z.string().min(1, 'Excerpt is required').max(200),
  content: z.string().min(1, 'Content is required'),
});

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});