import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { CryptoService } from '@/shared/crypto/crypto.service.interface';

@Injectable()
export class NodeCryptoService implements CryptoService {
  private readonly ALGORITHM = 'aes-256-cbc';
  private readonly HASH_ALGORITHM = 'sha256';
  private readonly KEY: Buffer;
  private readonly IV: Buffer;

  constructor() {
    const key = process.env.CRYPTO_SECRET_KEY;
    const iv = process.env.CRYPTO_IV;

    if (!key || !iv) {
      throw new Error(
        'Missing CRYPTO_SECRET_KEY or CRYPTO_IV environment variable.',
      );
    }

    this.KEY = Buffer.from(key, 'hex');
    this.IV = Buffer.from(iv, 'hex');
  }

  hash(value: string): string {
    return crypto.createHash(this.HASH_ALGORITHM).update(value).digest('hex');
  }

  encrypt(plainText: string): string {
    const cipher = crypto.createCipheriv(this.ALGORITHM, this.KEY, this.IV);
    const encrypted = Buffer.concat([
      cipher.update(plainText, 'utf8'),
      cipher.final(),
    ]);
    return encrypted.toString('hex');
  }

  decrypt(cipherText: string): string {
    const decipher = crypto.createDecipheriv(this.ALGORITHM, this.KEY, this.IV);
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(cipherText, 'hex')),
      decipher.final(),
    ]);
    return decrypted.toString('utf8');
  }
}
