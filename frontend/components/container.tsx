import { ReactNode, FunctionComponent } from 'react'

type Props = {
  children?: ReactNode
  classes?: string
}

const Container: FunctionComponent = ({ children, classes }: Props) => {
  return <div className={`container mx-auto px-6 ${classes}`}>{children}</div>
}

export default Container
