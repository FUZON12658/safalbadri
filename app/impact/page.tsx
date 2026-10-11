import type { Metadata } from 'next';
import ImpactPage from '@/components/pages/ImpactPage';

export const metadata: Metadata = {
  title: 'Impact',
  description: 'Rebuilding Mangala Mai Secondary School in Piskar, the Chiwang community building and disaster relief through Praramva and the Singapore Red Cross Society.',
  alternates: { canonical: '/impact' },
  openGraph: { title: 'Impact — Badri Raj Timalsina', description: 'Rebuilding Mangala Mai Secondary School in Piskar, the Chiwang community building and disaster relief through Praramva and the Singapore Red Cross Society.', url: '/impact', images: ['/images/praramva/relief-valley.jpg'] },
};

export default function Page() {
  return <ImpactPage />;
}
