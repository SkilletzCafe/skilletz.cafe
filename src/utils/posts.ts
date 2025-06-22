import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';

const POSTS_DIRECTORY = path.join(process.cwd(), 'src/posts');

// --------------------------------------------------
// Public Utility Functions
// --------------------------------------------------

// Retrieves the full post, including metadata and HTML content
export async function getPost(slug: string) {
  const { matterResult, fileName } = getPostFrontMatter(slug);
  const postMetadata = getPostMetadata(slug, matterResult, fileName);

  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();

  const post = {
    ...postMetadata,
    content: {
      html: contentHtml,
    },
  };

  return post;
}

// Retrieves only the metadata for a post
export function getPostMetadata(
  slug: string,
  matterResult?: matter.GrayMatterFile<string>,
  fileName?: string
) {
  if (!matterResult || !fileName) {
    const frontMatter = getPostFrontMatter(slug);
    matterResult = frontMatter.matterResult;
    fileName = frontMatter.fileName;
  }

  const post: any = {
    slug,
    meta: {
      ...matterResult.data,
    },
  };

  // Automatically parse date from filename (e.g., "2025-06-08-...")
  const dateMatch = fileName.match(/^(\d{4}-\d{2}-\d{2})/);
  if (dateMatch && dateMatch[1]) {
    // Add time to avoid timezone issues, assuming start of day in UTC
    post.meta.date = new Date(`${dateMatch[1]}T00:00:00Z`).toISOString();
  } else {
    // This should ideally not happen if filenames are correct.
    // Fallback to current date or throw an error.
    console.warn(
      `Could not parse date from filename: ${fileName}. Using current date as a fallback.`
    );
    post.meta.date = new Date().toISOString();
  }

  // Ensure title exists to prevent runtime errors
  if (!post.meta.title) {
    throw new Error(`Post file "${fileName}" is missing a "title" in its frontmatter.`);
  }

  // Generate SEO title from the actual title
  const title = post.meta.title;
  const seoTitle = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/ /g, '-');
  post.meta.seoTitle = seoTitle;

  let tags = post.meta.tags;
  if (tags) {
    tags = tags.split(',').map((tag: string) => tag.trim());
    tags = tags.map((tag: string) => ({
      content: tag,
      id: tag.replace(/ /g, '-').toLowerCase(),
    }));
  } else {
    tags = null;
  }
  post.tags = tags;

  return post;
}

// Retrieves a sorted list of all unique tags
export function getTags() {
  const posts = getPosts();
  const tags: any[] = [];

  posts.forEach((post) => {
    if (post.tags) {
      post.tags.forEach((tag: any) => {
        if (!tags.find((compare) => compare.id === tag.id)) {
          tags.push(tag);
        }
      });
    }
  });

  return tags.sort((a, b) => (a.id > b.id ? 1 : -1));
}

// Retrieves the content of a specific tag
export function getTagContent(id: string) {
  return getTags().find((tag) => tag.id === id)?.content;
}

// Retrieves all posts sorted into their respective tag(s)
export function getPostsGroupedByTags() {
  const posts = getPosts();
  const tags = getTags();
  const groupedPosts: any = {};

  tags.forEach((tag) => {
    groupedPosts[tag.id] = [];
  });

  posts.forEach((post) => {
    const postTags = post.tags;
    if (postTags) {
      postTags.forEach((tag: any) => {
        groupedPosts[tag.id].push(post);
      });
    }
  });

  return groupedPosts;
}

// Retrieves a list of posts sorted by date
export function getPosts() {
  const slugs = getAllPostSlugs();
  const posts = slugs.map((slug) => {
    const post = getPostMetadata(slug);
    return post;
  });

  const sortedPosts = posts.sort((a, b) => {
    const result = a.meta.date < b.meta.date ? 1 : -1;
    return result;
  });

  return sortedPosts;
}

// Retrieves a list of static paths for all posts
export function getPostsStaticPaths() {
  const slugs = getAllPostSlugs();
  const paths = slugs.map((slug) => {
    return {
      params: {
        slug: slug,
      },
    };
  });

  const result = {
    paths,
    fallback: false,
  };

  return result;
}

// Retrieves a list of static paths for all tags
export function getTagsStaticPaths() {
  const tags = getTags();
  const paths = tags.map((tag) => {
    return {
      params: {
        tagId: tag.id,
      },
    };
  });

  const result = {
    paths,
    fallback: false,
  };

  return result;
}

// --------------------------------------------------
// Internal Helper Functions
// --------------------------------------------------

// Functions for retrieving information about all posts
function getPostFileNames() {
  const fileNames = fs.readdirSync(POSTS_DIRECTORY);
  // Filter out directories, READMEs, and non-markdown files
  return fileNames.filter((fileName) => {
    const fullPath = path.join(POSTS_DIRECTORY, fileName);
    return (
      fileName.toLowerCase() !== 'readme.md' &&
      fs.statSync(fullPath).isFile() &&
      path.extname(fullPath) === '.md'
    );
  });
}

function getAllPostSlugs() {
  const fileNames = getPostFileNames();
  const slugs = fileNames.map((fileName) => {
    const slug = fileName.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '');
    return { slug, fileName };
  });

  const slugMap = new Map<string, string[]>();
  slugs.forEach(({ slug, fileName }) => {
    if (!slugMap.has(slug)) {
      slugMap.set(slug, []);
    }
    slugMap.get(slug)!.push(fileName);
  });

  const duplicates = Array.from(slugMap.entries()).filter(([, files]) => files.length > 1);

  if (duplicates.length > 0) {
    const errorMessages = duplicates.map(
      ([slug, files]) => `  - Slug "${slug}" is used by multiple files: ${files.join(', ')}`
    );
    throw new Error(
      `Duplicate slugs found!\n\nPlease ensure all post slugs are unique.\n\n${errorMessages.join('\n')}`
    );
  }

  return slugs.map(({ slug }) => slug);
}

// Functions for retrieving information about a single post
function getPostFileInfo(slug: string) {
  // Find the file that matches the slug pattern
  const fileNames = getPostFileNames();
  const fileName = fileNames.find(
    (name) => name.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '') === slug
  );

  if (!fileName) {
    throw new Error(`Post with slug "${slug}" not found`);
  }

  const filePath = path.join(POSTS_DIRECTORY, fileName);
  return { filePath, fileName };
}

function getPostFileContents(slug: string) {
  const { filePath } = getPostFileInfo(slug);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return fileContents;
}

function getPostFrontMatter(slug: string) {
  // Find the file that matches the slug pattern
  const fileNames = getPostFileNames();
  const fileName = fileNames.find(
    (name) => name.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '') === slug
  );

  if (!fileName) {
    throw new Error(`Post with slug "${slug}" not found`);
  }

  const filePath = path.join(POSTS_DIRECTORY, fileName);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const matterResult = matter(fileContents);
  return { matterResult, fileName };
}
