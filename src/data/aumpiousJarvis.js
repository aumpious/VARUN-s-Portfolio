// Aumpious JARVIS-Class Conversational AI Engine & Task Telemetry

export const JARVIS_COMMANDS = [
  {
    id: "experience",
    label: "💼 Experience",
    icon: "💼",
    prompt: "Show Varun's work experience.",
    response: "Varun's work experience: 1) Research Scientist Intern at DARE XAI (Aug-Oct 2025) - explored AI ideas for B2B automation tools and wrote 5+ concept briefs. 2) Internship Trainee at Infosys Foundation (Feb-Mar 2025) - learned full-stack development with Django/Flask. 3) SDE Intern (Virtual) at Bluestock Fintech (Apr-Jul 2025) - built fast, secure APIs and JWT login security. 4) Student Intern at JSpiders & QSpiders (Jun 2024 - Jul 2025) - got a Java Certification (ID 2534)."
  },
  {
    id: "projects",
    label: "🚀 Projects",
    icon: "🚀",
    prompt: "Show Varun's projects.",
    response: "Varun's projects: 1) AI-Driven DDoS Protection System - protects networks from hacker flood attacks with CDN, WAF, and load balancers. 90% detection, 98% precision, 90% auto-blocking. Won 3 national prizes (IIT Delhi, IIT Kanpur). 2) Secure Data Wiping System (Smart India Hackathon) - safely deletes data from Windows, Linux, and Android using the NIST SP 800-88 standard. 3) PLEXUS AI - a voice-powered assistant that operates a PC. 4) IMAGIFY - turns text into images with AI. 5) AI DDoS Mitigation with n8n - auto-blocks attacks with Google Gemini and Cloudflare."
  },
  {
    id: "skills",
    label: "🛠️ Skills",
    icon: "🛠️",
    prompt: "List Varun's technical skills.",
    response: "Varun's skills: Languages - Java, Python, JavaScript, SQL, HTML, CSS. Web/Backend - React.js, Node.js, Express.js, Django, Flask, REST APIs. AI/ML - NumPy, Pandas, Scikit-learn, TensorFlow, PyTorch, OpenCV. Databases - MySQL, MongoDB. Cloud/DevOps - AWS (S3), Google Cloud, Docker, Linux."
  },
  {
    id: "education",
    label: "🎓 Education",
    icon: "🎓",
    prompt: "Show Varun's education details.",
    response: "Varun's education: B.Tech in Computer Science & Engineering at Sanskriti University, Mathura (2022-2026), CGPA 7.71."
  },
  {
    id: "achievements",
    label: "🏆 Achievements",
    icon: "🏆",
    prompt: "Show Varun's achievements and awards.",
    response: "Varun's achievements: Won INR 49,000 total in competitions - Rank 1 at Innovative Bharat 3.0 (INR 31,000), Rank 2 at TiE-U Global UP (INR 15,000), Rank 2 at Spark Techfest (INR 3,000). He also won a INR 20,000 grant from Sanskriti University, was Top 5 nationally at IIT Delhi, and won 3 national prizes total."
  },
  {
    id: "contact",
    label: "📞 Contact",
    icon: "📞",
    prompt: "How can I contact Varun?",
    response: "You can contact Varun here: email varunsharma2949@gmail.com, phone +91-7678128661, and LinkedIn/GitHub @aumpious."
  }
];

