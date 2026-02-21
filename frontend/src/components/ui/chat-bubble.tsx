"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MessageLoading } from "@/components/ui/message-loading";

interface ChatBubbleProps {
  variant?: "sent" | "received"
  layout?: "default" | "ai"
  className?: string
  children: React.ReactNode
}

export function ChatBubble({
  variant = "received",
  layout = "default",
  className,
  children,
}: ChatBubbleProps) {
  return (
    <div
      className={cn(
        "flex gap-2 max-w-[80%] items-end relative group",
        variant === "sent" ? "ml-auto flex-row-reverse" : "",
        layout === "ai" ? "max-w-full w-full items-start" : "",
        className
      )}
    >
      {children}
    </div>
  )
}

interface ChatBubbleMessageProps {
  variant?: "sent" | "received"
  isLoading?: boolean
  className?: string
  children?: React.ReactNode
}

export function ChatBubbleMessage({
  variant = "received",
  isLoading,
  className,
  children,
}: ChatBubbleMessageProps) {
  
  // Helper to parse text into clickable links, emails, and phone numbers
  const formatContent = (content: React.ReactNode) => {
    if (typeof content !== 'string') return content;
    
    // Regex for URLs, Emails, and Phone Numbers (including +91 format)
    const phoneRegex = /(\+?\d{1,4}[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9})/g;
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g;
    
    // Split by email first, keeping the delimiter
    const emailParts = content.split(emailRegex);
    const parsedWithEmails: React.ReactNode[] = [];

    for (let i = 0; i < emailParts.length; i++) {
        // Odd indices are the captured emails
        if (i % 2 !== 0) {
            parsedWithEmails.push(<a key={`email-${i}`} href={`mailto:${emailParts[i]}`} className="text-blue-500 hover:underline">{emailParts[i]}</a>);
        } else {
            parsedWithEmails.push(emailParts[i]);
        }
    }
    
    // Now pass over the parts again to parse phone numbers
    const finalContent = parsedWithEmails.reduce((acc: React.ReactNode[], part, i) => {
        if (typeof part === 'string') {
            const phoneParts = part.split(phoneRegex);
            const parsedPhoneParts: React.ReactNode[] = [];
            
            for (let j = 0; j < phoneParts.length; j++) {
                 // Odd indices are the captured phone numbers
                 if (j % 2 !== 0) {
                      const digitsOnly = phoneParts[j].replace(/\D/g, '');
                      if (digitsOnly.length >= 7) {
                          parsedPhoneParts.push(<a key={`phone-${i}-${j}`} href={`tel:${digitsOnly}`} className="text-blue-500 hover:underline">{phoneParts[j]}</a>);
                      } else {
                          parsedPhoneParts.push(phoneParts[j]);
                      }
                 } else {
                     parsedPhoneParts.push(phoneParts[j]);
                 }
            }
            return acc.concat(parsedPhoneParts);
        }
        return acc.concat(part);
    }, []);

    return finalContent;
  };

  return (
    <div
      className={cn(
        "rounded-lg p-3 whitespace-pre-wrap",
        variant === "sent"
          ? "bg-primary text-primary-foreground"
          : "bg-muted text-foreground",
        className
      )}
    >
      {isLoading ? (
        <div className="flex items-center space-x-2">
          <MessageLoading />
        </div>
      ) : (
        formatContent(children)
      )}
    </div>
  )
}


interface ChatBubbleAvatarProps {
  src?: string
  fallback?: string
  className?: string
}

export function ChatBubbleAvatar({
  src,
  fallback = "AI",
  className,
}: ChatBubbleAvatarProps) {
  return (
    <Avatar className={cn("h-8 w-8 shrink-0", className)}>
      {src && <AvatarImage src={src} alt="Avatar" />}
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  )
}

interface ChatBubbleActionProps {
  icon?: React.ReactNode
  onClick?: () => void
  className?: string
}

export function ChatBubbleAction({
  icon,
  onClick,
  className,
}: ChatBubbleActionProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("h-6 w-6", className)}
      onClick={onClick}
    >
      {icon}
    </Button>
  )
}

export function ChatBubbleActionWrapper({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "absolute top-1/2 -translate-y-1/2 flex opacity-0 group-hover:opacity-100 transition-opacity",
        className
      )}
    >
      {children}
    </div>
  )
}