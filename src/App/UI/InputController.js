import App from "../App";
import { inputStore } from "../Utils/Store";

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

    //mobile touch listeners
    // window.addEventListener("touchstart", (event) => this.onTouchStart(event));
    // window.addEventListener("touchend", (event) => this.onTouchEnd(event));
    // window.addEventListener("touchmove", (event) => this.onTouchMove(event));
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
    if (event?.targetTouches && event.targetTouches.length > 0) {
      console.log(event.targetTouches[0]);
    }
  }

  onTouchStart(event) {
    console.log("onTouchStart");
    if (event?.targetTouches && event.targetTouches.length > 0) {
      const pageX = event.targetTouches[0]?.pageX;
      const pageY = event.targetTouches[0]?.pageY;

      if (pageX != null && pageY != null) {
        const normalizedX = pageX - window.innerWidth * 0.5;
        const normalizedY = pageY - window.innerHeight * 0.8;
        const diffX = this.character.position.x - normalizedX;
        // three js uses y as the vertical axis so z is horizontal in this case
        const diffZ = this.character.position.z - normalizedY;

        if (diffZ > 0) {
          inputStore.setState({ forward: true });
        } else {
          inputStore.setState({ backward: true });
        }

        if (diffX > 0) {
          inputStore.setState({ left: true });
        } else {
          inputStore.setState({ right: true });
        }

        // console.log("diffX: ", diffX);
        // console.log("diffZ: ", diffZ);
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

  onTouchEnd(event) {
    inputStore.setState({
      forward: false,
      backward: false,
      left: false,
      right: false,
    });
    console.log("onTouchEnd");
  }
}
