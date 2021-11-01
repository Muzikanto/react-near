import {
   useNearContract,
   useNearWallet,
   useNear,
   useNearUser,
   useNearAccount,
   useNearMutation,
   useNearQuery,
   NearQueryOptions,
   NearMutationOptions,
} from './hooks';
import NearProvider, {
   NearEnvironment,
   NearContext,
   NearContextType,
   NearProviderProps,
} from './NearProvider';
import NearContractProvider, {
   NearContractContextType,
   NearContractContext,
   NearContractProviderProps,
} from './NearContractProvider';
import getNearConfig, { NEAR_GAS } from './config';
import { getNearError } from './utils';
import useNearContractProvided from './core/contract-provided';

export {
   useNear,
   useNearWallet,
   useNearUser,
   useNearContract,
   useNearAccount,
   //
   NEAR_GAS,
   //
   NearProvider,
   NearContext,
   NearContextType,
   NearProviderProps,
   //
   useNearContractProvided,
   NearContractProvider,
   NearContractContext,
   NearContractContextType,
   NearContractProviderProps,
   //
   NearEnvironment,
   getNearConfig,
   getNearError,
   //
   useNearQuery,
   NearQueryOptions,
   useNearMutation,
   NearMutationOptions,
};
