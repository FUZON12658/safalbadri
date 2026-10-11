'use client';

import { useEffect, useState } from 'react';

/** Masonry column count: 1 below 640px, 2 below 1000px, otherwise 3. */
export function useColumns() {
  const [nc, setNc] = useState(3);
  useEffect(() => {
    const onResize = () => { const w = innerWidth; setNc(w < 640 ? 1 : w < 1000 ? 2 : 3); };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return nc;
}

/** Deal items into `nc` columns, left to right, so reading order stays row-wise. */
export function toColumns<T>(items: T[], nc: number) {
  return Array.from({ length: nc }, (_, c) => items.map((x, i) => ({ x, i })).filter(({ i }) => i % nc === c));
}

export const COL_OFFSETS = ['0px', '48px', '20px'];
