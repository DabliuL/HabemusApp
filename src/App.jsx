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

  // Scroll para o topo ao trocar de aba (melhoria para mobile)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentTab])

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
    <Layout currentTab={currentTab} setCurrentTab={setCurrentTab}>
      {renderContent()}
    </Layout>
  )
}
