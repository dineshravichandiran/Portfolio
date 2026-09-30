import { useEffect, useRef, useState } from 'react'
import { profile } from '../../data/profile'
import { matchIntent, answerFor, type Intent } from '../../data/chatbotKnowledge'

interface Message {
  id: number
  role: 'bot' | 'user'
  text: string
}

type ContactStep = 'idle' | 'name' | 'email' | 'message' | 'sending' | 'done' | 'error'

const QUICK_REPLIES: { label: string; intent: Intent }[] = [
  { label: 'Experience', intent: 'experience' },
  { label: 'Skills', intent: 'skills' },
  { label: 'Projects', intent: 'projects' },
  { label: 'Certifications', intent: 'certifications' },
  { label: 'Get in touch', intent: 'contact' },
]

const CANCEL_WORDS = ['cancel', 'stop', 'nevermind', 'never mind', 'quit']
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

let nextId = 1

export default function ChatAgent() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { id: nextId++, role: 'bot', text: `Hi, I'm OpsBot! Ask about experience, skills, projects, certifications, or say you'd like to get in touch.` },
  ])
  const [input, setInput] = useState('')
  const [contactStep, setContactStep] = useState<ContactStep>('idle')
  const [draft, setDraft] = useState({ name: '', email: '', message: '' })
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, open])

  function addMessage(role: Message['role'], text: string) {
    setMessages((prev) => [...prev, { id: nextId++, role, text }])
  }

  function startContactFlow() {
    setContactStep('name')
    addMessage('bot', "Sure — what's your name?")
  }

  function handleQuickReply(intent: Intent) {
    addMessage('user', QUICK_REPLIES.find((q) => q.intent === intent)?.label ?? intent)
    if (intent === 'contact') {
      startContactFlow()
    } else {
      addMessage('bot', answerFor(intent))
    }
  }

  async function submitContact(finalDraft: typeof draft) {
    setContactStep('sending')
    addMessage('bot', 'Sending that over now…')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...finalDraft, reason: 'Portfolio chatbot', company: '' }),
      })
      if (!res.ok) throw new Error('send failed')
      setContactStep('done')
      addMessage('bot', `Got it, thanks ${finalDraft.name.split(' ')[0]}! Your message is on its way to ${profile.name.split(' ')[0]} — expect a reply by email.`)
    } catch {
      setContactStep('error')
      addMessage('bot', `Hmm, that didn't send. Please email directly instead: ${profile.email}`)
    }
  }

  function handleSend() {
    const text = input.trim()
    if (!text) return
    setInput('')
    addMessage('user', text)

    if (contactStep !== 'idle' && contactStep !== 'done' && contactStep !== 'error' && CANCEL_WORDS.includes(text.toLowerCase())) {
      setContactStep('idle')
      addMessage('bot', 'No problem, cancelled. Anything else I can help with?')
      return
    }

    if (contactStep === 'name') {
      setDraft((d) => ({ ...d, name: text }))
      setContactStep('email')
      addMessage('bot', "Thanks — what's the best email to reach you at?")
      return
    }
    if (contactStep === 'email') {
      if (!EMAIL_RE.test(text)) {
        addMessage('bot', "That doesn't look like a valid email — mind double-checking it?")
        return
      }
      setDraft((d) => ({ ...d, email: text }))
      setContactStep('message')
      addMessage('bot', 'Got it. What would you like to say?')
      return
    }
    if (contactStep === 'message') {
      const finalDraft = { ...draft, message: text }
      setDraft(finalDraft)
      void submitContact(finalDraft)
      return
    }

    // Normal free-form chat.
    const intent = matchIntent(text)
    if (intent === 'contact') {
      startContactFlow()
    } else {
      addMessage('bot', answerFor(intent))
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat assistant' : 'Open chat assistant'}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full border-2 border-accent/70 bg-panel text-accent shadow-lg transition-transform hover:scale-105 hover:text-accent-hover"
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M4 5h16v10H8l-4 4V5z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      {open && (
        <div className="fixed bottom-24 right-5 z-50 flex h-[28rem] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-panel-border bg-panel shadow-2xl">
          <div className="border-b border-panel-border px-4 py-3">
            <div className="text-sm font-semibold text-text">OpsBot</div>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
            {messages.map((m) => (
              <div key={m.id} className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                <div
                  className={
                    m.role === 'user'
                      ? 'max-w-[85%] rounded-2xl rounded-br-sm bg-accent px-3 py-2 text-sm text-white'
                      : 'max-w-[85%] rounded-2xl rounded-bl-sm bg-panel-border/40 px-3 py-2 text-sm text-text'
                  }
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {contactStep === 'idle' && (
            <div className="flex flex-wrap gap-1.5 border-t border-panel-border px-3 py-2">
              {QUICK_REPLIES.map((q) => (
                <button
                  key={q.intent}
                  type="button"
                  onClick={() => handleQuickReply(q.intent)}
                  className="rounded-full border border-accent/50 px-2.5 py-1 text-xs text-accent transition-colors hover:bg-accent/10"
                >
                  {q.label}
                </button>
              ))}
            </div>
          )}

          <form
            className="flex items-center gap-2 border-t border-panel-border p-2"
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={contactStep === 'sending' || contactStep === 'done'}
              placeholder={contactStep === 'done' ? 'Conversation complete' : 'Type a message…'}
              className="flex-1 rounded-full bg-panel-border/30 px-3 py-2 text-sm text-text outline-none placeholder:text-dim disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={contactStep === 'sending' || contactStep === 'done' || !input.trim()}
              aria-label="Send"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-opacity disabled:opacity-40"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 12h15M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  )
}
