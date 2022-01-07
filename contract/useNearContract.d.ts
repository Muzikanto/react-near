import { Contract } from 'near-api-js';
export declare type NearContract = Contract;
declare function useNearContract(contractId: string, contractMethods: {
    viewMethods: string[];
    changeMethods: string[];
}): NearContract | null;
export default useNearContract;
