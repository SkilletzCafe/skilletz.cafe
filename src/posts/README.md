# 📝 Blog Posts

This directory contains all the Markdown files for the Skilletz Cafe blog. Each file represents a single blog post.

## ✍️ Creating a New Post

To create a new blog post, use the provided script from the root of the project:

```bash
node scripts/create-blog-post.js "Your Post Title" "your-post-slug"
```

This will automatically create a new Markdown file with the correct naming convention and a basic template to get you started.

### Filename Convention

All posts must follow the `YYYY-MM-DD-your-post-slug.md` format. The `create-blog-post` script handles this for you.

- **`YYYY-MM-DD`**: The publication date.
- **`your-post-slug`**: A unique, URL-friendly identifier for the post.

This convention ensures that posts are chronologically organized and that each post has a unique, SEO-friendly URL.

## 📄 Frontmatter

Each post begins with a YAML frontmatter block that contains important metadata:

```yaml
---
title: 'Your Post Title'
excerpt: 'A short, engaging summary of the post.'
author: 'Author Name'
date: 'YYYY-MM-DDTHH:mm:ssZ'
tags: 'comma, separated, tags'
featuredImage: '/images/blog/your-post-slug.jpg'
isPublished: false
readingTime: 5 # Estimated reading time in minutes
---
```

- **`title`**: The main title of the post.
- **`excerpt`**: A brief summary used for post listings and SEO.
- **`author`**: The name of the post's author.
- **`date`**: The ISO 8601 publication date and time.
- **`tags`**: A comma-separated list of tags for categorization.
- **`featuredImage`**: The path to the post's main image.
- **`isPublished`**: Set to `true` to make the post visible on the site.
- **`readingTime`**: An estimate of how long the post takes to read.

## 🚧 Drafts Directory

The `src/posts/drafts/` directory is a special place for work-in-progress posts.

- **Unpublished Content**: Anything in this folder will not be processed or published to the live site.
- **Git Ignored**: This directory is included in the project's `.gitignore` file, so your drafts will not be committed to version control. This keeps the repository clean and focused on published content.

It's the perfect spot to brainstorm ideas and write your posts before they're ready for the world! 🤫
