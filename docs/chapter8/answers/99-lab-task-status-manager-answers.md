# เฉลย Lab: ระบบจัดการสถานะงานอัจฉริยะ (Task Status Manager)

## 📝 เฉลยฉบับสมบูรณ์ (ครอบคลุมภารกิจ Auto-Complete Parsing)

โค้ดชุดนี้คือเพชรยอดมงกุฎของบทที่ 8! มันผสมผสานทั้ง Enum, Struct, Array, `ref` Modifier และอัลกอริทึม State Transition เอาไว้ในที่เดียว ถ้าคุณเขียนและเข้าใจลอจิกบรรทัดต่อบรรทัดของโค้ดนี้ได้ แปลว่าคุณพร้อมที่จะเรียนต่อในเรื่องการเขียนโปรแกรมเชิงวัตถุ (OOP) ขั้นสูงในบทถัดไปแล้วครับ!

```csharp
using System;

namespace AgileTaskManager
{
    // ========================================================
    // 1. หมวดพิมพ์เขียวโครงสร้าง (Blueprint Definition)
    // ========================================================
    
    // สร้างพจนานุกรมคุมสเตตัส (กำจัด Magic Number 0, 1, 2)
    enum TaskState
    {
        Todo,
        Doing,
        Done
    }

    // สร้างกล่องสำหรับแพ็คงาน (Value Type)
    struct Ticket
    {
        public string Title;
        public TaskState State;
    }

    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("================================================");
            Console.WriteLine("          [ AGILE TASK MANAGER ]                ");
            Console.WriteLine("================================================\n");

            // ========================================================
            // 2. หมวดการจัดการข้อมูล (Data Population)
            // ========================================================
            // จองพื้นที่ Array สำหรับเก็บตั๋ว 3 ใบ
            Ticket[] board = new Ticket[3];

            // สร้างตั๋วยัดใส่แต่ละช่อง
            board[0] = new Ticket { Title = "ออกแบบ Database", State = TaskState.Todo };
            board[1] = new Ticket { Title = "เขียนหน้าเว็บ Login", State = TaskState.Doing };
            board[2] = new Ticket { Title = "ทดสอบระบบเซิร์ฟเวอร์", State = TaskState.Todo };

            // ปริ้นกระดานโชว์เจ้านาย (รอบแรก)
            Console.WriteLine("[ 📋 กระดานงานประจำวัน (ก่อนอัปเดต) ]");
            PrintBoard(board);
            Console.WriteLine();

            // ========================================================
            // 3. ปฏิบัติการเลื่อนสถานะ (The Iterative Transition)
            // ========================================================
            Console.WriteLine("[ ⚙️ ระบบกำลังรันสคริปต์อัปเดตสถานะงาน... ]");

            // วิ่งกวาดตั๋วทุกใบในกระดาน
            for (int i = 0; i < board.Length; i++)
            {
                Console.WriteLine($">> ดันงานที่ {i + 1} ไปข้างหน้า...");
                
                // 🌟 ทริคระดับสถาปนิก: บังคับโยน "ร่างต้นฉบับใน Array" ใส่ท่อ ref!
                // ถ้าไม่ใส่ ref ตรงนี้ งานในกระดานจะไม่ถูกขยับเลยแม้แต่มิลลิเมตรเดียว!
                AdvanceTask(ref board[i]); 
            }

            // ปริ้นกระดานรอบสอง (อัปเดตแล้ว)
            Console.WriteLine("\n================================================");
            Console.WriteLine("[ 📈 กระดานงานอัปเดตล่าสุด (หลังการประชุม) ]");
            PrintBoard(board);
            Console.WriteLine("================================================\n");


            // ========================================================
            // [ภารกิจท้าทาย] THE AUTO-COMPLETE PARSING (พิมพ์สั่งปิดงาน)
            // ========================================================
            Console.Write("ต้องการเปลี่ยนสถานะงานที่ 1 ใช่ไหม? พิมพ์ชื่อสถานะ (todo/doing/done): ");
            string userInput = Console.ReadLine();

            // 1. ใช้เครื่องจักรล่ามแปลภาษา Enum.TryParse
            // true = ละทิ้งความสนใจตัวพิมพ์เล็กใหญ่ (IgnoreCase)
            // out newState = เสกท่อรับของที่แปลสำเร็จออกมา
            if (Enum.TryParse(userInput, true, out TaskState newState))
            {
                // ถ้าแปลสำเร็จ (ผู้ใช้พิมพ์ศัพท์ตรงเป๊ะ) ให้ทับค่าในกระดานเลย!
                board[0].State = newState;
                
                Console.ForegroundColor = ConsoleColor.Green;
                Console.WriteLine($"\n✅ ปิดจ๊อบ! อัปเดตงานที่ 1 เป็นสถานะ '{newState}' เรียบร้อย!");
                Console.ResetColor();

                Console.WriteLine("\n[ 📊 สรุปกระดานแบบ Real-time ]");
                PrintBoard(board);
            }
            else
            {
                // ถ้าผู้ใช้พิมพ์เกรียนๆ เช่น "finish", "complete" มันแปลไม่ได้!
                if (!string.IsNullOrEmpty(userInput))
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine("❌ ล้มเหลว: ไม่รู้จักสถานะที่คุณพิมพ์มาในระบบ Agile ของเรา!");
                    Console.ResetColor();
                }
            }
        }

        // ========================================================
        // 4. หมวดการวาด UI (Rendering Engine)
        // ========================================================
        // สังเกตว่าพารามิเตอร์นี้ ไม่ต้องใช้ ref! เพราะเราเอามาแค่วนลูปปริ้นอ่านตาเปล่า (Read-only) 
        // ให้มันก๊อปปี้มาก็ไม่มีปัญหา ไม่ได้ไปแก้เลือดใคร!
        static void PrintBoard(Ticket[] tasks)
        {
            for (int i = 0; i < tasks.Length; i++)
            {
                // ผสมผสาน String Interpolation จัดหน้ากระดานให้เป๊ะ!
                // {Title, -25} หมายถึง ผลักชื่อเรื่องให้ชิดซ้ายกินพื้นที่ 25 ช่อง!
                Console.WriteLine($"Ticket {i + 1}: {tasks[i].Title, -25} [สถานะ: {tasks[i].State}]");
            }
        }

        // ========================================================
        // 5. ลอจิกการดันสถานะงาน (State Transition Engine)
        // ========================================================
        // นี่คือหัวใจหลัก: ต้องใช้ ref! เพื่อให้การแก้ไข t กระทบไปถึงต้นฉบับใน Array
        static void AdvanceTask(ref Ticket t)
        {
            switch (t.State)
            {
                case TaskState.Todo:
                    t.State = TaskState.Doing;
                    break;
                case TaskState.Doing:
                    t.State = TaskState.Done;
                    break;
                case TaskState.Done:
                    // เสร็จแล้วก็จบ ดันไปไหนต่อไม่ได้แล้ว ทำเฉยๆ
                    break;
            }
        }
    }
}
```

