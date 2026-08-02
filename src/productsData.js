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
      ['الرأس', 'قابل للسحب'],
      ['الضمان', '5 سنوات'],
    ],
    finishes: ['black', 'gray'],
    images: {
      black: '/products/faucet-tall-black.webp',
      gray: '/products/faucet-tall-gray.webp',
    },
  },
  {
    id: 'bath',
    num: '02',
    category: 'bath',
    categoryLabel: 'حمّام / بانيو',
    title: 'مخلط الحمّام الكلاسيك',
    desc: 'توازن مثالي بين الدفء والانسياب، مع تحكّم دقيق في تدفّق الماء ودرجة حرارته.',
    specs: [
      ['النوع', 'خلاط مفرد'],
      ['الخامة', 'سبيكة مقاومة'],
      ['التدفّق', '6 لتر/دقيقة'],
      ['الضمان', '5 سنوات'],
    ],
    finishes: ['black', 'chrome', 'gray'],
    images: {
      black: '/products/faucet-bath-black.webp',
      chrome: '/products/faucet-bath-chrome.webp',
      gray: '/products/faucet-bath-gray.webp',
    },
  },
  {
    id: 'shower',
    num: '03',
    category: 'bath',
    categoryLabel: 'حمّام / بانيو',
    title: 'مخلط الدش الفاخر',
    desc: 'رأس دش واسع بتدفّق مطري يمنحك تجربة استحمام تشبه المنتجعات الراقية.',
    specs: [
      ['النمط', 'مطري واسع'],
      ['الخامة', 'ستانلس ستيل'],
      ['الأوضاع', '3 وضعيات'],
      ['الضمان', '5 سنوات'],
    ],
    finishes: ['black', 'gray'],
    images: {
      black: '/products/faucet-shower-black.webp',
      gray: '/products/faucet-shower-gray.webp',
    },
  },
  {
    id: 'wall',
    num: '04',
    category: 'bath',
    categoryLabel: 'حمّام / بانيو',
    title: 'مخلط البانيو الجداري',
    desc: 'تركيب جداري عصري بخطوط هندسية نظيفة يجمع بين البساطة والفخامة.',
    specs: [
      ['التركيب', 'جداري'],
      ['الخامة', 'نحاس مطلي'],
      ['المخرج', 'مزدوج'],
      ['الضمان', '5 سنوات'],
    ],
    finishes: ['black', 'gray'],
    images: {
      black: '/products/faucet-wall-black.webp',
      gray: '/products/faucet-wall-gray.webp',
    },
  },
]

export { FINISH }
