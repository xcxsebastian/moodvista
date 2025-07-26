'use client'
import { useEffect, useState } from 'react'

export default function MotivationalQuote() {
  const [quote, setQuote] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/quote')
      .then(res => res.json())
      .then(data => {
        setQuote(data.q + " —" + data.a)
        setLoading(false)
      })
  }, [])

  if (loading) return <p className="italic text-gray-400">Loading quote...</p>

  return (
    <div className="mb-4 p-4 bg-blue-100 rounded shadow text-blue-900 italic text-center">
      {quote}
    </div>
  )
}
