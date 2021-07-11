import { AppProps } from 'next/app'
import '../styles/index.css'

import { ThemeProvider } from 'next-themes';
import React from 'react';
import '../styles/index.css';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;

