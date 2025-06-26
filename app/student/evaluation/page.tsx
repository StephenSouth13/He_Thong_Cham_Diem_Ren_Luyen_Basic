"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import StudentLayout from "@/components/student-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Save, Send, AlertCircle, CheckCircle } from "lucide-react"

// Evaluation criteria structure
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

export default function StudentEvaluation() {
  const [user, setUser] = useState<any>(null)
  const [evaluation, setEvaluation] = useState<any>({})
  const [isDraft, setIsDraft] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error">("success")
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

    // Load existing evaluation if any
    const savedEvaluation = localStorage.getItem(`evaluation_${parsedUser.id}_HK2_2024-2025`)
    if (savedEvaluation) {
      const evalData = JSON.parse(savedEvaluation)
      setEvaluation(evalData.items || {})
      setIsSubmitted(evalData.submitted || false)
      setIsDraft(!evalData.submitted)
    }
  }, [router])

  const handleScoreChange = (itemId: string, score: string) => {
    setEvaluation((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        score: score === "" ? "" : Math.max(0, Number.parseInt(score) || 0),
      },
    }))
  }

  const handleReasonChange = (itemId: string, reason: string) => {
    setEvaluation((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        reason: reason,
      },
    }))
  }

  const calculateTotal = () => {
    let total = 0
    Object.keys(evaluationCriteria).forEach((sectionKey) => {
      const section = evaluationCriteria[sectionKey as keyof typeof evaluationCriteria]
      section.items.forEach((item) => {
        const score = evaluation[item.id]?.score || 0
        total += typeof score === "number" ? score : Number.parseInt(score) || 0
      })
    })
    return total
  }

  const saveDraft = () => {
    const evalData = {
      userId: user.id,
      semester: "HK2",
      year: "2024-2025",
      items: evaluation,
      studentTotal: calculateTotal(),
      submitted: false,
      createdAt: new Date().toISOString(),
    }
    localStorage.setItem(`evaluation_${user.id}_HK2_2024-2025`, JSON.stringify(evalData))
    setMessage("Đã lưu bản nháp thành công!")
    setMessageType("success")
    setTimeout(() => setMessage(""), 3000)
  }

  const submitEvaluation = () => {
    const total = calculateTotal()
    if (total === 0) {
      setMessage("Vui lòng nhập điểm cho ít nhất một mục!")
      setMessageType("error")
      setTimeout(() => setMessage(""), 3000)
      return
    }

    const evalData = {
      userId: user.id,
      semester: "HK2",
      year: "2024-2025",
      items: evaluation,
      studentTotal: total,
      submitted: true,
      createdAt: new Date().toISOString(),
    }
    localStorage.setItem(`evaluation_${user.id}_HK2_2024-2025`, JSON.stringify(evalData))
    setIsSubmitted(true)
    setIsDraft(false)
    setMessage("Đã gửi phiếu đánh giá thành công!")
    setMessageType("success")
  }

  if (!user) return null

  const totalScore = calculateTotal()

  return (
    <StudentLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Phiếu đánh giá điểm rèn luyện</h1>
          <p className="text-gray-600">Học kỳ 2 - Năm học 2024-2025</p>
          <div className="flex justify-center gap-4 mt-4">
            <Badge variant={isDraft ? "secondary" : "default"} className="px-3 py-1">
              {isSubmitted ? "Đã nộp" : "Bản nháp"}
            </Badge>
            <Badge variant="outline" className="px-3 py-1">
              Tổng điểm: {totalScore}/100
            </Badge>
          </div>
        </div>

        {/* Status Message */}
        {message && (
          <Alert className={messageType === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className={messageType === "success" ? "text-green-600" : "text-red-600"}>
              {message}
            </AlertDescription>
          </Alert>
        )}

        {/* Evaluation Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-blue-600" />
              Các tiêu chí đánh giá
            </CardTitle>
            <CardDescription>Vui lòng tự đánh giá điểm số cho từng tiêu chí và ghi rõ lý do</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="multiple" className="space-y-4">
              {Object.entries(evaluationCriteria).map(([sectionKey, section]) => (
                <AccordionItem key={sectionKey} value={sectionKey} className="border rounded-lg">
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <div className="flex items-center justify-between w-full mr-4">
                      <span className="font-semibold text-left">
                        {sectionKey}. {section.title}
                      </span>
                      <Badge variant="outline">
                        {section.items.reduce((sum, item) => sum + (evaluation[item.id]?.score || 0), 0)}/
                        {section.maxScore}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-4">
                      {section.items.map((item) => (
                        <div key={item.id} className="border rounded-lg p-4 bg-gray-50">
                          <div className="flex items-start justify-between mb-3">
                            <Label className="text-sm font-medium flex-1">
                              {item.id}. {item.text}
                            </Label>
                            <Badge variant="secondary" className="ml-2">
                              Tối đa: {item.maxScore}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <Label htmlFor={`score-${item.id}`} className="text-xs text-gray-600">
                                Điểm tự đánh giá
                              </Label>
                              <Input
                                id={`score-${item.id}`}
                                type="number"
                                min="0"
                                max={item.maxScore}
                                value={evaluation[item.id]?.score || ""}
                                onChange={(e) => handleScoreChange(item.id, e.target.value)}
                                placeholder="0"
                                className="mt-1"
                                disabled={isSubmitted}
                              />
                            </div>
                            <div className="md:col-span-2">
                              <Label htmlFor={`reason-${item.id}`} className="text-xs text-gray-600">
                                Lý do, minh chứng
                              </Label>
                              <Textarea
                                id={`reason-${item.id}`}
                                value={evaluation[item.id]?.reason || ""}
                                onChange={(e) => handleReasonChange(item.id, e.target.value)}
                                placeholder="Nhập lý do, minh chứng cụ thể..."
                                className="mt-1 min-h-[80px]"
                                disabled={isSubmitted}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Summary and Actions */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Tổng điểm tự đánh giá</h3>
                <p className="text-3xl font-bold text-blue-600">{totalScore}/100</p>
                <p className="text-sm text-gray-600 mt-1">
                  Phân loại dự kiến:{" "}
                  {totalScore >= 90
                    ? "Xuất sắc"
                    : totalScore >= 80
                      ? "Tốt"
                      : totalScore >= 65
                        ? "Khá"
                        : totalScore >= 50
                          ? "Trung bình"
                          : "Yếu"}
                </p>
              </div>

              {!isSubmitted && (
                <div className="flex gap-3">
                  <Button variant="outline" onClick={saveDraft} className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Lưu nháp
                  </Button>
                  <Button onClick={submitEvaluation} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                    <Send className="h-4 w-4" />
                    Gửi giáo viên
                  </Button>
                </div>
              )}

              {isSubmitted && (
                <div className="text-center">
                  <Badge className="bg-green-100 text-green-800 px-4 py-2">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Đã gửi thành công
                  </Badge>
                  <p className="text-sm text-gray-600 mt-2">Phiếu đã được gửi đến giáo viên để chấm điểm</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  )
}
