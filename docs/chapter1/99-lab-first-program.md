# 💻 Lab: My First Console App

> 💡 **เป้าหมาย:** สังเคราะห์ความรู้ทั้งหมดจากบทที่ 1 ออกมาเป็น Console Application จริงที่รันได้ — โปรแกรมนี้จะแสดงข้อมูลส่วนตัวในรูปแบบที่สวยงาม

## 📖 ภาพรวมของโปรแกรม (Program Overview)

เราจะสร้าง **Personal Profile Card** — โปรแกรมที่แสดง "นามบัตรดิจิทัล" ของตัวเองใน Console

```text
ตัวอย่าง Output ที่ต้องการ:

  ╔══════════════════════════════════════╗
  ║          👤 PROFILE CARD             ║
  ╠══════════════════════════════════════╣
  ║  ชื่อ    : สมชาย ใจดี               ║
  ║  อายุ    : 17 ปี                     ║
  ║  ชั้น    : ม.5/1                     ║
  ║  เป้าหมาย: เป็น .NET Developer       ║
  ╠══════════════════════════════════════╣
  ║  .NET Version: 8.0.xxx               ║
  ║  OS: Windows / macOS / Linux         ║
  ╚══════════════════════════════════════╝
```

```text
Flow การทำงานของโปรแกรม:

  START
    │
    ▼
  แสดง Header (กรอบบน + ชื่อหัวข้อ)
    │
    ▼
  แสดงข้อมูลส่วนตัว (แต่ละบรรทัด)
    │
    ▼
  แสดงข้อมูลระบบ (.NET Version, OS)
    │
    ▼
  แสดง Footer (กรอบล่าง)
    │
  END
```

## ⏱️ เวลาที่ใช้: 30-45 นาที

## 📝 ขั้นตอนการทำงาน (Step-by-Step)

### ขั้นตอนที่ 1: สร้างโปรเจกต์ใหม่

- [ ] เปิด Terminal แล้วรันคำสั่ง:
  ```bash
  mkdir lab-profile-card
  cd lab-profile-card
  dotnet new console
  code .
  ```
- [ ] ตรวจสอบว่าไฟล์ `Program.cs` และ `.csproj` ถูกสร้างขึ้นแล้ว

### ขั้นตอนที่ 2: วางแผน Output

- [ ] เปิด `Program.cs` แล้วลบโค้ดเดิมทิ้งทั้งหมด
- [ ] เขียน comment วางแผนโครงสร้างก่อน:
  ```csharp
  // Section 1: Header
  // Section 2: Personal Info
  // Section 3: System Info
  // Section 4: Footer
  ```

### ขั้นตอนที่ 3: สร้าง Header

- [ ] เขียนโค้ดแสดงกรอบด้านบน:
  ```csharp
  // Section 1: Header
  Console.WriteLine("╔══════════════════════════════════════╗");
  Console.WriteLine("║          👤 PROFILE CARD             ║");
  Console.WriteLine("╠══════════════════════════════════════╣");
  ```
- [ ] รัน `dotnet run` ตรวจสอบว่า Header แสดงถูกต้อง

### ขั้นตอนที่ 4: เพิ่มข้อมูลส่วนตัว

- [ ] เพิ่มบรรทัดข้อมูลส่วนตัวของตัวเอง (แทนที่ `[ข้อมูลของคุณ]`):
  ```csharp
  // Section 2: Personal Info
  Console.WriteLine("║  ชื่อ    : [ชื่อ-นามสกุล]             ║");
  Console.WriteLine("║  อายุ    : [อายุ] ปี                  ║");
  Console.WriteLine("║  ชั้น    : [ชั้นเรียน]                ║");
  Console.WriteLine("║  เป้าหมาย: [สิ่งที่อยากทำด้วย C#]     ║");
  Console.WriteLine("╠══════════════════════════════════════╣");
  ```
- [ ] รันและตรวจสอบ alignment (ถ้าข้อมูลยาวหรือสั้นเกินไปให้ปรับ spacing)

### ขั้นตอนที่ 5: เพิ่มข้อมูลระบบ

- [ ] เพิ่มข้อมูลระบบจาก .NET:
  ```csharp
  // Section 3: System Info — ใช้ Environment class ดึงข้อมูลจริง
  Console.WriteLine("║  .NET Version: " + Environment.Version + "             ║");
  Console.WriteLine("║  OS: " + Environment.OSVersion.Platform + "                       ║");
  ```

### ขั้นตอนที่ 6: เพิ่ม Footer และ Comment

- [ ] เพิ่ม Footer ปิดกรอบ:
  ```csharp
  // Section 4: Footer
  Console.WriteLine("╚══════════════════════════════════════╝");
  ```
- [ ] เพิ่ม Single-line comment อธิบาย Section ทุก section
- [ ] รัน `dotnet run` ครั้งสุดท้ายและตรวจสอบ Output ทั้งหมด

### ขั้นตอนที่ 7: ตรวจสอบคุณภาพโค้ด

- [ ] ตัวแปรทุกตัว (ถ้ามี) ตั้งชื่อตาม `camelCase`
- [ ] มี Comment อธิบายทุก Section
- [ ] โค้ดมี Indentation ถูกต้อง
- [ ] รันแล้วไม่มี Error

## 🔥 Challenge (โจทย์ท้าทาย สำหรับคนที่ทำเสร็จก่อนเวลา!)

- **โจทย์:** เพิ่มฟีเจอร์ต่อไปนี้ให้กับ Profile Card:
  1. แสดง **วันที่และเวลาปัจจุบัน** โดยใช้ `DateTime.Now` (ลองดูว่าแสดงผลยังไง)
  2. เพิ่ม **"Skills"** section แสดง 3 ทักษะที่ต้องการเรียน เช่น:
     ```
     ║  Skills  : C#, .NET, SQL              ║
     ```
  3. ทำให้ความกว้างของกรอบ **ปรับตามข้อความอัตโนมัติ** (คิดว่าจะทำยังไง?)
