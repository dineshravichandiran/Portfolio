/** Continuous tenure at PTC started December 2022 (Cloud Services Associate NOC Engineer). */
const CAREER_START = new Date(2022, 11, 1)

export function getYearsExperience(): { value: number; decimals: number } {
  const years = (Date.now() - CAREER_START.getTime()) / (1000 * 60 * 60 * 24 * 365.25)
  const rounded = Math.floor(years * 2) / 2
  return { value: rounded, decimals: Number.isInteger(rounded) ? 0 : 1 }
}

export function getYearsExperienceLabel(): string {
  const { value, decimals } = getYearsExperience()
  return `${value.toFixed(decimals)}+`
}
