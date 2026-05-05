# เฉลย Lab: Console Calculator (เครื่องคิดเลขโครงสร้างโมดูลาร์)

## 📝 เฉลยฉบับสมบูรณ์ (ครอบคลุมภารกิจ Multiple Out Parameters)

นี่คือหนึ่งในโค้ดตัวอย่างที่ดีที่สุดของการ "Refactor" (จัดระเบียบโค้ดใหม่) ซึ่งเป็นหัวใจสำคัญของการทำงานในบริษัทซอฟต์แวร์ระดับโลก คุณจะเห็นว่า `Main()` ของโปรแกรมนี้ ไม่มีทั้งการเอา String มาแปลงเป็นตัวเลข, ไม่มีการเช็คเงื่อนไข `+,-,*,/`, และไม่มีสมการคณิตศาสตร์หลงเหลืออยู่เลย!

ทุกอย่างถูกโยนเข้าไปซ่อนตัวใน "กล่องดำ (Blackbox Methods)" ที่แต่ละกล่องทำหน้าที่เป็นกรงขัง (Validator) หรือ เตาปฏิกรณ์ (Core Logic) ที่แยกส่วนความรับผิดชอบอย่างชัดเจน (Separation of Concerns)

```csharp
using System;

namespace ModularCalculator
{
    class Program
    {
        // ========================================================
        // [COMPONENT 1] ป้อมปราการคัดกรองตัวเลข
        // ดักจับคนพิมพ์ขยะ และคืนค่าเป็นตัวเลขที่สะอาด 100%
        // ========================================================
        static double GetValidNumber(string promptMessage)
        {
            // ลูปนรก สร้างไว้ขังคนพิมพ์ตัวอักษร
            while (true)
            {
                Console.Write(promptMessage);
                string input = Console.ReadLine();

                // ใช้ TryParse คืนความสำเร็จเป็น true/false และส่งผลลัพธ์ผ่านตัวแปร out 
                // (ใช้ Inline variable declaration ของ C# สมัยใหม่)
                if (double.TryParse(input, out double cleanNumber))
                {
                    // ถ้าแปลงสำเร็จ ให้ return ค่า เตะหลุดพ้นจากลูปนรกทันที
                    return cleanNumber; 
                }

                // ถ้าหลุดลงมาถึงตรงนี้ แปลว่า TryParse ล้มเหลว (คนพ่นขยะมา)
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("❌ ผิดพลาด: สิ่งที่คุณกรอกไม่ใช่ตัวเลข กรุณาลองใหม่!");
                Console.ResetColor();
            }
        }

        // ========================================================
        // [COMPONENT 2] ป้อมปราการคัดกรองเครื่องหมายคณิตศาสตร์
        // อนุญาตแค่ 4 สัญลักษณ์เท่านั้น 
        // ========================================================
        static string GetValidOperator()
        {
            while (true)
            {
                Console.Write("กรุณาระบุเครื่องหมาย (+, -, *, /): ");
                string op = Console.ReadLine();

                if (op == "+" || op == "-" || op == "*" || op == "/")
                {
                    return op;
                }

                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("❌ ผิดพลาด: ไม่รองรับเครื่องหมายนี้ กรุณาลองใหม่!");
                Console.ResetColor();
            }
        }

        // ========================================================
        // [COMPONENT 3] เตาปฏิกรณ์นิวเคลียร์ (คณิตศาสตร์ล้วนๆ ไม่มี UI ผสม)
        // รับค่าวัตถุดิบ 3 ตัว คายคำตอบออก 1 ตัว (ดักจับการหารศูนย์ด้วย NaN)
        // ========================================================
        static double CalculateCore(double n1, double n2, string op)
        {
            switch (op)
            {
                case "+": return n1 + n2;
                case "-": return n1 - n2;
                case "*": return n1 * n2;
                case "/":
                    // กฎเหล็กจักรวาล: ห้ามหารด้วยศูนย์!
                    if (n2 == 0)
                    {
                        // ท่าไม้ตาย: ส่งค่า Not-a-Number (NaN) กลับไปเป็นสัญญาณเตือนภัย
                        return double.NaN;
                    }
                    return n1 / n2;
                
                default: 
                    // โค้ดนี้ไม่น่าจะมีวันโดนเรียก เพราะป้อมปราการ 2 สกัดไว้แล้ว แต่ C# บังคับให้เขียน!
                    return 0; 
            }
        }

        // ========================================================
        // [CHALLENGE COMPONENT] ผู้ควบคุมระบบ (The Orchestrator)
        // รวม Component 1-2-3 เข้าด้วยกัน และคายของออก 2 อย่าง! (bool และ report out)
        // ========================================================
        static bool RunCalculation(out string finalReportText)
        {
            // 1. เรียกป้อมปราการ ถามเลขตัวที่ 1
            double num1 = GetValidNumber("กรุณาป้อนตัวเลขที่ 1: ");
            
            // 2. เรียกป้อมปราการ ถามเครื่องหมาย
            string opSymbol = GetValidOperator();
            
            // 3. เรียกป้อมปราการ ถามเลขตัวที่ 2
            double num2 = GetValidNumber("กรุณาป้อนตัวเลขที่ 2: ");

            Console.WriteLine("\n[กำลังประมวลผล...]");

            // 4. โยนของเข้าเตาปฏิกรณ์
            double result = CalculateCore(num1, num2, opSymbol);

            // 5. ตรวจสอบสภาพรังสี (การหารด้วย 0)
            if (double.IsNaN(result))
            {
                // บรรจุข้อความเตือนภัยลงกล่อง out
                finalReportText = "เกิดข้อผิดพลาดระดับหายนะ: จักรวาลไม่อนุญาตให้หารด้วยศูนย์!";
                return false; // คืนค่า false เพื่อบอก Main ว่าระบบล้มเหลว
            }

            // 6. กรณีทำงานสำเร็จด้วยดี 
            // บรรจุข้อความที่จัด Format สวยงามแล้ว ลงกล่อง out
            finalReportText = $"ผลลัพธ์: {num1} {opSymbol} {num2} = {result:N2}";
            return true; // คืนค่า true ให้ Main ดีใจ
        }

        // ========================================================
        // [ENTRY POINT] ศูนย์บัญชาการใหญ่ (The Main)
        // โค้ดสะอาดตาราวกับไม่มีอะไรอยู่ข้างใน แต่คุมระบบยักษ์ได้ทั้งหมด!
        // ========================================================
        static void Main(string[] args)
        {
            string keepPlaying = "";

            do
            {
                Console.Clear();
                Console.WriteLine("======================================");
                Console.WriteLine("    [ MODULAR CALCULATOR ENGINE ]     ");
                Console.WriteLine("======================================\n");

                // สั่งผู้ควบคุมระบบให้ทำงาน! (และแอบกางกล่องเปล่าๆ reportMessage รอรับของหล่นลงมา)
                bool isSuccess = RunCalculation(out string reportMessage);

                Console.WriteLine("--------------------------------------");
                
                // ตกแต่งสีให้รายงาน ขึ้นอยู่กับว่ามันพัง (false) หรือ รอด (true)
                if (isSuccess)
                {
                    Console.ForegroundColor = ConsoleColor.Green;
                    Console.WriteLine($"> {reportMessage}");
                }
                else
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine($"> 🚨 {reportMessage}");
                }
                Console.ResetColor();

                Console.WriteLine("--------------------------------------\n");

                // ลูป UI
                Console.Write("[กด Y เพื่อคำนวณต่อ หรือปุ่มอื่นเพื่อออก] : ");
                keepPlaying = Console.ReadLine().ToUpper();

            } while (keepPlaying == "Y");

            Console.WriteLine("\nลาก่อน! ขอบคุณที่ใช้บริการเครื่องคิดเลขอัจฉริยะ");
        }
    }
}
```

