'use client'
import { useState } from 'react'

// Helper to check PIN from localStorage
function getStoredPIN() {
  return localStorage.getItem('moodvista-pin') || ''
}
function setStoredPIN(pin) {
  localStorage.setItem('moodvista-pin', pin)
}

export default function PrivacyLock({ children }) {
  const [locked, setLocked] = useState(() => !!getStoredPIN())
  const [step, setStep] = useState(getStoredPIN() ? 'enter' : 'set')
  const [pin, setPin] = useState('')
  const [input, setInput] = useState('')
  const [error, setError] = useState('')

  // Set PIN for the first time
  function handleSetPin(e) {
    e.preventDefault()
    if (pin.length < 4 || !/^\d+$/.test(pin)) {
      setError('PIN must be at least 4 digits.')
      return
    }
    setStoredPIN(pin)
    setStep('enter')
    setLocked(true)
    setPin('')
    setError('')
  }

  // Unlock with PIN
  function handleUnlock(e) {
    e.preventDefault()
    if (input === getStoredPIN()) {
      setLocked(false)
      setInput('')
      setError('')
    } else {
      setError('Incorrect PIN. Try again.')
      setInput('')
    }
  }

  // Remove PIN (optional: allow unlock to clear PIN)
  function handleRemovePin() {
    localStorage.removeItem('moodvista-pin')
    setLocked(false)
    setStep('set')
    setError('')
  }

  // Don't lock if no PIN is set
  if (!getStoredPIN()) return (
    <div className="w-full max-w-md mx-auto my-8 p-4 bg-white rounded-xl shadow flex flex-col items-center">
      <h3 className="text-lg font-bold mb-2 text-gray-800">Set Privacy PIN</h3>
      <form onSubmit={handleSetPin} className="flex flex-col gap-2 items-center">
        <input
          type="password"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={8}
          className="border rounded px-3 py-2 text-lg text-gray-800 bg-white"
          placeholder="Choose a 4+ digit PIN"
          value={pin}
          onChange={e => setPin(e.target.value)}
          autoFocus
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded font-semibold shadow hover:bg-blue-700 transition"
        >
          Set PIN
        </button>
        {error && <div className="text-red-500 text-sm">{error}</div>}
      </form>
    </div>
  )

  // If locked, show unlock screen
  if (locked) return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-blue-50 fixed top-0 left-0 z-50">
      <div className="bg-white p-8 rounded-xl shadow-xl flex flex-col items-center max-w-xs">
        <h3 className="text-lg font-bold mb-4 text-gray-800">Privacy Lock</h3>
        <form onSubmit={handleUnlock} className="flex flex-col gap-2 items-center">
          <input
            type="password"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={8}
            className="border rounded px-3 py-2 text-lg text-gray-800 bg-white"
            placeholder="Enter your PIN"
            value={input}
            onChange={e => setInput(e.target.value)}
            autoFocus
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded font-semibold shadow hover:bg-blue-700 transition"
          >
            Unlock
          </button>
          <button
            type="button"
            onClick={handleRemovePin}
            className="text-xs text-red-500 mt-2 underline"
          >
            Remove PIN
          </button>
          {error && <div className="text-red-500 text-sm">{error}</div>}
        </form>
      </div>
    </div>
  )

  // If unlocked, show the whole app
  return children
}
