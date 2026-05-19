# 02 - Button & Input Validation: ปุ่มและการตรวจสอบข้อมูล

> 💡 **เป้าหมาย:** เจาะลึกการใช้งาน Button อย่างครบถ้วน ทั้ง Properties การจัดสไตล์ให้สวยงาม และการเขียนระบบตรวจสอบข้อมูล (Input Validation) ที่สมบูรณ์แบบก่อนนำข้อมูลไปประมวลผล พร้อมการแปลงชนิดข้อมูล (Type Conversion) อย่างปลอดภัยด้วย `int.TryParse()`

## 📖 ทฤษฎีและแนวคิด UI (UI Concept & Theory)

**Button** คือ Control ที่ผู้ใช้กดเพื่อสั่งให้โปรแกรมทำงานบางอย่าง ถือเป็น Control ที่เป็น "ตัวเริ่มต้น Action" ที่สำคัญที่สุดในทุกฟอร์ม

**Input Validation** คือกระบวนการตรวจสอบข้อมูลที่รับมาจากผู้ใช้ก่อนนำไปใช้งาน ถือเป็นหลักการสำคัญที่สุดในการเขียนโปรแกรมให้มั่นคง ปัญหาทั่วไปที่ต้องตรวจสอบ ได้แก่:
- ช่องว่างเปล่า (Empty Input)
- ข้อมูลผิดประเภท เช่น ต้องการตัวเลขแต่ผู้ใช้พิมพ์ตัวอักษร
- ข้อมูลนอกช่วง เช่น อายุ -5 หรืออายุ 999

```text
[ตัวอย่าง Form: โปรแกรมคำนวณเกรด]
+-----------------------------------------------+
| 🗔 คำนวณเกรดนักเรียน                   _ □ X |
+-----------------------------------------------+
|                                               |
|   คะแนน (0-100):  [  txtScore          ]     |
|                                               |
|   ผลลัพธ์:        [  lblGrade          ]     |
|                                               |
|   [ btnCalculate ]    [ btnReset ]            |
|                                               |
+-----------------------------------------------+
```

### 🔑 Button Properties ที่สำคัญ

| Property | การทำงาน | ค่าแนะนำ |
| :--- | :--- | :--- |
| `Text` | ข้อความบนปุ่ม | `"คำนวณ"` |
| `Font` | ฟอนต์และขนาด | `Arial, 11pt, Bold` |
| `BackColor` | สีพื้นหลังของปุ่ม | `MediumBlue` |
| `ForeColor` | สีตัวอักษรบนปุ่ม | `White` |
| `FlatStyle` | รูปแบบการแสดงผลปุ่ม | `Flat` (ดูสมัยใหม่) |
| `Cursor` | รูปเคอร์เซอร์เมื่อเอาเมาส์มาชี้ | `Hand` |
| `Enabled` | ปิด-เปิดการใช้งานปุ่ม | `false` (ปิดปุ่ม) |
| `Size` | ขนาดของปุ่ม | `150, 40` |

### ⚠️ Type Conversion อย่างปลอดภัย

ข้อมูลจาก TextBox จะเป็น `string` เสมอ หากต้องการนำไปคำนวณ ต้องแปลงเป็นตัวเลขก่อน:

```csharp
// ❌ วิธีที่ไม่ปลอดภัย — จะ Crash ถ้าผู้ใช้พิมพ์ตัวอักษร
int score = int.Parse(txtScore.Text); // throw Exception!

// ✅ วิธีที่ปลอดภัย — int.TryParse
if (int.TryParse(txtScore.Text, out int score))
{
    // แปลงสำเร็จ ใช้งาน score ได้เลย
}
else
{
    // แปลงไม่สำเร็จ (ผู้ใช้พิมพ์ตัวอักษร)
    MessageBox.Show("กรุณากรอกตัวเลขเท่านั้น!");
}
```

---

## 🛠️ การตั้งค่า Properties (UI Setup)

