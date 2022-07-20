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
   const {
      data: ftBalance = '0',
      refetch: refetchFtBalance,
      error,
   } = useFtBalanceOf({
      variables: { account_id: user.address as string },
      poolInterval: 1000 * 60 * 5,
      skip: !user.isConnected,
      // mock: async () => {
      //    throw new Error('test')
      // },
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
                  <p onClick={() => refetchFtBalance().catch(() => {})}>User</p>

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
