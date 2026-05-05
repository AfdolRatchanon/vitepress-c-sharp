# Structs Basics (ประกอบร่างข้อมูล)

> 💡 **เป้าหมาย:** สวมวิญญาณสถาปนิกโครงสร้างข้อมูล! เรียนรู้วิธีเอาตัวแปรพื้นฐาน (`int`, `string`, `bool`) หลายๆ ตัวมา "แพ็คใส่กล่อง" รวมกันให้กลายเป็นชนิดข้อมูลชนิดใหม่ (Custom Data Type) เพื่อความสะอาด เป็นระเบียบ และการส่งผ่านข้อมูลที่ทรงพลัง

## 📖 ทฤษฎีและแนวคิดระดับลึก (In-Depth Theory & Concepts)

### 1. วิกฤติการโยนตัวแปร (The Parameter Soup)

สมมติคุณกำลังเขียนเกม และมี Method คำนวณระยะห่างระหว่างจุด 2 จุด (Point A ไป Point B)
ถ้าคุณใช้ความรู้เก่า คุณต้องประกาศตัวแปรยุ่บยั่บแบบนี้:
```csharp
// ต้องส่งพิกัด X, Y ถึง 4 ตัวแปร! โค้ดรกรุงรังและโอกาสส่งผิดตำแหน่งสูงมาก!
double CalculateDistance(int x1, int y1, int x2, int y2) { ... }
```
จะเกิดอะไรขึ้นถ้าเกมนี้เป็นเกม 3 มิติ (X,Y,Z)? คุณต้องเพิ่มพารามิเตอร์เป็น 6 ตัว! นี่คือฝันร้ายของการเขียนโค้ดที่เรียกว่า "Parameter Soup (ซุปตัวแปร)"

---

### 2. กำเนิด `struct` (Structure)

C# ให้เครื่องมือที่ชื่อว่า **`struct`** เพื่อแก้ปัญหานี้ มันคือวิชา "ประกอบร่าง"
คุณสามารถสร้างพิมพ์เขียว (Blueprint) ที่นิยามว่า "ชนิดข้อมูลที่ชื่อว่า `Point` ประกอบไปด้วย X และ Y นะ"

**ไวยากรณ์ (Syntax):**
- ประกาศ `struct` ไว้ข้างนอก Method แบบเดียวกับ `enum`
- ต้องมีคำว่า `public` นำหน้าตัวแปรข้างใน (เพื่อให้คนอื่นเอื้อมมือมาหยิบใช้ได้ เราเรียกมันว่า **Field**)

```csharp
// การสร้าง Data Type ของตัวเองชื่อ Point
struct Point
{
    public int X;
    public int Y;
}
```
เพียงเท่านี้ Method ของคุณก็จะสะอาดหมดจด: 
`double CalculateDistance(Point a, Point b) { ... }` (เห็นไหม! ยุบจาก 4 ตัวแปร เหลือแค่ 2 กล่องใหญ่!)

---

### 3. การสร้างก้อนข้อมูล (Instantiation) และเรียกใช้

เมื่อเรามีพิมพ์เขียว `Point` แล้ว เราสามารถเสกมันขึ้นมาใช้งานจริงได้ด้วยคำสั่ง `new`
```csharp
// 1. เสกกล่อง Point ขึ้นมา 1 ใบ ชื่อว่า p1
Point p1 = new Point();

// 2. เอื้อมมือเข้าไปยัดของใส่กล่อง (ใช้เครื่องหมายจุด . (Dot Access))
p1.X = 10;
p1.Y = 20;

// 3. เอื้อมมือเข้าไปดึงค่ามาปริ้น
Console.WriteLine($"พิกัดผู้เล่น: X={p1.X}, Y={p1.Y}");
```

---

## 💻 ตัวอย่างโค้ดเชิงลึก (In-Depth Implementation)

### ตัวอย่างที่ 1: ระบบจัดการพิกัด 2 มิติ (The Coordinate System)

มาดูกระบวนการประกอบร่างพิกัด เพื่อเอาไปคำนวณระยะทางกันแบบเต็มๆ ครับ

::: code-group
```csharp [Program.cs]
using System;

namespace StructCoordinate
{
    // 1. ประกาศพิมพ์เขียว (Blueprint)
    struct Point
    {
        public int X;
        public int Y;
    }

    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("=== ระบบแผนที่ 2 มิติ ===");

            // 2. สร้างจุดเริ่มต้น (เมืองหลวง)
            Point capital = new Point();
            capital.X = 0;
            capital.Y = 0;

            // 3. สร้างพิกัดผู้เล่น (ทริค! เราใช้ Object Initializer ยัดค่าพร้อมกันในบรรทัดเดียวได้)
            Point playerPos = new Point { X = 3, Y = 4 };

            Console.WriteLine($"[พิกัดเมืองหลวง] ({capital.X}, {capital.Y})");
            Console.WriteLine($"[พิกัดผู้เล่น]   ({playerPos.X}, {playerPos.Y})");

            // 4. โยน "กล่องพิกัด" ส่งให้ Method ทำงาน
            double distance = GetDistance(capital, playerPos);
            Console.WriteLine($"\n[Radar] ผู้เล่นอยู่ห่างจากเมืองหลวง: {distance} กิโลเมตร");
        }

        // Method นี้รับ "กล่อง Point" เข้ามาประมวลผล (โค้ดสะอาดกว่ารับ int 4 ตัวเยอะ!)
        static double GetDistance(Point a, Point b)
        {
            // ใช้ทฤษฎีบทพีทาโกรัส a^2 + b^2 = c^2 (เรียนคณิตมาเผื่อสิ่งนี้!)
            int deltaX = a.X - b.X;
            int deltaY = a.Y - b.Y;
            
            // ใช้ Math.Pow ยกกำลังสอง และ Math.Sqrt ถอดรูท
            double result = Math.Sqrt(Math.Pow(deltaX, 2) + Math.Pow(deltaY, 2));
            return result;
        }
    }
}
```
:::

