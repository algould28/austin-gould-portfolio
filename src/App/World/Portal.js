import App from "../App";
import * as THREE from "three";
import ModalManager from "../UI/ModalManager";
import { Tween } from "@tweenjs/tween.js";

export default class Portal {
  constructor(portalMesh, modalInfo) {
    this.app = new App();
    this.modalManager = new ModalManager();

    this.portalMesh = portalMesh;
    this.modalInfo = modalInfo;
    this.previouslyIsNear = false;

    this.portalNearColor = new THREE.Color(0xc77be2);
    this.portalFarColor1 = new THREE.Color(0xa528e2);
    this.portalFarColor2 = new THREE.Color(0x5f078a);

    // code examples is in progress so flashing yellow and black like caution tape for now
    if (modalInfo.title === "Code Examples") {
      this.portalNearColor = new THREE.Color(0xe5e5e5);
      this.portalFarColor1 = new THREE.Color(0xd5d914);
      this.portalFarColor2 = new THREE.Color(0x000000);
    }

    this.portalNearMaterial = new THREE.MeshStandardMaterial({
      ...portalMesh.material,
      emissive: this.portalNearColor,
      transparent: true,
      opacity: 0.8,
    });

    this.portalFarMaterial = new THREE.MeshStandardMaterial({
      ...portalMesh.material,
      emissive: this.portalFarColor1,
      transparent: true,
      opacity: 0.8,
    });

    this.portalMesh.material = this.portalFarMaterial;
    this.animatePortalColor1();
  }

  animatePortalColor1() {
    this.tween = new Tween(this.portalFarMaterial.emissive);

    this.tween
      .to(this.portalFarColor1, 3000)
      .onComplete(() => {
        setTimeout(() => {
          this.animatePortalColor2();
        }, 500);
      })
      .start();
  }

  animatePortalColor2() {
    this.tween = new Tween(this.portalFarMaterial.emissive);

    this.tween
      .to(this.portalFarColor2, 3000)
      .onComplete(() => {
        setTimeout(() => {
          this.animatePortalColor1();
        }, 500);
      })
      .start();
  }

  loop() {
    this.character = this.app.world.character.instance;
    if (this.character) {
      // if (this.modalInfo.title === "Code Examples")
      this.tween.update();

      const portalPosition = new THREE.Vector3();
      //this copies the portalMesh position to the portalPosition vector
      this.portalMesh.getWorldPosition(portalPosition);
      const distanceFromPortal =
        this.character.position.distanceTo(portalPosition);

      const isNear = distanceFromPortal < 1.75;

      if (isNear && !this.previouslyIsNear) {
        this.portalMesh.material = this.portalNearMaterial;

        this.modalManager.openModal(
          this.modalInfo.title,
          this.modalInfo.description
        );
        this.previouslyIsNear = true;
      }

      if (!isNear && this.previouslyIsNear) {
        this.portalMesh.material = this.portalFarMaterial;
        this.modalManager.closeModal();
        this.previouslyIsNear = false;
      }
    }
  }
}
