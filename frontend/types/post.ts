import Author from './author'
import { Section } from './section'

type PostType = {
  slug: string
  title: string
  date: string
  coverImage: string
  author: Author
  excerpt: string
  ogImage: {
    url: string
  }
  content: string
  section: Section
}

export default PostType
