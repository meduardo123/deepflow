const TickerIcon = () => (
  <span className="ticker-icon">
    <svg viewBox="0 0 100 100" fill="currentColor">
      <circle cx="20" cy="20" r="12" />
      <path d="M85 75v18H45c-1 0-2-.1-3-.4-5-1.3-9-6-9-11.5 0-2.2.6-4.2 1.6-6 .3-.5.7-1 1-1.5l10-10H22c-1.6 0-3 1.3-3 3v27H5V58c0-1 .1-2 .4-3 1.3-5 6-8.8 11.4-8.8h31l-11-11-5 5H5V23h19.4l12.6-12.6L74 47.2l.1.1c2 2 3 4.8 3 7.8 0 3.2-1.3 6-3.4 8.2-.2.2-12 12-12 12h21z" />
    </svg>
  </span>
)

export default function ManifestoTicker() {
  return (
    <section className="manifesto-ticker">
      <div className="ticker-track">
        <span>FLUIR É PROFUNDO</span>
        <TickerIcon />
        <span>FLUIR É PROFUNDO</span>
        <TickerIcon />
        <span>FLUIR É PROFUNDO</span>
        <TickerIcon />
        <span>FLUIR É PROFUNDO</span>
        <TickerIcon />
      </div>
    </section>
  )
}
