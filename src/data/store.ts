import type { Lang } from '../i18n/translations'

export const store = {
  name: 'Collingdale Smoke Shop',
  tagline: 'Premium products. Local service. A better store experience.',
  address: '640 MacDade Blvd, Collingdale, PA 19023, USA',
  phone: '+1 484-494-7706',
  phoneHref: 'tel:+14844947706',
  // WhatsApp number in international format (digits only). Update the country code if needed.
  whatsapp: '778172806',
  mapsUrl: 'https://maps.app.goo.gl/1MKtibRLH82WFHwS9',
  hours: [
    ['8:00 AM – 12:00 AM', '٨:٠٠ ص – ١٢:٠٠ ص'],
    ['8:00 AM – 12:00 AM', '٨:٠٠ ص – ١٢:٠٠ ص'],
    ['8:00 AM – 12:00 AM', '٨:٠٠ ص – ١٢:٠٠ ص'],
    ['8:00 AM – 12:00 AM', '٨:٠٠ ص – ١٢:٠٠ ص'],
    ['8:00 AM – 12:00 AM', '٨:٠٠ ص – ١٢:٠٠ ص'],
    ['8:00 AM – 12:00 AM', '٨:٠٠ ص – ١٢:٠٠ ص'],
    ['10:00 AM – 11:00 PM', '١٠:٠٠ ص – ١١:٠٠ م'],
  ],
}

export function storeHours(lang: Lang) {
  return store.hours.map((h) => h[lang === 'ar' ? 1 : 0])
}

export function whatsappUrl(message?: string) {
  const text =
    message ??
    `Hi ${store.name}! I saw your website and would like to ask about a product.`
  return `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(text)}`
}

export type Category = {
  id: string
  title: string
  titleAr: string
  eyebrow: string
  description: string
  descriptionAr: string
  icon: string
}

export const categories: Category[] = [
  { id: 'tobacco', title: 'Tobacco & Cigars', titleAr: 'التبغ والسيجار', eyebrow: '01', description: 'Hand-selected premium and aged cigars, loose tobacco and humidors.', descriptionAr: 'سيجار فاخر ومعتّق مختار بعناية، تبغ سائب وعلب حفظ.', icon: 'Cigar' },
  { id: 'vape', title: 'Vape & E-Liquids', titleAr: 'الفيب والسوائل', eyebrow: '02', description: 'Rechargeable devices, disposable vapes and a full wall of e-liquids.', descriptionAr: 'أجهزة قابلة لإعادة الشحن، فيب أحادي الاستخدام وجدار كامل من السوائل.', icon: 'Vape' },
  { id: 'glass', title: 'Glass & Accessories', titleAr: 'الزجاج والإكسسوارات', eyebrow: '03', description: 'Hand-blown glass pieces, grinders, trays and everyday accessories.', descriptionAr: 'قطع زجاجية مصنوعة يدوياً، مطاحن، صوانٍ وإكسسوارات يومية.', icon: 'Glass' },
  { id: 'hookah', title: 'Hookah & Shisha', titleAr: 'المعسّل والشيشة', eyebrow: '04', description: 'Complete hookah sets, bowls, coals and top-selling shisha flavors.', descriptionAr: 'أطقم شيشة كاملة، رؤوس، فحم وأشهر نكهات المعسّل مبيعاً.', icon: 'Hookah' },
  { id: 'wireless', title: 'Wireless Accessories', titleAr: 'الإكسسوارات اللاسلكية', eyebrow: '05', description: 'Earbuds, chargers, power banks and phone accessories in-store.', descriptionAr: 'سماعات، شواحن، بطاقات محمولة وإكسسوارات الهاتف في المتجر.', icon: 'Phone' },
]

export function categoryName(id: string, lang: Lang) {
  const c = categories.find((x) => x.id === id)
  if (!c) return ''
  return lang === 'ar' ? c.titleAr : c.title
}

