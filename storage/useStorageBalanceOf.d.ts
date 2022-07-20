import { NearQueryOptions } from '../hooks';
import { StorageBalance } from './useStorageDeposit';
export declare type StorageBalanceOfArgs = {
    account_id: string;
};
declare function useStorageBalanceOf<Res = StorageBalance, Req extends StorageBalanceOfArgs = StorageBalanceOfArgs>(opts: NearQueryOptions<Res, Req>): {
    data: Res | undefined;
    loading: boolean;
    error: Error | null | undefined;
    refetch: (args?: Req | undefined) => Promise<Res | undefined>;
};
export default useStorageBalanceOf;
