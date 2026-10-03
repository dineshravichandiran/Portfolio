import { scrollToSection } from './scrollToSection'

export const PROJECT_SELECT_EVENT = 'portfolio:select-project'

// Featured cards live in a different section from the carousel, so they ask
// it to open one project by title, then scroll down to it.
export function showProject(title: string) {
  window.dispatchEvent(new CustomEvent<string>(PROJECT_SELECT_EVENT, { detail: title }))
  scrollToSection('projects')
}
