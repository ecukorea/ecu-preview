import { data as quizData } from "../quiz"
import { data as conversationData } from "../conversation"
import { data as presentationData } from "../presentation"
import { InteractionItem } from "@/lib/types"

export const data: InteractionItem[] = [
  ...quizData,
  ...conversationData,
  ...presentationData,
].map((interaction, idx) => ({ ...interaction, id: idx }))