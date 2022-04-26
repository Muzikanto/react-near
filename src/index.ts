import {
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
import getNearConfig, { NEAR_GAS } from './config';
import { getNearError } from './utils';
import {
   NearEnvironmentContext,
   useNearEnvironment,
   NearEnvironmentContextType,
   NearEnvironmentProviderProps,
} from './environment';

export {
   useNear,
   useNearWallet,
   useNearUser,
   useNearAccount,
   //
   NEAR_GAS,
   //
   NearProvider,
   NearContext,
   NearContextType,
   NearProviderProps,
   //
   NearEnvironment,
   getNearConfig,
   getNearError,
   //
   useNearQuery,
   NearQueryOptions,
   useNearMutation,
   NearMutationOptions,
   //
   NearEnvironmentContext,
   useNearEnvironment,
   NearEnvironmentContextType,
   NearEnvironmentProviderProps,
};
