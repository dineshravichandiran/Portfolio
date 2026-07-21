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
  number: string
  label: string
}

export const impactStats: ImpactStat[] = [
  { number: '5,000+', label: 'Incidents Resolved' },
  { number: '10+', label: 'Runbooks Authored' },
  { number: '99.9%', label: 'Platform Availability' },
  { number: '50+', label: 'Fortune 500 Customers' },
  { number: '200+', label: 'Production Servers' },
  { number: '24×7', label: 'On-Call Operations' },
]

export interface CredentialRow {
  type: 'Certification' | 'Award' | 'Education'
  title: string
  issuer: string
}

export const credentials: CredentialRow[] = [
  { type: 'Certification', title: 'Azure Fundamentals (AZ-900)', issuer: 'Microsoft Certified · 2023' },
  { type: 'Certification', title: 'Azure Data Fundamentals (DP-900)', issuer: 'Microsoft Certified · 2023' },
  { type: 'Certification', title: 'Advanced Kubernetes Operations & Linux System Administration', issuer: 'KodeKloud · 2025' },
  { type: 'Award', title: 'Smart India Hackathon Winner', issuer: 'National Level · 2020 · 10,000+ competing teams' },
  { type: 'Award', title: 'Customer First Award', issuer: 'PTC · Major incident recovery · Aug 2024' },
  { type: 'Award', title: 'PTC Cheers Award', issuer: 'Recognition for Performance & Efficiency · May 2026' },
  { type: 'Education', title: 'MBA – Information System Management / Analytics & Data Science', issuer: 'Manipal University Jaipur · 2025–2027 (Expected)' },
  { type: 'Education', title: 'B.E. Electronics & Instrumentation', issuer: 'Panimalar Engineering College · 2018–2022 · CGPA 8.1/10' },
]
