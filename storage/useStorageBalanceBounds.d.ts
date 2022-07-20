import { NearQueryOptions } from '../hooks';
export declare type StorageBalanceBoundsArgs = {};
export declare type StorageBalanceBounds = {
    min: string;
    max?: string;
};
declare function useStorageBalanceBounds<Res = StorageBalanceBounds, Req extends StorageBalanceBoundsArgs = StorageBalanceBoundsArgs>(opts: NearQueryOptions<Res, Req>): {
    data: Res | undefined;
    loading: boolean;
    error: Error | null | undefined;
    refetch: (args?: Req | undefined) => Promise<Res | undefined>;
};
export default useStorageBalanceBounds;
