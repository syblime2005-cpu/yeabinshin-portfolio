/* ============================================================
   Supabase REST 클라이언트 (외부 라이브러리 없음)
   - 공개 사이트: 저장된 내용을 읽어와 기본 내용 위에 덮어씀
   - 실패하면 조용히 무시하고 기본 내용 사용 → 사이트가 절대 깨지지 않음
   ============================================================ */
window.Store = (function () {
  "use strict";
  var C = window.SUPABASE || {};
  var TOKEN_KEY = "yb-token";

  function on() { return !!(C.url && C.anonKey); }
  function token() { try { return localStorage.getItem(TOKEN_KEY) || ""; } catch (e) { return ""; } }
  function setToken(t) { try { t ? localStorage.setItem(TOKEN_KEY, t) : localStorage.removeItem(TOKEN_KEY); } catch (e) {} }

  function headers(auth) {
    var h = { "apikey": C.anonKey, "Content-Type": "application/json" };
    h["Authorization"] = "Bearer " + ((auth && token()) || C.anonKey);
    return h;
  }

  async function login(email, password) {
    var r = await fetch(C.url + "/auth/v1/token?grant_type=password", {
      method: "POST",
      headers: { "apikey": C.anonKey, "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password })
    });
    var j = await r.json();
    if (!r.ok) throw new Error(j.error_description || j.msg || j.message || "로그인 실패");
    setToken(j.access_token);
    return j;
  }
  function logout() { setToken(""); }
  function loggedIn() { return !!token(); }

  async function me() {
    if (!token()) return null;
    var r = await fetch(C.url + "/auth/v1/user", { headers: headers(true) });
    if (!r.ok) { setToken(""); return null; }
    return r.json();
  }

  /* content 테이블: key(text, PK) / data(jsonb) */
  async function readAll() {
    if (!on()) return null;
    var r = await fetch(C.url + "/rest/v1/content?select=key,data", { headers: headers(false) });
    if (!r.ok) return null;
    var rows = await r.json();
    var out = {};
    rows.forEach(function (x) { out[x.key] = x.data; });
    return out;
  }

  async function save(key, data) {
    var r = await fetch(C.url + "/rest/v1/content?on_conflict=key", {
      method: "POST",
      headers: Object.assign(headers(true), { "Prefer": "resolution=merge-duplicates,return=minimal" }),
      body: JSON.stringify({ key: key, data: data, updated_at: new Date().toISOString() })
    });
    if (!r.ok) throw new Error("저장 실패 (" + r.status + ") " + (await r.text()).slice(0, 200));
    return true;
  }

  async function upload(file) {
    var ext = (file.name.split(".").pop() || "jpg").toLowerCase();
    var path = "img/" + Date.now() + "-" + Math.random().toString(36).slice(2, 8) + "." + ext;
    var r = await fetch(C.url + "/storage/v1/object/media/" + path, {
      method: "POST",
      headers: { "apikey": C.anonKey, "Authorization": "Bearer " + token() },
      body: file
    });
    if (!r.ok) throw new Error("업로드 실패 (" + r.status + ") " + (await r.text()).slice(0, 200));
    return C.url + "/storage/v1/object/public/media/" + path;
  }

  /* 저장된 내용을 기본 내용 위에 덮어쓰기 */
  function apply(remote) {
    if (!remote) return false;
    var changed = false;
    if (remote.site && typeof remote.site === "object") {
      Object.keys(remote.site).forEach(function (k) { window.SITE[k] = remote.site[k]; });
      changed = true;
    }
    if (Array.isArray(remote.writings)) { window.WRITINGS = remote.writings; changed = true; }
    if (Array.isArray(remote.archive))  { window.ARCHIVE  = remote.archive;  changed = true; }
    if (Array.isArray(remote.works) && remote.works.length) {
      var by = {};
      window.WORKS.forEach(function (w) { by[w.slug] = w; });
      var merged = remote.works.map(function (w) {
        return Object.assign({}, by[w.slug] || {}, w);   /* 저장본이 우선, 없는 값은 기본에서 */
      });
      window.WORKS = merged; changed = true;
    }
    return changed;
  }

  return { on: on, login: login, logout: logout, loggedIn: loggedIn, me: me,
           readAll: readAll, save: save, upload: upload, apply: apply };
})();
