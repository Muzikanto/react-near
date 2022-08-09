import useNearQuery, { NearQueryOptions } from '../../hooks/query';
import { useNearEnvironment } from '../../environment';
import { NearEnvironment } from '../../config';
import { ParasCollectionStats } from './types';
import { PARAS_API_MAINNET_URL, PARAS_API_TESTNET_URL } from './config';

export type ParasCollectionStatsArgs = {
   nft_contract_id: string;
};
export type ParasCollectionStatsResult = ParasCollectionStats;

function useParasCollectionStats(
   opts: Omit<
      NearQueryOptions<ParasCollectionStatsResult, ParasCollectionStatsArgs>,
      'mock' | 'contract'
   >,
) {
   const nearEnv = useNearEnvironment();

   return useNearQuery('collection-stats', {
      ...opts,
      contract: 'paras-api', // used only for cache key
      mock: async (args) => {
         const res = await fetch(
            nearEnv.value === NearEnvironment.TestNet && false
               ? `${PARAS_API_TESTNET_URL}/collection-stats?collection_id=${args.nft_contract_id}`
               : `${PARAS_API_MAINNET_URL}/collection-stats?collection_id=${args.nft_contract_id}`,
         ).then((r) => r.json());

         if (res.status === 1 && res.data && res.data.results) {
            return res.data.results;
         }

         throw new Error('Invalid params');
      },
   });
}

export default useParasCollectionStats;
