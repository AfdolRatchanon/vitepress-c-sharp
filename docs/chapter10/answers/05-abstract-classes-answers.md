# เฉลย: Abstract Classes (พิมพ์เขียววิญญาณ)

## 🎯 เฉลย Mini Exercise

### **โจทย์ที่ 1: คลาสครึ่งผีครึ่งคน (The Mixed State)**
**เป้าหมาย:** ทลายความเข้าใจผิดว่าคลาส Abstract ต้องว่างเปล่าเสมอ

**เฉลยคำตอบระดับสถาปนิก:**
คำกล่าวนั้น **ไม่จริงเลยครับ!**
คลาสที่ถูกระบุว่าเป็น `abstract class` สามารถ **"ผสม"** ระหว่างเมธอดที่มีไส้ในปกติสมบูรณ์ (คอยทำงานรับใช้ส่วนกลาง) และเมธอดวิญญาณว่างๆ `abstract` (โยนภาระให้ลูก) ไว้ด้วยกันในตึกเดียวกันได้อย่างอิสระเลยครับ!
(ดังที่โชว์ในตัวอย่าง `class Shape` มีทั้ง `PrintColor()` ที่ทำงานได้จริง และ `GetArea()` ที่กลายเป็นวิญญาณครับ)
*ข้อควรจำ: มีแต่โครงสร้างที่ชื่อว่า `Interface` เท่านั้น (ในบทอนาคต) ที่จะห้ามมีไส้ในเลยแบบ 100% กะโหลกล้วนๆ ครับ*

---

### **โจทย์ที่ 2: โซ่ตรวนที่ไม่สมบูรณ์ (The Unfinished Child)**
**เป้าหมาย:** สัมผัสความศักดิ์สิทธิ์ของคัมภีร์ Abstract ที่บังคับว่า "ลูกทุกคนต้องรับภาระ" ไม่งั้นอย่าเกิดมา

**เฉลย:**
คลาส `PdfDocument` จะโดนคอมไพเลอร์ **ตบหน้าแดงเถือก (Error)** ทันทีครับ!
**เหตุผล:** ในคลาสแม่มีระบุว่า `public abstract void Print();` ... เมื่อมันเป็นวิญญาณแล้ว ใครที่อ้างตัวว่าเป็นลูก (ใส่โคลอนสืบทอด) จะต้อง "จำยอมรับภาระกรรม" เขียน `override Print()` เติมปีกกาให้เสร็จเสมอ ห้ามหลีกหนี!

**วิธีหลบหนี (ถ้าดื้อ):**
ถ้าคุณยืนยันหัวเด็ดตีนขาดว่า "ฉันขี้เกียจเขียน Print โว้ย!"... ทางออกเดียวของคุณคือ... **คุณก็จงตายกลายเป็นวิญญาณตามแม่คุณไปซะ!**
```csharp
// แปะ abstract ส่งต่อความเป็นวิญญาณให้ตัวเอง
abstract class PdfDocument : Document {
    // โยนภาระ (สละสิทธิ์) ปล่อยให้คนที่สืบทอดจากฉันไปรับกรรมเขียนเอาเอง!
}
```

---

## 🔥 เฉลย Challenge (ระบบจัดการการแจ้งเตือน The Notification Factory)

**เป้าหมาย:** สร้างโครงสร้างตึกแบบ Plugin-Architecture! บังคับผู้สร้างช่องทางการสื่อสารใหม่ๆ (เช่น วันหน้าอาจจะมี Line หรือ Slack) ให้เขียนเมธอดการส่งข้อความอยู่ในกรอบกติกาเดียวกันเป๊ะๆ!

**กระบวนการคิดระดับสถาปนิก (Contract Enforcement):**
คลาส Abstract คือการ "เซ็นสัญญา (Contract)" ว่าใครก็ตามที่อยากจะเป็น Notification จะต้องมีพฤติกรรมรูปร่างหน้าตาเป็น `SendMessage` เหมือนกันหมดนะ! ทำให้ระบบส่วนกลางเรียกใช้ได้ง่ายมากๆ!

