import { Link } from "react-router-dom";
import {
  ArrowRight,
  Heart,
  Mail,
  MapPin,
  MessageCircle,
  Scissors,
  Sparkles,
  Truck,
  Instagram,
} from "lucide-react";
import { brand, services, whatsappUrl } from "./content";

function Intro({
  label,
  title,
  italic,
  description,
}: {
  label: string;
  title: string;
  italic: string;
  description: string;
}) {
  return (
    <div className="brand-page-intro">
      <p className="eyebrow">{label}</p>
      <h1>
        {title}
        <br />
        <em>{italic}</em>
      </h1>
      <p>{description}</p>
    </div>
  );
}

export function BrandIntroduction() {
  return (
    <section className="brand-story">
      <div className="container brand-story-grid">
        <div>
          <p className="eyebrow">From Akure, with care</p>
          <h2>
            Simple but
            <br />
            <em>Unique.</em>
          </h2>
        </div>
        <div>
          <p>
            Adunola Clothing is a Nigerian fashion brand creating simple,
            unique, stylish, and affordable outfits for women.
          </p>
          <p>
            Based in Akure, Ondo State, we believe fashion doesn’t have to be
            complicated or expensive to make a statement. Our outfits are made
            to help you feel confident, comfortable, and stylish.
          </p>
          <Link className="text-link" to="/about">
            Get to know Adunola <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function ServicesOverview({ full = false }: { full?: boolean }) {
  return (
    <section
      className="container section"
      id="services"
      aria-labelledby="services-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">Made for your everyday and your occasions</p>
          <h2 id="services-title">
            Your style.
            <br />
            <em>Thoughtfully tailored.</em>
          </h2>
        </div>
        <p className="section-heading-note">
          From a favourite fabric to a fresh idea.
          <br />
          There’s a beautiful place to begin.
        </p>
      </div>
      <div className="service-grid">
        {(full ? services : services.slice(0, 6)).map((service, index) => (
          <article key={service.slug} className="service-card">
            <span className="service-number">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3>{service.name}</h3>
            <p>{service.text}</p>
            <Link className="text-link" to={`/enquire?service=${service.slug}`}>
              Let’s discuss your outfit <ArrowRight size={14} />
            </Link>
          </article>
        ))}
      </div>
      {!full && (
        <Link className="text-link section-link" to="/services">
          Explore all our services <ArrowRight size={14} />
        </Link>
      )}
    </section>
  );
}

export function OrderEssentials() {
  return (
    <section className="order-essentials">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">A few things to know</p>
            <h2>
              A clear beginning.
              <br />
              <em>A thoughtful finish.</em>
            </h2>
          </div>
          <Link className="text-link" to="/policies">
            Ordering & delivery details <ArrowRight size={14} />
          </Link>
        </div>
        <div className="essentials-grid">
          <article>
            <Scissors size={24} strokeWidth={1.2} />
            <h3>3–5 working days</h3>
            <p>
              Our approximate production time for straightforward orders. Design
              complexity and workload can mean a longer schedule, agreed with
              you.
            </p>
          </article>
          <article>
            <Heart size={24} strokeWidth={1.2} />
            <h3>70% to begin</h3>
            <p>
              A 70% deposit by bank transfer starts production. The remaining
              30% is payable according to your agreed payment terms.
            </p>
          </article>
          <article>
            <Truck size={24} strokeWidth={1.2} />
            <h3>From Akure to you</h3>
            <p>
              Collect in Akure, arrange local delivery, or request nationwide
              delivery across Nigeria. Delivery fees are agreed for your
              location.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <>
      <section className="container section">
        <Intro
          label="Meet Adunola Clothing"
          title="Simple. Unique."
          italic="You."
          description="Affordable style. Thoughtful craftsmanship. An outfit that feels like you."
        />
        <div className="about-layout">
          <div className="brand-signature">
            <Scissors size={60} strokeWidth={0.7} />
            <span>adunola</span>
            <p>Simple but Unique</p>
            <small>AKURE · ONDO STATE · NIGERIA</small>
          </div>
          <div className="prose">
            <h2>
              Beautiful clothing.
              <br />
              <em>A personal touch.</em>
            </h2>
            <p>
              Adunola Clothing is a Nigerian fashion brand based in Akure, Ondo
              State, dedicated to creating simple, unique, stylish, and
              affordable outfits for women.
            </p>
            <p>
              We believe fashion doesn’t have to be complicated or expensive to
              make a statement. We create beautiful, well-tailored outfits that
              help women feel confident, comfortable, and stylish.
            </p>
            <p>
              Our attention to detail, affordability, quality craftsmanship, and
              commitment to each customer’s personal style are at the heart of
              everything we make.
            </p>
            <Link className="text-link" to="/enquire">
              Tell us what you have in mind <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
      <section className="brand-story">
        <div className="container">
          <p className="eyebrow">What matters to us</p>
          <div className="essentials-grid">
            <article>
              <Scissors size={24} />
              <h3>Made with care</h3>
              <p>
                Well-tailored silhouettes and considered details, with
                craftsmanship you can feel.
              </p>
            </article>
            <article>
              <Heart size={24} />
              <h3>Within your reach</h3>
              <p>
                Stylish clothing for different tastes and budgets. We talk
                through your ideas and quote before starting.
              </p>
            </article>
            <article>
              <Sparkles size={24} />
              <h3>Personally yours</h3>
              <p>
                Comfort, confidence, and your own expression, whether your style
                is simple or a little more adventurous.
              </p>
            </article>
          </div>
        </div>
      </section>
      <section className="container brand-closing">
        <h2>
          Your ideas.
          <br />
          <em>Our thoughtful hands.</em>
        </h2>
        <p>
          Custom-made outfits and ready-to-wear pieces, from everyday separates
          to native wear and occasion gowns.
        </p>
        <Link className="button" to="/services">
          Discover our services <ArrowRight size={15} />
        </Link>
      </section>
    </>
  );
}

export function Services() {
  return (
    <>
      <section className="container brand-services-intro">
        <Intro
          label="What we offer"
          title="For your moments."
          italic="For your everyday."
          description="Custom-made outfits, thoughtful separates, and a personal approach to dressing for women."
        />
        <Link className="button" to="/enquire">
          Start your custom enquiry <ArrowRight size={15} />
        </Link>
      </section>
      <ServicesOverview full />
      <section className="brand-story">
        <div className="container brand-story-grid">
          <div>
            <p className="eyebrow">Ready-to-wear</p>
            <h2>
              Easy to choose.
              <br />
              <em>Lovely to wear.</em>
            </h2>
          </div>
          <div>
            <p>
              We also create ready-to-wear pieces. Our online collection will be
              shared here soon, with original photographs, available sizes, and
              prices.
            </p>
            <p>
              For current availability, get in touch directly. We’ll help you
              find out what is available and discuss the next steps.
            </p>
            <a
              className="text-link"
              href={whatsappUrl(
                "Hello Adunola Clothing, please tell me about your available ready-to-wear pieces.",
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ask about ready-to-wear <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>
      <OrderEssentials />
    </>
  );
}

export function Contact() {
  return (
    <section className="container section">
      <Intro
        label="A conversation first"
        title="Let’s talk."
        italic="We’re listening."
        description="An outfit idea, a question, or a little inspiration. We would love to hear from you."
      />
      <div className="contact-layout">
        <div className="contact-cards">
          <a
            className="contact-card"
            href={whatsappUrl(
              "Hello Adunola Clothing, I’d love to talk about an outfit.",
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle />
            <div>
              <h2>WhatsApp</h2>
              <p>{brand.phone}</p>
              <span>
                Discuss a design or ask a question <ArrowRight size={14} />
              </span>
            </div>
          </a>
          <a className="contact-card" href={`mailto:${brand.email}`}>
            <Mail />
            <div>
              <h2>Email</h2>
              <p>{brand.email}</p>
              <span>
                Write to us <ArrowRight size={14} />
              </span>
            </div>
          </a>
          <div className="contact-card">
            <MapPin />
            <div>
              <h2>Find us in Akure</h2>
              <p>{brand.location}</p>
              <span>Contact us to arrange collection or a fitting.</span>
            </div>
          </div>
        </div>
        <aside className="contact-aside">
          <p className="eyebrow">Let’s make it personal</p>
          <h2>
            An idea is
            <br />
            <em>all you need.</em>
          </h2>
          <p>
            Our custom enquiry form helps you share your occasion, outfit ideas,
            fabric preferences, and delivery location.
          </p>
          <Link className="button" to="/enquire">
            Enquire about an outfit <ArrowRight size={15} />
          </Link>
          <div className="social-links">
            <a href={brand.instagram} target="_blank" rel="noopener noreferrer">
              <Instagram size={18} /> Instagram · @_adunclothing{" "}
              <ArrowRight size={14} />
            </a>
            <a
              href={brand.tiktokSearch}
              target="_blank"
              rel="noopener noreferrer"
            >
              Find “adunola clothing” on TikTok <ArrowRight size={14} />
            </a>
          </div>
        </aside>
      </div>
      <div className="delivery-note">
        <Truck size={23} />
        <p>
          <strong>Collection or delivery, your way.</strong> Collection in
          Akure, local delivery, and nationwide delivery across Nigeria can be
          arranged. Fees depend on your location and the delivery service used.
        </p>
        <Link className="text-link" to="/policies#delivery">
          Delivery details <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}

const policySections = [
  {
    id: "custom-orders",
    title: "Custom-made orders",
    text: "Start by discussing your design, fabric, materials, measurements, budget, and required date. Custom prices depend on these details and the complexity of the garment. We provide a quote and agree on the order details before production. Sending an enquiry does not confirm an order.",
  },
  {
    id: "payments",
    title: "Deposits & bank transfers",
    text: "A 70% deposit is required before production begins. The remaining 30% is payable according to the payment terms agreed for your order. Payment is by bank transfer. Request the bank details directly from Adunola Clothing and confirm your quote, timeline, cancellation conditions, and deposit terms before paying.",
  },
  {
    id: "production",
    title: "Production & urgent requests",
    text: "Straightforward orders usually take approximately 3–5 working days. The actual timeframe depends on the design, garment complexity, and current workload; some orders need more time. Confirm your production schedule directly with us. Urgent requests are considered according to availability and complexity, and are not guaranteed.",
  },
  {
    id: "measurements",
    title: "Measurements & fittings",
    text: "Custom orders require measurements. We guide you on the measurements your chosen design needs. Fittings and adjustments can be arranged where necessary to help ensure a proper fit.",
  },
  {
    id: "delivery",
    title: "Collection & delivery",
    text: "Completed orders can be collected in Akure, Ondo State. Delivery within Akure, other locations where arrangements are available, and nationwide delivery across Nigeria can be discussed. Fees depend on the delivery service and your location. Agree on delivery costs and arrangements before confirming; production time is separate from delivery transit time.",
  },
  {
    id: "alterations",
    title: "Fitting adjustments",
    text: "We offer free adjustments for fitting issues within an agreed period, subject to our alteration policy. Confirm the applicable period and conditions for your order, and contact us promptly if you need an adjustment.",
  },
  {
    id: "cancellations",
    title: "Cancellations & deposits",
    text: "Before confirming an order or paying a deposit, ask us to explain the cancellation conditions and how your deposit will be handled. Refund eligibility, cancellation deadlines, and any applicable deductions must be agreed for your order. We have not published a blanket refundable or non-refundable deposit promise.",
  },
  {
    id: "custom-returns",
    title: "Custom-made returns",
    text: "Custom-made garments are produced around your agreed design and measurements. Contact us about any concern so we can discuss fitting adjustments and the options that apply to your order. Confirm the specific cancellation and return terms before production begins; a general ready-to-wear return rule does not automatically apply to custom orders.",
  },
  {
    id: "ready-to-wear-returns",
    title: "Ready-to-wear returns",
    text: "Ready-to-wear purchases have separate return considerations from custom-made orders. Before buying an available piece, confirm its size, condition, return eligibility, return period, and any delivery or return fees with us. The online shop is not taking orders yet; its full purchase and return terms will accompany the collection when it opens.",
  },
];

export function Policies() {
  return (
    <section className="container section policy-page">
      <Intro
        label="Before we begin"
        title="The details,"
        italic="clearly considered."
        description="A clear conversation about your order is part of making it personal. Here is what to expect."
      />
      <nav className="policy-index" aria-label="Ordering information sections">
        {policySections.map((section) => (
          <a key={section.id} href={`#${section.id}`}>
            {section.title}
          </a>
        ))}
      </nav>
      <div className="policy-layout">
        <aside>
          <p className="eyebrow">A little clarity</p>
          <h2>
            Know the details.
            <br />
            <em>Then decide.</em>
          </h2>
          <p>
            Please agree on your quote, timeline, delivery arrangements,
            cancellation and deposit terms before confirming or paying.
          </p>
          <a
            className="text-link"
            href={whatsappUrl(
              "Hello Adunola Clothing, please explain the order, cancellation, deposit, and return terms for my outfit before I confirm.",
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            Discuss your order terms <ArrowRight size={14} />
          </a>
        </aside>
        <div className="policy-sections">
          {policySections.map((section) => (
            <section key={section.id} id={section.id}>
              <h2>{section.title}</h2>
              <p>{section.text}</p>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Privacy() {
  return (
    <section className="container section policy-page">
      <Intro
        label="Your information"
        title="Shared with care."
        italic="Kept simple."
        description="How the website handles your custom enquiry and the information you choose to share."
      />
      <div className="privacy-prose prose">
        <h2>Your enquiry</h2>
        <p>
          The form collects the name, contact details, outfit ideas, and
          optional order preferences you enter. It prepares a WhatsApp message
          for Adunola Clothing. Your details are shared with the business only
          when you send that message in WhatsApp.
        </p>
        <h2>Your saved draft</h2>
        <p>
          Your draft is saved in this browser tab’s session storage so it can be
          restored if you refresh or return to the form during the same session.
          It is not a customer account or a server-side enquiry database. Use
          the clear-draft button on the form to remove the saved draft from this
          tab.
        </p>
        <h2>External services</h2>
        <p>
          WhatsApp, email, Instagram, and TikTok links open those services.
          Their own privacy practices apply when you use them. This website does
          not include analytics trackers or advertising cookies.
        </p>
        <h2>Customer photographs & reviews</h2>
        <p>
          Customer photographs and genuine reviews will only be featured where
          the customer has given permission. The original portfolio is being
          prepared; the inspiration image used on the home page is not presented
          as an Adunola customer order.
        </p>
        <h2>Questions about your information</h2>
        <p>
          Contact <a href={`mailto:${brand.email}`}>{brand.email}</a> about
          information you have shared with Adunola Clothing, or to discuss
          removal of a photograph or review. This page describes the current
          website; please ask us directly about how your order information is
          handled after you contact the business.
        </p>
      </div>
    </section>
  );
}

export function CollectionPending({ shop = false }: { shop?: boolean }) {
  return (
    <section className="container collection-pending">
      <Scissors size={38} strokeWidth={1} />
      <Intro
        label={
          shop
            ? "Ready-to-wear · Coming soon"
            : "Our original work · Coming soon"
        }
        title={shop ? "A collection to love." : "Made by Adunola."}
        italic={
          shop ? "Something to look forward to." : "A story we’ll share soon."
        }
        description={
          shop
            ? "Our online ready-to-wear collection is being prepared. Original photos, sizes, and prices will be shared here when the shop opens."
            : "Original photographs of our finished outfits, customer orders, and creative process will be shared here soon."
        }
      />
      <a
        className="button"
        href={whatsappUrl(
          shop
            ? "Hello Adunola Clothing, please tell me about your available ready-to-wear pieces."
            : "Hello Adunola Clothing, I’d love to discuss a custom-made outfit.",
        )}
        target="_blank"
        rel="noopener noreferrer"
      >
        {shop ? "Ask about current availability" : "Discuss your own outfit"}{" "}
        <MessageCircle size={17} />
      </a>
      <Link className="text-link" to="/services">
        Explore our services <ArrowRight size={14} />
      </Link>
    </section>
  );
}