---

### ตัวอย่างที่ 2: ผสาน Struct เข้ากับ Enum (Composite Structure)

ข้อมูลระดับองค์กรมักจะไม่ได้มีแค่ `int` หรือ `string` แต่มันคือการเอา Custom Data Type หลายๆ ตัวมาซ้อนกัน!

::: code-group
```csharp [Program.cs]
using System;

namespace CompositeStruct
{
    // 1. มี Enum สถานะ
    enum ItemRarity { Common, Rare, Epic, Legendary }

    // 2. สร้าง Struct ที่มี Enum เป็นไส้ใน!
    struct Weapon
    {
        public string Name;
        public int Damage;
        public ItemRarity Rarity; // เอา Enum มาซ้อนใน Struct (ความเท่ระดับสุดยอด)
    }

    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("=== ระบบฐานข้อมูลอาวุธเกม (Item Database) ===\n");

            // 3. เสกอาวุธเวทมนตร์ขึ้นมา 1 ชิ้น
            Weapon sword = new Weapon();
            sword.Name = "ดาบเอกซ์แคลิเบอร์";
            sword.Damage = 999;
            sword.Rarity = ItemRarity.Legendary;

            // โชว์ข้อมูล
            Console.WriteLine($"[คุณได้รับไอเทม] {sword.Name}");
            Console.WriteLine($"- พลังโจมตี: {sword.Damage}");
            
            // 🌟 จุดสังเกต: sword.Rarity เป็นการเข้าถึง Enum ผ่านตัวแปร Struct 🌟
            // สามารถเอาไปเข้า switch ทำงานต่อได้เลย
            switch (sword.Rarity)
            {
                case ItemRarity.Common:
                    Console.WriteLine("- ระดับ: ของกากๆ หาได้ทั่วไป");
                    break;
                case ItemRarity.Legendary:
                    Console.ForegroundColor = ConsoleColor.Yellow;
                    Console.WriteLine("- ระดับ: 👑 อาวุธในตำนาน (มีแสงออร่า) 👑");
                    Console.ResetColor();
                    break;
            }
        }
    }
}
```
:::

---

## 🎯 โจทย์ฝึกปฏิบัติเสริมความเข้าใจ (Mini Exercise)

### **โจทย์ที่ 1: การออกแบบฐานข้อมูลพนักงาน (The Data Modeler)**
สมมติว่าคุณต้องเก็บข้อมูลพนักงาน ประกอบด้วย:
- รหัสพนักงาน (ตัวเลข)
- ชื่อ (ข้อความ)
- เงินเดือน (ตัวเลขทศนิยม)
จงเขียนโครงสร้าง `struct Employee` ที่มี 3 Fields นี้ให้ถูกต้อง (แค่เขียนตัวพิมพ์เขียว ไม่ต้องเขียน Main)

### **โจทย์ที่ 2: นักสืบค้นข้อมูล (Dot Access)**
กำหนดให้มีโค้ดดังนี้:
```csharp
struct Product { public string Name; public double Price; }

class Program {
    static void Main() {
        Product water = new Product { Name = "Singha", Price = 10.0 };
        // [ให้เขียนโค้ดต่อจากตรงนี้]
    }
}
```
**ภารกิจ:** จงเขียนคำสั่ง `Console.WriteLine` 1 บรรทัด โดยใช้เทคนิค String Interpolation (`$`) เพื่อดึงค่าจากตัวแปร `water` มาแสดงผลให้ได้ข้อความบนจอว่า `"สินค้า Singha ราคา 10 บาท"`

::: details 💡 คำใบ้และแนวทาง (Hints)
- **สำหรับโจทย์ 1:** ระวังลืมคำว่า `public` นะครับ! โครงสร้างที่ถูกคือ `struct Employee { public int Id; public string Name; public double Salary; }` ถ้าลืม public คุณจะเอื้อมมือเข้าไปดึงค่ามันจากคลาสอื่นไม่ได้เลย (มันเรียกว่าการป้องกันข้อมูล หรือ Encapsulation ซึ่งจะเรียนลึกๆ ในบท OOP)
- **สำหรับโจทย์ 2:** `Console.WriteLine($"สินค้า {water.Name} ราคา {water.Price} บาท");` เครื่องหมายจุด (`.`) คือกุญแจผีที่ไขเข้าไปดูไส้ในของกล่องครับ!
:::

