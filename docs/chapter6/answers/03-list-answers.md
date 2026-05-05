# เฉลย: `List<T>` (โกดังยางยืด)

## 🎯 เฉลย Mini Exercise

### **โจทย์ที่ 1: แกะรอยความแตกต่าง**
**คำถาม:** ระหว่าง `new string[0]` กับ `new List<string>()` ถ้าเราพยายามเติมข้อมูลใส่ช่อง `[0]` ทั้งสองตัวจะระเบิดไหม และทำไม?
**เฉลย:** **ระเบิดแครชทั้งคู่ครับ! แต่ระเบิดด้วยสาเหตุทางสถาปัตยกรรมที่ต่างกัน:**
1. ฝั่ง Array: `names[0] = "John";` จะแครช เพราะคุณสร้างโกดังขนาด 0 ช่อง (เหมือนเทปูนหลอกๆ ไม่มีประตูกล่อง) พอคุณจะยัดของลงช่องเบอร์ 0 คอมมันเลยฟ้องว่า Array นี้แน่นไปหมดแล้ว!
2. ฝั่ง List: `nameList[0] = "John";` จะแครชเช่นกัน! แม้ List จะเป็นโกดังยางยืด แต่วิธีการยืดของมัน "คุณจะเอานิ้วไปดึงช่อง [0] แล้วยัดของไม่ได้!" กฎเหล็กของ List คือ **คุณต้องใช้คำสั่ง `.Add("John")` เท่านั้น!** เพื่อให้ระบบ AI หลังบ้านทำการดันขยายไซส์โกดังให้อัตโนมัติ แล้วมันถึงจะสร้างช่อง `[0]` มารองรับให้คุณครับ

---

### **โจทย์ที่ 2: เครื่องตัดเลขคู่ (Odd Filter)**
**เป้าหมาย:** สร้าง List เลข 1-10 แล้วไล่เตะ (Remove) เลขคู่ออกให้หมด

**เฉลยและเบื้องหลังกับดักหายนะ (The Forwards Remove Bug):**
นี่คือข้อผิดพลาดที่แม้แต่โปรแกรมเมอร์ซีเนียร์ก็เผลอทำพลาดบ่อยที่สุด!
ถ้าคุณเขียนลูป `for (int i=0; i<List.Count; i++)` แล้วสั่ง `.RemoveAt(i)` เมื่อเจอเลขคู่:
- รอบ i=1 (ชี้เลข 2) -> สั่งเตะ 2 ทิ้ง! ... ณ วินาทีนี้ ฐานข้อมูลจะสไลด์ตัวดูดเลข 3 ให้กระเถิบซ้ายมาอยู่ Index 1 แทน!
- พอจบรอบ ลูปจะขยับไป i=2 -> อ้าว! เลข 3 รอดตายเฉยเลย เพราะเราก้าวข้ามหัวมันไปแล้ว! (Skipping Element Bug)

**วิธีแก้ทางวิศวกรรม:** เราต้องกวาดล้าง **"จากข้างหลัง มาข้างหน้า"** (Reverse For Loop)
พอเราเตะตัวข้างหลังทิ้ง ข้อมูลที่ไหลเข้ามาแทนที่ จะเป็นข้อมูลส่วนท้ายที่เราตรวจสอบไปแล้ว ทำให้ไม่มีปัญหาการข้ามหัว!

```csharp
using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        List<int> numbers = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

        // 1. กระบวนการกวาดล้าง (ต้องเริ่มจาก Count-1 ถอยหลังกลับไป 0)
        // เพื่อป้องกันไม่ให้ข้อมูลสไลด์มาแทนที่แล้วสับสน Index
        for (int i = numbers.Count - 1; i >= 0; i--)
        {
            // ตรวจสอบเลขคู่ (หาร 2 ลงตัว)
            if (numbers[i] % 2 == 0)
            {
                // เตะมันทิ้ง! ข้อมูลด้านขวาจะสไลด์มาแทนที่ 
                // แต่ไม่เป็นไรเพราะเรากำลังเดินถอยหลังหนีไปทางซ้าย!
                numbers.RemoveAt(i);
            }
        }

        // 2. ปริ้นโชว์ผลลัพธ์
        Console.WriteLine("เลขที่รอดชีวิตจากการกวาดล้าง:");
        foreach (int n in numbers)
        {
            Console.Write(n + " "); // ควรจะเหลือ 1 3 5 7 9
        }
    }
}

// 💡 ทริคระดับพระเจ้า: ไมโครซอฟต์รู้ดีว่าลูปถอยหลังมันพิมพ์ยาก เค้าเลยสร้างคำสั่งลัดไว้ให้!
// โค้ดทั้งหมดข้างบน สามารถยุบเหลือบรรทัดเดียวได้คือ: 
// numbers.RemoveAll(n => n % 2 == 0); 
// (ซึ่งคุณจะได้เรียนสัญลักษณ์ "=>" นี้ในบท Lambda & Delegate ครับ!)
```

---

## 🔥 เฉลย Challenge (ระบบจัดการคิวงานสุดหิน The To-Do List Engine)

**เป้าหมาย:** สร้างโปรแกรมเมนูจัดการตารางงาน (Add, View, Remove) โดยใช้ `List<string>` เป็นแกนกลาง

