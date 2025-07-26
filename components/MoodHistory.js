'use client'
import { useEffect, useState } from 'react'
import { format, parseISO } from 'date-fns'

const moodLabels = ['Awful', 'Bad', 'Meh', 'Good', 'Great']
const moodEmojis = ['😭', '😕', '😐', '🙂', '😄']

function highlight(text, query) {
  if (!query) return text
  const regex = new RegExp(`(${query})`, 'gi')
  return text.split(regex).map((part, i) =>
    regex.test(part)
      ? <span key={i} className="bg-yellow-200 rounded px-1">{part}</span>
      : part
  )
}

export default function MoodHistory() {
  const [logs, setLogs] = useState([])
  const [moodFilter, setMoodFilter] = useState('')
  const [tagFilter, setTagFilter] = useState('')
  const [textSearch, setTextSearch] = useState('')
  const [dateStart, setDateStart] = useState('')
  const [dateEnd, setDateEnd] = useState('')

  useEffect(() => {
    const allLogs = JSON.parse(localStorage.getItem('moodvista-logs') || '[]')
    setLogs(allLogs.reverse()) // newest first
  }, [])

  const filtered = logs.filter(log => {
    let pass = true
    if (moodFilter && log.mood !== parseInt(moodFilter)) pass = false
    if (tagFilter && (!log.tags || !log.tags.includes(tagFilter))) pass = false
    if (textSearch && (!log.journal || !log.journal.toLowerCase().includes(textSearch.toLowerCase()))) pass = false
    if (dateStart || dateEnd) {
      const date = parseISO(log.date)
      if (
        (dateStart && date < parseISO(dateStart)) ||
        (dateEnd && date > parseISO(dateEnd))
      ) pass = false
    }
    return pass
  })

  const tagOptions = Array.from(new Set(logs.flatMap(log => log.tags || [])))

  return (
    <div className="w-full max-w-2xl mx-auto my-10 p-4 bg-white rounded-xl shadow">
      <h3 className="text-lg font-bold mb-2 text-gray-800">Journal Archive & Search</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        <select
          className="border rounded px-2 py-1 bg-white text-gray-800"
          value={moodFilter}
          onChange={e => setMoodFilter(e.target.value)}
        >
          <option value="">All moods</option>
          {moodLabels.map((label, i) => (
            <option value={i + 1} key={label}>{moodEmojis[i]} {label}</option>
          ))}
        </select>
        <select
          className="border rounded px-2 py-1 bg-white text-gray-800"
          value={tagFilter}
          onChange={e => setTagFilter(e.target.value)}
        >
          <option value="">All tags</option>
          {tagOptions.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
        <input
          className="border rounded px-2 py-1 flex-1 bg-white text-gray-800"
          type="text"
          placeholder="Search journal..."
          value={textSearch}
          onChange={e => setTextSearch(e.target.value)}
        />
        <input
          type="date"
          value={dateStart}
          onChange={e => setDateStart(e.target.value)}
          className="border rounded px-2 py-1 bg-white text-gray-800"
        />
        <input
          type="date"
          value={dateEnd}
          onChange={e => setDateEnd(e.target.value)}
          className="border rounded px-2 py-1 bg-white text-gray-800"
        />
      </div>
      <div>
        {filtered.length === 0 ? (
          <div className="text-gray-400 text-center py-10">No entries match your filters/search.</div>
        ) : (
          <ul>
            {filtered.map((log, idx) => (
              <li key={idx} className="mb-3 p-3 bg-gray-50 rounded-lg shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{moodEmojis[log.mood - 1]}</span>
                  <span className="font-semibold">{moodLabels[log.mood - 1]}</span>
                  <span className="text-xs text-gray-500 ml-2">{format(parseISO(log.date), 'PP')}</span>
                  {log.tags && log.tags.length > 0 && (
                    <span className="ml-4 text-xs text-blue-500">
                      {log.tags.map(tag => (
                        <span key={tag} className="mr-2 px-2 py-0.5 bg-blue-100 text-blue-800 rounded">{tag}</span>
                      ))}
                    </span>
                  )}
                </div>
                {log.journal && (
                  <div className="text-gray-800 text-base">
                    {highlight(log.journal, textSearch)}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
