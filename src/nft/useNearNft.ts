import { useNearContract } from '../hooks';

const defaultMethods = { viewMethods: [], changeMethods: [] };

function useNearNft(
   contractName: string,
   contractMethods: {
      viewMethods: string[];
      changeMethods: string[];
   } = defaultMethods,
) {
   const contract = useNearContract(contractName, {
      viewMethods: [
         'nft_metadata',
         'nft_tokens_for_owner',
         'nft_total_supply',
         ...contractMethods.viewMethods,
      ],
      changeMethods: ['new', ...contractMethods.changeMethods],
   });

   return contract;
}

export default useNearNft;
