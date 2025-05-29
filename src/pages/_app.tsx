import type { AppProps } from 'next/app';
import '../styles/global.css';
import Footer from '@/components/Footer';
import Head from 'next/head';
import Header from '@/components/Header';
import { Box } from '@mui/material';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Un calculateur de blessure pour le jeu Confrontation"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Calcul de blessure Confédé</title>
      </Head>
      <Header />
      <Box component={'main'}>
        <Component {...pageProps} />
      </Box>
      <Footer />
    </>
  );
}
