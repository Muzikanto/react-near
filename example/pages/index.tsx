import { NFT_CONTRACT_NAME, FT_CONTRACT_NAME, useNftContract, useFtContract } from './_app';
import { NEAR_GAS, NearContext, useNearQuery, useNearUser } from '../../src';
import { DefaultNftContractMetadata, useNftTokens } from '../../src/nft';
import React from 'react';
import { useFtBalanceOf, useFtTransfer } from '../../src/ft';
import { parseNearAmount } from 'near-api-js/lib/utils/format';
import { NextPage } from 'next';
import {formatNearPrice} from "../../src/utils";

const Page: NextPage = function () {
   const nftContract = useNftContract();
   const ftContract = useFtContract();
   const user = useNearUser(NFT_CONTRACT_NAME);

   // NFT
   const { data: metadata, loading: loadingMeta } = useNearQuery<DefaultNftContractMetadata, {}>(
      'nft_metadata',
      {
         contract: nftContract,
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
      contract: nftContract,
      variables: { limit: 5, from_index: '0' },
      poolInterval: 1000 * 60 * 5,
   });
   const {
      data: ftBalance = '0',
      refetch: refetchFtBalance,
      loading,
      error,
   } = useFtBalanceOf({
      contract: ftContract,
      variables: { account_id: 'muzikant.testnet' },
      poolInterval: 1000 * 60 * 5,
      ssr: true
   });

   const [amountToTransfer, setAmountToTransfer] = React.useState(1);
   const [ftTransfer] = useFtTransfer({ contract: ftContract, gas: NEAR_GAS });

   return (
      <div>
         <p>Data From SSR: {ftBalance} MFIGT</p>

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
                  <p>{formatNearPrice(ftBalance).toFixed(2)} MFIGT</p>
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
                              ? collection.map((el, i) => (
                                   <div style={{ marginRight: 16 }} key={`item-${i}`}>
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
};

export default Page;
