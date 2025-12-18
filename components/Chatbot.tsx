'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { chatbotResponses, defaultResponse } from '@/lib/data'
import { useI18n } from '@/lib/i18n'

type ChatMessage = { type: 'user' | 'bot'; text: string }

const pickRandom = (list: string[]) => (list.length ? list[Math.floor(Math.random() * list.length)] : '')

export default function Chatbot() {
  const { t } = useI18n()
  const welcomeMessage = t.chatbot?.welcome ?? 'Hi! How can I help?'

  const quickPromptList = useMemo(() => {
    const prompts = Array.isArray(t.chatbot?.prompts) ? t.chatbot?.prompts : undefined
    return prompts && prompts.length
      ? prompts
      : [
          'Find me a math tutor under ₾40',
          'Which mentors reply fastest?',
          'How does premium mode work?',
          'Can I see weekend availability?',
        ]
  }, [t])

  const assistantTips = useMemo(() => {
    const tips = Array.isArray(t.chatbot?.tips) ? t.chatbot.tips : undefined
    return tips && tips.length
      ? tips
      : [
          'Combine price, experience, and subject filters for laser-focused matches.',
          'Premium chats unlock instant callbacks and saved preferences.',
          'Share timelines or exam names—our scoring engine weighs them automatically.',
        ]
  }, [t])

  const followUps = t.chatbot?.followUps ?? {}
  const contextLabels = t.chatbot?.context ?? {}

  const knowledgeBase = useMemo(
    () => [
      {
        tag: 'pricing',
        matchers: ['price', 'cost', 'budget', '₾', 'ფასი', 'ღირებულ'],
        answer:
          t.chatbot?.answers?.pricing ??
          'Tutors usually charge ₾20-₾80. Adjust the dual sliders in the Filters block to stay inside your ideal range.',
        followUps:
          Array.isArray(followUps?.pricing) && followUps.pricing.length
            ? followUps.pricing
            : quickPromptList.slice(0, 2),
      },
      {
        tag: 'premium',
        matchers: ['premium', 'vip', 'upgrade', 'exclusive', 'პრემიუმ', 'გამოწერა'],
        answer:
          t.chatbot?.answers?.premium ??
          'Premium subscribers jump the line, unlock dedicated callbacks, and receive curated study drops every week.',
        followUps:
          Array.isArray(followUps?.premium) && followUps.premium.length
            ? followUps.premium
            : quickPromptList.slice(1, 3),
      },
      {
        tag: 'matching',
        matchers: ['match', 'recommend', 'suggest', 'find', 'მიპოვ', 'matchmaking'],
        answer:
          t.chatbot?.answers?.matching ??
          'We weigh 12+ signals (goals, pace, experience range, availability) to score every tutor before showing them.',
        followUps:
          Array.isArray(followUps?.matching) && followUps.matching.length
            ? followUps.matching
            : quickPromptList.slice(0, 3),
      },
      {
        tag: 'availability',
        matchers: ['available', 'slot', 'schedule', 'time', 'calendar', 'როდის'],
        answer:
          t.chatbot?.answers?.availability ??
          'Blue dots on tutor cards highlight open slots this week. For rush requests, tap Contact and call directly.',
        followUps:
          Array.isArray(followUps?.availability) && followUps.availability.length
            ? followUps.availability
            : quickPromptList.slice(0, 2),
      },
    ],
    [t, followUps, quickPromptList],
  )

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([{ type: 'bot', text: welcomeMessage }])
  const [chatInput, setChatInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [suggestedPrompts, setSuggestedPrompts] = useState<string[]>(quickPromptList.slice(0, 3))
  const [contextTag, setContextTag] = useState<string | null>(null)
  const [insight, setInsight] = useState<string>(t.chatbot?.insight ?? assistantTips[0] ?? '')
  const messagesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setSuggestedPrompts(quickPromptList.slice(0, 3))
    setInsight(t.chatbot?.insight ?? assistantTips[0] ?? '')
  }, [quickPromptList, assistantTips, t])

  useEffect(() => {
    setChatMessages((prev) => {
      const hasUserMessages = prev.some((msg) => msg.type === 'user')
      if (hasUserMessages) return prev
      return [{ type: 'bot', text: welcomeMessage }]
    })
  }, [welcomeMessage])

  useEffect(() => {
    const el = messagesRef.current
    if (el) {
      el.scrollTop = el.scrollHeight
    }
  }, [chatMessages, isTyping])

  const fallbackPrompts = quickPromptList.slice(0, 3)

  const getChatbotResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase().trim()

    for (const topic of knowledgeBase) {
      if (topic.matchers.some((keyword) => lowerMessage.includes(keyword))) {
        setContextTag(topic.tag)
        setSuggestedPrompts(topic.followUps)
        return topic.answer
      }
    }

    for (const [key, response] of Object.entries(chatbotResponses)) {
      if (lowerMessage.includes(key.toLowerCase())) {
        setContextTag(null)
        setSuggestedPrompts(fallbackPrompts)
        return response
      }
    }

    setContextTag(null)
    setSuggestedPrompts(fallbackPrompts)
    return `${defaultResponse} ${t.chatbot?.fallback ?? 'Try asking about pricing, premium benefits, or tutor availability.'}`
  }

  const sendMessage = (payload: string) => {
    const userMessage = payload.trim()
    if (!userMessage || isTyping) return

    setChatMessages((prev) => [...prev, { type: 'user', text: userMessage }])
    setChatInput('')
    setIsTyping(true)

    setTimeout(() => {
      const botResponse = getChatbotResponse(userMessage)
      setChatMessages((prev) => [...prev, { type: 'bot', text: botResponse }])
      setIsTyping(false)
      const nextTip = pickRandom(assistantTips)
      if (nextTip) {
        setInsight(nextTip)
      }
    }, 900)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(chatInput)
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(chatInput)
    }
  }

  const handlePromptClick = (prompt: string) => {
    sendMessage(prompt)
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden transform transition-all duration-300 hover:shadow-3xl dark:bg-gray-900/60 dark:border-white/5">
      <div className="bg-gradient-to-r from-[#7b2ff7] via-[#f107a3] to-[#ff6ec4] px-6 py-5 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-2xl">🤖</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold">{t.chatbot?.title ?? 'Assistant'}</h3>
              <p className="text-white/90 text-sm">{t.chatbot?.subtitle ?? 'How can I help?'}</p>
            </div>
          </div>
          <div className="flex flex-col items-end text-xs text-white/80">
            <span className="uppercase tracking-[0.2em]">{t.chatbot?.status ?? 'AI concierge'}</span>
            <span className="flex items-center gap-2 font-semibold text-white">
              <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
              {t.chatbot?.online ?? 'Online now'}
            </span>
          </div>
        </div>
      </div>

      <div ref={messagesRef} className="h-96 overflow-y-auto p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 space-y-4 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950">
        {contextTag && (
          <div className="flex justify-center">
            <span className="px-3 py-1 rounded-full bg-white/80 text-xs font-semibold text-gray-600 shadow dark:bg-white/10 dark:text-gray-200">
              {t.chatbot?.contextLabel ?? 'Focus'}: {contextLabels[contextTag] ?? contextTag}
            </span>
          </div>
        )}
        {chatMessages.map((msg, idx) => (
          <div
            key={`${msg.type}-${idx}-${msg.text}`}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
            style={{ animationDelay: `${idx * 80}ms` }}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-md ${
                msg.type === 'user'
                  ? 'bg-gradient-to-r from-[#7b2ff7] to-[#f107a3] text-white rounded-br-sm'
                  : 'bg-white text-gray-800 rounded-bl-sm border border-gray-200 dark:bg-gray-900/70 dark:text-gray-100 dark:border-gray-800'
              }`}
            >
              <p className="text-sm leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start animate-fade-in">
            <div className="bg-white text-gray-800 rounded-2xl rounded-bl-sm border border-gray-200 px-4 py-3 shadow-md dark:bg-gray-900/70 dark:text-gray-100 dark:border-gray-800">
              <div className="flex space-x-1 items-center">
                <span className="text-sm text-gray-600 dark:text-gray-300">{t.chatbot?.typing ?? 'typing'}</span>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          </div>
        )}

        <div />
      </div>

      <div className="p-4 border-t border-gray-200/50 bg-white/90 backdrop-blur-sm dark:bg-gray-900/60 dark:border-gray-800">
        {insight && (
          <div className="mb-3 text-xs text-gray-500 dark:text-gray-300">
            {t.chatbot?.insightLabel ?? 'Realtime tip'}: {insight}
          </div>
        )}

        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400">
          {t.chatbot?.quickTitle ?? 'Popular prompts'}
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {suggestedPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => handlePromptClick(prompt)}
              className="px-3 py-2 text-xs font-medium rounded-full border border-gray-200 bg-white/80 text-gray-700 hover:border-[#7b2ff7] hover:text-[#7b2ff7] transition dark:border-gray-800 dark:bg-gray-900/70 dark:text-gray-200"
              disabled={isTyping}
            >
              {prompt}
            </button>
          ))}
        </div>

        <form onSubmit={handleSendMessage} className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder={t.chatbot?.placeholder ?? 'Type your message...'}
            className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-[#7b2ff7] focus:border-[#7b2ff7] outline-none text-gray-900 placeholder-gray-400 transition-all hover:border-[#7b2ff7]/50 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={isTyping}
            className="bg-gradient-to-r from-[#7b2ff7] to-[#f107a3] text-white px-6 py-3 rounded-xl hover:from-[#6a1dd9] hover:to-[#d9068f] transform hover:scale-105 transition-all duration-200 font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t.chatbot?.send ?? 'Send'}
          </button>
        </form>

        <p className="mt-3 text-xs text-gray-400 dark:text-gray-500">
          {t.chatbot?.fallback ?? 'Ask anything about pricing, matching, availability, or premium mode.'}
        </p>
      </div>
    </div>
  )
}
