export interface EventItem {
  status: string
  title: string
  date: string
  desc: string
}

export const events: EventItem[] = [
  {
    status: 'Attended',
    title: 'KubeCon + CloudNativeCon India 2026',
    date: 'June 18–19, 2026 · Jio World Convention Centre, Mumbai',
    desc: "At KubeCon Mumbai with a curated schedule focused on Kubernetes observability, SRE practices, and platform engineering. If we met there — great to connect! Reach me anytime via the links below.",
  },
  {
    status: 'Attended',
    title: 'KubeCon + CloudNativeCon India 2025',
    date: 'CNCF · Hyderabad',
    desc: 'Hands-on exposure to cloud-native tooling, observability stacks, and real-world SRE patterns from leading product companies in India.',
  },
]

export interface ImpactStat {
  target: number
  suffix?: string
  decimals?: number
  comma?: boolean
  label: string
}

export const impactStats: ImpactStat[] = [
  { target: 5000, suffix: '+', comma: true, label: 'Incidents Resolved' },
  { target: 10, suffix: '+', label: 'Runbooks Authored' },
  { target: 99.9, suffix: '%', decimals: 1, label: 'Platform Availability' },
  { target: 50, suffix: '+', label: 'Fortune 500 Customers' },
  { target: 200, suffix: '+', label: 'Production Servers' },
  { target: 24, suffix: '×7', label: 'On-Call Operations' },
]

export interface CredentialRow {
  type: 'Publication' | 'Certification' | 'Award' | 'Education'
  title: string
  issuer: string
  /** Certification only: the exam's own official tier name (or, for non-tiered
   * courses, a fair descriptive label — noted inline where that's the case). */
  tier?: string
  /** Certification only: real topics from the exam's public skills outline. */
  tags?: string[]
}

export const credentials: CredentialRow[] = [
  { type: 'Publication', title: 'WTA Runbook: Memory Optimization for Clustered PLM Nodes', issuer: 'PTC Internal Knowledge Base · Mar 2026 · Referenced by the org-wide NOC memory-alert runbook' },
  {
    type: 'Certification',
    title: 'Azure Fundamentals (AZ-900)',
    issuer: 'Microsoft Certified · 2023',
    tier: 'Fundamentals',
    tags: ['Cloud Concepts', 'Azure Architecture', 'Governance & Compliance'],
  },
  {
    type: 'Certification',
    title: 'Azure Data Fundamentals (DP-900)',
    issuer: 'Microsoft Certified · 2023',
    tier: 'Fundamentals',
    tags: ['Core Data Concepts', 'Relational & Non-Relational Data', 'Analytics Workloads'],
  },
  {
    type: 'Certification',
    title: 'Advanced Kubernetes Operations & Linux System Administration',
    issuer: 'KodeKloud · 2025',
    tier: 'Specialist',
    tags: ['Kubernetes Administration', 'Linux System Administration', 'Troubleshooting'],
  },
  { type: 'Award', title: 'Smart India Hackathon Winner', issuer: 'National Level · 2020 · 10,000+ competing teams' },
  { type: 'Award', title: 'SO&S Quality Compliance Award', issuer: 'PTC · Resolved a PagerDuty/Zabbix alert-closure backlog, strengthening ISO audit compliance · 2026' },
  { type: 'Award', title: 'Performance & Efficiency Award', issuer: 'PTC · Technical Architect collaboration, runbook authoring, cost optimization · Nov 2025 – May 2026' },
  { type: 'Award', title: 'Crowdstrike and Digicert Recovery Award', issuer: 'PTC · Team recognition for stabilizing customer environments during the CrowdStrike incident and DigiCert expiry' },
  { type: 'Education', title: 'MBA – Information System Management / Analytics & Data Science', issuer: 'Manipal University Jaipur · 2025–2027 (Expected)' },
  { type: 'Education', title: 'B.E. Electronics & Instrumentation', issuer: 'Panimalar Engineering College · 2018–2022 · CGPA 8.1/10' },
]
