<h1 align="center">react-near</h1>

<div align="center">

<p align="center">
  <a aria-label="NPM version" href="https://www.npmjs.com/package/react-near">
    <img alt="" src="https://img.shields.io/npm/v/react-near.svg?style=for-the-badge&labelColor=000000">
  </a>
  <a aria-label="github issues" href="https://www.npmjs.com/package/react-near">
    <img alt="github issues" src="https://img.shields.io/github/issues-closed/muzikanto/react-near?style=for-the-badge&labelColor=000000">
  </a>
  <a aria-label="Package size" href="https://www.npmjs.com/package/react-near">
    <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/react-near?style=for-the-badge&labelColor=000000">
    </a>
  <a aria-label="Downloads" href="https://www.npmjs.com/package/react-near">
    <img alt="npm" src="https://img.shields.io/npm/dm/react-near?style=for-the-badge&labelColor=000000">
  </a>
  <a aria-label="Prettier" href="https://www.npmjs.com/package/react-near">
      <img alt="npm" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=for-the-badge&labelColor=000000">
    </a>
    <a aria-label="Prettier" href="https://www.npmjs.com/package/react-near">
        <img alt="npm" src="https://img.shields.io/badge/types-included-32715f.svg?style=for-the-badge&labelColor=000000">
    </a>
    <a aria-label="License" href="https://github.com/Muzikanto/react-near/blob/master/LICENSE.md">
        <img alt="" src="https://img.shields.io/npm/l/next.svg?style=for-the-badge&labelColor=000000">
    </a>
</p>
</div>

## Introduction

