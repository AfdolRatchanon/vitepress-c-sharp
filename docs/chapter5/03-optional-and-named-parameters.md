# Optional & Named Parameters (ยืดหยุ่นกว่าเดิม)

> 💡 **เป้าหมาย:** ทำลายข้อจำกัดที่ว่า "ส่งตัวแปรขาดหรือเกินไม่ได้" เรียนรู้วิธีทำให้ Method มีความฉลาดพอที่จะเติมค่าเริ่มต้นให้เราอัตโนมัติ (Optional) และวิธีระบุชื่อตัวแปรตอนโยนข้อมูลเข้าไป (Named) เพื่อให้โค้ดอ่านง่ายทะลุปรุโปร่งเหมือนอ่านหนังสือภาษาอังกฤษ

## 📖 ทฤษฎีและแนวคิดระดับลึก (In-Depth Theory & Concepts)

### 1. ปัญหาของการกำหนดพารามิเตอร์แบบแข็งทื่อ (Rigid Parameters)

ใน C# ยุคโบราณ กฎของการเรียกใช้ Method คือ: "คุณสร้างช่องรับข้อมูลไว้กี่ช่อง คุณต้องโยนเหรียญเข้าไปให้ครบทุกช่อง และต้องเรียงลำดับให้ถูกเป๊ะๆ ห้ามสลับตำแหน่งเด็ดขาด!"

สมมติคุณมีเมธอดสร้างโปรไฟล์ลูกค้า:
`static void CreateProfile(string name, int age, string country)`

เวลาเรียกใช้ คุณต้องกรอกครบ 3 ช่องเสมอ `CreateProfile("John", 25, "Thailand");`
แต่ในโลกความเป็นจริง ลูกค้า 90% ของเรามาจากประเทศไทย (Thailand) การที่โปรแกรมเมอร์ต้องมานั่งพิมพ์คำว่า `"Thailand"` ซ้ำๆ ทุกครั้งที่เรียกใช้ฟังก์ชัน ถือเป็นการสูญเสียเวลาและแหกกฎ DRY ทางอ้อม

---

### 2. พารามิเตอร์ทางเลือก (Optional / Default Parameters)

ไมโครซอฟต์เพิ่มฟีเจอร์นี้เข้ามาเพื่อแก้ปัญหาข้างต้น โดยอนุญาตให้เรา **"ใส่เครื่องหมายเท่ากับ (`=`) เพื่อกำหนดค่าเริ่มต้น (Default Value)"** ไว้ที่หัวเมธอดได้เลย

ถ้าคนเรียกใช้งาน "ไม่ส่งค่านี้มา" ระบบจะเอาค่าเริ่มต้นไปยัดใส่ให้โดยอัตโนมัติ!

```csharp
// สังเกตที่ country = "Thailand"
static void CreateProfile(string name, int age, string country = "Thailand")
{
    Console.WriteLine($"Name: {name}, Age: {age}, Country: {country}");
}

// เวลาเรียกใช้งาน:
CreateProfile("John", 25); // ทำได้! ระบบจะถือว่า country คือ "Thailand" ทันที
CreateProfile("Alice", 30, "USA"); // ทำได้! ระบบจะเอา "USA" ไปทับ "Thailand"
```

**⚠️ กฎเหล็กของ Optional Parameters:**
- พารามิเตอร์ที่มีค่าเริ่มต้น **ต้องอยู่ด้านขวาสุด (ท้ายสุด) ของวงเล็บเสมอ!** คุณจะเอาตัวที่ไม่มีค่าเริ่มต้นไปวางต่อท้ายไม่ได้ (คอมไพเลอร์จะโวยวายทันที)
- *ผิด:* `static void Create(string country = "TH", string name)`
- *ถูก:* `static void Create(string name, string country = "TH")`

---

### 3. Named Arguments (การเรียกชื่อเจาะจง)

ปัญหาต่อมาคือ ถ้าเมธอดนั้นมีพารามิเตอร์ 10 ตัว แล้วเราจำลำดับไม่ได้ล่ะ? (ว่าตัวแรกคืออายุ หรือตัวแรกคือชื่อ?) หรือเราอยากจะส่งค่ากระโดดข้าม Optional parameter บางตัวทำได้หรือไม่?

**Named Arguments** คือไวยากรณ์ที่คุณสามารถ "เรียกชื่อตัวแปร แล้วตามด้วยโคลอน (`:`)" ในตอนที่โยนข้อมูลเข้าไป

```csharp
static void ConfigureServer(string ip, int port = 80, bool useHttps = true) { ... }

// การใช้ Named Arguments
ConfigureServer(ip: "192.168.1.1", useHttps: false, port: 8080);
```

