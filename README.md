# ديفرا | Divra — Landing Page

موقع عرض (Landing Page) لعلامة **ديفرا** للأدوات الصحية الفاخرة (صنابير مطبخ، خلاطات حمّام وبانيو).
الموقع **عرض فقط** — لا يحتوي على سلة شراء أو دفع.

> **مفهوم عرض جديد بهوية زرقاء/سماوية:** حافظنا على ألوان العلامة (تدرّجات
> السماوي والأزرق) وأعدنا بناء **طريقة العرض والحركة** بالكامل — هيرو منقسم بلوحة
> فيديو حيّة، قسم «بيان» مثبّت بإضاءة الكلمات تدريجياً، وعرض منتجات **Scrollytelling**
> بمنصّة ثابتة تتبدّل مع السكرول، وشريط تنقّل جانبي، ومؤشر مخصّص.

## التقنيات

- **React + Vite**
- **TailwindCSS** (مع Design Tokens عبر متغيرات CSS — أزرق/سماوي)
- **GSAP + ScrollTrigger** لحركات السكرول (تثبيت، إضاءة كلمات، Scrollytelling، Parallax، عدّادات)
- **RTL بالكامل** (`dir="rtl" lang="ar"`) بخصائص CSS منطقية
- خطوط **Cairo** (عناوين) و**Tajawal** (نصوص) و**Sora** (الاسم اللاتيني والأرقام)

## أبرز التفاعلات (Scroll Motion)

- **الهيرو**: تخطيط منقسم — كتابة حركية بكشف الأسطر (clip-reveal) + لوحة فيديو حيّة مؤطّرة.
- **البيان**: قسم مثبّت (pin) تُضاء كلماته تدريجياً مع السكرول (color sweep).
- **المجموعة**: عرض **Scrollytelling** — منصّة بصرية ثابتة تتبدّل صورتها كلما مرّرت بين القطع.
- **شريط تنقّل جانبي** يتتبّع القسم النشط + **مؤشر مخصّص** سماوي.
- **أزرار مغناطيسية**، عدّادات أرقام، كشف تدريجي، Parallax للفيديو.
- يُحترم `prefers-reduced-motion` بالكامل (بدائل ثابتة لكل حركة).

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
    Header.jsx      # هيدر ثابت + قائمة جوال + wordmark
    Hero.jsx        # هيرو منقسم + كشف الأسطر + لوحة فيديو حيّة + أزرار مغناطيسية
    Manifesto.jsx   # قسم بيان مثبّت بإضاءة الكلمات + عدّادات + قيم
    Showcase.jsx    # عرض Scrollytelling بمنصّة ثابتة + فلترة + تبديل تشطيب
    Contact.jsx     # نموذج تواصل (واجهة فقط)
    Footer.jsx      # فوتر + wordmark عملاق
    Cursor.jsx      # مؤشر مخصّص سماوي
    SideRail.jsx    # شريط تنقّل جانبي يتتبّع القسم النشط
  lib/
    motion.js       # مساعدات: تقطيع كلمات RTL-safe + تأثير مغناطيسي
  App.jsx
  productsData.js   # بيانات المنتجات والتشطيبات
  useReducedMotion.js
  index.css         # Design Tokens (أزرق/سماوي) + مكوّنات
```

## ملاحظات

- يحترم الموقع `prefers-reduced-motion: reduce` (يوقف حركات GSAP).
- الفورم واجهة فقط (`preventDefault` + رسالة نجاح)، جاهز للربط لاحقاً بـ API.
- صور المنتجات لها `aspect-ratio` محجوز لتجنّب Layout Shift.
