import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Image src="/icone_branco.svg" alt="" width={36} height={36} className="footer-icon" />
          <p className="footer-tagline">Fluir é profundo.<br />Vestuário e equipamento de jiu jitsu, sem atalho.</p>
          <div className="footer-social">
            <a href="#" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
              </svg>
            </a>
            <a href="#" aria-label="YouTube">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="5" width="20" height="14" rx="3" />
                <path d="m10 9 5 3-5 3z" fill="currentColor" />
              </svg>
            </a>
            <a href="#" aria-label="TikTok">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.5 8.5c-1.5 0-3-.5-4-1.5v8a5.5 5.5 0 1 1-5.5-5.5v3a2.5 2.5 0 1 0 2.5 2.5V3h3c.2 1.5 1.5 3 4 3v2.5z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Loja</h4>
          <ul>
            <li><Link href="/kimono">Kimonos</Link></li>
            <li><Link href="/rashguard">Rash Guard</Link></li>
            <li><Link href="/casual">Casual</Link></li>
            <li><Link href="/acessorios">Acessórios</Link></li>
            <li><Link href="/raiz">Coleção Raiz</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Ajuda</h4>
          <ul>
            <li><a href="#">Guia de tamanhos</a></li>
            <li><a href="#">Trocas e devoluções</a></li>
            <li><a href="#">Formas de envio</a></li>
            <li><a href="#">Pagamento</a></li>
            <li><a href="#">Fale conosco</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Institucional</h4>
          <ul>
            <li><a href="#">Sobre a Deepflow</a></li>
            <li><a href="#">Manifesto</a></li>
            <li><a href="#">Atletas patrocinados</a></li>
            <li><a href="#">Política de privacidade</a></li>
            <li><a href="#">Termos de uso</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Atendimento</h4>
          <ul className="footer-contact">
            <li>contato@deepflow.com.br</li>
            <li>WhatsApp · (11) 9 0000-0000</li>
            <li>Seg a Sex · 9h às 18h</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <Image src="/logo.svg" alt="Deepflow" width={1200} height={80} className="footer-bigtype" />
      </div>

      <div className="footer-legal">
        <p>© 2026 Deepflow Jiu Jitsu Apparel · CNPJ 00.000.000/0001-00</p>
        <p>Pagamento seguro · Cartão · Pix · Boleto</p>
      </div>
    </footer>
  )
}
