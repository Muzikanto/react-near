import { NearQueryOptions, useNearQuery } from '../hooks';
import { DefaultNftToken } from './index';

export type NftTokensArgs = { fromIndex?: number; limit?: number };
export type NftTokensResult = DefaultNftToken[];

function useNftMTokens<
   Res extends NftTokensResult = NftTokensResult,
   Req extends NftTokensArgs = NftTokensArgs,
>(opts: Omit<NearQueryOptions<Res, Req>, 'methodName'> & { methodName?: string }) {
   return useNearQuery<Res, Req>({ methodName: 'nft_tokens', ...opts });
}

export default useNftMTokens;
