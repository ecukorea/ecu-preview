import { Suspense } from "react"
import { AppContent } from "@/components/app-content"

function AppFallback() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-muted-foreground">ECU 맛보기 로딩중...</p>
      </div>
    </div>
  )
}

export default function ChristianityLearningApp() {
  return (
    <Suspense fallback={<AppFallback />}>
      <AppContent />
    </Suspense>
  )
}
