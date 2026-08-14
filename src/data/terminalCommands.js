export const TERMINAL_WELCOME = [
  { type: "out", content: "Microsoft Windows [Version 10.0.22631.4037]" },
  { type: "out", content: "(c) Microsoft Corporation. All rights reserved." },
  { type: "out", content: " " },
  { type: "out", content: "Varun Kumar, Software Developer" },
  { type: "out", content: "Type '/help' to see all commands." },
];

const HELP = [
  "Available commands:",
  { type: "link", label: "/about", hint: "who Varun is" },
  { type: "link", label: "/skills", hint: "what he knows" },
  { type: "link", label: "/experience", hint: "where he worked" },
  { type: "link", label: "/projects", hint: "what he built" },
  { type: "link", label: "/achievements", hint: "awards he won" },
  { type: "link", label: "/education", hint: "his college" },
  { type: "link", label: "/contact", hint: "email / phone" },
  { type: "link", label: "/socials", hint: "LinkedIn & GitHub" },
  { type: "link", label: "/resume", hint: "his résumé" },
  { type: "link", label: "/ls", hint: "list all sections" },
  { type: "link", label: "/clear", hint: "clear the screen" },
  { type: "link", label: "/sudo", hint: "easter egg" },
];

const COMMANDS = {
  help: (args) => {
    if (args[0]) {
      const target = COMMANDS[args[0]];
      if (target) {
        return [
          { type: "out", content: `> ${args[0]}: ${COMMAND_HELP[args[0]] || "see output above"}` },
          ...target([]),
        ];
      }
      return [{ type: "err", content: `help: no such command '/${args[0]}'.` }];
    }
    return HELP;
  },

  about: () => [
    "Varun Kumar - Software Developer.",
    "He builds websites and apps, from the design on top to the servers underneath.",
    "B.Tech in Computer Science at Sanskriti University, Mathura (CGPA 7.71).",
    "Interned at DARE XAI, Infosys Foundation, Bluestock Fintech, JSpiders & QSpiders.",
    "Won Rank 1 at Innovative Bharat 3.0 and 3 national-level prizes.",
  ],

  whoami: () => ["varun - Software Developer who builds full-stack apps."],

  skills: () => [
    "LANGUAGES:  Java, Python, JavaScript, SQL, HTML, CSS, LaTeX",
    "WEB/BACKEND: React.js, Node.js, Express.js, Django, Flask, REST APIs",
    "AI/ML:      NumPy, Pandas, Scikit-learn, TensorFlow, PyTorch, OpenCV",
    "DATABASES:  MySQL, MongoDB, MongoDB Atlas",
    "CLOUD/OPS:  AWS (S3), Google Cloud, Docker, Linux",
    "TOOLS:      VS Code, Cursor, Postman, Power BI, Google Colab",
  ],

  stack: () => COMMANDS.skills([]),

  experience: () => [
    "> Research Scientist Intern @ DARE XAI (Aug 2025 - Oct 2025)",
    "  - Explored AI ideas for B2B automation tools.",
    "  - Helped improve workflow with predictive analytics and smart task delegation.",
    "  - Wrote 5+ concept briefs that moved to prototype development.",
    "> Internship Trainee @ Infosys Foundation (Feb 2025 - Mar 2025)",
    "  - Learned full-stack development with Django/Flask and API integration.",
    "  - Built and debugged web apps and databases with Python.",
    "> SDE Intern (Virtual) @ Bluestock Fintech (Apr 2025 - Jul 2025)",
    "  - Built fast, secure REST APIs for a trading app.",
    "  - Added JWT login security and buy/sell trading workflows.",
    "> Student Intern @ JSpiders & QSpiders (Jun 2024 - Jul 2025)",
    "  - Completed Java Certification (ID: 2534) with project-based coding.",
    "  - Built Java apps with OOP and responsive websites with HTML/CSS/JS.",
  ],

  projects: () => [
    "> AI-Driven DDoS Protection System - IIT Delhi / IIT Kanpur",
    "  - Protects networks from hacker flood attacks (CDN + WAF + load balancers).",
    "  - 90% detection, 98% precision, 90% auto-blocking. 3-time national winner.",
    "> Secure Data Wiping System - Smart India Hackathon",
    "  - Safely deletes data from Windows, Linux, and Android (NIST SP 800-88).",
    "  - 85% success rate, works online and offline.",
    "> PLEXUS AI - Voice-Powered PC Assistant",
    "  - Operates a PC by voice: opens apps, searches web, drafts emails. Rank 2.",
    "> AI DDoS Mitigation with n8n - TiE-U IIT Kanpur",
    "  - Auto-blocks attack traffic with Gemini + Cloudflare. 1% failure at 100 RPS.",
    "> IMAGIFY - AI Text-to-Image Generator",
    "  - Turns text into images with React, Node.js, and Stable Diffusion.",
    "> JUPITER SPACE & CODING LAB - QSpiders course projects (ID: 2534).",
  ],

  achievements: () => [
    "• Rank 1 - Innovative Bharat 3.0 (National, 200+ teams) - INR 31,000.",
    "• Rank 2 - TiE-U Global UP - INR 15,000.",
    "• Rank 2 - Spark Techfest - INR 3,000.",
    "• Total cash awards: INR 49,000.",
    "• INR 20,000 grant from Sanskriti University for startup scaling.",
    "• Top 5 nationally at FITT, IIT Delhi (beat 13+ winning teams).",
    "• 3-time national winner; runs AumiQs Ecosystem mentoring 100+ students.",
  ],

  education: () => [
    "B.Tech in Computer Science & Engineering",
    "Sanskriti University, Mathura (2022-2026)",
    "CGPA: 7.71  |  SGPA: 8.29",
  ],

  contact: () => [
    { type: "link", label: "✉ varunsharma2949@gmail.com", url: "mailto:varunsharma2949@gmail.com" },
    { type: "link", label: "✆ +91 76781 28661", url: "tel:+917678128661" },
    "Open to Software Developer roles - feel free to reach out.",
  ],

  socials: () => [
    { type: "link", label: "LinkedIn - linkedin.com/in/aumpious", url: "https://linkedin.com/in/aumpious" },
    { type: "link", label: "GitHub - github.com/aumpious", url: "https://github.com/aumpious" },
  ],

  resume: () => [
    "Click the 'Résumé ↗' button on the page to open his résumé.",
  ],

  ls: () => [
    "Sections:",
    "  /about  /skills  /experience  /projects  /achievements",
    "Try: '/about', '/skills', '/projects', or '/contact'.",
  ],

  clear: () => [{ type: "clear" }],

  sudo: () => [
    { type: "err", content: "Access denied. Visitors cannot run this command." },
    "Fun fact: Varun's DDoS system has 98% precision. Try the '/projects' command.",
  ],

  date: () => [`${new Date().toString()}`],

  hello: () => ["Hello! I am Varun's portfolio terminal. Type '/help' to see commands."],

  hi: () => COMMANDS.hello([]),
};

const COMMAND_HELP = {
  about: "who Varun is",
  skills: "what he knows",
  experience: "where he worked",
  projects: "what he built",
  achievements: "awards he won",
  education: "his college",
  contact: "email / phone",
  socials: "LinkedIn & GitHub",
  resume: "his résumé",
  ls: "list all sections",
  clear: "clear the screen",
  sudo: "easter egg",
};

export function runTerminalCommand(raw) {
  const cmd = raw.trim().replace(/^\//, "").toLowerCase();
  const [name, ...args] = cmd.split(/\s+/);
  if (!name) return [];
  const handler = COMMANDS[name];
  if (handler) return handler(args);
  return [
    {
      type: "err",
      content: `command not found: '/${name}'. Type '/help' to list available commands.`,
    },
  ];
}

export const AVAILABLE_COMMANDS = Object.keys(COMMANDS).filter(
  (c) => !["stack", "hi"].includes(c)
);
