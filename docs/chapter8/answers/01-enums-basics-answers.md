# เฉลย: Enums Basics (กำจัดตัวเลขปริศนา)

## 🎯 เฉลย Mini Exercise

### **โจทย์ที่ 1: ระบบจัดการวันเกิด (The Weekday Logic)**
**เป้าหมาย:** ทำนายผลลัพธ์ของ `Console.WriteLine((Days)5);`

**เฉลย:**
ผลลัพธ์บนหน้าจอคือคำว่า **`Fri`** ครับ!
**เหตุผลระดับสถาปัตยกรรม:** เมื่อเราสร้าง `enum Days { Sun, Mon, Tue, Wed, Thu, Fri, Sat }` โดยไม่ใส่เลขกำกับ (`= 1`) ให้มัน... คอมไพเลอร์ของ C# จะทำหน้าที่แสนรู้ โดยเริ่มแจกบัตรคิวให้ตั้งแต่หมายเลข **0** เรียงไปเรื่อยๆ โดยอัตโนมัติ (Sun=0, Mon=1, Tue=2, Wed=3, Thu=4, Fri=5)
ดังนั้นการเอาเลข 5 มา Cast คืนกลับไป มันจึงไปตกที่ช่อง Fri พอดีเป๊ะครับ!

---

### **โจทย์ที่ 2: นักล้างตัวเลขปริศนา (The Refactoring)**
**เป้าหมาย:** รื้อโค้ดขยะที่ใช้ `int enemyType = 2;` ให้กลายเป็นระบบ Enum ที่สะอาดสะอ้าน

**เฉลยและวิธีทำ:**
นี่คืองานประจำวันของซีเนียร์เดฟเลยครับ! การเปลี่ยนตัวเลขปริศนา (Magic Numbers) ให้กลายเป็นภาษาคน
```csharp
using System;

// 1. สร้างคลังศัพท์เฉพาะทาง (Domain Vocabulary)
enum Enemy 
{ 
    Slime, 
    Goblin, 
    Dragon 
}

class Program 
{
    static void Main() 
    {
        // 2. เลิกใช้ int หันมาใช้ Enum สวยๆ
        Enemy currentEnemy = Enemy.Dragon; 

        // 3. ใช้ชื่อ Enum มาทำเงื่อนไข อ่านง่ายดุจนิยายภาษาอังกฤษ!
        if (currentEnemy == Enemy.Dragon) 
        {
            Console.WriteLine("มังกรพ่นไฟ!");
        }
    }
}
```

---

## 🔥 เฉลย Challenge (ระบบจัดการสัญญาณไฟจราจรอัจฉริยะ The Traffic Light Transition)

**เป้าหมาย:** สร้าง Finite State Machine แบบอมตะที่กระพริบเปลี่ยนสีไฟจราจรวนลูปไปเรื่อยๆ (แดง -> เขียว -> เหลือง -> แดง)

**กระบวนการคิดระดับสถาปนิก (State Machine Logic):**
หัวใจของ State Machine คือระบบ "สวิตช์รางรถไฟ" 
ทุกครั้งที่รถไฟ (ลูป) วิ่งเข้ามา มันจะถูกสับรางไปทำงานตามสถานะปัจจุบัน และ **"กฎเหล็กคือ: ก่อนออกจากห้อง ต้องปรับสถานะตัวเองให้กลายเป็นสเต็ปถัดไปเสมอ"** เพื่อให้การวิ่งรอบหน้า รถไฟจะถูกสับไปรางใหม่แบบอัตโนมัติ!

```csharp
using System;
using System.Threading; // โค้ดลับสำหรับการหน่วงเวลา (Thread.Sleep)

namespace TrafficLightSystem
{
    // 1. นิยามสถานะทั้งหมดที่เป็นไปได้ (The States)
    enum TrafficLight 
    { 
        Red, 
        Yellow, 
        Green 
    }

    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("=== ระบบไฟจราจร AI (Finite State Machine) ===\n");
            Console.WriteLine("กด Ctrl+C เพื่อหยุดการทำงาน...\n");

            // 2. ตั้งค่าสถานะเริ่มต้น
            TrafficLight currentLight = TrafficLight.Red;

            // 3. ปล่อยลูปอมตะ (Infinite Game Loop)
            while (true)
            {
                // 4. สับสวิตช์ตรวจสอบสถานะปัจจุบัน
                switch (currentLight)
                {
                    case TrafficLight.Red:
                        Console.ForegroundColor = ConsoleColor.Red;
                        Console.WriteLine("[หยุด] ไฟแดง! ห้ามรถทุกคันผ่าน");
                        Console.ResetColor();
                        
                        // 🌟 หัวใจสำคัญ: ส่งไม้ผลัด (Transition) ให้สเตตัสถัดไป!
                        currentLight = TrafficLight.Green; 
                        break;

                    case TrafficLight.Green:
                        Console.ForegroundColor = ConsoleColor.Green;
                        Console.WriteLine("[ไปได้] ไฟเขียว! ปล่อยรถวิ่งฉลุย");
                        Console.ResetColor();
                        
                        currentLight = TrafficLight.Yellow; 
                        break;

                    case TrafficLight.Yellow:
                        Console.ForegroundColor = ConsoleColor.Yellow;
                        Console.WriteLine("[ระวัง] ไฟเหลือง! เตรียมเหยียบเบรก");
                        Console.ResetColor();
                        
                        currentLight = TrafficLight.Red; // วนลูปกลับไปจุดเริ่มต้น!
                        break;
                }

                // 5. เวทมนตร์หน่วงเวลา 1 วินาที (1000 มิลลิวินาที)
                // เพื่อให้ตาคนมองเห็นการกระพริบ (ถ้าไม่ใส่ คอมพิวเตอร์จะวิ่งล้านรอบใน 1 วินาที!)
                Thread.Sleep(1000);
            }
        }
    }
}
```

**สิ่งที่ได้เรียนรู้ (Architecture Lesson):**
นี่คือแกนกลาง (Core Loop) ของโปรแกรมมิ่งแบบดั้งเดิมเลยครับ! 
ในเกม Super Mario:
- สถานะ Walk -> เจอศัตรู -> เปลี่ยนสถานะเป็น Die
- สถานะ Jump -> เจอเห็ด -> เปลี่ยนสถานะเป็น Grow
การเอา Enum มาคุม State ทำให้เราวาดไดอะแกรมการทำงานในสมอง (Flowchart) ออกมาเป็นโค้ดได้อย่างสมบูรณ์แบบและไร้ข้อบกพร่องครับ!
