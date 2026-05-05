# เฉลย: Methods Basics (พื้นฐานเมธอดและกฎ DRY)

## 🎯 เฉลย Mini Exercise

### **โจทย์ที่ 1: การสะกดคำผิด (Method Call Syntax)**
**โจทย์ที่ให้มา:**
```csharp
class Program
{
    static void draw_Line() // จุดผิดที่ 1
    {
        Console.WriteLine("==================");
    }

    static void Main(string[] args)
    {
        draw_Line; // จุดผิดที่ 2
        Console.WriteLine("ข้อมูลรายงาน");
        Draw_line(); // จุดผิดที่ 3
    }
}
```

**การวิเคราะห์และการแก้ปัญหา:**
นี่คือโจทย์คัดกรอง "ความเป๊ะ (Attention to detail)" ของโปรแกรมเมอร์ ภาษา C# เป็นภาษาที่มีกฎระเบียบเข้มงวดมาก (Strongly typed & Case-sensitive)

1. **จุดผิดที่ 1 (บรรทัดที่ 3):** `draw_Line` ฝ่าฝืนกฎ Naming Convention ของ Microsoft อย่างรุนแรง! ชื่อ Method ต้องเป็น `PascalCase` เสมอ (ตัวพิมพ์ใหญ่ทุกคำ) และห้ามมี Underscore (`_`) วิธีแก้คือเปลี่ยนเป็น `DrawLine`
2. **จุดผิดที่ 2 (บรรทัดที่ 10):** การเรียกใช้ Method โดยพิมพ์แค่ชื่อ `draw_Line;` ลอยๆ ถือเป็นการกระทำที่ผิดไวยากรณ์ คอมพิวเตอร์จะมองว่ามันเป็นแค่ "ตัวแปร" แต่หาไม่เจอ เพราะมันไม่มีวงเล็บ `()` เพื่อเป็นตัวกระตุ้น (Trigger) การทำงาน วิธีแก้คือต้องเติมวงเล็บเสมอ แม้จะไม่มี Parameter ก็ตาม
3. **จุดผิดที่ 3 (บรรทัดที่ 12):** การเรียก `Draw_line()` ตัวแอลพิมพ์เล็ก ถือว่าเป็นการเรียกหาฟังก์ชันที่ "ไม่มีตัวตนอยู่บนโลก" เพราะ C# ถือว่า `L` กับ `l` เป็นคนละตัวอักษรกันโดยสิ้นเชิง

**โค้ดที่ได้รับการผ่าตัด (Clean Code):**
```csharp
class Program
{
    // 1. แก้ไขชื่อให้ตรงมาตรฐาน PascalCase
    static void DrawLine() 
    {
        Console.WriteLine("==================");
    }

    static void Main(string[] args)
    {
        // 2. เติมวงเล็บ () เพื่อกระตุ้นการทำงาน
        DrawLine(); 
        Console.WriteLine("ข้อมูลรายงาน");
        
        // 3. สะกดชื่อให้ตรงกับต้นฉบับ 100% (Case-Sensitive)
        DrawLine(); 
    }
}
```

---

### **โจทย์ที่ 2: สถาปนิกจัดระเบียบห้อง (Code Refactoring)**
**เป้าหมาย:** นำโค้ดสปาเก็ตตี้ที่เขียนเรียงลงมาตรงๆ ไปแยกส่วนเป็นก้อนๆ (Modular)

**เฉลยและวิธีทำ:**
การ Refactor คือกระบวนการ "ปรับปรุงไส้ในของโค้ดให้สวยงามและอ่านง่ายขึ้น โดยที่ผลลัพธ์การรันโปรแกรมภายนอกต้องออกมาเหมือนเดิม 100%"

```csharp
class Program
{
    // 1. แยกส่วนการพิมพ์ชื่อ John ออกมาเป็น 1 Method
    static void PrintJohnInfo()
    {
        Console.WriteLine("ชื่อ: John");
        Console.WriteLine("นามสกุล: Doe");
        Console.WriteLine("----------------"); // แถมเส้นคั่นให้สวยขึ้น
    }

    // 2. แยกส่วนของ Jane ออกมาอีก 1 Method
    static void PrintJaneInfo()
    {
        Console.WriteLine("ชื่อ: Jane");
        Console.WriteLine("นามสกุล: Smith");
        Console.WriteLine("----------------");
    }

    // Main ของเราจะกลายเป็น "ศูนย์บัญชาการ" ที่สะอาดตาที่สุด
    static void Main(string[] args)
    {
        Console.WriteLine("กำลังเชื่อมต่อ Database...");
        Console.WriteLine("ดึงข้อมูลสำเร็จ\n");
        
        // สั่งให้หน่วยรบย่อยทำงาน
        PrintJohnInfo();
        PrintJaneInfo();
        
        Console.WriteLine("\nปิดการเชื่อมต่อ Database.");
    }
}
```

