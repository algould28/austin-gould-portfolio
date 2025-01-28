import { createStore } from "zustand/vanilla";

const assetsToLoad = [
  {
    id: "avatar",
    path: "/models/avatar_animated.glb",
    type: "model",
  },
  {
    id: "environment",
    path: "/models/environment_purple_portals.glb",
    type: "model",
  },
  {
    id: "background",
    path: "/textures/cubeMap/",
    type: "cubeTexture",
  },
];

const assetStore = createStore((set) => ({
  assetsToLoad,
  loadedAssets: {},
  addLoadedAsset: (asset, id) =>
    set((state) => ({
      loadedAssets: {
        ...state.loadedAssets,
        [id]: asset,
      },
    })),
}));

export default assetStore;
