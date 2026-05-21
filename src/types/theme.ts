// src/types/theme.ts
export type ThemeMode = 'light' | 'dark'

export interface ColorScheme {
  primary: string
  primaryHover: string
  primaryActive: string
  danger: string
  dangerHover: string
  dangerActive: string
  warning: string
  warningHover: string
  warningActive: string
  success: string
  successHover: string
  successActive: string
  bg: string
  bgOverlay: string
  bgPage: string
  textPrimary: string
  textRegular: string
  textSecondary: string
  textPlaceholder: string
  textDisabled: string
  border: string
  borderLight: string
  borderLighter: string
  fillColor: string
}