**กระบวนการคิดระดับสถาปนิก (Architectural Design):**
โจทย์ข้อนี้เป็นการจำลองระบบ Database แบบย่อมๆ โปรแกรมนี้ต้องอึดถึกทน ต่อให้ผู้ใช้พิมพ์ตัวหนังสือขยะ หรือสั่งลบงานเบอร์ 99 ทั้งที่มีงานแค่ 2 ชิ้น โปรแกรมต้องเอาอยู่และไม่แครช!

```csharp
using System;
using System.Collections.Generic;

namespace ToDoListApp
{
    class Program
    {
        static void Main(string[] args)
        {
            // ฐานข้อมูลงาน (ยางยืด)
            List<string> tasks = new List<string>();

            // ลูปอมตะ ควบคุมเมนูโปรแกรม
            while (true)
            {
                Console.WriteLine("\n==============================");
                Console.WriteLine("       📝 TO-DO LIST");
                Console.WriteLine("==============================");
                Console.WriteLine("[1] เพิ่มงานใหม่ (Add)");
                Console.WriteLine("[2] ดูรายการงาน (View)");
                Console.WriteLine("[3] ติ๊กงานเสร็จแล้ว (Complete)");
                Console.WriteLine("[4] ออกจากโปรแกรม (Exit)");
                Console.WriteLine("------------------------------");
                Console.Write("กรุณาเลือกเมนู: ");
                
                string choice = Console.ReadLine();

                switch (choice)
                {
                    case "1": // ---------------- ADD ----------------
                        Console.Write("\n>> พิมพ์ชื่องานที่ต้องทำ: ");
                        string newTask = Console.ReadLine();
                        
                        tasks.Add(newTask); // ยัดลงท้าย List
                        
                        Console.ForegroundColor = ConsoleColor.Green;
                        Console.WriteLine("✅ เพิ่มงานสำเร็จ!");
                        Console.ResetColor();
                        break;

                    case "2": // ---------------- VIEW ----------------
                        Console.WriteLine("\n[รายการงานค้างทั้งหมด]");
                        
                        if (tasks.Count == 0)
                        {
                            Console.WriteLine(">> ว่างเปล่า! เยี่ยมมาก คุณเคลียร์งานหมดแล้ว!");
                        }
                        else
                        {
                            // เราใช้ for แทน foreach เพราะเราต้องพิมพ์ "ตัวเลขนำหน้า" ให้ผู้ใช้อ่าน
                            for (int i = 0; i < tasks.Count; i++)
                            {
                                // โชว์ i+1 เพราะคนทั่วไปไม่เข้าใจหรอกว่างานแรกคือเบอร์ 0
                                Console.WriteLine($"[{i + 1}] {tasks[i]}");
                            }
                        }
                        break;

                    case "3": // -------------- COMPLETE --------------
                        Console.Write("\n>> พิมพ์หมายเลขงานที่ทำเสร็จแล้ว: ");
                        string inputNumber = Console.ReadLine();

                        // พยายามแปลงข้อความเป็นตัวเลข
                        if (int.TryParse(inputNumber, out int taskNum))
                        {
                            // สำคัญมาก! ดักจับความเกรียนของผู้ใช้ (ป้อนเบอร์ 0 หรือเบอร์ที่เกินจำนวน)
                            if (taskNum >= 1 && taskNum <= tasks.Count)
                            {
                                // เอา taskNum - 1 กลับคืน เพื่อให้กลายเป็น Index คอมพิวเตอร์
                                int systemIndex = taskNum - 1;
                                
                                string removedName = tasks[systemIndex]; // แอบจำชื่อไว้เผื่อเอาไปปริ้น
                                tasks.RemoveAt(systemIndex); // สั่งประหารชีวิต
                                
                                Console.ForegroundColor = ConsoleColor.Green;
                                Console.WriteLine($"🎉 เก่งมาก! ลบงาน '{removedName}' ออกจากระบบแล้ว");
                                Console.ResetColor();
                            }
                            else
                            {
                                Console.ForegroundColor = ConsoleColor.Red;
                                Console.WriteLine("❌ ผิดพลาด: ไม่พบหมายเลขงานนี้ในระบบ");
                                Console.ResetColor();
                            }
                        }
                        else
                        {
                            Console.ForegroundColor = ConsoleColor.Red;
                            Console.WriteLine("❌ ผิดพลาด: กรุณากรอกเฉพาะตัวเลขเท่านั้น!");
                            Console.ResetColor();
                        }
                        break;

                    case "4": // ---------------- EXIT ----------------
                        Console.WriteLine("\nลาก่อน ขอให้เป็นวันที่โปรดักทีฟนะครับ!");
                        return; // เตะหลุดพ้นจากลูปอมตะ while(true) และปิด Main ทันที

                    default:
                        Console.WriteLine("\n❌ โปรดเลือกเมนูแค่ 1 - 4 เท่านั้น");
                        break;
                }
            }
        }
    }
}
```

**สิ่งที่น่าเรียนรู้จากโค้ดนี้:**
นี่คือกระบวนการพัฒนาซอฟต์แวร์ที่เรียกว่า **CRUD (Create, Read, Update, Delete)** 
ซึ่งเป็นแพทเทิร์นพื้นฐาน 90% ของแอปพลิเคชันบนโลก ไม่ว่าคุณจะไปเขียนเว็บ เขียนแอปมือถือ คุณหนีลูปนี้ไม่พ้นแน่นอนครับ!
