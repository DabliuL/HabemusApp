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
            <span className="font-black italic text-3xl md:text-4xl text-slate-950 block tracking-tight uppercase leading-none">
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
          href="https://www.youtube.com/@habemuspodcast25"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 bg-red-600 hover:bg-red-500 text-white py-3 px-4 rounded-2xl font-sans font-bold text-xs transition-colors shadow-md shadow-red-950/10 cursor-pointer"
        >
          <YoutubeIcon className="w-5 h-5" />
          <span>YouTube Oficial</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-70 ml-auto" />
        </a>

        <a
          href="https://open.spotify.com/show/3aUB8HK0MCcbiOYERxPP1w"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white py-3 px-4 rounded-2xl font-sans font-bold text-xs transition-colors shadow-md shadow-emerald-950/10 cursor-pointer"
        >
          <Music className="w-5 h-5" />
          <span>Spotify Podcast</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-70 ml-auto" />
        </a>

        <a
          href="https://www.instagram.com/habemuspodcast.br/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 bg-zinc-900 border border-zinc-800 hover:border-gold/50 hover:text-gold text-zinc-300 py-3 px-4 rounded-2xl font-sans font-bold text-xs transition-all cursor-pointer"
        >
          <InstagramIcon className="w-5 h-5" />
          <span>Instagram Oficial</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-70 ml-auto" />
        </a>
      </div>

      {/* Player do Spotify Incorporado (Sincronizado em Tempo Real) */}
      <div className="space-y-3">
        <h3 className="text-lg font-serif font-bold text-gold tracking-wide uppercase text-xs flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Feed de Episódios no Spotify (Tempo Real)
        </h3>
        <div className="glass-panel p-2 rounded-2xl border border-zinc-900 overflow-hidden">
          <iframe
            style={{ borderRadius: '12px' }}
            src="https://open.spotify.com/embed/show/3aUB8HK0MCcbiOYERxPP1w?utm_source=generator&theme=0"
            width="100%"
            height="352"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Habemus Podcast no Spotify"
          ></iframe>
        </div>
      </div>



      {/* Roda do Podcast info */}
      <div className="text-center py-6 text-zinc-500 font-sans text-xs">
        <p>Gostou do nosso podcast? Compartilhe e nos ajude na evangelização!</p>
      </div>
    </div>
  )
}
