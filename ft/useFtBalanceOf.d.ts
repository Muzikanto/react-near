import { NearQueryOptions } from '../hooks';
export declare type FtBalanceOfArgs = {
    account_id: string;
};
declare function useFtBalanceOf<Res = void, Req extends FtBalanceOfArgs = FtBalanceOfArgs>(opts: NearQueryOptions<Res, Req>): {
    data: Res | undefined;
    loading: boolean;
    error: Error | null | undefined;
    refetch: (args?: Req | undefined) => Promise<Res | undefined>;
};
export default useFtBalanceOf;
