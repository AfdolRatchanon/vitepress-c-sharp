# พิมพ์เขียวและวัตถุ (Classes & Objects)

> 💡 **เป้าหมาย:** ลงมือเขียนโค้ด OOP ของจริง! เรียนรู้วิธีนิยาม "Class" เพื่อใช้เป็นพิมพ์เขียวแม่แบบ และการเสกมันให้มีชีวิตกลายเป็น "Object" หลายๆ ตัวที่มีข้อมูลเป็นเอกเทศจากกันในคฤหาสน์ Heap

## 📖 ทฤษฎีและแนวคิดระดับลึก (In-Depth Theory & Concepts)

### 1. ความแตกต่างระหว่าง Class และ Object

มือใหม่มักจะสับสนระหว่างสองคำนี้สุดๆ ครับ! จำคอนเซปต์นี้ให้ขึ้นใจ:
- **`Class` (พิมพ์เขียว / แม่พิมพ์):** มันเป็นเพียง "แบบแปลนบนแผ่นกระดาษ" ที่ระบุว่าบ้านหลังนี้จะมีกี่ห้องนอน จะทาสีอะไร (แต่คุณยังไม่สามารถเข้าไปนอนในกระดาษได้นะ!)
- **`Object` (ตัวบ้านที่สร้างเสร็จ / Instance):** เมื่อคุณเอาพิมพ์เขียวไปยื่นให้ผู้รับเหมาสร้างบ้านขึ้นมาจริงๆ (ใช้คำสั่ง `new`) ตัวบ้านที่ตั้งตระหง่านอยู่บนที่ดิน (หน่วยความจำ Heap) นั่นแหละครับคือ Object คุณสามารถเข้าไปนอนได้ และพิมพ์เขียว 1 แผ่น สามารถเสกบ้านกี่ร้อยกี่พันหลังก็ได้! (ทุกหลังมีแปลนเหมือนกัน แต่เจ้าของและของในบ้านไม่เหมือนกัน)

---

### 2. การสร้าง Class (The Blueprint Definition)

ในการสร้างแม่พิมพ์ เราจะใช้คำสั่ง `class` (ซึ่งหน้าตาคล้าย `struct` ที่เราเรียนในบทที่แล้วมาก)
ภายในคลาสจะประกอบไปด้วย 2 ส่วนหลัก:
1. **Fields (ตัวแปร/สถานะ):** ใช้เก็บข้อมูลของพิมพ์เขียวนี้
2. **Methods (ฟังก์ชัน/พฤติกรรม):** ความสามารถที่พิมพ์เขียวนี้ทำได้

```csharp
// การสร้าง Class มักจะเขียนไว้นอก Main() เสมอ
class Player
{
    // 1. Fields (คุณลักษณะ)
    public string Name;
    public int Level;

    // 2. Methods (พฤติกรรม)
    // สังเกต: เรา "ไม่ต้องใส่คำว่า static" นำหน้า Method แล้วนะ!
    public void Greet()
    {
        // 🌟 เวทมนตร์: Method ของคลาส สามารถเรียกใช้ Field ของตัวเองได้เลยโดยตรง!
        Console.WriteLine($"สวัสดีข้าชื่อ {Name} เลเวล {Level}");
    }
}
```

**⚠️ ข้อสังเกตสำคัญ (The Static Illusion):** 
บทที่ผ่านๆ มา ตอนเราเขียนฟังก์ชัน เราโดนบังคับให้พิมพ์คำว่า `static void MethodName()` ตลอดเวลา... แต่นับจากนี้ พอเราเข้ามาอยู่ในโลกของ OOP เราจะ **"ลบคำว่า static ทิ้งไป"** ครับ! 
(เหตุผลเชิงลึก: `static` แปลว่าความตายตัวที่มีอยู่หนึ่งเดียวในโลก แต่ตอนนี้เราอยากให้ Object เกิดขึ้นมาเป็นร้อยตัวและแต่ละตัวมีความคิดเป็นของตัวเอง จึงห้ามเป็น static เด็ดขาดครับ!)

---

### 3. การเสก Object ด้วยคำสั่ง `new` (Instantiation)

เมื่อเรามีพิมพ์เขียว `Player` แล้ว เราจะนำมันไปสร้างผู้เล่นจริงในเมธอด `Main`

```csharp
// 1. การเสก Object (ต้องใช้ new เสมอเพื่อจองพื้นที่ใน Heap)
Player p1 = new Player(); 

// 2. กำหนดค่า State ให้ออบเจกต์ (ผ่านเครื่องหมายจุด .)
p1.Name = "Arthur";
p1.Level = 99;

// 3. สั่งให้ออบเจกต์ทำพฤติกรรมของมัน!
p1.Greet(); // มันจะพ่นคำว่า "สวัสดีข้าชื่อ Arthur เลเวล 99"
```

