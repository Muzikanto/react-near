import React from 'react';
import { NextPage } from 'next';
import { NFT_CONTRACT_NAME, FT_CONTRACT_NAME } from './_app';
import {
   formatNearPrice,
   NEAR_GAS,
   parseNearAmount,
   useNearEnv,
   useNearQuery,
   useNearUser,
} from '../../src';
import { NftContractMetadata } from '../../src/standards/nft/types';
import { useFtBalanceOf, useFtTransfer, useNftTokens } from '../../src/standards';
import { useNearAccount } from '../../src/hooks/account';

const Page: NextPage = function () {
   const nearUser = useNearUser();
   const nearEnv = useNearEnv();
   const nearAccount = useNearAccount(nearUser.address);

   // NFT
   const { data: metadata, loading: loadingMeta } = useNearQuery<NftContractMetadata, {}>(
      'nft_metadata',
      {
         contract: NFT_CONTRACT_NAME,
         variables: {},
      },
   );
   const {
      data: collection,
      error: collectionError,
      loading: loadingCollection,
      refetch: refetchCollection,
   } = useNftTokens({
      contract: NFT_CONTRACT_NAME,
      variables: { limit: 5, from_index: '0' },
      poolInterval: 1000 * 60 * 5,
   });
   const { data: ftBalance = '0', refetch: refetchFtBalance } = useFtBalanceOf({
      contract: FT_CONTRACT_NAME,
      variables: { account_id: 'muzikant.testnet' as string },
      poolInterval: 1000 * 60 * 5,
      ssr: false,
   });

   const [amountToTransfer, setAmountToTransfer] = React.useState(1);
   const [ftTransfer] = useFtTransfer({
      contract: FT_CONTRACT_NAME,
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
               <button onClick={() => nearUser.connect()}>connect</button>
            </div>
         ) : (
            <div>
               <div>
                  <p>User</p>

                  <p>Address: {nearUser.address}</p>
                  <p>{nearAccount?.balance || '-'} NEAR</p>
                  <p>{formatNearPrice(ftBalance).toFixed(2)} MFIGT</p>
                  <p>env: {nearEnv.value}</p>
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
