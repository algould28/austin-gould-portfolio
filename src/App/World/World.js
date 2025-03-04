import App from "../App.js";
import Physics from "./Physics.js";
import Environment from "./Environment.js";
import Character from "./Character.js";
import CharacterController from "./CharacterController.js";
import AnimationController from "./AnimationController.js";
import InputController from "../UI/InputController.js";

import { appStateStore } from "../Utils/Store.js";

export default class World {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;

    this.physics = new Physics();

    // create world classes
    const unsubscribe = appStateStore.subscribe((state) => {
      if (state.physicsReady && state.assetsReady) {
        this.environment = new Environment();
        this.character = new Character();
        this.characterController = new CharacterController();
        this.animationController = new AnimationController();
        this.inputController = new InputController();
        unsubscribe();
      }
    });

    this.loop();
  }

  loop(deltaTime) {
    this.physics.loop();
    if (this.environment) this.environment.loop();
    if (this.characterController) this.characterController.loop(deltaTime);
    if (this.animationController) this.animationController.loop(deltaTime);
  }
}
