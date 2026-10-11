/**
 * Local photo path. Every photo in public/images exists in two sizes
 * (see scripts/build_images.py): full (≤1920px) and `md` (≤960px).
 */
export function img(name: string, size: 'full' | 'md' = 'full') {
  return `/images/${name}${size === 'md' ? '-md' : ''}.jpg`;
}
