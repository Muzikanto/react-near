# NEAR React

Inspired by graphql (for the frontend) I decided to do the same for near.

## Setup

You'll need to install the package from npm `npm i react-near near-api-js`.

App

```tsx
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
```

Page

```tsx
import { NFT_CONTRACT_NAME, FT_CONTRACT_NAME } from './_app';
import { NEAR_GAS, useNearMutation, useNearQuery, useNearUser } from '../../src';
import { DefaultNftContractMetadata, useNftTokens } from '../../src/nft';
import React from 'react';
import { useFtBalanceOf, useFtTransfer } from '../../src/ft';
import { parseNearAmount } from 'near-api-js/lib/utils/format';
import useNearContractProvided from '../../src/contract/useNearContractProvided';

function Page() {
   const nftContract = useNearContractProvided();
   const user = useNearUser(NFT_CONTRACT_NAME);

   // NFT
   const { data: metadata, loading: loadingMeta } = useNearQuery<DefaultNftContractMetadata, {}>(
      'nft_metadata',
      {
         variables: {},
         // skip: true,
      },
   );
   const {
      data: collection,
      error: collectionError,
      loading: loadingCollection,
      refetch: refetchCollection,
   } = useNftTokens({
      variables: { limit: 5, from_index: '0' },
      poolInterval: 1000 * 60 * 5,
   });
   const { data: ftBalance = '0', refetch: refetchFtBalance } = useFtBalanceOf({
      variables: { account_id: user.address as string },
      poolInterval: 1000 * 60 * 5,
      skip: !user.isConnected,
   });

   const [amountToTransfer, setAmountToTransfer] = React.useState(1);
   const [ftTransfer] = useFtTransfer({ contract: FT_CONTRACT_NAME, gas: NEAR_GAS });

   return (
      <div>
         {!user.isConnected ? (
            <div>
               <button onClick={() => user.connect('NEAR Example title')}>connect</button>
            </div>
         ) : (
            <div>
               <div>
                  <p>User</p>

                  <p>Address: {user.address}</p>
                  <p>{user.balance} NEAR</p>
                  <p>{ftBalance} MFIGT</p>
                  <button onClick={() => user.disconnect()}>disconnect</button>
               </div>

               <hr />

               <div>
                  <p>Nft Information</p>

                  {loadingMeta ? <p>Loading ...</p> : <p>Metadata: {JSON.stringify(metadata)}</p>}
                  {loadingCollection ? (
                     <p>Loading ...</p>
                  ) : collectionError ? (
                     <p>Error: {collectionError.message}</p>
                  ) : (
                     <div style={{ display: 'flex' }}>
                        {collection
                           ? collection.length > 0
                              ? collection.map((el) => (
                                   <div style={{ marginRight: 16 }}>
                                      <img
                                         src={
                                            metadata
                                               ? metadata.base_uri + '/' + el.metadata.media
                                               : ''
                                         }
                                         style={{
                                            width: 70,
                                            height: 100,
                                            objectFit: 'contain',
                                            border: 'solid 1px black',
                                            padding: 4,
                                         }}
                                         alt=''
                                      />
                                   </div>
                                ))
                              : 'Empty collection'
                           : ''}
                     </div>
                  )}
               </div>

               <hr />

               <div>
                  <p>Example call method</p>

                  <button
                     onClick={() => {
                        ftTransfer(
                           {
                              receiver_id: 'muzikant.testnet',
                              amount: parseNearAmount(amountToTransfer.toString()) as string,
                           },
                           parseNearAmount('0.01') as string,
                        ).then(() => {
                           refetchFtBalance().then();
                           user.refreshBalance().then();
                        });
                     }}
                  >
                     Transfer FT
                  </button>
               </div>
            </div>
         )}
      </div>
   );
}

export default Page;
```

### Api

-  Nft
   -  [x] nft_approve
   -  [x] nft_is_approved
   -  [x] nft_metadata
   -  [x] nft_revoke
   -  [x] nft_revoke_all
   -  [x] nft_supply_for_owner
   -  [x] nft_token
   -  [x] nft_tokens
   -  [x] nft_tokens_for_owner
   -  [x] nft_total_supply
   -  [x] nft_transfer
   -  [x] nft_transfer_call
-  Ft
   -  [x] ft_transfer
   -  [x] ft_balance_of