**ข้อดีระดับสุดยอดของ Named Arguments:**
1. **สลับตำแหน่งได้อย่างอิสระ:** คุณอยากจะส่ง `port` ก่อน หรือ `ip` ก่อนก็ได้ ไม่ผิดกฎอีกต่อไป!
2. **ข้ามค่า Optional ได้:** ถ้าคุณอยากเปลี่ยนแค่ `useHttps` แต่ไม่อยากเปลี่ยน `port` คุณก็ใช้วิธีเจาะจงชื่อข้ามไปได้เลย (เช่น `ConfigureServer("127.0.0.1", useHttps: false);` โดยที่ port จะยังคงเป็น 80 ตามเดิม)
3. **โค้ดกลายเป็น Document ในตัว:** คนมาอ่านโค้ดทีหลังจะเข้าใจทันทีว่า `false` ตัวนี้มันส่งไปตั้งค่าอะไร (ไม่ต้องไปเปิดดูไส้ในของฟังก์ชัน)

---

## 💻 ตัวอย่างโค้ดเชิงลึก (In-Depth Implementation)

### ตัวอย่างที่ 1: ระบบส่งอีเมลอัตโนมัติ (Email Dispatcher)

โค้ดนี้สาธิตให้เห็นว่าฟังก์ชันที่ออกแบบพารามิเตอร์ได้ดียืดหยุ่นขนาดไหน

::: code-group
```csharp [Program.cs]
using System;

namespace FlexibleMethodsDemo
{
    class Program
    {
        // ----------------------------------------------------
        // เมธอดส่งอีเมล (มี required 2 ตัว และ optional 2 ตัว)
        // ----------------------------------------------------
        static void SendEmail(string toAddress, string subject, string body = "ไม่มีข้อความ", bool isUrgent = false)
        {
            Console.WriteLine("--------------------------------------");
            Console.WriteLine($"ถึง: {toAddress}");
            Console.WriteLine($"หัวข้อ: {subject}");
            
            // ใช้ Ternary Operator แต่งสัญลักษณ์ด่วน
            string urgencyLabel = isUrgent ? "[ด่วนมาก!] " : "[ปกติ] ";
            Console.WriteLine($"ความสำคัญ: {urgencyLabel}");
            
            Console.WriteLine($"เนื้อหา:\n{body}");
            Console.WriteLine("--------------------------------------");
        }

        static void Main(string[] args)
        {
            Console.WriteLine("=== ระบบจำลองการส่งอีเมล ===");

            // 1. ส่งข้อมูลแบบธรรมดา (ใช้ค่า Default ทั้งหมด)
            // body กลายเป็น "ไม่มีข้อความ", isUrgent กลายเป็น false
            SendEmail("boss@company.com", "ลาป่วยครับ");

            // 2. ส่งข้อมูลแบบทับค่า Optional ไป 1 ตัว (ตามลำดับ)
            // body ถูกทับด้วยข้อความใหม่ แต่ isUrgent ยังเป็น false
            SendEmail("team@company.com", "นัดประชุม", "วันนี้ 10 โมงเจอกันที่ห้องประชุมใหญ่");

            // 3. ท่าไม้ตาย! ใช้ Named Arguments ส่งข้ามลำดับ
            // เราไม่อยากพิมพ์ body (ให้มันเป็น "ไม่มีข้อความ" เหมือนเดิม) แต่เราอยากเปิดโหมด isUrgent
            SendEmail(
                toAddress: "it_support@company.com", 
                subject: "เซิร์ฟเวอร์ล่ม!!", 
                isUrgent: true // เจาะจงชื่อตัวแปรที่อยู่ท้ายสุดเลย ข้าม body ไป
            );

            // 4. ใช้ Named Arguments สลับตำแหน่งแบบมั่วๆ (แต่โปรแกรมก็ยังอ่านรู้เรื่อง)
            SendEmail(
                isUrgent: false,
                body: "ยินดีต้อนรับพนักงานใหม่",
                toAddress: "newbie@company.com",
                subject: "Welcome!"
            );
        }
    }
}
```
:::

**ผลลัพธ์ที่จะแสดงบนหน้าจอ:**
(คุณจะเห็นว่าระบบจัดการค่าเริ่มต้นและการสลับชื่อได้อย่างสมบูรณ์แบบ ไร้ซึ่งรอยต่อหรือข้อผิดพลาดใดๆ)

---

### ตัวอย่างที่ 2: เครื่องมือสร้าง UI (Console Window Builder)

ในโลกของการทำไลบรารีแจกให้คนอื่นใช้ (Library Design) การใช้ Optional Parameter เป็นเรื่องปกติมาก 

