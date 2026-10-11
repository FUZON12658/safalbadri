import type { Metadata } from 'next';
import JourneyPage from '@/components/pages/JourneyPage';

export const metadata: Metadata = {
  title: 'Journey',
  description: 'From Kavrepost Weekly in 2001 to Lahachhap.com and Best FM 88.1: more than two decades across print, radio and online media in Nepal.',
  alternates: { canonical: '/journey' },
  openGraph: { title: 'Journey — Badri Raj Timalsina', description: 'From Kavrepost Weekly in 2001 to Lahachhap.com and Best FM 88.1: more than two decades across print, radio and online media in Nepal.', url: '/journey', images: ['/images/badri/chairman-desk.jpg'] },
};

export default function Page() {
  return <JourneyPage />;
}
