export declare function getNearError(e: any): any;
export declare const setNearCookie: (path: string, value: string, opts?: {
    maxAge?: number;
}) => void;
export declare const getNearCookie: (key: string) => string;
export declare const NEAR_ACCOUNT_ID_REGEX: RegExp;
export declare function isValidNearAddress(address: string): boolean;
export declare function formatNearPrice(price: string, decimals?: number): number;
export declare function parseNearAmount(value: string | number, decimals?: number): string;
export declare function formatNearAddress(address: string): string;
export declare function parseNearDate(blockTimestamp: number): Date;
