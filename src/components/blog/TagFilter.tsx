import Link from 'next/link';

import styles from '@/styles/Blog.module.css';

export function TagFilter({ tags, activeTagId }: { tags: any[]; activeTagId?: string }) {
  return (
    <div className={styles.tagsContainer}>
      <h3>Filter by topic:</h3>
      <div className={styles.tags}>
        <Link
          href="/blog"
          className={!activeTagId ? `${styles.tag} ${styles.activeTag}` : styles.tag}
        >
          All Posts
        </Link>
        {tags.map((tag) => (
          <Link
            key={tag.id}
            href={`/blog/tag/${tag.id}`}
            className={`${styles.tag} ${tag.id === activeTagId ? styles.activeTag : ''}`}
          >
            {tag.content}
          </Link>
        ))}
      </div>
    </div>
  );
}
