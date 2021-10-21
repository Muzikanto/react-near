import { Account } from 'near-api-js';
import React from 'react';
import { NearContext } from '../NearProvider';

function useNearAccount(): Account | null {
   const { wallet } = React.useContext(NearContext);

   // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
   return wallet ? wallet.account() : null;
}

export default useNearAccount;
