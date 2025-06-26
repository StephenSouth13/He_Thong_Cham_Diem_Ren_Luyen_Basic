"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import StudentLayout from "@/components/student-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, FileText, TrendingUp, Award } from "lucide-react"

const evaluationCriteria = {
  I: {
    title: "Ý thức học tập",
    maxScore: 25,
    items: [
      { id: "I.1", text: "Ý thức, thái độ trong học tập", maxScore: 10 },
      { id: "I.2", text: "Kết quả học tập", maxScore: 15 },
    ],
  },
  II: {
    title: "Ý thức chấp hành pháp luật và nội quy nhà trường",
    maxScore: 25,
    items: [
      { id: "II.1", text: "Ý thức chấp hành pháp luật của nhà nước", maxScore: 10 },
      { id: "II.2", text: "Ý thức chấp hành nội quy, quy chế của nhà trường", maxScore: 15 },
    ],
  },
  III: {
    title: "Ý thức tham gia các hoạt động chính trị, xã hội, văn hóa, văn nghệ, thể thao",
    maxScore: 20,
    items: [
      { id: "III.1", text: "Tham gia các hoạt động chính trị, xã hội", maxScore: 10 },
      { id: "III.2", text: "Tham gia các hoạt động văn hóa, văn nghệ, thể thao", maxScore: 10 },
    ],
  },
  IV: {
    title: "Phẩm chất công dân và quan hệ với cộng đồng",
    maxScore: 25,
    items: [
      { id: "IV.1", text: "Ý thức và kết quả tham gia công tác phụ trách lớp, các đoàn thể", maxScore: 10 },
      { id: "IV.2", text: "Ý thức tham gia các hoạt động tập thể", maxScore: 10 },
      { id: "IV.3", text: "Quan hệ với người thân trong gia đình", maxScore: 5 },
    ],
  },
  V: {
    title:
      "Ý thức và kết quả tham gia công tác phụ trách lớp, các đoàn thể, tổ chức trong nhà trường hoặc có thành tích đặc biệt trong học tập, rèn luyện",
    maxScore: 5,
    items: [{ id: "V.1", text: "Khen thưởng, danh hiệu cao", maxScore: 5 }],
  },
}

