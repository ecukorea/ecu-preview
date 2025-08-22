"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import { Presentation, UserProgress } from "@/lib/types"

interface PresentationComponentProps {
  presentation: Presentation
  onComplete: () => void
  userProgress: UserProgress
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

  // Update progress indicator
  useEffect(() => {
    if (!isPlaying || !currentSlide.duration) return

    const interval = setInterval(() => {
      setProgressKey(prev => prev + 1)
    }, 100)

    return () => clearInterval(interval)
  }, [isPlaying, currentSlide.duration, slideStartTime])

  const handleNext = () => {
    if (isLastSlide) {
      onComplete()
    } else {
      setCurrentSlideIndex(currentSlideIndex + 1)
    }
  }

  const handleSlideClick = () => {
    if (isPlaying) {
      setIsPlaying(false)
    }
    handleNext()
  }

  const handlePrevious = () => {
    if (!isFirstSlide) {
      setCurrentSlideIndex(currentSlideIndex - 1)
    }
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'ArrowRight':
        case 'Space':
          event.preventDefault()
          handleNext()
          break
        case 'ArrowLeft':
          event.preventDefault()
          handlePrevious()
          break
        case 'KeyP':
          event.preventDefault()
          togglePlay()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentSlideIndex, isPlaying])

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
    <div className="min-h-[calc(100vh-200px)] flex flex-col bg-gradient-to-br from-background to-muted/20">
      {/* Chapter Header */}
      <div className="mb-8 text-center px-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-3">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <h2 className="text-sm font-medium text-primary">{presentation.title}</h2>
        </div>
        <h1 className="text-2xl font-bold text-foreground bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          {presentation.chapter}
        </h1>
      </div>

      {/* Main Slide Content */}
      <div className="flex-1 flex items-center justify-center px-4">
        <Card 
          className="w-full max-w-3xl relative overflow-hidden cursor-pointer group transition-all duration-300 hover:scale-[1.02] hover:shadow-xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border border-border/50"
          onClick={handleSlideClick}
        >
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-grid-pattern"></div>
          </div>
          
          <div className="relative p-4 sm:p-8 md:p-12 h-[500px] sm:h-[450px] flex flex-col items-center justify-center text-center overflow-y-auto overflow-x-hidden">
            {/* Speaker Name Only */}
            {currentSlide.speaker && (
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/20 rounded-full">
                  <span className="text-lg">{currentSlide.speaker.emoji}</span>
                  <p className="text-lg font-semibold text-secondary">{currentSlide.speaker.name}</p>
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
                    {currentSlide.lottie.src.map((src, index) => {
                      // Character names for the first slide (all characters introduction)
                      const characterNames = ["민지", "준호", "수연", "태민"];
                      const characterEmojis = ["😊", "🤔", "🙏", "💪"];
                      const isMultipleCharacters = currentSlide.lottie.src.length > 1;
                      
                      return (
                        <div key={index} className="relative flex flex-col items-center">
                          <div className="relative">
                            <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
                            <DotLottieReact
                              src={src}
                              loop
                              autoplay
                              style={{
                                width: isMultipleCharacters ? (currentSlide.lottie.width || 100) : (currentSlide.lottie.width || 180),
                                height: isMultipleCharacters ? (currentSlide.lottie.height || 100) : (currentSlide.lottie.height || 180),
                              }}
                            />
                          </div>
                          {isMultipleCharacters && (
                            <div className="mt-1 sm:mt-2 text-center">
                              <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 rounded-full">
                                <span className="text-xs sm:text-sm">{characterEmojis[index]}</span>
                                <span className="text-xs sm:text-sm font-medium text-primary">{characterNames[index]}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {currentSlide.type === "question" ? (
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-relaxed text-foreground mb-4">
                  {currentSlide.content}
                </h3>
              ) : currentSlide.type === "quote" ? (
                <div className="relative">
                  <div className="absolute -left-2 sm:-left-4 -top-2 sm:-top-4 text-4xl sm:text-6xl text-primary/20 font-serif">"</div>
                  <blockquote className="text-sm sm:text-lg md:text-xl italic leading-relaxed text-foreground font-medium px-2 sm:px-6 py-3 sm:py-4 bg-primary/5 rounded-lg border-l-4 border-primary w-full max-w-full">
                    {currentSlide.content}
                  </blockquote>
                  <div className="absolute -right-2 sm:-right-4 -bottom-2 sm:-bottom-4 text-4xl sm:text-6xl text-primary/20 font-serif">"</div>
                </div>
              ) : currentSlide.type === "lottie" ? (
                <div className="text-center space-y-2 sm:space-y-4">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-relaxed text-foreground">
                    {currentSlide.content}
                  </h3>
                </div>
              ) : (
                <p className="text-sm sm:text-lg md:text-xl leading-relaxed text-foreground font-medium max-w-full px-2">
                  {currentSlide.content}
                </p>
              )}
            </div>
          </div>
          
          {/* Hover indicator */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-60 transition-opacity">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>클릭</span>
              <ChevronRight className="w-3 h-3" />
            </div>
          </div>
        </Card>
      </div>

      {/* Navigation Controls */}
      <div className="mt-8 px-6">
        {/* Progress Indicator */}
        <div className="flex justify-center mb-6">
          <div className="w-48 h-2 bg-muted/30 rounded-full overflow-hidden bg-card/50 backdrop-blur-sm border border-border/30">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{
                width: `${((currentSlideIndex + (isPlaying && currentSlide.duration ? Math.min(100, ((Date.now() - slideStartTime) / currentSlide.duration) * 100) / 100 : 0)) / presentation.slides.length) * 100}%`
              }}
            />
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-center space-x-3">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevious}
            disabled={isFirstSlide}
            className="h-10 w-10 rounded-full bg-card/50 backdrop-blur-sm border-border/30 hover:bg-primary/10 hover:border-primary/30 disabled:opacity-30 transition-all"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant={isPlaying ? "default" : "outline"}
            size="icon"
            onClick={togglePlay}
            className="h-12 w-12 rounded-full bg-card/50 backdrop-blur-sm border-border/30 hover:bg-primary hover:border-primary transition-all"
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            className="h-10 w-10 rounded-full bg-card/50 backdrop-blur-sm border-border/30 hover:bg-primary/10 hover:border-primary/30 transition-all"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Slide Counter and Hints */}
        <div className="text-center mt-6 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-muted/30 rounded-full">
            <span className="text-sm font-medium text-muted-foreground">
              {currentSlideIndex + 1} / {presentation.slides.length}
            </span>
          </div>
          <div className="text-xs text-muted-foreground/60 space-y-1">
            <div className="flex items-center justify-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-muted/40 rounded border flex items-center justify-center">
                  <span className="text-[8px]">📱</span>
                </div>
                <span>클릭</span>
              </div>
              <span>또는</span>
              <div className="flex items-center gap-1">
                <div className="px-1 py-0.5 bg-muted/40 rounded text-[8px]">SPACE</div>
                <span>다음</span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-1">
              <div className="px-1 py-0.5 bg-muted/40 rounded text-[8px]">P</div>
              <span>자동재생 토글</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}