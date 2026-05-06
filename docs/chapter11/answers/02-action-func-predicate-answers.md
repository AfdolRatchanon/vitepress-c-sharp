# เฉลย: Action, Func & Predicate (สามทหารเสือสำเร็จรูป)

## 🎯 เฉลย Mini Exercise

### **โจทย์ที่ 1: วิเคราะห์สเปคทหารเสือ (Signature Matching)**
**เป้าหมาย:** ก้าวข้ามความสับสนในการเลือกใช้แม่พิมพ์ Delegate ให้ถูกต้องเป๊ะๆ!

**เฉลยคำตอบระดับสถาปนิก:**
1. `void Greet(string name)` 
   -> **คู่กับ `Action<string>`** (เห็น `void` ปุ๊บ โยนให้ Action เลย! รับ string 1 ตัว)
2. `string GetGreeting(string name)` 
   -> **คู่กับ `Func<string, string>`** (รับ string และคาย string ออกมา)
3. `bool IsValidEmail(string email)` 
   -> **คู่กับ `Predicate<string>`** (รับ string และคาย `bool` เพื่อพิพากษา... จริงๆ ใช้ `Func<string, bool>` ก็ได้ แต่ Predicate เท่และตรงสายกว่าครับ)
4. `int GenerateRandomCode()` 
   -> **คู่กับ `Func<int>`** (ไม่รับอะไรเลย แต่คาย int เสมอ จำไว้ว่าก้อนสุดท้ายในวงเล็บของ Func คือของที่ต้องคายออก (Return) เสมอครับ)

---

### **โจทย์ที่ 2: จุดจบของ Func (The Last Parameter)**
**เป้าหมาย:** สัมผัสความโหดร้ายและจุดตายที่มือใหม่มักจะเผลอมองข้ามเวลาใช้ `Func`

**เฉลย:**
จากโจทย์ `Func<int, double, string, bool> myFunc;`
- **รับพารามิเตอร์กี่ตัว?** รับ **3 ตัว** ครับ!
- **เรียงลำดับชนิดอะไรบ้าง?** เป็น `int`, `double`, และ `string` ตามลำดับ (ห้ามสลับที่เด็ดขาด!)
- **Return ชนิดอะไร?** ฟังก์ชันนี้จะต้องโยนค่า **`bool`** กลับออกมาเสมอครับ!
**กฎเหล็ก:** ทหารเสือ `Func` จะต้องเสียสละ "ห้องพักห้องสุดท้าย" ในวงเล็บเหลี่ยม ให้กับของที่จะต้องคายออก (Return Type) เสมอครับ! ดังนั้นถ้าวัดความยาวของพารามิเตอร์ที่รับเข้าไปจริงๆ ให้เอาของในวงเล็บเหลี่ยมไป ลบ 1 เสมอนะครับ!

---

## 🔥 เฉลย Challenge (โรงงานแปรรูปข้อความ The String Transformer)

**เป้าหมาย:** สัมผัสวิชาการสร้าง "ท่อข้อมูลไหลลื่น (Data Pipeline)" แบบเดียวกับที่มหาเวทย์ LINQ ใช้เบื้องหลัง! เราจะเอาตัวแปรฟังก์ชันมาต่อกันเป็นทอดๆ เพื่อแปรรูปข้อความแบบไม่พึ่งพา Class มารกหน้ากระดาษ

**กระบวนการคิดระดับสถาปนิก (Functional Composition):**
นี่คือการเปลี่ยนวิถีคิดจาก "เอา Data ไปหา Logic" กลายเป็น "เอา Logic โยนเข้าไปกระแทก Data"! คุณจะเห็นภาพชัดเลยว่า เราสามารถหยิบก้อนลอจิกต่างๆ มาวางเรียงต่อกันเป็นเลโก้ได้สวยงามแค่ไหน

```csharp
using System;

namespace FuncActionPipeline
{
    class Program
    {
        // =======================================================
        // เตรียมฟังก์ชันให้ตรงตามสเปค (ก้อนลอจิกดิบๆ)
        // =======================================================
        
        // 1. ตัดขอบและทำเป็นตัวเล็ก (รับ 1 คาย 1)
        static string CleanText(string raw) 
        {
            return raw.Trim().ToLower(); 
        }

        // 2. นับตัวอักษร (รับ string คายตัวเลข int)
        static int CountCharacters(string text)
        {
            return text.Length;
        }

        // 3. ปริ้นพร้อมตีกรอบ (รับ 1 แต่ไม่คายอะไรเลย -> void)
        static void PrintWithBox(string text)
        {
            Console.WriteLine("==================");
            Console.WriteLine(text);
            Console.WriteLine("==================");
        }

        // =======================================================
        // EXECUTION
        // =======================================================
        static void Main(string[] args)
        {
            Console.WriteLine("=== โรงงานแปรรูปข้อความ (Data Pipeline) ===\n");

            string rawText = "  hello WORLD  ";

            // 🌟 1. สร้างตัวแปรมารองรับลอจิก (ใช้ 3 ทหารเสือ!)
            
            // ทหารเสือ 1: คาย string
            Func<string, string> textCleaner = CleanText;
            
            // ทหารเสือ 2: คาย int
            Func<string, int> textCounter = CountCharacters;
            
            // ทหารเสือ 3: ไม่มีคาย (void)
            Action<string> boxPrinter = PrintWithBox;

            // 🌟 2. เข้าสู่กระบวนการผลิต! (โยนต่อกันเป็นทอดๆ)
            
            Console.WriteLine(">> เริ่มแปรรูปข้อมูล...");
            Console.WriteLine($"[ออริจินัล]: '{rawText}'");

            // ขั้นที่ 1: คลีนข้อความ
            string cleanResult = textCleaner(rawText);
            
            // ขั้นที่ 2: เอาของคลีนไปปริ้นโชว์
            boxPrinter(cleanResult);

            // ขั้นที่ 3: เอาของคลีนไปนับตัวอักษร
            int length = textCounter(cleanResult);
            Console.WriteLine($"\n>> วิเคราะห์สำเร็จ: ข้อความนี้มีความยาว {length} ตัวอักษร");

            /*
               ผลลัพธ์ที่ได้:
               >> เริ่มแปรรูปข้อมูล...
               [ออริจินัล]: '  hello WORLD  '
               ==================
               hello world
               ==================

               >> วิเคราะห์สำเร็จ: ข้อความนี้มีความยาว 11 ตัวอักษร
            */
        }
    }
}
```

**สิ่งที่ได้เรียนรู้ (Architecture Lesson):**
ถ้าเราเขียนโค้ดแบบนี้... วันนึงลูกค้าบอกว่า "ผมอยากเปลี่ยนวิธีนับตัวอักษรจังเลย ขอเป็นนับเฉพาะสระ (A E I O U) ได้ไหม?" 
คุณแทบจะไม่ต้องไปยุ่งกับโครงสร้างท่อส่งของใน Main เลยครับ! คุณแค่ไปเขียนฟังก์ชัน `CountVowels` ขึ้นมาใหม่ แล้วแก้บรรทัดเดียว: `Func<string, int> textCounter = CountVowels;` 
โค้ดท่อนที่เหลือก็จะไหลลื่นทำงานต่อไปได้หน้าตาเฉย! โคตรทรงพลังครับ!
