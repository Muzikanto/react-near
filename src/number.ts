import { formatNearPrice, parseNearAmount } from './utils';

export class YoctoPrice {
   protected value: number;

   constructor(value?: string) {
      this.value = value ? this.parse(value) : 0;
   }

   public static from(value: string): YoctoPrice {
      const inst = new YoctoPrice(value);

      return inst;
   }

   public plusYocto(value: string): this {
      this.value += this.parse(value);
      return this;
   }

    public plus(value: number): this {
        this.value += value;
        return this;
    }

   public minusYocto(value: string): this {
      this.value -= this.parse(value);
      return this;
   }

    public minus(value: number): this {
        this.value -= value;
        return this;
    }

   public mult(value: number): this {
      this.value *= value;
      return this;
   }

   public div(value: number): this {
      this.value /= value;
      return this;
   }

   public toYocto(): string {
      return parseNearAmount(this.value, 24);
   }

   public toRaw(): number {
      return this.value;
   }

   protected parse(value: string): number {
      return formatNearPrice(value, 24);
   }
}
