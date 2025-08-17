"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Trophy, Star, Award } from "lucide-react"
import { QuestionComponent } from "@/components/question-component"
import { ConversationComponent } from "@/components/conversation-component"
import { InteractionItem, UserProgress, Question, Conversation } from "@/lib/types"

const interactions: InteractionItem[] = [
  // 구원의 확신
  {
    id: 1,
    scenario: "교회를 20년간 다닌 친구가 이렇게 물어보고 있어요. 어떻게 대답해주면 좋을까요?",
    friendQuestion: "나는 내일 당장 예수님이 오시지는 않으면 좋겠어. 나는 정말 구원받았을까? 확신이 서지 않아...",
    emoji: "😟",
    options: [
      "예수님이 너 대신 죽으신 것을 믿어? 너의 감정이 아니라 하나님의 말씀을 믿어보자.",
      "그런 생각은 하지 마. 그냥 믿으면 되는 거야.",
      "교회에 더 열심히 나가면 확신이 생길 거야.",
      "나도 가끔 그런 생각이 들어. 완전히 정상이야.",
    ],
    correctAnswer: 0,
    explanation:
      `우리가 구원의 확신을 가질 수 있는 근거는 우리의 감정이나 신념이 아니라 예수님을 믿으면 구원을 주신다는 하나님의 말씀에 있습니다.
하나님은 결코 말을 바꾸거나 거짓말하지 않는 분이시기 때문에 우리는 그 말씀을 신뢰할 수 있습니다.
하나님은 우리를 사랑해서 예수님을 이 땅에 보내시고 우리 죄 대신 죽게 하셨다가 다시 살리셨습니다.
예수님을 믿는 자는 영생을 얻으며 사망에서 생명으로 옮겨지는 구원을 받습니다.`,
    // TODO: Tooltip 기능 추가
    // 참고 말씀: 요 3:16-17, 요 5:24, 롬 10:9-10, 롬 6:3-7, 롬9-11 `,
    category: "구원론",
    type: "question",
  },
  // 구원 받은 이후에
  {
    id: 2,
    scenario: "방금 예수님을 영접한 친구가 이렇게 물어보는데, 어떻게 답변하면 좋을까요?",
    friendQuestion: "나는 이제 구원 받았는데, 그러면 그냥 내 마음대로 살아도 되는 거야?",
    emoji: "😅",
    options: [
      "물론이지~ 죄를 짓고 바로 회개하면 돼!",
      "아니지. 이제부터는 찬양팀이나, 교회학교 교사 같은 봉사를 열심히 해야 돼.",
      "구원은 하나님의 은혜로 받는 것이지만, 그 은혜에 합당한 삶을 살아야 해. 예수님을 따르는 삶이 중요해.",
      "구원 받았는데 뭘 그런 고민을 해? 그냥 교회 열심히 다니고 예배 잘 드려.",
      "너 그러다가 구원이 취소될 수 있어. 구원 여부는 죽을 때 까지 모르는거니까 너 잘 살아야 돼.",
    ],
    correctAnswer: 2,
    explanation:
      `구원받은 우리는 의의 종이 되어 거룩함에 이르러야 합니다.
그러기 위해 말씀을 사모해야 하며, 그런 사람들은 구원에 이르도록 자라게 됩니다.
우리가 타는 불 못에서 건짐받은 사실 자체로만 만족하면 안 됩니다.
거듭난 그리스도인은 계속 자라서 주님을 닮아가야 합니다.
영적으로 태어난 그리스도인은 어린 아이의 단계를 지나 계속 자라나서 영화(주님처럼 온전한 상태)에 이르러야 합니다.
지금 우리는 날마다 거룩해지는 과정에 있습니다.`,
    category: "구원론",
    type: "question",
  },
  // TODO: 기도의 응답
  {
    id: 3,
    scenario: "기도에 대해 궁금해하는 친구가 이렇게 물어보는데, 어떻게 답변해야할까요?",
    friendQuestion: "기도해도 하나님이 응답하시는지 모르겠어. 정말 들으시는 걸까?",
    emoji: "🤔",
    options: [
      "하나님은 항상 들으시지만 우리가 원하는 방식으로 응답하지 않을 수도 있어.",
      "기도는 그냥 마음의 평안을 위한 거야.",
      "더 열심히 기도하면 응답받을 수 있을 거야.",
      "기도보다는 행동이 더 중요해.",
    ],
    correctAnswer: 0,
    explanation:
      "하나님은 우리의 기도를 들으시지만, 우리의 기대와 다른 방식으로 응답하실 수 있습니다. 하나님의 뜻과 때를 신뢰하는 것이 중요합니다.",
    category: "기도",
    type: "question",
  },
  {
    id: 4,
    title: "고난의 유익",
    description: "두 친구가 고난을 통한 하나님의 뜻에 대해 이야기하고 있습니다.",
    steps: [
      {
        messages: [
          {
            speaker: "person1",
            name: "민수",
            emoji: "😢",
            message: "요즘 너무 힘들어... 하나님이 사랑이시라면 왜 나에게 이런 고통을 주시는 걸까?"
          },
          {
            speaker: "person2",
            name: "영희",
            emoji: "😌",
            message: "민수야, 나도 그런 생각 해봤어. 근데 고난에도 하나님의 뜻이 있다고 생각해."
          }
        ],
        choice: {
          prompt: "영희는 어떻게 위로할까요?",
          options: [
            "고난을 통해 우리가 성장하고 하나님을 더 의존하게 된다고 말한다",
            "그냥 참고 견디면 언젠가는 좋아질 거라고 말한다"
          ],
          outcomes: [
            [
              {
                speaker: "person2",
                name: "영희",
                emoji: "💪",
                message: "로마서 5장 3-4절을 보면 '환난 중에도 즐거워하나니 환난은 인내를, 인내는 연단을, 연단은 소망을 이루는 줄 앎이로다'라고 했어."
              },
              {
                speaker: "person1",
                name: "민수",
                emoji: "🤔",
                message: "그럼 고난이 나를 더 강하게 만들어주는 거구나... 하나님께서 나를 단련시키시는 건가?"
              },
              {
                speaker: "person2",
                name: "영희",
                emoji: "🙏",
                message: "맞아! 고난을 통해 우리는 하나님을 더 깊이 알게 되고, 다른 사람들을 위로할 수 있게 돼."
              }
            ],
            [
              {
                speaker: "person2",
                name: "영희",
                emoji: "😕",
                message: "음... 그런데 그냥 참는 것만이 답은 아닌 것 같아. 고난에는 분명 의미가 있을 거야."
              },
              {
                speaker: "person1",
                name: "민수",
                emoji: "😔",
                message: "그럼 이 고난의 의미를 어떻게 찾을 수 있을까?"
              },
              {
                speaker: "person2",
                name: "영희",
                emoji: "📖",
                message: "함께 성경을 읽어보자. 분명 하나님의 뜻을 알 수 있을 거야."
              }
            ]
          ]
        }
      }
    ],
    category: "고난",
    type: "conversation",
  },
  {
    id: 5,
    title: "성경의 무오성",
    description: "두 친구가 성경의 진리성과 신뢰성에 대해 나누고 있습니다.",
    steps: [
      {
        messages: [
          {
            speaker: "person1",
            name: "철수",
            emoji: "😓",
            message: "성경이 정말 하나님의 말씀일까? 사람이 쓴 책인데 어떻게 완전무결할 수 있어?"
          },
          {
            speaker: "person2",
            name: "수지",
            emoji: "🤔",
            message: "철수야, 나도 그런 의문이 들 때가 있어. 하지만 성경은 정말 특별한 책이야."
          }
        ],
        choice: {
          prompt: "수지는 어떻게 설명할까요?",
          options: [
            "성경은 하나님의 영감으로 기록되었고 수많은 예언이 성취되었다고 설명한다",
            "그냥 믿음으로 받아들이라고 말한다"
          ],
          outcomes: [
            [
              {
                speaker: "person2",
                name: "수지",
                emoji: "📖",
                message: "베드로후서 1:21을 보면 '예언은 언제든지 사람의 뜻으로 낸 것이 아니요 오직 성령의 감동하심을 받은 사람들이 하나님께 받아 말한 것임이라'고 했어."
              },
              {
                speaker: "person1", 
                name: "철수",
                emoji: "💡",
                message: "그럼 성경은 하나님이 직접 영감을 주셔서 기록된 거구나! 그래서 신뢰할 수 있는 거야?"
              },
              {
                speaker: "person2",
                name: "수지",
                emoji: "✨",
                message: "맞아! 그리고 성경의 수많은 예언들이 정확히 성취된 것을 보면 하나님의 말씀임을 알 수 있어."
              }
            ],
            [
              {
                speaker: "person2",
                name: "수지",
                emoji: "😕",
                message: "음... 그런데 그냥 믿음으로만 받아들이라고 하면 의문이 해결되지 않을 것 같은데?"
              },
              {
                speaker: "person1", 
                name: "철수",
                emoji: "🤔",
                message: "맞아, 나도 납득할 만한 설명이 필요해. 어떻게 확신할 수 있을까?"
              },
              {
                speaker: "person2",
                name: "수지",
                emoji: "📖",
                message: "그럼 성경이 얼마나 정확한지 함께 알아보자. 고고학적 발견들도 성경을 뒷받침해줘."
              }
            ]
          ]
        }
      }
    ],
    category: "성경론",
    type: "conversation",
  },
]

