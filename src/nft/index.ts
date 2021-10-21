import useNearNft from './useNearNft';
import useNearNftTokensForOwner from './useNearNftTokensForOwner';
import useNearNftMetadata from './useNearNftMetadata';
import useNearNftTotalSupply from './useNearNftTotalSupply';

export interface DefaultContractMetadata {
   base_uri: string;
   icon: string;
   name: string;
   reference: null;
   reference_hash: null;
   spec: string;
   symbol: string;
}
export interface DefaultTokenMetadata {
   copies?: number;
   description?: string;
   expires_at?: null;
   extra?: null;
   issued_at?: null;
   media?: null;
   media_hash?: null;
   reference?: null;
   reference_hash?: null;
   starts_at?: null;
   title?: string;
   updated_at?: null;
}
export interface DefaultToken {
   metadata: DefaultTokenMetadata;
   owner_id: string;
   token_id: string;
}

export {
   useNearNft,
   useNearNftMetadata,
   useNearNftTokensForOwner,
   useNearNftTotalSupply,
};
