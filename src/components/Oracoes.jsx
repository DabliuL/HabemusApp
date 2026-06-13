import React, { useState, useEffect } from 'react'
import { Search, ChevronLeft, Type, BookOpen, Heart, Shield, Compass, Sparkles, Clock, Sunrise, Sun, Moon, Plus, Trash2, Check, CheckSquare, Square, X, Calendar } from 'lucide-react'
import ViaSacra from './ViaSacra'

// Banco de dados de orações católicas
const PRAYER_DATABASE = [
  // Categoria: Orações Diárias
  {
    id: 'sinal-cruz',
    title: 'Sinal da Cruz',
    category: 'diarias',
    categoryLabel: 'Orações Diárias',
    subtitle: 'Oração de proteção inicial de todo católico',
    text: 'Pelo sinal da Santa Cruz, livrai-nos, Deus, nosso Senhor, dos nossos inimigos.\n\nEm nome do Pai, e do Filho, e do Espírito Santo. Amém.'
  },
  {
    id: 'pai-nosso',
    title: 'Pai Nosso',
    category: 'diarias',
    categoryLabel: 'Orações Diárias',
    subtitle: 'A Oração do Senhor, ensinada por Jesus',
    text: 'Pai nosso, que estais nos céus, santificado seja o vosso nome;\nvenha a nós o vosso reino, seja feita a vossa vontade, assim na terra como no céu.\n\nO pão nosso de cada dia nos dai hoje; perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido; e não nos deixeis cair em tentação, mas livrai-nos do mal.\n\nAmém.'
  },
  {
    id: 'ave-maria',
    title: 'Ave Maria',
    category: 'diarias',
    categoryLabel: 'Orações Diárias',
    subtitle: 'A saudação angélica a Nossa Senhora',
    text: 'Ave Maria, cheia de graça, o Senhor é convosco, bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus.\n\nSanta Maria, Mãe de Deus, rogai por nós, pecadores, agora e na hora da nossa morte.\n\nAmém.'
  },
  {
    id: 'gloria-pai',
    title: 'Glória ao Pai',
    category: 'diarias',
    categoryLabel: 'Orações Diárias',
    subtitle: 'Doxologia menor de adoração à Trindade',
    text: 'Glória ao Pai, e ao Filho, e ao Espírito Santo.\nComo era no princípio, agora e sempre.\n\nAmém.'
  },
  {
    id: 'creio',
    title: 'Creio em Deus Pai',
    category: 'diarias',
    categoryLabel: 'Orações Diárias',
    subtitle: 'O Símbolo dos Apóstolos',
    text: 'Creio em Deus Pai Todo-Poderoso, Criador do céu e da terra; e em Jesus Cristo, seu único Filho, nosso Senhor; que foi concebido pelo poder do Espírito Santo; nasceu da Virgem Maria, padeceu sob Pôncio Pilatos, foi crucificado, morto e sepultado; desceu à mansão dos mortos; ressucitou ao terceiro dia; subiu aos céus, está sentado à direita de Deus Pai Todo-Poderoso, donde há de vir a julgar os vivos e os mortos.\n\nCreio no Espírito Santo, na Santa Igreja Católica, na comunhão dos Santos, na remissão dos pecados, na ressurreição da carne, na vida eterna.\n\nAmém.'
  },
  {
    id: 'salve-rainha',
    title: 'Salve Rainha',
    category: 'marianas',
    categoryLabel: 'Orações Marianas',
    subtitle: 'Súplica tradicional à Mãe de Deus',
    text: 'Salve, Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve! A vós bradamos, os degredados filhos de Eva. A vós suspiramos, gemendo e chorando neste vale de lágrimas. Eia, pois, advogada nossa, esses vossos olhos misericordiosos a nós volvei.\n\nE depois deste desterro, mostrai-nos Jesus, bendito fruto do vosso ventre. Ó clemente, ó piedosa, ó doce sempre Virgem Maria.\n\nRogai por nós, Santa Mãe de Deus, para que sejamos dignos das promessas de Cristo. Amém.'
  },
  {
    id: 'santo-anjo',
    title: 'Santo Anjo do Senhor',
    category: 'diarias',
    categoryLabel: 'Orações Diárias',
    subtitle: 'Oração ao anjo da guarda pessoal',
    text: 'Santo Anjo do Senhor, meu zeloso guardador, se a ti me confiou a piedade divina, sempre me rege, me guarde, me governe, me ilumine.\n\nAmém.'
  },
  {
    id: 'ato-contricao',
    title: 'Ato de Contrição',
    category: 'diarias',
    categoryLabel: 'Orações Diárias',
    subtitle: 'Oração de arrependimento e propósito',
    text: 'Senhor meu, Jesus Cristo, Deus e homem verdadeiro, Criador e Redentor meu: por serdes Vós quem sois, sumamente bom e digno de ser amado sobre todas as coisas, e porque Vos amo e Vos estimo, pesa-me, Senhor, de todo o meu coração, de Vos ter ofendido.\n\nPesa-me também de ter perdido o Céu e merecido o Inferno.\nMas proponho firmemente, ajudado com os auxílios da Vossa divina graça, emendar-me e nunca mais Vos tornar a ofender. Espero alcançar o perdão de minhas culpas, pela Vossa infinita misericórdia.\n\nAmém.'
  },
  // Categoria: Marianas
  {
    id: 'consagracao-nossa-senhora',
    title: 'Consagração a Nossa Senhora',
    category: 'marianas',
    categoryLabel: 'Orações Marianas',
    subtitle: 'Consagração pessoal diária a Maria Santíssima',
    text: 'Ó minha Senhora, ó minha Mãe, eu me ofereço todo a vós e, em prova da minha devoção para convosco, vos consagro neste dia os meus olhos, os meus ouvidos, a minha boca, o meu coração e todo o meu ser.\n\nE porque assim sou vosso, ó incomparável Mãe, guardai-me e defendei-me como coisa e propriedade vossa.\n\nAmém.'
  },
  {
    id: 'lembrai-vos',
    title: 'Lembrai-vos (Memorare)',
    category: 'marianas',
    categoryLabel: 'Orações Marianas',
    subtitle: 'Poderosa súplica de São Bernardo à Virgem Maria',
    text: 'Lembrai-vos, ó puríssima Virgem Maria, que nunca se ouviu dizer que algum daqueles que recorreu à vossa proteção, implorou a vossa assistência e clamou pelo vosso socorro tenha sido por vós desamparado.\n\nAnimado eu, pois, de igual confiança, a vós, ó Virgem das virgens, como a Mãe recorro; de vós me aproximo e, gemendo sob o peso dos meus pecados, me prostro aos vossos pés.\n\nNão desprezeis as minhas súplicas, ó Mãe do Verbo encarnado, mas escutai-as propícia e alcançai-me o que vos peço.\n\nAmém.'
  },
  {
    id: 'magnificat',
    title: 'Magnificat',
    category: 'marianas',
    categoryLabel: 'Orações Marianas',
    subtitle: 'O canto de Maria ao visitar sua prima Isabel',
    text: 'Minha alma engrandece o Senhor, e o meu espírito se alegra em Deus, meu Salvador, porque olhou para a humildade de sua serva. Doravante todas as gerações me chamarão bem-aventurada, porque o Todo-Poderoso realizou em mim grandes coisas. Santo é o seu nome!\n\nSeu amor se estende de geração em geração sobre aqueles que o temem. Demonstrou a força de seu braço, dispersou os soberbos. Derrubou os poderosos de seus tronos e elevou os humildes. Saciou de bens os famintos e despediu os ricos de mãos vazias.\n\nAcolheu Israel, seu servo, lembrando-se de sua misericórdia, conforme prometera a nossos pais, em favor de Abraão e de sua descendência, para sempre.\n\nGlória ao Pai...'
  },
  // Categoria: Devocionais e Santos
  {
    id: 'sao-miguel',
    title: 'Oração a São Miguel Arcanjo',
    category: 'devocionais',
    categoryLabel: 'Devocionais e Santos',
    subtitle: 'Oração escrita pelo Papa Leão XIII contra as forças do mal',
    text: 'São Miguel Arcanjo, defendei-nos no combate, sede o nosso refúgio contra as maldades e ciladas do demônio. Ordene-lhe Deus, instantemente o pedimos, e vós, príncipe da milícia celeste, pelo divino poder, precipitai no inferno a Satanás e a todos os espíritos malignos, que andam pelo mundo para perder as almas.\n\nAmém.'
  },
  {
    id: 'alma-cristo',
    title: 'Alma de Cristo (Anima Christi)',
    category: 'devocionais',
    categoryLabel: 'Devocionais e Santos',
    subtitle: 'Oração Eucarística de profunda união com Jesus',
    text: 'Alma de Cristo, santificai-me.\nCorpo de Cristo, salvai-me.\nSangue de Cristo, inebriai-me.\nÁgua do lado de Cristo, lavai-me.\nPaixão de Cristo, confortai-me.\nÓ bom Jesus, ouvi-me.\nDentro de Vossas chagas, escondei-me.\nNão permitais que me separe de Vós.\nDo espírito maligno, defendei-me.\nNa hora da minha morte, chamai-me.\nE mandai-me ir para Vós,\nPara que Vos louve com os Vossos Santos,\nPelos séculos dos séculos.\n\nAmém.'
  },
  {
    id: 'sao-francisco',
    title: 'Oração de São Francisco',
    category: 'devocionais',
    categoryLabel: 'Devocionais e Santos',
    subtitle: 'Oração pela paz e desapego',
    text: 'Senhor, fazei-me instrumento de vossa paz.\nOnde houver ódio, que eu leve o amor;\nOnde houver ofensa, que eu leve o perdão;\nOnde houver discórdia, que eu leve a união;\nOnde houver dúvida, que eu leve a fé;\nOnde houver erro, que eu leve a verdade;\nOnde houver desespero, que eu leve a esperança;\nOnde houver tristeza, que eu leve a alegria;\nOnde houver trevas, que eu leve a luz.\n\nÓ Mestre, fazei que eu procure mais\nConsolar, que ser consolado;\nCompreender, que ser compreendido;\nAmar, que ser amado.\nPois é dando que se recebe,\nÉ perdoando que se é perdoado,\nE é morrendo que se nasce para a vida eterna.\n\nAmém.'
  },
  // Categoria: Espirito Santo
  {
    id: 'vinde-espirito-santo',
    title: 'Vinde, Espírito Santo',
    category: 'espirito-santo',
    categoryLabel: 'Espírito Santo',
    subtitle: 'Súplica tradicional de efusão do Espírito Santo',
    text: 'Vinde, Espírito Santo, enchei os corações dos vossos fiéis e acendei neles o fogo do vosso amor. Enviai o vosso Espírito e tudo será criado, e renovareis a face da terra.\n\nOremos: Ó Deus, que instruístes os corações dos vossos fiéis com a luz do Espírito Santo, fazei que apreciemos retamente todas as coisas segundo o mesmo Espírito e gozemos sempre da sua consolação. Por Cristo, Senhor nosso.\n\nAmém.'
  }
]

