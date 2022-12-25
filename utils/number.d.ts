export declare class YoctoPrice {
    protected value: number;
    constructor(value?: string);
    static from(value: string): YoctoPrice;
    plusYocto(value: string): this;
    plus(value: number): this;
    minusYocto(value: string): this;
    minus(value: number): this;
    mult(value: number): this;
    div(value: number): this;
    toYocto(): string;
    toRaw(): number;
    protected parse(value: string): number;
}
