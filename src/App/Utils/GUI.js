import { Pane } from "tweakpane";

export default class GUI {
  constructor() {
    // use tweakpane to play around with object properties (scale, size, rotation, etc) in real time
    this.pane = new Pane();
  }
}
