import { NearMutationOptions } from '../hooks';
export declare type StorageUnregisterArgs = {
    force?: boolean;
};
declare function useStorageUnregister<Res = boolean, Req extends StorageUnregisterArgs = StorageUnregisterArgs>(opts: NearMutationOptions<Res, Req>): readonly [(args: Req, attachedDeposit?: string | undefined, gas?: number | undefined) => Promise<Res>, {
    readonly data: Res | undefined;
    readonly loading: boolean;
}];
export default useStorageUnregister;
