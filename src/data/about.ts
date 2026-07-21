export interface AboutCard {
  number: string
  title: string
  body: string
}

export const aboutIntro = "Three years keeping enterprise SaaS platforms online for 50+ Fortune 500 customers — the person who gets paged at 2 a.m. and has it resolved before the business day starts. Here's what that actually looks like, day to day."

export const aboutCards: AboutCard[] = [
  {
    number: '01',
    title: 'Incident Response',
    body: 'Handle production incidents across AWS and Azure for 50+ Fortune 500 customers via on-call rotation. Triage, resolve directly where possible, or escalate to NOC Central and Incident Management teams. Lead outage coordination across App, DB, and Network teams during high-severity events.',
  },
  {
    number: '02',
    title: 'Root Cause Analysis',
    body: 'Investigate failures by analyzing application logs in Sumo Logic, AWS CloudWatch, and platform logs to identify root cause. Document findings, then resolve directly or escalate to the right team. Produce trend analysis on recurring issues to drive permanent fixes.',
  },
  {
    number: '03',
    title: 'Linux, AKS & Containers',
    body: 'Troubleshoot production Linux servers (200+) — CPU, memory, disk, networking, Apache/Tomcat. Pod- and node-level troubleshooting on Azure Kubernetes Service (AKS) using kubectl and k9s — node health, namespaces, container status, and log analysis. Act on alerts like CrashLoopBackOff, OOMKilled, pod restarts, node scale-downs, and unhealthy containers.',
  },
  {
    number: '04',
    title: 'PLM Platform Operations',
    body: 'Administer enterprise PLM platforms at the operational level — verify service and daemon configuration alignment, start and manage application services, and bring up dependent CAD and third-party applications customers rely on. Manage Apache DS, Red Hat DS, and Tomcat. Start, stop, and restart services as needed to keep customer environments stable.',
  },
  {
    number: '05',
    title: 'Monitoring & Alert Lifecycle',
    body: "Own the alert lifecycle in Zabbix — monitor auto-resolved alerts, manually resolve those that don't clear, and verify and close alerts once underlying issues (including customer-side) are resolved. Set up and validate monitoring for customer go-lives, ensuring all monitoring services are active, enabled, and fixed where needed.",
  },
  {
    number: '06',
    title: 'Ownership & Knowledge',
    body: 'Raise and manage change requests following ITIL change management, and perform scheduled maintenance applying remediation recommendations. Authored 10+ published runbooks that the team now relies on. Collaborate with Technical Architects on infrastructure recovery and major incident response, including during large-scale industry-wide outage events.',
  },
]
