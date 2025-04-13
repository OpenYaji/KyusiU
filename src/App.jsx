"use client"

import { useState, useEffect } from "react"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import Dashboard from "@/components/dashboard"
import Grades from "@/components/grades"
import CurrentGrades from "@/components/current-grades"
import PastGrades from "@/components/past-grades"
import Curriculum from "@/components/curriculum"
import Clearance from "@/components/clearance"
import ClassSchedule from "@/components/class-schedule"
import Settings from "@/components/settings"
import Support from "@/components/support"

export default function App() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkMobile()

    // Add resize listener
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const toggleMobileSidebar = () => {
    setSidebarVisible(!sidebarVisible)
  }

  const toggleSidebar = () => {
    if (isMobile) {
      toggleMobileSidebar()
    } else {
      setSidebarCollapsed(!sidebarCollapsed)
    }
  }

  const handleSectionChange = (section) => {
    setActiveSection(section)
    // Auto-collapse sidebar after navigation on desktop
    if (isMobile) {
      setSidebarVisible(false)
    } else {
      setSidebarCollapsed(true)
    }
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div
      className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}
    >
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} toggleSidebar={toggleSidebar} />
      <Sidebar
        activeSection={activeSection}
        setActiveSection={handleSectionChange}
        collapsed={sidebarCollapsed}
        visible={sidebarVisible}
        toggleSidebar={toggleSidebar}
      />
      <main
        className={`transition-all duration-300 ${isMobile ? "" : sidebarCollapsed ? "ml-20" : "ml-64"} pt-20 px-4 md:px-8 pb-8`}
      >
        {activeSection === "dashboard" && <Dashboard />}
        {activeSection === "grades" && <Grades setActiveSection={handleSectionChange} />}
        {activeSection === "currentGrades" && <CurrentGrades />}
        {activeSection === "pastGrades" && <PastGrades />}
        {activeSection === "curriculum" && <Curriculum />}
        {activeSection === "clearance" && <Clearance />}
        {activeSection === "schedule" && <ClassSchedule />}
        {activeSection === "settings" && <Settings />}
        {activeSection === "support" && <Support />}
      </main>
    </div>
  )
}
