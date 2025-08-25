// Google Analytics 4 utility functions
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, any>) => void
  }
}

// Track custom events
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters)
  }
}

// Learning interaction events
export const trackQuestionAnswered = (questionId: number, isCorrect: boolean, category: string) => {
  trackEvent('question_answered', {
    question_id: questionId,
    is_correct: isCorrect,
    category: category,
    event_category: 'learning',
  })
}

export const trackConversationCompleted = (conversationId: number, choiceIndex: number, category: string) => {
  trackEvent('conversation_completed', {
    conversation_id: conversationId,
    choice_selected: choiceIndex,
    category: category,
    event_category: 'learning',
  })
}

export const trackPresentationViewed = (presentationId: number, slideCount: number, category: string) => {
  trackEvent('presentation_viewed', {
    presentation_id: presentationId,
    slide_count: slideCount,
    category: category,
    event_category: 'learning',
  })
}

// Gamification events

export const trackStreakAchieved = (streakCount: number) => {
  trackEvent('streak_achieved', {
    streak_count: streakCount,
    event_category: 'gamification',
  })
}

export const trackScoreUpdate = (newScore: number, pointsEarned: number) => {
  trackEvent('score_update', {
    new_score: newScore,
    points_earned: pointsEarned,
    event_category: 'gamification',
  })
}

// Navigation and engagement events
export const trackContentComplete = (contentType: 'question' | 'conversation' | 'presentation', completionTime?: number) => {
  trackEvent('content_complete', {
    content_type: contentType,
    completion_time: completionTime,
    event_category: 'engagement',
  })
}

export const trackSessionProgress = (currentIndex: number, totalItems: number, progressPercentage: number) => {
  trackEvent('session_progress', {
    current_index: currentIndex,
    total_items: totalItems,
    progress_percentage: progressPercentage,
    event_category: 'engagement',
  })
}

export const trackExternalLinkClick = (url: string, linkText: string) => {
  trackEvent('external_link_click', {
    link_url: url,
    link_text: linkText,
    event_category: 'engagement',
  })
}