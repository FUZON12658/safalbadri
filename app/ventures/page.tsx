import type { Metadata } from 'next';
import VenturesPage from '@/components/pages/VenturesPage';

export const metadata: Metadata = {
  title: 'Ventures',
  description: 'Lahachhap.com, Best FM 88.1, Praramva, Mike Restaurant & Bar and Guru Uniform Industry: ventures that give more than 100 people steady work in Nepal.',
  alternates: { canonical: '/ventures' },
  openGraph: { title: 'Ventures — Badri Raj Timalsina', description: 'Lahachhap.com, Best FM 88.1, Praramva, Mike Restaurant & Bar and Guru Uniform Industry: ventures that give more than 100 people steady work in Nepal.', url: '/ventures', images: ['/images/mike/terrace-drinks.jpg'] },
};

export default function Page() {
  return <VenturesPage />;
}
