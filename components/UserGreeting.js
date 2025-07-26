'use client'
import { useEffect, useState } from 'react'

export default function UserGreeting() {
  const [name, setName] = useState("")
  const [input, setInput] = useState("")

  useEffect(() => {
    const saved = localStorage.getItem("moodvista-username")
    if (saved) setName(saved)
  }, [])

  function saveName(e) {
    e.preventDefault()
    if (!input.trim()) return
    localStorage.setItem("moodvista-username", input.trim())
    setName(input.trim())
  }

  if (!name) {
    return (
      <form onSubmit={saveName} className="mb-6 flex flex-col items-center">
        <label className="text-lg font-medium mb-2 text-gray-700">
          Welcome! What’s your first name?
        </label>
        <input
          className="border rounded px-3 py-2 mb-2 text-gray-800"
          value={input}
          onChange={e => setInput(e.target.value)}
          maxLength={24}
          autoFocus
          required
        />
        <button className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition">
          Save Name
        </button>
      </form>
    )
  }

  // Personalized daily greeting
  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening"

  return (
    <div className="mb-6 text-center">
      <span className="text-2xl font-semibold text-blue-800">{greeting}, {name}! 🌞</span>
    </div>
  )
}
