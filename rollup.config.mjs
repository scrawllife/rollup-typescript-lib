import path from "path";
import { fileURLToPath } from "node:url";
import babel from "@rollup/plugin-babel";
import nodeResolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";

import pkg from "./package.json" assert { type: "json" };

const extensions = [".js", ".ts"];

const resolve = (...args) => {
  return path.resolve(path.dirname(fileURLToPath(import.meta.url)), ...args);
};

export default {
  input: resolve("./src/index.ts"),
  output: {
    file: resolve("./", pkg.main), // 为了项目的统一性，这里读取 package.json 中的配置项
    format: "cjs",
  },
  plugins: [
    commonjs(),
    nodeResolve({
      extensions,
      modulesOnly: true,
    }),
    typescript(),
    babel({
      exclude: "node_modules/**",
      extensions,
    }),
    json(),
    terser(),
  ],
};
