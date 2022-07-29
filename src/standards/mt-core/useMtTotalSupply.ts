import useNearQuery, { NearQueryOptions } from '../../hooks/query';
import { MtCoreMethods } from './methods';

export type MtTotalSupplyArgs = { token_id: string };
export type MtTotalSupplyResult = string;

function useMtTotalSupply<
   Res = MtTotalSupplyResult,
   Req extends MtTotalSupplyArgs = MtTotalSupplyArgs,
>(opts: NearQueryOptions<Res, Req>) {
   return useNearQuery<Res, Req>(MtCoreMethods.mt_total_supply, opts);
}

export default useMtTotalSupply;
