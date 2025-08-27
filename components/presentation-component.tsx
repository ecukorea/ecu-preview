"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { ChevronLeft, ChevronRight, Maximize, Minimize, Pause, Play } from "lucide-react"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import { Presentation, UserProgress } from "@/lib/types"

interface PresentationComponentProps {
  presentation: Presentation
  onComplete: () => void
  userProgress: UserProgress
}

// Helper function to parse markdown-style formatting
function parseFormattedText(text: string) {
  // Split by markdown patterns while preserving the markers
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|__[^_]+__)/g)

  return parts.map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      // Code/emphasis with backticks
      return (
        <code
          key={index}
          className="bg-primary/10 px-1.5 py-0.5 rounded text-primary font-semibold"
        >
          {part.slice(1, -1)}
        </code>
      )
    } else if (part.startsWith("**") && part.endsWith("**")) {
      // Bold text
      return (
        <strong key={index} className="font-bold text-primary">
          {part.slice(2, -2)}
        </strong>
      )
    } else if (part.startsWith("*") && part.endsWith("*")) {
      // Italic text
      return (
        <em key={index} className="italic text-secondary">
          {part.slice(1, -1)}
        </em>
      )
    } else if (part.startsWith("__") && part.endsWith("__")) {
      // Underlined text
      return (
        <span key={index} className="underline decoration-primary decoration-2 underline-offset-2">
          {part.slice(2, -2)}
        </span>
      )
    }
    // Regular text
    return part
  })
}

