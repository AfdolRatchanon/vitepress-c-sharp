# เฉลย: Method Overloading (ชื่อซ้ำ ทำงานต่าง)

## 🎯 เฉลย Mini Exercise

### **โจทย์ที่ 1: ลายเซ็นซ่อนเร้น (Signature Ambiguity)**
**โจทย์ถามว่า:**
1. `static void ProcessData(int a, double b)`
2. `static void ProcessData(double a, int b)`
สร้างแบบนี้ถูกไหม? แล้วถ้าเรียก `ProcessData(5, 10);` เกิดอะไรขึ้น?

**เฉลยและเบื้องหลังของ Compiler:**
การประกาศสร้างเมธอด 2 ตัวนี้ **"ถูกต้องตามกฎหมาย 100%"** เพราะคอมไพเลอร์มองว่าการเอา `int` ขึ้นก่อน `double` กับการเอา `double` ขึ้นก่อน `int` มันคือ "คนละแพทเทิร์น" กันอย่างชัดเจน (เหมือนบัตรประชาชนคนละสี)

แต่ความพินาศจะมาเยือนตอนที่คุณทะลึ่งเรียกใช้งานด้วยประโยค `ProcessData(5, 10);`
- ก้อนที่หนึ่ง เลข 5 เป็น `int` 
- ก้อนที่สอง เลข 10 เป็น `int`

ปัญหาคือ ภาษา C# มีระบบพยายามช่วยเหลือโปรแกรมเมอร์ (Implicit Casting) คือถ้ามันเห็นเราส่ง `int` ไปใส่กล่อง `double` มันจะช่วยแปลงร่างให้เป็น `5.0` หรือ `10.0` ให้อัตโนมัติ
พอมาถึงจังหวะนี้ คอมไพเลอร์ C# จะเกิดอาการ **"สับสนอย่างรุนแรง (Ambiguous Call)"** และโวยวาย Error ทันที เพราะมันเถียงกับตัวเองว่า:
- *"เอ... จะให้ฉันเอาเลข 10 แปลงเป็น 10.0 แล้วกระโดดไปเข้าเมธอดที่ 1 ดีไหม?"*
- *"เอ๊ะ หรือว่าจะให้ฉันเอาเลข 5 แปลงเป็น 5.0 แล้วกระโดดไปเข้าเมธอดที่ 2 ดีกว่า?"*

เมื่อมันหาข้อสรุปที่ "ฟันธงได้ 100%" ไม่ได้ มันจึงปฏิเสธการรันโปรแกรมเพื่อความปลอดภัย!
**วิธีแก้:** เราต้องระบุตัวตนให้ชัดเจนเวลาเรียกใช้ เช่น `ProcessData(5, 10.0);` (ยัดเยียดจุดทศนิยมเข้าไปให้มันรู้ตัวว่าต้องเข้าเมธอดที่ 1 แน่นอน)

---

### **โจทย์ที่ 2: ผู้เชี่ยวชาญการต่อสติง (The String Weaver)**
**เป้าหมาย:** สร้าง Overload จำนวน 3 ร่าง เพื่อรองรับข้อมูลที่โยนเข้ามาหลากหลายรูปแบบ

**เฉลยและวิธีทำ:**
โจทย์นี้ต้องการสอนให้เห็นว่า ลอจิกการทำงานข้างในเมธอดที่ใช้ชื่อเดียวกัน ไม่จำเป็นต้องเหมือนกันเลย (Polymorphism) เมธอดแรกอาจจะต่อข้อความเฉยๆ ส่วนเมธอดที่สามอาจจะเป็นคณิตศาสตร์บวกเลขแล้วค่อยแปลงร่าง

```csharp
using System;

class Program
{
    // ร่างที่ 1: รับ 2 ข้อความ เอามาชนกันดื้อๆ
    static string CombineData(string text1, string text2)
    {
        return text1 + text2;
    }

    // ร่างที่ 2: รับ 3 ข้อความ (Signature ไม่เหมือนร่างแรก เพราะจำนวน parameter ไม่เท่ากัน)
    // แล้วเอามาคั่นด้วยขีดล่าง
    static string CombineData(string text1, string text2, string text3)
    {
        return text1 + "_" + text2 + "_" + text3;
    }

    // ร่างที่ 3: รับตัวเลข 2 ตัว (Signature ไม่เหมือนสองร่างแรก เพราะ Data type เปลี่ยนไป!)
    static string CombineData(int num1, int num2)
    {
        // ทำลอจิกคณิตศาสตร์ก่อน
        int result = num1 + num2;
        
        // แปลงกลับเป็น String ตามที่หัวเมธอดสัญญาไว้
        return result.ToString(); 
    }

    static void Main()
    {
        Console.WriteLine(CombineData("Hello", "World"));       // วิ่งเข้าร่าง 1 -> HelloWorld
        Console.WriteLine(CombineData("A", "B", "C"));          // วิ่งเข้าร่าง 2 -> A_B_C
        Console.WriteLine(CombineData(100, 50));                // วิ่งเข้าร่าง 3 -> 150 (เป็นสติงนะ)
    }
}
```

---

