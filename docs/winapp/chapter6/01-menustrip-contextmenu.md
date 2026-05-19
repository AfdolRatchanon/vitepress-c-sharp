# 01 - MenuStrip & ContextMenuStrip

> 💡 **เป้าหมาย:** เรียนรู้การสร้างเมนูหลักบนแถบด้านบน (MenuStrip) และเมนูคลิกขวา (ContextMenuStrip) พร้อมการผูก Shortcut Key และเขียน Logic เบื้องหลัง เพื่อสร้างแอปพลิเคชันที่ใช้งานได้จริงเหมือนโปรแกรมมืออาชีพ

## 📖 ทฤษฎีและแนวคิด UI (UI Concept & Theory)

**MenuStrip** คือแถบเมนูที่อยู่ด้านบนสุดของฟอร์ม ประกอบด้วย MenuItem ที่จัดเป็นลำดับชั้น (Hierarchy) เช่น ไฟล์ > เปิด, แก้ไข > คัดลอก ฯลฯ

**ContextMenuStrip** คือเมนูที่โผล่ขึ้นมาเมื่อ **คลิกขวา** บน Control ใดๆ ช่วยให้ผู้ใช้เข้าถึงคำสั่งได้รวดเร็วโดยไม่ต้องไปที่เมนูหลัก

```text
[ตัวอย่าง Form: Text Editor พร้อม MenuStrip]
+-----------------------------------------------+
| 🗔 โปรแกรมแก้ไขข้อความ              _ □ X    |
+-----------------------------------------------+
| [ไฟล์] [แก้ไข] [รูปแบบ] [วิธีใช้]            |
+-----------------------------------------------+
|                                               |
|  [TextBox rtbContent ขนาดใหญ่          ]      |
|  [คลิกขวาเพื่อดู Context Menu]              |
|                                               |
+-----------------------------------------------+
```

### 🔑 โครงสร้างของ MenuItem

MenuStrip ใช้โครงสร้างแบบต้นไม้ (Tree) ในการจัดเรียงเมนู:

```text
MenuStrip (แถบเมนูหลัก)
├── ToolStripMenuItem "ไฟล์"
│    ├── ToolStripMenuItem "ใหม่"    (Ctrl+N)
│    ├── ToolStripMenuItem "เปิด..."  (Ctrl+O)
│    ├── ToolStripSeparator (เส้นคั่น)
│    └── ToolStripMenuItem "ออก"     (Alt+F4)
├── ToolStripMenuItem "แก้ไข"
│    ├── ToolStripMenuItem "ตัด"     (Ctrl+X)
│    ├── ToolStripMenuItem "คัดลอก"  (Ctrl+C)
│    └── ToolStripMenuItem "วาง"     (Ctrl+V)
└── ToolStripMenuItem "วิธีใช้"
     └── ToolStripMenuItem "เกี่ยวกับ..."
```

---

## 🛠️ การตั้งค่า Properties (UI Setup)

**วิธีสร้าง MenuStrip:**
1. ลาก `MenuStrip` จาก Toolbox มาวางบนฟอร์ม (จะไปอยู่ด้านบนอัตโนมัติ)
2. คลิกที่ `Type Here` บน MenuStrip แล้วพิมพ์ชื่อเมนูแรก เช่น `"ไฟล์"`
3. กด Enter เพื่อเพิ่มเมนูถัดไป หรือกดลูกศรลงเพื่อเพิ่ม Sub-MenuItem

| Control | Property | ค่าที่ตั้ง |
| :--- | :--- | :--- |
| `MenuStrip` | `Name` | `menuMain` |
| MenuItem "ไฟล์" | `Name` | `menuFile` |
| MenuItem "ใหม่" | `Name` | `menuFileNew` |
| MenuItem "ใหม่" | `ShortcutKeys` | `Ctrl+N` |
| MenuItem "เปิด" | `Name` | `menuFileOpen` |
| MenuItem "เปิด" | `ShortcutKeys` | `Ctrl+O` |
| MenuItem "บันทึก" | `Name` | `menuFileSave` |
| MenuItem "บันทึก" | `ShortcutKeys` | `Ctrl+S` |
| MenuItem "ออก" | `Name` | `menuFileExit` |
| MenuItem "แก้ไข" | `Name` | `menuEdit` |
| MenuItem "ตัด" | `Name` | `menuEditCut` |
| MenuItem "คัดลอก" | `Name` | `menuEditCopy` |
| MenuItem "วาง" | `Name` | `menuEditPaste` |
| `RichTextBox` | `Name` | `rtbContent` |
| `RichTextBox` | `Dock` | `Fill` |
| `ContextMenuStrip` | `Name` | `ctxEditor` |
| `RichTextBox` | `ContextMenuStrip` | `ctxEditor` |

