import NearProvider, { NearEnvironment } from '../src/NearProvider';
import { useNear, useNearContract, useNearUser, useNearWallet } from '../src/hooks';
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
   const contract = useNearContract('cow-nft.testnet', {
      viewMethods: ['name'],
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
