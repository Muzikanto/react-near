import { StorageMethods } from './methods';
import { StorageWithdrawArgs, StorageWithdrawResult } from './useStorageWithdraw';
import { StorageUnregisterArgs, StorageUnregisterResult } from './useStorageUnregister';
import { StorageDepositArgs, StorageDepositResult } from './useStorageDeposit';
import { StorageBalanceOfArgs, StorageBalanceOfResult } from './useStorageBalanceOf';
import { StorageBalanceBoundsArgs, StorageBalanceBoundsResult } from './useStorageBalanceBounds';

export type StorageBalance = {
   total: string;
   available: string;
};
export type StorageBalanceBounds = {
   min: string;
   max?: string;
};

export type StorageContract = {
   [StorageMethods.storage_withdraw]: (args: StorageWithdrawArgs) => Promise<StorageWithdrawResult>;
   [StorageMethods.storage_unregister]: (
      args: StorageUnregisterArgs,
   ) => Promise<StorageUnregisterResult>;
   [StorageMethods.storage_deposit]: (args: StorageDepositArgs) => Promise<StorageDepositResult>;
   [StorageMethods.storage_balance_of]: (
      args: StorageBalanceOfArgs,
   ) => Promise<StorageBalanceOfResult>;
   [StorageMethods.storage_balance_bounds]: (
      args: StorageBalanceBoundsArgs,
   ) => Promise<StorageBalanceBoundsResult>;
};

export {};
