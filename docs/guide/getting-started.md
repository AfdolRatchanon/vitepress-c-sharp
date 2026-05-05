# เริ่มต้นใช้งาน

ในบทนี้เราจะมาดูวิธีการเตรียมเครื่องมือสำหรับเขียนโปรแกรม C#

## 1. ติดตั้ง .NET SDK
ดาวน์โหลดและติดตั้ง .NET SDK จากเว็บไซต์หลักของ [Microsoft](https://dotnet.microsoft.com/download)

## 2. เครื่องมือเขียนโค้ด (IDE / Editor)
แนะนำให้เลือกใช้งานหนึ่งในเครื่องมือเหล่านี้:
- **Visual Studio 2022**: เหมาะสำหรับผู้ใช้ Windows มีเครื่องมือครบครัน
- **Visual Studio Code (VS Code)**: น้ำหนักเบา ข้ามแพลตฟอร์มได้ (ต้องการส่วนเสริม C#)
- **JetBrains Rider**: เครื่องมือที่ทรงพลังสำหรับการพัฒนา .NET

## 3. สร้างโปรเจกต์แรก
เมื่อติดตั้ง .NET SDK เสร็จแล้ว เปิด Terminal หรือ Command Prompt แล้วพิมพ์คำสั่งดังนี้:

```bash
dotnet new console -n HelloWorld
cd HelloWorld
dotnet run
```
