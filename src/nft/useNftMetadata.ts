import { NearQueryOptions, useNearQuery } from '../hooks';
import { DefaultNftContractMetadata } from './index';

export type NftMetadataArgs = {};
export type NftMetadataResult = DefaultNftContractMetadata;

function useNftMetadata<
   Res extends NftMetadataResult = NftMetadataResult,
   Req extends NftMetadataArgs = NftMetadataArgs,
>(opts: Omit<NearQueryOptions<Res, Req>, 'methodName'> & { methodName?: string }) {
   return useNearQuery<Res, Req>({ methodName: 'nft_metadata', ...opts });
}

export default useNftMetadata;
