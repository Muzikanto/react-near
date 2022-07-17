const DEFAULT_NFT_METHODS: { viewMethods: string[]; changeMethods: string[] } = {
   viewMethods: ['nft_is_approved', 'nft_metadata', 'nft_supply_for_owner', 'nft_token', 'nft_tokens', 'nft_tokens_for_owner', 'nft_total_supply'],
   changeMethods: ['nft_approve', 'nft_revoke', 'nft_revoke_all', 'nft_transfer', 'nft_transfer_call'],
};

const STANDARD_NFT_METHODS: { viewMethods: string[]; changeMethods: string[] } = {
   viewMethods: [...DEFAULT_NFT_METHODS.viewMethods],
   changeMethods: [...DEFAULT_NFT_METHODS.changeMethods],
};

export { DEFAULT_NFT_METHODS, STANDARD_NFT_METHODS };
