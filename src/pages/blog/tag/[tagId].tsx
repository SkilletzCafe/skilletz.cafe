import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { BasicPageLayout } from '@/components/BasicPageLayout';
import { PostGrid } from '@/components/blog/PostGrid';
import { TagFilter } from '@/components/blog/TagFilter';

import { getPostsGroupedByTags, getTagContent, getTags, getTagsStaticPaths } from '@/utils/posts';

import styles from '@/styles/Blog.module.css';

interface TagPageProps {
  tagId: string;
  tagContent: string;
  posts: any[];
  allTags: any[];
}

export default function TagPage({ tagId, tagContent, posts, allTags }: TagPageProps) {
  return (
    <>
      <Head>
        <title>Posts tagged &quot;{tagContent}&quot; - Skilletz Cafe</title>
        <meta
          name="description"
          content={`Read our blog posts about ${tagContent.toLowerCase()}.`}
        />
      </Head>

      <BasicPageLayout
        title={`Posts tagged "${tagContent}"`}
        heading={`Posts tagged "${tagContent}"`}
        intro={`Showing ${posts.length} post${posts.length === 1 ? '' : 's'} about ${tagContent.toLowerCase()}`}
      >
        <div className={styles.blogContent}>
          {/* Tags Filter */}
          {allTags.length > 0 && <TagFilter tags={allTags} activeTagId={tagId} />}

          {/* Posts Grid */}
          <PostGrid posts={posts} />

          {posts.length === 0 && (
            <div className={styles.noPosts}>
              <p>No posts found for this tag.</p>
              <Link href="/blog">← Back to Blog</Link>
            </div>
          )}
        </div>
      </BasicPageLayout>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return getTagsStaticPaths();
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { tagId } = params as { tagId: string };

  const tagContent = getTagContent(tagId);
  if (!tagContent) {
    return {
      notFound: true,
    };
  }

  const groupedPosts = getPostsGroupedByTags();
  const posts = groupedPosts[tagId] || [];
  const allTags = getTags();

  return {
    props: {
      tagId,
      tagContent,
      posts,
      allTags,
    },
  };
};
