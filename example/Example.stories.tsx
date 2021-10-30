import {
   NearProvider,
   NearEnvironment,
   useNearContract,
   useNearMutation,
   useNearQuery,
   useNearUser,
   NearContractProvider,
} from '../src/';
import React from 'react';

const contractId = 'cow-nft.testnet';

function Page() {
   const user = useNearUser(contractId);

   const [mint] = useNearMutation<{ id: string }, { address: string }>('mint', {});

   const [showMeta, setShowMeta] = React.useState(false);

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
               <button onClick={() => setShowMeta(!showMeta)}>toggle</button>
               {showMeta && <Collection />}
            </div>
         )}
      </div>
   );
}

function Collection() {
   const { data: metadata } = useNearQuery<{ id: string }, {}>('nft_metadata', {
      variables: {},
   });

   return <div>{JSON.stringify(metadata)}</div>;
}

// provide near contract
function WrappedContract() {
   const contract = useNearContract(contractId, {
      viewMethods: ['nft_tokens_for_owner', 'nft_metadata'],
      changeMethods: [],
   });

   return (
      <NearContractProvider contract={contract}>
         <Page />
      </NearContractProvider>
   );
}

// provide near state
function WrappedNear() {
   return (
      <NearProvider networkId={NearEnvironment.TestNet}>
         <WrappedContract />
      </NearProvider>
   );
}

export default WrappedNear;