ความมหัศจรรย์คือ ถ้าเราสั่ง `Player p2 = new Player();` เราจะได้บ้านหลังใหม่ที่แยกจาก `p1` อย่างสิ้นเชิง (ตามกฎของ Reference Type)

---

## 💻 ตัวอย่างโค้ดเชิงลึก (In-Depth Implementation)

### ตัวอย่างที่ 1: ระบบจัดการสถานะออบเจกต์ (Object State Management)

ตัวอย่างนี้โชว์ให้เห็นว่า Object แต่ละตัว (Instance) ดูแลข้อมูลของตัวเองอย่างไร โดยที่ Method ไม่ต้องรับพารามิเตอร์รกรุงรังเลย เพราะมันหยิบของในบ้านตัวเองมาใช้ได้เลย!

::: code-group
```csharp [Program.cs]
using System;

namespace OOPBasics
{
    // 1. สร้างพิมพ์เขียว
    class SmartLamp
    {
        // --- Fields (สถานะ) ---
        public string Color;
        public bool IsOn; // ค่าเริ่มต้นของ bool คือ false (ปิดอยู่)

        // --- Methods (พฤติกรรม) ---
        public void Toggle()
        {
            // พลิกสถานะ เปิดกลายเป็นปิด ปิดกลายเป็นเปิด
            IsOn = !IsOn; 
            Console.WriteLine($"[ระบบ] หลอดไฟถูกสับสวิตช์เป็น: {(IsOn ? "เปิด" : "ปิด")}");
        }

        public void Shine()
        {
            // ตรวจสอบ State ของตัวเองก่อนทำงาน
            if (IsOn)
            {
                Console.ForegroundColor = ConsoleColor.Yellow;
                Console.WriteLine($"💡 หลอดไฟกำลังเปล่งแสงสี {Color} สว่างจ้า!");
                Console.ResetColor();
            }
            else
            {
                Console.WriteLine("🌑 หลอดไฟมืดสนิท (กรุณาเปิดสวิตช์ก่อน)");
            }
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("=== ระบบควบคุมหลอดไฟอัจฉริยะ (IoT Simulation) ===\n");

            // 2. เสกออบเจกต์ 2 ชิ้น (หลอดไฟ 2 ดวงที่เป็นอิสระต่อกัน)
            SmartLamp livingRoomLamp = new SmartLamp();
            livingRoomLamp.Color = "Warm White";

            SmartLamp bedroomLamp = new SmartLamp();
            bedroomLamp.Color = "Blue Neon";

            // 3. สั่งงานออบเจกต์
            Console.WriteLine(">> ห้องนั่งเล่น:");
            livingRoomLamp.Shine();  // จะมืด เพราะยังไม่เปิด
            livingRoomLamp.Toggle(); // สั่งเปิดสวิตช์!
            livingRoomLamp.Shine();  // คราวนี้จะเปล่งแสงสี Warm White

            Console.WriteLine("\n>> ห้องนอน:");
            // หลอดห้องนอนยังคงปิดอยู่! เพราะมันคือ Object คนละตัวกันโดยสิ้นเชิง 
            // แม้ว่าจะมาจากแม่พิมพ์ (Class) เดียวกันก็ตาม!
            bedroomLamp.Shine(); 
        }
    }
}
```
:::

---

### ตัวอย่างที่ 2: ออบเจกต์มีปฏิสัมพันธ์กัน (Object Interaction)

ความสง่างามของ OOP คือการเอาออบเจกต์ 2 ตัว มาคุยกัน (ส่ง Message หากัน)

