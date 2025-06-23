import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { BasicPageLayout } from '@/components/BasicPageLayout';

import { getPost, getPostsStaticPaths } from '@/utils/posts';

import styles from '@/styles/BlogPost.module.css';

interface BlogPostProps {
  post: any;
}

export default function BlogPost({ post }: BlogPostProps) {
  if (!post) {
    return (
      <BasicPageLayout title="Post Not Found" heading="Post Not Found">
        <p>The blog post you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/blog">← Back to Blog</Link>
      </BasicPageLayout>
    );
  }

  return (
    <>
      <Head>
        <title>{post.meta.title} - Skilletz Cafe</title>
        <meta name="description" content={post.meta.excerpt} />
        {post.meta.featuredImage && <meta property="og:image" content={post.meta.featuredImage} />}
      </Head>

      <BasicPageLayout title={post.meta.title} heading={post.meta.title}>
        <article className={styles.post}>
          {/* Featured Image */}
          {post.meta.featuredImage && (
            <div className={styles.featuredImageContainer}>
              <img
                src={post.meta.featuredImage}
                alt={post.meta.title}
                className={styles.featuredImage}
              />
            </div>
          )}

          {/* Post Meta */}
          <div className={styles.postMeta}>
            <div className={styles.metaRow}>
              <span className={styles.postDate}>
                {new Date(post.meta.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>

              {post.meta.readingTime && (
                <span className={styles.readingTime}>{post.meta.readingTime} min read</span>
              )}
            </div>

            {post.meta.author && <div className={styles.author}>By {post.meta.author}</div>}
          </div>

          {/* Post Content */}
          <div
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html: post.content.html }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className={styles.postTags}>
              <h3>Tags:</h3>
              <div className={styles.tags}>
                {post.tags.map((tag: any) => (
                  <Link key={tag.id} href={`/blog/tag/${tag.id}`} className={styles.tag}>
                    {tag.content}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back to Blog */}
          <div className={styles.backToBlog}>
            <Link href="/blog">← Back to Blog</Link>
          </div>
        </article>
      </BasicPageLayout>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return getPostsStaticPaths();
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };

  try {
    const post = await getPost(slug);

    if (!post) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        post,
      },
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    return {
      notFound: true,
    };
  }
};
