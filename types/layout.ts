import PostType from './post';

export interface MetaProps
    extends Pick<PostType, 'date' | 'ogImage' | 'title' | 'excerpt'> {
    /**
     * For the meta tag `og:type`
     */
    type?: string;
}