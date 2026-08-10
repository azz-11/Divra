import { createContext, useContext, useEffect, useState } from 'react'

// قاموس نصوص الواجهة (المفتاح بالعربية → الإنجليزية)
const UI = {
  // التنقل
  'الرئيسية': 'Home',
  'من نحن': 'About',
  'المنتجات': 'Products',
  'تواصل معنا': 'Contact',
  'بحث': 'Search',
  'القائمة': 'Menu',
  // الهيرو
  'أدوات صحية فاخرة': 'Luxury sanitary ware',
  'لحظاتك... تستحق أن تُعاش بجمال': 'Your moments deserve to be lived beautifully',
  'ديفرا': 'Divra',
  'تفاصيل تنسجم مع إيقاع حياتك.': 'Details in harmony with the rhythm of your life.',
  'استكشف المجموعة': 'Explore the collection',
  'تعرّف على ديفرا': 'Discover Divra',
  'مرّر لتحريك المشهد': 'Scroll to move the scene',
  'مرّر للأسفل': 'Scroll down',
  // الكاروسيل
  'DIVRA · أقسامنا': 'DIVRA · Our categories',
  'كل المنتجات': 'All products',
  // من نحن
  'نصنع': 'We craft',
  'تفاصيل': 'details',
  'تدوم': 'that last',
  'في ديفرا نؤمن أن الأدوات الصحية ليست مجرّد وظيفة، بل لغة تعبّر عن رقيّ المكان. نجمع بين هندسة دقيقة وحرفية عالية لنقدّم صنابير ومخلاطات تتحدّى الزمن جمالاً وأداءً.':
    'At Divra we believe sanitary ware is not merely functional — it is a language that expresses the elegance of a space. We combine precise engineering and fine craftsmanship to deliver faucets and mixers that defy time in beauty and performance.',
  'تصميم نحتي': 'Sculptural design',
  'خطوط انسيابية منحوتة بعناية تحوّل كل صنبور إلى قطعة فنية.':
    'Carefully sculpted flowing lines that turn every faucet into a work of art.',
  'جودة معتمدة': 'Certified quality',
  'مواد نحاسية وسبائك مقاومة للصدأ بمعايير جودة عالمية.':
    'Brass and rust-resistant alloys built to world-class quality standards.',
  'تصميم يحبه العملاء': 'Design customers love',
  'تجربة استخدام سلسة وتفاصيل تُبهر أصحاب الذوق الرفيع.':
    'A smooth experience and details that impress the discerning.',
  'عاماً من الخبرة': 'years of expertise',
  'قطع منتقاة': 'curated pieces',
  // تواصل
  'نحن': 'We are',
  'قريبون': 'close',
  'منك': 'to you',
  'تواصل معنا عبر أيّ من القنوات التالية وسنسعد بخدمتك.':
    'Reach us through any of the channels below — we’ll be glad to help.',
  'تواصل عبر واتساب': 'Chat on WhatsApp',
  'البريد الإلكتروني': 'Email',
  'واتساب': 'WhatsApp',
  'الهاتف': 'Phone',
  'تابعنا على': 'Follow us on',
  // البحث
  'ابحث عن منتج… (مثال: دش، بانيو، مطبخ)': 'Search products… (e.g. shower, bath, mixer)',
  'لا توجد نتائج لِـ': 'No results for',
  // صفحة القسم
  'المجموعة': 'Collection',
  'العودة للرئيسية': 'Back to home',
  'قريباً': 'Coming soon',
  'منتجات قسم': 'Products in the',
  'في طريقها إليك — تابعنا لأحدث الإضافات.': 'category are on their way — follow us for the latest.',
  // المنتج
  'التشطيب:': 'Finish:',
  // الفوتر
  'جميع الحقوق محفوظة.': 'All rights reserved.',
  // البنر
  'من عالم ديفرا': 'From Divra’s world',
  // صفحة المنتج
  'استفسر عن المنتج': 'Enquire about this product',
  'كل منتجات القسم': 'All products in category',
  'عن المنتج': 'About the product',
  'تصنع الفرق': 'make the difference',
  // صفحة القسم
  'عن': 'About',
  'منتجات القسم': 'Section products',
  'كل الأقسام': 'All categories',
  // اللغة
  'English': 'العربية',
}

const LangContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() =>
    (typeof localStorage !== 'undefined' && localStorage.getItem('lang')) || 'ar',
  )
  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
    try { localStorage.setItem('lang', lang) } catch {}
  }, [lang, dir])

  const toggle = () => setLang((l) => (l === 'ar' ? 'en' : 'ar'))

  // نص واجهة: يرجع الإنجليزية عند en وإلا العربية
  const t = (s) => (lang === 'en' ? UI[s] ?? s : s)
  // حقل ثنائي اللغة: {ar,en} أو مصفوفة منها
  const tr = (field) => {
    if (field == null) return field
    if (Array.isArray(field)) return field.map(tr)
    if (typeof field === 'object') return field[lang] ?? field.ar ?? ''
    return field
  }

  return (
    <LangContext.Provider value={{ lang, dir, toggle, t, tr }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}
