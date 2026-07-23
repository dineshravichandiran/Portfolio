import { getYearsExperience } from '../utils/experience'

const experience = getYearsExperience()

export const profile = {
  name: 'Dinesh Ravichandiran',
  role: 'Cloud & Reliability Engineer',
  location: 'Pune, India',
  email: 'dineshravichandiran0808@gmail.com',
  headline: 'The one who gets paged at 2 a.m. — and has it resolved before the business day starts.',
  lede: "Cloud & reliability engineer at PTC, keeping enterprise SaaS platforms running 24×7 on AWS & Azure for 50+ Fortune 500 customers. I resolve production issues independently across Kubernetes, Linux, and cloud infrastructure, and I extend that into infrastructure-as-code and CI/CD in my own Terraform and GitHub Actions projects — CKA certification is next up. 5,000+ incidents resolved, 99.9% uptime maintained.",
  tag: 'Open to Cloud, SRE & Platform Engineering roles',
  now: "Currently a Cloud Services Specialist NOC Engineer at PTC, running 24×7 production operations across enterprise PLM, IIoT, and microservice infrastructure on AKS. I learn new technologies fast and apply them under real production pressure — and I keep growing through an MBA in Information Systems & Analytics, hands-on labs, and continuous self-study. Give me a challenging problem and a team to grow with, and I will deliver.",
  stats: [
    { value: experience.value, suffix: '+', decimals: experience.decimals, label: 'Years' },
    { value: 5000, suffix: '+', comma: true, label: 'Incidents' },
    { value: 99.9, suffix: '%', decimals: 1, label: 'Uptime' },
    { value: 50, suffix: '+', label: 'Fortune 500 Customers' },
  ],
  socialLinks: [
    { label: 'Email', href: 'mailto:dineshravichandiran0808@gmail.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/dineshravichandiran' },
    { label: 'GitHub', href: 'https://github.com/dineshravichandiran' },
    { label: 'Google Developer', href: 'https://g.dev/dineshravichandiran' },
    { label: 'Cloud Skills Boost', href: 'https://www.skills.google/public_profiles/ca2c6d03-3937-449b-b28b-3efb638e19f6' },
    { label: 'Credly', href: 'https://www.credly.com/users/dineshravichandiran' },
    { label: 'X', href: 'https://x.com/dineshr_' },
    { label: 'Medium', href: 'https://medium.com/@dineshravichandiran' },
    { label: 'Resume', href: '/Dinesh_Ravichandiran_SRE.pdf', download: true },
  ],
}