export type ProductStatus = 'draft' | 'confirmed' | 'hidden'
export type Product = {
  id: string
  name: string
  nameAr: string
  category: string
  description: string
  descriptionAr: string
  imageUrl?: string
  price?: number
  status: ProductStatus
  featured?: boolean
}

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Aged Dominican Cigar Trio',
    nameAr: 'طقم سيجار دومينيكاني معتّق',
    category: 'tobacco',
    description: 'A curated three-pack of aged Dominican cigars with smooth cedar notes, presented in a keepsake cedar humidor.',
    descriptionAr: 'طقم من ثلاثة سيجارات دومينيكية معتّقة بنكهات خشب الأرز الناعمة، مقدم في علبة حفظ من خشب الأرز.',
    imageUrl: '/products/cigar-trio.png',
    price: 18.99,
    status: 'confirmed',
    featured: true,
  },
  {
    id: 'p2',
    name: 'Premium Maduro Cigar',
    nameAr: 'سيجار مادورو فاخر',
    category: 'tobacco',
    description: 'Single full-flavored maduro cigar with a dark chocolate wrapper and a hand-finished gold band.',
    descriptionAr: 'سيجار مادورو واحد غني بالنكهة بغلاف داكن شوكولاتي وشريط ذهبي مصنوع يدوياً.',
    imageUrl: '/products/maduro-cigar.png',
    price: 9.5,
    status: 'confirmed',
  },
  {
    id: 'p3',
    name: 'Rechargeable Vape Device',
    nameAr: 'جهاز فيب قابل لإعادة الشحن',
    category: 'vape',
    description: 'Sleek rechargeable pod system with adjustable airflow and long-lasting battery in a matte black and gold finish.',
    descriptionAr: 'نظام بود أنيق قابل لإعادة الشحن مع تدفق هواء قابل للتعديل وبطارية تدوم طويلاً بلون أسود وذهبي.',
    imageUrl: '/store/vape-ijoy.jpg',
    price: 24.99,
    status: 'confirmed',
    featured: true,
  },
  {
    id: 'p4',
    name: 'E-Liquid Variety Pack',
    nameAr: 'طقم سوائل فيب متنوع',
    category: 'vape',
    description: 'Four premium e-liquid bottles in best-selling flavors, available in multiple nicotine strengths.',
    descriptionAr: 'أربع زجاجات سوائل فيب فاخرة بأشهر النكهات مبيعاً، متوفرة بعدة تركيزات نيكوتين.',
    imageUrl: '/products/eliquid-pack.png',
    price: 15.0,
    status: 'confirmed',
  },
  {
    id: 'p5',
    name: 'Hand-Blown Glass Water Pipe',
    nameAr: 'بايب زجاجي مائي منفوخ يدوياً',
    category: 'glass',
    description: 'Premium borosilicate glass water pipe with an intricate percolator and elegant gold detailing.',
    descriptionAr: 'بايب مائي زجاجي فاخر من البورسليكات مع بيركوليتر دقيق وتفاصيل ذهبية أنيقة.',
    imageUrl: '/products/glass-pipe.png',
    price: 45.0,
    status: 'confirmed',
    featured: true,
  },
  {
    id: 'p6',
    name: 'Precision Grinder Set',
    nameAr: 'طقم مطحنة دقيق',
    category: 'glass',
    description: 'Four-piece aerospace-grade metal grinder with razor-sharp teeth and a matte black and gold finish.',
    descriptionAr: 'مطحنة معدنية من أربع قطع بجودة الطيران بأسنان حادة ولون أسود وذهبي غير لامع.',
    imageUrl: '/products/grinder-set.png',
    price: 19.99,
    status: 'confirmed',
  },
  {
    id: 'p7',
    name: 'Traditional Hookah Set',
    nameAr: 'طقم شيشة تقليدي',
    category: 'hookah',
    description: 'Complete hookah set with a hand-crafted glass base, brass stem, two hoses and all essential accessories.',
    descriptionAr: 'طقم شيشة كامل مع قاعدة زجاجية مصنوعة يدوياً وعمود نحاسي وخرطومين وجميع الملحقات الأساسية.',
    imageUrl: '/store/hookah-wall.jpg',
    price: 89.99,
    status: 'confirmed',
    featured: true,
  },
  {
    id: 'p8',
    name: 'Shisha Flavor Sampler',
    nameAr: 'تشكيلة نكهات معسّل',
    category: 'hookah',
    description: 'Assorted premium shisha flavors including mint, grape and apple — perfect for trying something new.',
    descriptionAr: 'نكهات معسّل فاخرة متنوعة تشمل النعناع والعنب والتفاح — مثالية لتجربة شيء جديد.',
    imageUrl: '/products/shisha-sampler.png',
    price: 22.0,
    status: 'confirmed',
  },
  {
    id: 'p9',
    name: 'Wireless Earbuds Pro',
    nameAr: 'سماعات لاسلكية برو',
    category: 'wireless',
    description: 'True wireless earbuds with a fast-charging case, clear call quality and all-day comfort.',
    descriptionAr: 'سماعات لاسلكية حقيقية مع علبة شحن سريع وجودة مكالمات واضحة وراحة طوال اليوم.',
    imageUrl: '/products/earbuds.png',
    price: 39.99,
    status: 'confirmed',
    featured: true,
  },
  {
    id: 'p10',
    name: 'Fast-Charge Power Bank',
    nameAr: 'بطارية محمولة للشحن السريع',
    category: 'wireless',
    description: 'Slim high-capacity power bank with dual USB ports and an LED charge display for on-the-go power.',
    descriptionAr: 'بطارية محمولة نحيفة بسعة عالية مع منفذي USB وشاشة LED لعرض حالة الشحن.',
    imageUrl: '/products/power-bank.png',
    price: 29.99,
    status: 'confirmed',
  },
  {
    id: 'p11',
    name: 'Cigar Cutter & Lighter Set',
    nameAr: 'طقم قطاعة سيجار وولاعة',
    category: 'tobacco',
    description: 'A refined gift set pairing a double-glide cigar cutter with a jet-flame torch lighter in brushed gold and black.',
    descriptionAr: 'طقم هدايا راقٍ يجمع قطاعة سيجار مزدوجة مع ولاعة نفثية باللون الذهبي والأسود.',
    imageUrl: '/products/cigar-cutter-set.png',
    price: 34.99,
    status: 'confirmed',
  },
  {
    id: 'p12',
    name: 'Premium Pipe Tobacco Tin',
    nameAr: 'علبة تبغ غليون فاخرة',
    category: 'tobacco',
    description: 'Aromatic pipe tobacco in a vintage collector tin — a smooth, slow-burning blend for the true enthusiast.',
    descriptionAr: 'تبغ غليون عطري في علبة معدنية كلاسيكية — خلطة ناعمة بطيئة الاحتراق لعشاق التبغ.',
    imageUrl: '/products/pipe-tobacco-tin.png',
    price: 12.75,
    status: 'confirmed',
  },
  {
    id: 'p13',
    name: 'Disposable Vape Pen',
    nameAr: 'قلم فيب أحادي الاستخدام',
    category: 'vape',
    description: 'Ready-to-use disposable vape with a glossy metallic finish, rich flavor and long-lasting puff count.',
    descriptionAr: 'فيب جاهز للاستخدام بلمعة معدنية أنيقة ونكهة غنية وعدد نفثات يدوم طويلاً.',
    imageUrl: '/store/vape-crownbar.jpg',
    price: 16.99,
    status: 'confirmed',
    featured: true,
  },
  {
    id: 'p14',
    name: 'Pod & Coil Replacement Kit',
    nameAr: 'طقم بود وكويل بديل',
    category: 'vape',
    description: 'Genuine replacement pods and coils to keep your device performing like new, available for popular systems.',
    descriptionAr: 'بودات وكويلات أصلية بديلة للحفاظ على أداء جهازك كالجدد، متوفرة للأنظمة الشائعة.',
    imageUrl: '/products/vape-pod-kit.png',
    price: 13.5,
    status: 'confirmed',
  },
  {
    id: 'p15',
    name: 'Glass Dab Rig Set',
    nameAr: 'طقم زجاجي (داب ريغ)',
    category: 'glass',
    description: 'Compact hand-blown dab rig with a quartz banger and colorful gold accents for a clean, smooth experience.',
    descriptionAr: 'داب ريغ زجاجي مضغوط مصنوع يدوياً مع بونغر كوارتز وتفاصيل ذهبية ملونة لتجربة نقية وناعمة.',
    imageUrl: '/products/glass-dab-rig.png',
    price: 59.99,
    status: 'confirmed',
  },
  {
    id: 'p16',
    name: 'Rolling Tray & Accessory Kit',
    nameAr: 'طقم صينية وإكسسوارات',
    category: 'glass',
    description: 'A complete accessory kit with a metal rolling tray, jar and tools in a matching matte black and gold finish.',
    descriptionAr: 'طقم إكسسوارات كامل مع صينية معدنية وبرطمان وأدوات بلون أسود وذهبي متناسق.',
    imageUrl: '/products/rolling-tray-kit.png',
    price: 27.5,
    status: 'confirmed',
  },
  {
    id: 'p17',
    name: 'Premium Hookah Charcoal',
    nameAr: 'فحم شيشة فاخر',
    category: 'hookah',
    description: 'Long-burning natural coconut charcoal cubes for a clean, even heat and consistent shisha sessions.',
    descriptionAr: 'مكعبات فحم جوز الهند الطبيعي طويل الاحتراق لحرارة نظيفة ومتساوية وجلسات معسّل ثابتة.',
    imageUrl: '/products/hookah-charcoal.png',
    price: 8.99,
    status: 'confirmed',
  },
  {
    id: 'p18',
    name: 'Clay Hookah Bowl',
    nameAr: 'رأس شيشة فخاري',
    category: 'hookah',
    description: 'Hand-finished clay hookah bowl with elegant gold glaze for superior heat retention and flavor.',
    descriptionAr: 'رأس شيشة فخاري مصنوع يدوياً بطلاء ذهبي أنيق لاحتفاظ فائق بالحرارة ونكهة أفضل.',
    imageUrl: '/products/hookah-bowl.png',
    price: 14.99,
    status: 'confirmed',
  },
  {
    id: 'p19',
    name: 'USB-C Fast Charge Cable',
    nameAr: 'كابل شحن سريع USB-C',
    category: 'wireless',
    description: 'Durable braided USB-C cable with gold connectors, engineered for rapid charging and fast data transfer.',
    descriptionAr: 'كابل USB-C مضفر ومتين بموصلات ذهبية، مصمم للشحن السريع ونقل البيانات بسرعة.',
    imageUrl: '/products/usb-c-cable.png',
    price: 11.99,
    status: 'confirmed',
  },
  {
    id: 'p20',
    name: 'Mini Bluetooth Speaker',
    nameAr: 'مكبر صوت بلوتوث صغير',
    category: 'wireless',
    description: 'Pocket-sized wireless speaker with a metallic grille, ambient LED ring and surprisingly big, clear sound.',
    descriptionAr: 'مكبر صوت لاسلكي بحجم الجيب مع شبكة معدنية وحلقة LED محيطة وصوت كبير وواضح بشكل مدهش.',
    imageUrl: '/products/bluetooth-speaker.png',
    price: 34.99,
    status: 'confirmed',
  },
]

export const featuredProducts = products.filter((p) => p.featured)

export type GalleryImage = { src: string; label: string; labelAr: string; span?: boolean }

export const galleryImages: GalleryImage[] = [
  { src: '/store/exterior-wide.jpg', label: 'Our storefront', labelAr: 'واجهة متجرنا', span: true },
  { src: '/store/interior-vape-wall.jpg', label: 'Inside the shop', labelAr: 'داخل المتجر' },
  { src: '/store/hookah-wall.jpg', label: 'The hookah wall', labelAr: 'جدار الشيشة' },
  { src: '/store/vape-ijoy.jpg', label: 'Featured vape', labelAr: 'فيب مميز' },
  { src: '/store/exterior-sunny.jpg', label: 'Corner location', labelAr: 'موقع الزاوية', span: true },
  { src: '/store/hookah-hookalit.jpg', label: 'New arrivals', labelAr: 'وصل حديثاً' },
]
