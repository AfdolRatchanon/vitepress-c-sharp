# 02 - PictureBox, RichTextBox & LinkLabel

> 💡 **เป้าหมาย:** เรียนรู้การแสดงรูปภาพด้วย PictureBox การจัดรูปแบบข้อความที่ซับซ้อนด้วย RichTextBox และการสร้างลิงก์คลิกได้ด้วย LinkLabel เพื่อสร้างหน้า "เกี่ยวกับโปรแกรม" หรือหน้าโปรไฟล์ที่สมบูรณ์แบบ

## 📖 ทฤษฎีและแนวคิด UI (UI Concept & Theory)

### PictureBox — แสดงรูปภาพ
PictureBox ใช้แสดงรูปภาพบนฟอร์ม ไม่ว่าจะเป็นโลโก้บริษัท รูปโปรไฟล์ หรือภาพประกอบ Property ที่สำคัญที่สุดคือ `SizeMode` ซึ่งควบคุมว่ารูปภาพจะแสดงอย่างไรเมื่อขนาดไม่ตรงกับ PictureBox

### RichTextBox — ข้อความหลากรูปแบบ
RichTextBox คล้าย TextBox แต่รองรับการจัดรูปแบบข้อความ (Bold, Italic, สี, ฟอนต์) ภายในกล่องเดียวกันได้ เหมาะสำหรับสร้าง Text Editor ขนาดเล็ก

### LinkLabel — ลิงก์คลิกได้
LinkLabel แสดงเหมือน Label ทั่วไปแต่ดูเหมือนลิงก์ในเว็บ สามารถกำหนด Action เมื่อคลิกได้ เช่น เปิดเว็บไซต์หรือเปิด Email

```text
[ตัวอย่าง Form: หน้าโปรไฟล์]
+-----------------------------------------------+
| 🗔 โปรไฟล์ผู้ใช้                      _ □ X |
+-----------------------------------------------+
|  +-------+                                    |
|  | รูป   |  ชื่อ: สมชาย ใจดี                |
|  | ภาพ   |  อีเมล: somchai@email.com         |
|  |[pbImg]|  เว็บไซต์: [lnkWebsite]          |
|  +-------+                                    |
|                                               |
|  ┌─ ประวัติส่วนตัว ────────────────────────┐  |
|  │  [RichTextBox rtbBio               ]   │  |
|  │  สามารถ Bold / ขีดเส้น ฯลฯ ได้      │  |
|  └─────────────────────────────────────────┘  |
|                                               |
|   [ btnBold ] [ btnItalic ] [ btnColor ]      |
|                                               |
+-----------------------------------------------+
```

### 🔑 PictureBox SizeMode

| SizeMode | การทำงาน |
| :--- | :--- |
| `Normal` | แสดงรูปตามขนาดจริง อาจถูกตัดถ้าใหญ่เกิน |
| `StretchImage` | ยืดรูปให้เต็ม PictureBox (อาจบิดเบือน) |
| `Zoom` | ย่อ/ขยายรูปให้พอดีโดยยังคงสัดส่วน |
| `CenterImage` | แสดงรูปตรงกลาง |
| `AutoSize` | ปรับขนาด PictureBox ตามรูป |

---

## 🛠️ การตั้งค่า Properties (UI Setup)

| Control | Property | ค่าที่ตั้ง |
| :--- | :--- | :--- |
| `Form1` | `Text` | `"โปรไฟล์ผู้ใช้"` |
| `PictureBox` | `Name` | `pbProfile` |
| `PictureBox` | `Size` | `120, 120` |
| `PictureBox` | `SizeMode` | `Zoom` |
| `PictureBox` | `BorderStyle` | `FixedSingle` |
| `LinkLabel` | `Name` | `lnkWebsite` |
| `LinkLabel` | `Text` | `"www.example.com"` |
| `RichTextBox` | `Name` | `rtbBio` |
| `RichTextBox` | `ScrollBars` | `Vertical` |
| `Button` (Bold) | `Name` | `btnBold` |
| `Button` (Bold) | `Text` | `"B"` |
| `Button` (Bold) | `Font` | `Arial, 10pt, Bold` |
| `Button` (Italic) | `Name` | `btnItalic` |
| `Button` (Italic) | `Text` | `"I"` |
| `Button` (Italic) | `Font` | `Arial, 10pt, Italic` |

---

## 💻 ตัวอย่างโค้ด (Code Implementation)

