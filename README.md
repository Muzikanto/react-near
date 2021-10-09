# NEAR React

Use react context and hooks to configure and interact with NEAR. (Worked with SSR Render)

[Reference Docs](https://mehtaphysical.github.io/near-react-hooks)

## Setup

You'll need to install the package from npm `npm i near-react-hooks near-api-js`.

Then wrap your application with the `NearProvider` passing it an environment:

-  `mainnet`
-  `testnet`
-  `betanet`

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { NearProvider, NearEnvironment } from 'react-near';
import App from './App';

ReactDOM.render(
   <NearProvider environment={NearEnvironment.TestNet}>
      <App />
   </NearProvider>,
   document.querySelector('#root'),
);
```

You can more finely tune the NEAR configuration by passing additional props
no the `NearProvider`. See the docs for more information.

Once the application is wrapped with the `NearProvider` your can access the
NEAR connection, the NEAR wallet, and NEAR contract using react hooks from
any component in the application.

```tsx
import React from 'react';
import {
   useNear,
   useNearAccount,
   useNearContract,
   useNearUser,
   useNearWallet,
   NearEnvironment,
} from 'react-near';

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
                     contract.mint();
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
```
