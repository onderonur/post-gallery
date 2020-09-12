export async function to<T, U = Error>(
  promise: Promise<T>,
): Promise<{ data: T; error: null } | { data: undefined; error: U }> {
  return promise
    .then((data) => ({ data, error: null }))
    .catch((error: U) => ({ error, data: undefined }));
}
