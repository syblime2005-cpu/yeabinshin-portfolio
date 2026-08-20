/* ============================================================
   신예빈 포트폴리오 — 라우터 & 렌더러 (빌드 도구 없음)
   ============================================================ */
(function () {
  "use strict";

  var S = window.SITE;
  function WORKS_(){ return window.WORKS || []; }
  function WRITINGS_(){ return window.WRITINGS || []; }
  function ARCHIVE_(){ return window.ARCHIVE || []; }
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
  function resolve(p) { return (window.RESOLVE_ASSET ? window.RESOLVE_ASSET(p) : p); }
  function img(w, name) { return resolve("/images/works/" + name); }
  function bodyOf(w) { return (lang === "en" && w.bodyEn && w.bodyEn.length) ? w.bodyEn : w.body; }

  /* ---------- 라우팅 ---------- */
  /* 해시 모드: 서버 설정 없이 어디서나 동작 (단일 파일 배포 · file:// 열기) */
  var HASH = window.USE_HASH_ROUTING === true || location.protocol === "file:";
  var muteHash = false;

  function currentPath() {
    if (!HASH) return location.pathname;
    return location.hash.replace(/^#/, "") || "/";
  }
  function go(path, push) {
    if (push !== false) {
      if (HASH) { muteHash = true; location.hash = path; }
      else history.pushState({}, "", path);
    }
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
  window.addEventListener("popstate", function () { render(currentPath()); });
  window.addEventListener("hashchange", function () {
    if (muteHash) { muteHash = false; return; }
    render(currentPath());
  });

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
    else if (seg[0] === "admin") html = window.Admin ? window.Admin.view() : "";
    else html = '<div class="page"><p class="empty">' + t("notFound") + ' <a href="/" data-link>&larr; Home</a></p></div>';

    if (stageTimer) { clearInterval(stageTimer); stageTimer = null; }
    main.innerHTML = html;
    markNav(seg[0] || "home", seg[1] || "");
    reveal();
    if (p === "/") startStage();
    if (seg[0] === "admin" && window.Admin) window.Admin.bind();
    var base = lang === "en" ? "Yea Bin Shin" : "신예빈";
    var tt = titleFor(seg);
    document.title = (tt && tt !== base) ? tt + " · " + base : base + " · " + (lang === "en" ? "Portfolio" : "포트폴리오");
  }

  function titleFor(seg) {
    if (!seg[0]) return lang === "en" ? "Yea Bin Shin" : "신예빈";
    if (seg[0] === "work") { var w = find(seg[1]); return w ? L(w.title) : t("works"); }
    if (seg[0] === "admin") return "관리자";
    if (seg[0] === "writing" && seg[1]) { var o = WRITINGS_().filter(function (x) { return x.slug === seg[1]; })[0]; return o ? o.title : t("writing"); }
    return t(seg[0] === "works" ? "works" : seg[0]) || "";
  }
  function find(slug) { return WORKS_().filter(function (w) { return w.slug === slug; })[0]; }

  /* ---------- 홈: 이미지 스테이지 ---------- */
  var STAGE = ["archive-as-form", "moment", "remains-card", "garamond", "my-garden", "ordinary-human"];
  var stageTimer = null;

  function viewHome() {
    var picks = STAGE.map(find).filter(Boolean);
    return '<div class="page">' +
      '<section class="stage" id="stage">' +
      picks.map(function (w, i) {
        return '<div class="stage-layer' + (i === 0 ? ' on' : '') + '" data-i="' + i + '">' +
          '<img src="' + img(w, w.cover || w.images[0]) + '" alt="" ' + (i ? 'loading="lazy"' : '') + '></div>';
      }).join("") +
      '<div class="stage-in">' +
      '<div class="stage-top">' +
      '<p class="stage-name">' + esc(S.name.en) + '<b>' + esc(S.name.ko) + '</b></p>' +
      '<p class="stage-role">' + esc(L(S.role)) + '</p>' +
      '</div>' +
      '<div class="stage-bot">' +
      '<p class="stage-motto">' + esc(L(S.motto)) + '</p>' +
      '<p class="stage-now" id="stageNow"></p>' +
      '</div></div>' +
      '<div class="stage-bar"><i id="stageBar"></i></div>' +
      '</section>' +

      '<section class="home-sec">' +
      '<div class="sec-head"><h2>' + esc(t("selected")) + '</h2><span>' + WORKS_().length + ' works</span></div>' +
      '<div class="grid">' + WORKS_().slice(0, 4).map(cardHTML).join("") + '</div>' +
      '<a class="more" href="/works" data-link>' + esc(t("allWorks")) + ' &rarr;</a>' +
      '</section>' +

      '<section class="home-sec">' +
      '<div class="sec-head"><h2>' + esc(t("about")) + '</h2><span>' + esc(t("aboutLead")) + '</span></div>' +
      '<p>' + esc(S.about[0]) + '</p>' +
      '<a class="more" href="/about" data-link>' + esc(t("readMore")) + ' &rarr;</a>' +
      '</section>' +
      '</div>';
  }

  function startStage() {
    var layers = [].slice.call(document.querySelectorAll('.stage-layer'));
    var now = document.getElementById('stageNow');
    var bar = document.getElementById('stageBar');
    if (!layers.length) return;
    var i = 0;
    function label(k) {
      var w = find(STAGE[k]); if (!w || !now) return;
      now.innerHTML = '<em>' + esc(w.title.ko) + '</em>' + esc(w.year) + ' &nbsp;·&nbsp; ' + esc(catName(w.category));
    }
    var z = 1;
    function tick() {
      var prev = i;
      i = (i + 1) % layers.length;
      layers[i].style.zIndex = ++z;      /* 새 이미지를 위에 얹고 */
      layers[i].classList.add('on');
      label(i);
      if (bar) { bar.classList.remove('run'); void bar.offsetWidth; bar.classList.add('run'); }
      setTimeout(function () {           /* 페이드가 끝난 뒤에 이전 것을 내림 */
        layers[prev].classList.remove('on');
      }, 1700);
    }
    label(0);
    if (bar) { bar.classList.add('run'); }
    stageTimer = setInterval(tick, 5200);
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
    var list = c ? WORKS_().filter(function (w) { return w.category === c; }) : WORKS;
    var btns = [{ key: "", label: t("all"), n: WORKS_().length }].concat(S.categories.map(function (x) {
      return { key: x.key, label: lang === "en" ? x.en : x.ko, n: WORKS_().filter(function (w) { return w.category === x.key; }).length };
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
    var same = WORKS_().filter(function (x) { return x.category === w.category; });
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
      '<img class="portrait" src="' + resolve("/images/site/portrait.jpg") + '" alt="' + esc(L(S.name)) + '">' +
      '<div class="cv">' + S.cv.map(function (sec) {
        return '<h3>' + esc(L(sec.heading)) + '</h3>' + sec.items.map(function (it) {
          return '<div class="item"><span class="yr">' + esc(it[0]) + '</span><span>' + esc(lang === "en" ? (it[2] || it[1]) : it[1]) + '</span></div>';
        }).join("");
      }).join("") + '</div></aside></div></div>';
  }

  /* ---------- 글 ---------- */
  function viewWriting() {
    if (!WRITINGS_().length) return '<div class="page"><p class="eyebrow"><span>' + esc(t("writing")) + '</span></p><p class="empty">' + t("noPost") + '</p></div>';
    return '<div class="page">' +
      '<p class="eyebrow"><span>' + esc(t("writing")) + '</span><span>' + esc(t("writingLead")) + '</span></p>' +
      '<div class="posts">' + WRITINGS_().map(function (o) {
        return '<a class="post-row" href="/writing/' + o.slug + '" data-link>' +
          '<span class="d">' + esc(o.date) + '</span>' +
          '<span><h3>' + esc(o.title) + '</h3>' + (o.lead ? '<p class="lead">' + esc(o.lead) + '</p>' : "") + '</span>' +
          '<span class="k">' + esc(o.kind || "") + '</span></a>';
      }).join("") + '</div></div>';
  }
  function viewPost(slug) {
    var o = WRITINGS_().filter(function (x) { return x.slug === slug; })[0];
    if (!o) return '<div class="page"><p class="empty">' + t("notFound") + '</p></div>';
    return '<div class="page">' +
      '<p class="eyebrow"><span><a href="/writing" data-link>&larr; ' + esc(t("writing")) + '</a></span><span>' + esc(o.kind || "") + '</span></p>' +
      '<article class="article"><p class="d">' + esc(o.date) + '</p><h1>' + esc(o.title) + '</h1>' +
      (o.image ? '<figure class="fig"><img src="' + esc(resolve(o.image)) + '" alt=""></figure>' : "") +
      o.body.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") +
      '</article></div>';
  }

  /* ---------- 아카이브 ---------- */
  function viewArchive() {
    if (!ARCHIVE_().length) return '<div class="page"><p class="eyebrow"><span>' + esc(t("archive")) + '</span></p><p class="empty">' + t("noArch") + '</p></div>';
    return '<div class="page">' +
      '<p class="eyebrow"><span>' + esc(t("archive")) + '</span><span>' + esc(t("archiveLead")) + '</span></p>' +
      '<div class="arch-grid">' + ARCHIVE_().map(function (a) {
        return '<article class="arch">' +
          (a.src ? '<figure class="frame" data-full="' + esc(resolve(a.src)) + '"><img src="' + esc(resolve(a.src)) + '" alt="" loading="lazy"></figure>' : "") +
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
    var cio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.style.transitionDelay = (Math.min(+e.target.dataset.n || 0, 5) * 70) + "ms";
        e.target.classList.add("up");
        cio.unobserve(e.target);
      });
    }, { rootMargin: "40px" });
    var items = document.querySelectorAll(".card, .arch, .post-row");
    if (items.length) main.classList.add("reveal");
    items.forEach(function (el, n) { el.dataset.n = n % 6; cio.observe(el); });
    /* 안전장치: 관찰이 어떤 이유로든 발동하지 않아도 내용이 숨겨진 채 남지 않도록 */
    setTimeout(function () {
      items.forEach(function (el) { el.classList.add("up"); });
    }, 1400);
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
    applyNavLang(); buildSub(); render(currentPath());
  });

  document.getElementById("yr").textContent = new Date().getFullYear();
  buildSub(); applyNavLang(); render(currentPath());

  /* 저장된 내용이 있으면 불러와 덮어쓰고 다시 그림. 실패하면 기본 내용 그대로 */
  if (window.Store && window.Store.on()) {
    window.Store.readAll().then(function (remote) {
      if (window.Store.apply(remote)) { S = window.SITE; render(currentPath()); }
    }).catch(function () {});
  }
})();
