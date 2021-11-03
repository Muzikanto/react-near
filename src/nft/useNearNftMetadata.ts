import { Contract } from 'near-api-js';
import { NearQueryOptions, useNearQuery } from '../hooks';
import { DefaultNftContractMetadata } from './index';

function useNearNftMetadata<
   Res extends DefaultNftContractMetadata = DefaultNftContractMetadata,
   Req = {},
>(contract: Contract, opts: NearQueryOptions<Res, Req> = {}) {
   return useNearQuery<Res, Req>('nft_metadata', opts);
}

export default useNearNftMetadata;
