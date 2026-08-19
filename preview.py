#!/usr/bin/env python3
"""로컬 미리보기 서버.  터미널에서:  python3 preview.py   →  http://localhost:4321"""
import http.server, socketserver, os, posixpath, urllib.parse

ROOT = os.path.dirname(os.path.abspath(__file__))
PORT = int(os.environ.get("PORT", 4321))

class H(http.server.SimpleHTTPRequestHandler):
    extensions_map = {
        **http.server.SimpleHTTPRequestHandler.extensions_map,
        ".html": "text/html; charset=utf-8",
        ".js":   "text/javascript; charset=utf-8",
        ".css":  "text/css; charset=utf-8",
        ".json": "application/json; charset=utf-8",
    }

    def __init__(self, *a, **kw):
        super().__init__(*a, directory=ROOT, **kw)
    def translate_path(self, path):
        p = super().translate_path(path)
        if os.path.isdir(p) and os.path.exists(os.path.join(p, "index.html")):
            return p
        if not os.path.exists(p):
            rel = urllib.parse.urlparse(path).path
            if not posixpath.basename(rel).count("."):
                return os.path.join(ROOT, "index.html")
        return p
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()
    def log_message(self, *a): pass

socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(("", PORT), H) as httpd:
    print(f"→ http://localhost:{PORT}")
    httpd.serve_forever()
