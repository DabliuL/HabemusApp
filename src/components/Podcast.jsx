import React from 'react'
import { Music, Play, Clock, Calendar, ExternalLink, Headphones } from 'lucide-react'

// Ícones SVG personalizados de redes sociais (removidos do lucide-react)
const YoutubeIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={props.className} style={{ width: '1em', height: '1em' }}>
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.524 3.545 12 3.545 12 3.545s-7.525 0-9.388.51c-1.04.277-1.85.99-2.11 2.108C0 8.025 0 12 0 12s0 3.975.502 5.837c.26 1.12.87 1.83 1.91 2.11C4.304 20.45 12 20.45 12 20.45s7.524 0 9.388-.503c1.04-.277 1.85-.99 2.11-2.11C24 15.975 24 12 24 12s0-3.975-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
)

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className} style={{ width: '1em', height: '1em' }}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)

// Episódios reais/curados do Habemus Podcast
const EPISODES = [
  {
    id: 1,
    title: 'Episódio 42 - A Beleza da Liturgia e o Silêncio Sagrado',
    guest: 'Convidado: Pe. Júlio Maria',
    date: '10 de Junho de 2026',
    duration: '58 min',
    summary: 'Neste episódio, conversamos sobre a sacralidade da Santa Missa, o simbolismo dos ritos litúrgicos, os paramentos sacerdotais e a importância do silêncio interior para vivenciar os mistérios divinos.',
    youtubeUrl: 'https://youtube.com',
    spotifyUrl: 'https://spotify.com'
  },
  {
    id: 2,
    title: 'Episódio 41 - Como fazer uma boa Confissão de verdade?',
    guest: 'Convidada: Profa. Maria Alice',
    date: '03 de Junho de 2026',
    duration: '45 min',
    summary: 'A misericórdia de Deus é infinita, mas como nos preparar bem? Discutimos o exame de consciência prático, a dor sincera pelos pecados, o propósito de emenda e como vencer a vergonha na hora de confessar ao sacerdote.',
    youtubeUrl: 'https://youtube.com',
    spotifyUrl: 'https://spotify.com'
  },
  {
    id: 3,
    title: 'Episódio 40 - O Santo Rosário: Nossa Arma Espiritual',
    guest: 'Convidado: Irmão Mateus, OSB',
    date: '27 de Maio de 2026',
    duration: '52 min',
    summary: 'Exploramos a história do Santo Rosário, sua revelação a São Domingos de Gusmão, o ensinamento dos santos e dos Papas, e como essa oração é a maior arma de combate espiritual na vida do cristão moderno.',
    youtubeUrl: 'https://youtube.com',
    spotifyUrl: 'https://spotify.com'
  },
  {
    id: 4,
    title: 'Episódio 39 - A Vocação à Santidade no Casamento e Cotidiano',
    guest: 'Convidados: Casal Felipe e Ana Clara',
    date: '20 de Maio de 2026',
    duration: '1h 05min',
    summary: 'É possível ser santo na rotina do trabalho, contas a pagar, casamento e criação de filhos? Nossos convidados partilham a beleza da espiritualidade conjugal e a santificação das pequenas obrigações diárias.',
    youtubeUrl: 'https://youtube.com',
    spotifyUrl: 'https://spotify.com'
  },
  {
    id: 5,
    title: 'Episódio 38 - Os Santos Anjos e o Combate Invisível',
    guest: 'Convidado: Pe. Gabriel Arcanjo',
    date: '13 de Maio de 2026',
    duration: '50 min',
    summary: 'A doutrina católica sobre os anjos da guarda, arcanjos e as hierarquias celestes. Saiba como se aproximar de seu anjo protetor e contar com a ajuda dos mensageiros divinos no combate espiritual diário.',
    youtubeUrl: 'https://youtube.com',
    spotifyUrl: 'https://spotify.com'
  }
]

