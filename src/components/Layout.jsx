import React, { useState, useEffect } from 'react'
import { Home, BookOpen, Flame, Heart, Shield, Headphones, ChevronLeft, ChevronRight, Footprints, Sun, Moon } from 'lucide-react'

export default function Layout({ children, currentTab, setCurrentTab }) {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    return localStorage.getItem('habemus_sidebar_collapsed') === 'true'
  })
  
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('habemus_theme') || 'dark'
  })

  useEffect(() => {
    localStorage.setItem('habemus_sidebar_collapsed', isCollapsed)
  }, [isCollapsed])

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light')
    } else {
      document.body.classList.remove('light')
    }
    localStorage.setItem('habemus_theme', theme)
  }, [theme])

  const navItems = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'liturgia', label: 'Liturgia', icon: BookOpen },
    { id: 'terco', label: 'Terço', icon: Flame },
    { id: 'viasacra', label: 'Via Sacra', icon: Footprints },
    { id: 'oracoes', label: 'Orações', icon: Heart },
    { id: 'confissao', label: 'Confissão', icon: Shield },
    { id: 'podcast', label: 'Podcast', icon: Headphones },
  ]

  return (
    <div className={`flex flex-col min-h-screen bg-black text-zinc-100 pb-20 md:pb-0 transition-all duration-300 ${isCollapsed ? 'md:pl-20' : 'md:pl-64'}`}>
      {/* Sidebar para desktop */}
      <aside className={`fixed inset-y-0 left-0 z-20 hidden bg-zinc-950 border-r border-zinc-900 flex-col md:flex transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
        {/* Cabeçalho do Logo */}
        <div className={`flex items-center border-b border-zinc-900 py-5 transition-all duration-300 ${isCollapsed ? 'justify-center px-2' : 'justify-between px-6'}`}>
          <div className="flex items-center gap-3">
            <span className="text-2xl text-gold shrink-0">⛪</span>
            {!isCollapsed && (
              <span className="text-xl font-serif font-bold tracking-wider text-gold animate-fade-in whitespace-nowrap">
                Habemus App
              </span>
            )}
          </div>
          {!isCollapsed && (
            <button
              onClick={() => setIsCollapsed(true)}
              className="p-1 text-zinc-500 hover:text-gold hover:bg-zinc-900 rounded-lg transition cursor-pointer"
              title="Recolher menu"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Botão de Expandir quando recolhido */}
        {isCollapsed && (
          <button
            onClick={() => setIsCollapsed(false)}
            className="mx-auto my-4 p-2 text-zinc-500 hover:text-gold hover:bg-zinc-900 rounded-lg transition cursor-pointer"
            title="Expandir menu"
          >
            <ChevronRight className="w-5 h-5 text-gold" />
          </button>
        )}

        {/* Navegação */}
        <nav className="flex-1 px-4 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = currentTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`w-full flex items-center rounded-xl transition-all duration-200 cursor-pointer ${
                  isCollapsed ? 'justify-center p-3' : 'gap-4 px-4 py-3'
                } ${
                  isActive
                    ? 'bg-gold/15 text-gold border-l-4 border-gold font-medium'
                    : 'text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-100'
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-gold' : 'text-zinc-400'}`} />
                {!isCollapsed && <span className="whitespace-nowrap">{item.label}</span>}
              </button>
            )
          })}
        </nav>

        {/* Rodapé da Sidebar */}
        <div className="p-4 border-t border-zinc-900 flex flex-col gap-3 items-center justify-center font-sans text-xs text-zinc-500">
          <button
            onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
            className="p-2 bg-zinc-900 border border-zinc-850 hover:border-gold/30 hover:text-gold text-zinc-400 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 w-full max-w-[150px]"
            title={theme === 'dark' ? 'Mudar para Modo Claro' : 'Mudar para Modo Escuro'}
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                {!isCollapsed && <span>Modo Claro</span>}
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-violet-400" />
                {!isCollapsed && <span>Modo Escuro</span>}
              </>
            )}
          </button>
          {!isCollapsed && <span>Habemus App v1.0.0</span>}
        </div>
      </aside>

      {/* Header superior para mobile */}
      <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-black/80 backdrop-blur-md border-b border-zinc-900 md:hidden">
        <div className="flex items-center gap-2">
          <span className="text-xl">⛪</span>
          <span className="text-lg font-serif font-bold tracking-wide text-gold">Habemus App</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
            className="p-2 bg-zinc-900/50 border border-zinc-850 hover:border-gold/30 hover:text-gold text-zinc-400 rounded-xl transition-all cursor-pointer flex items-center justify-center"
            title={theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-violet-400" />
            )}
          </button>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gold/10 text-gold border border-gold/20 hidden sm:inline-block">
            Ad maiorem Dei gloriam
          </span>
        </div>
      </header>

      {/* Área de conteúdo principal */}
      <main className="flex-1 p-4 md:p-8 max-w-4xl mx-auto w-full">
        {children}
      </main>

      {/* Tab bar inferior para mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-20 flex justify-around items-center bg-zinc-950/95 backdrop-blur-lg border-t border-zinc-900 px-2 py-2 md:hidden">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className="flex flex-col items-center justify-center flex-1 py-1 text-center cursor-pointer"
            >
              <div
                className={`p-2 rounded-full transition-all duration-200 ${
                  isActive ? 'bg-gold/15 text-gold' : 'text-zinc-400'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span
                className={`text-[10px] mt-0.5 transition-colors duration-200 font-sans ${
                  isActive ? 'text-gold font-medium' : 'text-zinc-400'
                }`}
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}
