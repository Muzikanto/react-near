import { Account } from 'near-api-js';
import React from 'react';
import { useNearContext } from '../NearProvider';

function useNearAccount(): Account | null {
   const { wallet } = useNearContext();

   // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
   return React.useMemo(() => (wallet ? wallet.account() : null), [wallet]);
}

export default useNearAccount;
