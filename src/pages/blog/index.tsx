import { GetStaticProps } from 'next';
import Head from 'next/head';

import BasicPageLayout from '@/components/BasicPageLayout';
import { PostGrid } from '@/components/blog/PostGrid';
import { TagFilter } from '@/components/blog/TagFilter';

import { getPosts, getTags } from '@/utils/posts';

import styles from '@/styles/Blog.module.css';

interface BlogIndexProps {
  posts: any[];
  tags: any[];
}

export default function BlogIndex({ posts, tags }: BlogIndexProps) {
  return (
    <>
      <Head>
        <title>Blog - Skilletz Cafe</title>
        <meta
          name="description"
          content="Read our latest blog posts about food, recipes, and life at Skilletz Cafe."
        />
      </Head>

      <BasicPageLayout
        title="Blog"
        heading="Blog"
        intro="Stories, recipes, and insights from our kitchen"
      >
        <div className={styles.blogContent}>
          {/* Tags Filter */}
          {tags.length > 0 && <TagFilter tags={tags} />}

          {/* Posts Grid */}
          <PostGrid posts={posts} />

          {posts.length === 0 && (
            <div className={styles.noPosts}>
              <p>No blog posts found.</p>
            </div>
          )}
        </div>
      </BasicPageLayout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getPosts();
  const tags = getTags();

  return {
    props: {
      posts,
      tags,
    },
  };
};
