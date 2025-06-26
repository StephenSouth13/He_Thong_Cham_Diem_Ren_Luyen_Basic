# 🎓 HỆ THỐNG CHẤM ĐIỂM RÈN LUYỆN SINH VIÊN – PHÂN HIỆU HỌC VIỆN PHỤ NỮ VIỆT NAM

Một hệ thống quản lý điểm rèn luyện cho sinh viên và giảng viên, xây dựng bằng **Next.js Fullstack**, cho phép đánh giá theo tiêu chí chuẩn của Học viện Phụ nữ Việt Nam.

> 📌 Repository: [He_Thong_Cham_Diem_Ren_Luyen_Basic](https://github.com/StephenSouth13/He_Thong_Cham_Diem_Ren_Luyen_Basic)  
> 👤 Tác giả: [StephenSouth13](https://github.com/StephenSouth13)

---

## 🚀 Tính năng chính

### 🎓 Sinh viên:
- Nhập phiếu đánh giá rèn luyện theo tiêu chí chính thức
- Gửi phiếu và xem kết quả đánh giá
- Tải phiếu PDF hoặc CSV
- Cập nhật thông tin cá nhân
- Nhận thông báo về các kỳ đánh giá

### 👨‍🏫 Giảng viên:
- Tạo/xóa lớp học (mã lớp, tên lớp, số lượng sinh viên)
- Xem danh sách sinh viên từng lớp
- Chấm điểm phần giảng viên trong phiếu
- Xuất bảng tổng hợp đánh giá của lớp (PDF, CSV)
- Gửi thông báo đến sinh viên

### 🔔 Thông báo:
- Giao diện chuông thông báo cho sinh viên & giảng viên
- Hiển thị các cập nhật như: phiếu đã gửi, phiếu đã chấm, kỳ mới bắt đầu,...

---

## 🧱 Công nghệ sử dụng

- ⚙️ Framework: [Next.js](https://nextjs.org/) (Fullstack – App Router)
- 🎨 UI: Tailwind CSS
- 🔐 Auth: NextAuth
- 🗃️ Database ORM: Prisma
- 🧾 PDF xuất file: react-pdf hoặc pdf-lib
- 📤 CSV export: papaparse/json2csv
- 🏦 Database: PostgreSQL / SQLite (tùy môi trường)
- ☁️ Deploy: Vercel / Railway / Supabase

---

## 📁 Cấu trúc dự án

.
├── app/ # App Router structure
│ ├── api/ # API routes (CRUD, export, auth)
│ ├── dashboard/ # Giao diện cho sinh viên/giảng viên
│ └── layout.tsx # Bố cục giao diện chính
├── components/ # Các UI components (Sidebar, Notification, EvaluationForm,...)
├── lib/ # Các hàm logic: tính điểm, export,...
├── prisma/ # Schema và seed dữ liệu
├── public/ # Logo, favicon,...
├── styles/ # File tailwind, globals
└── README.md # Tài liệu này

yaml
Sao chép
Chỉnh sửa

---

## ✅ Hướng dẫn chạy dự án

### 1. Clone repository
```bash
git clone https://github.com/StephenSouth13/He_Thong_Cham_Diem_Ren_Luyen_Basic.git
cd He_Thong_Cham_Diem_Ren_Luyen_Basic
2. Cài đặt dependencies
bash
Sao chép
Chỉnh sửa
npm install
# hoặc
yarn
3. Thiết lập .env
Tạo file .env và điền thông tin cần thiết:

env
Sao chép
Chỉnh sửa
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="chuoi-bi-mat"
4. Khởi tạo DB & seed dữ liệu mẫu
bash
Sao chép
Chỉnh sửa
npx prisma migrate dev
npx prisma db seed
5. Chạy dự án
bash
Sao chép
Chỉnh sửa
npm run dev
🧠 Ghi chú thêm
Hệ thống phù hợp cho < 200 sinh viên và vài giảng viên – tiết kiệm tài nguyên và dễ deploy.

Hoàn toàn có thể mở rộng cho nhiều học kỳ, lớp, phân hệ nâng cao sau này.

Dễ triển khai trên Vercel hoặc Railway mà không cần backend riêng.

📜 Giấy phép
Dự án phát triển phục vụ mục tiêu giáo dục và nội bộ học viện, sử dụng theo MIT License.

🤝 Đóng góp
Mọi đóng góp, gợi ý và issue đều được chào đón tại:
https://github.com/StephenSouth13/He_Thong_Cham_Diem_Ren_Luyen_Basic/issues

© 2025 – StephenSouth13
Dành cho giáo dục và cải tiến công tác đánh giá rèn luyện sinh viên 🌱
