import { NearQueryOptions, useNearQuery } from '../hooks';

export type NftTotalSupplyArgs = {};
export type NftTotalSupplyResult = number;

function useNftTotalSupply<
   Res extends NftTotalSupplyResult = NftTotalSupplyResult,
   Req extends NftTotalSupplyArgs = NftTotalSupplyArgs,
>(contractId: string, { onCompleted, ...opts }: NearQueryOptions<Res, Req> = {}) {
   const { data, ...query } = useNearQuery<Res, Req>(contractId, 'nft_total_supply', {
      ...opts,
      onCompleted: (res) => {
         if (onCompleted) {
            onCompleted(Number(res) as Res);
         }
      },
   });

   return { ...query, data: data ? +data : null };
}

export default useNftTotalSupply;
