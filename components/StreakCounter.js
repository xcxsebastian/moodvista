'use client'
import { useEffect, useState } from 'react'

function getToday() {
  return new Date().toISOString().split('T')[0]
}

// Helper: get how many consecutive days up to today have a mood entry
function calcStreak(logs) {
  if (!logs.length) return 0
  const dates = logs.map(l => l.date).sort((a, b) => b.localeCompare(a))
  let streak = 0
  let d = new Date(getToday())
  for (;;) {
    const dateStr = d.toISOString().split('T')[0]
    if (dates.includes(dateStr)) {
      streak++
      d.setDate(d.getDate() - 1)
    } else {
      break
    }
  }
  return streak
}

export default function StreakCounter() {
  const [streak, setStreak] = useState(0)

  useEffect(() => {
    const logs = JSON.parse(localStorage.getItem('moodvista-logs') || '[]')
    setStreak(calcStreak(logs))
  }, [])

  if (streak === 0) {
    return (
      <div className="mb-4 text-gray-600 text-center">
        Start logging daily to build a streak! 🔥
      </div>
    )
  }

  return (
    <div className="mb-4 text-center flex flex-col items-center">
      <span className="text-4xl font-bold text-orange-500 flex items-center gap-1">
        {streak} <span role="img" aria-label="flame">🔥</span>
      </span>
      <span className="text-xs text-gray-700">
        Day streak — keep it up!
      </span>
      {streak > 6 && (
        <div className="mt-1 text-green-600 font-bold text-sm animate-pulse">
          Amazing! That’s a whole week of check-ins! 🌟
        </div>
      )}
    </div>
  )
}