export default function StudentResults() {
  const [user, setUser] = useState<any>(null)
  const [results, setResults] = useState<any[]>([])
  const [selectedResult, setSelectedResult] = useState<any>(null)
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

    // Mock results data
    const mockResults = [
      {
        id: "result001",
        semester: "HK1",
        year: "2024-2025",
        studentTotal: 85,
        teacherTotal: 82,
        finalScore: 83.5,
        classification: "Tốt",
        teacherComment: "Sinh viên có ý thức học tập tốt, tích cực tham gia các hoạt động của lớp.",
        gradedAt: "2024-11-15",
        items: {
          "I.1": { studentScore: 8, teacherScore: 8, reason: "Tham gia đầy đủ các buổi học" },
          "I.2": { studentScore: 13, teacherScore: 12, reason: "Điểm trung bình học kỳ 3.2" },
          "II.1": { studentScore: 10, teacherScore: 10, reason: "Không vi phạm pháp luật" },
          "II.2": { studentScore: 14, teacherScore: 13, reason: "Chấp hành tốt nội quy trường" },
          "III.1": { studentScore: 8, teacherScore: 7, reason: "Tham gia hoạt động đoàn" },
          "III.2": { studentScore: 9, teacherScore: 8, reason: "Tham gia văn nghệ lớp" },
          "IV.1": { studentScore: 9, teacherScore: 8, reason: "Làm lớp trưởng" },
          "IV.2": { studentScore: 9, teacherScore: 9, reason: "Tích cực hoạt động tập thể" },
          "IV.3": { studentScore: 5, teacherScore: 5, reason: "Quan hệ gia đình tốt" },
          "V.1": { studentScore: 0, teacherScore: 2, reason: "Được khen thưởng học tập" },
        },
      },
      {
        id: "result002",
        semester: "HK2",
        year: "2024-2025",
        studentTotal: 90,
        teacherTotal: 88,
        finalScore: 89,
        classification: "Tốt",
        teacherComment: "Sinh viên có tiến bộ rõ rệt, duy trì được thành tích tốt.",
        gradedAt: "2024-12-20",
        items: {
          "I.1": { studentScore: 9, teacherScore: 9, reason: "Tham gia tích cực các buổi học" },
          "I.2": { studentScore: 14, teacherScore: 13, reason: "Điểm trung bình học kỳ 3.4" },
          "II.1": { studentScore: 10, teacherScore: 10, reason: "Không vi phạm pháp luật" },
          "II.2": { studentScore: 15, teacherScore: 14, reason: "Chấp hành tốt nội quy trường" },
          "III.1": { studentScore: 9, teacherScore: 8, reason: "Tham gia tích cực hoạt động đoàn" },
          "III.2": { studentScore: 10, teacherScore: 9, reason: "Tham gia nhiều hoạt động văn nghệ" },
          "IV.1": { studentScore: 10, teacherScore: 9, reason: "Làm lớp trưởng hiệu quả" },
          "IV.2": { studentScore: 10, teacherScore: 10, reason: "Rất tích cực hoạt động tập thể" },
          "IV.3": { studentScore: 5, teacherScore: 5, reason: "Quan hệ gia đình tốt" },
          "V.1": { studentScore: 3, teacherScore: 3, reason: "Được khen thưởng học tập và rèn luyện" },
        },
      },
    ]
    setResults(mockResults)
    setSelectedResult(mockResults[mockResults.length - 1]) // Show latest result
  }, [router])

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case "Xuất sắc":
        return "bg-green-100 text-green-800"
      case "Tốt":
        return "bg-blue-100 text-blue-800"
      case "Khá":
        return "bg-yellow-100 text-yellow-800"
      case "Trung bình":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-red-100 text-red-800"
    }
  }

  const exportToPDF = () => {
    // Mock PDF export
    const element = document.createElement("a")
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent("Mock PDF content"))
    element.setAttribute("download", `phieu-ren-luyen-${selectedResult?.semester}-${selectedResult?.year}.pdf`)
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const exportToCSV = () => {
    if (!selectedResult) return

    const csvContent = [
      ["Tiêu chí", "Điểm tự đánh giá", "Điểm giáo viên", "Lý do"],
      ...Object.entries(evaluationCriteria).flatMap(([sectionKey, section]) =>
        section.items.map((item) => [
          `${item.id}. ${item.text}`,
          selectedResult.items[item.id]?.studentScore || 0,
          selectedResult.items[item.id]?.teacherScore || 0,
          selectedResult.items[item.id]?.reason || "",
        ]),
      ),
      ["", "", "", ""],
      ["Tổng điểm sinh viên", selectedResult.studentTotal, "", ""],
      ["Tổng điểm giáo viên", selectedResult.teacherTotal, "", ""],
      ["Điểm cuối cùng", selectedResult.finalScore, "", ""],
      ["Phân loại", selectedResult.classification, "", ""],
    ]
      .map((row) => row.join(","))
      .join("\n")

    const element = document.createElement("a")
    element.setAttribute("href", "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent))
    element.setAttribute("download", `ket-qua-ren-luyen-${selectedResult.semester}-${selectedResult.year}.csv`)
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  if (!user || !selectedResult) return null

  return (
    <StudentLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Kết quả đánh giá</h1>
            <p className="text-gray-600 mt-1">Xem chi tiết điểm rèn luyện đã được chấm</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={exportToPDF} className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Tải PDF
            </Button>
            <Button variant="outline" onClick={exportToCSV} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Tải CSV
            </Button>
          </div>
        </div>

        {/* Semester Selection */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {results.map((result) => (
            <Button
              key={result.id}
              variant={selectedResult.id === result.id ? "default" : "outline"}
              onClick={() => setSelectedResult(result)}
              className="whitespace-nowrap"
            >
              {result.semester} - {result.year}
            </Button>
          ))}
        </div>

        {/* Summary Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-blue-600" />
                Kết quả tổng quan
              </CardTitle>
              <CardDescription>
                {selectedResult.semester} - Năm học {selectedResult.year}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Điểm tự đánh giá</p>
                  <p className="text-3xl font-bold text-blue-600">{selectedResult.studentTotal}</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">Điểm giáo viên</p>
                  <p className="text-3xl font-bold text-green-600">{selectedResult.teacherTotal}</p>
                </div>
              </div>
              <div className="mt-6 text-center p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
                <p className="text-sm text-gray-600">Điểm cuối cùng</p>
                <p className="text-4xl font-bold text-gray-900">{selectedResult.finalScore}</p>
                <Badge className={`mt-2 ${getClassificationColor(selectedResult.classification)}`}>
                  {selectedResult.classification}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Thống kê
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Số tiêu chí đạt tối đa</span>
                <span className="font-semibold">
                  {
                    Object.values(selectedResult.items).filter(
                      (item: any) =>
                        item.teacherScore ===
                        Object.values(evaluationCriteria)
                          .flatMap((section) => section.items)
                          .find(
                            (criteria) =>
                              criteria.id ===
                              Object.keys(selectedResult.items).find((key) => selectedResult.items[key] === item),
                          )?.maxScore,
                    ).length
                  }
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Điểm trung bình/tiêu chí</span>
                <span className="font-semibold">
                  {(selectedResult.teacherTotal / Object.keys(selectedResult.items).length).toFixed(1)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Ngày chấm điểm</span>
                <span className="font-semibold">{new Date(selectedResult.gradedAt).toLocaleDateString("vi-VN")}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Teacher Comment */}
        {selectedResult.teacherComment && (
          <Card>
            <CardHeader>
              <CardTitle>Nhận xét của giáo viên</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 italic">"{selectedResult.teacherComment}"</p>
            </CardContent>
          </Card>
        )}

        {/* Detailed Scores */}
        <Card>
          <CardHeader>
            <CardTitle>Chi tiết điểm số</CardTitle>
            <CardDescription>So sánh điểm tự đánh giá và điểm giáo viên chấm</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">Mục</TableHead>
                    <TableHead>Tiêu chí</TableHead>
                    <TableHead className="text-center">Tối đa</TableHead>
                    <TableHead className="text-center">Tự đánh giá</TableHead>
                    <TableHead className="text-center">Giáo viên</TableHead>
                    <TableHead className="text-center">Chênh lệch</TableHead>
                    <TableHead>Lý do/Minh chứng</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(evaluationCriteria).map(([sectionKey, section]) => (
                    <>
                      <TableRow key={sectionKey} className="bg-gray-50">
                        <TableCell className="font-bold">{sectionKey}</TableCell>
                        <TableCell className="font-semibold" colSpan={6}>
                          {section.title}
                        </TableCell>
                      </TableRow>
                      {section.items.map((item) => {
                        const itemData = selectedResult.items[item.id]
                        const difference = (itemData?.teacherScore || 0) - (itemData?.studentScore || 0)
                        return (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.id}</TableCell>
                            <TableCell>{item.text}</TableCell>
                            <TableCell className="text-center">{item.maxScore}</TableCell>
                            <TableCell className="text-center font-semibold text-blue-600">
                              {itemData?.studentScore || 0}
                            </TableCell>
                            <TableCell className="text-center font-semibold text-green-600">
                              {itemData?.teacherScore || 0}
                            </TableCell>
                            <TableCell className="text-center">
                              <span
                                className={`font-semibold ${
                                  difference > 0 ? "text-green-600" : difference < 0 ? "text-red-600" : "text-gray-600"
                                }`}
                              >
                                {difference > 0 ? "+" : ""}
                                {difference}
                              </span>
                            </TableCell>
                            <TableCell className="max-w-xs truncate">{itemData?.reason || "--"}</TableCell>
                          </TableRow>
                        )
                      })}
                    </>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  )
}
