# เฉลย Lab: Text Processor (ระบบล้างข้อมูลดิบอัจฉริยะ)

## 📝 เฉลยฉบับสมบูรณ์ (ครอบคลุมภารกิจ Auto-Capitalizer)

นี่คือ "เตาปฏิกรณ์วิเคราะห์ข้อมูล (Data Processing Pipeline)" ที่สมบูรณ์แบบ มันรวบรวมวิชาตั้งแต่ Trim, Replace, Split พร้อมการเจาะลึก RemoveEmptyEntries และไขความลับขั้นสุดยอดของการปรับตัวพิมพ์ใหญ่เฉพาะหัวประโยค (Capitalization)

เตรียมใจให้พร้อม เพราะโค้ดชุดนี้คือสิ่งที่คุณต้องเจอในชีวิตจริงของการทำงานฝั่ง Back-End เสมอครับ!

```csharp
using System;
using System.Text; // อย่าลืมใส่ เพื่อเรียกใช้ StringBuilder

namespace TextProcessorLab
{
    class Program
    {
        static void Main(string[] args)
        {
            // ========================================================
            // [PIPELINE 1] การเตรียมวัตถุดิบดิบ (Data Ingestion)
            // ========================================================
            // ข้อความเน่าๆ ที่มีช่องว่างหน้าหลังเพียบ และพิมพ์ตัวเล็กขึ้นต้นประโยค
            string rawText = "   Hello world! this product is VERY bad.  i hate it so much. but the delivery was fast.   ";
            
            Console.WriteLine("================================================");
            Console.WriteLine("          [ TEXT PROCESSOR ENGINE ]             ");
            Console.WriteLine("================================================\n");
            Console.WriteLine("[กำลังทำงาน... ชำแหละและทำความสะอาด...]\n");

            // ล้างขอบขยะทิ้งซะ!
            string cleanText = rawText.Trim();

            // ========================================================
            // [PIPELINE 2] ระบบเซ็นเซอร์ (Censorship)
            // ========================================================
            // หาคำว่า bad แล้วสับเปลี่ยนด้วย *** 
            cleanText = cleanText.Replace("bad", "***");

            // ========================================================
            // [PIPELINE 3] เครื่องจักรสับสถิติ (Analytics Engine)
            // ========================================================
            // 3.1 การนับประโยค: ภาษาอังกฤษ 1 ประโยค มักจบด้วยจุด '.' 
            // ⚠️ ทริคระดับโปร: ใช้ StringSplitOptions.RemoveEmptyEntries 
            // เพื่อดักขยะ! เพราะถ้าข้อความจบด้วยจุด พอสับปุ๊บ มันจะได้กล่องเปล่าๆ ว่างๆ มาเป็นของแถม
            string[] sentences = cleanText.Split(new char[] { '.' }, StringSplitOptions.RemoveEmptyEntries);
            int sentenceCount = sentences.Length;

            // 3.2 การนับคำ: สับช่องว่างให้กระจุย!
            string[] words = cleanText.Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
            int wordCount = words.Length;

            // 3.3 ตรวจจับคำค้นหา (Keyword Detection)
            bool foundDelivery = cleanText.Contains("delivery");

            // ========================================================
            // [ภารกิจท้าทาย] THE AUTO-CAPITALIZER (ซ่อมไวยากรณ์)
            // ========================================================
            // เป้าหมาย: ไปไล่แก้ตัวอักษรแรกของทุกประโยคใน Array sentences ให้เป็นตัวใหญ่!
            
            for (int i = 0; i < sentences.Length; i++)
            {
                // ดึงประโยคเป้าหมายออกมา (มันอาจจะมีช่องว่างข้างหน้าติดมาด้วย ต้อง Trim ขัดให้เกลี้ยงก่อน)
                string currentSentence = sentences[i].Trim();

                if (currentSentence.Length > 0)
                {
                    // 1. ดึง "ตัวอักษรแรกสุด" ออกมาหั่นให้เป็นตัวใหญ่
                    string firstChar = currentSentence.Substring(0, 1).ToUpper();
                    
                    // 2. ดึง "ท่อนที่เหลือทั้งหมด (ตั้งแต่ตัวที่ 2 เป็นต้นไป)"
                    string theRest = currentSentence.Substring(1);
                    
                    // 3. ประกอบร่างใหม่!
                    sentences[i] = firstChar + theRest;
                }
            }

            // นำ Array ประโยคที่ซ่อมเสร็จแล้ว มาทากาวต่อกันใหม่ด้วยจุด (.)
            string finalPerfectText = string.Join(". ", sentences) + ".";

            // ========================================================
            // [PIPELINE 4] เตาอบรายงาน (Report Generator)
            // ========================================================
            // สร้างโกดัง StringBuilder เพื่อตีกรอบจัดหน้ารายงาน
            StringBuilder report = new StringBuilder();

            report.AppendLine("================================================");
            report.AppendLine("              [ DATA REPORT ]                   ");
            report.AppendLine("================================================");
            
            // ใช้ String Interpolation โยนค่าสถิติลงไป!
            report.AppendLine($"> จำนวนประโยคทั้งหมด: {sentenceCount} ประโยค");
            report.AppendLine($"> จำนวนคำทั้งหมด: {wordCount} คำ");
            report.AppendLine();
            
            report.AppendLine("[ เนื้อหาที่ผ่านการทำความสะอาด (Cleaned Text) ]");
            // วางประโยคที่ซ่อมเสร็จแล้วสมบูรณ์
            report.AppendLine(finalPerfectText);
            report.AppendLine();
            
            report.AppendLine("[ คำค้นหาสำคัญ (Keywords Found) ]");
            // ใช้ Ternary Operator เสกคำว่า ใช่/ไม่ใช่ (เหมือนที่เรียนในบทที่ 3)
            report.AppendLine($"- พบคำว่า 'delivery': {(foundDelivery ? "ใช่" : "ไม่ใช่")}");
            
            report.AppendLine("================================================");

            // -----------------------------------------------------------
            // THE FINALE: พ่นรายงานออกจอ!
            // -----------------------------------------------------------
            Console.WriteLine(report.ToString());
        }
    }
}
```

