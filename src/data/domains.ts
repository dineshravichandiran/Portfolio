import type { DomainIconName } from '../components/dashboard/domainIcons'

export interface Domain {
  marker: string
  title: string
  desc: string
  icon: DomainIconName
}

export const domains: Domain[] = [
  { marker: 'DOM / 01', title: 'Site Reliability', desc: 'On-call incident response, RCA, and outage coordination across App, DB, and Network teams.', icon: 'activity' },
  { marker: 'DOM / 02', title: 'Cloud Infrastructure', desc: 'Multi-cloud operations across AWS and Azure — compute, networking, and service health.', icon: 'cloud' },
  { marker: 'DOM / 03', title: 'Monitoring & Observability', desc: 'Zabbix, Grafana, Prometheus, CloudWatch — alert lifecycle from trigger to resolution.', icon: 'eye' },
  { marker: 'DOM / 04', title: 'Kubernetes & Containers', desc: 'Pod- and node-level troubleshooting on AKS with kubectl and k9s, CKA certification in progress.', icon: 'box' },
  { marker: 'DOM / 05', title: 'Infrastructure as Code', desc: 'Terraform-driven provisioning and GitHub Actions pipelines for repeatable, versioned infra.', icon: 'code' },
  { marker: 'DOM / 06', title: 'Configuration Automation', desc: 'Ansible and SaltStack for host baselining, drift correction, and self-healing systems.', icon: 'sliders' },
  { marker: 'DOM / 07', title: 'CI/CD & DevSecOps', desc: 'End-to-end pipelines that build, test, scan, and ship — security folded in, not bolted on.', icon: 'refresh' },
  { marker: 'DOM / 08', title: 'Enterprise PLM & IIoT Ops', desc: 'Platform administration for PLM, IIoT, and microservice infrastructure serving Fortune 500 customers.', icon: 'layers' },
  { marker: 'DOM / 09', title: 'ITSM & Incident Management', desc: 'ServiceNow change/incident workflows under ITIL, plus 10+ runbooks the team relies on.', icon: 'alert' },
  { marker: 'DOM / 10', title: 'AR / Spatial Computing', desc: 'Newly underway: supporting an enterprise AR platform for industrial work instructions.', icon: 'scan' },
]
