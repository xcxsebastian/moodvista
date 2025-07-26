'use client'
import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Helper to get the last 7 days, including today
function getLast7Days() {
  const days = []
  for (let i = 6; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    days.push(date.toISOString().split('T')[0])
  }
  return days
}

export default function WeeklyMoodChart() {
  const [data, setData] = useState([])

  useEffect(() => {
    const logs = JSON.parse(localStorage.getItem('moodvista-logs') || '[]')
    const last7 = getLast7Days()
    // Map dates to moods (null if no entry that day)
    const chartData = last7.map(date => {
      const entry = logs.find(l => l.date === date)
      return {
        date: date.slice(5), // MM-DD
        mood: entry ? entry.mood : null
      }
    })
    setData(chartData)
  }, [])

  return (
    <div className="w-full max-w-md mx-auto my-8 p-4 bg-white rounded-xl shadow">
      <h3 className="text-lg font-bold mb-2 text-gray-800 text-center">Your Mood Trend (Last 7 Days)</h3>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[1, 5]} ticks={[1,2,3,4,5]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="mood"
            stroke="#2563eb"
            strokeWidth={3}
            dot={{ r: 7, fill: '#2563eb' }}
            activeDot={{ r: 10 }}
            connectNulls
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="text-xs text-gray-500 text-center mt-2">
        Track your ups and downs. Reflect, don’t judge! <br />
        (Empty points = no mood entry for that day)
      </div>
    </div>
  )
}
