import sharp from 'sharp'
import { execFileSync } from 'node:child_process'
import ffmpegPath from 'ffmpeg-static'
import { mkdirSync } from 'node:fs'

const UP = '/root/.claude/uploads/98f0123c-6f2c-5764-acc9-8a27838b7787'
const OUT = '/home/user/Divra/public'
mkdirSync(`${OUT}/products`, { recursive: true })
mkdirSync(`${OUT}/video`, { recursive: true })

// تحويل صورة ذات خلفية بيضاء إلى WebP بخلفية شفافة
async function toTransparentWebp(src, dest) {
  const img = sharp(src).ensureAlpha()
  const { data, info } = await img
    .raw()
    .toBuffer({ resolveWithObject: true })
  const { width, height, channels } = info
  const out = Buffer.from(data)
  const T = 238 // عتبة الأبيض
  for (let i = 0; i < out.length; i += channels) {
    const r = out[i], g = out[i + 1], b = out[i + 2]
    if (r >= T && g >= T && b >= T) {
      out[i + 3] = 0 // شفاف
    } else if (r >= 205 && g >= 205 && b >= 205) {
      // تدرّج ناعم عند الحواف
      const min = Math.min(r, g, b)
      out[i + 3] = Math.round(((min - 205) / (T - 205)) * 0 + (1 - (min - 205) / (T - 205)) * 255)
    }
  }
  await sharp(out, { raw: { width, height, channels } })
    .trim({ threshold: 10 })
    .resize({ width: 1000, height: 1000, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 88, alphaQuality: 90 })
    .toFile(dest)
  console.log('✓', dest)
}

const MAP = [
  ['df23fc1f-IMG_9269.JPG', 'faucet-tall-black.webp'],   // مطبخ عالي
  ['da43c9d7-IMG_9267.JPG', 'faucet-bath-black.webp'],   // بانيو
  ['88e6f6c9-IMG_9268.JPG', 'faucet-shower-black.webp'], // دش
  ['da09469a-IMG_9266.JPG', 'faucet-basin-black.webp'],  // مغسلة/حوض
]

for (const [s, d] of MAP) {
  await toTransparentWebp(`${UP}/${s}`, `${OUT}/products/${d}`)
}

// بوستر الهيرو من صورة المطبخ
await toTransparentWebp(`${UP}/df23fc1f-IMG_9269.JPG`, `${OUT}/products/poster.webp`)

// الفيديو: mp4 مضغوط + webm
const V = `${UP}/197e2f04-lv_0_20260803013513.mp4`
console.log('encoding mp4...')
execFileSync(ffmpegPath, [
  '-y', '-i', V,
  '-an', '-movflags', '+faststart',
  '-vf', "scale='min(1280,iw)':-2",
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '26',
  `${OUT}/video/hero.mp4`,
], { stdio: 'inherit' })
console.log('encoding webm...')
execFileSync(ffmpegPath, [
  '-y', '-i', V,
  '-an',
  '-vf', "scale='min(1280,iw)':-2",
  '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '34', '-row-mt', '1',
  `${OUT}/video/hero.webm`,
], { stdio: 'inherit' })
console.log('done')
