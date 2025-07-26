'use client'
import DailyReminder from '../../components/DailyReminder'
import PrivacyLock from '../../components/PrivacyLock'
import DataExportImport from '../../components/DataExportImport'
import TagBarChart from '../../components/TagBarChart'
import MoodCalendarHeatmap from '../../components/CalendarHeatmap'
import WeeklyMoodChart from '../../components/WeeklyMoodChart'
import FontSizeControls from '../../components/FontSizeControls'
import StreakCounter from '../../components/StreakCounter'

import { useEffect, useState } from 'react'
import OnboardingModal from '../../components/OnboardingModal'
import UserGreeting from '../../components/UserGreeting'
import MotivationalQuote from '../../components/MotivationalQuote'
import CopingTip from '../../components/CopingTip'
import MoodLogger from '../../components/MoodLogger'
import MoodHistory from '../../components/MoodHistory'

const bgClassMap = {
  'blue-50': 'bg-blue-50',
  'green-50': 'bg-green-50',
  'orange-50': 'bg-orange-50',
  // add more if needed
}

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [theme, setTheme] = useState('blue-50') // default

  useEffect(() => {
    if (!localStorage.getItem('moodvista-username')) {
      setShowOnboarding(true)
    }
    const savedTheme = localStorage.getItem('moodvista-theme')
    if (savedTheme) setTheme(savedTheme)
  }, [])

  const bgClass = bgClassMap[theme] || 'bg-blue-50'

  return (
    <PrivacyLock>
  <main className={`min-h-screen flex flex-col items-center justify-center transition-colors ${bgClass}`}>
    {showOnboarding && <OnboardingModal onFinish={() => setShowOnboarding(false)} />}
    {!showOnboarding && (
      <>
<FontSizeControls />
<UserGreeting />
<StreakCounter />
<MoodCalendarHeatmap />
<DailyReminder />
<TagBarChart />      {/* <--- Add here */}
<DataExportImport />
<MotivationalQuote />
<CopingTip />
<WeeklyMoodChart />
<MoodLogger />
<MoodHistory />
      </>
    )}
  </main>
  </PrivacyLock>
)
}
