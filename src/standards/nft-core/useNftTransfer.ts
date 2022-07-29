import useNearMutation, { NearMutationOptions } from '../../hooks/mutation';
import { NftCoreMethods } from './methods';

export type NftTransferArgs = {
   receiver_id: string;
   token_id: string;
   approval_id?: number;
   memo?: string;
};

function useNftTransfer<Res = void, Req extends NftTransferArgs = NftTransferArgs>(
   opts: NearMutationOptions<Res, Req>,
) {
   return useNearMutation<Res, Req>(NftCoreMethods.nft_transfer, opts);
}

export default useNftTransfer;
