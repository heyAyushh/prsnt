import Container from './container'
import cn from 'classnames'
import { EXAMPLE_PATH } from '../lib/constants'
import ThemeSwitch from './ThemeSwitcher'

type Props = {
  preview?: boolean
}

const Alert = ({ preview }: Props) => {
  return (
    <div
      className={cn('border-b', {
        'bg-light-accent-7 border-light-accent-7 text-white dark:text-black dark:bg-dark-accent-7 dark:border-dark-accent-7': preview,
        'bg-light-accent-1 border-light-accent-2 dark:bg-dark-accent-1 dark:border-dark-accent-2': !preview,
      })}
    >
      <Container>
        <div className="py-2 text-center text-sm">
          {preview ? (
            <>
              This page is a preview.{' '}
              <a
                href="/api/exit-preview"
                className="underline hover:text-cyan duration-200 transition-colors"
              >
                Click here
              </a>{' '}
              to exit preview mode.
            </>
          ) : (
            <div className="py-2 mx-auto inset-x-0">
              <div className="ml-8 inset-x-0 right-0">
                s
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}

export default Alert