---

## 🔥 Challenge (โจทย์ท้าทายสุดโหด!)

**โจทย์: ลานประลองนักรบ (The Gladiator Arena)**

นี่คือการจำลองระบบต่อสู้ (Combat System) ย่อส่วน!
**ภารกิจของคุณ:** 
1. สร้างพิมพ์เขียว `struct Character`
   - ต้องมี Field คือ `Name` (ข้อความ), `HP` (เลขจำนวนเต็ม), `AttackPower` (เลขจำนวนเต็ม)
2. ใน `Main` ให้เสกนักสู้มา 2 คน:
   - ผู้ท้าชิง 1: "Hero" (HP 100, Attack 20)
   - ผู้ท้าชิง 2: "Monster" (HP 50, Attack 5)
3. สร้าง Method แยกข้างนอกชื่อ `static void Battle(ref Character attacker, ref Character defender)`
   - ให้ผู้โจมตี หักเลือดของผู้ป้องกัน (ลอจิก: `defender.HP -= attacker.AttackPower;`)
   - ⚠️ ทริคสำคัญ: คุณ **ต้องใส่คำว่า `ref`** หน้าพารามิเตอร์ของ Method เพื่อให้เลือดที่ถูกหัก กระทบถึงกล่องตัวจริงใน Main (เราจะเรียนเรื่องความลับของ ref ในเรื่อง Struct อย่างลึกซึ้งในหัวข้อถัดไป!)
4. สั่งรันคำสั่ง: Hero สับ Monster 1 ที!
5. ปริ้นเลือดที่เหลือของ Monster ออกหน้าจอ (ควรจะเหลือ 30)

ถ้าคุณทำระบบหักเลือดที่เกิดจากกล่อง Struct 2 กล่องตีกันเองได้... นี่คือประตูบานใหญ่ที่จะพาคุณเข้าสู่การเขียนเกมด้วย Unity C# ในอนาคตครับ!

---

## 🗣️ ทบทวน (Review)

::: details ❓ คำถามทบทวนความเข้าใจเชิงลึก

**คำถาม 1:** ในการตั้งชื่อ Field ภายใน Struct เช่น `public string Name;` ทำไมต้องขึ้นต้นด้วยตัวพิมพ์ใหญ่ (PascalCase) ในเมื่อมันเป็นแค่ตัวแปร? (ปกติเราเรียนมาว่าตัวแปรต้องขึ้นด้วยพิมพ์เล็ก camelCase ไม่ใช่หรือ?)
**แนวคำตอบ:** เป็นกฎเกณฑ์ (Naming Convention) ของไมโครซอฟต์ครับ!
เพื่อแยกแยะให้ชัดเจนว่า นี่ไม่ใช่ "ตัวแปรธรรมดาที่วิ่งไปมาในลูป (Local Variable)" แต่มันเป็น "ชิ้นส่วนของข้อมูลที่ถูกห่อหุ้มไว้ (Member Field/Property)" การใช้พิมพ์ใหญ่ช่วยให้โปรแกรมเมอร์คนอื่นรู้ทันทีว่า อ๋อ กล่อง `playerPos` (พิมพ์เล็ก) มีไส้ในคือชิ้นส่วน `.X` และ `.Y` (พิมพ์ใหญ่) นั่นเอง!

**คำถาม 2:** โค้ดด้านล่างนี้ จะพังหรือไม่?
```csharp
struct Box { public int Size; }
// ... ใน Main ...
Box myBox; // ประกาศเฉยๆ ไม่ได้ใช้คำสั่ง new
myBox.Size = 5;
Console.WriteLine(myBox.Size);
```
**แนวคำตอบ:** **รันผ่านฉลุยครับ! ไม่พัง!**
นี่คือความแปลกประหลาดที่ Struct ไม่เหมือนชาวบ้าน! เนื่องจาก Struct เป็นสิ่งมีชีวิตที่เรียกว่า **"Value Type"** (เกิดปุ๊บ สิงอยู่ในแรมทันทีโดยไม่ต้องพึ่งพาคลังเก็บของ Heap) การประกาศ `Box myBox;` เฉยๆ คอมพิวเตอร์ก็ไปจองที่ดินขนาดพอดีกับ int 1 ก้อนให้เรียบร้อยแล้ว (แค่ค่ามันมั่วๆ อยู่) พอคุณยัดเลข 5 ลงไป มันก็ใช้งานได้เลย!
*(แต่ข้อควรระวังคือ ถ้าคุณไม่ได้ยัดเลข 5 ลงไปก่อน แล้วทะลึ่งสั่งปริ้นเลย คอมไพเลอร์จะด่าคุณว่า "เอากล่องเปล่ามาปริ้นทำไม!" ทันทีครับ ดังนั้นใช้ `new Box()` ปลอดภัยสุด เพราะมันจะเคลียร์เลขให้เป็น 0 อัตโนมัติ)*
:::
