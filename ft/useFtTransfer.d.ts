import { NearMutationOptions } from '../hooks';
export declare type FtTransferArgs = {
    amount: string;
    receiver_id: string;
};
declare function useFtTransfer<Res = void, Req extends FtTransferArgs = FtTransferArgs>(opts: NearMutationOptions<Res, Req>): readonly [(args: Req, attachedDeposit?: string | undefined, gas?: number | undefined) => Promise<Res>, {
    readonly data: Res | undefined;
    readonly loading: boolean;
}];
export default useFtTransfer;
