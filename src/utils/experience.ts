/** Continuous tenure at current employer started December 2022 (Cloud NOC Technician, Associate). */
const CAREER_START = new Date(2022, 11, 5)

export function getYearsExperience(): { value: number; decimals: number } {
  // Whole calendar months since the start date, so the figure flips exactly on
  // the 5th of June and December rather than drifting with leap years.
  const now = new Date()
  let months = (now.getFullYear() - CAREER_START.getFullYear()) * 12 + (now.getMonth() - CAREER_START.getMonth())
  if (now.getDate() < CAREER_START.getDate()) months -= 1
  const rounded = Math.floor(months / 6) / 2
  return { value: rounded, decimals: Number.isInteger(rounded) ? 0 : 1 }
}

export function getYearsExperienceLabel(): string {
  const { value, decimals } = getYearsExperience()
  return `${value.toFixed(decimals)}+`
}
