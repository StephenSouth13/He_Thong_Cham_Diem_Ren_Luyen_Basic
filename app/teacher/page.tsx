"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import TeacherLayout from "@/components/teacher-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, FileText, Clock, CheckCircle, TrendingUp, BookOpen } from "lucide-react"

export default function TeacherDashboard() {
  const [user, setUser] = useState<any>(null)
  const [classes, setClasses] = useState<any[]>([])
  const [stats, setStats] = useState<any>({})
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/")
      return
    }
    const parsedUser = JSON.parse(userData)
    if (parsedUser.role !== "teacher") {
      router.push("/")
      return
    }
    setUser(parsedUser)

    // Mock classes data
    const mockClasses = [
      {
        id: "class001",
        name: "Lớp Quản trị Kinh doanh K47",
        code: "QTKD47",
        year: "2024-2025",
        semester: "HK2",
        studentCount: 35,
        submittedCount: 28,
        gradedCount: 15,
      },
      {
        id: "class002",
        name: "Lớp Kế toán K46",
        code: "KT46",
        year: "2024-2025",
        semester: "HK2",
        studentCount: 42,
        submittedCount: 38,
        gradedCount: 25,
      },
    ]
    setClasses(mockClasses)

    // Calculate stats
    const totalStudents = mockClasses.reduce((sum, cls) => sum + cls.studentCount, 0)
    const totalSubmitted = mockClasses.reduce((sum, cls) => sum + cls.submittedCount, 0)
    const totalGraded = mockClasses.reduce((sum, cls) => sum + cls.gradedCount, 0)
    const pendingGrade = totalSubmitted - totalGraded

    setStats({
      totalStudents,
      totalSubmitted,
      totalGraded,
      pendingGrade,
      submissionRate: ((totalSubmitted / totalStudents) * 100).toFixed(1),
      gradingRate: ((totalGraded / totalSubmitted) * 100).toFixed(1),
    })
  }, [router])

  if (!user) return null

  return (
    <TeacherLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-600 rounded-2xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Xin chào, {user.name}!</h1>
          <p className="text-blue-100">Chào mừng bạn đến với hệ thống đánh giá điểm rèn luyện</p>
          <div className="mt-4 flex items-center gap-4 text-sm">
            <span className="bg-white/20 px-3 py-1 rounded-full">Giáo viên</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">Năm học: 2024-2025</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">{classes.length} lớp phụ trách</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tổng sinh viên</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.totalStudents}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Đã nộp phiếu</p>
                  <p className="text-2xl font-bold text-green-600">{stats.totalSubmitted}</p>
                  <p className="text-xs text-gray-500">{stats.submissionRate}% tổng số</p>
                </div>
                <FileText className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Đã chấm điểm</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.totalGraded}</p>
                  <p className="text-xs text-gray-500">{stats.gradingRate}% đã nộp</p>
                </div>
                <CheckCircle className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Chờ chấm điểm</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.pendingGrade}</p>
                  <p className="text-xs text-gray-500">Cần xử lý</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Classes Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              Lớp học phụ trách
            </CardTitle>
            <CardDescription>Tổng quan tình hình nộp và chấm phiếu đánh giá</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {classes.map((classItem) => (
                <div key={classItem.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{classItem.name}</h3>
                        <Badge variant="outline">{classItem.code}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        {classItem.semester} - {classItem.year} • {classItem.studentCount} sinh viên
                      </p>

                      {/* Progress bars */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Tỷ lệ nộp phiếu</span>
                          <span className="font-medium">
                            {classItem.submittedCount}/{classItem.studentCount}(
                            {((classItem.submittedCount / classItem.studentCount) * 100).toFixed(0)}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(classItem.submittedCount / classItem.studentCount) * 100}%` }}
                          />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span>Tỷ lệ chấm điểm</span>
                          <span className="font-medium">
                            {classItem.gradedCount}/{classItem.submittedCount}(
                            {classItem.submittedCount > 0
                              ? ((classItem.gradedCount / classItem.submittedCount) * 100).toFixed(0)
                              : 0}
                            %)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${classItem.submittedCount > 0 ? (classItem.gradedCount / classItem.submittedCount) * 100 : 0}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 ml-4">
                      <Button
                        onClick={() => router.push(`/teacher/class/${classItem.id}`)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Quản lý lớp
                      </Button>
                      {classItem.submittedCount > classItem.gradedCount && (
                        <Button
                          variant="outline"
                          onClick={() => router.push(`/teacher/grade/${classItem.id}`)}
                          className="border-orange-500 text-orange-600 hover:bg-orange-50"
                        >
                          Chấm điểm ({classItem.submittedCount - classItem.gradedCount})
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Thống kê nhanh
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Tỷ lệ nộp phiếu trung bình</span>
                <span className="font-semibold text-green-600">{stats.submissionRate}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Tỷ lệ hoàn thành chấm điểm</span>
                <span className="font-semibold text-blue-600">{stats.gradingRate}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Phiếu chờ xử lý</span>
                <span className="font-semibold text-orange-600">{stats.pendingGrade} phiếu</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Thao tác nhanh</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={() => router.push("/teacher/class")}
                className="w-full justify-start bg-blue-600 hover:bg-blue-700"
              >
                <Users className="h-4 w-4 mr-2" />
                Quản lý tất cả lớp học
              </Button>
              <Button variant="outline" onClick={() => router.push("/teacher/grade")} className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Chấm điểm hàng loạt
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  /* Export all classes */
                }}
                className="w-full justify-start"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Xuất báo cáo tổng hợp
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </TeacherLayout>
  )
}
