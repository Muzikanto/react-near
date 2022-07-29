import { NftToken } from '../nft/types';
import { NftEnumerationMethods } from './methods';
import useNearQuery, { NearQueryOptions } from '../../hooks/query';

export type NftTokensArgs = { from_index?: string; limit?: number };
export type NftTokensResult = NftToken[];

function useNftTokens<
   Res extends NftTokensResult = NftTokensResult,
   Req extends NftTokensArgs = NftTokensArgs,
>(opts: NearQueryOptions<Res, Req>) {
   return useNearQuery<Res, Req>(NftEnumerationMethods.nft_tokens, opts);
}

export default useNftTokens;
