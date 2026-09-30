// Answers are built from the same data the rest of the site renders from
// (profile, credentials, skills), not a separately maintained script — so
// the chatbot can't drift out of sync with what's actually on the page.
import { profile } from './profile'
import { credentials } from './credentials'
import { toolCategories } from './skills'
import { keyProjects } from './projects'

export type Intent =
  | 'greeting'
  | 'experience'
  | 'skills'
  | 'projects'
  | 'certifications'
  | 'education'
  | 'availability'
  | 'contact'
  | 'thanks'
  | 'fallback'

const KEYWORDS: Record<Exclude<Intent, 'fallback'>, string[]> = {
  greeting: ['hi', 'hello', 'hey', 'yo', 'sup'],
  experience: ['experience', 'background', 'work', 'job', 'career', 'role', 'company', 'employer', 'sre', 'reliability', 'incident', 'noc'],
  skills: ['skill', 'tech', 'stack', 'tool', 'language', 'kubernetes', 'k8s', 'aws', 'azure', 'cloud', 'python', 'linux'],
  projects: ['project', 'github', 'repo', 'build', 'built', 'portfolio project', 'agent', 'automation'],
  certifications: ['cert', 'certification', 'credential', 'award', 'badge', 'exam'],
  education: ['education', 'degree', 'college', 'university', 'mba', 'study', 'studied'],
  availability: ['available', 'availability', 'hiring', 'open to', 'looking for', 'job opening', 'opportunit', 'relocate', 'notice period'],
  contact: ['contact', 'reach', 'email', 'hire', 'talk', 'connect', 'get in touch', 'linkedin', 'call', 'recruiter'],
  thanks: ['thank', 'thanks', 'appreciate', 'cool', 'nice', 'great'],
}

export function matchIntent(text: string): Intent {
  const t = text.toLowerCase()
  for (const [intent, words] of Object.entries(KEYWORDS) as [Exclude<Intent, 'fallback'>, string[]][]) {
    if (words.some((w) => t.includes(w))) return intent
  }
  return 'fallback'
}

const certs = credentials.filter((c) => c.type === 'Certification')
const awards = credentials.filter((c) => c.type === 'Award')
const education = credentials.filter((c) => c.type === 'Education')

export function answerFor(intent: Intent): string {
  switch (intent) {
    case 'greeting':
      return `Hey! I'm OpsBot — ask me about ${profile.name}'s experience, skills, projects, certifications, or how to get in touch.`
    case 'experience':
      return profile.now
    case 'skills': {
      const categories = toolCategories.map((c) => c.title).join(', ')
      return `Core areas: ${categories}. Want details on a specific one — try asking "kubernetes" or "monitoring".`
    }
    case 'projects': {
      const names = keyProjects
        .filter((p) => p.year === 'Self-Directed' && p.link)
        .slice(0, 4)
        .map((p) => p.title)
      return `A few self-directed builds: ${names.join('; ')}. Full list with code and test results is on the Projects section and at github.com/dineshravichandiran.`
    }
    case 'certifications': {
      const certNames = certs.map((c) => c.title).join(', ')
      const awardNames = awards.slice(0, 2).map((a) => a.title).join(', ')
      return `Certifications: ${certNames}. Recognitions include ${awardNames}, among others — see the Achievements section for the full list.`
    }
    case 'education':
      return education.map((e) => `${e.title} — ${e.issuer}`).join(' · ')
    case 'availability':
      return profile.tag + '. Use the "Get in touch" option and I\'ll pass your details along directly.'
    case 'contact':
      return `Happy to connect you — I'll grab a few details and make sure ${profile.name.split(' ')[0]} gets them directly.`
    case 'thanks':
      return "Anytime! Anything else you'd like to know?"
    case 'fallback':
    default:
      return "I only know the topics on this site: experience, skills, projects, certifications, education, and how to get in touch. Try one of those, or use the quick-reply buttons below."
  }
}
