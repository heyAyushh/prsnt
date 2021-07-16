import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import Layout from '../../components/layout'
import { getPostBySlug, getAllPosts, getSectionBySlug } from '../../lib/api'
import PostTitle from '../../components/post-title'
import Head from '../../components/Head'
import markdownToHtml from '../../lib/markdownToHtml'
import PostType from '../../types/post'
import { MetaProps } from '../../types/layout'
import Section from '../../types/section'
import Footer from '../../components/footer'
import socketIOClient from "socket.io-client";
import React, { useState, useEffect } from "react";
import EmojiButtons from "../../components/emojiButton";
import { useSocket } from 'use-socketio'

type Props = {
    post: PostType
    morePosts: PostType[]
    slug: string[]
    section?: Section
}

const Post = ({ post, section, morePosts, slug }: Props) => {
    const router = useRouter()
    if (!router.isFallback && !post?.slug) {
        return <ErrorPage statusCode={404} />
    }

    const { socket, subscribe, unsubscribe } = useSocket("reaction", (data) => {
        if (slug.join('/') === data.path)
            console.log(data)
    });


    const meta: MetaProps = {
        date: post.date,
        title: post.title,
        excerpt: post.excerpt,
        ogImage: post.ogImage,
        type: 'website',
    }

    return (
        <>
            {
                router.isFallback ? (
                    <PostTitle>Loading…</PostTitle>
                ) : post?.content ? (
                    <>
                        <Layout>
                            <Container>
                                <Header />
                                <div className="flex">

                                    <article className="mb-32 m-auto text-center">
                                        {Head({ customMeta: meta })}
                                        <PostHeader
                                            title={post.title}
                                            coverImage={post.coverImage}
                                            date={post.date}
                                            author={post.author}
                                        />
                                        <PostBody content={post.content} />
                                    </article>
                                </div>
                            </Container>
                            <Footer />
                        </Layout >
                    </>
                ) : section?.content ? (
                    <>
                        <Container >
                            <div className='flex flex-col min-h-screen'>
                                <Header />
                                {Head({ customMeta: meta })}
                                <div className="flex h-full justify-center items-center flex-1">
                                    <PostBody content={section.content} />
                                </div>
                                <EmojiButtons path={`${slug.join('/')}`} />
                            </div>
                        </Container>
                    </>
                ) : <></>
            }
        </>
    )
}

export default Post

type Params = {
    params: {
        slug: string[],
    }
}

export async function getStaticProps({ params }: Params) {

    if (params.slug.length === 1) {
        const post = getPostBySlug(params.slug[0], [
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
                slug: params.slug,
            },
        }
    } else {
        const { section, post } = getSectionBySlug(params.slug)
        const content = await markdownToHtml(String(section.content) || '')

        return {
            props: {
                post: {
                    ...post,
                },
                section: {
                    ...section,
                    content,
                },
                slug: params.slug,
            },
        }
    }

}

export async function getStaticPaths() {

    const posts = getAllPosts(['slug', 'sections'])
    const paths = posts.map((p, i) => {
        //@ts-ignore get all section keys
        let pa = (p.sections.map(sc => {
            return {
                params: {
                    slug: [p.slug, `${sc.key}`]
                }
            }
        }))

        // for default page
        pa.unshift({
            params: {
                slug: [p.slug]
            }
        })

        return pa
    }).flat(1)

    return {
        paths: paths,
        fallback: false,
    }
}
