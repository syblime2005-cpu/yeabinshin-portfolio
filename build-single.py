#!/usr/bin/env python3
"""모든 것을 data URI 로 묶어 단일 HTML 파일을 만듭니다 (서버 없이 열리는 배포본)."""
import base64, io, os, re, sys
from PIL import Image

ROOT = os.path.dirname(os.path.abspath(__file__))
OUT  = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "dist", "portfolio-single.html")
MAXW = 1600
Q    = 78

def read(p):
    return open(os.path.join(ROOT, p), encoding="utf-8").read()

def data_uri(path, abs_path):
    im = Image.open(abs_path).convert("RGB")
    if im.width > MAXW:
        im = im.resize((MAXW, round(im.height * MAXW / im.width)), Image.LANCZOS)
    buf = io.BytesIO()
    im.save(buf, "JPEG", quality=Q, optimize=True, progressive=True)
    return "data:image/jpeg;base64," + base64.b64encode(buf.getvalue()).decode()

assets = {}
for folder, web in (("images/works", "/images/works"), ("images/site", "/images/site"),
                    ("images/archive", "/images/archive")):
    d = os.path.join(ROOT, folder)
    if not os.path.isdir(d):
        continue
    for name in sorted(os.listdir(d)):
        if name.lower().endswith((".jpg", ".jpeg", ".png")):
            assets[f"{web}/{name}"] = data_uri(name, os.path.join(d, name))

html = read("index.html")
head_extra = re.search(r'<link href="https://fonts\.googleapis[^>]+>', html).group(0)
pretendard = re.search(r'<link rel="stylesheet" href="https://cdn\.jsdelivr[^>]+>', html).group(0)

# index.html 의 body 안쪽만 가져와 <script src> 태그를 제거
body = html.split("<body>", 1)[1].split("</body>", 1)[0]
body = re.sub(r'<script src="[^"]+"></script>\s*', "", body)

js = "\n".join(read(f) for f in (
    "content/site.js", "content/works.js", "content/works.en.js",
    "content/writings.js", "content/archive.js", "assets/js/app.js"))

manifest = ",\n".join('%s:"%s"' % (repr(k).replace("'", '"'), v) for k, v in assets.items())

out = f"""<title>Yea Bin Shin</title>
<meta name="description" content="신예빈 포트폴리오 — 디자인, 순수미술, 프로젝트, 전시, 그리고 개인 아카이브.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
{head_extra}
{pretendard}
<style>
{read("assets/css/style.css")}
</style>
<script>
window.USE_HASH_ROUTING = true;
window.__ASSETS = {{
{manifest}
}};
window.RESOLVE_ASSET = function (p) {{ return window.__ASSETS[p] || p; }};
</script>
{body}
<script>
{js}
</script>
"""
os.makedirs(os.path.dirname(OUT), exist_ok=True)
open(OUT, "w", encoding="utf-8").write(out)
print(f"{OUT}  —  {len(out)/1024/1024:.2f} MB, 이미지 {len(assets)}장")
