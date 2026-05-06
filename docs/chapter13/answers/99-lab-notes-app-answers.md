# เฉลย Lab: สร้างสมุดโน้ตส่วนตัว (The Notes App)

## 📝 เฉลยฉบับสมบูรณ์ (ครอบคลุมบอสลับ CSV Parsing)

นี่คือหนึ่งในโค้ดที่ดีที่สุดของหลักสูตรนี้ครับ! มันคือการประกอบร่างของศาสตร์ **N-Tier Architecture (แยกเลเยอร์)** ควบคู่ไปกับการทำ **Exception Mapping** คือให้หลังบ้านโยนระเบิด (Throw) และให้หน้าบ้านเป็นคนรับหน้าปริ้นข้อความ (Catch) นี่คือมาตรฐาน 100% ที่ใช้ทำโปรเจกต์ระดับโลกครับ!

```csharp
using System;
using System.IO; // ต้องมีเสมอเมื่อเล่นกับไฟล์!

namespace NotesAppLab
{
    // ========================================================
    // 1. DATA ACCESS LAYER (หลังบ้าน: ตัวจัดการไฟล์ล้วนๆ)
    // - ห้ามมี Console.WriteLine ด่าผู้ใช้อยู่ในนี้เด็ดขาด!
    // - ถ้ามีปัญหา ให้โยนระเบิด (Exception) ไล่ตะเพิดกลับไป!
    // ========================================================
    class NoteManager
    {
        // ใช้ Relative Path เพื่อให้ไฟล์เกิดติดกับตัวโปรแกรม
        private readonly string _filePath = "my_notes_db.txt";

        // ภารกิจ 1: เติมโน้ตลงไฟล์
        public void AddNote(string message)
        {
            // ประกอบร่างเวลา
            string timestamp = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
            string formattedNote = $"{timestamp}|{message}"; // 🌟 บอสลับ: ใช้ตัว | คั่น!

            try 
            {
                // กางตาข่าย using เพื่อคืนแรม + ใช้โหมด append: true ต่อท้าย!
                using (StreamWriter writer = new StreamWriter(_filePath, append: true))
                {
                    writer.WriteLine(formattedNote);
                } // 🌟 Flush และ Dispose จะถูกเรียกตรงนี้อัตโนมัติ 100%
            }
            catch (Exception ex)
            {
                // ถ้ายุ่งกับไฟล์แล้วพัง (เช่น ดาต้าเบสโดนล็อก) โยนระเบิดแพ็กเกจใหม่กลับไปให้หน้าบ้าน!
                throw new Exception($"บันทึกไม่สำเร็จ ฮาร์ดดิสก์พัง: {ex.Message}");
            }
        }

        // ภารกิจ 2: โหลดข้อมูลทั้งหมด (พร้อมสับแยกส่วน)
        public string[] ReadAllNotes()
        {
            // ด่านสกัด: ถ้ายังไม่มีไฟล์ ให้โยนระเบิดเลย อย่าฝืนเปิด!
            if (!File.Exists(_filePath))
            {
                throw new FileNotFoundException("สมุดว่างเปล่า! คุณยังไม่เคยจดอะไรเลย!");
            }

            try
            {
                // สถาปนิกแอบใช้ทางลัด ReadAllLines ได้เลย เพราะแอปบันทึกเราไฟล์คงไม่ใหญ่ถึง 100GB หรอกมั้ง!
                return File.ReadAllLines(_filePath);
            }
            catch (Exception ex)
            {
                throw new Exception($"อุปสรรคขัดขวางการอ่าน: {ex.Message}");
            }
        }

        // ภารกิจ 3: ล้างป่าช้า
        public void ClearNotes()
        {
            try
            {
                if (File.Exists(_filePath))
                {
                    File.Delete(_filePath);
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"ลบไฟล์ไม่ได้ สงสัยมีผีสิง: {ex.Message}");
            }
        }
    }

    // ========================================================
    // 2. PRESENTATION LAYER (หน้าบ้าน: ปฏิสัมพันธ์กับมนุษย์)
    // - ทำหน้าที่จับตาข่ายรับระเบิด (catch) แล้วปริ้นสีสวยๆ อธิบายผู้ใช้
    // ========================================================
    class Program
    {
        static void Main(string[] args)
        {
            NoteManager db = new NoteManager(); // เสกฐานข้อมูลหลังบ้าน

            while (true) // ลูปนรก หน้าจอหลัก
            {
                Console.WriteLine("\n================================================");
                Console.WriteLine("       📓 [ SYSTEM: My Personal Diary ] 📓      ");
                Console.WriteLine("================================================");
                Console.WriteLine("[1] 📝 เขียนโน้ตใหม่");
                Console.WriteLine("[2] 📖 อ่านโน้ตทั้งหมด (วิชาสับข้อความ)");
                Console.WriteLine("[3] 🗑️ ล้างสมุดโน้ต");
                Console.WriteLine("[4] ❌ ออกจากโปรแกรม");

                Console.Write("\n>> เลือกเมนู (1-4): ");
                string choice = Console.ReadLine();

                Console.WriteLine(); // เคาะบรรทัด

                // 🌟 โคตรตาข่ายนิรภัยครอบจักรวาล: กันหน้าบ้านแครช 100%
                try
                {
                    switch (choice)
                    {
                        case "1":
                            Console.Write("✍️ พิมพ์โน้ตของคุณ: ");
                            string newNote = Console.ReadLine();
                            db.AddNote(newNote); // ส่งให้หลังบ้านจัดการ
                            Console.ForegroundColor = ConsoleColor.Green;
                            Console.WriteLine("✅ [ระบบ]: บันทึกข้อความลงฮาร์ดดิสก์เรียบร้อย!");
                            break;

                        case "2":
                            // โหลดลิสต์ข้อความดิบๆ มาจากหลังบ้าน
                            string[] rawNotes = db.ReadAllNotes();
                            
                            Console.WriteLine("===== 📖 โน้ตทั้งหมดของคุณ =====");
                            
                            // 🌟 เฉลยบอสลับ: วิชาสับข้อความ (Parsing)
                            foreach (string rawLine in rawNotes)
                            {
                                // เอามีดอีโต้ฟันฉับ ตรงเครื่องหมายท่อ | 
                                // (กลายเป็น 2 ซีก: parts[0] คือเวลา, parts[1] คือข้อความ)
                                string[] parts = rawLine.Split('|');

                                // จัดโครงสร้าง UI ให้สวยงามระดับโลก!
                                if (parts.Length == 2)
                                {
                                    Console.ForegroundColor = ConsoleColor.Yellow;
                                    Console.Write($"[{parts[0]}] "); // เวลาสีเหลือง
                                    Console.ResetColor();
                                    Console.WriteLine(parts[1]); // ข้อความสีปกติ
                                }
                                else
                                {
                                    // เผื่อไฟล์บั๊ก พัง ก็ปริ้นดิบๆ โง่ๆ ไปเลย
                                    Console.WriteLine(rawLine);
                                }
                            }
                            Console.WriteLine("=============================");
                            break;

                        case "3":
                            Console.Write("⚠️ ยืนยันการลบทิ้งทั้งหมด? (y/n): ");
                            if (Console.ReadLine().ToLower() == "y")
                            {
                                db.ClearNotes();
                                Console.ForegroundColor = ConsoleColor.Green;
                                Console.WriteLine("✅ [ระบบ]: สมุดจดถูกทำลายล้างเรียบร้อย!");
                            }
                            break;

                        case "4":
                            Console.WriteLine("👋 บ๊ายบาย ขอให้วันนี้เป็นวันที่ดีนะ!");
                            return; // ตัดลูป จบโปรแกรม!

                        default:
                            Console.ForegroundColor = ConsoleColor.Red;
                            Console.WriteLine("❌ [ระบบ] ไม่พบเมนูนี้! กรุณาเพ่งตาดูเลข 1-4 ดีๆ!");
                            break;
                    }
                }
                // ==================================================
                // ด่านตักตวงระเบิดเฉพาะกิจ
                // ==================================================
                catch (FileNotFoundException ex)
                {
                    // ดักระเบิดที่โยนมาจาก ReadAllNotes
                    Console.ForegroundColor = ConsoleColor.Cyan;
                    Console.WriteLine($"🤷‍♂️ [ข้อมูล]: {ex.Message}");
                }
                // ด่านรับระเบิดทั่วไป 
                catch (Exception ex)
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine($"💥 [ระบบล่ม]: {ex.Message}");
                }

                Console.ResetColor(); // คืนสีปกติทุกครั้ง
                
                Console.WriteLine("\nกด Enter เพื่อกลับสู่เมนูหลัก...");
                Console.ReadLine();
                Console.Clear(); // ล้างจอให้สะอาดเอี่ยม
            }
        }
    }
}
```

### 🧠 บทสรุปวิชาสถาปัตยกรรม (Architectural Conclusion)

ยินดีด้วยครับ! แอปตัวนี้คือระบบ **"Full-Stack แบบบ้านๆ"** ที่สมบูรณ์แบบที่สุด!
- **Database:** Text File (เก็บข้อมูลแยกจาก RAM)
- **Backend (API):** `NoteManager` (ยัดลอจิก, ยิง Error กลับถ้าพัง)
- **Frontend (UI):** `Main` ลูป `switch-case` (รับคำสั่ง, แปะสี, สับข้อความจัดหน้าตาโชว์ผู้ใช้)

กระบวนทัศน์นี้ (การแยกสมองออกจากหน้าตา) จะติดตัวคุณไปตลอดกาล เมื่อคุณก้าวเข้าสู่การเขียนเว็บจริงๆ ด้วย ASP.NET Core MVC หรือ React โครงสร้างมันก็เป็นแบบนี้เป๊ะเลยครับ! ขอให้ภูมิใจในความพยายามของคุณครับ! 🚀
