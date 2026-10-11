# Badri Raj Timalsina — website

Bilingual (English / नेपाली) personal site built from the Claude Design export in the parent folder.
Next.js 16 + React 19, plain CSS, no UI framework. Every page is statically prerendered.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Docker: `docker build -t badri-site . && docker run -p 3000:3000 badri-site`

## Where things live

| What | Where |
| --- | --- |
| Page copy (EN + NE) | `components/pages/*Page.tsx`, the `C = { en, ne }` object at the top of each |
| Nav, contact details, socials | `content/site.ts` |
| Gallery photos and captions | `content/gallery.ts` |
| Journal columns | `content/journal.ts` (empty list shows the "archive being prepared" state) |
| Design tokens and component styles | `app/globals.css` |
| Scroll animations | `lib/motion.ts` (elements opt in with `data-*` attributes) |
| Photos | `public/images/badri/<name>.jpg` and `<name>-md.jpg` |

## Photos

Only photos in which Mr. Timalsina is visible are used. Originals are in `source-photos/`
(kept out of `public/` because they are ~135 MB, mostly HEIC). To add or replace a photo,
add it to `PHOTOS` in `scripts/build_images.py` and run:

```bash
pip install pillow pillow-heif
npm run images
```

This writes a ≤1920px and a ≤960px JPEG for each photo.

## Contact form

There is no backend: the contact form and the podcast "Notify me" form open the visitor's
email app addressed to contact@safalbadri.com with the message filled in.
