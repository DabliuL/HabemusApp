import React, { useState, useEffect } from 'react'
import { AlertTriangle, Trash2, Plus, Check, ShieldCheck, Heart, BookOpen, ListTodo } from 'lucide-react'

// Perguntas para exame de consciência por mandamento
const EXAM_QUESTIONS = [
  {
    mandament: '1º: Amar a Deus sobre todas as coisas',
    questions: [
      'Deixei de fazer minhas orações diárias?',
      'Duvidei de verdades da fé católica ou guardei rancor contra a Igreja?',
      'Coloquei coisas ou pessoas acima de Deus (dinheiro, carreira, fama, prazer)?',
      'Fui supersticioso ou participei de práticas espíritas/esotéricas?'
    ]
  },
  {
    mandament: '2º: Não tomar Seu Nome em vão',
    questions: [
      'Pronunciei o nome de Deus sem respeito, em piadas ou momentos de raiva?',
      'Fiz juramentos falsos ou promessas a Deus que não cumpri?',
      'Murmurei ou reclamei de Deus nas dificuldades?'
    ]
  },
  {
    mandament: '3º: Guardar domingos e festas de guarda',
    questions: [
      'Faltei à Missa aos domingos ou dias de guarda (festas litúrgicas) por preguiça ou culpa própria?',
      'Cheguei atrasado à Missa ou não prestei atenção deliberadamente?',
      'Realizei trabalhos pesados ou desnecessários no domingo, impedindo o descanso sagrado?'
    ]
  },
  {
    mandament: '4º: Honrar pai e mãe',
    questions: [
      'Fui rebelde, rude ou desrespeitoso com meus pais, avós ou superiores?',
      'Neguei ajuda material ou espiritual aos meus familiares quando precisaram?',
      'Fui descuidado na educação religiosa dos meus filhos (se aplicável)?'
    ]
  },
  {
    mandament: '5º: Não matar',
    questions: [
      'Senti ódio, desejei mal ou recusei o perdão a alguém?',
      'Prejudiquei a saúde física de mim mesmo ou de outros (excessos de álcool, drogas)?',
      'Apoiei, aconselhei ou participei de um aborto?',
      'Fui impaciente, briguento ou insultei os outros?'
    ]
  },
  {
    mandament: '6º e 9º: Castidade e pureza',
    questions: [
      'Assisti deliberadamente a conteúdos pornográficos ou obscenos?',
      'Gostei ou consenti em pensamentos e desejos impuros?',
      'Pratiquei atos de impureza (masturbação, relações fora do matrimônio)?',
      'Fui imoderado no vestir ou no falar, induzindo outros ao pecado?'
    ]
  },
  {
    mandament: '7º e 10º: Não roubar e não cobiçar bens alheios',
    questions: [
      'Peguei dinheiro ou objetos alheios sem permissão? Devolvi o que roubei?',
      'Enganei alguém em negócios ou desperdicei tempo/recursos no trabalho?',
      'Tive inveja das conquistas ou dos bens de outras pessoas?'
    ]
  },
  {
    mandament: '8º: Não levantar falso testemunho',
    questions: [
      'Menti para prejudicar ou me beneficiar às custas dos outros?',
      'Participei de fofocas, calúnias ou murmurações sobre a vida alheia?',
      'Fiz julgamentos precipitados e maldosos sobre o próximo?'
    ]
  }
]

