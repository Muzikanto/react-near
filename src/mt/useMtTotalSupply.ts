import { NearQueryOptions, useNearQuery } from '../hooks';

export type MtTotalSupplyArgs = { token_id: string };

function useMtTotalSupply<Res = string, Req extends MtTotalSupplyArgs = MtTotalSupplyArgs>(
   opts: NearQueryOptions<Res, Req>,
) {
   return useNearQuery<Res, Req>('mt_total_supply', opts);
}

export default useMtTotalSupply;
