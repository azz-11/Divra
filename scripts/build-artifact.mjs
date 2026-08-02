import { readFileSync, writeFileSync, readdirSync } from 'node:fs'

const D = '/home/user/Divra/dist'
const P = '/home/user/Divra/public'

const b64 = (path, mime) =>
  `data:${mime};base64,${readFileSync(path).toString('base64')}`

// خرائط الأصول → data URI
const assets = {
  '/logo.png': b64(`${P}/logo.png`, 'image/png'),
  '/products/poster.webp': b64(`${P}/products/poster.webp`, 'image/webp'),
  '/products/faucet-tall-black.webp': b64(`${P}/products/faucet-tall-black.webp`, 'image/webp'),
  '/products/faucet-bath-black.webp': b64(`${P}/products/faucet-bath-black.webp`, 'image/webp'),
  '/products/faucet-shower-black.webp': b64(`${P}/products/faucet-shower-black.webp`, 'image/webp'),
  '/products/faucet-basin-black.webp': b64(`${P}/products/faucet-basin-black.webp`, 'image/webp'),
}
const mp4 = b64(`${P}/video/hero.mp4`, 'video/mp4')
// في المعاينة نستخدم mp4 فقط (نستبدل مسار webm به أيضاً)
assets['/video/hero.webm'] = mp4
assets['/video/hero.mp4'] = mp4

const files = readdirSync(`${D}/assets`)
const jsFile = files.find((f) => f.endsWith('.js'))
const cssFile = files.find((f) => f.endsWith('.css'))
let js = readFileSync(`${D}/assets/${jsFile}`, 'utf8')
const css = readFileSync(`${D}/assets/${cssFile}`, 'utf8')

// استبدال مسارات الأصول داخل حزمة JS بروابط data
for (const [path, uri] of Object.entries(assets)) {
  js = js.split(JSON.stringify(path)).join(JSON.stringify(uri))
  js = js.split(`"${path}"`).join(`"${uri}"`)
}

const out = `<style>
${css}
</style>
<div id="root"></div>
<script type="module">
${js}
</script>
`

writeFileSync('/home/user/Divra/scratch-preview.html', out)
console.log('artifact size:', (Buffer.byteLength(out) / 1024 / 1024).toFixed(2), 'MB')