export default function Confissao() {
  const [activeSubTab, setActiveSubTab] = useState('guia') // 'guia', 'exame', 'anotacoes'
  const [notes, setNotes] = useState([])
  const [inputNote, setInputNote] = useState('')

  // Carregar anotações do localStorage no início
  useEffect(() => {
    const savedNotes = localStorage.getItem('habemus_confession_notes')
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes))
      } catch (e) {
        console.error(e)
      }
    }
  }, [])

  // Atualizar localStorage
  const saveToLocalStorage = (updatedNotes) => {
    setNotes(updatedNotes)
    localStorage.setItem('habemus_confession_notes', JSON.stringify(updatedNotes))
  }

  // Adicionar anotação manual
  const handleAddNote = (e) => {
    e.preventDefault()
    if (!inputNote.trim()) return

    const newNote = {
      id: Date.now().toString(),
      text: inputNote.trim(),
      source: 'manual'
    }
    const updated = [...notes, newNote]
    saveToLocalStorage(updated)
    setInputNote('')
  }

  // Alternar falta anotada direta do exame (toque em qualquer lugar da linha)
  const handleToggleFromExam = (questionText) => {
    const isAlreadyNoted = notes.some(n => n.text === questionText)
    let updated
    if (isAlreadyNoted) {
      // Remover
      updated = notes.filter(n => n.text !== questionText)
    } else {
      // Adicionar
      const newNote = {
        id: Date.now().toString(),
        text: questionText,
        source: 'exam'
      }
      updated = [...notes, newNote]
    }
    saveToLocalStorage(updated)
  }

  // Excluir anotação individual
  const handleDeleteNote = (id) => {
    const updated = notes.filter(n => n.id !== id)
    saveToLocalStorage(updated)
  }

  // Apagar todas as anotações após se confessar
  const handleClearAll = () => {
    if (window.confirm('Atenção: Isso apagará permanentemente todas as suas anotações do celular. Confirma que deseja apagar?')) {
      saveToLocalStorage([])
    }
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div>
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-gold tracking-wide">
          Guia de Confissão e Exame
        </h1>
        <p className="text-zinc-400 font-sans text-xs md:text-sm">
          Prepare-se para o Sacramento da Reconciliação com total privacidade
        </p>
      </div>

      {/* Alerta de Privacidade */}
      <div className="glass-panel p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-gold shrink-0 mt-0.5" />
        <div className="space-y-1 font-sans text-xs md:text-sm">
          <h4 className="text-zinc-200 font-bold">Privacidade Absoluta Garantida</h4>
          <p className="text-zinc-400 leading-relaxed">
            Seus pecados anotados são criptografados e salvos **apenas localmente** na memória do seu celular (`localStorage`). 
            Nenhum dado é enviado para a internet. Apague tudo com um toque após a confissão.
          </p>
        </div>
      </div>

      {/* Abas */}
      <div className="flex border-b border-zinc-800">
        <button
          onClick={() => setActiveSubTab('guia')}
          className={`flex-1 py-3 text-center font-serif text-sm font-semibold transition-all cursor-pointer ${
            activeSubTab === 'guia' ? 'text-gold border-b-2 border-gold font-bold' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Como se confessar
        </button>
        <button
          onClick={() => setActiveSubTab('exame')}
          className={`flex-1 py-3 text-center font-serif text-sm font-semibold transition-all cursor-pointer ${
            activeSubTab === 'exame' ? 'text-gold border-b-2 border-gold font-bold' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Exame de Consciência
        </button>
        <button
          onClick={() => setActiveSubTab('anotacoes')}
          className={`flex-1 py-3 text-center font-serif text-sm font-semibold transition-all cursor-pointer relative ${
            activeSubTab === 'anotacoes' ? 'text-gold border-b-2 border-gold font-bold' : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <span>Minhas Anotações</span>
          {notes.length > 0 && (
            <span className="absolute top-2 right-4 bg-gold text-slate-950 text-[9px] font-bold px-1.5 py-0.5 rounded-full">
              {notes.length}
            </span>
          )}
        </button>
      </div>

      {/* Conteúdo Aba: Guia de Confissão */}
      {activeSubTab === 'guia' && (
        <div className="space-y-6 font-sans">
          <div className="glass-panel p-6 rounded-2xl space-y-4">
            <h3 className="text-lg font-serif font-bold text-gold">Os 5 Passos para uma Boa Confissão</h3>
            
            <ol className="space-y-4 text-sm text-zinc-300">
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-gold/15 text-gold border border-gold/20 flex items-center justify-center font-bold text-xs shrink-0">1</span>
                <div>
                  <strong className="text-zinc-100">Exame de Consciência:</strong> Lembre-se dos pecados cometidos desde a última confissão bem feita (utilize a aba de Exame ao lado para se guiar).
                </div>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-gold/15 text-gold border border-gold/20 flex items-center justify-center font-bold text-xs shrink-0">2</span>
                <div>
                  <strong className="text-zinc-100">Dor sincera (Contrição):</strong> Arrependa-se sinceramente dos seus pecados por amor a Deus, reconhecendo a dor que eles causam ao Sagrado Coração.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-gold/15 text-gold border border-gold/20 flex items-center justify-center font-bold text-xs shrink-0">3</span>
                <div>
                  <strong className="text-zinc-100">Propósito de Emenda:</strong> Firme a resolução de se esforçar de verdade para não cometer mais esses pecados e evitar as ocasiões que levam a eles.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-gold/15 text-gold border border-gold/20 flex items-center justify-center font-bold text-xs shrink-0">4</span>
                <div>
                  <strong className="text-zinc-100">Confissão verbal:</strong> Aponte seus pecados com sinceridade ao sacerdote, indicando a frequência e circunstâncias (ex: grave/leve), sem esconder nada.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-gold/15 text-gold border border-gold/20 flex items-center justify-center font-bold text-xs shrink-0">5</span>
                <div>
                  <strong className="text-zinc-100">Cumprimento da Penitência:</strong> Realize a oração ou ato que o sacerdote indicar como reparação pela desordem do pecado.
                </div>
              </li>
            </ol>
          </div>

          <div className="glass-panel p-6 rounded-2xl space-y-4">
            <h3 className="text-lg font-serif font-bold text-gold">Roteiro do Diálogo com o Padre</h3>
            <div className="bg-black/45 p-4 rounded-xl border border-zinc-900 text-xs md:text-sm space-y-3 leading-relaxed text-zinc-300">
              <p>
                <strong className="text-gold">Você diz:</strong> "Abençoe-me padre, porque pequei. Minha última confissão foi há [dias/meses/anos]..."
              </p>
              <p>
                <strong className="text-zinc-400">O Padre abençoa e ouve seus pecados.</strong> Você aponta todos os pecados que lembrou (pode usar o bloco de notas secreto deste aplicativo para não esquecer nada!).
              </p>
              <p>
                <strong className="text-gold">Ao terminar, você diz:</strong> "Estes são os meus pecados. Deles me arrependo de todo o coração."
              </p>
              <p>
                <strong className="text-zinc-400">O Padre aconselha, dá a penitência e pede o Ato de Contrição.</strong> Você reza a oração do arrependimento (disponível no bloco de notas).
              </p>
              <p>
                <strong className="text-zinc-400">O Padre concede a absolvição:</strong> "...Eu te absolvo de teus pecados, em nome do Pai, e do Filho, e do Espírito Santo." e você responde: <strong className="text-gold">"Amém! Agradeço a Deus porque Ele é bom."</strong>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Conteúdo Aba: Exame de Consciência */}
      {activeSubTab === 'exame' && (
        <div className="space-y-4 font-sans select-none">
          <p className="text-zinc-400 text-xs md:text-sm leading-relaxed p-1">
            Navegue pelos mandamentos e, caso identifique alguma falta cometida, toque em <strong className="text-gold">qualquer lugar da linha</strong> para marcá-la. Ela será enviada para suas anotações secretas.
          </p>

          <div className="space-y-4">
            {EXAM_QUESTIONS.map((item, index) => (
              <div key={index} className="glass-panel p-5 rounded-2xl space-y-3 border-l-2 border-l-gold/40 bg-zinc-900/10">
                <h3 className="text-sm md:text-base font-serif font-bold text-gold">
                  {item.mandament}
                </h3>
                <div className="divide-y divide-zinc-900/40">
                  {item.questions.map((question, qIdx) => {
                    const isNoted = notes.some(n => n.text === question)
                    return (
                      <div
                        key={qIdx}
                        onClick={() => handleToggleFromExam(question)}
                        className={`py-3.5 px-2 flex justify-between items-center gap-4 cursor-pointer hover:bg-zinc-900/40 rounded-xl transition-all ${
                          isNoted ? 'bg-gold/5' : ''
                        }`}
                      >
                        <p className={`text-xs md:text-sm leading-relaxed flex-1 transition-colors ${
                          isNoted ? 'text-gold font-medium' : 'text-zinc-300'
                        }`}>
                          {question}
                        </p>
                        
                        {/* Custom Checkbox */}
                        <div className="shrink-0 ml-2">
                          {isNoted ? (
                            <span className="w-5 h-5 rounded-md bg-gold flex items-center justify-center text-black shrink-0 transition-all duration-200">
                              <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                            </span>
                          ) : (
                            <span className="w-5 h-5 rounded-md border border-zinc-700 hover:border-gold shrink-0 transition-all duration-200 bg-black"></span>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Conteúdo Aba: Anotações Secretas */}
      {activeSubTab === 'anotacoes' && (
        <div className="space-y-6 font-sans">
          {/* Adicionar Anotação Manual */}
          <form onSubmit={handleAddNote} className="flex gap-2">
            <input
              type="text"
              placeholder="Escreva outro pecado para anotar..."
              value={inputNote}
              onChange={(e) => setInputNote(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-500 font-sans text-sm focus:outline-none focus:border-gold/50 transition-colors"
            />
            <button
              type="submit"
              className="bg-gold text-slate-950 font-bold px-4 rounded-xl hover:bg-gold-light transition-colors flex items-center justify-center cursor-pointer"
            >
              <Plus className="w-5 h-5" />
            </button>
          </form>

          {/* Bloco de Notas */}
          <div className="glass-panel p-5 rounded-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
              <div className="flex items-center gap-2">
                <ListTodo className="w-5 h-5 text-gold" />
                <h3 className="font-serif font-bold text-zinc-100 text-sm md:text-base">
                  Apontamentos para Confissão
                </h3>
              </div>
              {notes.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="flex items-center gap-1 text-[10px] md:text-xs text-red-400 border border-red-500/20 hover:bg-red-500/10 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Limpar Tudo</span>
                </button>
              )}
            </div>

            {notes.length > 0 ? (
              <ul className="space-y-2">
                {notes.map((note) => (
                  <li
                    key={note.id}
                    className="p-3 bg-black/50 border border-zinc-900 rounded-xl flex justify-between items-start gap-4"
                  >
                    <p className="text-xs md:text-sm text-zinc-300 leading-relaxed text-justify flex-1 select-text">
                      {note.text}
                    </p>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="text-zinc-550 hover:text-red-400 p-1 rounded transition-colors cursor-pointer"
                      title="Excluir item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="py-8 text-center text-zinc-500 font-sans text-xs md:text-sm space-y-2">
                <p>Nenhuma falta anotada.</p>
                <p className="text-[11px] text-zinc-600">
                  Adicione faltas usando a barra acima ou navegando nas questões da aba **Exame de Consciência**.
                </p>
              </div>
            )}
          </div>

          {/* Oração do Ato de Contrição */}
          <div className="glass-panel p-5 rounded-2xl border-t-2 border-t-gold space-y-3">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-gold" />
              <h4 className="font-serif font-bold text-gold text-sm uppercase tracking-wide">
                Ato de Contrição (Reze na Confissão)
              </h4>
            </div>
            <p className="text-xs md:text-sm text-zinc-400 leading-relaxed text-justify italic font-sans whitespace-pre-line bg-black/20 p-3 rounded-lg border border-zinc-900">
              {`Senhor meu, Jesus Cristo, Deus e homem verdadeiro, Criador e Redentor meu: por serdes Vós quem sois, sumamente bom e digno de ser amado sobre todas as coisas, e porque Vos amo e Vos estimo, pesa-me, Senhor, de todo o meu coração, de Vos ter ofendido.

Pesa-me também de ter perdido o Céu e merecido o Inferno.
Mas proponho firmemente, ajudado com os auxílios da Vossa divina graça, emendar-me e nunca mais Vos tornar a ofender. Espero alcançar o perdão de minhas culpas, pela Vossa infinita misericórdia.

Amém.`}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
