"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Trophy } from "lucide-react"
import { trackExternalLinkClick } from "@/lib/analytics"

interface CompletionModalProps {
  isOpen: boolean
}

export function CompletionModal({ isOpen }: CompletionModalProps) {
  if (!isOpen) return null

  const handleWebsiteClick = () => {
    trackExternalLinkClick("https://ecukorea.com", "ECU 웹사이트 방문하기")
    window.open("https://ecukorea.com", "_blank")
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <Card className="p-6 sm:p-8 mx-4 max-w-md w-full text-center shadow-2xl border-2">
        <Trophy className="w-16 h-16 text-primary mx-auto mb-4 animate-bounce" />
        <h3 className="text-xl sm:text-2xl font-bold mb-4">
          여기까지 ECU에서 하는 활동의 맛보기 였습니다.
        </h3>
        <p className="text-base sm:text-lg text-muted-foreground mb-6">
          함께 하고 싶은 분은 연락주세요!
        </p>
        <Button
          className="w-full"
          size="lg"
          onClick={handleWebsiteClick}
        >
          ECU 웹사이트 방문하기
        </Button>
      </Card>
    </div>
  )
}