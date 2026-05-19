# บทที่ 14: Authentication & Security

> 💡 **ภาพรวม:** สอนการสร้างระบบ Login ที่ปลอดภัย, การเข้ารหัสรหัสผ่าน (Password Hashing) ด้วย SHA-256 (และหลักการของ BCrypt) และการกำหนดสิทธิ์ผู้ใช้ตามบทบาท (Role-Based Access Control) เพื่อป้องกันการเข้าถึงโดยไม่ได้รับอนุญาต

## 🎯 สิ่งที่จะได้เรียนรู้ในบทนี้
- ✅ สร้างหน้า Login ที่ปลอดภัยและป้องกัน SQL Injection
- ✅ เข้ารหัสรหัสผ่านด้วย SHA-256 ก่อนบันทึกลง Database
- ✅ ตรวจสอบสิทธิ์ตาม Role (Admin/User/Guest)
- ✅ ปิดกั้นฟีเจอร์หรือเมนูตาม Permission ของผู้ใช้ที่ Login

## 🔗 Prerequisite (ความรู้ที่ต้องมีก่อน)
> ⚠️ นักเรียนควรเข้าใจสิ่งต่อไปนี้ก่อนเริ่มบทนี้:
- บทที่ 12-13: การเชื่อมต่อ Database และ SQL พื้นฐาน
- บทที่ 8: การทำงานกับฟอร์มหลายหน้าจอ (Multi-form)

## 📚 หัวข้อในบทนี้
| ลำดับ | หัวข้อ | ไฟล์ |
| :---: | :--- | :--- |
| 01 | ระบบ Login และ Password Hashing | `01-login-and-hashing.md` |
| 02 | Role-Based Access Control (RBAC) | `02-role-based-access.md` |
| 🧪 Lab | สร้างระบบ Login พร้อม Role Admin/User | `99-lab-login-system.md` |
