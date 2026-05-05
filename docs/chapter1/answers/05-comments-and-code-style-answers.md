# เฉลย: Comments & Code Style

## 🎯 เฉลย Mini Exercise

**โจทย์ที่ 1:** เพิ่ม Comment บอกเหตุผล ("ทำไม")
**เฉลย (ตัวอย่าง):**
```csharp
// กำหนดจำนวนครั้งสูงสุดที่อนุญาตให้ล็อกอินผิดพลาด เพื่อป้องกันการเดารหัสผ่าน (Brute Force)
int maxAttempts = 3;

// เก็บจำนวนครั้งที่ผู้ใช้กรอกรหัสผ่านผิดในรอบปัจจุบัน เริ่มต้นที่ 0 เสมอ
int currentAttempt = 0;

// รหัสผ่านที่ถูกต้องสำหรับแอดมินระบบ (ใช้ทดสอบชั่วคราว เดี๋ยวจะต้องดึงจากฐานข้อมูล)
string correctPassword = "secret123";
```

**โจทย์ที่ 2:** แก้ไข Naming Convention และ Indentation
**เฉลย:**
- ตัวแปรต้องเป็น `camelCase` (คำแรกตัวพิมพ์เล็ก คำต่อไปขึ้นต้นตัวพิมพ์ใหญ่)
- เพิ่มการเว้นวรรค (space) หน้าและหลัง operator เพื่อให้อ่านง่าย

```csharp
int studentAge = 17;
string firstName = "somchai";
Console.WriteLine("Name: " + firstName + " Age: " + studentAge);
```

---

## 🔥 เฉลย Challenge

**โจทย์:** นำความรู้ทั้งหมดมาเขียนโปรแกรมแบบสมบูรณ์ มี Comment และ Style ที่ดี
**เฉลย:**
```csharp
/* 
   โปรแกรมทักทายผู้ใช้งาน
   เขียนโดย: นักเรียน C# Zero to Hero
   วันที่: [วันที่ปัจจุบัน]
*/

namespace UserGreetingApp
{
    class Program
    {
        static void Main(string[] args)
        {
            // ข้อมูลจำลองของผู้ใช้งานระบบ
            string userName = "ศุภชัย";
            int userAge = 25;
            
            // แสดงผลการทักทายพร้อมข้อมูลระบบ
            Console.WriteLine("╔═════════════════════════╗");
            Console.WriteLine("║   Welcome to C# App     ║");
            Console.WriteLine("╚═════════════════════════╝");
            Console.WriteLine(); // เว้นบรรทัด
            
            // ใช้ string concatenation เพื่อต่อข้อความกับตัวแปร
            Console.WriteLine("สวัสดีคุณ " + userName);
            Console.WriteLine("คุณมีอายุ " + userAge + " ปี");
            
            Console.WriteLine();
            
            // แสดงข้อมูลเวอร์ชันของระบบที่ใช้รัน
            Console.WriteLine("--- System Info ---");
            Console.WriteLine("รันอยู่บน: " + Environment.OSVersion.Platform);
            Console.WriteLine("เวอร์ชัน .NET: " + Environment.Version);
        }
    }
}
```
