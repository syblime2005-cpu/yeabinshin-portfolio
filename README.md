# 신예빈 · YEA BIN SHIN — Portfolio

정적 사이트입니다. 빌드 도구도, 설치할 것도 없습니다.
HTML/CSS/JS 파일과 이미지뿐이라 `content/` 안의 파일만 고치면 사이트가 바뀝니다.

---

## 미리보기 (내 컴퓨터에서 보기)

터미널에서:

```bash
python3 preview.py
```

그 다음 브라우저에서 <http://localhost:4321> 을 엽니다. (끄려면 터미널에서 `Ctrl + C`)

---

## 내용 고치는 법

| 무엇을 | 어디를 |
|---|---|
| 이름, 모토, 소개글, 이력, 연락처 | `content/site.js` |
| 작업 (제목·캡션·설명·사진) | `content/works.js` |
| 작업 설명의 영문 번역 | `content/works.en.js` |
| 직접 쓴 글 | `content/writings.js` |
| 영감 아카이브 (사진·음악·공간·글·책) | `content/archive.js` |
| 색·글씨·여백 | `assets/css/style.css` |

각 파일 맨 위에 한글 설명이 달려 있습니다.
**주의 한 가지**: 항목과 항목 사이에는 반드시 쉼표 `,` 가 있어야 하고, 맨 마지막 항목 뒤에는 없어야 합니다.

### 사진 추가하기

* 작업 사진 → `images/works/` 에 넣고, `works.js` 의 `images: [...]` 에 파일 이름을 적습니다.
* 아카이브 사진 → `images/archive/` 에 넣고, `archive.js` 의 `src: "/images/archive/파일이름.jpg"` 로 적습니다.

모든 사진은 **16:9 비율**로 잘려서 보입니다. 원본이 16:9가 아니면 가운데를 기준으로 잘립니다.
지금 들어 있는 작업 사진들은 포트폴리오 PDF의 각 페이지(1920×1080)에서 **설명 글자를 지우고** 뽑아낸 것이라 이미 전부 16:9 입니다.

### 새 작업 하나 추가하는 예

`content/works.js` 를 열고, 비슷한 작업 하나를 통째로 복사한 뒤 이렇게 고칩니다.

```js
{
  slug: "new-work",              // 주소에 쓰이는 영문 이름 (겹치지 않게)
  category: "design",            // design / fineart / project / exhibition
  year: "2026",
  title: { ko: "한글 제목", en: "English Title" },
  role:  { ko: "무슨 수업, 무슨 역할", en: "Course, role" },
  caption: { ko: "2026, 재료, 크기 …", en: "2026, medium, size …" },   // 목록에 작게 보이는 줄
  cover: "p04.jpg",              // 목록 대표 사진
  images: ["p04.jpg", "p05.jpg"],
  body: [                        // 클릭해서 들어가야 보이는 설명
    "첫 문단.",
    "둘째 문단."
  ]
}
```

---

## 구조

```
index.html            껍데기 (메뉴 · 폰트)
assets/css/style.css  전체 디자인
assets/js/app.js      화면 그리기 · 주소 이동
content/*.js          내용 (여기만 고치면 됩니다)
images/works/         작업 사진 (16:9)
images/archive/       아카이브 사진
vercel.json           Vercel 주소 설정
preview.py            로컬 미리보기 서버
```

## 페이지

`/` 첫 화면 · `/about` 소개 · `/works` 작업 (카테고리별) · `/work/<slug>` 작업 상세
`/writing` 글 · `/archive` 아카이브 · `/contact` 연락

한국어 / 영어는 왼쪽 아래 **KO / EN** 으로 전환됩니다.

---

## 배포

GitHub 에 올리고 Vercel 에 연결해두면, 앞으로는 파일을 고쳐서 push 하기만 하면 사이트가 자동으로 갱신됩니다.

```bash
git add -A
git commit -m "작업 추가"
git push
```