export const getJarvisResponse = (query, history = []) => {
  const q = query.trim().toLowerCase();

  // 1. Casual Chat & Conversation Initiators
  if (
    q.includes("talk with you") ||
    q.includes("talk to you") ||
    q.includes("talk to me") ||
    q.includes("chat with you") ||
    q.includes("want to talk") ||
    q.includes("can we talk") ||
    q.includes("speak with you") ||
    q.includes("are you free") ||
    q.includes("let's talk") ||
    q.includes("lets talk")
  ) {
    return "Sure, I can talk! You can ask me about Varun's projects, his skills, or anything else. What would you like to know?";
  }

  if (
    q === "hi" ||
    q === "hello" ||
    q === "hey" ||
    q.startsWith("hi ") ||
    q.startsWith("hello ") ||
    q.startsWith("hey ") ||
    q.includes("good morning") ||
    q.includes("good evening") ||
    q.includes("good afternoon")
  ) {
    return "Hello! I am Aumpious, Varun's AI assistant. Ask me anything about his work, skills, or projects.";
  }

  if (q.includes("how are you") || q.includes("how r u") || q.includes("how do you do")) {
    return "I am doing great, thank you! How can I help you today? You can ask me about Varun's work.";
  }

  if (q.includes("what is your name") || q.includes("who are you") || q.includes("what are you") || q.includes("who r u")) {
    return "I am Aumpious, Varun Kumar's personal AI assistant on his portfolio website.";
  }

  if (q.includes("who created you") || q.includes("who made you") || q.includes("who built you")) {
    return "Varun Kumar built me to help visitors learn about his work and skills.";
  }

  if (q.includes("what can you do") || q.includes("help me") || q.includes("features")) {
    return "I can answer questions about Varun's career, skills, projects, awards, and how to contact him. Just ask me anything!";
  }

  // 2. Specific Technical & Career Enquiries
  const cmd = (id) => JARVIS_COMMANDS.find((c) => c.id === id).response;

  if (q.includes("diagnostic") || q.includes("system status") || q.includes("telemetry") || q.includes("status report")) {
    return cmd("experience");
  }

  if (
    q.includes("experience") ||
    q.includes("bluestock") ||
    q.includes("fintech") ||
    q.includes("internship") ||
    q.includes("qspiders") ||
    q.includes("job")
  ) {
    return cmd("experience");
  }

  if (
    q.includes("ddos") ||
    q.includes("data wiping") ||
    q.includes("wiping") ||
    q.includes("security") ||
    q.includes("sih") ||
    q.includes("smart india")
  ) {
    return cmd("projects");
  }

  if (
    q.includes("skill") ||
    q.includes("stack") ||
    q.includes("technolog") ||
    q.includes("java") ||
    q.includes("python") ||
    q.includes("spring boot") ||
    q.includes("fastapi") ||
    q.includes("react") ||
    q.includes("docker") ||
    q.includes("aws") ||
    q.includes("mysql") ||
    q.includes("mongodb")
  ) {
    return cmd("skills");
  }

  if (q.includes("education") || q.includes("college") || q.includes("university") || q.includes("cgpa") || q.includes("degree")) {
    return cmd("education");
  }

  if (
    q.includes("achievement") ||
    q.includes("award") ||
    q.includes("hackathon") ||
    q.includes("rank") ||
    q.includes("prize") ||
    q.includes("innovative bharat") ||
    q.includes("tie-u")
  ) {
    return cmd("achievements");
  }

  if (q.includes("contact") || q.includes("email") || q.includes("reach") || q.includes("hire") || q.includes("phone") || q.includes("linkedin") || q.includes("github")) {
    return cmd("contact");
  }

  if (q.includes("project") || q.includes("portfolio") || q.includes("work")) {
    return cmd("projects");
  }

  // 3. Technical Conceptual Explanations
  if (q.includes("what is ddos") || q.includes("explain ddos")) {
    return "A DDoS attack is when many hacked computers send too much traffic to a website at once, which makes it stop working. Varun built a system that uses CDN, WAF, and load balancers to block these attacks automatically with 98% precision.";
  }

  if (q.includes("what is jwt") || q.includes("explain jwt")) {
    return "JWT is a secure way to pass login information between the user and the server. At Bluestock Fintech, Varun used JWT with token rotation to make sure old login keys cannot be reused by hackers.";
  }

  if (q.includes("what is nist") || q.includes("explain nist")) {
    return "NIST SP 800-88 is the official US government standard for safely deleting data from storage devices. Varun built a wiping tool that follows this standard so old data cannot be recovered.";
  }

  if (
    q.includes("what is the date") ||
    q.includes("today's date") ||
    q.includes("todays date") ||
    q.includes("what day is it") ||
    q.includes("current date") ||
    q.includes("what date") ||
    q.includes("what is the time") ||
    q.includes("current time") ||
    q.includes("time now")
  ) {
    const now = new Date();
    return `Today's date is ${now.toDateString()} and the current time is ${now.toLocaleTimeString()}.`;
  }

  // 4. Conversational General Intelligence Generator
  const words = q.split(" ").filter((w) => w.length > 2);
  const mainSubject = words[words.length - 1] || "your query";

  const arithmetic = q.match(/^[\d\s+\-*/().%^]+$/);
  if (arithmetic && /[0-9]/.test(q)) {
    try {
      const expr = q.replace(/\^/g, "**");
      const val = Function(`"use strict"; return (${expr});`)();
      if (typeof val === "number" && isFinite(val)) {
        return `The answer is ${val}.`;
      }
    } catch (e) {}
  }

  return `You asked about ${mainSubject}. Varun is a software developer who builds backend systems and secure APIs. Would you like to know more about his projects or skills?`;
};
