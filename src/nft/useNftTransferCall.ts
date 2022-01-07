import { NearMutationOptions } from '../hooks';
import useNearMutation from '../hooks/mutation';

export type NftTransferCallArgs = {
   receiver_id: string;
   token_id: string;
   approval_id?: number;
   memo?: string;
   msg: string;
};

function useNftTransferCall<Res = void, Req extends NftTransferCallArgs = NftTransferCallArgs>(
   opts: NearMutationOptions<Res, Req>,
) {
   return useNearMutation<Res, Req>('nft_transfer_call', opts);
}

export default useNftTransferCall;
