# NEAR React

Inspired by graphql (for the frontend) I decided to do the same for near.

- provider Near, NearWallet, NearAccount and NearContract to the App
- use useNearQuery and useNearMutation for fetch data
- all fetched data are cached
- use basic functions to query for data (useNearNft, useNearNftMetadata, useNearNftTokensForOwner and others)

## Setup

You'll need to install the package from npm `npm i react-near near-api-js`.

Root

```tsx
ReactDOM.render(
   <NearProvider environment={NearEnvironment.TestNet}>
      <App />
   </NearProvider>,
   document.querySelector('#root'),
);
```

App

```tsx
const CONTRACT_NAME = 'dev-123456789';

function App() {
   const contract = useNearContract(CONTRACT_NAME, {
      viewMethods: ['nft_tokens_for_owner', 'nft_metadata'],
      changeMethods: ['nft_mint'],
   });

   return (
      <NearContractProvider contract={contract}>
         <Page />
      </NearContractProvider>
   );
}
```

Page

```tsx
function Page() {
   // const contract = useNearContractProvided();
   const user = useNearUser(CONTRACT_NAME);

   // useNearQuery use caching for all requests
   const { data: metadata, loading: loadingMeta } = useNearQuery<{ id: string }, {}>(
      'nft_metadata',
      {
         variables: {},
      },
   );
   const {
      data: collection,
      loading: loadingCollection,
      refetch: refetchCollection,
   } = useNearQuery<{ id: string }, {}>('nft_tokens_for_owner', {
      variables: { address: user.address },
      skip: !user.address,
   });
   const [mint, { data: mintResult }] = useNearMutation<{ id: string }, { address: string }>(
      'nft_mint',
      {},
   );

   return (
      <div>
         {!user.isConnected ? (
            <div>
               <button onClick={() => user.connect('NEAR Example title')}>connect</button>
            </div>
         ) : (
            <div>
               <div>
                  <span>User</span>

                  <span>
                     {user.address} {user.balance} NEAR
                  </span>
                  <button onClick={() => user.disconnect()}>disconnect</button>
               </div>

               <div>
                  <span>Nft</span>

                  {loadingMeta ? 'Loading ...' : <span>Metadata: {JSON.stringify(metadata)}</span>}
                  {loadingCollection ? (
                     'Loading...'
                  ) : (
                     <div>{collection && collection.map((el) => <img src={el.src} />)}</div>
                  )}
                  <button
                     onClick={() => {
                        mint({ address: user.address as string }).then(() => {
                           refetchCollection({ address: user.address as string }).then();
                           user.refreshBalance().then();
                        });
                     }}
                  >
                     mint nft
                  </button>
               </div>
            </div>
         )}
      </div>
   );
}
```
