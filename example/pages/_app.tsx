import React from 'react';
import { AppInitialProps, AppProps } from 'next/app';
import { NearEnvironment, NearEnvironmentProvider, NearProvider, useNearContract } from '../../src';
import { AppContext } from 'next/dist/pages/_app';
import { makeNearProviderState, NearProviderState } from '../../src/NearProvider';
import * as nearApi from 'near-api-js';
import createNearClient, { encodeRequest, NearClient } from '../../src/core/client';
import { collectNearData } from '../../src/collectNearInfo';
import { FtContract } from '../../src/standards/ft/types';
import { StorageContract } from '../../src/standards/storage/types';
import { FT_METHODS } from '../../src/standards/ft/config';
import { STORAGE_METHODS } from '../../src/standards/storage/config';

export const NFT_CONTRACT_NAME = 'mfight-nft_v2.testnet';
export const FT_CONTRACT_NAME = 'mfight-ft.testnet';
const FT_CONTRACT_METHODS = {
   viewMethods: [...FT_METHODS.viewMethods, ...STORAGE_METHODS.viewMethods],
   changeMethods: [...FT_METHODS.changeMethods, ...STORAGE_METHODS.changeMethods],
};

export function useFtContract() {
   return useNearContract<FtContract & StorageContract>(FT_CONTRACT_NAME, FT_CONTRACT_METHODS);
}
export function useNftContract() {
   return useNearContract(NFT_CONTRACT_NAME, {
      viewMethods: ['nft_tokens_for_owner', 'nft_metadata', 'nft_tokens'],
      changeMethods: [],
   });
}

type MyAppProps = AppProps & { nearState?: NearProviderState; nearClient?: NearClient };

const MyApp: React.FC<MyAppProps> = function ({
   Component,
   pageProps,
   nearState,
   nearClient,
}: MyAppProps) {
   return (
      <NearEnvironmentProvider defaultEnvironment={NearEnvironment.TestNet}>
         <NearProvider defaultState={nearState} defaultClient={nearClient}>
            <Component {...pageProps} />
         </NearProvider>
      </NearEnvironmentProvider>
   );
};

// @ts-ignore
MyApp.getInitialProps = async ({
   Component,
   ctx,
}: AppContext): Promise<
   AppInitialProps & { nearState?: NearProviderState; nearClient?: NearClient }
> => {
   const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

   // get data on ssr
   const nearState = await makeNearProviderState({ environment: NearEnvironment.TestNet });
   const nearClient = createNearClient();

   // save contract
   const ftAccount = await nearState.near.account(FT_CONTRACT_NAME);
   const ftContract = new nearApi.Contract(ftAccount, FT_CONTRACT_NAME, FT_CONTRACT_METHODS);

   const contractKey = encodeRequest(FT_CONTRACT_NAME);
   nearClient.setContract(contractKey, ftContract);

   const props = {
      nearState,
      nearClient,
      pageProps,
   };

   // render for collect methods
   const { AppTree } = ctx;
   await collectNearData(nearClient, <AppTree {...props} />);

   return props;
};

export default MyApp;
