// خلفيات فنية خلف المنتجات — فكرة مختلفة لكل قسم
// النص/الصورة يبقيان فوقها؛ هذه طبقة زخرفية فقط
export default function ProductBackground({ variant = 'spotlight', accent = '#5561e5' }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {variant === 'spotlight' && (
        <>
          {/* بؤرة ضوئية مركزية + حلقات متحدة المركز */}
          <div
            className="absolute start-0 end-0 top-1/2 mx-auto h-[80vmin] w-[80vmin] -translate-y-1/2 rounded-full blur-3xl"
            style={{ insetInline: 0, background: `radial-gradient(circle, ${accent}44, transparent 65%)` }}
          />
          {[0.9, 0.65, 0.42].map((s, i) => (
            <div
              key={i}
              className="absolute start-0 end-0 top-1/2 mx-auto -translate-y-1/2 rounded-full border"
              style={{
                insetInline: 0,
                width: `${s * 70}vmin`,
                height: `${s * 70}vmin`,
                borderColor: `${accent}22`,
              }}
            />
          ))}
        </>
      )}

      {variant === 'orbs' && (
        <>
          {/* كرات ضوئية ناعمة عائمة */}
          <div className="absolute -top-10 start-[10%] h-72 w-72 rounded-full blur-3xl" style={{ insetInlineStart: '10%', background: `${accent}3a` }} />
          <div className="absolute bottom-0 end-[8%] h-96 w-96 rounded-full blur-3xl" style={{ insetInlineEnd: '8%', background: `${accent}30` }} />
          <div className="absolute top-1/3 end-1/3 h-40 w-40 rounded-full blur-2xl" style={{ insetInlineEnd: '33%', background: `${accent}55` }} />
        </>
      )}

      {variant === 'grid' && (
        <>
          {/* شبكة نقاط خفيفة + فينييت */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `radial-gradient(${accent}55 1px, transparent 1px)`,
              backgroundSize: '26px 26px',
              maskImage: 'radial-gradient(circle at center, #000 30%, transparent 72%)',
              WebkitMaskImage: 'radial-gradient(circle at center, #000 30%, transparent 72%)',
            }}
          />
          <div className="absolute start-0 end-0 top-1/2 mx-auto h-[60vmin] w-[60vmin] -translate-y-1/2 rounded-full blur-3xl" style={{ insetInline: 0, background: `radial-gradient(circle, ${accent}33, transparent 70%)` }} />
        </>
      )}

      {variant === 'beams' && (
        <>
          {/* أشعة قطرية متدرّجة */}
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background: `repeating-linear-gradient(115deg, transparent 0 60px, ${accent}0f 60px 62px)`,
            }}
          />
          <div className="absolute start-0 end-0 top-1/2 mx-auto h-[65vmin] w-[65vmin] -translate-y-1/2 rounded-full blur-3xl" style={{ insetInline: 0, background: `radial-gradient(circle, ${accent}3d, transparent 66%)` }} />
        </>
      )}
    </div>
  )
}
