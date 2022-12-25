import React from 'react';
import { AppProps } from 'next/app';
import { NearEnvironment, NearEnvironmentProvider } from '../../src';
import { NearClient } from '../../src/core/client';
import { NearProvider, NearProviderState } from '../../src/core/near';
import '@near-wallet-selector/modal-ui/styles.css';

export const NFT_CONTRACT_NAME = 'mfight-nft_v2.testnet';
export const FT_CONTRACT_NAME = 'mfight-ft.testnet';

type MyAppProps = AppProps & { nearState?: NearProviderState; nearClient?: NearClient };

const MyApp: React.FC<MyAppProps> = function ({ Component, pageProps, nearClient }: MyAppProps) {
   return (
      <NearEnvironmentProvider defaultEnvironment={NearEnvironment.TestNet}>
         <NearProvider authContractId={NFT_CONTRACT_NAME} defaultClient={nearClient}>
            <Component {...pageProps} />
         </NearProvider>
      </NearEnvironmentProvider>
   );
};

export default MyApp;
