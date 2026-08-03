// أسماء التشطيبات ولون الدائرة المقابلة
const FINISH = {
  black: { name: 'أسود مطفي', swatch: '#1a1a1a' },
  chrome: { name: 'كروم لامع', swatch: 'linear-gradient(135deg,#e9e9f2,#9aa0b5)' },
  gray: { name: 'رمادي فاخر', swatch: '#5b5b6b' },
  gold: { name: 'ذهبي فاخر', swatch: 'linear-gradient(135deg,#f5e6a8,#c9a24a)' },
  white: { name: 'أبيض لامع', swatch: 'linear-gradient(135deg,#ffffff,#dfe2ea)' },
}

// المنتجات المتوفّرة فعلياً (صور حقيقية)
export const PRODUCTS = [
  {
    id: 'mixer-chrome',
    collection: 'mixers',
    title: 'خلاط المغسلة الكروم',
    tagline: 'انسيابية كروم لامعة بمقبض جانبي مريح',
    desc: 'خلاط مغسلة بتشطيب كروم لامع ومخرج انسيابي، لمسة عصرية راقية لأي مغسلة.',
    specs: [['التشطيب', 'كروم لامع'], ['التدفّق', '6 لتر/دقيقة'], ['الخامة', 'نحاس مصقول'], ['الضمان', '5 سنوات']],
    finishes: ['chrome'],
    images: { chrome: '/products/mixer-chrome.webp' },
  },
  {
    id: 'basin',
    collection: 'mixers',
    title: 'خلاط المغسلة الأسود',
    tagline: 'مقبض جانبي مريح ومخرج انسيابي راقٍ',
    desc: 'مخلط حوض متوازن بمقبض جانبي مريح ومخرج انسيابي، لمسة نهائية راقية لأي مغسلة.',
    specs: [['النوع', 'خلاط مفرد'], ['التدفّق', '6 لتر/دقيقة'], ['الخامة', 'نحاس مصقول'], ['الضمان', '5 سنوات']],
    finishes: ['black'],
    images: { black: '/products/faucet-basin-black.webp' },
  },
  {
    id: 'spray-gold',
    collection: 'sprays',
    title: 'نظام الدش الذهبي',
    tagline: 'مرش علوي مطري ويدوي بتشطيب ذهبي فاخر',
    desc: 'نظام دش متكامل بمرش علوي واسع ورأس يدوي متعدّد الأوضاع، بتشطيب ذهبي يمنح حمّامك فخامة استثنائية.',
    specs: [['المرش', 'علوي + يدوي'], ['الأوضاع', 'متعددة'], ['التشطيب', 'ذهبي'], ['الضمان', '5 سنوات']],
    finishes: ['gold'],
    images: { gold: '/products/shower-gold.webp' },
  },
  {
    id: 'tall',
    collection: 'mixers',
    title: 'صنبور المطبخ العالي',
    tagline: 'قوس مرتفع يمنح حرية كاملة حول الحوض',
    desc: 'قوس مرتفع أنيق يمنح حرية حركة كاملة حول الحوض، بتصميم نحتي يتصدّر المشهد.',
    specs: [['الارتفاع', '42 سم'], ['الخامة', 'نحاس مصقول'], ['التشطيب', 'أسود مطفي'], ['الضمان', '5 سنوات']],
    finishes: ['black'],
    images: { black: '/products/faucet-tall-black.webp' },
  },
  {
    id: 'bath',
    collection: 'bath',
    title: 'مخلط البانيو الجداري',
    tagline: 'تركيب جداري بمخرج مزدوج ومحوّل انسيابي',
    desc: 'تركيب جداري بمخرج مزدوج ومحوّل انسيابي، يجمع بين قوة الأداء ونعومة التصميم.',
    specs: [['التركيب', 'جداري'], ['المخرج', 'مزدوج'], ['الخامة', 'سبيكة مقاومة'], ['الضمان', '5 سنوات']],
    finishes: ['black'],
    images: { black: '/products/faucet-bath-black.webp' },
  },
  {
    id: 'toilet',
    collection: 'chairs',
    title: 'كرسي الحمام المدمج',
    tagline: 'تصميم قطعة واحدة انسيابي وسهل التنظيف',
    desc: 'كرسي حمّام من قطعة واحدة بتصميم انسيابي عصري، بشطف مزدوج موفّر للماء وسطح سهل التنظيف.',
    specs: [['التصميم', 'قطعة واحدة'], ['الشطف', 'مزدوج موفّر'], ['الخامة', 'سيراميك مطلي'], ['الضمان', '5 سنوات']],
    finishes: ['white'],
    images: { white: '/products/toilet-white.webp' },
  },
  {
    id: 'shattaf',
    collection: 'shattaf',
    title: 'الشطاف الذهبي',
    tagline: 'ضغط متوازن وتشطيب ذهبي فاخر',
    desc: 'شطاف جداري بضغط ماء متوازن وخرطوم مرن، بتشطيب ذهبي أنيق يليق بالحمّامات الفاخرة.',
    specs: [['التركيب', 'جداري'], ['الخرطوم', 'مرن معدني'], ['التشطيب', 'ذهبي'], ['الضمان', '5 سنوات']],
    finishes: ['gold'],
    images: { gold: '/products/shattaf-gold.webp' },
  },
]

