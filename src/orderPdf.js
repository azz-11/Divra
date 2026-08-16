import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import { FINISH } from './productsData.js'

// يبني عنصر HTML بهيئة طلب شراء رسمي ثم يحوّله إلى PDF
export async function generateOrderPdf(items, { tr, lang = 'ar' } = {}) {
  const dir = lang === 'ar' ? 'rtl' : 'ltr'
  const L = {
    order: lang === 'ar' ? 'طلب شراء' : 'Purchase order',
    brand: 'DIVRA',
    date: lang === 'ar' ? 'التاريخ' : 'Date',
    no: lang === 'ar' ? 'م' : '#',
    image: lang === 'ar' ? 'الصورة' : 'Image',
    product: lang === 'ar' ? 'المنتج' : 'Product',
    finish: lang === 'ar' ? 'التشطيب' : 'Finish',
    qty: lang === 'ar' ? 'الكمية' : 'Qty',
    total: lang === 'ar' ? 'إجمالي القطع' : 'Total items',
    contact: lang === 'ar' ? 'للتواصل' : 'Contact',
  }
  const today = new Date().toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-GB')
  const totalQty = items.reduce((s, x) => s + x.qty, 0)

  const rows = items
    .map(({ product: p, qty }, i) => {
      const fin = FINISH[p.finishes[0]]
      const img = window.location.origin + p.images[p.finishes[0]]
      return `
      <tr>
        <td class="c num">${i + 1}</td>
        <td class="c"><div class="imgwrap"><img src="${img}" crossorigin="anonymous"/></div></td>
        <td class="name">${tr(p.title)}</td>
        <td class="c fin">${fin ? tr(fin.name) : '—'}</td>
        <td class="c qty">${qty}</td>
      </tr>`
    })
    .join('')

  const el = document.createElement('div')
  el.setAttribute('dir', dir)
  el.style.cssText = 'position:fixed;left:-10000px;top:0;width:794px;background:#ffffff;'
  el.innerHTML = `
    <style>
      .po { font-family:'IBM Plex Sans Arabic','Tajawal',sans-serif; color:#0f1f3d; padding:48px 40px; box-sizing:border-box; }
      .po * { box-sizing:border-box; }
      .head { display:flex; align-items:flex-start; justify-content:space-between; border-bottom:3px solid #0a0a3d; padding-bottom:18px; }
      .brand { font-size:34px; font-weight:800; letter-spacing:2px; color:#0a0a3d; }
      .otitle { font-size:15px; color:#4a5a72; margin-top:6px; }
      .meta { text-align:${dir === 'rtl' ? 'left' : 'right'}; font-size:13px; color:#4a5a72; line-height:1.9; }
      table { width:100%; border-collapse:collapse; margin-top:26px; }
      thead th { background:#0a0a3d; color:#fff; font-size:13px; font-weight:700; padding:12px 10px; text-align:center; }
      thead th.pname { text-align:${dir === 'rtl' ? 'right' : 'left'}; }
      tbody td { border-bottom:1px solid #e6e9f0; padding:10px; font-size:14px; vertical-align:middle; }
      td.c { text-align:center; }
      td.num { color:#8894a6; font-weight:700; width:36px; }
      td.name { font-weight:700; text-align:${dir === 'rtl' ? 'right' : 'left'}; }
      td.fin { color:#4a5a72; }
      td.qty { font-weight:800; font-size:16px; width:70px; }
      .imgwrap { width:64px; height:64px; margin:0 auto; background:#0d0d24; border-radius:10px; overflow:hidden; display:flex; align-items:center; justify-content:center; }
      .imgwrap img { width:100%; height:100%; object-fit:cover; display:block; }
      .foot { margin-top:26px; display:flex; align-items:center; justify-content:space-between; border-top:2px solid #0a0a3d; padding-top:16px; }
      .total { font-size:15px; font-weight:800; }
      .total span { color:#2f6fd6; }
      .contact { font-size:12px; color:#8894a6; }
    </style>
    <div class="po">
      <div class="head">
        <div>
          <div class="brand">${L.brand}</div>
          <div class="otitle">${L.order}</div>
        </div>
        <div class="meta">${L.date}: ${today}</div>
      </div>
      <table>
        <thead>
          <tr>
            <th>${L.no}</th>
            <th>${L.image}</th>
            <th class="pname">${L.product}</th>
            <th>${L.finish}</th>
            <th>${L.qty}</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      <div class="foot">
        <div class="total">${L.total}: <span>${totalQty}</span></div>
        <div class="contact">${L.contact}: +966 56 690 6123 · hello@divra.com</div>
      </div>
    </div>`

  document.body.appendChild(el)
  try {
    // انتظر تحميل الصور
    await Promise.all(
      Array.from(el.querySelectorAll('img')).map(
        (img) =>
          img.complete
            ? Promise.resolve()
            : new Promise((res) => { img.onload = img.onerror = res }),
      ),
    )
    const canvas = await html2canvas(el, { scale: 2, backgroundColor: '#ffffff', useCORS: true, logging: false })
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pageW = pdf.internal.pageSize.getWidth()
    const pageH = pdf.internal.pageSize.getHeight()
    const imgW = pageW
    const imgH = (canvas.height * imgW) / canvas.width
    const data = canvas.toDataURL('image/jpeg', 0.92)
    let heightLeft = imgH
    let position = 0
    pdf.addImage(data, 'JPEG', 0, position, imgW, imgH)
    heightLeft -= pageH
    while (heightLeft > 0) {
      position -= pageH
      pdf.addPage()
      pdf.addImage(data, 'JPEG', 0, position, imgW, imgH)
      heightLeft -= pageH
    }
    pdf.save('divra-order.pdf')
  } finally {
    document.body.removeChild(el)
  }
}
