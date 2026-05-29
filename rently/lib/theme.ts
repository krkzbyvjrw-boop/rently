export const THEME_KEY = 'renly_theme'

export type Theme = 'light' | 'dark'

export function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light'
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement
  if (theme === 'dark') {
    root.setAttribute('data-theme', 'dark')
  } else {
    root.removeAttribute('data-theme')
  }
}

export function storeTheme(theme: Theme) {
  localStorage.setItem(THEME_KEY, theme)
}
