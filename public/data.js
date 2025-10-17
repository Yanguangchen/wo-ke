/* Salon data for Wò Kè (沃克). Bilingual fields included where relevant. */
export const salonData = {
  salonInfo: {
    name: "沃克",
    namePinyin: "沃克",
    unitNumber: "#01-3627",
    address: "164 Bukit Merah Central",
    tagline: "染发 . 烫发 . 接发 专业店",
    taglineTranslation: "Hair Coloring, Perming, Extensions Specialty Shop",
    ambiance:
      "The only salon you need",
    intro: "专业染发、烫发、接发与草本护理，让您的头发焕然一新。",
    introEn: "Expert coloring, perming, extensions and herbal care—crafted for your best hair.",
    introPoints: [
      { icon: "🌿", zh: "100% 草本染发，无氨无双氧水", en: "100% herbal color, ammonia & peroxide free" },
      { icon: "🧑‍🎓", zh: "资深发型师一对一服务", en: "Senior stylists with one‑to‑one service" },
      { icon: "🛡️", zh: "清真认证，敏感头皮友好", en: "Halal‑certified, scalp‑friendly" },
      { icon: "💬", zh: "中文/英文沟通无障碍", en: "Bilingual service (ZH/EN)" }
    ],
  },
  contactInfo: {
    primaryContact: "Alan",
    phoneNumbers: ["93469887", "83948518"],
  },
  specializations: [
    {
      name: "Herbal Treatments",
      nameChinese: "草本护理",
      description:
        "The salon prominently displays a wide variety of Chinese herbs used for hair and scalp treatments.",
      descriptionChinese: "店内陈列多种用于头皮与头发护理的中草药。",
    },
    {
      name: "Natural Hair Colouring",
      nameChinese: "自然草本染发",
      description:
        "Offers a 'Natural Treatment Formula Herbaceous Hair Colour' which is advertised as 100% Pure Herbal Extracts, No Hydrogen Peroxide, No Ammonia, and Halal Certified.",
      descriptionChinese: "提供“自然治疗配方草本染发”：100% 纯草本提取物、无双氧水、无氨、清真认证。",
    },
  ],
  services: {
    haircutDesign: {
      title: "Haircut Design",
      titleChinese: "剪发设计",
      items: [
        { name: "Haircut", nameChinese: "剪发", price: 10, originalPrice: 15 },
        {
          name: "Wash, Cut & Style",
          nameChinese: "洗剪造型",
          price: 20,
          originalPrice: 25,
        },
        {
          name: "Precision Cut & Design",
          nameChinese: "精剪设计",
          price: 28,
          originalPrice: 38,
        },
      ],
    },
    hairColour: {
      title: "Hair Colour",
      titleChinese: "染发系列",
      items: [
        {
          name: "Healthy Hair Colouring",
          nameChinese: "健康染发",
          price: { short: 128, long: 158 },
        },
        {
          name: "Damaged Hair Colouring",
          nameChinese: "受损发质",
          price: { short: 168, long: 188 },
        },
        {
          name: "Premium Texture Colouring",
          nameChinese: "高级质感染",
          price: { short: 198, long: 238 },
        },
      ],
    },
    hairPerm: {
      title: "Hair Perm",
      titleChinese: "女士烫发",
      items: [
        {
          name: "Healthy Perm",
          nameChinese: "健康烫感",
          price: { short: 128, long: 168 },
        },
        {
          name: "Damaged Hair Perm",
          nameChinese: "受损发质",
          price: { short: 168, long: 198 },
        },
        {
          name: "Treatment Perm",
          nameChinese: "护理型烫发",
          price: { short: 198, long: 238 },
        },
      ],
    },
    proteinCorrection: {
      title: "Protein Correction",
      titleChinese: "蛋白矫正",
      items: [
        {
          name: "Healthy Texture",
          nameChinese: "健康质感",
          price: { short: 198, long: 268 },
        },
        {
          name: "Damaged Hair",
          nameChinese: "受损发质",
          price: { short: 268, long: 328 },
        },
      ],
    },
    scalpSeries: {
      title: "Scalp Series",
      titleChinese: "头皮系列",
      items: [
        { name: "Scalp Cleansing", nameChinese: "头皮清洁", price: [38, 88] },
        {
          name: "Scalp Anti-Allergy/Soothing",
          nameChinese: "头皮抗敏",
          price: [68, 98, 168],
        },
        {
          name: "Chinese Herbal Medicine Hair Wash",
          nameChinese: "中草药洗发",
          price: 39,
        },
      ],
    },
    hairCare: {
      title: "Hair Care",
      titleChinese: "头发护理",
      items: [
        { name: "Intense Hydration Treatment", nameChinese: "美队补水", price: 86 },
        { name: "Structure Repair", nameChinese: "结构修复", price: 128 },
        { name: "Ultimate Structure Care", nameChinese: "极致结构护理", price: 198 },
      ],
    },
    hairExtensions: {
      title: "Hair Extensions",
      titleChinese: "接发系列",
      items: [
        { name: "Special Price", nameChinese: "特价", price: 398 },
        { name: "Feather Hair Extensions", nameChinese: "羽毛接发", price: 580 },
      ],
    },
  },
  membershipProgram: {
    title: "Membership Card",
    titleChinese: "会员卡",
    description: "The salon offers a membership card with no annual fee.",
    tiers: [
      { topUp: 500, bonus: 80 },
      { topUp: 1000, bonus: 200 },
      { topUp: 2000, bonus: 500 },
    ],
  },
  media: [
    // Example items; replace src with your files (place under assets/)
    { type: "image", src: "assets/1.jpg", alt: "store front" },
    { type: "image", src: "assets/2.jpg", alt: "store interior" },
    { type: "image", src: "assets/3.jpg", alt: "products" },
    { type: "image", src: "assets/4.jpg", alt: "products" },
  ],
};


