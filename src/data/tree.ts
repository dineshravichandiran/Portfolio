export interface TreeCommit {
  title: string
  meta: string
  desc: string
  link?: string
}

export interface TreeBranch {
  name: string
  color: string
  commits: TreeCommit[]
}

export const branches: TreeBranch[] = [
  {
    name: 'cloud-infra-ops',
    color: '#3fb950',
    commits: [
      {
        title: 'Enterprise SaaS Observability & Incident Response',
        meta: 'Ongoing · 50+ Fortune 500 environments',
        desc: 'Built and manage end-to-end monitoring across Zabbix, Sumo Logic, Prometheus, Grafana, CloudWatch, Catchpoint and PagerDuty. Own the full alert lifecycle, validate monitoring for customer go-lives, and lead 24x7 incident response.',
      },
      {
        title: 'Recurring Memory & Performance Root-Cause Initiative',
        meta: '2.5+ yrs · Improved platform performance',
        desc: 'Drove recurring memory/OutOfMemory and performance alerts to root cause over 2.5+ years with the Technical Architect team, improving platform performance and optimizing cloud cost across AWS and Azure.',
      },
      {
        title: 'Runbook & Incident-Handling Standardization',
        meta: 'Ongoing · 10+ team-adopted runbooks',
        desc: 'Authored 10+ team-adopted runbooks under ITIL change management and standardized incident-handling procedures across a 12-member team. Mentor new and junior engineers.',
      },
    ],
  },
  {
    name: 'devops-iac',
    color: '#58a6ff',
    commits: [
      {
        title: 'Zabbix Monitoring Lab — Platform Deep-Dive',
        meta: 'Self-Directed · Platform Engineering',
        desc: "Production work covers alert tuning and triage — this self-hosted Zabbix lab (Docker) was built to go deeper into the platform-engineering side I don't touch daily: discovery rules, preprocessing, escalation logic, RBAC, and the API. Terraform-based provisioning is the next iteration I'm building toward, extending the same repeatable, version-controlled approach to monitoring-as-code.",
        link: 'https://github.com/dineshravichandiran/zabbix-monitoring-lab',
      },
      {
        title: 'Self-Healing Infrastructure on AWS',
        meta: 'Self-Directed · Terraform',
        desc: "Terraform-provisioned VPC/ALB/Auto Scaling Group with CloudWatch alarms and Lambda-based auto-remediation for failure modes native ASG health checks don't catch — hardware faults, silent process crashes, and instances stopped outside the normal lifecycle. Every remediation publishes its own CloudWatch metric, so recovery is provable, not assumed.",
        link: 'https://github.com/dineshravichandiran/cloud-devops-projects/tree/main/self-healing-aws-infra',
      },
      {
        title: 'End-to-End DevSecOps CI Pipeline',
        meta: 'Self-Directed · GitHub Actions',
        desc: "A GitHub Actions pipeline gating every deployment behind secret scanning, SAST, SCA, container scanning, and DAST. Found and fixed three separate real failures blocking it end-to-end — a CodeQL language mismatch, a missing token permission, and a third-party action's broken artifact upload. All 8 jobs pass clean today, verified live.",
        link: 'https://github.com/dineshravichandiran/cloud-devops-projects/tree/main/devsecops-ci-pipeline',
      },
      {
        title: 'Ansible: Zabbix Onboarding + Host Baseline',
        meta: 'Self-Directed · Ansible',
        desc: 'Idempotent playbook to onboard a fresh host into Zabbix monitoring with a hardened baseline (chrony, scoped UFW, unattended upgrades, log rotation). Tested against real systemd containers — found and fixed two real bugs (a crash-looping service from a wrong log path, and a live timestamp silently breaking idempotency). A clean re-run reports changed=0, and the agent was verified with real zabbix_get queries, not assumed.',
        link: 'https://github.com/dineshravichandiran/ansible-zabbix-baseline',
      },
      {
        title: 'Salt Self-Healing Memory Guard',
        meta: 'Self-Directed · Salt',
        desc: "Custom Salt beacon watches a named process's memory and a reactor restarts it before an OOM kill — closing the loop production incidents usually need a human for. Tested live in a Codespace against a real salt-master/minion pair; found and fixed two real bugs (a decommissioned bootstrap URL, and a reactor event-tag glob that silently never matched the beacon's actual tag). Three consecutive detect-restart-log cycles verified back to back.",
        link: 'https://github.com/dineshravichandiran/salt-self-healing-memory',
      },
    ],
  },
  {
    name: 'personal-builds',
    color: '#d29922',
    commits: [
      {
        title: 'Personal Cloud/SRE Portfolio & 3D Career Journey',
        meta: 'Finished · Solo build',
        desc: 'Designed and deployed this portfolio and an interactive 3D career-journey site (React, TypeScript, Three.js) via Netlify — proof I can build and ship, not just operate.',
      },
    ],
  },
  {
    name: 'hackathon',
    color: '#f85149',
    commits: [
      {
        title: 'Smart India Hackathon 2020 — National Winner',
        meta: '2020 · 10,000+ competing teams',
        desc: 'National Grand Finale Winner for the Bureau of Police Research & Development (BPRD). My team of 6 built "Antigen," a web app that detects malicious and rogue chatbots across web and social platforms.',
      },
    ],
  },
  {
    name: 'certs-education',
    color: '#a371f7',
    commits: [
      { title: 'Azure Fundamentals (AZ-900)', meta: 'Microsoft Certified · 2023', desc: 'Core Azure cloud concepts, services, and pricing.' },
      { title: 'Azure Data Fundamentals (DP-900)', meta: 'Microsoft Certified · 2023', desc: 'Core data concepts and Azure data services.' },
      { title: 'Advanced Kubernetes Operations & Linux System Administration', meta: 'KodeKloud · 2025', desc: 'Hands-on Kubernetes operations and Linux system administration.' },
      { title: 'MBA – Information System Management / Analytics & Data Science', meta: 'Manipal University Jaipur · 2025–2027 (Expected)', desc: 'Graduate study in information systems management, analytics, and data science.' },
    ],
  },
]
