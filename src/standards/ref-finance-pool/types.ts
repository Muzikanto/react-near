export type RefFinancePool = {
   amounts: [string, string];
   amp: number;
   pool_kind: string; // SIMPLE_POOL;
   shares_total_supply: string;
   token_account_ids: [string, string];
   total_fee: number;
};

export {};
