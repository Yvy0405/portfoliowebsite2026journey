# Hoang Y Vy Nguyen — Journey Portfolio

A horizontally scrolling portfolio that follows Y Vy from Vietnam to Toronto. A small vehicle carries a face sticker through the journey and changes as the chapters change: **motorcycle → airplane → TTC bus → car**.

Built with React, TypeScript, Vite and Motion. All wording, dates, images and links come from the original portfolio: [yvy0405/portfolio2026](https://github.com/Yvy0405/portfolio2026).

```bash
npm install
npm run dev       # local development
npm run build     # typecheck + production build into dist/
npm run preview   # serve the production build
```

## How it works

The portfolio is one continuous horizontal story that fills the browser window. There is no vertical page scrolling and no top menu.

**Hello → Vietnam → Canada → Humber → Yon Crochet → Graduation & Longo grant → Full-time → BMO Launch Me → Today**

Each stop has one short headline, a brief story, and large previews of the real work. Clicking a preview opens a case-study overlay with the complete original wording: role, company, timeline, every responsibility and metric, and links. Award previews open the full award description, all photos and the "Read More" article.

- **Moving through the story:** the mouse wheel or trackpad moves the story sideways with smooth easing. You can also swipe, drag with the mouse, use the arrow keys / PageUp / PageDown / Home / End, use the ← → buttons, or click a dot on the journey line.
- **Vehicle:** it rides the thin line at the bottom and shows the current life stage: motorcycle → airplane → TTC bus → car, always with the face sticker.
- **Phones:** still horizontal. Each story and each preview becomes a swipeable page.
- **Reduced motion:** movement jumps instead of easing.
- Links like `…/#bmo` or `…/#today` open directly at that stop.

## Editing content

| What | File |
|---|---|
| Story stops: headline, short story, dates, vehicle, which work appears | `src/content/story.ts` |
| All original portfolio wording (projects, awards, education, contact, footer) | `src/content/portfolio.ts` |
| Colours, type scale, spacing | `src/styles/tokens.css` and `src/components/vehicles/tokens.ts` |
| Vehicles and small illustrations (SVG components) | `src/components/vehicles/` |

- **Change a story:** edit `title` and `story` for that stop in `story.ts`. Keep the dates exactly as they appear on the original site.
- **Add work to a stop:** add `{ kind: 'project', id: '…' }` or `{ kind: 'award', id: '…' }` to its `media` list.
- **Replace the school-project placeholder:** add a project to `projects` in `portfolio.ts`, then swap the `kind: 'placeholder'` entry in the `humber` stop for `{ kind: 'project', id: '…' }`.
- **Add a case-study section:** add `{ heading, body }` to a project's `extraSections` in `portfolio.ts`.

## Replacing assets

- **Photos and project previews:** put the original PNG/JPG files in a folder and run `python3 scripts/optimize_images.py <folder>`. This writes `public/assets/img/<name>-480/960/1600.webp`. Then reference the image by slug, e.g. `sq('my-image', 'Alt text')`.
- **Logos:** `public/assets/logos/*.webp`. These were rasterized and cropped from the original SVGs.
- **Resume:** replace `public/assets/HoangYVyNguyen_Resume.pdf`.
- **Face sticker:** `src/components/vehicles/FaceSticker.tsx` is a simplified cartoon based on the portrait. To use your own artwork, set `FACE_IMAGE = 'assets/face.png'` (a square image in `public/assets/`), or redraw the SVG group. It updates on all four vehicles automatically.

## Deploying

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to `main`. To turn it on, go to **Settings → Pages → Source** and choose **GitHub Actions**. `vite.config.ts` uses relative paths, so the site works under `/<repo>/`.

## Information not supplied by the original site

- **Kinton Ramen:** no dates or responsibilities. The story mentions it as part-time work while studying at Humber, with no dates and no case study.
- **Humber school projects:** none supplied. They appear as one labelled "School projects" placeholder with three empty image tiles.
- **Graduation:** no exact date. The story only says the 2024–2025 Humber diploma was completed.
- **Relocation to Canada:** no date. The travel chapter is undated.
- **Cherries Code location:** not stated. No location is shown for it.
