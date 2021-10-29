import NearProvider, { NearEnvironment } from './src/NearProvider';
import {
   useNear,
   useNearAccount,
   useNearContract,
   useNearMutation,
   useNearQuery,
   useNearUser,
   useNearWallet,
} from './src/hooks';
import React from 'react';

const contractId = 'cow-nft.testnet';

function App() {
   const near = useNear();
   const wallet = useNearWallet();
   const account = useNearAccount();
   const contract = useNearContract(contractId, {
      viewMethods: ['nft_tokens_for_owner'],
      changeMethods: [],
   });
   const user = useNearUser(contractId);

   const [mint] = useNearMutation<{ id: string }, { address: string }>(contract, 'mint', {});
   const { data: collection } = useNearQuery<
      { id: string },
      { from_index: string; account_id: string }
   >(contract, 'nft_tokens_for_owner', {
      skip: !user.address,
      variables: { from_index: '0', account_id: user.address as string },
   });

   const [showCollection, setShowCollection] = React.useState(false);

   return (
      <div>
         {!user.isConnected ? (
            <div>
               <button onClick={() => user.connect('NEAR Example title')}>connect</button>
            </div>
         ) : (
            <div>
               <span>
                  {user.address} {user.balance} NEAR
               </span>
               <button
                  onClick={() => {
                     if (user.address) {
                        mint({ address: user.address }).then(() => {
                           user.refreshBalance().then();
                        });
                     }
                  }}
               >
                  mint
               </button>

               <button onClick={() => user.disconnect()}>disconnect</button>
               <button onClick={() => setShowCollection(!showCollection)}>toggle</button>
               {showCollection && <Collection />}
            </div>
         )}
      </div>
   );
}

function Collection() {
   const user = useNearUser(contractId);
   const contract = useNearContract(contractId, {
      viewMethods: ['nft_tokens_for_owner'],
      changeMethods: [],
   });

   const { data: collection } = useNearQuery<
      { id: string },
      { from_index: string; account_id: string }
   >(contract, 'nft_tokens_for_owner', {
      skip: !user.address,
      variables: { from_index: '0', account_id: user.address as string },
   });

   return <div>test</div>;
}

export function Example() {
   return (
      <NearProvider networkId={NearEnvironment.TestNet}>
         <App />
      </NearProvider>
   );
}

export default Example;
