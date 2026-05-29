import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
    const posts = (await getCollection('posts'))
        .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

    return rss({
        title: 'Disaggregate',
        description: 'Writing on programming, politics, history, and data.',
        site: context.site,
        items: posts.map(post => ({
            title: post.data.title,
            description: post.data.description,
            pubDate: post.data.pubDate,
            categories: post.data.tags,
            link: `/writing/${post.id}/`,
        })),
    });
}
