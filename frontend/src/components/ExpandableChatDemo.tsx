"use client"

import { useState, useEffect, FormEvent, useRef } from "react"
import {
  Send,
  BotMessageSquare,
  Paperclip,
  Mic,
  CornerDownLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat-bubble"
import { ChatInput } from "@/components/ui/chat-input"
import {
  ExpandableChat,
  ExpandableChatHeader,
  ExpandableChatBody,
  ExpandableChatFooter,
} from "@/components/ui/expandable-chat"
import { ChatMessageList } from "@/components/ui/chat-message-list"

interface Message {
  id: number
  content: string
  role: "user" | "assistant" | "system"
  isError?: boolean
}

/** Generate a simple UUID v4 */
function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

const COOKIE_CONSENT_KEY = "cookie_consent_given"
const CHAT_SESSION_KEY = "astra360_chat_session_id"

export function ExpandableChatDemo() {
  const cookiesAccepted = localStorage.getItem(COOKIE_CONSENT_KEY) === "true"

  // Retrieve or generate a session ID if cookies are accepted
  const getSessionId = (): string | null => {
    if (!cookiesAccepted) return null
    let sessionId = localStorage.getItem(CHAT_SESSION_KEY)
    if (!sessionId) {
      sessionId = generateUUID()
      localStorage.setItem(CHAT_SESSION_KEY, sessionId)
    }
    return sessionId
  }

  const sessionIdRef = useRef<string | null>(getSessionId())
  
  // Track extracted lead info so we send it with requests after the user provides it
  const [leadName, setLeadName] = useState<string | null>(null)
  const [leadPhone, setLeadPhone] = useState<string | null>(null)

  const initialGreeting = cookiesAccepted
    ? "Hi there! 👋 I'm Mr.360, your Astra 360 assistant. To help personalize your experience, may I have your **name** and **phone number**? Or just ask how we can help your business grow!"
    : "Hi there! 👋 I'm Mr.360, your Astra 360 assistant. How can I help you today?"

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: initialGreeting,
      role: "assistant",
    },
  ])

  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  /** Try to extract a name/phone from raw user text */
  const extractLeadInfo = (text: string) => {
    // Simple phone regex for Indian numbers or generic 10-digit
    const phoneMatch = text.match(/(\+91[\s-]?)?[6-9]\d{9}/)
    // Very rough name extraction: single capitalized word or two-word sequence
    const nameMatch = text.match(/(?:(?:my|i am|i'm|this is|call me)\s+)?([A-Z][a-z]+(?:\s[A-Z][a-z]+)?)/)
    
    if (phoneMatch && !leadPhone) {
      setLeadPhone(phoneMatch[0])
    }
    if (nameMatch && !leadName) {
      setLeadName(nameMatch[1])
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now(),
      content: input,
      role: "user",
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Try to extract lead info from the user input
    extractLeadInfo(input)

    // Build the message array sent to AI
    const apiMessages = [...messages, userMessage]
      .filter((m) => !m.isError)
      .map((m) => ({
        role: m.role,
        content: m.content,
      }))

    const requestBody: Record<string, unknown> = {
      messages: apiMessages,
    }

    // Include session and lead info if cookies are accepted
    if (sessionIdRef.current) {
      requestBody.session_id = sessionIdRef.current
      if (leadName) requestBody.user_name = leadName
      if (leadPhone) requestBody.user_phone = leadPhone
    }

    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const apiUrl = baseUrl.endsWith('/api') ? `${baseUrl}/chatbot/message` : `${baseUrl}/api/chatbot/message`;
      
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "text/event-stream",
        },
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const aiMessageId = Date.now() + 1
      setMessages((prev) => [
        ...prev,
        {
          id: aiMessageId,
          content: "",
          role: "assistant",
        },
      ])

      setIsLoading(false)

      const reader = response.body?.getReader()
      const decoder = new TextDecoder("utf-8")
      let aiFullResponse = ""

      while (reader) {
        const { value, done } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split("\n")

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const dataStr = line.substring(6).trim()
            if (dataStr === "[DONE]") break

            try {
              const data = JSON.parse(dataStr)
              if (data.text) {
                aiFullResponse += data.text
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === aiMessageId
                      ? { ...msg, content: aiFullResponse }
                      : msg
                  )
                )
              }
              if (data.error) {
                console.error("AI API Error Chunk:", data.error)
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === aiMessageId
                      ? { ...msg, content: aiFullResponse || "Error: AI provider quota exceeded or API keys invalid.", isError: true }
                      : msg
                  )
                )
              }
            } catch (err) {
              console.warn("Failed to parse SSE JSON:", dataStr)
            }
          }
        }
      }
    } catch (error) {
      console.error("Chatbot request failed:", error)
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          content: "Sorry, I am having trouble connecting to the server. Please check your backend is running or API keys are valid.",
          role: "assistant",
          isError: true,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ExpandableChat
      position="bottom-left"
      size="md"
      icon={
        <BotMessageSquare
          className="h-6 w-6"
          aria-hidden="true"
        />
      }
      aria-label="Open chat assistant"
    >
      <ExpandableChatHeader>
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">Mr.360 - Your Super Bot</h3>
          <p className="text-sm text-muted-foreground">
            Ask me anything about the services
          </p>
        </div>
      </ExpandableChatHeader>

      <ExpandableChatBody>
        <ChatMessageList smooth>
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              variant={message.role === "user" ? "sent" : "received"}
            >
              <ChatBubbleAvatar
                fallback={message.role === "user" ? "US" : "AI"}
              />
              <ChatBubbleMessage className={message.isError ? "text-destructive font-medium bg-destructive/10" : ""}>
                {message.content}
              </ChatBubbleMessage>
            </ChatBubble>
          ))}

          {isLoading && (
            <ChatBubble variant="received">
              <ChatBubbleAvatar fallback="AI" />
              <ChatBubbleMessage isLoading />
            </ChatBubble>
          )}
        </ChatMessageList>
      </ExpandableChatBody>

      <ExpandableChatFooter>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <ChatInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message…"
            aria-label="Chat message input"
            className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
          />

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Attach a file"
              >
                <Paperclip className="h-4 w-4" aria-hidden="true" />
              </Button>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Use microphone"
              >
                <Mic className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>

            <Button
              type="submit"
              size="sm"
              className="gap-1.5"
              aria-label="Send message"
            >
              Send Message
              <CornerDownLeft
                className="h-3.5 w-3.5"
                aria-hidden="true"
              />
            </Button>
          </div>
        </form>
      </ExpandableChatFooter>
    </ExpandableChat>
  )
}
