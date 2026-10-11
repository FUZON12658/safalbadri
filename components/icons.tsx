type P = { size?: number };

const base = (size: number) => ({
  width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
  strokeWidth: 2, strokeLinecap: 'square' as const, 'aria-hidden': true,
});

export function ArrowRight({ size = 16 }: P) {
  return <svg {...base(size)}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>;
}

export function ArrowLeft({ size = 16 }: P) {
  return <svg {...base(size)}><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></svg>;
}

export function ArrowUpRight({ size = 16 }: P) {
  return <svg {...base(size)}><path d="M7 17 17 7" /><path d="M7 7h10v10" /></svg>;
}

export function Close({ size = 20 }: P) {
  return <svg {...base(size)}><path d="M6 6l12 12" /><path d="M18 6 6 18" /></svg>;
}
