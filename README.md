# صيانة متنقلة — جوالات وكمبيوتر

موقع خدمة صيانة متنقلة للجوالات وأجهزة الكمبيوتر.
الموقع المنشور: https://siyanah.pages.dev (Cloudflare Pages)
نسخة احتياطية: https://siyanah.netlify.app

- `index.html`, `styles.css`, `script.js`: صفحة الموقع (HTML/CSS/JS بدون أي أدوات بناء)
- رقم التواصل ورسالة الواتساب الجاهزة يتعدلان من كائن `CONTACT` في أول `script.js`
- `og.html`: مصدر صورة المشاركة `og.png`
- `kit/`: مواد التسويق (صور، فيديو، أكواد QR، نصوص جاهزة). مصادر التصاميم في `kit/src`

لا تحذف `google11d72f874f7284ee.html` (تحقق Google Search Console) ولا ملف مفتاح IndexNow.

## النشر

Cloudflare Pages مربوط بهذا المستودع: أي `push` إلى فرع `main` يُنشر تلقائياً على https://siyanah.pages.dev (بدون أمر بناء، والمجلد الجذر هو مجلد الموقع).

نسخة Netlify تُحدَّث يدوياً عند الحاجة:

```bash
npx netlify-cli deploy --prod --dir . --site ff0da48b-13aa-4e67-9c0f-662c0439823d
```
