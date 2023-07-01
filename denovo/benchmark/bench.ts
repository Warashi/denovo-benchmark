/**
 * Benchmark the given function.
 *
 * The function is run `n` times and the result is returned.
 *
 * @param f The function to benchmark.
 * @param n The number of times to run the function.
 * @returns The benchmark result.
 */
export async function bench(
  n: number,
  f: () => unknown | Promise<unknown>,
): Promise<number[]> {
  const rs: number[] = [];
  for (let i = 0; i < n; i++) {
    const s = performance.now();
    await f();
    const e = performance.now();
    rs.push(e - s);
  }
  return rs;
}
