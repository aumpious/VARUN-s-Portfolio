import React from "react";
import Frame from "../common/Frame";

const iconProps = {
  width: 14,
  height: 14,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

function GraduationCapIcon() {
  return (
    <svg {...iconProps}>
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

function UniversityIcon() {
  return (
    <svg {...iconProps}>
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18" />
      <path d="M4 22h16" />
      <path d="M10 7h4" />
      <path d="M10 11h4" />
      <path d="M10 15h4" />
    </svg>
  );
}

function AwardIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg {...iconProps}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg {...iconProps}>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

const PROFILE_FACTS = [
  { k: "Degree", v: "B.Tech, Computer Science & Engineering", icon: GraduationCapIcon },
  { k: "University", v: "Sanskriti University, Mathura (2022-2026)", icon: UniversityIcon },
  { k: "CGPA", v: "7.71 / 10", icon: AwardIcon },
  { k: "Focus", v: "Software Dev, AI, Cloud, Security", icon: CodeIcon },
  { k: "Status", v: "Open to software dev roles", icon: BriefcaseIcon },
];

const CORE_STACK = [
  "Java",
  "Python",
  "JavaScript",
  "React.js",
  "Node.js",
  "Django",
  "MySQL",
  "MongoDB",
  "AWS",
  "Docker",
  "REST APIs",
];

export default function AboutSection() {
  return (
    <section className="v-section" id="about">
      <div className="v-section-head">
        <span className="v-section-num">01</span>
        <h2 className="v-section-title">About</h2>
      </div>
      <div className="v-about">
        <div className="v-about__text">
          <p className="v-about-text">
            Hi, I’m <strong>Varun Kumar</strong>, a B.Tech student in Computer Science &amp; Engineering at
            Sanskriti University, Mathura. I love <strong>software development, AI, cloud computing,
            and cybersecurity</strong>.
          </p>
          <p className="v-about-text">
            I have hands-on experience with <strong>Java, Python, JavaScript, React.js, Node.js, Django,
            MySQL, MongoDB, AWS, Docker, and REST APIs</strong>. I enjoy building practical, working
            applications and solving real problems with code.
          </p>
          <p className="v-about-text">
            I have worked as a <strong>Research Scientist Intern at DARE XAI</strong> and trained with the
            <strong>Infosys Foundation</strong>, and I built projects like a <strong>DDoS protection
            system</strong> and <strong>Imagify</strong>, an AI text-to-image generator. I have won
            competitions at IIT Delhi, IIT Kanpur, and Sanskriti University.
          </p>
          <p className="v-about-text">
            Beyond coding, I am interested in <strong>AI, cloud architecture, cybersecurity, data
            analytics, and future technology</strong>. I also run the <strong>AumiQs Ecosystem</strong>,
            mentoring 100+ students across colleges.
          </p>
          <p className="v-about-text">
            I am looking for opportunities where I can <strong>learn from great teams, build real
            products, and grow as a software developer</strong>.
          </p>
        </div>

        <Frame className="v-about__card" label="PROFILE">
          <ul className="v-about__facts">
            {PROFILE_FACTS.map((f) => (
              <li key={f.k}>
                <span className="v-about__fact-k">
                  <f.icon />
                  {f.k}
                </span>
                <span className="v-about__fact-v">{f.v}</span>
              </li>
            ))}
          </ul>
          <div className="v-about__stack-label">CORE STACK</div>
          <div className="v-about__stack">
            {CORE_STACK.map((s) => (
              <span key={s} className="v-about__chip">
                {s}
              </span>
            ))}
          </div>
        </Frame>
      </div>
    </section>
  );
}