### 🧠 บทสรุปวิชาสถาปัตยกรรม (Architectural Conclusion)

โปรดสังเกตทักษะระดับสูงในโค้ดชุดนี้:
1. **การแยกหน้าที่ (Separation of Concerns):** คลาส `Program` ของคุณเริ่มฉลาดขึ้น มันไม่แบกโค้ดปริ้นตารางไว้ใน `Main` ซ้ำซ้อน แต่แยกตัวประกอบออกเป็น `PrintBoard` และ `AdvanceTask` อย่างชัดเจน นี่คือปรัชญา **DRY (Don't Repeat Yourself)** ที่โปรแกรมเมอร์ทุกคนต้องมี
2. **การปกป้องข้อมูลด้วย Enum:** การบังคับให้ Status เป็น Enum ทำให้ไม่มีวันเกิดบั๊กที่ Task มีสถานะติดลบ หรือเป็นข้อความเอเลี่ยนแปลกๆ ได้เลย 
3. **การคุมทิศทาง Memory (By-Value vs By-Ref):** คุณใช้ `ref` ในฟังก์ชัน `AdvanceTask` เพราะ **"ต้องการผ่าตัดแก้ไข"** แต่คุณตั้งใจไม่ใส่ `ref` ในฟังก์ชัน `PrintBoard` เพราะ **"แค่ต้องการปริ้นออกจอ ไม่อยากให้ใครแอบแก้ตัวเลขระหว่างทาง"** ... นี่แหละครับ คือสายตาของสถาปนิกซอฟต์แวร์ที่แท้จริง!
