import { Denovo } from "https://deno.land/x/denovo_core@v0.0.5/mod.ts";
import { bench } from "./bench.ts";
import { calc } from "./statistical.ts";

export function main(denovo: Denovo): void {
  denovo.dispatcher = {
    async benchmark(
      size: string,
      count: string,
      n: string,
    ): Promise<string> {
      const result = await benchmark(
        parseInt(size),
        parseInt(count),
        parseInt(n),
        async () => {
          for (let i = 0; i < parseInt(n); i++) {
            await denovo.eval("true");
          }
        },
      );
      return result.join("\n");
    },
  };
}

async function benchmark(
  size: number,
  count: number,
  n: number,
  f: () => Promise<void>,
): Promise<string[]> {
  const rs = await bench(n, f);
  const { sum, mean, median, stddev, stderr } = calc(rs);
  // Operations per millisecond
  const opms = calc(rs.map((v) => count / v));
  // Chars per millisecond
  const cpms = calc(rs.map((v) => size * count / v));
  const content = [];
  content.push(`sum:     ${sum.toFixed()} ms`);
  content.push(`mean:    ${mean.toFixed(1)} ms`);
  content.push(`median:  ${median.toFixed(1)} ms`);
  content.push(`stddev:  ${stddev.toFixed(1)}`);
  content.push(`stderr:  ${stderr.toFixed(1)} ms`);
  content.push(
    `opms:    ${opms.mean.toFixed(1)}±${opms.stderr.toFixed(1)} ops/ms`,
  );
  content.push(
    `cpms:    ${cpms.mean.toFixed(1)}±${cpms.stderr.toFixed(1)} chars/ms`,
  );
  return content;
}
