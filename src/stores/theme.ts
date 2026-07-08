// src/stores/themeStore.ts
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { ColorScheme, ThemeMode } from '@/types/theme'

const color_schemes: Record<ThemeMode, ColorScheme> = {
  light: {
    primary: '#1d4289',
    primaryHover: '#2a549e',
    primaryActive: '#14315c',
    danger: '#e23636',
    dangerHover: '#ff5e5e',
    dangerActive: '#b11313',
    warning: '#f9a825',
    warningHover: '#fbc02d',
    warningActive: '#f57f17',
    success: '#2e7d32',
    successHover: '#4caf50',
    successActive: '#1b5e20',
    bg: '#fdf8ed',
    bgOverlay: '#ffffff',
    bgPage: '#f5ecd9',
    textPrimary: '#1a1a1a',
    textRegular: '#4a4a4a',
    textLight: '#d8d1c0',
    textSecondary: '#8a8a8a',
    textPlaceholder: '#b8a88c',
    textDisabled: '#d4c9b0',
    border: '#d4c9b0',
    borderLight: '#e8e0d0',
    borderLighter: '#f0ebdf',
    fillColor: '#fff',
  },
  dark: {
    primary: '#4a6db3',
    primaryHover: '#6b8cc9',
    primaryActive: '#2a549e',
    danger: '#ff5e5e',
    dangerHover: '#ff8a8a',
    dangerActive: '#e23636',
    warning: '#fbc02d',
    warningHover: '#fcd462',
    warningActive: '#f9a825',
    success: '#4caf50',
    successHover: '#6ecf70',
    successActive: '#2e7d32',
    bg: '#1a1a2e',
    bgOverlay: '#2d2d44',
    bgPage: '#141428',
    textPrimary: '#ffffff',
    textRegular: '#c0c0c0',
    textLight: '#dadada',
    textSecondary: '#8a8a8a',
    textPlaceholder: '#6a6a8a',
    textDisabled: '#4a4a6a',
    border: '#4a4a6a',
    borderLight: '#3a3a5a',
    borderLighter: '#2a2a4a',
    fillColor: '#4a4a6a',
  },
}

export const useThemeStore = defineStore('theme', () => {
  const current_theme = ref<ThemeMode>('light')

  const colors = computed(() => color_schemes[current_theme.value])

  const is_dark = computed(() => current_theme.value === 'dark')
  const is_light = computed(() => current_theme.value === 'light')

  const setTheme = (theme: ThemeMode) => {
    current_theme.value = theme
    applyThemeToDocument(theme)
    saveToLocalStorage(theme)
  }

  const toggleTheme = () => {
    setTheme(is_dark.value ? 'light' : 'dark')
  }

  const applyThemeToDocument = (theme: ThemeMode) => {
    const root = document.documentElement
    const scheme = color_schemes[theme]

    // Применяем все CSS переменные
    root.style.setProperty('--el-color-primary', scheme.primary)
    root.style.setProperty('--el-color-primary-light-3', scheme.primaryHover)
    root.style.setProperty('--el-color-danger', scheme.danger)
    root.style.setProperty('--el-color-warning', scheme.warning)
    root.style.setProperty('--el-rate-text-color', scheme.warning)
    root.style.setProperty('--el-color-success', scheme.success)
    root.style.setProperty('--el-bg-color', scheme.bgOverlay)
    root.style.setProperty('--el-fill-color-blank', scheme.fillColor)
    root.style.setProperty('--el-bg-color-overlay', scheme.bgOverlay)
    root.style.setProperty('--el-text-color-primary', scheme.textPrimary)
    root.style.setProperty('--el-text-color-light', scheme.textPrimary)
    root.style.setProperty('--el-text-color-regular', scheme.textRegular)
    root.style.setProperty('--el-text-color-secondary', scheme.textSecondary)
    root.style.setProperty('--el-border-color', scheme.border)

    // Tailwind переменные
    root.style.setProperty('--color-primary', scheme.primary)
    root.style.setProperty('--color-primary-hover', scheme.primaryHover)
    root.style.setProperty('--color-primary-active', scheme.primaryActive)
    root.style.setProperty('--color-danger', scheme.danger)
    root.style.setProperty('--color-danger-hover', scheme.dangerHover)
    root.style.setProperty('--color-warning', scheme.warning)
    root.style.setProperty('--color-success', scheme.success)
    root.style.setProperty('--color-bg', scheme.bg)
    root.style.setProperty('--color-bg-overlay', scheme.bgOverlay)
    root.style.setProperty('--color-bg-page', scheme.bgPage)
    root.style.setProperty('--color-text-primary', scheme.textPrimary)
    root.style.setProperty('--color-text-regular', scheme.textRegular)
    root.style.setProperty('--color-text-light', scheme.textLight)
    root.style.setProperty('--color-text-secondary', scheme.textSecondary)
    root.style.setProperty('--color-text-placeholder', scheme.textPlaceholder)
    root.style.setProperty('--color-border', scheme.border)

    root.setAttribute('data-theme', theme)
  }

  const saveToLocalStorage = (theme: ThemeMode) => {
    localStorage.setItem('marvel-theme', theme)
  }

  const loadSavedTheme = () => {
    const saved = localStorage.getItem('marvel-theme') as ThemeMode | null
    if (saved && color_schemes[saved]) {
      setTheme(saved)
    } else {
      const prefers_dark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(prefers_dark ? 'dark' : 'light')
    }
  }

  const initTheme = () => {
    loadSavedTheme()
  }

  return {
    current_theme,
    colors,
    is_dark,
    is_light,
    setTheme,
    toggleTheme,
    initTheme,
  }
})
