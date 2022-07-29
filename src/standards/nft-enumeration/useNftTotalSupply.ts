import useNearQuery, { NearQueryOptions } from '../../hooks/query';
import {NftEnumerationMethods} from "./methods";

export type NftTotalSupplyArgs = {};
export type NftTotalSupplyResult = number;

function useNftTotalSupply<
   Res extends NftTotalSupplyResult = NftTotalSupplyResult,
   Req extends NftTotalSupplyArgs = NftTotalSupplyArgs,
>({ onCompleted, ...opts }: NearQueryOptions<Res, Req>) {
   const { data, ...query } = useNearQuery<Res, Req>(NftEnumerationMethods.nft_total_supply, {
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
