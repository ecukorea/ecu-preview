export interface Question {
  scenario: string
  friendQuestion: string
  options: string[]
  correctAnswer: number
  explanation: string
  category: string
  emoji: string
  type: "question"
}

export interface ConversationMessage {
  speaker: "person1" | "person2"
  message: string
  name: string
  emoji: string
}

export interface ConversationStep {
  messages: ConversationMessage[]
  choice?: {
    prompt: string
    options: [string, string]
    outcomes: [ConversationMessage[], ConversationMessage[]] // Different messages for each option
  }
}

export interface Conversation {
  title: string
  description: string
  steps: ConversationStep[]
  category: string
  type: "conversation"
}

export interface PresentationSlide {
  content: string
  speaker?: {
    name: string
    emoji?: string
  }
  lottie?: {
    src: string[] // paths to lottie files
    width?: number
    height?: number
  }
  duration?: number // milliseconds to auto-advance (optional)
  type: "text" | "question" | "image" | "quote" | "lottie"
}

export interface Presentation {
  title: string
  description: string
  chapter: string // e.g., "01. 구원의 확신"
  slides: PresentationSlide[]
  category: string
  type: "presentation"
}

export type InteractionItem = (Question | Conversation | Presentation) & { id: number }

export interface UserProgress {
  score: number
  streak: number
  totalQuestions: number
  correctAnswers: number
  level: number
}
