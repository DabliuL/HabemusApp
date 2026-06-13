import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Play, BookOpen, Clock, Check, Heart, Shield, RotateCw } from 'lucide-react'

// Dados das Estações da Via Sacra
const STATIONS = [
  {
    number: 'I',
    title: 'Jesus é condenado à morte',
    meditation: 'Jesus, o Justo e Inocente, é julgado por homens pecadores e aceita a sentença de morte em silêncio e com mansidão absoluta. Ele aceita morrer para nos dar a vida eterna e nos libertar da condenação do pecado.',
    prayer: 'Ó Jesus condenado, ensinai-me a aceitar as incompreensões e julgamentos alheios com humildade. Que eu nunca condene meus irmãos e que saiba abraçar a minha própria verdade aos vossos pés.'
  },
  {
    number: 'II',
    title: 'Jesus carrega a cruz',
    meditation: 'Uma pesada cruz de madeira é colocada sobre os ombros machucados e doloridos de Jesus. Sem hesitar, Ele abraça o madeiro da dor, sabendo que ali está desenhado o instrumento de nossa salvação.',
    prayer: 'Ó amado Jesus, dai-me a força necessária para carregar as minhas cruzes diárias sem murmuração e com a certeza de que não caminho sozinho.'
  },
  {
    number: 'III',
    title: 'Jesus cai pela primeira vez',
    meditation: 'Exausto pela perda de sangue, pelas agressões e pelo peso da cruz, Jesus cai por terra. A queda é dolorosa, mas, reunindo Suas forças por amor a nós, Ele Se levanta e continua a marcha.',
    prayer: 'Senhor Jesus, quando eu cair no pecado ou no desânimo, dai-me a graça de me levantar prontamente e retomar o caminho da conversão.'
  },
  {
    number: 'IV',
    title: 'Jesus encontra a Sua Mãe Santíssima',
    meditation: 'No meio da multidão hostil, os olhares de Jesus e de Maria Se encontram. Nenhuma palavra é dita, mas a dor compartilhada entre Mãe e Filho é imensa. Maria sofre no Coração o que Jesus sofre no Corpo.',
    prayer: 'Ó Virgem Dolorosa, permanecei ao meu lado nos momentos de dor e aflição. Olhai por mim e guiai-me sempre em direção ao Vosso Divino Filho.'
  },
  {
    number: 'V',
    title: 'Simão Cirineu ajuda Jesus a carregar a cruz',
    meditation: 'Temendo que Jesus morra no caminho, os soldados forçam Simão de Cirineu a carregar a cruz com Ele. O que parecia um fardo pesado torna-se a maior honra e salvação da vida de Simão.',
    prayer: 'Senhor, fazei-me atento às necessidades dos meus irmãos. Que eu seja um cirineu na vida daqueles que estão sobrecarregados com suas dores.'
  },
  {
    number: 'VI',
    title: 'Verônica limpa o rosto de Jesus',
    meditation: 'Movida por profunda compaixão, uma mulher chamada Verônica rompe o cordão de isolamento dos soldados e limpa o rosto sujo de sangue e suor de Jesus com um véu. Como recompensa, Suas feições sagradas ficam estampadas no tecido.',
    prayer: 'Jesus, imprimi em meu coração a vossa face divina. Que eu saiba ver o Vosso rosto nos necessitados, nos abandonados e nos que sofrem ao meu redor.'
  },
  {
    number: 'VII',
    title: 'Jesus cai pela segunda vez',
    meditation: 'O caminho para o Calvário é íngreme e áspero. As forças de Jesus se esvaem novamente e Ele desaba sob a cruz pela segunda vez. A dor é ainda maior, mas o Seu propósito de amor é inabalável.',
    prayer: 'Ó Jesus, pela vossa segunda queda, dai-me perseverança na luta contra os pecados repetitivos. Não me deixeis desanimar nas minhas fraquezas.'
  },
  {
    number: 'VIII',
    title: 'Jesus consola as mulheres de Jerusalém',
    meditation: 'Algumas mulheres piedosas choram ao ver o sofrimento de Jesus. Ele para e diz a elas: "Não choreis por mim, chorai antes por vós mesmas e por vossos filhos", exortando-as à verdadeira conversão espiritual.',
    prayer: 'Senhor, dai-me o dom das lágrimas de contrição. Que eu chore não apenas pelas vossas dores físicas, mas principalmente pelos meus pecados que as causaram.'
  },
  {
    number: 'IX',
    title: 'Jesus cai pela terceira vez',
    meditation: 'Faltando poucos metros para chegar ao topo do Calvário, Jesus cai pela terceira vez. Ele está completamente esgotado e humilhado, mas ergue-Se uma última vez, provando que o amor é mais forte que a morte.',
    prayer: 'Senhor Jesus, pelas vossas três quedas dolorosas, dai-me a virtude da fortaleza para nunca desistir da santidade, mesmo quando me sentir totalmente sem forças.'
  },
  {
    number: 'X',
    title: 'Jesus é despojado de Suas vestes',
    meditation: 'Ao chegar ao Calvário, os soldados arrancam brutalmente as vestes de Jesus, reabrindo Suas feridas. Ele é exposto à vergonha pública, aceitando a nudez para nos vestir com a túnica da graça divina.',
    prayer: 'Jesus manso e humilde, despojai-me do orgulho, da vaidade e do apego aos bens terrenos. Revesti-me com a pureza e a vossa santa humildade.'
  },
  {
    number: 'XI',
    title: 'Jesus é pregado na cruz',
    meditation: 'Jesus é deitado sobre o madeiro e pregos de ferro atravessam Suas mãos e pés sagrados. Cada martelada ecoa pelo Calvário, mas Ele reza pelos Seus carrascos: "Pai, perdoa-lhes, pois não sabem o que fazem".',
    prayer: 'Meu Salvador crucificado, pregai na vossa cruz a minha vontade própria e os meus desejos desordenados. Ensinai-me a perdoar a todos os que me ofendem.'
  },
  {
    number: 'XII',
    title: 'Jesus morre na cruz',
    meditation: 'Após três horas de agonia extrema, após prometer o Paraíso ao bom ladrão e nos dar Maria como Mãe, Jesus clama: "Tudo está consumado!", inclina a cabeça e entrega o Seu espírito nas mãos do Pai.',
    prayer: 'Adoro-Vos, ó Cristo crucificado, e Vos agradeço por morrer por mim. Pelas vossas últimas horas, dai-me a graça de uma santa morte em vosso amor. (Silêncio de adoração)'
  },
  {
    number: 'XIII',
    title: 'Jesus é descido da cruz',
    meditation: 'O Corpo sem vida do Salvador é descido da cruz e colocado com imensa reverência e ternura no colo de Sua Mãe, Maria. A espada da dor atravessa completamente a alma da Virgem Santíssima.',
    prayer: 'Ó Maria, Mãe de Misericórdia, acolhei-me em vossos braços maternos. Ensinai-me a amar a Jesus com a mesma fidelidade com que O amastes até a cruz.'
  },
  {
    number: 'XIV',
    title: 'Jesus é depositado no sepulcro',
    meditation: 'O Corpo de Jesus é envolto em um lençol limpo e colocado em um sepulcro novo esculpido na rocha. A grande pedra é rolada e fecha a entrada. Tudo parece silêncio e derrota, mas a semente da vida eterna está plantada.',
    prayer: 'Jesus sepultado, aumentai em mim a esperança nas promessas divinas. Que eu saiba aguardar no silêncio e na oração o tempo de Deus na minha vida.'
  },
  {
    number: 'XV',
    title: 'A gloriosa Ressurreição de Jesus',
    meditation: 'Ao terceiro dia, a terra treme, a pedra é removida e a morte é vencida para sempre! Cristo ressuscita glorioso e cheio de luz. A Via-Sacra termina não no sepulcro, mas na vitória eterna da Ressurreição!',
    prayer: 'Ressuscitado Senhor, enchei minha alma com a vossa luz e alegria pascal. Que eu viva como testemunha da vossa ressurreição todos os dias. Amém!'
  }
]

