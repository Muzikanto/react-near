import { NearQueryOptions, useNearQuery } from '../hooks';
import { DefaultNftToken } from './index';

export type NftTokensArgs = { fromIndex?: number; limit?: number };
export type NftTokensResult = DefaultNftToken[];

function useNftMTokens<
   Res extends NftTokensResult = NftTokensResult,
   Req extends NftTokensArgs = NftTokensArgs,
>(contractId: string, opts: NearQueryOptions<Res, Req> = {}) {
   return useNearQuery<Res, Req>(contractId, 'nft_tokens', opts);
}

export default useNftMTokens;