> **เพิ่ม ContextMenuStrip:** ลาก ContextMenuStrip มาวาง แล้วไปที่ Properties ของ RichTextBox หา Property `ContextMenuStrip` แล้วเลือก `ctxEditor`

---

## 💻 ตัวอย่างโค้ด (Code Implementation)

ดับเบิลคลิกที่ MenuItem แต่ละรายการบน Design เพื่อสร้าง Event:

::: code-group
```csharp [Form1.cs]
using System;
using System.Windows.Forms;
using System.IO;

namespace TextEditor
{
    public partial class Form1 : Form
    {
        private string currentFilePath = "";
        private bool isModified = false;

        public Form1()
        {
            InitializeComponent();
        }

        // ===== เมนู "ไฟล์" =====

        private void menuFileNew_Click(object sender, EventArgs e)
        {
            // [1] ตรวจสอบว่ามีการแก้ไขที่ยังไม่บันทึก
            if (isModified)
            {
                DialogResult result = MessageBox.Show(
                    "มีการแก้ไขที่ยังไม่บันทึก ต้องการบันทึกก่อนหรือไม่?",
                    "แจ้งเตือน", MessageBoxButtons.YesNoCancel, MessageBoxIcon.Warning);

                if (result == DialogResult.Yes)
                    menuFileSave_Click(sender, e);
                else if (result == DialogResult.Cancel)
                    return; // ยกเลิก ไม่ทำอะไร
            }

            rtbContent.Clear();
            currentFilePath = "";
            isModified = false;
            UpdateTitle();
        }

        private void menuFileOpen_Click(object sender, EventArgs e)
        {
            using (OpenFileDialog ofd = new OpenFileDialog())
            {
                ofd.Filter = "Text Files|*.txt|All Files|*.*";
                if (ofd.ShowDialog() == DialogResult.OK)
                {
                    rtbContent.Text = File.ReadAllText(ofd.FileName);
                    currentFilePath = ofd.FileName;
                    isModified = false;
                    UpdateTitle();
                }
            }
        }

        private void menuFileSave_Click(object sender, EventArgs e)
        {
            if (string.IsNullOrEmpty(currentFilePath))
            {
                // ยังไม่มีชื่อไฟล์ → SaveAs
                menuFileSaveAs_Click(sender, e);
                return;
            }
            File.WriteAllText(currentFilePath, rtbContent.Text);
            isModified = false;
            UpdateTitle();
            MessageBox.Show("บันทึกสำเร็จ!", "สำเร็จ", MessageBoxButtons.OK, MessageBoxIcon.Information);
        }

        private void menuFileSaveAs_Click(object sender, EventArgs e)
        {
            using (SaveFileDialog sfd = new SaveFileDialog())
            {
                sfd.Filter = "Text Files|*.txt|All Files|*.*";
                if (sfd.ShowDialog() == DialogResult.OK)
                {
                    File.WriteAllText(sfd.FileName, rtbContent.Text);
                    currentFilePath = sfd.FileName;
                    isModified = false;
                    UpdateTitle();
                }
            }
        }

        private void menuFileExit_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        // ===== เมนู "แก้ไข" =====

        private void menuEditCut_Click(object sender, EventArgs e)   => rtbContent.Cut();
        private void menuEditCopy_Click(object sender, EventArgs e)  => rtbContent.Copy();
        private void menuEditPaste_Click(object sender, EventArgs e) => rtbContent.Paste();
        private void menuEditSelectAll_Click(object sender, EventArgs e) => rtbContent.SelectAll();

        // ===== Helper Methods =====

        private void rtbContent_TextChanged(object sender, EventArgs e)
        {
            isModified = true;
            UpdateTitle();
        }

        private void UpdateTitle()
        {
            string fileName = string.IsNullOrEmpty(currentFilePath)
                ? "ไม่มีชื่อ"
                : Path.GetFileName(currentFilePath);
            string modified = isModified ? " *" : "";
            this.Text = $"{fileName}{modified} — โปรแกรมแก้ไขข้อความ";
        }

        // ===== FormClosing: ป้องกันปิดหน้าต่างโดยไม่บันทึก =====
        private void Form1_FormClosing(object sender, FormClosingEventArgs e)
        {
            if (isModified)
            {
                DialogResult result = MessageBox.Show(
                    "มีการแก้ไขที่ยังไม่บันทึก ต้องการบันทึกก่อนออกหรือไม่?",
                    "ยืนยันการออก", MessageBoxButtons.YesNoCancel, MessageBoxIcon.Warning);

                if (result == DialogResult.Yes)
                    menuFileSave_Click(sender, e);
                else if (result == DialogResult.Cancel)
                    e.Cancel = true; // หยุดการปิดหน้าต่าง
            }
        }
    }
}
```
:::

