function getCrypto(): Crypto | null {
  if (typeof globalThis === 'undefined' || !('crypto' in globalThis)) {
    return null;
  }

  return globalThis.crypto ?? null;
}

function fallbackUuid(): string {
  const cryptoApi = getCrypto();

  if (cryptoApi?.getRandomValues) {
    const bytes = new Uint8Array(16);
    cryptoApi.getRandomValues(bytes);

    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;

    const hex = [...bytes].map((byte) => byte.toString(16).padStart(2, '0'));
    return `${hex[0]}${hex[1]}${hex[2]}${hex[3]}-${hex[4]}${hex[5]}-${hex[6]}${hex[7]}-${hex[8]}${hex[9]}-${hex[10]}${hex[11]}${hex[12]}${hex[13]}${hex[14]}${hex[15]}`;
  }

  const random = Math.random().toString(16).slice(2);
  return `${Date.now().toString(16)}-${random}`;
}

export function generateId(): string {
  const cryptoApi = getCrypto();

  if (typeof cryptoApi?.randomUUID === 'function') {
    return cryptoApi.randomUUID();
  }

  return fallbackUuid();
}