::: code-group
```csharp [Program.cs]
using System;

namespace WindowBuilderDemo
{
    class Program
    {
        // สร้างกล่องข้อความ โดยมีสัญลักษณ์กรอบ (borderChar) และสี (color) เป็นออปชั่นเสริม
        static void DrawWindow(string title, char borderChar = '*', ConsoleColor color = ConsoleColor.White)
        {
            Console.ForegroundColor = color;
            
            // วาดขอบบนยาวตามชื่อ (บวกเผื่อช่องว่าง)
            string border = new string(borderChar, title.Length + 4);
            
            Console.WriteLine(border);
            Console.WriteLine($"{borderChar} {title} {borderChar}");
            Console.WriteLine(border);
            
            Console.ResetColor();
        }

        static void Main(string[] args)
        {
            // เรียกใช้ง่ายๆ ได้สีขาว กรอบดอกจัน
            DrawWindow("MAIN MENU");
            
            Console.WriteLine();

            // เปลี่ยนแค่กรอบ แต่สีเอาแบบเดิม
            DrawWindow("WARNING ZONE", '#');

            Console.WriteLine();

            // เปลี่ยนสี แต่กรอบเอาแบบเดิม (ต้องพึ่ง Named argument)
            DrawWindow("SUCCESS MESSAGE", color: ConsoleColor.Green);
        }
    }
}
```
:::

---

## 🎯 โจทย์ฝึกปฏิบัติเสริมความเข้าใจ (Mini Exercise)

### **โจทย์ที่ 1: กฎเหล็กแห่งพารามิเตอร์**
พิจารณาหัวเมธอดต่อไปนี้ ว่าบรรทัดใดถูก บรรทัดใดผิด (Compile Error) เพราะเหตุใด?
1. `static void RegisterUser(string name, int age = 18, string role = "Guest")`
2. `static void ProcessData(int limit = 100, string filterQuery)`
3. `static void SetupDevice(string ipAddress, int port = 8080, bool enableWifi)`

### **โจทย์ที่ 2: ร้านกาแฟมักง่าย (The Lazy Barista)**
**ภารกิจ:** สร้างเมธอดสั่งกาแฟ `OrderCoffee`
- เมธอดต้องรับตัวแปร 3 ตัว: 
  - `string menuName` (ชื่อเมนู เช่น เอสเพรสโซ่)
  - `string sweetness` (ระดับความหวาน)
  - `bool isHot` (ร้อนหรือเย็น)
- **โจทย์หลัก:** ให้กำหนดค่า Default ว่า "ถ้าลูกค้าสั่งแค่ชื่อเมนูอย่างเดียว (ไม่บอกความหวาน ไม่บอกว่าร้อนหรือเย็น)" ให้ระบบถือว่าลูกค้าต้องการสั่ง **"หวานปกติ"** และเป็นกาแฟ **"เย็น (isHot = false)"** อัตโนมัติ
- ลองเขียนโค้ดเรียกใช้งานเมธอดนี้ใน `Main()` โดยส่งแค่ชื่อกาแฟ `"Latte"` คำเดียวดูสิ!

::: details 💡 คำใบ้และแนวทาง (Hints)
- **สำหรับโจทย์ 1:** กฎเหล็กมีข้อเดียวคือ "ตัวที่มี = ต้องไปกองรวมกันอยู่ข้างหลังสุด (ขวามือสุด) เสมอ" 
  - ข้อ 1 ถูกต้อง (required แล้วตามด้วย optional 2 ตัว)
  - ข้อ 2 และ 3 ผิดพินาศ! เพราะเอา optional ไปขวางหน้า required parameter (คอมไพเลอร์จะงงว่าตกลงข้อมูลที่โยนมาจะเข้าช่องไหน)
- **สำหรับโจทย์ 2:** หัวเมธอดของคุณควรจะเป็น `static void OrderCoffee(string menuName, string sweetness = "หวานปกติ", bool isHot = false)`
:::

---

## 🔥 Challenge (โจทย์ท้าทายสุดโหด!)

**โจทย์: ระบบสร้างโพรไฟล์ตัวละคร RPG (Character Creator Engine)**

ในเกม RPG ผู้เล่นมักขี้เกียจตั้งค่าตัวละครเองทั้งหมด
**ภารกิจของคุณ:** 
1. สร้างเมธอด `CreateCharacter` ที่รับคุณลักษณะ 5 อย่าง (ตั้ง Data Type ให้เหมาะสม):
   - `HeroName` (ชื่อฮีโร่ - บังคับต้องส่ง)
   - `JobClass` (อาชีพ) -> ค่าเริ่มต้นคือ `"Novice"`
   - `HP` (พลังชีวิต) -> ค่าเริ่มต้นคือ `100`
   - `Weapon` (อาวุธ) -> ค่าเริ่มต้นคือ `"มีดสั้น"`
   - `HasMagic` (ใช้เวทมนตร์ได้หรือไม่) -> ค่าเริ่มต้นคือ `false`
