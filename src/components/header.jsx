"use client"

import { useState, useEffect } from "react"
import { Bell, Moon, Sun, Menu } from "lucide-react"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import Picture from "/src/assets/profilepic.jpg";

export default function Header({ toggleDarkMode, darkMode, toggleSidebar, onLogout }) {
  const [currentDate, setCurrentDate] = useState("")
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()

      const formattedDate = now.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })

      const formattedTime = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      })

      setCurrentDate(formattedDate)
      setCurrentTime(formattedTime)
    }

    updateDateTime()
    const interval = setInterval(updateDateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <header className="fixed top-0 right-0 left-0 z-30 bg-white dark:bg-gray-800 shadow-sm h-16 flex items-center justify-between px-4 transition-colors duration-300">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="relative group">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
          <span className="absolute bottom-[-25px] left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-md z-50">
            Toggle Sidebar
          </span>
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="hidden md:block text-sm text-gray-600 dark:text-gray-300">
          <span>{currentDate}</span> - <span>{currentTime}</span>
        </div>

        <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="relative group">
          {darkMode ? (
            <Sun className="h-5 w-5 text-yellow-400" />
          ) : (
            <Moon className="h-5 w-5 text-blue-900 dark:text-gray-300" />
          )}
          <span className="sr-only">Toggle Dark Mode</span>
          <span className="absolute bottom-[-25px] left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-md z-50">
            {darkMode ? "Light theme" : "Dark theme"}
          </span>
        </Button>

        <Button variant="ghost" size="icon" className="relative group">
          <Bell className="h-5 w-5 text-blue-900 dark:text-gray-300" />
          <span className="sr-only">Notifications</span>
          <span className="absolute bottom-[-25px] left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-md z-50">
            View notifications
          </span>
        </Button>

        <span className="hidden md:inline text-sm font-medium text-gray-700 dark:text-gray-300">Calipes, John Rey</span>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="cursor-pointer relative h-8 w-8 rounded-full overflow-hidden border border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
              <img
                src={Picture}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <div className="flex items-center gap-2 p-2 border-b border-gray-100 dark:border-gray-700">
              <div className="h-10 w-10 rounded-full overflow-hidden">
                <img
                  src={Picture}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium">John Rey Calipes</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Student</p>
              </div>
            </div>
            <DropdownMenuItem className="cursor-pointer">
              <span>My Account</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-red-500 dark:text-red-400 focus:text-red-500 dark:focus:text-red-400"
            onClick={onLogout}>
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}