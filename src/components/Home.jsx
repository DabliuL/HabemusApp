import React from 'react'
import { BookOpen, Flame, Heart, Shield, Headphones, Calendar, Compass, MessageSquare, Footprints } from 'lucide-react'

// Citações diárias de santos
const quotes = [
  { text: "Nada te turbe, nada te espante, tudo passa, Deus não muda. A paciência tudo alcança; quem a Deus tem, nada lhe falta. Só Deus basta.", author: "Santa Teresa de Ávila" },
  { text: "Se queres compreender o amor, olha para a Cruz. Nela vemos o quanto Deus nos ama e o quanto devemos amar uns aos outros.", author: "São João Paulo II" },
  { text: "A medida do amor é amar sem medida.", author: "Santo Agostinho de Hipona" },
  { text: "Para mim, a oração é um impulso do coração, um simples olhar dirigido ao céu, um grito de agradecimento e de amor, tanto no meio da provação como no meio da alegria.", author: "Santa Teresinha do Menino Jesus" },
  { text: "Fica sabendo que a oração é a melhor arma que possuímos; ela é uma chave que abre o coração de Deus.", author: "São Padre Pio de Pietrelcina" },
  { text: "Onde não há amor, coloca amor e colherás amor.", author: "São João da Cruz" },
  { text: "Não nos cansemos de fazer o bem, pois a seu tempo ceifaremos, se não desanimarmos.", author: "São Paulo Apóstolo" }
]

// Santos do dia baseados no dia do mês (1 a 31)
const saints = [
  { name: "Santa Maria, Mãe de Deus", description: "Mãe do Salvador e nossa protetora celestial." },
  { name: "São Basílio Magno", description: "Doutor da Igreja, defensor da fé Trinitária." },
  { name: "Santo Antão do Deserto", description: "Pai do monaquismo cristão, exemplo de oração profunda." },
  { name: "São Francisco de Sales", description: "Padroeiro dos escritores e jornalistas, mestre da doçura." },
  { name: "Conversão de São Paulo", description: "O grande apóstolo das nações, transformado pela graça." },
  { name: "São Tomás de Aquino", description: "Doutor Angélico, padroeiro dos estudantes e filósofos." },
  { name: "São João Bosco", description: "Pai e mestre da juventude, fundador dos Salesianos." },
  { name: "Apresentação do Senhor", description: "Cristo, a luz para iluminar as nações." },
  { name: "São Brás", description: "Protetor das doenças da garganta e mártir da fé." },
  { name: "Santa Escolástica", description: "Irmã de São Bento, consagrada à vida contemplativa." },
  { name: "Nossa Senhora de Lourdes", description: "Aparição mariana, fonte de curas e conversões." },
  { name: "Santo Inácio de Antioquia", description: "Discípulo do Apóstolo João, mártir da Eucaristia." },
  { name: "São Cirilo e São Metódio", description: "Apóstolos dos eslavos e copadroeiros da Europa." },
  { name: "Santo Antão de Pádua", description: "Grande pregador e doutor evangélico." },
  { name: "São Bento de Núrsia", description: "Pai do monaquismo ocidental, autor do lema 'Ora et Labora'." },
  { name: "São José, Esposo de Maria", description: "Protetor da Sagrada Família e da Igreja Universal." },
  { name: "Anunciação do Senhor", description: "O 'Sim' de Maria que trouxe a salvação ao mundo." },
  { name: "São Jorge, Mártir", description: "Defensor da fé contra as forças do mal." },
  { name: "São Marcos Evangelista", description: "Autor do segundo Evangelho, discípulo de Pedro." },
  { name: "São Filipe e São Tiago", description: "Apóstolos que deram a vida para anunciar Cristo." },
  { name: "São Matias Apóstolo", description: "Escolhido para completar o colégio dos Doze." },
  { name: "São Pascoal Bailão", description: "Devotado adorador do Santíssimo Sacramento." },
  { name: "Santa Rita de Cássia", description: "Padroeira das causas impossíveis e reconciliação." },
  { name: "São Filipe Néri", description: "O santo da alegria e apóstolo de Roma." },
  { name: "Santo Agostinho de Cantuária", description: "Apóstolo da Inglaterra, monge beneditino." },
  { name: "Santo António de Lisboa", description: "Doutor da Igreja e padroeiro dos pobres." },
  { name: "São João Batista", description: "O precursor do Senhor, voz que clama no deserto." },
  { name: "São Pedro e São Paulo", description: "Colunas da Igreja de Cristo, mártires em Roma." },
  { name: "São Tomé Apóstolo", description: "O apóstolo que tocou nas chagas do Ressuscitado." },
  { name: "Santa Maria Madalena", description: "Apóstola dos Apóstolos, testemunha da Ressurreição." },
  { name: "São Tiago Maior", description: "Primeiro dos apóstolos a sofrer o martírio." }
]

