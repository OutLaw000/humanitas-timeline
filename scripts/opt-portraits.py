#!/usr/bin/env python3
"""High-quality WebP/AVIF at full display resolution (max 1920px, includes 2x).
Never upscale. Originals are not modified. Writes scripts/opt-portraits-report.json
and variant map scripts/opt-variants.json.
"""
from __future__ import annotations
import json, sys
from concurrent.futures import ProcessPoolExecutor, as_completed
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC_DIR = ROOT / "images" / "figures"
MAX_SIDE = 1920
WEBP_Q = 90
AVIF_Q = 80

def work(path_str: str):
    from PIL import Image
    path = Path(path_str)
    stem = path.stem
    out_webp = SRC_DIR / f"{stem}.webp"
    out_avif = SRC_DIR / f"{stem}.avif"
    try:
        im = Image.open(path)
        im.load()
        w, h = im.size
        bands = im.getbands()
        if im.mode in ("P", "LA"):
            im = im.convert("RGBA")
        elif im.mode == "L":
            im = im.convert("RGB")
        elif im.mode not in ("RGB", "RGBA"):
            im = im.convert("RGBA" if "A" in bands else "RGB")
        scale = min(1.0, MAX_SIDE / max(w, h))
        if scale < 1.0:
            nw, nh = int(round(w * scale)), int(round(h * scale))
            im = im.resize((nw, nh), Image.Resampling.LANCZOS)
        else:
            nw, nh = im.size
        im.save(out_webp, format="WEBP", quality=WEBP_Q, method=6)
        im.save(out_avif, format="AVIF", quality=AVIF_Q)
        return {
            "stem": stem,
            "width": nw,
            "height": nh,
            "src_w": w,
            "src_h": h,
            "src_bytes": path.stat().st_size,
            "webp_bytes": out_webp.stat().st_size,
            "avif_bytes": out_avif.stat().st_size,
            "ok": True,
        }
    except Exception as e:
        return {"stem": stem, "ok": False, "error": str(e)}

def main():
    files = sorted(
        p for p in SRC_DIR.iterdir()
        if p.suffix.lower() in {".jpg", ".jpeg", ".png"}
    )
    print(f"converting {len(files)} originals, max side {MAX_SIDE}", flush=True)
    results = []
    with ProcessPoolExecutor(max_workers=4) as ex:
        futs = {ex.submit(work, str(p)): p for p in files}
        for i, fut in enumerate(as_completed(futs), 1):
            r = fut.result()
            results.append(r)
            if r.get("ok"):
                print(
                    f"[{i}/{len(files)}] {r['stem']}: {r['src_w']}x{r['src_h']} -> {r['width']}x{r['height']} "
                    f"{r['src_bytes']/1e6:.2f}MB -> webp {r['webp_bytes']/1e3:.0f}KB avif {r['avif_bytes']/1e3:.0f}KB",
                    flush=True,
                )
            else:
                print(f"[{i}/{len(files)}] FAIL {r['stem']}: {r.get('error')}", flush=True)

    ok = [r for r in results if r.get("ok")]
    fail = [r for r in results if not r.get("ok")]
    src = sum(r["src_bytes"] for r in ok)
    webp = sum(r["webp_bytes"] for r in ok)
    avif = sum(r["avif_bytes"] for r in ok)
    print(f"\nOK {len(ok)} FAIL {len(fail)}")
    print(f"originals {src/1e6:.1f} MB  webp {webp/1e6:.1f} MB  avif {avif/1e6:.1f} MB")

    variants = {}
    for r in ok:
        variants[r["stem"]] = {
            "webp": f"/images/figures/{r['stem']}.webp",
            "avif": f"/images/figures/{r['stem']}.avif",
            "width": r["width"],
            "height": r["height"],
        }
    (ROOT / "scripts" / "opt-variants.json").write_text(json.dumps(variants, indent=2))
    (ROOT / "scripts" / "opt-portraits-report.json").write_text(
        json.dumps({"totals": {"src": src, "webp": webp, "avif": avif}, "ok": ok, "fail": fail}, indent=2)
    )
    if fail:
        sys.exit(1)

if __name__ == "__main__":
    main()
