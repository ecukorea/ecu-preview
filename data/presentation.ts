import { Presentation } from "@/lib/types"

export const data: Presentation[] = [
  // 프레젠테이션 스타일 - 로마서 8장 Deep Study
  {
    title: "로마서 8장 스터디 그룹",
    description: "4명의 대학생이 로마서 8장의 깊은 진리를 발견해가는 여정",
    chapter: "로마서 8장: 정죄함이 없다!",
    slides: [
      {
        content:
          "안녕하세요! 저희는 로마서 8장을 함께 공부하는 대학생들이에요.\n오늘 여러분과 함께 '정죄함이 없다!'는 놀라운 진리를 나누고 싶어요.",
        speaker: {
          name: "스터디 그룹",
          avatar: "/placeholder-user.jpg",
          emoji: "👥",
        },
        lottie: {
          src: [
            "/assets/lottie/female-01.lottie",
            "/assets/lottie/male-02.lottie",
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
        content: "그러므로 이제 그리스도 예수 안에 있는 자에게는 결코 정죄함이 없나니",
        speaker: {
          name: "로마서 8:1",
          avatar: "/placeholder-logo.png",
          emoji: "📖",
        },
        duration: 4000,
        type: "quote",
      },
      {
        content:
          "정말 놀라운 말씀이에요! 하나님은 우리의 신앙생활이 미지근하다고, 잘 못한다고 벌을 주시는 분이 아니시라는 거죠.",
        speaker: {
          name: "민지",
          avatar: "/placeholder-user.jpg",
          emoji: "✨",
        },
        duration: 5000,
        type: "text",
      },
      {
        content:
          "저는 준호예요. 예전엔 벌 받을까봐 두려워서 하나님을 섬겼는데, 그게 진짜 사랑의 관계가 아니더라구요.",
        speaker: {
          name: "준호",
          avatar: "/placeholder-user.jpg",
          emoji: "🤔",
        },
        lottie: {
          src: ["/assets/lottie/male-02.lottie"],
          width: 220,
          height: 220,
        },
        duration: 6000,
        type: "lottie",
      },
      {
        content: "맞아요! 부모님의 사랑을 깨닫고 효도하는 것이 진짜예요. 하나님께도 마찬가지죠.",
        speaker: {
          name: "수연",
          avatar: "/placeholder-user.jpg",
          emoji: "🙏",
        },
        lottie: {
          src: ["/assets/lottie/female-02.lottie"],
          width: 220,
          height: 220,
        },
        duration: 5000,
        type: "lottie",
      },
      {
        content:
          "그런데 로마서 8장에서 성령님이 무차별적으로 등장하시는 거 보셨어요? 2절, 4절, 9절, 11절, 13절, 16절, 26절...",
        speaker: {
          name: "태민",
          avatar: "/placeholder-user.jpg",
          emoji: "💪",
        },
        lottie: {
          src: ["/assets/lottie/male-04.lottie"],
          width: 220,
          height: 220,
        },
        duration: 6000,
        type: "lottie",
      },
      {
        content: "성령님이 우리를 어떻게 도우시는지 알고 계신가요?",
        speaker: {
          name: "민지",
          avatar: "/placeholder-user.jpg",
          emoji: "🤔",
        },
        duration: 3000,
        type: "question",
      },
      {
        content: "첫째, 우리를 해방시키세요! 죄와 사망의 법에서 자유롭게 하시죠.",
        speaker: {
          name: "준호",
          avatar: "/placeholder-user.jpg",
          emoji: "🔓",
        },
        duration: 4000,
        type: "text",
      },
      {
        content: "둘째, 죽을 몸을 살리세요! 영에 속한 자로 살아나게 하시죠.",
        speaker: {
          name: "수연",
          avatar: "/placeholder-user.jpg",
          emoji: "🌱",
        },
        duration: 4000,
        type: "text",
      },
      {
        content: "영으로써 몸의 행실을 죽이면 살리라",
        speaker: {
          name: "로마서 8:13",
          avatar: "/placeholder-logo.png",
          emoji: "📖",
        },
        duration: 3000,
        type: "quote",
      },
      {
        content:
          "자기 힘으로는 절대 거룩해질 수 없어요. 성령님의 힘으로 싸워야 하죠. 그래서 매일 말씀과 기도가 필요한 거구나!",
        speaker: {
          name: "태민",
          avatar: "/placeholder-user.jpg",
          emoji: "⚔️",
        },
        lottie: {
          src: ["/assets/lottie/male-04.lottie"],
          width: 200,
          height: 200,
        },
        duration: 6000,
        type: "lottie",
      },
      {
        content: "왜 이런 삶을 살아야 할까요? 바로 우리가 하나님의 자녀이기 때문이에요!",
        speaker: {
          name: "민지",
          avatar: "/placeholder-user.jpg",
          emoji: "👑",
        },
        duration: 4000,
        type: "question",
      },
      {
        content: "성령이 친히 우리 영과 더불어 우리가 하나님의 자녀인 것을 증언하시나니",
        speaker: {
          name: "로마서 8:16",
          avatar: "/placeholder-logo.png",
          emoji: "📖",
        },
        duration: 4000,
        type: "quote",
      },
      {
        content: "우리는 상속자예요! 그리스도와 함께 한 후사! 그런데 영광 전에 고난도 있어요.",
        speaker: {
          name: "수연",
          avatar: "/placeholder-user.jpg",
          emoji: "💎",
        },
        lottie: {
          src: ["/assets/lottie/female-02.lottie"],
          width: 200,
          height: 200,
        },
        duration: 5000,
        type: "lottie",
      },
      {
        content: "생각하건대 현재의 고난은 장차 우리에게 나타날 영광과 비교할 수 없도다",
        speaker: {
          name: "로마서 8:18",
          avatar: "/placeholder-logo.png",
          emoji: "📖",
        },
        duration: 4000,
        type: "quote",
      },
      {
        content:
          "고난을 이기는 방법은 '생각하는 것'이에요. 현재의 고난과 장차 올 영광을 비교해보는 거죠!",
        speaker: {
          name: "준호",
          avatar: "/placeholder-user.jpg",
          emoji: "💭",
        },
        duration: 5000,
        type: "text",
      },
      {
        content:
          "그런데 정말 감동적인 건 26절이에요. 성령님이 우리를 위해 직접 기도해주신다는 거예요!",
        speaker: {
          name: "수연",
          avatar: "/placeholder-user.jpg",
          emoji: "😭",
        },
        duration: 5000,
        type: "text",
      },
      {
        content: "성령이 말할 수 없는 탄식으로 우리를 위하여 친히 간구하시느니라",
        speaker: {
          name: "로마서 8:26",
          avatar: "/placeholder-logo.png",
          emoji: "📖",
        },
        duration: 4000,
        type: "quote",
      },
      {
        content:
          "기도도 안 나오고 어떻게 해야 할지 모를 때... 성령님이 우리를 위해 탄식하며 기도해주세요!",
        speaker: {
          name: "태민",
          avatar: "/placeholder-user.jpg",
          emoji: "🙏",
        },
        lottie: {
          src: ["/assets/lottie/male-04.lottie"],
          width: 180,
          height: 180,
        },
        duration: 5000,
        type: "lottie",
      },
      {
        content:
          "그리고 28절! 모든 것이 합력하여 선을 이루시는데, 이건 만사가 잘 된다는 뜻이 아니라...",
        speaker: {
          name: "민지",
          avatar: "/placeholder-user.jpg",
          emoji: "🤝",
        },
        duration: 5000,
        type: "text",
      },
      {
        content:
          "하나님을 사랑하는 자 곧 그의 뜻대로 부르심을 입은 자들에게는 모든 것이 합력하여 선을 이루느니라",
        speaker: {
          name: "로마서 8:28",
          avatar: "/placeholder-logo.png",
          emoji: "📖",
        },
        duration: 5000,
        type: "quote",
      },
      {
        content:
          "우리를 기다리시고 우리가 순전해지는 과정에서 모든 것이 합력하여 선을 이룬다는 뜻이에요!",
        speaker: {
          name: "준호",
          avatar: "/placeholder-user.jpg",
          emoji: "🎯",
        },
        duration: 5000,
        type: "text",
      },
      {
        content: "그런데 정말 놀라운 건 31절부터예요. 하나님의 사랑이 절대 바뀌지 않는다는 거죠!",
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
        duration: 5000,
        type: "lottie",
      },
      {
        content:
          "자기 아들을 아끼지 아니하시고 우리 모든 사람을 위하여 내주신 이가 어찌 그 아들과 함께 모든 것을 우리에게 주지 아니하겠느냐",
        speaker: {
          name: "로마서 8:32",
          avatar: "/placeholder-logo.png",
          emoji: "📖",
        },
        duration: 6000,
        type: "quote",
      },
      {
        content:
          "마귀가 고발해도, 예수님이 정죄하지도 않으시고, 환란이나 곤고나 박해가 와도 우리를 사랑에서 끊을 수 없어요!",
        speaker: {
          name: "태민",
          avatar: "/placeholder-user.jpg",
          emoji: "🛡️",
        },
        duration: 6000,
        type: "text",
      },
      {
        content:
          "내가 확신하노니 사망이나 생명이나... 어떤 피조물이라도 우리를 우리 주 그리스도 예수 안에 있는 하나님의 사랑에서 끊을 수 없으리라",
        speaker: {
          name: "로마서 8:38-39",
          avatar: "/placeholder-logo.png",
          emoji: "📖",
        },
        duration: 7000,
        type: "quote",
      },
      {
        content:
          "천국 백성이라는 확신이 있어야 해요. 미지근한 신앙일지라도 다시 일어날 수 있는 힘이 바로 여기서 나와요!",
        speaker: {
          name: "민지",
          avatar: "/placeholder-user.jpg",
          emoji: "👑",
        },
        lottie: {
          src: ["/assets/lottie/female-01.lottie"],
          width: 200,
          height: 200,
        },
        duration: 6000,
        type: "lottie",
      },
      {
        content:
          "로마서 8장이 우리에게 주는 메시지는 명확해요.\n정죄함이 없고, 성령님이 도우시며, 하나님의 사랑은 영원하다!",
        speaker: {
          name: "4명 모두",
          avatar: "/placeholder-user.jpg",
          emoji: "🙌",
        },
        duration: 6000,
        type: "text",
      },
    ],
    category: "성경공부",
    type: "presentation",
  },
]