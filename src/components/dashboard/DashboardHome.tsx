import StatusTile from './StatusTile'
import { aboutCards } from '../../data/about'
import { workProjects, keyProjects } from '../../data/projects'
import { toolCategories } from '../../data/skills'
import { branches } from '../../data/tree'
import { milestones } from '../../data/journey'
import { credentials } from '../../data/credentials'

const RISING = [30, 40, 35, 55, 50, 70, 65, 85]
const STEADY = [60, 65, 58, 68, 62, 70, 66, 72]
const BUILDING = [20, 30, 25, 45, 40, 55, 60, 75]

const tiles = [
  {
    to: '/about',
    name: 'Daily operations',
    description: 'What incident response, RCA, and platform ops look like day to day.',
    metric: String(aboutCards.length),
    metricLabel: 'Focus areas',
    status: 'ok' as const,
    sparkline: STEADY,
  },
  {
    to: '/work',
    name: 'Featured work',
    description: 'Problem → Action → Result: the initiatives I own at PTC right now.',
    metric: String(workProjects.length),
    metricLabel: 'Active initiatives',
    status: 'ok' as const,
    sparkline: RISING,
  },
  {
    to: '/skills',
    name: 'Platforms & tools',
    description: 'Monitoring, cloud, IaC, and the CKA/AWS SAA prep still in progress.',
    metric: String(toolCategories.reduce((n, c) => n + c.badges.length, 0)) + '+',
    metricLabel: 'Technologies',
    status: 'warn' as const,
    sparkline: BUILDING,
  },
  {
    to: '/projects',
    name: 'Key projects',
    description: 'Self-directed Terraform, Ansible, Salt, and CI/CD builds, verified live.',
    metric: String(keyProjects.length),
    metricLabel: 'Shipped builds',
    status: 'ok' as const,
    sparkline: RISING,
  },
  {
    to: '/tree',
    name: 'Project tree',
    description: 'A git-graph view of everything — one root, branched by category.',
    metric: String(branches.length),
    metricLabel: 'Branches',
    status: 'ok' as const,
    sparkline: STEADY,
  },
  {
    to: '/timeline',
    name: 'Career journey',
    description: 'DRDO → Cognizant → PTC. Also drivable in 3D.',
    metric: String(milestones.length),
    metricLabel: 'Milestones',
    status: 'ok' as const,
    sparkline: RISING,
  },
  {
    to: '/credentials',
    name: 'Credentials',
    description: 'Certifications, awards, and education — plus events attended.',
    metric: String(credentials.length),
    metricLabel: 'Certs & awards',
    status: 'ok' as const,
    sparkline: STEADY,
  },
  {
    to: '/contact',
    name: 'Contact',
    description: "Open to Cloud, SRE, DevOps & Platform Engineering roles — let's talk.",
    metric: '24×7',
    metricLabel: 'Response window',
    status: 'ok' as const,
    sparkline: STEADY,
  },
]

export default function DashboardHome() {
  return (
    <div className="container py-4 pb-16">
      <div className="font-mono text-xs text-dim uppercase tracking-wide mb-4">// All services</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tiles.map((tile) => (
          <StatusTile key={tile.to} {...tile} />
        ))}
      </div>
    </div>
  )
}
