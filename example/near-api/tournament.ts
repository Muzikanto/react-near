import { useNearQuery, useNearMutation, useNearContract } from "react-near";
import { NearQueryOptions } from "react-near/hooks/query";
import { NearMutationOptions } from "react-near/hooks/mutation";

export const TOURNAMENT_CONTRACT_NAME = 'mfight-tournament.testnet';

export enum TournamentViewMethods {
  tournament = 'tournament',
  tournament_free_places = 'tournament_free_places',
  tournament_is_whitelist_prize_owner = 'tournament_is_whitelist_prize_owner',
  tournament_member = 'tournament_member',
  tournament_metadata = 'tournament_metadata',
  tournament_nft_access = 'tournament_nft_access',
  tournament_players = 'tournament_players',
  tournament_prizes = 'tournament_prizes',
  tournaments = 'tournaments',
}

export enum TournamentChangeMethods {
  tournament_add_nft_access = 'tournament_add_nft_access',
  tournament_add_prize = 'tournament_add_prize', // payable
  tournament_add_whitelist_prize_owner = 'tournament_add_whitelist_prize_owner',
  tournament_create = 'tournament_create',
  tournament_end = 'tournament_end',
  tournament_execute_reward = 'tournament_execute_reward',
  tournament_join = 'tournament_join', // payable
  tournament_start = 'tournament_start',
}

export function useTournamentContract() {
  return (
    useNearContract(TOURNAMENT_CONTRACT_NAME, {
      viewMethods: [
        TournamentViewMethods.tournament,
        TournamentViewMethods.tournament_free_places,
        TournamentViewMethods.tournament_is_whitelist_prize_owner,
        TournamentViewMethods.tournament_member,
        TournamentViewMethods.tournament_metadata,
        TournamentViewMethods.tournament_nft_access,
        TournamentViewMethods.tournament_players,
        TournamentViewMethods.tournament_prizes,
        TournamentViewMethods.tournaments,
      ],
      changeMethods: [
        TournamentChangeMethods.tournament_add_nft_access,
        TournamentChangeMethods.tournament_add_prize,
        TournamentChangeMethods.tournament_add_whitelist_prize_owner,
        TournamentChangeMethods.tournament_create,
        TournamentChangeMethods.tournament_end,
        TournamentChangeMethods.tournament_execute_reward,
        TournamentChangeMethods.tournament_join,
        TournamentChangeMethods.tournament_start,
      ],
    }
  ));
}

export function useTournamentQueryRaw<Res = any, Req = any>(
  methodName: TournamentViewMethods,
  opts: NearQueryOptions<Res, Req> = {}
) {
  const contract = useTournamentContract();

  return useNearQuery(methodName, { contract, ...opts });
}

export function useTournamentMutationRaw<Res = any, Req = any>(
  methodName: TournamentChangeMethods,
  opts: NearMutationOptions<Res, Req> = {}
) {
  const contract = useTournamentContract();

  return useNearMutation(methodName, { contract, ...opts });
}

// tournament query

export type ITournamentArgs = {
  "tournament_id": "string",
  "owner_id": "AccountId"
};

export type ITournamentResult = JsonTournament | null;

export function useTournamentQuery(opts: NearQueryOptions<ITournamentResult, ITournamentArgs>) {
    return useTournamentQueryRaw<ITournamentResult, ITournamentArgs>(TournamentViewMethods.tournament, opts);
}

// tournament_add_nft_access mutation

export type ITournamentAddNftAccessArgs = {
  "tournament_id": "string",
  "token_ids": "string[]"
};

export type ITournamentAddNftAccessResult = void;

export function useTournamentAddNftAccessMutation(opts: NearMutationOptions<ITournamentAddNftAccessResult, ITournamentAddNftAccessArgs>) {
    return useTournamentMutationRaw<ITournamentAddNftAccessResult, ITournamentAddNftAccessArgs>(TournamentChangeMethods.tournament_add_nft_access, opts);
}

// tournament_add_prize mutation (payable)

export type ITournamentAddPrizeArgs = {
  "tournament_id": "string",
  "owner_id": "AccountId",
  "place_number": "integer",
  "prize_id": "string"
};

export type ITournamentAddPrizeResult = void;

export function useTournamentAddPrizeMutation(opts: NearMutationOptions<ITournamentAddPrizeResult, ITournamentAddPrizeArgs>) {
    return useTournamentMutationRaw<ITournamentAddPrizeResult, ITournamentAddPrizeArgs>(TournamentChangeMethods.tournament_add_prize, opts);
}

// tournament_add_whitelist_prize_owner mutation

export type ITournamentAddWhitelistPrizeOwnerArgs = {
  "tournament_id": "string",
  "account_id": "AccountId"
};

export type ITournamentAddWhitelistPrizeOwnerResult = void;

