# โครงสร้างโปรแกรม C#

> 💡 **เป้าหมาย:** เข้าใจโครงสร้างภายในของไฟล์ `.cs` ว่า namespace, class, และ Main method คืออะไร รวมถึงรู้จัก Top-level statements ซึ่งเป็น style ที่ใช้ใน .NET 6+

## 📖 ทฤษฎีและแนวคิด (Theory & Concepts)

### โปรแกรม C# มี 2 Style

ใน .NET 6 ขึ้นไป มี 2 วิธีเขียนโปรแกรม:

```text
Style 1: Traditional (แบบดั้งเดิม — ใช้ใน .NET 5 และเก่ากว่า)

  ┌────────────────────────────────────────────┐
  │ namespace MyApp                            │
  │ {                                          │
  │     class Program                          │
  │     {                                      │
  │         static void Main(string[] args)    │
  │         {                                  │
  │             Console.WriteLine("Hello!");   │  ← โค้ดจริงอยู่ลึกมาก
  │         }                                  │
  │     }                                      │
  │ }                                          │
  └────────────────────────────────────────────┘

Style 2: Top-level Statements (ใหม่ — .NET 6+)

  ┌────────────────────────────────────────────┐
  │ Console.WriteLine("Hello!");               │  ← เขียนตรงๆ เลย
  └────────────────────────────────────────────┘
```

> ในคอร์สนี้ใช้ **Top-level Statements** เป็นหลัก เพราะกระชับและเหมาะกับการเรียนรู้
> แต่เราจะเรียนรู้ Traditional Style ด้วย เพราะยังพบเห็นใน codebase เดิม

### ทำความเข้าใจ Traditional Style

```text
anatomy ของ Traditional Style:

  namespace MyApp          ← [1] ชื่อ namespace (grouping ของ classes)
  {
      class Program        ← [2] ชื่อ class (blueprint ของโปรแกรม)
      {
          static void Main(string[] args)   ← [3] Entry Point ของโปรแกรม
          {
              // โค้ดของเราอยู่ที่นี่
          }
      }
  }

  [1] namespace: เหมือน "โฟลเดอร์" สำหรับจัดกลุ่ม classes
  [2] class: เหมือน "blueprint" หรือ "แม่แบบ" (จะเรียนลึกใน Chapter 9)
  [3] Main: จุดเริ่มต้นของโปรแกรม .NET จะเริ่มรันจากที่นี่เสมอ
      - static  = ไม่ต้องสร้าง object ก่อนเรียกใช้
      - void    = ไม่ return ค่า
      - string[] args = รับ arguments จาก command line
```

### Entry Point คืออะไร?

```text
เมื่อรัน dotnet run:

  Operating System
       │
       ▼
  .NET Runtime (CLR)
       │
       ▼  ค้นหา Entry Point (Main method หรือ Top-level statements)
       │
       ▼
  โค้ดของเรา...
       │
       ▼
  โปรแกรมจบ (return)
```

โปรแกรม C# **ทุกตัว** ต้องมี Entry Point เพียง 1 จุด — ถ้ามีมากกว่า 1 จะ Error

### Namespace และการ using

เมื่อใช้ `Console.WriteLine` จริงๆ แล้ว `Console` อยู่ใน namespace `System`:
- ชื่อเต็มคือ `System.Console.WriteLine(...)`

ใน .NET 6+ เปิด **Implicit Usings** ให้อัตโนมัติ ทำให้ไม่ต้องเขียน `using System;` เอง

::: code-group
```csharp [ก่อน .NET 6 (Traditional)]
using System;     // ← ต้องเพิ่มเองก่อน

namespace MyApp
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello!");
        }
    }
}
```

```csharp [.NET 6+ (Top-level + Implicit Usings)]
// ไม่ต้อง using System; เพราะ Implicit Usings เปิดอยู่
Console.WriteLine("Hello!");
```
:::

## 💻 ตัวอย่างโค้ด (Code Implementation)

### ตัวอย่างที่ 1: Top-level Statements (ที่ใช้ในคอร์สนี้)

::: code-group
```csharp [Program.cs]
// [1] Top-level statements — เขียนโค้ดได้ตรงๆ เลย
Console.WriteLine("=== ระบบข้อมูลนักเรียน ===");
Console.WriteLine("ชื่อ: สมชาย ใจดี");
Console.WriteLine("ชั้น: ม.5/1");
Console.WriteLine("========================");
```
:::

