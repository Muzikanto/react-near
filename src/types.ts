export type NearChangeMethod<Vars extends { [key: string]: any } = {}, Res = void> = (args: {
   meta?: string;
   callbackUrl?: string;
   args: Vars;
   amount?: number;
}) => Promise<Res>;
export type NearViewMethod<Vars extends { [key: string]: any } = {}, Res = void> = (
   args: Vars,
) => Promise<Res>;

export {};
