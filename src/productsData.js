// أسماء التشطيبات (ثنائية اللغة) ولون الدائرة المقابلة
const FINISH = {
  black: { name: { ar: 'أسود مطفي', en: 'Matte black' }, swatch: '#1a1a1a' },
  chrome: { name: { ar: 'كروم لامع', en: 'Polished chrome' }, swatch: 'linear-gradient(135deg,#e9e9f2,#9aa0b5)' },
  gray: { name: { ar: 'رمادي فاخر', en: 'Luxe gray' }, swatch: '#5b5b6b' },
  gold: { name: { ar: 'ذهبي فاخر', en: 'Luxe gold' }, swatch: 'linear-gradient(135deg,#f5e6a8,#c9a24a)' },
  white: { name: { ar: 'أبيض لامع', en: 'Glossy white' }, swatch: 'linear-gradient(135deg,#ffffff,#dfe2ea)' },
}

const yrs = { ar: 'الضمان', en: 'Warranty' }
const y5 = { ar: '5 سنوات', en: '5 years' }

// المنتجات (حقول ثنائية اللغة)
export const PRODUCTS = [
  {
    id: 'mixer-chrome', collection: 'mixers',
    title: { ar: 'خلاط المغسلة الكروم', en: 'Chrome Basin Mixer' },
    tagline: { ar: 'انسيابية كروم لامعة بمقبض جانبي مريح', en: 'Polished chrome flow with a comfortable side lever' },
    desc: { ar: 'خلاط مغسلة بتشطيب كروم لامع ومخرج انسيابي، لمسة عصرية راقية لأي مغسلة.', en: 'A basin mixer with a polished chrome finish and a flowing spout — a refined modern touch for any washbasin.' },
    specs: [
      [{ ar: 'التشطيب', en: 'Finish' }, { ar: 'كروم لامع', en: 'Polished chrome' }],
      [{ ar: 'التدفّق', en: 'Flow' }, { ar: '6 لتر/دقيقة', en: '6 L/min' }],
      [{ ar: 'الخامة', en: 'Material' }, { ar: 'نحاس مصقول', en: 'Polished brass' }],
      [yrs, y5],
    ],
    finishes: ['chrome'], images: { chrome: '/products/mixer-chrome.webp' },
  },
  {
    id: 'basin', collection: 'mixers',
    title: { ar: 'خلاط المغسلة الأسود', en: 'Black Basin Mixer' },
    tagline: { ar: 'مقبض جانبي مريح ومخرج انسيابي راقٍ', en: 'A comfortable side lever and an elegant flowing spout' },
    desc: { ar: 'مخلط حوض متوازن بمقبض جانبي مريح ومخرج انسيابي، لمسة نهائية راقية لأي مغسلة.', en: 'A balanced basin mixer with a comfortable side lever and a flowing spout — an elegant finishing touch for any washbasin.' },
    specs: [
      [{ ar: 'النوع', en: 'Type' }, { ar: 'خلاط مفرد', en: 'Single lever' }],
      [{ ar: 'التدفّق', en: 'Flow' }, { ar: '6 لتر/دقيقة', en: '6 L/min' }],
      [{ ar: 'الخامة', en: 'Material' }, { ar: 'نحاس مصقول', en: 'Polished brass' }],
      [yrs, y5],
    ],
    finishes: ['black'], images: { black: '/products/faucet-basin-black.webp' },
  },
  {
    id: 'spray-gold', collection: 'sprays',
    title: { ar: 'نظام الدش الذهبي', en: 'Gold Shower System' },
    tagline: { ar: 'مرش علوي مطري ويدوي بتشطيب ذهبي فاخر', en: 'Rain overhead + handheld head in a luxe gold finish' },
    desc: { ar: 'نظام دش متكامل بمرش علوي واسع ورأس يدوي متعدّد الأوضاع، بتشطيب ذهبي يمنح حمّامك فخامة استثنائية.', en: 'A complete shower system with a wide rain head and a multi-mode handheld spray, in a gold finish that lends your bathroom exceptional luxury.' },
    specs: [
      [{ ar: 'المرش', en: 'Heads' }, { ar: 'علوي + يدوي', en: 'Overhead + handheld' }],
      [{ ar: 'الأوضاع', en: 'Modes' }, { ar: 'متعددة', en: 'Multiple' }],
      [{ ar: 'التشطيب', en: 'Finish' }, { ar: 'ذهبي', en: 'Gold' }],
      [yrs, y5],
    ],
    finishes: ['gold'], images: { gold: '/products/shower-gold.webp' },
  },
  {
    id: 'tall', collection: 'mixers',
    title: { ar: 'صنبور المطبخ العالي', en: 'Tall Kitchen Faucet' },
    tagline: { ar: 'قوس مرتفع يمنح حرية كاملة حول الحوض', en: 'A high arc for full freedom around the sink' },
    desc: { ar: 'قوس مرتفع أنيق يمنح حرية حركة كاملة حول الحوض، بتصميم نحتي يتصدّر المشهد.', en: 'An elegant high arc that gives full freedom of movement around the sink, with a sculptural design that leads the scene.' },
    specs: [
      [{ ar: 'الارتفاع', en: 'Height' }, { ar: '42 سم', en: '42 cm' }],
      [{ ar: 'الخامة', en: 'Material' }, { ar: 'نحاس مصقول', en: 'Polished brass' }],
      [{ ar: 'التشطيب', en: 'Finish' }, { ar: 'أسود مطفي', en: 'Matte black' }],
      [yrs, y5],
    ],
    finishes: ['black'], images: { black: '/products/faucet-tall-black.webp' },
  },
  {
    id: 'bath', collection: 'bath',
    title: { ar: 'مخلط البانيو الجداري', en: 'Wall-mounted Bath Mixer' },
    tagline: { ar: 'تركيب جداري بمخرج مزدوج ومحوّل انسيابي', en: 'Wall-mounted with a dual outlet and smooth diverter' },
    desc: { ar: 'تركيب جداري بمخرج مزدوج ومحوّل انسيابي، يجمع بين قوة الأداء ونعومة التصميم.', en: 'Wall-mounted with a dual outlet and a smooth diverter, combining strong performance with a gentle design.' },
    specs: [
      [{ ar: 'التركيب', en: 'Mount' }, { ar: 'جداري', en: 'Wall' }],
      [{ ar: 'المخرج', en: 'Outlet' }, { ar: 'مزدوج', en: 'Dual' }],
      [{ ar: 'الخامة', en: 'Material' }, { ar: 'سبيكة مقاومة', en: 'Resistant alloy' }],
      [yrs, y5],
    ],
    finishes: ['black'], images: { black: '/products/faucet-bath-black.webp' },
  },
  {
    id: 'toilet', collection: 'chairs',
    title: { ar: 'كرسي الحمام المدمج', en: 'One-piece Toilet' },
    tagline: { ar: 'تصميم قطعة واحدة انسيابي وسهل التنظيف', en: 'A flowing one-piece design that’s easy to clean' },
    desc: { ar: 'كرسي حمّام من قطعة واحدة بتصميم انسيابي عصري، بشطف مزدوج موفّر للماء وسطح سهل التنظيف.', en: 'A one-piece toilet with a modern flowing design, dual water-saving flush and an easy-to-clean surface.' },
    specs: [
      [{ ar: 'التصميم', en: 'Design' }, { ar: 'قطعة واحدة', en: 'One-piece' }],
      [{ ar: 'الشطف', en: 'Flush' }, { ar: 'مزدوج موفّر', en: 'Dual, water-saving' }],
      [{ ar: 'الخامة', en: 'Material' }, { ar: 'سيراميك مطلي', en: 'Glazed ceramic' }],
      [yrs, y5],
    ],
    finishes: ['white'], images: { white: '/products/toilet-white.webp' },
  },
  {
    id: 'jacuzzi', collection: 'jacuzzi',
    title: { ar: 'جاكوزي التدليك الحر', en: 'Freestanding Massage Jacuzzi' },
    tagline: { ar: 'نفّاثات تدليك ومخلط جانبي بمرش يدوي', en: 'Massage jets with a side mixer and handheld spray' },
    desc: { ar: 'حوض جاكوزي حر بنفّاثات تدليك مائية ومخلط جانبي مع مرش يدوي، لتجربة استرخاء تشبه المنتجعات في منزلك.', en: 'A freestanding jacuzzi with water massage jets and a side mixer with a handheld spray — a resort-like relaxation experience at home.' },
    specs: [
      [{ ar: 'النوع', en: 'Type' }, { ar: 'حر قائم', en: 'Freestanding' }],
      [{ ar: 'النفّاثات', en: 'Jets' }, { ar: 'تدليك مائي', en: 'Water massage' }],
      [{ ar: 'الملحقات', en: 'Extras' }, { ar: 'مرش يدوي', en: 'Handheld spray' }],
      [yrs, y5],
    ],
    finishes: ['white'], images: { white: '/products/jacuzzi-white.webp' },
  },
  {
    id: 'shattaf', collection: 'shattaf',
    title: { ar: 'الشطاف الذهبي', en: 'Gold Bidet Spray' },
    tagline: { ar: 'ضغط متوازن وتشطيب ذهبي فاخر', en: 'Balanced pressure and a luxe gold finish' },
    desc: { ar: 'شطاف جداري بضغط ماء متوازن وخرطوم مرن، بتشطيب ذهبي أنيق يليق بالحمّامات الفاخرة.', en: 'A wall-mounted bidet spray with balanced water pressure and a flexible hose, in an elegant gold finish worthy of luxury bathrooms.' },
    specs: [
      [{ ar: 'التركيب', en: 'Mount' }, { ar: 'جداري', en: 'Wall' }],
      [{ ar: 'الخرطوم', en: 'Hose' }, { ar: 'مرن معدني', en: 'Flexible metal' }],
      [{ ar: 'التشطيب', en: 'Finish' }, { ar: 'ذهبي', en: 'Gold' }],
      [yrs, y5],
    ],
    finishes: ['gold'], images: { gold: '/products/shattaf-gold.webp' },
  },
]

