import {
   useNearUser,
   useNearMutation,
   useNearQuery,
   useNearStatus,
   useNearClient,
   useNear,
   useNearEnv,
} from './hooks';

import { NearProvider, NearContext } from './core/near';
import NearEnvironmentProvider, { NearEnvironmentContext } from './core/env';
import createNearClient, { encodeRequest } from './core/client';

import { NEAR_GAS } from './utils/config';
import {
   getNearError,
   formatNearAddress,
   formatNearPrice,
   parseNearAmount,
   isValidNearAddress,
   parseNearDate,
} from './utils';
import { NearEnvironment } from './utils/config';
import { YoctoPrice } from './utils/number';

export {
   useNear,
   useNearUser,
   useNearStatus,
   useNearClient,
   useNearQuery,
   useNearMutation,
   useNearEnv,
   //
   NEAR_GAS,
   //
   NearProvider,
   NearContext,
   //
   NearEnvironment,
   getNearError,
   formatNearAddress,
   formatNearPrice,
   parseNearAmount,
   isValidNearAddress,
   parseNearDate,

   //
   NearEnvironmentContext,
   NearEnvironmentProvider,
   //
   createNearClient,
   encodeRequest,

   //
   YoctoPrice,
};
