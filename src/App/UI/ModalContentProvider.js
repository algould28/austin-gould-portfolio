export default class ModalContentProvider {
  constructor() {
    this.modalContents = {
      aboutMe: {
        title: "About me",
        description:
          "<p>Frontend Web Developer with a variety of hands-on experience in developing web and mobile applications.  Highly skilled in React, Typescript, React Native, and other web development frameworks.  Proven ability to create visually appealing, user-friendly, and scalable web platforms. Seeking to leverage my skills and experience to create innovative and efficient solutions.</p><p></p><p>When I'm not coding, I spend most of my free time training for and competing in ultimate frisbee tournaments. When that dies down in the winter and spring, I am always seeking the mountains for snowboarding. I also enjoy hiking, camping, backpacking, rocket league, casual sports, and general traveling.</p>",
      },
      work1: {
        title: "Headstorm Work",
        description:
          "<p>At Headstorm, I gained diverse experience managing client expectations, sprint planning, coding, meeting facilitation, conflict resolution, and training new employees across six different projects. I demonstrated expertise in React, React Native, TypeScript, JavaScript, and other modern web technologies all while adapting to different workflows such as Agile, Kanban, and Waterfall. My work included both greenfield and enterprise applications, often bridging technical gaps and collaborating with non-technical stakeholders. During my time there I wore many hats learning how to contribute to project discovery, scope estimations, leading meetings, leading teams, working at the bottom of big teams, designing demos, architecting entire frontends, and hoping in to a pre-existing codebase. </p><p></p><p>Check out my full resume below for more details.</p>",
      },
      work2: {
        title: "Freelance Work",
        description:
          "<p>As a freelancer, I honed my ability to independently design, architect, and implement full-stack solutions, combining technical expertise with problem-solving to meet diverse client needs. My work emphasized creating efficient, user-friendly systems and keying in on the client’s repetitive processes to save them time. It also taught me how to truly work alone and fully asynchronously. When troubleshooting, designing, and implementing, I no longer had access to the minds of 60+ other engineers to lean on. And I was now fully responsible for my work schedule and time. This was admittedly a big learning curve for me but it also opened up capacity for me to focus on more independent creative outlets, like this digital portfolio!</p><p></p><p>Check out my full resume below for more details.</p>",
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
