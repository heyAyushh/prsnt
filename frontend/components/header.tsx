import Link from 'next/link'
import ThemeSwitch from './ThemeSwitcher'

const Header = () => {
  return (
    <div className="flex flex-row justify-between py-2 mx-auto w-100">
      <div className="mt-8">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20">
          <Link href="/">
            <a className="hover:underline">Blog</a>
          </Link>
          .
        </h2>
      </div>


      <div className="mt-8 justify-end right-0">
        <ThemeSwitch />
      </div>
    </div>
  )
}

export default Header
