import { Contract } from 'near-api-js';
import { NearQueryOptions, useNearQuery } from '../hooks';

function useNearNftTotalSupply<Res extends number = number, Req = {}>(
   contract: Contract,
   { onCompleted, ...opts }: NearQueryOptions<Res, Req> = {},
) {
   const { data, ...query } = useNearQuery<Res, Req>('nft_total_supply', {
      ...opts,
      onCompleted: (res) => {
         if (onCompleted) {
            onCompleted(Number(res) as Res);
         }
      },
   });

   return { ...query, data: data ? +data : null };
}

export default useNearNftTotalSupply;
