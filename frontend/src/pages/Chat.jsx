import React, { useState } from 'react'

const initialMessages = [
  { from: 'bot', text: 'Hello! I am AutoSmart AI. Ask me about car valuation, resale tips, or price prediction.' }
]

const cannedResponses = {
  valuation: 'For valuation, enter the car details on the Predict Price page and our ML model will estimate the price immediately.',
  resale: 'To improve resale value, keep your service history updated, fix minor dents, and keep the car clean inside and out.',
  model: 'Our backend chooses the best model automatically after comparing Linear Regression, Decision Tree, and Random Forest.'
}

export default function Chat(){
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')

  function getReply(text){
    const lower = text.toLowerCase()
    if(lower.includes('resale') || lower.includes('sell') || lower.includes('value')) return cannedResponses.resale
    if(lower.includes('model') || lower.includes('machine') || lower.includes('predict')) return cannedResponses.model
    if(lower.includes('valuation') || lower.includes('price') || lower.includes('estimate')) return cannedResponses.valuation
    return 'Great question! Please enter your car details on Predict Price for a specific estimate, or tell me more about what you need.'
  }

  function handleSend(){
    if(!input.trim()) return
    const userText = input.trim()
    const botText = getReply(userText)
    setMessages(prev => [...prev, { from: 'user', text: userText }, { from: 'bot', text: botText }])
    setInput('')
  }

  return (
    <div className="card p-6">
      <h2 className="text-2xl font-semibold text-primary">AI Chat Assistant</h2>
      <p className="mt-2 text-gray-600">Get answers to valuation questions quickly with AutoSmart AI.</p>
      <div className="mt-6 space-y-4 max-h-[520px] overflow-y-auto">
        {messages.map((message, idx) => (
          <div key={idx} className={`p-4 rounded-2xl ${message.from === 'bot' ? 'bg-slate-100 self-start' : 'bg-primary text-white self-end'}`}>
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Ask AutoSmart AI..."
          className="flex-1 border rounded-full px-4 py-3"
        />
        <button onClick={handleSend} className="px-5 rounded-full bg-primary text-white">Send</button>
      </div>
    </div>
  )
}
