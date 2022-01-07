# NEAR React

Inspired by graphql (for the frontend) I decided to do the same for near.

## Setup

You'll need to install the package from npm `npm i react-near near-api-js`.

App

```tsx
ReactDOM.render(
   <NearProvider environment={NearEnvironment.TestNet}>
      <App />
   </NearProvider>,
   document.querySelector('#root'),
);
```

Page

```tsx
const CONTRACT_NAME = 'dev-123456789';

function Page() {
   const user = useNearUser(CONTRACT_NAME);

   // useNearQuery use caching for all requests
   const { data: metadata, loading: loadingMeta } = useNearQuery<{ id: string }, {}>(
      CONTRACT_NAME,
      'nft_metadata',
   );
   // or ... = useNftMetadata<NftMetadataArgs, NftMetadataResult>();
   const {
      data: collection,
      loading: loadingCollection,
      refetch: refetchCollection,
   } = useNearQuery<Array<{ src: string }>, {}>(CONTRACT_NAME, 'nft_tokens_for_owner', {
      variables: { address: user.address },
      skip: !user.address,
   });
   // or ... = useNftTokensForOwner<NftTokensForOwnerArgs, NftTokensForOwnerResult>();
   const [mint, { data: mintResult }] = useNearMutation<{ id: string }, { address: string }>(
      CONTRACT_NAME,
      'nft_mint',
      {
         gas: NEAR_GAS,
         onCompleted: (res) => {
            refetchCollection({ address: user.address as string }).then();
            user.refreshBalance().then();
         },
         onError: (err) => console.log(getNearError(err)),
      },
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
                        mint({ address: user.address as string })
                           .then()
                           .catch(() => {});
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

### Api

-  Nft
   -  [x] nft_approve
   -  [x] nft_is_approved
   -  [x] nft_metadata
   -  [x] nft_revoke
   -  [x] nft_revoke_all
   -  [x] nft_supply_for_owner
   -  [x] nft_token
   -  [x] nft_tokens
   -  [x] nft_tokens_for_owner
   -  [x] nft_total_supply
   -  [x] nft_transfer
   -  [x] nft_transfer_call
-  Ft
   -  [ ] ft_transfer
