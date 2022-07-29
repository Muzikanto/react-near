import { NftCoreMethods } from './methods';

const NFT_CORE_METHODS: { viewMethods: string[]; changeMethods: string[] } = {
   viewMethods: [NftCoreMethods.nft_metadata, NftCoreMethods.nft_token],
   changeMethods: [NftCoreMethods.nft_transfer, NftCoreMethods.nft_transfer_call],
};

export { NFT_CORE_METHODS };
