'use client'
import { useEffect, useState } from 'react'

export default function CopingTip() {
  const [tip, setTip] = useState("")

  useEffect(() => {
    fetch('/coping-tips.json')
      .then(res => res.json())
      .then(tips => {
        // Pick a tip based on day of week for rotation
        const day = new Date().getDay()
        setTip(tips[day % tips.length])
      })
  }, [])

  return (
    <div className="my-4 p-3 bg-green-100 rounded text-green-900 text-center shadow">
      <span className="font-semibold">Coping Tip of the Day:</span> {tip}
    </div>
  )
}
