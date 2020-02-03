export const convertMBToBytes = (mb: number) => mb * 1024 * 1024;

export const getLastOfArray = <T>(array: T[]) => {
  if (array.length) {
    const { length, [length - 1]: last } = array;
    return last;
  }
  return null;
};

export const toBase64 = (string: string) =>
  Buffer.from(string).toString('base64');

export const fromBase64 = (base64String: string) =>
  Buffer.from(base64String, 'base64').toString();
