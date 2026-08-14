export const SKILL_GROUPS = [
  { label: "Languages", items: ["Java", "Python", "JavaScript", "SQL", "HTML", "CSS", "LaTeX"] },
  { label: "Web & Backend", items: ["React.js", "Node.js", "Express.js", "Django", "Flask", "REST APIs"] },
  { label: "Python AI/ML", items: ["NumPy", "Pandas", "Matplotlib", "SciPy", "Scikit-learn", "TensorFlow", "PyTorch", "OpenCV"] },
  { label: "Databases", items: ["MySQL", "MongoDB", "MongoDB Atlas"] },
  { label: "Cloud & DevOps", items: ["AWS (S3)", "Google Cloud", "Docker", "Linux"] },
  { label: "Tools", items: ["VS Code", "Cursor", "Antigravity", "Postman", "Power BI", "Google Colab"] },
];

export const EXPERIENCE = [
  {
    role: "Software Development Intern, Backend Engineer",
    org: "Bluestock Fintech",
    time: "Jun 2025 - Jul 2025",
    points: [
      "Engineered scalable REST APIs with caching, parallel data aggregation, and JWT auth with rotation + reuse detection.",
      "Built end-to-end buy / sell / update trading workflows with weighted pricing logic and audit logging.",
      "Shipped a streaming CSV import pipeline; hardened APIs with rate limiting, Helmet, structured error handling.",
    ],
  },
  {
    role: "Software Development Intern",
    org: "QSpiders",
    time: "Jun 2024 - Jan 2025",
    points: [
      "Earned Java Certification (ID: 2534) through project-based coding and OOP-driven development.",
      "Built accessible, standards-compliant UIs with dynamic DOM manipulation and API integrations.",
      "Tested and deployed prototypes across platforms for cross-compatibility.",
    ],
  },
];

export const PROJECTS = [
  {
    name: "AI-Driven Secured SD-WAN with DDoS Protection",
    org: "FITT-IIT Delhi, TiE-U, Innovative Bharat 3.0",
    desc: "A system that protects networks from hacker flood attacks using CDNs, WAFs, and load balancers. It detects 90% of attacks with 98% precision and auto-filters 90% of bad traffic. Python/Node.js backends with DNSSEC and end-to-end encryption. Won 3 national prizes.",
    stats: [
      { n: "90%", l: "Detection" },
      { n: "98%", l: "Precision" },
      { n: "90%", l: "Auto-filtration" },
    ],
  },
  {
    name: "Secure Data Wiping for IT Asset Recycling",
    org: "Ministry of Mines, Smart India Hackathon",
    desc: "A tool that safely deletes data from Windows, Linux, and Android devices following the NIST SP 800-88 standard. Uses AI to find hidden storage, with a FastAPI/React app and blockchain-based verification. Docker makes it work online and offline (USB).",
    stats: [
      { n: "85%", l: "Success rate" },
      { n: "3", l: "Platforms" },
      { n: "NIST", l: "SP 800-88" },
    ],
  },
  {
    name: "PLEXUS AI - Voice-Powered Assistant",
    org: "Spark Techfest, Sanskriti University, Rank 2",
    desc: "A voice-controlled Python assistant that runs a PC, opens apps, searches the web, and drafts emails. It is fast (<100ms) and 85% accurate, with a noise-adapted audio pipeline and secure SMTP email.",
    link: "https://github.com/aumpious/PLEXUS",
    stats: [
      { n: "<100ms", l: "Latency" },
      { n: "85%", l: "Accuracy" },
      { n: "2nd", l: "Rank" },
    ],
  },
  {
    name: "AI-Enhanced DDoS Mitigation with n8n",
    org: "TiE-U Showcase, IIT Kanpur",
    desc: "An automated defense system built on n8n workflows in Ubuntu that sorts and blocks attack traffic in real time. Uses Google Gemini for anomaly detection and Cloudflare APIs for automatic blocking. Only 1% failure under 100 requests/second of simulated attacks.",
    stats: [
      { n: "1%", l: "Failure rate" },
      { n: "100 RPS", l: "Simulated load" },
      { n: "n8n", l: "Automation" },
    ],
  },
  {
    name: "IMAGIFY - AI Text-to-Image Generator",
    org: "Self Project",
    desc: "A full-stack app that turns simple text into images using React, Node.js, and the Stable Diffusion API. Uses MongoDB Atlas to manage users and images, with a fast and clean interface.",
    stats: [
      { n: "React", l: "Frontend" },
      { n: "Node.js", l: "Backend" },
      { n: "AI", l: "Stable Diffusion" },
    ],
  },
  {
    name: "JUPITER SPACE - Cosmic Frontend Portal",
    org: "JSpiders/QSpiders Course Project (ID: 2534)",
    desc: "A stylish space-themed single-page website with blur effects, orbiting particle animations, and smooth transitions between four themed screens. Built with HTML5, CSS3, and JavaScript.",
    stats: [
      { n: "4", l: "Themes" },
      { n: "CSS3", l: "Effects" },
      { n: "JS", l: "Interactions" },
    ],
  },
  {
    name: "CODING LAB - Interactive Authentication Interface",
    org: "JSpiders/QSpiders Course Project (ID: 2534)",
    desc: "A login/signup interface with real-time validation and state-based feedback. Built with JavaScript for validation and HTML5/CSS3 for a clean, accessible design.",
    stats: [
      { n: "Live", l: "Validation" },
      { n: "HTML5", l: "Semantic" },
      { n: "A11y", l: "Accessible" },
    ],
  },
];

export const ACHIEVEMENTS = [
  "Won INR 49,000 combined across Innovative Bharat 3.0 (Rank 1), TiE-U Global UP (Rank 2), and Spark Techfest (Institute Rank 2).",
  "Top 5 nationally among 13+ Innovative Bharat winners at FITT, IIT Delhi, and led the BioSpark Bootcamp cohort and pitched to investors.",
  "Led the winning TiE-U, IIT Kanpur team that pitched an AI-powered SD-WAN DDoS protection SaaS, validated with banking/NBFC clients.",
];

export const VOLUNTEER = [
  { role: "Community Lead", org: "Student Developer Club", time: "Jan 2024 - Jan 2025", desc: "Trained 400+ students in technical & soft skills." },
  { role: "Event Organizer", org: "Student Developer Club", time: "Aug 2023 - Dec 2024", desc: "Ran workshops reaching 500+ developers." },
];

export const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
];
