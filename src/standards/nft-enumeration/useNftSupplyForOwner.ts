import useNearQuery, { NearQueryOptions } from '../../hooks/query';
import { NftEnumerationMethods } from './methods';

export type NftSupplyForOwnerArgs = {
   account_id: string;
};
export type NftSupplyForOwnerResult = number;

function useNftSupplyForOwner<
   Res extends NftSupplyForOwnerResult = NftSupplyForOwnerResult,
   Req extends NftSupplyForOwnerArgs = NftSupplyForOwnerArgs,
>({ onCompleted, ...opts }: NearQueryOptions<Res, Req>) {
   const { data, ...query } = useNearQuery<Res, Req>(NftEnumerationMethods.nft_supply_for_owner, {
      ...opts,
      onCompleted: (res) => {
         if (onCompleted) {
            onCompleted(Number(res) as Res);
         }
      },
   });

   return { ...query, data: data ? +data : null };
}

export default useNftSupplyForOwner;
