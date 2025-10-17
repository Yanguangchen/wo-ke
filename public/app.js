import { salonData } from "./data.js";

let currentLang = (typeof localStorage !== "undefined" && localStorage.getItem("lang")) ||
  ((typeof navigator !== "undefined" && navigator.language && navigator.language.toLowerCase().startsWith("zh")) ? "zh" : "en");

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function createEl(tag, className, children = []) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  children.forEach((child) => {
    if (typeof child === "string") {
      el.appendChild(document.createTextNode(child));
    } else if (child) {
      el.appendChild(child);
    }
  });
  return el;
}

// simple icon mapping using emoji; can be swapped for SVGs
const icons = {
  // groups
  haircutDesign: "💇‍♂️",
  hairColour: "🎨",
  hairPerm: "🌀",
  proteinCorrection: "🧪",
  scalpSeries: "🧴",
  hairCare: "✨",
  hairExtensions: "🧵",
  // specializations
  Herbal: "🌿",
  Natural: "🍃",
};

function pick(cn, en) {
  return currentLang === "zh" ? cn : en;
}

function formatPrice(price) {
  if (price == null) return "";
  if (Array.isArray(price)) return price.map((p) => `$${p}`).join(" / ");
  if (typeof price === "object") {
    const parts = [];
    const shortLabel = pick("短", "Short");
    const longLabel = pick("长", "Long");
    if (price.short != null) parts.push(`${shortLabel} $${price.short}`);
    if (price.long != null) parts.push(`${longLabel} $${price.long}`);
    return parts.join(" · ");
  }
  return `$${price}`;
}

function renderHeader() {
  const { salonInfo, contactInfo } = salonData;
  const brandCn = document.getElementById("brand-cn");
  const brandEn = document.getElementById("brand-en");
  if (brandCn) brandCn.style.display = currentLang === "zh" ? "inline" : "none";
  if (brandEn) brandEn.style.display = currentLang === "zh" ? "none" : "inline";

  // Title and tagline
  setText("hero-title", currentLang === "zh" ? salonInfo.name : salonInfo.namePinyin);
  setText("tagline", pick(salonInfo.tagline, salonInfo.taglineTranslation));
  setText("tagline-en", currentLang === "zh" ? "" : "");
  setText("hero-subtitle", salonInfo.ambiance);
  setText("intro-text", currentLang === "zh" ? (salonInfo.intro || "") : (salonInfo.introEn || ""));
  const pointsRoot = document.getElementById('intro-points');
  if (pointsRoot) {
    pointsRoot.innerHTML = '';
    (salonInfo.introPoints || []).forEach((p) => {
      const li = document.createElement('li');
      li.className = 'intro-point';
      const text = currentLang === 'zh' ? p.zh : p.en;
      li.appendChild(createEl('span','bullet',[p.icon || '·']));
      li.appendChild(document.createTextNode(' ' + text));
      pointsRoot.appendChild(li);
    });
  }
  setText("footer-unit", salonInfo.unitNumber);
  const footerName = document.getElementById("footer-name");
  if (footerName) footerName.textContent = currentLang === "zh" ? salonInfo.name : salonInfo.namePinyin;

  const [p1, p2] = contactInfo.phoneNumbers;
  const primaryLink = document.getElementById("call-primary");
  const secondaryLink = document.getElementById("call-secondary");
  if (primaryLink && p1) {
    primaryLink.href = `tel:${p1}`;
    primaryLink.textContent = pick(
      `致电 ${contactInfo.primaryContact}（${p1}）`,
      `Call ${contactInfo.primaryContact} (${p1})`
    );
  }
  if (secondaryLink && p2) {
    secondaryLink.href = `tel:${p2}`;
    secondaryLink.textContent = pick(`备用 ${p2}`, `Alternate ${p2}`);
  } else if (secondaryLink) {
    secondaryLink.style.display = "none";
  }

  // Nav + section headings
  setText("nav-specializations", pick("特色", "Specializations"));
  setText("nav-services", pick("服务", "Services"));
  setText("nav-membership", pick("会员", "Membership"));
  setText("nav-contact", pick("联系", "Contact"));
  setText("h2-specializations", pick("特色", "Specializations"));
  setText("h2-services", pick("服务项目", "Services"));
  setText("h2-membership", pick("会员", "Membership"));
  setText("h2-contact", pick("联系", "Contact"));
  setText("nav-media", pick("媒体", "Media"));
  setText("h2-media", pick("媒体", "Media"));
  // mobile nav i18n
  setText("mnav-specializations", pick("特色", "Specializations"));
  setText("mnav-services", pick("服务", "Services"));
  setText("mnav-membership", pick("会员", "Membership"));
  setText("mnav-contact", pick("联系", "Contact"));
  setText("mnav-media", pick("媒体", "Media"));
  // footer nav i18n
  setText("fnav-specializations", pick("特色", "Specializations"));
  setText("fnav-services", pick("服务", "Services"));
  setText("fnav-membership", pick("会员", "Membership"));
  setText("fnav-contact", pick("联系", "Contact"));
  setText("fnav-media", pick("媒体", "Media"));
}

