# ديفرا | Divra — Landing Page

موقع عرض (Landing Page) لعلامة **ديفرا** للأدوات الصحية الفاخرة (صنابير مطبخ، خلاطات حمّام وبانيو).
الموقع **عرض فقط** — لا يحتوي على سلة شراء أو دفع.

> **هوية بصرية محدّثة:** أسود سينمائي دافئ + لمسة **ذهبية شمبانيا** (بدل البنفسجي)،
> استناداً إلى توصية «Luxury/Premium Brand» من سكِل `ui-ux-pro-max`، مع منظومة
> حركة سكرول احترافية (Pinned Horizontal Showcase، مؤشر مخصّص، شريط تقدّم،
> كشف الكلمات، أزرار مغناطيسية، عدّادات).

## التقنيات

- **React + Vite**
- **TailwindCSS** (مع Design Tokens عبر متغيرات CSS — أسود/ذهبي)
- **GSAP + ScrollTrigger** لحركات السكرول (سكراب فيديو، تثبيت، سكرول أفقي، Parallax، عدّادات)
- **RTL بالكامل** (`dir="rtl" lang="ar"`) بخصائص CSS منطقية
- خطوط **Cairo** (عناوين) و**Tajawal** (نصوص) و**Playfair Display** (الاسم اللاتيني والأرقام)

## أبرز التفاعلات (Scroll Motion)

- **الهيرو**: تشغيل الفيديو إطاراً بإطار مع السكرول (scrub) + تثبيت + كشف الكلمات.
- **المجموعة**: قسم مثبّت بسكرول **أفقي** يستعرض القطع كتجربة معرض احترافية.
- **مؤشر مخصّص** ذهبي متتبّع + **شريط تقدّم** أعلى الصفحة.
- **أزرار مغناطيسية**، عدّادات أرقام، كشف تدريجي للعناصر، Parallax للصور.
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
    Hero.jsx        # فيديو scrub + كشف الكلمات + أزرار مغناطيسية
    Marquee.jsx     # شريط مفردات العلامة
    About.jsx       # من نحن + عدّادات + حلقة دوّارة
    Collection.jsx  # سكرول أفقي مثبّت لاستعراض القطع
    Products.jsx    # المنتجات + فلترة
    ProductRow.jsx  # صف منتج واحد + تبديل التشطيب + Parallax
    Contact.jsx     # نموذج تواصل (واجهة فقط)
    Footer.jsx      # فوتر + wordmark عملاق
    Cursor.jsx      # مؤشر مخصّص + شريط تقدّم السكرول
  lib/
    motion.js       # مساعدات: تقطيع كلمات RTL-safe + تأثير مغناطيسي
  App.jsx
  productsData.js   # بيانات المنتجات والتشطيبات
  useReducedMotion.js
  index.css         # Design Tokens (أسود/ذهبي) + مكوّنات
```

## ملاحظات

- يحترم الموقع `prefers-reduced-motion: reduce` (يوقف حركات GSAP).
- الفورم واجهة فقط (`preventDefault` + رسالة نجاح)، جاهز للربط لاحقاً بـ API.
- صور المنتجات لها `aspect-ratio` محجوز لتجنّب Layout Shift.
