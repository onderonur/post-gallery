export async function to<D, E = Error>(
  promise: Promise<D>,
): Promise<{ data: D; error: null } | { data: undefined; error: E }> {
  return promise
    .then((data) => ({ data, error: null }))
    .catch((error: E) => ({ error, data: undefined }));
}
