import type { Metadata } from 'next';
import GalleryPage from '@/components/pages/GalleryPage';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Photos from the field: school handovers in Piskar, relief drives, Chiwang, Mike Restaurant & Bar and personal moments.',
  alternates: { canonical: '/gallery' },
  openGraph: { title: 'Gallery — Badri Raj Timalsina', description: 'Photos from the field: school handovers in Piskar, relief drives, Chiwang, Mike Restaurant & Bar and personal moments.', url: '/gallery', images: ['/images/praramva/welcome.jpg'] },
};

export default function Page() {
  return <GalleryPage />;
}
