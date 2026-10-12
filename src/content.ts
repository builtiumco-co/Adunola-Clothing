export type Look = {
  slug: string;
  name: string;
  category: "Everyday" | "Occasion";
  number: string;
  image: string;
  imageAlt: string;
  color: string;
  feeling: string;
  description: string;
  details: string[];
};

export const looks: Look[] = [
  {
    slug: "the-scarlet-bloom",
    name: "The Scarlet Bloom",
    category: "Occasion",
    number: "01",
    image: "/images/scarlet-bloom.jpg",
    imageAlt:
      "A woman wearing a scarlet and gold leaf-print mini dress with statement bell sleeves, styled with gold heels.",
    color: "Scarlet & warm gold",
    feeling: "A bold print. A beautiful presence.",
    description:
      "Scarlet and gold, an expressive print, and sleeves with a little drama. A confident starting point for a celebration, or a moment that deserves something special.",
    details: [
      "A softly rounded neckline",
      "An expressive gold leaf print",
      "Statement, flared bell sleeves",
      "A gently shaped, above-the-knee silhouette",
    ],
  },
  {
    slug: "the-golden-rhythm",
    name: "The Golden Rhythm",
    category: "Occasion",
    number: "02",
    image: "/images/golden-rhythm.jpg",
    imageAlt:
      "A woman in a gold, olive, and black patterned two-piece outfit with a coordinating headwrap.",
    color: "Golden olive",
    feeling: "A little radiance. A lasting impression.",
    description:
      "A golden olive palette and a print with its own rhythm. A beautifully coordinated look, bringing together strong pattern, an easy silhouette, and considered finishing.",
    details: [
      "A coordinating top and skirt",
      "An expressive, flowing print",
      "A gently defined waist",
      "A matching headwrap to complete the look",
    ],
  },
  {
    slug: "the-emerald-statement",
    name: "The Emerald Statement",
    category: "Everyday",
    number: "03",
    image: "/images/emerald-statement.jpg",
    imageAlt:
      "An emerald, black, and white geometric-print top with a pointed hem and flowing bell sleeves, paired with white trousers on a mannequin.",
    color: "Emerald & monochrome",
    feeling: "Considered contrast. Your own expression.",
    description:
      "Rich emerald, graphic monochrome, and sleeves that make an entrance. A striking top paired with a clean white silhouette, for a more personal take on everyday dressing.",
    details: [
      "A wide, softly curved neckline",
      "Bold, geometric pattern",
      "Flowing, exaggerated bell sleeves",
      "A pointed hem paired with wide-leg trousers",
    ],
  },
  {
    slug: "the-terracotta-muse",
    name: "The Terracotta Muse",
    category: "Everyday",
    number: "04",
    image: "/images/terracotta-muse.jpg",
    imageAlt:
      "A rust and blue patterned, belted shirt dress with a coordinating headwrap, shown in a mirror photograph.",
    color: "Rust & soft blue",
    feeling: "An easy silhouette. A little individuality.",
    description:
      "Warm rust, soft blue, and an expressive circular print. A relaxed shirt-dress silhouette, brought together with a waist tie and a coordinating headwrap.",
    details: [
      "A relaxed, collared shirt-dress shape",
      "Statement sleeves with a soft flare",
      "A waist tie for a personal fit",
      "A coordinating headwrap and warm colour story",
    ],
  },
];

export const brand = {
  name: "Adunola Clothing",
  motto: "Simple but Unique",
  message: "Simple. Unique. You.",
  location: "Akure, Ondo State, Nigeria",
  email: "olawalebunmi05@gmail.com",
  phone: "09032022101",
  instagram: "https://www.instagram.com/_adunclothing/",
  // The supplied TikTok display name has a space; do not invent a profile handle.
  tiktokSearch: "https://www.tiktok.com/search?q=adunola%20clothing",
};

export const services = [
  {
    slug: "dresses-and-gowns",
    name: "Dresses & gowns",
    text: "Custom-made dresses and gowns, thoughtfully tailored for celebrations, special occasions, and the way you want to feel.",
  },
  {
    slug: "two-piece-outfits",
    name: "Two-piece outfits",
    text: "Coordinated sets that bring together your favourite colours, shapes, and details. Effortless to wear, uniquely yours.",
  },
  {
    slug: "trousers-and-tops",
    name: "Trousers & tops",
    text: "Beautifully fitted separates for everyday dressing. Simple pieces, made with care and attention to your personal style.",
  },
  {
    slug: "casual-and-formal",
    name: "Casual & formal wear",
    text: "From an easy day out to a more dressed-up moment, outfits designed for comfort, confidence, and a little individuality.",
  },
  {
    slug: "corporate-outfits",
    name: "Corporate outfits",
    text: "Clean, considered silhouettes for your working wardrobe. Well-tailored clothing that feels polished and comfortable.",
  },
  {
    slug: "native-and-traditional",
    name: "Native & traditional wear",
    text: "Expressive native and traditional outfits that celebrate your taste, your occasion, and the details you love.",
  },
  {
    slug: "customer-fabric",
    name: "Your fabric, our craftsmanship",
    text: "Already have a fabric you love? Bring it into the conversation. We offer custom sewing using customer-supplied fabrics.",
  },
];

