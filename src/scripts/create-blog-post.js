#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get command line arguments
const args = process.argv.slice(2);
const title = args[0];
let slug = args[1];

if (!title || !slug) {
  console.log('Usage: node src/scripts/create-blog-post.js "Post Title" "post-slug"');
  console.log(
    'Example: node src/scripts/create-blog-post.js "My New Blog Post" "my-new-blog-post"'
  );
  console.log('');
  console.log('This script will:');
  console.log("- Create a new blog post with today's date");
  console.log('- Generate a markdown file in src/posts/');
  console.log('- Include frontmatter with common fields');
  console.log('- Check for slug conflicts');
  process.exit(1);
}

// Sanitize slug: lowercase, replace spaces with dashes, and remove special characters
slug = slug
  .toLowerCase()
  .replace(/\s+/g, '-')
  .replace(/[^a-z0-9-]/g, '');

const postsDirectory = path.join(__dirname, '..', 'posts');

// Check if slug already exists
const existingFiles = fs.readdirSync(postsDirectory);
const slugExists = existingFiles.some((file) => {
  // Check for both .md and .mdx files
  const existingSlug = file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.mdx?$/, '');
  return existingSlug === slug;
});

if (slugExists) {
  console.log(`❌ Error: Slug "${slug}" is already in use.`);
  console.log('Please choose a unique slug for your post.');
  process.exit(1);
}

// Get current date in YYYY-MM-DD format
const today = new Date();
const dateStr = today.toISOString().split('T')[0];

// Create filename with date prefix
const filename = `${dateStr}-${slug}.md`;
const filePath = path.join(postsDirectory, filename);

// Create the blog post content
const blogPostContent = `---
title: "${title}"
excerpt: "A brief description of your blog post that will appear in listings."
author: "Your Name"
date: "${today.toISOString()}"
tags: "tag1, tag2"
featuredImage: "/images/blog/${slug}.jpg"
isPublished: false
readingTime: 5
---

# ${title}

Write your blog post content here...

## Introduction

Start with an engaging introduction that hooks your readers.

## Main Content

Add your main content here with proper markdown formatting.

### Subsection

You can use headers to organize your content:

- **Bold text** for emphasis
- *Italic text* for subtle emphasis
- Lists for easy reading

## Conclusion

Wrap up your post with a compelling conclusion.`;

// Check if file already exists
if (fs.existsSync(filePath)) {
  console.log(`❌ Error: File ${filename} already exists!`);
  process.exit(1);
}

// Write the new blog post file
fs.writeFileSync(filePath, blogPostContent);

console.log(`✅ Created new blog post: ${filename}`);
console.log(`📁 Location: src/posts/${filename}`);
console.log(`🔗 URL will be: /blog/${slug}`);
console.log(`📸 Add featured image at: public/images/blog/${slug}.jpg`);
console.log(`\n📝 Next steps:`);
console.log(`1. Edit the frontmatter (title, excerpt, author, tags, etc.)`);
console.log(`2. Add your content below the frontmatter`);
console.log(`3. Set isPublished: true when ready to publish`);
console.log(`4. Add a featured image`);
