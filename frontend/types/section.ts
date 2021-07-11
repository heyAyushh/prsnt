import { MetaProps } from "./layout"

type Section = {
    key: string
    data: string
    content: string
}

export type SectionNSlug = {
    section: Section,
    post: MetaProps
}

export default Section