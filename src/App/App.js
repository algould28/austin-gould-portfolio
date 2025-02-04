import * as THREE from "three";
import Camera from "./Camera.js";
import Renderer from "./Renderer.js";
import Preloader from "./UI/Preloader.js";
import AssetLoader from "./Utils/AssetLoader.js";
import Loop from "./Utils/Loop.js";
import Resize from "./Utils/Resize.js";
import World from "./World/World.js";

let instance = null;

export default class App {
  constructor() {
    if (instance) return instance;
    instance = this;

    // set asset loading percentage to 0
    document.getElementById("progressPercentage").innerHTML = 0;

    // threejs elements
    this.canvas = document.querySelector("canvas.threejs");
    this.scene = new THREE.Scene();

    // add debug GUI
    // this.gui = new GUI()

    // Asset Loader
    this.assetLoader = new AssetLoader();

    // UI
    this.preloader = new Preloader();

    // World
    this.world = new World();

    // Camera and Renderer
    this.camera = new Camera();
    this.renderer = new Renderer();

    // extra utils
    this.loop = new Loop();
    this.resize = new Resize();
  }
}