::: code-group
```csharp [Program.cs]
using System;

namespace ObjectInteraction
{
    class BankAccount
    {
        public string OwnerName;
        public decimal Balance;

        // เมธอดสำหรับถอนเงิน
        public bool Withdraw(decimal amount)
        {
            if (Balance >= amount)
            {
                Balance -= amount;
                return true; // ถอนสำเร็จ
            }
            return false; // เงินไม่พอ!
        }

        // เมธอดสำหรับฝากเงิน
        public void Deposit(decimal amount)
        {
            Balance += amount;
        }

        // 🌟 ท่าไม้ตาย! เมธอดนี้รับ "ออบเจกต์" อีกตัวเข้ามาเป็นพารามิเตอร์ 🌟
        // นี่คือการโอนเงิน (ดึงเงินตัวเอง ไปฝากให้อีกคน)
        public void TransferTo(BankAccount targetAccount, decimal amount)
        {
            Console.WriteLine($"[ระบบ] {OwnerName} กำลังโอนเงิน {amount} ให้ {targetAccount.OwnerName}...");
            
            // 1. ลองถอนเงินจากตัวเองก่อน
            if (this.Withdraw(amount)) // this. หมายถึง เรียกใช้เมธอดของ "ตัวฉันเอง"
            {
                // 2. ถ้าตัวเองถอนสำเร็จ ค่อยเอาไปเข้ากระเป๋าของเป้าหมาย
                targetAccount.Deposit(amount);
                Console.WriteLine("✅ โอนเงินสำเร็จ!");
            }
            else
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("❌ โอนล้มเหลว: ยอดเงินของต้นทางไม่เพียงพอ");
                Console.ResetColor();
            }
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("=== ระบบจำลองการโอนเงินระหว่างสมุดบัญชี ===\n");

            BankAccount john = new BankAccount { OwnerName = "จอห์น", Balance = 1000 };
            BankAccount alice = new BankAccount { OwnerName = "อลิซ", Balance = 500 };

            // จอห์น สั่งโอนเงิน 300 ให้ อลิซ
            john.TransferTo(alice, 300);

            // เช็คยอดเงินหลังโอน
            Console.WriteLine($"\n[ยอดเงินคงเหลือ]");
            Console.WriteLine($"{john.OwnerName}: {john.Balance} บาท");
            Console.WriteLine($"{alice.OwnerName}: {alice.Balance} บาท");
        }
    }
}
```
:::

---

## 🎯 โจทย์ฝึกปฏิบัติเสริมความเข้าใจ (Mini Exercise)

### **โจทย์ที่ 1: โรงงานผลิตกล่อง (The Instance Check)**
กำหนดให้มีโค้ด:
```csharp
class Box { public int Size; }
class Program {
    static void Main() {
        Box a = new Box(); a.Size = 10;
        Box b = new Box(); b.Size = 10;
        Box c = a;
    }
}
```
**คำถาม:** ในหน่วยความจำ Heap ตอนนี้ มีออบเจกต์ `Box` ถูกสร้างขึ้นมา (บ้านที่สร้างเสร็จ) **ทั้งหมดกี่หลัง?** 

### **โจทย์ที่ 2: ลืมกุญแจเข้าบ้าน (The Null Reference)**
กำหนดให้มีโค้ด:
```csharp
class Robot { public void Speak() { Console.WriteLine("Beep"); } }
class Program {
    static void Main() {
        Robot r1; 
        r1.Speak();
    }
}
```
**คำถาม:** เมื่อพยายาม Compile โค้ดด้านบน คอมพิวเตอร์จะด่าว่าอะไร? และคุณต้องแก้โค้ดที่บรรทัดไหน อย่างไร เพื่อให้หุ่นยนต์ส่งเสียงได้?

::: details 💡 คำใบ้และแนวทาง (Hints)
- **สำหรับโจทย์ 1:** คำตอบคือ **"2 หลัง"** ครับ! ให้นับที่จำนวนคำสั่ง `new` เลย! ตัวแปร `a` และ `b` คือการสร้างบ้านหลังใหม่ 2 หลังแยกกัน ส่วนตัวแปร `c` เป็นเพียงแค่การ "ถ่ายเอกสารโฉนดที่ดิน (ตั๋ว)" ของ `a` มาถือไว้เฉยๆ ไม่ได้มีการสร้างคฤหาสน์หลังที่ 3 แต่อย่างใด!
- **สำหรับโจทย์ 2:** พินาศครับ! มันจะเตือนเรื่อง **"Unassigned local variable 'r1'"** (ยังไม่ได้กำหนดค่าเริ่มต้น) หรือถ้าในภาษาระดับสูงมันคือบั๊ก **`NullReferenceException` (บั๊กอันดับ 1 ของโลกซอฟต์แวร์)** เพราะคุณสร้างตั๋ว (ตัวแปร) ไว้ แต่คุณยังไม่ได้สร้างบ้าน (`new`) แล้วคุณดันเอาตั๋วใบนั้นไปไขกุญแจเรียก `Speak()` ระบบเลยพังทันที! วิธีแก้คือบรรทัดแรกต้องเขียน `Robot r1 = new Robot();` เสมอครับ!
:::

---

## 🔥 Challenge (โจทย์ท้าทายสุดโหด!)

**โจทย์: วิศวกรยานยนต์ (The Car Dashboard System)**

**ภารกิจของคุณ:** จงสร้าง Class ที่ชื่อว่า `Car` โดยมีสเปคเข้มงวดดังนี้:
1. **Fields:**
   - `public string Brand;` (ยี่ห้อรถ)
   - `public bool IsEngineRunning;` (สถานะเครื่องยนต์)
   - `public int Mileage;` (เลขไมล์สะสมของรถ)
