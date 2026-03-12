import BlogDetailsContent from '@/components/blog-details/blog-details-content';
import RelatedBlog from '@/components/blog-details/related-blog';
import type { BlogPost } from '@/interface';
import { generateMetadata as buildMetadata } from '@/lib/generateMetaData';
import getMarkDownContent from '@/lib/getMarkDownContent';
import getMarkDownData from '@/lib/getMarkDownData';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const posts = getMarkDownData<BlogPost>('data/blogs');
  return posts?.map((post) => ({ slug: post?.slug })) ?? [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const blog = getMarkDownContent('data/blogs', slug);
    const title = (blog?.data?.title as string) ?? 'Blog';
    const description = (blog?.data?.description as string) ?? undefined;
    return buildMetadata(`${title} - AI Solutions || Nexsas`, description, `/blog/${slug}`);
  } catch {
    return buildMetadata('Blog Details - AI Solutions || Nexsas', undefined, `/blog/${slug}`);
  }
}

const BlogSlugPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  let blog: { data: Record<string, unknown>; content: string } | null = null;
  try {
    const result = getMarkDownContent('src/data/blog', slug);
    blog = { data: result.data as Record<string, unknown>, content: result.content };
  } catch {
    notFound();
  }

  const allPosts = getMarkDownData<BlogPost>('data/blogs', true, 'publishDate');

  return (
    <main className="bg-background-6">
      <BlogDetailsContent blog={blog} />
      <RelatedBlog posts={allPosts} currentSlug={slug} />
    </main>
  );
};

export default BlogSlugPage;
