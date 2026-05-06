# เฉลย Lab: ระบบคัดกรองข้อมูลอัจฉริยะ (Filter System)

## 📝 เฉลยฉบับสมบูรณ์ (ครอบคลุมภารกิจหฤโหด Polymorphic Processor)

ยินดีต้อนรับสู่ **"ร่างจำแลงของ LINQ!"** 
ระบบที่คุณกำลังจะได้เห็นนี้ คือการสร้างเครื่องยนต์ประมวลผลข้อมูล (Data Processing Engine) ที่ทรงพลังที่สุดในโลก C# ที่อาศัยพลังของ `Predicate` (เช็คเงื่อนไข) และ `Action` (สั่งลงมือทำ) มาผสมผสานกันอย่างลงตัวไร้ที่ติ!

**เตรียมรับชมความงามของการออกแบบ (Architecture Design):**
สังเกตคลาส `EmployeeFilter` ให้ดีๆ นะครับ มันช่างโง่เขลาเหลือเกิน... มันไม่รู้จักคำว่า "IT" มันไม่รู้ด้วยซ้ำว่า "เงินเดือน > 50000" หน้าตาเป็นยังไง มันมีหน้าที่แค่ "โง่วนลูป แล้วโยนให้พารามิเตอร์จัดการ" ... นี่แหละครับคือสุดยอดสถาปัตยกรรมแบบ **Separation of Concerns (แยกแยะหน้าที่ชัดเจน)!**

