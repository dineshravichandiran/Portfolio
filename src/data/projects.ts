export interface FlowStep {
  label: 'Problem' | 'Action' | 'Result'
  text: string
}

export interface ProjectShot {
  src: string
  alt: string
  caption: string
}

export interface ProjectItem {
  year: string
  meta: string
  title: string
  impact: string
  desc: string
  flow: FlowStep[]
  tags: string[]
  shots?: ProjectShot[]
  note?: string
  link?: string
  badge?: string
}

export const workProjects: ProjectItem[] = [
  {
    year: '2024',
    meta: 'Production · Enterprise PLM',
    title: 'JVM Heap & Performance Tuning',
    impact: 'Reduced recurring OOM incidents · Improved app stability',
    desc: "Diagnosed recurring out-of-memory errors and slow garbage collection on a Fortune 500 customer's enterprise PLM production environment. Analyzed heap dumps, GC logs, and thread states to pinpoint memory leaks and inefficient object retention patterns.",
    flow: [
      { label: 'Problem', text: 'Frequent OOM crashes and long GC pauses degrading user experience.' },
      { label: 'Action', text: 'Tuned heap sizing, GC algorithm, and added targeted Sumo Logic queries.' },
      { label: 'Result', text: 'Stabilized production, reduced ticket volume, runbook adopted team-wide.' },
    ],
    tags: ['Java', 'JVM', 'GC Tuning', 'Sumo Logic', 'Enterprise PLM'],
  },
  {
    year: '2024',
    meta: 'Platform-wide',
    title: 'Memory Alert Threshold Optimization',
    impact: 'Reduced false-positive pages · Improved on-call quality',
    desc: 'Memory alerts across the fleet were firing on transient spikes, causing pager fatigue and missed real incidents. Audited alert behavior across multiple customer environments and proposed data-backed threshold adjustments.',
    flow: [
      { label: 'Problem', text: 'High false-positive rate on memory alerts causing on-call burnout.' },
      { label: 'Action', text: 'Trend analysis in Zabbix & Sumo Logic, sustained-window thresholds.' },
      { label: 'Result', text: 'Significant drop in noisy alerts; cleaner signal for genuine incidents.' },
    ],
    tags: ['Zabbix', 'Sumo Logic', 'Observability', 'SRE Practices'],
  },
  {
    year: 'Ongoing',
    meta: 'Team-wide',
    title: 'Runbook Library & Knowledge Base',
    impact: 'Faster onboarding · Reduced repeat escalations',
    desc: 'Authored and improved operational runbooks covering enterprise PLM/IIoT platforms, Kubernetes alerts, and Linux/Tomcat troubleshooting. Documented exact commands, decision trees, and verification steps. Articles are now part of the standard handoff for new joiners.',
    flow: [
      { label: 'Problem', text: 'Tribal knowledge slowing down resolution and new-hire ramp.' },
      { label: 'Action', text: 'Standardized runbook template; published in the Knowledge Base.' },
      { label: 'Result', text: 'Repeatable resolutions, shorter MTTR for known issues.' },
    ],
    tags: ['Knowledge Base', 'Documentation', 'Toil Reduction'],
  },
  {
    year: 'Ongoing',
    meta: 'Microservices · Kubernetes',
    title: 'Microservice Incident Response on Kubernetes (AKS)',
    impact: 'Faster container recovery · Reduced repeat alerts',
    desc: "Front-line response for microservice infrastructure running on Azure Kubernetes Service. Triage and act on container and pod-level alerts using k9s and runbooks — CrashLoopBackOff, OOMKilled, pod restarts, node scale-downs, and unhealthy containers. Pull logs, identify root cause, fix what's in scope, and escalate complex issues.",
    flow: [
      { label: 'Problem', text: 'Container failures (OOMKilled, CrashLoopBackOff) and unhealthy pods disrupting microservices.' },
      { label: 'Action', text: 'Investigate via k9s + logs, follow runbooks, restart/remediate or escalate to the right team.' },
      { label: 'Result', text: 'Faster recovery for known alerts; documented patterns feed back into runbooks.' },
    ],
    tags: ['Azure Kubernetes', 'k9s', 'Pods & Namespaces', 'PostgreSQL', 'Incident Response'],
  },
]