const badges = [
  { name: "First Steps", icon: "👶", description: "Complete your first question", requirement: 1 },
  { name: "Bible Scholar", icon: "📖", description: "Answer 5 questions correctly", requirement: 5 },
  { name: "Faithful Learner", icon: "⭐", description: "Maintain a 3-question streak", requirement: 3 },
  { name: "Devoted Student", icon: "🏆", description: "Complete 10 questions", requirement: 10 },
]

export default function ChristianityLearningApp() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [conversationChoice, setConversationChoice] = useState<number | null>(null)
  const [userProgress, setUserProgress] = useState<UserProgress>({
    score: 0,
    streak: 0,
    totalQuestions: 0,
    correctAnswers: 0,
    badges: [],
    level: 1,
  })
  const [newBadge, setNewBadge] = useState<string | null>(null)

  const currentItem = interactions[currentIndex]
  const progressPercentage = ((currentIndex + 1) / interactions.length) * 100

  // Reset states when moving to next item
  useEffect(() => {
    setSelectedAnswer(null)
    setShowResult(false)
    setConversationChoice(null)
  }, [currentIndex])

  const checkForNewBadges = (progress: UserProgress) => {
    const earnedBadges = badges.filter((badge) => {
      if (badge.name === "First Steps" && progress.totalQuestions >= 1) return true
      if (badge.name === "Bible Scholar" && progress.correctAnswers >= 5) return true
      if (badge.name === "Faithful Learner" && progress.streak >= 3) return true
      if (badge.name === "Devoted Student" && progress.totalQuestions >= 10) return true
      return false
    })

    const newBadges = earnedBadges.filter((badge) => !progress.badges.includes(badge.name))
    if (newBadges.length > 0) {
      setNewBadge(newBadges[0].name)
      setTimeout(() => setNewBadge(null), 3000)
    }

    return earnedBadges.map((badge) => badge.name)
  }

  const handleQuestionAnswer = (answerIndex: number) => {
    if (showResult) return
    
    setSelectedAnswer(answerIndex)
    const isCorrect = answerIndex === (currentItem as Question).correctAnswer
    const newProgress = {
      ...userProgress,
      totalQuestions: userProgress.totalQuestions + 1,
      correctAnswers: isCorrect ? userProgress.correctAnswers + 1 : userProgress.correctAnswers,
      streak: isCorrect ? userProgress.streak + 1 : 0,
      score: isCorrect ? userProgress.score + 10 : userProgress.score,
      badges: userProgress.badges,
    }
    newProgress.badges = checkForNewBadges(newProgress)
    setUserProgress(newProgress)
    setShowResult(true)
  }

  const handleConversationChoice = (choiceIndex: number) => {
    setConversationChoice(choiceIndex)
    const newProgress = {
      ...userProgress,
      totalQuestions: userProgress.totalQuestions + 1,
      badges: userProgress.badges,
    }
    newProgress.badges = checkForNewBadges(newProgress)
    setUserProgress(newProgress)
    setShowResult(true)
  }

  const handleNext = () => {
    if (currentIndex < interactions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const isCorrect = currentItem.type === "question" && selectedAnswer === currentItem.correctAnswer

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card border-b border-border p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-foreground">ECU 맛보기</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-secondary" />
              <span className="text-sm font-semibold">{userProgress.score}</span>
            </div>
          </div>
        </div>

        <Progress value={progressPercentage} className="h-2" />
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-muted-foreground">
            {currentItem.type === "question" ? "상황" : "이야기"} {currentIndex + 1} / {interactions.length}
          </span>
          <span className="text-xs text-muted-foreground">연속: {userProgress.streak} 🔥</span>
        </div>
      </div>

      {/* New Badge Notification */}
      {newBadge && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <Card className="p-4 bg-secondary text-secondary-foreground shadow-lg">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              <span className="font-semibold">새 배지: {newBadge}!</span>
            </div>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <div className="p-4 pb-20">
        {currentItem.type === "question" ? (
          <QuestionComponent
            question={currentItem as Question}
            onAnswerSelect={handleQuestionAnswer}
            showResult={showResult}
            selectedAnswer={selectedAnswer}
            userProgress={userProgress}
          />
        ) : (
          <ConversationComponent
            conversation={currentItem as Conversation}
            onChoiceSelect={handleConversationChoice}
            showResult={showResult}
            conversationChoice={conversationChoice}
            userProgress={userProgress}
          />
        )}
      </div>

      {/* Bottom Action Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
        {/* Only show next button when conversation/question is completed */}
        {showResult ? (
          currentIndex < interactions.length - 1 ? (
            <Button onClick={handleNext} className="w-full h-12 text-lg font-semibold" size="lg">
              {currentItem.type === "question" ? "다음 상황" : "다음 이야기"}
            </Button>
          ) : (
            <Card className="p-4 text-center">
              <Trophy className="w-12 h-12 text-primary mx-auto mb-2" />
              <h3 className="text-lg font-bold mb-3">여기까지 ECU에서 하는 활동의 맛보기 였습니다.</h3>
              <p className="text-base text-muted-foreground mb-4">함께 하고 싶은 분은 연락주세요!</p>
              <Button className="w-full" size="lg" onClick={() => window.open("https://ecukorea.com", "_blank")}>
                ECU 웹사이트 방문하기
              </Button>
            </Card>
          )
        ) : null}
      </div>
    </div>
  )
}
