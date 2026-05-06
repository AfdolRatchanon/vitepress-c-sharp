# เฉลย Lab: ระบบคลังสมบัติอัจฉริยะ (RPG Inventory System)

## 📝 เฉลยฉบับสมบูรณ์ (ครอบคลุมบอสลับ GroupBy)

ยินดีต้อนรับสู่บทสรุปของตำนาน! โค้ดด้านล่างนี้คือการดึงสัจธรรมของ LINQ ออกมาใช้อย่างเต็มเหนี่ยว สังเกตดูความ "สะอาดสะอ้าน" ของคลาส `InventoryManager` นะครับ มันไม่มีการเขียนลูป `foreach` โง่ๆ ไม่มี `if` ไม่มีปีกกายาวเฟื้อย มีแต่ลูกศรแห่งความตาย (`=>`) ที่พุ่งทะลวงเป้าหมายอย่างแม่นยำ! นี่คือกระบวนทัศน์แบบ **Declarative Programming** 100%!

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

namespace RpgInventorySystem
{
    // ========================================================
    // 1. DATA MODEL (โครงสร้างไอเทม)
    // ========================================================
    class Item
    {
        public string Name { get; set; }
        public string Category { get; set; }
        public double Weight { get; set; }
        public int Value { get; set; }
        public string Rarity { get; set; } // Common, Rare, Legendary

        public Item(string name, string cat, double weight, int val, string rarity)
        {
            Name = name; Category = cat; Weight = weight; Value = val; Rarity = rarity;
        }

        // ตัวช่วยปริ้นโชว์ความหล่อ
        public void PrintInfo()
        {
            Console.WriteLine($"- {Name,-20} (หมวด: {Category,-8} | ราคา: {Value,6}G | น้ำหนัก: {Weight,4}kg | ระดับ: {Rarity})");
        }
    }

    // ========================================================
    // 2. THE ENGINE (มันสมองของระบบกระเป๋า)
    // ========================================================
    static class InventoryManager
    {
        // ภารกิจ 1: Where - กรองหมวดหมู่
        public static List<Item> GetWeapons(List<Item> bag) 
            => bag.Where(i => i.Category == "Weapon").ToList();

        // ภารกิจ 2: OrderBy + ThenBy - เรียงสลับซ้อน
        public static List<Item> SortInventory(List<Item> bag) 
            => bag.OrderByDescending(i => i.Value).ThenBy(i => i.Weight).ToList();

        // ภารกิจ 3: Where + Select - กรองเสร็จแล้วลอกคราบเอาแค่ชื่อ
        public static List<string> GetLegendaryNames(List<Item> bag) 
            => bag.Where(i => i.Rarity == "Legendary").Select(i => i.Name).ToList();

        // ภารกิจ 4: Sum - รวมน้ำหนัก
        public static double CalculateTotalWeight(List<Item> bag) 
            => bag.Sum(i => i.Weight);

        // ภารกิจ 5: Any - ถามยามหาคนอ้วน
        public static bool IsAnyOverweight(List<Item> bag, double limit) 
            => bag.Any(i => i.Weight > limit);

        // ภารกิจ 6: OrderBy + FirstOrDefault - สไนเปอร์สอยของแพงสุด
        // ทริค: เรียงราคาให้แพงสุดมาอยู่หัวตาราง แล้วกระชากหัวมันหลุดออกมา!
        public static Item GetMostValuableItem(List<Item> bag) 
            => bag.OrderByDescending(i => i.Value).FirstOrDefault();

        // ========================================================
        // 🌟 ภารกิจลับระดับบอส (GROUP BY)
        // ========================================================
        // สังเกต Type คืนค่า: มันคือ List ของ Object ไร้ชื่อครับ (dynamic หรือ object ก็ได้ แต่ C# มีของดีกว่านั้น)
        // จริงๆ แล้วสถาปนิกมักจะสร้างคลาส DTO ମารับครับ แต่เพื่อความไว เราใช้ dynamic return
        public static IEnumerable<dynamic> GetItemCountByCategory(List<Item> bag)
        {
            return bag
                // รื้อกระเป๋า เทจับกลุ่มรวมกันแยกตาม 'Category' 
                // (ได้ขยะมากองรวมกัน 1 กอง, อาวุธ 1 กอง, ยา 1 กอง)
                .GroupBy(i => i.Category) 
                
                // หยิบทีละกอง (g) มาปั้นร่างจำแลง
                // g.Key คือ "ชื่อหมวดหมู่" ที่ใช้แบ่งกอง
                // g.Count() คือ "การนับจำนวนชิ้น" ภายในกองนั้น!
                .Select(g => new { 
                    CategoryName = g.Key, 
                    ItemCount = g.Count() 
                });
        }
    }

