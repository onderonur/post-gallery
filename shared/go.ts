type GoResult<Data, E extends Error> =
  | { data: Data; error: null }
  | { data: null; error: E };

export async function go<D, E extends Error>(
  callback: () => Promise<D>,
): Promise<GoResult<D, E>> {
  try {
    const data = await callback();
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export function goSync<D, E extends Error>(callback: () => D): GoResult<D, E> {
  try {
    const data = callback();
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}