// الأقسام الستة — لكل قسم لون مميّز وصورة تمثيلية ومميزات
// ملاحظة: كراسي الحمام والجاكوزي تستخدم صوراً مبدئية مؤقتة (بانتظار صور حقيقية)
export const COLLECTIONS = [
  {
    id: 'mixers',
    name: 'الخلاطات',
    short: 'الخلاطات',
    intro: 'خلاطات تجمع الدقّة والأناقة لتكون قلب مغسلتك ومطبخك.',
    features: ['تحكّم دقيق بالتدفّق', 'تشطيب أسود مطفي', 'خامات مقاومة للصدأ'],
    accent: '#5561e5', bg: '#0c0c3a',
    image: '/products/mixer-chrome.webp',
  },
  {
    id: 'shattaf',
    name: 'الشطاف',
    short: 'الشطاف',
    intro: 'شطافات أنيقة بضغط متوازن وتحكّم سلس ونظافة فائقة.',
    features: ['ضغط ماء متوازن', 'تحكّم سلس', 'تشطيب مقاوم للصدأ'],
    accent: '#7781ea', bg: '#0a0a3d',
    image: '/products/shattaf-gold.webp',
  },
  {
    id: 'sprays',
    name: 'المروش',
    short: 'المروش',
    intro: 'رؤوس مرشّات قابلة للتوجيه بضغط ماء متوازن وتركيب سهل.',
    features: ['رؤوس قابلة للتوجيه', 'ضغط ماء متوازن', 'تركيب سهل'],
    accent: '#99a0ef', bg: '#12123f',
    image: '/products/shower-gold.webp',
  },
  {
    id: 'bath',
    name: 'البانيو',
    short: 'البانيو',
    intro: 'خلاطات بانيو جدارية بخطوط نحتية تمنح حمّامك حضوراً فندقياً.',
    features: ['مخرج مزدوج', 'محوّل انسيابي', 'تصميم جداري أنيق'],
    accent: '#5561e5', bg: '#0c0c3a',
    image: '/products/faucet-bath-black.webp',
  },
  {
    id: 'chairs',
    name: 'كراسي الحمام',
    short: 'الكراسي',
    intro: 'كراسي حمّام آمنة ومريحة بمواد مضادة للانزلاق وتحمّل عالٍ.',
    features: ['مواد مضادة للانزلاق', 'تحمّل عالٍ', 'راحة وأمان'],
    accent: '#7781ea', bg: '#0a0a3d',
    image: '/products/toilet-white.webp',
  },
  {
    id: 'jacuzzi',
    name: 'الجاكوزي',
    short: 'الجاكوزي',
    intro: 'جاكوزي فاخر بنفّاثات تدليك وإضاءة محيطة وتحكّم رقمي.',
    features: ['نفّاثات تدليك', 'إضاءة محيطة', 'تحكّم رقمي'],
    accent: '#99a0ef', bg: '#12123f',
    image: '/products/faucet-shower-black.webp', // مؤقت
    placeholder: true,
  },
]

export const collectionOf = (id) => COLLECTIONS.find((c) => c.id === id)
export const productsIn = (id) => PRODUCTS.filter((p) => p.collection === id)

export { FINISH }
