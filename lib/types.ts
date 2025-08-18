export interface Question {
  id: number
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
  id: number
  title: string
  description: string
  steps: ConversationStep[]
  category: string
  type: "conversation"
}

export type InteractionItem = Question | Conversation

export interface UserProgress {
  score: number
  streak: number
  totalQuestions: number
  correctAnswers: number
  badges: string[]
  level: number
}
