# เฉลย Lab: Student Grade Manager (ระบบจัดการเกรดนักเรียน)

## 📝 เฉลยฉบับสมบูรณ์ (ครอบคลุมภารกิจ Auto-Sorting Leaderboard)

นี่คือ "สถาปัตยกรรมระดับซอฟต์แวร์จริง" ที่ผสานโกดัง (List) เข้าไปซ่อนในตู้เซฟ (Dictionary) 
การสร้างแอปพลิเคชันแบบนี้ ต้องอาศัยทักษะการส่งผ่านตัวแปร (Pass-by-Reference) อย่างแม่นยำ เพื่อให้ `Main()` สะอาด และปล่อยให้ Method ต่างๆ รับภาระในการคว้านล้วงข้อมูล

โค้ดชุดนี้นำเสนอ ท่าไม้ตาย (LINQ) ในช่วงท้าย เพื่อเสกการเรียงลำดับตารางให้เสร็จภายใน 1 บรรทัด!

```csharp
using System;
using System.Collections.Generic;
using System.Linq; // จำเป็นมากสำหรับ Challenge การเรียงลำดับ!

namespace StudentGradeManager
{
    class Program
    {
        // ========================================================
        // [COMPONENT 1] ระบบลงทะเบียนนักเรียน (Register)
        // ========================================================
        static void RegisterStudent(Dictionary<string, List<double>> db)
        {
            Console.Write("\n>> กรุณากรอกชื่อนักเรียนใหม่: ");
            string name = Console.ReadLine();

            // ดักหน้าประตู: มีเด็กชื่อนี้หรือยัง?
            if (db.ContainsKey(name))
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine($"❌ ล้มเหลว: มีนักเรียนชื่อ '{name}' ในระบบแล้ว!");
                Console.ResetColor();
            }
            else
            {
                // สำคัญที่สุด!: เอาชื่อเป็นกุญแจ และเอา "ลิสต์ว่างๆ" ยัดใส่เป็นกล่องคะแนนให้เขา!
                // ถ้าคุณไม่ใส่ new List<double>() ทิ้งไว้ เวลา Add คะแนนมันจะแครช (NullReference) ทันที
                db.Add(name, new List<double>());
                
                Console.ForegroundColor = ConsoleColor.Green;
                Console.WriteLine($"✅ ลงทะเบียน '{name}' เข้าสู่ระบบสำเร็จ!");
                Console.ResetColor();
            }
        }

        // ========================================================
        // [COMPONENT 2] ระบบกรอกคะแนน (Insert Score)
        // ========================================================
        static void AddScore(Dictionary<string, List<double>> db)
        {
            Console.Write("\n>> กรุณากรอกชื่อนักเรียนที่ต้องการให้คะแนน: ");
            string name = Console.ReadLine();

            if (!db.ContainsKey(name)) // ใช้ ! เพื่อเช็คว่า "ถ้าไม่มี..."
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine($"❌ ล้มเหลว: ไม่พบข้อมูลของ '{name}' ในระบบ");
                Console.ResetColor();
                return; // เตะกลับไปเมนูหลักทันที
            }

            Console.Write($">> กรุณากรอกคะแนนที่จะบันทึกให้ {name}: ");
            if (double.TryParse(Console.ReadLine(), out double score))
            {
                // ----------------------------------------------------
                // MAGIC HAPPENS HERE!
                // db[name] จะคาย "กล่อง List" ออกมาให้เรา
                // แล้วเราก็เอา .Add(score) ยัดใส่ List นั้นต่อได้เลย ทะลุทะลวง 2 ชั้น!
                // ----------------------------------------------------
                db[name].Add(score);
                
                Console.ForegroundColor = ConsoleColor.Green;
                Console.WriteLine($"✅ บันทึกคะแนน {score} ให้ '{name}' สำเร็จ!");
                Console.ResetColor();
            }
            else
            {
                Console.WriteLine("❌ ผิดพลาด: กรุณากรอกคะแนนเป็นตัวเลขเท่านั้น");
            }
        }

        // ========================================================
        // [COMPONENT 3] ระบบจัดทำรายงานสรุปยอด (The Engine & The Challenge)
        // ========================================================
        static void ShowReport(Dictionary<string, List<double>> db)
        {
            Console.WriteLine("\n======================================");
            Console.WriteLine("       [ สรุปผลการเรียนทั้งหมด ]      ");
            Console.WriteLine("======================================");

            if (db.Count == 0)
            {
                Console.WriteLine(">> ยังไม่มีข้อมูลนักเรียนในระบบ");
                Console.WriteLine("--------------------------------------\n");
                return;
            }

            // ----------------------------------------------------
            // ภารกิจท้าทาย: จัดเรียงลำดับจากคนเก่งสุด (LINQ Magic)
            // ----------------------------------------------------
            // 1. db.OrderByDescending: สั่งให้ Dictionary จัดเรียงลำดับจากมากไปน้อย
            // 2. kvp => ... : คัดเลือกเป้าหมายที่จะเอามาเป็นเกณฑ์วัด (ในที่นี้คือค่าเฉลี่ยของเด็กคนนั้น)
            // หมายเหตุ: kvp.Value.Count > 0 ? kvp.Value.Average() : 0 
            // แปลว่า "ถ้าสอบไปแล้วหลายครั้ง ให้เอาค่าเฉลี่ยมาเป็นเกณฑ์, แต่ถ้ายังไม่เคยสอบ ให้ถือว่าเกรดคือ 0 ไปก่อน"
            var sortedLeaderboard = db.OrderByDescending(kvp => 
                kvp.Value.Count > 0 ? kvp.Value.Average() : 0
            );

            // กระบวนการกวาดข้อมูลแสดงผล (วิ่งผ่าน Leaderboard ที่ถูกเรียงแล้ว)
            foreach (KeyValuePair<string, List<double>> kvp in sortedLeaderboard)
            {
                string studentName = kvp.Key;
                List<double> scores = kvp.Value;

                // ประกอบร่างกล่องคะแนนโชว์หน้าจอ เช่น [ 70.0 | 85.5 ]
                string scoreListText = "[ ";
                foreach (double s in scores)
                {
                    scoreListText += $"{s} | ";
                }
                scoreListText += "]";

                // คำนวณค่าเฉลี่ย
                if (scores.Count == 0)
                {
                    // ยังไม่มีคะแนนเลยแม้แต่ช่องเดียว
                    Console.WriteLine($"🧑 {studentName} -> คะแนน: ยังไม่มีการสอบ | ค่าเฉลี่ย: N/A");
                }
                else
                {
                    // มีคะแนนแล้ว ก็ใช้ฟังก์ชัน .Average() ของไมโครซอฟต์ได้เลย (หาค่าเฉลี่ยให้อัตโนมัติ!)
                    // หรือจะเขียนลูปบวกเลข (Sum / Count) เองก็ได้ ไม่ผิดกติกา
                    double averageScore = scores.Average();
                    Console.WriteLine($"🧑 {studentName} -> คะแนน: {scoreListText} | ค่าเฉลี่ย: {averageScore:N2}");
                }
            }
            Console.WriteLine("--------------------------------------\n");
        }

        // ========================================================
        // [ENTRY POINT] ศูนย์บัญชาการใหญ่
        // ========================================================
        static void Main(string[] args)
        {
            // สร้างฐานข้อมูลหลักของโรงเรียน
            Dictionary<string, List<double>> schoolDatabase = new Dictionary<string, List<double>>();

            string keepRunning = "yes";

            while (keepRunning != "4")
            {
                Console.WriteLine("======================================");
                Console.WriteLine("     [ STUDENT GRADE MANAGER ]        ");
                Console.WriteLine("======================================");
                Console.WriteLine("[1] 📝 เพิ่มรายชื่อนักเรียนใหม่");
                Console.WriteLine("[2] ➕ กรอกคะแนนสอบให้นักเรียน");
                Console.WriteLine("[3] 📊 สรุปผลการเรียนทั้งหมด");
                Console.WriteLine("[4] ❌ ออกจากระบบ");
                Console.Write("กรุณาเลือกเมนู: ");

                keepRunning = Console.ReadLine();

                switch (keepRunning)
                {
                    case "1":
                        RegisterStudent(schoolDatabase);
                        break;
                    case "2":
                        AddScore(schoolDatabase);
                        break;
                    case "3":
                        ShowReport(schoolDatabase);
                        break;
                    case "4":
                        Console.WriteLine("\nปิดระบบจัดการเกรด! ขอให้เป็นวันที่ดีครับคุณครู");
                        break;
                    default:
                        Console.ForegroundColor = ConsoleColor.Red;
                        Console.WriteLine("\n❌ กรุณาเลือกเฉพาะ 1-4 เท่านั้น");
                        Console.ResetColor();
                        break;
                }

                // หยุดหน้าจอชั่วคราวให้ผู้ใช้อ่านข้อความก่อนจะวนลูปเคลียร์จอใหม่
                if (keepRunning != "4")
                {
                    Console.WriteLine("\n(กด Enter เพื่อกลับไปเมนูหลัก)");
                    Console.ReadLine();
                    Console.Clear();
                }
            }
        }
    }
}
```

### 🧠 บทสรุปวิชาสถาปัตยกรรม (Architectural Conclusion)

ยินดีด้วยครับ! การสร้างโค้ดชุดนี้คือเครื่องพิสูจน์ว่าคุณบรรลุวิชา **"Data Structure Composition (การประกอบร่างโครงสร้างข้อมูล)"** แล้ว 
โปรเจกต์ระดับองค์กร (Enterprise Application) มักจะมีโครงสร้างที่ซับซ้อนกว่านี้ เช่น `Dictionary<int, Dictionary<string, List<User>>>` (ตู้เซฟซ้อนตู้เซฟซ้อนโกดัง) แต่ถ้าคุณเข้าใจพื้นฐานการ "ไขกุญแจ และการเข้าถึงข้อมูลทีละชั้น" อย่างแม่นยำ คุณจะไม่มีวันหลงทางในรหัสโค้ดเหล่านั้นอย่างแน่นอน!
