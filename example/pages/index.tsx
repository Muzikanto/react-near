import { CONTRACT_NAME } from './_app';
import { NEAR_GAS, useNearMutation, useNearQuery, useNearUser } from '../../src';
import { DefaultNftContractMetadata, DefaultNftToken } from '../../src/nft';
import React from 'react';

function Page() {
   // const contract = useNearContractProvided();
   const user = useNearUser(CONTRACT_NAME);

   // useNearQuery use caching for all requests
   const { data: metadata, loading: loadingMeta } = useNearQuery<DefaultNftContractMetadata, {}>(
      'nft_metadata',
      {
         variables: {},
         update: ({ cache }, { data }) => {
            cache.set('METADATA', data);
         },
         // skip: true,
      },
   );
   const {
      data: collection,
      error: collectionError,
      loading: loadingCollection,
      refetch: refetchCollection,
   } = useNearQuery<DefaultNftToken[], {}>('nft_tokens_for_owner', {
      variables: { account_id: user.address },
      skip: !user.address,
      debug: true,
   });

   const [mint, { data: mintResult, loading: mintLoading }] = useNearMutation<
      { id: string },
      { address: string }
   >('nft_mint', { debug: true, gas: NEAR_GAS });

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

                  <p>
                     {user.address} {user.balance} NEAR
                  </p>
                  <button onClick={() => user.disconnect()}>disconnect</button>
               </div>

               <div>
                  <p>Nft</p>

                  {loadingMeta ? <p>Loading ...</p> : <p>Metadata: {JSON.stringify(metadata)}</p>}
                  {loadingCollection ? (
                     <p>Loading ...</p>
                  ) : collectionError ? (
                     <p>Error: {collectionError.message}</p>
                  ) : (
                     <div>
                        {collection
                           ? collection.length > 0
                              ? collection.map((el) => <p>{el.token_id}</p>)
                              : 'Empty collection'
                           : ''}
                     </div>
                  )}
                  <button
                     onClick={() => {
                        mint({ address: user.address as string }).then(() => {
                           refetchCollection({ address: user.address as string }).then();
                           user.refreshBalance().then();
                        });
                     }}
                  >
                     mint nft
                  </button>
               </div>
            </div>
         )}
         {/*<Test />*/}
      </div>
   );
}

const Test = React.memo(function () {
   const { data: metadata, loading: loadingMeta } = useNearQuery<DefaultNftContractMetadata, {}>(
      'nft_metadata',
      {
         variables: {},
         update: ({ cache }, { data }) => {
            cache.set('METADATA', data);
         },
      },
   );
   console.log(loadingMeta, metadata);

   return <div>{loadingMeta ? 'loading...' : 'data'}</div>;
});

export default Page;
