import { NftCoreMethods } from '../nft-core/methods';
import { NftMetadataArgs, NftMetadataResult } from '../nft-core/useNftMetadata';
import { NftTransferCallArgs, NftTransferCallResult } from '../nft-core/useNftTransferCall';
import { NftTransferArgs } from '../nft-core/useNftTransfer';
import { NftTokenArgs, NftTokenResult } from '../nft-core/useNftToken';
import { NftApproveMethods } from '../nft-approve/methods';
import { NftRevokeAllArgs, NftRevokeAllResult } from '../nft-approve/useNftRevokeAll';
import { NftRevokeArgs, NftRevokeResult } from '../nft-approve/useNftRevoke';
import { NftIsApprovedArgs, NftIsApprovedResult } from '../nft-approve/useNftIsApproved';
import { NftApproveArgs, NftApproveResult } from '../nft-approve/useNftApprove';
import { NftEnumerationMethods } from '../nft-enumeration/methods';
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
import { NftPayoutMethods } from '../nft-payout/methods';
import { NftPayoutArgs, NftPayoutResult } from '../nft-payout/useNftPayout';
import { NftTransferPayoutArgs, NftTransferPayoutResult } from '../nft-payout/useNftTransferPayout';

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
   [NftCoreMethods.nft_metadata]: (args: NftMetadataArgs) => Promise<NftMetadataResult>;
   [NftCoreMethods.nft_token]: (args: NftTokenArgs) => Promise<NftTokenResult>;
   [NftCoreMethods.nft_transfer]: (args: NftTransferArgs) => Promise<NftMetadataResult>;
   [NftCoreMethods.nft_transfer_call]: (
      args: NftTransferCallArgs,
   ) => Promise<NftTransferCallResult>;

   [NftApproveMethods.nft_approve]: (args: NftApproveArgs) => Promise<NftApproveResult>;
   [NftApproveMethods.nft_is_approved]: (args: NftIsApprovedArgs) => Promise<NftIsApprovedResult>;
   [NftApproveMethods.nft_revoke]: (args: NftRevokeArgs) => Promise<NftRevokeResult>;
   [NftApproveMethods.nft_revoke_all]: (args: NftRevokeAllArgs) => Promise<NftRevokeAllResult>;

   [NftEnumerationMethods.nft_supply_for_owner]: (
      args: NftSupplyForOwnerArgs,
   ) => Promise<NftSupplyForOwnerResult>;
   [NftEnumerationMethods.nft_tokens]: (args: NftTokensArgs) => Promise<NftTokensResult>;
   [NftEnumerationMethods.nft_tokens_for_owner]: (
      args: NftTokensForOwnerArgs,
   ) => Promise<NftTokensForOwnerResult>;
   [NftEnumerationMethods.nft_total_supply]: (
      args: NftTotalSupplyArgs,
   ) => Promise<NftTotalSupplyResult>;

   [NftPayoutMethods.nft_payout]: (args: NftPayoutArgs) => Promise<NftPayoutResult>;
   [NftPayoutMethods.nft_transfer_payout]: (
      args: NftTransferPayoutArgs,
   ) => Promise<NftTransferPayoutResult>;
};

export {};
