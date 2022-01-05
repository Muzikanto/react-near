import { NearQueryOptions, useNearQuery } from '../hooks';
import { DefaultNftContractMetadata } from './index';

export type NftMetadataArgs = {};
export type NftMetadataResult = DefaultNftContractMetadata;

function useNftMetadata<
   Res extends NftMetadataResult = NftMetadataResult,
   Req extends NftMetadataArgs = NftMetadataArgs,
>(contractId: string, opts: NearQueryOptions<Res, Req> = {}) {
   return useNearQuery<Res, Req>(contractId, 'nft_metadata', opts);
}

export default useNftMetadata;
