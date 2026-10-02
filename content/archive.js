/* =============================================================
   나만의 아카이브 — 영감이 된 것들.
     kind  : 'image' | 'music' | 'space' | 'text' | 'book'
     title / note : 제목과 짧은 메모
     src   : (image인 경우) "/images/archive/파일이름.jpg" — 16:9로 잘려 보입니다
     url   : (선택) 링크. 음악이면 유튜브/스포티파이 주소
     date  : "2026.02"
   사진을 넣으려면 portfolio/images/archive/ 폴더에 파일을 넣고
   src 에 "/images/archive/파일이름.jpg" 라고 적으면 됩니다.
   ============================================================= */

window.ARCHIVE = [
  {
    kind: "book",
    date: "2025",
    title: "윌리엄 해즐릿, 『혐오의 즐거움에 관하여』",
    note: "혐오는 회피해야 할 감정이 아니라 살아 있음을 확인하게 하는 모순적인 감정 중 하나라는 문장. 에칭 작업과 북 디자인이 모두 여기서 출발했다.",
    en: {
      title: "William Hazlitt, 『On the Pleasure of Hating』",
      note: "The line that disgust is not something to be avoided but one of the contradictory feelings that prove you are alive. Both the etchings and the book design started here."
    }
  },
  {
    kind: "book",
    date: "2025",
    title: "C.S. 루이스, 『나니아 연대기』",
    note: "버려지는 영수증을 차원 이동 티켓으로 바꿔 본 이유. 사소한 사물도 하나의 세계관을 매개하는 서사적 물질이 될 수 있다.",
    en: {
      title: "C.S. Lewis, 『The Chronicles of Narnia』",
      note: "Why a thrown-away receipt became a ticket between worlds. Even a trivial object can carry a whole world, if you let it."
    }
  },
  {
    kind: "text",
    date: "2025",
    title: "“잠시만”",
    note: "멈추고 숨을 고르기 위한 최소한의 여지를 만들어내는 말. 이어폰을 꽂는 순간이 나에게는 그 ‘잠시’다.",
    en: {
      title: "“Just a moment”",
      note: "A phrase that opens the smallest possible room to stop and catch your breath. For me that moment is the second the earphones go in."
    }
  },
  {
    kind: "space",
    date: "2025",
    title: "판화실",
    note: "누군가에게는 사소해 보이지만 판화인들에게는 창작의 필수적인 궤적. 흔적과 도구들을 모아 아카이브로 만들었다.",
    en: {
      title: "The printmaking studio",
      note: "Trivial to most people, but to printmakers it is the necessary trace of the work. I collected those marks and tools and made them into an archive."
    }
  }

  /* 여기에 새 항목을 추가하세요 ↓ (윗줄 } 뒤에 쉼표 , 를 꼭 붙이고)
  ,{
    kind: "music",
    date: "2026.03",
    title: "곡 제목 — 아티스트",
    note: "왜 남겨두고 싶은지 한두 줄.",
    url: "https://..."
  },
  {
    kind: "image",
    date: "2026.03",
    title: "사진 제목",
    note: "어디서, 왜.",
    src: "/images/archive/내사진.jpg"
  }
  */
];
