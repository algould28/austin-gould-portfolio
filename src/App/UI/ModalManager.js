export default class ModalManager {
  constructor() {
    this.modal = document.getElementById("myModal");
    this.close = document.getElementsByClassName("close")[0];
    this.resumeButton = document.getElementsByClassName("resume-button")[0];
    this.emailButton = document.getElementsByClassName("email-button")[0];
    this.projectButtons = document.getElementsByClassName("project-name");

    this.codeModalWrapper = document.getElementById("codeModalWrapper");
    this.codeModalContent = document.getElementById("codeModalContent");
    this.codeModalWrapperWidth = this.codeModalWrapper.style.width;
    this.codeModalWrapperHeight = this.codeModalWrapper.style.minHeight;
    this.codeModalContent.style.minHeight = this.codeModalWrapperHeight;

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

    for (let i = 0; i < this.projectButtons.length; i++) {
      let element = this.projectButtons[i];
      element.onclick = () => {
        if (element.innerHTML === "Headstorm") {
          this.codeModalWrapper.style.width = "95%";
          this.codeModalContent.style.minHeight = "84vh";
        } else {
          this.codeModalWrapper.style.width = this.codeModalWrapperWidth;
          this.codeModalContent.style.minHeight = this.codeModalWrapperHeight;
        }
      };
    }
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
    this.modal.classList.add("fadeIn");
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
