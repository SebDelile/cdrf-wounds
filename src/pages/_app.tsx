import type { AppProps } from 'next/app';
import '../styles/global.css';
import Footer from '@/components/Footer';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Un calculateur de blessure pour le jeu Confrontation"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
