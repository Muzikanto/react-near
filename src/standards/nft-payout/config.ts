import { NftPayoutMethods } from './methods';

const NFT_PAYOUT_METHODS: { viewMethods: string[]; changeMethods: string[] } = {
   viewMethods: [NftPayoutMethods.nft_payout],
   changeMethods: [NftPayoutMethods.nft_transfer_payout],
};

export { NFT_PAYOUT_METHODS };
