import { NFT_ENUMERATION_METHODS } from '../nft-enumeration/config';
import { NFT_APPROVE_METHODS } from '../nft-approve/config';
import { NFT_CORE_METHODS } from '../nft-core/config';

const NFT_METHODS: { viewMethods: string[]; changeMethods: string[] } = {
   viewMethods: [
      ...NFT_ENUMERATION_METHODS.viewMethods,
      ...NFT_APPROVE_METHODS.viewMethods,
      ...NFT_CORE_METHODS.viewMethods,
   ],
   changeMethods: [
      ...NFT_ENUMERATION_METHODS.changeMethods,
      ...NFT_APPROVE_METHODS.changeMethods,
      ...NFT_CORE_METHODS.changeMethods,
   ],
};

export { NFT_METHODS };
