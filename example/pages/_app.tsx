import React from 'react';
import { AppProps } from 'next/app';
import {
   NearContractProvider,
   NearEnvironment,
   NearEnvironmentProvider,
   NearProvider,
   useNearContract,
} from '../../src';

export const NFT_CONTRACT_NAME = 'mfight-nft_v2.testnet';
export const FT_CONTRACT_NAME = 'mfight-ft.testnet';

function WrappedContract({ children }: { children: React.ReactNode }) {
   const contract = useNearContract(NFT_CONTRACT_NAME, {
      viewMethods: ['nft_tokens_for_owner', 'nft_metadata', 'nft_tokens'],
      changeMethods: [],
   });

   return <NearContractProvider contract={contract}>{children}</NearContractProvider>;
}

function WrappedNear({ children }: { children: React.ReactNode }) {
   return (
      <NearEnvironmentProvider defaultEnvironment={NearEnvironment.TestNet}>
         <NearProvider>
            <WrappedContract>{children}</WrappedContract>
         </NearProvider>
      </NearEnvironmentProvider>
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
