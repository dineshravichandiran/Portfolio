export interface JourneyMilestone {
  id: string
  year: string
  city: string
  location?: string
  company: string
  role: string
  meta: string
  body: string
  tags: string[]
  current?: boolean
  /** Position along the 3D road curve (0-1). Omitted for timeline-only entries not placed in the 3D scene. Keep stops between their city's roadside stones (Gurgaon x 28-40 is about t 0.47-0.67). */
  sceneT?: number
}

export const milestones: JourneyMilestone[] = [
  {
    id: 'appversal',
    year: 'Mar – Apr 2021',
    city: 'MUMBAI',
    location: 'Mumbai, Maharashtra, India',
    company: 'AppVersal',
    role: 'Marketing Professional (Intern)',
    meta: 'Internship',
    body: 'One-month marketing internship at a startup in Navi Mumbai. Worked on brand-visibility and customer-engagement initiatives, digital marketing and market research, and received the founder\'s certification for satisfactory progress.',
    tags: ['Digital Marketing', 'Market Research', 'Startup'],
  },
  {
    id: 'drdo',
    year: 'Aug – Sep 2021',
    city: 'CHENNAI',
    location: 'Avadi, Tamil Nadu',
    company: 'DRDO',
    role: 'R&D Engineering Intern',
    meta: '01 · CHENNAI · Aug – Sep 2021',
    body: 'Contributed to a defence R&D project at DRDO Avadi, sensor integration for combat vehicle systems. Working on mission-critical hardware shaped my approach to reliability and documentation.',
    tags: ['Defence R&D', 'Sensor Integration', 'Reliability Mindset', 'Technical Documentation'],
    sceneT: 0.12,
  },
  {
    id: 'panimalar',
    year: 'Jul 2018 – Apr 2022',
    city: 'CHENNAI',
    company: 'Panimalar Engineering College',
    role: 'B.E. Electronics & Instrumentation · CGPA 8.1/10',
    meta: 'Education',
    body: 'Won Smart India Hackathon at the national level, competing against 10,000+ teams. Built problem-solving and teamwork skills under high-pressure constraints.',
    tags: ['SIH National Winner', 'CGPA 8.1'],
  },
  {
    id: 'cognizant',
    year: 'Feb – Jul 2022',
    city: 'BANGALORE',
    location: 'Bangalore, India',
    company: 'Cognizant',
    role: 'Programmer Analyst Trainee (Intern)',
    meta: '02 · BANGALORE · First Software Internship',
    body: 'Six-month paid internship. Trained in full-stack fundamentals and SQL, then specialized in Java, building a Spring Boot MVC project with MySQL. Earned a full-time offer on performance.',
    tags: ['Java', 'Spring Boot', 'REST APIs', 'MySQL', 'Earned Full-time Offer'],
    sceneT: 0.36,
  },
  {
    id: 'johnson-controls',
    year: 'Jul – Nov 2022',
    city: 'PUNE',
    location: 'Pune, India',
    company: 'Johnson Controls',
    role: 'Intern (Building Automation Systems)',
    meta: 'Internship',
    body: 'Trained in Building Automation Systems (BAS) and HVAC fundamentals. Contributed to project execution plans and quality assurance of hardware and software deliverables, with design and application engineering work on international projects.',
    tags: ['Building Automation', 'HVAC', 'Project Execution', 'Quality Assurance'],
  },
  {
    id: 'associate',
    year: 'Dec 2022 – Oct 2025',
    city: 'GURGAON',
    location: 'Gurgaon, Haryana, India · Remote',
    company: 'Fortune 500 Enterprise SaaS/PLM Company',
    role: 'Cloud NOC Technician, Associate',
    meta: '03 · GURGAON · The Foundation',
    body: "Resolved production incidents across AWS and Azure, holding 99.9% uptime for 50+ Fortune 500 environments. Memory RCA over 2.5 years with the Technical Architect team. Linux, Apache and Tomcat across 200+ servers; logs in Sumo Logic and CloudWatch. Recognized with a Crowdstrike and Digicert Recovery Award for stabilizing customer environments during the CrowdStrike incident and DigiCert certificate expiry.",
    tags: ['Incident Management', 'Root Cause Analysis', 'Linux & Tomcat', 'Sumo Logic', '99.9% Uptime', 'Crowdstrike/DigiCert Recovery Award'],
    sceneT: 0.52,
  },
  {
    id: 'technician',
    year: 'Nov 2025 – Aug 2026',
    city: 'GURGAON',
    location: 'Gurgaon, Haryana, India · Remote',
    company: 'Fortune 500 Enterprise SaaS/PLM Company',
    role: 'Cloud NOC Technician',
    meta: '04 · GURGAON · Stepping Up',
    body: "Collaborated closely with the Technical Architect team to evaluate use cases, review scenarios, and align on best practices for scalable, informed decisions. Authored and enhanced knowledge articles, including a memory-optimization runbook for clustered PLM nodes now adopted as the org-wide NOC standard, improving application performance, optimizing resource utilization, and reducing infrastructure cost. Recognized with a Performance & Efficiency Award.",
    tags: ['Technical Architects', 'Runbook Authoring', 'Performance Tuning', 'Cost Optimization', 'Performance & Efficiency Award'],
    sceneT: 0.64,
  },
  {
    id: 'specialist',
    year: 'Sep 2026 – Present',
    city: 'PUNE',
    location: 'Pune City, Maharashtra, India · On-site (internal transfer from Gurgaon, Sep 2026)',
    company: 'Fortune 500 Enterprise SaaS/PLM Company',
    role: 'Cloud Services Specialist NOC Engineer',
    meta: '05 · PUNE · Now',
    body: "24×7 production support on AWS and Azure for 50+ Fortune 500 customers. Lead incident response and RCA. Worked closely with the broader team to resolve a backlog of alerts marked closed in PagerDuty but still open in Zabbix, strengthening monitoring accuracy for ISO audit and compliance, recognized with a Quality Compliance Award. Kubernetes (AKS) pod- and node-level troubleshooting with kubectl and k9s: CrashLoopBackOff, OOMKilled, scale-downs. Growing fast and ready for the next challenge.",
    tags: ['Kubernetes (AKS)', 'Incident Response', 'Observability', 'Automation', 'AWS & Azure', 'Quality Compliance Award'],
    current: true,
    sceneT: 0.86,
  },
]

/** Subset placed along the 3D road, in scene order. */
export const sceneMilestones = milestones.filter((m) => m.sceneT !== undefined)
