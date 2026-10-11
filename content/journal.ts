/**
 * Published columns. Add one object per column and it appears on /journal,
 * newest first, with the theme filter switched on automatically.
 *
 * {
 *   date: '2026-09-14',
 *   theme: 'media',              // 'media' | 'society' | 'economy'
 *   lang: 'ne',                  // language the column is written in
 *   title: 'स्थानीय मिडियाको भविष्य',
 *   standfirst: 'One or two sentences on what the column argues.',
 *   href: 'https://www.lahachhap.com/…',
 *   image: 'badri/portrait-red-tie', // optional, a name from public/images
 * }
 */
export type Column = {
  date: string;
  theme: 'media' | 'society' | 'economy';
  lang: 'en' | 'ne';
  title: string;
  standfirst: string;
  href: string;
  image?: string;
};

export const COLUMNS: Column[] = [];
