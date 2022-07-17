import { NearQueryOptions, useNearQuery } from '../hooks';

export type FtMetadataArgs = {};
export type FtMetadataResult = {
   spec: String;
   name: String;
   symbol: String;
   icon?: string;
   reference?: string;
   reference_hash?: string;
   decimals: number;
};

function useFtMetadata<
   Res extends FtMetadataResult = FtMetadataResult,
   Req extends FtMetadataArgs = FtMetadataArgs,
>(opts: NearQueryOptions<Res, Req>) {
   return useNearQuery<Res, Req>('ft_metadata', opts);
}

export default useFtMetadata;
