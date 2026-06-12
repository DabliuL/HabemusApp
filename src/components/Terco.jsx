import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, RotateCcw, Volume2, Award, Flame, AlertCircle } from 'lucide-react'

// Orações padrão
const PRAYERS = {
  sinalCruz: {
    title: 'Sinal da Cruz',
    text: 'Pelo sinal da Santa Cruz, livrai-nos, Deus, nosso Senhor, dos nossos inimigos. Em nome do Pai, e do Filho, e do Espírito Santo. Amém.'
  },
  creio: {
    title: 'Creio (Apostles\' Creed)',
    text: 'Creio em Deus Pai Todo-Poderoso, Criador do céu e da terra; e em Jesus Cristo, seu único Filho, nosso Senhor; que foi concebido pelo poder do Espírito Santo; nasceu da Virgem Maria, padeceu sob Pôncio Pilatos, foi crucificado, morto e sepultado; desceu à mansão dos mortos; ressucitou ao terceiro dia; subiu aos céus, está sentado à direita de Deus Pai Todo-Poderoso, donde há de vir a julgar os vivos e os mortos. Creio no Espírito Santo, na Santa Igreja Católica, na comunhão dos Santos, na remissão dos pecados, na ressurreição da carne, na vida eterna. Amém.'
  },
  paiNosso: {
    title: 'Pai Nosso',
    text: 'Pai nosso, que estais nos céus, santificado seja o vosso nome; venha a nós o vosso reino, seja feita a vossa vontade, assim na terra como no céu. O pão nosso de cada dia nos dai hoje; perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido; e não nos deixeis cair em tentação, mas livrai-nos do mal. Amém.'
  },
  aveMaria: {
    title: 'Ave Maria',
    text: 'Ave Maria, cheia de graça, o Senhor é convosco, bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós, pecadores, agora e na hora da nossa morte. Amém.'
  },
  gloria: {
    title: 'Glória ao Pai',
    text: 'Glória ao Pai, e ao Filho, e ao Espírito Santo. Como era no princípio, agora e sempre. Amém.\n\nÓ meu Jesus, perdoai-nos, livrai-nos do fogo do inferno, levai as almas todas para o céu e socorrei principalmente as que mais precisarem.'
  },
  salveRainha: {
    title: 'Salve Rainha',
    text: 'Salve, Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve! A vós bradamos, os degredados filhos de Eva. A vós suspiramos, gemendo e chorando neste vale de lágrimas. Eia, pois, advogada nossa, esses vossos olhos misericordiosos a nós volvei. E depois deste desterro, mostrai-nos Jesus, bendito fruto do vosso ventre. Ó clemente, ó piedosa, ó doce sempre Virgem Maria. Rogai por nós, Santa Mãe de Deus, para que sejamos dignos das promessas de Cristo. Amém.'
  }
}

