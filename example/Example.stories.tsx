import NearProvider, { NearEnvironment } from '../src/NearProvider';
import { useNear, useNearAccount, useNearContract, useNearUser, useNearWallet } from '../src/hooks';
import React from 'react';

export default {
   title: 'Components',
   parameters: {
      // component: BaseExample,
   },
};

function App() {
   const near = useNear();
   const wallet = useNearWallet();
   const account = useNearAccount();
   const contract = useNearContract('dev-123456789', {
      viewMethods: ['mint'],
      changeMethods: [],
   });
   const user = useNearUser(contract);

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
                     contract.fCall('mint', {}, 10); // attach 10 NEAR
                     user.refreshBalance();
                  }}
               >
                  mint
               </button>

               <button onClick={() => user.disconnect()}>disconnect</button>
            </div>
         )}
      </div>
   );
}

export function Example() {
   return (
      <NearProvider networkId={NearEnvironment.TestNet}>
         <App />
      </NearProvider>
   );
}