function renderHeroProgressLabels() {
  setText("hero-node-0", pick("咨询", "Consult"));
  setText("hero-node-1", pick("专业造型", "We style"));
  setText("hero-node-2", pick("焕然一新", "Enjoy your new look"));
}

function renderSpecializations() {
  const root = document.getElementById("specializations-list");
  if (!root) return;
  root.innerHTML = "";
  salonData.specializations.forEach((spec) => {
    const icon = spec.name.toLowerCase().includes("herb") ? icons.Herbal : icons.Natural;
    const displayName = currentLang === "zh" ? (spec.nameChinese || spec.name) : spec.name;
    const displayDesc = currentLang === "zh" ? (spec.descriptionChinese || spec.description) : spec.description;
    const card = createEl("div", "card", [
      createEl("h3", "card-title", [
        createEl("span", "icon", [icon || "✨"]),
        " ",
        displayName,
      ]),
      createEl("p", "card-text", [displayDesc]),
    ]);
    root.appendChild(card);
  });
}

function renderServices() {
  const groupsRoot = document.getElementById("services-content");
  if (!groupsRoot) return;
  groupsRoot.innerHTML = "";

  function renderGroup(key) {
    const group = salonData.services[key];
    const groupEl = createEl("section", "service-group");
    const title = createEl("h3", "service-title", [
      createEl("span", "icon", [icons[key] || "💈"]),
      " ",
      currentLang === "zh" ? group.titleChinese : group.title,
    ]);
    const list = createEl("div", "service-list");

    group.items.forEach((item) => {
      const name = currentLang === "zh" ? item.nameChinese : item.name;
      const price = formatPrice(item.price);
      const original = item.originalPrice ? `$${item.originalPrice}` : null;
      const row = createEl("div", "service-item", [
        createEl("div", "service-name", [createEl("span", "icon sm", ["·"]), " ", name]),
        createEl(
          "div",
          "service-price",
          original
            ? [
                createEl("span", "price-current", [price]),
                createEl("span", "price-original", [original]),
              ]
            : [createEl("span", "price-current", [price])]
        ),
      ]);
      list.appendChild(row);
    });

    groupEl.appendChild(title);
    groupEl.appendChild(list);
    return groupEl;
  }

  [
    "haircutDesign",
    "hairColour",
    "hairPerm",
    "proteinCorrection",
    "scalpSeries",
    "hairCare",
    "hairExtensions",
  ].forEach((key) => {
    groupsRoot.appendChild(renderGroup(key));
  });
}

