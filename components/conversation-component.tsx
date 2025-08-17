"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import { Conversation, ConversationMessage, UserProgress } from "@/lib/types"

interface ConversationComponentProps {
  conversation: Conversation
  onChoiceSelect: (choiceIndex: number) => void
  showResult: boolean
  conversationChoice: number | null
  userProgress: UserProgress
}

export function ConversationComponent({ 
  conversation, 
  onChoiceSelect, 
  showResult, 
  conversationChoice,
  userProgress 
}: ConversationComponentProps) {
  const [renderedMessages, setRenderedMessages] = useState<React.ReactNode[]>([])
  const [showChoicePrompt, setShowChoicePrompt] = useState(false)

  useEffect(() => {
    // Only reset if conversation changes and no choice has been made yet
    if (conversationChoice !== null) return
    
    setRenderedMessages([])
    setShowChoicePrompt(false)
    
    const initialMessages = conversation.steps[0].messages
    let messageIndex = 0
    
    const addNextMessage = () => {
      if (messageIndex < initialMessages.length) {
        const message = initialMessages[messageIndex]
        const messageComponent = (
          <div 
            key={`${conversation.id}-initial-${messageIndex}`}
            className={`flex items-start gap-4 ${message.speaker === "person2" ? "flex-row-reverse" : ""} animate-in fade-in duration-500 slide-in-from-top-2`}
          >
            <div className="text-3xl">{message.emoji}</div>
            <div className="flex-1 max-w-[80%]">
              <div className="text-sm font-medium text-muted-foreground mb-1">
                {message.name}
              </div>
              <div className={`p-4 relative rounded-lg border ${
                message.speaker === "person1" 
                  ? "bg-blue-50 border-blue-200" 
                  : "bg-green-50 border-green-200"
              }`}>
                <div className={`absolute ${
                  message.speaker === "person1"
                    ? "-left-2 border-r-blue-50"
                    : "-right-2 border-l-green-50"
                } top-4 w-0 h-0 border-t-8 border-b-8 ${
                  message.speaker === "person1"
                    ? "border-r-8 border-transparent"
                    : "border-l-8 border-transparent"
                }`}></div>
                <p className={`font-medium leading-relaxed ${
                  message.speaker === "person1" ? "text-blue-900" : "text-green-900"
                }`}>
                  {message.message}
                </p>
              </div>
            </div>
          </div>
        )
        
        setRenderedMessages(prev => [...prev, messageComponent])
        messageIndex++
        setTimeout(addNextMessage, 800) // 800ms delay between messages
      } else {
        // Show choice prompt after all initial messages
        if (conversation.steps[0].choice && conversationChoice === null) {
          setTimeout(() => setShowChoicePrompt(true), 600)
        }
      }
    }
    
    // Start showing messages with initial delay
    setTimeout(addNextMessage, 500)
  }, [conversation.id, conversationChoice])

  const handleChoiceSelect = (answerIndex: number) => {
    setShowChoicePrompt(false)
    
    // Add selected choice message
    const choiceComponent = (
      <div key={`${conversation.id}-choice-selected`} className="flex items-start gap-4 animate-in fade-in duration-500 slide-in-from-top-2">
        <div className="text-3xl">😊</div>
        <div className="flex-1 max-w-[80%]">
          <div className="text-sm font-medium text-muted-foreground mb-1">
            나의 선택
          </div>
          <div className="p-4 relative rounded-lg border bg-purple-50 border-purple-200">
            <div className="absolute -left-2 top-4 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-purple-50"></div>
            <p className="font-medium leading-relaxed text-purple-900">
              {conversation.steps[0].choice!.options[answerIndex]}
            </p>
          </div>
        </div>
      </div>
    )
    
    setRenderedMessages(prev => [...prev, choiceComponent])
    
    // Start progressive display of outcome messages
    const outcomeMessages = conversation.steps[0].choice!.outcomes[answerIndex]
    let outcomeIndex = 0
    
    const addNextOutcome = () => {
      if (outcomeIndex < outcomeMessages.length) {
        const message = outcomeMessages[outcomeIndex]
        const outcomeComponent = (
          <div 
            key={`${conversation.id}-outcome-${outcomeIndex}`}
            className={`flex items-start gap-4 ${message.speaker === "person2" ? "flex-row-reverse" : ""} animate-in fade-in duration-500 slide-in-from-top-2`}
          >
            <div className="text-3xl">{message.emoji}</div>
            <div className="flex-1 max-w-[80%]">
              <div className="text-sm font-medium text-muted-foreground mb-1">
                {message.name}
              </div>
              <div className={`p-4 relative rounded-lg border ${
                message.speaker === "person1" 
                  ? "bg-blue-50 border-blue-200" 
                  : "bg-green-50 border-green-200"
              }`}>
                <div className={`absolute ${
                  message.speaker === "person1"
                    ? "-left-2 border-r-blue-50"
                    : "-right-2 border-l-green-50"
                } top-4 w-0 h-0 border-t-8 border-b-8 ${
                  message.speaker === "person1"
                    ? "border-r-8 border-transparent"
                    : "border-l-8 border-transparent"
                }`}></div>
                <p className={`font-medium leading-relaxed ${
                  message.speaker === "person1" ? "text-blue-900" : "text-green-900"
                }`}>
                  {message.message}
                </p>
              </div>
            </div>
          </div>
        )
        
        setRenderedMessages(prev => [...prev, outcomeComponent])
        outcomeIndex++
        setTimeout(addNextOutcome, 1200) // 1.2 second delay between outcome messages
      } else {
        // All outcome messages shown, notify parent
        setTimeout(() => {
          onChoiceSelect(answerIndex)
        }, 800) // Brief delay before showing completion
      }
    }
    
    // Start showing outcome messages after a brief delay
    setTimeout(addNextOutcome, 600)
  }

  return (
    <>
      {/* Conversation Title */}
      <div className="mb-4">
        <Card className="p-4 bg-muted">
          <h2 className="text-lg font-bold text-foreground mb-2">{conversation.title}</h2>
          <p className="text-base text-muted-foreground leading-relaxed">{conversation.description}</p>
        </Card>
      </div>

      {/* Conversation Messages */}
      <div className="mb-6 space-y-4">
        {renderedMessages}
        {showChoicePrompt && conversation.steps[0].choice && (
          <div className="flex items-start gap-4 animate-in fade-in duration-500 slide-in-from-top-2">
            <div className="text-3xl">🤔</div>
            <div className="flex-1 max-w-[80%]">
              <div className="text-sm font-medium text-muted-foreground mb-1">
                나의 선택
              </div>
              <div className="p-4 relative rounded-lg border bg-yellow-50 border-yellow-200">
                <div className="absolute -left-2 top-4 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-yellow-50"></div>
                <p className="font-medium leading-relaxed text-yellow-900 mb-3">
                  {conversation.steps[0].choice.prompt}
                </p>
                <div className="space-y-2">
                  {conversation.steps[0].choice.options.map((option, optionIndex) => (
                    <button
                      key={optionIndex}
                      onClick={() => handleChoiceSelect(optionIndex)}
                      className="w-full p-3 text-left rounded-lg border-2 border-yellow-300 bg-yellow-100 text-yellow-800 hover:bg-yellow-200 transition-colors"
                    >
                      <span className="font-medium">{String.fromCharCode(65 + optionIndex)}: {option}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Conversation Completed */}
      {showResult && (
        <Card className="p-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="font-semibold text-green-700">이야기를 완료했습니다!</span>
          </div>
          <div className="mt-3 p-3 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground leading-relaxed">
              로마서의 깊은 의미를 두 친구의 대화를 통해 경험해 보았습니다.
            </p>
          </div>
        </Card>
      )}
    </>
  )
}