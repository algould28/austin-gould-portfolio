export default class ModalManager {
  constructor() {
    this.modal = document.getElementById("myModal");
    this.close = document.getElementsByClassName("close")[0];
    this.resumeButton = document.getElementsByClassName("resume-button")[0];
    this.emailButton = document.getElementsByClassName("email-button")[0];
    this.projectButtons = document.getElementsByClassName("project-name");
    this.backButton = document.getElementsByClassName("back-button")[0];
    this.projectContainer = null;

    this.close.onclick = () => {
      this.closeModal();
    };

    this.resumeButton.onclick = () => {
      window.open("/austin-gould-resume.pdf", "_blank");
    };

    this.emailButton.onclick = () => {
      navigator.clipboard.writeText("austin.gould28@gmail.com");
      this.emailButton.innerHTML = "COPIED";
      this.emailButton.classList.add("copied");

      setTimeout(() => {
        this.emailButton.innerHTML = "COPY EMAIL";
        this.emailButton.classList.remove("copied");
      }, 2000);
    };

    this.backButton.onclick = () => {
      this.hideProjectDetails();
    };

    this.instantiateCodeModal();
  }

  instantiateCodeModal() {
    this.codeModalWrapper = document.getElementById("codeModalWrapper");
    this.codeModalContent = document.getElementById("codeModalContent");
    this.closeCodeModal =
      document.getElementsByClassName("close-code-modal")[0];
    this.projectNamesContainer = document.getElementById(
      "projectNamesContainer"
    );

    this.codeModalWrapperWidth = this.codeModalWrapper.style.width;
    this.codeModalWrapperHeight = this.codeModalWrapper.style.minHeight;
    this.codeModalContent.style.minHeight = this.codeModalWrapperHeight;

    this.closeCodeModal.onclick = () => {
      this.closeModal();
    };

    // add the onClick() method to each project
    for (let i = 0; i < this.projectButtons.length; i++) {
      let element = this.projectButtons[i];
      element.onclick = () => {
        if (element.innerHTML === "Headstorm") {
          this.codeModalWrapper.style.width = "95%";
          this.codeModalContent.style.minHeight = "84vh";

          // window.setTimeout(() => {
          this.showProjectDetails(element.innerHTML.toLocaleLowerCase());
          // }, 601);
        } else {
          this.codeModalWrapper.style.width = this.codeModalWrapperWidth;
          this.codeModalContent.style.minHeight = this.codeModalWrapperHeight;
        }
      };
    }
  }

  showProjectDetails(projectName) {
    this.projectContainer = document.getElementById(`${projectName}Project`);

    this.projectContainer.classList.remove("fadeOut");
    this.projectNamesContainer.classList.add("fadeOut");

    window.setTimeout(() => {
      this.projectNamesContainer.style.display = "none";
      this.projectContainer.style.display = "flex";

      // we need a timeout here or the fade in transition will not work
      // transitions don't seem to work when the element is going from display: none -> display: yes
      window.setTimeout(() => {
        this.projectContainer.classList.add("fadeIn");
      }, 10);
    }, 601);
  }

  hideProjectDetails() {
    this.projectContainer.classList.remove("fadeIn");
    this.projectNamesContainer.classList.remove("fadeOut");

    this.projectContainer.classList.add("fadeOut");

    window.setTimeout(() => {
      this.projectContainer.style.display = "none";
      this.projectContainer = null;

      this.projectNamesContainer.style.display = "block";

      this.codeModalWrapper.style.width = this.codeModalWrapperWidth;
      this.codeModalContent.style.minHeight = this.codeModalWrapperHeight;

      // we need a timeout here or the fade in transition will not work
      // transitions don't seem to work when the element is going from display: none -> display: yes
      window.setTimeout(() => {
        this.projectNamesContainer.classList.add("fadeIn");
      }, 10);
    }, 601);
  }

  openModal(title, description) {
    // only show the resume button on the work modals
    if (title.toLocaleLowerCase().includes("work"))
      this.resumeButton.style.display = "inline-block";

    //only show the copy email button on the contact modal
    if (title.toLocaleLowerCase().includes("contact"))
      this.emailButton.style.display = "inline-block";

    if (!title.toLocaleLowerCase().includes("code")) {
      this.modal = document.getElementById("myModal");
      document.getElementById("modalTitle").innerHTML = title;
      document.getElementById("modalDescription").innerHTML = description;
    } else {
      this.modal = document.getElementById("codeModal");
      document.getElementById("codeModalTitle").innerHTML = title;
      document.getElementById("codeModalDescription").innerHTML = description;
    }

    this.modal.style.display = "block";
    this.modal.classList.remove("fadeOut");
    // we need a timeout here or the fade in transition will not work
    // transitions don't seem to work when the element is going from display: none -> display: yes
    window.setTimeout(() => {
      this.modal.classList.add("fadeIn");
    }, 1);
  }

  closeModal() {
    this.modal.classList.remove("fadeIn");
    this.modal.classList.add("fadeOut");
    setTimeout(() => {
      this.modal.style.display = "none";
      this.resumeButton.style.display = "none";
      this.emailButton.style.display = "none";
    }, 600);
  }
}
