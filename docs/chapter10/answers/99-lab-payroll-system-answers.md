# เฉลย Lab: ระบบจัดการเงินเดือนพนักงานบริษัท (Payroll System)

## 📝 เฉลยฉบับสมบูรณ์ (ครอบคลุมภารกิจหักภาษี The Polymorphic Tax Deductor)

นี่คือ "สถาปัตยกรรมระดับซีเนียร์ (Senior Architecture)" ที่ใช้งานจริงในระบบ ERP ระดับ Enterprise! สังเกตความงดงามของการไหลของข้อมูล:
- **`abstract` (คัมภีร์วิญญาณ):** บังคับให้ลูกทุกอาชีพ ต้องมีสูตรเงินเดือนของตัวเอง! (ห้ามลืม)
- **`virtual` (ประตูบานเปิด):** แม่เปิดทางเลือกให้ ว่าอยากจะอวดดีเทลยอดขายเพิ่มไหม? อยากจะเปลี่ยนเรทภาษีใหม่ไหม?
- **`base` (โทรสายตรงหาแม่):** โยนภาระอันหนักอึ้ง เช่น ไอดีพนักงาน, หรือการปริ้นชื่อ... โยนกลับไปให้แม่รับจบให้หมด! (ลูกไม่ต้องพิมพ์ซ้ำ)

```csharp
using System;

namespace EnterprisePayrollSystem
{
    // ========================================================
    // [คัมภีร์วิญญาณแม่: พนักงานทุกคนต้องมีโครงสร้างนี้]
    // ========================================================
    abstract class Employee
    {
        public string EmployeeId { get; set; }
        public string Name { get; set; }

        public Employee(string id, string name)
        {
            EmployeeId = id;
            Name = name;
        }

        // 🌟 กฎหมายข้อ 1: ลูกทุกคน "ต้อง" มีสูตรคำนวณเงินเดือน!
        public abstract decimal CalculateSalary();

        // 🌟 กฎหมายข้อ 2 (เสริมอิสระ): แม่เตรียมสูตรปริ้นข้อมูลมาตรฐานให้แล้ว ถ้าลูกอยากเสริมอะไร ก็ override เอา!
        public virtual void ShowDetails()
        {
            Console.WriteLine($"\n[รหัส {EmployeeId}] คุณ {Name}");
        }

        // 🌟 [ส่วนของ Challenge] สูตรคำนวณภาษีพื้นฐาน: 
        // ฐานแม่กำหนดให้ปลอดภาษี (คืนค่า 0) แต่ยอมให้ลูก (เช่น พนักงานประจำ) เอาไปแก้สูตรทับได้
        public virtual decimal CalculateTax(decimal grossSalary)
        {
            return 0; // ไม่มีภาษี
        }
    }

    // ========================================================
    // [ลูกสายที่ 1: พนักงานประจำ Full-Time]
    // ========================================================
    class FullTimeEmployee : Employee
    {
        public decimal MonthlySalary { get; set; }

        // โยน ไอดี กับ ชื่อ ขึ้นท่อ base ไปให้แม่รับจบ
        public FullTimeEmployee(string id, string name, decimal salary) : base(id, name)
        {
            MonthlySalary = salary;
        }

        // สูตรเงินเดือน: จ่ายเต็มเดือน
        public override decimal CalculateSalary()
        {
            return MonthlySalary;
        }

        // เสริมพิเศษ: Override ขอเรียกสูตรเก่าแม่มาปริ้นท์ก่อน แล้วแถมท้ายด้วยวงเล็บ (พนักงานประจำ)
        public override void ShowDetails()
        {
            base.ShowDetails(); 
            Console.WriteLine(" (สถานะ: พนักงานประจำ)");
        }

        // 🌟 [ส่วนของ Challenge] ก่อกบฏสูตรภาษี! (พนักงานประจำโดนหักภาษีอ่วม)
        public override decimal CalculateTax(decimal grossSalary)
        {
            if (grossSalary > 20000)
            {
                return grossSalary * 0.10m; // หัก 10% 
            }
            else
            {
                return grossSalary * 0.05m; // หัก 5%
            }
        }
    }

    // ========================================================
    // [ลูกสายที่ 2: พนักงานชั่วคราว Part-Time]
    // ========================================================
    class ContractEmployee : Employee
    {
        public decimal HourlyRate { get; set; }
        public int HoursWorked { get; set; }

        public ContractEmployee(string id, string name, decimal rate, int hours) : base(id, name)
        {
            HourlyRate = rate;
            HoursWorked = hours;
        }

        // สูตรเงินเดือน: เอาเรทคูณชั่วโมงทำงาน
        public override decimal CalculateSalary()
        {
            return HourlyRate * HoursWorked;
        }

        public override void ShowDetails()
        {
            base.ShowDetails();
            Console.WriteLine($" (สถานะ: พนักงานพาร์ทไทม์ ทำไป {HoursWorked} ชม.)");
        }
        // พาร์ทไทม์รับเงินสดรอดตัวไป (สืบทอดภาษี 0 บาทของแม่มาใช้โดยอัตโนมัติ)
    }

    // ========================================================
    // [ลูกสายที่ 3: พนักงานขาย Salesman]
    // ========================================================
    class SalesEmployee : Employee
    {
        public decimal BaseSalary { get; set; }
        public decimal SalesVolume { get; set; }
        public decimal CommissionRate { get; set; }

        public SalesEmployee(string id, string name, decimal baseS, decimal sales, decimal comm) : base(id, name)
        {
            BaseSalary = baseS;
            SalesVolume = sales;
            CommissionRate = comm;
        }

        // สูตรเงินเดือน: ฐาน + (ยอดขาย x คอมมิชชัน)
        public override decimal CalculateSalary()
        {
            return BaseSalary + (SalesVolume * CommissionRate);
        }

        public override void ShowDetails()
        {
            base.ShowDetails();
            Console.WriteLine(" (สถานะ: พนักงานขาย)");
            Console.WriteLine($" -> ยอดขายเดือนนี้: {SalesVolume:N2} บาท (คอมมิชชั่น {CommissionRate*100}%)");
        }
    }

    // ========================================================
    // [วาทยกรผู้สั่งการ (Main Execution)]
    // ========================================================
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("================================================");
            Console.WriteLine("          [ PAYROLL SYSTEM v2.0 ]               ");
            Console.WriteLine("================================================");
            Console.WriteLine("กำลังประมวลผลการจ่ายเงินเดือนประจำเดือนนี้...");

            // 1. จ้างพนักงานลง Array กล่องแม่ (Polymorphism)
            Employee[] company = new Employee[3];
            company[0] = new FullTimeEmployee("E-001", "สมชาย", 30000); 
            company[1] = new ContractEmployee("C-002", "สมหญิง", 100, 120); // 100 บาท/ชม ทำ 120 ชม.
            company[2] = new SalesEmployee("S-003", "สมศักดิ์", 15000, 200000, 0.05m); // ฐาน15k ยอดขาย2แสน คอม5%

            decimal totalPayroll = 0;

            // 2. วนลูปจ่ายเงิน!
            foreach (Employee emp in company)
            {
                // C# ดิ่งไปหยิบฟังก์ชันโชว์ข้อมูลของลูกแต่ละคนมาใช้อย่างแม่นยำ
                emp.ShowDetails();

                // 🌟 ก้อนเงินเดือนดิบ (Gross)
                decimal gross = emp.CalculateSalary();

                // 🌟 [ส่วนของ Challenge] หักภาษี (Tax)
                decimal tax = emp.CalculateTax(gross);

                // เงินสุทธิ (Net)
                decimal netSalary = gross - tax;

                // สรุปสลิปรายบุคคล
                Console.ForegroundColor = ConsoleColor.Green;
                Console.WriteLine($" -> เงินเดือนสุทธิ: {netSalary:N2} บาท");
                Console.ResetColor();

                if (tax > 0)
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine($"    (โดนหักภาษี ณ ที่จ่าย: -{tax:N2} บาท)");
                    Console.ResetColor();
                }

                // สะสมยอดรายจ่ายรวมขององค์กร
                totalPayroll += gross; 
            }

            Console.WriteLine("\n------------------------------------------------");
            Console.WriteLine($"📊 สรุปยอดเงินเดือนพนักงานรวมทั้งหมด (Total Payroll): {totalPayroll:N2} บาท");
            Console.WriteLine("================================================");
        }
    }
}
```

