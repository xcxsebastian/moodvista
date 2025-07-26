'use client'
import { useState, useEffect } from 'react'

const SIZES = [
  { label: 'A', value: 'text-base' },
  { label: 'A+', value: 'text-lg' },
  { label: 'A++', value: 'text-xl' }
]

export default function FontSizeControls({ onChange }) {
  const [selected, setSelected] = useState('text-base') // default safely

  // On mount, get the saved font size
  useEffect(() => {
    const stored = localStorage.getItem('moodvista-fontsize')
    if (stored) setSelected(stored)
  }, [])

  useEffect(() => {
    document.body.classList.remove('text-base', 'text-lg', 'text-xl')
    document.body.classList.add(selected)
    localStorage.setItem('moodvista-fontsize', selected)
    if (onChange) onChange(selected)
  }, [selected, onChange])

  return (
    <div className="flex gap-2 items-center mb-2">
      <span className="text-xs text-gray-800 mr-2 font-semibold border-r border-gray-400 pr-2">Font Size:</span>
      {SIZES.map(sz => (
        <button
          key={sz.value}
          onClick={() => setSelected(sz.value)}
          className={`px-2 py-1 rounded border
            ${selected === sz.value
              ? 'bg-blue-200 border-blue-700 font-bold text-gray-800'
              : 'bg-gray-200 border-gray-400 text-gray-800'}
            transition`}
          aria-label={sz.label}
        >
          <span className={sz.value}>{sz.label}</span>
        </button>
      ))}
    </div>
  )
}
