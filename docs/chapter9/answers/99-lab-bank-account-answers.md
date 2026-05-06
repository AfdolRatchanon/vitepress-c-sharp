# เฉลย Lab: ระบบบัญชีธนาคาร (Bank Account)

## 📝 เฉลยฉบับสมบูรณ์ (ครอบคลุมภารกิจ Audit Logger ด้วย Array)

นี่คือโครงสร้างสถาปัตยกรรมระดับกลาง (Intermediate Architecture) ที่บริษัทพัฒนาซอฟต์แวร์ของจริงใช้ในการเขียนระบบ Back-End ครับ! 
สังเกตการผสมผสานระหว่าง State ส่วนตัวของออบเจกต์ (ยอดเงิน), State ส่วนกลางของเซิร์ฟเวอร์ (ยอดจำนวนผู้เปิดบัญชี), การปกป้องข้อมูลด้วยด่านตรวจ `if/else`, และการเก็บประวัติกิจกรรม (Log) เอาไว้ใน Array อย่างเป็นระเบียบ

```csharp
using System;

namespace CoreBankingSystem
{
    // ========================================================
    // [คลาสพิมพ์เขียวหลัก] 
    // ========================================================
    class BankAccount
    {
        // -----------------------------------------------------------
        // 1. หมวดการห่อหุ้มสถานะ (State & Encapsulation)
        // -----------------------------------------------------------
        
        // ข้อมูลพื้นฐาน อ่านได้อย่างเดียว (Read-only Auto-Properties)
        public string AccountName { get; private set; }
        public string AccountNumber { get; private set; }

        // ตัวแปรลับสุดยอด สำหรับเก็บยอดเงินจริงๆ
        private decimal _balance;

        // ประตูให้คนนอกเปิดดูยอดเงิน (หน้าปัดโชว์ตัวเลข)
        public decimal Balance
        {
            get { return _balance; }
        }

        // ตัวแปรนับจำนวนส่วนกลาง (Static) 
        public static int TotalAccountsCreated { get; private set; } = 0;

        // 🌟 [ส่วนของ Challenge] ตัวแปรสำหรับเก็บประวัติ (Audit Logger)
        private string[] _history;
        private int _historyCount = 0;

        // -----------------------------------------------------------
        // 2. หมวดพิธีกรรมแรกเกิด (Constructor)
        // -----------------------------------------------------------
        public BankAccount(string name, string accNumber)
        {
            // บังคับลงทะเบียนชื่อและเลขบัญชี
            this.AccountName = name;
            this.AccountNumber = accNumber;
            
            // ยอดเงินเริ่มที่ 0
            this._balance = 0;

            // 🌟 [ส่วนของ Challenge] จองพื้นที่สมุดบัญชี 10 บรรทัดเตรียมไว้
            this._history = new string[10];

            // แจ้งเตือนกระดานส่วนกลางว่า มีบัญชีเกิดใหม่แล้ว! (Global Counter)
            TotalAccountsCreated++;

            Console.WriteLine($"[ 🏦 ระบบ ] เปิดบัญชีสำเร็จ! ({AccountNumber}) ชื่อบัญชี: {AccountName}");
            
            // บันทึกประวัติหน้าแรก
            LogHistory("เปิดบัญชีใหม่");
        }

        // -----------------------------------------------------------
        // 3. หมวดช่องทางทำธุรกรรม (Methods)
        // -----------------------------------------------------------
        
        // 💸 ระบบฝากเงิน
        public void Deposit(decimal amount)
        {
            if (amount <= 0)
            {
                Console.WriteLine($"❌ [ธนาคาร] ปฏิเสธ: จำนวนเงินฝากต้องมากกว่า 0 บาท");
                return; // ดีดตัวออก
            }

            // ถ้าผ่าน ก็อัปเดตเซฟ
            _balance += amount;
            
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine($"✅ [{AccountNumber}] ฝากเงิน: {amount} บาท | ยอดคงเหลือ: {_balance:F2} บาท");
            Console.ResetColor();

            // บันทึกประวัติ
            LogHistory($"+ ฝากเงิน {amount} บาท (ยอด: {_balance:F2})");
        }

        // 💸 ระบบถอนเงิน
        public void Withdraw(decimal amount)
        {
            if (amount <= 0)
            {
                Console.WriteLine($"❌ [{AccountNumber}] ปฏิเสธ: จำนวนเงินถอนต้องมากกว่า 0 บาท");
                return;
            }

            if (amount > _balance)
            {
                Console.WriteLine($"❌ [{AccountNumber}] ปฏิเสธ: ยอดเงินในบัญชีไม่พอ (มียอดเพียง {_balance:F2} บาท)");
                return;
            }

            // หักเงิน
            _balance -= amount;
            
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine($"✅ [{AccountNumber}] ถอนเงิน: {amount} บาท | ยอดคงเหลือ: {_balance:F2} บาท");
            Console.ResetColor();

            // บันทึกประวัติ
            LogHistory($"- ถอนเงิน {amount} บาท (ยอด: {_balance:F2})");
        }

        // -----------------------------------------------------------
        // 🌟 [ส่วนของ Challenge] หมวดบันทึกประวัติ 
        // -----------------------------------------------------------
        
        // เมธอด Helper ลับส่วนตัว (private method) เอาไว้ทำหน้าที่เขียน Array
        private void LogHistory(string message)
        {
            // ดักจับถ้าสมุดเต็ม (ป้องกัน Array Out of Bounds)
            if (_historyCount < _history.Length)
            {
                _history[_historyCount] = message;
                _historyCount++;
            }
        }

        // เมธอดสำหรับปริ้นท์สมุดบัญชี (public ให้คนนอกเรียกดูได้)
        public void PrintStatement()
        {
            Console.WriteLine($"\n--- สมุดบัญชี {AccountNumber} ({AccountName}) ---");
            
            // วนลูปอ่าน Array จนถึงบรรทัดที่บันทึกล่าสุด
            for (int i = 0; i < _historyCount; i++)
            {
                Console.WriteLine($" {i+1}. {_history[i]}");
            }
            Console.WriteLine("------------------------------------------");
        }
    }

    // ========================================================
    // [ผู้จัดการรันระบบ] 
    // ========================================================
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("================================================");
            Console.WriteLine("          [ CORE BANKING SYSTEM ]               ");
            Console.WriteLine("================================================\n");

            // 1. สร้างบัญชี
            BankAccount john = new BankAccount("John Doe", "A-1001");
            BankAccount alice = new BankAccount("Alice Smith", "A-1002");

            Console.WriteLine("\n================================================");
            Console.WriteLine("[ 💸 จำลองธุรกรรม (Transactions) ]");
            Console.WriteLine("================================================");

            // 2. ทดสอบลอจิกฝาก/ถอน
            Console.WriteLine("\n>> John Doe พยายามฝากเงิน -500 บาท");
            john.Deposit(-500);

            Console.WriteLine("\n>> John Doe ฝากเงิน 1500 บาท");
            john.Deposit(1500);

            Console.WriteLine("\n>> Alice Smith พยายามถอนเงิน 2000 บาท");
            alice.Withdraw(2000);

            Console.WriteLine("\n>> John Doe ถอนเงิน 300 บาท");
            john.Withdraw(300);

            // 3. ทดสอบระบบประวัติการทำธุรกรรม (Challenge)
            john.PrintStatement();

            Console.WriteLine("\n================================================");
            Console.WriteLine("[ 📊 สรุปสถิติประจำวัน (Daily Report) ]");
            Console.WriteLine("================================================");

            // เรียกดูจำนวนรวมผ่านคำว่า BankAccount (Static)
            Console.WriteLine($"จำนวนบัญชีทั้งหมดที่ถูกสร้างในระบบ: {BankAccount.TotalAccountsCreated} บัญชี");
            
            // เรียกดูข้อมูลส่วนตัวผ่านตัวแปร john/alice (Instance)
            Console.WriteLine($"ยอดเงินคงเหลือ {john.AccountName} ({john.AccountNumber}) : {john.Balance:F2} บาท");
            Console.WriteLine($"ยอดเงินคงเหลือ {alice.AccountName} ({alice.AccountNumber}) : {alice.Balance:F2} บาท");
        }
    }
}
```

### 🧠 บทสรุปวิชาสถาปัตยกรรม (Architectural Conclusion)

ยินดีต้อนรับเข้าสู่โลกของ **"นักออกแบบซอฟต์แวร์เชิงออบเจกต์ (Object-Oriented Designer)"** ครับ! 
คุณเพิ่งเขียนโครงสร้างโค้ดที่สามารถ "สเกล (Scale)" เพื่อรองรับลูกค้า 100,000 คนพร้อมกันได้ โดยที่โค้ดไม่มีวันพังทลายหรือยอดเงินสลับมั่วคนกันเลย!

โปรดสังเกต **Private Helper Method (`LogHistory`)**: 
นี่คือทริคการซ่อนความซับซ้อนที่งดงามมากครับ... ลูกค้าที่เรียก `john.Deposit(1500)` ไม่จำเป็นต้องรู้เลยว่าเบื้องหลังมีตรรกะ Array นั่งปวดหัวนับบรรทัดทำงานอยู่! (Abstraction) ลูกค้าแค่เรียกเมธอดโง่ๆ แล้วธนาคาร (คลาส) จะรับจบเคลียร์ทุกอย่างให้หมดจดเอง! 

และนี่คือพลังที่แท้จริงของ **Object-Oriented Programming** ครับ!