**Expected Output:**
```
=== ระบบข้อมูลนักเรียน ===
ชื่อ: สมชาย ใจดี
ชั้น: ม.5/1
========================
```

---

### ตัวอย่างที่ 2: Traditional Style (สำหรับทำความเข้าใจ)

::: code-group
```csharp [Program.cs]
// [1] Traditional style — เหมือนกับ .NET Framework เดิม
namespace StudentSystem
{
    class Program
    {
        static void Main(string[] args)
        {
            // [2] โค้ดของเราเขียนภายใน Main method
            Console.WriteLine("=== ระบบข้อมูลนักเรียน ===");
            Console.WriteLine("ชื่อ: สมชาย ใจดี");
            Console.WriteLine("ชั้น: ม.5/1");
        }
    }
}
```
:::

**Expected Output:**
```
=== ระบบข้อมูลนักเรียน ===
ชื่อ: สมชาย ใจดี
ชั้น: ม.5/1
```

---

### ตัวอย่างที่ 3: ดู args จาก Command Line

::: code-group
```csharp [Program.cs]
// [1] ใน Top-level statements เข้าถึง args ได้ตรงเลย
if (args.Length > 0)
{
    Console.WriteLine("รับ argument มา: " + args[0]);
}
else
{
    Console.WriteLine("ไม่มี argument ถูกส่งมา");
}
```
:::

::: code-group
```bash [Terminal]
# รันปกติ
dotnet run
# Output: ไม่มี argument ถูกส่งมา

# รันพร้อม argument
dotnet run -- สมชาย
# Output: รับ argument มา: สมชาย
```
:::

## 🎯 โจทย์ฝึกปฏิบัติเสริมความเข้าใจ (Mini Exercise)

- **โจทย์ที่ 1:** แปลงโค้ด Top-level statements นี้ให้เป็น Traditional Style โดยใส่ชื่อ namespace ว่า `SchoolApp` และ class ว่า `Program`:
  ```csharp
  Console.WriteLine("สวัสดีจาก C#!");
  Console.WriteLine("วันนี้เรียนเรื่องโครงสร้างโปรแกรม");
  ```

- **โจทย์ที่ 2:** สร้างโปรแกรมใหม่ที่มี Traditional Style แล้วเพิ่ม namespace ซ้อนกัน 2 ชั้น เช่น `School.Management` แล้วรันให้สำเร็จ

::: details 💡 คำใบ้ (Hint)
- สำหรับโจทย์ 1: structure คือ `namespace SchoolApp { class Program { static void Main(string[] args) { ... } } }`
- สำหรับโจทย์ 2: namespace ซ้อนกันใช้ `.` เช่น `namespace School.Management` หรือเขียนซ้อนจริงๆ ก็ได้: `namespace School { namespace Management { ... } }`
:::

## 🔥 Challenge (โจทย์ท้าทาย!)

- **โจทย์:** เขียนโปรแกรมที่มี Traditional Style โดยภายใน `Main` มีการเรียก `Environment.CommandLine` เพื่อแสดงคำสั่งที่ใช้รันโปรแกรม โดย **ห้าม** เลื่อนกลับไปดูตัวอย่างด้านบน

## 🗣️ ทบทวน (Review)

::: details ❓ คำถามทบทวนความเข้าใจ

**คำถาม 1:** ทำไม .NET ถึงต้องมี Entry Point เพียง 1 จุด?
**แนวคำตอบ:** เพราะ Runtime ต้องรู้ว่าจะเริ่มรันโค้ดจากไหน ถ้ามีหลาย Entry Point .NET จะไม่รู้ว่าจะเริ่มจากตัวไหน จึงเป็น Error ทันที

**คำถาม 2:** `namespace` ในโปรแกรม C# มีประโยชน์อะไร?
**แนวคำตอบ:** ใช้จัดกลุ่ม Classes เพื่อหลีกเลี่ยงการชนกันของชื่อ (Name Collision) เช่น ถ้า 2 library มี class ชื่อ `Logger` เหมือนกัน namespace ช่วยแยกแยะว่าใช้ `Logger` ของใคร
:::
