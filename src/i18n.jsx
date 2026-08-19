import { createContext, useContext, useEffect, useState } from 'react'

// قاموس نصوص الواجهة (المفتاح بالعربية → الإنجليزية)
const UI = {
  // التنقل
  'الرئيسية': 'Home',
  'من نحن': 'About',
  'المنتجات': 'Products',
  'تواصل معنا': 'Contact',
  'اطلب عرض سعر': 'Request a Quote',
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
  // فاصل تسويقي
  'حين تلتقي الهندسة بالفخامة': 'Where engineering meets luxury',
  'نصمّم كل قطعة لتُضيء تفاصيل يومك بأناقةٍ تدوم.':
    'We craft every piece to illuminate your everyday with lasting elegance.',
  // المنتج الرسمي
  'المنتج الرسمي': 'The signature product',
  'اكتشف المنتج': 'Discover the product',
  'فخامةٌ تُصنع لتبقى': 'Luxury made to last',
  // عرض السعر
  'أضف إلى عرض السعر': 'Add to quote',
  'في قائمة عرض السعر ✓': 'In your quote ✓',
  'إزالة': 'Remove',
  'عناصر': 'items',
  'قائمة عرض السعر فارغة': 'Your quote list is empty',
  'تصفّح المنتجات وأضف ما يناسبك للاستفسار عنه دفعةً واحدة.':
    'Browse products and add what suits you to inquire about them all at once.',
  'المنتجات المختارة': 'Selected products',
  'أرسل الاستفسار عبر واتساب': 'Send inquiry via WhatsApp',
  'أرسل طلب الشراء بالبريد': 'Send order by email',
  'يتم إنشاء الملف…': 'Generating file…',
  'يُرسَل طلبك مع ملف PDF مرفق إلى فريق ديفرا.': 'Your order is sent with a PDF attached to the Divra team.',
  'تم إرسال طلبك بنجاح ✓': 'Your order was sent successfully ✓',
  'نُزّل ملف الطلب PDF وفتح تطبيق البريد — أرفق الملف ثم أرسل.':
    'The PDF downloaded and your mail app opened — attach the file and send.',
  '(مرفق ملف الطلب PDF)': '(PDF order attached)',
  'تفريغ القائمة': 'Clear list',
  'تصفّح المزيد': 'Browse more',
  'مرحباً، أرغب بعرض سعر للمنتجات التالية:': 'Hello, I’d like a quote for the following products:',
  // صفحة المنتج
  'المواصفات': 'Specifications',
  'الأبعاد': 'Dimensions',
  'دليل التنظيف والصيانة': 'Care & maintenance',
  'منتجات أخرى قد تعجبك': 'You may also like',
  'أكمل تصميمك': 'Complete your design',
  'قطعٌ مختارة تُكمّل هذه القطعة بانسجام تامّ.': 'Curated pieces that complete this one in perfect harmony.',
  'أكمِل حمّامك بلمسة ديفرا': 'Complete your bathroom with a Divra touch',
  'من الخلّاط إلى الكرسي والشطّاف — اقتنِ المجموعة كاملةً بانسجام تامّ في التصميم والتشطيب.':
    'From mixer to toilet and bidet spray — own the full collection in perfect harmony of design and finish.',
  'استكشف المجموعة الكاملة': 'Explore the full collection',
  'تحتاج مزيداً من التفاصيل؟': 'Need more details?',
  'نحن هنا لمساعدتك في اختيار القطع المناسبة لمساحتك.':
    'We’re here to help you choose the right pieces for your space.',
  'تواصل مع خبرائنا': 'Talk to our experts',
  'استفسر عن المنتج': 'Enquire about this product',
  'كل منتجات القسم': 'All products in category',
  'عن المنتج': 'About the product',
  'تصنع الفرق': 'make the difference',
  // صفحة القسم
  'عن': 'About',
  'منتجات القسم': 'Section products',
  'كل الأقسام': 'All categories',
  'الأنواع': 'Types',
  'اختر النوع الذي يناسب': 'Choose the type that suits',
  'تصنيف': 'Filter',
  'النوع': 'Type',
  'اللون': 'Color',
  'الخامة': 'Material',
  'النتائج': 'Results',
  'مسح الفلاتر': 'Clear filters',
  'لا نتائج مطابقة للفلاتر المختارة.': 'No results match the selected filters.',
  'اكتشف منتجات ذات صلة': 'Discover related products',
  'الأكثر رواجاً': 'Most popular',
  'رائج': 'Popular',
  'اعثر على الأنسب لحمّامك': 'Find the best fit for your bathroom',
  'استكشف الأشكال والتشطيبات وخيارات التركيب لتختار ما يُكمّل تصميم حمّامك ويرتقي بتجربتك اليومية.':
    'Explore shapes, finishes and installation options to choose what complements your bathroom design and elevates your daily experience.',
  'الأنواع وخيارات التركيب': 'Types & installation options',
  'تشطيبات متعددة: كروم، أسود، ذهبي ورمادي.': 'Multiple finishes: chrome, black, gold and gray.',
  'تركيب جداري أو على المغسلة حسب الطراز.': 'Wall or basin mounting depending on the model.',
  'خامات نحاسية مقاومة للصدأ بضمان 5 سنوات.': 'Rust-resistant brass materials with a 5-year warranty.',
  'عرض المزيد': 'View more',
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
