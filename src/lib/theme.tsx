import { useThemeStore } from '@/stores/theme.store'
import React, { useEffect } from 'react'

const Theme = () => {
    const theme = useThemeStore((state) => state.theme)
    useEffect(() => {
    const root = window.document.documentElement
 
    root.classList.remove("light", "dark") // Remove existing theme classes tránh duplicate
    //không làm render app do thay đổi trong root nên react không quản lý được
 
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"
 
      root.classList.add(systemTheme)
      return
    }
 
    root.classList.add(theme)
  }, [theme])
  return null;
}

export default Theme
