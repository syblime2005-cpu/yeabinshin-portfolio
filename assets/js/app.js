/* ============================================================
   신예빈 포트폴리오 — 라우터 & 렌더러 (빌드 도구 없음)
   ============================================================ */
(function () {
  "use strict";

  var S = window.SITE, WORKS = window.WORKS || [], WRITINGS = window.WRITINGS || [], ARCHIVE = window.ARCHIVE || [];
  var main = document.getElementById("main");
  var lang = localStorage.getItem("yb-lang") === "en" ? "en" : "ko";

  var T = {
    ko: {
      works: "작업", about: "소개", writing: "글", archive: "아카이브", contact: "연락",
      all: "전체", selected: "선택 작업", index: "목차",
      allWorks: "모든 작업 보기", readMore: "더 읽기",
      aboutLead: "어떤 모토로, 어떤 작업을 하는 사람인가",
      writingLead: "직접 쓴 글을 모아둔 곳",
      archiveLead: "사진 · 음악 · 공간 · 글 · 책 — 영감이 된 것들",
      description: "작업 노트", info: "정보", year: "연도", medium: "재료", role: "분류", link: "링크",
      prev: "이전", next: "다음", back: "목록으로",
      noPost: "아직 올린 글이 없습니다.", noArch: "아직 모아둔 것이 없습니다.",
      notFound: "페이지를 찾을 수 없습니다.",
      kinds: { image: "사진", music: "음악", space: "공간", text: "글", book: "책" }
    },
    en: {
      works: "Works", about: "About", writing: "Writing", archive: "Archive", contact: "Contact",
      all: "All", selected: "Selected works", index: "Index",
      allWorks: "See all works", readMore: "Read more",
      aboutLead: "The motto, and the work that follows from it",
      writingLead: "Texts written by me",
      archiveLead: "Images · music · places · texts · books that stayed with me",
      description: "Work note", info: "Info", year: "Year", medium: "Medium", role: "Category", link: "Link",
      prev: "Prev", next: "Next", back: "Back to index",
      noPost: "No texts yet.", noArch: "Nothing collected yet.",
      notFound: "Page not found.",
      kinds: { image: "Image", music: "Music", space: "Place", text: "Text", book: "Book" }
    }
  };
  function t(k) { return T[lang][k]; }
  function L(o) { if (o == null) return ""; return typeof o === "string" ? o : (o[lang] || o.ko || o.en || ""); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]; }); }
  function cat(key) { for (var i = 0; i < S.categories.length; i++) if (S.categories[i].key === key) return S.categories[i]; return { ko: key, en: key }; }
  function catName(key) { var c = cat(key); return lang === "en" ? c.en : c.ko; }
  function img(w, name) { return "/images/works/" + name; }
  function bodyOf(w) { return (lang === "en" && w.bodyEn && w.bodyEn.length) ? w.bodyEn : w.body; }

  /* ---------- 라우팅 ---------- */
  function go(path, push) {
    if (push !== false) history.pushState({}, "", path);
    render(path);
    window.scrollTo(0, 0);
    closeMenu();
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest("a[data-link]");
    if (!a) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || a.target === "_blank") return;
    e.preventDefault(); go(a.getAttribute("href"));
  });
  window.addEventListener("popstate", function () { render(location.pathname); });

  function render(path) {
    var p = path.replace(/\/+$/, "") || "/";
    var seg = p.split("/").filter(Boolean);
    var html;
    if (p === "/") html = viewHome();
    else if (seg[0] === "about") html = viewAbout();
    else if (seg[0] === "works") html = viewWorks(seg[1] || "");
    else if (seg[0] === "work" && seg[1]) html = viewWork(seg[1]);
    else if (seg[0] === "writing" && seg[1]) html = viewPost(seg[1]);
    else if (seg[0] === "writing") html = viewWriting();
    else if (seg[0] === "archive") html = viewArchive();
    else if (seg[0] === "contact") html = viewContact();
    else html = '<div class="page"><p class="empty">' + t("notFound") + ' <a href="/" data-link>&larr; Home</a></p></div>';

    main.innerHTML = html;
    markNav(seg[0] || "home", seg[1] || "");
    reveal();
    var base = lang === "en" ? "Yea Bin Shin" : "신예빈";
    var tt = titleFor(seg);
    document.title = (tt && tt !== base) ? tt + " · " + base : base + " · " + (lang === "en" ? "Portfolio" : "포트폴리오");
  }

  function titleFor(seg) {
    if (!seg[0]) return lang === "en" ? "Yea Bin Shin" : "신예빈";
    if (seg[0] === "work") { var w = find(seg[1]); return w ? L(w.title) : t("works"); }
    if (seg[0] === "writing" && seg[1]) { var o = WRITINGS.filter(function (x) { return x.slug === seg[1]; })[0]; return o ? o.title : t("writing"); }
    return t(seg[0] === "works" ? "works" : seg[0]) || "";
  }
  function find(slug) { return WORKS.filter(function (w) { return w.slug === slug; })[0]; }

  /* ---------- 홈 ---------- */
  function viewHome() {
    var picks = ["p51.jpg", "p33.jpg", "p05.jpg"];
    var links = ["archive-as-form", "remains-card", "garamond"];
    var motto = esc(L(S.motto)).replace(/\n/g, "\n");
    return '<div class="page">' +
      '<section class="hero">' +
      '<h1 class="hero-motto">' + motto + '</h1>' +
      '<p class="hero-tag">' + esc(L(S.tagline)) + '</p>' +
      '<p class="hero-meta">' + esc(L(S.name)) + ' &nbsp;·&nbsp; ' + esc(L(S.role)) + '</p>' +
      '<p class="hero-scroll">scroll</p>' +
      '</section>' +
      '<div class="strip">' + picks.map(function (f, i) {
        return '<a href="/work/' + links[i] + '" data-link><span class="r"><img src="/images/works/' + f + '" alt="" loading="lazy"></span></a>';
      }).join("") + '</div>' +
      '<section class="home-sec">' +
      '<h2>' + esc(t("selected")) + '</h2>' +
      '<div class="grid">' + WORKS.slice(0, 4).map(cardHTML).join("") + '</div>' +
      '<a class="more" href="/works" data-link>' + esc(t("allWorks")) + ' &nbsp;&rarr;</a>' +
      '</section>' +
      '<section class="home-sec">' +
      '<h2>' + esc(t("about")) + '</h2>' +
      '<p>' + esc(S.about[0]) + '</p>' +
      '<a class="more" href="/about" data-link>' + esc(t("readMore")) + ' &nbsp;&rarr;</a>' +
      '</section>' +
      '</div>';
  }

  /* ---------- 작업 목록 ---------- */
  function cardHTML(w, i) {
    return '<a class="card" href="/work/' + w.slug + '" data-link>' +
      '<span class="frame"><img src="' + img(w, w.cover || w.images[0]) + '" alt="' + esc(L(w.title)) + '" loading="lazy"></span>' +
      '<span class="meta"><span class="no">' + String((i || 0) + 1).padStart(2, "0") + '</span>' +
      '<h3>' + esc(w.title.ko) + '<span class="en">' + esc(w.title.en) + '</span></h3></span>' +
      '<span class="cap">' + esc(L(w.caption)) + '</span>' +
      '</a>';
  }

  function viewWorks(c) {
    var list = c ? WORKS.filter(function (w) { return w.category === c; }) : WORKS;
    var btns = [{ key: "", label: t("all"), n: WORKS.length }].concat(S.categories.map(function (x) {
      return { key: x.key, label: lang === "en" ? x.en : x.ko, n: WORKS.filter(function (w) { return w.category === x.key; }).length };
    }));
    return '<div class="page">' +
      '<p class="eyebrow"><span>' + esc(t("works")) + '</span><span>' + esc(t("index")) + '</span></p>' +
      '<div class="filters">' + btns.map(function (b) {
        return '<a href="/works' + (b.key ? "/" + b.key : "") + '" data-link><button type="button" class="' + (b.key === c ? "on" : "") + '">' +
          esc(b.label) + '<span class="cnt">' + b.n + '</span></button></a>';
      }).join("") + '</div>' +
      (list.length ? '<div class="grid">' + list.map(cardHTML).join("") + '</div>' : '<p class="empty">—</p>') +
      '</div>';
  }

  /* ---------- 작업 상세 ---------- */
  function viewWork(slug) {
    var w = find(slug); if (!w) return '<div class="page"><p class="empty">' + t("notFound") + '</p></div>';
    var same = WORKS.filter(function (x) { return x.category === w.category; });
    var i = same.indexOf(w), prev = same[i - 1], next = same[i + 1];

    return '<div class="page">' +
      '<p class="eyebrow"><span><a href="/works/' + w.category + '" data-link>' + esc(catName(w.category)) + '</a></span>' +
      '<span><a href="/works" data-link>' + esc(t("back")) + '</a></span></p>' +

      '<div class="detail-head">' +
      '<h1>' + esc(w.title.ko) + '<span class="en">' + esc(w.title.en) + '</span></h1>' +
      '<div class="detail-side">' +
      row(t("year"), esc(w.year)) +
      row(t("role"), esc(L(w.role))) +
      row(t("medium"), esc(L(w.caption))) +
      (w.link ? row(t("link"), '<a href="' + esc(w.link.url) + '" target="_blank" rel="noopener">' + esc(w.link.label) + ' &nearr;</a>') : "") +
      '</div></div>' +

      '<div class="figs">' + w.images.map(function (f) {
        return '<figure class="fig" data-full="' + img(w, f) + '"><img src="' + img(w, f) + '" alt="' + esc(L(w.title)) + '" loading="lazy"></figure>';
      }).join("") + '</div>' +

      '<div class="body-wrap">' +
      '<p class="label">' + esc(t("description")) + '</p>' +
      '<div class="body-text">' + bodyOf(w).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + '</div>' +
      '</div>' +

      '<nav class="pager">' +
      (prev ? '<a href="/work/' + prev.slug + '" data-link>&larr; ' + esc(L(prev.title)) + '</a>' : "<span></span>") +
      (next ? '<a href="/work/' + next.slug + '" data-link style="text-align:right">' + esc(L(next.title)) + ' &rarr;</a>' : "<span></span>") +
      '</nav></div>';
  }
  function row(k, v) { return '<div class="row"><span class="k">' + esc(k) + '</span><span>' + v + '</span></div>'; }

  /* ---------- 소개 ---------- */
  function viewAbout() {
    return '<div class="page">' +
      '<p class="eyebrow"><span>' + esc(t("about")) + '</span><span>' + esc(t("aboutLead")) + '</span></p>' +
      '<div class="about-grid"><div>' +
      '<h1 class="about-motto">' + esc(L(S.motto)) + '</h1>' +
      '<div class="about-body">' + S.about.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + '</div>' +
      '</div><aside class="about-side">' +
      '<img class="portrait" src="/images/site/portrait.jpg" alt="' + esc(L(S.name)) + '">' +
      '<div class="cv">' + S.cv.map(function (sec) {
        return '<h3>' + esc(L(sec.heading)) + '</h3>' + sec.items.map(function (it) {
          return '<div class="item"><span class="yr">' + esc(it[0]) + '</span><span>' + esc(lang === "en" ? (it[2] || it[1]) : it[1]) + '</span></div>';
        }).join("");
      }).join("") + '</div></aside></div></div>';
  }

  /* ---------- 글 ---------- */
  function viewWriting() {
    if (!WRITINGS.length) return '<div class="page"><p class="eyebrow"><span>' + esc(t("writing")) + '</span></p><p class="empty">' + t("noPost") + '</p></div>';
    return '<div class="page">' +
      '<p class="eyebrow"><span>' + esc(t("writing")) + '</span><span>' + esc(t("writingLead")) + '</span></p>' +
      '<div class="posts">' + WRITINGS.map(function (o) {
        return '<a class="post-row" href="/writing/' + o.slug + '" data-link>' +
          '<span class="d">' + esc(o.date) + '</span>' +
          '<span><h3>' + esc(o.title) + '</h3>' + (o.lead ? '<p class="lead">' + esc(o.lead) + '</p>' : "") + '</span>' +
          '<span class="k">' + esc(o.kind || "") + '</span></a>';
      }).join("") + '</div></div>';
  }
  function viewPost(slug) {
    var o = WRITINGS.filter(function (x) { return x.slug === slug; })[0];
    if (!o) return '<div class="page"><p class="empty">' + t("notFound") + '</p></div>';
    return '<div class="page">' +
      '<p class="eyebrow"><span><a href="/writing" data-link>&larr; ' + esc(t("writing")) + '</a></span><span>' + esc(o.kind || "") + '</span></p>' +
      '<article class="article"><p class="d">' + esc(o.date) + '</p><h1>' + esc(o.title) + '</h1>' +
      (o.image ? '<figure class="fig"><img src="' + esc(o.image) + '" alt=""></figure>' : "") +
      o.body.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") +
      '</article></div>';
  }

  /* ---------- 아카이브 ---------- */
  function viewArchive() {
    if (!ARCHIVE.length) return '<div class="page"><p class="eyebrow"><span>' + esc(t("archive")) + '</span></p><p class="empty">' + t("noArch") + '</p></div>';
    return '<div class="page">' +
      '<p class="eyebrow"><span>' + esc(t("archive")) + '</span><span>' + esc(t("archiveLead")) + '</span></p>' +
      '<div class="arch-grid">' + ARCHIVE.map(function (a) {
        return '<article class="arch">' +
          (a.src ? '<figure class="frame" data-full="' + esc(a.src) + '"><img src="' + esc(a.src) + '" alt="" loading="lazy"></figure>' : "") +
          '<p class="k">' + esc(T[lang].kinds[a.kind] || a.kind || "") + '</p>' +
          '<h3>' + esc(a.title) + '</h3>' +
          (a.note ? '<p>' + esc(a.note) + '</p>' : "") +
          (a.url ? '<a class="lnk" href="' + esc(a.url) + '" target="_blank" rel="noopener">listen / open &nearr;</a>' : "") +
          (a.date ? '<p class="dt">' + esc(a.date) + '</p>' : "") +
          '</article>';
      }).join("") + '</div></div>';
  }

  /* ---------- 연락 ---------- */
  function viewContact() {
    var c = S.contact;
    return '<div class="page"><p class="eyebrow"><span>' + esc(t("contact")) + '</span><span>' + esc(L(S.name)) + '</span></p>' +
      '<div class="contact-wrap"><h1>' + esc(L(S.motto)).replace(/\n/g, " ") + '</h1>' +
      '<div class="contact-row"><span class="k">EMAIL</span><a href="mailto:' + esc(c.email) + '">' + esc(c.email) + '</a></div>' +
      (c.phone ? '<div class="contact-row"><span class="k">PHONE</span><span>' + esc(c.phone) + '</span></div>' : "") +
      (c.instagram ? '<div class="contact-row"><span class="k">INSTAGRAM</span><a href="' + esc(c.instagram) + '" target="_blank" rel="noopener">@' + esc(c.instagram.split("/").filter(Boolean).pop()) + '</a></div>' : "") +
      '<div class="contact-row"><span class="k">BASED IN</span><span>Seoul</span></div>' +
      '</div></div>';
  }

  /* ---------- 내비게이션 상태 ---------- */
  function buildSub() {
    document.getElementById("navSub").innerHTML = S.categories.map(function (x) {
      return '<a href="/works/' + x.key + '" data-link data-sub="' + x.key + '">' + esc(lang === "en" ? x.en : x.ko) + '</a>';
    }).join("");
  }
  function markNav(top, sub) {
    document.querySelectorAll(".nav a[data-nav]").forEach(function (a) {
      var k = a.dataset.nav;
      a.classList.toggle("on", k === top || (k === "works" && top === "work"));
    });
    document.querySelectorAll(".nav-sub a").forEach(function (a) {
      a.classList.toggle("on", top === "works" && a.dataset.sub === sub);
    });
  }
  function applyNavLang() {
    var map = { about: ["소개", "About"], works: ["작업", "Works"], writing: ["글", "Writing"], archive: ["아카이브", "Archive"], contact: ["연락", "Contact"] };
    document.querySelectorAll(".nav a[data-nav]").forEach(function (a) {
      var m = map[a.dataset.nav]; if (!m) return;
      a.querySelector("i").textContent = m[0];
      a.querySelector("em").textContent = m[1];
    });
    document.querySelectorAll("#langBtn [data-lang]").forEach(function (s) {
      s.classList.toggle("on", s.dataset.lang === lang);
    });
    document.documentElement.lang = lang;
  }

  /* ---------- 이미지 등장 ---------- */
  function reveal() {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "80px" });
    document.querySelectorAll(".fig img").forEach(function (el) {
      if (el.complete) { el.classList.add("in"); } else { el.addEventListener("load", function () { el.classList.add("in"); }); }
      io.observe(el);
    });
  }

  /* ---------- 라이트박스 ---------- */
  var lb = document.getElementById("lightbox");
  document.addEventListener("click", function (e) {
    var f = e.target.closest("[data-full]");
    if (f) { lb.querySelector("img").src = f.dataset.full; lb.hidden = false; document.body.style.overflow = "hidden"; return; }
    if (e.target.closest(".lightbox")) { lb.hidden = true; document.body.style.overflow = ""; }
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !lb.hidden) { lb.hidden = true; document.body.style.overflow = ""; } });

  /* ---------- 메뉴 · 언어 ---------- */
  var burger = document.getElementById("burger"), side = document.querySelector(".side");
  burger.addEventListener("click", function () {
    var open = side.classList.toggle("open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.style.overflow = open ? "hidden" : "";
  });
  function closeMenu() { side.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); document.body.style.overflow = ""; }

  document.getElementById("langBtn").addEventListener("click", function () {
    lang = lang === "ko" ? "en" : "ko";
    localStorage.setItem("yb-lang", lang);
    applyNavLang(); buildSub(); render(location.pathname);
  });

  document.getElementById("yr").textContent = new Date().getFullYear();
  buildSub(); applyNavLang(); render(location.pathname);
})();
