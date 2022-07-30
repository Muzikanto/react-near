import { StorageWithdrawArgs, StorageWithdrawResult } from './useStorageWithdraw';
import { StorageUnregisterArgs, StorageUnregisterResult } from './useStorageUnregister';
import { StorageDepositArgs, StorageDepositResult } from './useStorageDeposit';
import { StorageBalanceOfArgs, StorageBalanceOfResult } from './useStorageBalanceOf';
import { StorageBalanceBoundsArgs, StorageBalanceBoundsResult } from './useStorageBalanceBounds';
import { NearChangeMethod, NearViewMethod } from '../../types';

export type StorageBalance = {
   total: string;
   available: string;
};
export type StorageBalanceBounds = {
   min: string;
   max?: string;
};

export type StorageContract = {
   storage_withdraw: NearChangeMethod<StorageWithdrawArgs, StorageWithdrawResult>;
   storage_unregister: NearChangeMethod<StorageUnregisterArgs, StorageUnregisterResult>;
   storage_deposit: NearChangeMethod<StorageDepositArgs, StorageDepositResult>;
   storage_balance_of: NearViewMethod<StorageBalanceOfArgs, StorageBalanceOfResult>;
   storage_balance_bounds: NearViewMethod<StorageBalanceBoundsArgs, StorageBalanceBoundsResult>;
};

export {};