| Control | Property | ค่าที่ตั้ง |
| :--- | :--- | :--- |
| `Form1` | `Text` | `"คำนวณเกรดนักเรียน"` |
| `Form1` | `StartPosition` | `CenterScreen` |
| `Form1` | `Size` | `450, 300` |
| `Label` | `Name` | `lblScoreText` |
| `Label` | `Text` | `"คะแนน (0-100):"` |
| `Label` | `Font` | `Arial, 11pt` |
| `TextBox` | `Name` | `txtScore` |
| `TextBox` | `PlaceholderText` | `"กรอกคะแนน 0-100"` |
| `TextBox` | `Font` | `Arial, 12pt` |
| `Label` (ผล) | `Name` | `lblGrade` |
| `Label` (ผล) | `Text` | `"-"` |
| `Label` (ผล) | `Font` | `Arial, 24pt, Bold` |
| `Label` (ผล) | `TextAlign` | `MiddleCenter` |
| `Button` (คำนวณ) | `Name` | `btnCalculate` |
| `Button` (คำนวณ) | `Text` | `"คำนวณเกรด"` |
| `Button` (คำนวณ) | `BackColor` | `MediumBlue` |
| `Button` (คำนวณ) | `ForeColor` | `White` |
| `Button` (คำนวณ) | `FlatStyle` | `Flat` |
| `Button` (คำนวณ) | `Cursor` | `Hand` |
| `Button` (ล้าง) | `Name` | `btnReset` |
| `Button` (ล้าง) | `Text` | `"ล้างข้อมูล"` |
| `Button` (ล้าง) | `BackColor` | `Gray` |
| `Button` (ล้าง) | `ForeColor` | `White` |
| `Button` (ล้าง) | `FlatStyle` | `Flat` |

---

## 💻 ตัวอย่างโค้ด (Code Implementation)

ดับเบิลคลิกที่ปุ่ม `btnCalculate` และ `btnReset` ทีละปุ่มเพื่อสร้าง Event Handler:

::: code-group
```csharp [Form1.cs]
using System;
using System.Windows.Forms;

namespace GradeCalculator
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void btnCalculate_Click(object sender, EventArgs e)
        {
            // [1] ตรวจสอบว่าช่องว่างหรือเปล่า
            if (string.IsNullOrWhiteSpace(txtScore.Text))
            {
                MessageBox.Show("กรุณากรอกคะแนนก่อน!", "แจ้งเตือน",
                    MessageBoxButtons.OK, MessageBoxIcon.Warning);
                txtScore.Focus();
                return;
            }

            // [2] แปลง string เป็น int อย่างปลอดภัยด้วย TryParse
            if (!int.TryParse(txtScore.Text, out int score))
            {
                MessageBox.Show("กรุณากรอกเป็นตัวเลขเท่านั้น!", "ข้อผิดพลาด",
                    MessageBoxButtons.OK, MessageBoxIcon.Error);
                txtScore.Clear();
                txtScore.Focus();
                return;
            }

            // [3] ตรวจสอบช่วงของคะแนน
            if (score < 0 || score > 100)
            {
                MessageBox.Show("คะแนนต้องอยู่ระหว่าง 0-100!", "ข้อผิดพลาด",
                    MessageBoxButtons.OK, MessageBoxIcon.Error);
                txtScore.SelectAll(); // เลือกข้อความทั้งหมดใน TextBox
                txtScore.Focus();
                return;
            }

            // [4] คำนวณเกรด
            string grade;
            System.Drawing.Color gradeColor;

            if (score >= 80)
            {
                grade = "A";
                gradeColor = System.Drawing.Color.DarkGreen;
            }
            else if (score >= 70)
            {
                grade = "B";
                gradeColor = System.Drawing.Color.Blue;
            }
            else if (score >= 60)
            {
                grade = "C";
                gradeColor = System.Drawing.Color.DarkOrange;
            }
            else if (score >= 50)
            {
                grade = "D";
                gradeColor = System.Drawing.Color.Orange;
            }
            else
            {
                grade = "F";
                gradeColor = System.Drawing.Color.Red;
            }

            // [5] แสดงผลลัพธ์ด้วยการเปลี่ยน Text และ ForeColor
            lblGrade.Text = grade;
            lblGrade.ForeColor = gradeColor;
        }

        private void btnReset_Click(object sender, EventArgs e)
        {
            // ล้างข้อมูลทั้งหมดและรีเซ็ตหน้าจอ
            txtScore.Clear();
            lblGrade.Text = "-";
            lblGrade.ForeColor = System.Drawing.Color.Black;
            txtScore.Focus();
        }
    }
}
```
:::