function renderMembership() {
  const root = document.getElementById("membership-card");
  if (!root) return;
  root.innerHTML = "";
  const m = salonData.membershipProgram;
  const title = createEl("h3", "membership-title", [
    currentLang === "zh" ? m.titleChinese : m.title,
  ]);
  const desc = createEl("p", "membership-desc", [m.description]);
  const tiers = createEl("div", "membership-tiers");
  m.tiers.forEach((t) => {
    tiers.appendChild(
      createEl("div", "tier", [
        createEl("div", "tier-topup", [`充值 Top-up $${t.topUp}`]),
        createEl("div", "tier-bonus", [`赠送 Bonus $${t.bonus}`]),
      ])
    );
  });
  root.appendChild(title);
  root.appendChild(desc);
  root.appendChild(tiers);
}

function renderContact() {
  const root = document.getElementById("contact-info");
  if (!root) return;
  root.innerHTML = "";
  const { contactInfo, salonInfo } = salonData;
  const phones = createEl("div", "contact-phones");
  contactInfo.phoneNumbers.forEach((p) => {
    const a = createEl("a", "contact-phone", [p]);
    a.href = `tel:${p}`;
    phones.appendChild(a);
  });
  const address = createEl("div", "contact-address", [salonInfo.address || ""]);
  const unit = createEl("div", "contact-unit", [salonInfo.unitNumber]);
  root.appendChild(phones);
  if (salonInfo.address) root.appendChild(address);
  root.appendChild(unit);
}

function applyLangToDocument() {
  document.documentElement.lang = currentLang === "zh" ? "zh-Hans" : "en";
  const enBtn = document.getElementById("lang-en");
  const zhBtn = document.getElementById("lang-zh");
  if (enBtn && zhBtn) {
    enBtn.classList.toggle("active", currentLang === "en");
    zhBtn.classList.toggle("active", currentLang === "zh");
  }
}

function setLang(lang) {
  currentLang = lang;
  try { localStorage.setItem("lang", lang); } catch {}
  applyLangToDocument();
  renderHeader();
  renderHeroProgressLabels();
  renderSpecializations();
  renderServices();
  renderMembership();
  renderContact();
  renderMedia();
}

