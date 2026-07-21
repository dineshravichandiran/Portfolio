export interface Capability {
  title: string
  tagline: string
  body: string
  stat: { value: string; label: string }
}

export const capabilities: Capability[] = [
  {
    title: 'Reliability',
    tagline: '24×7 · Incident Response · RCA',
    body: 'On-call for enterprise SaaS platforms serving 50+ Fortune 500 customers — triage fast, resolve directly where I can, and escalate only when it genuinely needs another team.',
    stat: { value: '5,000+', label: 'incidents resolved' },
  },
  {
    title: 'Automation',
    tagline: 'IaC · Config Mgmt · Self-Healing',
    body: 'Terraform, Ansible, and Salt turn manual runbooks into code — drift correction and recovery that doesn’t wait for a human to notice first.',
    stat: { value: '10+', label: 'runbooks authored' },
  },
  {
    title: 'Observability',
    tagline: 'Metrics · Alerts · Dashboards',
    body: 'Own the alert lifecycle in Zabbix end to end, and build Grafana, Prometheus, and CloudWatch views that make root cause obvious instead of buried in logs.',
    stat: { value: '99.9%', label: 'uptime maintained' },
  },
  {
    title: 'Cloud & Platforms',
    tagline: 'AWS · Azure · Kubernetes',
    body: 'Pod- and node-level troubleshooting on AKS, plus PLM and IIoT platform administration across 200+ production Linux servers.',
    stat: { value: '3+', label: 'years in production' },
  },
]
