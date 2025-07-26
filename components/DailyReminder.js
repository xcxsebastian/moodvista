'use client'
import { useEffect, useState } from 'react'

// Helper: Check if notifications are supported and granted
function canNotify() {
  return (
    typeof window !== 'undefined' &&
    'Notification' in window &&
    Notification.permission !== 'denied'
  )
}

export default function DailyReminder() {
  const [enabled, setEnabled] = useState(() =>
    typeof window !== 'undefined' ? localStorage.getItem('moodvista-reminder') === 'true' : false
  )

  useEffect(() => {
    if (enabled && canNotify() && Notification.permission !== 'granted') {
      Notification.requestPermission()
    }
    if (enabled && canNotify() && Notification.permission === 'granted') {
      // Only one notification per day: check last date
      const last = localStorage.getItem('moodvista-reminder-last')
      const today = new Date().toDateString()
      if (last !== today) {
        setTimeout(() => {
          new Notification("MoodVista Reminder", {
            body: "How are you feeling today? Log your mood now 💙",
            icon: "/favicon.ico"
          })
          localStorage.setItem('moodvista-reminder-last', today)
        }, 5000) // 5 sec after load
      }
    }
  }, [enabled])

  // Toggle and persist setting
  function handleToggle() {
    const next = !enabled
    setEnabled(next)
    localStorage.setItem('moodvista-reminder', next)
    if (next && canNotify() && Notification.permission !== 'granted') {
      Notification.requestPermission()
    }
  }

  return (
    <div className="w-full max-w-md mx-auto my-8 p-4 bg-white rounded-xl shadow flex flex-col items-center">
      <h3 className="text-lg font-bold mb-2 text-gray-800 text-center">Daily Mood Reminder</h3>
      <button
        onClick={handleToggle}
        className={`px-4 py-2 rounded font-semibold shadow transition mb-2 ${
          enabled ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }`}
      >
        {enabled ? 'Disable Reminder' : 'Enable Daily Reminder'}
      </button>
      <span className="text-xs text-gray-400 mt-1 text-center">
        {canNotify()
          ? 'Shows a browser notification once per day when enabled.'
          : 'Notifications not supported in this browser.'}
      </span>
    </div>
  )
}
