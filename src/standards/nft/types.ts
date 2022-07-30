import { NftMetadataArgs, NftMetadataResult } from '../nft-core/useNftMetadata';
import { NftTransferCallArgs, NftTransferCallResult } from '../nft-core/useNftTransferCall';
import { NftTransferArgs, NftTransferResult } from '../nft-core/useNftTransfer';
import { NftTokenArgs, NftTokenResult } from '../nft-core/useNftToken';
import { NftRevokeAllArgs, NftRevokeAllResult } from '../nft-approve/useNftRevokeAll';
import { NftRevokeArgs, NftRevokeResult } from '../nft-approve/useNftRevoke';
import { NftIsApprovedArgs, NftIsApprovedResult } from '../nft-approve/useNftIsApproved';
import { NftApproveArgs, NftApproveResult } from '../nft-approve/useNftApprove';
import { NftTotalSupplyArgs, NftTotalSupplyResult } from '../nft-enumeration/useNftTotalSupply';
import {
   NftTokensForOwnerArgs,
   NftTokensForOwnerResult,
} from '../nft-enumeration/useNftTokensForOwner';
import { NftTokensArgs, NftTokensResult } from '../nft-enumeration/useNftTokens';
import {
   NftSupplyForOwnerArgs,
   NftSupplyForOwnerResult,
} from '../nft-enumeration/useNftSupplyForOwner';
import { NftPayoutArgs, NftPayoutResult } from '../nft-payout/useNftPayout';
import { NftTransferPayoutArgs, NftTransferPayoutResult } from '../nft-payout/useNftTransferPayout';
import { NearChangeMethod, NearViewMethod } from '../../types';
import { Contract } from 'near-api-js';

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

export type NftContract = {
   nft_metadata: NearViewMethod<NftMetadataArgs, NftMetadataResult>;
   nft_token: NearViewMethod<NftTokenArgs, NftTokenResult>;
   nft_transfer: NearChangeMethod<NftTransferArgs, NftTransferResult>;
   nft_transfer_call: NearChangeMethod<NftTransferCallArgs, NftTransferCallResult>;

   nft_approve: NearChangeMethod<NftApproveArgs, NftApproveResult>;
   nft_is_approved: NearViewMethod<NftIsApprovedArgs, NftIsApprovedResult>;
   nft_revoke: NearChangeMethod<NftRevokeArgs, NftRevokeResult>;
   nft_revoke_all: NearChangeMethod<NftRevokeAllArgs, NftRevokeAllResult>;

   nft_supply_for_owner: NearViewMethod<NftSupplyForOwnerArgs, NftSupplyForOwnerResult>;
   nft_tokens: NearViewMethod<NftTokensArgs, NftTokensResult>;
   nft_tokens_for_owner: NearViewMethod<NftTokensForOwnerArgs, NftTokensForOwnerResult>;
   nft_total_supply: NearViewMethod<NftTotalSupplyArgs, NftTotalSupplyResult>;

   nft_payout: NearViewMethod<NftPayoutArgs, NftPayoutResult>;
   nft_transfer_payout: NearChangeMethod<NftTransferPayoutArgs, NftTransferPayoutResult>;
} & Contract;

export {};
