export const CRYPTO_SERVICE = Symbol('CRYPTO_SERVICE');

export interface CryptoService {
  hash(value: string): string;
  encrypt(value: string): string;
  decrypt(value: string): string;
}
