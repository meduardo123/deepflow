const pillars = [
  {
    num: '01',
    title: 'Tecidos honestos',
    body: 'Pearl weave, ripstop e pima — escolhidos pelo desempenho, não pela margem.',
  },
  {
    num: '02',
    title: 'IBJJF compliant',
    body: 'Cortes e gramaturas dentro do regulamento internacional para competição.',
  },
  {
    num: '03',
    title: 'Frete grátis ↑ R$ 499',
    body: 'Envio para todo o Brasil. Trocas em até 30 dias sem complicação.',
  },
  {
    num: '04',
    title: 'Edições limitadas',
    body: 'Tiragens curtas. Quando acaba, acabou. Sem reposição automática.',
  },
]

export default function Pillars() {
  return (
    <section className="section section--pillars">
      <div className="pillars-grid">
        {pillars.map(p => (
          <div key={p.num} className="pillar">
            <div className="pillar-num">{p.num}</div>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
