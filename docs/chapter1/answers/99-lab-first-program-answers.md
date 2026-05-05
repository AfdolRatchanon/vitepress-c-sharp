# เฉลย Lab: My First Console App

## 📝 เฉลย Lab พื้นฐาน (Personal Profile Card)

โค้ดแบบสมบูรณ์สำหรับทำ Profile Card โดยยึดหลัก Code Style ที่ถูกต้องและมีการใช้ Comment:

```csharp
// Section 1: Header
// แสดงหัวข้อของนามบัตรดิจิทัล
Console.WriteLine("╔══════════════════════════════════════╗");
Console.WriteLine("║          👤 PROFILE CARD             ║");
Console.WriteLine("╠══════════════════════════════════════╣");

// Section 2: Personal Info
// ใช้การเคาะ Space bar (Space padding) เพื่อให้เครื่องหมาย colon (:) ตรงกัน
Console.WriteLine("║  ชื่อ    : สมชาย ใจดี               ║");
Console.WriteLine("║  อายุ    : 17 ปี                     ║");
Console.WriteLine("║  ชั้น    : ม.5/1                     ║");
Console.WriteLine("║  เป้าหมาย: เป็น .NET Developer       ║");
Console.WriteLine("╠══════════════════════════════════════╣");

// Section 3: System Info
// ดึงข้อมูลระบบปฏิบัติการและเวอร์ชัน .NET จาก Environment class
Console.WriteLine("║  .NET Version: " + Environment.Version + "             ║");
Console.WriteLine("║  OS: " + Environment.OSVersion.Platform + "                       ║");

// Section 4: Footer
// ปิดกรอบล่างให้สมบูรณ์
Console.WriteLine("╚══════════════════════════════════════╝");
```

---

## 🔥 เฉลย Challenge (โจทย์ท้าทาย)

สำหรับคนที่ทำท้าทายครบทุกข้อ:

```csharp
// ดึงข้อมูลเวลาและวันที่ปัจจุบันมาเก็บไว้ในตัวแปร
// (เรื่องตัวแปรแบบละเอียดจะเรียนในบทต่อไป แต่สามารถใช้ var ได้ก่อน)
var currentTime = DateTime.Now;

Console.WriteLine("╔══════════════════════════════════════╗");
Console.WriteLine("║          👤 PROFILE CARD             ║");
Console.WriteLine("╠══════════════════════════════════════╣");

// แสดงข้อมูลส่วนตัว
Console.WriteLine("║  ชื่อ    : สมชาย ใจดี               ║");
Console.WriteLine("║  อายุ    : 17 ปี                     ║");
Console.WriteLine("║  ชั้น    : ม.5/1                     ║");

// เพิ่ม Skills section (Challenge 2)
Console.WriteLine("║  Skills  : C#, .NET, SQL             ║");

Console.WriteLine("║  เป้าหมาย: เป็น .NET Developer       ║");
Console.WriteLine("╠══════════════════════════════════════╣");

// แสดงข้อมูลระบบและเวลา (Challenge 1)
Console.WriteLine("║  .NET Version: " + Environment.Version + "             ║");
Console.WriteLine("║  OS: " + Environment.OSVersion.Platform + "                       ║");
Console.WriteLine("║  เวลา: " + currentTime + "      ║");

Console.WriteLine("╚══════════════════════════════════════╝");
```

### การทำกรอบขยายอัตโนมัติ (Challenge 3 - เชิงคอนเซปต์)
การจะทำให้ความกว้างของกรอบปรับตามความยาวของข้อความได้โดยอัตโนมัติใน C# เราต้องใช้ทักษะจากบทถัดๆ ไปมาช่วย เช่น:
1. การเก็บข้อมูลเป็นตัวแปร (Variables)
2. การนับความยาวของตัวอักษรด้วยคำสั่ง `.Length` (String methods)
3. การวนลูป (Loops) เพื่อพิมพ์ตัวอักษรขอบกรอบ (`═` และช่องว่าง) ตามจำนวนตัวอักษรที่นับได้

*ให้จดจำความท้าทายนี้ไว้ เมื่อเรียนจบเนื้อหาบทที่ 7 (Strings in Depth) คุณจะสามารถกลับมาแก้ปัญหานี้ได้อย่างสมบูรณ์!*
