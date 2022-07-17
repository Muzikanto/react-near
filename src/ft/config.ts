import { DEFAULT_STORAGE_METHODS } from '../storage/config';

const DEFAULT_FT_METHODS: { viewMethods: string[]; changeMethods: string[] } = {
   viewMethods: ['ft_metadata', 'ft_balance_of', 'ft_total_supply'],
   changeMethods: ['ft_transfer_call', 'ft_transfer'],
};

const STANDARD_FT_METHODS: { viewMethods: string[]; changeMethods: string[] } = {
   viewMethods: [...DEFAULT_FT_METHODS.viewMethods, ...DEFAULT_STORAGE_METHODS.viewMethods],
   changeMethods: [...DEFAULT_FT_METHODS.changeMethods, ...DEFAULT_STORAGE_METHODS.changeMethods],
};

export { DEFAULT_FT_METHODS, DEFAULT_STORAGE_METHODS, STANDARD_FT_METHODS };
