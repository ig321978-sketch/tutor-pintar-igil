// Pemuat Node kecil untuk uji: mengubah .tsx/.ts menjadi JavaScript lewat TypeScript, menambah ekstensi pada impor relatif.
// Dipakai: register("./loader-tsx.mjs", import.meta.url) sebelum mengimpor komponen. Tidak menyentuh kode aplikasi.
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import ts from "typescript";

export async function resolve(spec, ctx, next) {
  if ((spec.startsWith("./") || spec.startsWith("../")) && !/\.[a-z]+$/.test(spec)) {
    for (const ext of [".ts", ".tsx"]) {
      try {
        return await next(spec + ext, ctx);
      } catch {}
    }
  }
  return next(spec, ctx);
}

export async function load(url, ctx, next) {
  if (url.endsWith(".tsx") || url.endsWith(".ts")) {
    const src = await readFile(fileURLToPath(url), "utf8");
    const out = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX }, fileName: fileURLToPath(url) });
    return { format: "module", source: out.outputText, shortCircuit: true };
  }
  return next(url, ctx);
}