### 🧠 บทสรุปวิชาสถาปัตยกรรม (Architectural Conclusion)

โปรดสังเกตทักษะระดับสูงในโค้ดชุดนี้:
1. **การป้องกัน Null/Empty ด้วย Options:** การเรียกใช้ `StringSplitOptions.RemoveEmptyEntries` เป็นวัคซีนป้องกันบั๊กชั้นยอด เพราะข้อมูลดิบที่พิมพ์โดยมนุษย์ มักจะมีการกด Spacebar ค้าง หรือมีจุดไข่ปลา `...` ถ้าเราสับดื้อๆ เราจะได้ขยะล้น Array การใส่ Option นี้คือการสั่งคอมไพเลอร์ให้ "กรองเฉพาะเนื้อแท้" เท่านั้น!
2. **การซ่อมแซมจุดบกพร่อง (Self-Healing Logic):** ทริคการหั่น `.Substring(0, 1)` แล้วเอาไปประกอบร่างกับ `.Substring(1)` ถือเป็นแพทเทิร์นสุดคลาสสิกที่ใช้แก้ปัญหา Immutability ในทุกภาษาบนโลก
3. **Buffer Management:** การไม่ใช้ `Console.WriteLine()` พร่ำเพรื่อ แต่เก็บข้อมูลไว้ในโกดัง `report` ให้เสร็จสรรพ ทำให้ถ้าเจ้านายสั่งเปลี่ยนว่า "เอาออกเป็นไฟล์ PDF แทนหน้าจอนะ" คุณก็แค่เอาคำสั่ง `report.ToString()` ไปโยนใส่ระบบบันทึกไฟล์ (บทที่ 13) ได้เลย โดยไม่ต้องรื้อระบบคำนวณใหม่แม้แต่บรรทัดเดียว!
