// أسماء التشطيبات ولون الدائرة المقابلة
const FINISH = {
  black: { name: 'أسود مطفي', swatch: '#1a1a1a' },
  chrome: { name: 'كروم لامع', swatch: 'linear-gradient(135deg,#e9e9f2,#9aa0b5)' },
  gray: { name: 'رمادي فاخر', swatch: '#5b5b6b' },
}

// كل منتج: التصنيف، العنوان، الوصف، المواصفات، والتشطيبات المتاحة
export const PRODUCTS = [
  {
    id: 'tall',
    num: '01',
    category: 'kitchen',
    categoryLabel: 'مطبخ',
    title: 'صنبور المطبخ العالي',
    desc: 'قوس مرتفع أنيق يمنح حرية حركة كاملة حول الحوض، بتصميم نحتي يتصدّر المشهد.',
    specs: [
      ['الارتفاع', '42 سم'],
      ['الخامة', 'نحاس مصقول'],
      ['التشطيب', 'أسود مطفي'],
      ['الضمان', '5 سنوات'],
    ],
    finishes: ['black'],
    images: {
      black: '/products/faucet-tall-black.webp',
    },
  },
  {
    id: 'bath',
    num: '02',
    category: 'bath',
    categoryLabel: 'حمّام / بانيو',
    title: 'مخلط البانيو الجداري',
    desc: 'تركيب جداري بمخرج مزدوج ومحوّل انسيابي، يجمع بين قوة الأداء ونعومة التصميم.',
    specs: [
      ['التركيب', 'جداري'],
      ['المخرج', 'مزدوج'],
      ['الخامة', 'سبيكة مقاومة'],
      ['الضمان', '5 سنوات'],
    ],
    finishes: ['black'],
    images: {
      black: '/products/faucet-bath-black.webp',
    },
  },
  {
    id: 'shower',
    num: '03',
    category: 'bath',
    categoryLabel: 'حمّام / بانيو',
    title: 'مخلط الدش الجداري',
    desc: 'خطوط أفقية نظيفة وذراع مفرد للتحكّم الدقيق، بتصميم عصري يليق بالحمّامات الفاخرة.',
    specs: [
      ['التركيب', 'جداري'],
      ['التحكّم', 'ذراع مفرد'],
      ['الخامة', 'نحاس مطلي'],
      ['الضمان', '5 سنوات'],
    ],
    finishes: ['black'],
    images: {
      black: '/products/faucet-shower-black.webp',
    },
  },
  {
    id: 'basin',
    num: '04',
    category: 'bath',
    categoryLabel: 'حمّام / بانيو',
    title: 'خلاط المغسلة',
    desc: 'مخلط حوض متوازن بمقبض جانبي مريح ومخرج انسيابي، لمسة نهائية راقية لأي مغسلة.',
    specs: [
      ['النوع', 'خلاط مفرد'],
      ['التدفّق', '6 لتر/دقيقة'],
      ['الخامة', 'نحاس مصقول'],
      ['الضمان', '5 سنوات'],
    ],
    finishes: ['black'],
    images: {
      black: '/products/faucet-basin-black.webp',
    },
  },
]

export { FINISH }
