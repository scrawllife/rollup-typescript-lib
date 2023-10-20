import pkg from "../package.json";

interface IVersion {
  version: string;
}

export default {
  version: pkg.version,
} as IVersion;
