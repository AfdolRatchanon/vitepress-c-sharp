# เฉลย: String Methods (เครื่องมือผ่าตัดข้อความ)

## 🎯 เฉลย Mini Exercise

### **โจทย์ที่ 1: การเปลี่ยนนามสกุลไฟล์ (File Extractor)**
**เป้าหมาย:** หาวิธีตรวจว่า `filename` นามสกุล `.jpg` หรือไม่ โดยต้องมองข้ามตัวพิมพ์เล็ก/ใหญ่

**เฉลย:**
1. **ท่ามาตรฐาน (Method Chaining):**
   ```csharp
   // เอาของเก่ามาแปลงเล็กก่อน แล้วค่อยเช็ค!
   bool isJpg = filename.ToLower().EndsWith(".jpg"); 
   ```
2. **ท่าสถาปนิกขั้นเทพ (StringComparison Enum):**
   ```csharp
   // ไม่ต้องสร้างขยะข้อความตัวเล็กเลย! สั่ง EndsWith แล้วเปิดโหมด "ละทิ้งอคติ (IgnoreCase)" 
   bool isJpgPro = filename.EndsWith(".jpg", StringComparison.OrdinalIgnoreCase);
   ```

---

### **โจทย์ที่ 2: ระบบเซ็นเซอร์คำหยาบ 18+ (Censorship)**
**เป้าหมาย:** สแกนหาคำว่า "บ้า" แล้วเปลี่ยนเป็น "***"

**เฉลยและวิธีทำ:**
กฎเหล็กคือ `Replace` มันไม่แก้ตัวแปรเดิมให้ เราต้องรับค่ามันกลับมาทับกล่องเก่าเสมอ!
```csharp
using System;

class Program
{
    static void Main()
    {
        string rawChat = "ไอ้คนบ้า แกมันบ้าที่สุดเลยว่ะ";
        
        // ผ่าตัดเซ็นเซอร์! (หาคำว่า "บ้า" ทุกจุด แล้วเสียบ "***" แทน)
        // อย่าลืม! ต้องเอาตัวแปร rawChat ฝั่งซ้ายมารับค่าที่ถูกคายออกมาด้วย!
        rawChat = rawChat.Replace("บ้า", "***");

        Console.WriteLine($"[ระบบคัดกรอง]: {rawChat}");
        // ผลลัพธ์: ไอ้คน*** แกมัน***ที่สุดเลยว่ะ
    }
}
```

---

## 🔥 เฉลย Challenge (นักประมวลผลโดเมน The Email Domain Extractor)

**เป้าหมาย:** ดูด Array ของข้อมูลอีเมลที่สกปรกสุดๆ แล้วสกัดเอามา "เฉพาะชื่อโดเมนหลังเครื่องหมาย @" ให้เป็นตัวพิมพ์เล็กล้วน

**กระบวนการคิดระดับสถาปนิก (Data Cleansing Pipeline):**
ข้อนี้เป็นการจำลองระบบ Extract-Transform-Load (ETL) ในงานวิเคราะห์ข้อมูล 
เราจะใช้กระบวนการ "สับดาบซามูไร (`Split`)" หั่นข้อความให้ขาดครึ่งกลางอากาศ ซึ่งมันทรงพลังและอ่านง่ายกว่าการพยายามเอามีดไปนั่งเล็งพิกัดหั่นท่อนกลาง (Substring) หลายล้านเท่าครับ!

```csharp
using System;

namespace EmailDomainExtractor
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("=== เครื่องจักรวิเคราะห์โดเมน (Analytics Engine) ===\n");

            string[] rawEmails = {
                "   admin@google.com  ",
                "HELLO@Yahoo.com",
                "ceo@MICROSOFT.com",
                "invalid_email_format" // ไวรัสตัวกวนประสาท
            };

            // วิ่งกวาดสายตาทีละข้อมูล
            foreach (string email in rawEmails)
            {
                // -----------------------------------------------------------
                // STEP 1: ล้างข้อมูล (Cleansing Pipeline)
                // -----------------------------------------------------------
                // ใช้กรรไกร (Trim) ตัดขอบ แล้วตามด้วยเครื่องกดอักษร (ToLower) ให้เตี้ยลง
                string cleanEmail = email.Trim().ToLower();

                // -----------------------------------------------------------
                // STEP 2: ตรวจสอบยามเฝ้าประตู (Guard Clause & Validation)
                // -----------------------------------------------------------
                // ถ้าไม่มี @ แปลว่านี่ไม่ใช่อีเมล!
                if (!cleanEmail.Contains("@"))
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine("> [Error] รูปแบบอีเมลไม่ถูกต้อง!");
                    Console.ResetColor();
                    
                    // ใช้ continue เพื่อ "เตะข้าม" ไปทำลูปรอบถัดไปทันที โค้ดด้านล่างจะไม่ถูกรัน!
                    continue; 
                }

                // -----------------------------------------------------------
                // STEP 3: ผ่าตัดสกัดโดเมน (The Extraction Algorithm)
                // -----------------------------------------------------------
                
                /* 
                 * ท่าไม้ตาย: ดาบซามูไร Split
                 * เราสั่งให้มันฟาดดาบลงไปตรงเครื่องหมาย '@'
                 * ประโยค "hello@yahoo.com" จะถูกหั่นขาดเป็น 2 ท่อน (กลายเป็น Array 2 ช่อง)
                 * ช่องที่ [0] คือชื่อหน้า (hello)
                 * ช่องที่ [1] คือโดเมน (yahoo.com) <-- นี่คือเป้าหมายของเรา!
                 */
                string[] emailParts = cleanEmail.Split('@');
                
                string targetDomain = emailParts[1]; // คว้ากล่องใบที่สองมาใช้เลย!

                Console.WriteLine($"> {targetDomain}");
            }
            
            // 💡 แถมนิดนึง: ถ้าจะเขียนแบบวิศวกรถึก (Substring) ต้องเขียนแบบนี้ครับ
            // int atPosition = cleanEmail.IndexOf('@');
            // string targetDomain = cleanEmail.Substring(atPosition + 1);
            // (คุณจะเห็นได้ชัดเจนว่า การใช้ Split อ่านโค้ดง่ายกว่าและมีโอกาสบั๊กน้อยกว่ามหาศาล!)
        }
    }
}
```

**สิ่งที่ได้เรียนรู้ (Algorithm Lesson):**
การเขียนโปรแกรมไม่ต่างจากการทำอาหาร! คุณต้องล้างวัตถุดิบ (`Trim`), หั่นวัตถุดิบ (`Split`), และคัดเอาของเสียทิ้ง (`Contains/@`) ก่อนที่จะเสิร์ฟจานสุดท้าย 
Method ต่างๆ ของคลาส String ถูกออกแบบมาเพื่อทำหน้าที่เหล่านี้ในบรรทัดเดียว จงใช้พวกมันต่อคิว (Chain) กันให้เกิดประโยชน์สูงสุดครับ!
