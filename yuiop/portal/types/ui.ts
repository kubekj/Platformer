export type ColorMode = 'light' | 'dark' | 'system'

export interface StepConfig {
  label: string
  icon?: string
  status: 'upcoming' | 'current' | 'completed'
}