**Expected Output:**
```text
- เมนู ไฟล์ > ใหม่ → ถามบันทึกถ้ามีการแก้ไข แล้วล้างหน้าจอ
- Ctrl+S → บันทึกไฟล์ (หรือ SaveAs ถ้ายังไม่มีชื่อไฟล์)
- Title Bar แสดง "myfile.txt * — โปรแกรมแก้ไขข้อความ" (มี * เมื่อยังไม่บันทึก)
- ปิดหน้าต่างขณะมีการแก้ไข → ถามยืนยันก่อน
```

---

## 🎯 โจทย์ฝึกปฏิบัติเสริมความเข้าใจ (Mini Exercise)

**โจทย์ที่ 1: เมนู "รูปแบบ"**
เพิ่มเมนู `รูปแบบ > ตัวอักษร...` ที่เปิด `FontDialog` ให้ผู้ใช้เลือกฟอนต์ แล้วเปลี่ยนฟอนต์ของ `rtbContent` ทั้งหมด

**โจทย์ที่ 2: ContextMenu บน RichTextBox**
เพิ่ม ContextMenuStrip สำหรับ RichTextBox ที่มีเมนู: ตัด, คัดลอก, วาง, เส้นคั่น, เลือกทั้งหมด, เส้นคั่น, ล้างทั้งหมด โดยเชื่อมกับ Event เดียวกับ MenuStrip หลัก

::: details 💡 คำใบ้ (Hint)
ContextMenuItem สามารถเรียก Method เดิมได้ เช่น `menuEditCopy_Click(sender, e)` เพื่อไม่ต้องเขียนโค้ดซ้ำ
:::

---

## 🔥 Challenge (โจทย์ท้าทาย!)

**โจทย์: ระบบ Find & Replace**
เพิ่มเมนู `แก้ไข > ค้นหา` (Ctrl+F) ที่เมื่อกดแล้วเปิดฟอร์มใหม่เล็กๆ มี TextBox รับคำที่จะค้นหา และ TextBox รับคำที่จะแทนที่ กดปุ่ม "แทนที่ทั้งหมด" แล้วใช้ `rtbContent.Text.Replace()` แทนที่ข้อความทั้งหมด

---

## 🗣️ ทบทวน (Review)

::: details ❓ คำถามทบทวน 1:
**คำถาม:** เหตุใดจึงควรตรวจสอบ `isModified` ก่อนที่ผู้ใช้จะปิดโปรแกรมหรือสร้างไฟล์ใหม่?

**แนวคำตอบ:** เพื่อป้องกันการสูญเสียข้อมูล (Data Loss) โดยไม่ตั้งใจ เป็น Best Practice ของโปรแกรมแก้ไขข้อความทุกประเภท ผู้ใช้อาจลืมบันทึกก่อนปิด การถามยืนยันเป็นการปกป้องงานของผู้ใช้
:::

::: details ❓ คำถามทบทวน 2:
**คำถาม:** `e.Cancel = true` ใน `FormClosing` Event ทำงานอย่างไร?

**แนวคำตอบ:** Event `FormClosing` ถูกยิงก่อนที่หน้าต่างจะถูกปิด การตั้ง `e.Cancel = true` จะบอกระบบว่า "ยกเลิกการปิด" ทำให้หน้าต่างยังคงเปิดอยู่ต่อไป ซึ่งเป็นวิธีมาตรฐานในการดักจับก่อนปิดโปรแกรม
:::
