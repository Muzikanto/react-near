import React from 'react';
import { NearEnvironmentContext } from '../core/env';

function useNearEnv() {
   const ctx = React.useContext(NearEnvironmentContext);

   return ctx;
}

export default useNearEnv;
