import { useEffect, useRef, useState } from 'react'
import type { FormEvent, ImgHTMLAttributes } from 'react'
import { Link, NavLink, Route, Routes, useLocation, useParams, useSearchParams } from 'react-router-dom'
import { ArrowDown, ArrowLeft, ArrowRight, Check, ChevronLeft, ChevronRight, Heart, Menu, MessageCircle, Plus, Scissors, Sparkles, X } from 'lucide-react'
import { faqs, looks, steps, whatsappUrl } from './content'
import type { Look } from './content'

function Wordmark({ light = false }: { light?: boolean }) {
  return <Link to="/" className={`wordmark${light ? ' wordmark-light' : ''}`} aria-label="Adunola Clothings home">
    <span>adunola</span><span className="wordmark-caption">CLOTHINGS</span>
  </Link>
}

function Header() {
  const menu = useRef<HTMLDialogElement>(null)
  const location = useLocation()
  useEffect(() => { menu.current?.close() }, [location.pathname])
  const closeMenu = () => menu.current?.close()
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header">
      <div className="container header-inner">
        <Wordmark />
        <nav className="desktop-nav" aria-label="Main navigation">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/our-work">Our work</NavLink>
          <NavLink to="/the-experience">The experience</NavLink>
        </nav>
        <Link to="/enquire" className="button header-cta">Let’s create together</Link>
        <button type="button" className="icon-button menu-button" aria-label="Open navigation menu" aria-haspopup="dialog" onClick={() => menu.current?.showModal()}><Menu size={23} /></button>
      </div>
    </header>
    <dialog className="mobile-navigation" ref={menu} aria-label="Navigation menu" onClick={event => { if (event.target === event.currentTarget) closeMenu() }}>
      <div className="mobile-menu-top"><Wordmark /><button className="icon-button" type="button" aria-label="Close navigation menu" onClick={closeMenu}><X /></button></div>
      <nav aria-label="Mobile navigation">
        <NavLink to="/" end>Home <ArrowRight size={22} /></NavLink>
        <NavLink to="/our-work">Our work <ArrowRight size={22} /></NavLink>
        <NavLink to="/the-experience">The experience <ArrowRight size={22} /></NavLink>
        <Link to="/enquire" className="button">Let’s create together</Link>
      </nav>
      <p>Personal style.<br /><em>Thoughtfully expressed.</em></p>
    </dialog>
  </>
}

