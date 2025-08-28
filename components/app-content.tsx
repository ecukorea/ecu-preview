"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ExternalLink, Instagram, MessageCircle, Youtube } from "lucide-react"
import { QuestionComponent } from "@/components/question-component"
import { ConversationComponent } from "@/components/conversation-component"
import { PresentationComponent } from "@/components/presentation-component"
import { CompletionModal } from "@/components/completion-modal"
import { Conversation, Presentation, Question, UserProgress } from "@/lib/types"
import { getInteractions } from "@/data"
import {
  trackConversationCompleted,
  trackExternalLinkClick,
  trackPresentationViewed,
  trackQuestionAnswered,
  trackScoreUpdate,
  trackSessionProgress,
  trackStreakAchieved,
} from "@/lib/analytics"

export function AppContent() {
  const searchParams = useSearchParams()
  const campus = searchParams.get('campus')
  
  const [interactions, setInteractions] = useState(() => getInteractions(campus || undefined))
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

  // Update interactions when campus query parameter changes
  useEffect(() => {
    const newInteractions = getInteractions(campus || undefined)
    setInteractions(newInteractions)
    setCurrentIndex(0) // Reset to first item when campus changes
    setSelectedAnswer(null)
    setShowResult(false)
    setConversationChoice(null)
  }, [campus])

  const currentItem = interactions[currentIndex]
  const progressPercentage = ((currentIndex + 1) / interactions.length) * 100

  // Reset states when moving to next item
  useEffect(() => {
    setSelectedAnswer(null)
    setShowResult(false)
    setConversationChoice(null)

    // Scroll to top when new interaction is shown
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
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
      <div className="sticky top-0 z-10 bg-card border-b border-border pt-4 px-4 pb-2">
        <div className="mb-3">
          <div className="flex items-center gap-3 mb-1">
            <Image
              src="/logo.png"
              alt="ECU Logo"
              width={40}
              height={40}
              className="flex-shrink-0"
            />
            <div className="flex-1">
              <div className="flex justify-between">
                <h1 className="text-lg sm:text-xl font-bold text-foreground flex-1">
                  ECU 맛보기{campus ? ` - ${campus.toUpperCase()}` : ''}
                </h1>
                <div className="flex items-center gap-1 sm:gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => {
                      trackExternalLinkClick("https://ecukorea.com", "ECU 웹사이트")
                      window.open("https://ecukorea.com", "_blank")
                    }}
                    title="ECU 웹사이트"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => {
                      trackExternalLinkClick("https://pf.kakao.com/_uUBKn", "ECU 카카오톡 채널")
                      window.open("https://pf.kakao.com/_uUBKn", "_blank")
                    }}
                    title="ECU 카카오톡 채널"
                  >
                    <MessageCircle className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => {
                      trackExternalLinkClick(
                        "https://www.instagram.com/ecu4u_official",
                        "ECU 인스타그램"
                      )
                      window.open("https://www.instagram.com/ecu4u_official", "_blank")
                    }}
                    title="ECU 인스타그램"
                  >
                    <Instagram className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => {
                      trackExternalLinkClick(
                        "https://www.youtube.com/@elgracekorea",
                        "박영덕 목사 성경학교 유튜브 채널"
                      )
                      window.open("https://www.youtube.com/@elgracekorea", "_blank")
                    }}
                    title="박영덕 목사 성경학교 유튜브 채널"
                  >
                    <Youtube className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                빛나는 대학생활을 위한 ECU 맛보기 컨텐츠
              </p>
            </div>
          </div>
        </div>

        {currentItem.type !== "presentation" && (
          <>
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
          </>
        )}
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