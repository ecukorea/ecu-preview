"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Trophy } from "lucide-react"
import { QuestionComponent } from "@/components/question-component"
import { ConversationComponent } from "@/components/conversation-component"
import { PresentationComponent } from "@/components/presentation-component"
import { CompletionModal } from "@/components/completion-modal"
import { Conversation, Presentation, Question, UserProgress } from "@/lib/types"
import { interactions } from "@/data"
import {
  trackConversationCompleted,
  trackPresentationViewed,
  trackQuestionAnswered,
  trackScoreUpdate,
  trackSessionProgress,
  trackStreakAchieved,
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
        <div className="flex items-center gap-3 mb-3">
          <Image src="/logo.png" alt="ECU Logo" width={40} height={40} className="flex-shrink-0" />
          <div className="flex-1">
            <h1 className="text-lg sm:text-xl font-bold text-foreground">ECU 맛보기</h1>
            <p className="text-sm text-muted-foreground mt-1">
              빛나는 대학생활을 위한 ECU 맛보기 컨텐츠
            </p>
          </div>
        </div>

        <Progress value={progressPercentage} className="h-2" />
        <div className="mt-2">
          <span className="text-xs text-muted-foreground">
            {currentItem.type === "question"
              ? "상황"
              : currentItem.type === "conversation"
                ? "이야기"
                : "프레젠테이션"}{" "}
            {currentIndex + 1} / {interactions.length}
          </span>
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
          ) : null
        ) : null}
      </div>

      {/* Completion Modal */}
      <CompletionModal isOpen={currentIndex >= interactions.length - 1 && showResult} />
    </div>
  )
}
