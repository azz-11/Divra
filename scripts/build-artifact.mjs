import { readFileSync, writeFileSync, readdirSync } from 'node:fs'

const D = '/home/user/Divra/dist'
const P = '/home/user/Divra/public'

const b64raw = (path) => readFileSync(path).toString('base64')
const b64 = (path, mime) => `data:${mime};base64,${b64raw(path)}`

// الصور تعمل كـ data URI بلا مشاكل — نُضمّن كل صور المنتجات + الشعار تلقائياً
const assets = {
  '/logo.png': b64(`${P}/logo.png`, 'image/png'),
}
for (const f of readdirSync(`${P}/products`)) {
  if (f.endsWith('.webp')) assets[`/products/${f}`] = b64(`${P}/products/${f}`, 'image/webp')
}

// الفيديو: Chromium لا يشغّل <video> من data: URI (لا يدعم byte-range)،
// لذا نُضمّن base64 مرة واحدة ونحوّله وقت التشغيل إلى Blob URL (يدعم الـ seeking)
const VIDEO_B64 = b64raw('/home/user/Divra/scratch-hero-preview.webm')

const files = readdirSync(`${D}/assets`)
const jsFile = files.find((f) => f.endsWith('.js'))
const cssFile = files.find((f) => f.endsWith('.css'))
let js = readFileSync(`${D}/assets/${jsFile}`, 'utf8')
const css = readFileSync(`${D}/assets/${cssFile}`, 'utf8')

// نُفرّغ مسارات الفيديو في الحزمة (سنضبط video.src من Blob لاحقاً)
js = js.split('"/video/hero.webm"').join('""')
js = js.split('"/video/hero.mp4"').join('""')
// استبدال مسارات الصور والشعار بروابط data
for (const [path, uri] of Object.entries(assets)) {
  js = js.split(JSON.stringify(path)).join(JSON.stringify(uri))
  js = js.split(`"${path}"`).join(`"${uri}"`)
}

// سكربت يحوّل base64 → Blob URL ويضبطه على فيديو الهيرو بمجرد ظهوره
const blobSwap = `
(function () {
  var b64 = "${VIDEO_B64}";
  var bin = atob(b64), len = bin.length, arr = new Uint8Array(len);
  for (var i = 0; i < len; i++) arr[i] = bin.charCodeAt(i);
  var url = URL.createObjectURL(new Blob([arr], { type: 'video/webm' }));
  var tries = 0;
  var iv = setInterval(function () {
    var v = document.querySelector('#hero video');
    if (v && !v.dataset.blobbed) {
      v.dataset.blobbed = '1';
      v.querySelectorAll('source').forEach(function (s) { s.remove(); });
      v.src = url;
      v.load();
      clearInterval(iv);
    } else if (++tries > 200) {
      clearInterval(iv);
    }
  }, 50);
})();
`

const out = `<style>
${css}
</style>
<div id="root"></div>
<script type="module">
${js}
</script>
<script>
${blobSwap}
</script>
`

writeFileSync('/home/user/Divra/scratch-preview.html', out)
console.log('artifact size:', (Buffer.byteLength(out) / 1024 / 1024).toFixed(2), 'MB')
