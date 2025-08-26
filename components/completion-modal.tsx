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

  const handleInstagramClick = () => {
    trackExternalLinkClick("https://www.instagram.com/ecu4u_official", "ECU 인스타그램")
    window.open("https://www.instagram.com/ecu4u_official", "_blank")
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <Card className="p-6 sm:p-8 mx-4 max-w-lg w-full text-center shadow-2xl border-2">
        <Trophy className="w-16 h-16 text-primary mx-auto mb-4 animate-bounce" />
        <h3 className="text-xl sm:text-2xl font-bold mb-4 break-keep">
          여기까지 함께 해주셔서 감사합니다! 😊
        </h3>
        <p className="text-base sm:text-lg text-muted-foreground mb-6 break-keep">
          ECU(Evangelical Christian Union, 복음주의 학생연합)는 복음주의 학생 운동입니다.
          <br />
          주님의 지상 명령을 따르는 대학생들의 모임으로 전도, 제자도, 선교의 3대 본질에 근거하여
          다음 세대를 책임질 리더 양성과 세계 선교를 꿈꾸고 있습니다.
          <br />
          캠퍼스 복음화를 위해 말씀 공부, 전도, 양육에 전념하는 건강한 선교단체로, 경건한 복음주의
          운동들과 그 맥락을 같이 합니다.
          <br />
          <br />더 많은 정보는 아래 버튼을 눌러 ECU 공식 홈페이지와 인스타그램을 방문해 주세요!
        </p>
        <Button className="w-full" size="lg" onClick={handleWebsiteClick}>
          ECU 홈페이지 방문하기
        </Button>
        <Button className="w-full bg-rose-400" size="lg" onClick={handleInstagramClick}>
          ECU 인스타그램 방문하기
        </Button>
      </Card>
    </div>
  )
}