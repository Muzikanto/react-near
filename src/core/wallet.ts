import { WalletConnection } from 'near-api-js';
import { useNearContext } from '../NearProvider';

function useNearWallet(): WalletConnection | null {
   const { wallet } = useNearContext();

   // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
   return wallet as WalletConnection | null;
}

export default useNearWallet;
