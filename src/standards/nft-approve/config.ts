import { NftApproveMethods } from './methods';

const NFT_APPROVE_METHODS: { viewMethods: string[]; changeMethods: string[] } = {
   viewMethods: [NftApproveMethods.nft_is_approved],
   changeMethods: [
      NftApproveMethods.nft_approve,
      NftApproveMethods.nft_revoke,
      NftApproveMethods.nft_revoke_all,
   ],
};

export { NFT_APPROVE_METHODS };
