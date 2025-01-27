import App from "../App";
import * as THREE from "three";
import ModalManager from "../UI/ModalManager";

export default class Portal {
  constructor(portalMesh, modalInfo) {
    this.app = new App();
    this.modalManager = new ModalManager();

    this.portalMesh = portalMesh;
    this.modalInfo = modalInfo;
    this.previouslyIsNear = false;
    console.log(this.portalMesh.material);

    this.portalNearMaterial = new THREE.MeshStandardMaterial({
      ...portalMesh.material,
      emissive: new THREE.Color(0xc77be2),
      transparent: true,
      opacity: 0.8,
    });

    this.portalFarMaterial = new THREE.MeshStandardMaterial({
      ...portalMesh.material,
      emissive: new THREE.Color(0xa528e2),
      transparent: true,
      opacity: 0.8,
    });

    this.portalMesh.material = this.portalFarMaterial;
    console.log(this.portalMesh.material);
  }

  loop() {
    this.character = this.app.world.character.instance;
    if (this.character) {
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
