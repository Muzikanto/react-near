# NEAR React

Inspired by graphql (for the frontend) I decided to do the same for near.

## Navigation

-  [install](#setup)
-  [example](#quick-example) Quick example
-  [api](#api)
   -  [NearProvider](#nearprovider) define near in app
   -  [NearEnvironmentProvider](#nearenvironmentprovider) switch env (TestNet, MainNet..)
   -  [Config](#define-and-use-contracts) define contracts
   -  [useNearUser](#usenearuser) complex example
   -  [useNearUser](#batch-transactions) batch Transactions
   -  [useNearQuery](#usenearquery) use view methods
   -  [useNearMutation](#usenearmutation) use change methods
-  [contracts](#contracts)
   -  [ft](#ft) Fungible Token Standard (nep141) methods
   -  [nft](#nft) Non Fungible Token Standard (nep171) methods
   -  [mt](#mt) Multi Token Standard (nep245) methods
   -  [storage](#storage) Storage Management (nep145) methods

## Setup

You'll need to install the package from npm `npm i react-near near-api-js`.

## Quick Example

```typescript jsx
// config.ts
const FT_CONTRACT_NAME = 'mfight-ft.testnet';

function useFtContract() {
   return useNearContract(FT_CONTRACT_NAME, {
      viewMethods: ['ft_balance_of'],
      changeMethods: ['ft_transfer'],
   });
}

// app.tsx
function MyApp({ Component, pageProps }: AppProps) {
   return (
      <NearEnvironmentProvider defaultEnvironment={NearEnvironment.TestNet}>
         <NearProvider>
            <Component {...pageProps} />
         </NearProvider>
      </NearEnvironmentProvider>
   );
}

// page.tsx
function Page() {
   const nearUser = useNearUser(FT_CONTRACT_NAME);
   const ftContract = useFtContract();

   const { data: ftBalance = '0', refetch: refetchFtBalance } = useFtBalanceOf({
      contract: ftContract,
      variables: { account_id: nearUser.address as string },
      poolInterval: 1000 * 60 * 5,
      skip: !nearUser.isConnected,
   });
   const [transfer] = useFtTransfer({
      onError: console.log,
      gas: NEAR_GAS,
   });

   const handleTransfer = () =>
      transfer({ receiver_id: 'example.near', amount: 1000 }, parseNearAmount('0.01'));
   const handleSignIn = () => nearUser.connect();

   return (
      <div>
         {nearUser.isConnected && (
            <>
               <span>NEAR balance: {nearUser.balance}</span>
               <span>FT balance: {formatNearAmount(ftBalance, 24)}</span>
               <button onClick={handleTransfer}>transfer ft</button>
            </>
         )}
         {!nearUser.isConnected && <button onClick={receiver_id}>Connect NEAR</button>}
      </div>
   );
}
```

## Api

#### NearProvider

Create a context of NEAR in the application

```tsx
// app.tsx
function MyApp({ Component, pageProps }: AppProps) {
   return (
      <NearProvider>
         <Component {...pageProps} />
      </NearProvider>
   );
}
function Page() {
   const near = useNear(); // nearApi.Near
   const wallet = useNearWallet(); // nearApi.WalletConnection
   const account = useNearAccount(); // nearApi.Account
   const nearUser = useNearUser('example-contract.near');

   return (
      <>
         <span>User Address: {account.address}</span>
         <span>Balance: {account.balance} NEAR</span>
      </>
   );
}
```

#### NearEnvironmentProvider

The state of ENV will be saved in a cookie

```tsx
// app.tsx
function MyApp({ Component, pageProps }: AppProps) {
   return (
      <NearEnvironmentProvider defaultEnvironment={NearEnvironment.TestNet}>
         <Component {...pageProps} />
      </NearEnvironmentProvider>
   );
}
function Page() {
   const nearEnv = useNearEnvironment();

   const handleChangeEnv = () => nearEnv.update(NearEnvironment.TestNet);

   return (
      <>
         <span>Current Env: {nearEnv.value}</span>
         <button onClick={handleChangeEnv}>switch to testnet</button>
      </>
   );
}
```

#### useNearUser

Everything you need to manage your account

```typescript jsx
function Page() {
   const nearUser = useNearUser('example-contract');

   return (
      <>
         <button onClick={() => nearUser.connect('Title')}>Connect wallet</button>
         <button onClick={() => nearUser.disconnect()}>Disconnect wallet</button>

         <span>Is Connected: {nearUser.isConnected}</span>
         <span>Address: {nearUser.address}</span>
         <span>Balance: {nearUser.balance}</span>

         <button onClick={() => nearUser.refreshBalance()}>Refresh balance</button>
      </>
   );
}
```

#### Batch transactions

For example, if you need to transfer 2 coins into a liquidity pool in single call

```typescript jsx
function Page() {
   const nearUser = useNearUser('example-contract');

   return (
      <>
         <button
            onClick={async () => {
               const tx1 = await nearUser.createTransaction(
                  contracts.ft,
                  [
                     nearApi.transactions.functionCall(
                        'ft_transfer_call',
                        {
                           receiver_id: 'contract-1.near',
                           amount: nearPriceFt,
                           msg: JSON.stringify({}),
                        },
                        NEAR_GAS.toString() as any,
                        nearApi.utils.format.parseNearAmount('0.01') as any,
                     ),
                  ],
                  1,
               );
               const tx2 = await nearUser.createTransaction(
                  contracts.ft,
                  [
                     nearApi.transactions.functionCall(
                        'ft_transfer_call',
                        {
                           receiver_id: 'contract-2.near',
                           amount: nearPriceFt,
                           msg: JSON.stringify({}),
                        },
                        NEAR_GAS.toString() as any,
                        nearApi.utils.format.parseNearAmount('0.01') as any,
                     ),
                  ],
                  1,
               );

               await nearUser.signTransactions([tx1, tx2]);
            }}
         >
            Batch Transactions
         </button>
      </>
   );
}
```

#### Define and use Contracts

Adding contracts to the application

```typescript jsx
export const NFT_CONTRACT_NAME = 'mfight-nft.near';
export const FT_CONTRACT_NAME = 'mfight-ft.near';

function useFtContract() {
   return useNearContract(FT_CONTRACT_NAME, {
      viewMethods: ['ft_balance_of'],
      changeMethods: ['ft_transfer'],
   });
}
function useNftContract() {
   return useNearContract(FT_CONTRACT_NAME, {
      viewMethods: ['nft_tokens_for_owner', 'nft_metadata', 'nft_tokens'],
      changeMethods: ['nft_transfer'],
   });
}

// use

function Page() {
   const ftContract = useFtContract();

   const { data: balance = '0' } = useFtBalanceOf({
      contract: ftContract,
      variables: {
         account_id: 'account.near',
      },
   });

   return <span>FT balance: {formatNearAmount(balance, 24)}</span>;
}
```

#### useNearQuery

Calling the view method from the contract

```typescript jsx
function Page() {
   const nearUser = useNearUser('contract.near');
   const ftContract = useFtContract();

   const {
      data: balance = '0', // method result
      loading, // waiting for result or error
      error, // error, if exists
      refetch, // refresh state
   } = useNearQuery<string, { account_id: string }>('ft_balance_of', {
      contract: ftContract, // contract of method
      variables: {
         account_id: 'account.near',
      }, // arguments of method
      poolInterval: 1000 * 60, // refresh state with interval
      skip: !nearUser.isConnected, // method will not be called
      debug: true, // debug method, print info to console
      onError: (err) => console.log(err), // error handler
      onCompleted: (res) => console.log(res), // result handler
   });

   return (
      <>
         <span>Balance: {formatNearAmount(balance)}</span>
         {loading && <span>Loading...</span>}
         {error && <span>Error: {error}</span>}
         <button onClick={() => refetch({}).catch(console.log)}>Force Refresh</button>
      </>
   );
}
```

#### useNearMutation

Calling the change method from the contract

```typescript jsx
function Page() {
   const nearUser = useNearUser('contract.near');
   const ftContract = useFtContract();

   const [transfer, { loading, data }] = useNearMutation<
      string,
      { receiver_id: string; amount: string }
   >('ft_transfer', {
      gas: NEAR_GAS, // gas for this method
      contract: ftContract, // contract of method
      debug: true, // debug method, print info to console
      onError: (err) => console.log(err), // error handler
      onCompleted: (res) => console.log(res), // result handler
   });

   return (
      <>
         <span>Result: {data}</span>
         {loading && <span>Loading...</span>}
         <button
            onClick={() =>
               transfer(
                  { amount: parseNearAmount('10'), receiver_id: 'account.near' },
                  parseNearAmount('0.01') as string,
               ).catch(console.log)
            }
         >
            Tranfer
         </button>
      </>
   );
}
```

### Contracts

#### NFT

-  [x] nft_metadata
-  [x] nft_token
-  [x] nft_tokens
-  [x] nft_tokens_for_owner
-  [x] nft_total_supply
-  [x] nft_is_approved
-  [x] nft_supply_for_owner
-  [x] nft_transfer
-  [x] nft_transfer_call
-  [x] nft_approve
-  [x] nft_revoke
-  [x] nft_revoke_all

#### FT

-  [x] ft_metadata
-  [x] ft_transfer
-  [x] ft_transfer_call
-  [x] ft_balance_of
-  [x] ft_total_supply

#### MT

-  [x] mt_balance_of
-  [x] mt_total_supply
-  [x] mt_batch_transfer
-  [x] mt_batch_transfer_call

#### Storage

-  [x] storage_balance_of
-  [x] storage_balance_bounds
-  [x] storage_deposit
-  [x] storage_withdraw
-  [x] storage_unregister
