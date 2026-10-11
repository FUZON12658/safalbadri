export const SITE_URL = 'https://www.safalbadri.com';

export const CONTACT = {
  email: 'contact@safalbadri.com',
  phone: '+977 985-1085457',
  tel: '+9779851085457',
  vcf: '/badriraj-timalsina.vcf',
};

export const SOCIALS = [
  { label: 'X / Twitter', href: 'https://twitter.com/safalbadri' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/safalbadri' },
  { label: 'Instagram', href: 'https://instagram.com/safalbadri' },
];

export type PageKey = 'home' | 'about' | 'journey' | 'impact' | 'ventures' | 'press' | 'journal' | 'gallery' | 'contact';

export const PAGES: { key: PageKey; href: string; en: string; ne: string; metaEn: string; metaNe: string; descEn: string; descNe: string; img: string }[] = [
  { key: 'home', href: '/', en: 'Home', ne: 'गृहपृष्ठ', metaEn: 'Start here', metaNe: 'सुरुवात', descEn: 'Journalist, media entrepreneur and philanthropist from Kavre.', descNe: 'काभ्रेका पत्रकार, सञ्चार उद्यमी र परोपकारी।', img: 'badri/portrait-desk' },
  { key: 'about', href: '/about', en: 'About', ne: 'परिचय', metaEn: 'His story', metaNe: 'मेरो कथा', descEn: 'A farmer’s son who chose to build his life at home.', descNe: 'स्वदेशमै जीवन बनाउने निर्णय गरेका किसानका छोरा।', img: 'badri/chairman-desk' },
  { key: 'journey', href: '/journey', en: 'Journey', ne: 'यात्रा', metaEn: 'Since 2001', metaNe: '२००१ देखि', descEn: 'From Kavrepost Weekly to digital media.', descNe: 'काभ्रेपोस्ट साप्ताहिकदेखि डिजिटल मिडियासम्म।', img: 'badri/early-community' },
  { key: 'impact', href: '/impact', en: 'Impact', ne: 'प्रभाव', metaEn: 'Praramva', metaNe: 'प्रारम्भ', descEn: 'Rebuilding schools and carrying relief.', descNe: 'विद्यालय पुनर्निर्माण र राहत।', img: 'badri/with-students' },
  { key: 'ventures', href: '/ventures', en: 'Ventures', ne: 'उद्यम', metaEn: 'Media & more', metaNe: 'सञ्चार र थप', descEn: 'Work that keeps more than 100 people employed.', descNe: '१०० भन्दा बढी जनालाई रोजगारी दिने काम।', img: 'badri/portrait-teal' },
  { key: 'press', href: '/press', en: 'Press & honours', ne: 'प्रेस र सम्मान', metaEn: 'In the news', metaNe: 'समाचारमा', descEn: 'Coverage, letters and honours.', descNe: 'समाचार, पत्र र सम्मान।', img: 'badri/fnj-kavre' },
  { key: 'journal', href: '/journal', en: 'Journal', ne: 'लेखन', metaEn: 'Columns', metaNe: 'स्तम्भ', descEn: 'Notes on media, society and the economy.', descNe: 'मिडिया, समाज र अर्थतन्त्रबारे टिप्पणी।', img: 'badri/portrait-red-tie' },
  { key: 'gallery', href: '/gallery', en: 'Gallery', ne: 'तस्बिर', metaEn: 'Photos', metaNe: 'तस्बिर', descEn: 'In the field, portraits and travels.', descNe: 'मैदान, पोर्ट्रेट र यात्रा।', img: 'badri/statue-of-liberty' },
  { key: 'contact', href: '/contact', en: 'Contact', ne: 'सम्पर्क', metaEn: 'Write to me', metaNe: 'मलाई लेख्नुहोस्', descEn: 'Media, speaking and partnerships.', descNe: 'मिडिया, वक्तृता र साझेदारी।', img: 'badri/portrait-namaste' },
];