**Expected Output:**
```text
กรอก 85 → lblGrade แสดง "A" สีเขียว
กรอก 55 → lblGrade แสดง "D" สีส้ม
กรอก 30 → lblGrade แสดง "F" สีแดง
กรอก "abc" → MessageBox แจ้งว่า "กรุณากรอกเป็นตัวเลขเท่านั้น!"
กรอก 150 → MessageBox แจ้งว่า "คะแนนต้องอยู่ระหว่าง 0-100!"
```

---

## 🚀 เทคนิคขั้นสูง: ปุ่ม Default และ Cancel

```csharp
// Form Constructor — ตั้งค่าปุ่ม Default (กด Enter) และ Cancel (กด Esc)
public Form1()
{
    InitializeComponent();

    // ตั้ง AcceptButton: กด Enter = เหมือนกดปุ่มนี้
    this.AcceptButton = btnCalculate;

    // ตั้ง CancelButton: กด Esc = เหมือนกดปุ่มนี้
    this.CancelButton = btnReset;
}
```

---

## 🎯 โจทย์ฝึกปฏิบัติเสริมความเข้าใจ (Mini Exercise)

**โจทย์ที่ 1: แปลงอุณหภูมิ**
สร้างโปรแกรมที่มี TextBox รับค่าอุณหภูมิ Celsius และปุ่มแปลงเป็น Fahrenheit
- สูตร: `F = (C * 9/5) + 32`
- ต้องตรวจสอบว่ากรอกค่าหรือเปล่า และต้องเป็นตัวเลขเท่านั้น
- แสดงผลในรูปแบบ `"30°C = 86.0°F"` ใน Label

**โจทย์ที่ 2: เครื่องคิดเลขแบบ 2 ช่อง**
สร้างโปรแกรมที่มี TextBox 2 ช่อง รับตัวเลข 2 ค่า และปุ่ม 4 ปุ่ม (+, -, *, /)
- ตรวจสอบว่าทั้งสองช่องไม่ว่างและเป็นตัวเลข
- กรณีหารด้วย 0 ต้องแสดง Error Message พิเศษ

::: details 💡 คำใบ้ (Hint)
ใช้ `double.TryParse()` แทน `int.TryParse()` เพื่อรองรับทศนิยม
:::

---

## 🔥 Challenge (โจทย์ท้าทาย!)

**โจทย์: ระบบคำนวณค่าเฉลี่ยและเกรด 5 วิชา**
สร้างโปรแกรมที่มี TextBox 5 ช่อง รับคะแนนแต่ละวิชา (0-100) เมื่อกดปุ่ม "คำนวณ":
1. ต้องตรวจสอบว่าทุกช่องมีข้อมูลและเป็นตัวเลขอยู่ในช่วง 0-100
2. คำนวณค่าเฉลี่ย
3. แสดงเกรดตามค่าเฉลี่ย และข้อความ "ผ่าน" หรือ "ไม่ผ่าน"

---

## 🗣️ ทบทวน (Review)

::: details ❓ คำถามทบทวน 1:
**คำถาม:** เหตุใดจึงควรใช้ `int.TryParse()` แทน `int.Parse()`?

**แนวคำตอบ:** `int.Parse()` จะ throw Exception ทันทีหากแปลงไม่ได้ ทำให้โปรแกรม Crash ส่วน `int.TryParse()` จะ return `false` เมื่อแปลงไม่ได้ ทำให้เราสามารถจัดการด้วย `if-else` ได้อย่างปลอดภัยโดยไม่ต้อง try-catch
:::

::: details ❓ คำถามทบทวน 2:
**คำถาม:** `AcceptButton` และ `CancelButton` ของ Form มีประโยชน์อย่างไร?

**แนวคำตอบ:** `AcceptButton` ทำให้ผู้ใช้กด Enter เพื่อยืนยันได้โดยไม่ต้องคลิกปุ่ม (เป็น UX ที่ดีในฟอร์มกรอกข้อมูล) ส่วน `CancelButton` ทำให้กด Esc เพื่อยกเลิกหรือล้างข้อมูลได้ทันที
:::
