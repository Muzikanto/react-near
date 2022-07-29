import { NftEnumerationMethods } from './methods';

const NFT_ENUMERATION_METHODS: { viewMethods: string[]; changeMethods: string[] } = {
   viewMethods: [
      NftEnumerationMethods.nft_supply_for_owner,
      NftEnumerationMethods.nft_tokens,
      NftEnumerationMethods.nft_tokens_for_owner,
      NftEnumerationMethods.nft_total_supply,
   ],
   changeMethods: [],
};

export { NFT_ENUMERATION_METHODS };
