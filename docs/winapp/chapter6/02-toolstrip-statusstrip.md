# 02 - ToolStrip & StatusStrip

> 💡 **เป้าหมาย:** เรียนรู้การสร้างแถบเครื่องมือ (ToolStrip) พร้อมปุ่มไอคอนสำหรับคำสั่งที่ใช้บ่อย และแถบสถานะ (StatusStrip) สำหรับแสดงข้อมูลสถานะโปรแกรมด้านล่างหน้าจอ เช่น จำนวนคำ ตำแหน่ง Cursor หรือเวลาปัจจุบัน

## 📖 ทฤษฎีและแนวคิด UI (UI Concept & Theory)

### ToolStrip — แถบเครื่องมือ
ToolStrip คือแถบปุ่มที่อยู่ใต้ MenuStrip ใช้สำหรับรวบรวมคำสั่งที่ใช้บ่อย เพื่อให้ผู้ใช้เข้าถึงได้ด้วยการคลิกเดียว แทนที่จะต้องผ่านเมนู มีไอเท็มหลายแบบ:
- **ToolStripButton** — ปุ่มธรรมดา
- **ToolStripSeparator** — เส้นแบ่ง
- **ToolStripLabel** — ป้ายข้อความ
- **ToolStripComboBox** — Dropdown บน Toolbar
- **ToolStripTextBox** — ช่องกรอกข้อความบน Toolbar

### StatusStrip — แถบสถานะ
StatusStrip อยู่ด้านล่างสุดของฟอร์ม ใช้แสดงข้อมูลสถานะของโปรแกรมแบบ Passive (ผู้ใช้อ่านอย่างเดียว ไม่ได้โต้ตอบ)

```text
[ตัวอย่าง Form: Text Editor พร้อม Toolbar]
+-----------------------------------------------+
| 🗔 Text Editor                       _ □ X    |
+-----------------------------------------------+
| [ไฟล์] [แก้ไข] [รูปแบบ]                       |  ← MenuStrip
+-----------------------------------------------+
| [📄 ใหม่] [📂 เปิด] [💾 บันทึก] | [✂️] [📋] | |  ← ToolStrip
+-----------------------------------------------+
|                                               |
|  [rtbContent                        ]         |
|                                               |
+-----------------------------------------------+
| สถานะ: พร้อมใช้งาน  |  บรรทัด: 5  |  12:30  | | ← StatusStrip
+-----------------------------------------------+
```

---

## 🛠️ การตั้งค่า Properties (UI Setup)

**วิธีสร้าง ToolStrip:**
1. ลาก `ToolStrip` จาก Toolbox มาวางบนฟอร์ม (จะอยู่ใต้ MenuStrip อัตโนมัติ)
2. คลิกลูกศรเล็กๆ ด้านขวาของ ToolStrip เพื่อเพิ่มไอเท็ม
3. เลือก `Button` เพื่อเพิ่ม ToolStripButton

| Control | Property | ค่าที่ตั้ง |
| :--- | :--- | :--- |
| `ToolStrip` | `Name` | `toolMain` |
| ToolStripButton ใหม่ | `Name` | `tsbNew` |
| ToolStripButton ใหม่ | `Text` | `"ใหม่"` |
| ToolStripButton ใหม่ | `Image` | (เลือกไอคอนจาก Properties > Image) |
| ToolStripButton ใหม่ | `DisplayStyle` | `ImageAndText` |
| ToolStripButton ใหม่ | `ToolTipText` | `"สร้างไฟล์ใหม่ (Ctrl+N)"` |
| `StatusStrip` | `Name` | `statusMain` |
| StatusLabel (สถานะ) | `Name` | `stsStatus` |
| StatusLabel (สถานะ) | `Text` | `"พร้อมใช้งาน"` |
| StatusLabel (บรรทัด) | `Name` | `stsLineCount` |
| StatusLabel (เวลา) | `Name` | `stsTime` |

---

## 💻 ตัวอย่างโค้ด (Code Implementation)

