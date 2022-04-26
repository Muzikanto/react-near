import React from 'react';
import { AppProps } from 'next/app';
import {  } from '../../src/hooks';
import { NearEnvironment, NearProvider } from '../../src';
import useNearContract from "../../contract/useNearContract";
import NearContractProvider from "../../contract/NearContractProvider";

export const CONTRACT_NAME = 'mfclub-nft.testnet';

function WrappedContract({ children }: { children: React.ReactNode }) {
   const contract = useNearContract(CONTRACT_NAME, {
      viewMethods: ['nft_tokens_for_owner', 'nft_metadata'],
      changeMethods: [],
   });

   return <NearContractProvider contract={contract}>{children}</NearContractProvider>;
}

// provide near state
function WrappedNear({ children }: { children: React.ReactNode }) {
   return (
      <NearProvider networkId={NearEnvironment.TestNet}>
         <WrappedContract>{children}</WrappedContract>
      </NearProvider>
   );
}

function MyApp({ Component, pageProps }: AppProps) {
   return (
      <WrappedNear>
         <Component {...pageProps} />
      </WrappedNear>
   );
}

export default MyApp;