### 🧠 บทสรุปวิชาสถาปัตยกรรม (Architectural Conclusion)

นี่คือจุดตัดที่สำคัญที่สุดของคอร์สนี้! โปรแกรมเมอร์ทุกคนสามารถเขียนโค้ดเครื่องคิดเลขแบบยาวพืดใน Main ได้ แต่ **"สถาปนิกซอฟต์แวร์ (Software Architect)"** จะมองหาจังหวะในการหั่นโค้ดแยกชิ้นส่วนเสมอ:

1. **Reusability (นำกลับมาใช้ใหม่ได้):** ถ้าในอนาคตคุณจะทำระบบ "ตู้เซฟ" ที่ต้องกรอกรหัสผ่านเป็นตัวเลข คุณก็แค่เรียกใช้ฟังก์ชัน `GetValidNumber` ที่เราเขียนไว้แล้ว โดยไม่ต้องมานั่งเขียน `while` ดักจับ String ใหม่ให้ปวดหัว! 
2. **Testability (ทดสอบได้ง่าย):** การเขียน `CalculateCore` แยกออกมาให้คืนค่าเป็น `double` ล้วนๆ ทำให้คุณสามารถส่งมันไปเชื่อมกับเครื่องมือ "Automated Unit Testing" เพื่อยิงตัวเลขทดสอบบั๊ก 1,000 รูปแบบได้ภายในเสี้ยววินาที! (ถ้ามันมี `Console.ReadLine()` ฝังอยู่ข้างใน คุณจะไม่สามารถทำ Automation ได้เลย)

**ยินดีต้อนรับเข้าสู่โลกของการเขียนโค้ดระดับ Professional ครับ! ความเป็นสถาปนิกของคุณได้ถือกำเนิดขึ้นแล้ว!**