```csharp
using System;

namespace AbstractNotificationSystem
{
    // =======================================================
    // 1. ABSTRACT BASE CLASS (คัมภีร์วิญญาณแม่)
    // =======================================================
    abstract class Notification
    {
        public string Recipient { get; set; }

        public Notification(string recipient)
        {
            Recipient = recipient;
        }

        // 🌟 กฎหมายศักดิ์สิทธิ์: บังคับลูกทุกตัวให้รับจบไส้ในของฟังก์ชันนี้!
        public abstract void SendMessage(string content);
    }

    // =======================================================
    // 2. CONCRETE CLASS 1 (คลาสลูกสาย Email)
    // =======================================================
    class EmailNotification : Notification
    {
        // โยนชื่อผู้รับ (เช่น อีเมล xyz@gmail.com) โยนไปให้แม่จัดการเก็บไว้
        public EmailNotification(string r) : base(r) { }

        // 🌟 จำนนต่อกฎหมาย: ต้องมี override SendMessage!
        public override void SendMessage(string content)
        {
            Console.WriteLine($"📧 กำลังส่ง Email ไปที่ [{Recipient}]...");
            Console.WriteLine($"   -> หัวข้อข้อความ: {content}");
        }
    }

    // =======================================================
    // 3. CONCRETE CLASS 2 (คลาสลูกสาย SMS พร้อมด่านตรวจ)
    // =======================================================
    class SmsNotification : Notification
    {
        // โยนชื่อผู้รับ (เบอร์โทร 089xxxxxxx) ให้แม่จัดการ
        public SmsNotification(string r) : base(r) { }

        // 🌟 จำนนต่อกฎหมายเช่นกัน
        public override void SendMessage(string content)
        {
            // ดักจับ Business Logic ยิบย่อยเฉพาะตัวของ SMS
            if (content.Length > 20)
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine($"❌ ล้มเหลว! ข้อความ SMS ยาวเกินไป ({content.Length} ตัวอักษร) ส่งให้เบอร์ [{Recipient}] ไม่ได้!");
                Console.ResetColor();
            }
            else
            {
                Console.ForegroundColor = ConsoleColor.Green;
                Console.WriteLine($"📱 ยิง SMS ไปที่เบอร์ [{Recipient}] สำเร็จ! เนื้อหา: '{content}'");
                Console.ResetColor();
            }
        }
    }

    // =======================================================
    // EXECUTION
    // =======================================================
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("=== ระบบศูนย์กลางกระจายข่าวสาร (Notification Center) ===\n");

            // 1. เตรียมช่องทางการส่งแบบ Polymorphism (กล่องแม่ 1 ใบ เก็บลูกได้ทุกแบบ)
            Notification[] center = new Notification[2];
            
            center[0] = new EmailNotification("john.doe@enterprise.com");
            center[1] = new SmsNotification("0812345678");

            string msg = "ยินดีต้อนรับเข้าสู่ระบบจ้า!"; // ยาว 25 ตัวอักษร!

            Console.WriteLine($">> เตรียม Boardcast ข้อความ: '{msg}'\n");

            // 2. ลูปยิงข้อความ
            foreach (Notification n in center)
            {
                // C# จะดิ่งไปใช้ฟังก์ชันของ Email และ SMS แบบแยกกันชัดเจน (Late Binding)
                n.SendMessage(msg);
                Console.WriteLine("------------------------------------------");
            }

            // (สังเกตผลลัพธ์: อีเมลส่งผ่านสบายๆ แต่ SMS จะบึ้มเพราะความยาวเกิน 20 ตัวอักษร!)
        }
    }
}
```

**สิ่งที่ได้เรียนรู้ (Architecture Lesson):**
เห็นความต่างระหว่าง `virtual` กับ `abstract` หรือยังครับ?
ถ้าข้อนี้คุณตั้งให้แม่เป็นแค่ `virtual void SendMessage() { ... }` 
ลูกๆ อย่าง SMS หรือ Email... มันก็มีโอกาส "ลืม" เขียน `override` ครับ! (โปรแกรมเมอร์ขี้เกียจข้ามไปเลย) ทำให้พอสั่งรัน โค้ดมันก็จะกลายเป็นแค่ทำงานกากๆ ของคลาสแม่
แต่พอคุณแปะป้าย `abstract`... มันกลายเป็นการถือแส้เฆี่ยนตีให้โปรแกรมเมอร์ลูกน้อง **ต้องเขียนระบบยิง SMS ให้เสร็จ ไม่งั้นรันไม่ได้โว้ยยย!** นี่แหละครับระบบควบคุมมาตรฐานขั้นสูง!
