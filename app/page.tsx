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
  {
    id: 1,
    scenario: "구원의 확신이 없는 친구가 이렇게 물어보는데, 어떻게 답변해야할까요?",
    friendQuestion: "나는 정말 구원받았을까? 확신이 서지 않아...",
    emoji: "😟",
    options: [
      "성경에서 하나님의 약속을 찾아보자. 요한복음 3:16을 함께 읽어보면 어떨까?",
      "그런 생각은 하지 마. 믿으면 되는 거야.",
      "교회에 더 열심히 나가면 확신이 생길 거야.",
      "나도 가끔 그런 생각이 들어. 완전히 정상이야.",
    ],
    correctAnswer: 0,
    explanation:
      "구원의 확신은 하나님의 말씀에 근거해야 합니다. 성경 말씀을 통해 하나님의 약속을 확인하는 것이 가장 좋은 방법입니다.",
    category: "구원론",
    type: "question",
  },
  {
    id: 2,
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
    id: 3,
    scenario: "고난을 겪고 있는 친구가 이렇게 물어보는데, 어떻게 답변해야할까요?",
    friendQuestion: "하나님이 사랑이시다면 왜 나에게 이런 고통을 주시는 걸까?",
    emoji: "😢",
    options: [
      "고난을 통해 우리는 성장하고, 하나님의 사랑을 더 깊이 알게 돼. 함께 기도하자.",
      "그건 네가 죄를 지었기 때문이야.",
      "하나님은 그런 일에 관여하지 않으셔.",
      "그냥 운이 나빴던 거야.",
    ],
    correctAnswer: 0,
    explanation:
      "고난은 죄의 결과일 수도 있지만, 하나님의 사랑과 계획 안에서 우리를 성장시키는 도구가 될 수도 있습니다. 공감하며 함께 기도하는 것이 중요합니다.",
    category: "고난",
    type: "question",
  },
  {
    id: 4,
    scenario: "교회에 대해 부정적인 친구가 이렇게 물어보는데, 어떻게 답변해야할까요?",
    friendQuestion: "교회 사람들도 세상 사람들과 다를 게 없던데, 정말 믿을 만한 곳일까?",
    emoji: "😤",
    options: [
      "교회도 완벽하지 않은 사람들이 모인 곳이야. 하지만 함께 성장해 나가는 공동체야.",
      "그런 교회는 가지 마. 다른 교회를 찾아봐.",
      "교회 사람들은 모두 위선자들이야.",
      "교회 안 가도 믿음은 가질 수 있어.",
    ],
    correctAnswer: 0,
    explanation:
      "교회는 완벽한 사람들의 모임이 아니라, 함께 성장해 나가는 신앙 공동체입니다. 서로의 부족함을 인정하고 도우며 성장하는 곳임을 설명하는 것이 좋습니다.",
    category: "교회론",
    type: "question",
  },
  {
    id: 5,
    scenario: "성경에 대해 의문을 가진 친구가 이렇게 물어보는데, 어떻게 답변해야할까요?",
    friendQuestion: "성경이 정말 하나님의 말씀일까? 사람이 쓴 책 아닌가?",
    emoji: "🤨",
    options: [
      "성경은 하나님의 영감으로 기록된 하나님의 말씀이야. 함께 읽어보면서 확인해보자.",
      "그냥 믿어야 해. 의심하면 안 돼.",
      "성경은 그냥 도덕책이야.",
      "그런 건 중요하지 않아.",
    ],
    correctAnswer: 0,
    explanation:
      "성경은 하나님의 영감으로 기록된 하나님의 말씀입니다. 직접 읽어보고 경험해보도록 격려하는 것이 좋습니다.",
    category: "성경론",
    type: "question",
  },
  {
    id: 6,
    title: "로마서의 구원 이야기",
    description: "두 친구가 로마서 3장에 대해 이야기하고 있습니다.",
    steps: [
      {
        messages: [
          {
            speaker: "person1",
            name: "민수",
            emoji: "🤔",
            message: "어제 로마서 3장을 읽었는데, '모든 사람이 죄를 범하였으매'라는 구절이 좀 무서웠어."
          },
          {
            speaker: "person2", 
            name: "영희",
            emoji: "😊",
            message: "아, 그 구절! 나도 처음엔 그랬는데, 바로 다음 구절을 보면 희망이 있어."
          }
        ],
        choice: {
          prompt: "영희는 어떻게 설명할까요?",
          options: [
            "하나님의 은혜로 값없이 의롭다 하심을 받는다고 설명한다",
            "우리가 더 열심히 살면 된다고 격려한다"
          ],
          outcomes: [
            [
              {
                speaker: "person2",
                name: "영희", 
                emoji: "✨",
                message: "24절을 봐! '그리스도 예수 안에 있는 구속으로 말미암아 하나님의 은혜로 값없이 의롭다 하심을 얻은 자 되었느니라'"
              },
              {
                speaker: "person1",
                name: "민수",
                emoji: "💡", 
                message: "와, 그럼 우리가 죄인이라는 게 절망이 아니라 은혜의 배경이 되는 거구나!"
              },
              {
                speaker: "person2",
                name: "영희",
                emoji: "🙏",
                message: "맞아! 하나님의 은혜는 우리의 노력과 상관없이 주어지는 선물이야."
              }
            ],
            [
              {
                speaker: "person2",
                name: "영희", 
                emoji: "🤔",
                message: "음, 그런 방법도 있지만... 그런데 로마서는 우리의 노력보다는 다른 걸 강조하는 것 같은데?"
              },
              {
                speaker: "person1",
                name: "민수",
                emoji: "😅", 
                message: "아, 그럴까? 그럼 성경이 진짜 말하고 싶은 게 뭔지 다시 읽어볼게."
              },
              {
                speaker: "person2",
                name: "영희",
                emoji: "📖",
                message: "응! 24절을 함께 읽어보자. 분명 더 깊은 의미가 있을 거야."
              }
            ]
          ]
        }
      }
    ],
    category: "로마서",
    type: "conversation",
  },
  {
    id: 7,
    title: "로마서의 변화 이야기", 
    description: "두 친구가 로마서 7-8장에 대해 나누고 있습니다.",
    steps: [
      {
        messages: [
          {
            speaker: "person1",
            name: "철수",
            emoji: "😓",
            message: "로마서 7장 읽으면서 너무 공감됐어. '원하는 선은 행하지 아니하고 원하지 아니하는 악을 행한다'는 부분..."
          },
          {
            speaker: "person2",
            name: "수지",
            emoji: "😌",
            message: "맞아! 바울도 같은 고민을 했구나 싶어서 위로가 되더라."
          }
        ],
        choice: {
          prompt: "수지는 어떤 희망을 나눌까요?",
          options: [
            "로마서 8장의 성령님 이야기를 나눈다",
            "그냥 포기하고 살자고 말한다"
          ],
          outcomes: [
            [
              {
                speaker: "person2",
                name: "수지",
                emoji: "🔥",
                message: "하지만 8장에서 희망을 줘! '그러므로 이제 그리스도 예수 안에 있는 자에게는 결코 정죄함이 없나니'"
              },
              {
                speaker: "person1", 
                name: "철수",
                emoji: "🙏",
                message: "정말이야! 성령님이 우리 안에서 역사하신다는 게 이렇게 위로가 될 줄 몰랐어."
              },
              {
                speaker: "person2",
                name: "수지",
                emoji: "✨",
                message: "성령님은 우리가 할 수 없는 것을 도우시는 분이야. 로마서 8:26도 봐!"
              }
            ],
            [
              {
                speaker: "person2",
                name: "수지",
                emoji: "😰",
                message: "뭔 소리야! 포기하면 안 되지. 바울도 같은 고민을 했지만 답을 찾았잖아."
              },
              {
                speaker: "person1", 
                name: "철수",
                emoji: "😅",
                message: "농담이었어... 그럼 바울은 어떤 답을 찾았는데?"
              },
              {
                speaker: "person2",
                name: "수지",
                emoji: "📖",
                message: "로마서 8장을 읽어봐! 성령님의 도우심에 대한 놀라운 이야기가 있어."
              }
            ]
          ]
        }
      }
    ],
    category: "로마서",
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
