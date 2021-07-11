import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { Section } from '../types/section'

const postsDirectory = join(process.cwd(), '_posts')

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

export function getPostBySlug(slug: string[], fields: string[] = [],) {
  //@ts-ignore
  const realSlug = slug[0].replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const md = matter(fileContents, { excerpt: true, sections: true })

  type Items = {
    [key: string]: string | Section[]
  }

  const items: Items = {}

  md.sections.unshift({
    key: '0',
    data: JSON.stringify(md.data),
    content: md.content
  })

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = md.content
    }
    if (field === 'sections') {
      items[field] = md.sections
    }
    if (md.data[field]) {
      items[field] = md.data[field]
    }
  })

  return items
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug([slug], fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts
}
