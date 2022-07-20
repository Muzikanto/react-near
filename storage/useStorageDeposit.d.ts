import { NearMutationOptions } from '../hooks';
export declare type StorageDepositArgs = {
    account_id?: string;
    registration_only?: boolean;
};
export declare type StorageBalance = {
    total: string;
    available: string;
};
declare function useStorageDeposit<Res = StorageBalance, Req extends StorageDepositArgs = StorageDepositArgs>(opts: NearMutationOptions<Res, Req>): readonly [(args: Req, attachedDeposit?: string | undefined, gas?: number | undefined) => Promise<Res>, {
    readonly data: Res | undefined;
    readonly loading: boolean;
}];
export default useStorageDeposit;
