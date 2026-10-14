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

| Screen | Behaviour |
|---|---|
| Desktop (≥1024px wide, ≥620px tall) | Pinned journey. Vertical scrolling moves the chapters sideways, 1px for 1px. Native scrolling handles mouse wheels, trackpads and the keyboard, and horizontal trackpad swipes also work. Scroll progress controls the active chapter, the vehicle, the wheel rotation and the plane's flight arc. |
| Tablet, mobile, or reduced motion | The same chapters stacked vertically in the same order. A slim sticky bar shows the current chapter and vehicle, and each chapter shows its vehicle as a static illustration. |

The page is laid out as: hero and client logos, the journey (7 chapters), then **Work**, **Awards & Achievements**, **Education** and **Contact**. These sections give direct access to every project, so visitors never have to finish the journey. The header links (Journey, Work, Awards, Education, Contact) jump straight to these sections.

Case studies and award details open in an accessible panel built on the native `<dialog>` element. It traps focus, closes with Escape, the backdrop or the Back/Close buttons, and returns focus to the button that opened it. The journey stays where it was when the panel closes.

## Editing content

| What | File |
|---|---|
| All original portfolio wording (hero, logos, 5 projects, 3 awards, 2 education entries, contact, footer) | `src/content/portfolio.ts` |
| Dates and parallel timeline lanes | `src/content/timeline.ts` |
| Journey chapters (order, titles, vehicle, which items appear, lane window) | `src/content/journey.ts` |
| Colours, type scale, spacing, outline weights | `src/styles/tokens.css` and `src/components/vehicles/tokens.ts` |
| Vehicles and small illustrations (SVG components) | `src/components/vehicles/` |

- **Add a case-study section:** add `{ heading, body }` to a project's `extraSections` in `portfolio.ts`. Add `placeholder: true` to show it as a clearly marked draft.
- **Replace the school-project placeholders:** in `journey.ts`, change the two `kind: 'placeholder'` items in the `humber` chapter. To show real work, add a new entry to `projects` in `portfolio.ts` and reference it with `{ kind: 'project', id: '…' }`.
- **Add Kinton Ramen dates later:** set `start` and `end` on the `kinton` activity in `timeline.ts`, and change `precision` to `'month'`.

## Replacing assets

- **Photos and project previews:** put the original PNG/JPG files in a folder and run `python3 scripts/optimize_images.py <folder>`. This writes `public/assets/img/<name>-480/960/1600.webp`. Then reference the image by slug, e.g. `sq('my-image', 'Alt text')`.
- **Logos:** `public/assets/logos/*.webp`. These were rasterized and cropped from the original SVGs.
- **Resume:** replace `public/assets/HoangYVyNguyen_Resume.pdf`.
- **Face sticker:** `src/components/vehicles/FaceSticker.tsx` is a simplified cartoon based on the portrait. To use your own artwork, set `FACE_IMAGE = 'assets/face.png'` (a square image in `public/assets/`), or redraw the SVG group. It updates on all four vehicles automatically.

## Deploying

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to `main`. To turn it on, go to **Settings → Pages → Source** and choose **GitHub Actions**. `vite.config.ts` uses relative paths, so the site works under `/<repo>/`.

## Information not supplied by the original site

- **Kinton Ramen:** no dates or responsibilities. It is shown as a part-time milestone alongside Humber, with no dates and no case study. Its timeline bar is hatched and labelled as unspecified.
- **Humber school projects:** none supplied. They appear as two labelled editable placeholders.
- **Graduation:** no exact date. It is shown as the end of the 2024–2025 Humber program.
- **Relocation to Canada:** no date. The travel chapter is undated.
- **Cherries Code location:** not stated. No location is shown for it.
- **Year-only dates** (RMIT 2023, Humber 2024–2025) are drawn with dashed bar ends, and the timeline legend explains this.
