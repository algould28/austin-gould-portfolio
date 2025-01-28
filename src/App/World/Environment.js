import * as THREE from "three";
import App from "../App.js";
import assetStore from "../Utils/AssetStore.js";
import Portal from "./Portal.js";
import ModalContentProvider from "../UI/ModalContentProvider.js";

export default class Environment {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.physics = this.app.world.physics;

    this.assetStore = assetStore.getState();
    this.environment = this.assetStore.loadedAssets.environment;
    this.background = this.assetStore.loadedAssets?.background;
    console.log(this.background);

    this.loadEnvironment();
    this.addLights();
    this.addGround();
    this.addPortals();
  }

  loadEnvironment() {
    // load environment here
    const environmentScene = this.environment.scene;
    this.scene.add(environmentScene);

    if (this.background) this.scene.background = this.background;

    environmentScene.position.set(-9.1, 0.07, -11.8);
    environmentScene.rotation.set(0, -0.6, 0);
    environmentScene.scale.setScalar(0.82);

    const physicalObjects = [
      "trees",
      "terrain",
      "rocks",
      "stairs",
      "gates",
      "floor",
      "bushes",
    ];

    const shadowCasters = [
      "trees",
      "terrain",
      "rocks",
      "stairs",
      "gates",
      "bushes",
    ];

    const shadowReceivers = ["floor", "terrain", "stairs", "gates"];

    for (const child of environmentScene.children) {
      child.traverse((obj) => {
        if (obj.isMesh) {
          obj.castShadow = shadowCasters.some((keyword) =>
            child.name.includes(keyword)
          );
          obj.receiveShadow = shadowReceivers.some((keyword) =>
            child.name.includes(keyword)
          );
          if (physicalObjects.some((keyword) => child.name.includes(keyword))) {
            this.physics.add(obj, "fixed", "cuboid");
          }
        }
      });
    }
  }

  addLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(ambientLight);

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    this.directionalLight.position.set(1, 1, 1.8);
    this.directionalLight.castShadow = true;
    this.directionalLight.shadow.camera.top = 30;
    this.directionalLight.shadow.camera.right = 30;
    this.directionalLight.shadow.camera.left = -30;
    this.directionalLight.shadow.camera.bottom = -30;
    this.directionalLight.shadow.bias = -0.002;
    this.directionalLight.shadow.normalBias = 0.2;
    this.scene.add(this.directionalLight);
  }

  addGround() {
    const groundGeometry = new THREE.BoxGeometry(100, 1, 100);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: "turquoise",
      visible: false,
    });
    this.groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    this.groundMesh.position.set(0, -0.1, 0);
    this.scene.add(this.groundMesh);
    this.physics.add(this.groundMesh, "fixed", "cuboid");
  }

  addPortals() {
    const aboutMePortalMesh =
      this.environment.scene.getObjectByName("portals001");
    const work1PortalMesh = this.environment.scene.getObjectByName("portals");
    const work2PortalMesh =
      this.environment.scene.getObjectByName("portals002");
    const contactPortalMesh =
      this.environment.scene.getObjectByName("portals004");
    const codePortalMesh = this.environment.scene.getObjectByName("portals003");

    const modalContentProvider = new ModalContentProvider();

    this.aboutMePortal = new Portal(
      aboutMePortalMesh,
      modalContentProvider.getModalInfo("aboutMe")
    );
    this.contactPortal = new Portal(
      contactPortalMesh,
      modalContentProvider.getModalInfo("contact")
    );
    this.work1Portal = new Portal(
      work1PortalMesh,
      modalContentProvider.getModalInfo("work1")
    );
    this.work2Portal = new Portal(
      work2PortalMesh,
      modalContentProvider.getModalInfo("work2")
    );
    this.codePortal = new Portal(
      codePortalMesh,
      modalContentProvider.getModalInfo("code")
    );
  }

  loop() {
    this.aboutMePortal.loop();
    this.contactPortal.loop();
    this.work1Portal.loop();
    this.work2Portal.loop();
    this.codePortal.loop();
  }
}
