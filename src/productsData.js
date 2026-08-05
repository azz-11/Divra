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
    title: { ar: 'مخلط الحائط الكروم', en: 'Wall-mounted Chrome Mixer' },
    tagline: { ar: 'تصميم جداري كلاسيكي بمقبضين ومخرج طويل', en: 'A classic wall-mounted design with dual handles and a long spout' },
    desc: { ar: 'مخلط جداري بمقبضين ومخرج طويل انسيابي، بتشطيب كروم لامع يناسب المطبخ والمغسلة.', en: 'A wall-mounted mixer with dual handles and a long flowing spout, in a polished chrome finish suited to kitchen or basin.' },
    specs: [
      [{ ar: 'التركيب', en: 'Mount' }, { ar: 'جداري', en: 'Wall' }],
      [{ ar: 'المقابض', en: 'Handles' }, { ar: 'مزدوجة', en: 'Dual' }],
      [{ ar: 'الخامة', en: 'Material' }, { ar: 'نحاس مصقول', en: 'Polished brass' }],
      [yrs, y5],
    ],
    finishes: ['chrome'], images: { chrome: '/products/mixer-chrome.webp' },
  },
  {
    id: 'shower-chrome', collection: 'sprays',
    title: { ar: 'نظام الدش الكروم', en: 'Chrome Shower System' },
    tagline: { ar: 'مرش علوي مطري ويدوي بتشطيب كروم لامع', en: 'Rain overhead + handheld head in a polished chrome finish' },
    desc: { ar: 'نظام دش متكامل بمرش علوي واسع ورأس يدوي متعدّد الأوضاع، بتشطيب كروم لامع يمنح حمّامك حضوراً عصرياً.', en: 'A complete shower system with a wide rain head and a multi-mode handheld spray, in a polished chrome finish for a modern bathroom.' },
    specs: [
      [{ ar: 'المرش', en: 'Heads' }, { ar: 'علوي + يدوي', en: 'Overhead + handheld' }],
      [{ ar: 'الأوضاع', en: 'Modes' }, { ar: 'متعددة', en: 'Multiple' }],
      [{ ar: 'التشطيب', en: 'Finish' }, { ar: 'كروم لامع', en: 'Polished chrome' }],
      [yrs, y5],
    ],
    finishes: ['chrome'], images: { chrome: '/products/shower-gold.webp' },
  },
  {
    id: 'tall', collection: 'mixers',
    title: { ar: 'صنبور المطبخ العالي', en: 'Tall Kitchen Faucet' },
    tagline: { ar: 'قوس مرتفع يمنح حرية كاملة حول الحوض', en: 'A high arc for full freedom around the sink' },
    desc: { ar: 'قوس مرتفع أنيق يمنح حرية حركة كاملة حول الحوض، بتصميم نحتي يتصدّر المشهد.', en: 'An elegant high arc that gives full freedom of movement around the sink, with a sculptural design that leads the scene.' },
    specs: [
      [{ ar: 'الارتفاع', en: 'Height' }, { ar: '42 سم', en: '42 cm' }],
      [{ ar: 'الخامة', en: 'Material' }, { ar: 'نحاس مصقول', en: 'Polished brass' }],
      [{ ar: 'التشطيب', en: 'Finish' }, { ar: 'كروم لامع', en: 'Polished chrome' }],
      [yrs, y5],
    ],
    finishes: ['chrome'], images: { chrome: '/products/faucet-tall-black.webp' },
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
    finishes: ['chrome'], images: { chrome: '/products/faucet-bath-black.webp' },
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
    id: 'bath-tub', collection: 'bath',
    title: { ar: 'بانيو حر قائم', en: 'Freestanding Bathtub' },
    tagline: { ar: 'تصميم انسيابي أنيق ومخرج مياه مركزي', en: 'A sleek flowing silhouette with a central water spout' },
    desc: { ar: 'بانيو حر قائم بتصميم أنيق ومينيمال، مثالي لحمّامات العصر الحديث.', en: 'A freestanding, minimalist tub silhouette, perfect for a modern bathroom.' },
    specs: [
      [{ ar: 'النوع', en: 'Type' }, { ar: 'حر قائم', en: 'Freestanding' }],
      [{ ar: 'الخامة', en: 'Material' }, { ar: 'أكريليك مصقول', en: 'Polished acrylic' }],
      [{ ar: 'التشطيب', en: 'Finish' }, { ar: 'أبيض لامع', en: 'Glossy white' }],
      [yrs, y5],
    ],
    finishes: ['white'], images: { white: '/products/bathtub-white.webp' },
  },
]

// الأقسام الستة (ثنائية اللغة)
export const COLLECTIONS = [
  {
    id: 'mixers',
    name: { ar: 'الخلاطات', en: 'Mixers' }, short: { ar: 'الخلاطات', en: 'Mixers' },
    intro: { ar: 'خلاطات تجمع الدقّة والأناقة لتكون قلب مغسلتك ومطبخك.', en: 'Mixers that blend precision and elegance to be the heart of your basin and kitchen.' },
    features: [{ ar: 'تحكّم دقيق بالتدفّق', en: 'Precise flow control' }, { ar: 'تشطيب كروم لامع', en: 'Polished chrome finish' }, { ar: 'خامات مقاومة للصدأ', en: 'Rust-resistant materials' }],
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
