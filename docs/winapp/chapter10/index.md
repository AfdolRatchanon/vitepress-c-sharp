# บทที่ 10: Multi-threading & Background Processing

> 💡 **ภาพรวม:** สอนการทำงานแบบ Async ด้วย Timer, ProgressBar, async/await และ Task เพื่อป้องกัน UI ค้าง รวมถึงการแก้ปัญหา Cross-Thread Exception ด้วย InvokeRequired

## 🎯 สิ่งที่จะได้เรียนรู้ในบทนี้
- ✅ Timer: ทำงานซ้ำๆ โดยไม่บล็อก UI
- ✅ ProgressBar: แสดงความคืบหน้าของงาน
- ✅ async/await: โหลดข้อมูลแบบไม่บล็อก
- ✅ InvokeRequired: อัพเดต UI จาก Background Thread อย่างปลอดภัย

## 🔗 Prerequisite (ความรู้ที่ต้องมีก่อน)
> ⚠️ นักเรียนควรเข้าใจสิ่งต่อไปนี้ก่อนเริ่มบทนี้:
- บทที่ 9: Data Presentation
- ความรู้เรื่อง `Task` และ `async/await` เบื้องต้น

## 📚 หัวข้อในบทนี้
| ลำดับ | หัวข้อ | ไฟล์ |
| :---: | :--- | :--- |
| 01 | Timer & ProgressBar | `01-timer-and-progressbar.md` |
| 02 | async/await & Task ใน WinForms | `02-async-await-winforms.md` |
| 🧪 Lab | สร้างโปรแกรมดาวน์โหลดไฟล์พร้อม Progress | `99-lab-download-simulator.md` |
