import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';
import "../styles/globals.css";
import Head from 'next/head'
import { StateContextProvider } from '../context';

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Goerli;

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider desiredChainId={activeChainId}>
      <Head>
        <link rel="icon" type="image/x-icon" href="/pledgePal_logo.png"></link>
        <title>PledgePal</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"></link>
      </Head>
      <StateContextProvider>
        <Component {...pageProps} />
      </StateContextProvider>
    </ThirdwebProvider>
  );
}

export default MyApp
