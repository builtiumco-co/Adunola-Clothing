export type Look = {
  slug: string
  name: string
  category: 'Everyday' | 'Occasion'
  number: string
  image: string
  imageAlt: string
  color: string
  feeling: string
  description: string
  details: string[]
}

export const looks: Look[] = [
  {
    slug: 'the-scarlet-bloom',
    name: 'The Scarlet Bloom',
    category: 'Occasion',
    number: '01',
    image: '/images/scarlet-bloom.jpg',
    imageAlt: 'A woman wearing a scarlet and gold leaf-print mini dress with statement bell sleeves, styled with gold heels.',
    color: 'Scarlet & warm gold',
    feeling: 'A bold print. A beautiful presence.',
    description: 'Scarlet and gold, an expressive print, and sleeves with a little drama. A confident starting point for a celebration, or a moment that deserves something special.',
    details: ['A softly rounded neckline', 'An expressive gold leaf print', 'Statement, flared bell sleeves', 'A gently shaped, above-the-knee silhouette'],
  },
  {
    slug: 'the-golden-rhythm',
    name: 'The Golden Rhythm',
    category: 'Occasion',
    number: '02',
    image: '/images/golden-rhythm.jpg',
    imageAlt: 'A woman in a gold, olive, and black patterned two-piece outfit with a coordinating headwrap.',
    color: 'Golden olive',
    feeling: 'A little radiance. A lasting impression.',
    description: 'A golden olive palette and a print with its own rhythm. A beautifully coordinated look, bringing together strong pattern, an easy silhouette, and considered finishing.',
    details: ['A coordinating top and skirt', 'An expressive, flowing print', 'A gently defined waist', 'A matching headwrap to complete the look'],
  },
  {
    slug: 'the-emerald-statement',
    name: 'The Emerald Statement',
    category: 'Everyday',
    number: '03',
    image: '/images/emerald-statement.jpg',
    imageAlt: 'An emerald, black, and white geometric-print top with a pointed hem and flowing bell sleeves, paired with white trousers on a mannequin.',
    color: 'Emerald & monochrome',
    feeling: 'Considered contrast. Your own expression.',
    description: 'Rich emerald, graphic monochrome, and sleeves that make an entrance. A striking top paired with a clean white silhouette, for a more personal take on everyday dressing.',
    details: ['A wide, softly curved neckline', 'Bold, geometric pattern', 'Flowing, exaggerated bell sleeves', 'A pointed hem paired with wide-leg trousers'],
  },
  {
    slug: 'the-terracotta-muse',
    name: 'The Terracotta Muse',
    category: 'Everyday',
    number: '04',
    image: '/images/terracotta-muse.jpg',
    imageAlt: 'A rust and blue patterned, belted shirt dress with a coordinating headwrap, shown in a mirror photograph.',
    color: 'Rust & soft blue',
    feeling: 'An easy silhouette. A little individuality.',
    description: 'Warm rust, soft blue, and an expressive circular print. A relaxed shirt-dress silhouette, brought together with a waist tie and a coordinating headwrap.',
    details: ['A relaxed, collared shirt-dress shape', 'Statement sleeves with a soft flare', 'A waist tie for a personal fit', 'A coordinating headwrap and warm colour story'],
  },
]

export const steps = [
  { number: '01', title: 'A conversation first', text: 'Tell us about the occasion, the ideas you love and when you need your outfit.', extended: 'A favourite colour, an inspiration image, or simply a feeling. You do not need to have it all figured out. We will start by listening.' },
  { number: '02', title: 'Make it personal', text: 'Discuss the silhouette, fabric and finishing. Agree on the details and a quote before moving forward.', extended: 'Together, we consider what you are drawn to and what will work for your occasion. The design, price, and timeline are agreed with you before work begins.' },
  { number: '03', title: 'Consider every detail', text: 'Plan measurements and fittings around the design, with time to refine the fit.', extended: 'We will guide you through the measurements we need and discuss fitting arrangements. The little details are part of making the outfit feel like yours.' },
  { number: '04', title: 'Ready for your moment', text: 'Confirm the finished outfit and arrange the handover before your occasion.', extended: 'Once the final details are agreed, we arrange collection or delivery with you. You will have a clear plan for receiving your outfit ahead of your moment.' },
]

export const faqs = [
  { question: 'Where do I start?', answer: 'Start with a conversation. Use our enquiry form to tell us a little about your occasion, your ideas, and when you need your outfit. We will talk through the next steps with you.' },
  { question: 'Can I bring my own inspiration?', answer: 'Absolutely. A photograph, a colour, a fabric, or a detail you love can be a lovely starting point. Send your inspiration on WhatsApp and we will explore how to make it personal to you.' },
  { question: 'How much will my outfit cost?', answer: 'Each outfit is considered individually. The design, fabric, and finishing all shape the quote. We will discuss the details and agree on a price with you before moving forward.' },
  { question: 'How early should I enquire?', answer: 'As early as you can, especially for a special occasion. Include your event date when you get in touch so we can discuss availability and a realistic timeline before you commit.' },
  { question: 'Do I need my measurements to enquire?', answer: 'No. Your initial enquiry can begin with your ideas and occasion. When the design is agreed, we will guide you through the measurements and fitting arrangements.' },
  { question: 'Are these outfits available to buy?', answer: 'The looks shown are fashion concepts to inspire your conversation, rather than ready-to-buy pieces. Enquire about a look you love and we will discuss creating an outfit around your style, fabric preferences, and occasion.' },
]

// The business supplied 09166742722; wa.me requires the Nigerian country code.
export const whatsappNumber = (import.meta.env.VITE_WHATSAPP_NUMBER || '2349166742722').replace(/\D/g, '')
export const whatsappUrl = (message: string) => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
