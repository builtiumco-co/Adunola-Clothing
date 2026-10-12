import { useEffect, useRef, useState } from "react";
import type { FormEvent, ImgHTMLAttributes } from "react";
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import {
  ArrowDown,
  ArrowRight,
  Check,
  Heart,
  Menu,
  MessageCircle,
  Plus,
  Scissors,
  Sparkles,
  X,
} from "lucide-react";
import { brand, faqs, looks, services, steps, whatsappUrl } from "./content";
import {
  About,
  BrandIntroduction,
  CollectionPending,
  Contact,
  OrderEssentials,
  Policies,
  Privacy,
  Services,
  ServicesOverview,
} from "./BrandPages";

function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <Link
      to="/"
      className={`wordmark${light ? " wordmark-light" : ""}`}
      aria-label="Adunola Clothing home"
    >
      <span>adunola</span>
      <span className="wordmark-caption">CLOTHING</span>
    </Link>
  );
}

function Header() {
  const menu = useRef<HTMLDialogElement>(null);
  const location = useLocation();
  useEffect(() => {
    menu.current?.close();
  }, [location.pathname]);
  const closeMenu = () => menu.current?.close();
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <Wordmark />
          <nav className="desktop-nav" aria-label="Main navigation">
            <NavLink to="/" end>
              Home
            </NavLink>
            <NavLink to="/about">About us</NavLink>
            <NavLink to="/services">Services</NavLink>
            <NavLink to="/the-experience">How to order</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>
          <Link to="/enquire" className="button header-cta">
            Let’s create together
          </Link>
          <button
            type="button"
            className="icon-button menu-button"
            aria-label="Open navigation menu"
            aria-haspopup="dialog"
            onClick={() => menu.current?.showModal()}
          >
            <Menu size={23} />
          </button>
        </div>
      </header>
      <dialog
        className="mobile-navigation"
        ref={menu}
        aria-label="Navigation menu"
        onClick={(event) => {
          if (event.target === event.currentTarget) closeMenu();
        }}
      >
        <div className="mobile-menu-top">
          <Wordmark />
          <button
            className="icon-button"
            type="button"
            aria-label="Close navigation menu"
            onClick={closeMenu}
          >
            <X />
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          <NavLink to="/" end>
            Home <ArrowRight size={22} />
          </NavLink>
          <NavLink to="/about">
            About us <ArrowRight size={22} />
          </NavLink>
          <NavLink to="/services">
            Services <ArrowRight size={22} />
          </NavLink>
          <NavLink to="/the-experience">
            How to order <ArrowRight size={22} />
          </NavLink>
          <NavLink to="/contact">
            Contact <ArrowRight size={22} />
          </NavLink>
          <Link to="/enquire" className="button">
            Let’s create together
          </Link>
        </nav>
        <p>
          Simple. Unique.
          <br />
          <em>You.</em>
        </p>
      </dialog>
    </>
  );
}

