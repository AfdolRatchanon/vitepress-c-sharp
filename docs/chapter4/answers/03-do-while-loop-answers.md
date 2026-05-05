# เฉลย: The `do-while` loop (ทำก่อน ค่อยถามทีหลัง)

## 🎯 เฉลย Mini Exercise

### **โจทย์ที่ 1: แกะรอยบั๊กสุดคลาสสิก (Scope Trap)**
**โจทย์ที่ให้มา:**
```csharp
do
{
    Console.WriteLine("โยนเหรียญได้... หัว!");
    Console.Write("ต้องการเล่นอีกรอบหรือไม่? (Y/N): ");
    string answer = Console.ReadLine();

} while (answer == "Y"); // ❌ แถบแดงขึ้นตรงนี้
```

**การวิเคราะห์สาเหตุเชิงทฤษฎี (The Why):**
ปีกกา `{ }` ในภาษา C# เปรียบเสมือน "กำแพงบ้าน" หรือขอบเขตการมีชีวิตของตัวแปร (Variable Scope)
ในบรรทัดที่สั่ง `string answer = ...;` ตัวแปร `answer` ถือกำเนิดขึ้นมา "ภายในบ้าน (ปีกกาบล็อก do)" 
แต่พอคอมพิวเตอร์ประมวลผลมาเจอประตูปิด `}` กฎของ C# บังคับว่า "ของทุกอย่างที่สร้างในบ้านหลังนี้ ต้องถูกเผาทำลายทิ้งทันที เพื่อคืนพื้นที่หน่วยความจำให้ระบบ (Garbage Collection)" 

ดังนั้น เมื่อโปรแกรมวิ่งลงมาถึงบรรทัด `while (answer == "Y");` ซึ่งอยู่ "นอกบ้าน" คอมพิวเตอร์จึงมองไม่เห็นตัวแปร `answer` อีกต่อไป มันพยายามค้นหาตัวแปรที่ตายไปแล้ว จึงเกิด Error `does not exist in the current context`

**วิธีแก้ไข (The Fix):**
ต้องยกระดับอายุขัยของ `answer` ให้เป็นตัวแปรระดับ "นอกลูป" (Outer scope) โดยการประกาศสร้างกล่องเปล่าๆ รอไว้ก่อนที่ลูปจะเริ่มทำงาน

```csharp
// 1. ประกาศตัวแปรรับแรงกระแทกไว้นอกลูป
string answer; 

do
{
    Console.WriteLine("โยนเหรียญได้... หัว!");
    Console.Write("ต้องการเล่นอีกรอบหรือไม่? (Y/N): ");
    
    // 2. "ไม่ต้องใช้คำว่า string อีกรอบ" แค่เอาของไปใส่ในกล่องที่เตรียมไว้ก็พอ!
    answer = Console.ReadLine();

} while (answer == "Y"); // 3. ตรงนี้จะมองเห็นกล่อง answer เพราะอยู่ระดับเดียวกัน
```

---

### **โจทย์ที่ 2: ระบบยืนยันตัวตนคนดื้อ (Stubborn Captcha)**
**เป้าหมาย:** สร้างระบบบังคับกรอกรหัสยืนยัน "C#Rocks" ถ้ากรอกผิดก็ไม่ให้ออกไปไหน

**เฉลยและวิธีทำ:**
การใช้ `do-while` ถือว่าเหมาะสมกับระบบ CAPTCHA ที่สุด เพราะเราต้องการให้กล่องพิมพ์ข้อความ (Prompt) เด้งขึ้นมาโชว์ที่หน้าจอผู้ใช้ **ก่อน 1 ครั้งเสมอ** (เราไม่รู้หรอกว่ายูสเซอร์เป็นคนหรือบอท จนกว่าเค้าจะพยายามพิมพ์ครั้งแรก)

```csharp
Console.WriteLine("=== ระบบป้องกันบอท (Security CAPTCHA) ===");

string secretWord = "C#Rocks";
string userInput; // ประกาศไว้นอกลูปเพื่อแก้ปัญหา Scope Trap
int attempts = 0; // เพิ่มตัวนับรอบเล่นๆ ให้ดูสมจริง

do
{
    if (attempts > 0)
    {
        // ถ้ารอบแรกพิมพ์ผิด (attempts > 0) จะโชว์คำด่าเพื่อกระตุ้นผู้ใช้
        Console.WriteLine("❌ ปิ๊ปโป๊ะ! รหัสผิด กรุณาสังเกตตัวพิมพ์เล็กพิมพ์ใหญ่ด้วย!");
    }

    Console.Write($"กรุณาพิมพ์คำว่า {secretWord} เพื่อพิสูจน์ว่าคุณไม่ใช่บอท: ");
    userInput = Console.ReadLine();
    
    attempts++; // นับจำนวนครั้งที่พยายาม

// ลูปจะหมุนต่อไปเรื่อยๆ "ตราบใดที่สิ่งที่พิมพ์มา ไม่ตรงกับ (!=) รหัสลับ"
} while (userInput != secretWord); 

// ทะลุลงมาบรรทัดล่างนี้ได้ แปลว่าเงื่อนไขเป็น False แล้ว (นั่นคือพิมพ์ตรงเป๊ะ!)
Console.WriteLine("\n-------------------------------------------");
Console.WriteLine("✅ ยินดีต้อนรับ มนุษย์! คุณผ่านการทดสอบแล้ว");
Console.WriteLine($"คุณพยายามพิมพ์ไปทั้งหมด {attempts} ครั้ง");
```

