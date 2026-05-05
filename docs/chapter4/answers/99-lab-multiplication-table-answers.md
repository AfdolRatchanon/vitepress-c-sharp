# เฉลย Lab: Smart Multiplication Table (ระบบสูตรคูณอัจฉริยะ)

## 📝 เฉลยฉบับสมบูรณ์ (ครอบคลุมการจัดการ UX และภารกิจท้าทาย)

นี่คือ "Masterpiece" ของบทเรียนเรื่อง Loops ที่หลอมรวมเอาโครงสร้างควบคุมทั้งหมดในภาษา C# มาร้อยเรียงทำงานร่วมกันอย่างมีศิลปะ 

จุดที่ท้าทายที่สุดของ Lab นี้ คือการออกแบบ Logic ว่าจะพิมพ์แบบ "ทีละบรรทัดจากซ้ายไปขวา (Row-major order)" อย่างไร เพื่อให้หน้าจอออกมาเป็นคอลัมน์กว้างๆ (เช่น x1 ของทุกแม่ พิมพ์เสร็จแล้ว ค่อยขึ้นบรรทัดใหม่ไปทำ x2 ของทุกแม่) 

กรุณาศึกษาเทคนิค `PadRight(10)` และกระบวนการกักขัง User ให้อยู่ในกรอบอย่างละเอียดครับ

```csharp
using System;

namespace SmartMultiplicationTable
{
    class Program
    {
        static void Main(string[] args)
        {
            // ตัวแปรควบคุมลูปหลักของแอปพลิเคชัน (ถามว่าจะทำต่อไหม)
            string keepGoing = "";

            // ==========================================
            // [MAIN APP LOOP] คุมวงจรชีวิตของโปรแกรมทั้งหมด
            // ==========================================
            do
            {
                Console.Clear(); // ล้างหน้าจอทุกครั้งที่เปิดรอบบิลใหม่
                Console.WriteLine("===================================================");
                Console.WriteLine("     🧮 SMART MULTIPLICATION TABLE V.2 🧮     ");
                Console.WriteLine("             (Pro-Edition & Anti-Bug)              ");
                Console.WriteLine("===================================================\n");

                Console.WriteLine("[ตั้งค่าตารางสูตรคูณ]");

                // ==========================================
                // [INPUT VALIDATION 1] ดักจับแม่สูตรคูณเริ่มต้น
                // ==========================================
                int startMultiplier = 0;
                bool isStartValid = false;
                
                while (!isStartValid)
                {
                    Console.Write("กรุณาระบุแม่สูตรคูณเริ่มต้น (เลข 1 เป็นต้นไป): ");
                    string input = Console.ReadLine();

                    // พยายามแปลงร่างเป็นตัวเลข
                    if (int.TryParse(input, out startMultiplier) && startMultiplier > 0)
                    {
                        // ถ้าสำเร็จและค่ามากกว่า 0 ให้ปล่อยตัว!
                        isStartValid = true; 
                    }
                    else
                    {
                        Console.WriteLine("❌ ผิดพลาด: กรุณากรอกตัวเลขจำนวนเต็มที่มากกว่า 0 เท่านั้น\n");
                    }
                }

                // ==========================================
                // [INPUT VALIDATION 2] ดักจับแม่สูตรคูณสิ้นสุด
                // ==========================================
                int endMultiplier = 0;
                bool isEndValid = false;

                while (!isEndValid)
                {
                    Console.Write($"กรุณาระบุแม่สูตรคูณสิ้นสุด (ต้อง >= {startMultiplier}): ");
                    string input = Console.ReadLine();

                    if (int.TryParse(input, out endMultiplier) && endMultiplier >= startMultiplier)
                    {
                        isEndValid = true;
                    }
                    else
                    {
                        Console.WriteLine($"❌ ผิดพลาด: ตัวเลขต้องมากกว่าหรือเท่ากับ {startMultiplier} เสมอ\n");
                    }
                }

                // ==========================================
                // [UI HEADER] วาดหัวกระดาษตาราง
                // ==========================================
                Console.WriteLine("\n[ กำลังสร้างตารางสูตรคูณมหัศจรรย์... ]\n");
                Console.WriteLine(new string('-', 80)); // เทคนิคพิมพ์เส้นทึบ 80 ขีดโดยไม่ต้องนั่งเคาะ

                // ใช้ for เพื่อวาดชื่อหัวคอลัมน์ (แม่ 2, แม่ 3, ...)
                for (int m = startMultiplier; m <= endMultiplier; m++)
                {
                    // เทคนิคจัดหน้า: PadRight(12) บังคับให้ข้อความยาว 12 ตัวอักษรเสมอ (ถ้าไม่ถึงให้เติม Spacebar ต่อท้าย)
                    Console.Write($"แม่ {m}".PadRight(12));
                }
                Console.WriteLine(); // ขึ้นบรรทัดใหม่เมื่อเขียนหัวกระดาษเสร็จ
                Console.WriteLine(new string('-', 80));

                // ==========================================
                // [CORE ENGINE] มหากาพย์ Nested Loops 
                // ==========================================
                
                // ลูปชั้นนอก (Row): ควบคุมรอบตัวคูณด้านหลัง (วิ่ง x1 ถึง x12 เป็นมาตรฐาน)
                // หรือถ้าทำ ภารกิจท้าทายที่ 1 ก็ให้วิ่งเผื่อไปถึง x24 เลย
                for (int multiplierLine = 1; multiplierLine <= 24; multiplierLine++)
                {
                    // [ภารกิจท้าทายที่ 1: ข้ามเลขอาถรรพ์ 13]
                    // ถ้ามาถึงรอบคูณ x13 ให้กระโดดข้ามบรรทัดนี้ไปทำ x14 ทันที
                    if (multiplierLine == 13)
                    {
                        continue; 
                    }

                    // ลูปชั้นใน (Column): นำเอาแม่สูตรคูณมากางขยายในบรรทัดเดียวกัน
                    for (int m = startMultiplier; m <= endMultiplier; m++)
                    {
                        int result = m * multiplierLine;
                        string equation = $"{m}x{multiplierLine}={result}";

                        // [ภารกิจท้าทายที่ 2: ไฮไลต์สีให้เลขเบิ้ล ยกกำลังสอง]
                        if (m == multiplierLine)
                        {
                            Console.ForegroundColor = ConsoleColor.Green; // เปลี่ยนสีพู่กัน
                        }

                        // พิมพ์สมการ โดยบังคับความกว้างกล่องละ 12 ตัวอักษรให้เท่ากับหัวกระดาษ
                        Console.Write(equation.PadRight(12));

                        // พิมพ์เสร็จ รีเซ็ตสีกลับเป็นเหมือนเดิมให้เพื่อนข้างๆ ด้วย
                        Console.ResetColor();
                    }

                    // ลูปในวาดสมการครบทุกแม่ในแถวนี้แล้ว สั่งเคาะขึ้นบรรทัดใหม่
                    Console.WriteLine();
                }

                Console.WriteLine(new string('-', 80));

                // ==========================================
                // [APP EXIT GATE] ระบบถามใจผู้ใช้
                // ==========================================
                Console.WriteLine();
                Console.Write("ต้องการสร้างตารางใหม่หรือไม่? (Y/N): ");
                keepGoing = Console.ReadLine().ToUpper();

            } while (keepGoing == "Y");

            Console.WriteLine("\n[ ระบบปิดการทำงาน ขอบคุณที่ใช้บริการ! ]");
        }
    }
}
```