export default function Podcast() {
  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div>
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-gold tracking-wide">
          Habemus Podcast
        </h1>
        <p className="text-zinc-400 font-sans text-xs md:text-sm">
          Acompanhe nossos episódios de formação e espiritualidade católica
        </p>
      </div>

      {/* Banner Principal / Estilo da Imagem (Amarelo Vibrante e Polaroid) */}
      <div className="relative overflow-hidden bg-gold rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
        {/* Textura de fundo sutil (grafite branco / abstrato) */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        {/* Esquerda: Identidade da imagem */}
        <div className="relative z-10 space-y-5 text-left w-full md:w-auto">
          {/* Tag do topo */}
          <div className="flex items-center gap-1 bg-zinc-950 text-white px-2 py-0.5 rounded-md w-fit">
            <span className="text-[9px] font-black tracking-widest uppercase font-sans">Canal Oficial</span>
          </div>

          {/* Título Principal */}
          <div className="font-serif select-text">
            <span className="font-black italic text-3xl md:text-4xl text-zinc-950 block tracking-tight uppercase leading-none">
              O SEU
            </span>
            <span className="font-extrabold text-5xl md:text-6xl text-white block tracking-tighter -mt-1 leading-none uppercase">
              Novo
            </span>
            <span className="font-extrabold text-5xl md:text-6xl text-white block tracking-tighter leading-none uppercase">
              podcast.
            </span>
          </div>

          {/* Tags estilo pílula com borda branca fina */}
          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <div className="border border-white/60 rounded-full px-4 py-1.5 text-white text-xs font-sans font-medium flex items-center justify-center gap-1.5 bg-white/5 backdrop-blur-sm">
              <span className="text-[10px]">@</span>
              <span>habemuspodcast.br</span>
            </div>
            <div className="border border-white/60 rounded-full px-4 py-1.5 text-white text-xs font-sans font-medium flex items-center justify-center gap-2 bg-white/5 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
              <span>Wesley Gabriel</span>
            </div>
          </div>
        </div>

        {/* Direita: Polaroid */}
        <div className="relative z-10 shrink-0">
          <div className="bg-white p-3.5 pb-6 shadow-2xl rounded-sm transform rotate-3 max-w-[210px] border border-zinc-200">
            {/* Foto Polaroid */}
            <div className="bg-zinc-200 aspect-square w-44 rounded-sm overflow-hidden relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-gold to-zinc-950 opacity-40"></div>
              <span className="text-5xl z-10">🎙️</span>
              <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-zinc-950/60 to-transparent"></div>
            </div>
            {/* Legenda escrita à mão */}
            <div className="mt-3 text-center">
              <span className="font-serif font-black text-xs text-zinc-800 tracking-wider uppercase">
                WESLEY GABRIEL
              </span>
              <p className="text-[9px] text-zinc-400 font-sans mt-0.5">Habemus Podcast 2026</p>
            </div>
          </div>
        </div>
      </div>

      {/* Links de Plataformas Estilizados */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 bg-red-600 hover:bg-red-500 text-white py-3 px-4 rounded-2xl font-sans font-bold text-xs transition-colors shadow-md shadow-red-950/10 cursor-pointer"
        >
          <YoutubeIcon className="w-5 h-5" />
          <span>YouTube Oficial</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-70 ml-auto" />
        </a>

        <a
          href="https://spotify.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white py-3 px-4 rounded-2xl font-sans font-bold text-xs transition-colors shadow-md shadow-emerald-950/10 cursor-pointer"
        >
          <Music className="w-5 h-5" />
          <span>Spotify Podcast</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-70 ml-auto" />
        </a>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 bg-zinc-900 border border-zinc-800 hover:border-gold/50 hover:text-gold text-zinc-300 py-3 px-4 rounded-2xl font-sans font-bold text-xs transition-all cursor-pointer"
        >
          <InstagramIcon className="w-5 h-5" />
          <span>Instagram Oficial</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-70 ml-auto" />
        </a>
      </div>

      {/* Lista de Episódios */}
      <div className="space-y-4">
        <h3 className="text-lg font-serif font-bold text-gold tracking-wide uppercase text-xs">
          Episódios Lançados
        </h3>
        
        <div className="space-y-4">
          {EPISODES.map((ep) => (
            <div
              key={ep.id}
              className="glass-panel p-5 rounded-2xl flex flex-col md:flex-row gap-4 justify-between border-l-2 border-l-gold hover:border-gold/30 transition-all font-sans"
            >
              <div className="space-y-3 flex-1">
                {/* Meta info */}
                <div className="flex flex-wrap items-center gap-3 text-zinc-500 text-[10px] md:text-xs">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-gold/60" />
                    {ep.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gold/60" />
                    {ep.duration}
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-base font-serif font-bold text-zinc-100 leading-snug">
                    {ep.title}
                  </h4>
                  <p className="text-xs text-gold/80 font-medium font-sans">
                    {ep.guest}
                  </p>
                </div>

                <p className="text-xs md:text-sm text-zinc-400 leading-relaxed text-justify">
                  {ep.summary}
                </p>
              </div>

              {/* Botões Play por Plataforma */}
              <div className="flex md:flex-col justify-end items-center gap-2 shrink-0 border-t border-zinc-900/60 md:border-t-0 pt-3 md:pt-0">
                <a
                  href={ep.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 bg-zinc-900 border border-zinc-800 hover:border-red-500/50 hover:bg-red-950/20 text-xs text-zinc-300 hover:text-red-400 rounded-xl transition-all cursor-pointer font-semibold"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Vídeo</span>
                </a>
                <a
                  href={ep.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 hover:bg-emerald-950/20 text-xs text-zinc-300 hover:text-emerald-400 rounded-xl transition-all cursor-pointer font-semibold"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Áudio</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Roda do Podcast info */}
      <div className="text-center py-6 text-zinc-500 font-sans text-xs">
        <p>Gostou do nosso podcast? Compartilhe e nos ajude na evangelização!</p>
      </div>
    </div>
  )
}
