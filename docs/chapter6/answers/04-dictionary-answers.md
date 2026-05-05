# เฉลย: `Dictionary<K,V>` (บัญชีหนังหมา)

## 🎯 เฉลย Mini Exercise

### **โจทย์ที่ 1: ตู้ล็อกเกอร์กุญแจผี**
**โค้ดเจ้าปัญหา:**
```csharp
prices.Add("Water", 10.0);
prices["Cola"] = 15.0;
prices.Add("Water", 12.0); // 💥 บรรทัดมรณะ
prices["Cola"] = 20.0;
```
**คำถาม:** โค้ดนี้แครชที่ไหน? และถ้ารอดมาได้ Cola ราคาเท่าไหร่?

**เฉลย:** 
- แครช 100% ที่บรรทัด **`prices.Add("Water", 12.0);`** (เกิดข้อผิดพลาด ArgumentException) 
- **ทำไมถึงแครช?:** คำสั่ง `.Add()` เป็นคำสั่งที่ "หยิ่งและเอาแต่ใจ" ถ้าคุณพยายาม Add ชื่อกุญแจที่ดันไปซ้ำกับคนที่มีอยู่แล้วในระบบ (ในที่นี้คือ Water) มันจะถีบตู้เซฟพังทลายทันที!
- **ถ้ารอดมาได้ โคล่าจะราคาเท่าไหร่?:** สมมติเราลบบรรทัดมรณะนั้นทิ้งไป โคล่าจะกลายเป็น **ราคา 20.0** ครับ! เพราะการเข้าถึงด้วยปีกกาแบบ `prices["Cola"] = ...` มันคือ "โหมดเทวดา (Overwrite Mode)" ถ้าไม่มีกุญแจนี้มันจะเสกขึ้นมาให้ใหม่ แต่ถ้ามีอยู่แล้ว มันจะเขียนทับของเก่าแบบนิ่มนวลที่สุดโดยไม่โวยวายอะไรเลย (ซึ่งปลอดภัยและแนะนำให้ใช้มากกว่า `.Add` มากๆ)

---

### **โจทย์ที่ 2: เครื่องนับคะแนนเสียงโหวต (The Election Counter)**
**เป้าหมาย:** สับข้อมูลรายชื่อที่ส่งเข้ามาซ้ำๆ ลงใน Dictionary เพื่อบวกแต้ม 1 ทีละครั้ง

**เฉลยและวิธีทำ:**
ลอจิกนี้สำคัญมาก มันเรียกว่ากระบวนการ **"Upsert (Update or Insert)"** ซึ่งเราต้องดักหน้าประตูก่อนไขตู้เซฟเสมอ

```csharp
using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        // สร้างข้อมูลจำลองที่มีรายชื่อซ้ำกันเพียบ
        string[] rawVotes = { "Bob", "Alice", "Bob", "Charlie", "Alice", "Alice" };

        // สร้างตู้เซฟรับผลคะแนน (Key=ชื่อคน, Value=แต้มโหวต)
        Dictionary<string, int> votesDict = new Dictionary<string, int>();

        // กวาดสายตานับคะแนนจากกล่องดิบ ทีละใบ
        foreach (string name in rawVotes)
        {
            // ดักหน้าประตู: ชื่อนี้อยู่ในตู้เซฟหรือยัง?
            if (votesDict.ContainsKey(name))
            {
                // ถ้าเคยมีแล้ว แสดงว่าเคยโหวตแล้ว -> เอาคะแนนเดิมมาบวกเพิ่ม 1
                votesDict[name] += 1;
            }
            else
            {
                // ถ้ายังไม่มี แสดงว่านี่คือบัตรโหวตใบแรกของเขา -> สร้างประวัติให้ใหม่ เริ่มที่แต้ม 1
                votesDict.Add(name, 1);
            }
        }

        // ปริ้นโชว์ผลการเลือกตั้ง
        Console.WriteLine("=== สรุปผลการโหวต ===");
        foreach (KeyValuePair<string, int> result in votesDict)
        {
            Console.WriteLine($"> {result.Key} ได้รับ {result.Value} เสียง");
        }
        // ผลลัพธ์: Bob 2 เสียง, Alice 3 เสียง, Charlie 1 เสียง
    }
}
```

