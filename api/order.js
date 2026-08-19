// وظيفة Vercel Serverless: تستقبل طلب الشراء (PDF + ملخّص) وترسله بالبريد كمرفق.
// تتطلّب متغيّري بيئة على Vercel:
//   RESEND_API_KEY  → مفتاح Resend (https://resend.com)
//   EMAIL_FROM      → مُرسِل من نطاق مُوثَّق في Resend، مثل: "Divra <orders@yourdomain.com>"
// المستلم ثابت حسب الطلب (يمكن تجاوزه بمتغيّر ORDER_TO).

const TO = process.env.ORDER_TO || 'y.wazan@almakarem.com.sa'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.EMAIL_FROM
  if (!apiKey || !from) {
    return res.status(501).json({ error: 'email_not_configured' })
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {}
    const { pdfBase64, filename = 'divra-quote-request.pdf', summaryHtml = '', subject } = body
    if (!pdfBase64) return res.status(400).json({ error: 'missing_pdf' })

    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [TO],
        subject: subject || 'طلب عرض سعر جديد — Divra',
        html: summaryHtml || '<p>طلب عرض سعر جديد من موقع ديفرا (مرفق ملف PDF).</p>',
        attachments: [{ filename, content: pdfBase64 }],
      }),
    })

    if (!resp.ok) {
      const detail = await resp.text().catch(() => '')
      return res.status(502).json({ error: 'send_failed', detail })
    }
    return res.status(200).json({ ok: true })
  } catch (e) {
    return res.status(500).json({ error: 'server_error', detail: String(e) })
  }
}
