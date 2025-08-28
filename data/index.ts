import { data as defaultData } from "./campuses/default"
import { data as testCampus } from "./campuses/test"
import { InteractionItem } from "@/lib/types"

const campusData = {
  default: defaultData,
  test: testCampus,
}

export function getInteractions(campus?: string): InteractionItem[] {
  const selectedCampus =
    campus && campus in campusData ? (campus as keyof typeof campusData) : "default"
  return campusData[selectedCampus]
}
