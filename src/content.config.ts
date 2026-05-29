import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const posts = defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/content/posts' }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        tags: z.array(z.enum(['Essay', 'Fiction', 'Film', 'History', 'Review', 'Music', 'Programming', 'data', 'politics'])).nonempty(),
    }),
});

export const collections = { posts };
