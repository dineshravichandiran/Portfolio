export interface Platform {
  marker: string
  title: string
  type: string
  desc: string
  soon?: string
}

export const platforms: Platform[] = [
  { marker: 'PLM / 01', title: 'Private-Cloud PLM', type: 'Private Cloud', desc: 'Core product lifecycle management for aerospace, automotive & manufacturing.' },
  { marker: 'PLM / 02', title: 'Cloud PLM', type: 'SaaS', desc: 'Next-gen cloud PLM with real-time collaboration.' },
  { marker: 'PLM / 03', title: 'Retail PLM', type: 'SaaS', desc: 'Retail & fashion product lifecycle management.' },
  { marker: 'IIoT / 04', title: 'IIoT Platform', type: 'IIoT Platform', desc: 'Industrial IoT monitoring & manufacturing intelligence.' },
  { marker: 'AR / 05', title: 'AR Platform', type: 'Augmented Reality', desc: 'Enterprise AR platform for spatial computing and industrial work instructions.' },
]

export interface ToolBadge {
  label: string
  icon?: string
  learning?: boolean
}

export interface ToolCategory {
  title: string
  badges: ToolBadge[]
}

export const toolCategories: ToolCategory[] = [
  {
    title: 'Monitoring & Observability',
    badges: [
      { label: 'Sumo Logic', icon: 'https://cdn.simpleicons.org/sumologic' },
      { label: 'AWS CloudWatch' },
      { label: 'Zabbix' },
      { label: 'Prometheus', icon: 'https://cdn.simpleicons.org/prometheus' },
      { label: 'Grafana', icon: 'https://cdn.simpleicons.org/grafana' },
      { label: 'Catchpoint' },
      { label: 'PagerDuty', icon: 'https://cdn.simpleicons.org/pagerduty' },
    ],
  },
  {
    title: 'Cloud & Infrastructure',
    badges: [
      { label: 'Microsoft Azure', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg' },
      { label: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
      { label: 'Kubernetes (AKS)', icon: 'https://cdn.simpleicons.org/kubernetes' },
      { label: 'kubectl' },
      { label: 'k9s' },
      { label: 'Linux (RHEL)', icon: 'https://cdn.simpleicons.org/linux' },
      { label: 'Apache / Tomcat', icon: 'https://cdn.simpleicons.org/apachetomcat' },
      { label: 'Apache DS' },
      { label: 'Red Hat DS', icon: 'https://cdn.simpleicons.org/redhat' },
    ],
  },
  {
    title: 'Configuration & Automation',
    badges: [
      { label: 'Salt (SaltStack)', icon: 'https://cdn.simpleicons.org/saltproject' },
      { label: 'Ansible', icon: 'https://cdn.simpleicons.org/ansible' },
      { label: 'Bash Scripting', icon: 'https://cdn.simpleicons.org/gnubash' },
      { label: 'Python', icon: 'https://cdn.simpleicons.org/python' },
      { label: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
      { label: 'Cron / Systemd' },
      { label: 'Docker', icon: 'https://cdn.simpleicons.org/docker' },
    ],
  },
  {
    title: 'IaC & CI/CD',
    badges: [
      { label: 'Terraform', icon: 'https://cdn.simpleicons.org/terraform' },
      { label: 'GitHub Actions', icon: 'https://cdn.simpleicons.org/githubactions' },
      { label: 'CI/CD Pipelines' },
      { label: 'Python Automation' },
    ],
  },
  {
    title: 'PLM / Application Operations',
    badges: [
      { label: 'Enterprise PLM Support' },
      { label: 'Application Service Management' },
      { label: 'CAD App Support' },
      { label: 'Service / Daemon Mgmt' },
    ],
  },
  {
    title: 'ITSM & Operations',
    badges: [
      { label: 'ServiceNow' },
      { label: 'Incident Management' },
      { label: 'Change Management' },
      { label: 'ITIL' },
    ],
  },
  {
    title: 'AI Tools & Productivity',
    badges: [
      { label: 'Microsoft Copilot' },
      { label: 'Claude', icon: 'https://cdn.simpleicons.org/anthropic' },
      { label: 'ChatGPT' },
      { label: 'Gemini', icon: 'https://cdn.simpleicons.org/googlegemini' },
      { label: 'AI-Assisted Troubleshooting' },
    ],
  },
  {
    title: 'Building Toward (In-Demand Skills)',
    badges: [
      { label: 'CKA (Kubernetes)', icon: 'https://cdn.simpleicons.org/kubernetes', learning: true },
      { label: 'AWS SAA Prep', learning: true },
    ],
  },
]
