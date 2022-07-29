import useNearQuery, { NearQueryOptions } from '../../hooks/query';
import { FtCoreMethods } from './methods';

export type FtTotalSupplyArgs = {};
export type FtTotalSupplyResult = string;

function useFtTotalSupply<
   Res = FtTotalSupplyResult,
   Req extends FtTotalSupplyArgs = FtTotalSupplyArgs,
>(opts: NearQueryOptions<Res, Req>) {
   return useNearQuery<Res, Req>(FtCoreMethods.ft_total_supply, opts);
}

export default useFtTotalSupply;
