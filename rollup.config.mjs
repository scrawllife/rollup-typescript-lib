import path from "path";
import { fileURLToPath } from "node:url";
import babel from "@rollup/plugin-babel";
import nodeResolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
// import typescript from "@rollup/plugin-typescript";
import typescript from "rollup-plugin-typescript2";

import pkg from "./package.json" assert { type: "json" };

const extensions = [".js", ".ts"];

const resolve = (...args) => {
  return path.resolve(path.dirname(fileURLToPath(import.meta.url)), ...args);
};

const outPutConfig = (config) => {
  return config.map((i) => ({
    ...i,
    sourcemap: true,
  }));
};

export default {
  input: resolve("./lib/index.ts"),
  output: outPutConfig([
    {
      file: resolve("./", pkg.main),
      format: "cjs",
    },
    {
      file: resolve("./", pkg.module),
      format: "es",
    },
  ]),
  plugins: [
    commonjs(),
    nodeResolve({
      extensions,
      modulesOnly: true,
    }),
    typescript({
      useTsconfigDeclarationDir: true,
    }),
    babel({
      exclude: "node_modules/**",
      babelHelpers: "runtime",
      extensions,
    }),
    json(),
    terser(),
  ],
};
