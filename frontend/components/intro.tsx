import ThemeSwitch from './ThemeSwitcher'

const Intro = () => {
  return (
    <section className="justify-between flex-row flex items-center mt-16 mb-16 md:mb-12">
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        Blog.
      </h1>
      <div className="md:pr-8">
        <ThemeSwitch />
      </div>
    </section>
  )
}

export default Intro
