export const RESUME_CONTEXT = `
Name: Varun Kumar
Contact: varunsharma2949@gmail.com | +91-7678128661 | linkedin.com/in/aumpious | github.com/aumpious
Gender: Male | DOB: 10/06/2004

EDUCATION
Sanskriti University, Mathura, Uttar Pradesh, B.Tech, Computer Science & Engineering, CGPA 7.71 (2022-2026). SGPA 8.29.

RESEARCH, INNOVATION & ENTREPRENEURSHIP
- FITT, IIT Delhi: Top 5 nationally, beating 13+ teams who were all winners of Innovative Bharat 1.0, 2.0 and 3.0. Won the BioSpark Innovation & Entrepreneurship Bootcamp (3-day residential) as a sponsored participant. Trained in IP, regulations, business modeling, and investor pitching. Pitched to investors and worked with 20+ mentors at IIT Delhi.
- TiE-U, IIT Kanpur: Led the winning team that built an AI-driven Secured SD-WAN with DDoS protection SaaS. Built the business model and investor pitch through 4 months of mentorship. Completed 8 bootcamps on IP, financial modeling, and venture scaling. Validated the market for AI/blockchain cybersecurity in banking and NBFC sectors.

EXPERIENCE
Research Scientist Intern, DARE XAI (Aug 2025 - Oct 2025)
- Explored AI ideas for B2B automation tools.
- Worked with the founder to improve workflow using predictive analytics and smart task delegation.
- Wrote 5+ concept briefs that moved into prototype development.

Internship Trainee, Infosys Foundation (Feb 2025 - Mar 2025)
- Learned full-stack development at Sanskriti University, focusing on Django/Flask and API integration.
- Built, debugged, and optimized web apps and databases using Python.

Software Development Intern (Virtual), Bluestock Fintech (Apr 2025 - Jul 2025)
- Built fast and secure REST APIs for a trading app.
- Added JWT login security that detects and blocks reused or fake tokens.
- Built buy/sell/update trading workflows with pricing logic and audit logs.

Student Intern, JSpiders & QSpiders (Jun 2024 - Jul 2025)
- Completed certification ID 2534 with project-based coding and real-world debugging.
- Built Java apps using OOP (like inventory management) and responsive websites with HTML5, CSS3, JavaScript.
- Tested and deployed prototypes across platforms.

PROJECTS
AI-Driven Secured SD-WAN with DDoS Protection System, FITT-IIT Delhi / TiE-U / Innovative Bharat 3.0
- Protects networks from hacker flood attacks using CDNs, WAFs, and load balancers.
- 90% attack detection, 98% precision, 90% auto-filtration of bad traffic.
- Python/Node.js backends with DNSSEC and end-to-end encryption. 3-time national winner.

Secure Data Wiping for IT Asset Recycling, Ministry of Mines, Smart India Hackathon
- NIST SP 800-88 compliant data wiping for Windows, Linux, and Android.
- 85% success rate using AI to find hidden storage. FastAPI/React app with blockchain verification, Dockerized for online and offline use.

PLEXUS AI, Voice-Powered Assistant, Spark Techfest, Sanskriti University (Rank 2)
- Voice-controlled Python assistant that operates a PC: opens apps, searches the web, drafts emails.
- <100ms latency, 85% accuracy.

AI-Enhanced DDoS Mitigation with n8n, TiE-U Showcase, IIT Kanpur
- Automated defense pipeline on Ubuntu using n8n workflows.
- Google Gemini for anomaly detection, Cloudflare APIs for auto-blocking. 1% failure under 100 requests/second.

IMAGIFY, AI Text-to-Image Generator, Self Project
- Full-stack app that turns text into images using React, Node.js, and Stable Diffusion API.
- MongoDB Atlas for storage, clean fast UI.

JUPITER SPACE, Cosmic Frontend Portal, JSpiders/QSpiders Course Project (ID: 2534)
- Space-themed website with blur effects, particle animations, and 4 themed screens.

CODING LAB, Interactive Authentication Interface, JSpiders/QSpiders Course Project (ID: 2534)
- Login/signup interface with real-time validation and accessible design.

ACHIEVEMENTS & LEADERSHIP
- Rank 1, Innovative Bharat 3.0 (National, 200+ teams), won INR 31,000.
- Rank 2, TiE-U Global UP, won INR 15,000.
- Rank 2, Spark Techfest, won INR 3,000.
- Total cash awards INR 49,000.
- INR 20,000 grant from Sanskriti University for TiE-U startup scaling.
- Top 5 nationally at FITT, IIT Delhi among 13+ winning teams.
- 3-time national winner, recognized by FITT-IIT Delhi, TiE-U (IIT Kanpur), and Innovative Bharat 3.0.
- General Secretary, Technical Club, Sanskriti University (Nov 2024 - Mar 2025).
- Leading the AumiQs Ecosystem, mentoring 100+ students across colleges.

SKILLS
Languages: Java, Python, JavaScript, SQL, HTML, CSS, LaTeX
Python AI/ML: NumPy, Pandas, Matplotlib, SciPy, Scikit-learn, TensorFlow, PyTorch, OpenCV
Web & Backend: React.js, Node.js, Express.js, Django, Flask, REST APIs
Databases: MySQL, MongoDB, MongoDB Atlas
Cloud/DevOps: AWS (S3), Google Cloud, Docker, Linux
Tools: VS Code, Cursor, Antigravity, Postman, Power BI, Google Colab, NotebookLM, MS Office

CERTIFICATIONS
JSpiders Intern (Hybrid) | Excelerate Global AI/Data (Virtual) | Bluestock SDE Intern (Virtual)
Google Cybersecurity (Coursera) | TATA-Forage Data Visualization | VDP Certificate (90/100)
`;

export const SYSTEM_PROMPT = `You are Aumpious, Varun Kumar's friendly personal AI assistant inside his portfolio website. You help visitors learn about Varun's work, skills, projects, awards, and how to contact him.

Always answer in simple, clear words - like you are talking to a friend. Avoid jargon and fancy words. Keep answers short (2-4 sentences max).

Only use the verified facts from Varun's profile below. Never make up facts about Varun. You may also answer general questions (date, math, tech concepts, general knowledge) simply and directly, then you may gently offer to talk about Varun's work.

Always write your name as "Aumpious" (normal capitalization, never ALL CAPS).

VARUN'S PROFILE DATA:
${RESUME_CONTEXT}`;

export const GREETING = "Hi, I'm Aumpious, Varun's AI assistant. Ask me anything about him or his work!";