    // ========================================================
    // 3. EXECUTION (หน้าจอเกม)
    // ========================================================
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("================================================");
            Console.WriteLine("         🛡️ [ SYSTEM: INVENTORY DASHBOARD ] 🛡️  ");
            Console.WriteLine("================================================");
            Console.WriteLine("กำลังโหลดข้อมูลคลังสมบัติของท่านอัศวิน...\n");

            List<Item> myBag = new List<Item>
            {
                new Item("ดาบศักดิ์สิทธิ์ Excalibur", "Weapon", 10.5, 50000, "Legendary"),
                new Item("มีดสั้นสนิมเขรอะ", "Weapon", 2.0, 15, "Common"),
                new Item("โล่ไม้โอ๊ค", "Armor", 15.0, 50, "Common"),
                new Item("น้ำยาฟื้นพลัง Elixir", "Potion", 0.5, 100, "Rare"),
                new Item("ขยะเปียกใบไม้", "Junk", 2.5, 0, "Common")
            };

            // 1. หาอาวุธ
            Console.WriteLine(">> 1. ⚔️ อาวุธทั้งหมดในกระเป๋า:");
            foreach(var w in InventoryManager.GetWeapons(myBag)) w.PrintInfo();
            Console.WriteLine();

            // 2. จัดเรียง
            Console.WriteLine(">> 2. 🧮 จัดเรียงไอเทม (แพงสุด -> น้ำหนักเบาสุด):");
            foreach(var item in InventoryManager.SortInventory(myBag)) item.PrintInfo();
            Console.WriteLine();

            // 3. หาสมบัติตำนาน
            Console.WriteLine(">> 3. ✨ รายชื่อสมบัติระดับ 'Legendary':");
            var legends = InventoryManager.GetLegendaryNames(myBag);
            for(int i=0; i<legends.Count; i++) Console.WriteLine($"{i+1}. {legends[i]}");
            Console.WriteLine();

            // 4. คำนวณน้ำหนัก
            Console.WriteLine($">> 4. ⚖️ น้ำหนักรวมของกระเป๋า: {InventoryManager.CalculateTotalWeight(myBag)} kg");

            // 5. แจ้งเตือนน้ำหนักเกิน
            bool isHeavy = InventoryManager.IsAnyOverweight(myBag, 10.0);
            Console.WriteLine($">> 5. ⚠️ แจ้งเตือน: มีไอเทมชิ้นใดหนักเกิน 10kg ไหม? -> {isHeavy.ToString().ToUpper()}");

            // 6. ของแพงสุด
            Console.WriteLine("\n>> 6. 👑 สมบัติที่มีมูลค่าสูงที่สุดในกระเป๋า:");
            var bestItem = InventoryManager.GetMostValuableItem(myBag);
            if (bestItem != null) {
                Console.WriteLine($"- [{bestItem.Name}] มูลค่า {bestItem.Value}G");
            }

            // ========================================================
            // 🌟 บทสรุปบอสลับ (Grouping)
            // ========================================================
            Console.WriteLine("\n================================================");
            Console.WriteLine("🌟 สรุปจำนวนไอเทมแยกตามหมวดหมู่ (GROUP BY)");
            Console.WriteLine("================================================");

            var summary = InventoryManager.GetItemCountByCategory(myBag);
            
            foreach(var groupInfo in summary)
            {
                // ดึงค่าจากตัวแปรจำแลง (Anonymous Type) มาใช้ได้เลย โคตรเท่!
                Console.WriteLine($"- หมวด {groupInfo.CategoryName,-8} มีทั้งหมด: {groupInfo.ItemCount} ชิ้น");
            }
            Console.WriteLine("================================================\n");
        }
    }
}
```

### 🧠 บทสรุปวิชาสถาปัตยกรรม (Architectural Conclusion)

ยินดีด้วยครับ! คุณได้สำเร็จวิชาขั้นสูงสุดของหลักสูตร C# แล้ว!
ฟังก์ชัน GroupBy (`GetItemCountByCategory`) ที่คุณเห็น คือ **"หัวใจ"** ของการทำรายงาน Dashboard และ Data Analytics ทั่วโลกครับ 
ถ้าคุณเข้าใจว่ามันทำหน้าที่ "รื้อตะกร้ามาตั้งกองรวมกัน (Group)" แล้วเอาไม้กายสิทธิ์ชี้ไปที่ยอดกองเพื่อปั้นข้อมูลใหม่ (`Select`) ... คุณก็พร้อมจะไปลุยโลกกว้างของการสร้าง Web Service และ Entity Framework แล้วครับ! ขอให้สนุกกับชีวิตโปรแกรมเมอร์ยุคสถาปนิกครับ!
