# ديفرا | Divra — Landing Page

موقع عرض (Landing Page) لعلامة **ديفرا** للأدوات الصحية الفاخرة (صنابير مطبخ، خلاطات حمّام وبانيو).
الموقع **عرض فقط** — لا يحتوي على سلة شراء أو دفع.

## التقنيات

- **React + Vite**
- **TailwindCSS** (مع Design Tokens عبر متغيرات CSS)
- **GSAP + ScrollTrigger** لحركات السكرول (زووم، ظهور تدريجي، Parallax)
- **RTL بالكامل** (`dir="rtl" lang="ar"`) بخصائص CSS منطقية
- خطوط **Cairo** (عناوين) و**Tajawal** (نصوص) من Google Fonts

## الأصول المطلوبة (Assets)

انسخ الأصول إلى مجلد `public/` قبل التشغيل:

```
public/
  logo.png                       # الشعار (خلفية شفافة)
  video/hero.mp4                 # فيديو الهيرو
  video/hero.webm
  products/faucet-bath-black.webp
  products/faucet-bath-chrome.webp
  products/faucet-bath-gray.webp
  products/faucet-tall-black.webp
  products/faucet-tall-gray.webp
  products/faucet-shower-black.webp
  products/faucet-shower-gray.webp
  products/faucet-wall-black.webp
  products/faucet-wall-gray.webp
```

> الكود يشير إلى هذه المسارات مباشرة؛ بمجرد وضع الملفات يعمل الموقع كاملاً.

## التشغيل

```bash
npm install
npm run dev      # خادم تطوير
npm run build    # بناء للإنتاج (مجلد dist)
npm run preview  # معاينة البناء
```

## النشر على Vercel

المشروع جاهز للنشر كـ static build. ملف `vercel.json` مُعدّ مسبقاً
(`framework: vite`, `outputDirectory: dist`).

## البنية

```
src/
  components/
    Header.jsx      # هيدر ثابت + قائمة جوال
    Hero.jsx        # فيديو خلفية + زووم GSAP
    About.jsx       # من نحن + إحصائيات عائمة
    Products.jsx    # المنتجات + فلترة + Marquee
    ProductRow.jsx  # صف منتج واحد + تبديل التشطيب
    Contact.jsx     # نموذج تواصل (واجهة فقط)
    Footer.jsx
  App.jsx
  productsData.js   # بيانات المنتجات والتشطيبات
  useReducedMotion.js
  index.css         # Design Tokens + مكوّنات
```

## ملاحظات

- يحترم الموقع `prefers-reduced-motion: reduce` (يوقف حركات GSAP).
- الفورم واجهة فقط (`preventDefault` + رسالة نجاح)، جاهز للربط لاحقاً بـ API.
- صور المنتجات لها `aspect-ratio` محجوز لتجنّب Layout Shift.
