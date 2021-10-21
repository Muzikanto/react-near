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
import NearProvider, { NearEnvironment, NearContext } from './NearProvider';
import getNearConfig, { NEAR_GAS } from './config';
import { getNearError } from './utils';

export {
   useNear,
   useNearWallet,
   useNearUser,
   useNearContract,
   useNearAccount,
   //
   NEAR_GAS,
   NearContext,
   //
   NearProvider,
   NearEnvironment,
   getNearConfig,
   getNearError,
   //
   useNearQuery,
   NearQueryOptions,
   useNearMutation,
   NearMutationOptions,
};
