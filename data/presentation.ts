import { Presentation } from "@/lib/types"

export const data: Presentation[] = [
  // ECU PBS (Personal Bible Study) 체험
  {
    title: "ECU PBS 체험",
    description: "ECU에서 진행하는 Personal Bible Study 방식을 경험해보세요",
    chapter: "ECU PBS: 요한일서 2장 함께 나누기",
    slides: [
      {
        content: `**ECU 토요모임**에서는 매주 \`PBS\`(Personal Bible Study)를 진행합니다.
어떤식으로 함께 말씀을 나누는지 경험해보세요.`,
        speaker: {
          name: "ECU PBS 소개",
          avatar: "/placeholder-user.jpg",
          emoji: "📖",
        },
        lottie: {
          src: [
            "/assets/lottie/male-02.lottie",
            "/assets/lottie/female-01.lottie",
            "/assets/lottie/female-02.lottie",
            "/assets/lottie/male-04.lottie",
          ],
          width: 120,
          height: 120,
        },
        duration: 6000,
        type: "lottie",
      },
      {
        content: "`요한일서 2장 PBS` 다들 잘 해오셨나요? 어렵지는 않았나요?",
        speaker: {
          name: "준수",
          avatar: "/placeholder-user.jpg",
          emoji: "👨‍🏫",
        },
        lottie: {
          src: ["/assets/lottie/male-02.lottie"],
          width: 200,
          height: 200,
        },
        duration: 4000,
        type: "lottie",
      },
      {
        content:
          "나의 자녀들아 내가 이것을 너희에게 씀은 너희로 죄를 범하지 않게 하려 함이라... (요한일서 2장)",
        speaker: {
          name: "요한일서 2장",
          avatar: "/placeholder-logo.png",
          emoji: "📖",
        },
        duration: 5000,
        type: "quote",
      },
      {
        content:
          "`PBS`는 크게 세 단계로 나눠요. **관찰**, **해석**, **적용**입니다. 먼저 **관찰**부터 시작해볼까요?",
        speaker: {
          name: "준수",
          avatar: "/placeholder-user.jpg",
          emoji: "👨‍🏫",
        },
        lottie: {
          src: ["/assets/lottie/male-02.lottie"],
          width: 200,
          height: 200,
        },
        duration: 5000,
        type: "lottie",
      },
      {
        content: "**1단계: 관찰** - 본문에서 무엇을 발견했나요?",
        speaker: {
          name: "준수",
          avatar: "/placeholder-user.jpg",
          emoji: "🔍",
        },
        lottie: {
          src: ["/assets/lottie/male-02.lottie"],
          width: 200,
          height: 200,
        },
        duration: 4000,
        type: "lottie",
      },
      {
        content:
          "문맥을 보니까, 전에는 __빛이신 하나님__ 안에서 살아야한다고 하고,\n후에는 **말과 혀로만 사랑하지 말고** 행함과 진실함으로 하자고 하네요.",
        speaker: {
          name: "수연",
          avatar: "/placeholder-user.jpg",
          emoji: "🤔",
        },
        lottie: {
          src: ["/assets/lottie/female-02.lottie"],
          width: 200,
          height: 200,
        },
        duration: 6000,
        type: "lottie",
      },
      {
        content: "좋은 관찰이에요! 또 다른 **관찰**이 있나요?",
        speaker: {
          name: "준수",
          avatar: "/placeholder-user.jpg",
          emoji: "👨‍🏫",
        },
        lottie: {
          src: ["/assets/lottie/male-02.lottie"],
          width: 200,
          height: 200,
        },
        duration: 4000,
        type: "lottie",
      },
      {
        content:
          "본문을 나눠보니\n`1-6절`은 우리 안에 계시는 **예수 그리스도**,\n`7-11절`은 **빛 가운데 거하며** 형제를 사랑하라,\n`12-14절`은 우리의 __지위에 대한 내용__ 같아요.",
        speaker: {
          name: "민지",
          avatar: "/placeholder-user.jpg",
          emoji: "📝",
        },
        lottie: {
          src: ["/assets/lottie/male-02.lottie"],
          width: 200,
          height: 200,
        },
        duration: 6000,
        type: "lottie",
      },
      {
        content: "**2단계: 해석** - 이 말씀의 의미는 무엇일까요?",
        speaker: {
          name: "준수",
          avatar: "/placeholder-user.jpg",
          emoji: "💡",
        },
        lottie: {
          src: ["/assets/lottie/male-02.lottie"],
          width: 200,
          height: 200,
        },
        duration: 4000,
        type: "lottie",
      },
      {
        content:
          "본문을 요약해보면,\n**예수님께서는** 우리 안에 계시면서 말씀을 깨닫게 해주시고 우리를 가르쳐 주시니,\n미혹하는 자들의 거짓말에 속지 말고 __의로우신 주님안에서 살아가야__ 한다는 거 같아요.",
        speaker: {
          name: "태민",
          avatar: "/placeholder-user.jpg",
          emoji: "💭",
        },
        lottie: {
          src: ["/assets/lottie/male-04.lottie"],
          width: 200,
          height: 200,
        },
        duration: 7000,
        type: "lottie",
      },
      {
        content: "맞아요. 그런데 왜 `'그가 행하시는 대로 자기도 행한다'`고 할까요?",
        speaker: {
          name: "준수",
          avatar: "/placeholder-user.jpg",
          emoji: "👨‍🏫",
        },
        lottie: {
          src: ["/assets/lottie/male-02.lottie"],
          width: 200,
          height: 200,
        },
        duration: 5000,
        type: "lottie",
      },
      {
        content:
          "본문에서 `'우리가 그의 안에 있다'`, `'그의 안에 산다'`라고 표현하는데,\n이는 **그리스도와 인간적인 관계를 유지**하는 것을 의미하는 것 같아요.",
        speaker: {
          name: "민지",
          avatar: "/placeholder-user.jpg",
          emoji: "✨",
        },
        lottie: {
          src: ["/assets/lottie/female-01.lottie"],
          width: 200,
          height: 200,
        },
        duration: 7000,
        type: "lottie",
      },
      {
        content: "이제 **3단계: 적용**입니다. 먼저 __믿어야 할 것__이 있나요?",
        speaker: {
          name: "준수",
          avatar: "/placeholder-user.jpg",
          emoji: "🙏",
        },
        lottie: {
          src: ["/assets/lottie/male-02.lottie"],
          width: 200,
          height: 200,
        },
        duration: 4000,
        type: "lottie",
      },
      {
        content:
          "**예수님께서는** 내가 죄로 인해 심판 받을 운명에서 건져주셨어요.\n나중에 하나님 앞에 서게 될 때 __의로우신 주님께서 나를 대신해서 말씀해주실 것__을 믿어야겠어요.",
        speaker: {
          name: "수연",
          avatar: "/placeholder-user.jpg",
          emoji: "💕",
        },
        duration: 6000,
        type: "text",
      },
      {
        content:
          "예수님을 만나게 된 나는 이제 빛 가운데 있어요.\n그러니 형제를 미워하는 어둠과 함께할 수 없어요.\n혹시나 내 마음속에 미워하는 어둠이 찾아온다면,\n빨리 이 어둠을 내 삶에서 밀어내야 해요.",
        speaker: {
          name: "민지",
          avatar: "/placeholder-user.jpg",
          emoji: "😊",
        },
        duration: 7000,
        type: "text",
      },
      {
        content: "__찬양할 것__은 무엇인가요?",
        speaker: {
          name: "준수",
          avatar: "/placeholder-user.jpg",
          emoji: "👨‍🏫",
        },
        lottie: {
          src: ["/assets/lottie/male-02.lottie"],
          width: 200,
          height: 200,
        },
        duration: 3000,
        type: "lottie",
      },
      {
        content:
          "나를 **구원하신 하나님**께 감사해요.\n__구원의 은혜를 누리게__ 하시니 감사하고,\n말씀을 점점 알아가게 하시는 주님께 감사해요!",
        speaker: {
          name: "태민",
          avatar: "/placeholder-user.jpg",
          emoji: "🙌",
        },
        duration: 6000,
        type: "text",
      },
      {
        content:
          "내가 어둠속에서 해맬 때에, 나를 빛으로 이끌어내신 하나님께 감사해요.\n하나님과 함께 승리를 경험하게 하시니 감사하고,\n세상과 비교조차 되지 않는 하나님의 사랑에 감사해요.",
        speaker: {
          name: "민지",
          avatar: "/placeholder-user.jpg",
          emoji: "😭",
        },
        duration: 7000,
        type: "text",
      },
      {
        content: "__회개할 것__이 있다면?",
        speaker: {
          name: "준수",
          avatar: "/placeholder-user.jpg",
          emoji: "👨‍🏫",
        },
        lottie: {
          src: ["/assets/lottie/male-02.lottie"],
          width: 200,
          height: 200,
        },
        duration: 3000,
        type: "lottie",
      },
      {
        content:
          "말씀을 잘 모르기 때문에 **세상의 것들을 사랑하는 것**이 당연한데,\n왜 세상의 것들을 더 사랑하느냐고 __정죄하던 마음__을 회개해요.\n어떻게 잘 알려줄지 고민하지 못한 것을 회개해요.",
        speaker: {
          name: "민지",
          avatar: "/placeholder-user.jpg",
          emoji: "😔",
        },
        duration: 7000,
        type: "text",
      },
      {
        content:
          "정죄하기보다는 그들을 위한, 한국 교회를 위한,\n캠퍼스의 학생들을 위한 기도를 할 수 없었던 것을 회개해요.\n나 스스로도 습관적인 경건 생활만 억지로 하고 있던 것을 회개해요.",
        speaker: {
          name: "민지",
          avatar: "/placeholder-user.jpg",
          emoji: "😢",
        },
        duration: 6000,
        type: "text",
      },
      {
        content: "__간구할 것__이 있나요?",
        speaker: {
          name: "준수",
          avatar: "/placeholder-user.jpg",
          emoji: "👨‍🏫",
        },
        lottie: {
          src: ["/assets/lottie/male-02.lottie"],
          width: 200,
          height: 200,
        },
        duration: 3000,
        type: "lottie",
      },
      {
        content:
          "이 세상과 비교조차 되지 않도록 **하나님을 더욱 사랑할 수 있도록**,\n내게 __은혜를 더욱 주시기를__ 간구해요.",
        speaker: {
          name: "수연",
          avatar: "/placeholder-user.jpg",
          emoji: "🙏",
        },
        duration: 7000,
        type: "text",
      },
      {
        content:
          "우리가 세상의 소리에 흔들리지 않도록,\n하나님의 원하심을 알고 그 아는 것으로 세상과 맞서 싸우며\n승리를 더욱 경험하는 하나님의 일꾼들 되도록 간구해요.",
        speaker: {
          name: "태민",
          avatar: "/placeholder-user.jpg",
          emoji: "✨",
        },
        duration: 7000,
        type: "text",
      },
      {
        content: "__즉시 취해야 할 행동__이 있나요?",
        speaker: {
          name: "준수",
          avatar: "/placeholder-user.jpg",
          emoji: "👨‍🏫",
        },
        lottie: {
          src: ["/assets/lottie/male-02.lottie"],
          width: 200,
          height: 200,
        },
        duration: 4000,
        type: "lottie",
      },
      {
        content:
          "오늘은 **한국교회를 위해서**, 또 **세계 복음화를 위해서** 더욱 기도해야겠어요.\n나의 부족함을 보며 한계를 짓기 보다는,\n__하나님의 완전하심과 전지전능하심__을 더욱 보게 해달라고 기도해야겠어요.",
        speaker: {
          name: "수연",
          avatar: "/placeholder-user.jpg",
          emoji: "📝",
        },
        duration: 8000,
        type: "text",
      },
      {
        content:
          "말씀을 우선순위로 둘 수 있도록,\n하나님의 말씀이 내 속에 거하도록 기도하겠어요.\n아이들 수준에서 벗어나서 아비들, 청년들 수준으로 가기 위한\n마음가짐을 가져야겠어요.",
        speaker: {
          name: "민지",
          avatar: "/placeholder-user.jpg",
          emoji: "💪",
        },
        duration: 8000,
        type: "text",
      },
      {
        content:
          "다음 분기 계획을 잘 세워서,\n다음학기 주님과 동행하며 한양대 멤버들에게 사랑을 실천할 수 있도록 해야겠어요.\n거룩한 습관을 들이기 위해\n수련회 기간동안 말씀 10장씩 읽기를 실천하겠어요!",
        speaker: {
          name: "태민",
          avatar: "/placeholder-user.jpg",
          emoji: "📖",
        },
        duration: 7000,
        type: "text",
      },
      {
        content:
          "이제 각자 개인적인 나눔을 해보는 시간을 가져볼까요?\n한 사람이 나눔을 다 하면 조원들이 질문하는 형태로 진행됩니다.",
        speaker: {
          name: "준수",
          avatar: "/placeholder-user.jpg",
          emoji: "👨‍🏫",
        },
        lottie: {
          src: ["/assets/lottie/male-02.lottie"],
          width: 200,
          height: 200,
        },
        duration: 6000,
        type: "lottie",
      },
      {
        content:
          "민지의 나눔:\n하나님을 제대로 섬기는 자의 삶에 대해 생각해보게 되었어요.\n예수님의 계명을 지킨다는 것은 서로 사랑하는 것,\n예수님 안에 사는 것이라는걸 깨달았어요.",
        speaker: {
          name: "민지",
          avatar: "/placeholder-user.jpg",
          emoji: "💭",
        },
        lottie: {
          src: ["/assets/lottie/male-02.lottie"],
          width: 200,
          height: 200,
        },
        duration: 8000,
        type: "lottie",
      },
      {
        content:
          "수연의 나눔:\n하나님을 믿는다는 것이 무엇인지 깊이 생각하게 되었어요.\n계명대로 살지 않으면 거짓된 것이라는 말씀이 마음에 와닿았어요.\n조금이라도 보답하고 싶은 마음이 들어요.",
        speaker: {
          name: "수연",
          avatar: "/placeholder-user.jpg",
          emoji: "💕",
        },
        lottie: {
          src: ["/assets/lottie/female-02.lottie"],
          width: 200,
          height: 200,
        },
        duration: 8000,
        type: "lottie",
      },
      {
        content:
          "태민의 나눔:\n하나님을 사랑한다는 개념을 어느순간부터 잃어버린 것 같아서 멘붕이 왔어요.\n해야하니까 하는 것이고...\n어쩌면 안 사랑하고 있는 것일수도 있겠구나 싶어요.",
        speaker: {
          name: "태민",
          avatar: "/placeholder-user.jpg",
          emoji: "💪",
        },
        lottie: {
          src: ["/assets/lottie/female-01.lottie"],
          width: 200,
          height: 200,
        },
        duration: 8000,
        type: "lottie",
      },
      {
        content:
          "준수의 나눔:\n그리스도인이라면 반드시 계명을 지켜야한다는 말씀이 와닿았어요.\n말씀을 지킴으로 사랑이 온전해진다는 것을 깨달았고,\n전도도 사랑의 표현이라는 것을 알게 되었어요.",
        speaker: {
          name: "준수",
          avatar: "/placeholder-user.jpg",
          emoji: "🤔",
        },
        lottie: {
          src: ["/assets/lottie/male-02.lottie"],
          width: 200,
          height: 200,
        },
        duration: 8000,
        type: "lottie",
      },
      {
        content:
          "정말 좋은 나눔이었어요.\n이렇게 **ECU**에서는 `관찰-해석-적용`의 단계로\n말씀을 깊이 나누며 __삶에 적용해 나가고__ 있습니다.",
        speaker: {
          name: "준수",
          avatar: "/placeholder-user.jpg",
          emoji: "👨‍🏫",
        },
        lottie: {
          src: ["/assets/lottie/male-02.lottie"],
          width: 200,
          height: 200,
        },
        duration: 7000,
        type: "lottie",
      },
      {
        content:
          "여러분도 ECU에서 이런 깊이 있는 성경공부와 삶의 나눔을 경험해보시지 않으시겠어요?\n함께 하나님의 말씀으로 성장해 나가요!",
        speaker: {
          name: "ECU 초청",
          avatar: "/placeholder-user.jpg",
          emoji: "🙌",
        },
        lottie: {
          src: [
            "/assets/lottie/female-01.lottie",
            "/assets/lottie/male-02.lottie",
            "/assets/lottie/female-02.lottie",
            "/assets/lottie/male-04.lottie",
          ],
          width: 150,
          height: 150,
        },
        duration: 8000,
        type: "lottie",
      },
    ],
    category: "ECU 소개",
    type: "presentation",
  },
]