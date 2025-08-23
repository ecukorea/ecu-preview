import { Conversation } from "@/lib/types"

export const data: Conversation[] = [
  {
    title: "고난의 유익",
    description: "두 친구가 고난을 통한 하나님의 뜻에 대해 이야기하고 있습니다.",
    steps: [
      {
        messages: [
          {
            speaker: "person1",
            name: "민수",
            emoji: "😢",
            message: "요즘 너무 힘들어... 하나님이 사랑이시라면 왜 나에게 이런 고통을 주시는 걸까?",
          },
          {
            speaker: "person2",
            name: "영희",
            emoji: "😌",
            message: "민수야, 나도 그런 생각 해봤어. 근데 고난에도 하나님의 뜻이 있다고 생각해.",
          },
        ],
        choice: {
          prompt: "영희는 어떻게 위로할까요?",
          options: [
            "고난을 통해 우리가 성장하고 하나님을 더 의존하게 된다고 말한다",
            "그냥 참고 견디면 언젠가는 좋아질 거라고 말한다",
          ],
          outcomes: [
            [
              {
                speaker: "person2",
                name: "영희",
                emoji: "💪",
                message:
                  "로마서 5장 3-4절을 보면 '환난 중에도 즐거워하나니 환난은 인내를, 인내는 연단을, 연단은 소망을 이루는 줄 앎이로다'라고 했어.",
              },
              {
                speaker: "person1",
                name: "민수",
                emoji: "🤔",
                message:
                  "그럼 고난이 나를 더 강하게 만들어주는 거구나... 하나님께서 나를 단련시키시는 건가?",
              },
              {
                speaker: "person2",
                name: "영희",
                emoji: "🙏",
                message:
                  "맞아! 고난을 통해 우리는 하나님을 더 깊이 알게 되고, 다른 사람들을 위로할 수 있게 돼.",
              },
            ],
            [
              {
                speaker: "person2",
                name: "영희",
                emoji: "😕",
                message:
                  "음... 그런데 그냥 참는 것만이 답은 아닌 것 같아. 고난에는 분명 의미가 있을 거야.",
              },
              {
                speaker: "person1",
                name: "민수",
                emoji: "😔",
                message: "그럼 이 고난의 의미를 어떻게 찾을 수 있을까?",
              },
              {
                speaker: "person2",
                name: "영희",
                emoji: "📖",
                message: "함께 성경을 읽어보자. 분명 하나님의 뜻을 알 수 있을 거야.",
              },
            ],
          ],
        },
      },
    ],
    category: "고난",
    type: "conversation",
  },
  // {
  //   title: "성경의 무오성",
  //   description: "두 친구가 성경의 진리성과 신뢰성에 대해 나누고 있습니다.",
  //   steps: [
  //     {
  //       messages: [
  //         {
  //           speaker: "person1",
  //           name: "철수",
  //           emoji: "😓",
  //           message: "성경이 정말 하나님의 말씀일까? 사람이 쓴 책인데 어떻게 완전무결할 수 있어?",
  //         },
  //         {
  //           speaker: "person2",
  //           name: "수지",
  //           emoji: "🤔",
  //           message: "철수야, 나도 그런 의문이 들 때가 있어. 하지만 성경은 정말 특별한 책이야.",
  //         },
  //       ],
  //       choice: {
  //         prompt: "수지는 어떻게 설명할까요?",
  //         options: [
  //           "성경은 하나님의 영감으로 기록되었고 수많은 예언이 성취되었다고 설명한다",
  //           "그냥 믿음으로 받아들이라고 말한다",
  //         ],
  //         outcomes: [
  //           [
  //             {
  //               speaker: "person2",
  //               name: "수지",
  //               emoji: "📖",
  //               message:
  //                 "베드로후서 1:21을 보면 '예언은 언제든지 사람의 뜻으로 낸 것이 아니요 오직 성령의 감동하심을 받은 사람들이 하나님께 받아 말한 것임이라'고 했어.",
  //             },
  //             {
  //               speaker: "person1",
  //               name: "철수",
  //               emoji: "💡",
  //               message:
  //                 "그럼 성경은 하나님이 직접 영감을 주셔서 기록된 거구나! 그래서 신뢰할 수 있는 거야?",
  //             },
  //             {
  //               speaker: "person2",
  //               name: "수지",
  //               emoji: "✨",
  //               message:
  //                 "맞아! 그리고 성경의 수많은 예언들이 정확히 성취된 것을 보면 하나님의 말씀임을 알 수 있어.",
  //             },
  //           ],
  //           [
  //             {
  //               speaker: "person2",
  //               name: "수지",
  //               emoji: "😕",
  //               message:
  //                 "음... 그런데 그냥 믿음으로만 받아들이라고 하면 의문이 해결되지 않을 것 같은데?",
  //             },
  //             {
  //               speaker: "person1",
  //               name: "철수",
  //               emoji: "🤔",
  //               message: "맞아, 나도 납득할 만한 설명이 필요해. 어떻게 확신할 수 있을까?",
  //             },
  //             {
  //               speaker: "person2",
  //               name: "수지",
  //               emoji: "📖",
  //               message:
  //                 "그럼 성경이 얼마나 정확한지 함께 알아보자. 고고학적 발견들도 성경을 뒷받침해줘.",
  //             },
  //           ],
  //         ],
  //       },
  //     },
  //   ],
  //   category: "성경론",
  //   type: "conversation",
  // },
]