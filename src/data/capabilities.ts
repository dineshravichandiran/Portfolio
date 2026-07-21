import { getYearsExperienceLabel } from '../utils/experience'

export interface Capability {
  title: string
  tagline: string
  bar: string
  stat: { value: string; label: string }
}

export const capabilities: Capability[] = [
  {
    title: 'Reliability',
    tagline: '24×7 · Incident Response · RCA',
    bar: 'On-Call · Fast Triage · Escalate Smart',
    stat: { value: '5,000+', label: 'incidents resolved' },
  },
  {
    title: 'Automation',
    tagline: 'IaC · Config Mgmt · Self-Healing',
    bar: 'Terraform · Ansible · SaltStack',
    stat: { value: '10+', label: 'runbooks authored' },
  },
  {
    title: 'Observability',
    tagline: 'Metrics · Alerts · Dashboards',
    bar: 'Zabbix · Grafana · Prometheus',
    stat: { value: '99.9%', label: 'uptime maintained' },
  },
  {
    title: 'Cloud & Ops',
    tagline: 'AWS · Azure · Kubernetes',
    bar: 'AKS · Linux (RHEL) · PLM Platforms',
    stat: { value: getYearsExperienceLabel(), label: 'years in production' },
  },
]
