import { NearQueryOptions, useNearQuery } from '../hooks';

export type FtTotalSupplyArgs = {};

function useFtTotalSupply<Res = string, Req extends FtTotalSupplyArgs = FtTotalSupplyArgs>(
   opts: NearQueryOptions<Res, Req>,
) {
   return useNearQuery<Res, Req>('ft_total_supply', opts);
}

export default useFtTotalSupply;
