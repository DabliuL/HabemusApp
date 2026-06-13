import React, { useState, useEffect } from 'react'
import Layout from './components/Layout'
import Home from './components/Home'
import Liturgia from './components/Liturgia'
import Terco from './components/Terco'
import Oracoes from './components/Oracoes'
import Confissao from './components/Confissao'
import Podcast from './components/Podcast'
import ViaSacra from './components/ViaSacra'

export default function App() {
  const [currentTab, setCurrentTab] = useState('home')
  
  // Controle de deslize para transição de abas
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 })
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 })

  // Scroll para o topo ao trocar de aba (melhoria para mobile)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentTab])

  const handleTouchStart = (e) => {
    // Ignorar deslize se o foco estiver em inputs, textareas ou selects
    const targetTagName = e.target.tagName.toLowerCase()
    if (targetTagName === 'input' || targetTagName === 'textarea' || targetTagName === 'select' || e.target.closest('input') || e.target.closest('textarea')) {
      return
    }
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    })
  }

  const handleTouchMove = (e) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    })
  }

  const handleTouchEnd = () => {
    if (!touchStart.x || !touchEnd.x) return

    const diffX = touchEnd.x - touchStart.x
    const diffY = touchEnd.y - touchStart.y

    // Verifica se foi um deslize horizontal considerável e não uma rolagem vertical
    if (Math.abs(diffX) > 75 && Math.abs(diffX) > Math.abs(diffY) * 2) {
      const TABS_ORDER = ['home', 'liturgia', 'terco', 'viasacra', 'oracoes', 'confissao', 'podcast']
      const currentIndex = TABS_ORDER.indexOf(currentTab)

      if (diffX > 0) {
        // Deslizou da esquerda para a direita -> Aba Anterior
        if (currentIndex > 0) {
          setCurrentTab(TABS_ORDER[currentIndex - 1])
        }
      } else {
        // Deslizou da direita para a esquerda -> Próxima Aba
        if (currentIndex < TABS_ORDER.length - 1) {
          setCurrentTab(TABS_ORDER[currentIndex + 1])
        }
      }
    }

    // Resetar posições
    setTouchStart({ x: 0, y: 0 })
    setTouchEnd({ x: 0, y: 0 })
  }

  const renderContent = () => {
    switch (currentTab) {
      case 'home':
        return <Home setCurrentTab={setCurrentTab} />
      case 'liturgia':
        return <Liturgia />
      case 'terco':
        return <Terco />
      case 'oracoes':
        return <Oracoes />
      case 'viasacra':
        return <ViaSacra />
      case 'confissao':
        return <Confissao />
      case 'podcast':
        return <Podcast />
      default:
        return <Home setCurrentTab={setCurrentTab} />
    }
  }

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="min-h-screen"
    >
      <Layout currentTab={currentTab} setCurrentTab={setCurrentTab}>
        {renderContent()}
      </Layout>
    </div>
  )
}
