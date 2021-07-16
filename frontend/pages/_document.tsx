import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
        <body className="bg-white  dark:bg-black text-gray-900 dark:text-white ">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
