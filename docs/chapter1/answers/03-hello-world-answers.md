# เฉลย: Hello World: โปรแกรมแรก

## 🎯 เฉลย Mini Exercise

**โจทย์ที่ 1:** เขียนโปรแกรมแสดงข้อมูลส่วนตัว โดยใช้ `Console.Write` และ `Console.WriteLine` ผสมกัน
**เฉลย:**
```csharp
// บรรทัดแรกใช้ Write 3 ครั้งให้ต่อกัน และปิดด้วย WriteLine เพื่อขึ้นบรรทัดใหม่
Console.Write("ชื่อ: ");
Console.Write("อัษฎาวุธ ใจดี");
Console.Write("     อายุ: ");
Console.WriteLine("20 ปี");

// บรรทัดที่สองใช้ WriteLine ได้เลย
Console.Write("เป้าหมาย: ");
Console.WriteLine("เขียนโปรแกรม C# ให้คล่องแคล่ว");
```

**โจทย์ที่ 2:** วาดกรอบด้วยข้อความ
**เฉลย:**
```csharp
Console.WriteLine("╔════════════╗");
Console.WriteLine("║  C# Hero!  ║");
Console.WriteLine("╚════════════╝");
```

---

## 🔥 เฉลย Challenge

**โจทย์:** เขียนโปรแกรมแสดงตารางสูตรคูณแม่ 3 (ให้คำนวณเอง)
**เฉลย:**
การคำนวณตัวเลขใน `WriteLine` ต้องอยู่นอกเครื่องหมายคำพูด (String Literal) และใช้เครื่องหมาย `+` เพื่อเชื่อมข้อความกับตัวเลข (String Concatenation)

```csharp
Console.WriteLine("3 x 1 = " + (3 * 1));
Console.WriteLine("3 x 2 = " + (3 * 2));
Console.WriteLine("3 x 3 = " + (3 * 3));
Console.WriteLine("3 x 4 = " + (3 * 4));
Console.WriteLine("3 x 5 = " + (3 * 5));
Console.WriteLine("3 x 6 = " + (3 * 6));
Console.WriteLine("3 x 7 = " + (3 * 7));
Console.WriteLine("3 x 8 = " + (3 * 8));
Console.WriteLine("3 x 9 = " + (3 * 9));
Console.WriteLine("3 x 10 = " + (3 * 10));
```
*(ในบทต่อๆ ไปเมื่อเราเรียนรู้เรื่องตัวแปร (Variables) และการวนซ้ำ (Loops) เราจะสามารถเขียนสูตรคูณนี้ได้สั้นลงเหลือเพียงแค่ 3 บรรทัดเท่านั้น!)*