Quick implementation of near in your application.
Generation of typed smart contract methods.
Including ready for use typed methods in popular smart contract [Standards](https://github.com/Muzikanto/react-near/tree/master/src/standards).

## Navigation

-  [install](#setup)
-  [example](#quick-example) Quick example
-  [codegen](#codegen) Generate methods of contract [example-codegen](https://github.com/Muzikanto/react-near/tree/master/example/near-api/game.ts)
-  [api](#api)
   -  [NearProvider](#nearprovider) define near in app
   -  [NearEnvironmentProvider](#nearenvironmentprovider) switch env (TestNet, MainNet..)
   -  [Config](#define-and-use-contracts) define contracts
   -  [useNearUser](#usenearuser) complex example
   -  [useNearUser](#batch-transactions) batch Transactions
   -  [useNearQuery](#usenearquery) use view methods
   -  [useNearMutation](#usenearmutation) use change methods
   -  [useNearStatus](#usenearstatus) get result (transactions hashes or error)
-  [contracts](#contracts)
   -  [ft](#ft) Fungible Token Standard ([nep141](https://github.com/near/NEPs/blob/master/neps/nep-0141.md)) methods
   -  [nft](#nft) Non Fungible Token Standard ([nep171](https://github.com/near/NEPs/blob/master/neps/nep-0171.md)) methods
   -  [mt](#mt) Multi Token Standard ([nep245](https://github.com/near/NEPs/blob/master/neps/nep-0245.md)) methods
   -  [storage](#storage) Storage Management ([nep145](https://github.com/near/NEPs/blob/master/neps/nep-0145.md)) methods
   -  [Other Standards](https://github.com/Muzikanto/react-near/tree/master/src/standards)
-  [utils](#utils) Other utils

## Setup

You'll need to install the package from npm `npm i react-near near-api-js`.

If you need to generate contract methods `npm i -D json-schema-to-typescript fzstd`.

## Quick Example

```typescript jsx
// config.ts
const FT_CONTRACT_NAME = 'mfight-ft.testnet';

function useFtContract() {
   return useNearContract<FtContract & StorageContract>(FT_CONTRACT_NAME, {
      viewMethods: [...FT_METHODS.viewMethods, ...STORAGE_METHODS.viewMethods],
      changeMethods: [...FT_METHODS.changeMethods, ...STORAGE_METHODS.changeMethods],
   });
}

// app.tsx
function MyApp({ Component, pageProps }: AppProps) {
   return (
      <NearEnvironmentProvider defaultEnvironment={NearEnvironment.TestNet}>
         <NearProvider authContractId='my-contract.testnet'>
            <Component {...pageProps} />
         </NearProvider>
      </NearEnvironmentProvider>
   );
}

// page.tsx
function Page() {
   const nearUser = useNearUser();
   const ftContract = useFtContract();

   const { data: ftBalance = '0', refetch: refetchFtBalance } = useFtBalanceOf({
      contract: ftContract,
      variables: { account_id: nearUser.address as string },
      poolInterval: 1000 * 60 * 5,
      skip: !nearUser.isConnected,
   });
   const [transferCall] = useFtTransferCall({
      gas: GAS_FOR_FT_TRANSFER_CALL,
   });

   const handleTransferCall = () =>
      transferCall(
         { receiver_id: 'example.near', amount: 1000, msg: JSON.stringify({}) },
         parseNearAmount('0.01'),
      );
   const handleSignIn = () => nearUser.connect();

   return (
      <div>
         {nearUser.isConnected && (
            <>
               <span>NEAR balance: {nearUser.balance}</span>
               <span>FT balance: {formatNearAmount(ftBalance, 24)}</span>
               <button onClick={handleTransferCall}>transfer ft</button>
            </>
         )}
         {!nearUser.isConnected && <button onClick={receiver_id}>Connect NEAR</button>}
      </div>
   );
}
```

## Codegen

If you want to generate all the methods of your near contract, you have to:

-  you need to add the abi feature, as in this example [abi-example](https://github.com/near/abi-example)
-  run `npm i -D json-schema-to-typescript fzstd`
-  add config to your project `react-near.json`

```json
{
   "dist": "near-api",
   "type": "default", // or "raw", for exclude all hooks
   "contracts": [
      {
         "name": "Nft",
         "abi": "abi/nft.json",
         "mainnet": "mfight-nft.near",
         "testnet": "mfight-nft_v2.testnet"
      },
      {
         "name": "Market",
         "mainnet": "mfight-nft.near",
         "testnet": "mfight-nft_v2.testnet"
      }
   ]
}
```

-  run script `node ./node_modules/react-near/codegen.js`

There is also an example: [example-app](https://github.com/Muzikanto/react-near/tree/master/example)

## Api

#### NearProvider

Create a context of NEAR in the application

```tsx
// app.tsx
function MyApp({ Component, pageProps }: AppProps) {
   return (
      <NearProvider authContractId='my-contract.testnet'>
         <Component {...pageProps} />
      </NearProvider>
   );
}
function Page() {
   const near = useNear();
   const nearUser = useNearUser();
   const nearAccount = useNearAccount(nearUser.address);

   return (
      <>
         <span>User Address: {account.address}</span>
         <span>Balance: {nearAccount?.balance} NEAR</span>
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
   const nearEnv = useNearEnv();

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
   const nearUser = useNearUser();

   return (
      <>
         <button onClick={() => nearUser.connect()}>Connect wallet</button>
         <button onClick={() => nearUser.disconnect()}>Disconnect wallet</button>

         <span>Is Connected: {nearUser.isConnected}</span>
         <span>Address: {nearUser.address}</span>
      </>
   );
}
```

#### Batch transactions

For example, if you need to transfer 2 coins into a liquidity pool in single call

```typescript jsx
const MT_CONTRACT_ID = 'mt-token.testnet';
const FT_CONTRACT_ID_1 = 'ft-token-one.testnet';
const FT_CONTRACT_ID_2 = 'ft-token-two.testnet';
const POOL_CONTRACT_ID = 'two-tokens-receiver.testnet';

function Page() {
   const nearUser = useNearUser();
   const ftContract1 = useFtContract(FT_CONTRACT_ID_1);
   const ftContract2 = useFtContract(FT_CONTRACT_ID_2);
   const mtContract = useFtContract(MT_CONTRACT_ID);

   const [ftTransferCall1, ftTransferCallCtx1] = useFtTransferCall({
      contract: ftContract1,
      gas: GAS_FOR_FT_TRANSFER_CALL,
   });
   const [ftTransferCall2, ftTransferCallCtx2] = useFtTransferCall({
      contract: ftContract2,
      gas: GAS_FOR_FT_TRANSFER_CALL,
   });
   const [mtBatchTransferCall, mtTransferCallCtx] = useMtBatchTransferCall({
      contract: mtContract,
      gas: GAS_FOR_MT_TRANSFER_CALL,
   });

   const handleTransfer = async () => {
      const amount1 = parseNearAmount('1') as string;
      const amount2 = parseNearAmount('1') as string;

      return nearUser.signAndSendTransactions({
         transactions: [
            {
               signerId: nearUser.address as string,
               receiverId: MT_CONTRACT_ID,
               actions: [
                  {
                     type: 'FunctionCall',
                     params: {
                        methodName: 'ft_transfer',
                        args: btoa(JSON.stringify({ receiver_id: 'xx', amount: '1' })),
                        gas: 'xxx',
                        deposit: '1',
                     },
                  },
               ],
            },
         ],
      });
   };

   return (
      <>
         <button onClick={handleTransfer}>Batch Transactions</button>
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

   // use query hook
   const { data: balance = '0' } = useFtBalanceOf({
      contract: ftContract,
      variables: {
         account_id: 'account.near',
      },
   });
   // or custom call
   const getBalance = () => {
      if (!ftContract) {
         return 0;
      }

      return ftContract.ft_balance_of({ account_id: 'account.near' });
   };

   return <span>FT balance: {formatNearAmount(balance, 24)}</span>;
}
```

#### useNearQuery

Calling the view method from the contract

```typescript jsx
function Page() {
   const nearUser = useNearUser();
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
   const nearUser = useNearUser();
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

#### useNearStatus

Get result transactions hashes if method is success, or get error if failure

```typescript jsx
function Page() {
   const { transactionHashes, error } = useNearStatus();

   return (
      <>
         {transactionHashes && <span>Success Tx List: {transactionHashes}</span>}
         {error && <span>{error}</span>}
      </>
   );
}
```

### Contracts

#### NFT

-  [x] nft_metadata
-  [x] nft_token
-  [x] nft_transfer
-  [x] nft_transfer_call
-  [x] nft_tokens
-  [x] nft_tokens_for_owner
-  [x] nft_total_supply
-  [x] nft_supply_for_owner
-  [x] nft_is_approved
-  [x] nft_approve
-  [x] nft_revoke
-  [x] nft_revoke_all
-  [x] nft_payout
-  [x] nft_transfer_payout

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

#### Paras

-  [x] nft_approve (useParasNftApprove)
-  [x] get_market_data (useParasMarketData)
-  [x] api collection-stats (useParasCollectionStats)

#### Ref Finance

-  [x] get_pool (useRefFinancePool)

### Utils

-  [x] parseNearAmount with decimals
-  [x] isValidNearAddress
-  [x] parseNearDate
-  [x] formatNearAddress
-  [x] gas and more :)

## Authors

-  Maksim Schiriy [@maksim-schiriy](https://www.linkedin.com/in/maksim-schiriy/?locale=en_US)