export const keyProjects: ProjectItem[] = [
  {
    year: 'Ongoing',
    meta: 'Observability · Incident Response',
    title: 'Enterprise SaaS Observability & Incident Response',
    impact: '99.9% uptime · 5,000+ incidents resolved · 50+ Fortune 500 environments',
    desc: 'Built and manage end-to-end monitoring for enterprise SaaS platforms across Zabbix, Sumo Logic, Prometheus, Grafana, CloudWatch, Catchpoint and PagerDuty. I own the full alert lifecycle, validate monitoring for customer go-lives, and lead 24x7 incident response — sustaining high availability across a large Fortune 500 footprint.',
    flow: [
      { label: 'Problem', text: 'Monitoring fragmented across six tools and 50+ Fortune 500 environments — a missed or duplicated alert risks an availability commitment.' },
      { label: 'Action', text: 'Own the full alert lifecycle across Zabbix, Sumo Logic, Prometheus, Grafana, CloudWatch, Catchpoint and PagerDuty; validate monitoring at every customer go-live; lead 24x7 incident response.' },
      { label: 'Result', text: '99.9% uptime sustained and 5,000+ incidents resolved across the Fortune 500 footprint.' },
    ],
    tags: ['Observability', 'Zabbix', 'Prometheus', 'Grafana', 'Incident Management', 'AWS & Azure'],
  },
  {
    year: 'Self-Directed',
    meta: 'AIOps · Machine Learning',
    title: 'AIOps Alert Correlation & RCA Engine',
    impact: '76.9% noise reduction · 56.8% RCA accuracy vs. ~12.5% random baseline',
    desc: "Production work is the operational half of AIOps — triage, RCA, the alert lifecycle. This builds the ML half: a sliding-window event correlator that collapses a noisy raw alert stream into real incidents, an IsolationForest anomaly detector over incident volume, and a RandomForestClassifier that suggests root cause from triage-time metadata alone.",
    flow: [
      { label: 'Problem', text: "Traditional monitoring alerts on every threshold breach independently — a single flapping issue can page on-call a dozen times, and nothing suggests where to start looking." },
      { label: 'Action', text: 'Built a seeded synthetic alert generator (13,833 alerts with realistic flapping and cross-tool duplicate signal), a rolling time-window correlator, an unsupervised anomaly detector, and a classifier trained on service/severity/duration/alert-count — deliberately not the message text, which would give the answer away.' },
      { label: 'Result', text: '13,833 raw alerts correlated into 3,197 real incidents (76.9% fewer things to triage), 272 anomalous hours flagged automatically, and 56.8% RCA accuracy on held-out data — more than 4x better than the ~12.5% random-chance baseline across 8 root-cause categories. 8 passing tests across all three stages.' },
    ],
    tags: ['Python', 'scikit-learn', 'pandas', 'IsolationForest', 'RandomForest', 'AIOps'],
    link: 'https://github.com/dineshravichandiran/aiops-alert-correlation',
  },
  {
    year: 'Self-Directed',
    meta: 'Analytics · Tableau',
    title: 'Cloud Incident & Reliability Analytics',
    impact: 'Seeded synthetic dataset + full dashboard brief — Tableau build in progress',
    desc: 'Bridges the operational side of this work with the analytics side of my MBA (Information Systems Management / Analytics & Data Science) — turning an incident log into the SLI/SLO tracking, trend analysis, and forecasting a reliability team would actually present to stakeholders.',
    flow: [
      { label: 'Problem', text: 'Wanted to show the BI/analytics half of reliability work — MTTR trend, root-cause Pareto, error-budget burn — not just the operational half already covered elsewhere.' },
      { label: 'Action', text: 'Built a seeded, reproducible synthetic incident dataset (1,207 rows, realistic severity/root-cause distributions) and a full dashboard brief: 6 sheets, exact calculated-field formulas (uptime %, error-budget burn), and step-by-step Tableau Public build instructions.' },
      { label: 'Result', text: 'Dataset and brief are done and public. The actual Tableau Public dashboard is next — being upfront that it\'s in progress, not finished.' },
    ],
    tags: ['Tableau', 'Data Analytics', 'SLI/SLO', 'Forecasting'],
    link: 'https://github.com/dineshravichandiran/cloud-incident-analytics',
  },
  {
    year: 'Self-Directed',
    meta: 'Kubernetes · Chaos Engineering',
    title: 'Kubernetes Self-Healing & Chaos Lab',
    impact: 'Both CrashLoopBackOff and OOMKilled triggered and auto-remediated, verified live',
    desc: 'Production work is pod- and node-level troubleshooting on AKS — CrashLoopBackOff, OOMKilled, scale-downs, diagnosed and fixed by hand with kubectl and k9s. This closes the loop: a controller that detects both failure modes and remediates them automatically, plus chaos scripts that deliberately trigger them to prove it.',
    flow: [
      { label: 'Problem', text: "The two most common recoverable pod failures I triage daily — CrashLoopBackOff and OOMKilled — still need a human to notice and fix them by hand." },
      { label: 'Action', text: 'Built a deliberately-flaky demo app, a Python controller (Kubernetes API client) that watches for both failure states, and chaos scripts that break the app on purpose and poll for the actual failure condition before declaring success.' },
      { label: 'Result', text: 'Verified live in a kind cluster inside a GitHub Codespace: CrashLoopBackOff triggered, detected, and rolled back to known-good config within seconds; OOMKilled triggered, detected, and cleared so the deployment rescheduled a healthy pod — both logged with full detect-and-remediate timestamps. 3 passing unit tests.' },
    ],
    tags: ['Kubernetes', 'kind', 'Python', 'Chaos Engineering', 'Self-Healing'],
    link: 'https://github.com/dineshravichandiran/k8s-self-healing-lab',
  },
  {
    year: 'Self-Directed',
    meta: 'Automation · Runbooks',
    title: 'Runbook Automation Engine',
    impact: 'All 3 failure scenarios detected and auto-remediated, verified live',
    desc: "I've authored 10+ published runbooks the team relies on — but a runbook is still a wiki page a human has to read and follow by hand during an incident. This makes that shape executable: a YAML file names a check, a remediation, and the engine verifies the fix actually worked before calling it healed.",
    flow: [
      { label: 'Problem', text: "Runbooks I write live as documentation, not code — a human still has to notice the alert, open the page, and run each step themselves, under pressure, at 2 a.m." },
      { label: 'Action', text: 'Built an engine that runs check → remediate → verify from a 3-line YAML runbook, with every stage logged as JSON to an audit trail, plus a dry-run mode. Backed it with three genuine failure scenarios — a real memory-leaking process, a real full scratch directory, a real crashed HTTP service — not simulated flags.' },
      { label: 'Result', text: 'Verified live in a GitHub Codespace: killed a real service, ran the engine, watched it detect the outage, restart the process, and re-verify it healthy — same for a 980MB real memory leak and a real 60MB disk-fill. Caught and fixed a genuine subprocess-pipe-inheritance bug during verification, documented in the commit history rather than hidden. 5 passing unit tests.' },
    ],
    tags: ['Python', 'YAML', 'Automation', 'Runbooks', 'Audit Logging'],
    link: 'https://github.com/dineshravichandiran/runbook-automation-engine',
  },
  {
    year: 'Self-Directed',
    meta: 'Observability · Grafana',
    title: 'Grafana + Prometheus Observability Stack',
    impact: 'Dashboards & alert rules provisioned entirely as code — verified live in a Codespace',
    desc: 'Production work uses Grafana and Prometheus as consumers of an existing stack. This builds the stack itself: a synthetic metrics exporter, Prometheus scrape config, and a Grafana dashboard plus alert rules that provision automatically on startup — nothing clicked together by hand.',
    flow: [
      { label: 'Problem', text: 'Wanted platform-level depth on Grafana/Prometheus specifically — owning the scrape config and dashboards-as-code, not just reading an existing dashboard someone else built.' },
      { label: 'Action', text: 'Built a Python exporter simulating 8 services with realistic request-rate, error-rate, latency, and memory metrics plus randomly injected incidents; wired it through Prometheus into a Grafana instance with a dashboard and three alert rules (error rate, latency, memory) provisioned entirely from files.' },
      { label: 'Result', text: 'Verified live in a clean GitHub Codespace, not just locally: all three containers healthy, the exporter emitting real metrics, Prometheus scrape target up, the dashboard and all three alert rules auto-provisioned on first boot.' },
    ],
    tags: ['Grafana', 'Prometheus', 'Docker', 'Python', 'Dashboards-as-Code', 'Alerting-as-Code'],
    link: 'https://github.com/dineshravichandiran/grafana-observability-stack',
  },
  {
    year: 'Self-Directed',
    meta: 'Platform Engineering · Zabbix',
    title: 'Zabbix Monitoring Lab — Platform Deep-Dive',
    impact: 'Self-built labs · Platform-level Zabbix skills beyond day-to-day alert tuning',
    desc: "Production work covers alert tuning and triage — this self-hosted Zabbix lab (Docker) was built to go deeper into the platform-engineering side I don't touch daily: discovery rules, preprocessing, escalation logic, RBAC, and the API. Terraform-based provisioning is the next iteration I'm building toward, extending the same repeatable, version-controlled approach to monitoring-as-code.",
    flow: [
      { label: 'Problem', text: 'Needed real reps on LLD tuning and escalation design before being asked to design a Zabbix estate from scratch — production work is alert triage, not building the platform.' },
      { label: 'Action', text: "Linked a host to a template instead of hand-building items; tuned LLD filters on filesystem discovery and verified the before/after item count; built a threshold trigger; built a staged severity-escalation action." },
      { label: 'Result', text: 'Cut discovered filesystem items by more than half via LLD filters, verified with an actual before/after count. Caught and fixed a real escalation-timing bug (a step\'s "Default" duration silently inherited the action\'s 1h default instead of its own interval) by checking the computed "Start in" time, not by assuming the config was right because it saved.' },
    ],
    shots: [
      { src: '/screenshots/zabbix-latest-data.png', alt: 'Zabbix Latest Data showing lab-host-02 with 73 live items across memory, CPU, and security tags', caption: 'Latest data — live collection' },
      { src: '/screenshots/zabbix-trigger-dependency.png', alt: 'Zabbix trigger list showing the CPU threshold trigger enabled and live', caption: 'Threshold trigger, live' },
      { src: '/screenshots/zabbix-lld-filter.png', alt: 'Zabbix Mounted filesystem discovery rule with FSNAME and FSTYPE LLD filters configured', caption: 'LLD discovery filter' },
      { src: '/screenshots/zabbix-escalation-action.png', alt: 'Zabbix trigger action showing staged severity-based escalation operations and the 1h default step duration that caused a timing bug', caption: 'Escalation action + bug caught' },
    ],
    tags: ['Zabbix', 'Docker', 'LLD Discovery', 'Trigger Escalation'],
    note: 'In progress in this lab: JSONPath preprocessing, trigger dependencies, secret macros, RBAC, full API rollback discipline, proxy architecture — see the repo README for exact status.',
    link: 'https://github.com/dineshravichandiran/zabbix-monitoring-lab',
  },
  {
    year: 'Self-Directed',
    meta: 'Infrastructure-as-Code · AWS',
    title: 'Self-Healing Infrastructure on AWS',
    impact: 'Terraform-provisioned auto-recovery — no human in the loop',
    desc: 'Auto Scaling Groups only catch one failure mode — a failed ELB health check. Hardware faults, a process that crashes without the OS noticing, and an instance stopped by mistake all slip through unless something else is watching.',
    flow: [
      { label: 'Problem', text: "Native ASG health checks don't cover hypervisor/hardware failures, silent process crashes, or an instance stopped outside the normal lifecycle — each needed its own detection and recovery path." },
      { label: 'Action', text: 'Provisioned a VPC/ALB/Auto Scaling Group stack in Terraform, layered CloudWatch alarms for system-level and target-health failures, and wrote Lambda handlers that force ASG replacement or restart a stopped instance — every remediation publishes its own CloudWatch metric so recovery is provable, not assumed.' },
      { label: 'Result', text: 'terraform validate passes clean, both Lambda handlers reviewed line-by-line for correct AWS API usage, and a chaos-test script validates the full detect-to-recover loop end-to-end.' },
    ],
    tags: ['Terraform', 'AWS Lambda', 'Auto Scaling', 'CloudWatch', 'EventBridge', 'IAM'],
    link: 'https://github.com/dineshravichandiran/cloud-devops-projects/tree/main/self-healing-aws-infra',
  },
  {
    year: 'Self-Directed',
    meta: 'CI/CD · Security',
    title: 'End-to-End DevSecOps CI Pipeline',
    impact: 'All 8 stages passing, verified live',
    badge: 'https://github.com/dineshravichandiran/cloud-devops-projects/actions/workflows/devsecops-pipeline.yml/badge.svg',
    desc: "A pipeline meant to gate deployments behind security checks is worthless if it's broken — and this one was, failing on every single push, including pushes that had nothing to do with the pipeline itself.",
    flow: [
      { label: 'Problem', text: "Built a GitHub Actions pipeline chaining secret scanning, SAST, SCA, container scanning, and DAST ahead of a staged deploy — then found it had never actually passed." },
      { label: 'Action', text: "Found and fixed three separate real failures blocking it end-to-end: a CodeQL step configured for a language the repo doesn't contain, a missing GitHub token permission, and a third-party action's broken artifact upload — each diagnosed from actual run logs, not guessed at." },
      { label: 'Result', text: 'All 8 jobs pass clean today — secret scan, SAST, SCA, build, container scan, DAST, staging deploy, policy gate — re-verified live after each fix, not assumed.' },
    ],
    shots: [
      { src: '/screenshots/devsecops-pipeline-bug-and-fix.png', alt: 'GitHub Actions run output showing the DevSecOps pipeline failing on CodeQL, the root cause identified, fixed, and reverified passing', caption: 'Bug found, fixed, and reverified live' },
    ],
    tags: ['GitHub Actions', 'Gitleaks', 'Semgrep', 'Trivy', 'OWASP ZAP', 'Docker'],
    link: 'https://github.com/dineshravichandiran/cloud-devops-projects/tree/main/devsecops-ci-pipeline',
  },
  {
    year: 'Self-Directed',
    meta: 'Configuration Management · Ansible',
    title: 'Ansible: Zabbix Onboarding + Host Baseline',
    impact: 'Idempotent host onboarding — verified with changed=0 on a clean re-run',
    desc: "Manually onboarding a host into monitoring is a checklist: install the agent, point it at the right server, open exactly one firewall port, don't forget time sync, don't forget log rotation. Easy to skip under pressure, easy to get subtly wrong by hand across a fleet.",
    flow: [
      { label: 'Problem', text: "Needed that onboarding checklist to be a repeatable, idempotent playbook instead of a manual per-host process — and needed to actually prove it was idempotent, not just assume it." },
      { label: 'Action', text: "Built an Ansible playbook: chrony, a default-deny UFW firewall scoped to SSH + the Zabbix port, unattended security upgrades, log rotation policy, then the full Zabbix agent repo/install/config/service lifecycle. Tested against real systemd containers via Ansible's Docker connection plugin — found and fixed two real bugs a syntax check would have missed: a log path that pointed at a directory the package never creates (the service was crash-looping), and a live timestamp in the config template that silently broke idempotency." },
      { label: 'Result', text: 'A clean re-run reports changed=0 on both test hosts, and the agent was verified with real zabbix_get queries returning live data — not just "service is running."' },
    ],
    shots: [
      { src: '/screenshots/ansible-bugs-and-idempotency.png', alt: 'Terminal output showing two real bugs found via testing, both fixed, and idempotency verified with changed=0 on a clean re-run', caption: 'Bugs found, fixed, idempotency proven' },
      { src: '/screenshots/ansible-live-verification.png', alt: 'zabbix_get returning real hostname, live CPU load, and agent version, plus chrony, logrotate, and unattended-upgrades verified', caption: 'Live agent verification, not assumed' },
    ],
    tags: ['Ansible', 'Zabbix', 'Idempotency', 'Docker', 'systemd', 'UFW'],
    link: 'https://github.com/dineshravichandiran/ansible-zabbix-baseline',
  },
  {
    year: 'Self-Directed',
    meta: 'Event-Driven Automation · Salt',
    title: 'Salt Self-Healing Memory Guard',
    impact: 'Real detect → restart → log loop — 3 consecutive cycles verified live, no human involved',
    desc: "Built after years of watching memory/OOM alerts get resolved the same way in production: a service leaks, someone eventually restarts it. This closes that loop with Salt's event-driven model instead of a human on call — a beacon watches a specific process's memory, a reactor restarts it the moment it crosses a threshold, before the kernel OOM-killer does it the hard way.",
    flow: [
      { label: 'Problem', text: "Salt's built-in memusage beacon only watches total system memory, not a specific leaking service — the more common real-world failure. Needed a beacon that watches one named process, and a reactor that actually remediates, not just alerts." },
      { label: 'Action', text: "Wrote a custom Salt beacon module (psutil-based per-process RSS check) and a reactor that restarts the service and logs the remediation with PID and memory at the moment of action. Stood up a real salt-master + salt-minion pair in a GitHub Codespace and tested it live — found and fixed two real bugs along the way: a dead bootstrap URL (decommissioned in Jan 2025) and a reactor event-tag glob that silently never matched the beacon's actual event tag, so the beacon was firing correctly while the reactor sat there doing nothing." },
      { label: 'Result', text: 'Three consecutive detect → restart → log cycles observed back to back on a genuinely leaking demo process — each restart resets memory to baseline and appends an auditable log line, same "provable, not assumed" standard as the AWS self-healing infra project.' },
    ],
    shots: [
      { src: '/screenshots/salt-beacon-firing.png', alt: 'salt-run state.event showing the custom proc_memory beacon firing real high_memory events with live RSS readings from psutil', caption: 'Beacon firing real events, not simulated' },
      { src: '/screenshots/salt-reactor-remediation.png', alt: 'self-healing-memory.log showing three REMEDIATED entries and systemctl status confirming the service is on its third restart with memory back at baseline', caption: 'Three remediation cycles, back to back' },
    ],
    tags: ['Salt', 'Beacons & Reactors', 'Event-Driven', 'Python', 'systemd', 'Docker'],
    link: 'https://github.com/dineshravichandiran/salt-self-healing-memory',
  },
  {
    year: '2.5+ yrs',
    meta: 'Root Cause · Performance',
    title: 'Recurring Memory & Performance Root-Cause Initiative',
    impact: 'Improved platform performance · Optimized cloud cost',
    desc: 'Drove recurring memory/OutOfMemory and performance alerts to root cause over 2.5+ years, partnering with the Technical Architect team to improve platform performance and optimize cloud cost across AWS and Azure. Turned repeat incidents into permanent fixes.',
    flow: [
      { label: 'Problem', text: 'Memory and performance alerts kept recurring — each one patched individually instead of resolved for good.' },
      { label: 'Action', text: 'Partnered with the Technical Architect team over 2.5+ years to drive each recurring alert to root cause across AWS and Azure.' },
      { label: 'Result', text: 'Repeat incidents turned into permanent fixes — improved platform performance and optimized cloud cost.' },
    ],
    tags: ['Root Cause Analysis', 'Linux', 'AKS', 'Performance Tuning', 'AWS & Azure'],
  },
  {
    year: 'Ongoing',
    meta: 'ITIL · Knowledge',
    title: 'Runbook & Incident-Handling Standardization',
    impact: '10+ team-adopted runbooks · Faster, consistent resolution',
    desc: 'Authored 10+ team-adopted runbooks under ITIL change management and standardized incident-handling procedures across a 12-member team. Mentor new and junior engineers — turning individual knowledge into team capability.',
    flow: [
      { label: 'Problem', text: 'Tribal knowledge and inconsistent incident handling slowed resolution and onboarding across a 12-member team.' },
      { label: 'Action', text: 'Authored 10+ runbooks under ITIL change management, standardized incident-handling procedures, and mentor new and junior engineers.' },
      { label: 'Result', text: 'A shared playbook the whole team runs on — faster, more consistent resolution and a shorter ramp for new hires.' },
    ],
    tags: ['ITIL', 'Change Management', 'ServiceNow', 'Documentation', 'Mentoring'],
  },
  {
    year: 'Finished',
    meta: 'Web · Solo Build',
    title: 'Personal Cloud/SRE Portfolio & 3D Career Journey',
    impact: 'Designed, built & deployed end-to-end',
    desc: 'Designed and deployed this portfolio and an interactive 3D career-journey site (React, TypeScript, Three.js) via Netlify — showcasing my cloud, DevOps and SRE focus. Proof I can build and ship, not just operate.',
    flow: [
      { label: 'Problem', text: "Most of my daily work runs on infrastructure I operate but didn't build — needed proof I can design and ship something from scratch too." },
      { label: 'Action', text: 'Designed and built this portfolio and a separate interactive 3D career-journey experience from scratch (React, TypeScript, Three.js), then shipped both via Netlify.' },
      { label: 'Result', text: 'A live, self-authored site I keep iterating on — same incremental, version-controlled approach I bring to infrastructure work.' },
    ],
    tags: ['React', 'TypeScript', 'Vite', 'Three.js', 'Git', 'Netlify'],
  },
  {
    year: '2020',
    meta: 'Hackathon · National Winner',
    title: 'Smart India Hackathon 2020 — National Grand Finale Winner',
    impact: 'Winner among 10,000+ teams · Built for Bureau of Police Research & Development (Govt. of India)',
    desc: 'National Grand Finale Winner of Smart India Hackathon 2020 — India\'s largest hackathon. For the Bureau of Police Research & Development (BPRD), my team of 6 built "Antigen": a web application that detects malicious and rogue chatbots and flags harmful messages across web and social platforms. Coordinated with BPRD on requirements, built the working prototype, and demonstrated it live at the national finale.',
    flow: [
      { label: 'Problem', text: 'BPRD needed a way to detect malicious and rogue chatbots spreading harmful messages across web and social platforms.' },
      { label: 'Action', text: 'Coordinated with BPRD on requirements, then built "Antigen" with a team of 6 and demonstrated the working prototype live at the national finale.' },
      { label: 'Result', text: 'National Grand Finale Winner among 10,000+ competing teams.' },
    ],
    tags: ['JavaScript', 'PHP', 'Web App', 'Chatbot', 'Team of 6'],
  },
]
