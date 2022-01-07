import { NearQueryOptions, useNearQuery } from '../hooks';
import { DefaultNftToken } from './index';

export type NftTokenArgs = { nft_token: string };
export type NftTokenResult = DefaultNftToken;

function useNftMToken<
   Res extends NftTokenResult = NftTokenResult,
   Req extends NftTokenArgs = NftTokenArgs,
>(opts: Omit<NearQueryOptions<Res, Req>, 'methodName'> & { methodName?: string }) {
   return useNearQuery<Res, Req>({ methodName: 'nft_token', ...opts });
}

export default useNftMToken;
