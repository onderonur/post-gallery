export const toBase64 = (string: string) =>
  Buffer.from(string).toString('base64');

export const fromBase64 = (base64String: string) =>
  Buffer.from(base64String, 'base64').toString();
