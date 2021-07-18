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
import React, { useState, useEffect, useRef } from "react";
import EmojiButtons from "../../components/emojiButton";
import { useSocket } from 'use-socketio'
import Fly from '../../components/fly';
import { motion } from 'framer-motion'
import { useKey } from 'rooks';

type Props = {
    post: PostType
    morePosts: PostType[]
    slug: string[]
    section?: Section
    total?: Number
}

const Post = ({ post, section, morePosts, slug, total }: Props) => {
    const router = useRouter()
    if (!router.isFallback && !post?.slug) {
        return <ErrorPage statusCode={404} />
    }

    const ref = useRef(null);

    const { socket, subscribe, unsubscribe } = useSocket("reaction", (data) => {
        if (slug.join('/') === data.path)
            console.log('hello')
        //@ts-ignore
        ref.current.addEmoji(data);
    });

    const nextPage = () => {
        slug.push('1');
        router.push('/posts/' + slug.join('/'))
    }

    useKey(['ArrowRight'], () => {
        if (slug[1] && total && total !== Number(slug[1]) && total > Number(slug[1])) {
            slug[1] = String(Number(slug[1]) + 1)
            router.push('/posts/' + slug.join('/'))
        }
    });

    useKey(['ArrowLeft'], () => {
        if (slug[1] && total && Number(slug[1]) > 0) {
            slug[1] = String(Number(slug[1]) - 1)
            router.push('/posts/' + slug.join('/'))
        }
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
                                    <article className="mb-32 m-auto">
                                        {Head({ customMeta: meta })}
                                        <PostHeader
                                            title={post.title}
                                            coverImage={post.coverImage}
                                            date={post.date}
                                            author={post.author}
                                        />
                                        <PostBody content={post.content} />
                                        <button
                                            onClick={nextPage}
                                            className="mx-3 bg-black dark:bg-white hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white border border-black dark:border-white text-white dark:text-black font-bold py-3 px-12 lg:px-8 duration-200 transition-colors lg:mb-0"
                                        >
                                            Checkout prsnts 🍿
                                        </button>
                                    </article>
                                </div>
                            </Container>
                            <Footer />
                        </Layout >
                    </>
                ) : total && section?.content ? (
                    <>
                        <motion.div className='overflow-hidden'
                            drag="x"
                            onDragEnd={
                                (event, info) => {
                                    if (total >= Number(slug[1])) {
                                        if (info.velocity.x < -500 && total !== Number(slug[1])) {
                                            // right to left // next page
                                            slug[1] = String(Number(slug[1]) + 1)
                                            router.push('/posts/' + slug.join('/'))
                                        } else if (info.velocity.x > 500 && Number(slug[1]) > 0) {
                                            // exact opposite // next page
                                            slug[1] = String(Number(slug[1]) - 1)
                                            router.push('/posts/' + slug.join('/'))
                                        }
                                    }
                                }
                            }
                            dragDirectionLock
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.1}
                        >
                            <div className='container mx-auto px-6 flex flex-col min-h-screen relative'>
                                <Header />
                                {Head({ customMeta: meta })}
                                <div
                                    className="flex drag h-full justify-center items-center flex-1">
                                    <PostBody content={section.content} />
                                </div>
                                <Fly ref={ref} classes="inset-x-2/4 absolute" />
                            </div>
                            <EmojiButtons path={`${slug.join('/')}`} classes="z-20" />
                        </motion.div>
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
        const { section, post, total } = getSectionBySlug(params.slug)
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
                total: total
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
        fallback: 'blocking',
    }
}