export default function ViaSacra() {
  const [stage, setStage] = useState('inicio') // 'inicio', 'estacao', 'fim'
  const [currentIndex, setCurrentIndex] = useState(0)
  const [completedCount, setCompletedCount] = useState(0)
  const [showHelperPrayers, setShowHelperPrayers] = useState(false)
  const [adorationClicked, setAdorationClicked] = useState(false)

  // Carregar dados de localStorage
  useEffect(() => {
    const savedCount = localStorage.getItem('habemus_viasacra_count')
    if (savedCount) {
      setCompletedCount(parseInt(savedCount, 10))
    }
  }, [])

  // Trigger feedback tátil de vibração no celular
  const triggerVibrate = (duration = 50) => {
    if (navigator.vibrate) {
      navigator.vibrate(duration)
    }
  }

  const handleStart = () => {
    triggerVibrate(80)
    setStage('estacao')
    setCurrentIndex(0)
    setAdorationClicked(false)
  }

  const handleNext = () => {
    triggerVibrate(60)
    if (currentIndex < STATIONS.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setAdorationClicked(false)
    } else {
      setStage('fim')
    }
  }

  const handlePrev = () => {
    triggerVibrate(60)
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
      setAdorationClicked(false)
    } else {
      setStage('inicio')
    }
  }

  const handleConclude = () => {
    triggerVibrate(120)
    const newCount = completedCount + 1
    setCompletedCount(newCount)
    localStorage.setItem('habemus_viasacra_count', newCount.toString())
    setStage('inicio')
    setCurrentIndex(0)
    alert('Via Sacra concluída com fé e devoção! Parabéns.')
  }

  const handleResetCount = () => {
    if (window.confirm('Deseja zerar o seu histórico de Via Sacra concluídas?')) {
      setCompletedCount(0)
      localStorage.setItem('habemus_viasacra_count', '0')
    }
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-gold tracking-wide">
            Via Sacra
          </h1>
          <p className="text-zinc-400 font-sans text-xs md:text-sm">
            Medite no caminho da Paixão, Morte e Ressurreição de Nosso Senhor Jesus Cristo
          </p>
        </div>
        {completedCount > 0 && stage === 'inicio' && (
          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] font-sans font-bold text-gold/80 bg-gold/10 border border-gold/20 px-2 py-0.5 rounded-full">
              {completedCount} {completedCount === 1 ? 'Concluída' : 'Concluídas'}
            </span>
            <button 
              onClick={handleResetCount}
              className="text-[9px] text-zinc-550 hover:text-red-400 hover:underline cursor-pointer"
            >
              Zerar contador
            </button>
          </div>
        )}
      </div>

      {/* ESTÁGIO: INÍCIO (Oração Preparatória) */}
      {stage === 'inicio' && (
        <div className="glass-panel p-6 md:p-8 rounded-2xl border border-gold/10 space-y-6 animate-fade-in font-sans">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gold">
              <BookOpen className="w-5 h-5" />
              <h3 className="font-serif font-bold text-lg">Oração Preparatória</h3>
            </div>
            <p className="text-xs md:text-sm text-zinc-350 leading-relaxed text-justify bg-black/30 p-4 rounded-xl border border-zinc-900 italic">
              "Senhor meu, Jesus Cristo, que por meu amor fizestes com tanta dor este caminho para morrer por mim, eu Vos amo sobre todas as coisas e me pesa de todo o coração de Vos ter ofendido. Permiti que eu Vos acompanhe neste caminho de dor. Quero meditar vossos sofrimentos para converter meu coração e consolar Vossas chagas. Ó minha Mãe, Virgem Dolorosa, alcançai-me a graça de viver este momento com sincera piedade."
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={handleStart}
              className="w-full bg-gold hover:bg-gold-light text-slate-950 font-bold py-3.5 px-6 rounded-2xl font-sans text-sm md:text-base flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-gold/10 transition-all active:scale-[0.99]"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Iniciar Via Sacra</span>
            </button>
          </div>
        </div>
      )}

      {/* ESTÁGIO: ESTAÇÕES */}
      {stage === 'estacao' && (
        <div className="space-y-5 animate-fade-in">
          {/* Barra de Progresso */}
          <div className="glass-panel p-3.5 rounded-xl border border-zinc-900 flex items-center justify-between gap-4 font-sans text-xs">
            <span className="text-zinc-500">Progresso</span>
            <div className="flex-1 bg-zinc-950 rounded-full h-1.5 overflow-hidden border border-zinc-900">
              <div
                className="bg-gold h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${Math.round(((currentIndex + 1) / STATIONS.length) * 100)}%` }}
              ></div>
            </div>
            <span className="font-bold text-gold">
              {currentIndex + 1} de {STATIONS.length}
            </span>
          </div>

          {/* Card Principal da Estação */}
          <div className="glass-panel p-6 md:p-8 rounded-2xl border border-gold/10 space-y-6">
            {/* Título e Estação */}
            <div className="text-center space-y-2 pb-4 border-b border-zinc-900">
              <span className="text-xs font-serif font-black tracking-widest text-gold bg-gold/10 border border-gold/15 px-3.5 py-1 rounded-full uppercase">
                {STATIONS[currentIndex].number}ª Estação
              </span>
              <h2 className="text-xl md:text-2xl font-serif font-bold text-zinc-100 tracking-wide mt-2">
                {STATIONS[currentIndex].title}
              </h2>
            </div>

            {/* Diálogo Litúrgico Interativo */}
            <div className="space-y-3 p-4 bg-zinc-950/60 rounded-2xl border border-zinc-900 font-sans text-xs md:text-sm">
              <div className="flex flex-col gap-2">
                <p className="text-zinc-400">
                  <strong className="text-gold">Dirigente:</strong> Nós Vos adoramos, Senhor Jesus Cristo, e Vos bendizemos.
                </p>
                
                <button
                  onClick={() => {
                    if (!adorationClicked) {
                      triggerVibrate(30)
                      setAdorationClicked(true)
                    }
                  }}
                  className={`mt-1 py-2.5 px-4 rounded-xl border text-left transition-all flex justify-between items-center cursor-pointer ${
                    adorationClicked 
                      ? 'bg-gold/10 border-gold/30 text-gold font-medium' 
                      : 'bg-zinc-900 border-zinc-800 text-zinc-350 hover:bg-zinc-900/80 hover:text-zinc-200'
                  }`}
                >
                  <span>
                    <strong className="text-zinc-400">Todos:</strong> Porque pela Vossa santa cruz remistes o mundo.
                  </span>
                  {adorationClicked ? (
                    <Check className="w-4 h-4 text-gold shrink-0 ml-2" />
                  ) : (
                    <span className="text-[10px] bg-zinc-950 text-gold border border-gold/20 px-2 py-0.5 rounded-md shrink-0 ml-2">Responder</span>
                  )}
                </button>
              </div>
            </div>

            {/* Meditação */}
            <div className="space-y-2 font-sans">
              <h4 className="text-xs uppercase font-bold text-zinc-400 tracking-wider">Meditação</h4>
              <p className="text-xs md:text-sm text-zinc-300 leading-relaxed text-justify whitespace-pre-line italic text-justify">
                {STATIONS[currentIndex].meditation}
              </p>
            </div>

            {/* Oração / Resposta */}
            <div className="space-y-2 font-sans border-t border-zinc-900 pt-4">
              <h4 className="text-xs uppercase font-bold text-zinc-400 tracking-wider">Oração</h4>
              <p className="text-xs md:text-sm text-gold/90 leading-relaxed text-justify">
                {STATIONS[currentIndex].prayer}
              </p>
            </div>
          </div>

          {/* Navegação entre Estações */}
          <div className="flex justify-between items-center gap-3">
            <button
              onClick={handlePrev}
              className="flex-1 py-3 px-4 border border-zinc-800 hover:bg-zinc-900 text-zinc-300 rounded-xl transition-all font-sans text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            <button
              onClick={handleNext}
              className="flex-1 py-3 px-4 bg-gold hover:bg-gold-light text-slate-950 rounded-xl transition-all font-sans text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>{currentIndex === STATIONS.length - 1 ? 'Ir para Conclusão' : 'Próxima Estação'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ESTÁGIO: FIM (Oração Final) */}
      {stage === 'fim' && (
        <div className="glass-panel p-6 md:p-8 rounded-2xl border border-gold/10 space-y-6 animate-fade-in font-sans">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gold">
              <BookOpen className="w-5 h-5" />
              <h3 className="font-serif font-bold text-lg">Oração Final</h3>
            </div>
            <p className="text-xs md:text-sm text-zinc-350 leading-relaxed text-justify bg-black/30 p-4 rounded-xl border border-zinc-900 italic">
              "Senhor Jesus Cristo, contemplamos o Vosso caminho de sofrimento e glória. Agradecemos por Vosso amor imenso e incondicional. Que os frutos desta meditação permaneçam em nossa vida diária, dando-nos coragem para carregar nossas cruzes e testemunhar a Vossa Ressurreição. Abençoai nossa família, nossa paróquia e toda a Vossa Igreja. Vós que viveis e reinais para sempre. Amém."
            </p>
          </div>

          <button
            onClick={handleConclude}
            className="w-full bg-gold hover:bg-gold-light text-slate-950 font-bold py-3.5 px-6 rounded-2xl font-sans text-sm md:text-base flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-gold/10 transition-all active:scale-[0.99]"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Concluir e Registrar</span>
          </button>
        </div>
      )}

      {/* AUXILIARES: Orações de Apoio (Pai Nosso, Ave Maria e Glória) */}
      <div className="glass-panel rounded-2xl border border-zinc-900 overflow-hidden font-sans">
        <button
          onClick={() => {
            triggerVibrate(30)
            setShowHelperPrayers(!showHelperPrayers)
          }}
          className="w-full px-5 py-3.5 bg-zinc-900/30 hover:bg-zinc-900/50 flex justify-between items-center text-xs md:text-sm text-zinc-350 cursor-pointer font-semibold"
        >
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-gold" />
            <span>Orações de Apoio (Pai Nosso, Ave Maria, Glória)</span>
          </div>
          <span className="text-[10px] text-zinc-550">{showHelperPrayers ? 'Recolher' : 'Expandir'}</span>
        </button>

        {showHelperPrayers && (
          <div className="p-5 bg-black/40 border-t border-zinc-900 text-xs md:text-sm divide-y divide-zinc-900 text-zinc-350 space-y-4">
            <div className="space-y-1.5 pb-3">
              <h5 className="font-bold text-gold font-serif">Pai Nosso</h5>
              <p className="leading-relaxed text-justify">
                "Pai nosso, que estais nos céus, santificado seja o vosso nome; venha a nós o vosso reino, seja feita a vossa vontade, assim na terra como no céu. O pão nosso de cada dia nos dai hoje; perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido; e não nos deixeis cair em tentação, mas livrai-nos do mal. Amém."
              </p>
            </div>
            
            <div className="space-y-1.5 py-3">
              <h5 className="font-bold text-gold font-serif">Ave Maria</h5>
              <p className="leading-relaxed text-justify">
                "Ave Maria, cheia de graça, o Senhor é convosco, bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós, pecadores, agora e na hora da nossa morte. Amém."
              </p>
            </div>
            
            <div className="space-y-1.5 pt-3">
              <h5 className="font-bold text-gold font-serif">Glória ao Pai</h5>
              <p className="leading-relaxed">
                "Glória ao Pai, e ao Filho, e ao Espírito Santo. Como era no princípio, agora e sempre. Amém."
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
