"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Trophy, Star, Award, CheckCircle } from "lucide-react"

interface Question {
  id: number
  scenario: string
  friendQuestion: string
  options: string[]
  correctAnswer: number
  explanation: string
  category: string
  emoji: string
}

interface UserProgress {
  score: number
  streak: number
  totalQuestions: number
  correctAnswers: number
  badges: string[]
  level: number
}

const questions: Question[] = [
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
  },
]

const badges = [
  { name: "First Steps", icon: "👶", description: "Complete your first question", requirement: 1 },
  { name: "Bible Scholar", icon: "📖", description: "Answer 5 questions correctly", requirement: 5 },
  { name: "Faithful Learner", icon: "⭐", description: "Maintain a 3-question streak", requirement: 3 },
  { name: "Devoted Student", icon: "🏆", description: "Complete 10 questions", requirement: 10 },
]

export default function ChristianityLearningApp() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [userProgress, setUserProgress] = useState<UserProgress>({
    score: 0,
    streak: 0,
    totalQuestions: 0,
    correctAnswers: 0,
    badges: [],
    level: 1,
  })
  const [newBadge, setNewBadge] = useState<string | null>(null)

  const currentQ = questions[currentQuestion]
  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100

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

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return
    setSelectedAnswer(answerIndex)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return

    const isCorrect = selectedAnswer === currentQ.correctAnswer
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
    setShowExplanation(true)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
      setShowExplanation(false)
    }
  }

  const isCorrect = selectedAnswer === currentQ.correctAnswer

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
            상황 {currentQuestion + 1} / {questions.length}
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
        {/* Scenario Description */}
        <div className="mb-4">
          <Card className="p-4 bg-muted">
            <p className="text-base text-muted-foreground leading-relaxed font-bold">{currentQ.scenario}</p>
          </Card>
        </div>

        {/* Friend's Question */}
        <div className="mb-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="text-4xl">{currentQ.emoji}</div>
            <div className="flex-1">
              <Card className="p-4 bg-blue-50 border-blue-200 relative">
                <div className="absolute -left-2 top-4 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-blue-50"></div>
                <p className="text-blue-900 font-medium leading-relaxed">{currentQ.friendQuestion}</p>
              </Card>
            </div>
          </div>
        </div>

        {/* Answer Options */}
        <div className="space-y-3 mb-6">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={showResult}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                selectedAnswer === index
                  ? showResult
                    ? index === currentQ.correctAnswer
                      ? "border-green-500 bg-green-50 text-green-800"
                      : "border-red-500 bg-red-50 text-red-800"
                    : "border-primary bg-primary/10 text-primary"
                  : showResult && index === currentQ.correctAnswer
                    ? "border-green-500 bg-green-50 text-green-800"
                    : "border-border bg-card text-card-foreground hover:border-primary/50"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold mt-1 flex-shrink-0 ${
                    selectedAnswer === index
                      ? showResult
                        ? index === currentQ.correctAnswer
                          ? "border-green-500 bg-green-500 text-white"
                          : "border-red-500 bg-red-500 text-white"
                        : "border-primary bg-primary text-primary-foreground"
                      : showResult && index === currentQ.correctAnswer
                        ? "border-green-500 bg-green-500 text-white"
                        : "border-muted-foreground"
                  }`}
                >
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="font-medium leading-relaxed">{option}</span>
                {showResult && index === currentQ.correctAnswer && (
                  <CheckCircle className="w-5 h-5 text-green-500 ml-auto mt-1 flex-shrink-0" />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Result and Explanation */}
        {showResult && (
          <Card className="p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
              {isCorrect ? (
                <>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-semibold text-green-700">좋은 답변입니다! +10점</span>
                </>
              ) : (
                <>
                  <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                    <span className="text-white text-xs">✕</span>
                  </div>
                  <span className="font-semibold text-red-700">다시 생각해보세요</span>
                </>
              )}
            </div>

            <div className="mt-3 p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground leading-relaxed">{currentQ.explanation}</p>
            </div>
          </Card>
        )}
      </div>

      {/* Bottom Action Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
        {!showResult ? (
          <Button
            onClick={handleSubmitAnswer}
            disabled={selectedAnswer === null}
            className="w-full h-12 text-lg font-semibold"
            size="lg"
          >
            답변 확인
          </Button>
        ) : currentQuestion < questions.length - 1 ? (
          <Button onClick={handleNextQuestion} className="w-full h-12 text-lg font-semibold" size="lg">
            다음 상황
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
        )}
      </div>
    </div>
  )
}
