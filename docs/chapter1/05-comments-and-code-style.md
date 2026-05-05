# Comments & Code Style

> 💡 **เป้าหมาย:** รู้จักวิธีเขียน Comment ทุกแบบใน C# และเข้าใจ Code Style มาตรฐานที่ทำให้โค้ดอ่านง่าย — โค้ดดีไม่ได้วัดแค่ว่ารันได้ แต่วัดด้วยว่าคนอื่นอ่านแล้วเข้าใจหรือเปล่า

## 📖 ทฤษฎีและแนวคิด (Theory & Concepts)

### Comment คืออะไร และทำไมถึงสำคัญ?

Comment คือข้อความที่ **Compiler ไม่อ่าน** มีไว้สำหรับมนุษย์เท่านั้น ใช้เพื่อ:
- อธิบายว่าโค้ดทำอะไร (โดยเฉพาะส่วนที่ซับซ้อน)
- ทิ้งข้อความหมายเหตุให้ตัวเองหรือทีม
- ปิดโค้ดชั่วคราวโดยไม่ต้องลบ

```text
Comment ใน C# มี 3 แบบ:

  ┌──────────────────────────────────────────────────────┐
  │                                                      │
  │  // Single-line comment                              │
  │  (ใช้บ่อยที่สุด สำหรับอธิบายบรรทัดเดียว)          │
  │                                                      │
  │  /* Multi-line comment                               │
  │     ใช้เมื่อต้องการ comment หลายบรรทัด             │
  │     หรือ comment block ขนาดใหญ่ */                   │
  │                                                      │
  │  /// XML Documentation comment                       │
  │  /// ใช้สำหรับ document API / Method อย่างเป็นทางการ│
  │  (ปรากฏใน IntelliSense ของ VS Code)                 │
  │                                                      │
  └──────────────────────────────────────────────────────┘
```

### Comment ที่ดี vs Comment ที่ไม่ดี

```text
❌ Comment ที่ไม่มีประโยชน์ (บอกสิ่งที่โค้ดก็บอกอยู่แล้ว):

  // บวก 1 เข้ากับ count
  count = count + 1;

✅ Comment ที่มีประโยชน์ (อธิบาย "ทำไม" ไม่ใช่ "อะไร"):

  // เพิ่ม count ทุกครั้งที่ผู้ใช้กดปุ่ม Retry
  // ใช้ตรวจสอบว่าเกิน 3 ครั้งจะ lock account
  count = count + 1;
```

### C# Naming Conventions มาตรฐาน

```text
กฎการตั้งชื่อที่นักพัฒนา C# ใช้:

  ┌───────────────────────────────────────────────────┐
  │  สิ่งที่ตั้งชื่อ        │  รูปแบบ      │  ตัวอย่าง         │
  ├───────────────────────────────────────────────────┤
  │  Class / Struct         │  PascalCase  │  StudentRecord    │
  │  Method                 │  PascalCase  │  CalculateGrade() │
  │  Property               │  PascalCase  │  StudentName      │
  │  Variable (local)       │  camelCase   │  studentName      │
  │  Parameter              │  camelCase   │  firstName        │
  │  Constant               │  PascalCase  │  MaxRetryCount    │
  │  Private field          │  _camelCase  │  _studentName     │
  └───────────────────────────────────────────────────┘

  PascalCase: ตัวแรกของทุกคำเป็นตัวพิมพ์ใหญ่
  camelCase:  ตัวแรกของคำแรกเป็นตัวพิมพ์เล็ก คำถัดไปพิมพ์ใหญ่
```

### Indentation & Formatting

```text
กฎการจัดรูปแบบโค้ด:

  ✅ ถูกต้อง:
  if (score >= 50)
  {
      Console.WriteLine("ผ่าน");   ← เยื้อง 4 spaces (หรือ 1 Tab)
  }

  ❌ ผิด (อ่านยาก):
  if(score>=50){Console.WriteLine("ผ่าน");}
```

## 💻 ตัวอย่างโค้ด (Code Implementation)

### ตัวอย่างที่ 1: การใช้ Comment แบบต่างๆ

::: code-group
```csharp [Program.cs]
// [1] Single-line comment — อธิบายบรรทัดถัดไป
// แสดงหัวข้อของโปรแกรม
Console.WriteLine("=== ระบบจัดการคะแนน ===");

/* [2] Multi-line comment — ใช้อธิบายส่วนที่ซับซ้อน
   หรือปิดกั้น block ของโค้ดชั่วคราว
   ในกรณีนี้ใช้อธิบาย logic การแปลงเกรด */
int score = 85;

// [3] Inline comment — อธิบายหลัง expression
int passingScore = 50;  // คะแนนขั้นต่ำที่ผ่าน

Console.WriteLine("คะแนน: " + score);
Console.WriteLine("เกณฑ์ผ่าน: " + passingScore);
```
:::

