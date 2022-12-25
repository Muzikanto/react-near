export interface NftContractMetadata {
   base_uri: string;
   icon: string;
   name: string;
   reference: null;
   reference_hash: null;
   spec: string;
   symbol: string;
}
export interface NftTokenMetadata {
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
export interface NftToken {
   metadata: NftTokenMetadata;
   owner_id: string;
   token_id: string;
}

export {};
