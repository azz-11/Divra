import sharp from 'sharp'

const U = '/root/.claude/uploads/98f0123c-6f2c-5764-acc9-8a27838b7787'
const OUT = '/home/user/Divra/public/products'

// إزالة خلفية موحّدة عبر التعبئة من الحواف (flood-fill) مع الحفاظ على المنتج
async function removeBg(src, dest, tol = 30) {
  const { data, info } = await sharp(`${U}/${src}`)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
  const { width: w, height: h, channels: c } = info
  const out = Buffer.from(data)

  // لون الخلفية = متوسط أركان الصورة
  const corners = [
    [2, 2], [w - 3, 2], [2, h - 3], [w - 3, h - 3],
  ]
  let sr = 0, sg = 0, sb = 0
  for (const [x, y] of corners) {
    const i = (y * w + x) * c
    sr += out[i]; sg += out[i + 1]; sb += out[i + 2]
  }
  sr /= 4; sg /= 4; sb /= 4

  const near = (i) => {
    const dr = out[i] - sr, dg = out[i + 1] - sg, db = out[i + 2] - sb
    return Math.sqrt(dr * dr + dg * dg + db * db) < tol
  }

  // تعبئة من كل الحدود
  const visited = new Uint8Array(w * h)
  const stack = []
  const pushIf = (x, y) => {
    if (x < 0 || y < 0 || x >= w || y >= h) return
    const p = y * w + x
    if (visited[p]) return
    if (near(p * c)) { visited[p] = 1; stack.push(p) }
  }
  for (let x = 0; x < w; x++) { pushIf(x, 0); pushIf(x, h - 1) }
  for (let y = 0; y < h; y++) { pushIf(0, y); pushIf(w - 1, y) }
  while (stack.length) {
    const p = stack.pop()
    const x = p % w, y = (p / w) | 0
    out[p * c + 3] = 0 // شفاف
    pushIf(x + 1, y); pushIf(x - 1, y); pushIf(x, y + 1); pushIf(x, y - 1)
  }

  // نعومة الحواف: تمويه خفيف لقناة الألفا
  await sharp(out, { raw: { width: w, height: h, channels: c } })
    .png()
    .toFile('/tmp/_bg.png')
  await sharp('/tmp/_bg.png')
    .trim({ threshold: 5 })
    .resize({ width: 1100, height: 1100, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 90, alphaQuality: 92 })
    .toFile(dest)
  console.log('✓', dest.split('/').pop())
}

const MAP = [
  ['07556c90-026d2b7976dd4c34aa5d95ffe1d61a8c.jpg', 'mixer-chrome.webp', 30],
  ['4c0af63e-141319501fcd4abd878419fc1a8de5a3.jpg', 'shattaf-gold.webp', 34],
  ['8d9f2c0b-7d6af4198bbd40c0af1cb2aa6bede1bf.jpg', 'shower-gold.webp', 34],
  ['1154d27e-c15b682fdae54fa6930149011790f6b1.jpg', 'bathtub-white.webp', 24],
  ['10df9472-1e94973fbe0f4c6ba3e56f895a5357b8.jpg', 'toilet-white.webp', 24],
]

for (const [s, d, tol] of MAP) await removeBg(s, d, tol)
console.log('done')
