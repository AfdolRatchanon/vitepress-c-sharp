# เฉลย: switch & switch expression

## 🎯 เฉลย Mini Exercise

### **โจทย์ที่ 1: ระบบแปลชื่อวัน (Day Translator)**
**เฉลยและวิธีทำ:**
การใช้ Switch แบบดั้งเดิม (Classic Switch) ควรกำหนดตัวแปรไว้รองรับค่าเพื่อลดการเรียก `Console.WriteLine` ซ้ำซ้อน ซึ่งเป็นแนวทางปฏิบัติที่ดี (Best Practice)

```csharp
Console.Write("กรุณากรอกตัวเลขวัน (1-7): ");
int dayNumber = int.Parse(Console.ReadLine());

string dayName = "";

switch (dayNumber)
{
    case 1:
        dayName = "วันจันทร์ (Monday)";
        break; // กระโดดออกทันที
    case 2:
        dayName = "วันอังคาร (Tuesday)";
        break;
    case 3:
        dayName = "วันพุธ (Wednesday)";
        break;
    case 4:
        dayName = "วันพฤหัสบดี (Thursday)";
        break;
    case 5:
        dayName = "วันศุกร์ (Friday)";
        break;
    case 6:
        dayName = "วันเสาร์ (Saturday)";
        break;
    case 7:
        dayName = "วันอาทิตย์ (Sunday)";
        break;
    default:
        // ตัวจับดักข้อมูลขยะ
        dayName = "หมายเลขวันไม่ถูกต้อง (Error)";
        break;
}

Console.WriteLine("ผลลัพธ์: " + dayName);
```

---

### **โจทย์ที่ 2: ระบบจำแนกขนาดเสื้อ (T-Shirt Sizer)**
**เฉลยและวิธีทำ:**
โจทย์นี้ท้าทายให้เขียน **Switch Expression** ของ C# ยุคใหม่ ซึ่งจะใช้ร่วมกับ **Relational Patterns** (`<`, `>=`) 
และใช้ตัวขีดเส้นใต้ `_` เป็นตัวปิดท้ายเสมอ

```csharp
Console.Write("กรุณากรอกขนาดรอบอก (cm): ");
int chestSize = int.Parse(Console.ReadLine());

// ปฏิวัติโค้ดให้สั้นเหลือบรรทัดเดียว (หรือหลายบรรทัดที่จัดเรียงสวยงาม) ด้วย Switch Expression
string tshirtSize = chestSize switch
{
    // ถ้าน้อยกว่า 90 -> S
    < 90 => "S",
    
    // ตั้งแต่ 90 ถึง 100 -> M
    >= 90 and <= 100 => "M",
    
    // ตั้งแต่ 101 ถึง 110 -> L
    >= 101 and <= 110 => "L",
    
    // 111 ขึ้นไป -> XL
    >= 111 => "XL",
    
    // กรณีที่ไม่ได้คาดคิด (เช่น กรอกค่าแปลกๆ แม้ว่าทางเทคนิคจะถูกดักข้างบนหมดแล้ว แต่ C# บังคับต้องมี _ เสมอเพื่อความสมบูรณ์ Exhaustiveness)
    _ => "Unknown Error"
};

Console.WriteLine("ไซส์เสื้อที่เหมาะสมสำหรับคุณคือ: " + tshirtSize);
```
*(จะเห็นได้ว่ามันสวยงามและอ่านง่ายกว่า `if-else if` และ `switch` ยุคเก่ามากเลยทีเดียว)*

---

## 🔥 เฉลย Challenge (ระบบคำนวณค่าจัดส่งสุดแอดวานซ์)

**โจทย์:** ใช้ **Tuple Pattern Matching** กับ Switch Expression เพื่อหาค่าจัดส่ง (2 ตัวแปรพร้อมกัน)
**เฉลยและวิธีวิเคราะห์:**

นี่คือขีดสุดของความงดงามทางภาษา C# ในยุคโมเดิร์น เราสามารถเอาตัวแปร 2 ตัวมาแพ็คคู่กันในวงเล็บ (เรียกว่า **Tuple**) แล้วทำการสแกนเช็คทีละคู่ได้เลย!

```csharp
Console.WriteLine("=== ระบบคำนวณค่าจัดส่งอัตโนมัติ ===");
Console.Write("กรุณาระบุโซน (พิมพ์ BKK หรือ UPC): ");
string zone = Console.ReadLine().ToUpper(); // แปลงเป็นพิมพ์ใหญ่ทั้งหมดเพื่อเช็คง่ายขึ้น

Console.Write("คุณเป็นสมาชิก Premium หรือไม่? (true/false): ");
bool isPremiumMember = bool.Parse(Console.ReadLine());

// เวทมนตร์ของ Tuple Pattern Matching!
// มัด zone กับ isPremiumMember เป็นแพ็คเกจ (zone, isPremiumMember) แล้วส่งเข้าเครื่องสแกน switch
int shippingCost = (zone, isPremiumMember) switch
{
    // กรณีที่ 1: อยู่กทม. และเป็นสมาชิก VIP -> ส่งฟรี
    ("BKK", true) => 0,
    
    // กรณีที่ 2: อยู่กทม. แต่ไม่ได้เป็นสมาชิก -> 50 บาท
    ("BKK", false) => 50,
    
    // กรณีที่ 3: อยู่ต่างจังหวัด และเป็นสมาชิก VIP -> 30 บาท
    ("UPC", true) => 30,
    
    // กรณีที่ 4: อยู่ต่างจังหวัด และไม่ได้เป็นสมาชิก -> 100 บาท
    ("UPC", false) => 100,
    
    // กรณีดักขยะ: พิมพ์โซนมามั่วๆ 
    // ตัว _ (Discard) หมายถึงอะไรก็ได้ช่างมัน ให้คืนค่า -1 เป็นตัวบอกสัญญาณ Error
    _ => -1 
};

// แสดงผลลัพธ์พร้อมลูกเล่นเล็กน้อย
if (shippingCost == -1)
{
    Console.WriteLine("❌ ไม่สามารถคำนวณได้: ระบุโซนพื้นที่ไม่ถูกต้อง");
}
else if (shippingCost == 0)
{
    Console.WriteLine("🎉 ยินดีด้วย! ค่าจัดส่งฟรี 0 บาท (สิทธิพิเศษสำหรับ Premium Member พื้นที่กรุงเทพ)");
}
else
{
    Console.WriteLine($"📦 ค่าจัดส่งสำหรับพัสดุของคุณคือ: {shippingCost} บาท");
}
```

**บทสรุปของความล้ำหน้า:**
ลองจินตนาการดูว่า ถ้าต้องเขียนระบบข้างบนด้วย `if-else` ปกติ โค้ดจะยุ่งเหยิงขนาดไหน:
```csharp
// แบบเก่า (ทำให้อ่านยาก)
if (zone == "BKK" && isPremiumMember == true) { cost = 0; }
else if (zone == "BKK" && isPremiumMember == false) { cost = 50; }
else if (zone == "UPC" && isPremiumMember == true) { cost = 30; }
...
```
เมื่อคุณเข้าสู่วัยทำงานจริง ทักษะ **Pattern Matching** จะเป็นเครื่องมือหากินที่ทำให้คุณกลายเป็นนักเขียนโปรแกรมระดับแนวหน้าที่มีโค้ดสะอาด สั้นกระชับ และมีเปอร์เซ็นต์เกิดบั๊กน้อยกว่าเพื่อนร่วมงานคนอื่นๆ อย่างเห็นได้ชัด!