## 🔥 เฉลย Challenge (บิลเงินสดอัจฉริยะ Smart Receipt Generator)

**เป้าหมาย:** สร้างกลุ่มเมธอด `PrintReceipt` จำนวน 3 ร่าง เพื่อรับมือกับสินค้าราคาเดียว, ขายส่ง, และสมาชิกลดราคา โดยแคชเชียร์จำชื่อแค่ชื่อเดียว!

**กระบวนการคิดและข้อควรระวัง (Architectural Design):**
นี่คือตัวอย่างสมบูรณ์แบบของการออกแบบ API ให้ "ทนทานและใช้งานง่าย" 
ถ้าเราสังเกตดีๆ การทำงานของทั้ง 3 ร่าง มันคือการวาดหน้าตาบิลเงินสด ซึ่งอาจจะมีการวาดเส้นประ หรือพิมพ์หัวกระดาษ... ถ้าเราไม่ระวัง โค้ดของเราอาจจะซ้ำซ้อนกันมาก (ผิดกฎ DRY) ดังนั้นในตัวอย่างลึกซึ้งข้างล่างนี้ ผมจะใช้วิธี **"ให้ Method Overload เรียกหากันเอง"** เพื่อลดการเขียนโค้ดซ้ำ!

```csharp
using System;

namespace ReceiptSystem
{
    class Program
    {
        // ----------------------------------------------------
        // ร่างที่ 1: โหมดปกติ (1 ชิ้น)
        // ----------------------------------------------------
        static void PrintReceipt(string productName, double price)
        {
            Console.WriteLine("==============================");
            Console.WriteLine($"[บิลเงินสด] สินค้า: {productName}");
            Console.WriteLine($"ราคา: {price:N2} บาท");
            Console.WriteLine("==============================\n");
        }

        // ----------------------------------------------------
        // ร่างที่ 2: โหมดขายส่ง (หลายชิ้น)
        // ----------------------------------------------------
        static void PrintReceipt(string productName, double price, int quantity)
        {
            double total = price * quantity;

            Console.WriteLine("==============================");
            Console.WriteLine($"[บิลเงินสด-ขายส่ง] สินค้า: {productName}");
            Console.WriteLine($"จำนวน: {quantity} ชิ้น (ชิ้นละ {price} บาท)");
            Console.WriteLine($"ราคาสุทธิ: {total:N2} บาท");
            Console.WriteLine("==============================\n");
        }

        // ----------------------------------------------------
        // ร่างที่ 3: โหมดสมาชิก VIP (มีส่วนลด)
        // สังเกตว่าพารามิเตอร์มี 4 ตัว (ครบถ้วนตามโจทย์)
        // ----------------------------------------------------
        static void PrintReceipt(string productName, double price, double discountPercent, string memberId)
        {
            // คำนวณราคาส่วนลด
            double discountAmount = price * (discountPercent / 100);
            double netPrice = price - discountAmount;

            Console.WriteLine("==============================");
            Console.WriteLine($"[บิล VIP] สมาชิกหมายเลข: {memberId}");
            Console.WriteLine($"สินค้า: {productName}");
            Console.WriteLine($"ราคาปกติ: {price:N2} บาท");
            Console.WriteLine($"ส่วนลด ({discountPercent}%): -{discountAmount:N2} บาท");
            Console.WriteLine($"ราคาสุทธิ: {netPrice:N2} บาท");
            Console.WriteLine("==============================\n");
        }

        static void Main(string[] args)
        {
            Console.WriteLine("🛒 ระบบแคชเชียร์เริ่มทำงาน...\n");

            // แคชเชียร์ยิงบาร์โค้ด แล้วพิมพ์แต่คำว่า PrintReceipt อย่างเดียว! (สวรรค์ชัดๆ)

            // 1. ลูกค้า A ซื้อน้ำเปล่าขวดเดียว
            PrintReceipt("น้ำเปล่า", 15.0);

            // 2. ลูกค้า B ซื้อมาม่า 5 ห่อ (ระบบสลับไปใช้ร่างที่ 2 อัตโนมัติ เพราะมี int พ่วงมา)
            PrintReceipt("บะหมี่กึ่งสำเร็จรูป", 6.0, 5);

            // 3. ลูกค้า VIP ซื้อทีวี ลด 10% (ระบบสลับไปร่างที่ 3 อัตโนมัติ)
            PrintReceipt("สมาร์ททีวี 55 นิ้ว", 15000.0, 10.0, "VIP-9945");
        }
    }
}
```

**สิ่งที่ได้เรียนรู้ (Takeaways):**
จินตนาการว่าถ้าไม่มีระบบ Overload คุณจะต้องตั้งชื่อเมธอดว่า `PrintNormalReceipt`, `PrintWholesaleReceipt`, `PrintVipReceipt` 
แล้วในหน้า `Main` แคชเชียร์จะต้องมานั่งเขียน `if-else` วุ่นวายเพื่อเลือกว่าจะเรียกเมธอดไหน นี่คือความงดงามของ Method Overloading ที่เปลี่ยนความซับซ้อนให้ไปซ่อนอยู่เบื้องหลังทั้งหมดครับ!
