// Single source of truth for everything on the site.

// Public-folder URL that also works when the site is served from a subfolder (e.g. GitHub Pages)
export const asset = (path) => import.meta.env.BASE_URL + path.replace(/^\//, '')
// All facts come from Pratyush's resume (Aug 2026). Edit here, not in components.

export const profile = {
  name: 'Pratyush Kumar Sahu',
  firstName: 'Pratyush',
  initials: 'PKS',
  roles: ['Full-Stack Developer', 'AI / RAG Builder', 'Electrical Engineer @ VSSUT', 'Founder’s Office Intern'],
  tagline: 'I design, build, test and ship production-style web apps — with a soft spot for AI that cites its sources.',

  // Personality one-liners shown in the hero
  vibes: [
    { text: 'Fluent in sarcasm and movie quotes' },
    { text: 'Just a human trying to be an adult' },
    { text: 'Food > People' },
  ],

  about: [
    'I’m an Electrical Engineering student at VSSUT who fell for software. I build full-stack web applications end-to-end — REST APIs, data modelling, authentication & security, and AI/RAG integration.',
    'I like turning fuzzy business requirements into working technical outcomes, and I document as I go. That habit comes from mixing engineering with startup operations and applied research.',
  ],

  // Extra details from LinkedIn go here (rendered as a "Beyond the resume" strip when non-empty)
  beyond: [],

  education: {
    school: 'Veer Surendra Sai University of Technology (VSSUT), Burla',
    degree: 'B.Tech in Electrical Engineering',
    motto: 'A single sheet of paper can’t decide my future.',
    graduation: 2027,
  },

  contact: {
    email: 'pratyushkumar23vssut@gmail.com',
    linkedin: 'https://www.linkedin.com/in/pratyushkumarsahu/',
    github: '', // TODO: add your GitHub profile URL to show the GitHub button
    phone: '+91 76848 93633',
    showPhone: false, // set to true to display your phone number publicly
  },

  resume: asset('/resume.pdf'),

  // "Try this challenge" button below Contact.
  // Put the video at public/challenge.mp4, or set `link` to a YouTube/Instagram URL to open that instead.
  challenge: { video: asset('/challenge.mp4'), link: '' },

  // Your photos: drop files in public/photos and list them here (see public/photos/README.md)
  photos: {
    portrait: asset('/photos/portrait.webp'),
    portraitCaption: 'To become as great as SRK',
    gallery: [
      // focus = which part of the photo stays visible in the 4:5 crop
      { src: asset('/photos/beach.webp'), caption: 'On a beach', focus: 'center 62%' },
      { src: asset('/photos/running.webp'), caption: 'On a running track', focus: 'center 55%' },
      { src: asset('/photos/cafe.webp'), caption: 'On a date at a cafe', focus: 'center 45%' },
      { src: asset('/photos/mountains.webp'), caption: 'On the mountains', focus: 'center 70%' },
    ],
  },

  projects: [
    {
      id: 'tnp',
      title: 'T&P Assistant',
      subtitle: 'AI-Powered Placement Portal',
      stack: ['React 19', 'Vite', 'Node.js / Express 5', 'MongoDB Atlas Vector Search', 'JWT', 'Gemini API'],
      skills: ['React', 'Node.js / Express', 'MongoDB', 'JWT / Auth', 'REST API design', 'RAG Pipelines', 'Vector Search', 'Gemini API', 'JavaScript', 'Git'],
      highlights: [
        'Full-stack app end-to-end: React SPA, Express REST API, MongoDB Atlas — with JWT auth (httpOnly refresh cookies, bcrypt) and server-side role-based access for students and admins.',
        'RAG pipeline over Atlas vector search + Gemini: the assistant answers only from admin-uploaded documents, with cited sources instead of made-up answers.',
        'AI resume analyzer — PDF parsing, rule-based ATS checks, AI feedback and JD-match scoring. API hardened with validation, rate limiting and helmet.',
        'Shipped through an 8-phase gated process: each phase built, tested and documented (PRD, architecture, API reference, decision log) before the next.',
      ],
      links: { github: '', live: '' },
      visual: 'chat',
    },
    {
      id: 'flashpdf',
      title: 'FlashPDF AI',
      subtitle: 'AI-Generated Flashcard Study Platform',
      stack: ['React 19 / TypeScript', 'Node.js / Express', 'Prisma / SQLite', 'Gemini API', 'Docker'],
      skills: ['React', 'TypeScript', 'Node.js / Express', 'Prisma', 'SQL', 'JWT / Auth', 'Docker', 'Gemini API', 'Automated Testing', 'Git'],
      highlights: [
        'Full-stack study app: React/TypeScript frontend, Express backend, Prisma/SQLite — JWT-authenticated per-user data isolation and invite-gated signup.',
        'PDF text extraction (pdfjs-dist) with an OCR fallback (tesseract.js) for scanned PDFs, then Gemini turns them into flashcards via structured JSON output.',
        '24 automated backend tests (node:test + supertest) and a Docker deployment — debugged real build issues (native modules, OpenSSL detection) by actually running the container.',
      ],
      links: { github: '', live: '' },
      visual: 'flashcard',
    },
  ],

  experience: [
    {
      role: 'Founder’s Office Intern',
      org: 'Dahibara Express',
      period: 'May 2026 – Jul 2026',
      text: 'Partnered directly with the founder on strategic initiatives, coordinating cross-functional activities and market research to drive targeted process improvements.',
      tag: 'Startup',
    },
    {
      role: 'Outreach Intern',
      org: 'Craly.in',
      period: 'Apr 2026 – Jun 2026',
      text: 'Led lead generation and stakeholder outreach, using structured market research and CRM tools to identify and prioritise business opportunities.',
      tag: 'Growth',
    },
    {
      role: 'Research Intern — Electric Vehicle Integration',
      org: 'NITTTR Kolkata',
      period: 'Jun 2025 – Jul 2025',
      text: 'Researched EV integration and built MATLAB/Simulink models to analyse system performance; documented findings in structured technical reports.',
      tag: 'Research',
    },
  ],

  leadership: [
    {
      role: 'Computer Science Mentor',
      org: 'School students',
      text: 'Built structured learning plans and simplified technical concepts to fit each student’s needs.',
    },
    {
      role: 'Assistant Branch Secretary',
      org: 'Electrical Engineering Dept., VSSUT',
      text: 'Coordinated departmental events, volunteer teams and timelines with faculty and student teams.',
    },
  ],

  skills: [
    { group: 'Programming & Scripting', items: ['JavaScript', 'TypeScript', 'Python', 'C++', 'SQL', 'MATLAB / Simulink'] },
    { group: 'Web & Backend', items: ['React', 'Node.js / Express', 'REST API design', 'JWT / Auth', 'MongoDB', 'Prisma', 'Docker', 'Git'] },
    { group: 'AI & Data', items: ['RAG Pipelines', 'Vector Search', 'Gemini API', 'Claude Code', 'Automated Testing'] },
    { group: 'Project & Process', items: ['Project Coordination', 'Stakeholder Management', 'Technical Documentation', 'Process Improvement', 'Agile Delivery'] },
  ],

  // Shown in the Skills section only when someone hovers over the "Other talents" card
  secretSkills: ['Pranking people', 'Cracking jokes', 'Singing occasionally', 'Asking the weirdest questions'],

  certifications: [
    { name: 'Generative AI — Introduction', issuer: 'Google · Coursera', url: 'https://www.coursera.org/account/accomplishments/records/90D62439O0NI' },
    { name: 'Full Stack Web Development', issuer: 'Certification', url: '' },
    { name: 'Google Network Architecture', issuer: 'Google · Coursera', url: 'https://www.coursera.org/account/accomplishments/records/7LES7HY2K0Q0' },
    { name: 'Project Management Plan using Trello', issuer: 'Coursera', url: 'https://www.coursera.org/account/accomplishments/records/BFQFLNUEO934' },
    { name: 'Introduction to LLMs', issuer: 'Coursera', url: 'https://www.coursera.org/account/accomplishments/records/6WEXMAIRFGTO' },
  ],
}

// Canned Q&A for the "Ask Pratyush" bubble — answered only from the data above, with a source.
export const faq = [
  {
    q: 'What do you build?',
    keys: ['build', 'do', 'what', 'work'],
    a: 'Full-stack web apps, end to end — React frontends, Express REST APIs, MongoDB/Prisma data layers, JWT auth, and AI features like RAG pipelines that cite their sources.',
    source: 'Resume › Summary',
  },
  {
    q: 'What’s your tech stack?',
    keys: ['stack', 'tech', 'skills', 'language', 'tools'],
    a: 'JavaScript & TypeScript, React, Node.js/Express, MongoDB, Prisma, Docker and Git — plus Python, C++, SQL and MATLAB/Simulink. On the AI side: RAG, vector search, the Gemini API and Claude Code.',
    source: 'Resume › Skills',
  },
  {
    q: 'Tell me about T&P Assistant',
    keys: ['t&p', 'tnp', 'placement', 'rag', 'portal'],
    a: 'An AI-powered placement portal: React + Express + MongoDB Atlas, with role-based access, an AI resume analyzer, and a RAG assistant that answers only from admin-uploaded documents — with citations.',
    source: 'Resume › Projects',
  },
  {
    q: 'Where have you interned?',
    keys: ['intern', 'experience', 'job', 'company'],
    a: 'Founder’s Office Intern at Dahibara Express, Outreach Intern at Craly.in, and Research Intern (EV Integration) at NITTTR Kolkata.',
    source: 'Resume › Experience',
  },
  {
    q: 'What are you studying?',
    keys: ['study', 'college', 'education', 'cgpa', 'university', 'vssut', 'marks', 'grade'],
    a: 'B.Tech in Electrical Engineering at VSSUT, Burla, graduating in 2027. And no, a single sheet of paper can’t decide my future.',
    source: 'Resume › Education',
  },
  {
    q: 'How can I reach you?',
    keys: ['reach', 'contact', 'email', 'hire', 'linkedin'],
    a: 'Email pratyushkumar23vssut@gmail.com or connect on LinkedIn — links are in the Contact section below.',
    source: 'Resume › Header',
  },
]