export function useTournamentAddWhitelistPrizeOwnerMutation(opts: NearMutationOptions<ITournamentAddWhitelistPrizeOwnerResult, ITournamentAddWhitelistPrizeOwnerArgs>) {
    return useTournamentMutationRaw<ITournamentAddWhitelistPrizeOwnerResult, ITournamentAddWhitelistPrizeOwnerArgs>(TournamentChangeMethods.tournament_add_whitelist_prize_owner, opts);
}

// tournament_create mutation

export type ITournamentCreateArgs = {
  "tournament_id": "string",
  "players_number": "integer",
  "price": "U128 | null",
  "name": "string",
  "media": "string | null",
  "summary": "string | null",
  "nft_access_contract": "AccountId | null"
};

export type ITournamentCreateResult = void;

export function useTournamentCreateMutation(opts: NearMutationOptions<ITournamentCreateResult, ITournamentCreateArgs>) {
    return useTournamentMutationRaw<ITournamentCreateResult, ITournamentCreateArgs>(TournamentChangeMethods.tournament_create, opts);
}

// tournament_end mutation

export type ITournamentEndArgs = {
  "tournament_id": "string"
};

export type ITournamentEndResult = void;

export function useTournamentEndMutation(opts: NearMutationOptions<ITournamentEndResult, ITournamentEndArgs>) {
    return useTournamentMutationRaw<ITournamentEndResult, ITournamentEndArgs>(TournamentChangeMethods.tournament_end, opts);
}

// tournament_execute_reward mutation

export type ITournamentExecuteRewardArgs = {
  "tournament_id": "string",
  "winner_place": "integer",
  "account_id": "AccountId",
  "prize_id": "string"
};

export type ITournamentExecuteRewardResult = void;

export function useTournamentExecuteRewardMutation(opts: NearMutationOptions<ITournamentExecuteRewardResult, ITournamentExecuteRewardArgs>) {
    return useTournamentMutationRaw<ITournamentExecuteRewardResult, ITournamentExecuteRewardArgs>(TournamentChangeMethods.tournament_execute_reward, opts);
}

// tournament_free_places query

export type ITournamentFreePlacesArgs = {
  "tournament_id": "string",
  "owner_id": "AccountId"
};

export type ITournamentFreePlacesResult = number | null;

export function useTournamentFreePlacesQuery(opts: NearQueryOptions<ITournamentFreePlacesResult, ITournamentFreePlacesArgs>) {
    return useTournamentQueryRaw<ITournamentFreePlacesResult, ITournamentFreePlacesArgs>(TournamentViewMethods.tournament_free_places, opts);
}

// tournament_is_whitelist_prize_owner query

export type ITournamentIsWhitelistPrizeOwnerArgs = {
  "tournament_id": "string",
  "owner_id": "AccountId",
  "account_id": "AccountId"
};

export type ITournamentIsWhitelistPrizeOwnerResult = boolean;

export function useTournamentIsWhitelistPrizeOwnerQuery(opts: NearQueryOptions<ITournamentIsWhitelistPrizeOwnerResult, ITournamentIsWhitelistPrizeOwnerArgs>) {
    return useTournamentQueryRaw<ITournamentIsWhitelistPrizeOwnerResult, ITournamentIsWhitelistPrizeOwnerArgs>(TournamentViewMethods.tournament_is_whitelist_prize_owner, opts);
}

// tournament_join mutation (payable)

export type ITournamentJoinArgs = {
  "tournament_id": "string",
  "owner_id": "AccountId"
};

export type ITournamentJoinResult = void;

export function useTournamentJoinMutation(opts: NearMutationOptions<ITournamentJoinResult, ITournamentJoinArgs>) {
    return useTournamentMutationRaw<ITournamentJoinResult, ITournamentJoinArgs>(TournamentChangeMethods.tournament_join, opts);
}

// tournament_member query

export type ITournamentMemberArgs = {
  "tournament_id": "string",
  "owner_id": "AccountId",
  "account_id": "AccountId"
};

export type ITournamentMemberResult = boolean;

export function useTournamentMemberQuery(opts: NearQueryOptions<ITournamentMemberResult, ITournamentMemberArgs>) {
    return useTournamentQueryRaw<ITournamentMemberResult, ITournamentMemberArgs>(TournamentViewMethods.tournament_member, opts);
}

// tournament_metadata query

export type ITournamentMetadataArgs = {};

export type ITournamentMetadataResult = TournamentFactoryMetadata;

export function useTournamentMetadataQuery(opts: NearQueryOptions<ITournamentMetadataResult, ITournamentMetadataArgs>) {
    return useTournamentQueryRaw<ITournamentMetadataResult, ITournamentMetadataArgs>(TournamentViewMethods.tournament_metadata, opts);
}

// tournament_nft_access query

