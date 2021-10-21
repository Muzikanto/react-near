import { Near } from 'near-api-js';
import React from 'react';
import { NearContext } from '../NearProvider';

function useNear(): Near | null {
   const { near } = React.useContext(NearContext);
   const state = near as Near | null;

   // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
   return state;
}

export default useNear;
