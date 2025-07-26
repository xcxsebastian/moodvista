"use client";
import { useEffect, useState } from "react";
import OnboardingModal from "../components/OnboardingModal";
import UserGreeting from "../components/UserGreeting";
import MotivationalQuote from "../components/MotivationalQuote";
import CopingTip from "../components/CopingTip";
import MoodLogger from "../components/MoodLogger";
import MoodHistory from "../components/MoodHistory";
import MoodCalendarHeatmap from "../components/CalendarHeatmap";
import WeeklyMoodChart from "../components/WeeklyMoodChart";
import FontSizeControls from "../components/FontSizeControls";
import TagBarChart from "../components/TagBarChart";

const bgClassMap = {
  "blue-50": "bg-blue-50",
  "green-50": "bg-green-50",
  "orange-50": "bg-orange-50",
  // add more if needed
};

export default function Home() {
  // Use state to safely access localStorage on the client
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [theme, setTheme] = useState("blue-50");

  useEffect(() => {
    // Only runs in browser
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("moodvista-username")) {
        setShowOnboarding(true);
      }
      const savedTheme = localStorage.getItem("moodvista-theme");
      if (savedTheme) setTheme(savedTheme);
    }
  }, []);

  const bgClass = bgClassMap[theme] || "bg-blue-50";

  return (
    <main className={`min-h-screen flex flex-col items-center justify-center transition-colors ${bgClass}`}>
      {showOnboarding && (
        <OnboardingModal onFinish={() => setShowOnboarding(false)} />
      )}
      {!showOnboarding && (
        <>
          <FontSizeControls />
          <UserGreeting />
          <MotivationalQuote />
          <CopingTip />
          <MoodLogger />
          <WeeklyMoodChart />
          <MoodCalendarHeatmap />
          <TagBarChart />
          <MoodHistory />
        </>
      )}
    </main>
  );
}

