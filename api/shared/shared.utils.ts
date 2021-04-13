export const toBase64 = (string: string) =>
  Buffer.from(string).toString('base64');

export const fromBase64 = (base64String: string) =>
  Buffer.from(base64String, 'base64').toString();

export const getLastOfArray = <T>(array: T[]) => {
  // We have this if, or the return type of the function
  // becomes T, instead of Maybe<T>.
  if (array.length) {
    const { length, [length - 1]: last } = array;
    return last;
  }
  return null;
};
