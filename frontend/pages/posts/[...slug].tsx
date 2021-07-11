import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import Layout from '../../components/layout'
import { getPostBySlug, getAllPosts } from '../../lib/api'
import PostTitle from '../../components/post-title'
import Head from '../../components/Head'
import markdownToHtml from '../../lib/markdownToHtml'
import PostType from '../../types/post'
import { MetaProps } from '../../types/layout'

type Props = {
  post: PostType
  morePosts: PostType[]
}

const Post = ({ post, morePosts }: Props) => {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  const meta: MetaProps = {
    date: post.date,
    title: post.title,
    excerpt: post.excerpt,
    ogImage: post.ogImage,
    type: 'website',
  }

  return (
    <Layout>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              {Head({ customMeta: meta })}
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
              />
              <PostBody content={post.content} />
            </article>
          </>
        )}
      </Container>
    </Layout >
  )
}

export default Post

type Params = {
  params: {
    slug: string[],
  }
}

export async function getStaticProps({ params }: Params) {

  console.log(params)

  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
    'sections'
  ])
  const content = await markdownToHtml(String(post.content) || '')

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export async function getStaticPaths() {

  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map((posts) => {
      return {
        params: {
          slug: [posts.slug],
        },
      }
    }),
    fallback: false,
  }
}
