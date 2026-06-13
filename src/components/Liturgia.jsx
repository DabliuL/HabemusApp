import React, { useState, useEffect, useRef } from 'react'
import { Calendar, ChevronLeft, ChevronRight, Type, Loader2, RefreshCw } from 'lucide-react'

// Cores litúrgicas
const colorMap = {
  verde: { bg: 'bg-emerald-950/40 text-emerald-400 border-emerald-500/30', label: 'Tempo Comum' },
  vermelho: { bg: 'bg-red-950/40 text-red-400 border-red-500/30', label: 'Mártires / Pentecostes' },
  roxo: { bg: 'bg-violet-950/40 text-violet-400 border-violet-500/30', label: 'Quaresma / Advento' },
  branco: { bg: 'bg-zinc-900/60 text-zinc-100 border-gold/30', label: 'Festas / Solenidades' },
  rosa: { bg: 'bg-pink-950/40 text-pink-400 border-pink-500/30', label: 'Gaudete / Laetare' },
}

export default function Liturgia() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const dateInputRef = useRef(null)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [fontSize, setFontSize] = useState('base') // 'sm', 'base', 'lg', 'xl', '2xl'
  const [activeTab, setActiveTab] = useState('leituras') // 'leituras', 'oracoes'
  const [activeReading, setActiveReading] = useState('primeira') // 'primeira', 'salmo', 'segunda', 'evangelho'

  // Ajuste do tamanho da fonte para leitura
  const fontSizeClasses = {
    sm: 'text-xs md:text-sm leading-relaxed',
    base: 'text-sm md:text-base leading-relaxed',
    lg: 'text-base md:text-lg leading-relaxed',
    xl: 'text-lg md:text-xl leading-relaxed',
    '2xl': 'text-xl md:text-2xl leading-relaxed',
  }

  const fetchLiturgia = async (date) => {
    setLoading(true)
    setError(null)
    const dia = date.getDate()
    const mes = date.getMonth() + 1
    const ano = date.getFullYear()

    try {
      const response = await fetch(`https://liturgia.up.railway.app/v2?dia=${dia}&mes=${mes}&ano=${ano}`)
      if (!response.ok) {
        throw new Error('Falha ao buscar liturgia diária.')
      }
      const json = await response.json()
      setData(json)
      
      // Ajustar aba de leitura ativa inicial
      setActiveReading('primeira')
    } catch (err) {
      console.error(err)
      setError('Não foi possível carregar a liturgia diária. Verifique sua conexão ou tente novamente mais tarde.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLiturgia(selectedDate)
  }, [selectedDate])

  const changeDate = (offset) => {
    const newDate = new Date(selectedDate)
    newDate.setDate(selectedDate.getDate() + offset)
    setSelectedDate(newDate)
  }

  const setToday = () => {
    setSelectedDate(new Date())
  }

  // Formatador de data
  const formatDateStr = (date) => {
    const d = date.getDate().toString().padStart(2, '0')
    const m = (date.getMonth() + 1).toString().padStart(2, '0')
    const y = date.getFullYear()
    return `${d}/${m}/${y}`
  }

  // Identificar estilo de cor litúrgica
  const getLiturgicalColorStyle = (colorName) => {
    if (!colorName) return colorMap.branco
    const normalized = colorName.toLowerCase().trim()
    return colorMap[normalized] || { bg: 'bg-zinc-900 text-zinc-300 border-zinc-700', label: colorName }
  }

  const colorStyle = data ? getLiturgicalColorStyle(data.cor) : colorMap.branco

  return (
    <div className="space-y-6">
      {/* Cabeçalho de Navegação e Configurações */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-gold tracking-wide">
            Liturgia Diária
          </h1>
          <p className="text-zinc-400 font-sans text-xs md:text-sm">
            Acompanhe as leituras da Santa Missa
          </p>
        </div>

        {/* Controles de Tamanho de Fonte */}
        <div className="flex items-center gap-2 self-end sm:self-center bg-zinc-900 border border-zinc-800 rounded-lg p-1">
          <Type className="w-4 h-4 text-zinc-400 ml-2" />
          <button
            onClick={() => setFontSize('base')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${fontSize === 'base' ? 'bg-gold text-slate-950' : 'text-zinc-400 hover:text-zinc-200'}`}
          >
            A
          </button>
          <button
            onClick={() => setFontSize('lg')}
            className={`px-2.5 py-1 text-sm font-semibold rounded-md transition-colors cursor-pointer ${fontSize === 'lg' ? 'bg-gold text-slate-950' : 'text-zinc-400 hover:text-zinc-200'}`}
          >
            A+
          </button>
          <button
            onClick={() => setFontSize('xl')}
            className={`px-2.5 py-1 text-base font-semibold rounded-md transition-colors cursor-pointer ${fontSize === 'xl' ? 'bg-gold text-slate-950' : 'text-zinc-400 hover:text-zinc-200'}`}
          >
            A++
          </button>
        </div>
      </div>

      {/* Barra de Seleção de Datas */}
      <div className="glass-panel p-3 rounded-2xl flex items-center justify-between gap-2">
        <button
          onClick={() => changeDate(-1)}
          className="p-2 hover:bg-zinc-800 rounded-lg text-gold transition-colors cursor-pointer"
          aria-label="Dia anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="relative">
          <button
            onClick={() => {
              if (dateInputRef.current && typeof dateInputRef.current.showPicker === 'function') {
                dateInputRef.current.showPicker()
              }
            }}
            className="flex items-center gap-2 px-3 py-1.5 hover:bg-zinc-800 rounded-lg text-zinc-200 transition-colors font-sans text-sm font-medium cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-gold" />
            <span>{formatDateStr(selectedDate)}</span>
            {formatDateStr(selectedDate) === formatDateStr(new Date()) && (
              <span className="text-[10px] bg-gold/15 text-gold px-2 py-0.5 rounded-full border border-gold/20">Hoje</span>
            )}
          </button>
          
          <input
            ref={dateInputRef}
            type="date"
            value={selectedDate.toLocaleDateString('en-CA')} // Retorna YYYY-MM-DD no fuso local
            onChange={(e) => {
              if (e.target.value) {
                const parts = e.target.value.split('-')
                const newDate = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10))
                setSelectedDate(newDate)
              }
            }}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full [color-scheme:dark]"
            title="Escolher data no calendário"
          />
        </div>

        <button
          onClick={() => changeDate(1)}
          className="p-2 hover:bg-zinc-800 rounded-lg text-gold transition-colors cursor-pointer"
          aria-label="Próximo dia"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Conteúdo Principal */}
      {loading ? (
        <div className="glass-panel p-12 rounded-2xl flex flex-col items-center justify-center gap-4 min-h-[300px]">
          <Loader2 className="w-8 h-8 text-gold animate-spin" />
          <p className="text-zinc-400 font-sans text-sm">Buscando leituras litúrgicas...</p>
        </div>
      ) : error ? (
        <div className="glass-panel p-8 rounded-2xl flex flex-col items-center justify-center gap-4 text-center min-h-[300px]">
          <p className="text-red-400 font-sans text-sm max-w-md">{error}</p>
          <button
            onClick={() => fetchLiturgia(selectedDate)}
            className="flex items-center gap-2 bg-gold/15 text-gold border border-gold/30 hover:bg-gold/25 px-4 py-2 rounded-xl transition-all font-sans text-sm font-semibold cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            Tentar Novamente
          </button>
        </div>
      ) : data ? (
        <div className="space-y-6">
          {/* Card de Informação Litúrgica */}
          <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-gold space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${colorStyle.bg}`}>
                {data.cor || 'Liturgia'}
              </span>
              <span className="text-xs text-zinc-400 font-sans">{data.data}</span>
            </div>
            <h2 className="text-lg md:text-xl font-serif font-bold text-zinc-100">
              {data.liturgia}
            </h2>
          </div>

          {/* Abas Superiores (Leituras vs Orações) */}
          <div className="flex border-b border-zinc-800">
            <button
              onClick={() => setActiveTab('leituras')}
              className={`flex-1 py-3 text-center font-serif text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'leituras' ? 'text-gold border-b-2 border-gold font-bold' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Leituras da Missa
            </button>
            <button
              onClick={() => setActiveTab('oracoes')}
              className={`flex-1 py-3 text-center font-serif text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'oracoes' ? 'text-gold border-b-2 border-gold font-bold' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Orações do Dia
            </button>
          </div>

          {/* Exibição da Aba de Leituras */}
          {activeTab === 'leituras' && (
            <div className="space-y-6">
              {/* Navegação entre Leituras (Mini-Abas) */}
              <div className="flex flex-wrap gap-2 p-1 bg-zinc-900/50 border border-zinc-900/80 rounded-xl">
                <button
                  onClick={() => setActiveReading('primeira')}
                  className={`flex-1 min-w-[70px] py-2 px-3 text-center rounded-lg font-sans text-xs font-medium transition-all cursor-pointer ${
                    activeReading === 'primeira' ? 'bg-gold text-slate-950 font-bold shadow-md shadow-gold/10' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  1ª Leitura
                </button>
                <button
                  onClick={() => setActiveReading('salmo')}
                  className={`flex-1 min-w-[70px] py-2 px-3 text-center rounded-lg font-sans text-xs font-medium transition-all cursor-pointer ${
                    activeReading === 'salmo' ? 'bg-gold text-slate-950 font-bold shadow-md shadow-gold/10' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Salmo
                </button>
                {data.leituras.segundaLeitura && data.leituras.segundaLeitura.length > 0 && (
                  <button
                    onClick={() => setActiveReading('segunda')}
                    className={`flex-1 min-w-[70px] py-2 px-3 text-center rounded-lg font-sans text-xs font-medium transition-all cursor-pointer ${
                      activeReading === 'segunda' ? 'bg-gold text-slate-950 font-bold shadow-md shadow-gold/10' : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    2ª Leitura
                  </button>
                )}
                <button
                  onClick={() => setActiveReading('evangelho')}
                  className={`flex-1 min-w-[70px] py-2 px-3 text-center rounded-lg font-sans text-xs font-medium transition-all cursor-pointer ${
                    activeReading === 'evangelho' ? 'bg-gold text-slate-950 font-bold shadow-md shadow-gold/10' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Evangelho
                </button>
              </div>

              {/* Renderização do Texto Selecionado */}
              <div className="glass-panel p-6 rounded-2xl space-y-4">
                {activeReading === 'primeira' && data.leituras.primeiraLeitura?.[0] && (
                  <div className="space-y-4 font-sans">
                    <div className="border-b border-zinc-900 pb-3">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-gold">Primeira Leitura</span>
                      <h3 className="text-base font-serif font-semibold text-zinc-200 mt-1">
                        {data.leituras.primeiraLeitura[0].titulo}
                      </h3>
                      <p className="text-xs text-gold/80 italic mt-1 font-sans">
                        Referência: {data.leituras.primeiraLeitura[0].referencia}
                      </p>
                    </div>
                    <div className={`${fontSizeClasses[fontSize]} text-zinc-300 whitespace-pre-line text-justify`}>
                      {data.leituras.primeiraLeitura[0].texto}
                    </div>
                  </div>
                )}

                {activeReading === 'salmo' && data.leituras.salmo?.[0] && (
                  <div className="space-y-4 font-sans">
                    <div className="border-b border-zinc-900 pb-3">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-gold">Salmo Responsorial</span>
                      <h3 className="text-base font-serif font-semibold text-zinc-200 mt-1">
                        Salmo {data.leituras.salmo[0].referencia}
                      </h3>
                    </div>
                    
                    {/* Refrão destacado */}
                    <div className="p-4 bg-gold/5 border border-gold/10 rounded-xl">
                      <p className="text-xs uppercase font-bold tracking-wider text-gold font-sans">Refrão / Resposta:</p>
                      <p className={`font-serif italic font-bold text-zinc-100 mt-1 ${fontSizeClasses[fontSize]}`}>
                        {data.leituras.salmo[0].refrao}
                      </p>
                    </div>

                    <div className={`${fontSizeClasses[fontSize]} text-zinc-300 whitespace-pre-line text-justify leading-loose mt-4`}>
                      {data.leituras.salmo[0].texto}
                    </div>
                  </div>
                )}

                {activeReading === 'segunda' && data.leituras.segundaLeitura?.[0] && (
                  <div className="space-y-4 font-sans">
                    <div className="border-b border-zinc-900 pb-3">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-gold">Segunda Leitura</span>
                      <h3 className="text-base font-serif font-semibold text-zinc-200 mt-1">
                        {data.leituras.segundaLeitura[0].titulo}
                      </h3>
                      <p className="text-xs text-gold/80 italic mt-1 font-sans">
                        Referência: {data.leituras.segundaLeitura[0].referencia}
                      </p>
                    </div>
                    <div className={`${fontSizeClasses[fontSize]} text-zinc-300 whitespace-pre-line text-justify`}>
                      {data.leituras.segundaLeitura[0].texto}
                    </div>
                  </div>
                )}

                {activeReading === 'evangelho' && data.leituras.evangelho?.[0] && (
                  <div className="space-y-4 font-sans">
                    <div className="border-b border-zinc-900 pb-3">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-gold">Evangelho</span>
                      <h3 className="text-base font-serif font-semibold text-zinc-200 mt-1">
                        {data.leituras.evangelho[0].titulo}
                      </h3>
                      <p className="text-xs text-gold/80 italic mt-1 font-sans">
                        Referência: {data.leituras.evangelho[0].referencia}
                      </p>
                    </div>

                    <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg text-xs flex flex-col gap-1 text-zinc-400 font-medium">
                      <span>📖 Proclamação do Evangelho de Jesus Cristo segundo Mateus/Lucas/Marcos/João.</span>
                      <span className="text-gold">🙏 Glória a Vós, Senhor!</span>
                    </div>

                    <div className={`${fontSizeClasses[fontSize]} text-zinc-300 whitespace-pre-line text-justify`}>
                      {data.leituras.evangelho[0].texto}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Exibição da Aba de Orações */}
          {activeTab === 'oracoes' && data.oracoes && (
            <div className="space-y-6">
              {/* Oração da Coleta */}
              {data.oracoes.coleta && (
                <div className="glass-panel p-5 rounded-2xl space-y-3 font-sans">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gold">Oração da Coleta (Inicial)</span>
                  <p className={`${fontSizeClasses[fontSize]} text-zinc-300 text-justify`}>
                    {data.oracoes.coleta}
                  </p>
                </div>
              )}

              {/* Oração das Oferendas */}
              {data.oracoes.oferendas && (
                <div className="glass-panel p-5 rounded-2xl space-y-3 font-sans">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gold">Sobre as Oferendas</span>
                  <p className={`${fontSizeClasses[fontSize]} text-zinc-300 text-justify`}>
                    {data.oracoes.oferendas}
                  </p>
                </div>
              )}

              {/* Oração da Comunhão */}
              {data.oracoes.comunhao && (
                <div className="glass-panel p-5 rounded-2xl space-y-3 font-sans">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gold">Depois da Comunhão</span>
                  <p className={`${fontSizeClasses[fontSize]} text-zinc-300 text-justify`}>
                    {data.oracoes.comunhao}
                  </p>
                </div>
              )}

              {/* Antífonas adicionais (Entrada/Comunhão) */}
              {data.antifonas && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.antifonas.entrada && (
                    <div className="glass-panel p-5 rounded-xl border border-zinc-900 space-y-2 font-sans">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-gold">Antífona de Entrada</span>
                      <p className="text-zinc-400 italic text-xs leading-relaxed text-justify">
                        {data.antifonas.entrada}
                      </p>
                    </div>
                  )}
                  {data.antifonas.comunhao && (
                    <div className="glass-panel p-5 rounded-xl border border-zinc-900 space-y-2 font-sans">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-gold">Antífona da Comunhão</span>
                      <p className="text-zinc-400 italic text-xs leading-relaxed text-justify">
                        {data.antifonas.comunhao}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      ) : null}
    </div>
  )
}