---

## 🔥 เฉลย Challenge (เครื่องนับสถิติความถี่คำศัพท์ The Word Frequency Analyzer)

**เป้าหมาย:** เปลี่ยนประโยคยาวๆ ให้กลายเป็นสถิติแบบ Data Scientist

**กระบวนการคิดระดับสถาปนิก (Data Transformation Pipeline):**
โจทย์ข้อนี้ต่อยอดมาจาก Mini Exercise แทบจะ 100% เลยครับ! แค่เพิ่มกระบวนการ "สับประโยคยาวๆ ให้แตกออกเป็นเศษซาก (Array ของคำ)" ด้วยวิชา `Split(' ')` 

```csharp
using System;
using System.Collections.Generic;

namespace WordFrequencyAnalyzer
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("=== ระบบสืบสวนความถี่คำศัพท์ (Text Analyzer) ===\n");

            // 1. รับข้อมูลดิบ (Raw Data)
            string rawMessage = "apple banana apple orange banana apple";
            Console.WriteLine($"[ข้อความต้นฉบับ] {rawMessage}\n");

            // 2. กระบวนการสับชิ้นส่วน (Tokenization)
            // .Split(' ') จะไปไล่หาช่องว่างในประโยค แล้วเอามีดสับตัดเป็นคำๆ ยัดลง Array ให้เอง!
            string[] wordsArray = rawMessage.Split(' ');
            
            // ตอนนี้ wordsArray จะมีหน้าตาคือ: {"apple", "banana", "apple", "orange", "banana", "apple"}
            
            // 3. เตรียมตู้เซฟเก็บสถิติ
            Dictionary<string, int> wordFrequency = new Dictionary<string, int>();

            // 4. กระบวนการย่อยข้อมูลลงตู้เซฟ (Aggregation Pattern)
            foreach (string word in wordsArray)
            {
                // ลองพยายามล้วงกุญแจดู ถ้ามีกุญแจนั้นอยู่ในตู้แล้ว จะรีเทิร์น true
                if (wordFrequency.ContainsKey(word))
                {
                    // เอาของเก่ามาบวกเพิ่มไป 1
                    wordFrequency[word] += 1;
                }
                else
                {
                    // ถ้ามาครั้งแรก ก็สร้างกุญแจให้ใหม่แล้วใส่เลข 1 ลงไป
                    wordFrequency.Add(word, 1);
                }
            }

            // 5. รายงานผลสถิติ (Reporting)
            Console.WriteLine("--- สรุปสถิติความถี่ (Word Count) ---");
            foreach (KeyValuePair<string, int> stat in wordFrequency)
            {
                // ตกแต่งผลลัพธ์ให้เป็นรูปแท่งกราฟเท่ๆ โดยใช้ string constructor สร้างสัญลักษณ์ '*' เท่ากับจำนวน Value
                string barChart = new string('*', stat.Value);
                
                // ใช้ PadRight(10) เพื่อให้ชื่อคำศัพท์ถูกดันเว้นวรรคให้ตรงกันอย่างสวยงาม
                Console.WriteLine($"{stat.Key.PadRight(10)} : {stat.Value} ครั้ง [{barChart}]");
            }
        }
    }
}
```

**ผลลัพธ์บนหน้าจอ:**
```text
--- สรุปสถิติความถี่ (Word Count) ---
apple      : 3 ครั้ง [***]
banana     : 2 ครั้ง [**]
orange     : 1 ครั้ง [*]
```

**สิ่งที่ได้เรียนรู้จากบทนี้:**
โค้ดด้านบนนี้คือพื้นฐานที่ Google หรือ Search Engine ทั่วโลกใช้ในการจัดอันดับเว็บไซต์ (TF-IDF) รวมถึงเป็นก้าวแรกของการสอน AI ให้รู้จักภาษามนุษย์ (Natural Language Processing)! 
การแปลงข้อมูล Unstructured (ข้อความยาวๆ) ให้กลายเป็น Structured (Dictionary ที่นับจำนวน) คือทักษะคอขวดที่จะแบ่งแยกโปรแกรมเมอร์ธรรมดา กับโปรแกรมเมอร์สาย Data Engineer ออกจากกันครับ!
