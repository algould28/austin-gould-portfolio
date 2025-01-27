import { inputStore } from "../Utils/Store";

export default class InputController {
  constructor() {
    this.inputStore = inputStore;
    this.keyPressed = {};

    // only accept inputs once the preloader is done (meaning the user has pressed the start button)
    this.inputStore.subscribe((state) => {
      if (state.ready) this.startListening();
    });
  }

  startListening() {
    window.addEventListener("keydown", (event) => this.onKeyDown(event));
    window.addEventListener("keyup", (event) => this.onKeyUp(event));
    window.addEventListener("touchstart", (event) => this.onTouchStart(event));
    window.addEventListener("touchmove", (event) => this.onTouchMove(event));
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

  onTouchMove(event) {
    console.log("onTouchMove");
    console.log(event);
  }

  onTouchStart(event) {
    console.log("onTouchStart");
    console.log(event);
  }
}