export default function Home({ setCurrentTab, setOracoesSubTab }) {
  const today = new Date()
  const dayOfWeek = today.getDay() // 0 a 6
  const dayOfMonth = today.getDate() // 1 a 31
  
  const dailyQuote = quotes[dayOfWeek % quotes.length]
  const dailySaint = saints[(dayOfMonth - 1) % saints.length]

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  const dateStr = today.toLocaleDateString('pt-BR', options)
  const formattedDate = dateStr.charAt(0).toUpperCase() + dateStr.slice(1)

  return (
    <div className="space-y-6">
      {/* Mensagem de Boas-Vindas */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-gold tracking-wide">
          Salve Maria!
        </h1>
        <p className="text-zinc-400 font-sans text-sm md:text-base flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gold" />
          {formattedDate}
        </p>
      </div>

      {/* Card da Frase do Dia e Santo do Dia */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Frase do Dia */}
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between min-h-[180px]">
          <div className="absolute top-0 right-0 p-8 text-7xl text-gold/5 font-serif pointer-events-none select-none">
            “
          </div>
          <p className="text-zinc-200 italic font-sans leading-relaxed text-sm md:text-base relative z-10">
            "{dailyQuote.text}"
          </p>
          <p className="text-gold font-serif text-right text-xs md:text-sm font-semibold mt-4">
            — {dailyQuote.author}
          </p>
        </div>

        {/* Santo do Dia */}
        <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between min-h-[180px] border-l-4 border-l-gold">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-gold bg-gold/10 px-2 py-0.5 rounded-md">
              Santo do Dia
            </span>
            <h3 className="text-lg md:text-xl font-serif font-bold text-zinc-100 mt-2">
              {dailySaint.name}
            </h3>
            <p className="text-zinc-400 text-sm mt-2 leading-relaxed font-sans">
              {dailySaint.description}
            </p>
          </div>
          <div className="text-zinc-550 text-xs mt-4 flex items-center gap-1.5 font-sans">
            <Compass className="w-3.5 h-3.5 text-gold/50" />
            Que sua intercessão nos acompanhe hoje.
          </div>
        </div>
      </div>

      {/* Atalhos Rápidos */}
      <div className="space-y-3">
        <h2 className="text-lg font-serif font-semibold text-gold tracking-wider uppercase text-xs">
          Acesso Rápido
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <button
            onClick={() => setCurrentTab('liturgia')}
            className="glass-panel p-4 rounded-xl flex flex-col items-center justify-center text-center gap-2 transition-all duration-200 hover:scale-[1.03] hover:border-gold/30 group cursor-pointer"
          >
            <div className="p-3 rounded-full bg-zinc-900 text-gold group-hover:bg-gold/10 transition-colors">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="font-serif font-semibold text-sm text-zinc-200 group-hover:text-gold">Liturgia</span>
            <span className="text-[10px] text-zinc-500 font-sans hidden sm:block">Leituras da missa de hoje</span>
          </button>

          <button
            onClick={() => setCurrentTab('terco')}
            className="glass-panel p-4 rounded-xl flex flex-col items-center justify-center text-center gap-2 transition-all duration-200 hover:scale-[1.03] hover:border-gold/30 group cursor-pointer"
          >
            <div className="p-3 rounded-full bg-zinc-900 text-gold group-hover:bg-gold/10 transition-colors">
              <Flame className="w-6 h-6" />
            </div>
            <span className="font-serif font-semibold text-sm text-zinc-200 group-hover:text-gold">Santo Terço</span>
            <span className="text-[10px] text-zinc-500 font-sans hidden sm:block">Reze o terço passo a passo</span>
          </button>

          <button
            onClick={() => {
              setCurrentTab('oracoes')
              setOracoesSubTab('viasacra')
            }}
            className="glass-panel p-4 rounded-xl flex flex-col items-center justify-center text-center gap-2 transition-all duration-200 hover:scale-[1.03] hover:border-gold/30 group cursor-pointer"
          >
            <div className="p-3 rounded-full bg-zinc-900 text-gold group-hover:bg-gold/10 transition-colors">
              <Footprints className="w-6 h-6" />
            </div>
            <span className="font-serif font-semibold text-sm text-zinc-200 group-hover:text-gold">Via Sacra</span>
            <span className="text-[10px] text-zinc-500 font-sans hidden sm:block">Medite o caminho da cruz</span>
          </button>

          <button
            onClick={() => setCurrentTab('oracoes')}
            className="glass-panel p-4 rounded-xl flex flex-col items-center justify-center text-center gap-2 transition-all duration-200 hover:scale-[1.03] hover:border-gold/30 group cursor-pointer"
          >
            <div className="p-3 rounded-full bg-zinc-900 text-gold group-hover:bg-gold/10 transition-colors">
              <Heart className="w-6 h-6" />
            </div>
            <span className="font-serif font-semibold text-sm text-zinc-200 group-hover:text-gold">Orações</span>
            <span className="text-[10px] text-zinc-500 font-sans hidden sm:block">Índice completo de orações</span>
          </button>

          <button
            onClick={() => setCurrentTab('confissao')}
            className="glass-panel p-4 rounded-xl flex flex-col items-center justify-center text-center gap-2 transition-all duration-200 hover:scale-[1.03] hover:border-gold/30 group cursor-pointer"
          >
            <div className="p-3 rounded-full bg-zinc-900 text-gold group-hover:bg-gold/10 transition-colors">
              <Shield className="w-6 h-6" />
            </div>
            <span className="font-serif font-semibold text-sm text-zinc-200 group-hover:text-gold">Confissão</span>
            <span className="text-[10px] text-zinc-500 font-sans hidden sm:block">Prepare seu exame de consciência</span>
          </button>

          <button
            onClick={() => setCurrentTab('podcast')}
            className="glass-panel p-4 rounded-xl flex flex-col items-center justify-center text-center gap-2 transition-all duration-200 hover:scale-[1.03] hover:border-gold/30 group cursor-pointer"
          >
            <div className="p-3 rounded-full bg-zinc-900 text-gold group-hover:bg-gold/10 transition-colors">
              <Headphones className="w-6 h-6" />
            </div>
            <span className="font-serif font-semibold text-sm text-zinc-200 group-hover:text-gold">Podcast</span>
            <span className="text-[10px] text-zinc-500 font-sans hidden sm:block">Habemus Podcast e mídias</span>
          </button>
        </div>
      </div>

      {/* Banner da Semana */}
      <div className="glass-panel p-5 rounded-2xl bg-gradient-to-r from-zinc-900 to-black border border-gold/10 flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="text-gold font-serif font-bold text-sm tracking-wide">EXAME DE CONSCIÊNCIA</h4>
          <p className="text-zinc-300 text-xs md:text-sm font-sans leading-relaxed">
            Seus apontamentos para a confissão são criptografados localmente. Sua privacidade está 100% segura.
          </p>
        </div>
        <button
          onClick={() => setCurrentTab('confissao')}
          className="bg-gold text-slate-950 font-sans font-bold text-xs px-4 py-2 rounded-lg transition-colors hover:bg-gold-light shrink-0 cursor-pointer"
        >
          Iniciar
        </button>
      </div>
    </div>
  )
}
