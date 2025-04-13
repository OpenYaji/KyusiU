"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data
const currentGradesData = [
  {
    code: "SOCSCI 1",
    description: "Understanding the Self",
    units: 3,
    midterm: 2.25,
    finals: 2.5,
    finalGrade: 2.38,
    type: "general",
    instructor: "Prof. Randy",
  },
  {
    code: "SOCSCI 2",
    description: "Readings in Philippine History",
    units: 3,
    midterm: 1.75,
    finals: 2.0,
    finalGrade: 1.88,
    type: "general",
    instructor: "Prof. Palmiano",
  },
  {
    code: "HCI101",
    description: "Introduction to Human Computer Interaction",
    units: 3,
    midterm: 1.5,
    finals: 1.75,
    finalGrade: 1.63,
    type: "major",
    instructor: "Prof. Tanjente",
  },
  {
    code: "SE101",
    description: "Software Engineering",
    units: 3,
    midterm: 2.5,
    finals: 2.25,
    finalGrade: 2.38,
    type: "major",
    instructor: "Prof. Distor",
  },
  {
    code: "IPT101",
    description: "Integrative Programming and Technologies 1",
    units: 3,
    midterm: 1.25,
    finals: 1.5,
    finalGrade: 1.38,
    type: "major",
    instructor: "Prof. Soriano",
  },
  {
    code: "IM101",
    description: "Advanced Database Systems",
    units: 3,
    midterm: 2.0,
    finals: 2.25,
    finalGrade: 2.13,
    type: "major",
    instructor: "Prof. Santos",
  },
  {
    code: "PE 4",
    description: "Team Sports",
    units: 2,
    midterm: 1.0,
    finals: 1.0,
    finalGrade: 1.0,
    type: "minor",
    instructor: "Prof. Denver",
  },
]

export default function CurrentGrades() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")

  // Calculate remarks based on final grade
  const getRemarks = (grade) => {
    if (grade <= 3.0) return "Passed"
    return "Failed"
  }

  // Calculate grade color class
  const getGradeClass = (grade) => {
    if (grade <= 1.25) return "text-green-600 dark:text-green-400"
    if (grade <= 1.75) return "text-blue-600 dark:text-blue-400"
    if (grade <= 2.25) return "text-yellow-600 dark:text-yellow-400"
    if (grade <= 2.75) return "text-orange-600 dark:text-orange-400"
    return "text-red-600 dark:text-red-400"
  }

  // Filter and search grades
  const filteredGrades = currentGradesData.filter((grade) => {
    const matchesSearch =
      grade.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grade.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grade.instructor.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filter === "all" || grade.type === filter

    return matchesSearch && matchesFilter
  })

  return (
    <div className="py-6">
      <Card className="mb-6 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold">Current Academic Performance</h2>
          <p className="text-xl mt-2">2nd Semester, AY 2024-2025</p>
        </CardContent>
      </Card>

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Search subjects..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter subjects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              <SelectItem value="major">Major Subjects</SelectItem>
              <SelectItem value="general">General Subjects</SelectItem>
              <SelectItem value="minor">Minor Subjects</SelectItem>
            </SelectContent>
          </Select>
          <Button className="flex items-center gap-2">
            <Filter size={16} />
            <span>Filter</span>
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0 overflow-auto">
          <div className="min-w-full">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Subject Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Units
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Midterm
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Finals
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Final Grade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Remarks
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Instructor
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredGrades.map((grade, index) => {
                  const remarks = getRemarks(grade.finalGrade)
                  return (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {grade.code}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {grade.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {grade.units}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${getGradeClass(grade.midterm)}`}>
                        {grade.midterm.toFixed(2)}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${getGradeClass(grade.finals)}`}>
                        {grade.finals.toFixed(2)}
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${getGradeClass(grade.finalGrade)}`}
                      >
                        {grade.finalGrade.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            remarks === "Passed"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          }`}
                        >
                          {remarks}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {grade.instructor}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
