import useNearQuery, { NearQueryOptions } from '../../hooks/query';
import { RefFinancePool } from './types';

export type RefFinanceGetPoolResult = RefFinancePool;
export type RefFinanceGetPoolArgs = {
   pool_id: number;
};

function useRefFinanceGetPool<
   Res = RefFinanceGetPoolResult,
   Req extends RefFinanceGetPoolArgs = RefFinanceGetPoolArgs,
>(opts: NearQueryOptions<Res, Req>) {
   return useNearQuery<Res, Req>('get_pool', opts);
}

export default useRefFinanceGetPool;
