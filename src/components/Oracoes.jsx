import React, { useState } from 'react'
import { Search, ChevronLeft, Type, BookOpen, Heart, Shield, Compass, Sparkles } from 'lucide-react'

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
    text: 'Senhor, fazei-me instrumento de vossa paz.\nOnde houver ódio, que eu leve o amor;\nOnde houver ofensa, que eu leve o perdão;\nOnde houver discórdia, que eu leve a união;\nOnde houver dúvida, que eu leve a foi;\nOnde houver erro, que eu leve a verdade;\nOnde houver desespero, que eu leve a esperança;\nOnde houver tristeza, que eu leve a alegria;\nOnde houver trevas, que eu leve a luz.\n\nÓ Mestre, fazei que eu procure mais\nConsolar, que ser consolado;\nCompreender, que ser compreendido;\nAmar, que ser amado.\nPois é dando que se recebe,\nÉ perdoando que se é perdoado,\nE é morrendo que se nasce para a vida eterna.\n\nAmém.'
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

export default function Oracoes() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('todas')
  const [selectedPrayer, setSelectedPrayer] = useState(null)
  const [fontSize, setFontSize] = useState('base') // 'sm', 'base', 'lg', 'xl', '2xl'

  const fontSizeClasses = {
    sm: 'text-xs md:text-sm leading-relaxed',
    base: 'text-sm md:text-base leading-relaxed',
    lg: 'text-base md:text-lg leading-relaxed',
    xl: 'text-lg md:text-xl leading-relaxed',
    '2xl': 'text-xl md:text-2xl leading-relaxed',
  }

  // Filtragem
  const filteredPrayers = PRAYER_DATABASE.filter((prayer) => {
    const matchesSearch =
      prayer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prayer.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prayer.text.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === 'todas' || prayer.category === activeCategory
    return matchesSearch && matchesCategory
  })

  // Seção de Leitura
  if (selectedPrayer) {
    return (
      <div className="space-y-6">
        {/* Topo do Modo de Leitura */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedPrayer(null)}
            className="flex items-center gap-1.5 px-3 py-2 border border-zinc-800 hover:bg-zinc-800 rounded-xl text-zinc-300 transition-all font-sans text-xs font-semibold cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 text-gold" />
            <span>Voltar</span>
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
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
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
        <button
          onClick={() => setActiveCategory('todas')}
          className={`px-3 py-1.5 rounded-xl text-xs font-sans font-medium border transition-all cursor-pointer ${
            activeCategory === 'todas'
              ? 'bg-gold/15 border-gold text-gold font-semibold'
              : 'bg-zinc-900/40 border-zinc-800/80 text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Todas
        </button>
        <button
          onClick={() => setActiveCategory('diarias')}
          className={`px-3 py-1.5 rounded-xl text-xs font-sans font-medium border transition-all cursor-pointer ${
            activeCategory === 'diarias'
              ? 'bg-gold/15 border-gold text-gold font-semibold'
              : 'bg-zinc-900/40 border-zinc-800/80 text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Diárias
        </button>
        <button
          onClick={() => setActiveCategory('marianas')}
          className={`px-3 py-1.5 rounded-xl text-xs font-sans font-medium border transition-all cursor-pointer ${
            activeCategory === 'marianas'
              ? 'bg-gold/15 border-gold text-gold font-semibold'
              : 'bg-zinc-900/40 border-zinc-800/80 text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Marianas
        </button>
        <button
          onClick={() => setActiveCategory('devocionais')}
          className={`px-3 py-1.5 rounded-xl text-xs font-sans font-medium border transition-all cursor-pointer ${
            activeCategory === 'devocionais'
              ? 'bg-gold/15 border-gold text-gold font-semibold'
              : 'bg-zinc-900/40 border-zinc-800/80 text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Devocionais
        </button>
        <button
          onClick={() => setActiveCategory('espirito-santo')}
          className={`px-3 py-1.5 rounded-xl text-xs font-sans font-medium border transition-all cursor-pointer ${
            activeCategory === 'espirito-santo'
              ? 'bg-gold/15 border-gold text-gold font-semibold'
              : 'bg-zinc-900/40 border-zinc-800/80 text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Espírito Santo
        </button>
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
  )
}
