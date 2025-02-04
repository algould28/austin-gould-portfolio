import assetStore from "../Utils/AssetStore.js";
import { inputStore } from "../Utils/Store";
import { appStateStore } from "../Utils/Store.js";

export default class Preloader {
  constructor() {
    this.assetStore = assetStore;
    this.inputStore = inputStore;

    // access to DOM elements
    this.overlay = document.querySelector(".overlay");
    this.loading = document.querySelector(".loading");
    this.startContainer = document.querySelector(".start-container");
    this.startButton = document.querySelector(".start");

    this.assetStore.subscribe((state) => {
      this.numberOfLoadedAssets = Object.keys(state.loadedAssets).length;
      this.numberOfAssetsToLoad = state.assetsToLoad.length;
      this.progress = this.numberOfLoadedAssets / this.numberOfAssetsToLoad;
      this.progress = Math.trunc(this.progress * 100);
      document.getElementById("progressPercentage").innerHTML = this.progress;

      if (this.progress === 100) {
        appStateStore.setState({ assetsReady: true });
        this.loading.classList.add("fade");
        window.setTimeout(() => this.ready(), 1200);
      }
    });
  }

  ready() {
    this.loading.remove();

    this.startContainer.style.display = "flex";
    this.startContainer.classList.add("fadeIn");

    this.startButton.addEventListener(
      "click",
      () => {
        this.overlay.classList.add("fade");
        this.startContainer.classList.add("fadeOut");
        // start accepting inputs
        this.inputStore.setState({ ready: true });

        window.setTimeout(() => {
          this.overlay.remove();
          this.startButton.remove();
          this.controlsText.remove();
        }, 2000);
      },
      { once: true }
    );
  }
}