### 🧠 บทสรุปวิชาสถาปัตยกรรม (Architectural Conclusion)

ยินดีต้อนรับเข้าสู่ยอดเขาเอเวอเรสต์ของโลก Object-Oriented ครับ! 
ลองจินตนาการดูสิครับว่า ถ้าผมสั่งคุณให้ "เพิ่มระบบพนักงานขับรถขนส่ง (Driver) ที่รับเงินเป็นรายเที่ยว"... คุณต้องทำยังไง?
- **ถ้าคุณเป็นเด็กจบใหม่ (Procedural):** คุณต้องเปิดไฟล์ `Main` วิ่งเข้าไปแทรก `if (emp.Job == "Driver")` เป็นกระบุงโกย แถมถ้าเผลอไปลบปีกกาของ `if` อันเก่าผิด โค้ดของเซลล์แมนก็จะพังพินาศตามไปด้วย!
- **แต่ในฐานะสถาปนิก (OOP Polymorphism):** คุณห้ามไปแตะต้องไฟล์ `Main` เด็ดขาด! คุณแค่ปิดหน้าต่างเก่าทิ้ง เปิดไฟล์ใหม่แล้วสร้าง `class Driver : Employee` เขียนสูตรเงินเดือนของมันให้เสร็จ... แล้วจบงานได้เลย! 

นี่คือสุดยอดความสง่างามที่เรียกว่า **"The Open-Closed Principle"** (เปิดรับการขยายคลาสใหม่เสมอ แต่ปิดตายห้ามกลับไปแก้โค้ดแม่ในอดีตเด็ดขาด) ซึ่งจะช่วยให้ชีวิตของคุณและบริษัทของคุณมั่นคงระดับร้อยล้านพันล้านครับ!
