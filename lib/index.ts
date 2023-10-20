import pkg from "./app";

interface IVersion {
  version: string;
}

export default {
  version: pkg.version,
} as IVersion;