2. **Methods:**
   - `public void StartEngine()`: ถ้าเครื่องปิดอยู่ ให้เปลี่ยนเป็นเปิด พร้อมปริ้น "บรื้นน! สตาร์ทรถ [ยี่ห้อ]" แต่ถ้าเปิดอยู่แล้ว ให้ปริ้นบ่นว่า "เครื่องสตาร์ทอยู่แล้ว จะบิดกุญแจซ้ำทำไม!"
   - `public void Drive(int distance)`: 
     - ถ้ารถยังไม่สตาร์ท ห้ามขับ! ให้ปริ้นเตือนว่า "สตาร์ทรถก่อนสิลูกพี่!"
     - ถ้ารถสตาร์ทแล้ว ให้นำค่า `distance` ไปบวกเพิ่มใน `Mileage` และปริ้นหน้าปัดรายงานความสำเร็จว่า "[ยี่ห้อ] วิ่งไป [distance] กม. (เลขไมล์รวม: [Mileage] กม.)"
3. **ใน Main Method:**
   - เสกรถขึ้นมา 1 คัน ยี่ห้อ "Honda"
   - ลองแกล้งสั่ง `Drive(50)` ดูก่อนเลย (มันต้องด่าคุณ)
   - สั่ง `StartEngine()` 
   - สั่ง `Drive(50)` อีกรอบ
   - สั่ง `Drive(120)` ซ้ำอีกรอบ เลขไมล์สะสมต้องถูกต้อง!

ถ้าคุณจำลองระบบหน้าปัดรถยนต์ที่ผูกขาด State ของใครของมันได้ แปลว่าคุณเข้าใจคอนเซปต์ "Encapsulation ของสถานะ" ภายใน Class อย่างถ่องแท้แล้วครับ!

---

## 🗣️ ทบทวน (Review)

::: details ❓ คำถามทบทวนความเข้าใจเชิงลึก

**คำถาม 1:** ในเมื่อ Class (OOP) และ Struct (Procedural Data) มันอนุญาตให้เขียน Method เอาไว้ข้างในคู่กับตัวแปรได้เหมือนกันเป๊ะเลย... แล้วมันต่างกันตรงไหน? ทำไมเราไม่ใช้ Struct ทำ OOP ซะเลยล่ะ เร็วกว่าด้วย?
**แนวคำตอบ:** เป็นคำถามระดับสถาปนิกครับ!
1. **เรื่องสายเลือด (Inheritance):** Class สามารถ "สืบทอดพันธุกรรม (Inherit)" จากคลาสแม่ได้ (บทที่ 10) แต่ Struct ถูกปิดตาย (Sealed) ห้ามสืบทอดเด็ดขาด!
2. **กลไกหน่วยความจำ:** OOP เน้นการส่ง Message คุยกันระหว่างออบเจกต์ (เช่น โอนเงินจากบัญชี A ไป B) การที่ Class เป็น Reference Type (ชี้ตั๋วใบเดียวกัน) ทำให้เวลาโยนไปมา มันคือการคุยกับออบเจกต์ตัวจริงเสียงจริง! แต่ถ้าคุณใช้ Struct เวลาโยนข้าม Method มันจะ "ถ่ายเอกสารร่างโคลน" ทำให้การจัดการสถานะร่วมกันในโลก OOP พังพินาศทันทีครับ! (นี่คือสาเหตุที่ OOP ต้องอาศัยอยู่บนคฤหาสน์ Heap เสมอ)

**คำถาม 2:** โค้ดด้านล่างนี้ เกิดข้อผิดพลาดอะไร ทำไมมันถึงทำตัวเหมือนคนละคลาสกัน?
```csharp
class Dog {
    public string Name;
    public void Bark() { Console.WriteLine(Name + " says Woof!"); }
}
// ใน Main...
Dog d1 = new Dog();
d1.Name = "Ruger";
new Dog().Bark(); // ทำไมมันไม่พ่นคำว่า Ruger ออกมา?
```
**แนวคำตอบ:** **เพราะคุณทะลึ่งไปเสกหมาตัวใหม่ในบรรทัดสุดท้ายครับ!**
คำสั่ง `new Dog()` คือการบอกผู้รับเหมาสร้างบ้านหลังใหม่ 100% เลย! บรรทัดสุดท้ายมันคือหมาตัวใหม่ที่ไม่มีชื่อ (Name = null) มันจึงร้องโฮ่งๆ แบบเหงาๆ โดยไม่มีชื่อ
ถ้าอยากให้ Ruger เห่า คุณต้องหยิบตัวแปรที่ชี้ตั๋วใบนั้นมาใช้สิครับ! ต้องพิมพ์ว่า `d1.Bark();` มันถึงจะทำงานถูกตัว! (เรื่องนี้ตอกย้ำว่า `new` 1 ครั้ง เท่ากับเสกของขึ้นมา 1 ชิ้น เสมอครับ)
:::
