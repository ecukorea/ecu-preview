"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import { InteractionItem, Question, UserProgress } from "@/lib/types"
import { ExplanationWithReferences } from "@/components/explanation-with-references"

interface QuestionComponentProps {
  question: Question
  onAnswerSelect: (answerIndex: number) => void
  showResult: boolean
  selectedAnswer: number | null
  userProgress: UserProgress
}

export function QuestionComponent({
  question,
  onAnswerSelect,
  showResult,
  selectedAnswer,
  userProgress,
}: QuestionComponentProps) {
  const [showScenario, setShowScenario] = useState(false)
  const [showFriendQuestion, setShowFriendQuestion] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [visibleOptions, setVisibleOptions] = useState<number[]>([])
  const resultRef = useRef<HTMLDivElement>(null)

  const isCorrect = selectedAnswer === question.correctAnswer

  useEffect(() => {
    // Reset states
    setShowScenario(false)
    setShowFriendQuestion(false)
    setShowOptions(false)
    setVisibleOptions([])

    // Progressive display for question elements
    setTimeout(() => setShowScenario(true), 300)
    setTimeout(() => setShowFriendQuestion(true), 800)

    // Show all options at once with CSS animation delays
    setTimeout(() => {
      setShowOptions(true)
      setVisibleOptions(Array.from({ length: question.options.length }, (_, i) => i))
    }, 1300)
  }, [(question as InteractionItem).id])

  // Auto-scroll to result section when it appears
  useEffect(() => {
    if (showResult && resultRef.current) {
      setTimeout(() => {
        resultRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        })
      }, 100)
    }
  }, [showResult])

  return (
    <>
      {/* Scenario Description */}
      {showScenario && (
        <div className="mb-4 animate-in fade-in duration-500 slide-in-from-bottom-2">
          <Card className="p-4 bg-muted">
            <p className="text-base text-muted-foreground leading-relaxed font-bold break-keep">
              {question.scenario}
            </p>
          </Card>
        </div>
      )}

      {/* Friend's Question */}
      {showFriendQuestion && (
        <div className="mb-6 animate-in fade-in duration-500 slide-in-from-bottom-2">
          <div className="flex items-start gap-4 mb-4">
            <div className="text-4xl">{question.emoji}</div>
            <div className="flex-1">
              <Card className="p-4 bg-blue-50 border-blue-200 relative">
                <div className="absolute -left-2 top-4 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-blue-50"></div>
                <p className="text-blue-900 font-medium leading-relaxed break-keep">
                  {question.friendQuestion}
                </p>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* Options */}
      {showOptions && (
        <div className="mb-6">
          <div className="space-y-3">
            {question.options.map((option, index) =>
              visibleOptions.includes(index) ? (
                <button
                  key={index}
                  onClick={() => onAnswerSelect(index)}
                  disabled={showResult}
                  style={{
                    animationDelay: `${index * 200}ms`,
                    opacity: 0,
                    animation: `fade-in 500ms ease-out ${index * 200}ms forwards`,
                  }}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                    selectedAnswer === index
                      ? showResult
                        ? index === question.correctAnswer
                          ? "border-green-500 bg-green-50 text-green-800"
                          : "border-red-500 bg-red-50 text-red-800"
                        : "border-primary bg-primary/10 text-primary"
                      : showResult && index === question.correctAnswer
                        ? "border-green-500 bg-green-50 text-green-800"
                        : "border-border bg-card text-card-foreground hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold mt-1 flex-shrink-0 ${
                        selectedAnswer === index
                          ? showResult
                            ? index === question.correctAnswer
                              ? "border-green-500 bg-green-500 text-white"
                              : "border-red-500 bg-red-500 text-white"
                            : "border-primary bg-primary text-primary-foreground"
                          : showResult && index === question.correctAnswer
                            ? "border-green-500 bg-green-500 text-white"
                            : "border-muted-foreground"
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="font-medium leading-relaxed break-keep">{option}</span>
                    {showResult && index === question.correctAnswer && (
                      <CheckCircle className="w-5 h-5 text-green-500 ml-auto mt-1 flex-shrink-0" />
                    )}
                  </div>
                </button>
              ) : null
            )}
          </div>
        </div>
      )}

      {/* Result and Explanation */}
      {showResult && (
        <Card ref={resultRef} className="p-4 mb-6">
          <div className="flex items-center gap-2">
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

          <div className="mt-1 p-3 bg-muted rounded-lg">
            <ExplanationWithReferences
              explanation={question.explanation}
              references={question.references}
            />
          </div>
        </Card>
      )}
    </>
  )
}
