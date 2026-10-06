// ------------------------------------------------------------
// إعدادات التواصل — غيّرها من هنا فقط
// ------------------------------------------------------------
const CONTACT = {
  phoneIntl: "966531954355", // 0531954355 بصيغة دولية بدون +
  waMessage: "السلام عليكم ورحمة الله، أريد الاستفسار عن خدمات الصيانة",
};

const waUrl = `https://wa.me/${CONTACT.phoneIntl}?text=${encodeURIComponent(CONTACT.waMessage)}`;
const telUrl = `tel:+${CONTACT.phoneIntl}`;

document.querySelectorAll(".js-wa").forEach((a) => { a.href = waUrl; });
document.querySelectorAll(".js-tel").forEach((a) => { a.href = telUrl; });

const year = document.querySelector(".js-year");
if (year) year.textContent = new Date().getFullYear();

// ------------------------------------------------------------
// لوحة الفحص في أعلى الصفحة: تعرض أمثلة لأعطال شائعة
// ------------------------------------------------------------
const SCANS = [
  {
    device: "iPhone 13",
    lines: [
      ["$ diagnose --device iphone-13", ""],
      ["display ........ touch fail (bottom)", "bad"],
      ["battery ........ health 71%", "bad"],
      ["port ........... ok", "good"],
    ],
    result: "النتيجة: تبديل شاشة + بطارية — ساعة تقريباً، في موقعك.",
  },
  {
    device: "Galaxy S22",
    lines: [
      ["$ diagnose --device galaxy-s22", ""],
      ["charging ....... 0.2A (expected 2A)", "bad"],
      ["usb-c port ..... debris, pins ok", "bad"],
      ["battery ........ health 92%", "good"],
    ],
    result: "النتيجة: تنظيف منفذ الشحن — ربع ساعة، بدون قطع غيار.",
  },
  {
    device: "Laptop · Win 11",
    lines: [
      ["PS C:\\> diagnose --full", ""],
      ["disk ........... HDD 5400rpm, 96% used", "bad"],
      ["startup ........ 31 apps, boot 3m40s", "bad"],
      ["ram ............ 8GB ok", "good"],
    ],
    result: "النتيجة: ترقية إلى SSD ونقل ملفاتك — الجهاز يقلع في ثواني.",
  },
];

const log = document.querySelector(".js-scope-log");
const deviceLabel = document.querySelector(".js-scope-device");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

function li(text, tone) {
  const item = document.createElement("li");
  if (tone) item.className = `is-${tone}`;
  const code = document.createElement("code");
  code.textContent = text;
  item.append(code);
  return item;
}

function renderStatic(scan) {
  deviceLabel.textContent = scan.device;
  log.replaceChildren(...scan.lines.map(([t, tone]) => li(t, tone)));
  const res = document.createElement("li");
  res.className = "scope__result";
  res.textContent = scan.result;
  log.append(res);
}

async function play(scan) {
  deviceLabel.textContent = scan.device;
  log.replaceChildren();
  for (const [text, tone] of scan.lines) {
    const item = li("", tone);
    item.classList.add("is-typing");
    log.append(item);
    const code = item.firstChild;
    // the command line types out; result lines print in one go, like a real tool
    if (text.startsWith("$") || text.startsWith("PS")) {
      for (let i = 1; i <= text.length; i++) {
        code.textContent = text.slice(0, i);
        await wait(38);
      }
      await wait(380);
    } else {
      await wait(520);
      code.textContent = text;
    }
    item.classList.remove("is-typing");
  }
  await wait(450);
  const res = document.createElement("li");
  res.className = "scope__result";
  res.textContent = scan.result;
  log.append(res);
  await wait(4200);
}

if (log && deviceLabel) {
  if (reduceMotion) {
    renderStatic(SCANS[0]);
  } else {
    (async () => {
      let i = 0;
      // pause the loop while the tab is hidden
      for (;;) {
        if (document.hidden) { await wait(800); continue; }
        await play(SCANS[i % SCANS.length]);
        i++;
      }
    })();
  }
}

// ------------------------------------------------------------
// Netlify's free-plan badge is fixed to the bottom of the screen.
// When it shows up, leave room for it under the mobile contact bar.
// ------------------------------------------------------------
const markBadge = () => {
  if (document.getElementById("nl-badge-frame")) {
    document.body.classList.add("has-host-badge");
    return true;
  }
  return false;
};
if (!markBadge()) {
  const mo = new MutationObserver(() => { if (markBadge()) mo.disconnect(); });
  mo.observe(document.body, { childList: true });
  setTimeout(() => mo.disconnect(), 15000);
}
