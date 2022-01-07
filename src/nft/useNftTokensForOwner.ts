import { NearQueryOptions, useNearQuery } from '../hooks';
import { DefaultNftToken } from './index';

export type NftTokensForOwnerArgs = { account_id: string; fromIndex?: number; limit?: number };
export type NftTokensForOwnerResult = DefaultNftToken[];

function useNftTokensForOwner<
   Res extends NftTokensForOwnerResult = NftTokensForOwnerResult,
   Req extends NftTokensForOwnerArgs = NftTokensForOwnerArgs,
>(
   {
      variables: { fromIndex = 0, limit = 100, ...variables } = {} as any,
      ...opts
   }: Omit<NearQueryOptions<Res, Req>, 'methodName'> & { methodName?: string },
) {
   return useNearQuery<Res, Req>({
      methodName: 'nft_tokens_for_owner',
      ...opts,
      variables: {
         from_index: fromIndex.toString(),
         limit,
         ...variables,
      } as any,
   });
}

export default useNftTokensForOwner;
