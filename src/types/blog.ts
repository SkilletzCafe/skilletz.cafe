export interface BlogTag {
  content: string;
  id: string;
}

// Blog post metadata interface
export interface BlogPostMeta {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  tags: string;
  featuredImage?: string;
  isPublished: boolean;
  readingTime?: number;
  seoTitle?: string;
}

// Blog post content interface
export interface BlogPostContent {
  html: string;
}

// Complete blog post interface
export interface BlogPost {
  id: string;
  tags: BlogTag[] | null;
  meta: BlogPostMeta;
  content: BlogPostContent;
}
