import styles from '@/styles/Blog.module.css';

import { PostCard } from './PostCard';

export function PostGrid({ posts }: { posts: any[] }) {
  return (
    <div className={styles.postsGrid}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
