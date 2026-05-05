# Hello World: โปรแกรมแรก

> 💡 **เป้าหมาย:** เขียนและเข้าใจโปรแกรม C# บรรทัดแรก รู้จัก `Console.WriteLine` และ `Console.Write` รวมถึงความแตกต่างระหว่างทั้งสอง

## 📖 ทฤษฎีและแนวคิด (Theory & Concepts)

### Console คืออะไร?

`Console` คือ **Class** ที่ .NET เตรียมไว้ให้ สำหรับรับส่งข้อมูลผ่าน Terminal/Command Prompt โดยมี **Method** หลักที่ใช้บ่อย 2 กลุ่ม:

```text
Console Class — Methods ที่ต้องรู้:

  ┌──────────────────────────────────────────────────────┐
  │                    Console                           │
  │                                                      │
  │  OUTPUT (แสดงผล):                                   │
  │  ├── Console.Write(text)       ← แสดงแล้วอยู่บรรทัดเดิม
  │  └── Console.WriteLine(text)   ← แสดงแล้วขึ้นบรรทัดใหม่
  │                                                      │
  │  INPUT (รับข้อมูล):                                  │
  │  ├── Console.ReadLine()        ← อ่านทั้งบรรทัด (string)
  │  └── Console.ReadKey()         ← อ่าน 1 ตัวอักษร        │
  └──────────────────────────────────────────────────────┘
```

### WriteLine vs Write ต่างกันอย่างไร?

```text
ผลลัพธ์บนหน้าจอ:

Console.Write("A");
Console.Write("B");
Console.Write("C");
→ ผลลัพธ์: ABC    (อยู่บรรทัดเดียวกัน)

Console.WriteLine("A");
Console.WriteLine("B");
Console.WriteLine("C");
→ ผลลัพธ์:
  A
  B
  C              (แต่ละตัวอยู่คนละบรรทัด)
```

### String Literal คืออะไร?

ข้อความที่อยู่ในเครื่องหมาย `"..."` เรียกว่า **String Literal** ซึ่งเป็นค่าข้อความตรงๆ ที่เราพิมพ์ลงไปในโค้ด

```text
  Console.WriteLine("Hello, World!");
                    ├──────────────┤
                    String Literal
                    (ข้อความที่จะแสดงผล)
```

### Escape Characters — ตัวอักษรพิเศษในข้อความ

บางครั้งต้องการแทรกตัวอักษรพิเศษในข้อความ ใช้ `\` นำหน้า:

| Escape | ความหมาย | ตัวอย่างผลลัพธ์ |
| :---: | :--- | :--- |
| `\n` | ขึ้นบรรทัดใหม่ | บรรทัดถัดไป |
| `\t` | Tab (เว้นวรรค 4 ช่อง) | → ยืด |
| `\\` | แสดง Backslash `\` | `\` |
| `\"` | แสดง Double Quote `"` | `"` |

## 💻 ตัวอย่างโค้ด (Code Implementation)

### ตัวอย่างที่ 1: Hello World พื้นฐาน

::: code-group
```csharp [Program.cs]
// [1] แสดงข้อความแล้วขึ้นบรรทัดใหม่
Console.WriteLine("Hello, World!");

// [2] แสดงหลายบรรทัด
Console.WriteLine("ยินดีต้อนรับสู่ C#");
Console.WriteLine("นี่คือโปรแกรมแรกของฉัน");
```
:::

**Expected Output:**
```
Hello, World!
ยินดีต้อนรับสู่ C#
นี่คือโปรแกรมแรกของฉัน
```

---

### ตัวอย่างที่ 2: ความแตกต่างระหว่าง Write และ WriteLine

::: code-group
```csharp [Program.cs]
// [1] Write ไม่ขึ้นบรรทัดใหม่ — ข้อความต่อกัน
Console.Write("ชื่อ: ");
Console.Write("สมชาย");
Console.Write("  อายุ: ");
Console.Write(25);

// [2] บรรทัดใหม่ด้วย WriteLine ว่างๆ
Console.WriteLine();

// [3] WriteLine ขึ้นบรรทัดใหม่ทันที
Console.WriteLine("--- จบข้อมูล ---");
```
:::

**Expected Output:**
```
ชื่อ: สมชาย  อายุ: 25
--- จบข้อมูล ---
```

---

### ตัวอย่างที่ 3: Escape Characters

