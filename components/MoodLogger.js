'use client'
import { useState } from 'react'

// 5-point mood scale: emojis + color (gentle feedback)
const MOODS = [
  { id: 1, emoji: '😭', label: 'Awful', color: 'mood1' },
  { id: 2, emoji: '😕', label: 'Down', color: 'mood2' },
  { id: 3, emoji: '😐', label: 'Meh', color: 'mood3' },
  { id: 4, emoji: '🙂', label: 'Good', color: 'mood4' },
  { id: 5, emoji: '😄', label: 'Great', color: 'mood5' },
]

// Emotion tags encourage emotional literacy
const TAGS = ["Anxious", "Energetic", "Lonely", "Motivated", "Stressed", "Grateful"]

export default function MoodLogger() {
  const [mood, setMood] = useState(null)
  const [tags, setTags] = useState([])
  const [journal, setJournal] = useState("")
  const [charCount, setCharCount] = useState(0)
  const [message, setMessage] = useState("")

  // Tag selection logic (no duplicates)
  function toggleTag(tag) {
    setTags(tags.includes(tag)
      ? tags.filter(t => t !== tag)
      : [...tags, tag]
    )
  }

  // Save mood to localStorage (robust: replaces today’s entry)
  function saveMood() {
    if (!mood) return setMessage("Please select a mood!");
    const today = new Date().toISOString().split("T")[0]
    const entry = { date: today, mood, tags, journal }
    let logs = JSON.parse(localStorage.getItem("moodvista-logs") || "[]")
    logs = logs.filter(log => log.date !== today) // Only one log per day
    logs.push(entry)
    localStorage.setItem("moodvista-logs", JSON.stringify(logs))
    setMessage("Mood saved! 🌱")
    setTimeout(() => setMessage(""), 1800)
    setMood(null); setTags([]); setJournal(""); setCharCount(0)
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-xl flex flex-col gap-4 text-gray-800">
      <h2 className="text-xl font-semibold mb-1 text-gray-800">How are you feeling?</h2>
      <div className="flex justify-between mb-2">
        {MOODS.map(option => (
          <button
            key={option.id}
            onClick={() => setMood(option.id)}
            className={`flex flex-col items-center w-14 h-14 rounded-full border-2 transition
              ${mood === option.id ? "border-blue-600 scale-110 shadow-lg" : "border-gray-200"}
              bg-${option.color} text-2xl`}
            aria-label={option.label}
            type="button"
          >
            {option.emoji}
            <span className="text-xs text-gray-800">{option.label}</span>
          </button>
        ))}
      </div>
      {/* Emotion tags */}
      <div className="flex flex-wrap gap-2 mb-2">
        {TAGS.map(tag => (
          <button
            key={tag}
            type="button"
            className={`px-3 py-1 rounded-full border text-xs
              ${tags.includes(tag) ? "bg-blue-200 border-blue-500 font-bold text-gray-800" : "bg-gray-100 border-gray-200 text-gray-800"}
              transition`}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      {/* Journal input */}
      <div className="mb-2">
        <textarea
          className="w-full border rounded-md p-2 text-sm text-gray-800 bg-gray-50"
          placeholder="Add a note... (optional)"
          maxLength={240}
          rows={3}
          value={journal}
          onChange={e => { setJournal(e.target.value); setCharCount(e.target.value.length) }}
        />
        <div className="text-xs text-gray-500 text-right">{charCount}/240</div>
      </div>
      <button
        onClick={saveMood}
        className="bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 transition font-medium"
      >
        Save Mood
      </button>
      {message && <div className="text-center text-green-600 font-medium">{message}</div>}
      <div className="text-xs text-gray-500 mt-2">
        <strong>Why 5 options?</strong> Less choice = less overwhelm.<br />
        Psychological research shows a simple scale makes mood tracking a repeatable, low-stress habit!
      </div>
    </div>
  )
}
