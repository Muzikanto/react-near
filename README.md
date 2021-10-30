# NEAR React

Use react context and hooks to configure and interact with NEAR. (Worked with SSR Render)

[Reference Docs](https://mehtaphysical.github.io/react-near)

## Setup

You'll need to install the package from npm `npm i react-near near-api-js`.

Then wrap your application with the `NearProvider` passing it an environment:

-  `mainnet`
-  `testnet`
-  `betanet`

```tsx
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

Wrap Page (or App)

```tsx
function WrappedContract() {
   const contract = useNearContract('dev-123456789', {
      viewMethods: ['nft_tokens_for_owner', 'nft_metadata'],
      changeMethods: [],
   });

   return (
      <NearContractProvider contract={contract}>
         <Page />
      </NearContractProvider>
   );
}
```

```tsx
function Page() {
   const user = useNearUser(contractId);

   const { data: metadata } = useNearQuery<{ id: string }, {}>('nft_metadata', {
      variables: {},
   });
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
               <div>Metadata: {JSON.stringify(metadata)}</div>
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
```