::: code-group
```csharp [Form1.cs]
using System;
using System.Drawing;
using System.Windows.Forms;

namespace ProfilePage
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            // [1] โหลดรูปภาพลง PictureBox จากไฟล์
            // ถ้าไม่มีไฟล์รูป ให้ใช้ System Icon แทน
            try
            {
                pbProfile.Image = Image.FromFile(@"profile.jpg");
            }
            catch
            {
                // ถ้าไม่มีไฟล์รูป ใช้ System Icon แสดงแทน
                pbProfile.Image = SystemIcons.Information.ToBitmap();
            }

            // [2] ตั้งค่า RichTextBox
            rtbBio.Text = "กรอกประวัติส่วนตัวที่นี่...";
            rtbBio.SelectAll();
            rtbBio.SelectionColor = Color.Gray;
            rtbBio.DeselectAll();
        }

        // [3] ปุ่ม Bold: สลับ Bold ของข้อความที่เลือก
        private void btnBold_Click(object sender, EventArgs e)
        {
            if (rtbBio.SelectionLength == 0) return; // ไม่มีข้อความถูกเลือก

            Font currentFont = rtbBio.SelectionFont;
            FontStyle newStyle;

            // สลับระหว่าง Bold และ Regular
            if (currentFont.Bold)
                newStyle = currentFont.Style & ~FontStyle.Bold;
            else
                newStyle = currentFont.Style | FontStyle.Bold;

            rtbBio.SelectionFont = new Font(currentFont, newStyle);
        }

        // [4] ปุ่ม Italic
        private void btnItalic_Click(object sender, EventArgs e)
        {
            if (rtbBio.SelectionLength == 0) return;

            Font currentFont = rtbBio.SelectionFont;
            FontStyle newStyle;

            if (currentFont.Italic)
                newStyle = currentFont.Style & ~FontStyle.Italic;
            else
                newStyle = currentFont.Style | FontStyle.Italic;

            rtbBio.SelectionFont = new Font(currentFont, newStyle);
        }

        // [5] ปุ่มเปลี่ยนสีข้อความ
        private void btnColor_Click(object sender, EventArgs e)
        {
            using (ColorDialog colorDialog = new ColorDialog())
            {
                if (colorDialog.ShowDialog() == DialogResult.OK)
                {
                    rtbBio.SelectionColor = colorDialog.Color;
                }
            }
        }

        // [6] LinkLabel: เปิดเว็บไซต์เมื่อคลิก
        private void lnkWebsite_LinkClicked(object sender, LinkLabelLinkClickedEventArgs e)
        {
            // เปลี่ยนสีลิงก์เป็น visited
            lnkWebsite.LinkVisited = true;

            // เปิดเว็บเบราว์เซอร์ด้วย Process
            System.Diagnostics.Process.Start(new System.Diagnostics.ProcessStartInfo
            {
                FileName = "https://www.example.com",
                UseShellExecute = true
            });
        }
    }
}
```
:::

**Expected Output:**
```text
- PictureBox แสดงรูปภาพหรือ System Icon
- เลือกข้อความใน RichTextBox แล้วกด "B" → ข้อความเป็น Bold
- กด "I" → ข้อความเป็น Italic
- คลิก lnkWebsite → เปิดเว็บเบราว์เซอร์
```

---

## 🎯 โจทย์ฝึกปฏิบัติเสริมความเข้าใจ (Mini Exercise)

**โจทย์ที่ 1: Viewer รูปภาพพื้นฐาน**
สร้างโปรแกรมที่มี PictureBox และปุ่ม "โหลดรูป" ที่เมื่อกดจะเปิด OpenFileDialog ให้ผู้ใช้เลือกรูปภาพ แล้วแสดงใน PictureBox พร้อม RadioButton ให้เลือก SizeMode (Zoom/StretchImage/Normal)

**โจทย์ที่ 2: บันทึกเนื้อหา RichTextBox**
สร้างโปรแกรมที่มี RichTextBox และปุ่ม "บันทึก" ที่บันทึกข้อมูลลงไฟล์ `.rtf` ด้วย `rtbNote.SaveFile("note.rtf")` และปุ่ม "โหลด" ด้วย `rtbNote.LoadFile("note.rtf")`

::: details 💡 คำใบ้ (Hint)
ใช้ `rtbBio.SaveFile("file.rtf", RichTextBoxStreamType.RichText)` สำหรับบันทึก และ `LoadFile()` สำหรับโหลด
:::

---

## 🔥 Challenge (โจทย์ท้าทาย!)

**โจทย์: Mini Text Editor**
สร้าง Text Editor ขนาดเล็กที่มี RichTextBox และ Toolbar ด้วย Button สำหรับ Bold, Italic, Underline, เปลี่ยนสี, เปลี่ยนขนาดฟอนต์ (NumericUpDown) พร้อมปุ่ม Save/Load ไฟล์

---

## 🗣️ ทบทวน (Review)

::: details ❓ คำถามทบทวน 1:
**คำถาม:** ทำไมต้องใช้ `using (ColorDialog cd = new ColorDialog())` แทนการสร้าง Object ธรรมดา?

**แนวคำตอบ:** Dialog Controls เช่น ColorDialog, OpenFileDialog เป็น Resource ที่ใช้ Memory และ Handle ของระบบ การใช้ `using` จะทำให้ C# เรียก `.Dispose()` โดยอัตโนมัติเมื่อจบ Block ป้องกัน Resource Leak ในโปรแกรม
:::

::: details ❓ คำถามทบทวน 2:
**คำถาม:** `rtbBio.SelectionFont` และ `rtbBio.SelectionColor` ทำงานกับข้อความส่วนไหน?

**แนวคำตอบ:** ทั้งสองจะทำงานเฉพาะกับข้อความที่ถูก "เลือก" (ไฮไลต์) อยู่ในขณะนั้นเท่านั้น ถ้าไม่มีข้อความถูกเลือก (`SelectionLength == 0`) การตั้งค่าจะไม่มีผล ดังนั้นต้องตรวจสอบ `SelectionLength` ก่อนเสมอ
:::
