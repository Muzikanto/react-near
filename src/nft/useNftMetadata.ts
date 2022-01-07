import { NearQueryOptions, useNearQuery } from '../hooks';
import { DefaultNftContractMetadata } from './index';

export type NftMetadataArgs = {};
export type NftMetadataResult = DefaultNftContractMetadata;

function useNftMetadata<
   Res extends NftMetadataResult = NftMetadataResult,
   Req extends NftMetadataArgs = NftMetadataArgs,
>(opts: NearQueryOptions<Res, Req>) {
   return useNearQuery<Res, Req>('nft_metadata', opts);
}

export default useNftMetadata;
