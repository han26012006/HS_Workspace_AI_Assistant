# HS Workspace — Redesign UI/UX Website Dự án Hợp nhất
**Đồ án học phần Dự án Trí tuệ Nhân tạo** (Mã lớp `26C1TEC55001302`) · **UEH**  
**Giảng viên hướng dẫn:** ThS. Tạ Việt Phương  
**Nhóm thực hiện:** Nhóm 8 (Nguyễn Đức Minh, Vương Nguyễn Ngọc Hân, Huỳnh Kỳ Quế, Đậu Thị Khánh Linh)  
**Phiên bản:** Báo cáo đối chiếu Colab và ứng dụng v2.6 (04/11/2026)

---

## 1. Phong cách thiết kế mới (Creative Editorial × Modern Tech)

Giao diện website đã được tái thiết kế toàn diện theo định hướng thẩm mỹ **Creative Editorial, Pastel & Playful Professional** (tham khảo concept Pretty Little Marketer):
- **Bảng màu pastel tinh tế:** Warm Cream (`#FAF7F2`), Pastel Pink (`#F3B5CB`), Baby Blue (`#B9E1E8`), Mint Green (`#C9DDAE`), Soft Lavender (`#DCD3F1`), Deep Charcoal (`#1E1D22`).
- **Nền Grid & Texture:** Họa tiết lưới kẻ ô (Graph Paper Grid Pattern) tạo chiều sâu không gian.
- **Typography Editorial:** Kết hợp display font `DM Serif Display` với sans-serif `Plus Jakarta Sans` / `Be Vietnam Pro`, các điểm nhấn băng dính highlighter (`.tape-pink`, `.tape-blue`, `.tape-mint`) và chữ nghiêng nghệ thuật.
- **Collage & Assets:** Tận dụng hình ảnh cảng biển, container và kiểm tra hải quan từ thư mục `assets/` kết hợp khung bo tròn, nhãn dán sticker và hiệu ứng chuyển động nhẹ.
- **Marquee Ticker Tape:** Dải băng chạy chữ liên tục tạo nhịp điệu thị giác năng động.
- **Tương phản Charcoal Dark:** Khối nội dung màu tối sang trọng làm nổi bật tính năng kỹ thuật và độ tin cậy của hệ thống AI.

---

## 2. Hệ thống Navigation tối ưu (Chỉ 4 mục chính)

- **XÓA HOÀN TOÀN thanh điều hướng phụ (`subnav-sticky`)** khỏi toàn bộ các trang trên website.
- **Thanh điều hướng chính duy nhất (Single-tier Header):**
  - **Bên trái:** Logo `hs.` phong cách editorial, tên **HS Workspace**, thông tin Nhóm 8 · UEH.
  - **Ở giữa:** Đúng 4 mục điều hướng cốt lõi:
    1. **Trang chủ** (`index.html`)
    2. **Sản phẩm** (`product.html`)
    3. **Quản lý dự án** (`project-management.html`)
    4. **Tài liệu & Thư viện** (`resources.html`)
  - **Bên phải:** Nút chuyển đổi Dark/Light mode, nút CTA nổi bật (`✦ Xem Demo` / `✦ Báo cáo`).
- **Hiệu ứng cuộn:** Sticky header tự động đổi nền mờ và bóng đổ tinh tế khi cuộn trang; hỗ trợ menu trượt responsive trên thiết bị di động.

---

## 3. Đồng bộ ngôn ngữ toàn diện

- 100% các thành phần giao diện, nút bấm, tiêu đề, mô tả, nhãn form, bảng dữ liệu và thông báo đều được chuẩn hóa sang **tiếng Việt chuyên nghiệp**.
- Các thuật ngữ chuyên ngành hải quan và AI (HS Workspace, HS Code, AI Canvas, Data Audit, Risk Register, System Card, Project Charter, RACI Matrix, BM25, BGE-M3, M0...) được giữ nguyên kèm giải thích ngữ cảnh rõ ràng.

---

## 4. Chạy và kiểm thử website

Website là trang tĩnh thuần túy (HTML5, CSS3, Vanilla JS), không cần môi trường build phức tạp:

```bash
# Khởi chạy server tĩnh cục bộ bằng Python:
python3 -m http.server 8000

# Mở trình duyệt tại:
http://localhost:8000/
```

Khi đưa lên **GitHub Pages**, cấu hình Source: `Deploy from a branch`, chọn nhánh `main` và thư mục `/docs`.
# HS_Workspace_AI_Assistant