*เกร็ดความรู้:* ถ้าเราเรียนหัวข้อ Parameter ในเนื้อหาถัดไป เราจะไม่ต้องสร้าง Method แยกระหว่าง John กับ Jane เลย เราแค่สร้าง `PrintPersonInfo(string firstName, string lastName)` อันเดียว แล้วเรียกใช้แบบส่งข้อมูลเข้าไป โค้ดจะหดสั้นลงไปอีกมหาศาล!

---

## 🔥 เฉลย Challenge (โจทย์ท้าทายสุดโหด!)

**โจทย์: คอนเสิร์ตตัวอักษร (The ASCII Art Concert)**
สร้างโปรแกรมแสดงคอนเสิร์ตที่มีแอนิเมชั่น โดยการวาดรูป ASCII หลายรูปแยกเป็น Method แล้วสลับกันเรียกใช้

**กระบวนการคิด (The Architecture):**
เป้าหมายของโจทย์นี้ ไม่ใช่การวัดฝีมือวาดรูป ASCII แต่เพื่อสาธิตให้เห็นว่า **"Method ช่วยห่อหุ้มความซับซ้อน (Encapsulate Complexity)"** ได้อย่างไร 
ลองนึกภาพถ้าคุณเอา `Console.WriteLine` จำนวน 50 บรรทัดมาวางซ้อนกันใน `Main()` โค้ดคุณจะเละเทะจนหาลูปไม่เจอเลย การจับมันยัดใส่ Method แล้วตั้งชื่อให้มัน (เช่น `DrawGuitar()`) คือเวทมนตร์แห่งวงการซอฟต์แวร์

```csharp
using System;
using System.Threading; // บังคับต้อง using เพื่อใช้คำสั่งหน่วงเวลา (Sleep)

namespace AsciiConcert
{
    class Program
    {
        // --------------------------------------------------------
        // หน่วยศิลปกรรม (Art Assets Encapsulation)
        // --------------------------------------------------------
        static void DrawGuitar()
        {
            Console.WriteLine("🎸 กีตาร์โซโล่!!");
            Console.WriteLine("   .       .   ");
            Console.WriteLine("  | |     | |  ");
            Console.WriteLine("  | |     | |  ");
            Console.WriteLine(" [| |]   [| |] ");
            Console.WriteLine("  |_|     |_|  ");
        }

        static void DrawMic()
        {
            Console.WriteLine("🎤 นักร้องนำว้าก!!");
            Console.WriteLine("    _====_     ");
            Console.WriteLine("   ( O  O )    ");
            Console.WriteLine("    \\ __ /     ");
            Console.WriteLine("     |  |      ");
            Console.WriteLine("    [====]     ");
        }

        static void DrawDrums()
        {
            Console.WriteLine("🥁 มือกลองรัว!!");
            Console.WriteLine("   [____]      ");
            Console.WriteLine("   /    \\      ");
            Console.WriteLine("  |      |     ");
            Console.WriteLine("   \\____/      ");
        }

        // --------------------------------------------------------
        // ผู้กำกับเวที (The Stage Director)
        // --------------------------------------------------------
        static void Main(string[] args)
        {
            Console.WriteLine("ยินดีต้อนรับสู่ C# Rock Concert!");
            Console.WriteLine("คอนเสิร์ตกำลังจะเริ่มใน 3 วินาที...");
            Thread.Sleep(3000); // หน่วง 3 วิ

            // ลูปควบคุมคอนเสิร์ต (จำลองการเล่นโชว์ 4 จังหวะ)
            for (int beat = 1; beat <= 4; beat++)
            {
                // จังหวะที่ 1: โชว์กีตาร์
                Console.Clear(); // ล้างจอให้สะอาด
                Console.WriteLine($"[จังหวะที่ {beat}]");
                DrawGuitar();    // เรียกใช้งานภาพกีตาร์ (โค้ด 6 บรรทัด ถูกยุบเหลือบรรทัดเดียว)
                Thread.Sleep(800); // หยุดภาพไว้ให้คนดู 0.8 วิ

                // จังหวะที่ 2: โชว์ไมค์ร้อง
                Console.Clear();
                Console.WriteLine($"[จังหวะที่ {beat}]");
                DrawMic();
                Thread.Sleep(800);

                // จังหวะที่ 3: โชว์กลองชุด
                Console.Clear();
                Console.WriteLine($"[จังหวะที่ {beat}]");
                DrawDrums();
                Thread.Sleep(800);
            }

            Console.Clear();
            Console.WriteLine("🎉 จบคอนเสิร์ต! ขอบคุณทุกคนที่มาร่วมสนุก!");
        }
    }
}
```

**บทสรุปทางวิศวกรรม:**
การเขียนโค้ดแบบนี้ ทำให้คุณสามารถเพิ่มเครื่องดนตรีชิ้นที่ 4, 5, 6 ได้อย่างง่ายดาย โดยไม่กระทบกระเทือนโครงสร้างหลักของลูป `for` เลยแม้แต่น้อย (นี่คือหลักการ Open/Closed Principle ของ SOLID Design Pattern ที่คุณจะได้เรียนรู้ในอนาคต: "ระบบต้องเปิดรับการต่อเติม แต่ปิดกั้นการแก้ไขของเก่า")
