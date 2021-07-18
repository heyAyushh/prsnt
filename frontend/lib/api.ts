import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import Section, { SectionNSlug } from '../types/section'
import PostType from '../types/post'

const postsDirectory = join(process.cwd(), '_posts')

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}


export function getSectionBySlug(slug: string[], fields: string[] = []): SectionNSlug {

  const post = getPostBySlug(slug[0], ['sections', 'ogImage', 'excerpt', 'title', 'date', 'slug']);
  // @ts-ignore
  const section: Section = post.sections[Number(slug[1])]
  // @ts-ignore
  const postWithoutSections = (({ sections, ...o }: PostType) => o)(post)

  return { section, post: postWithoutSections, total: post.sections.length - 1 };
}

export function getPostBySlug(slug: string, fields: string[] = [],) {
  const realSlug = slug.toString().replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const md = matter(fileContents, { excerpt: true, sections: true })

  interface Items {
    /**
     * For the meta tag `og:type`
     */
    [key: string]: string | Section[]
  }

  const items: Items = {}

  //@ts-ignore
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
      //@ts-ignore
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
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts
}
