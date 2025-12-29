import { MoonStar, Sun } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { useThemeMode } from '@/hooks/useThemeMode'

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeMode()

  return (
    <Button
      aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
      variant="ghost"
      className="h-10 w-10 border-white/10 p-0 text-white/70 hover:text-white"
      onClick={toggleTheme}
      type="button"
    >
      {theme === 'dark' ? <Sun className="h-5 w-5" /> : <MoonStar className="h-5 w-5" />}
    </Button>
  )
}
