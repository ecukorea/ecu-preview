import { data as presentationData } from "../presentation"
import { InteractionItem } from "@/lib/types"

export const data: InteractionItem[] = [...presentationData].map((interaction, idx) => ({
  ...interaction,
  id: idx,
}))