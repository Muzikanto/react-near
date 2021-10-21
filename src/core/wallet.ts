import { WalletConnection } from 'near-api-js';
import React from 'react';
import { NearContext } from '../NearProvider';

function useNearWallet(): WalletConnection | null {
   const { wallet } = React.useContext(NearContext);

   // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
   return wallet as WalletConnection | null;
}

export default useNearWallet;
