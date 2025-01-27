import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

export default {
  root: "./",
  publicDir: "./public/",
  base: "./",
  plugins: [wasm(), topLevelAwait()],
};
