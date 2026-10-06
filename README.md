# صيانة متنقلة — جوالات وكمبيوتر

موقع خدمة صيانة متنقلة للجوالات وأجهزة الكمبيوتر.
الموقع المنشور: https://siyanah.netlify.app

- `index.html`, `styles.css`, `script.js`: صفحة الموقع (HTML/CSS/JS بدون أي أدوات بناء)
- رقم التواصل ورسالة الواتساب الجاهزة يتعدلان من كائن `CONTACT` في أول `script.js`
- `og.html`: مصدر صورة المشاركة `og.png`
- `kit/`: مواد التسويق (صور، فيديو، أكواد QR، نصوص جاهزة). مصادر التصاميم في `kit/src`

لا تحذف `google11d72f874f7284ee.html` (تحقق Google Search Console) ولا ملف مفتاح IndexNow.

## النشر

```bash
npx netlify-cli deploy --prod --dir . --site ff0da48b-13aa-4e67-9c0f-662c0439823d
```
