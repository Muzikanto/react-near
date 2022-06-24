# NEAR React

Inspired by graphql (for the frontend) I decided to do the same for near.

## Setup

You'll need to install the package from npm `npm i react-near near-api-js`.

App

```tsx
ReactDOM.render(
   <NearEnvironmentProvider>
      <NearProvider environment={NearEnvironment.TestNet}>
         <App />
      </NearProvider>
   </NearEnvironmentProvider>,
   document.querySelector('#root'),
);
```

Page

```tsx
const CONTRACT_NAME = 'mfight-nft_v2.testnet';

function Page() {
   const user = useNearUser(CONTRACT_NAME);

   // useNearQuery use caching for all requests
   const { data: metadata, loading: loadingMeta } = useNearQuery<DefaultNftContractMetadata>(
      'nft_metadata',
      { contract: CONTRACT_NAME },
   );
   // or ... = useNftMetadata<NftMetadataArgs, NftMetadataResult>();
   const {
      data: collection,
      loading: loadingCollection,
      refetch: refetchCollection,
   } = useNearQuery<NftTokensForOwnerResult, NftTokensForOwnerArgs>('nft_tokens_for_owner', {
      contract: CONTRACT_NAME,
      variables: { address: user.address },
      skip: !user.address,
      poolInterval: 30000,
   });
   // or ... = useNftTokensForOwner();
   const [mint, { data: mintResult }] = useNearMutation<DefaultNftToken, { receiver_id: string }>(
      'nft_mint',
      {
         contract: CONTRACT_NAME,
         gas: NEAR_GAS,
         onCompleted: (res) => {
            refetchCollection({ receiver_id: user.address as string }).then();
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
                        mint({ receiver_id: user.address as string }, parseNearAmount('10'))
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
   -  [x] ft_transfer
   -  [x] ft_balance_of
