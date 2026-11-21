export interface FlowStep {
  label: 'Problem' | 'Action' | 'Result'
  text: string
}

export interface ProjectShot {
  src: string
  alt: string
  caption: string
}

export interface DesignDecision {
  choice: string
  instead: string
  tradeoff: string
}

export interface ProjectDesign {
  diagram: { src: string; alt: string }
  decisions: DesignDecision[]
  atScale: string
  scope: string
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
  design?: ProjectDesign
}

export const workProjects: ProjectItem[] = [
  {
    year: '2026',
    meta: 'Published Runbook · Enterprise PLM',
    title: 'Runbook: Memory Optimization for Clustered PLM Nodes',
    impact: 'Adopted as the standard referenced by the org-wide NOC memory-alert runbook · Presented business impact to management',
    desc: 'Authored a runbook, built cross-functionally with the Technical Architect team, covering pre-checks, JVM/Solr health gates, a 3-method decision tree, and a mandatory backup/restart/validation sequence for memory-arena tuning on clustered 32GB & 64GB nodes.',
    flow: [
      { label: 'Problem', text: 'Memory-tuning fixes for clustered PLM nodes were inconsistent and tribal across the team.' },
      { label: 'Action', text: "Built a decision-tree runbook with health gates and a mandatory validation sequence; published as the team's standard reference." },
      { label: 'Result', text: 'Adopted as the standard referenced by the org-wide NOC memory-alert runbook; presented the impact directly to management.' },
    ],
    tags: ['Enterprise PLM', 'Memory Tuning', 'JVM / Solr', 'Runbook Authoring', 'Technical Architects'],
  },
  {
    year: 'Ongoing',
    meta: 'Internal Tooling · Python',
    title: 'NOC Note Builder: Incident Note Generator',
    impact: 'Faster, more consistent incident notes across the team',
    desc: "Built a zero-dependency tkinter GUI (noc_notes.py) that generates formatted ServiceNow/PagerDuty incident notes by severity (Sev0–Sev4) from a library of reusable templates. Standard library only, no internet or API key required.",
    flow: [
      { label: 'Problem', text: 'Incident notes varied engineer to engineer, slowing handoffs and reviews.' },
      { label: 'Action', text: 'Built a severity-based note generator with an "Insert" library of reusable resolution notes, all in the Python standard library.' },
      { label: 'Result', text: 'Faster, more consistent incident documentation the team pastes straight into ServiceNow or PagerDuty.' },
    ],
    tags: ['Python', 'tkinter', 'ServiceNow', 'PagerDuty', 'Internal Tooling'],
  },
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
    desc: "Front-line response for microservice infrastructure running on Azure Kubernetes Service. Triage and act on container and pod-level alerts using k9s and runbooks: CrashLoopBackOff, OOMKilled, pod restarts, node scale-downs, and unhealthy containers. Pull logs, identify root cause, fix what's in scope, and escalate complex issues.",
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
    year: 'Self-Directed',
    meta: 'Infrastructure-as-Code · AWS',
    title: 'Self-Healing Infrastructure on AWS',
    impact: 'Applied to AWS and drilled with 3 real failures · replacement healthy in about 3 min, then destroyed',
    desc: 'Auto Scaling Groups only catch one failure mode: a failed ELB health check. An instance stopped by mistake, or a target the ASG does not replace, slips through unless something else is watching.',
    flow: [
      { label: 'Problem', text: "Native ASG health checks only cover a failed ELB health check. An unhealthy target that needs forced replacement, or an instance stopped outside the normal lifecycle, each needs its own detection and recovery path." },
      { label: 'Action', text: 'Provisioned a VPC/ALB/Auto Scaling Group stack in Terraform, added a CloudWatch alarm on unhealthy targets and an EventBridge rule for stopped instances, and wrote Lambda handlers that force ASG replacement or restart a tagged stopped instance. Every remediation publishes its own CloudWatch metric so recovery is provable, not assumed.' },
      { label: 'Result', text: 'Applied to a real AWS account and drilled three times, then destroyed (30 resources, checked for leftovers). Apache stopped with the ASG health check on: the ASG replaced the instance in about 2 minutes, healthy in about 3. A stopped tagged instance was running again about 1 minute after the Lambda restart. With the ASG health check suspended, the alarm fired after about 5.5 minutes, the Lambda forced replacement, and the new instance was healthy about 6 min 47 s after the failure. Each drill was run once. Running it also exposed four defects that validation missed.' },
    ],
    design: {
      diagram: { src: '/diagrams/self-healing-aws.svg', alt: 'Architecture diagram: users reach an Application Load Balancer in front of an Auto Scaling Group across two public subnets; a CloudWatch alarm and an EventBridge rule trigger one of two Lambda functions, and every remediation publishes a CloudWatch metric' },
      decisions: [
        { choice: 'Native AWS mechanisms first, Lambda only for the gaps', instead: 'One custom Lambda for every failure type', tradeoff: 'More pieces to follow (alarms, SNS, EventBridge), but custom code covers only what AWS does not already handle.' },
        { choice: 'Least-privilege Lambda role', instead: 'Broad EC2 permissions', tradeoff: 'Each new remediation needs an explicit IAM change, but a bug cannot terminate instances or change security groups.' },
        { choice: 'Restart only instances tagged SelfHealing=true', instead: 'Restart any stopped instance', tradeoff: 'Untagged instances are not healed, but a deliberate maintenance stop is not silently undone.' },
      ],
      atScale: 'Instances sit in public subnets with public IPs, which avoids NAT cost in a lab but exposes them directly. For production I would use private subnets behind the ALB, add a cooldown so a flapping instance cannot be restarted in a loop, and tune alarm thresholds per environment.',
      scope: 'Applied once in ap-south-1, three drills run once each, then destroyed. Cost was not measured and load-triggered scale-out was not tested.',
    },
    tags: ['Terraform', 'AWS Lambda', 'Auto Scaling', 'CloudWatch', 'EventBridge', 'IAM'],
    link: 'https://github.com/dineshravichandiran/cloud-devops-projects/tree/main/self-healing-aws-infra',
  },
  {
    year: 'Self-Directed',
    meta: 'AWS · Terraform · SRE',
    title: 'AWS Platform with Terraform, GitHub Actions and SLOs',
    impact: 'Applied to AWS through the pipeline (56 resources) and destroyed the same night · 5 failure drills run · 26 mocked tests, 259 security checks · no stored AWS keys',
    desc: 'A small AWS platform written as reusable Terraform modules: a VPC across two zones, a load balancer, an ECS Fargate service in private subnets, a private PostgreSQL database, S3 remote state with locking, and 99.9% availability alerts based on fast and slow error-budget burn rates. GitHub Actions signs in to AWS with short-lived OIDC credentials, plans on every pull request and applies only after a reviewer approves.',
    flow: [
      { label: 'Problem', text: 'My earlier Terraform was validate-only. I wanted the whole path in code and reviewable: modules, remote state, a pipeline with no stored keys, and reliability targets for the service.' },
      { label: 'Action', text: 'Wrote four modules plus an SLO module, a one-time bootstrap stack (state bucket, two GitHub sign-in roles, budget alert), and a pipeline with format, validate, tflint, checkov and mocked-provider tests. The whole-environment test caught a for_each bug that would have failed a real plan.' },
      { label: 'Result', text: 'Applied to a real AWS account (ap-south-1) on 20 Nov 2026 through the pipeline: 56 resources, plan posted on the pull request, approved apply, 2 healthy targets behind the load balancer. Five drills: a killed task was replaced in about 59 seconds; a hand-made tag showed up as drift in the plan; a second plan failed on the state lock; 20,000 requests ran with 0 failures; a bad image tag was rolled back by the ECS circuit breaker after about 15 minutes (it needs 10 failed tasks to trip). Autoscaling did not scale out because CPU peaked at 3.5%. Destroyed the same night and checked that nothing was left. CI also passes: 26 mocked tests and 259 security checks (20 skipped, each with a written reason).' },
    ],
    design: {
      diagram: { src: '/diagrams/aws-sre-platform.svg', alt: 'Architecture diagram: users reach an application load balancer in public subnets across two zones, which forwards to ECS Fargate tasks in private subnets, which connect to a private PostgreSQL database. GitHub Actions deploys through OIDC roles and keeps state in an S3 bucket.' },
      decisions: [
        { choice: 'ECS Fargate for the service', instead: 'EKS', tradeoff: 'No nodes to patch and much less to run for one stateless service, but less portable than Kubernetes.' },
        { choice: 'GitHub OIDC with a read-only plan role and a protected apply role', instead: 'Stored AWS access keys', tradeoff: 'Nothing to rotate or leak, at the cost of more IAM to write. The apply role is broader than ideal and is the first thing to tighten.' },
        { choice: 'Burn-rate alerts over two windows', instead: 'A fixed error-rate threshold', tradeoff: 'Pages when the monthly error budget is being used fast and clears quickly, but CloudWatch evaluates on fixed periods, not a sliding window.' },
      ],
      atScale: 'One environment, one service and a demo nginx image. A real platform adds more environments, a build pipeline for the application, a web application firewall and customer-managed encryption keys.',
      scope: 'Deployed once to a personal AWS account and destroyed within two hours. The SLO alerts were created but never fired in a test, autoscaling was not triggered by my load test, and the real cost is not measured yet.',
    },
    tags: ['Terraform', 'AWS', 'ECS Fargate', 'GitHub Actions', 'OIDC', 'SLO', 'checkov'],
    link: 'https://github.com/dineshravichandiran/aws-sre-platform-terraform',
  },
  {
    year: 'Self-Directed',
    meta: 'Kubernetes · Chaos Engineering',
    title: 'Kubernetes Self-Healing & Chaos Lab',
    impact: 'Both CrashLoopBackOff and OOMKilled triggered and auto-remediated, verified live',
    desc: 'Production work is pod- and node-level troubleshooting on AKS: CrashLoopBackOff, OOMKilled, scale-downs, diagnosed and fixed by hand with kubectl and k9s. This closes the loop: a controller that detects both failure modes and remediates them automatically, plus chaos scripts that deliberately trigger them to prove it.',
    flow: [
      { label: 'Problem', text: "The two most common recoverable pod failures I triage daily, CrashLoopBackOff and OOMKilled, still need a human to notice and fix them by hand." },
      { label: 'Action', text: 'Built a deliberately-flaky demo app, a Python controller (Kubernetes API client) that watches for both failure states, and chaos scripts that break the app on purpose and poll for the actual failure condition before declaring success.' },
      { label: 'Result', text: 'Verified live in a kind cluster inside a GitHub Codespace: CrashLoopBackOff triggered, detected, and reverted to known-good config (the bad setting cleared) within seconds; OOMKilled triggered, detected, and cleared so the deployment rescheduled a healthy pod. Both logged with full detect-and-remediate timestamps. 3 passing unit tests.' },
    ],
    design: {
      diagram: { src: '/diagrams/k8s-self-healing.svg', alt: 'Architecture diagram: chaos scripts break the demo Deployment, the kubelet reports CrashLoopBackOff or OOMKilled, a Python controller watches pods through the Kubernetes API, applies a 30-second cooldown, patches the Deployment, and logs every step' },
      decisions: [
        { choice: 'Event-driven controller on the pod watch stream', instead: 'A cron job polling kubectl', tradeoff: 'Reacts within seconds, but it is a long-running process that has to be kept alive itself.' },
        { choice: 'Namespace-scoped Role: read pods, patch deployments only', instead: 'A cluster-wide admin binding', tradeoff: 'A bug can only touch this namespace. Healing another namespace needs its own Role.' },
        { choice: '30-second per-pod cooldown', instead: 'Remediate on every event', tradeoff: 'Slower to retry a fix that did not work, but the controller cannot fight itself in a patch loop.' },
      ],
      atScale: "The remediation here is lab-specific: it clears an environment variable the chaos script injected. In a real cluster an OOMKilled pod usually needs a higher limit or a code fix, so I would heal only the safe cases automatically and raise an alert with the evidence for the rest. The patch also targets container index 0, which is brittle with sidecars.",
      scope: 'A synthetic app in a kind cluster, not AKS or any real environment.',
    },
    tags: ['Kubernetes', 'kind', 'Python', 'Chaos Engineering', 'Self-Healing'],
    link: 'https://github.com/dineshravichandiran/k8s-self-healing-lab',
  },
  {
    year: 'Self-Directed',
    meta: 'CI/CD · Security',
    title: 'End-to-End DevSecOps CI Pipeline',
    impact: 'All 8 jobs passing, verified live · 6 real scan and build stages, plus a placeholder staging deploy and policy gate',
    badge: 'https://github.com/dineshravichandiran/devsecops-ci-pipeline/actions/workflows/devsecops-pipeline.yml/badge.svg',
    desc: "A pipeline meant to gate deployments behind security checks is worthless if it's broken, and this one was, failing on every single push, including pushes that had nothing to do with the pipeline itself.",
    flow: [
      { label: 'Problem', text: "Built a GitHub Actions pipeline chaining secret scanning, SAST, SCA, container scanning, and DAST ahead of a staging-deploy and policy-gate stage, then found it had never actually passed." },
      { label: 'Action', text: "Found and fixed three separate real failures blocking it end-to-end: a CodeQL step with no source code to analyze (the app is a synthetic placeholder), a missing GitHub token permission, and a third-party action's broken artifact upload, each diagnosed from actual run logs, not guessed at." },
      { label: 'Result', text: 'All 8 jobs pass clean today, re-verified live after each fix, not assumed. Six are real (secret scan, SAST, SCA, build, container scan, DAST). The staging deploy and policy gate are placeholder steps that only print a message, so the next step is wiring them to a real deployment and a real severity check. Trivy, ZAP and dependency-check also only report findings for now rather than failing the build.' },
    ],
    shots: [
      { src: '/screenshots/devsecops-pipeline-bug-and-fix.png', alt: 'GitHub Actions run output showing the DevSecOps pipeline failing on CodeQL, the root cause identified, fixed, and reverified passing', caption: 'Bug found, fixed, and reverified live' },
    ],
    tags: ['GitHub Actions', 'Gitleaks', 'Semgrep', 'Trivy', 'OWASP ZAP', 'Docker'],
    link: 'https://github.com/dineshravichandiran/devsecops-ci-pipeline',
  },
  {
    year: 'Self-Directed',
    meta: 'Observability · Grafana',
    title: 'Grafana + Prometheus Observability Stack',
    impact: 'Dashboards & alert rules provisioned entirely as code · verified live in a Codespace',
    desc: 'Production work uses Grafana and Prometheus as consumers of an existing stack. This builds the stack itself: a synthetic metrics exporter, Prometheus scrape config, and a Grafana dashboard plus alert rules that provision automatically on startup. Nothing clicked together by hand.',
    flow: [
      { label: 'Problem', text: 'Wanted platform-level depth on Grafana/Prometheus specifically: owning the scrape config and dashboards-as-code, not just reading an existing dashboard someone else built.' },
      { label: 'Action', text: 'Built a Python exporter simulating 8 services with realistic request-rate, error-rate, latency, and memory metrics plus randomly injected incidents; wired it through Prometheus into a Grafana instance with a dashboard and three alert rules (error rate, latency, memory) provisioned entirely from files.' },
      { label: 'Result', text: 'Verified live in a clean GitHub Codespace, not just locally: all three containers healthy, the exporter emitting real metrics, Prometheus scrape target up, the dashboard and all three alert rules auto-provisioned on first boot.' },
    ],
    tags: ['Grafana', 'Prometheus', 'Docker', 'Python', 'Dashboards-as-Code', 'Alerting-as-Code'],
    link: 'https://github.com/dineshravichandiran/grafana-observability-stack',
  },
  {
    year: 'Self-Directed',
    meta: 'Platform Engineering · Zabbix',
    title: 'Zabbix Monitoring Lab: Platform Deep-Dive',
    impact: 'Self-built labs · Platform-level Zabbix skills beyond day-to-day alert tuning',
    desc: "Production work covers alert tuning and triage. This self-hosted Zabbix lab (Docker) was built to go deeper into the platform-engineering side I don't touch daily: discovery rules, preprocessing, escalation logic, RBAC, and the API. Terraform-based provisioning is the next iteration I'm building toward, extending the same repeatable, version-controlled approach to monitoring-as-code.",
    flow: [
      { label: 'Problem', text: 'Needed real reps on LLD tuning and escalation design before being asked to design a Zabbix estate from scratch. Production work is alert triage, not building the platform.' },
      { label: 'Action', text: "Linked a host to a template instead of hand-building items; tuned LLD filters on filesystem discovery and verified the before/after item count; built a threshold trigger; built a staged severity-escalation action." },
      { label: 'Result', text: 'Cut discovered filesystem items by more than half via LLD filters, verified with an actual before/after count. Caught and fixed a real escalation-timing bug (a step\'s "Default" duration silently inherited the action\'s 1h default instead of its own interval) by checking the computed "Start in" time, not by assuming the config was right because it saved.' },
    ],
    shots: [
      { src: '/screenshots/zabbix-latest-data.png', alt: 'Zabbix Latest Data showing lab-host-02 with 73 live items across memory, CPU, and security tags', caption: 'Latest data · live collection' },
      { src: '/screenshots/zabbix-trigger-dependency.png', alt: 'Zabbix trigger list showing the CPU threshold trigger enabled and live', caption: 'Threshold trigger, live' },
      { src: '/screenshots/zabbix-lld-filter.png', alt: 'Zabbix Mounted filesystem discovery rule with FSNAME and FSTYPE LLD filters configured', caption: 'LLD discovery filter' },
      { src: '/screenshots/zabbix-escalation-action.png', alt: 'Zabbix trigger action showing staged severity-based escalation operations and the 1h default step duration that caused a timing bug', caption: 'Escalation action + bug caught' },
    ],
    tags: ['Zabbix', 'Docker', 'LLD Discovery', 'Trigger Escalation'],
    note: 'In progress in this lab: JSONPath preprocessing, trigger dependencies, secret macros, RBAC, full API rollback discipline, proxy architecture. See the repo README for exact status.',
    link: 'https://github.com/dineshravichandiran/zabbix-monitoring-lab',
  },
  {
    year: 'Ongoing',
    meta: 'Observability · Incident Response',
    title: 'Enterprise SaaS Observability & Incident Response',
    impact: '99.9% uptime · 50+ Fortune 500 environments',
    desc: 'Built and manage end-to-end monitoring for enterprise SaaS platforms across Zabbix, Sumo Logic, Prometheus, Grafana, CloudWatch, Catchpoint and PagerDuty. I own the full alert lifecycle, validate monitoring for customer go-lives, and lead 24x7 incident response, sustaining high availability across a large Fortune 500 footprint.',
    flow: [
      { label: 'Problem', text: 'Monitoring fragmented across six tools and 50+ Fortune 500 environments, where a missed or duplicated alert risks an availability commitment.' },
      { label: 'Action', text: 'Own the full alert lifecycle across Zabbix, Sumo Logic, Prometheus, Grafana, CloudWatch, Catchpoint and PagerDuty; validate monitoring at every customer go-live; lead 24x7 incident response.' },
      { label: 'Result', text: 'High availability sustained across the full customer footprint, with monitoring accuracy strong enough to hold up under ISO audit and compliance review.' },
    ],
    tags: ['Observability', 'Zabbix', 'Prometheus', 'Grafana', 'Incident Management', 'AWS & Azure'],
  },
  {
    year: 'Self-Directed',
    meta: 'Python · MCP · Agentic AI',
    title: 'AI Incident Triage Agent',
    impact: '56 tests · 20 frozen test incidents · filtered context used 91% fewer input tokens at the same accuracy (40/40) · a person approves any fix',
    desc: 'An agent that takes an alert, filters the logs, names the likely cause, finds the matching runbook step, drafts the incident note, and waits for a person to approve before any fix runs. Built on a synthetic lab with known root causes, so every claim is scored against the truth instead of judged by eye.',
    flow: [
      { label: 'Problem', text: "An agent that restarts things on a model's say-so is a risk, and a demo on two hand-picked incidents proves nothing. I wanted to measure whether giving a model less, cleaner context changes anything, and keep the dangerous step out of the model's hands." },
      { label: 'Action', text: 'Built a lab with 10 failure causes and 30 incidents, a context filter (alerting service, last 10 minutes, WARN and up, repeats collapsed), runbook retrieval over 10 YAML runbooks, a four-tool MCP server, and an executor where a fix needs a single-use approval that a human issued. The model makes one decision, naming the cause; ordinary code does the rest.' },
      { label: 'Result', text: 'On 20 frozen incidents, each run twice per mode, the larger model got 40/40 causes and runbooks right with raw logs and with the filtered context, so there the filter saved cost, not accuracy: 91% fewer input tokens and about 21% faster. A smaller model scored 37/40 on raw logs and 39/40 filtered (directional only, not proven). A keyword baseline scored 9/20 and 11/20. In every wrong-cause run, no wrong fix would have run. My first lab was too easy (the baseline scored 20/20), so I made it harder before running any model.' },
    ],
    design: {
      diagram: { src: '/diagrams/ai-incident-triage.svg', alt: 'Flow diagram: an alert goes through a context filter to a model that names the likely cause, runbook retrieval runs alongside, the two must agree or the agent escalates, then a dry run of the runbook check, a human approval, and a fix followed by a verification check, with every step written to an audit log' },
      decisions: [
        { choice: 'Filter the logs before the model sees them', instead: 'Send the model the whole hour of logs', tradeoff: 'About 91% fewer input tokens and faster answers, and it drops an old incident that confuses a smaller model. The filter is only as good as its rules: it discards everything below WARN, including deploy notices.' },
        { choice: 'Propose a fix only when the model\'s cause and the retrieved runbook agree', instead: 'Trust the model\'s answer directly', tradeoff: 'A confident wrong answer gets stopped, at the price of sometimes escalating when the model was right, because retrieval is the weaker link.' },
        { choice: 'Enforce approval in the server with a single-use id', instead: 'Ask the model, or rely on a client prompt, to confirm', tradeoff: 'Neither a model nor a client can skip it. It puts a human step in front of every fix.' },
      ],
      atScale: 'Real incidents have several services failing together, logs in many formats, and cause chains where two answers are both partly right. The lab has one service\'s logs per incident and one cause per runbook, and its runbook checks read a simulated state. At scale I would need real log parsing, richer runbook matching, and checks that probe the real system, and far more than 20 labelled incidents before trusting a gap of two runs.',
      scope: 'A synthetic lab I wrote myself, not production logs. Fixes change a simulated state, never a real machine.',
    },
    tags: ['Python', 'MCP', 'Agentic AI', 'LLM Evaluation', 'Runbooks', 'Human-in-the-loop', 'pytest'],
    link: 'https://github.com/dineshravichandiran/ai-incident-triage-agent',
  },
  {
    year: 'Self-Directed',
    meta: 'Python · MCP · AWS · Kubernetes',
    title: 'Ops MCP Server: Read-Only AWS and Kubernetes Tools with Approved Writes',
    impact: '33 tests in CI · 7 read tools and 2 write tools · a write runs only with a person-approved, single-use approval bound to exact parameters',
    desc: 'An MCP server that lets an AI agent inspect AWS (Auto Scaling, target health, alarms, instance status, CloudWatch Logs) and Kubernetes (pods, deployments, events, logs) while on call, and change something only when a person approves that exact change.',
    flow: [
      { label: 'Problem', text: 'An agent with cloud access is useful for diagnosis and dangerous for changes. The approval has to live in the server, not in a prompt, so a model cannot talk its way past it.' },
      { label: 'Action', text: 'Wrote read tools over boto3 and kubectl with fixed verbs, checked names and bounded sizes, and masked common secrets in logs. Writes (restart a deployment, set Auto Scaling desired capacity inside its existing min and max) are dry-run by default and need an approval a person grants in a terminal. No MCP tool can approve, and an approval expires, works once and matches only the parameters it was issued for.' },
      { label: 'Result', text: 'AWS calls are tested against botocore stubs that check arguments against the real API model, and the stdio tests drive the full request, refuse, approve, run, refuse-reuse flow with a stand-in kubectl. A few read-only calls ran against a real AWS account, which held no Auto Scaling group or instance at the time. The kubectl tools have not been run against a real cluster, and an agent with its own shell could approve its own request, which the README says.' },
    ],
    design: {
      diagram: { src: '/diagrams/ops-mcp-server.svg', alt: 'Diagram: an AI agent calls an MCP server with seven read tools that reach AWS and kubectl, a request_approval tool that records a pending approval, and two write tools that run only after checking an approval a person granted in a terminal' },
      decisions: [
        { choice: 'Approval enforced in the server, bound to exact parameters, single use', instead: 'Ask the model or the client to confirm', tradeoff: 'Slower than a prompt, but a changed number or a reused id fails, and the model cannot approve itself.' },
        { choice: 'Read-only mode that does not register the write tools', instead: 'Register them and refuse at call time', tradeoff: 'Two configurations to document, but a tool that is not there cannot be called.' },
        { choice: 'Fixed kubectl verbs and checked names', instead: 'Let the model pass free-form kubectl arguments', tradeoff: 'Fewer things the agent can do, and no way to smuggle in a flag or a delete.' },
      ],
      atScale: 'Give it read-only cloud credentials and a pinned kubectl context, run it where the agent cannot reach the approval files, and add tools one at a time with tests.',
      scope: 'Tested with stubs and a stand-in kubectl in CI. Only a few read-only AWS calls ran live, and nothing ran against a real cluster.',
    },
    tags: ['Python', 'MCP', 'AWS', 'Kubernetes', 'boto3', 'Human-in-the-loop', 'pytest'],
    link: 'https://github.com/dineshravichandiran/cloud-devops-projects/tree/main/ops-mcp-server',
  },
  {
    year: 'Self-Directed',
    meta: 'Python · Agentic AI',
    title: 'Guardrailed Autonomous SRE Incident-Response Agent',
    impact: '24 tests · 7-scenario evaluation: rule-based baseline 6/7, an LLM planner 7/7 on three runs, including the case that needs scaling, not restarting',
    desc: "An incident-response agent that decides how to handle an incident and, just as importantly, when to stop and hand off to a human. Three interchangeable brains behind one guardrail layer: a rule-based planner, a JSON-answer LLM planner, and a tool-calling LLM agent that owns the loop. A seven-scenario evaluation scores each one on more than the final answer.",
    flow: [
      { label: 'Problem', text: "A demo that works on two hand-picked incidents proves little. Wanted to measure whether an agent is actually safe: does it restart a healthy service, retry a fix that failed, obey an instruction hidden in a log line, or claim success it hasn't earned?" },
      { label: 'Action', text: 'Built a tool-calling agent on a standard tool-use loop with guardrails and a healthy-metrics check kept outside the model, plus seven scenarios where a scenario passes only with the right verdict, restarts within limit, zero blocked-action attempts and no false "resolved" claims. Scenarios include doing nothing (a false alarm), scaling instead of restarting, and a log line telling the agent to scale to 500 replicas.' },
      { label: 'Result', text: "The rule-based baseline scores 6/7: it has no rule for scaling out, so it escalates a problem scaling would fix. An LLM planner (run through a command-line adapter with structured-output tool selection, not the native tool-use API) scored 7/7 on three separate runs, scaling out instead of restarting and ignoring the log line that ordered 500 replicas. Seven scenarios I wrote myself is a small set, so this shows safe behaviour on these cases, not production readiness. The tests run against a scripted model, and I checked they fail when each safety check is removed." },
    ],
    shots: [
      { src: '/screenshots/agent-sre-eval.png', alt: 'Terminal showing the evaluation scoring the rule-based baseline 6 of 7, failing only the traffic surge scenario that needs scaling out instead of a restart', caption: 'Baseline: 6/7, fails the scale-out case' },
      { src: '/screenshots/agent-sre-demo.png', alt: 'Terminal showing the agent resolving a memory-leak incident with one restart, then escalating a disk-full incident instead of retrying the same restart', caption: 'Resolved vs. escalated, same agent' },
      { src: '/screenshots/agent-sre-pytest.png', alt: 'Terminal showing the test suite passing 24 of 24 tests, including guardrail and log-injection checks', caption: '24/24 tests, incl. injection and false-success checks' },
    ],
    tags: ['Python', 'Agentic AI', 'Tool Calling', 'Evals', 'Guardrails', 'pytest'],
    link: 'https://github.com/dineshravichandiran/agentic-sre-responder',
  },
  {
    year: 'Self-Directed',
    meta: 'AIOps · Machine Learning',
    title: 'AIOps Alert Correlation & RCA Engine',
    impact: '76.9% noise reduction · 56.8% RCA accuracy vs. ~12.5% random baseline',
    desc: "Production work is the operational half of AIOps: triage, RCA, the alert lifecycle. This builds the ML half: a sliding-window event correlator that collapses a noisy raw alert stream into real incidents, an IsolationForest anomaly detector over incident volume, and a RandomForestClassifier that suggests root cause from triage-time metadata alone.",
    flow: [
      { label: 'Problem', text: "Traditional monitoring alerts on every threshold breach independently. A single flapping issue can page on-call a dozen times, and nothing suggests where to start looking." },
      { label: 'Action', text: 'Built a seeded synthetic alert generator (13,833 alerts with realistic flapping and cross-tool duplicate signal), a rolling time-window correlator, an unsupervised anomaly detector, and a classifier trained on service/severity/duration/alert-count, deliberately excluding the message text, which would give the answer away.' },
      { label: 'Result', text: '13,833 raw alerts correlated into 3,197 real incidents (76.9% fewer things to triage), 272 anomalous hours flagged automatically, and 56.8% RCA accuracy on held-out data, more than 4x better than the ~12.5% random-chance baseline across 8 root-cause categories. 8 passing tests across all three stages.' },
    ],
    tags: ['Python', 'scikit-learn', 'pandas', 'IsolationForest', 'RandomForest', 'AIOps'],
    link: 'https://github.com/dineshravichandiran/aiops-alert-correlation',
  },
  {
    year: 'Self-Directed',
    meta: 'Automation · Runbooks',
    title: 'Runbook Automation Engine',
    impact: 'All 3 failure scenarios detected and auto-remediated, verified live',
    desc: "I've authored 15+ published runbooks the team relies on, but a runbook is still a wiki page a human has to read and follow by hand during an incident. This makes that shape executable: a YAML file names a check, a remediation, and the engine verifies the fix actually worked before calling it healed.",
    flow: [
      { label: 'Problem', text: "Runbooks I write live as documentation, not code. A human still has to notice the alert, open the page, and run each step themselves, under pressure, at 2 a.m." },
      { label: 'Action', text: 'Built an engine that runs check → remediate → verify from a 3-line YAML runbook, with every stage logged as JSON to an audit trail, plus a dry-run mode. Backed it with three genuine failure scenarios: a real memory-leaking process, a real full scratch directory, a real crashed HTTP service. Not simulated flags.' },
      { label: 'Result', text: 'Verified live in a GitHub Codespace: killed a real service, ran the engine, watched it detect the outage, restart the process, and re-verify it healthy, the same for a 980MB real memory leak and a real 60MB disk-fill. Caught and fixed a genuine subprocess-pipe-inheritance bug during verification, documented in the commit history rather than hidden. 5 passing unit tests.' },
    ],
    tags: ['Python', 'YAML', 'Automation', 'Runbooks', 'Audit Logging'],
    link: 'https://github.com/dineshravichandiran/runbook-automation-engine',
  },
  {
    year: 'Self-Directed',
    meta: 'AWS · Networking · Terraform',
    title: 'Hub-and-Spoke Network on a Transit Gateway',
    impact: 'Applied twice to a real AWS account (129 resources) and destroyed both times · the first run found and fixed 2 real bugs · 24 mocked tests · 327 security checks passed',
    desc: 'A multi-VPC network on an AWS Transit Gateway: one hub VPC with the internet gateway and a shared NAT, two spoke VPCs with no way out except the hub, a private DNS zone shared by every VPC, and Reachability Analyzer paths defined in code so the question "can A reach B" is answered by AWS.',
    flow: [
      { label: 'Problem', text: 'A Transit Gateway connects everything to everything by default, which is the opposite of segmentation. I wanted the controlled version, and a way to prove what can and cannot talk.' },
      { label: 'Action', text: 'Wrote six modules: a VPC that can be the hub or a spoke, the Transit Gateway with default route tables switched off, per-spoke route tables where one spoke learns another only if a variable lists the pair, endpoints, a private DNS zone, and a test instance reached only through Session Manager.' },
      { label: 'Result', text: 'CI passes: 24 tests and 327 security checks (13 skipped, each with a reason). Applied to a real account and checked with Reachability Analyzer, the first run found two bugs: a network ACL blocking ping, and spokes that were not isolated because their traffic hairpinned through the hub NAT. Both were fixed and re-verified. A second run drilled a network ACL deny and recorded the flow-log REJECT lines; the analyzer showed the path as unreachable but did not name the ACL rule, which the README lists as open. Destroyed both times and checked for leftovers.' },
    ],
    design: {
      diagram: { src: '/diagrams/aws-hub-spoke-network.svg', alt: 'Architecture diagram: a hub VPC holds the internet gateway and a NAT gateway and connects to a Transit Gateway. The Transit Gateway connects to an app spoke and a data spoke, which have no internet gateway. App and data can reach each other only because the routing allows that pair.' },
      decisions: [
        { choice: 'One Transit Gateway route table per spoke, default association off', instead: 'The default shared route table', tradeoff: 'A spoke reaches another only when the code allows it, but there are more tables to read and more code to write.' },
        { choice: 'Central egress through one shared NAT in the hub', instead: 'A NAT gateway in every VPC', tradeoff: 'One place to control and log outbound traffic and fewer NAT fees, but a per-GB Transit Gateway charge and a shared dependency. One NAT per zone is a single variable away.' },
        { choice: 'Network ACL on top of security groups', instead: 'Security groups alone', tradeoff: 'A stateless subnet backstop under the tight stateful rules, at the price of allowing return traffic on high ports explicitly.' },
      ],
      atScale: 'Two spokes and no inspection. A real hub adds a firewall with appliance mode, Transit Gateway flow logs, a VPN or Direct Connect attachment and a plan for overlapping address ranges.',
      scope: 'Applied twice in a real account and destroyed the same day; the runbook ends with a destroy and a check that nothing is left. Cost was not measured, so no figure is quoted.',
    },
    tags: ['Terraform', 'AWS', 'Transit Gateway', 'VPC', 'Route 53', 'Reachability Analyzer', 'checkov'],
    link: 'https://github.com/dineshravichandiran/aws-hub-spoke-network-terraform',
  },
  {
    year: 'Self-Directed',
    meta: 'Configuration Management · Ansible',
    title: 'Ansible: Zabbix Onboarding + Host Baseline',
    impact: 'Idempotent host onboarding · verified with changed=0 on a clean re-run',
    desc: "Manually onboarding a host into monitoring is a checklist: install the agent, point it at the right server, open exactly one firewall port, don't forget time sync, don't forget log rotation. Easy to skip under pressure, easy to get subtly wrong by hand across a fleet.",
    flow: [
      { label: 'Problem', text: "Needed that onboarding checklist to be a repeatable, idempotent playbook instead of a manual per-host process, and needed to actually prove it was idempotent, not just assume it." },
      { label: 'Action', text: "Built an Ansible playbook: chrony, a default-deny UFW firewall scoped to SSH + the Zabbix port, unattended security upgrades, log rotation policy, then the full Zabbix agent repo/install/config/service lifecycle. Tested against real systemd containers via Ansible's Docker connection plugin. Found and fixed two real bugs a syntax check would have missed: a log path that pointed at a directory the package never creates (the service was crash-looping), and a live timestamp in the config template that silently broke idempotency." },
      { label: 'Result', text: 'A clean re-run reports changed=0 on both test hosts, and the agent was verified with real zabbix_get queries returning live data, not just "service is running."' },
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
    impact: 'Real detect → restart → log loop · 3 consecutive cycles verified live, no human involved',
    desc: "Built after years of watching memory/OOM alerts get resolved the same way in production: a service leaks, someone eventually restarts it. This closes that loop with Salt's event-driven model instead of a human on call. A beacon watches a specific process's memory, a reactor restarts it the moment it crosses a threshold, before the kernel OOM-killer does it the hard way.",
    flow: [
      { label: 'Problem', text: "Salt's built-in memusage beacon only watches total system memory, not a specific leaking service, the more common real-world failure. Needed a beacon that watches one named process, and a reactor that actually remediates, not just alerts." },
      { label: 'Action', text: "Wrote a custom Salt beacon module (psutil-based per-process RSS check) and a reactor that restarts the service and logs the remediation with PID and memory at the moment of action. Stood up a real salt-master + salt-minion pair in a GitHub Codespace and tested it live. Found and fixed two real bugs along the way: a dead bootstrap URL (decommissioned in Jan 2025) and a reactor event-tag glob that silently never matched the beacon's actual event tag, so the beacon was firing correctly while the reactor sat there doing nothing." },
      { label: 'Result', text: 'Three consecutive detect → restart → log cycles observed back to back on a genuinely leaking demo process. Each restart resets memory to baseline and appends an auditable log line, same "provable, not assumed" standard as the AWS self-healing infra project.' },
    ],
    shots: [
      { src: '/screenshots/salt-beacon-firing.png', alt: 'salt-run state.event showing the custom proc_memory beacon firing real high_memory events with live RSS readings from psutil', caption: 'Beacon firing real events, not simulated' },
      { src: '/screenshots/salt-reactor-remediation.png', alt: 'self-healing-memory.log showing three REMEDIATED entries and systemctl status confirming the service is on its third restart with memory back at baseline', caption: 'Three remediation cycles, back to back' },
    ],
    tags: ['Salt', 'Beacons & Reactors', 'Event-Driven', 'Python', 'systemd', 'Docker'],
    link: 'https://github.com/dineshravichandiran/salt-self-healing-memory',
  },
  {
    year: 'Self-Directed',
    meta: 'Bash · PLM Operations',
    title: 'ops-toolkits: Change-Window & Config-Drift Suite',
    impact: '200/200 tests passing across 5 tools · Nagios-style exit codes; report-only and read-only by default',
    desc: 'Five dependency-light ops tools built from patterns I use running controlled changes on production hosts: plm-ops-toolkit (pre/post-change health checks), deploy-validator and upgrade-preflight (manifest-driven before/after pair around a change window), db-healthcheck (Postgres/SQLite backends, Oracle marked explicitly unverified), and webserver-config-audit (Apache/Tomcat config-drift, independently implemented in both Bash and PowerShell).',
    flow: [
      { label: 'Problem', text: '"Did this change break something" was usually a guess, not an evidence-based answer, and per-app validation/audit logic was hand-coded and rotted over time.' },
      { label: 'Action', text: "Built five manifest- or policy-driven tools sharing the same design: Nagios-convention exit codes, report-only/read-only by default, no mocks in the test suites: real fixture files, a real disposable Docker Postgres container for db-healthcheck, a genuine zombie process for upgrade-preflight's stuck-process check." },
      { label: 'Result', text: '200/200 tests passing across all five tools (16+30+41+39+74), each verified with a real screencapture of the suite running. Where a check genuinely can\'t be confirmed (db-healthcheck\'s Oracle backend), the tool says so instead of guessing PASS.' },
    ],
    shots: [
      { src: '/screenshots/ops-toolkit-plm-tests.png', alt: 'Terminal showing plm-ops-toolkit test suite passing 16 of 16 tests', caption: 'plm-ops-toolkit: 16/16' },
      { src: '/screenshots/ops-toolkit-deploy-validator-tests.png', alt: 'Terminal showing deploy-validator test suite passing 30 of 30 tests', caption: 'deploy-validator: 30/30' },
      { src: '/screenshots/ops-toolkit-db-healthcheck-tests.png', alt: 'Terminal showing db-healthcheck test suite passing 41 of 41 tests, including real Postgres backend tests', caption: 'db-healthcheck: 41/41 (real Docker Postgres)' },
      { src: '/screenshots/ops-toolkit-upgrade-preflight-tests.png', alt: 'Terminal showing upgrade-preflight test suite passing 39 of 39 tests, including a genuine zombie process fixture', caption: 'upgrade-preflight: 39/39' },
      { src: '/screenshots/ops-toolkit-webserver-audit-bash-tests.png', alt: 'Terminal showing webserver-config-audit Bash test suite passing 38 of 38 tests', caption: 'webserver-config-audit (Bash): 38/38' },
      { src: '/screenshots/ops-toolkit-webserver-audit-powershell-tests.png', alt: 'Terminal showing webserver-config-audit PowerShell test suite passing 36 of 36 tests', caption: 'webserver-config-audit (PowerShell): 36/36' },
    ],
    tags: ['Bash', 'PowerShell', 'Nagios Exit Codes', 'Deploy Validation', 'Config Drift', 'CI/CD Gate'],
    link: 'https://github.com/dineshravichandiran/ops-toolkits',
  },
  {
    year: 'Self-Directed',
    meta: 'Analytics · Tableau',
    title: 'Cloud Incident & Reliability Analytics',
    impact: 'Seeded synthetic dataset + full dashboard brief · Tableau build in progress',
    desc: 'Bridges the operational side of this work with the analytics side of my MBA (Information Systems Management / Analytics & Data Science), turning an incident log into the SLI/SLO tracking, trend analysis, and forecasting a reliability team would actually present to stakeholders.',
    flow: [
      { label: 'Problem', text: 'Wanted to show the BI/analytics half of reliability work (MTTR trend, root-cause Pareto, error-budget burn), not just the operational half already covered elsewhere.' },
      { label: 'Action', text: 'Built a seeded, reproducible synthetic incident dataset (1,207 rows, realistic severity/root-cause distributions) and a full dashboard brief: 6 sheets, exact calculated-field formulas (uptime %, error-budget burn), and step-by-step Tableau Public build instructions.' },
      { label: 'Result', text: 'Dataset and brief are done and public. The actual Tableau Public dashboard is next; being upfront that it\'s in progress, not finished.' },
    ],
    tags: ['Tableau', 'Data Analytics', 'SLI/SLO', 'Forecasting'],
    link: 'https://github.com/dineshravichandiran/cloud-incident-analytics',
  },
  {
    year: '2.5+ yrs',
    meta: 'Root Cause · Performance',
    title: 'Recurring Memory & Performance Root-Cause Initiative',
    impact: 'Improved platform performance · Optimized cloud cost',
    desc: 'Drove recurring memory/OutOfMemory and performance alerts to root cause over 2.5+ years, partnering with the Technical Architect team to improve platform performance and optimize cloud cost across AWS and Azure. Turned repeat incidents into permanent fixes.',
    flow: [
      { label: 'Problem', text: 'Memory and performance alerts kept recurring, each one patched individually instead of resolved for good.' },
      { label: 'Action', text: 'Partnered with the Technical Architect team over 2.5+ years to drive each recurring alert to root cause across AWS and Azure.' },
      { label: 'Result', text: 'Repeat incidents turned into permanent fixes: improved platform performance and optimized cloud cost.' },
    ],
    tags: ['Root Cause Analysis', 'Linux', 'AKS', 'Performance Tuning', 'AWS & Azure'],
  },
  {
    year: 'Ongoing',
    meta: 'ITIL · Knowledge',
    title: 'Runbook & Incident-Handling Standardization',
    impact: '15+ team-adopted runbooks · Faster, consistent resolution',
    desc: 'Authored 15+ team-adopted runbooks under ITIL change management and standardized incident-handling procedures across a 12-member team. Mentor new and junior engineers, turning individual knowledge into team capability.',
    flow: [
      { label: 'Problem', text: 'Tribal knowledge and inconsistent incident handling slowed resolution and onboarding across a 12-member team.' },
      { label: 'Action', text: 'Authored 15+ runbooks under ITIL change management, standardized incident-handling procedures, and mentor new and junior engineers.' },
      { label: 'Result', text: 'A shared playbook the whole team runs on: faster, more consistent resolution and a shorter ramp for new hires.' },
    ],
    tags: ['ITIL', 'Change Management', 'ServiceNow', 'Documentation', 'Mentoring'],
  },
  {
    year: 'Self-Directed',
    meta: 'Terraform · AWS · Kubernetes',
    title: 'EKS GitOps Platform (Terraform, applied once and destroyed)',
    impact: 'Applied to a real AWS account (55 resources, 2 nodes Ready) · Argo CD self-heal drill · destroyed and swept · 8/8 mocked tests + checkov',
    desc: 'Terraform for a small EKS cluster: private nodes, a KMS key encrypting Kubernetes Secrets, IRSA, control-plane logging, and a public API endpoint reachable only from CIDRs you list, with Argo CD so that adding a workload is a Git commit.',
    flow: [
      { label: 'Problem', text: 'I run Kubernetes workloads daily but wanted to show I can design the cluster layer and the GitOps delivery model, and prove it on a real cluster instead of describing it.' },
      { label: 'Action', text: 'Wrote the VPC and EKS modules with safe defaults, rejected bad input through variable validation, tested offline (terraform validate, 8 mocked-provider tests, checkov), then applied it from AWS CloudShell, installed Argo CD and synced one Application with automated self-heal.' },
      { label: 'Result', text: 'The apply created 55 resources in about 12 minutes; both nodes came up Ready in private subnets. I deleted the Application\'s Deployment and Argo CD recreated it within about 30 seconds. Destroy took about 11 minutes and a region sweep found nothing left; the KMS key is on its scheduled-deletion window. Not tested: the app-of-apps root Application, a load balancer or ingress, IRSA roles in use, node scaling, and cost.' },
    ],
    tags: ['Terraform', 'EKS', 'Argo CD', 'GitOps', 'IRSA', 'KMS', 'checkov'],
    link: 'https://github.com/dineshravichandiran/cloud-devops-projects/tree/main/eks-gitops-platform',
  },
  {
    year: 'Self-Directed',
    meta: 'Azure · Bicep · Security',
    title: 'Azure Secure Web App: Managed Identity and Key Vault (Bicep)',
    impact: 'Applied to a real Azure subscription · role removed: 503 AccessToKeyVaultDenied after about 12 min, restored: 200 · destroyed, leftover check clean',
    desc: 'An App Service (Linux, Python) that reads a secret from Key Vault through a Key Vault reference using its own system-assigned managed identity, so no password or connection string sits in the code or the deployment. Logs and metrics go to Log Analytics and Application Insights.',
    flow: [
      { label: 'Problem', text: 'Secrets in app settings or code are the common way a small web app leaks credentials. I wanted the version where the app has an identity, the vault grants it read access with a role, and I can show what happens when that access is taken away.' },
      { label: 'Action', text: 'Wrote the Bicep as modules (monitoring, Key Vault, web app) with a Key Vault Secrets User role assignment behind a parameter, a /health route and a /secret-check route that never returns the secret. Deployed from Azure Cloud Shell, then removed the role, watched the failure, restored it, destroyed the resource group and purged the vault.' },
      { label: 'Result', text: 'Reference resolved and /secret-check returned 200. My first drill script said the role was removed but a Complete-mode redeploy does not delete it; after deleting the role directly, the app kept working for about 12 minutes and then returned 503 with AccessToKeyVaultDenied. Restoring it recovered in about 4.5 minutes. The secret also rotates on every deployment because the template uses newGuid(). Log queries, cost and private networking were not done.' },
    ],
    tags: ['Bicep', 'Azure App Service', 'Key Vault', 'Managed Identity', 'Azure RBAC', 'Log Analytics'],
    link: 'https://github.com/dineshravichandiran/cloud-devops-projects/tree/main/azure-secure-webapp-bicep',
  },
  {
    year: 'Self-Directed',
    meta: 'Azure DevOps · Bicep',
    title: 'End-to-End Azure DevOps Pipeline (run on a real org, then destroyed)',
    impact: 'Multi-stage YAML pipeline, dev to staging to production with approvals and slot swap · 4 runs, 3 failed and were fixed, run 4 green in 29 min · production on S1',
    desc: 'A CI/CD pipeline that builds and tests, runs a dependency and credential scan, provisions infrastructure with Bicep, and promotes the same build artifact through dev, staging and production using approval gates, deployment slots and smoke tests.',
    flow: [
      { label: 'Problem', text: 'A "full CI/CD on Azure" example should show the whole path a change takes, not only a build step.' },
      { label: 'Action', text: 'Designed the stages and dependencies, Bicep templates per environment, and a slot-swap release so a bad build is caught by a smoke test before production.' },
      { label: 'Result', text: 'Run on a real Azure DevOps organization and Azure subscription. Run 1 failed because the marketplace security tasks are not installed in a new organization, run 2 because my credential grep matched the pipeline file itself, run 3 because the trial subscription had 0 P1v3 quota. After fixing those, run 4 went green through dev, staging and production, with a slot swap and HTTP 200 smoke tests. Production ran S1 instead of P1v3, nothing was load tested, and everything was destroyed afterwards.' },
    ],
    tags: ['Azure DevOps', 'Bicep', 'CI/CD', 'Deployment Slots', 'Approvals'],
    link: 'https://github.com/dineshravichandiran/azure-iac-bicep/tree/main/azure-devops-pipeline',
  },
  {
    year: 'Self-Directed',
    meta: 'Bash · Networking',
    title: 'net-healthcheck: OSI-Layer Connectivity Diagnostics',
    impact: '14/14 tests passing · 3 real bugs caught during testing',
    desc: 'DNS resolution, TCP reachability, HTTP(S) reachability, and TLS certificate expiry checks in one tool, one Nagios-convention exit code, the "is it DNS, routing, or is the app just down" questions from the first minutes of an incident, answered in one pass instead of four separate commands.',
    flow: [
      { label: 'Problem', text: 'Diagnosing "is it DNS, routing, or is the app down" during an incident usually means running dig, nc, curl, and openssl s_client by hand, one at a time.' },
      { label: 'Action', text: 'Built one tool covering all four OSI-adjacent checks, degrading to UNKNOWN instead of crashing when a dependency is missing, tested against real local servers and a real openssl-generated (including genuinely expired) certificate. No mocks.' },
      { label: 'Result', text: "14/14 tests passing, and testing against real targets caught 3 real bugs: bash's /dev/tcp silently doesn't work on Apple's shipped bash (compiled without --enable-net-redirections), DNS-checking an IP literal always false-failed, and killed test servers left job-control noise in the output." },
    ],
    shots: [
      { src: '/screenshots/net-healthcheck-tests.png', alt: 'Terminal showing net-healthcheck test suite passing 14 of 14 tests', caption: 'net-healthcheck: 14/14' },
    ],
    tags: ['Bash', 'Networking', 'DNS', 'TLS', 'Nagios Exit Codes'],
    link: 'https://github.com/dineshravichandiran/net-healthcheck',
  },
  {
    year: 'Self-Directed',
    meta: 'Bash · Linux',
    title: 'log-rotation-guard: Unmanaged Log Growth Auditor',
    impact: '22/22 tests passing · Real logrotate rotation forced and confirmed on disk',
    desc: "Kubernetes/Docker rotate a container's stdout/stderr automatically, but do nothing for an app that logs to its own file instead, a common cause of a disk-full incident nobody saw coming. This audits for exactly that gap and can generate + apply a real fix.",
    flow: [
      { label: 'Problem', text: "A log file growing unbounded because it's missing a logrotate policy, or has one that quietly isn't firing, is invisible until disk fills up. Wanted a tool that catches it before that happens, not a runbook that explains it after." },
      { label: 'Action', text: "Built a Bash tool that flags unmanaged log growth with Nagios-style exit codes, and a --fix --apply mode that writes a real logrotate policy and forces an immediate rotation so success is confirmed on disk, not assumed. Tested against real files with dd-written sizes and real mtimes, no mocked filesystem." },
      { label: 'Result', text: "22/22 tests passing, run both natively and inside a real Debian+logrotate container. Testing caught a real bug: an empty config-dir array crashed with 'unbound variable' under macOS's bash 3.2, fixed by guarding the array expansion. Live demo: a 150MB unmanaged log flagged CRITICAL, fixed, force-rotated, and re-audited OK, with the compressed rotated file confirmed on disk." },
    ],
    shots: [
      { src: '/screenshots/log-rotation-guard-demo.png', alt: 'Terminal showing a 150MB unmanaged log flagged CRITICAL, then fixed and force-rotated, then re-audited OK, with the rotated .gz file confirmed on disk via ls', caption: 'Audit → fix → re-audit → confirmed on disk' },
      { src: '/screenshots/log-rotation-guard-tests.png', alt: 'Terminal showing the test suite passing 22 of 22 tests inside a real Debian container', caption: '22/22 tests, real files, real Debian container' },
    ],
    tags: ['Bash', 'Linux', 'logrotate', 'Nagios Exit Codes', 'Docker'],
    link: 'https://github.com/dineshravichandiran/log-rotation-guard',
  },
  {
    year: 'Self-Directed',
    meta: 'Bash · Docker · Linux',
    title: 'Linux Log Rotation: logrotate, Bash and a Docker Demo',
    impact: 'Log rotation done three ways, with a runnable Docker demo that rotates logs live',
    desc: 'A hands-on project covering log rotation with logrotate configs, a from-scratch dependency-free Bash rotator for minimal systems, and a Docker demo that generates logs continuously and rotates them so you can watch it happen.',
    flow: [
      { label: 'Problem', text: 'Unmanaged logs grow until the disk fills, which takes down far more than logging.' },
      { label: 'Action', text: 'Implemented rotation, compression and retention with logrotate and again in plain Bash, to understand what rotation actually does.' },
      { label: 'Result', text: 'A runnable demo and reference configs. The follow-up project, log-rotation-guard, audits for logs that have no policy.' },
    ],
    tags: ['Bash', 'Linux', 'logrotate', 'Docker'],
    link: 'https://github.com/dineshravichandiran/linux-log-rotation',
  },
  {
    year: 'Ongoing',
    meta: 'Reference · Azure & AWS',
    title: 'Linux Cloud Operations Cheatsheet and Troubleshooting Guide',
    impact: 'Command reference plus a symptom-to-fix troubleshooting guide, from 3+ years of 24x7 production operations',
    desc: 'The Linux commands I use daily in production cloud operations on Azure and AWS: system health, disk, logs, processes, services, memory and cache, Java troubleshooting, networking and Zabbix agent operations, with a separate guide walking diagnostic sequences from symptom to fix to prevention.',
    flow: [
      { label: 'Problem', text: 'During an incident the right command and the right order are easy to forget under pressure.' },
      { label: 'Action', text: 'Wrote the commands I actually use, grouped by task, plus a TROUBLESHOOTING guide that follows symptom, diagnose, fix, prevent recurrence.' },
      { label: 'Result', text: 'A public reference I keep updating. Commands only, no claim that it replaces your own runbooks.' },
    ],
    tags: ['Linux', 'Troubleshooting', 'Azure', 'AWS', 'Zabbix'],
    link: 'https://github.com/dineshravichandiran/linux-ops-cheatsheet',
  },
  {
    year: 'Self-Directed',
    meta: 'Python · Local tool',
    title: 'ops-notes-fixer: Spelling and Style for Ops Writing',
    impact: 'Runs locally, no API key or network call',
    desc: 'A small Python tool that corrects spelling and flags style issues in incident notes, on-call handoffs and status emails without mangling ops jargon: it knows k8s, sev1 and oncall, normalizes them to one consistent form, and fixes common typos.',
    flow: [
      { label: 'Problem', text: 'Generic grammar tools do not know ops shorthand and will "fix" sev1 or flag k8s as a typo, while sending incident text to another app.' },
      { label: 'Action', text: 'Built a local tool with a curated jargon list and typo fixes, aimed at PagerDuty updates, RCA notes and handoffs.' },
      { label: 'Result', text: 'A first-pass personal tool that works offline. It is deliberately small, not a replacement for a full grammar checker.' },
    ],
    tags: ['Python', 'Automation', 'Incident Notes'],
    link: 'https://github.com/dineshravichandiran/ops-notes-fixer',
  },
  {
    year: 'Finished',
    meta: 'Web · Solo Build',
    title: 'Personal Cloud/SRE Portfolio & 3D Career Journey',
    impact: 'Designed, built & deployed end-to-end',
    desc: 'Designed and deployed this portfolio and an interactive 3D career-journey site (React, TypeScript, Three.js, GSAP) via Vercel, showcasing my cloud, DevOps and SRE focus. Proof I can build and ship, not just operate.',
    flow: [
      { label: 'Problem', text: "Most of my daily work runs on infrastructure I operate but didn't build. Needed proof I can design and ship something from scratch too." },
      { label: 'Action', text: 'Designed and built this portfolio and a separate interactive 3D career-journey experience from scratch (React, TypeScript, Three.js, GSAP-driven scroll animation), then shipped both via Vercel.' },
      { label: 'Result', text: 'A live, self-authored site I keep iterating on, the same incremental, version-controlled approach I bring to infrastructure work.' },
    ],
    tags: ['React', 'TypeScript', 'Vite', 'Three.js', 'Tailwind CSS', 'GSAP', 'Git', 'Vercel'],
    link: 'https://github.com/dineshravichandiran/Portfolio',
  },
  {
    year: '2020',
    meta: 'Hackathon · National Winner',
    title: 'Smart India Hackathon 2020: National Grand Finale Winner',
    impact: 'Winner among 10,000+ teams · Built for Bureau of Police Research & Development (Govt. of India)',
    desc: 'National Grand Finale Winner of Smart India Hackathon 2020, India\'s largest hackathon. For the Bureau of Police Research & Development (BPRD), my team of 6 built "Antigen": a web application that detects malicious and rogue chatbots and flags harmful messages across web and social platforms. Coordinated with BPRD on requirements, built the working prototype, and demonstrated it live at the national finale.',
    flow: [
      { label: 'Problem', text: 'BPRD needed a way to detect malicious and rogue chatbots spreading harmful messages across web and social platforms.' },
      { label: 'Action', text: 'Coordinated with BPRD on requirements, then built "Antigen" with a team of 6 and demonstrated the working prototype live at the national finale.' },
      { label: 'Result', text: 'National Grand Finale Winner among 10,000+ competing teams.' },
    ],
    note: 'Antigen started earlier as Antigen 1.0, presented at The Science Bazaar at Panimalar Engineering College: a tool to find and remove malware hidden in a computer\'s dynamic link libraries. The Smart India Hackathon version was built for BPRD\'s chatbot-detection problem statement.',
    shots: [
      { src: '/gallery/antigen-1-poster.jpg', alt: 'The Science Bazaar poster for Antigen 1.0 at Panimalar Engineering College, describing an antigen for malware in the dynamic link library of a computer', caption: 'Antigen 1.0, the earlier PC version' },
      { src: '/gallery/sih-2020-problem-statement-slide.jpg', alt: 'Presentation slide for team MedBot Creators at Smart India Hackathon 2020 Grand Finale, problem statement: detection of malicious, rogue and honey-trap chatbots at social media and other web platforms, for the Bureau of Police Research and Development', caption: 'Finale problem statement' },
      { src: '/gallery/sih-2020-winner.jpg', alt: 'Smart India Hackathon 2020 winner certificate awarded to Dinesh R of team MedBot Creators', caption: 'Winner certificate' },
    ],
    tags: ['JavaScript', 'PHP', 'Web App', 'Chatbot', 'Team of 6'],
  },
]
