/* ============================================================
   관리자 페이지 (/admin) — 사이트 내용을 직접 수정·추가
   ============================================================ */
window.Admin = (function () {
  "use strict";
  var S = window.Store;
  var draft = null;        /* 편집 중 사본 */
  var tab = "archive";
  var dirty = false;

  function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c];});}
  function el(id){return document.getElementById(id);}
  function toast(msg, bad){
    var t=el("adToast"); if(!t) return;
    t.textContent=msg; t.className="ad-toast show"+(bad?" bad":"");
    clearTimeout(t._h); t._h=setTimeout(function(){t.className="ad-toast";},2600);
  }
  function mark(){ dirty=true; var b=el("adSave"); if(b){b.disabled=false; b.textContent="저장하기";} }

  function snapshot(){
    return {
      site: JSON.parse(JSON.stringify(window.SITE)),
      works: JSON.parse(JSON.stringify(window.WORKS)),
      writings: JSON.parse(JSON.stringify(window.WRITINGS||[])),
      archive: JSON.parse(JSON.stringify(window.ARCHIVE||[]))
    };
  }

  /* ---------- 화면 ---------- */
  function view(){
    if(!S.on()) return setupScreen();
    if(!S.loggedIn()) return loginScreen();
    if(!draft) draft = snapshot();
    return '<div class="page ad">'+
      '<div class="ad-bar">'+
        '<span class="ad-title">관리자</span>'+
        '<nav class="ad-tabs">'+
          ['archive|아카이브','writings|글','works|작업','site|사이트'].map(function(x){
            var k=x.split("|")[0], n=x.split("|")[1];
            return '<button data-tab="'+k+'" class="'+(tab===k?"on":"")+'">'+n+'</button>';
          }).join("")+
        '</nav>'+
        '<span class="ad-actions">'+
          '<button id="adSave" disabled>저장됨</button>'+
          '<button id="adOut" class="ghost">로그아웃</button>'+
        '</span>'+
      '</div>'+
      '<div id="adBody" class="ad-body">'+panel()+'</div>'+
      '<div id="adToast" class="ad-toast"></div>'+
      '</div>';
  }

  function setupScreen(){
    return '<div class="page ad"><div class="ad-setup">'+
      '<h1>관리자 페이지 준비가 필요합니다</h1>'+
      '<p>글과 아카이브를 브라우저에서 바로 추가·수정하려면 Supabase 연결이 한 번 필요합니다. '+
      '아래 세 단계면 끝나고, 그다음부터는 이 페이지에서 전부 관리할 수 있습니다.</p>'+
      '<ol>'+
        '<li><b>프로젝트 만들기</b> — <a href="https://supabase.com/dashboard" target="_blank" rel="noopener">supabase.com/dashboard</a> 에서 새 프로젝트를 만듭니다.</li>'+
        '<li><b>표 만들기</b> — 프로젝트의 <i>SQL Editor</i> 에 아래 내용을 붙여넣고 실행합니다.'+
          '<pre id="adSql">'+esc(SQL)+'</pre>'+
          '<button class="ad-copy" data-copy="adSql">SQL 복사</button></li>'+
        '<li><b>주소와 키 넣기</b> — <i>Settings → API</i> 의 <code>Project URL</code> 과 <code>anon public</code> 키를 '+
          '<code>content/config.js</code> 에 넣고 사이트를 다시 올립니다.</li>'+
      '</ol>'+
      '<p class="ad-note">anon 키는 브라우저에 노출되는 게 정상입니다. 실제 보호는 위 SQL 의 RLS 규칙이 합니다 — '+
      '읽기는 누구나, 쓰기는 로그인한 사람만 가능합니다.</p>'+
      '</div></div>';
  }

  function loginScreen(){
    return '<div class="page ad"><form class="ad-login" id="adLogin">'+
      '<h1>관리자 로그인</h1>'+
      '<label>이메일<input type="email" id="adEmail" autocomplete="username" required></label>'+
      '<label>비밀번호<input type="password" id="adPw" autocomplete="current-password" required></label>'+
      '<button type="submit">로그인</button>'+
      '<p class="ad-note">Supabase 프로젝트의 <i>Authentication → Users</i> 에서 만든 계정으로 로그인합니다.</p>'+
      '<p class="ad-err" id="adErr"></p>'+
      '</form></div>';
  }

  /* ---------- 각 탭 ---------- */
  function panel(){
    if(tab==="archive")  return archivePanel();
    if(tab==="writings") return writingsPanel();
    if(tab==="works")    return worksPanel();
    return sitePanel();
  }

  function field(label, val, path, type){
    var v = esc(val==null?"":val);
    if(type==="area") return '<label class="ad-f"><span>'+esc(label)+'</span><textarea rows="4" data-path="'+path+'">'+v+'</textarea></label>';
    return '<label class="ad-f"><span>'+esc(label)+'</span><input value="'+v+'" data-path="'+path+'"></label>';
  }

  function archivePanel(){
    var a=draft.archive;
    return '<div class="ad-head"><h2>아카이브</h2><button class="ad-add" data-add="archive">+ 새 항목</button></div>'+
      (a.length?'':'<p class="ad-empty">아직 항목이 없습니다. 위 버튼으로 추가하세요.</p>')+
      a.map(function(x,i){
        return '<div class="ad-card">'+
          '<div class="ad-card-top"><b>'+esc(x.title||"(제목 없음)")+'</b>'+
            '<span><button class="ad-up" data-move="archive:'+i+':-1">↑</button>'+
            '<button class="ad-up" data-move="archive:'+i+':1">↓</button>'+
            '<button class="ad-del" data-del="archive:'+i+'">삭제</button></span></div>'+
          '<div class="ad-grid">'+
            '<label class="ad-f"><span>종류</span><select data-path="archive.'+i+'.kind">'+
              ["image","music","space","text","book"].map(function(k){
                var n={image:"사진",music:"음악",space:"공간",text:"글",book:"책"}[k];
                return '<option value="'+k+'"'+(x.kind===k?" selected":"")+'>'+n+'</option>';}).join("")+
            '</select></label>'+
            field("날짜", x.date, "archive."+i+".date")+
            field("제목", x.title, "archive."+i+".title")+
            field("링크 (선택)", x.url, "archive."+i+".url")+
          '</div>'+
          field("메모", x.note, "archive."+i+".note","area")+
          '<div class="ad-img">'+
            (x.src?'<img src="'+esc(x.src)+'" alt="">':'<span class="ad-noimg">사진 없음</span>')+
            '<input type="file" accept="image/*" data-up="archive.'+i+'.src">'+
          '</div>'+
        '</div>';
      }).join("");
  }

  function writingsPanel(){
    var a=draft.writings;
    return '<div class="ad-head"><h2>글</h2><button class="ad-add" data-add="writings">+ 새 글</button></div>'+
      (a.length?'':'<p class="ad-empty">아직 글이 없습니다.</p>')+
      a.map(function(x,i){
        return '<div class="ad-card">'+
          '<div class="ad-card-top"><b>'+esc(x.title||"(제목 없음)")+'</b>'+
            '<span><button class="ad-up" data-move="writings:'+i+':-1">↑</button>'+
            '<button class="ad-up" data-move="writings:'+i+':1">↓</button>'+
            '<button class="ad-del" data-del="writings:'+i+'">삭제</button></span></div>'+
          '<div class="ad-grid">'+
            field("주소용 이름 (영문)", x.slug, "writings."+i+".slug")+
            field("날짜", x.date, "writings."+i+".date")+
            field("분류", x.kind, "writings."+i+".kind")+
            field("제목", x.title, "writings."+i+".title")+
          '</div>'+
          field("한 줄 소개", x.lead, "writings."+i+".lead")+
          field("본문 (빈 줄로 문단 구분)", (x.body||[]).join("\n\n"), "writings."+i+".body#p","area")+
          '<div class="ad-img">'+
            (x.image?'<img src="'+esc(x.image)+'" alt="">':'<span class="ad-noimg">대표 사진 없음</span>')+
            '<input type="file" accept="image/*" data-up="writings.'+i+'.image">'+
          '</div>'+
        '</div>';
      }).join("");
  }

  function worksPanel(){
    return '<div class="ad-head"><h2>작업</h2><span class="ad-hint">사진 교체는 아래에서, 순서는 화살표로</span></div>'+
      draft.works.map(function(w,i){
        return '<div class="ad-card">'+
          '<div class="ad-card-top"><b>'+esc(w.title.ko)+'</b>'+
            '<span><button class="ad-up" data-move="works:'+i+':-1">↑</button>'+
            '<button class="ad-up" data-move="works:'+i+':1">↓</button></span></div>'+
          '<div class="ad-grid">'+
            field("제목 (한글)", w.title.ko, "works."+i+".title.ko")+
            field("제목 (영문)", w.title.en, "works."+i+".title.en")+
            field("연도", w.year, "works."+i+".year")+
            '<label class="ad-f"><span>분류</span><select data-path="works.'+i+'.category">'+
              (window.SITE.categories||[]).map(function(c){
                return '<option value="'+c.key+'"'+(w.category===c.key?" selected":"")+'>'+esc(c.ko)+'</option>';}).join("")+
            '</select></label>'+
          '</div>'+
          field("캡션 (한글)", w.caption&&w.caption.ko, "works."+i+".caption.ko","area")+
          field("작업 노트 (빈 줄로 문단 구분)", (w.body||[]).join("\n\n"), "works."+i+".body#p","area")+
          '<div class="ad-thumbs">'+(w.images||[]).map(function(src,j){
              var u = /^https?:|^data:/.test(src) ? src : "/images/works/"+src;
              return '<span class="ad-th"><img src="'+esc(u)+'" alt="">'+
                     '<button data-imgdel="'+i+':'+j+'">×</button></span>';}).join("")+
            '<label class="ad-th add">+<input type="file" accept="image/*" data-up="works.'+i+'.images#push"></label>'+
          '</div>'+
        '</div>';
      }).join("");
  }

  function sitePanel(){
    var s=draft.site;
    return '<div class="ad-head"><h2>사이트</h2></div><div class="ad-card">'+
      field("모토 (한글)", s.motto.ko, "site.motto.ko","area")+
      field("모토 (영문)", s.motto.en, "site.motto.en","area")+
      field("소개 한 줄 (한글)", s.tagline.ko, "site.tagline.ko","area")+
      '<div class="ad-grid">'+
        field("이메일", s.contact.email, "site.contact.email")+
        field("전화", s.contact.phone, "site.contact.phone")+
        field("인스타그램 주소", s.contact.instagram, "site.contact.instagram")+
      '</div>'+
      field("소개 본문 (빈 줄로 문단 구분)", (s.about||[]).join("\n\n"), "site.about#p","area")+
      '</div>';
  }

  /* ---------- 값 쓰기 ---------- */
  function setPath(path, value){
    var push = /#push$/.test(path); path = path.replace(/#push$/,"");
    var para = /#p$/.test(path);    path = path.replace(/#p$/,"");
    var parts = path.split("."), o = draft;
    for (var i=0;i<parts.length-1;i++){
      var k = parts[i]; if (/^\d+$/.test(k)) k = +k;
      if (o[k]==null) o[k] = /^\d+$/.test(parts[i+1]) ? [] : {};
      o = o[k];
    }
    var last = parts[parts.length-1]; if (/^\d+$/.test(last)) last = +last;
    if (push) { if(!Array.isArray(o[last])) o[last]=[]; o[last].push(value); }
    else if (para) { o[last] = String(value).split(/\n{2,}/).map(function(x){return x.trim();}).filter(Boolean); }
    else o[last] = value;
    mark();
  }

  /* ---------- 이벤트 ---------- */
  function bind(){
    var root = document.querySelector(".ad"); if(!root) return;

    var lf = el("adLogin");
    if (lf) {
      lf.addEventListener("submit", async function(e){
        e.preventDefault();
        var b=lf.querySelector("button"); b.disabled=true; b.textContent="확인 중…";
        try { await S.login(el("adEmail").value.trim(), el("adPw").value); location.reload(); }
        catch(err){ el("adErr").textContent = err.message; b.disabled=false; b.textContent="로그인"; }
      });
      return;
    }

    root.addEventListener("click", async function(e){
      var t = e.target;
      if (t.dataset.copy){ var pre=el(t.dataset.copy);
        try{ await navigator.clipboard.writeText(pre.textContent); toast("복사했습니다"); }catch(_){ toast("복사 실패 — 직접 선택해 주세요", true);} return; }
      if (t.dataset.tab){ tab=t.dataset.tab; el("adBody").innerHTML=panel(); paint(); return; }
      if (t.id==="adOut"){ S.logout(); location.reload(); return; }
      if (t.id==="adSave"){ doSave(); return; }
      if (t.dataset.add){
        var k=t.dataset.add;
        draft[k].unshift(k==="archive"
          ? {kind:"image",date:"",title:"",note:"",url:"",src:""}
          : {slug:"post-"+Date.now().toString(36),date:"",kind:"에세이",title:"",lead:"",image:"",body:[]});
        mark(); el("adBody").innerHTML=panel(); paint(); return;
      }
      if (t.dataset.del){
        var p=t.dataset.del.split(":");
        if(!confirm("정말 삭제할까요? 저장을 누르기 전까지는 되돌릴 수 있습니다.")) return;
        draft[p[0]].splice(+p[1],1); mark(); el("adBody").innerHTML=panel(); paint(); return;
      }
      if (t.dataset.move){
        var m=t.dataset.move.split(":"), arr=draft[m[0]], i=+m[1], j=i+ +m[2];
        if(j<0||j>=arr.length) return;
        arr.splice(j,0,arr.splice(i,1)[0]); mark(); el("adBody").innerHTML=panel(); paint(); return;
      }
      if (t.dataset.imgdel){
        var q=t.dataset.imgdel.split(":");
        draft.works[+q[0]].images.splice(+q[1],1); mark(); el("adBody").innerHTML=panel(); paint(); return;
      }
    });

    root.addEventListener("input", function(e){
      var p=e.target.dataset.path; if(p) setPath(p, e.target.value);
    });
    root.addEventListener("change", async function(e){
      var up=e.target.dataset.up; if(!up) return;
      var f=e.target.files && e.target.files[0]; if(!f) return;
      toast("사진 올리는 중…");
      try { var url = await S.upload(f); setPath(up, url); el("adBody").innerHTML=panel(); paint(); toast("사진을 올렸습니다"); }
      catch(err){ toast(err.message, true); }
    });

    window.addEventListener("beforeunload", function(e){
      if(dirty){ e.preventDefault(); e.returnValue=""; }
    });
  }
  function paint(){ /* 탭 버튼 상태 */
    document.querySelectorAll(".ad-tabs button").forEach(function(b){
      b.classList.toggle("on", b.dataset.tab===tab);
    });
  }

  async function doSave(){
    var b=el("adSave"); b.disabled=true; b.textContent="저장 중…";
    try{
      await S.save("site", draft.site);
      await S.save("works", draft.works);
      await S.save("writings", draft.writings);
      await S.save("archive", draft.archive);
      dirty=false; b.textContent="저장됨";
      toast("저장했습니다. 사이트에 바로 반영됩니다.");
    }catch(err){ b.disabled=false; b.textContent="다시 저장"; toast(err.message, true); }
  }

  var SQL = [
    "create table if not exists content (",
    "  key text primary key,",
    "  data jsonb not null,",
    "  updated_at timestamptz default now()",
    ");",
    "alter table content enable row level security;",
    "create policy \"누구나 읽기\"      on content for select using (true);",
    "create policy \"로그인 사용자 쓰기\" on content for insert with check (auth.role() = 'authenticated');",
    "create policy \"로그인 사용자 수정\" on content for update using (auth.role() = 'authenticated');",
    "",
    "insert into storage.buckets (id, name, public)",
    "values ('media','media',true) on conflict (id) do nothing;",
    "create policy \"사진 공개 읽기\"    on storage.objects for select using (bucket_id = 'media');",
    "create policy \"로그인 사진 업로드\" on storage.objects for insert",
    "  with check (bucket_id = 'media' and auth.role() = 'authenticated');"
  ].join("\n");

  return { view: view, bind: bind, reset: function(){ draft=null; dirty=false; } };
})();
