# C# คืออะไร และ .NET Ecosystem

> 💡 **เป้าหมาย:** เข้าใจภาพรวมของ C# และ .NET ก่อนเริ่มเขียนโค้ด เพื่อให้รู้ว่าสิ่งที่เรียนอยู่นี้มีที่ยืนอยู่ที่ไหนในโลกของการพัฒนาซอฟต์แวร์

## 📖 ทฤษฎีและแนวคิด (Theory & Concepts)

### C# (C-Sharp) คืออะไร?

C# เป็นภาษาโปรแกรมที่พัฒนาโดย **Microsoft** เปิดตัวในปี 2002 เป็นภาษาที่มีลักษณะดังนี้:

- **Strongly Typed** — ทุกตัวแปรต้องระบุชนิดข้อมูล ทำให้จับ Error ได้ตั้งแต่ compile time
- **Object-Oriented** — รองรับการเขียนโปรแกรมแบบ OOP เต็มรูปแบบ
- **General Purpose** — ใช้ได้กับงานหลากหลาย: Desktop, Web, Mobile, Game, Console
- **Managed Language** — ไม่ต้องจัดการ Memory เอง .NET ดูแลให้ผ่าน Garbage Collector

### .NET คืออะไร?

.NET คือ **Platform** หรือ **Runtime** ที่ทำให้โปรแกรม C# รันได้ ประกอบด้วย:

- **.NET SDK** — ชุดเครื่องมือสำหรับ compile และ build โปรแกรม
- **CLR (Common Language Runtime)** — ตัว Runtime ที่รันโปรแกรม C# จริงๆ
- **BCL (Base Class Library)** — ห้องสมุดมาตรฐานที่ติดมากับ .NET

```text
กระบวนการทำงานของโปรแกรม C#:

  ┌─────────────────────┐
  │  Source Code (.cs)  │  ← คุณเขียนโค้ด
  └─────────────────────┘
             │
             │  dotnet build / dotnet run
             ▼
  ┌─────────────────────┐
  │   IL (Bytecode)     │  ← Compiler แปลงเป็น Intermediate Language
  │   (.dll / .exe)     │
  └─────────────────────┘
             │
             │  CLR (Common Language Runtime)
             ▼
  ┌─────────────────────┐
  │   Machine Code      │  ← CLR แปลงอีกครั้งให้เหมาะกับ OS จริง
  │  (Windows/Mac/Linux)│
  └─────────────────────┘
             │
             ▼
  ┌─────────────────────┐
  │   Console Output    │  ← ผลลัพธ์ที่เห็นบนหน้าจอ
  └─────────────────────┘
```

### ทำไมต้องเรียน C#?

| เหตุผล | รายละเอียด |
| :--- | :--- |
| **Cross-Platform** | รันได้บน Windows, macOS, Linux ด้วย .NET Core |
| **ประสิทธิภาพสูง** | เร็วกว่า Python หลายเท่า เหมาะกับงาน Enterprise |
| **Community ใหญ่** | Stack Overflow, GitHub, Microsoft Docs พร้อมใช้งาน |
| **Career** | ใช้งานในสาย .NET Developer, Game Dev (Unity), Mobile (MAUI) |
| **Syntax ชัดเจน** | อ่านง่าย เรียนรู้ได้ไว ถ้าเคยรู้ Java หรือ C++ จะคุ้นมาก |

### .NET vs .NET Framework vs .NET Core — ต่างกันอย่างไร?

```text
Timeline ของ .NET:

2002 ─── .NET Framework 1.0 (Windows เท่านั้น)
         │
         │  ... หลายปี ...
         │
2016 ─── .NET Core 1.0 (Cross-Platform!)
         │
2019 ─── .NET Core 3.x
         │
2020 ─── .NET 5 (รวม .NET Framework + .NET Core เป็นหนึ่งเดียว)
         │
2021 ─── .NET 6 (LTS)
         │
2022 ─── .NET 7
         │
2023 ─── .NET 8 (LTS) ← ปัจจุบันแนะนำใช้
         │
2024 ─── .NET 9
```

> **สรุป:** ในคอร์สนี้เราใช้ **.NET 8 หรือใหม่กว่า** ซึ่งเป็น Cross-Platform รันได้ทุก OS

### Console Application คืออะไร?