### 🧠 สรุปบทเรียนจาก Lab นี้ (The Architecture Review)
1. **การควบคุมมิติหน้าจอ Console:** ผู้คนมักจะติดภาพว่าลูปซ้อนลูป ต้องเอาตัวแปรชั้นนอกมาทำตัวหน้าสุดของสมการ (เช่นเอา `multiplierLine x m`) แต่ในงานสร้าง UI นั้น แกน Y (แถวแนวตั้ง) ต่างหากที่ต้องอยู่นอกสุด เพราะ Console นั้นพิมพ์ข้อความแล้วถอยกลับมาบรรทัดบนไม่ได้ มันถูกจำกัดให้ต้องไหลลงล่างเท่านั้น การออกแบบอัลกอริทึมจึงต้องมองล่วงหน้าเป็นบล็อกๆ (Row-by-Row rendering)
2. **การแยกส่วนความรับผิดชอบ (Separation of Concerns):** สังเกตว่าเราแยกลูปที่ใช้ทำ "Validation ดักจับ Input" ออกจากลูปที่ใช้ "วาดตาราง" อย่างชัดเจน การออกแบบระบบที่ดี โค้ดควรจะถูกแยกออกเป็นสัดส่วน (Block) ไม่นำไปขยำรวมกันจนกลายเป็นโค้ดสปาเก็ตตี้ 

**ถ้าคุณพิมพ์โค้ดเอง รันผ่าน และแก้ปัญหา PadRight ให้ตรงช่องได้อย่างสมมาตร... ขอแสดงความยินดีด้วย คุณได้ผ่านช่วงที่ปวดหัวที่สุดของการเรียนพื้นฐาน Programming (Procedural Logic) มาแล้วครับ บทต่อไปเราจะเริ่มก้าวเข้าสู่การสร้างนวัตกรรมที่แท้จริง!**
