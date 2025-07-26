'use client'
import { useEffect, useState } from 'react'
import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'
import { addDays, subDays, format } from 'date-fns'

const moodColors = {
  1: '#FCA5A5', // soft red
  2: '#FDBA74', // orange
  3: '#FDE68A', // yellow
  4: '#A7F3D0', // mint
  5: '#93C5FD', // blue
}

function getDateArray() {
  // Past 90 days including today
  let arr = []
  for (let i = 89; i >= 0; i--) {
    arr.push(format(subDays(new Date(), i), 'yyyy-MM-dd'))
  }
  return arr
}

export default function MoodCalendarHeatmap() {
  const [values, setValues] = useState([])

  useEffect(() => {
    const logs = JSON.parse(localStorage.getItem('moodvista-logs') || '[]')
    const map = {}
    logs.forEach(log => { map[log.date] = log.mood })
    const days = getDateArray()
    setValues(
      days.map(date => ({
        date,
        mood: map[date] || null,
        count: map[date] ? 1 : 0,
      }))
    )
  }, [])

  return (
    <div className="w-full max-w-xl mx-auto mb-8 p-4 bg-white rounded-xl shadow">
      <h3 className="text-lg font-bold mb-4 text-gray-800 text-center">Mood Calendar</h3>
      <CalendarHeatmap
        startDate={subDays(new Date(), 89)}
        endDate={new Date()}
        values={values}
        classForValue={v => {
          if (!v || !v.mood) return 'color-empty'
          return 'color-filled'
        }}
        tooltipDataAttrs={v => {
          if (!v || !v.mood) return null
          return {
            'data-tip': `Mood: ${v.mood} (${['😭','😕','😐','🙂','😄'][v.mood-1]}) on ${v.date}`
          }
        }}
        // Custom color via style
        style={{}}
        showWeekdayLabels={true}
        gutterSize={3}
        // Use style override to color by mood
        rectProps={v => ({
          style: v && v.mood ? { fill: moodColors[v.mood], stroke: '#333', strokeWidth: 0.4 } : {},
        })}
      />
      <div className="flex gap-2 mt-3 justify-center">
        <span className="text-xs text-gray-600">Lowest</span>
        {Object.values(moodColors).map((c, i) => (
          <span key={i} className="inline-block w-6 h-4 rounded" style={{ background: c }} />
        ))}
        <span className="text-xs text-gray-600">Highest</span>
      </div>
      <div className="text-xs text-gray-400 text-center mt-2">
        Click on any day to see your mood entry!
      </div>
    </div>
  )
}