const categoryIcons = {
  diarias: BookOpen,
  marianas: Heart,
  devocionais: Compass,
  'espirito-santo': Sparkles,
}

export default function Oracoes({ activeTab: externalActiveTab, setActiveTab: externalSetActiveTab }) {
  const [localActiveTab, setLocalActiveTab] = useState('catalogo')
  const activeMainTab = externalActiveTab || localActiveTab
  const setActiveMainTab = externalSetActiveTab || setLocalActiveTab
  
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('todas')
  const [selectedPrayer, setSelectedPrayer] = useState(null)
  const [fontSize, setFontSize] = useState('base') // 'sm', 'base', 'lg', 'xl', '2xl'
  
  // Estados para o Plano de Orações
  const [plan, setPlan] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false)
  const [newPlanItem, setNewPlanItem] = useState({
    prayerId: '',
    title: '',
    period: 'manha',
    time: ''
  })

  // Carregar Plano do localStorage
  useEffect(() => {
    const savedPlan = localStorage.getItem('habemus_prayer_plan')
    if (savedPlan) {
      try {
        setPlan(JSON.parse(savedPlan))
      } catch (e) {
        console.error(e)
      }
    }
  }, [])

  const savePlan = (updatedPlan) => {
    setPlan(updatedPlan)
    localStorage.setItem('habemus_prayer_plan', JSON.stringify(updatedPlan))
  }

  const fontSizeClasses = {
    sm: 'text-xs md:text-sm leading-relaxed',
    base: 'text-sm md:text-base leading-relaxed',
    lg: 'text-base md:text-lg leading-relaxed',
    xl: 'text-lg md:text-xl leading-relaxed',
    '2xl': 'text-xl md:text-2xl leading-relaxed',
  }

  // Filtragem do catálogo
  const filteredPrayers = PRAYER_DATABASE.filter((prayer) => {
    const matchesSearch =
      prayer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prayer.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prayer.text.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === 'todas' || prayer.category === activeCategory
    return matchesSearch && matchesCategory
  })

  // Adicionar Oração ao Plano
  const handleAddToPlan = (e) => {
    e.preventDefault()
    
    let itemTitle = newPlanItem.title.trim()
    if (newPlanItem.prayerId) {
      const selected = PRAYER_DATABASE.find(p => p.id === newPlanItem.prayerId)
      if (selected) itemTitle = selected.title
    }

    if (!itemTitle) {
      alert('Por favor, selecione uma oração ou escreva um título personalizado.')
      return
    }

    const newItem = {
      id: Date.now().toString(),
      prayerId: newPlanItem.prayerId || null,
      title: itemTitle,
      period: newPlanItem.period,
      time: newPlanItem.time || '--:--',
      completed: false
    }

    const updatedPlan = [...plan, newItem].sort((a, b) => a.time.localeCompare(b.time))
    savePlan(updatedPlan)
    
    // Reset e fechar
    setNewPlanItem({ prayerId: '', title: '', period: 'manha', time: '' })
    setIsModalOpen(false)
    setIsQuickAddOpen(false)
  }

  // Remover Oração do Plano
  const handleRemoveFromPlan = (id) => {
    const updatedPlan = plan.filter(item => item.id !== id)
    savePlan(updatedPlan)
  }

  // Marcar/Desmarcar como rezado
  const handleToggleCompleted = (id) => {
    const updatedPlan = plan.map(item => {
      if (item.id === id) {
        return { ...item, completed: !item.completed }
      }
      return item
    })
    savePlan(updatedPlan)
  }

  // Limpar progresso diário (desmarcar todos)
  const handleResetProgress = () => {
    if (window.confirm('Deseja reiniciar suas marcações de oração de hoje?')) {
      const updatedPlan = plan.map(item => ({ ...item, completed: false }))
      savePlan(updatedPlan)
    }
  }

  // Abrir uma oração a partir do plano
  const handleOpenFromPlan = (prayerId) => {
    if (!prayerId) return
    const prayer = PRAYER_DATABASE.find(p => p.id === prayerId)
    if (prayer) {
      setSelectedPrayer(prayer)
      setActiveMainTab('catalogo')
    }
  }

  // Renderização da Oração Individual (Modo Leitura)
  if (selectedPrayer) {
    return (
      <div className="space-y-6">
        {/* Topo do Modo de Leitura */}
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={() => setSelectedPrayer(null)}
            className="flex items-center gap-1.5 px-3 py-2 border border-zinc-800 hover:bg-zinc-800 rounded-xl text-zinc-300 transition-all font-sans text-xs font-semibold cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 text-gold" />
            <span>Voltar</span>
          </button>

          {/* Atalho Rápido para Adicionar ao Plano */}
          <button
            onClick={() => {
              setNewPlanItem(prev => ({ ...prev, prayerId: selectedPrayer.id }))
              setIsQuickAddOpen(true)
            }}
            className="bg-gold/15 border border-gold/30 hover:bg-gold/25 text-gold px-3 py-2 rounded-xl transition-all font-sans text-xs font-semibold cursor-pointer"
          >
            + Adicionar ao Plano
          </button>

          {/* Ajuste de Fonte */}
          <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg p-1">
            <Type className="w-4 h-4 text-zinc-400 ml-2" />
            <button
              onClick={() => setFontSize('base')}
              className={`px-2 py-0.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${fontSize === 'base' ? 'bg-gold text-slate-950' : 'text-zinc-400 hover:text-zinc-200'}`}
            >
              A
            </button>
            <button
              onClick={() => setFontSize('lg')}
              className={`px-2 py-0.5 text-sm font-semibold rounded-md transition-colors cursor-pointer ${fontSize === 'lg' ? 'bg-gold text-slate-950' : 'text-zinc-400 hover:text-zinc-200'}`}
            >
              A+
            </button>
            <button
              onClick={() => setFontSize('xl')}
              className={`px-2 py-0.5 text-base font-semibold rounded-md transition-colors cursor-pointer ${fontSize === 'xl' ? 'bg-gold text-slate-950' : 'text-zinc-400 hover:text-zinc-200'}`}
            >
              A++
            </button>
          </div>
        </div>

        {/* Card de Oração */}
        <div className="glass-panel p-6 md:p-8 rounded-2xl border border-gold/10 space-y-4">
          <div className="border-b border-zinc-900 pb-4">
            <span className="text-[10px] bg-gold/10 text-gold border border-gold/20 font-bold px-2 py-0.5 rounded-full font-sans uppercase">
              {selectedPrayer.categoryLabel}
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-zinc-100 mt-2">
              {selectedPrayer.title}
            </h2>
            <p className="text-zinc-400 text-xs md:text-sm italic mt-1 font-sans">
              {selectedPrayer.subtitle}
            </p>
          </div>

          <p className={`${fontSizeClasses[fontSize]} text-zinc-300 text-justify whitespace-pre-line leading-loose select-text font-sans p-2`}>
            {selectedPrayer.text}
          </p>
        </div>

        {/* Modal Rápido de Adição ao Plano */}
        {isQuickAddOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
            <div className="glass-panel w-full max-w-md p-6 rounded-3xl border border-zinc-850 space-y-4">
              <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                <h3 className="font-serif font-bold text-slate-100 text-base">Adicionar ao Plano</h3>
                <button onClick={() => setIsQuickAddOpen(false)} className="p-1 hover:bg-zinc-800 rounded-lg text-zinc-400"><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={handleAddToPlan} className="space-y-4 font-sans text-sm">
                <div className="space-y-1">
                  <span className="text-xs text-zinc-400 font-bold">Oração Selecionada:</span>
                  <p className="text-gold font-bold">{selectedPrayer.title}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-zinc-400 font-bold">Período do Dia</label>
                  <select
                    value={newPlanItem.period}
                    onChange={(e) => setNewPlanItem(prev => ({ ...prev, period: e.target.value }))}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-200 focus:outline-none focus:border-gold/50"
                  >
                    <option value="manha">🌅 Manhã</option>
                    <option value="tarde">☀️ Tarde</option>
                    <option value="noite">🌙 Noite</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-zinc-400 font-bold">Horário (Opcional)</label>
                  <input
                    type="time"
                    value={newPlanItem.time}
                    onChange={(e) => setNewPlanItem(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-200 focus:outline-none focus:border-gold/50"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsQuickAddOpen(false)}
                    className="flex-1 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-bold rounded-xl"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-gold hover:bg-gold-light text-slate-950 font-bold rounded-xl"
                  >
                    Confirmar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Abas de Entrada Principais */}
      <div className="flex border-b border-zinc-800">
        <button
          onClick={() => setActiveMainTab('catalogo')}
          className={`flex-1 py-3 text-center font-serif text-sm font-semibold transition-all cursor-pointer ${
            activeMainTab === 'catalogo' ? 'text-gold border-b-2 border-gold font-bold' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Índice
        </button>
        
        <button
          onClick={() => setActiveMainTab('viasacra')}
          className={`flex-1 py-3 text-center font-serif text-sm font-semibold transition-all cursor-pointer ${
            activeMainTab === 'viasacra' ? 'text-gold border-b-2 border-gold font-bold' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Via Sacra
        </button>

        <button
          onClick={() => setActiveMainTab('plano')}
          className={`flex-1 py-3 text-center font-serif text-sm font-semibold transition-all cursor-pointer relative ${
            activeMainTab === 'plano' ? 'text-gold border-b-2 border-gold font-bold' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <span>Plano de Oração</span>
          {plan.some(p => !p.completed) && (
            <span className="absolute top-2 right-4 bg-gold text-slate-950 text-[9px] font-bold px-1.5 py-0.5 rounded-full">
              {plan.filter(p => !p.completed).length}
            </span>
          )}
        </button>
      </div>

      {/* RENDER TAB: CATÁLOGO DE ORAÇÕES */}
      {activeMainTab === 'catalogo' && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-gold tracking-wide">
              Índice de Orações
            </h1>
            <p className="text-zinc-400 font-sans text-xs md:text-sm">
              Busque e selecione orações católicas tradicionais
            </p>
          </div>

          {/* Caixa de Busca */}
          <div className="relative">
            <Search className="w-5 h-5 text-zinc-550 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Procure por título, palavras-chave ou texto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-2xl text-zinc-100 placeholder-zinc-500 font-sans text-sm focus:outline-none focus:border-gold/50 transition-colors"
            />
          </div>

          {/* Categorias (Filtros) */}
          <div className="flex flex-wrap gap-2">
            {['todas', 'diarias', 'marianas', 'devocionais', 'espirito-santo'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-sans font-medium border transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-gold/15 border-gold text-gold font-semibold'
                    : 'bg-zinc-900/40 border-zinc-800/80 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>

          {/* Lista de Orações Filtradas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredPrayers.length > 0 ? (
              filteredPrayers.map((prayer) => {
                const Icon = categoryIcons[prayer.category] || BookOpen
                return (
                  <button
                    key={prayer.id}
                    onClick={() => setSelectedPrayer(prayer)}
                    className="glass-panel p-5 rounded-2xl flex items-start gap-4 text-left hover:scale-[1.01] hover:border-gold/30 transition-all cursor-pointer group"
                  >
                    <div className="p-3 bg-zinc-900 rounded-xl text-gold group-hover:bg-gold/10 transition-colors shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-serif font-bold text-zinc-100 text-base group-hover:text-gold transition-colors">
                        {prayer.title}
                      </h3>
                      <p className="text-zinc-400 text-xs font-sans leading-relaxed">
                        {prayer.subtitle}
                      </p>
                    </div>
                  </button>
                )
              })
            ) : (
              <div className="col-span-full glass-panel p-12 text-center text-zinc-500 font-sans text-sm">
                Nenhuma oração encontrada com os filtros selecionados.
              </div>
            )}
          </div>
        </div>
      )}

      {/* RENDER TAB: MEU PLANO DE ORAÇÃO */}
      {activeMainTab === 'plano' && (
        <div className="space-y-6 animate-fade-in">
          {/* Cabeçalho */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-gold tracking-wide">
                Plano Diário de Oração
              </h1>
              <p className="text-zinc-400 font-sans text-xs md:text-sm">
                Organize sua rotina devocional e marque seu progresso diário
              </p>
            </div>

            <div className="flex gap-2">
              {plan.length > 0 && (
                <button
                  onClick={handleResetProgress}
                  className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 px-3 py-2 rounded-xl transition-all font-sans text-xs font-semibold cursor-pointer"
                >
                  Reiniciar Progresso
                </button>
              )}
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-gold hover:bg-gold-light text-slate-950 px-4 py-2 rounded-xl transition-all font-sans text-xs font-bold flex items-center gap-1 cursor-pointer shadow-lg shadow-gold/10"
              >
                <Plus className="w-4 h-4" />
                <span>Adicionar Oração</span>
              </button>
            </div>
          </div>

          {/* Painel de Progresso */}
          {plan.length > 0 && (
            <div className="glass-panel p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-l-4 border-l-gold">
              <div className="space-y-1">
                <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider font-sans">Progresso de Hoje</span>
                <p className="text-sm font-semibold text-zinc-200">
                  Você concluiu {plan.filter(p => p.completed).length} de {plan.length} orações planejadas.
                </p>
              </div>
              <div className="w-full sm:w-48 bg-zinc-900 rounded-full h-2 overflow-hidden shrink-0 border border-zinc-800">
                <div
                  className="bg-gold h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.round((plan.filter(p => p.completed).length / plan.length) * 100)}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Listagem por períodos do dia */}
          {plan.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Manhã */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b border-zinc-900 pb-2 text-amber-500">
                  <Sunrise className="w-5 h-5" />
                  <h3 className="font-serif font-bold text-sm tracking-wider uppercase">🌅 Manhã</h3>
                </div>
                <div className="space-y-2">
                  {plan.filter(p => p.period === 'manha').length > 0 ? (
                    plan.filter(p => p.period === 'manha').map((item) => (
                      <div
                        key={item.id}
                        className={`glass-panel p-3.5 rounded-xl border flex flex-col gap-2 transition-all ${
                          item.completed ? 'opacity-40 border-zinc-900' : 'border-zinc-850 hover:border-gold/30'
                        }`}
                      >
                        <div className="flex justify-between items-start gap-2">
                          <button
                            onClick={() => handleToggleCompleted(item.id)}
                            className="text-gold shrink-0 cursor-pointer pt-0.5"
                          >
                            {item.completed ? (
                              <CheckSquare className="w-4 h-4 text-gold" />
                            ) : (
                              <Square className="w-4 h-4 text-zinc-600" />
                            )}
                          </button>

                          <div className="flex-1 min-w-0">
                            <span
                              onClick={() => item.prayerId && handleOpenFromPlan(item.prayerId)}
                              className={`text-xs font-bold leading-tight block break-words ${
                                item.prayerId ? 'hover:text-gold hover:underline cursor-pointer' : 'text-zinc-200'
                              } ${item.completed ? 'line-through text-zinc-500' : 'text-zinc-100'}`}
                            >
                              {item.title}
                            </span>
                            <span className="text-[10px] text-zinc-500 flex items-center gap-1 mt-1 font-sans">
                              <Clock className="w-3 h-3 text-gold/60" />
                              {item.time}
                            </span>
                          </div>

                          <button
                            onClick={() => handleRemoveFromPlan(item.id)}
                            className="text-zinc-600 hover:text-red-400 p-0.5 rounded cursor-pointer shrink-0"
                            title="Remover do plano"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center py-6 text-xs text-zinc-650 font-sans italic">Nenhuma oração agendada.</p>
                  )}
                </div>
              </div>

              {/* Tarde */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b border-zinc-900 pb-2 text-gold">
                  <Sun className="w-5 h-5" />
                  <h3 className="font-serif font-bold text-sm tracking-wider uppercase">☀️ Tarde</h3>
                </div>
                <div className="space-y-2">
                  {plan.filter(p => p.period === 'tarde').length > 0 ? (
                    plan.filter(p => p.period === 'tarde').map((item) => (
                      <div
                        key={item.id}
                        className={`glass-panel p-3.5 rounded-xl border flex flex-col gap-2 transition-all ${
                          item.completed ? 'opacity-40 border-zinc-900' : 'border-zinc-850 hover:border-gold/30'
                        }`}
                      >
                        <div className="flex justify-between items-start gap-2">
                          <button
                            onClick={() => handleToggleCompleted(item.id)}
                            className="text-gold shrink-0 cursor-pointer pt-0.5"
                          >
                            {item.completed ? (
                              <CheckSquare className="w-4 h-4 text-gold" />
                            ) : (
                              <Square className="w-4 h-4 text-zinc-600" />
                            )}
                          </button>

                          <div className="flex-1 min-w-0">
                            <span
                              onClick={() => item.prayerId && handleOpenFromPlan(item.prayerId)}
                              className={`text-xs font-bold leading-tight block break-words ${
                                item.prayerId ? 'hover:text-gold hover:underline cursor-pointer' : 'text-zinc-200'
                              } ${item.completed ? 'line-through text-zinc-500' : 'text-zinc-100'}`}
                            >
                              {item.title}
                            </span>
                            <span className="text-[10px] text-zinc-500 flex items-center gap-1 mt-1 font-sans">
                              <Clock className="w-3 h-3 text-gold/60" />
                              {item.time}
                            </span>
                          </div>

                          <button
                            onClick={() => handleRemoveFromPlan(item.id)}
                            className="text-zinc-600 hover:text-red-400 p-0.5 rounded cursor-pointer shrink-0"
                            title="Remover do plano"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center py-6 text-xs text-zinc-650 font-sans italic">Nenhuma oração agendada.</p>
                  )}
                </div>
              </div>

              {/* Noite */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b border-zinc-900 pb-2 text-violet-400">
                  <Moon className="w-5 h-5" />
                  <h3 className="font-serif font-bold text-sm tracking-wider uppercase">🌙 Noite</h3>
                </div>
                <div className="space-y-2">
                  {plan.filter(p => p.period === 'noite').length > 0 ? (
                    plan.filter(p => p.period === 'noite').map((item) => (
                      <div
                        key={item.id}
                        className={`glass-panel p-3.5 rounded-xl border flex flex-col gap-2 transition-all ${
                          item.completed ? 'opacity-40 border-zinc-900' : 'border-zinc-850 hover:border-gold/30'
                        }`}
                      >
                        <div className="flex justify-between items-start gap-2">
                          <button
                            onClick={() => handleToggleCompleted(item.id)}
                            className="text-gold shrink-0 cursor-pointer pt-0.5"
                          >
                            {item.completed ? (
                              <CheckSquare className="w-4 h-4 text-gold" />
                            ) : (
                              <Square className="w-4 h-4 text-zinc-600" />
                            )}
                          </button>

                          <div className="flex-1 min-w-0">
                            <span
                              onClick={() => item.prayerId && handleOpenFromPlan(item.prayerId)}
                              className={`text-xs font-bold leading-tight block break-words ${
                                item.prayerId ? 'hover:text-gold hover:underline cursor-pointer' : 'text-zinc-200'
                              } ${item.completed ? 'line-through text-zinc-500' : 'text-zinc-100'}`}
                            >
                              {item.title}
                            </span>
                            <span className="text-[10px] text-zinc-500 flex items-center gap-1 mt-1 font-sans">
                              <Clock className="w-3 h-3 text-gold/60" />
                              {item.time}
                            </span>
                          </div>

                          <button
                            onClick={() => handleRemoveFromPlan(item.id)}
                            className="text-zinc-600 hover:text-red-400 p-0.5 rounded cursor-pointer shrink-0"
                            title="Remover do plano"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center py-6 text-xs text-zinc-650 font-sans italic">Nenhuma oração agendada.</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-panel p-8 text-center text-zinc-500 font-sans text-sm">
              Seu plano de orações está vazio. Adicione orações do catálogo ou crie itens personalizados acima.
            </div>
          )}
        </div>
      )}

      {/* RENDER TAB: VIA SACRA */}
      {activeMainTab === 'viasacra' && (
        <div className="space-y-6 animate-fade-in">
          <ViaSacra />
        </div>
      )}

      {/* MODAL GERAL DE ADIÇÃO AO PLANO */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="glass-panel w-full max-w-md p-6 rounded-3xl border border-zinc-850 space-y-4">
            <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
              <h3 className="font-serif font-bold text-slate-100 text-base">Novo Item no Plano</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-zinc-800 rounded-lg text-zinc-400 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddToPlan} className="space-y-4 font-sans text-sm">
              <div className="space-y-1">
                <label className="text-xs text-zinc-400 font-bold block">Selecione uma Oração do App</label>
                <select
                  value={newPlanItem.prayerId}
                  onChange={(e) => setNewPlanItem(prev => ({ ...prev, prayerId: e.target.value, title: '' }))}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-200 focus:outline-none focus:border-gold/50"
                >
                  <option value="">-- Oração Personalizada (Escrever título abaixo) --</option>
                  {PRAYER_DATABASE.map(p => (
                    <option key={p.id} value={p.id}>{p.title}</option>
                  ))}
                </select>
              </div>

              {!newPlanItem.prayerId && (
                <div className="space-y-1">
                  <label className="text-xs text-zinc-400 font-bold block">Título Personalizado</label>
                  <input
                    type="text"
                    placeholder="Ex: Rezado do Terço, Leitura da Bíblia..."
                    value={newPlanItem.title}
                    onChange={(e) => setNewPlanItem(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-200 placeholder-zinc-550 focus:outline-none focus:border-gold/50"
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs text-zinc-400 font-bold block">Período do Dia</label>
                <select
                  value={newPlanItem.period}
                  onChange={(e) => setNewPlanItem(prev => ({ ...prev, period: e.target.value }))}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-200 focus:outline-none focus:border-gold/50"
                >
                  <option value="manha">🌅 Manhã</option>
                  <option value="tarde">☀️ Tarde</option>
                  <option value="noite">🌙 Noite</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-zinc-400 font-bold block">Horário Sugerido (Opcional)</label>
                <input
                  type="time"
                  value={newPlanItem.time}
                  onChange={(e) => setNewPlanItem(prev => ({ ...prev, time: e.target.value }))}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-200 focus:outline-none focus:border-gold/50"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-bold rounded-xl cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-gold hover:bg-gold-light text-slate-950 font-bold rounded-xl cursor-pointer"
                >
                  Adicionar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
