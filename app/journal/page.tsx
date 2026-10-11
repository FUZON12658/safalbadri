import type { Metadata } from 'next';
import JournalPage from '@/components/pages/JournalPage';

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Notes and columns on media, society and the economy, and a podcast connecting Nepalis at home and abroad.',
  alternates: { canonical: '/journal' },
  openGraph: { title: 'Journal — Badri Raj Timalsina', description: 'Notes and columns on media, society and the economy, and a podcast connecting Nepalis at home and abroad.', url: '/journal', images: ['/images/badri/studio.jpg'] },
};

export default function Page() {
  return <JournalPage />;
}