::: code-group
```csharp [Form1.cs]
using System;
using System.Windows.Forms;

namespace TextEditorWithToolbar
{
    public partial class Form1 : Form
    {
        private System.Windows.Forms.Timer clockTimer;

        public Form1()
        {
            InitializeComponent();
            SetupClock();
        }

        private void SetupClock()
        {
            // [1] สร้าง Timer เพื่ออัพเดตเวลาใน StatusStrip ทุก 1 วินาที
            clockTimer = new System.Windows.Forms.Timer();
            clockTimer.Interval = 1000; // 1000 ms = 1 วินาที
            clockTimer.Tick += (s, e) =>
            {
                stsTime.Text = DateTime.Now.ToString("HH:mm:ss");
            };
            clockTimer.Start();
        }

        // [2] ToolStripButton เรียก Method เดิมจาก MenuStrip ได้เลย
        private void tsbNew_Click(object sender, EventArgs e)
        {
            menuFileNew_Click(sender, e); // เรียกโค้ดจากเมนูเดิม
        }

        private void tsbOpen_Click(object sender, EventArgs e)
        {
            menuFileOpen_Click(sender, e);
        }

        private void tsbSave_Click(object sender, EventArgs e)
        {
            menuFileSave_Click(sender, e);
        }

        private void tsbCut_Click(object sender, EventArgs e)   => rtbContent.Cut();
        private void tsbCopy_Click(object sender, EventArgs e)  => rtbContent.Copy();
        private void tsbPaste_Click(object sender, EventArgs e) => rtbContent.Paste();

        // [3] อัพเดต StatusStrip เมื่อข้อความเปลี่ยน
        private void rtbContent_TextChanged(object sender, EventArgs e)
        {
            int lineCount = rtbContent.Lines.Length;
            int charCount = rtbContent.Text.Length;
            int wordCount = rtbContent.Text.Split(
                new char[] { ' ', '\n', '\r', '\t' },
                StringSplitOptions.RemoveEmptyEntries).Length;

            stsLineCount.Text = $"บรรทัด: {lineCount}  |  คำ: {wordCount}  |  อักขระ: {charCount}";
        }

        // [4] อัพเดตตำแหน่ง Cursor ใน StatusStrip
        private void rtbContent_SelectionChanged(object sender, EventArgs e)
        {
            int line = rtbContent.GetLineFromCharIndex(rtbContent.SelectionStart) + 1;
            int col = rtbContent.SelectionStart - rtbContent.GetFirstCharIndexFromLine(line - 1) + 1;
            stsStatus.Text = $"บรรทัดที่ {line}, คอลัมน์ที่ {col}";
        }

        // [5] ToolStripComboBox สำหรับเลือกขนาดฟอนต์
        private void tscFontSize_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (float.TryParse(tscFontSize.Text, out float size) && size > 0)
            {
                rtbContent.Font = new System.Drawing.Font(
                    rtbContent.Font.FontFamily, size);
            }
        }
    }
}
```
:::

**Expected Output:**
```text
- ToolStrip มีปุ่ม "ใหม่", "เปิด", "บันทึก", เส้นแบ่ง, "ตัด", "คัดลอก", "วาง"
- StatusStrip แสดง "บรรทัดที่ 3, คอลัมน์ที่ 7  |  บรรทัด: 5  |  คำ: 23  |  อักขระ: 150"
- เวลาในมุมขวา StatusStrip อัพเดตทุก 1 วินาที
```

---

## 🎯 โจทย์ฝึกปฏิบัติเสริมความเข้าใจ (Mini Exercise)

**โจทย์ที่ 1: ปุ่ม Undo/Redo บน ToolStrip**
เพิ่ม ToolStripButton สำหรับ Undo (Ctrl+Z) และ Redo ใน ToolStrip โดย RichTextBox มีเมธอด `.Undo()` และ `.Redo()` ในตัว รวมถึงต้องตรวจสอบ `.CanUndo` และ `.CanRedo` ก่อนเปิดใช้งานปุ่ม

**โจทย์ที่ 2: Progress Bar ใน StatusStrip**
เพิ่ม `ToolStripProgressBar` ใน StatusStrip แสดงเปอร์เซ็นต์ของไฟล์ที่ถูกอ่าน (จำนวนอักขระ / MaxLength * 100) อัพเดตแบบ Realtime เมื่อผู้ใช้พิมพ์

::: details 💡 คำใบ้ (Hint)
`ToolStripProgressBar` อยู่ใน StatusStrip ใช้ `stsProgress.Value = (int)(charCount * 100 / maxChar)` เพื่ออัพเดต
:::

---

## 🔥 Challenge (โจทย์ท้าทาย!)

**โจทย์: ToolStrip แบบ Dockable**
สร้าง ToolStrip ที่มี ToolStripComboBox สำหรับเลือกฟอนต์ (โหลดรายชื่อจาก `System.Drawing.FontFamily.Families`) และ ToolStripComboBox สำหรับขนาดฟอนต์ (8, 10, 12, 14, 16, 18, 24, 36, 48) เมื่อเปลี่ยนค่าใดๆ ให้อัพเดตข้อความที่เลือกใน RichTextBox ทันที

---

## 🗣️ ทบทวน (Review)

::: details ❓ คำถามทบทวน 1:
**คำถาม:** ทำไม ToolStripButton ถึงควรเรียก Method เดิมกับ MenuStrip แทนการเขียนโค้ดซ้ำ?

**แนวคำตอบ:** เพื่อหลีกเลี่ยงการซ้ำซ้อนของโค้ด (DRY - Don't Repeat Yourself) ถ้ามีการแก้ไข Logic ในอนาคต ต้องแก้เพียงที่เดียว ลดโอกาสเกิด Bug ที่แก้ที่หนึ่งแต่ลืมแก้อีกที่หนึ่ง
:::

::: details ❓ คำถามทบทวน 2:
**คำถาม:** `Timer.Tick` Event กับ `Timer.Interval` สัมพันธ์กันอย่างไร?

**แนวคำตอบ:** `Interval` คือระยะเวลาในมิลลิวินาทีระหว่าง Tick แต่ละครั้ง เมื่อตั้ง `Interval = 1000` และ `Start()` แล้ว Event `Tick` จะถูก fire ทุกๆ 1 วินาที ทำให้เราสามารถอัพเดต UI แบบ Realtime ได้โดยไม่ต้อง Block Thread หลัก
:::
