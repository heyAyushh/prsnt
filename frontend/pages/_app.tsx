import { AppProps } from 'next/app'
import '../styles/index.css'
import 'inter-ui/inter.css';

import { ThemeProvider } from 'next-themes';
import React from 'react';
import '../styles/index.css';
import { SocketIOProvider, useSocket } from "use-socketio";

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ThemeProvider attribute="class" enableSystem={true} defaultTheme="system" >
      <SocketIOProvider url={`${process.env.NEXT_PUBLIC_SERVER_URL}`}>
        <Component className='root' {...pageProps} />
      </SocketIOProvider>
    </ThemeProvider>
  );
};

export default MyApp;