// Mistérios do Terço
const MYSTERIES = {
  gozosos: {
    name: 'Mistérios Gozosos',
    days: 'Segundas-feiras e Sábados',
    intro: 'Meditação sobre a Encarnação e a Infância de Jesus Cristo.',
    list: [
      { num: '1º', title: 'A Anunciação do Anjo Gabriel a Maria', fruit: 'Humildade' },
      { num: '2º', title: 'A Visitação de Maria a sua prima Santa Isabel', fruit: 'Amor ao próximo' },
      { num: '3º', title: 'O Nascimento de Jesus em Belém', fruit: 'Desapego dos bens terrenos' },
      { num: '4º', title: 'A Apresentação do Menino Jesus no Templo', fruit: 'Pureza e Obediência' },
      { num: '5º', title: 'O Encontro de Jesus no Templo entre os doutores', fruit: 'Procura de Deus em tudo' }
    ]
  },
  dolorosos: {
    name: 'Mistérios Dolorosos',
    days: 'Terças e Sextas-feiras',
    intro: 'Meditação sobre a Paixão e Morte de Jesus Cristo.',
    list: [
      { num: '1º', title: 'A Agonia de Jesus no Horto das Oliveiras', fruit: 'Dor pelos pecados' },
      { num: '2º', title: 'A Flagelação de Jesus atado à coluna', fruit: 'Mortificação dos sentidos' },
      { num: '3º', title: 'A Coroação de espinhos de Jesus', fruit: 'Humildade e paciência nas humilhações' },
      { num: '4º', title: 'Jesus carregando a Cruz a caminho do Calvário', fruit: 'Paciência para carregar a nossa cruz' },
      { num: '5º', title: 'A Crucificação e Morte de Jesus', fruit: 'Perdão das ofensas e amor a Deus' }
    ]
  },
  gloriosos: {
    name: 'Mistérios Gloriosos',
    days: 'Quartas-feiras e Domingos',
    intro: 'Meditação sobre a Ressurreição e a Glória de Jesus e Maria.',
    list: [
      { num: '1º', title: 'A Ressurreição de Jesus Cristo', fruit: 'Fé e conversão' },
      { num: '2º', title: 'A Ascensão de Jesus ao Céu', fruit: 'Esperança e desejo do céu' },
      { num: '3º', title: 'A Vinda do Espírito Santo sobre os Apóstolos', fruit: 'Caridade e zelo apostólico' },
      { num: '4º', title: 'A Assunção de Maria ao Céu', fruit: 'Devoção filial a Maria e boa morte' },
      { num: '5º', title: 'A Coroação de Maria no Céu', fruit: 'Perseverança final e confiança' }
    ]
  },
  luminosos: {
    name: 'Mistérios Luminosos',
    days: 'Quintas-feiras',
    intro: 'Meditação sobre a Vida Pública de Jesus Cristo.',
    list: [
      { num: '1º', title: 'O Batismo de Jesus no rio Jordão', fruit: 'Fidelidade às promessas do Batismo' },
      { num: '2º', title: 'A Auto-revelação de Jesus nas Bodas de Caná', fruit: 'Fazer tudo o que Jesus disser (confiança)' },
      { num: '3º', title: 'O Anúncio do Reino de Deus convidando à conversão', fruit: 'Arrependimento e busca de santidade' },
      { num: '4º', title: 'A Transfiguração de Jesus no Monte Tabor', fruit: 'Desejo de contemplação e glória' },
      { num: '5º', title: 'A Instituição da Eucaristia', fruit: 'Amor à Eucaristia e adoração' }
    ]
  }
}