**Expected Output:**
```
=== ระบบจัดการคะแนน ===
คะแนน: 85
เกณฑ์ผ่าน: 50
```

---

### ตัวอย่างที่ 2: XML Documentation Comment

::: code-group
```csharp [Program.cs]
/// <summary>
/// คำนวณเกรดจากคะแนนที่รับมา
/// </summary>
/// <param name="score">คะแนนของนักเรียน (0-100)</param>
/// <returns>เกรด A, B, C, D หรือ F</returns>
static string GetGrade(int score)
{
    // TODO: ยังไม่ได้ implement — จะทำในบทเรียน Chapter 3
    return "A";
}

// เรียกใช้ฟังก์ชัน
string grade = GetGrade(85);
Console.WriteLine("เกรดที่ได้: " + grade);
```
:::

**Expected Output:**
```
เกรดที่ได้: A
```

---

### ตัวอย่างที่ 3: Code Style ที่ดี vs ไม่ดี

::: code-group
```csharp [ดี ✅]
// โค้ดที่อ่านง่าย มี indentation ถูกต้อง
int studentScore = 85;
int passingScore = 50;

// ตรวจสอบว่าผ่านหรือไม่
if (studentScore >= passingScore)
{
    Console.WriteLine("ผลการเรียน: ผ่าน");
    Console.WriteLine("คะแนนที่ได้: " + studentScore);
}
```

```csharp [ไม่ดี ❌]
// โค้ดที่อ่านยาก ชื่อตัวแปรไม่สื่อความหมาย
int x=85;int y=50;
if(x>=y){Console.WriteLine("ผ่าน");Console.WriteLine(x);}
```
:::

## 🎯 โจทย์ฝึกปฏิบัติเสริมความเข้าใจ (Mini Exercise)

- **โจทย์ที่ 1:** นำโค้ดด้านล่างนี้มา **เพิ่ม Comment** อธิบายทุกบรรทัด โดยให้ comment บอกว่า "ทำไม" ไม่ใช่แค่ "อะไร":
  ```csharp
  int maxAttempts = 3;
  int currentAttempt = 0;
  string correctPassword = "secret123";
  ```

- **โจทย์ที่ 2:** แก้ไขโค้ดด้านล่างให้ถูกต้องตาม C# Naming Convention และจัด Indentation ให้ถูกต้อง:
  ```csharp
  int StudentAge=17;
  string FIRST_name="somchai";
  Console.WriteLine("Name: "+FIRST_name+" Age: "+StudentAge);
  ```

::: details 💡 คำใบ้ (Hint)
- โจทย์ 1: คิดว่า "ทำไมถึงกำหนด maxAttempts = 3?" ไม่ใช่แค่ "ตัวแปร maxAttempts มีค่า 3"
- โจทย์ 2: ชื่อตัวแปร local ต้องเป็น `camelCase` เช่น `studentAge`, `firstName`
:::

## 🔥 Challenge (โจทย์ท้าทาย!)

- **โจทย์:** นำโค้ดทั้งหมดใน Chapter 1 ที่ผ่านมา (Hello World, โครงสร้างโปรแกรม ฯลฯ) มาเขียนใหม่รวมในไฟล์เดียว โดย:
  1. เพิ่ม Comment อธิบายทุก section
  2. ตั้งชื่อตัวแปรให้ถูก Naming Convention
  3. จัด Indentation ให้สวยงาม
  
  **ห้าม** เลื่อนกลับไปดูโค้ดเดิม ให้เขียนจากความจำและความเข้าใจทั้งหมด

## 🗣️ ทบทวน (Review)

::: details ❓ คำถามทบทวนความเข้าใจ

**คำถาม 1:** Comment ที่ดีควรอธิบาย "อะไร" หรือ "ทำไม"?
**แนวคำตอบ:** ควรอธิบาย **"ทำไม"** เพราะ "อะไร" อ่านได้จากโค้ดอยู่แล้ว แต่ "ทำไม" ถึงต้องทำแบบนี้ คนอื่นอาจไม่รู้ เช่น "ใช้ 3 เพราะ Business Rule กำหนดว่าผิดเกิน 3 ครั้ง Lock account"

**คำถาม 2:** ชื่อตัวแปร `StudentName`, `studentname`, `student_name`, `_studentName` แต่ละแบบใช้ในบริบทใด?
**แนวคำตอบ:** 
- `StudentName` → Property หรือ Method ใน Class
- `studentName` → Local variable หรือ Parameter
- `student_name` → ไม่ใช่ style มาตรฐาน C# (ใช้ในภาษาอื่นเช่น Python)
- `_studentName` → Private field ภายใน Class
:::
