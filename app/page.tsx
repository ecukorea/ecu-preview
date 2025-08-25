"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Star, Trophy } from "lucide-react"
import { QuestionComponent } from "@/components/question-component"
import { ConversationComponent } from "@/components/conversation-component"
import { PresentationComponent } from "@/components/presentation-component"
import { Conversation, Presentation, Question, UserProgress } from "@/lib/types"
import { interactions } from "@/data"
import {
  trackQuestionAnswered,
  trackConversationCompleted,
  trackPresentationViewed,
  trackStreakAchieved,
  trackScoreUpdate,
  trackSessionProgress,
  trackExternalLinkClick,
} from "@/lib/analytics"


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
    level: 1,
  })

  const currentItem = interactions[currentIndex]
  const progressPercentage = ((currentIndex + 1) / interactions.length) * 100

  // Reset states when moving to next item
  useEffect(() => {
    setSelectedAnswer(null)
    setShowResult(false)
    setConversationChoice(null)
  }, [currentIndex])


  const handleQuestionAnswer = (answerIndex: number) => {
    if (showResult) return

    setSelectedAnswer(answerIndex)
    const isCorrect = answerIndex === (currentItem as Question).correctAnswer
    const question = currentItem as Question
    
    // Track question answered event
    trackQuestionAnswered(currentItem.id, isCorrect, question.category)
    
    const newProgress = {
      ...userProgress,
      totalQuestions: userProgress.totalQuestions + 1,
      correctAnswers: isCorrect ? userProgress.correctAnswers + 1 : userProgress.correctAnswers,
      streak: isCorrect ? userProgress.streak + 1 : 0,
      score: isCorrect ? userProgress.score + 10 : userProgress.score,
    }
    
    // Track score update if points were earned
    if (isCorrect) {
      trackScoreUpdate(newProgress.score, 10)
    }
    
    // Track streak achievements
    if (newProgress.streak > userProgress.streak && newProgress.streak >= 3) {
      trackStreakAchieved(newProgress.streak)
    }
    
    setUserProgress(newProgress)
    setShowResult(true)
  }

  const handleConversationChoice = (choiceIndex: number) => {
    setConversationChoice(choiceIndex)
    const conversation = currentItem as Conversation
    
    // Track conversation completed event
    trackConversationCompleted(currentItem.id, choiceIndex, conversation.category)
    
    const newProgress = {
      ...userProgress,
      totalQuestions: userProgress.totalQuestions + 1,
    }
    setUserProgress(newProgress)
    setShowResult(true)
  }

  const handlePresentationComplete = () => {
    const presentation = currentItem as Presentation
    
    // Track presentation viewed event
    trackPresentationViewed(currentItem.id, presentation.slides.length, presentation.category)
    
    const newProgress = {
      ...userProgress,
      totalQuestions: userProgress.totalQuestions + 1,
    }
    setUserProgress(newProgress)
    setShowResult(true)
  }

  const handleNext = () => {
    if (currentIndex < interactions.length - 1) {
      const newIndex = currentIndex + 1
      setCurrentIndex(newIndex)
      
      // Track session progress
      const newProgressPercentage = ((newIndex + 1) / interactions.length) * 100
      trackSessionProgress(newIndex, interactions.length, newProgressPercentage)
    }
  }

  const isCorrect = currentItem.type === "question" && selectedAnswer === currentItem.correctAnswer

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card border-b border-border p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-bold text-foreground">ECU 맛보기</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-secondary" />
              <span className="text-sm sm:text-base font-semibold">{userProgress.score}</span>
            </div>
          </div>
        </div>

        <Progress value={progressPercentage} className="h-2" />
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-muted-foreground">
            {currentItem.type === "question"
              ? "상황"
              : currentItem.type === "conversation"
                ? "이야기"
                : "프레젠테이션"}{" "}
            {currentIndex + 1} / {interactions.length}
          </span>
          <span className="text-xs text-muted-foreground">연속: {userProgress.streak} 🔥</span>
        </div>
      </div>


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
        ) : currentItem.type === "conversation" ? (
          <ConversationComponent
            conversation={currentItem as Conversation}
            onChoiceSelect={handleConversationChoice}
            showResult={showResult}
            conversationChoice={conversationChoice}
            userProgress={userProgress}
          />
        ) : (
          <PresentationComponent
            presentation={currentItem as Presentation}
            onComplete={handlePresentationComplete}
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
              {currentItem.type === "question"
                ? "다음 상황"
                : currentItem.type === "conversation"
                  ? "다음 이야기"
                  : "다음 프레젠테이션"}
            </Button>
          ) : (
            <Card className="p-4 text-center">
              <Trophy className="w-12 h-12 text-primary mx-auto mb-2" />
              <h3 className="text-lg font-bold mb-3">
                여기까지 ECU에서 하는 활동의 맛보기 였습니다.
              </h3>
              <p className="text-base text-muted-foreground mb-4">
                함께 하고 싶은 분은 연락주세요!
              </p>
              <Button
                className="w-full"
                size="lg"
                onClick={() => {
                  trackExternalLinkClick("https://ecukorea.com", "ECU 웹사이트 방문하기")
                  window.open("https://ecukorea.com", "_blank")
                }}
              >
                ECU 웹사이트 방문하기
              </Button>
            </Card>
          )
        ) : null}
      </div>
    </div>
  )
}
