"use client"

import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from "chart.js"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart, BarChartIcon as ChartSquare, Download } from "lucide-react"

// Register Chart.js components
Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend)

export default function Grades({ setActiveSection }) {
  return (
    <div className="py-6">
      <div className="max-w-6xl mx-auto">
        {/* Grade Summary Card */}
        <Card className="mb-8 bg-gradient-to-r from-blue-900 to-blue-700 text-white animate-fadeIn">
          <CardContent className="p-6">
            <div className="mb-4">
              <h2 className="text-2xl font-bold">Grade Summary</h2>
              <p>Academic Year 2024-2025</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 p-4 rounded-lg text-center">
                <h3 className="text-sm font-medium mb-2 opacity-90">GWA</h3>
                <p className="text-2xl font-bold">1.75</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg text-center">
                <h3 className="text-sm font-medium mb-2 opacity-90">Units</h3>
                <p className="text-2xl font-bold">21</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg text-center">
                <h3 className="text-sm font-medium mb-2 opacity-90">Standing</h3>
                <p className="text-2xl font-bold">Good</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Grade Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card
            className="bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            onClick={() => setActiveSection("currentGrades")}
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="text-blue-900 dark:text-blue-400 mb-4">
                <BarChart className="h-10 w-10" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Current Grades</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">View your current semester grades</p>
            </CardContent>
          </Card>

          <Card
            className="bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            onClick={() => setActiveSection("pastGrades")}
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="text-blue-900 dark:text-blue-400 mb-4">
                <ChartSquare className="h-10 w-10" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Grade History</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">View your previous semester grades</p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 cursor-pointer">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="text-blue-900 dark:text-blue-400 mb-4">
                <Download className="h-10 w-10" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Download Report</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Get your grade reports</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Performance */}
        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Recent Performance</h3>
            <div className="h-64">
              <canvas id="gradeChart"></canvas>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