export const steps = [
  {
    number: "01",
    title: "A conversation first",
    text: "Tell us your design ideas, occasion, budget, and the date you need your outfit.",
    extended:
      "Start on WhatsApp or use our enquiry form. Share inspiration and let us know if you are supplying your own fabric. Urgent requests are considered according to availability and design complexity.",
  },
  {
    number: "02",
    title: "Agree on the details",
    text: "Confirm your design, measurements, quote, timeline, and order terms together.",
    extended:
      "Custom prices depend on design, fabric, materials, and complexity. A 70% deposit by bank transfer is required before production begins. The remaining 30% is payable according to the agreed payment terms. Confirm cancellation and deposit terms before paying.",
  },
  {
    number: "03",
    title: "Made with care",
    text: "We tailor your outfit, with measurements, fittings, and adjustments arranged where needed.",
    extended:
      "Straightforward orders typically take 3–5 working days. More complex designs and the current workload may require additional time. We confirm your actual production schedule before starting and guide you on the measurements your design needs.",
  },
  {
    number: "04",
    title: "Ready for your moment",
    text: "Arrange collection in Akure or delivery to your location, with the final details agreed.",
    extended:
      "Delivery can be arranged within Akure and nationwide across Nigeria. Fees depend on your location and the delivery service. Free adjustments for fitting issues are available within an agreed period, subject to the alteration policy discussed for your order.",
  },
];

export const faqs = [
  {
    question: "Where do I start?",
    answer:
      "Start with a conversation on WhatsApp or our custom enquiry form. Tell us your design ideas, occasion, budget, and when you need your outfit. We will guide you through the next steps.",
  },
  {
    question: "Can I bring my own inspiration or fabric?",
    answer:
      "Absolutely. A photograph, a colour, or a detail you love is a lovely starting point. We also offer custom sewing with fabrics supplied by customers. Share your ideas and fabric details on WhatsApp.",
  },
  {
    question: "How much will my outfit cost?",
    answer:
      "Custom prices depend on the design, fabric, materials, and garment complexity. We discuss your budget and provide a quote before you commit. Our goal is stylish, well-tailored clothing at an affordable price.",
  },
  {
    question: "How do deposits and payments work?",
    answer:
      "A 70% deposit is required before production begins. The remaining 30% is paid according to the agreed payment terms. We accept bank transfer. Confirm the quote, payment details, timeline, and cancellation and deposit terms with us before paying.",
  },
  {
    question: "How long will my order take?",
    answer:
      "Straightforward orders typically take approximately 3–5 working days. Your design, garment complexity, and our current workload may require more time. We agree on your actual production schedule before starting.",
  },
  {
    question: "Do you accept urgent orders?",
    answer:
      "Urgent orders may be possible depending on availability and the complexity of your design. Contact us with your deadline so we can confirm whether we can accommodate your request.",
  },
  {
    question: "How do measurements and fittings work?",
    answer:
      "Custom orders require your measurements. We guide you on the measurements needed for your chosen design, and arrange fittings and adjustments where necessary to help your outfit fit properly.",
  },
  {
    question: "Can you deliver outside Akure?",
    answer:
      "Yes. You can collect your completed outfit in Akure, arrange local delivery, or request nationwide delivery across Nigeria. Delivery fees depend on your location and the delivery service used and are agreed with you.",
  },
  {
    question: "What if my outfit needs an adjustment?",
    answer:
      "We offer free adjustments for fitting issues within an agreed period, subject to our alteration policy. Discuss the adjustment period and conditions when confirming your order, and contact us promptly if you have a fitting issue.",
  },
  {
    question: "What are the cancellation and return terms?",
    answer:
      "Discuss cancellation, deposit, and return terms before confirming or paying for an order. Custom-made orders and ready-to-wear purchases have different considerations. We will clarify the terms that apply to your particular order before you commit.",
  },
];

// Owner-confirmed Nigerian WhatsApp number. The public override is optional.
export const whatsappNumber = (
  import.meta.env.VITE_WHATSAPP_NUMBER || "2349032022101"
).replace(/\D/g, "");
export const whatsappUrl = (message: string) =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
