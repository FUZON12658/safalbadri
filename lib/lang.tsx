'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

export type Lang = 'en' | 'ne';

const KEY = 'brt-lang';
const DIGITS = '०१२३४५६७८९';

type LangCtx = { lang: Lang; setLang: (l: Lang) => void };

const Ctx = createContext<LangCtx>({ lang: 'en', setLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    let saved: string | null = null;
    try { saved = localStorage.getItem(KEY); } catch {}
    if (saved === 'ne') setLangState('ne');
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === 'ne' ? 'ne' : 'en';
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(KEY, l); } catch {}
  }, []);

  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
}

export function useLang() {
  return useContext(Ctx);
}

/** Pick the current language's copy from a `{ en, ne }` dictionary. */
export function useT<T>(dict: { en: T; ne: T }): T {
  return dict[useLang().lang];
}

/** Western digits → Devanagari digits. */
export function dev(s: string | number) {
  return String(s).replace(/\d/g, (d) => DIGITS[+d]);
}

/** Zero-padded index, localised: 1 → "01" / "०१". */
export function pad(n: number, lang: Lang) {
  const s = String(n).padStart(2, '0');
  return lang === 'ne' ? dev(s) : s;
}

export function num(n: number | string, lang: Lang) {
  return lang === 'ne' ? dev(n) : String(n);
}