function RouteEffects() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const titles: Record<string, string> = {
      "/": "Simple. Unique. You.",
      "/about": "About us",
      "/services": "Our services",
      "/the-experience": "How to order",
      "/contact": "Contact us",
      "/enquire": "Custom outfit enquiry",
      "/policies": "Ordering, payment & delivery",
      "/privacy": "Your privacy",
      "/our-work": "Our work · Coming soon",
      "/shop": "Ready-to-wear · Coming soon",
    };
    document.title = `Adunola Clothing — ${titles[pathname] || (pathname.startsWith("/our-work/") ? "Our work · Coming soon" : "Page not found")}`;
    const descriptions: Record<string, string> = {
      "/about":
        "Meet Adunola Clothing, a Nigerian fashion brand in Akure, Ondo State creating simple, unique, stylish, and affordable outfits for women.",
      "/services":
        "Custom dresses and gowns, two-piece outfits, trousers and tops, corporate wear, native outfits, and custom sewing with your own fabric.",
      "/contact":
        "Contact Adunola Clothing in Akure on WhatsApp at 09032022101 or email olawalebunmi05@gmail.com. Collection and nationwide delivery can be arranged.",
      "/the-experience":
        "How to order custom clothing from Adunola: discuss your design, agree on a quote and a 70% deposit, provide measurements, and arrange collection or delivery.",
      "/policies":
        "Read Adunola Clothing’s ordering information: custom quotes, a 70% deposit by bank transfer, production times, measurements, adjustments, and delivery.",
      "/privacy":
        "Learn how Adunola Clothing’s website prepares your WhatsApp enquiry and saves your draft in your browser tab.",
      "/enquire":
        "Tell Adunola Clothing about your custom outfit, occasion, fabric preferences, and delivery location. Continue your conversation on WhatsApp.",
    };
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        descriptions[pathname] ||
          "Adunola Clothing — Simple. Unique. You. Affordable, well-tailored outfits for women in Akure, Ondo State, with nationwide delivery across Nigeria.",
      );
    const frame = window.requestAnimationFrame(() => {
      let target: HTMLElement | null = null;
      try {
        target = hash
          ? document.getElementById(decodeURIComponent(hash.slice(1)))
          : null;
      } catch {
        /* Ignore invalid anchor encoding. */
      }
      if (target) target.scrollIntoView({ behavior: "instant" });
      else window.scrollTo({ top: 0, behavior: "instant" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathname, hash]);
  return null;
}

function Eyebrow({
  children,
  line = false,
}: {
  children: React.ReactNode;
  line?: boolean;
}) {
  return <p className={`eyebrow${line ? " eyebrow-line" : ""}`}>{children}</p>;
}

function TextLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link className="text-link" to={to}>
      {children}
      <ArrowRight size={14} aria-hidden="true" />
    </Link>
  );
}

function OutfitImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  const [unavailable, setUnavailable] = useState(false);
  const tone = String(props.src).includes("gold")
    ? "gold"
    : String(props.src).includes("emerald")
      ? "emerald"
      : String(props.src).includes("terracotta")
        ? "terracotta"
        : "plum";
  return (
    <div className="outfit-image">
      <img
        {...props}
        style={unavailable ? { display: "none" } : undefined}
        onError={() => setUnavailable(true)}
        onLoad={() => setUnavailable(false)}
      />
      {unavailable && (
        <div
          className={`photo-placeholder photo-placeholder-${tone}`}
          role="img"
          aria-label="Outfit photograph not yet available"
        >
          <span className="placeholder-wordmark">adunola</span>
          <span className="placeholder-caption">
            Personal style.
            <br />
            Thoughtfully expressed.
          </span>
        </div>
      )}
    </div>
  );
}

function Hero() {
  return (
    <section className="container hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <Eyebrow line>Adunola Clothing · Simple but Unique</Eyebrow>
        <h1 id="hero-title">
          Simple.
          <br />
          Unique.
          <br />
          <em>You.</em>
        </h1>
        <p className="hero-description">
          Stylish, affordable outfits for women.
          <br />
          Thoughtfully tailored in Akure, made for your own expression.
        </p>
        <div className="hero-actions">
          <Link to="/enquire" className="button">
            Enquire about an outfit <ArrowRight size={15} />
          </Link>
          <TextLink to="/services">Our services</TextLink>
        </div>
        <div className="hero-note">
          <Scissors size={23} strokeWidth={1} aria-hidden="true" />
          <p>
            Attention to detail. A personal touch.
            <br />
            <span>From Akure, with care.</span>
          </p>
        </div>
      </div>
      <div className="hero-visual">
        <figure className="hero-photo">
          <OutfitImage
            src={looks[0].image}
            alt={looks[0].imageAlt}
            fetchPriority="high"
            width="720"
            height="1280"
          />
          <figcaption className="photo-caption">
            <span>Style inspiration</span>
            <span>Simple. Unique. You.</span>
          </figcaption>
        </figure>
        <span className="vertical-caption">
          Adunola Clothing — Simple but Unique
        </span>
      </div>
      <a
        className="hero-scroll"
        href="#services"
        aria-label="Explore our services"
      >
        <ArrowDown size={17} /> Made for your moments
      </a>
    </section>
  );
}

