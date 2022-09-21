import React from 'react';
import { NextPage } from 'next';
import { NFT_CONTRACT_NAME, useNftContract, useFtContract } from './_app';
import { NEAR_GAS, useNearQuery, useNearUser } from 'react-near';
import { useNftTokens } from 'react-near/standards';
import { useFtBalanceOf, useFtTransfer } from 'react-near/standards';
import { formatNearPrice, parseNearAmount } from 'react-near/utils';
import { NftContractMetadata } from 'react-near/standards/nft/types';

const Page: NextPage = function () {
   const nftContract = useNftContract();
   const ftContract = useFtContract();
   const nearUser = useNearUser(NFT_CONTRACT_NAME);

   // NFT
   const { data: metadata, loading: loadingMeta } = useNearQuery<NftContractMetadata, {}>(
      'nft_metadata',
      {
         contract: nftContract,
         variables: {},
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
   } = useFtBalanceOf({
      contract: ftContract,
      variables: { account_id: nearUser.address as string },
      poolInterval: 1000 * 60 * 5,
      ssr: true,
      skip: !nearUser.isConnected,
   });

   const [amountToTransfer, setAmountToTransfer] = React.useState(1);
   const [ftTransfer] = useFtTransfer({
      contract: ftContract,
      gas: NEAR_GAS,
   });

   const handleTransfer = async () => {
      return ftTransfer(
         {
            receiver_id: 'muzikant.testnet',
            amount: parseNearAmount(amountToTransfer.toString()) as string,
         },
         parseNearAmount('0.01') as string,
      );
   };

   return (
      <div>
         <p>Data From SSR: {ftBalance} MFIGT</p>

         {!nearUser.isConnected ? (
            <div>
               <button onClick={() => nearUser.connect('NEAR Example title')}>connect</button>
            </div>
         ) : (
            <div>
               <div>
                  <p>User</p>

                  <p>Address: {nearUser.address}</p>
                  <p>{nearUser.balance} NEAR</p>
                  <p>{formatNearPrice(ftBalance).toFixed(2)} MFIGT</p>
                  <button onClick={() => nearUser.disconnect()}>disconnect</button>
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

                  <button onClick={handleTransfer}>Transfer FT</button>
               </div>
            </div>
         )}
      </div>
   );
};

export default Page;
