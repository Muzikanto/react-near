import { Near } from 'near-api-js';
import { useNearContext } from '../NearProvider';

function useNear(): Near | null {
   const { near } = useNearContext();
   const state = near as Near | null;

   // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
   return state;
}

export default useNear;