function Values() {
  return (
    <div className="values-strip">
      <div className="container values-inner">
        <span>
          <Scissors size={20} strokeWidth={1.2} /> Considered details
        </span>
        <span>
          <Sparkles size={20} strokeWidth={1.2} /> Individual expression
        </span>
        <span>
          <Heart size={20} strokeWidth={1.2} /> Your moment, your way
        </span>
      </div>
    </div>
  );
}

function Approach() {
  return <BrandIntroduction />;
}

function Process({ expanded = false }: { expanded?: boolean }) {
  return (
    <section
      className={`container section process${expanded ? " process-expanded" : ""}`}
      aria-labelledby="process-title"
    >
      <div className="section-heading">
        <div>
          <Eyebrow>A thoughtful process</Eyebrow>
          <h2 id="process-title">
            Made personal.
            <br />
            <em>From the first hello.</em>
          </h2>
        </div>
        <p className="section-heading-note">
          A little imagination. A thoughtful process.
          <br />
          An outfit that begins with you.
        </p>
      </div>
      <div className="process-grid">
        {steps.map((step) => (
          <article className="process-step" key={step.number}>
            <span className="step-number">{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
            {expanded && <p>{step.extended}</p>}
          </article>
        ))}
      </div>
      {!expanded && (
        <TextLink to="/the-experience">Explore the experience</TextLink>
      )}
    </section>
  );
}

function FAQ() {
  return (
    <section className="faq-section" aria-labelledby="faq-title">
      <div className="container faq-layout">
        <div className="faq-intro">
          <Eyebrow>A few helpful details</Eyebrow>
          <h2 id="faq-title">
            Before we
            <br />
            <em>begin.</em>
          </h2>
          <p>
            Good questions make a<br />
            beautiful starting point.
          </p>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <details key={faq.question} name="helpful-details">
              <summary aria-controls={`faq-answer-${index}`}>
                {faq.question}
                <Plus size={19} strokeWidth={1.3} aria-hidden="true" />
              </summary>
              <div id={`faq-answer-${index}`} className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Invitation() {
  return (
    <section className="invitation" aria-labelledby="invitation-title">
      <Scissors
        className="invitation-scissors"
        size={164}
        strokeWidth={0.65}
        aria-hidden="true"
      />
      <div className="container">
        <Eyebrow>Something beautifully you</Eyebrow>
        <h2 id="invitation-title">
          Have an outfit
          <br />
          <em>in mind?</em>
        </h2>
        <p>
          Every idea begins with a conversation.
          <br />
          We’d love to hear yours.
        </p>
        <Link to="/enquire" className="button button-cream">
          Let’s talk about your outfit <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div>
          <Wordmark />
          <p>
            Simple. Unique. You.
            <br />
            Akure, Ondo State, Nigeria.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <Link to="/about">About us</Link>
          <Link to="/services">Our services</Link>
          <Link to="/the-experience">How to order</Link>
          <Link to="/contact">Contact us</Link>
          <Link to="/policies">Ordering & delivery</Link>
          <Link to="/privacy">Privacy</Link>
        </nav>
        <div className="footer-conversation">
          <Eyebrow>Let’s stay in touch</Eyebrow>
          <a
            className="text-link"
            href={whatsappUrl(
              "Hello Adunola Clothing, I’d love to talk about an outfit.",
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp · {brand.phone} <ArrowRight size={14} />
          </a>
          <a className="footer-email" href={`mailto:${brand.email}`}>
            {brand.email}
          </a>
          <div className="footer-socials">
            <a href={brand.instagram} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a
              href={brand.tiktokSearch}
              target="_blank"
              rel="noopener noreferrer"
            >
              Find us on TikTok
            </a>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Adunola Clothing</span>
        <span>Simple but Unique.</span>
        <a href="#top" aria-label="Back to top">
          Back to top <ArrowRight size={13} />
        </a>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <Values />
      <BrandIntroduction />
      <ServicesOverview />
      <Process />
      <OrderEssentials />
      <FAQ />
      <Invitation />
    </>
  );
}

function Experience() {
  return (
    <>
      <section className="container experience-intro">
        <Eyebrow>The Adunola experience</Eyebrow>
        <h1>
          An outfit that starts
          <br />
          <em>with you.</em>
        </h1>
        <p>
          Your ideas, thoughtfully considered.
          <br />
          Your expression, in every detail.
        </p>
        <a href="#the-process" className="text-link">
          Discover the process <ArrowDown size={14} />
        </a>
      </section>
      <Approach />
      <div id="the-process">
        <Process expanded />
      </div>
      <section className="container experience-note">
        <Scissors size={30} strokeWidth={1} />
        <h2>
          A little inspiration is
          <br />
          <em>all you need to begin.</em>
        </h2>
        <p>
          You don’t need a finished design or all the answers.
          <br />
          Just an idea, an occasion, or a feeling you would love to wear.
        </p>
      </section>
      <FAQ />
      <Invitation />
    </>
  );
}

type EnquiryValues = {
  name: string;
  email: string;
  occasion: string;
  date: string;
  service: string;
  fabric: string;
  fulfilment: string;
  city: string;
  budget: string;
  message: string;
};
function buildEnquiry(values: EnquiryValues) {
  const serviceName = services.find(
    (service) => service.slug === values.service,
  )?.name;
  return [
    "Hello Adunola Clothing, I’d love to enquire about a custom-made outfit.",
    "",
    `Name: ${values.name.trim()}`,
    values.email.trim() ? `Email: ${values.email.trim()}` : "",
    `Occasion: ${values.occasion}`,
    values.date ? `Occasion date: ${values.date}` : "",
    serviceName ? `Outfit: ${serviceName}` : "",
    values.fabric ? `Fabric: ${values.fabric}` : "",
    values.fulfilment ? `Collection / delivery: ${values.fulfilment}` : "",
    values.city.trim() ? `Delivery location: ${values.city.trim()}` : "",
    values.budget.trim() ? `Budget (NGN): ${values.budget.trim()}` : "",
    "",
    values.message.trim(),
  ]
    .filter((line, index) => line !== "" || index === 1)
    .join("\n");
}

function Enquire() {
  const [searchParams] = useSearchParams();
  const selectedService = services.find(
    (service) => service.slug === searchParams.get("service"),
  );
  const [readyUrl, setReadyUrl] = useState("");
  const [values, setValues] = useState<EnquiryValues>({
    name: "",
    email: "",
    occasion: "",
    date: "",
    service: selectedService?.slug || "",
    fabric: "",
    fulfilment: "",
    city: "",
    budget: "",
    message: "",
  });
  const [storageNote, setStorageNote] = useState("");
  const initialLoad = useRef(false);
  const successPanel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (initialLoad.current) return;
    initialLoad.current = true;
    try {
      const draft = sessionStorage.getItem("adunola-enquiry");
      if (draft) {
        const saved = JSON.parse(draft);
        if (saved && typeof saved === "object") {
          setValues((current) => {
            const next = { ...current };
            for (const key of Object.keys(next) as (keyof EnquiryValues)[]) {
              if (typeof saved[key] === "string") next[key] = saved[key];
            }
            if (selectedService) next.service = selectedService.slug;
            return next;
          });
          setStorageNote("Your draft has been restored.");
        }
      }
    } catch {
      /* Enquiries still work when browser storage is unavailable. */
    }
  }, [selectedService]);
  const update = (key: keyof EnquiryValues, value: string) => {
    setReadyUrl("");
    setValues((current) => {
      const next = { ...current, [key]: value };
      try {
        sessionStorage.setItem("adunola-enquiry", JSON.stringify(next));
      } catch {
        /* Storage is optional. */
      }
      return next;
    });
  };
  const clearDraft = () => {
    try {
      sessionStorage.removeItem("adunola-enquiry");
    } catch {
      /* Storage is optional. */
    }
    setValues({
      name: "",
      email: "",
      occasion: "",
      date: "",
      service: selectedService?.slug || "",
      fabric: "",
      fulfilment: "",
      city: "",
      budget: "",
      message: "",
    });
    setReadyUrl("");
    setStorageNote("Your draft has been cleared.");
  };
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nameField = event.currentTarget.elements.namedItem(
      "name",
    ) as HTMLInputElement;
    const messageField = event.currentTarget.elements.namedItem(
      "message",
    ) as HTMLTextAreaElement;
    nameField.setCustomValidity(
      values.name.trim() ? "" : "Please enter your name.",
    );
    messageField.setCustomValidity(
      values.message.trim().length >= 10
        ? ""
        : "Please share a little more about your idea (at least 10 characters).",
    );
    if (!event.currentTarget.reportValidity()) return;
    const url = whatsappUrl(buildEnquiry(values));
    setReadyUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
    window.setTimeout(() => successPanel.current?.focus(), 0);
  };
  const today = new Date();
  const minDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  return (
    <section className="container enquiry-section">
      <div className="enquiry-intro">
        <Eyebrow>A conversation first</Eyebrow>
        <h1>
          Something
          <br />
          beautifully
          <br />
          <em>you.</em>
        </h1>
        <p>
          Tell us what you have in mind.
          <br />
          We’ll take it from there, together.
        </p>
        <div className="enquiry-aside">
          <Scissors size={26} strokeWidth={1} />
          <p>
            Your occasion. Your ideas.
            <br />
            An outfit that begins with you.
          </p>
        </div>
        <a
          href={whatsappUrl("Hello Adunola, I’d love to talk about an outfit.")}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link"
        >
          Prefer to chat? Say hello <MessageCircle size={15} />
        </a>
      </div>
      <div className="enquiry-form-wrap">
        <h2>Let’s talk about your outfit.</h2>
        <p className="form-description">
          A few little details make a beautiful starting point.
        </p>
        <form onSubmit={submit}>
          <div className="form-row">
            <label htmlFor="name">
              Your name <span aria-hidden="true">*</span>
              <input
                id="name"
                name="name"
                autoComplete="name"
                placeholder="How should we address you?"
                required
                maxLength={100}
                value={values.name}
                onChange={(event) => {
                  event.target.setCustomValidity("");
                  update("name", event.target.value);
                }}
              />
            </label>
            <label htmlFor="email">
              Email address <span className="field-optional">(optional)</span>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Your email address"
                maxLength={150}
                value={values.email}
                onChange={(event) => update("email", event.target.value)}
              />
            </label>
          </div>
          <div className="form-row">
            <label htmlFor="occasion">
              The occasion <span aria-hidden="true">*</span>
              <select
                id="occasion"
                name="occasion"
                required
                value={values.occasion}
                onChange={(event) => update("occasion", event.target.value)}
              >
                <option value="" disabled>
                  Select your occasion
                </option>
                <option>Wedding guest</option>
                <option>Bridal celebration</option>
                <option>Birthday</option>
                <option>Evening event</option>
                <option>A special moment</option>
                <option>Everyday wear</option>
                <option>Work / corporate</option>
                <option>Native / traditional occasion</option>
                <option>Something else</option>
              </select>
            </label>
            <label htmlFor="date">
              Occasion date <span className="field-optional">(optional)</span>
              <input
                id="date"
                name="date"
                type="date"
                min={minDate}
                value={values.date}
                onChange={(event) => update("date", event.target.value)}
              />
            </label>
          </div>
          <label htmlFor="service">
            Your outfit <span aria-hidden="true">*</span>
            <select
              id="service"
              name="service"
              required
              value={values.service}
              onChange={(event) => update("service", event.target.value)}
            >
              <option value="" disabled>
                Select your outfit or service
              </option>
              {services.map((service) => (
                <option value={service.slug} key={service.slug}>
                  {service.name}
                </option>
              ))}
            </select>
          </label>
          <div className="form-row">
            <label htmlFor="fabric">
              Fabric preference{" "}
              <span className="field-optional">(optional)</span>
              <select
                id="fabric"
                value={values.fabric}
                onChange={(event) => update("fabric", event.target.value)}
              >
                <option value="">Let’s discuss it</option>
                <option>I will supply my fabric</option>
                <option>I need help choosing fabric</option>
              </select>
            </label>
            <label htmlFor="budget">
              Your budget in NGN{" "}
              <span className="field-optional">(optional)</span>
              <input
                id="budget"
                inputMode="decimal"
                maxLength={50}
                placeholder="e.g. 25,000"
                value={values.budget}
                onChange={(event) => update("budget", event.target.value)}
              />
            </label>
          </div>
          <div className="form-row">
            <label htmlFor="fulfilment">
              Collection or delivery{" "}
              <span className="field-optional">(optional)</span>
              <select
                id="fulfilment"
                value={values.fulfilment}
                onChange={(event) => update("fulfilment", event.target.value)}
              >
                <option value="">Let’s discuss it</option>
                <option>Collection in Akure</option>
                <option>Delivery within Akure</option>
                <option>Nationwide delivery</option>
              </select>
            </label>
            <label htmlFor="city">
              Delivery city / state{" "}
              <span className="field-optional">(optional)</span>
              <input
                id="city"
                autoComplete="address-level2"
                maxLength={120}
                placeholder="e.g. Lagos, Lagos State"
                value={values.city}
                onChange={(event) => update("city", event.target.value)}
              />
            </label>
          </div>
          <label htmlFor="message">
            Tell us a little about your idea <span aria-hidden="true">*</span>
            <textarea
              id="message"
              name="message"
              placeholder="A colour, a silhouette, something you’ve seen… or simply how you’d love to feel."
              required
              minLength={10}
              maxLength={2000}
              rows={5}
              value={values.message}
              onChange={(event) => {
                event.target.setCustomValidity("");
                update("message", event.target.value);
              }}
            />
          </label>
          <div className="form-bottom">
            <span>
              {storageNote || "Your draft stays in this browser tab."}
            </span>
            <span>{values.message.length} / 2000</span>
          </div>
          <div className="enquiry-order-note">
            <strong>Before we begin</strong>
            <p>
              Custom prices are quoted individually. Production requires a 70%
              deposit by bank transfer; the remaining 30% follows your agreed
              terms. Straightforward orders usually take 3–5 working days,
              subject to design and workload.
            </p>
            <Link to="/policies">
              Read ordering, cancellation & delivery details{" "}
              <ArrowRight size={13} />
            </Link>
          </div>
          <button type="submit" className="button enquiry-submit">
            Continue on WhatsApp <MessageCircle size={17} strokeWidth={1.5} />
          </button>
          <p className="form-note">
            This opens WhatsApp with your details ready to send. Your enquiry is
            shared with us only when you send the message there. An enquiry is
            not a confirmed order; agree on your quote, timeline, cancellation
            and deposit terms before paying.
          </p>
          <div className="draft-actions">
            <button type="button" onClick={clearDraft}>
              Clear my draft
            </button>
            <Link to="/privacy">How your information is used</Link>
          </div>
        </form>
        {readyUrl && (
          <div
            className="enquiry-success"
            role="status"
            tabIndex={-1}
            ref={successPanel}
          >
            <Check size={22} />
            <div>
              <h3>Your enquiry is ready.</h3>
              <p>
                Send your prepared message in WhatsApp to start the
                conversation.
              </p>
              <a
                href={readyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                Open WhatsApp <ArrowRight size={14} />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function NotFound() {
  return (
    <section className="container not-found">
      <Eyebrow>A little detour</Eyebrow>
      <h1>
        Let’s find your
        <br />
        <em>way back.</em>
      </h1>
      <p>This page isn’t here, but there is plenty of inspiration waiting.</p>
      <Link className="button" to="/">
        Back to home <ArrowRight size={16} />
      </Link>
    </section>
  );
}

export default function App() {
  return (
    <>
      <RouteEffects />
      <div id="top" />
      <Header />
      <main id="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/our-work" element={<CollectionPending />} />
          <Route path="/our-work/:slug" element={<CollectionPending />} />
          <Route path="/shop" element={<CollectionPending shop />} />
          <Route path="/the-experience" element={<Experience />} />
          <Route path="/enquire" element={<Enquire />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
