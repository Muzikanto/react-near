import useNearQuery, { NearQueryOptions } from '../../hooks/query';
import { FtContractMetadata } from '../ft/types';
import { FtCoreMethods } from './methods';

export type FtMetadataArgs = {};
export type FtMetadataResult = FtContractMetadata;

function useFtMetadata<
   Res extends FtMetadataResult = FtMetadataResult,
   Req extends FtMetadataArgs = FtMetadataArgs,
>(opts: NearQueryOptions<Res, Req>) {
   return useNearQuery<Res, Req>(FtCoreMethods.ft_metadata, opts);
}

export default useFtMetadata;