Console Application คือโปรแกรมที่:
- **ไม่มี GUI (Graphical User Interface)**
- รับ Input ผ่าน Keyboard
- แสดงผลผ่าน Terminal / Command Prompt
- เหมาะมากสำหรับ **ฝึกหัดพื้นฐาน** เพราะเน้นตรรกะล้วนๆ ไม่ต้องสนใจ UI

```text
ตัวอย่าง Console Application:

  ┌────────────────────────────────────────┐
  │  Terminal / Command Prompt             │
  │                                        │
  │  > dotnet run                          │
  │  สวัสดี! ยินดีต้อนรับสู่ C#           │
  │  กรุณาใส่ชื่อของคุณ: สมชาย            │
  │  ยินดีต้อนรับ, สมชาย!                 │
  │                                        │
  └────────────────────────────────────────┘
```

## 💻 ตัวอย่างโค้ด (Code Implementation)

ลองดูหน้าตาของโปรแกรม C# อย่างง่าย (จะอธิบายละเอียดในหัวข้อถัดไป):

::: code-group
```csharp [Program.cs]
// [1] นี่คือโปรแกรม C# อย่างง่ายที่สุด (Top-level statements style)
Console.WriteLine("สวัสดี! ยินดีต้อนรับสู่ C#");
Console.WriteLine("คุณกำลังเรียน .NET " + Environment.Version);
```
:::

**Expected Output:**
```
สวัสดี! ยินดีต้อนรับสู่ C#
คุณกำลังเรียน .NET 8.0.x
```

## 🎯 โจทย์ฝึกปฏิบัติเสริมความเข้าใจ (Mini Exercise)

โจทย์ต่อไปนี้เป็นคำถามเชิงแนวคิด ให้ตอบด้วยความเข้าใจของตัวเอง:

- **โจทย์ที่ 1:** อธิบายด้วยคำพูดของตัวเองว่า IL (Intermediate Language) คืออะไร และทำไม .NET ถึงต้องแปลงเป็น IL ก่อน แทนที่จะแปลงเป็น Machine Code ทันที
- **โจทย์ที่ 2:** ถ้าคุณจะสร้างโปรแกรมจัดการคะแนนนักเรียนสำหรับโรงเรียน คุณคิดว่า Console Application เหมาะสมหรือไม่ เพราะอะไร?

::: details 💡 คำใบ้ (Hint)
- IL เปรียบเหมือน "ภาษากลาง" ที่ทำให้โปรแกรมเดียวกันรันได้บน Windows, Mac, Linux โดยไม่ต้อง compile ใหม่สำหรับแต่ละ OS
- คิดถึงว่าใครจะใช้โปรแกรมนั้น และเขาถนัดใช้ Terminal หรือ GUI มากกว่ากัน
:::

## 🔥 Challenge (โจทย์ท้าทาย!)

- **โจทย์:** ค้นหา (จากความจำ) ว่า C# ถูกออกแบบโดยใคร ในปีใด และชื่อ C# มาจากที่ไหน แล้วเขียนอธิบายสั้นๆ ใน comment ของไฟล์โค้ดตัวอย่าง โดย **ห้าม** เปิดอินเทอร์เน็ตค้นหา ให้ใช้ความจำจากที่เคยอ่านมาเท่านั้น

## 🗣️ ทบทวน (Review)

::: details ❓ คำถามทบทวนความเข้าใจ

**คำถาม 1:** .NET SDK และ CLR ต่างกันอย่างไร?
**แนวคำตอบ:** .NET SDK คือชุดเครื่องมือสำหรับ developers ใช้เขียนและ build โปรแกรม (รวม compiler, dotnet CLI) ส่วน CLR คือ Runtime ที่รันโปรแกรมที่ build แล้ว โดย CLR จัดการ Memory (Garbage Collection), Security และแปลง IL เป็น Machine Code

**คำถาม 2:** ทำไม C# ถึงเรียกว่า "Strongly Typed"?
**แนวคำตอบ:** เพราะทุกตัวแปรต้องมีชนิดข้อมูลที่กำหนดชัดเจน (เช่น `int`, `string`) และ compiler จะตรวจสอบว่าใช้ถูกชนิดหรือไม่ก่อน compile หากผิดจะ Error ทันที ไม่ใช่ตอน Runtime
:::
