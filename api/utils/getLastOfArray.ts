export const getLastOfArray = <T>(array: T[]) => {
  // We have this if, or the return type of the function
  // becomes T, instead of Maybe<T>.
  if (array.length) {
    const { length, [length - 1]: last } = array;
    return last;
  }
  return null;
};