export function PresentationComponent({
  presentation,
  onComplete,
  userProgress,
}: PresentationComponentProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [slideStartTime, setSlideStartTime] = useState<number>(Date.now())
  const [progressKey, setProgressKey] = useState(0)
  const [isMaximized, setIsMaximized] = useState(false)
  const [showInitialTooltips, setShowInitialTooltips] = useState(true)

  const currentSlide = presentation.slides[currentSlideIndex]
  const isLastSlide = currentSlideIndex === presentation.slides.length - 1
  const isFirstSlide = currentSlideIndex === 0

  // Show slide content with animation
  useEffect(() => {
    setIsVisible(false)
    setSlideStartTime(Date.now())
    setProgressKey(prev => prev + 1)
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [currentSlideIndex])

  // Hide initial tooltips after delay or user interaction
  useEffect(() => {
    if (showInitialTooltips && currentSlideIndex === 0) {
      const timer = setTimeout(() => {
        setShowInitialTooltips(false)
      }, 6000) // Show for 6 seconds

      return () => clearTimeout(timer)
    }
  }, [showInitialTooltips, currentSlideIndex])

  // Reset tooltips when returning to first slide
  useEffect(() => {
    if (currentSlideIndex === 0 && !showInitialTooltips) {
      const timer = setTimeout(() => {
        setShowInitialTooltips(true)
      }, 500) // Brief delay before showing again

      return () => clearTimeout(timer)
    } else if (currentSlideIndex > 0) {
      setShowInitialTooltips(false)
    }
  }, [currentSlideIndex])

  // Hide tooltips on any user interaction
  const hideTooltips = () => {
    if (showInitialTooltips) {
      setShowInitialTooltips(false)
    }
  }

  // Update progress indicator
  useEffect(() => {
    if (!isPlaying || !currentSlide.duration) return

    const interval = setInterval(() => {
      setProgressKey(prev => prev + 1)
    }, 100)

    return () => clearInterval(interval)
  }, [isPlaying, currentSlide.duration, slideStartTime])

  const handleNext = () => {
    hideTooltips()
    if (isLastSlide) {
      onComplete()
    } else {
      setCurrentSlideIndex(currentSlideIndex + 1)
    }
  }

  const handleSlideClick = () => {
    hideTooltips()
    if (isPlaying) {
      setIsPlaying(false)
    }
    handleNext()
  }

  const handlePrevious = () => {
    hideTooltips()
    if (!isFirstSlide) {
      setCurrentSlideIndex(currentSlideIndex - 1)
    }
  }

  const togglePlay = () => {
    hideTooltips()
    setIsPlaying(!isPlaying)
  }

  const toggleMaximize = () => {
    hideTooltips()
    setIsMaximized(!isMaximized)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      hideTooltips()
      switch (event.code) {
        case "ArrowRight":
        case "Space":
          event.preventDefault()
          handleNext()
          break
        case "ArrowLeft":
          event.preventDefault()
          handlePrevious()
          break
        case "KeyP":
          event.preventDefault()
          togglePlay()
          break
        case "KeyF":
        case "F11":
          event.preventDefault()
          toggleMaximize()
          break
        case "Escape":
          if (isMaximized) {
            event.preventDefault()
            setIsMaximized(false)
          }
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentSlideIndex, isPlaying, isMaximized])

  // Auto-advance slides when playing
  useEffect(() => {
    if (!isPlaying || !currentSlide.duration) return

    const timer = setTimeout(() => {
      if (isLastSlide) {
        setIsPlaying(false)
        onComplete()
      } else {
        handleNext()
      }
    }, currentSlide.duration)

    return () => clearTimeout(timer)
  }, [currentSlideIndex, isPlaying, currentSlide.duration, isLastSlide])

  return (
    <div className="bg-gradient-to-br from-background to-muted/20 relative transition-all duration-500 ease-in-out">
      {/* Chapter Title - Now at top without fixed positioning */}
      <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
        isMaximized ? 'max-h-0 opacity-0' : 'max-h-20 opacity-100'
      }`}>
        <div className="pt-1 pb-3 text-center px-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {presentation.chapter}
          </h1>
        </div>
      </div>

      {/* Main Slide Content - Expanded */}
      <div className={`flex-1 flex items-center justify-center transition-all duration-500 ease-in-out ${
        isMaximized 
          ? 'fixed inset-0 z-40 bg-gradient-to-br from-background to-muted/20 pb-16' 
          : 'px-4 pb-4'
      }`}>
        <Tooltip open={showInitialTooltips && currentSlideIndex === 0}>
          <TooltipTrigger asChild>
            <Card
              className={`relative overflow-hidden cursor-pointer group transition-all duration-500 ease-in-out bg-white ${
                isMaximized 
                  ? 'w-full h-full border-0 rounded-none shadow-none' 
                  : 'w-full max-w-4xl border border-border/50 shadow-2xl hover:scale-[1.02] hover:shadow-xl rounded-lg'
              }`}
              onClick={handleSlideClick}
            >
              {/* Maximize/Minimize Button - Top Right */}
              <Tooltip open={showInitialTooltips && currentSlideIndex === 0}>
                <TooltipTrigger asChild>
                  <Button
                    variant={isMaximized ? "default" : "outline"}
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation() // Prevent slide click
                      toggleMaximize()
                    }}
                    className={`absolute z-10 h-8 w-8 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 ${
                      isMaximized 
                        ? 'top-6 right-6 opacity-90 hover:opacity-100' 
                        : 'top-4 right-4 opacity-70 hover:opacity-100'
                    }`}
                  >
                    {isMaximized ? <Minimize className="h-3 w-3" /> : <Maximize className="h-3 w-3" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isMaximized ? "전체화면 종료 (ESC)" : "전체화면 (F)"}</p>
                </TooltipContent>
              </Tooltip>

              {/* Subtle background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-grid-pattern"></div>
              </div>

              <div className={`relative flex flex-col items-center justify-center text-center overflow-y-auto overflow-x-hidden transition-all duration-500 ease-in-out ${
                isMaximized 
                  ? 'p-8 sm:p-12 md:p-20 h-full pb-20' 
                  : 'p-6 sm:p-10 md:p-16 min-h-[600px] sm:min-h-[650px] md:min-h-[700px]'
              }`}>
                {/* Speaker Name Only */}
                {currentSlide.speaker && (
                  <div className="mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/20 rounded-full">
                      <span className="text-lg">{currentSlide.speaker.emoji}</span>
                      <p className="text-lg sm:text-xl font-semibold text-secondary">
                        {currentSlide.speaker.name}
                      </p>
                    </div>
                  </div>
                )}

                {/* Slide Content */}
                <div
                  className={`transition-all duration-700 ease-out ${
                    isVisible
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-8 scale-95"
                  }`}
                >
                  {/* Lottie Animations */}
                  {currentSlide.lottie && (
                    <div className="mb-4 sm:mb-6 md:mb-8 flex justify-center">
                      <div className="flex gap-2 sm:gap-4 md:gap-6 flex-wrap justify-center">
                        {currentSlide.lottie?.src.map((src, index) => {
                          // Character mapping for reliable name-to-lottie association
                          const characterMap = {
                            "/assets/lottie/male-02.lottie": { name: "준수", emoji: "🤔" },
                            "/assets/lottie/female-01.lottie": { name: "민지", emoji: "😊" },
                            "/assets/lottie/female-02.lottie": { name: "수연", emoji: "🙏" },
                            "/assets/lottie/male-04.lottie": { name: "태민", emoji: "💪" },
                          }
                          const character = characterMap[src as keyof typeof characterMap] || {
                            name: "Unknown",
                            emoji: "❓",
                          }
                          const isMultipleCharacters = (currentSlide.lottie?.src.length || 0) > 1

                          return (
                            <div key={index} className="relative flex flex-col items-center">
                              <div className="relative">
                                <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
                                <DotLottieReact
                                  src={src}
                                  loop
                                  autoplay
                                  style={{
                                    width: isMultipleCharacters
                                      ? currentSlide.lottie?.width || 100
                                      : currentSlide.lottie?.width || 180,
                                    height: isMultipleCharacters
                                      ? currentSlide.lottie?.height || 100
                                      : currentSlide.lottie?.height || 180,
                                  }}
                                />
                              </div>
                              {isMultipleCharacters && (
                                <div className="mt-1 sm:mt-2 text-center">
                                  <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 rounded-full">
                                    <span className="text-sm sm:text-base">{character.emoji}</span>
                                    <span className="text-sm sm:text-base font-medium text-primary">
                                      {character.name}
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {currentSlide.type === "question" ? (
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-relaxed text-foreground mb-4">
                      {currentSlide.content.split("\n").map((line, index) => (
                        <span key={index}>
                          {parseFormattedText(line)}
                          {index < currentSlide.content.split("\n").length - 1 && <br />}
                        </span>
                      ))}
                    </h3>
                  ) : currentSlide.type === "quote" ? (
                    <div className="relative">
                      <div className="absolute -left-2 sm:-left-4 -top-2 sm:-top-4 text-4xl sm:text-6xl text-primary/20 font-serif">
                        &ldquo;
                      </div>
                      <blockquote className="text-base sm:text-lg md:text-xl italic leading-relaxed text-foreground font-medium px-2 sm:px-6 py-3 sm:py-4 bg-primary/5 rounded-lg border-l-4 border-primary w-full max-w-full">
                        {currentSlide.content.split("\n").map((line, index) => (
                          <span key={index}>
                            {parseFormattedText(line)}
                            {index < currentSlide.content.split("\n").length - 1 && <br />}
                          </span>
                        ))}
                      </blockquote>
                      <div className="absolute -right-2 sm:-right-4 -bottom-2 sm:-bottom-4 text-4xl sm:text-6xl text-primary/20 font-serif">
                        &rdquo;
                      </div>
                    </div>
                  ) : currentSlide.type === "lottie" ? (
                    <div className="text-center space-y-2 sm:space-y-4">
                      <p className="text-base sm:text-lg md:text-xl leading-relaxed text-foreground font-medium">
                        {currentSlide.content.split("\n").map((line, index) => (
                          <span key={index}>
                            {parseFormattedText(line)}
                            {index < currentSlide.content.split("\n").length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                    </div>
                  ) : (
                    <p className="text-base sm:text-lg md:text-xl leading-relaxed text-foreground font-medium max-w-full px-2">
                      {currentSlide.content.split("\n").map((line, index) => (
                        <span key={index}>
                          {parseFormattedText(line)}
                          {index < currentSlide.content.split("\n").length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  )}
                </div>
              </div>

              {/* Hover indicator */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-60 transition-opacity">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <span>클릭</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            </Card>
          </TooltipTrigger>
          <TooltipContent>
            <p>클릭하여 다음 슬라이드로 이동</p>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Fixed Bottom Controls */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-t border-border/50">
        {/* Progress Indicator */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="w-full h-1 bg-muted/30 cursor-pointer">
              <div
                className="h-full bg-primary transition-all duration-300 ease-out"
                style={{
                  width: `${((currentSlideIndex + 1) / presentation.slides.length) * 100}%`,
                }}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              진행률: {Math.round(((currentSlideIndex + 1) / presentation.slides.length) * 100)}%
            </p>
          </TooltipContent>
        </Tooltip>

        {/* Controls */}
        <div className="flex items-center justify-between px-4 py-2">
          {/* Left: Title */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <h2 className="text-sm font-medium text-primary">{presentation.title}</h2>
          </div>

          {/* Center: Navigation Controls */}
          <div className="flex items-center space-x-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handlePrevious}
                  disabled={isFirstSlide}
                  className="h-8 w-8 rounded-full disabled:opacity-30"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>이전 슬라이드 (←)</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip open={showInitialTooltips && currentSlideIndex === 0}>
              <TooltipTrigger asChild>
                <Button
                  variant={isPlaying ? "default" : "outline"}
                  size="sm"
                  onClick={togglePlay}
                  className="h-8 w-8 rounded-full"
                >
                  {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isPlaying ? "일시정지" : "자동재생"} (P)</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleNext}
                  className="h-8 w-8 rounded-full"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>다음 슬라이드 (→ 또는 Space)</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Right: Slide Counter */}
          <div className="text-sm font-medium text-muted-foreground">
            {currentSlideIndex + 1} / {presentation.slides.length}
          </div>
        </div>
      </div>
    </div>
  )
}
