# ديفرا | Divra — Landing Page

موقع عرض (Landing Page) لعلامة **ديفرا** للأدوات الصحية الفاخرة (صنابير مطبخ، خلاطات حمّام وبانيو).
الموقع **عرض فقط** — لا يحتوي على سلة شراء أو دفع.

## التقنيات

- **React + Vite**
- **TailwindCSS** (مع Design Tokens عبر متغيرات CSS)
- **GSAP + ScrollTrigger** لحركات السكرول (زووم، ظهور تدريجي، Parallax)
- **RTL بالكامل** (`dir="rtl" lang="ar"`) بخصائص CSS منطقية
- خطوط **Cairo** (عناوين) و**Tajawal** (نصوص) من Google Fonts

## الأصول (Assets)

الأصول التالية مضمّنة في `public/` وجاهزة (معالَجة من ملفات العميل):

```
public/
  logo.png                          # شعار مؤقت (wordmark) — استبدله بالشعار الرسمي
  video/hero.mp4                    # فيديو الهيرو (مضغوط، بدون صوت)
  video/hero.webm
  products/poster.webp              # بوستر الفيديو
  products/faucet-tall-black.webp   # صنبور المطبخ العالي
  products/faucet-bath-black.webp   # مخلط البانيو الجداري
  products/faucet-shower-black.webp # مخلط الدش الجداري
  products/faucet-basin-black.webp  # خلاط المغسلة
```

> الصور بخلفية شفافة (WebP) لتناسب الطابع الداكن. التشطيب المتوفّر حالياً **أسود مطفي**
> فقط؛ عند توفّر تشطيبات إضافية (كروم/رمادي) أضِف الصور في `public/products` وسجّلها
> ضمن `finishes` و`images` في `src/productsData.js` لتفعيل مبدّل التشطيب تلقائياً.
>
> **الشعار** الحالي مؤقت مولّد؛ ضع الشعار الرسمي بخلفية شفافة مكان `public/logo.png`.

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
