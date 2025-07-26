'use client'
import { useState } from 'react'

const themes = [
  { name: "Calm Blue", value: "blue-50" },
  { name: "Gentle Mint", value: "green-50" },
  { name: "Soft Peach", value: "orange-50" },
]

export default function OnboardingModal({ onFinish }) {
  const [step, setStep] = useState(1)
  const [name, setName] = useState("")
  const [theme, setTheme] = useState(themes[0].value)
  const [reminder, setReminder] = useState("21:00")

  function saveAndNext() {
    if (step === 1 && name.trim()) {
      localStorage.setItem("moodvista-username", name.trim())
      setStep(2)
    } else if (step === 2) {
      localStorage.setItem("moodvista-theme", theme)
      setStep(3)
    } else if (step === 3) {
      localStorage.setItem("moodvista-reminder", reminder)
      onFinish && onFinish()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-8 text-gray-800 flex flex-col gap-4 animate-fadeIn">
        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold">Welcome to MoodVista!</h2>
            <p className="mb-2">What's your first name?</p>
            <input
              type="text"
              className="border rounded px-3 py-2 mb-4 w-full"
              value={name}
              onChange={e => setName(e.target.value)}
              maxLength={24}
              autoFocus
            />
            <button onClick={saveAndNext} className="bg-blue-600 text-white py-2 rounded font-medium">Next</button>
          </>
        )}
        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold">Choose a Theme</h2>
            <div className="flex flex-col gap-2">
              {themes.map(t => (
                <button
                  key={t.value}
                  className={`rounded px-4 py-2 border ${theme === t.value ? 'bg-blue-100 border-blue-500 font-semibold' : 'bg-gray-50 border-gray-300'}`}
                  onClick={() => setTheme(t.value)}
                >
                  {t.name}
                </button>
              ))}
            </div>
            <button onClick={saveAndNext} className="mt-4 bg-blue-600 text-white py-2 rounded font-medium">Next</button>
          </>
        )}
        {step === 3 && (
          <>
            <h2 className="text-2xl font-bold">Reminders</h2>
            <p>When would you like a daily reminder to log your mood?</p>
            <input
              type="time"
              className="border rounded px-3 py-2 mb-4 w-32"
              value={reminder}
              onChange={e => setReminder(e.target.value)}
            />
            <button onClick={saveAndNext} className="bg-green-600 text-white py-2 rounded font-medium">Finish</button>
          </>
        )}
      </div>
    </div>
  )
}
