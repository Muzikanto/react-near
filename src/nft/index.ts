import useNearNft from './useNearNft';
import useNearNftTokensForOwner from './useNearNftTokensForOwner';
import useNearNftMetadata from './useNearNftMetadata';
import useNearNftTotalSupply from './useNearNftTotalSupply';

export interface DefaultNftContractMetadata {
   base_uri: string;
   icon: string;
   name: string;
   reference: null;
   reference_hash: null;
   spec: string;
   symbol: string;
}
export interface DefaultNftTokenMetadata {
   copies?: number;
   description?: string;
   expires_at?: null;
   extra?: null;
   issued_at?: null;
   media?: string | null;
   media_hash?: null;
   reference?: null;
   reference_hash?: null;
   starts_at?: null;
   title?: string | null;
   updated_at?: null;
}
export interface DefaultNftToken {
   metadata: DefaultNftTokenMetadata;
   owner_id: string;
   token_id: string;
}

export { useNearNft, useNearNftMetadata, useNearNftTokensForOwner, useNearNftTotalSupply };