export type ITournamentNftAccessArgs = {
  "tournament_id": "string",
  "owner_id": "AccountId"
};

export type ITournamentNftAccessResult = string[];

export function useTournamentNftAccessQuery(opts: NearQueryOptions<ITournamentNftAccessResult, ITournamentNftAccessArgs>) {
    return useTournamentQueryRaw<ITournamentNftAccessResult, ITournamentNftAccessArgs>(TournamentViewMethods.tournament_nft_access, opts);
}

// tournament_players query

export type ITournamentPlayersArgs = {
  "tournament_id": "string",
  "owner_id": "AccountId"
};

export type ITournamentPlayersResult = AccountId[];

export function useTournamentPlayersQuery(opts: NearQueryOptions<ITournamentPlayersResult, ITournamentPlayersArgs>) {
    return useTournamentQueryRaw<ITournamentPlayersResult, ITournamentPlayersArgs>(TournamentViewMethods.tournament_players, opts);
}

// tournament_prizes query

export type ITournamentPrizesArgs = {
  "tournament_id": "string",
  "owner_id": "AccountId"
};

export type ITournamentPrizesResult = object;

export function useTournamentPrizesQuery(opts: NearQueryOptions<ITournamentPrizesResult, ITournamentPrizesArgs>) {
    return useTournamentQueryRaw<ITournamentPrizesResult, ITournamentPrizesArgs>(TournamentViewMethods.tournament_prizes, opts);
}

// tournament_start mutation

export type ITournamentStartArgs = {
  "tournament_id": "string"
};

export type ITournamentStartResult = void;

export function useTournamentStartMutation(opts: NearMutationOptions<ITournamentStartResult, ITournamentStartArgs>) {
    return useTournamentMutationRaw<ITournamentStartResult, ITournamentStartArgs>(TournamentChangeMethods.tournament_start, opts);
}

// tournaments query

export type ITournamentsArgs = {
  "owner_id": "AccountId",
  "from_index": "U128 | null",
  "limit": "number | null"
};

export type ITournamentsResult = JsonTournament[];

export function useTournamentsQuery(opts: NearQueryOptions<ITournamentsResult, ITournamentsArgs>) {
    return useTournamentQueryRaw<ITournamentsResult, ITournamentsArgs>(TournamentViewMethods.tournaments, opts);
}

/**
 * Account identifier. This is the human readable utf8 string which is used internally to index accounts on the network and their respective state.
 *
 * Because these IDs have to be validated, they have to be converted from a string with [`FromStr`] or [`TryFrom`] a compatible type. To skip validation on initialization, [`AccountId::new_unchecked`] can be used.
 *
 * # Examples ``` use near_sdk::AccountId; use std::convert::{TryFrom, TryInto};
 *
 * // `FromStr` conversion let alice: AccountId = "alice.near".parse().unwrap(); assert!("invalid.".parse::<AccountId>().is_err());
 *
 * let alice_string = "alice".to_string();
 *
 * // From string with validation let alice = AccountId::try_from(alice_string.clone()).unwrap(); let alice: AccountId = alice_string.try_into().unwrap();
 *
 * // Initialize without validating let alice_unchecked = AccountId::new_unchecked("alice".to_string()); assert_eq!(alice, alice_unchecked); ```
 *
 * [`FromStr`]: std::str::FromStr
 */
export type AccountId = string;
export type U128 = string;
export type PromiseOrValueBoolean = boolean;
export type PromiseOrValueU128 = string;
export type RewardPrize =
  | {
      Near: {
        amount: U128;
        owner_id?: AccountId | null;
      };
    }
  | {
      Ft: {
        amount: U128;
        ft_contract_id: AccountId;
        owner_id?: AccountId | null;
      };
    }
  | {
      Nft: {
        nft_contract_id: AccountId;
        owner_id?: AccountId | null;
        token_id: string;
      };
    };

export interface Definitions {
  AccountId?: AccountId;
  JsonTournament?: JsonTournament;
  PromiseOrValueBoolean?: PromiseOrValueBoolean;
  PromiseOrValueU128?: PromiseOrValueU128;
  RewardPrize?: RewardPrize;
  TournamentFactoryMetadata?: TournamentFactoryMetadata;
  TournamentMetadata?: TournamentMetadata;
  U128?: U128;
}
export interface JsonTournament {
  access_nft_contract?: AccountId | null;
  created_at: number;
  ended_at?: number | null;
  metadata: TournamentMetadata;
  owner_id: AccountId;
  players_current: number;
  players_total: number;
  price?: U128 | null;
  started_at?: number | null;
  tournament_id: string;
}
export interface TournamentMetadata {
  media?: string | null;
  name: string;
  summary?: string | null;
}
export interface TournamentFactoryMetadata {
  icon?: string | null;
  name: string;
}