function RouteEffects() {
  const { pathname } = useLocation()
  useEffect(() => {
    const title = pathname === '/' ? 'Personal style, thoughtfully expressed' : pathname === '/our-work' ? 'Our work' : pathname === '/the-experience' ? 'The experience' : pathname === '/enquire' ? 'Let’s create together' : looks.find(look => pathname.endsWith(look.slug))?.name || 'Page not found'
    document.title = `Adunola Clothings — ${title}`
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function Eyebrow({ children, line = false }: { children: React.ReactNode; line?: boolean }) {
  return <p className={`eyebrow${line ? ' eyebrow-line' : ''}`}>{children}</p>
}

function TextLink({ to, children }: { to: string; children: React.ReactNode }) {
  return <Link className="text-link" to={to}>{children}<ArrowRight size={14} aria-hidden="true" /></Link>
}

function OutfitImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  const [unavailable, setUnavailable] = useState(false)
  const tone = String(props.src).includes('gold') ? 'gold' : String(props.src).includes('emerald') ? 'emerald' : String(props.src).includes('terracotta') ? 'terracotta' : 'plum'
  return <div className="outfit-image">
    <img {...props} style={unavailable ? { display: 'none' } : undefined} onError={() => setUnavailable(true)} onLoad={() => setUnavailable(false)} />
    {unavailable && <div className={`photo-placeholder photo-placeholder-${tone}`} role="img" aria-label="Outfit photograph not yet available"><span className="placeholder-wordmark">adunola</span><span className="placeholder-caption">Personal style.<br />Thoughtfully expressed.</span></div>}
  </div>
}

function Hero() {
  const [index, setIndex] = useState(0)
  const look = looks[index]
  return <section className="container hero" aria-labelledby="hero-title">
    <div className="hero-copy">
      <Eyebrow line>Personal style. Thoughtfully expressed.</Eyebrow>
      <h1 id="hero-title">For the moments<br className="hero-line" /> you want to<br /><em>feel like you.</em></h1>
      <p className="hero-description">Your ideas. Your occasion. Your own expression.<br className="desktop-break" /> Discover a more personal approach to dressing.</p>
      <div className="hero-actions"><Link to="/enquire" className="button">Enquire about an outfit <ArrowRight size={15} /></Link><TextLink to="/our-work">Explore our work</TextLink></div>
      <div className="hero-note"><Scissors size={23} strokeWidth={1} aria-hidden="true" /><p>A conversation first.<br /><span>Something uniquely yours, next.</span></p></div>
    </div>
    <div className="hero-visual">
      <figure className="hero-photo">
        <OutfitImage key={look.slug} src={look.image} alt={look.imageAlt} fetchPriority="high" width="700" height="1050" />
        <figcaption className="photo-caption"><span>The art of personal style</span><div className="photo-controls"><button type="button" aria-label="Previous outfit" onClick={() => setIndex((index + looks.length - 1) % looks.length)}><ChevronLeft size={17} /></button><span aria-live="polite">{look.number} / {String(looks.length).padStart(2, '0')}</span><button type="button" aria-label="Next outfit" onClick={() => setIndex((index + 1) % looks.length)}><ChevronRight size={17} /></button></div></figcaption>
      </figure>
      <span className="vertical-caption">Adunola Clothings — A new expression</span>
    </div>
    <a className="hero-scroll" href="#inspiration" aria-label="Scroll to outfit inspiration"><ArrowDown size={17} /> A little inspiration, below</a>
  </section>
}

function Values() {
  return <div className="values-strip"><div className="container values-inner">
    <span><Scissors size={20} strokeWidth={1.2} /> Considered details</span>
    <span><Sparkles size={20} strokeWidth={1.2} /> Individual expression</span>
    <span><Heart size={20} strokeWidth={1.2} /> Your moment, your way</span>
  </div></div>
}

function LookCard({ look }: { look: Look }) {
  return <article className="look-card">
    <Link className="look-photo" to={`/our-work/${look.slug}`} aria-label={`Discover ${look.name}`}>
      <OutfitImage src={look.image} alt={look.imageAlt} loading="lazy" width="700" height="1050" />
      <span className="look-category">{look.category}</span>
      <span className="look-discover">Discover the look <ArrowRight size={16} /></span>
    </Link>
    <div className="look-card-caption"><div><Eyebrow>Concept {look.number}</Eyebrow><h3><Link to={`/our-work/${look.slug}`}>{look.name}</Link></h3></div><Link to={`/our-work/${look.slug}`} className="circle-link" aria-label={`View ${look.name}`}><Plus size={22} strokeWidth={1} /></Link></div>
  </article>
}

function Inspiration() {
  return <section className="container section inspiration" id="inspiration" aria-labelledby="inspiration-title">
    <div className="section-heading"><div><Eyebrow>A little inspiration</Eyebrow><h2 id="inspiration-title">Beautifully different.<br /><em>Entirely you.</em></h2></div><div className="section-heading-note"><p>Statement silhouettes. Considered colour.<br />Find a starting point for your next outfit.</p><TextLink to="/our-work">Discover all looks</TextLink></div></div>
    <div className="looks-grid">{looks.slice(0, 3).map(look => <LookCard look={look} key={look.slug} />)}</div>
  </section>
}

function Approach() {
  return <section className="approach" aria-labelledby="approach-title">
    <div className="approach-photos"><OutfitImage src={looks[0].image} alt={looks[0].imageAlt} width="700" height="1050" loading="lazy" /><OutfitImage src={looks[1].image} alt={looks[1].imageAlt} width="700" height="1050" loading="lazy" /></div>
    <div className="approach-copy"><Eyebrow>More than an outfit</Eyebrow><h2 id="approach-title">A feeling.<br />A presence.<br /><em>A little of you.</em></h2><p>The shape you’re drawn to. The colour you always return to. The details that make you feel at home in what you wear.</p><p>Start with what you love. Let the conversation take it from there.</p><TextLink to="/the-experience">Discover our approach</TextLink></div>
  </section>
}

function Process({ expanded = false }: { expanded?: boolean }) {
  return <section className={`container section process${expanded ? ' process-expanded' : ''}`} aria-labelledby="process-title">
    <div className="section-heading"><div><Eyebrow>A thoughtful process</Eyebrow><h2 id="process-title">Made personal.<br /><em>From the first hello.</em></h2></div><p className="section-heading-note">A little imagination. A thoughtful process.<br />An outfit that begins with you.</p></div>
    <div className="process-grid">{steps.map(step => <article className="process-step" key={step.number}><span className="step-number">{step.number}</span><h3>{step.title}</h3><p>{step.text}</p>{expanded && <p>{step.extended}</p>}</article>)}</div>
    {!expanded && <TextLink to="/the-experience">Explore the experience</TextLink>}
  </section>
}

function FAQ() {
  return <section className="faq-section" aria-labelledby="faq-title"><div className="container faq-layout">
    <div className="faq-intro"><Eyebrow>A few helpful details</Eyebrow><h2 id="faq-title">Before we<br /><em>begin.</em></h2><p>Good questions make a<br />beautiful starting point.</p></div>
    <div className="faq-list">{faqs.map((faq, index) => <details key={faq.question} name="helpful-details"><summary aria-controls={`faq-answer-${index}`}>{faq.question}<Plus size={19} strokeWidth={1.3} aria-hidden="true" /></summary><div id={`faq-answer-${index}`} className="faq-answer"><p>{faq.answer}</p></div></details>)}</div>
  </div></section>
}

function Invitation() {
  return <section className="invitation" aria-labelledby="invitation-title"><Scissors className="invitation-scissors" size={164} strokeWidth={0.65} aria-hidden="true" /><div className="container"><Eyebrow>Something beautifully you</Eyebrow><h2 id="invitation-title">Have an outfit<br /><em>in mind?</em></h2><p>Every idea begins with a conversation.<br />We’d love to hear yours.</p><Link to="/enquire" className="button button-cream">Let’s talk about your outfit <ArrowRight size={15} /></Link></div></section>
}

function Footer() {
  return <footer className="site-footer"><div className="container footer-main"><div><Wordmark /><p>Personal style.<br />Thoughtfully expressed.</p></div><nav aria-label="Footer navigation"><Link to="/our-work">Our work</Link><Link to="/the-experience">The experience</Link><Link to="/enquire">Get in touch</Link></nav><div className="footer-conversation"><Eyebrow>A conversation first</Eyebrow><a className="text-link" href={whatsappUrl('Hello Adunola, I’d love to talk about an outfit.')} target="_blank" rel="noopener noreferrer">Say hello on WhatsApp <ArrowRight size={14} /></a><span>Something uniquely yours, next.</span></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Adunola Clothings</span><span>Considered details. Individual expression.</span><a href="#top" aria-label="Back to top">Back to top <ArrowRight size={13} /></a></div></footer>
}

function Home() {
  return <><Hero /><Values /><Inspiration /><Approach /><Process /><FAQ /><Invitation /></>
}

function Work() {
  const [filter, setFilter] = useState('All looks')
  const filtered = looks.filter(look => filter === 'All looks' || look.category === filter)
  return <><section className="container section work-section"><div className="section-heading page-heading"><div><Eyebrow>Our work · Your inspiration</Eyebrow><h1>Beautifully different.<br /><em>Entirely you.</em></h1></div><p className="section-heading-note">A few possibilities. A place to begin.<br />Discover a look, then make it your own.</p></div><div className="gallery-toolbar"><div className="filter-tabs" role="group" aria-label="Filter outfits">{['All looks', 'Occasion', 'Everyday'].map(category => <button type="button" key={category} className={filter === category ? 'selected' : ''} aria-pressed={filter === category} onClick={() => setFilter(category)}>{category}</button>)}</div><span aria-live="polite">{filtered.length.toString().padStart(2, '0')} {filtered.length === 1 ? 'look' : 'looks'}</span></div><div className="looks-grid">{filtered.map(look => <LookCard look={look} key={look.slug} />)}</div><p className="concept-note">A collection of fashion concepts to inspire your own expression. Each outfit begins with a personal conversation.</p></section><Invitation /></>
}

function LookDetails() {
  const { slug } = useParams()
  const index = looks.findIndex(look => look.slug === slug)
  const look = looks[index]
  if (!look) return <NotFound />
  const next = looks[(index + 1) % looks.length]
  return <><section className="container look-detail"><Link to="/our-work" className="back-link"><ArrowLeft size={16} /> Back to our work</Link><div className="look-detail-grid"><figure className="detail-photo"><OutfitImage src={look.image} alt={look.imageAlt} fetchPriority="high" width="700" height="1050" /><figcaption>Concept {look.number} · {look.category}</figcaption></figure><div className="detail-copy"><Eyebrow>Concept {look.number} · {look.category}</Eyebrow><h1>{look.name.split(' ').slice(0, -1).join(' ')}<br /><em>{look.name.split(' ').at(-1)}.</em></h1><p className="look-feeling">{look.feeling}</p><p>{look.description}</p><div className="look-color"><span className={`color-swatch swatch-${look.number}`} /><span>{look.color}</span></div><h2 className="detail-small-heading">The details we love</h2><ul className="detail-list">{look.details.map(detail => <li key={detail}><span />{detail}</li>)}</ul><Link to={`/enquire?look=${look.slug}`} className="button">Enquire about this look <ArrowRight size={16} /></Link><p className="detail-note">An inspiration, made personal. Fabric, fit, details, and availability are discussed with you before work begins.</p></div></div><div className="next-look"><span>A little more inspiration</span><TextLink to={`/our-work/${next.slug}`}>{next.name}</TextLink></div></section><Invitation /></>
}

function Experience() {
  return <><section className="container experience-intro"><Eyebrow>The Adunola experience</Eyebrow><h1>An outfit that starts<br /><em>with you.</em></h1><p>Your ideas, thoughtfully considered.<br />Your expression, in every detail.</p><a href="#the-process" className="text-link">Discover the process <ArrowDown size={14} /></a></section><Approach /><div id="the-process"><Process expanded /></div><section className="container experience-note"><Scissors size={30} strokeWidth={1} /><h2>A little inspiration is<br /><em>all you need to begin.</em></h2><p>You don’t need a finished design or all the answers.<br />Just an idea, an occasion, or a feeling you would love to wear.</p></section><FAQ /><Invitation /></>
}

type EnquiryValues = { name: string; email: string; occasion: string; date: string; look: string; message: string }
function buildEnquiry(values: EnquiryValues) {
  const lookName = looks.find(look => look.slug === values.look)?.name
  return [
    'Hello Adunola, I’d love to enquire about an outfit.',
    '',
    `Name: ${values.name.trim()}`,
    values.email.trim() ? `Email: ${values.email.trim()}` : '',
    `Occasion: ${values.occasion}`,
    values.date ? `Occasion date: ${values.date}` : '',
    lookName ? `Inspired by: ${lookName}` : '',
    '',
    values.message.trim(),
  ].filter((line, index) => line !== '' || index === 1).join('\n')
}

function Enquire() {
  const [searchParams] = useSearchParams()
  const selectedLook = looks.find(look => look.slug === searchParams.get('look'))
  const [readyUrl, setReadyUrl] = useState('')
  const [values, setValues] = useState<EnquiryValues>({ name: '', email: '', occasion: '', date: '', look: selectedLook?.slug || '', message: '' })
  const [storageNote, setStorageNote] = useState('')
  const initialLoad = useRef(false)
  const successPanel = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (initialLoad.current) return
    initialLoad.current = true
    try {
      const draft = sessionStorage.getItem('adunola-enquiry')
      if (draft) {
        const saved = JSON.parse(draft)
        if (saved && typeof saved === 'object') {
          setValues(current => {
            const next = { ...current }
            for (const key of Object.keys(next) as (keyof EnquiryValues)[]) {
              if (typeof saved[key] === 'string') next[key] = saved[key]
            }
            if (selectedLook) next.look = selectedLook.slug
            return next
          })
          setStorageNote('Your draft has been restored.')
        }
      }
    } catch { /* Enquiries still work when browser storage is unavailable. */ }
  }, [selectedLook])
  const update = (key: keyof EnquiryValues, value: string) => {
    setReadyUrl('')
    setValues(current => {
      const next = { ...current, [key]: value }
      try { sessionStorage.setItem('adunola-enquiry', JSON.stringify(next)) } catch { /* Storage is optional. */ }
      return next
    })
  }
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nameField = event.currentTarget.elements.namedItem('name') as HTMLInputElement
    const messageField = event.currentTarget.elements.namedItem('message') as HTMLTextAreaElement
    nameField.setCustomValidity(values.name.trim() ? '' : 'Please enter your name.')
    messageField.setCustomValidity(values.message.trim().length >= 10 ? '' : 'Please share a little more about your idea (at least 10 characters).')
    if (!event.currentTarget.reportValidity()) return
    const url = whatsappUrl(buildEnquiry(values))
    setReadyUrl(url)
    window.open(url, '_blank', 'noopener,noreferrer')
    window.setTimeout(() => successPanel.current?.focus(), 0)
  }
  const today = new Date()
  const minDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  return <section className="container enquiry-section"><div className="enquiry-intro"><Eyebrow>A conversation first</Eyebrow><h1>Something<br />beautifully<br /><em>you.</em></h1><p>Tell us what you have in mind.<br />We’ll take it from there, together.</p><div className="enquiry-aside"><Scissors size={26} strokeWidth={1} /><p>Your occasion. Your ideas.<br />An outfit that begins with you.</p></div><a href={whatsappUrl('Hello Adunola, I’d love to talk about an outfit.')} target="_blank" rel="noopener noreferrer" className="text-link">Prefer to chat? Say hello <MessageCircle size={15} /></a></div><div className="enquiry-form-wrap"><h2>Let’s talk about your outfit.</h2><p className="form-description">A few little details make a beautiful starting point.</p><form onSubmit={submit}>
    <div className="form-row"><label htmlFor="name">Your name <span aria-hidden="true">*</span><input id="name" name="name" autoComplete="name" placeholder="How should we address you?" required maxLength={100} value={values.name} onChange={event => { event.target.setCustomValidity(''); update('name', event.target.value) }} /></label><label htmlFor="email">Email address <span className="field-optional">(optional)</span><input id="email" name="email" type="email" autoComplete="email" placeholder="Your email address" maxLength={150} value={values.email} onChange={event => update('email', event.target.value)} /></label></div>
    <div className="form-row"><label htmlFor="occasion">The occasion <span aria-hidden="true">*</span><select id="occasion" name="occasion" required value={values.occasion} onChange={event => update('occasion', event.target.value)}><option value="" disabled>Select your occasion</option><option>Wedding guest</option><option>Bridal celebration</option><option>Birthday</option><option>Evening event</option><option>A special moment</option><option>Something else</option></select></label><label htmlFor="date">Occasion date <span className="field-optional">(optional)</span><input id="date" name="date" type="date" min={minDate} value={values.date} onChange={event => update('date', event.target.value)} /></label></div>
    <label htmlFor="look">A look you love <span className="field-optional">(optional)</span><select id="look" name="look" value={values.look} onChange={event => update('look', event.target.value)}><option value="">I have my own inspiration</option>{looks.map(look => <option value={look.slug} key={look.slug}>{look.name}</option>)}</select></label>
    <label htmlFor="message">Tell us a little about your idea <span aria-hidden="true">*</span><textarea id="message" name="message" placeholder="A colour, a silhouette, something you’ve seen… or simply how you’d love to feel." required minLength={10} maxLength={2000} rows={5} value={values.message} onChange={event => { event.target.setCustomValidity(''); update('message', event.target.value) }} /></label>
    <div className="form-bottom"><span>{storageNote || 'Your draft stays in this browser tab.'}</span><span>{values.message.length} / 2000</span></div>
    <button type="submit" className="button enquiry-submit">Continue on WhatsApp <MessageCircle size={17} strokeWidth={1.5} /></button><p className="form-note">This opens WhatsApp with your details ready to send. Your enquiry is shared with us only when you send the message there.</p>
  </form>{readyUrl && <div className="enquiry-success" role="status" tabIndex={-1} ref={successPanel}><Check size={22} /><div><h3>Your enquiry is ready.</h3><p>Send your prepared message in WhatsApp to start the conversation.</p><a href={readyUrl} target="_blank" rel="noopener noreferrer" className="text-link">Open WhatsApp <ArrowRight size={14} /></a></div></div>}</div></section>
}

function NotFound() {
  return <section className="container not-found"><Eyebrow>A little detour</Eyebrow><h1>Let’s find your<br /><em>way back.</em></h1><p>This page isn’t here, but there is plenty of inspiration waiting.</p><Link className="button" to="/">Back to home <ArrowRight size={16} /></Link></section>
}

export default function App() {
  return <><RouteEffects /><div id="top" /><Header /><main id="main" tabIndex={-1}><Routes><Route path="/" element={<Home />} /><Route path="/our-work" element={<Work />} /><Route path="/our-work/:slug" element={<LookDetails />} /><Route path="/the-experience" element={<Experience />} /><Route path="/enquire" element={<Enquire />} /><Route path="*" element={<NotFound />} /></Routes></main><Footer /></>
}
