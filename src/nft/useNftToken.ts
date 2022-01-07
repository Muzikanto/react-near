import { NearQueryOptions, useNearQuery } from '../hooks';
import { DefaultNftToken } from './index';

export type NftTokenArgs = { nft_token: string };
export type NftTokenResult = DefaultNftToken;

function useNftMToken<
   Res extends NftTokenResult = NftTokenResult,
   Req extends NftTokenArgs = NftTokenArgs,
>(opts: NearQueryOptions<Res, Req>) {
   return useNearQuery<Res, Req>('nft_token', opts);
}

export default useNftMToken;
