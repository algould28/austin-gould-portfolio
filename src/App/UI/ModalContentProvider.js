export default class ModalContentProvider {
  constructor() {
    this.modalContents = {
      aboutMe: {
        title: "About me",
        description:
          "<p>Frontend Web Developer with a variety of hands-on experience in developing web and mobile applications.  Highly skilled in React, Typescript, React Native, and other web development frameworks.  Proven ability to create visually appealing, user-friendly, and scalable web platforms. Seeking to leverage my skills and experience to create innovative and efficient solutions.</p><p></p><p>I spend most of my free time training for and competing in ultimate frisbee tournaments. When that dies down in the winter and spring, I am always seeking the mountains for snowboarding. I also enjoy hiking, camping, backpacking, rocket league, casual sports, and general traveling.</p>",
      },
      work1: {
        title: "Headstorm Work",
        description: "Coming soon!",
      },
      work2: {
        title: "Freelance Work",
        description: "Coming soon!",
      },
      contact: {
        title: "Contact Me",
        description:
          "Shoot me an email at <b>austin.gould28@gmail.com</b> or connect with me on <a target='_blank' href='https://www.linkedin.com/in/austin-gould-89299b170/'>LinkedIn</a>!",
      },
      code: {
        title: "Code Examples",
        description: "Coming soon!",
      },
    };
  }

  getModalInfo(portalName) {
    return this.modalContents[portalName];
  }
}
