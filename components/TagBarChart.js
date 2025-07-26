'use client'
import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LabelList } from 'recharts'

export default function TagBarChart() {
  const [data, setData] = useState([])

  useEffect(() => {
    // Load tag counts from mood logs
    const logs = JSON.parse(localStorage.getItem('moodvista-logs') || '[]')
    const tagCounts = {}
    logs.forEach(log => {
      if (log && Array.isArray(log.tags)) {
        log.tags.forEach(tag => {
          if (typeof tag === 'string' && tag.length > 0) {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1
          }
        })
      }
    })
    const chartData = Object.entries(tagCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
    setData(chartData)
  }, [])

  return (
    <div className="w-full max-w-md mx-auto my-8 p-4 bg-white rounded-xl shadow">
      <h3 className="text-lg font-bold mb-2 text-gray-800 text-center">Most Used Emotion Tags</h3>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data} layout="vertical" margin={{ top: 10, right: 20, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" allowDecimals={false} />
            <YAxis dataKey="name" type="category" width={90} />
            <Tooltip />
            <Bar dataKey="count" fill="#2563eb" radius={[10,10,10,10]}>
              <LabelList dataKey="count" position="right" fill="#2563eb" fontWeight={700} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="text-gray-400 text-center mt-8">No tags yet — start tagging your moods to see your top emotions here!</div>
      )}
      <div className="text-xs text-gray-400 text-center mt-2">
        The more you use a tag, the higher it appears!
      </div>
    </div>
  )
}
