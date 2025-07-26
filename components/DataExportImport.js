'use client'
import { useRef } from 'react'

export default function DataExportImport() {
  const fileInput = useRef(null)

  // Export logs
  function handleExport() {
    const logs = localStorage.getItem('moodvista-logs') || '[]'
    const blob = new Blob([logs], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `moodvista-logs-${new Date().toISOString().slice(0, 10)}.json`
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
  }

  // Import logs
  function handleImport(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const newLogs = JSON.parse(ev.target.result)
        if (Array.isArray(newLogs)) {
          localStorage.setItem('moodvista-logs', JSON.stringify(newLogs))
          alert('Mood logs imported! Reloading...')
          window.location.reload()
        } else {
          alert('Invalid file format.')
        }
      } catch {
        alert('Could not read this file!')
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="w-full max-w-md mx-auto my-8 p-4 bg-white rounded-xl shadow flex flex-col items-center">
      <h3 className="text-lg font-bold mb-2 text-gray-800 text-center">Export/Import Mood Data</h3>
      <button
        onClick={handleExport}
        className="mb-2 px-4 py-2 bg-blue-600 text-white rounded font-semibold shadow hover:bg-blue-700 transition"
      >
        Export Data
      </button>
      <label className="mb-1 text-sm text-gray-600">Import from JSON:</label>
      <input
        ref={fileInput}
        type="file"
        accept=".json,application/json"
        className="mb-2 block"
        onChange={handleImport}
      />
      <span className="text-xs text-gray-400 mt-1 text-center">
        Export backs up all your entries.<br />
        Import will **replace** your current mood data.
      </span>
    </div>
  )
}