export default function Terco() {
  const [selectedMysteryKey, setSelectedMysteryKey] = useState('gozosos')
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [steps, setSteps] = useState([])

  // Determinar mistério do dia automaticamente
  useEffect(() => {
    const today = new Date()
    const day = today.getDay() // 0=Domingo, 1=Segunda, etc.
    if (day === 1 || day === 6) {
      setSelectedMysteryKey('gozosos')
    } else if (day === 2 || day === 5) {
      setSelectedMysteryKey('dolorosos')
    } else if (day === 3 || day === 0) {
      setSelectedMysteryKey('gloriosos')
    } else if (day === 4) {
      setSelectedMysteryKey('luminosos')
    }
  }, [])

  // Compilar passos do Terço quando mudar o mistério
  useEffect(() => {
    const compiledSteps = []
    const mystery = MYSTERIES[selectedMysteryKey]

    // 1. Sinal da Cruz
    compiledSteps.push({
      id: 'sinal-cruz',
      label: 'Sinal da Cruz',
      prayer: PRAYERS.sinalCruz,
      beadIndex: 0,
      beadType: 'cross',
      description: 'Dê início à oração fazendo o Sinal da Cruz.'
    })

    // 2. Oferecimento / Creio
    compiledSteps.push({
      id: 'creio',
      label: 'Credo (Creio)',
      prayer: PRAYERS.creio,
      beadIndex: 1,
      beadType: 'large-bead',
      description: 'Professe a sua fé rezando o Creio.'
    })

    // 3. Pai Nosso Inicial
    compiledSteps.push({
      id: 'pai-nosso-init',
      label: 'Pai Nosso',
      prayer: PRAYERS.paiNosso,
      beadIndex: 2,
      beadType: 'large-bead',
      description: 'Reze o Pai Nosso inicial pelas intenções do Santo Padre.'
    })

    // 4. Três Ave Marias Iniciais
    for (let i = 1; i <= 3; i++) {
      let desc = ''
      if (i === 1) desc = 'Primeira Ave Maria, pedindo o aumento da Fé.'
      if (i === 2) desc = 'Segunda Ave Maria, pedindo o aumento da Esperança.'
      if (i === 3) desc = 'Terceira Ave Maria, pedindo o aumento da Caridade.'
      
      compiledSteps.push({
        id: `ave-maria-init-${i}`,
        label: `Ave Maria (${i}/3)`,
        prayer: PRAYERS.aveMaria,
        beadIndex: 2 + i,
        beadType: 'small-bead',
        description: desc
      })
    }

    // 5. Glória Inicial
    compiledSteps.push({
      id: 'gloria-init',
      label: 'Glória ao Pai e Jaculatória',
      prayer: PRAYERS.gloria,
      beadIndex: 6,
      beadType: 'spacer',
      description: 'Glória ao Pai e jaculatória de encerramento do bloco inicial.'
    })

    // 6. As 5 Dezenas
    for (let d = 0; d < 5; d++) {
      const mysteryItem = mystery.list[d]
      
      // Pai Nosso da Dezena
      compiledSteps.push({
        id: `pai-nosso-dezena-${d}`,
        label: `${d + 1}ª Dezena: Pai Nosso`,
        prayer: PRAYERS.paiNosso,
        decade: d + 1,
        beadIndex: 0,
        beadType: 'large-bead',
        mystery: mysteryItem,
        description: `Contemple o ${mysteryItem.num} Mistério: ${mysteryItem.title}. Fruto: ${mysteryItem.fruit}.`
      })

      // 10 Ave Marias
      for (let a = 1; a <= 10; a++) {
        compiledSteps.push({
          id: `ave-maria-dezena-${d}-${a}`,
          label: `${d + 1}ª Dezena: Ave Maria (${a}/10)`,
          prayer: PRAYERS.aveMaria,
          decade: d + 1,
          beadIndex: a,
          beadType: 'small-bead',
          mystery: mysteryItem,
          description: `Medite no mistério: ${mysteryItem.title}`
        })
      }

      // Glória da Dezena
      compiledSteps.push({
        id: `gloria-dezena-${d}`,
        label: `${d + 1}ª Dezena: Glória ao Pai`,
        prayer: PRAYERS.gloria,
        decade: d + 1,
        beadIndex: 11,
        beadType: 'spacer',
        mystery: mysteryItem,
        description: `Encerre a ${d + 1}ª dezena glorificando a Trindade.`
      })
    }

    // 7. Salve Rainha
    compiledSteps.push({
      id: 'salve-rainha',
      label: 'Salve Rainha',
      prayer: PRAYERS.salveRainha,
      beadIndex: 12,
      beadType: 'medal',
      description: 'Conclua o Santo Terço com a oração da Salve Rainha agradecendo a Nossa Senhora.'
    })

    setSteps(compiledSteps)
    setCurrentStepIndex(0)
  }, [selectedMysteryKey])

  // Navegar
  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1)
      triggerVibration()
    }
  }

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1)
      triggerVibration()
    }
  }

  const handleReset = () => {
    if (window.confirm('Deseja reiniciar a oração do Terço?')) {
      setCurrentStepIndex(0)
    }
  }

  // Feedback tátil simples para celulares Android
  const triggerVibration = () => {
    if (navigator.vibrate) {
      navigator.vibrate(50)
    }
  }

  const currentStep = steps[currentStepIndex]
  const progressPercent = steps.length > 0 ? Math.round((currentStepIndex / (steps.length - 1)) * 100) : 0

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div>
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-gold tracking-wide">
          Santo Terço
        </h1>
        <p className="text-zinc-400 font-sans text-xs md:text-sm">
          Acompanhe as orações e mistérios passo a passo
        </p>
      </div>

      {/* Seletor de Mistérios */}
      <div className="glass-panel p-4 rounded-2xl space-y-4">
        <div>
          <label className="text-xs font-bold text-gold uppercase tracking-wider block font-sans">
            Selecione o Mistério para Rezar
          </label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {Object.entries(MYSTERIES).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setSelectedMysteryKey(key)}
                className={`py-2 px-3 rounded-xl font-serif text-xs md:text-sm text-left border transition-all cursor-pointer ${
                  selectedMysteryKey === key
                    ? 'bg-gold/15 border-gold text-gold font-bold shadow-md shadow-gold/5'
                    : 'bg-zinc-900/50 border-zinc-850 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40'
                }`}
              >
                <div className="font-bold">{value.name}</div>
                <div className="text-[10px] text-zinc-500 font-sans mt-0.5">{value.days}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Detalhe do mistério selecionado */}
        <div className="bg-black/40 p-3.5 rounded-xl border border-zinc-900 text-xs text-zinc-400 font-sans">
          <span className="text-gold font-semibold font-serif">Meditação:</span> {MYSTERIES[selectedMysteryKey].intro}
        </div>
      </div>

      {/* Simulador Interativo */}
      {currentStep && (
        <div className="space-y-6">
          {/* Card Central da Oração e Mistério */}
          <div className="glass-panel rounded-2xl overflow-hidden border border-gold/10 flex flex-col min-h-[350px]">
            {/* Topo do Card: Progresso e Mistério Atual */}
            <div className="bg-zinc-900/50 px-5 py-4 border-b border-zinc-900 space-y-3">
              {/* Barra de Progresso do Terço Completo */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[10px] text-zinc-500 font-sans">
                  <span>Progresso do Terço</span>
                  <span>{progressPercent}% ({currentStepIndex + 1}/{steps.length})</span>
                </div>
                <div className="w-full bg-black rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-gold h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>

              {/* Informação do Mistério se aplicável */}
              {currentStep.mystery && (
                <div className="bg-gold/5 border border-gold/10 p-3 rounded-xl space-y-1">
                  <span className="text-[9px] uppercase font-bold tracking-widest text-gold font-sans block">
                    Contemplando o {currentStep.mystery.num} Mistério
                  </span>
                  <h4 className="text-sm font-serif font-bold text-zinc-200 leading-snug">
                    {currentStep.mystery.title}
                  </h4>
                  <span className="text-[10px] text-zinc-500 font-sans block">
                    Fruto do Mistério: <strong className="text-gold">{currentStep.mystery.fruit}</strong>
                  </span>
                </div>
              )}
            </div>

            {/* Conteúdo Central: Texto da Oração */}
            <div className="flex-1 p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-gold/15 text-gold border border-gold/20 font-bold px-2 py-0.5 rounded-full font-sans uppercase">
                    {currentStep.label}
                  </span>
                  {currentStep.decade && (
                    <span className="text-xs text-zinc-500 font-sans">
                      ({currentStep.decade}ª dezena)
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-serif font-bold text-zinc-100">
                  {currentStep.prayer.title}
                </h3>
                <p className="text-xs text-zinc-500 font-sans leading-relaxed">
                  {currentStep.description}
                </p>
                <div className="border-t border-zinc-900 my-4"></div>
                <p className="text-sm md:text-base text-zinc-300 font-sans leading-relaxed text-justify whitespace-pre-line select-text">
                  {currentStep.prayer.text}
                </p>
              </div>

              {/* Visualizador de Contas (Gráfico de Dezenas) */}
              {currentStep.decade && (
                <div className="pt-4 flex flex-col items-center gap-2">
                  <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-sans font-semibold">Dezena Atual</span>
                  <div className="flex justify-center items-center gap-1.5">
                    {/* Pai Nosso Bead */}
                    <div
                      className={`w-3.5 h-3.5 rounded-full border transition-all duration-300 flex items-center justify-center text-[7px] font-bold ${
                        currentStep.beadIndex === 0
                          ? 'bg-gold border-gold text-black scale-125 shadow-lg shadow-gold/30'
                          : currentStep.beadIndex > 0
                          ? 'bg-gold/40 border-gold/50 text-black'
                          : 'bg-black border-zinc-800 text-zinc-600'
                      }`}
                      title="Pai Nosso"
                    >
                      P
                    </div>
                    {/* Divisor */}
                    <div className="w-2 border-t border-zinc-800"></div>
                    {/* 10 Ave Maria Beads */}
                    {Array.from({ length: 10 }).map((_, idx) => {
                      const beadNum = idx + 1
                      const isActive = currentStep.beadIndex === beadNum
                      const isCompleted = currentStep.beadIndex > beadNum
                      return (
                        <div
                          key={idx}
                          className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
                            isActive
                              ? 'bg-gold border-gold scale-125 shadow-md shadow-gold/40'
                              : isCompleted
                              ? 'bg-gold/50 border-gold/40'
                              : 'bg-black border-zinc-800'
                          }`}
                          title={`Ave Maria ${beadNum}`}
                        ></div>
                      )
                    })}
                    {/* Divisor */}
                    <div className="w-2 border-t border-zinc-800"></div>
                    {/* Glória Bead */}
                    <div
                      className={`w-3.5 h-3.5 rounded-full border transition-all duration-300 flex items-center justify-center text-[7px] font-bold ${
                        currentStep.beadIndex === 11
                          ? 'bg-gold border-gold text-black scale-125 shadow-lg shadow-gold/30'
                          : 'bg-black border-zinc-800 text-zinc-600'
                      }`}
                      title="Glória ao Pai"
                    >
                      G
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Painel de Navegação do Terço */}
            <div className="bg-zinc-900/30 px-6 py-4 border-t border-zinc-900 flex justify-between items-center gap-3">
              <button
                onClick={handlePrev}
                disabled={currentStepIndex === 0}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 disabled:opacity-40 disabled:hover:bg-transparent rounded-xl transition-all text-xs font-sans font-semibold cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 text-gold" />
                <span>Voltar</span>
              </button>

              <button
                onClick={handleReset}
                className="p-2.5 border border-zinc-800 hover:bg-zinc-800 text-zinc-450 hover:text-gold rounded-xl transition-all cursor-pointer"
                title="Reiniciar Terço"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {currentStepIndex === steps.length - 1 ? (
                <div className="flex items-center gap-1.5 text-xs text-gold font-bold font-sans animate-pulse">
                  <Award className="w-4 h-4" />
                  <span>Concluído!</span>
                </div>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center justify-center gap-1.5 px-5 py-2.5 bg-gold hover:bg-gold-light text-black font-bold rounded-xl transition-all text-xs font-sans shadow-md shadow-gold/10 cursor-pointer"
                >
                  <span>Avançar</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Dica de oração */}
          <div className="flex items-start gap-2.5 bg-zinc-900/40 p-4 rounded-xl border border-zinc-900 text-xs text-zinc-400 font-sans leading-relaxed">
            <AlertCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
            <p>
              Recomenda-se rezar o terço em um local silencioso e recolhido, contemplando cada mistério com amor. 
              Ao utilizar no celular, a cada avanço o aparelho dará um leve feedback de vibração para simular a passagem da conta física do terço.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