// الأقسام الستة (ثنائية اللغة)
export const COLLECTIONS = [
  {
    id: 'mixers',
    name: { ar: 'الخلاطات', en: 'Mixers' }, short: { ar: 'الخلاطات', en: 'Mixers' },
    intro: { ar: 'خلاطات تجمع الدقّة والأناقة لتكون قلب مغسلتك ومطبخك.', en: 'Mixers that blend precision and elegance to be the heart of your basin and kitchen.' },
    features: [{ ar: 'تحكّم دقيق بالتدفّق', en: 'Precise flow control' }, { ar: 'تشطيب أسود مطفي', en: 'Matte black finish' }, { ar: 'خامات مقاومة للصدأ', en: 'Rust-resistant materials' }],
    accent: '#2f6fd6', bg: '#e4f0ff', image: '/products/mixer-chrome.webp',
    cover: '/categories/cat-1.webp',
  },
  {
    id: 'shattaf',
    name: { ar: 'الشطاف', en: 'Bidet Spray' }, short: { ar: 'الشطاف', en: 'Bidet' },
    intro: { ar: 'شطافات أنيقة بضغط متوازن وتحكّم سلس ونظافة فائقة.', en: 'Elegant bidet sprays with balanced pressure, smooth control and superior hygiene.' },
    features: [{ ar: 'ضغط ماء متوازن', en: 'Balanced water pressure' }, { ar: 'تحكّم سلس', en: 'Smooth control' }, { ar: 'تشطيب مقاوم للصدأ', en: 'Rust-resistant finish' }],
    accent: '#2f6fd6', bg: '#cae1ff', image: '/products/shattaf-gold.webp',
    cover: '/categories/cat-2.webp',
  },
  {
    id: 'sprays',
    name: { ar: 'المروش', en: 'Showers' }, short: { ar: 'المروش', en: 'Showers' },
    intro: { ar: 'رؤوس مرشّات قابلة للتوجيه بضغط ماء متوازن وتركيب سهل.', en: 'Adjustable shower heads with balanced pressure and easy installation.' },
    features: [{ ar: 'رؤوس قابلة للتوجيه', en: 'Adjustable heads' }, { ar: 'ضغط ماء متوازن', en: 'Balanced pressure' }, { ar: 'تركيب سهل', en: 'Easy installation' }],
    accent: '#2f6fd6', bg: '#afd2ff', image: '/products/shower-gold.webp',
    cover: '/categories/cat-3.webp',
  },
  {
    id: 'bath',
    name: { ar: 'البانيو', en: 'Bathtub' }, short: { ar: 'البانيو', en: 'Bathtub' },
    intro: { ar: 'خلاطات بانيو جدارية بخطوط نحتية تمنح حمّامك حضوراً فندقياً.', en: 'Wall-mounted bath mixers with sculptural lines that give your bathroom a hotel presence.' },
    features: [{ ar: 'مخرج مزدوج', en: 'Dual outlet' }, { ar: 'محوّل انسيابي', en: 'Smooth diverter' }, { ar: 'تصميم جداري أنيق', en: 'Elegant wall design' }],
    accent: '#2f6fd6', bg: '#e4f0ff', image: '/products/faucet-bath-black.webp',
    cover: '/categories/cat-4.webp',
  },
  {
    id: 'chairs',
    name: { ar: 'كراسي الحمام', en: 'Toilets' }, short: { ar: 'الكراسي', en: 'Toilets' },
    intro: { ar: 'كراسي حمّام آمنة ومريحة بمواد مضادة للانزلاق وتحمّل عالٍ.', en: 'Safe, comfortable toilets with anti-slip materials and high durability.' },
    features: [{ ar: 'مواد مضادة للانزلاق', en: 'Anti-slip materials' }, { ar: 'تحمّل عالٍ', en: 'High durability' }, { ar: 'راحة وأمان', en: 'Comfort & safety' }],
    accent: '#2f6fd6', bg: '#cae1ff', image: '/products/toilet-white.webp',
    cover: '/categories/cat-5.webp',
  },
  {
    id: 'jacuzzi',
    name: { ar: 'الجاكوزي', en: 'Jacuzzi' }, short: { ar: 'الجاكوزي', en: 'Jacuzzi' },
    intro: { ar: 'جاكوزي فاخر بنفّاثات تدليك وإضاءة محيطة وتحكّم رقمي.', en: 'A luxurious jacuzzi with massage jets, ambient lighting and digital control.' },
    features: [{ ar: 'نفّاثات تدليك', en: 'Massage jets' }, { ar: 'إضاءة محيطة', en: 'Ambient lighting' }, { ar: 'تحكّم رقمي', en: 'Digital control' }],
    accent: '#2f6fd6', bg: '#d3e6ff', image: '/products/jacuzzi-white.webp',
    cover: '/categories/cat-6.webp',
  },
]

export const collectionOf = (id) => COLLECTIONS.find((c) => c.id === id)
export const productsIn = (id) => PRODUCTS.filter((p) => p.collection === id)

export { FINISH }
