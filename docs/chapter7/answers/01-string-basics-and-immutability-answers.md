# เฉลย: String Basics & Immutability (พื้นฐานและความตายตัว)

## 🎯 เฉลย Mini Exercise

### **โจทย์ที่ 1: การหลบหนีในเขาวงกต (Escape The Path)**
**เป้าหมาย:** เขียนประโยค `SELECT * FROM Users WHERE Name = "John" AND FilePath = "C:\Data\images"` ให้อยู่ในรูปแบบ Code ให้ถูกต้อง

**เฉลย:**
1. **แบบดั้งเดิม (หนีตายด้วย Backslash):**
   ```csharp
   // ต้องใส่ \ หน้า " และ \ หน้า \ เพื่อปิดสวิตช์เวทมนตร์ของคอมไพเลอร์
   string sqlNormal = "SELECT * FROM Users WHERE Name = \"John\" AND FilePath = \"C:\\Data\\images\"";
   ```
2. **แบบวิศวกร (ใช้ Verbatim `@`):**
   ```csharp
   // แปะ @ ไว้หน้าสุด... เครื่องหมาย \ จะกลายเป็นแค่ตัวอักษรโง่ๆ ทันที
   // แต่! กฎเหล็กของ @ คือ ถ้าอยากพิมพ์ฟันหนู 1 ตัว ต้อง "เบิ้ล 2 ตัว" ติดกัน!
   string sqlVerbatim = @"SELECT * FROM Users WHERE Name = ""John"" AND FilePath = ""C:\Data\images""";
   ```

---

### **โจทย์ที่ 2: เครื่องนับพื้นที่ว่าง (The Space Counter)**
**เป้าหมาย:** สแกนข้อความเพื่อหักล้างช่องว่างทั้งหมด

**เฉลยและวิธีทำ:**
ความลับของข้อนี้คือการมอง `string` ให้เป็น `char[]` (Array) 
จำไว้ว่าช่องว่าง ไม่ใช่ความว่างเปล่า แต่มันคือตัวอักษรพิเศษที่มีรหัส ASCII ของตัวเอง (32) ดังนั้นเราใช้ซิงเกิ้ลโควทจับมันได้เลย `' '`

```csharp
using System;

class Program
{
    static void Main()
    {
        string rawMessage = "Hello World Programming in C# ";
        int spaceCount = 0;

        // วิ่งลูปสแกนทีละตัวอักษร
        foreach (char letter in rawMessage)
        {
            // ถ้าตัวอักษรนั้นคือ "ช่องว่าง" (พิมพ์เว้นวรรค 1 ทีระหว่างซิงเกิ้ลโควท)
            if (letter == ' ')
            {
                spaceCount++;
            }
        }

        Console.WriteLine($"[ระบบวิเคราะห์] ตรวจพบช่องว่างทั้งหมด: {spaceCount} แห่ง");
        // ผลลัพธ์: 5 แห่ง
    }
}
```

---

## 🔥 เฉลย Challenge (การกลับหลังหันข้อความที่แท้จริง The True String Reversal)

**เป้าหมาย:** สลับหน้าหลังประโยค `"HELLO"` โดยห้ามใช้คำสั่ง `+` หรือ `+=` ต่อข้อความเด็ดขาด เพื่อป้องกันปัญหาแรมล้น (Garbage Accumulation)

**กระบวนการคิดระดับสถาปนิก (The Algorithm Logic):**
ถ้าเราเอาก้อน String มาต่อกัน มันจะเกิดกล่องขยะ 5 ใบ (`"O"`, `"OL"`, `"OLL"`...)
ดังนั้น เราจะทุบ String ก้อนใหญ่นี้ ให้แตกเป็น **"เศษซากตัวอักษร (Char Array)"** กองไว้บนพื้นก่อน (ใช้วิชา `.ToCharArray()`)
พอเป็น Array ปุ๊บ กฎของ Immutability ก็จะหายไป! เราสามารถเอื้อมมือไปสลับที่ของบนพื้นได้โดยตรง โดยไม่เกิดการสร้างกล่องข้อความใหม่แม้แต่ใบเดียว! (ประหยัดแรมทะลุจักรวาล)

```csharp
using System;

namespace TrueStringReversal
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("=== สุดยอดวิชาสลับร่างข้อความไร้ขยะ (Zero-Allocation Algorithm) ===\n");

            string originalWord = "HELLO_WORLD";
            Console.WriteLine($"[ก่อนสลับ] : {originalWord}");

            // -----------------------------------------------------------
            // 1. ทุบข้อความให้เป็นซาก Array (เพื่อหนีกฎ Immutability)
            // -----------------------------------------------------------
            char[] letters = originalWord.ToCharArray();
            // ตอนนี้เราได้กล่อง: ['H', 'E', 'L', 'L', 'O', '_', 'W', 'O', 'R', 'L', 'D']

            // -----------------------------------------------------------
            // 2. ใช้วิชา Two-Pointer สลับจากหัว-ท้าย เข้าหากึ่งกลาง (เรียนในบท 6)
            // -----------------------------------------------------------
            int length = letters.Length;

            // วิ่งแค่ "ครึ่งเดียว" พอ! ไม่งั้นมันจะสลับกลับมาเหมือนเดิม
            for (int i = 0; i < length / 2; i++)
            {
                // หาระยะกระจัดฝั่งตรงข้าม
                int oppositeIndex = (length - 1) - i;

                // สลับข้อมูลในกระบะทรายด้วยตัวแปร Temp
                // นี่คือการแก้ไข Array ดิบๆ จึงไม่เกิดขยะ String ในแรมเลย!
                char tempChar = letters[i];
                letters[i] = letters[oppositeIndex];
                letters[oppositeIndex] = tempChar;
            }

            // -----------------------------------------------------------
            // 3. ปั้นเศษซากอักษร กลับร่างขึ้นมาเป็น String ก้อนเดียว!
            // -----------------------------------------------------------
            // ใช้ Constructor ของคลาส String (new string(...)) มันจะรับ Char Array เข้าไปหลอมรวมทันที
            string reversedWord = new string(letters);

            Console.WriteLine($"[หลังสลับ] : {reversedWord}");
            // ผลลัพธ์: DLROW_OLLEH
        }
    }
}
```

**สิ่งที่ได้เรียนรู้ (Architecture Lesson):**
ถ้าคุณไปใช้ภาษา C (ตัวเก่าแก่) การจัดการข้อความทุกอย่างจะเป็น Array ของ Char ดิบๆ แบบนี้ทั้งหมด! C# สร้าง `string` ขึ้นมาครอบทับเพื่อให้เราเขียนโค้ดง่ายขึ้น แต่มันก็แลกมาด้วยความกินสเปค (Overhead) 
ในวันใดที่คุณต้องเขียนโค้ดคุมเกมเอนจิ้น หรือเขียนโปรแกรมประมวลผลบนเครื่อง IoT ที่มีแรมน้อยนิด... วิชาทุบเป็น Char Array แล้วสลับมือเปล่าแบบนี้แหละครับ คือวิชาที่จะช่วยเซฟชีวิตบริษัทคุณ!
