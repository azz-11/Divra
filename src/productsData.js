// أسماء التشطيبات ولون الدائرة المقابلة
const FINISH = {
  black: { name: 'أسود مطفي', swatch: '#1a1a1a' },
  chrome: { name: 'كروم لامع', swatch: 'linear-gradient(135deg,#e9e9f2,#9aa0b5)' },
  gray: { name: 'رمادي فاخر', swatch: '#5b5b6b' },
}

// المنتجات
export const PRODUCTS = [
  {
    id: 'tall',
    collection: 'kitchen',
    title: 'صنبور المطبخ العالي',
    tagline: 'قوس مرتفع يمنح حرية كاملة حول الحوض',
    desc: 'قوس مرتفع أنيق يمنح حرية حركة كاملة حول الحوض، بتصميم نحتي يتصدّر المشهد.',
    specs: [
      ['الارتفاع', '42 سم'],
      ['الخامة', 'نحاس مصقول'],
      ['التشطيب', 'أسود مطفي'],
      ['الضمان', '5 سنوات'],
    ],
    finishes: ['black'],
    images: { black: '/products/faucet-tall-black.webp' },
  },
  {
    id: 'bath',
    collection: 'bath',
    title: 'مخلط البانيو الجداري',
    tagline: 'تركيب جداري بمخرج مزدوج ومحوّل انسيابي',
    desc: 'تركيب جداري بمخرج مزدوج ومحوّل انسيابي، يجمع بين قوة الأداء ونعومة التصميم.',
    specs: [
      ['التركيب', 'جداري'],
      ['المخرج', 'مزدوج'],
      ['الخامة', 'سبيكة مقاومة'],
      ['الضمان', '5 سنوات'],
    ],
    finishes: ['black'],
    images: { black: '/products/faucet-bath-black.webp' },
  },
  {
    id: 'shower',
    collection: 'shower',
    title: 'مخلط الدش الجداري',
    tagline: 'خطوط أفقية نظيفة وذراع مفرد للتحكّم الدقيق',
    desc: 'خطوط أفقية نظيفة وذراع مفرد للتحكّم الدقيق، بتصميم عصري يليق بالحمّامات الفاخرة.',
    specs: [
      ['التركيب', 'جداري'],
      ['التحكّم', 'ذراع مفرد'],
      ['الخامة', 'نحاس مطلي'],
      ['الضمان', '5 سنوات'],
    ],
    finishes: ['black'],
    images: { black: '/products/faucet-shower-black.webp' },
  },
  {
    id: 'basin',
    collection: 'basin',
    title: 'خلاط المغسلة',
    tagline: 'مقبض جانبي مريح ومخرج انسيابي راقٍ',
    desc: 'مخلط حوض متوازن بمقبض جانبي مريح ومخرج انسيابي، لمسة نهائية راقية لأي مغسلة.',
    specs: [
      ['النوع', 'خلاط مفرد'],
      ['التدفّق', '6 لتر/دقيقة'],
      ['الخامة', 'نحاس مصقول'],
      ['الضمان', '5 سنوات'],
    ],
    finishes: ['black'],
    images: { black: '/products/faucet-basin-black.webp' },
  },
]

// الأقسام — كل قسم له لون مميّز وفكرة خلفية مختلفة
export const COLLECTIONS = [
  {
    id: 'kitchen',
    name: 'صنابير المطبخ',
    short: 'المطبخ',
    intro: 'صنابير تجمع المرونة والأناقة لتكون قلب مطبخك النابض.',
    accent: '#5561e5',
    bg: 'spotlight', // فكرة خلفية: بؤرة ضوئية + حلقات
  },
  {
    id: 'bath',
    name: 'خلاطات البانيو',
    short: 'البانيو',
    intro: 'خلاطات جدارية بخطوط نحتية تمنح بانيوك حضوراً فندقياً.',
    accent: '#7781ea',
    bg: 'orbs', // كرات ضوئية ناعمة عائمة
  },
  {
    id: 'shower',
    name: 'أنظمة الدش',
    short: 'الدش',
    intro: 'أنظمة دش انسيابية لتجربة استحمام تشبه المنتجعات.',
    accent: '#99a0ef',
    bg: 'grid', // شبكة نقاط + فينييت
  },
  {
    id: 'basin',
    name: 'خلاطات المغاسل',
    short: 'المغسلة',
    intro: 'خلاطات متوازنة تُتوّج مغسلتك بلمسة نهائية راقية.',
    accent: '#5561e5',
    bg: 'beams', // أشعة قطرية متدرّجة
  },
]

export const collectionOf = (id) => COLLECTIONS.find((c) => c.id === id)
export const productsIn = (id) => PRODUCTS.filter((p) => p.collection === id)

export { FINISH }
