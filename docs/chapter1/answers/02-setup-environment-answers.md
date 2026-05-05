# เฉลย: ติดตั้ง .NET SDK และ VS Code

## 🎯 เฉลย Mini Exercise

**โจทย์ที่ 1:** สร้างโปรเจกต์และรัน `dotnet --version` บันทึกลง `README.md`
**เฉลย (ตัวอย่าง):**
```markdown
# My Hello C# Project
โปรเจกต์แรกของฉัน สร้างด้วย .NET SDK Version: 8.0.204
```

**โจทย์ที่ 2:** ไฟล์ `Program.cs` เริ่มต้นมีโค้ดอะไรอยู่ และแต่ละบรรทัดทำหน้าที่อะไร?
**เฉลย:**
ใน .NET รุ่นใหม่ๆ เมื่อสร้างโปรเจกต์ด้วย `dotnet new console` ไฟล์ `Program.cs` จะมีโค้ดเพียงบรรทัดเดียว (อาจจะมี comment ด้วย):

```csharp
// See https://aka.ms/new-console-template for more information
Console.WriteLine("Hello, World!");
```

- `// See ...`: เป็น Single-line comment แนะนำลิงก์ให้ไปอ่านเพิ่มเติมเกี่ยวกับ template ใหม่
- `Console.WriteLine("Hello, World!");`: คำสั่งสำหรับพิมพ์ข้อความ `Hello, World!` ออกมาแสดงผลทางหน้าจอ Terminal แล้วขึ้นบรรทัดใหม่

---

## 🔥 เฉลย Challenge

**โจทย์:** สร้างโปรเจกต์ `MyChallenge` แล้วรันทั้ง 2 โปรเจกต์แยกกันโดยไม่ต้องลบ
**เฉลย:**
การรันโปรเจกต์ .NET จะต้องสั่งคำสั่งให้อยู่ในตำแหน่งโฟลเดอร์ของโปรเจกต์นั้นๆ (ที่มีไฟล์ `.csproj`)

**วิธีที่ 1: เข้าไปในโฟลเดอร์ก่อนแล้วค่อยรัน (ใช้คำสั่ง cd)**
```bash
# รันโปรเจกต์แรก
cd my-first-app
dotnet run

# ถอยกลับมา แล้วเข้าไปโปรเจกต์ที่สองเพื่อรัน
cd ..
cd MyChallenge
dotnet run
```

**วิธีที่ 2: ใช้ parameter --project**
เราสามารถรันโปรเจกต์โดยไม่ต้อง `cd` เข้าไปได้ โดยระบุพาร์ทของโปรเจกต์ผ่าน `--project`
```bash
dotnet run --project my-first-app
dotnet run --project MyChallenge
```