2. ภายในเมธอด ให้พิมพ์แสดงสรุปสเตตัสของตัวละครนั้นออกมา
3. ใน `Main()` ให้ทดลองสร้างตัวละคร 3 ตัว (ห้ามสร้างเกิน 1 ตัวอักษรต่อตัว):
   - ตัวละครที่ 1: พิมพ์แค่ `CreateCharacter("Arthur");` (ดูว่ามันเป็น Novice มีดสั้นจริงไหม)
   - ตัวละครที่ 2: สร้างตัวละครชื่อ "Merlin" อาชีพ "Mage" และใช้เวทมนตร์ได้ (ตัวเลือกอื่นปล่อยให้เป็นค่าเดิม) *ต้องใช้ Named Arguments ช่วย*
   - ตัวละครที่ 3: สร้างตัวละครชื่อ "Leon" ถืออาวุธ "ดาบยักษ์" และมี HP 500 (ตัวเลือกอื่นปล่อยให้เป็นค่าเดิม) *ต้องใช้ Named Arguments ช่วย*

*(การเขียนโค้ดลักษณะนี้ เป็นพื้นฐานของการทำ Configuration Builders ในระบบระดับสูงอย่าง ASP.NET Core เลยทีเดียว!)*

---

## 🗣️ ทบทวน (Review)

::: details ❓ คำถามทบทวนความเข้าใจเชิงลึก

**คำถาม 1:** ในมุมมองของการดูแลรักษาโค้ด (Maintainability) สมมติว่าในบริษัทของคุณมีคนเรียกใช้ฟังก์ชัน `CalculateTax(double price)` ไปแล้ว 500 แห่งทั่วโปรเจกต์ 
วันหนึ่งหัวหน้าบอกให้เพิ่มพารามิเตอร์ "อัตราส่วนลด" เข้าไปในฟังก์ชันนี้ด้วย คุณจะใช้วิธีไหนในการเติม Parameter ใหม่เข้าไป เพื่อ **รับประกันว่าโค้ดเก่าทั้ง 500 แห่ง จะไม่พังและไม่ต้องตามไปแก้ไขแม้แต่บรรทัดเดียว?**
**แนวคำตอบ:** **เติมพารามิเตอร์ใหม่ลงไปเป็น Optional Parameter ไว้ที่ตำแหน่งท้ายสุด!**
เช่น เปลี่ยนเป็น `CalculateTax(double price, double discountRate = 0.0)`
ผลลัพธ์คือ: โค้ดเก่าทั้ง 500 แห่งที่เรียกมาแค่ตัวเลขเดียว ระบบจะถือว่ามันได้ส่งอัตราส่วนลดเป็น `0.0` มาให้โดยอัตโนมัติ ทำให้โค้ดไม่พัง (No Breaking Changes) ในขณะที่โค้ดใหม่ที่กำลังจะสร้าง ก็สามารถส่งเลขส่วนลดมาทับค่า 0.0 ได้ตามปกติ (นี่คือทริคกู้ชีพของ Software Architect)

**คำถาม 2:** การใช้ Named Argument `(ip: "192.168.1.1")` ทำให้โปรแกรมทำงาน "ช้าลง" หรือไม่? เพราะมันดูเหมือนคอมพิวเตอร์ต้องเสียเวลามาค้นหาชื่อตัวแปร?
**แนวคำตอบ:** **ไม่ช้าลงเลยแม้แต่เสี้ยวไมโครวินาที (0% Runtime Overhead)!**
ฟีเจอร์ Named Argument เป็นฟีเจอร์ระดับ Compiler (ตอนที่แปลงโค้ดเป็นภาษาเครื่อง) 
ตัวคอมไพเลอร์ของ C# จะทำการจัดเรียงลำดับและแปลงชื่อตัวแปรเหล่านั้น กลับไปเป็นลำดับตามปกติให้เองเสร็จสรรพตั้งแต่ตอนก่อนรัน ดังนั้นเมื่อโปรแกรมเริ่มรันจริง รหัสเครื่องเบื้องหลังจะไม่มีชื่อตัวแปรอะไรหลงเหลืออยู่เลย มันกลายเป็นการกระโดดข้ามหน่วยความจำแบบปกติ (Pointer operations) ล้วนๆ
:::
