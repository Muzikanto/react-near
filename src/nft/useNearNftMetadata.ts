import { Contract } from 'near-api-js';
import { NearQueryOptions, useNearQuery } from '../hooks';
import { DefaultContractMetadata } from './index';

function useNearNftMetadata<
   Res extends DefaultContractMetadata = DefaultContractMetadata,
   Req = {},
>(contract: Contract, opts: NearQueryOptions<Res, Req> = {}) {
   return useNearQuery<Res, Req>(contract, 'nft_metadata', opts);
}

export default useNearNftMetadata;
