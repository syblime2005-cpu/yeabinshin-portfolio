/* =============================================================
   작업 데이터 — 여기만 고치면 사이트가 바뀝니다.
   - category: 'design' | 'fineart' | 'project' | 'exhibition'
   - caption : 목록에서 사진 밑에 작게 보이는 한 줄 (재료·크기·연도)
   - body    : 작업을 클릭해서 들어갔을 때만 보이는 설명 (문단 배열)
   - images  : /images/works/ 안의 파일 이름 (모두 16:9)
   ============================================================= */

window.WORKS = [
  /* ---------------- DESIGN ---------------- */
  {
    slug: "garamond",
    tools: "InDesign · Illustrator · Photoshop",
    audience: { ko: "서체를 처음 분석해보는 학생과, 가라몬드를 실제로 골라 쓰게 될 디자이너", en: "Students analysing a typeface for the first time, and designers who will actually set in Garamond" },
    concept: { ko: "기계 설계 이전, 펜을 쥔 손의 궤적에서 이 서체가 나왔다는 점에서 출발했습니다. 112쪽이라는 분량과 180도로 펼쳐지는 제본은 복잡한 도판을 편하게 들여다보게 하려는 선택이었습니다.", en: "It starts from the fact that this letterform came from a hand holding a pen, before mechanical drafting. The 112 pages and the binding that opens fully flat exist so dense plates can be read without fighting the book." },
    category: "design",
    year: "2026",
    title: { ko: "가라몬드, 손의 궤적", en: "Garamond: Tracing the Origin of the Humanistic Type through the Trajectory of the Hand" },
    role: { ko: "타이포그라피 (2) 수업 · 서체 분석 및 글꼴 분류집", en: "Typography II · Typeface research & specimen book" },
    caption: {
      ko: "2026, 148×210mm, 112p, 누드 제본, 표지: 검정 하드보드지 위에 몽블랑 EW 240g, 내지: 몽블랑 EW 130g, 사용 서체: Pretendard & Garamond",
      en: "2026, 148×210mm, 112p, nude binding, cover: Montblanc EW 240g on black board, text: Montblanc EW 130g, typefaces: Pretendard & Garamond"
    },
    cover: "p04.jpg",
    images: [],
    video: "garamond-type.mp4",
    videoPoster: "garamond-type-poster.jpg",
    videoNote: { ko: "타이포그래피 모션 · 25초 무음 루프", en: "Typographic motion · 25 s, silent, looping" },
    spreadsLabel: { ko: "지면", en: "Spreads" },
    spreads: ["grm-02.jpg", "p05.jpg", "p06.jpg", "p07.jpg", "p08.jpg", "p09.jpg", "p10.jpg"],
    body: [
      "본 작업은 타이포그라피 수업의 일환으로 진행된 가라몬드 서체 분석 및 글꼴분류집 제작 프로젝트입니다. 기계적 설계 이전 인간이 펜을 쥐고 써 내려간 손의 궤적에서 이 서체가 비롯되었다는 점에서 출발했습니다.",
      "알파벳과 숫자, 문장부호를 모눈종이 위에 하나하나 배치하여 그리드와 비례를 기준으로 구조를 세밀하게 뜯어보며 분석했고, 르네상스라는 시대적 배경 속에서 인쇄 기술과 필기 도구가 글자 형태에 미친 영향을 추적했으며 착시를 보정하기 위해 적용된 미묘한 곡선과 획의 굵기 대비 등 서체 이면의 시각적 원리들까지 살펴보았습니다.",
      "이 글자가 어떠한 이유로 지금의 형태가 되었는지를 탐구하는 과정에서 ‘손의 그래픽’이라는 모티브를 도출하였고, 이를 바탕으로 펜을 쥔 손의 실루엣을 글자와 함께 배치하는 그래픽을 표현했습니다.",
      "100쪽이 넘는 분량은 오랜 시간 고전적 서체로 자리매김해 온 가라몬드가 지닌 무게감과 그 역사가 요구하는 책임감을 온전히 담아내고자 하는 선택이었습니다. 무선 누드 제본으로 마감해 책이 180도로 완전히 펼쳐지도록 만들어 복잡한 도판과 분석 데이터를 편안하게 감상할 수 있도록 하였습니다."
    ]
  },
  {
    slug: "my-garden",
    tools: "InDesign · Photoshop · Illustrator",
    audience: { ko: "앨범을 들으며 자기 상처를 지나쳐온 사람들", en: "Listeners who have walked past their own wounds" },
    concept: { ko: "상처를 숨겨야 할 것이 아니라 내면의 정원을 이루는 재료로 보았습니다. 다섯 트랙을 각기 다른 신체 부위에 대응시키고, 트랙마다 상처 관찰일지를 넣어 ‘관찰하는 태도’ 자체를 시각 장치로 만들었습니다.", en: "Wounds treated not as something to hide but as the most honest material a garden could be built from. Five tracks mapped to five parts of the body, each with an observation log so the act of looking becomes the visual device." },
    category: "design",
    year: "2026",
    title: { ko: "나의 정원에게", en: "To My Garden" },
    role: { ko: "커뮤니케이션디자인 (1) 수업 · 다섯 곡 기획, 앨범 디자인", en: "Communication Design I · Album concept & design" },
    caption: {
      ko: "2026, 160×160mm, 48p, 실 제본, 쉽스킨 겉표지, 하드보드지 위에 랑데뷰 210g, 내지: 랑데뷰 120g, 사용 서체: Leviathan",
      en: "2026, 160×160mm, 48p, thread binding, sheepskin jacket, Rendezvous 210g on board, text: Rendezvous 120g, typeface: Leviathan"
    },
    cover: "mg-cover.jpg",
    gallery: "slider",
    imagesLabel: { ko: "실물", en: "The book" },
    images: ["mg-01.jpg", "mg-02.jpg"],
    spreadsLabel: { ko: "지면", en: "Spreads" },
    spreads: ["mg-03.jpg", "mg-04.jpg", "mg-05.jpg", "mg-06.jpg", "p14.jpg"],
    body: [
      "본 프로젝트는 커뮤니케이션 디자인 수업의 일환으로 진행된 앨범 기획 및 비주얼 아이덴티티 작업입니다. 〈나의 정원에게〉는 일상 속에서 필연적으로 마주하게 되는 내면의 상처와 아픔을 외면하지 않고, 이를 나만의 안식처로 전환해 나가는 과정을 시각화한 작업입니다. 앨범을 듣는 이들 또한 이 흐름을 따라 각자의 정원에 도달하기를 바라는 마음으로 기획을 시작했습니다.",
      "앨범에서 말하는 ‘정원’은 스스로 관찰하고 가꾸어낸 안식의 공간을 의미합니다. 내면의 정원을 일구는 행위는 개인이 자신의 상처와 결핍을 어떻게 마주하고 이해하는지를 보여줍니다. 흔히 상처나 결핍은 숨겨야 할 치부로 여겨지지만, 저는 오히려 눈에 가장 직관적으로 드러나는 신체의 상처와 흔적을 내면의 정원을 구성하는 가장 솔직한 재료로 바라보고자 했습니다.",
      "앨범은 총 5개의 트랙으로 구성했으며, 디자인 과정에서 가장 중점을 둔 것은 ‘상처’를 시각적 소재로 끌어오는 방식이었습니다. 5개의 트랙을 각기 다른 신체 부위와 수록곡의 서사에 대응시켰습니다. 또한 트랙마다 ‘상처 관찰일지’ 페이지를 삽입해 상처를 관찰하고 기록하는 태도 자체를 하나의 시각적 장치로 구축하는 데 집중했습니다. 이를 통해 감정을 서정적으로 나열하기보다, 상처가 정원으로 전환되는 흐름을 설계하는 데 공을 들였습니다."
    ]
  },
  {
    slug: "residue",
    tools: "Photoshop · Illustrator · 혼합 매체",
    category: "design",
    year: "2026",
    title: { ko: "잔류하다", en: "Residue" },
    role: { ko: "커뮤니케이션디자인 (1) 수업 · 백 가지 이미지 수집, 포스터 디자인", en: "Communication Design I · Poster" },
    caption: {
      ko: "‘프레임이 만든 분할된 대지에서 뮤트톤이 사용된 입자감 있는 조밀한 텍스트가 잔류한다’ — 2026, Poster Design, 420×594mm, 무광 종이",
      en: "2026, Poster Design, 420×594mm, matte paper"
    },
    cover: "p15.jpg",
    images: ["p15.jpg", "p16.jpg"],
    body: [
      "본 포스터는 세 가지 핵심 키워드를 기반으로 ‘프레임이 만든 분할된 대지에서 뮤트톤이 사용된 입자감 있는 조밀한 텍스트가 잔류한다’는 문장을 시각화한 작업입니다. 단순히 뒤에 남겨진 상태를 넘어 여운을 머금은 채 자리에 머무는 ‘잔류’의 의미를 작업의 출발점으로 삼았습니다.",
      "직접 제작한 기준 이미지 위에 코랄빛 레이어를 중첩하고 화이트톤으로 정돈하여 시간이 흐르며 색이 바래진 듯한 뮤트톤의 화면을 연출했습니다. 이러한 시각적 자극의 절제는 관객의 시선을 조밀한 입자감에 집중시키며 ‘오랜 시간 그 자리에 머무른 흔적’이라는 개념을 뒷받침합니다.",
      "텍스트 표현에서는 거친 질감의 종이 위에 오일 파스텔로 직접 글씨를 작성하여 선이 부스스하게 남는 수작업의 특성을 적극적으로 활용했습니다. 핵심 단어의 마지막 스펠링 ‘S’를 아래로 길게 늘어뜨려 여운을 더하고 글자들을 일정한 틀 안에서 미묘하게 어긋나도록 배치하여 흐름에서 벗어난 잔류의 상태를 시각화했습니다.",
      "여기에 발생하는 순간 사라지지만 파동의 형태로 에너지를 남기는 잔물결 이미지를 부드럽게 정제하여 중첩함으로써 전체 작업이 전달하고자 하는 ‘머무름의 정서’를 더욱 견고하게 구축했습니다.",
      "기준 이미지는 파스텔, 화이트 마커, 펄 마커, 화이트 펜, 아크릴, 면봉, 수채화 등 다양한 아날로그 재료로 세 가지 키워드를 시각화한 뒤 고해상도로 스캔해 디지털 환경으로 옮겨온 것입니다."
    ]
  },
  {
    slug: "kitty-bunny-pony",
    tools: "After Effects · Illustrator · Photoshop",
    audience: { ko: "패브릭 브랜드 KBP의 기존 고객과, 패턴을 일상에서 쓰는 사람들", en: "KBP's existing customers and people who live with pattern day to day" },
    concept: { ko: "‘패턴을 일상에서 향유한다’는 브랜드의 전제를 화면 위 리듬으로 옮기는 일이었습니다. 패턴이 주인공이 되도록 배경 움직임을 덜어내고, 중심의 두꺼운 원 스트로크로 응축되는 질서를 만들었습니다.", en: "The brand's premise is that pattern belongs in daily life; the task was translating that into rhythm on screen. Background motion was held back so the patterns could lead, condensing into one thick circular stroke." },
    category: "design",
    year: "2026",
    title: { ko: "키티버니포니 로고 필름", en: "Kitty Bunny Pony — Logo Concept Film" },
    role: { ko: "영상 (1) 수업 · 브랜드 로고 영상 제작", en: "Motion Graphics I · Brand logo film" },
    caption: { ko: "2026, 2D 모션 그래픽, 싱글채널 비디오, 00’21”", en: "2026, 2D motion graphics, single-channel video, 00’21”" },
    link: { label: "Vimeo", url: "https://vimeo.com/1209280728" },
    cover: "kbp-cover.jpg",
    video: "kitty-bunny-pony.mp4",
    videoPoster: "kbp-cover.jpg",
    videoNote: { ko: "브랜드 로고 필름 · 21초", en: "Brand logo film · 21 s" },
    images: ["p18.jpg"],
    processNote: {
      ko: "기획안 원본 (한국어)",
      en: "Planning deck, in the original Korean"
    },
    process: [
      { src: "kbp-01.jpg", ko: "기획안 표지 — 영상 (1) 과제 P4", en: "Deck cover — Motion Graphics I, Project 4" },
      { src: "kbp-02.jpg", ko: "목차: 브랜드 개요 · 분석 · 경쟁사 · 포지셔닝 · 스토리보드 · 타임코드", en: "Contents: brand overview, analysis, competitors, positioning, storyboard, timecode" },
      { src: "kbp-03.jpg", ko: "브랜드 개요 — 2008년 런칭한 디자인 패브릭 브랜드 KBP", en: "Brand overview — KBP, a design fabric label launched in 2008" },
      { src: "kbp-04.jpg", ko: "브랜드 철학 ‘Life in Patterns’ — 패턴을 일상에서 향유한다", en: "The brand premise, ‘Life in Patterns’ — pattern as something you live with, not look at" },
      { src: "kbp-05.jpg", ko: "시장 경쟁력 분석 (SWOT) — 자체 패턴 아카이브와 아시아 시장 확장", en: "SWOT — the in-house pattern archive and room to grow across Asia" },
      { src: "kbp-06.jpg", ko: "경쟁사 비교 — 마리메꼬·데일리라이크·무인양품·H&M HOME 등과의 대비", en: "Competitors compared — Marimekko, Daily Like, MUJI, H&M HOME and others" },
      { src: "kbp-07.jpg", ko: "포지셔닝 맵 — 품질 축과 가격 축 위에서 KBP 가 서는 자리", en: "Positioning map — where KBP sits on quality against price" },
      { src: "kbp-08.jpg", ko: "‘왜 KBP 여야만 하는가’ — 유행을 타지 않는 고유 패턴 IP 를 근거로", en: "‘Why it has to be KBP’ — the argument rests on pattern IP that does not date" },
      { src: "kbp-09.jpg", ko: "로고 해부 — 두꺼운 원 스트로크가 화려한 패턴을 하나로 응축하는 질서", en: "The logo taken apart — one thick circular stroke holding a crowd of patterns in order" },
      { src: "kbp-10.jpg", ko: "스토리보드 — 21초를 9개 컷으로 나눔", en: "Storyboard — twenty-one seconds cut into nine shots" },
      { src: "kbp-11.jpg", ko: "장면별 타임코드 (전반) — 인트로부터 텍스처 확장까지", en: "Timecode, first half — from the intro through the texture expansion" },
      { src: "kbp-12.jpg", ko: "장면별 타임코드 (후반) — 테두리만 남고 로고가 완성되기까지", en: "Timecode, second half — down to the bare outline, then the logo closing" },
      { src: "kbp-sb.jpg", ko: "손으로 그린 스토리보드. 컷마다 초 단위와 카메라 움직임을 적어둠", en: "The storyboard by hand, with seconds and camera moves written into each frame" },
      { src: "kbp-ae.jpg", ko: "After Effects — 35개 레이어로 쌓은 최종 타임라인", en: "After Effects — the final timeline, built up across 35 layers" }
    ],
    body: [
      "본 작업은 기존 패브릭 브랜드 키티버니포니(KBP)의 핵심 가치와 시각적 자산을 깊이 있게 분석하고, 이를 기반으로 브랜드의 정체성을 압축적으로 시각화한 로고 컨셉 필름입니다. ‘패턴을 일상에서 향유한다’는 브랜드의 미학적 본질을 스크린 위의 리듬감으로 번역해내는 기획적 당위성에 초점을 맞추었습니다.",
      "영상은 KBP 특유의 자체제작 패턴 플레이가 펼쳐지는 서사로 시작됩니다. 이후 브랜드의 성격을 보여주는 직조, 패턴, 일상을 보이는 사진들이 나오다가 중심부의 ‘두꺼운 원 스트로크’ 안으로 강력하게 응축되는 질서를 모션 그래픽으로 구현했습니다.",
      "패턴의 다채로움이 가장 돋보일 수 있도록 배경의 움직임을 절제하고, 장식을 덜어낸 소문자 레터링이 기본 도형과 결합하는 과정으로 일상에 스며드는 미니멀한 편안함을 전달합니다. 브랜드 분석을 정교한 타임라인 매핑으로 연결하여, 로고 심볼 자체가 지닌 조형적 서사를 직관적으로 납득시키는 것을 목표로 설계되었습니다."
    ]
  },
  {
    slug: "ordinary-human",
    tools: "Photoshop · Illustrator",
    category: "design",
    year: "2025",
    title: { ko: "보통 인간", en: "Ordinary Human" },
    role: { ko: "포스터 디자인, 3점 연작", en: "Poster design, series of 3" },
    caption: { ko: "2025, Poster Design, Series of 3", en: "2025, Poster Design, Series of 3" },
    cover: "p21.jpg",
    images: ["p21.jpg", "p20.jpg"],
    body: [
      "본 포스터는 인간 내면에 공존하는 양면성과 우리가 의도적으로 외면하려는 심리적 ‘그림자’를 탐구한 작업입니다. 자신의 본모습을 직시하기보다 외면을 택하는 보통 인간의 태도가 만드는 왜곡된 자아와 확신을 화면 위에 표현했습니다. 거친 질감과 강한 명암 대비를 보여주는 타이포그래피, 그리고 인간의 형상이 중첩되어 인간으로 보이지 않기도 하는 추상적인 이미지를 통해 작업의 주제가 지닌 무게감을 표현했습니다.",
      "화면 중앙에 부유하듯 배치된 다리의 형상은 어디에도 온전히 발 딛지 못한 ‘불안정한 자아’를 상징합니다. 이를 통해 현대인의 위태로운 자세를 시각화했습니다. 인물 주변을 에워싼 채 침식해 들어오는 듯한 유기적 질감의 그래픽 레이어와 흑백의 명암 대비는 인물의 형태를 지워나가며, 인간이 지닌 불완전함과 모호함을 극대화합니다.",
      "본 작업은 어떤 명확한 해답을 제시하기보다, ‘보통’이라 규명된 상태 속 우리의 초상을 조용히 되묻는 데 집중합니다."
    ]
  },
  {
    slug: "disgust-book",
    tools: "InDesign · Photoshop",
    category: "design",
    year: "2025",
    title: { ko: "혐오의 즐거움에 관하여", en: "On the Pleasure of Disgust" },
    role: { ko: "북 디자인 (표지 & 편집)", en: "Book design (cover & editorial)" },
    caption: { ko: "2025, Book Design (Cover & Editorial)", en: "2025, Book Design (Cover & Editorial)" },
    cover: "p24.jpg",
    images: ["p24.jpg", "p23.jpg", "p25.jpg"],
    body: [
      "본 작업은 윌리엄 해즐릿의 에세이를 모티브로 인간 내면에 공존하는 혐오의 감정을 다룬 북 디자인 프로젝트입니다. 에세이 속 문장과 단어를 발췌해 인간을 상징하는 이미지와 결합했고 이를 통해 텍스트가 가진 사유의 무게를 책이라는 정적인 매체 안에 담아내고자 했습니다.",
      "표지는 역동적인 감정을 오히려 절제된 무드로 눌러 담았습니다. 색을 쓰지 않고 형압만으로 문양을 새겨 눈이 아니라 손끝으로 감정의 흔적을 느끼게 했습니다.",
      "내지는 문장이 지닌 맥락과 정서를 실험적인 타이포그래피로 옮기는 데 집중했습니다. 텍스트를 그냥 읽히는 정보로 두지 않고 지면 위에서 해체하거나 흩뿌리고 수직 축으로 세우면서 감정의 비선형적인 흐름을 시각적 리듬으로 만들었습니다. 흑백의 건조한 톤을 유지한 채 텍스트의 파편과 인물의 흔적이 서로 부딪히도록 배치해 독자가 여백과 밀도를 오가며 대상을 좀 더 거리를 두고 바라보게 했습니다."
    ]
  },
  {
    slug: "where-do-you-wish-to-go",
    tools: "Illustrator · InDesign",
    category: "design",
    year: "2025",
    title: { ko: "당신이 닿고 싶은 곳으로", en: "Where do you wish to go?" },
    role: { ko: "타이포그래피 · 영수증 디자인, 포스터", en: "Typography · Receipt design, poster" },
    caption: { ko: "2025, Receipt Design, Poster Design", en: "2025, Receipt Design, Poster Design" },
    cover: "p26.jpg",
    images: ["p26.jpg", "p27.jpg", "p28.jpg"],
    body: [
      "일상에서 무심코 버려지는 ‘영수증’을 《나니아 연대기》 속 세계로 향하는 ‘차원 이동 티켓’으로 재해석한 타이포그래피 작업입니다. 건조한 기록 매체와 고전 서사를 겹쳐 놓음으로써 사소한 사물도 하나의 세계관을 매개하는 서사적 물질이 될 수 있다는 가능성을 실험했습니다.",
      "영수증은 소비의 흔적을 남기는 가장 무미건조한 형식의 종이지만 동시에 시간과 장소, 거래의 기록이라는 점에서 하나의 ‘이동’을 증명하는 문서이기도 합니다. 저는 이 이중적인 성격에 주목해, 영수증이 가진 형식을 그대로 빌려 판타지 세계로의 통행을 증명하는 티켓으로 뒤집어보고자 했습니다.",
      "영수증 고유의 그리드 시스템은 그대로 유지하되, 품목과 가격란을 문학적 키워드로 치환해 무형의 가치를 데이터처럼 다뤘습니다. 출발지와 도착지, 운송 수단이 적히는 자리에는 나니아 세계관 속 지명과 인물을 배치했고, 시간 단위 역시 현실의 초 단위와 나니아의 연 단위를 병기해 두 세계의 시간이 다르게 흐른다는 설정을 형식 안에 녹였습니다.",
      "이는 텍스트 내용을 바꾸는 것을 넘어 영수증이라는 포맷 자체가 이미 가진 정보 구조를 다른 서사에 그대로 이식해보는 실험이었습니다."
    ]
  },
  {
    slug: "altar-of-essence",
    tools: "Photoshop · Illustrator",
    category: "design",
    year: "2025",
    title: { ko: "본질의 제단", en: "The Altar of Essence" },
    role: { ko: "포스터 디자인", en: "Poster design" },
    caption: { ko: "2025, Poster Design", en: "2025, Poster Design" },
    cover: "p29.jpg",
    images: ["p29.jpg", "p30.jpg", "p31.jpg"],
    body: [
      "본 포스터 작업은 타인의 내면과 사물의 속성은 끊임없이 파헤치면서도 정작 자신의 본질을 드러내는 데는 본능적인 거부감을 느끼는 인간의 모순을 다룹니다. 화면 속 천사 이미지는 관람객에게 ‘본질’이라는 질문을 던지는 매개체입니다. 그 질문이 던져지는 순간을 시각화해 감상자가 외부로 향하던 시선을 거두고 자신의 내면과 마주하는 공간으로 포스터를 제작하였습니다.",
      "제단 앞에 선 감상자는 질문을 받는 주체이자 그것을 지켜보는 관조자가 됩니다. 화면을 지배하는 꽉 짜인 수직적 레이아웃과 밀도 높은 텍스트 블록은 공간에 긴장감을 부여하고 감상자에게 시각적 압박감과 경건한 몰입감을 동시에 안깁니다.",
      "이 구조 안에서 관람객은 타인을 향하던 시선을 거두어 자신의 가장 깊은 이면과 왜곡되지 않은 본모습을 마주하게 됩니다. 포스터는 단순한 지면이 아니라 외면해왔던 자아를 직면하게 만드는 하나의 성찰적 공간입니다."
    ]
  },
  {
    slug: "remains-card",
    tools: "Photoshop · Illustrator",
    category: "design",
    year: "2025",
    title: { ko: "痕跡", en: "Remains of Emotions" },
    role: { ko: "카드 디자인", en: "Card design" },
    caption: { ko: "2025, Card Design", en: "2025, Card Design" },
    cover: "p33.jpg",
    images: ["p33.jpg", "p32.jpg"],
    body: [
      "본 작업은 특정 감정이 지나간 뒤 개인에게 남겨진 감정의 흔적들을 들여다봅니다. 기존 판화 작업의 연작으로서 그 조형적 요소와 서사를 바탕으로 하되, 그래픽적 디테일을 강화하여 시각적 완성도를 높였습니다.",
      "카드라는 매체를 활용하여, 어떤 패를 쥐게 될지 알 수 없는 카드 게임처럼 감정 역시 개인의 의지와 상관없이 불규칙하게 찾아오며 스스로 통제할 수 없다는 속성을 반영했습니다.",
      "규격화된 카드 프레임 안에 감정이 남긴 파편들을 세밀하게 배치하여, 통제 불가능한 감정을 박제하고 분류하는 과정을 시각화했습니다. 같은 이미지를 다양하게 생성한 후 각각의 요소들을 재조합하여, 불완전하고 선택하지 않은 감정들이 삶의 일부로 수용되는 과정을 디자인적 관점에서 해석해 보았습니다."
    ]
  },
  {
    slug: "moment",
    tools: "InDesign · Photoshop",
    category: "design",
    year: "2025",
    title: { ko: "잠 시,", en: "Moment" },
    role: { ko: "아티스트 북 · 비주얼 크레딧 디자인", en: "Artist book · visual credit design" },
    caption: {
      ko: "2025, Artist book, digital print, French binding, hard cover with textured paper, 9.5×18×1cm",
      en: "2025, Artist book, digital print, French binding, hard cover with textured paper, 9.5×18×1cm"
    },
    cover: "p35.jpg",
    images: ["p35.jpg", "p34.jpg", "p36.jpg", "p37.jpg"],
    body: [
      "제 작업의 제목은 ‘잠시,’입니다. 우리가 일상에서 습관처럼 내뱉는 “잠시만”이라는 말은 무언가를 멈추고 숨을 고르기 위한 최소한의 여지를 만들어냅니다. 저에게 노래를 듣는 행위는 바로 그 ‘잠시’의 시간입니다. 이어폰을 꽂고 외부 세계로부터 나를 격리하는 그 순간은 불안한 일상 속에서 나를 안정시키는 개인적인 방어막이자 유일한 쉼터입니다.",
      "이 아티스트 북은 그런 사소한 행동에서 비롯된 짧은 몰입의 순간을 독자에게 그대로 건네고자 만들었습니다. 수록된 음악과 이미지는 분석적으로 읽히기보다 느린 리듬 속에서 독자가 스스로의 감정에 천천히 다가가도록 이끕니다. 특히 영화적 구조를 차용해 독자가 텍스트를 읽기보다 하나의 장면을 따라가도록 설계했고 QR 코드로 청각적 경험을 연결해 ‘잠시’의 농도를 더했습니다.",
      "가로로 길게 뻗은 형태와 질감이 느껴지는 표지는 말로 다 설명할 수 없는 감정을 손끝의 감각으로 옮기려는 시도입니다. 정보를 의도적으로 가린 채 감각에 집중하게 만드는 이 여정은 책의 마지막 엔딩 크레딧에서 마무리됩니다. 짧은 독서를 통해 잠시 멈춰 머물렀던 감정들이 다시 일상으로 돌아가는 발걸음에 조용히 남기를 바랍니다.",
      "책의 마지막에 배치된 엔딩 크레딧은 종이라는 물리적 매체를 넘어 유튜브 플레이리스트라는 디지털 플랫폼으로 확장되어, 시각과 청각이 결합한 입체적인 소통의 경험을 선사하고 주관적인 감각을 보편적인 시각 시스템 안에서 재구성하는 실험으로 이어집니다."
    ]
  },

  /* ---------------- FINE ART ---------------- */
  {
    slug: "disgust-etching",
    category: "fineart",
    year: "2025",
    title: { ko: "혐오의 즐거움에 관하여", en: "On the Pleasure of Disgust" },
    role: { ko: "판화 · 라인 에칭", en: "Printmaking · line etching" },
    caption: { ko: "2025, 파브리아노 로자스피나에 라인 에칭, 35×45cm", en: "2025, line etching on Fabriano Rosaspina, 35×45cm" },
    cover: "p39.jpg",
    images: ["p39.jpg", "p41.jpg"],
    body: [
      "이 작업은 윌리엄 해즐릿의 에세이 『혐오의 즐거움에 관하여』에서 출발하였습니다. 장식적이고 화려한 프레임과 그 안에 배치된 불완전하고 불쾌한 형상이라는 이중적인 구조를 통해, 아름다움과 추함이 가장 밀착되는 지점에서 발생하는 감각을 시각적으로 드러내고자 하였습니다.",
      "완전함과 이상을 갈망하는 인간은 동시에 균열과 불완전함으로 이루어진 결에 묘하게 끌리며, 해즐릿이 말했듯 혐오는 단순히 회피해야 할 감정이 아니라 살아 있음을 확인하게 하는 모순적인 감정 중 하나입니다.",
      "감상자들은 멀리서 보았을 때 매력적으로 다가오는 시각적 이미지에 이끌려 작품에 다가오지만, 가까이에서 마주한 불편함으로 인해 오히려 시선을 쉽게 떼지 못합니다. 이러한 응시와 확인의 반복 속에서 설명하기 어려운 쾌감이 발생하며, 저는 이 상태를 ‘혐오의 즐거움’이라 명명하였습니다. 본 작업은 이러한 양가적인 감정을 작품 안에 배치함으로써, 감상자가 스스로 그 감정의 흐름을 따라가도록 유도하고자 합니다."
    ]
  },
  {
    slug: "remains-litho",
    category: "fineart",
    year: "2025",
    title: { ko: "痕跡", en: "Remains of Emotions" },
    role: { ko: "판화 · 석판화 설치", en: "Printmaking · lithograph installation" },
    caption: {
      ko: "2025, 파브리아노 로자스피나에 석판화, 실 공중 매달기, 병풍 접지, 카드 모듈화, 가변 크기",
      en: "2025, lithograph on Fabriano Rosaspina, suspended by thread, folding screen, modular cards, dimensions variable"
    },
    cover: "p43.jpg",
    images: ["p43.jpg", "p42.jpg"],
    body: [
      "본 작업은 특정 감정이 지나간 뒤 개인에게 남겨진 감정의 흔적들을 들여다봅니다. 카드라는 매체를 활용하여, 어떤 패를 쥐게 될지 알 수 없는 카드 게임처럼 감정 역시 개인의 의지와 상관없이 불규칙하게 찾아오며 스스로 통제할 수 없다는 속성을 반영했습니다.",
      "규격화된 카드 프레임 안에 감정이 남긴 파편들을 석판화에 드로잉한 후 남겨진 감정의 혼돈과 불완전함을 담아내고자 했습니다.",
      "인간의 오만함부터 내면의 나약함까지 겉으로 쉽게 드러나지 않는 복합적인 심리 상태를 카드의 앞뒷면에 교차 배치하여, 카드를 마주하고 재조합하는 과정에서 보이지 않는 감정의 궤적을 입체적으로 감각하도록 유도합니다."
    ]
  },
  /* ---------------- PROJECT ---------------- */
  {
    slug: "paper-company-zine",
    tools: "Notion · Figma",
    audience: { ko: "AI 이미지 앞에서 자기 작업의 자리를 다시 묻고 있는 20대 미술인", en: "Artists in their twenties asking where their own work stands next to AI images" },
    concept: { ko: "AI 미술을 ‘가짜’라고 부르고 끝내지 않기로 했습니다. 응시하되 그 안에서 피어날 수 있는 창작의 실마리를 찾는 태도를 호 전체의 방향으로 잡았습니다.", en: "We decided not to stop at calling AI art fake. The issue takes the position of looking straight at it while searching for what might still grow there." },
    category: "project",
    year: "2025",
    title: { ko: "PAPER COMPANY _ Zine", en: "PAPER COMPANY _ Zine" },
    role: { ko: "PP 매거진 3호 · 기획, 글, 최종 검토, 전시 참여", en: "PP Magazine Vol.3 · planning, writing, final review, exhibiting" },
    caption: {
      ko: "2025, 홍익 아트북 페스티벌 〈Threading Texts〉 출품 · 148 × 210 mm, 54p",
      en: "2025, Hongik Art Book Festival 〈Threading Texts〉 · 148 × 210 mm, 54pp"
    },
    cover: "pc-cover.jpg",
    images: [],
    spreads: ["pc-m1.jpg", "pc-m3.jpg", "pc-m4.jpg", "pc-m5.jpg", "pc-m6.jpg", "pc-m2.jpg", "pc-m7.jpg", "pc-m8.jpg"],
    process: [
      { src: "pc-02.jpg", ko: "Notion — 멤버별 리서치 보드. 각자 조사한 자료가 원고의 출발점", en: "Notion — research board; each member's findings started the writing" },
      { src: "pc-01.jpg", ko: "Notion — 주 단위 작업 기록 (2025.7 – 10)", en: "Notion — weekly production log, Jul – Oct 2025" },
      { src: "pc-03.jpg", ko: "Figma — 기획 단계와 멤버별 지면 배분", en: "Figma — planning stage and page allocation per member" },
      { src: "pc-05.jpg", ko: "Figma — 티징 포스터 · 표지 · 굿즈 검토", en: "Figma — teaser posters, covers, and goods under review" },
      { src: "pc-04.jpg", ko: "Figma — 회의 자료와 인스타그램 피드 기획", en: "Figma — meeting documents and Instagram feed planning" }
    ],
    body: [
      "한때 판화를 만들던 손끝을 ‘Printer’라 불렀듯 오늘 우리의 시대를 규정하는 단어는 AI일지 모릅니다. 더 이상 익숙한 재료의 물성이 아니라 알고리즘과 데이터로 형성되는 이미지 앞에서 우리는 낯섦과 가능성을 동시에 마주하게 됩니다. 또 하나의 경계 위에 선 미술은 묻습니다. 가짜인가, 진짜인가, 도구인가, 창작자인가.",
      "사회적 논쟁과 새로운 기법이 교차하는 순간, 20대 미술인으로서 어떤 시각과 태도를 가질 수 있을지 질문하며 3호를 준비했습니다. 3호의 제목 papercompany는 ‘가짜’라는 낙인을 받아온 AI 미술을 응시하면서도 그 속에서 피어날 수 있는 창작의 실마리를 탐색해 나가는 태도를 담고 있습니다.",
      "3호는 제가 PP에서 아직 배우던 시기의 작업입니다. 기획 회의와 원고, 최종 검토에 참여했고 편집 디자인은 다른 멤버들이 맡았습니다.",
      "2025 홍익 아트북 페스티벌 〈Threading Texts〉에 참가해 부원들과 함께 기획하고 글을 담당한 3호를 선보였습니다."
    ]
  },
  {
    slug: "beyond-the-block",
    tools: "InDesign · Illustrator · Photoshop",
    audience: { ko: "판화를 배워본 적 없지만 궁금해하는 사람, 그리고 용어 앞에서 멈췄던 저학년", en: "People curious about printmaking who have never tried it, and underclassmen who stalled at the vocabulary" },
    concept: { ko: "판화가 어려워 보이는 건 실제로 어려워서가 아니라 들어갈 길이 없어서라고 봤습니다. 설득하는 대신 구조로 풀기로 하고, 한 단어만 찾아볼 수 있는 사전과 실제 사용자의 목소리를 두 축으로 세웠습니다.", en: "Printmaking is not as hard as it looks; the real barrier is that there is no way in. So instead of persuading anyone, we answered with structure — a dictionary you can enter at a single word, and interviews that put those words back in working hands." },
    category: "project",
    year: "2026",
    title: { ko: "BEYOND THE BLOCK — 판화 백과사전", en: "BEYOND THE BLOCK — A Printmaking Encyclopedia" },
    role: { ko: "PP 매거진 4호 · 공동 총괄 기획, 편집 디자인", en: "PP Magazine Vol.4 · co-direction, editorial design" },
    caption: { ko: "2026, 판화 백과사전 — 1장 사전 / 2장 인터뷰 · 148 × 210 mm, 90p · 스프링 제본", en: "2026, printmaking encyclopedia — dictionary and interviews · 148 × 210 mm, 90pp · spiral-bound" },
    cover: "btb-cover.jpg",
    images: [],
    spreads: [
      "btb-m1.jpg", "btb-m2.jpg", "btb-m3.jpg",
      "btb-s1.jpg", "btb-s2.jpg", "btb-s3.jpg", "btb-s4.jpg", "btb-s5.jpg", "btb-s6.jpg",
      "btb-m4.jpg"
    ],
    process: [
      { src: "btb-p1.jpg", ko: "Notion — 기획 의도와 역할 분담. 백과사전 / 홈메이드 / 인터뷰 세 갈래로 나눔", en: "Notion — brief and role split: dictionary, homemade, interviews" },
      { src: "btb-p2.jpg", ko: "Notion — 멤버별 리서치 보드. 각자 조사한 항목이 사전 표제어가 됨", en: "Notion — research board; each member's entries became dictionary headwords" },
      { src: "btb-p7.jpg", ko: "Notion — 주 단위 작업 기록 (2025.10 – 2026.3)", en: "Notion — weekly production log, Oct 2025 – Mar 2026" },
      { src: "btb-p3.jpg", ko: "Figma — 제목 레터링과 표지 시안. 격자 안에 글자를 가두는 안으로 수렴", en: "Figma — title lettering and cover studies, converging on letters held in a grid" },
      { src: "btb-p4.jpg", ko: "Figma — 백과사전 내지와 홈메이드 부록 조판", en: "Figma — interior layouts for the dictionary and the homemade supplement" },
      { src: "btb-p6.jpg", ko: "Figma — 인터뷰 원고 교정. 맞춤법·내용 수정 표시", en: "Figma — interview transcripts in review, spelling and content passes marked" },
      { src: "btb-p5.jpg", ko: "Figma — 티징 이미지와 레퍼런스 검토", en: "Figma — teaser imagery and reference review" }
    ],
    body: [
      "무거운 프레스기, 낯선 용어, 복잡한 공정. 판화를 떠올리면 자연스럽게 따라붙는 이미지들입니다. 그리고 그 옆에는 늘 BLOCK이 존재합니다. 이 BLOCK은 이미지를 옮기기 위한 판화의 출발점이지만, 판화가 낯선 이들에게는 인식의 장벽이기도 합니다.",
      "〈BEYOND THE BLOCK〉은 판화를 잘 모르는 사람들, 판화가 어렵고 낯설게 느껴졌던 이들을 위해 판화를 둘러싼 여러 BLOCK, 즉 진입 장벽을 허물고자 기획되었습니다. 우리는 장벽으로서의 BLOCK과 조건으로서의 BLOCK 사이를 오가며, 판화를 기술이 아닌 하나의 방식으로 다시 바라보고자 합니다.",
      "첫 번째 챕터는 (ㄱ)부터 (ㅎ)까지의 순서로 판화와 관련된 용어와 개념을 정리한 사전 형식으로 구성되었으며 판화의 기본 공정, 재료, 도구, 기법 등 작업 과정에서 사용되는 다양한 용어를 폭넓게 다룹니다. 각 항목은 판화 관련 서적과 국내외 자료, 전문 사이트를 참고해 전문성을 담았습니다.",
      "두 번째 챕터는 판화과 소모임 회장들, 조교, 교수, 디자인과 교수, 그리고 실제 판화 공방을 운영하는 작업자들의 인터뷰입니다. 서로 다른 위치에서 판화를 바라보는 방식과 작업 환경, 그리고 판화가 각자의 영역에서 어떻게 확장되고 있는지를 다양한 목소리를 통해 보여줍니다."
    ]
  },
  {
    slug: "homemade-printmaking",
    tools: "InDesign · Illustrator",
    audience: { ko: "프레스기도 공방도 없는 사람, 집에서 한 번 해보고 싶은 사람", en: "People without a press or a studio who want to try it once at home" },
    concept: { ko: "장비가 없으면 시작조차 못 하는 상황을 재료로 풀었습니다. 집에 있거나 쉽게 살 수 있는 것으로 대체 공정을 짜고, 따라 하는 동안 책이 펼쳐진 채 있도록 제본을 정했습니다.", en: "Without equipment you cannot even begin, so we answered with materials — processes rebuilt from what is already at home, and a binding chosen so the book stays open on the desk while you follow it." },
    category: "project",
    year: "2026",
    title: { ko: "홈메이드 판화", en: "Homemade Printmaking" },
    role: { ko: "PP 매거진 4호 부록 · 공동 총괄 기획, 제작 실험, 홍보", en: "PP Magazine Vol.4 supplement · co-direction, production testing, promotion" },
    caption: { ko: "2026, 4호 부록 매뉴얼 북 — 대체 재료로 짠 6가지 공정 · 중철제본", en: "2026, supplement manual to Vol.4 — six processes rebuilt from substitute materials · saddle-stitched" },
    cover: "hm-cover.jpg",
    images: [],
    spreads: ["hm-m1.jpg", "hm-m2.jpg", "hm-m3.jpg", "hm-m4.jpg", "hm-m5.jpg", "hm-m6.jpg"],
    processNote: { ko: "제작 과정 사진: 안동권, 최나영", en: "Process photography: An Dongkwon, Choi Nahyoung" },
    process: [
      { src: "hm-p1.jpg", ko: "포토폴리머 — 도안을 올린 황색 포지티브 필름", en: "Photopolymer — the artwork output onto yellow positive film" },
      { src: "hm-p2.jpg", ko: "포토폴리머 — 공방 노광기 대신 네일 UV 램프로 감광", en: "Photopolymer — exposed under a nail-salon UV lamp instead of a studio unit" },
      { src: "hm-p3.jpg", ko: "포토폴리머 — 경화된 판을 재단해 나무 블록에 붙이기", en: "Photopolymer — the hardened plate trimmed and mounted on a wood block" },
      { src: "hm-p4.jpg", ko: "포토폴리머 — 완성한 도장을 찍어 찍힘 상태 확인", en: "Photopolymer — the finished stamp pulled and checked" },
      { src: "hm-p5.jpg", ko: "시아노타입 — 키트 용액을 종이컵에 계량해 조제", en: "Cyanotype — kit solutions measured out in paper cups" },
      { src: "hm-p6.jpg", ko: "시아노타입 — 노광한 종이를 물에 담가 수세", en: "Cyanotype — the exposed sheet washed out in water" },
      { src: "hm-p7.jpg", ko: "키친 리소그래피 — 호일 판 위에 콜라를 부어 부식", en: "Kitchen lithography — cola poured over a foil plate to etch it" },
      { src: "hm-p8.jpg", ko: "리놀륨 형압 — 프레스기 없이 눌러 찍은 종이를 들어 올리기", en: "Linoleum embossing — lifting a sheet pressed by hand, no press involved" },
      { src: "hm-p9.jpg", ko: "스텐실 — 클립·실·핀을 올리고 스프레이로 뜬 자국", en: "Stencil — clips, thread and pins laid down, then sprayed around" }
    ],
    body: [
      "매거진의 부록으로 기획된 본 책자는 판화를 둘러싼 진입 장벽을 낮추고, 일상 공간에서의 예술적 실천을 도모하는 홈메이드 판화 매뉴얼 북입니다. 무거운 프레스기와 복잡한 공정 대신, 우리 주변에서 언제나 쉽게 접할 수 있는 대체 재료와 도구들을 발굴하여 일상적인 판화 제작 프로세스를 제안합니다.",
      "판화과 재학생들이 전공 과정에서 직접 겪고 실험한 실증적 데이터와 제작 노하우를 바탕으로 구성되었으며, 정교한 튜토리얼을 통해 기술 중심의 판화를 하나의 친근한 놀이이자 주체적인 표현 방식으로 치환합니다.",
      "가볍고 직관적인 중철제본의 형식을 취하여 실무 제작 과정에서 독자들이 쉽게 펼쳐보고 참고할 수 있는 유연한 기능성을 더했습니다. 판화를 하나의 전공 영역에 한정 짓지 않고, 누구나 예술의 생산자가 될 수 있도록 돕는 실천적 가이드라인을 지향합니다."
    ]
  },
  {
    slug: "pp-vol5",
    tools: "Notion · Figma",
    audience: { ko: "졸업전시 이후 자기 작업을 어디에 둘지 고민해본 미대생", en: "Art students who have wondered where their work goes after the degree show" },
    concept: { ko: "‘보존’이라는 말에 작품을 지키는 일과 작품을 모아두는 일이 섞여 있다는 데서 출발했습니다. 기술적인 복원 이야기로 흐르지 않도록 ‘무엇을, 왜, 어떻게 남길 것인가’로 질문을 바꿔 잡았습니다.", en: "The word \u2018conservation\u2019 holds two things at once: keeping work alive, and collecting it. To avoid drifting into technical restoration, we reframed it as what we keep, why, and how." },
    category: "project",
    year: "2026",
    title: { ko: "PP Vol.5 〈K.E.E.P.〉", en: "PP Vol.5 〈K.E.E.P.〉" },
    role: { ko: "PP 매거진 5호 · 총괄 기획, 일정·역할 설계, 원고 피드백, 웹사이트 기획", en: "PP Magazine Vol.5 · project direction, scheduling, editorial feedback, website planning" },
    caption: {
      ko: "2026.4–8, 주제: 보존 — 물질적 / 아카이브적 / 디지털 보존 3개 챕터 · 182 × 257 mm, 62p",
      en: "Apr–Aug 2026, on conservation — physical, archival, digital · 182 × 257 mm, 62pp"
    },
    link: { label: "ppzine.com", url: "https://www.ppzine.com/contents/pp-vol-5" },
    cover: "ppv5-cover.jpg",
    images: [],
    spreads: ["ppv5-cover.jpg", "ppv5-m2.jpg", "ppv5-m3.jpg", "ppv5-m4.jpg", "ppv5-m5.jpg", "ppv5-m1.jpg"],
    process: [
      { src: "ppv5-01.jpg", ko: "Notion — 주 단위 작업 기록 (2026.4 – 8)", en: "Notion — weekly production log, Apr – Aug 2026" },
      { src: "ppv5-02.jpg", ko: "Figma — 5호 전체 워크플로우. 기획·원고·시각화·가제본·티징 구간 배치", en: "Figma — full workflow: planning, drafts, visuals, mockups, teasers laid out in bands" },
      { src: "ppv5-03.jpg", ko: "Figma — 캘린더와 멤버별 역할 분담", en: "Figma — calendar and role assignments per member" }
    ],
    body: [
      "5호의 주제는 ‘보존’입니다. 보존이라는 말에 작품 자체를 지키는 일과 작품을 수집·보관하는 일, 두 가지가 섞여 있다는 데서 출발했습니다. 기술적인 복원 이야기로 흘러가지 않도록, ‘무엇을, 왜, 어떻게 남길 것인가’라는 질문으로 방향을 잡았습니다.",
      "챕터는 셋으로 나눴습니다. 물질적 보존은 ‘당신의 졸업전시 작품은 지금 어디에 있나요?’라는 질문에서 시작해 동료·선배·교수 인터뷰와 재료의 유한성을 다룹니다. 아카이브적 보존은 미술관의 거대한 시스템을 미대생의 방 크기로 옮겨놓은 실용 가이드입니다. 마지막은 형태가 없는 작업의 디지털 보존을 봅니다.",
      "제 역할은 전체 일정과 역할 분담을 설계하고 원고에 피드백을 주는 쪽이었습니다. 4월부터 8월까지 주 단위로 진행 상황을 기록하고, 기획·원고·시각화·가제본·티징이 서로 밀리지 않게 간격을 잡았습니다. 여덟 명이 각자 다른 속도로 움직이는 상황에서 ‘언제까지 무엇이 나와야 다음 사람이 시작할 수 있는지’를 맞추는 일이 대부분이었습니다.",
      "편집 디자인과 지면 작업은 다른 멤버들이 맡았습니다. 저는 호 전체의 방향을 잡고 원고를 읽고 되돌려주는 자리에 있었습니다.",
      "함께 준비한 웹진 사이트는 기획 단계에 참여했습니다. 유료·무료 개발 범위, 도메인, 로그인 권한 구조, 콘텐츠 카테고리 운영 방식을 멤버들과 문서로 정리해 개발팀에 넘겼습니다."
    ]
  },
  {
    slug: "dd-zine",
    tools: "Figma · Illustrator · Photoshop",
    audience: { ko: "PP를 이미 아는 미대생, 그리고 매거진 발행 사이 기간에 PP를 처음 접하는 사람", en: "Art students who already follow PP, and newcomers who find it between issues" },
    concept: { ko: "본 계정이 발행을 알리는 자리라면 서브 계정은 그 사이를 채우는 자리입니다. 미대생들이 평소 모으는 것들을 짧은 호흡으로 쌓아두되, 여덟 명이 올려도 한 사람이 만든 것처럼 보이게 하는 것이 과제였습니다.", en: "The main account announces issues; this one fills the gaps. It had to hold the small things art students collect, and still look like one hand made it even with eight people posting." },
    category: "project",
    year: "2026",
    title: { ko: "dd.zine — Digital Digging", en: "dd.zine — Digital Digging" },
    role: { ko: "PP 서브 계정 · 아이덴티티, 콘텐츠 시스템 디자인", en: "PP sub-account · identity and content system" },
    caption: {
      ko: "2026, 인스타그램 서브 계정 아이덴티티 — 로고, 컬러 시스템, 콘텐츠 템플릿, 피드 운영 가이드",
      en: "2026, Instagram sub-account identity — logo, color system, content templates, feed guidelines"
    },
    link: { label: "@dd.zine._", url: "https://www.instagram.com/dd.zine._/" },
    cover: "ddz-logo.jpg",
    images: ["ddz-07.jpg"],
    process: [
      { src: "ddz-01.jpg", ko: "Figma — 로고 설명과 세 갈래 색 체계 정리", en: "Figma — the logo rationale and the three-way colour system" },
      { src: "ddz-03.jpg", ko: "Figma — 제목 길이별 텍스트 템플릿 전개", en: "Figma — text templates built out for short, medium, and long titles" },
      { src: "ddz-05.jpg", ko: "Figma — 표지·내지 시안 (8/7). 확정안 표시", en: "Figma — cover and interior drafts (Aug 7), chosen direction marked" },
      { src: "ddz-04.jpg", ko: "Figma — 피드 배치 시안 (8/15). 네 가지 안 비교", en: "Figma — feed layout drafts (Aug 15), four options compared" },
      { src: "ddz-02.jpg", ko: "Figma — 전체 피드 프레임 보드. 색으로 분류가 읽히는지 멀리서 확인", en: "Figma — the whole feed as frames, checked from a distance to see if the colour sorting reads" },
      { src: "ddz-06.jpg", ko: "Figma — 팀 피드백. 별표로 선호안 표시", en: "Figma — team feedback, preferences marked with stars" }
    ],
    body: [
      "PP 본 계정이 매거진 발행을 알리는 자리였다면, 서브 계정은 그 사이 기간을 채우는 자리가 필요했습니다. 미대생들이 평소 보고 모으는 것들을 짧은 호흡으로 쌓아두는 계정, ‘Digital Digging’을 기획하고 아이덴티티와 콘텐츠 시스템을 맡았습니다.",
      "로고는 기존 PP 로고를 상하 반전해서 만들었습니다. 원래 기둥이 있던 자리에 아래로 뾰족한 돌기를 두어 ‘파낸다’는 동작을 형상으로 담았고, 위쪽은 손잡이로 읽히게 했습니다. 본 계정과 한눈에 같은 식구로 보이면서도 역할이 다르다는 걸 형태 하나로 구분하려 했습니다.",
      "콘텐츠는 세 갈래로 나누고 각각에 색을 묶었습니다. PP 인사이트는 연두(#83FF83), 대중문화는 마젠타(#FF39EF), 순수미술은 주황(#FF4537). 피드를 멀리서 봤을 때 색만으로 분류가 읽히도록 하고, 가운데 열에는 세 갈래 어디에도 속하지 않는 글을 배치해 리듬을 만들었습니다.",
      "템플릿은 글자 길이가 들쭉날쭉한 수집 콘텐츠를 누구나 같은 품질로 올릴 수 있게 설계했습니다. 제목 길이별 변형안을 여러 벌 만들어 팀원들이 고르게 했고, 업로드 양식과 댓글 운영 규칙까지 문서로 정리했습니다.",
      "시안은 팀 피드백을 받아 여러 차례 고쳤습니다. 로고가 제목을 가리는 문제, 피드 전체의 명도 균형, 텍스트 피드에서 로고를 가운데 맞추는 문제 등이 그 과정에서 걸러졌습니다."
    ]
  },
  {
    slug: "pp-website",
    category: "project",
    year: "2026",
    title: { ko: "ppzine.com", en: "ppzine.com" },
    role: { ko: "PP 웹진 · 기획 참여", en: "PP web magazine · planning" },
    tools: "Figma · Notion",
    audience: {
      ko: "매거진을 실물로 구하기 어려운 독자, 그리고 지난 호를 다시 찾아보려는 사람들",
      en: "Readers who can't get a physical copy, and anyone looking for a back issue"
    },
    concept: {
      ko: "종이로만 존재하던 PP를 온라인으로 옮기는 일. 매 호가 끝나면 사라지던 글을 호수별로 찾아볼 수 있게 만드는 것이 목표였습니다.",
      en: "Moving PP online. Each issue used to disappear once it was printed; the goal was to make past writing findable by volume."
    },
    caption: {
      ko: "2026, PP 웹진 — 개발 범위·도메인·권한 구조·콘텐츠 운영 방식 기획 (개발은 외부 개발팀)",
      en: "2026, PP web magazine — scope, domain, permissions, and content operations planning (built by an external dev team)"
    },
    link: { label: "ppzine.com", url: "https://www.ppzine.com/" },
    cover: "ppz-01.jpg",
    images: [],
    spreadsLabel: { ko: "화면", en: "Screens" },
    spreads: ["ppz-01.jpg", "ppz-02.jpg", "ppz-03.jpg", "ppz-04.jpg",
              "ppz-05.jpg", "ppz-06.jpg", "ppz-07.jpg", "ppz-08.jpg"],
    body: [
      "PP는 매 호가 끝나면 그 글들이 사실상 사라졌습니다. 실물을 구하지 못한 사람은 읽을 방법이 없었고, 지난 호를 찾는 사람도 마찬가지였습니다. 웹진은 그 문제를 풀기 위한 기획이었습니다.",
      "저는 개발이 아니라 그 앞 단계를 맡았습니다. 유료 개발과 무료 개발의 범위를 비교해 어디까지 직접 하고 어디부터 맡길지 정하고, 도메인과 호스팅 비용을 따져 예산 안에 들어오게 했습니다.",
      "권한 구조도 정리했습니다. 관리자와 일반 독자가 보는 화면이 어떻게 달라야 하는지, 로그인을 거치지 않고도 읽을 수 있어야 하는 부분은 어디까지인지를 멤버들과 문서로 맞췄습니다. 구독이나 결제 같은 기능은 지금 규모에 맞지 않는다고 판단해 범위에서 뺐습니다.",
      "콘텐츠 운영 방식은 매거진 구조를 그대로 옮기지 않고 다시 짰습니다. 호수별 묶음과 카테고리별 검색이 같이 돌아가야 지난 글이 계속 읽힌다고 봤습니다.",
      "정리한 내용을 개발팀에 넘겼고, 사이트는 그 기획을 바탕으로 만들어졌습니다."
    ]
  },

  /* ---------------- EXHIBITION ---------------- */
  {
    slug: "archive-as-form",
    category: "exhibition",
    year: "2025",
    title: { ko: "ARCHIVE AS FORM", en: "ARCHIVE AS FORM" },
    role: { ko: "단체전 출품 · 설치", en: "Group exhibition · installation" },
    caption: {
      ko: "2025, 실리콘·플로피디스크, 13×13cm · 《ARCHIVE AS FORM》 #25 AUG–SEPT",
      en: "2025, silicone & floppy disks, 13×13cm · 《ARCHIVE AS FORM》 #25 AUG–SEPT"
    },
    cover: "p51.jpg",
    images: [],
    spreadsLabel: { ko: "전시 전경", en: "Installation views" },
    spreads: ["p51.jpg", "af-01.jpg", "p50.jpg"],
    body: [
      "본 작업은 아카이브의 이중적 성격인 ‘보존’과 ‘은폐’에서 출발하여, 결과 중심의 기록을 넘어 과정의 층위를 담아내는 ‘살아있는 아카이브’의 형식을 탐구합니다.",
      "주요 오브제인 플로피디스크는 데이터를 저장하지만 실체를 드러내지 않는 특성을 지니며, 이는 무수한 행위의 흔적을 품고 있으면서도 최종적으로는 종이 위의 표면만을 제시하는 판화의 구조와 닮아 있습니다. 기록은 이렇듯 보이지 않는 내부와 드러나는 외부 사이의 간극 속에서 비로소 성립합니다.",
      "저는 이러한 판화적 사고를 확장하기 위해 실리콘의 반투명하고 유연한 물성을 매개로 아카이브의 형식을 재구성했습니다. 책장의 형태에 나열된 플로피디스크와 이를 감싸는 반투명한 층위들은 끊임없이 겹쳐지고 변주되는 흔적들의 은유입니다.",
      "같은 전시에 〈Trace〉를 함께 내놓았습니다."
    ]
  },
  {
    slug: "trace",
    category: "exhibition",
    year: "2025",
    title: { ko: "Trace", en: "Trace" },
    role: { ko: "단체전 출품 · 단채널 비디오, 포스터 디자인", en: "Group exhibition · single-channel video, poster design" },
    tools: "Figma · Photoshop · Illustrator",
    audience: {
      ko: "작업이 끝나면 남는 것이 결과물뿐이라고 생각해온 사람",
      en: "Anyone who assumed that when the work is done, only the object is left"
    },
    concept: {
      ko: "판화실에 남은 흔적과 도구를 모아 포스터로 만들고, 그 기록을 영상 속 플로피디스크에 담았습니다. 저장만 하면 기록은 조용히 닫히기 때문에, 2분 루프로 계속 돌려 멈춘 과거가 아니라 움직이는 현장으로 보이게 했습니다.",
      en: "Traces and tools left in the printmaking studio, collected into posters, then loaded into floppy disks inside the video. Stored and left alone, a record quietly closes; looping it for two minutes keeps it a site still in motion rather than a past that has stopped."
    },
    caption: {
      ko: "2025, 단채널 비디오 — 컬러, 무음, 2분 루프, 아이패드 설치",
      en: "2025, single-channel video — color, silent, 2 min loop, shown on a wall-mounted iPad"
    },
    cover: "trace-01.jpg",
    images: [],
    spreadsLabel: { ko: "전시 전경", en: "Installation view" },
    spreads: ["trace-01.jpg"],
    body: [
      "〈Trace〉는 판화실의 흔적과 도구들을 수집해 포스터로 디자인한 뒤, 수집된 기록물을 영상 속 플로피디스크에 담아 아카이브를 구축한 작업입니다.",
      "단순히 저장만 했을 때 발생하는 정적인 은폐성을 극복하고자 반복 재생되는 영상으로 구성했습니다. 감상자는 멈춰 있는 과거가 아니라 끊임없이 움직이는 ‘동적인 아카이브 현장’을 마주하게 됩니다.",
      "전시장에서는 벽에 고정한 아이패드로 2분 루프를 계속 재생했습니다. 모니터도 프로젝터도 아닌, 손에 들던 화면을 벽에 박아두는 방식이 기록을 다루는 이 작업의 태도와 맞는다고 봤습니다."
    ]
  }
];