```csharp
using System;
using System.Collections.Generic;

namespace EnterpriseFilterSystem
{
    // ========================================================
    // 1. DATA MODEL (โครงสร้างข้อมูลพนักงาน)
    // ========================================================
    class Employee
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public string Department { get; set; }
        public decimal Salary { get; set; }

        public Employee(string id, string name, int age, string dept, decimal salary)
        {
            Id = id;
            Name = name;
            Age = age;
            Department = dept;
            Salary = salary;
        }

        // ฟอร์แมตปริ้นข้อมูลให้สวยหรู
        public void PrintInfo()
        {
            Console.WriteLine($"- รหัส: {Id} | {Name} | อายุ: {Age} | แผนก: {Department,-4} | เงินเดือน: {Salary:N0} บาท");
        }
    }

    // ========================================================
    // 2. THE ENGINE (เครื่องจักรสารพัดประโยชน์)
    // ========================================================
    static class EmployeeFilter
    {
        // 🌟 ภารกิจหลัก: ตะแกรงร่อนข้อมูล (รับ Predicate เพื่อพิพากษา!)
        public static List<Employee> Filter(List<Employee> list, Predicate<Employee> condition)
        {
            List<Employee> passedList = new List<Employee>();

            foreach (Employee emp in list)
            {
                // โยนประวัติพนักงานให้ "ผู้พิพากษาเงา (Lambda)" หน้างานตัดสินใจ
                if (condition(emp) == true)
                {
                    passedList.Add(emp); // รอด!
                }
            }

            return passedList;
        }

        // 🌟 [ส่วนของ Challenge] เครื่องจักรนักฆ่า: รับคำสั่งไปปฏิบัติการ (รับ Action เพื่อลงมือทำ!)
        public static void ProcessEmployees(List<Employee> list, Action<Employee> action)
        {
            foreach (Employee emp in list)
            {
                // โยนพนักงานให้ "มือสังหารเงา (Lambda)" จัดการเชือดคอหน้างาน!
                action(emp); 
            }
        }
    }

    // ========================================================
    // 3. EXECUTION (ฝ่ายบัญชี / HR ที่เรียกใช้งาน)
    // ========================================================
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("================================================");
            Console.WriteLine("         [ MEGACORP HR FILTER SYSTEM ]          ");
            Console.WriteLine("================================================");
            Console.WriteLine("กำลังโหลดข้อมูลพนักงาน...\n");

            // 1. เตรียม Data (ฐานข้อมูลจำลอง)
            List<Employee> staff = new List<Employee>
            {
                new Employee("E01", "อลิซ", 28, "IT", 55000),
                new Employee("E02", "บ๊อบ", 25, "Sale", 28000),
                new Employee("E03", "ชาลี", 40, "HR", 60000),
                new Employee("E04", "เดวิด", 22, "IT", 32000),
                new Employee("E05", "อีฟ",  35, "Sale", 45000)
            };

            // --------------------------------------------------------
            // 🌟 ช่วงเวลาแห่งเวทมนตร์: ฉีด Lambda (Inline Injection) รัวๆ!
            // --------------------------------------------------------

            Console.WriteLine(">> 1. กรองเอาเฉพาะ 'พนักงานฝ่าย IT':");
            // ลอจิก: ถ้า emp.Department เป็น IT ก็ให้ผ่านได้เลย!
            List<Employee> itStaff = EmployeeFilter.Filter(staff, emp => emp.Department == "IT");
            foreach (var e in itStaff) e.PrintInfo();
            Console.WriteLine();

            Console.WriteLine(">> 2. กรองเอาเฉพาะ 'เงินเดือนเกิน 50,000':");
            // ลอจิก: ถ้าเงินเดือนมากกว่า 50k ให้ผ่าน
            List<Employee> richStaff = EmployeeFilter.Filter(staff, emp => emp.Salary > 50000);
            foreach (var e in richStaff) e.PrintInfo();
            Console.WriteLine();

            Console.WriteLine(">> 3. กรองเอาเฉพาะ 'อายุระหว่าง 25 ถึง 30':");
            // ลอจิก: อายุต้อง >= 25 "และ" <= 30 (ใช้ && เชื่อม)
            List<Employee> targetAgeStaff = EmployeeFilter.Filter(staff, emp => emp.Age >= 25 && emp.Age <= 30);
            foreach (var e in targetAgeStaff) e.PrintInfo();
            Console.WriteLine();

            // --------------------------------------------------------
            // 🌟 ภารกิจท้าทาย: ระบบควบคุมแบบเบ็ดเสร็จ (Action Injection)
            // --------------------------------------------------------
            Console.WriteLine("================================================");
            Console.WriteLine("✨ โบนัส: ระบบอัปเดตเงินเดือน (Action Injection)");
            Console.WriteLine("================================================");

            // โจทย์: เพิ่มเงินเดือน 10% ให้แผนก IT ทุกคน!
            // เราเอา itStaff ที่ร่อนไว้จากข้อ 1 มาใช้ แล้วส่ง Action เข้าไปทะลวงอัปเดตค่า!
            
            EmployeeFilter.ProcessEmployees(itStaff, emp => emp.Salary = emp.Salary * 1.10m);

            Console.WriteLine(">> อัปเดตเงินเดือนพนักงาน IT เพิ่ม 10% เสร็จสิ้น!\n");
            Console.WriteLine(">> รีเฟรชรายชื่อพนักงาน IT ล่าสุด:");
            
            // ปริ้นดูผลงาน (เงินเดือนอลิซต้องเป็น 60,500 และเดวิดต้องเป็น 35,200)
            foreach (var e in itStaff) e.PrintInfo(); 
        }
    }
}
```

### 🧠 บทสรุปวิชาสถาปัตยกรรม (Architectural Conclusion)

จำโมเมนต์วินาทีที่คุณเขียน `emp => emp.Salary * 1.10m` เอาไว้ให้ดีนะครับ! 
เพราะนี่คือ **ต้นแบบของระบบมหาเวทย์ LINQ (Language Integrated Query)** ที่เราจะไปลุยกันในบทสุดท้าย! 

ในโลกของ C# ยุคปัจจุบัน คุณจะ "ไม่เขียนลูป for/foreach ด้วยตัวเองอีกต่อไป" แล้วครับ 
ไมโครซอฟต์ได้สร้างคลาส `EmployeeFilter` ระดับจักรวาลมาเตรียมไว้ให้คุณหมดแล้ว (ชื่อว่าคลาส `Enumerable`) หน้าที่คุณมีแค่โยนก้อนลอจิก Lambda เข้าไปให้มันรันผ่านท่อรัวๆ เช่น:
`staff.Where(e => e.Department == "IT").ToList().ForEach(e => e.Salary *= 1.10m);`
บรรทัดเดียว จบปิ๊ง! โคตรโหด โคตรเถื่อน! และโคตรงดงาม! เตรียมตัวว้าวใน Chapter 12 ได้เลยครับ!
