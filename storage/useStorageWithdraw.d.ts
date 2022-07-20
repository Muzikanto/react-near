import { NearMutationOptions } from '../hooks';
import { StorageBalance } from "./useStorageDeposit";
export declare type StorageWithdrawArgs = {
    amount?: string;
};
declare function useStorageWithdraw<Res = StorageBalance, Req extends StorageWithdrawArgs = StorageWithdrawArgs>(opts: NearMutationOptions<Res, Req>): readonly [(args: Req, attachedDeposit?: string | undefined, gas?: number | undefined) => Promise<Res>, {
    readonly data: Res | undefined;
    readonly loading: boolean;
}];
export default useStorageWithdraw;
