import App from "../App";
import { inputStore } from "../Utils/Store";
import * as THREE from "three";

export default class InputController {
  constructor() {
    this.inputStore = inputStore;
    this.keyPressed = {};
    this.app = new App();

    // only accept inputs once the preloader is done (meaning the user has pressed the start button)
    const unsubscribe = this.inputStore.subscribe((state) => {
      if (state.ready) {
        this.startListening();
        unsubscribe();
      }
    });
  }

  startListening() {
    this.character = this.app.world.character.instance;
    //keyboard listeners
    window.addEventListener("keydown", (event) => this.onKeyDown(event));
    window.addEventListener("keyup", (event) => this.onKeyUp(event));

    const canvas = document.getElementById("canvas");
    //mobile touch listeners
    canvas.addEventListener("touchstart", (event) => this.onTouchStart(event));
    canvas.addEventListener("touchend", () => this.onTouchEnd());
    canvas.addEventListener("touchmove", (event) => this.onTouchStart(event));
  }

  onKeyDown(event) {
    if (!this.keyPressed[event.code]) {
      switch (event.code) {
        case "KeyW":
        case "ArrowUp":
          inputStore.setState({ forward: true });
          break;
        case "KeyA":
        case "ArrowLeft":
          inputStore.setState({ left: true });
          break;
        case "KeyS":
        case "ArrowDown":
          inputStore.setState({ backward: true });
          break;
        case "KeyD":
        case "ArrowRight":
          inputStore.setState({ right: true });
          break;
      }
      this.keyPressed[event.code] = true;
    }
  }

  onKeyUp(event) {
    switch (event.code) {
      case "KeyW":
      case "ArrowUp":
        inputStore.setState({ forward: false });
        break;
      case "KeyA":
      case "ArrowLeft":
        inputStore.setState({ left: false });
        break;
      case "KeyS":
      case "ArrowDown":
        inputStore.setState({ backward: false });
        break;
      case "KeyD":
      case "ArrowRight":
        inputStore.setState({ right: false });
        break;
    }
    this.keyPressed[event.code] = false;
  }

  onTouchStart(event) {
    event.preventDefault();
    if (event?.targetTouches && event.targetTouches.length > 0) {
      const pageX = event.targetTouches[0]?.pageX;
      const pageY = event.targetTouches[0]?.pageY;

      if (pageX != null && pageY != null) {
        const normalizedX = pageX - window.innerWidth * 0.5;
        const normalizedY = pageY - window.innerHeight * 0.801;

        // three js uses y as the vertical axis so z is horizontal in this case
        const touchVector = new THREE.Vector3(normalizedX, 0, normalizedY);
        inputStore.setState({ touchVector });
      }

      // console.log("pageTouchX: ", event.targetTouches[0]?.pageX);
      // console.log("pageTouchY: ", event.targetTouches[0]?.pageY);
      // console.log("windowWidth: ", window.innerWidth);
      // console.log("windowHeight: ", window.innerHeight);
      // console.log(
      //   "pageX Normalized: ",
      //   event.targetTouches[0]?.pageX - window.innerWidth * 0.5
      // );
      // console.log(
      //   "pageY Normalized: ",
      //   event.targetTouches[0]?.pageY - window.innerHeight * 0.8
      // );
      // console.log("character position: ", this.character.position);
      // console.log(
      //   "x relative to character: ",
      //   this.character.position.x -
      //     (event.targetTouches[0]?.pageX - window.innerWidth * 0.5)
      // );
      // console.log(
      //   "z relative to character: ",
      //   this.character.position.z -
      //     (event.targetTouches[0]?.pageY - window.innerHeight * 0.8)
      // );
    }
  }

  onTouchEnd() {
    inputStore.setState({
      touchVector: undefined,
    });
  }
}
