# NEAR React

Use react context and hooks to configure and interact with NEAR.

[Reference Docs](https://mehtaphysical.github.io/near-react-hooks)

## Setup

You'll need to install the package from npm `npm i near-react-hooks near-api-js`.

Then wrap your application with the `NearProvider` passing it an environment:

* `mainnet`
* `testnet`
* `betanet`

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { NearProvider, NearEnvironment } from 'near-react-hooks'
import App from './App'

ReactDOM.render(
  <NearProvider environment={NearEnvironment.TestNet}>
    <App />
  </NearProvider>,
  document.querySelector('#root')
)
```

You can more finely tune the NEAR configuration by passing additional props
no the `NearProvider`. See the docs for more information.

Once the application is wrapped with the `NearProvider` your can access the
NEAR connection, the NEAR wallet, and NEAR contract using react hooks from
any component in the application.

```js
import React, { useEffect } from 'react'
import { useNear, useNearWallet, useNearContract } from 'near-react-hooks';

export default function App() {
  const near = useNear()
  const wallet = useNearWallet()
  const contract = useNearContract('dev-123457824879', {
    viewMethods: ['getCount'],
    changeMethods: ['decrement', 'increment']
  })

  useEffect(() => {
    if(!wallet.isSignedIn()) wallet.requestSignIn();
  }, []);

  if(!wallet.isSignedIn()) return null;
  
  return <h1>{wallet.getAccountId()}</h1>;
}
```