::: code-group
```csharp [Program.cs]
// [1] \n คือขึ้นบรรทัดใหม่ภายในข้อความเดียวกัน
Console.WriteLine("บรรทัดที่ 1\nบรรทัดที่ 2\nบรรทัดที่ 3");

// [2] \t คือ Tab
Console.WriteLine("ชื่อ:\tสมชาย");
Console.WriteLine("อายุ:\t25 ปี");

// [3] \" ในข้อความ
Console.WriteLine("เขาพูดว่า \"สวัสดี\"");
```
:::

**Expected Output:**
```
บรรทัดที่ 1
บรรทัดที่ 2
บรรทัดที่ 3
ชื่อ:   สมชาย
อายุ:   25 ปี
เขาพูดว่า "สวัสดี"
```

---

### ตัวอย่างที่ 4: แสดงผลตัวเลขและการคำนวณ

::: code-group
```csharp [Program.cs]
// [1] แสดงตัวเลขโดยตรง (ไม่ต้องใช้ "")
Console.WriteLine(42);
Console.WriteLine(3.14);

// [2] แสดงผลการคำนวณ
Console.WriteLine(10 + 5);    // ได้ 15
Console.WriteLine(10 * 3);    // ได้ 30
```
:::

**Expected Output:**
```
42
3.14
15
30
```

## 🎯 โจทย์ฝึกปฏิบัติเสริมความเข้าใจ (Mini Exercise)

- **โจทย์ที่ 1:** เขียนโปรแกรมแสดงข้อมูลส่วนตัวของตัวเองในรูปแบบนี้ **โดยใช้ `Console.Write` และ `Console.WriteLine` ผสมกัน** (ห้ามใช้แค่ `WriteLine` อย่างเดียว):
  ```
  ชื่อ: [ชื่อของคุณ]     อายุ: [อายุ] ปี
  เป้าหมาย: [เป้าหมายที่อยากทำด้วย C#]
  ```

- **โจทย์ที่ 2:** เขียนโปรแกรมวาด "กรอบ" ด้วยตัวอักษรใน Console โดยไม่ใช้ `\n` ในบรรทัดเดียว (ใช้ `Console.WriteLine` หลายครั้ง):
  ```
  ╔════════════╗
  ║  C# Hero!  ║
  ╚════════════╝
  ```

::: details 💡 คำใบ้ (Hint)
- สำหรับโจทย์ 1: ใช้ `Console.Write("ชื่อ: ")` แล้วต่อด้วย `Console.Write(ชื่อ)` จากนั้น `Console.Write("  อายุ: ")` ...
- สำหรับโจทย์ 2: แค่ `Console.WriteLine` 3 ครั้งสำหรับแต่ละบรรทัดของกรอบ ตัวอักษรพิเศษ ╔ ╗ ╚ ╝ ║ ═ วางได้ตรงๆ ในสตริง
:::

## 🔥 Challenge (โจทย์ท้าทาย!)

- **โจทย์:** เขียนโปรแกรมแสดงตาราง Multiplication Table (สูตรคูณ) ของ 3 ตั้งแต่ 3×1 ถึง 3×10 ในรูปแบบ:
  ```
  3 x 1 = 3
  3 x 2 = 6
  ...
  3 x 10 = 30
  ```
  โดย **ห้าม** พิมพ์ผลลัพธ์ตรงๆ ต้องให้โปรแกรมคำนวณเอง และ **ห้าม** เลื่อนกลับไปดูตัวอย่างโค้ดด้านบน

## 🗣️ ทบทวน (Review)

::: details ❓ คำถามทบทวนความเข้าใจ

**คำถาม 1:** `Console.WriteLine()` ที่ไม่ใส่ argument ใดๆ จะทำอะไร?
**แนวคำตอบ:** จะพิมพ์บรรทัดว่างๆ (แค่ขึ้นบรรทัดใหม่) ไม่มีข้อความ มีประโยชน์สำหรับเว้นบรรทัดให้ Output ดูสวยขึ้น

**คำถาม 2:** ถ้าต้องการแสดงข้อความว่า `C:\Users\John` ใน Console จะเขียนโค้ดอย่างไร?
**แนวคำตอบ:** ใช้ `Console.WriteLine("C:\\Users\\John")` (ต้องเพิ่ม `\\` เพื่อ escape backslash) หรือใช้ verbatim string: `Console.WriteLine(@"C:\Users\John")`
:::
