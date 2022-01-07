import { NearQueryOptions, useNearQuery } from '../hooks';
import { DefaultNftToken } from './index';

export type NftTokensArgs = { fromIndex?: number; limit?: number };
export type NftTokensResult = DefaultNftToken[];

function useNftMTokens<
   Res extends NftTokensResult = NftTokensResult,
   Req extends NftTokensArgs = NftTokensArgs,
>(opts: NearQueryOptions<Res, Req>) {
   return useNearQuery<Res, Req>('nft_tokens', opts);
}

export default useNftMTokens;
