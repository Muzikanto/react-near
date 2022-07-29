import useNearQuery, { NearQueryOptions } from '../../hooks/query';
import { NftContractMetadata } from '../nft/types';
import { NftCoreMethods } from './methods';

export type NftMetadataArgs = {};
export type NftMetadataResult = NftContractMetadata;

function useNftMetadata<
   Res extends NftMetadataResult = NftMetadataResult,
   Req extends NftMetadataArgs = NftMetadataArgs,
>(opts: NearQueryOptions<Res, Req>) {
   return useNearQuery<Res, Req>(NftCoreMethods.nft_metadata, opts);
}

export default useNftMetadata;
