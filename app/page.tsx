"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff, GraduationCap } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"student" | "teacher">("student")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem("user")
    if (user) {
      const userData = JSON.parse(user)
      if (userData.role === "student") {
        router.push("/student")
      } else {
        router.push("/teacher")
      }
    }
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate loading
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock authentication
    const mockUsers = {
      student: { email: "student@hvpnvn.edu.vn", password: "123456", name: "Nguyễn Thị A", id: "sv001" },
      teacher: { email: "teacher@hvpnvn.edu.vn", password: "123456", name: "TS. Trần Văn B", id: "gv001" },
    }

    const mockUser = mockUsers[role]
    if (email === mockUser.email && password === mockUser.password) {
      const userData = {
        id: mockUser.id,
        email: mockUser.email,
        name: mockUser.name,
        role: role,
        classId: role === "student" ? "class001" : null,
      }
      localStorage.setItem("user", JSON.stringify(userData))

      if (role === "student") {
        router.push("/student")
      } else {
        router.push("/teacher")
      }
    } else {
      setError("Email hoặc mật khẩu không chính xác")
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-900 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
            <GraduationCap className="h-10 w-10 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent">
              HỆ THỐNG ĐÁNH GIÁ
            </CardTitle>
            <CardDescription className="text-base font-medium text-blue-800 mt-2">
              Điểm Rèn Luyện Sinh Viên
            </CardDescription>
            <CardDescription className="text-sm text-gray-600 mt-1">Phân hiệu Học viện Phụ nữ Việt Nam</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="role">Vai trò</Label>
              <Select value={role} onValueChange={(value: "student" | "teacher") => setRole(value)}>
                <SelectTrigger className="h-12 rounded-xl border-2 focus:border-blue-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Sinh viên</SelectItem>
                  <SelectItem value="teacher">Giáo viên</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email"
                className="h-12 rounded-xl border-2 focus:border-blue-600 transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu"
                  className="h-12 rounded-xl border-2 focus:border-blue-600 transition-colors pr-12"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-600">{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-900 to-blue-600 hover:from-blue-800 hover:to-blue-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p className="font-medium mb-2">Tài khoản demo:</p>
            <div className="space-y-1">
              <p>
                <strong>Sinh viên:</strong> student@hvpnvn.edu.vn / 123456
              </p>
              <p>
                <strong>Giáo viên:</strong> teacher@hvpnvn.edu.vn / 123456
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
