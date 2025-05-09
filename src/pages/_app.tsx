// src/pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../contexts/AuthContext';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <Head>
                <title>Collaborative Notes Dashboard</title>
                <meta name="description" content="A collaborative notes application" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Component {...pageProps} />
        </AuthProvider>
    );
}

export default MyApp;