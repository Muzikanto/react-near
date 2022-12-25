import { useContext } from 'react';
import { NearContext } from '..';

function useNear() {
   const context = useContext(NearContext);

   if (!context) {
      throw new Error('useWalletSelector must be used within a WalletSelectorContextProvider');
   }

   return context;
}

export default useNear;
