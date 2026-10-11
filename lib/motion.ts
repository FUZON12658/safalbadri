/**
 * Shared scroll engine for every page. Elements opt in with data-* hooks;
 * one rAF loop reads all rects first, then writes.
 *
 * Hooks: data-header, data-progress, data-hero*, data-manifesto/data-w,
 * data-count, data-chapter/data-story-*, data-chapter-big, data-panel,
 * data-journey/*, data-wipe, data-grow, data-drift, data-parallax (+data-pdesk),
 * data-line, data-marquee, data-reveal, data-onair, data-preview.
 */
import type { Lang } from './lang';

// Elements carry a few cached values between frames.
type El = HTMLElement & { _c?: string; _t0?: number; _v?: HTMLElement | null; _img?: HTMLElement | null; _half?: number };

export type Motion = {
  refresh(): void;
  onMove(e: { clientX: number; clientY: number }): void;
  onLeave(): void;
  showPreview(src: string | null): void;
  destroy(): void;
};

const DIG = '०१२३४५६७८९';

export function createMotion(root: HTMLElement, opts: { lang: () => Lang }): Motion {
  const S = {
    E: null as null | ReturnType<typeof query>,
    raf: 0,
    rq: 0,
    m: { x: 0, y: 0, cx: 0, cy: 0, init: false },
    act: -1,
    jact: -1,
    reveal: null as null | { x0: number; y0: number; s0: number; cl: number; cr: number },
    safe: null as null | { left: number; top: number; width: number },
    jdist: 0,
  };
  const isNe = () => opts.lang() === 'ne';
  const dev = (s: string) => s.replace(/\d/g, (d) => DIG[+d]);
  const pad = (n: number) => { const s = String(n).padStart(2, '0'); return isNe() ? dev(s) : s; };
  const fmt = (el: El, v: number) => { let s = String(Math.round(v)); if (isNe()) s = dev(s); return (el.dataset.pre || '') + s + (el.dataset.suf || ''); };
  const reduce = () => !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const q = (s: string) => Array.from(root.querySelectorAll<El>(s));
  const q1 = (s: string) => root.querySelector<El>(s);

  function query() {
    return {
      header: q1('[data-header]'), progress: q1('[data-progress]'),
      hero: q1('[data-hero]'), heroSlot: q1('[data-hero-slot]'), heroReveal: q1('[data-hero-reveal]'), heroScrim: q1('[data-hero-scrim]'), heroPanel: q1('[data-hero-panel]'), heroIntro: q1('[data-hero-intro]'), cue: q1('[data-cue]'),
      manifesto: q1('[data-manifesto]'), words: q('[data-w]'), counters: q('[data-count]'),
      chapters: q('[data-chapter]'), storyImgs: q('[data-story-img]'), storyCap: q1('[data-story-cap]'), storyIdx: q1('[data-story-idx]'), big: q1('[data-chapter-big]'),
      panels: q('[data-panel]'),
      journey: q1('[data-journey]'), jsticky: q1('[data-journey-sticky]'), track: q1('[data-track]'), jbar: q1('[data-jbar]'), stations: q('[data-station]'), jyear: q1('[data-jyear]'), jmeta: q1('[data-jmeta]'), jticks: q('[data-jtick]'), jmarker: q1('[data-jmarker]'),
      wipe: q('[data-wipe]'), grow: q('[data-grow]'), drift: q('[data-drift]'), parallax: q('[data-parallax]'), marquee: q('[data-marquee]'),
      reveal: q('[data-reveal]'), lines: q('[data-line]'), onair: q1('[data-onair]'),
      preview: q1('[data-preview]'), previewImg: q1('[data-preview-img]'),
    };
  }

  function collect() {
    if (!root.isConnected) return;
    const E = (S.E = query());
    const vh = innerHeight, red = reduce();
    const fresh = E.reveal.filter((el) => !el.dataset.rv);
    const tops = fresh.map((el) => el.getBoundingClientRect().top);
    fresh.forEach((el, i) => {
      el.dataset.rv = '1';
      if (red || tops[i] < vh * 0.9) { el.dataset.shown = '1'; return; }
      el.style.opacity = '0';
      el.style.transform = 'translateY(56px)';
    });
    E.counters.forEach((el) => {
      if (el.dataset.cv) return;
      el.dataset.cv = '1';
      if (red) { el.dataset.done = '1'; el.textContent = fmt(el, +el.dataset.count!); }
      else el.textContent = fmt(el, +(el.dataset.from || 0));
    });
  }

  function refreshCounters() {
    S.E?.counters.forEach((el) => {
      if (el.dataset.done) el.textContent = fmt(el, +el.dataset.count!);
      else if (!el._t0) el.textContent = fmt(el, +(el.dataset.from || 0));
    });
  }

  function layout() {
    const E = S.E; if (!E) return;
    const vh = innerHeight;
    if (E.header) root.style.setProperty('--hh', E.header.offsetHeight + 'px');
    // Hero: the photo's layer is laid out at its final box (full width, the photo's own 16:9 shape) and
    // starts scaled down onto the slot. Scaling is uniform and the shape never changes, so the whole
    // photo is visible at every point.
    S.reveal = null;
    if (E.hero) E.hero.classList.remove('is-live');
    if (E.heroSlot && E.heroReveal && E.hero && innerWidth >= 740) {
      const st = (E.hero.firstElementChild as HTMLElement).getBoundingClientRect(), r = E.heroSlot.getBoundingClientRect();
      const hh = E.header ? E.header.offsetHeight : 66;
      // Final box: full width; centred vertically, or pinned to the top on screens wider than 16:9.
      const sc = st.width / 1672, th = 941 * sc, ty = th >= st.height ? 0 : (st.height - th) / 2;
      E.heroReveal.style.top = ty + 'px';
      // Start = the slot's 4:3 cover crop: the photo scaled to the slot's height, with its sides clipped
      // to the slot's width around the same 51% focal point as the slot image.
      const s0 = r.height / th, ww = r.width / s0, wl = (st.width - ww) * 0.51;
      S.reveal = { x0: r.left - st.left - wl * s0, y0: r.top - st.top - ty, s0, cl: wl, cr: st.width - wl - ww };
      E.hero.classList.add('is-live');
      // The quote sits in the bottom-left corner of the full-width photo, in the open background left of
      // his body (his blazer starts at x≈450 of 1672 photo pixels), so it never covers him.
      const bodyLeft = 440 * sc;
      const gut = parseFloat(getComputedStyle(E.heroSlot.parentElement as HTMLElement).paddingLeft) || 32;
      if (E.heroPanel) {
        const width = Math.max(200, Math.min(520, bodyLeft - gut - 28));
        E.heroPanel.style.width = width + 'px';
        E.heroPanel.style.setProperty('--quote-size', Math.max(17, Math.min(30, width / 13)).toFixed(1) + 'px');
        const ph = E.heroPanel.offsetHeight;
        const bottom = Math.min(st.height, ty + th) - Math.min(48, Math.max(20, st.height * 0.05));
        S.safe = { left: gut, width, top: Math.max(hh + 24, bottom - ph) };
        E.heroPanel.style.left = gut + 'px';
        E.heroPanel.style.top = S.safe.top + 'px';
      }
    }
    if (E.journey && E.track && E.jsticky) {
      S.jdist = Math.max(0, E.track.offsetWidth - E.jsticky.clientWidth);
      const hh = Math.round(S.jdist + vh * 1.25) + 'px';
      if (E.journey.style.height !== hh) E.journey.style.height = hh;
    }
    E.marquee.forEach((el) => { el._half = el.scrollWidth / 2; });
  }

  function intro() {
    if (reduce()) return;
    const lines = q('[data-hero-line]'), fades = q('[data-hero-fade]');
    lines.forEach((l) => { l.style.transition = 'none'; l.style.transform = 'translateY(108%)'; });
    fades.forEach((el) => { el.style.transition = 'none'; el.style.opacity = '0'; });
    void root.offsetHeight;
    setTimeout(() => {
      lines.forEach((l, i) => { l.style.transition = 'transform 1.2s cubic-bezier(.16,1,.3,1) ' + (0.1 + i * 0.1) + 's'; l.style.transform = 'translateY(0)'; });
      fades.forEach((el, i) => { el.style.transition = 'opacity .9s ease ' + (0.45 + i * 0.12) + 's'; el.style.opacity = '1'; });
    }, 40);
    setTimeout(() => { lines.forEach((l) => { l.style.transform = 'none'; }); fades.forEach((el) => { el.style.opacity = '1'; }); }, 2600);
  }

  function tick(t: number) {
    const E = S.E; if (!E || !root.isConnected) return;
    const vh = innerHeight, vw = innerWidth, sy = scrollY, red = reduce();
    const cl = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
    const ease = (x: number) => 1 - Math.pow(1 - x, 3);
    const io = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
    const R = (el: Element) => el.getBoundingClientRect();
    const vis = (r: DOMRect, m: number) => r.bottom > -m && r.top < vh + m;

    // read phase
    const maxS = document.documentElement.scrollHeight - vh;
    const heroR = E.hero ? R(E.hero) : null;
    const manR = E.manifesto ? R(E.manifesto) : null;
    const cntT = E.counters.map((el) => (el.dataset.done || el._t0 ? null : R(el).top));
    const chT = E.chapters.map((c) => R(c).top);
    const panR = E.panels.map(R);
    const jR = E.journey ? R(E.journey) : null;
    const wipeR = E.wipe.map(R), growR = E.grow.map(R);
    const drR = E.drift.map((el) => R(el.parentElement!));
    const pxR = E.parallax.map((el) => R(el.parentElement!));
    const lnR = E.lines.map((el) => R(el.parentElement!));
    const rvT = E.reveal.map((el) => (el.dataset.shown ? null : R(el).top));

    // write phase
    if (E.progress) E.progress.style.transform = 'scaleX(' + (maxS > 0 ? cl(sy / maxS) : 0).toFixed(4) + ')';

    // Hero: text fades, the photo grows from its frame to cover the screen (cropping only the
    // bottom/sides, the focal point keeps the head in view), then the quote panel rises bottom-left.
    if (heroR && vw >= 740 && vis(heroR, 0)) {
      const p = cl(-heroR.top / Math.max(1, heroR.height - vh));
      const rv = S.reveal;
      const e = red ? (p > 0.3 ? 1 : 0) : io(cl((p - 0.02) / 0.4));
      const out = red ? (p > 0.3 ? 1 : 0) : ease(cl(p / 0.2));
      const pe = red ? (p > 0.3 ? 1 : 0) : ease(cl((p - 0.46) / 0.2));
      // While the photo reaches the top of the screen, the header bar goes transparent so it hides none of it.
      if (E.header) E.header.classList.toggle('is-clear', !!rv && e > 0.5 && heroR.bottom > (E.header.offsetHeight || 66));
      if (rv && E.heroReveal) {
        E.heroReveal.style.clipPath = 'inset(0 ' + (rv.cr * (1 - e)).toFixed(1) + 'px 0 ' + (rv.cl * (1 - e)).toFixed(1) + 'px)';
        E.heroReveal.style.transform = 'translate3d(' + (rv.x0 * (1 - e)).toFixed(1) + 'px,' + (rv.y0 * (1 - e)).toFixed(1) + 'px,0) scale(' + (rv.s0 + (1 - rv.s0) * e).toFixed(4) + ')';
      }
      if (E.heroIntro) { E.heroIntro.style.opacity = (1 - out).toFixed(3); E.heroIntro.style.visibility = out > 0.99 ? 'hidden' : 'visible'; }
      if (E.heroScrim) E.heroScrim.style.opacity = pe.toFixed(3);
      if (E.heroPanel) {
        E.heroPanel.style.opacity = pe.toFixed(3);
        E.heroPanel.style.transform = 'translateY(' + ((1 - pe) * 40).toFixed(1) + 'px)';
        E.heroPanel.style.pointerEvents = pe > 0.6 ? 'auto' : 'none';
        E.heroPanel.style.visibility = pe > 0.01 ? 'visible' : 'hidden';
      }
    } else if (E.header && E.header.classList.contains('is-clear') && (!heroR || !vis(heroR, 0) || vw < 740)) {
      E.header.classList.remove('is-clear');
    }
    if (heroR && vw < 740) {
      if (E.heroIntro) { E.heroIntro.style.opacity = '1'; E.heroIntro.style.visibility = 'visible'; }
    }
    if (E.cue && !red) E.cue.style.transform = 'translateY(' + (Math.sin(t / 280) * 5).toFixed(1) + 'px)';

    if (manR && E.words.length && vis(manR, 100)) {
      const p = cl((vh * 0.82 - manR.top) / (manR.height + vh * 0.3));
      const lit = red ? 1e9 : p * E.words.length * 1.15;
      for (let i = 0; i < E.words.length; i++) {
        const w = E.words[i];
        const c = i < lit ? (w.dataset.w === '1' ? 'var(--color-accent)' : 'var(--color-text)') : 'var(--color-neutral-300)';
        if (w._c !== c) { w.style.color = c; w._c = c; }
      }
    }

    E.counters.forEach((el, i) => {
      if (el.dataset.done) return;
      if (!el._t0) { const top = cntT[i]; if (top !== null && top < vh * 0.9) el._t0 = t; else return; }
      const k = cl((t - el._t0!) / 1600), from = +(el.dataset.from || 0), to = +el.dataset.count!;
      el.textContent = fmt(el, from + (to - from) * ease(k));
      if (k >= 1) el.dataset.done = '1';
    });

    if (E.chapters.length) {
      let a = 0;
      chT.forEach((top, i) => { if (top < vh * 0.55) a = i; });
      if (a !== S.act) {
        S.act = a;
        E.storyImgs.forEach((im, i) => { im.style.opacity = i === a ? '1' : '0'; im.style.transform = i === a ? 'scale(1)' : 'scale(1.08)'; });
        const ch = E.chapters[a];
        if (E.storyCap) E.storyCap.textContent = ch.dataset.cap || '';
        if (E.storyIdx) E.storyIdx.textContent = pad(a + 1) + ' / ' + pad(E.chapters.length);
        if (E.big) E.big.textContent = ch.dataset.big || pad(a + 1);
        E.chapters.forEach((c, i) => { if (c.dataset.dim) c.style.opacity = i === a ? '1' : '0.3'; });
      }
    }

    for (let i = 0; i < E.panels.length; i++) {
      const inner = E.panels[i].firstElementChild as HTMLElement | null; if (!inner) continue;
      let k = 0;
      if (panR[i + 1]) k = cl((panR[i].bottom - panR[i + 1].top) / (panR[i].height * 0.6));
      inner.style.transform = 'scale(' + (1 - 0.05 * k).toFixed(4) + ')';
      inner.style.opacity = (1 - k).toFixed(3);
    }

    if (jR && E.track) {
      const p = cl(-jR.top / Math.max(1, jR.height - vh));
      E.track.style.transform = 'translate3d(' + (-p * S.jdist).toFixed(1) + 'px,0,0)';
      if (E.jbar) E.jbar.style.transform = 'scaleX(' + p.toFixed(4) + ')';
      const n = E.stations.length || 1, a = Math.min(n - 1, Math.round(p * (n - 1)));
      if (E.jmarker) E.jmarker.style.left = (p * 100).toFixed(3) + '%';
      if (a !== S.jact) {
        S.jact = a;
        E.stations.forEach((st, i) => {
          st.style.opacity = i < a ? '0.38' : i === a ? '1' : '0.62';
          const v = st._v || (st._v = st.querySelector<HTMLElement>('[data-jvis]'));
          if (v) v.style.transform = i === a ? 'scale(1)' : 'scale(0.94)';
        });
        E.jticks.forEach((tk, i) => {
          tk.style.color = i <= a ? 'var(--color-text)' : 'color-mix(in srgb,var(--color-text) 40%,transparent)';
          const dot = tk.firstElementChild as HTMLElement | null;
          if (dot) dot.style.background = i < a ? 'var(--color-text)' : i === a ? 'var(--color-accent)' : 'var(--color-neutral-300)';
        });
        const st = E.stations[a];
        if (st && E.jyear) {
          E.jyear.textContent = st.dataset.yr || '';
          E.jyear.style.transition = 'none'; E.jyear.style.transform = 'translateY(30%)'; E.jyear.style.opacity = '0';
          void E.jyear.offsetHeight;
          E.jyear.style.transition = 'transform .6s cubic-bezier(.16,1,.3,1), opacity .4s ease';
          E.jyear.style.transform = 'none'; E.jyear.style.opacity = '1';
        }
        if (st && E.jmeta) E.jmeta.textContent = st.dataset.era || '';
      }
    }

    E.wipe.forEach((el, i) => {
      const e = red ? 1 : io(cl((vh - wipeR[i].top) / (vh * 0.8)));
      el.style.clipPath = 'inset(0 ' + ((1 - e) * 100).toFixed(2) + '% 0 0)';
    });

    E.grow.forEach((el, i) => {
      const e = red ? 1 : io(cl((vh - growR[i].top) / (vh * 0.9)));
      el.style.clipPath = 'inset(0 ' + ((1 - e) * 7).toFixed(2) + '% 0 ' + ((1 - e) * 7).toFixed(2) + '%)';
      const im = el._img || (el._img = el.querySelector<HTMLElement>('img'));
      if (im) im.style.transform = 'scale(' + (1.14 - 0.14 * e).toFixed(4) + ')';
    });

    E.drift.forEach((el, i) => {
      const r = drR[i]; if (!vis(r, 200)) return;
      const sp = red ? 0 : parseFloat(el.dataset.drift!) || 0;
      el.style.transform = 'translate3d(' + ((r.top + r.height / 2 - vh / 2) * sp).toFixed(1) + 'px,0,0)';
    });

    E.parallax.forEach((el, i) => {
      const r = pxR[i]; if (!vis(r, 200)) return;
      let sp = red ? 0 : parseFloat(el.dataset.parallax!) || 0;
      if (el.dataset.pdesk && vw < 760) sp = 0;
      el.style.transform = 'translate3d(0,' + ((r.top + r.height / 2 - vh / 2) * sp).toFixed(1) + 'px,0)';
    });

    E.lines.forEach((el, i) => {
      const r = lnR[i];
      el.style.transform = 'scaleY(' + cl((vh * 0.55 - r.top) / Math.max(1, r.height)).toFixed(4) + ')';
    });

    E.marquee.forEach((el) => {
      const half = el._half || (el._half = el.scrollWidth / 2); if (!half) return;
      const off = ((((red ? 0 : t * 0.03) + sy * 0.35) % half) + half) % half;
      el.style.transform = 'translate3d(' + (-off).toFixed(1) + 'px,0,0)';
    });

    E.reveal.forEach((el, i) => {
      const top = rvT[i];
      if (top === null || top >= vh * 0.88) return;
      el.dataset.shown = '1';
      const d = (parseInt(el.dataset.reveal!, 10) || 0) * 0.09;
      el.style.transition = 'opacity 1s cubic-bezier(.2,.7,.2,1) ' + d + 's, transform 1s cubic-bezier(.2,.7,.2,1) ' + d + 's';
      el.style.opacity = '1';
      el.style.transform = 'none';
    });

    if (E.onair) E.onair.style.opacity = red ? '1' : (Math.floor(t / 650) % 2 ? '1' : '0.2');

    if (E.preview) {
      const m = S.m;
      m.cx += (m.x - m.cx) * 0.16; m.cy += (m.y - m.cy) * 0.16;
      E.preview.style.transform = 'translate3d(' + (m.cx + 28).toFixed(1) + 'px,' + (m.cy - 110).toFixed(1) + 'px,0)';
    }
  }

  collect();
  layout();
  intro();
  const loop = (t: number) => { try { tick(t); } catch (e) { console.warn('motion', e); } S.raf = requestAnimationFrame(loop); };
  S.raf = requestAnimationFrame(loop);
  const onResize = () => layout();
  window.addEventListener('resize', onResize);
  const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => {
    if (S.rq) return;
    S.rq = requestAnimationFrame(() => { S.rq = 0; collect(); layout(); });
  }) : null;
  ro?.observe(root);
  document.fonts?.ready.then(() => layout());
  const lt = setTimeout(() => { collect(); layout(); }, 900);

  return {
    refresh() { S.act = -1; S.jact = -1; collect(); layout(); refreshCounters(); },
    onMove(e) { const m = S.m; m.x = e.clientX; m.y = e.clientY; if (!m.init) { m.cx = m.x; m.cy = m.y; m.init = true; } },
    onLeave() { if (S.E?.preview) S.E.preview.style.opacity = '0'; S.m.init = false; },
    showPreview(src) {
      const E = S.E; if (!E || !E.preview || !E.previewImg) return;
      if (!src || innerWidth < 760) { E.preview.style.opacity = '0'; return; }
      if (E.previewImg.getAttribute('src') !== src) E.previewImg.setAttribute('src', src);
      E.preview.style.opacity = '1';
    },
    destroy() {
      cancelAnimationFrame(S.raf);
      if (S.rq) cancelAnimationFrame(S.rq);
      clearTimeout(lt);
      window.removeEventListener('resize', onResize);
      ro?.disconnect();
    },
  };
}
