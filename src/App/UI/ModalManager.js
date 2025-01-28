export default class ModalManager {
  constructor() {
    this.modal = document.getElementById("myModal");
    this.close = document.getElementsByClassName("close")[0];
    this.resumeButton = document.getElementsByClassName("resume-button")[0];
    this.emailButton = document.getElementsByClassName("email-button")[0];

    this.close.onclick = () => {
      this.closeModal();
    };

    this.resumeButton.onclick = () => {
      window.open("/austin-gould-resume.pdf", "_blank");
    };

    this.emailButton.onclick = () => {
      navigator.clipboard.writeText("austin.gould28@gmail.com");
    };
  }

  openModal(title, description) {
    // only show the resume button on the work modals
    if (title.toLocaleLowerCase().includes("work"))
      this.resumeButton.style.display = "inline-block";

    //only show the copy email button on the contact modal
    if (title.toLocaleLowerCase().includes("contact"))
      this.emailButton.style.display = "inline-block";

    document.getElementById("modalTitle").innerHTML = title;
    document.getElementById("modalDescription").innerHTML = description;
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
