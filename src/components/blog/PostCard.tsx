import Link from 'next/link';

import styles from '@/styles/Blog.module.css';

// TODO: Define a proper Post type, probably in types/blog.ts
export function PostCard({ post }: { post: any }) {
  return (
    <article key={post.id} className={styles.postCard}>
      {post.meta.featuredImage && (
        <div className={styles.imageContainer}>
          <img
            src={post.meta.featuredImage}
            alt={post.meta.title}
            className={styles.featuredImage}
          />
        </div>
      )}

      <div className={styles.postContent}>
        <h2 className={styles.postTitle}>
          <Link href={`/blog/${post.slug}`}>{post.meta.title}</Link>
        </h2>

        <p className={styles.postExcerpt}>{post.meta.excerpt}</p>

        <div className={styles.postMeta}>
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

        {post.tags && (
          <div className={styles.postTags}>
            {post.tags.map((tag: any) => (
              <Link key={tag.id} href={`/blog/tag/${tag.id}`} className={styles.postTag}>
                {tag.content}
              </Link>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
