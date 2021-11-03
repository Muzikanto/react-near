import { Contract } from 'near-api-js';
import { NearQueryOptions, useNearQuery } from '../hooks';
import { DefaultNftToken } from './index';

export type UseNftCollectionQueryInput = { account_id: string; fromIndex?: number; limit?: number };

function useNearNftTokensForOwner<
   Res extends DefaultNftToken[] = DefaultNftToken[],
   Req extends UseNftCollectionQueryInput = UseNftCollectionQueryInput,
>(
   contract: Contract,
   {
      variables: { fromIndex = 0, limit = 100, ...variables } = {} as any,
      ...opts
   }: NearQueryOptions<Res, Req> = {},
) {
   return useNearQuery<Res, Req>('nft_tokens_for_owner', {
      ...opts,
      variables: {
         from_index: fromIndex.toString(),
         limit,
         ...variables,
      } as any,
   });
}

export default useNearNftTokensForOwner;
