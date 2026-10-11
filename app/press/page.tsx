import type { Metadata } from 'next';
import PressPage from '@/components/pages/PressPage';

export const metadata: Metadata = {
  title: 'Press & honours',
  description: 'Newspaper coverage, letters of appreciation and honours received by Badri Raj Timalsina for journalism and community service.',
  alternates: { canonical: '/press' },
  openGraph: { title: 'Press & honours — Badri Raj Timalsina', description: 'Newspaper coverage, letters of appreciation and honours received by Badri Raj Timalsina for journalism and community service.', url: '/press', images: ['/images/press/piskar-article.jpg'] },
};

export default function Page() {
  return <PressPage />;
}