function init() {
  applyLangToDocument();
  renderHeader();
  renderHeroProgressLabels();
  renderSpecializations();
  renderServices();
  renderMembership();
  renderContact();
  injectJsonLd();
  animateHeroTypography();
  renderMedia();
  initMembershipVideo();
  initMembershipCardVideo();

  const enBtn = document.getElementById("lang-en");
  const zhBtn = document.getElementById("lang-zh");
  if (enBtn) enBtn.addEventListener("click", () => setLang("en"));
  if (zhBtn) zhBtn.addEventListener("click", () => setLang("zh"));

  // Fallback delegation in case buttons are re-rendered or events lost
  document.addEventListener("click", (e) => {
    const t = e.target;
    if (!(t instanceof Element)) return;
    if (t.id === "lang-en" || t.closest && t.closest("#lang-en")) {
      e.preventDefault();
      setLang("en");
    } else if (t.id === "lang-zh" || (t.closest && t.closest("#lang-zh"))) {
      e.preventDefault();
      setLang("zh");
    }
  });

  // mobile nav toggle logic
  const navToggle = document.getElementById("nav-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileClose = document.getElementById("mobile-close");
  function openMenu(){
    if (!mobileMenu) return;
    mobileMenu.classList.add("show");
    mobileMenu.removeAttribute("hidden");
    document.body.style.overflow = "hidden";
    if (navToggle) navToggle.setAttribute("aria-expanded", "true");
  }
  function closeMenu(){
    if (!mobileMenu) return;
    mobileMenu.classList.remove("show");
    mobileMenu.setAttribute("hidden", "");
    document.body.style.overflow = "";
    if (navToggle) navToggle.setAttribute("aria-expanded", "false");
  }
  if (navToggle) navToggle.addEventListener("click", openMenu);
  if (mobileClose) mobileClose.addEventListener("click", closeMenu);
  if (mobileMenu) mobileMenu.addEventListener("click", (e)=>{ if(e.target === mobileMenu) closeMenu(); });
  // close menu when selecting a link
  document.querySelectorAll('.mobile-nav a').forEach((a)=>{
    a.addEventListener('click', closeMenu);
  });
}

function renderMedia(){
  const root = document.getElementById('media-grid');
  if (!root) return;
  root.innerHTML = '';
  (salonData.media || []).forEach((item)=>{
    const wrapper = createEl('div','media-item');
    if(item.type === 'video'){
      const v = document.createElement('video');
      v.src = item.src;
      v.controls = true;
      v.playsInline = true;
      if (item.poster) v.poster = item.poster;
      wrapper.appendChild(v);
    } else {
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.alt || '';
      wrapper.appendChild(img);
    }
    root.appendChild(wrapper);
  });
}

window.addEventListener("DOMContentLoaded", init);

// Smooth scroll for internal links
document.addEventListener("click", (e) => {
  const target = e.target;
  if (target instanceof Element && target.matches('a[href^="#"]')) {
    const href = target.getAttribute("href");
    if (href && href.length > 1) {
      const el = document.querySelector(href);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }
});

// Reveal on scroll using IntersectionObserver
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

function observeReveals() {
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

window.addEventListener("load", observeReveals);

// Interactive hero background: lightweight particle parallax
function heroCanvas() {
  const canvas = document.getElementById("hero-canvas");
  if (!(canvas instanceof HTMLCanvasElement)) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const DPR = window.devicePixelRatio || 1;
  let width = 0, height = 0;
  const particles = Array.from({ length: 50 }, () => ({
    x: Math.random(),
    y: Math.random(),
    r: 1 + Math.random() * 2,
    vx: (Math.random() - 0.5) * 0.0005,
    vy: (Math.random() - 0.5) * 0.0005,
  }));

  function resize() {
    const rect = canvas.getBoundingClientRect();
    width = Math.max(1, Math.floor(rect.width));
    height = Math.max(1, Math.floor(rect.height));
    canvas.width = width * DPR;
    canvas.height = height * DPR;
    ctx.scale(DPR, DPR);
  }
  resize();
  window.addEventListener("resize", resize);

  let mouseX = 0.5, mouseY = 0.3;
  window.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = (e.clientX - rect.left) / rect.width;
    mouseY = (e.clientY - rect.top) / rect.height;
  });

  function step() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#d4a373";
    particles.forEach((p) => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < -0.1) p.x = 1.1; if (p.x > 1.1) p.x = -0.1;
      if (p.y < -0.1) p.y = 1.1; if (p.y > 1.1) p.y = -0.1;
      const parallaxX = (p.x - 0.5) + (mouseX - 0.5) * 0.05;
      const parallaxY = (p.y - 0.5) + (mouseY - 0.5) * 0.05;
      const x = parallaxX * width + width / 2;
      const y = parallaxY * height + height / 2;
      ctx.beginPath();
      ctx.arc(x, y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

window.addEventListener("load", heroCanvas);

// Ensure membership background video loops and plays slightly faster
function initMembershipVideo() {
  const video = document.querySelector('#membership .membership-bg video');
  if (!(video instanceof HTMLVideoElement)) return;
  video.loop = true;
  video.muted = true;
  video.playbackRate = 1.12;
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');
  video.setAttribute('muted', '');
  video.autoplay = true;
  video.playsInline = true;
  const tryPlay = () => {
    const p = video.play();
    if (p && typeof p.catch === 'function') p.catch(() => {});
  };
  if (video.readyState >= 2) {
    tryPlay();
  } else {
    video.addEventListener('canplay', tryPlay, { once: true });
    // iOS/Safari may still block; attach a one-time user-gesture fallback
    const resume = () => { tryPlay(); window.removeEventListener('touchend', resume); window.removeEventListener('click', resume); };
    window.addEventListener('touchend', resume, { once: true });
    window.addEventListener('click', resume, { once: true });
  }
}

// Ensure the inline membership card video loops and autoplays
function initMembershipCardVideo() {
  const video = document.querySelector('#membership .membership-media video');
  if (!(video instanceof HTMLVideoElement)) return;
  video.loop = true;
  video.muted = true;
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');
  video.setAttribute('muted', '');
  video.autoplay = true;
  video.playsInline = true;
  const tryPlay = () => {
    const p = video.play();
    if (p && typeof p.catch === 'function') p.catch(() => {});
  };
  if (video.readyState >= 2) {
    tryPlay();
  } else {
    video.addEventListener('canplay', tryPlay, { once: true });
    const resume = () => { tryPlay(); window.removeEventListener('touchend', resume); window.removeEventListener('click', resume); };
    window.addEventListener('touchend', resume, { once: true });
    window.addEventListener('click', resume, { once: true });
  }
}

// Structured data: JSON-LD (HairSalon)
function injectJsonLd() {
  // Avoid duplicates
  if (document.getElementById("jsonld-hairsalon")) return;
  const { salonInfo, contactInfo, specializations } = salonData;
  const phone = contactInfo.phoneNumbers?.[0];
  const json = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    url: salonInfo.website || undefined,
    name: `${salonInfo.name} / ${salonInfo.namePinyin}`,
    description: `${salonInfo.taglineTranslation}. ${salonInfo.ambiance}`,
    telephone: phone || undefined,
    areaServed: "Singapore",
    slogan: salonInfo.tagline,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${salonInfo.address || ""} ${salonInfo.unitNumber || ""}`.trim(),
      addressLocality: "Singapore",
      addressCountry: "SG",
    },
    brand: {
      "@type": "Brand",
      name: salonInfo.namePinyin,
    },
    knowsAbout: specializations.map((s) => s.name),
    sameAs: [],
  };

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = "jsonld-hairsalon";
  script.text = JSON.stringify(json);
  document.head.appendChild(script);
}

// Interactive behavior for hero progress line
function initHeroProgress() {
  const nodes = Array.from(document.querySelectorAll('#hero-progress .progress-node'));
  const fill = document.getElementById('hero-progress-fill');
  if (!nodes.length || !fill) return;
  // prevent multiple timers if re-initialized
  if (window.__heroProgressTimer) {
    clearTimeout(window.__heroProgressTimer);
    window.__heroProgressTimer = null;
  }
  function setActive(step) {
    nodes.forEach((n, i) => n.classList.toggle('active', i <= step));
    const pct = step / (nodes.length - 1);
    fill.style.width = `${Math.max(0, Math.min(1, pct)) * 100}%`;
  }
  let current = 0;
  setActive(current);
  nodes.forEach((n, i) => n.addEventListener('click', () => {
    current = i;
    setActive(current);
    if (window.__heroProgressTimer) {
      clearTimeout(window.__heroProgressTimer);
      window.__heroProgressTimer = null;
    }
    // resume auto-advance after short delay
    window.__heroProgressTimer = setTimeout(autoStep, 2200);
  }));

  // auto-advance from first to last node
  function autoStep() {
    if (current < nodes.length - 1) {
      current += 1;
      setActive(current);
      window.__heroProgressTimer = setTimeout(autoStep, 1800);
    } else {
      // loop back to start and continue
      window.__heroProgressTimer = setTimeout(() => {
        current = 0;
        setActive(current);
        window.__heroProgressTimer = setTimeout(autoStep, 1800);
      }, 1800);
    }
  }
  window.__heroProgressTimer = setTimeout(autoStep, 1200);
}

window.addEventListener('DOMContentLoaded', initHeroProgress);

// Typography animation for hero title/subtitle on load
function animateHeroTypography(){
  const title = document.getElementById('hero-title');
  const subtitle = document.getElementById('hero-subtitle');
  [title, subtitle].forEach((el, idx) => {
    if (!el) return;
    el.classList.add('typo');
    // stagger
    setTimeout(() => { el.classList.add('in'); }, idx === 0 ? 50 : 250);
  });
}