---

## 🔥 เฉลย Challenge (เครื่องคิดเลขอัจฉริยะ The Resilient Calculator)

**โจทย์:** สร้างโปรแกรมเครื่องคิดเลขที่ใช้งานได้อย่างต่อเนื่อง โดยเอาเมนูครอบโปรแกรมไว้ด้วย `do-while`
**เฉลยฉบับสถาปัตยกรรมสมบูรณ์แบบ:**

การพัฒนาโปรแกรมประเภท Interactive Console Application จะมีแพทเทิร์นที่เป็น "กระดูกสันหลัง (Backbone)" ของระบบ คือการทำ "Main Application Loop" เพื่อควบคุมวงจรชีวิตแอปทั้งหมดตั้งแต่สตาร์ทจนถึงปิดตัว โค้ดด้านล่างนี้คือมาตรฐานอุตสาหกรรม

```csharp
using System;

namespace InteractiveCalculator
{
    class Program
    {
        static void Main(string[] args)
        {
            // ตัวแปรควบคุมวงจรชีวิตแอปพลิเคชัน (App Lifecycle State)
            string keepPlaying;

            // บล็อกคำสั่งการทำงานทั้งหมด ถูกหุ้มไว้ในลูปยักษ์ 1 วง
            do
            {
                // 1. เคลียร์หน้าจอทุกครั้งที่เริ่มรอบใหม่ (Clean UX)
                Console.Clear();
                Console.WriteLine("=================================");
                Console.WriteLine("  🧮 C# SUPER CALCULATOR V.1 🧮  ");
                Console.WriteLine("=================================");

                // 2. รับข้อมูล 3 ชิ้นตามข้อกำหนด
                Console.Write("[1] ป้อนตัวเลขตัวแรก: ");
                double num1 = double.Parse(Console.ReadLine());

                Console.Write("[2] ป้อนเครื่องหมาย (+, -, *, /): ");
                string operatorSymbol = Console.ReadLine();

                Console.Write("[3] ป้อนตัวเลขตัวที่สอง: ");
                double num2 = double.Parse(Console.ReadLine());

                // 3. กระบวนการคำนวณหลัก (Core Logic)
                double result = 0;
                bool isError = false; // ธงสำหรับดักจับข้อผิดพลาด

                switch (operatorSymbol)
                {
                    case "+": result = num1 + num2; break;
                    case "-": result = num1 - num2; break;
                    case "*": result = num1 * num2; break;
                    case "/":
                        // ดักจับเคสหารด้วยศูนย์! (สำคัญมาก)
                        if (num2 == 0)
                        {
                            Console.WriteLine("🚨 ข้อผิดพลาดระดับหายนะ: ในจักรวาลนี้ ห้ามหารด้วยศูนย์!");
                            isError = true;
                        }
                        else
                        {
                            result = num1 / num2;
                        }
                        break;
                    default:
                        Console.WriteLine("🚨 ข้อผิดพลาด: ไม่รู้จักเครื่องหมายคณิตศาสตร์นี้");
                        isError = true;
                        break;
                }

                // 4. แสดงผลลัพธ์ (ถ้าไม่มี Error)
                if (!isError)
                {
                    Console.WriteLine("---------------------------------");
                    Console.WriteLine($"✨ คำตอบ: {num1} {operatorSymbol} {num2} = {result:N2}");
                    Console.WriteLine("---------------------------------");
                }

                // 5. กลไกถามใจผู้ใช้ (Exit Prompt Mechanism)
                Console.WriteLine();
                Console.Write(">> ต้องการคำนวณรายการถัดไปหรือไม่? (Y/N): ");
                
                // ใช้ .ToUpper() ช่วยกรองข้อมูล เพื่อให้ผู้ใช้พิมพ์ 'y' เล็ก ก็ผ่านได้
                keepPlaying = Console.ReadLine().ToUpper();

            // 6. เช็คเงื่อนไขที่ขอบประตู
            // หมุนต่อตราบใดที่ตัวอักษรคือ "Y" (ถ้าพิมพ์อะไรก็ตามที่ไม่ใช่ Y โปรแกรมจะปิดตัวลงทันที)
            } while (keepPlaying == "Y"); 

            // สิ้นสุดการทำงาน
            Console.WriteLine("\n[ระบบปิดการทำงาน] ขอบคุณที่ใช้เครื่องคิดเลขของเรา ไว้พบกันใหม่!");
        }
    }
}
```

**ความรู้เสริม:**
การใช้ `Console.Clear();` บริเวณหัวสุดของ `do` ถือเป็นศิลปะการเขียน UX สำหรับ Console Application ที่สำคัญมาก ลองนึกภาพถ้าคุณคิดเลขติดกัน 50 ข้อ แล้วหน้าจอไม่ถูกเคลียร์ ข้อมูลทั้งหมดจะไหลเป็นน้ำตกลงมาจนหาอะไรไม่เจอ (Spaghetti Screen) การเคลียร์จอก่อนเริ่มลูปใหม่จะทำให้แอปของคุณดูน่าเชื่อถือและคล้ายโปรแกรมบน Windows จริงๆ มากขึ้น
