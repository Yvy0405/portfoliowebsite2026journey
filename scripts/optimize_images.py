"""Resize the original portfolio PNGs into web-friendly WebP variants.

Usage: python3 scripts/optimize_images.py <source_assets_dir>
Default source: public/assets/source (put original full-size PNGs there).
Outputs: public/assets/img/<slug>-<width>.webp
"""
import sys, pathlib, re
from PIL import Image

SRC = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "public/assets/source")
OUT = pathlib.Path("public/assets/img")
OUT.mkdir(parents=True, exist_ok=True)
WIDTHS = [480, 960, 1600]

def slug(name: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")

for f in sorted(SRC.glob("*.png")):
    im = Image.open(f)
    if im.mode not in ("RGB", "RGBA"):
        im = im.convert("RGB")
    for w in WIDTHS:
        if w > im.width and w != WIDTHS[0]:
            continue
        h = round(im.height * w / im.width)
        out = OUT / f"{slug(f.stem)}-{w}.webp"
        im.resize((w, h), Image.LANCZOS).save(out, "WEBP", quality=80, method=6)
    print("ok", f.name)
