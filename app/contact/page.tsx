import type { Metadata } from 'next';
import ContactPage from '@/components/pages/ContactPage';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Media requests, speaking invitations, partnerships or social initiatives: get in touch with Badri Raj Timalsina.',
  alternates: { canonical: '/contact' },
  openGraph: { title: 'Contact — Badri Raj Timalsina', description: 'Media requests, speaking invitations, partnerships or social initiatives: get in touch with Badri Raj Timalsina.', url: '/contact', images: ['/images/badri/portrait-namaste.jpg'] },
};

export default function Page() {
  return <ContactPage />;
}
