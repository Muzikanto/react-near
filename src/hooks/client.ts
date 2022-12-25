import { useNear } from '..';
import { NearClient } from '../core/client';

function useNearClient(): NearClient {
   const { client } = useNear();

   // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
   return client;
}

export default useNearClient;
