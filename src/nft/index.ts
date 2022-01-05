import useNftApprove from './useNftApprove';
import useNftIsApproved from './useNftIsApproved';
import useNftMetadata from './useNftMetadata';
import useNftRevoke from './useNftRevoke';
import useNftRevokeAll from './useNftRevokeAll';
import useNftSupplyForOwner from './useNftSupplyForOwner';
import useNftToken from './useNftToken';
import useNftTokens from './useNftTokens';
import useNftTokensForOwner from './useNftTokensForOwner';
import useNftTotalSupply from './useNftTotalSupply';
import useNftTransfer from './useNftTransfer';
import useNftTransferCall from './useNftTransferCall';

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

export {
   useNftMetadata,
   useNftTokensForOwner,
   useNftTotalSupply,
   useNftSupplyForOwner,
   useNftApprove,
   useNftIsApproved,
   useNftRevoke,
   useNftRevokeAll,
   useNftToken,
   useNftTokens,
   useNftTransfer,
   useNftTransferCall,
};
