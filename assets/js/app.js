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
  var lang = (function(){ try { var v = localStorage.getItem("yb-lang"); if (v === "ko" || v === "en") return v; } catch(e) {} return "en"; })();

  var T = {
    ko: {
      works: "작업", about: "소개", writing: "글", archive: "아카이브", contact: "연락",
      all: "전체", selected: "선택 작업", index: "목차",
      allWorks: "모든 작업 보기", readMore: "더 읽기",
      aboutLead: "어떤 모토로, 어떤 작업을 하는 사람인가",
      writingLead: "직접 쓴 글을 모아둔 곳",
      archiveLead: "사진 · 음악 · 공간 · 글 · 책 — 영감이 된 것들",
      description: "작업 노트", info: "정보", year: "연도", medium: "재료", role: "역할", link: "링크",
      tools: "툴", brief: "개요", madeFor: "누구를 위해", concept: "컨셉", process: "과정", work: "작업", spreads: "목업", motion: "모션",
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
      description: "Work note", info: "Info", year: "Year", medium: "Medium", role: "Role", link: "Link",
      tools: "Tools", brief: "Brief", madeFor: "Made for", concept: "Concept", process: "Process", work: "Work", spreads: "Mockups", motion: "Motion",
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
  /* 글·아카이브처럼 한 덩어리에 en 하위 객체를 둔 항목에서 언어에 맞는 값을 고른다 */
  function P(o, k) { return (lang === "en" && o.en && o.en[k]) ? o.en[k] : o[k]; }
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

    if (stageTimer && stageTimer.stop) { stageTimer.stop(); }
    stageTimer = null;
    main.innerHTML = html;
    markNav(seg[0] || "home", seg[1] || "");
    reveal();
    if (p === "/") startStage();
    if (seg[0] === "admin" && window.Admin) window.Admin.bind();
    bindProcess();
    var base = lang === "en" ? "Yea Bin Shin" : "신예빈";
    var tt = titleFor(seg);
    document.title = (tt && tt !== base) ? tt + " · " + base : base + " · " + (lang === "en" ? "Portfolio" : "포트폴리오");
  }

  function titleFor(seg) {
    if (!seg[0]) return lang === "en" ? "Yea Bin Shin" : "신예빈";
    if (seg[0] === "work") { var w = find(seg[1]); return w ? L(w.title) : t("works"); }
    if (seg[0] === "admin") return "관리자";
    if (seg[0] === "writing" && seg[1]) { var o = WRITINGS_().filter(function (x) { return x.slug === seg[1]; })[0]; return o ? P(o, "title") : t("writing"); }
    return t(seg[0] === "works" ? "works" : seg[0]) || "";
  }
  function find(slug) { return WORKS_().filter(function (w) { return w.slug === slug; })[0]; }

  /* ---------- 홈: 흩어진 콜라주 ---------- */
  var COLLAGE = ["beyond-the-block", "kitty-bunny-pony", "garamond", "homemade-printmaking", "my-garden", "residue"];
  var DEPTH = [14, -22, 10, -16, 20, -26];   /* 마우스 패럴랙스 깊이 */
  var stageTimer = null;

  function viewHome() {
    var picks = COLLAGE.map(find).filter(Boolean);
    var words = ["감정의 흔적", "printmaking", "언어 너머", "editorial", "잔류", "graphic design",
                 "손의 궤적", "artist book", "아카이브"];
    return '<div class="page">' +
      '<section class="collage" id="collage"><div class="cl-stage" id="clStage">' +
      picks.map(function (w, i) {
        return '<a class="cl-fig cl-' + (i + 1) + '" href="/work/' + w.slug + '" data-link data-d="' + DEPTH[i] + '">' +
          '<img src="' + img(w, w.cover || w.images[0]) + '" alt="' + esc(L(w.title)) + '" ' + (i > 1 ? 'loading="lazy"' : '') + '>' +
          '<span class="cl-cap">' + esc(L(w.title)) + ' — ' + esc(w.year) + '</span></a>';
      }).join("") + '</div>' +
      '<div class="cl-meta">' +
      '<h1 class="cl-name">' + esc(S.name.en.toLowerCase()) + (lang === "en" ? "" : '<small>' + esc(S.name.ko) + '</small>') + '</h1>' +
      '<p class="cl-idx">' + WORKS_().length + ' works<br>' + S.categories.length + ' categories</p>' +
      '<p class="cl-motto">' + esc(L(S.motto)) + '</p>' +
      '<p class="cl-role">' + esc(L(S.role)) + '</p>' +
      '</div></section>' +

      '<div class="marquee"><div>' +
      [0, 1].map(function () {
        return words.map(function (w, i) {
          return '<span>' + esc(w) + (i % 3 === 1 ? ' <i>◦</i>' : ' ·') + '</span>';
        }).join("");
      }).join("") + '</div></div>' +

      '<section class="home-sec">' +
      '<div class="sec-head"><h2>' + esc(t("selected")) + '</h2><span>' + WORKS_().length + ' works</span></div>' +
      '<div class="grid">' + ["beyond-the-block","kitty-bunny-pony","garamond","my-garden"].map(find).filter(Boolean).map(cardHTML).join("") + '</div>' +
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
    var figs = [].slice.call(document.querySelectorAll('.cl-fig'));
    if (!figs.length) return;
    /* 순차 등장 */
    figs.forEach(function (f, i) {
      setTimeout(function () {
        f.classList.add('in');
        /* 등장이 끝나면 transform 트랜지션을 떼어내 패럴랙스가 끌리지 않게 */
        setTimeout(function () { f.classList.add('ready'); }, 1200);
      }, 120 + i * 130);
    });
    /* 마우스 패럴랙스 (데스크톱, 모션 축소 설정이면 생략) */
    var box = document.getElementById('collage');
    if (!box || window.matchMedia('(pointer:coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
    function loop() {
      cx += (tx - cx) * .06; cy += (ty - cy) * .06;
      figs.forEach(function (f) {
        var d = +f.dataset.d || 0;
        f.style.transform = 'translate3d(' + (cx * d / 100) + 'px,' + (cy * d / 100) + 'px,0)';
      });
      raf = requestAnimationFrame(loop);
    }
    box.addEventListener('mousemove', function (e) {
      var r = box.getBoundingClientRect();
      tx = (e.clientX - r.left - r.width / 2); ty = (e.clientY - r.top - r.height / 2);
      if (!raf) loop();
    });
    box.addEventListener('mouseleave', function () { tx = 0; ty = 0; });
    stageTimer = { stop: function () { if (raf) cancelAnimationFrame(raf); } };
  }

  /* ---------- 작업 목록 ---------- */
  function cardHTML(w, i) {
    return '<a class="card" href="/work/' + w.slug + '" data-link>' +
      '<span class="frame">' + ((w.cover || (w.images && w.images[0])) ? '<img src="' + img(w, w.cover || w.images[0]) + '" alt="' + esc(L(w.title)) + '" loading="lazy">' : '<span class="noimg"></span>') + '</span>' +
      '<span class="meta"><span class="no">' + String((i || 0) + 1).padStart(2, "0") + '</span>' +
      '<h3>' + (lang === "en" ? esc(w.title.en) : esc(w.title.ko) + '<span class="en">' + esc(w.title.en) + '</span>') + '</h3></span>' +
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
      '<h1>' + (lang === "en" ? esc(w.title.en) : esc(w.title.ko) + '<span class="en">' + esc(w.title.en) + '</span>') + '</h1>' +
      '<div class="detail-side">' +
      row(t("year"), esc(w.year)) +
      row(t("role"), esc(L(w.role))) +
      (w.tools ? row(t("tools"), esc(w.tools)) : "") +
      row(t("medium"), esc(L(w.caption))) +
      (w.link ? row(t("link"), '<a href="' + esc(w.link.url) + '" target="_blank" rel="noopener">' + esc(w.link.label) + ' &nearr;</a>') : "") +
      '</div></div>' +

      (w.images && w.images.length ?
        (w.gallery === "slider"
          ? railHTML(w, w.images.map(function (f) { return { src: f }; }),
                      (w.imagesLabel && L(w.imagesLabel)) || t("work"), true)
          : '<div class="figs">' + w.images.map(function (f) {
              return '<figure class="fig" data-full="' + img(w, f) + '"><img src="' + img(w, f) + '" alt="' + esc(L(w.title)) + '" loading="lazy"></figure>';
            }).join("") + '</div>')
        : "") +

      (w.video ?
        '<section class="vid"><p class="label">' + esc(t("motion")) +
          (w.videoNote ? '<span class="credit">' + esc(L(w.videoNote)) + '</span>' : "") + '</p>' +
        '<video src="' + img(w, w.video) + '"' + (w.videoPoster ? ' poster="' + img(w, w.videoPoster) + '"' : "") +
          ' controls loop muted playsinline preload="metadata"></video></section>' : "") +

      (w.spreads && w.spreads.length
        ? railHTML(w, w.spreads.map(function (f) { return { src: f }; }),
                   (w.spreadsLabel && L(w.spreadsLabel)) || t("spreads"), true) : "") +

      (w.process && w.process.length ? processHTML(w) : "") +

      ((w.audience && L(w.audience)) || (w.concept && L(w.concept)) ?
        '<div class="body-wrap brief">' +
        '<p class="label">' + esc(t("brief")) + '</p>' +
        '<div class="body-text">' +
        (w.audience && L(w.audience) ? '<p class="bf"><span>' + esc(t("madeFor")) + '</span>' + esc(L(w.audience)) + '</p>' : "") +
        (w.concept && L(w.concept) ? '<p class="bf"><span>' + esc(t("concept")) + '</span>' + esc(L(w.concept)) + '</p>' : "") +
        '</div></div>' : "") +

      '<div class="body-wrap">' +
      '<p class="label">' + esc(t("description")) + '</p>' +
      '<div class="body-text">' + bodyOf(w).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + '</div>' +
      '</div>' +

      '<nav class="pager">' +
      (prev ? '<a href="/work/' + prev.slug + '" data-link>&larr; ' + esc(L(prev.title)) + '</a>' : "<span></span>") +
      (next ? '<a href="/work/' + next.slug + '" data-link style="text-align:right">' + esc(L(next.title)) + ' &rarr;</a>' : "<span></span>") +
      '</nav></div>';
  }
  function railHTML(w, items, label, full, note) {
    return '<section class="proc' + (full ? ' proc--full' : '') + '" data-proc>' +
      '<div class="proc-top">' +
        '<p class="label">' + esc(label) + (note ? '<span class="credit">' + esc(note) + '</span>' : "") + '</p>' +
        '<div class="proc-nav">' +
          '<span class="proc-count"><b>1</b> / ' + items.length + '</span>' +
          '<button class="proc-btn" data-dir="-1" aria-label="prev">&larr;</button>' +
          '<button class="proc-btn" data-dir="1" aria-label="next">&rarr;</button>' +
        '</div>' +
      '</div>' +
      '<div class="proc-rail">' + items.map(function (x) {
        var cap = lang === "en" ? (x.en || x.ko) : (x.ko || x.en);
        return '<figure class="proc-item" data-full="' + img(w, x.src) + '">' +
          '<span class="proc-frame"><img src="' + img(w, x.src) + '" alt="" loading="lazy"></span>' +
          (cap ? '<figcaption>' + esc(cap) + '</figcaption>' : "") + '</figure>';
      }).join("") + '</div></section>';
  }

  function processHTML(w) { return railHTML(w, w.process, t("process"), false, w.processNote && L(w.processNote)); }

  function bindProcess() {
    document.querySelectorAll("[data-proc]").forEach(function (sec) {
      var rail = sec.querySelector(".proc-rail");
      var count = sec.querySelector(".proc-count b");
      var items = sec.querySelectorAll(".proc-item");
      var idx = 0, timer = null, lockUntil = 0;
      function step() { return items.length ? items[0].getBoundingClientRect().width + 14 : rail.clientWidth; }
      function maxIdx() { return Math.max(0, Math.round((rail.scrollWidth - rail.clientWidth) / step())); }
      function paint() {
        count.textContent = Math.min(idx + 1, items.length);
        sec.querySelectorAll(".proc-btn").forEach(function (b) {
          var d = +b.dataset.dir;
          b.disabled = (d < 0 && idx <= 0) || (d > 0 && idx >= maxIdx());
        });
      }
      /* 목표 인덱스를 따로 들고 간다. scrollBy 로 하면 애니메이션 중에 누른 클릭이 묻힌다. */
      function go(d) {
        idx = Math.min(Math.max(idx + d, 0), maxIdx());
        lockUntil = Date.now() + 700;   /* 부드러운 스크롤이 끝나기 전에 되맞추지 않는다 */
        rail.scrollTo({ left: idx * step(), behavior: "smooth" });
        paint();
      }
      sec.querySelectorAll(".proc-btn").forEach(function (b) {
        b.addEventListener("click", function () { go(+b.dataset.dir); });
      });
      rail.addEventListener("scroll", function () {   /* 손으로 밀었을 때만 되맞춘다 */
        clearTimeout(timer);
        timer = setTimeout(function () {
          if (Date.now() < lockUntil) return;
          idx = Math.min(Math.max(Math.round(rail.scrollLeft / step()), 0), maxIdx());
          paint();
        }, 140);
      }, { passive: true });
      window.addEventListener("resize", paint);
      paint();
    });
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
          '<span><h3>' + esc(P(o, "title")) + '</h3>' + (P(o, "lead") ? '<p class="lead">' + esc(P(o, "lead")) + '</p>' : "") + '</span>' +
          '<span class="k">' + esc(P(o, "kind") || "") + '</span></a>';
      }).join("") + '</div></div>';
  }
  function viewPost(slug) {
    var o = WRITINGS_().filter(function (x) { return x.slug === slug; })[0];
    if (!o) return '<div class="page"><p class="empty">' + t("notFound") + '</p></div>';
    return '<div class="page">' +
      '<p class="eyebrow"><span><a href="/writing" data-link>&larr; ' + esc(t("writing")) + '</a></span><span>' + esc(P(o, "kind") || "") + '</span></p>' +
      '<article class="article"><p class="d">' + esc(o.date) + '</p><h1>' + esc(P(o, "title")) + '</h1>' +
      (o.image ? '<figure class="fig"><img src="' + esc(resolve(o.image)) + '" alt=""></figure>' : "") +
      P(o, "body").map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") +
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
          '<h3>' + esc(P(a, "title")) + '</h3>' +
          (P(a, "note") ? '<p>' + esc(P(a, "note")) + '</p>' : "") +
          (a.url ? '<a class="lnk" href="' + esc(a.url) + '" target="_blank" rel="noopener">listen / open &nearr;</a>' : "") +
          (a.date ? '<p class="dt">' + esc(a.date) + '</p>' : "") +
          '</article>';
      }).join("") + '</div></div>';
  }

  /* ---------- 연락 ---------- */
  function viewContact() {
    var c = S.contact;
    function L2(o, k) { var v = o[k]; return (v && typeof v === "object") ? (v[lang] || v.ko || v.en) : v; }
    return '<div class="page"><p class="eyebrow"><span>' + esc(t("contact")) + '</span><span>' + esc(L(S.name)) + '</span></p>' +
      '<div class="contact-wrap"><h1>' + esc(L(S.motto)).replace(/\n/g, " ") + '</h1>' +
      '<div class="contact-row"><span class="k">EMAIL</span><a href="mailto:' + esc(c.email) + '">' + esc(c.email) + '</a></div>' +
      (L2(c, "phone") ? '<div class="contact-row"><span class="k">PHONE</span><span>' + esc(L2(c, "phone")) + '</span></div>' : "") +
      (c.instagram ? '<div class="contact-row"><span class="k">INSTAGRAM</span><a href="' + esc(c.instagram) + '" target="_blank" rel="noopener">@' + esc(c.instagram.split("/").filter(Boolean).pop()) + '</a></div>' : "") +
      '<div class="contact-row"><span class="k">BASED IN</span><span>' + esc(L2(c, "basedIn") || "Seoul") + '</span></div>' +
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
