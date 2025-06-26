"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import StudentLayout from "@/components/student-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Clock, CheckCircle, AlertCircle, TrendingUp } from "lucide-react"

export default function StudentDashboard() {
  const [user, setUser] = useState<any>(null)
  const [evaluations, setEvaluations] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/")
      return
    }
    const parsedUser = JSON.parse(userData)
    if (parsedUser.role !== "student") {
      router.push("/")
      return
    }
    setUser(parsedUser)

    // Load mock evaluations
    const mockEvaluations = [
      {
        id: "eval001",
        semester: "HK1",
        year: "2024-2025",
        studentTotal: 85,
        teacherTotal: 82,
        finalScore: 83.5,
        classification: "Tốt",
        submitted: true,
        graded: true,
        createdAt: "2024-10-15",
      },
      {
        id: "eval002",
        semester: "HK2",
        year: "2024-2025",
        studentTotal: 90,
        teacherTotal: null,
        finalScore: null,
        classification: null,
        submitted: true,
        graded: false,
        createdAt: "2024-12-20",
      },
    ]
    setEvaluations(mockEvaluations)
  }, [router])

  if (!user) return null

  const currentEvaluation = evaluations.find((e) => e.semester === "HK2" && e.year === "2024-2025")
  const completedEvaluations = evaluations.filter((e) => e.graded)

  const getClassification = (score: number) => {
    if (score >= 90) return { text: "Xuất sắc", color: "bg-green-100 text-green-800" }
    if (score >= 80) return { text: "Tốt", color: "bg-blue-100 text-blue-800" }
    if (score >= 65) return { text: "Khá", color: "bg-yellow-100 text-yellow-800" }
    if (score >= 50) return { text: "Trung bình", color: "bg-orange-100 text-orange-800" }
    return { text: "Yếu", color: "bg-red-100 text-red-800" }
  }

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-600 rounded-2xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Xin chào, {user.name}!</h1>
          <p className="text-blue-100">Chào mừng bạn đến với hệ thống đánh giá điểm rèn luyện</p>
          <div className="mt-4 flex items-center gap-4 text-sm">
            <span className="bg-white/20 px-3 py-1 rounded-full">MSSV: {user.id}</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">Năm học: 2024-2025</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Phiếu đã nộp</p>
                  <p className="text-2xl font-bold text-blue-600">{evaluations.filter((e) => e.submitted).length}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Đã chấm điểm</p>
                  <p className="text-2xl font-bold text-green-600">{completedEvaluations.length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Chờ chấm điểm</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {evaluations.filter((e) => e.submitted && !e.graded).length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Điểm TB</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {completedEvaluations.length > 0
                      ? (
                          completedEvaluations.reduce((sum, e) => sum + e.finalScore, 0) / completedEvaluations.length
                        ).toFixed(1)
                      : "--"}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Current Evaluation Status */}
        {currentEvaluation && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-blue-600" />
                Trạng thái học kỳ hiện tại
              </CardTitle>
              <CardDescription>Học kỳ 2 - Năm học 2024-2025</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    {currentEvaluation.graded ? (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    ) : currentEvaluation.submitted ? (
                      <Clock className="h-6 w-6 text-orange-600" />
                    ) : (
                      <FileText className="h-6 w-6 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      {currentEvaluation.graded
                        ? "Đã hoàn thành đánh giá"
                        : currentEvaluation.submitted
                          ? "Đang chờ giáo viên chấm điểm"
                          : "Chưa nộp phiếu đánh giá"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {currentEvaluation.graded
                        ? `Điểm cuối: ${currentEvaluation.finalScore} - ${currentEvaluation.classification}`
                        : currentEvaluation.submitted
                          ? `Điểm tự đánh giá: ${currentEvaluation.studentTotal}`
                          : "Vui lòng hoàn thành phiếu đánh giá"}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => router.push(currentEvaluation.graded ? "/student/results" : "/student/evaluation")}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {currentEvaluation.graded ? "Xem kết quả" : currentEvaluation.submitted ? "Xem phiếu" : "Làm phiếu"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Evaluations */}
        <Card>
          <CardHeader>
            <CardTitle>Lịch sử đánh giá</CardTitle>
            <CardDescription>Các kỳ đánh giá gần đây</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {evaluations.map((evaluation) => {
                const classification = evaluation.finalScore ? getClassification(evaluation.finalScore) : null
                return (
                  <div
                    key={evaluation.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">
                          {evaluation.semester} - {evaluation.year}
                        </h4>
                        <p className="text-sm text-gray-600">
                          Nộp ngày: {new Date(evaluation.createdAt).toLocaleDateString("vi-VN")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {evaluation.graded ? (
                        <>
                          <div className="text-right">
                            <p className="font-semibold">{evaluation.finalScore} điểm</p>
                            <Badge className={classification?.color}>{classification?.text}</Badge>
                          </div>
                          <Button variant="outline" size="sm" onClick={() => router.push("/student/results")}>
                            Xem chi tiết
                          </Button>
                        </>
                      ) : evaluation.submitted ? (
                        <Badge className="bg-orange-100 text-orange-800">Chờ chấm điểm</Badge>
                      ) : (
                        <Badge className="bg-gray-100 text-gray-800">Chưa nộp</Badge>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  )
}
