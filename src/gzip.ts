import { Codec } from './types';
import { ValueError } from './errors';
import pako from 'pako';

export type ValidGZipLevelSetting = -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export class GZip implements Codec {
  public codecId = 'gzip';
  public level: ValidGZipLevelSetting;

  constructor(level: number) {
    if (level < 0 || level > 9) {
      throw new ValueError(
        'Invalid gzip compression level, it should be between 0 and 9',
      );
    }
    this.level = level as ValidGZipLevelSetting;
  }

  encode(data: Uint8Array): Uint8Array {
    const gzipped = pako.gzip(data, { level: this.level });
    return gzipped;
  }

  decode(data: Uint8Array, out?: Uint8Array): Uint8Array {
    const uncompressed = pako.ungzip(data);
    if (out !== undefined) {
      out.set(uncompressed);
      return out;
    }

    return uncompressed;
  }
}
