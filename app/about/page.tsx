import type { Metadata } from 'next';
import AboutPage from '@/components/pages/AboutPage';

export const metadata: Metadata = {
  title: 'About',
  description: 'A farmer’s son from Kavre who chose to build his career in Nepal: journalist, media entrepreneur and philanthropist Badri Raj Timalsina.',
  alternates: { canonical: '/about' },
  openGraph: { title: 'About — Badri Raj Timalsina', description: 'A farmer’s son from Kavre who chose to build his career in Nepal: journalist, media entrepreneur and philanthropist Badri Raj Timalsina.', url: '/about', images: ['/images/badri/portrait-desk.jpg'] },
};

export default function Page() {
  return <AboutPage />;
}
