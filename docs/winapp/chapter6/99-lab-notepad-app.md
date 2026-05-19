# 💻 Lab: สร้าง Notepad App

> 💡 **เป้าหมาย:** สังเคราะห์ความรู้จากบทที่ 6 ทั้งหมด สร้าง Text Editor ฉบับสมบูรณ์ที่มี MenuStrip, ToolStrip, StatusStrip, ContextMenuStrip และระบบเปิด/บันทึกไฟล์ที่ใช้งานได้จริง

## 📖 ภาพรวมของโปรแกรม (Program Overview)

```text
[Wireframe: Notepad App สมบูรณ์]
+------------------------------------------------------+
| 🗔 ไม่มีชื่อ — My Notepad                   _ □ X  |
+------------------------------------------------------+
| [ไฟล์▼] [แก้ไข▼] [รูปแบบ▼] [วิธีใช้▼]            |
+------------------------------------------------------+
| [📄][📂][💾][💾+] | [✂️][📋][📄][↩️][↪️] | [B][I] |
+------------------------------------------------------+
|                                                      |
|  [rtbContent — เนื้อหาหลัก Dock=Fill             ]  |
|  (คลิกขวา: ตัด/คัดลอก/วาง/เลือกทั้งหมด)           |
|                                                      |
+------------------------------------------------------+
| พร้อมใช้งาน | บรรทัด: 1 คอล: 1 | คำ: 0 | 12:34:56 |
+------------------------------------------------------+
```

## ⏱️ เวลาที่ใช้: 90 นาที

## 📝 ขั้นตอนการทำงาน

### ขั้นตอนที่ 1: UI Design
- [ ] สร้างโปรเจกต์ `MyNotepad`
- [ ] ลาก `MenuStrip`: ไฟล์ (ใหม่/เปิด/บันทึก/บันทึกเป็น/เส้น/ออก), แก้ไข (ตัด/คัดลอก/วาง/เส้น/เลือกทั้งหมด), รูปแบบ (ตัวอักษร/สีพื้นหลัง), วิธีใช้ (เกี่ยวกับ)
- [ ] ลาก `ToolStrip`: New/Open/Save/SaveAs, เส้น, Cut/Copy/Paste, Undo/Redo, เส้น, Bold/Italic
- [ ] ลาก `RichTextBox` ตั้ง `Dock = Fill`
- [ ] ลาก `ContextMenuStrip` และผูกกับ RichTextBox
- [ ] ลาก `StatusStrip`: 4 Labels (สถานะ, ตำแหน่ง, นับคำ, เวลา)

### ขั้นตอนที่ 2: Code-Behind
- [ ] `Form_Load`: ตั้งค่า Timer, ตั้งชื่อหน้าต่าง
- [ ] `menuFileNew_Click`: สร้างไฟล์ใหม่พร้อม Prompt บันทึก
- [ ] `menuFileOpen_Click`: เปิดไฟล์ .txt ด้วย OpenFileDialog
- [ ] `menuFileSave_Click`: บันทึก (SaveAs ถ้ายังไม่มีชื่อ)
- [ ] `menuFormatFont_Click`: เปิด FontDialog เปลี่ยนฟอนต์
- [ ] `rtbContent_TextChanged`: อัพเดต StatusStrip
- [ ] `Form_FormClosing`: ป้องกันปิดโดยไม่บันทึก

::: code-group
```csharp [Form1.cs — โค้ดสมบูรณ์]
using System;
using System.IO;
using System.Windows.Forms;

namespace MyNotepad
{
    public partial class Form1 : Form
    {
        private string currentFile = "";
        private bool isModified = false;
        private System.Windows.Forms.Timer clock = new System.Windows.Forms.Timer();

        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            clock.Interval = 1000;
            clock.Tick += (s, ev) => stsTime.Text = DateTime.Now.ToString("HH:mm:ss");
            clock.Start();
            UpdateTitle();
        }

        private void UpdateTitle()
        {
            string name = string.IsNullOrEmpty(currentFile) ? "ไม่มีชื่อ" : Path.GetFileName(currentFile);
            this.Text = $"{name}{(isModified ? " *" : "")} — My Notepad";
        }

        private bool PromptSave()
        {
            if (!isModified) return true;
            var r = MessageBox.Show("บันทึกการเปลี่ยนแปลงก่อนหรือไม่?", "แจ้งเตือน",
                MessageBoxButtons.YesNoCancel, MessageBoxIcon.Warning);
            if (r == DialogResult.Yes) { SaveFile(); return true; }
            if (r == DialogResult.Cancel) return false;
            return true;
        }

        private void SaveFile()
        {
            if (string.IsNullOrEmpty(currentFile)) { SaveAs(); return; }
            File.WriteAllText(currentFile, rtbContent.Text, System.Text.Encoding.UTF8);
            isModified = false;
            UpdateTitle();
        }

        private void SaveAs()
        {
            using (var sfd = new SaveFileDialog { Filter = "Text Files|*.txt|All Files|*.*" })
            {
                if (sfd.ShowDialog() == DialogResult.OK)
                {
                    currentFile = sfd.FileName;
                    SaveFile();
                }
            }
        }

        private void menuFileNew_Click(object sender, EventArgs e)
        {
            if (!PromptSave()) return;
            rtbContent.Clear(); currentFile = ""; isModified = false; UpdateTitle();
        }

        private void menuFileOpen_Click(object sender, EventArgs e)
        {
            if (!PromptSave()) return;
            using (var ofd = new OpenFileDialog { Filter = "Text Files|*.txt|All Files|*.*" })
            {
                if (ofd.ShowDialog() == DialogResult.OK)
                {
                    rtbContent.Text = File.ReadAllText(ofd.FileName, System.Text.Encoding.UTF8);
                    currentFile = ofd.FileName; isModified = false; UpdateTitle();
                }
            }
        }

        private void menuFileSave_Click(object sender, EventArgs e) => SaveFile();
        private void menuFileSaveAs_Click(object sender, EventArgs e) => SaveAs();
        private void menuFileExit_Click(object sender, EventArgs e) => this.Close();

        private void menuEditCut_Click(object sender, EventArgs e)   => rtbContent.Cut();
        private void menuEditCopy_Click(object sender, EventArgs e)  => rtbContent.Copy();
        private void menuEditPaste_Click(object sender, EventArgs e) => rtbContent.Paste();
        private void menuEditUndo_Click(object sender, EventArgs e)  => rtbContent.Undo();
        private void menuEditSelectAll_Click(object sender, EventArgs e) => rtbContent.SelectAll();

        private void menuFormatFont_Click(object sender, EventArgs e)
        {
            using (var fd = new FontDialog { Font = rtbContent.Font })
            {
                if (fd.ShowDialog() == DialogResult.OK)
                    rtbContent.Font = fd.Font;
            }
        }

        private void menuFormatBgColor_Click(object sender, EventArgs e)
        {
            using (var cd = new ColorDialog())
            {
                if (cd.ShowDialog() == DialogResult.OK)
                    rtbContent.BackColor = cd.Color;
            }
        }

        private void menuHelpAbout_Click(object sender, EventArgs e)
        {
            MessageBox.Show("My Notepad v1.0\nพัฒนาด้วย C# Windows Forms", "เกี่ยวกับ",
                MessageBoxButtons.OK, MessageBoxIcon.Information);
        }

        private void rtbContent_TextChanged(object sender, EventArgs e)
        {
            isModified = true;
            UpdateTitle();
            int words = rtbContent.Text.Trim() == "" ? 0 :
                rtbContent.Text.Split(new char[]{' ','\n','\r','\t'},
                    StringSplitOptions.RemoveEmptyEntries).Length;
            stsWordCount.Text = $"คำ: {words} | อักขระ: {rtbContent.Text.Length}";
        }

        private void rtbContent_SelectionChanged(object sender, EventArgs e)
        {
            int line = rtbContent.GetLineFromCharIndex(rtbContent.SelectionStart) + 1;
            int col  = rtbContent.SelectionStart -
                       rtbContent.GetFirstCharIndexFromLine(line - 1) + 1;
            stsPosition.Text = $"บรรทัด {line}, คอล {col}";
        }

        private void Form1_FormClosing(object sender, FormClosingEventArgs e)
        {
            if (!PromptSave()) e.Cancel = true;
        }
    }
}
```
:::

---

## 🔥 Challenge (โจทย์ท้าทาย!)

**โจทย์:** เพิ่มเมนู `แก้ไข > ค้นหาและแทนที่` (Ctrl+H) ที่เปิดฟอร์มเล็กๆ มีช่อง "ค้นหา" และ "แทนที่ด้วย" พร้อมปุ่ม "แทนที่ทั้งหมด" และแสดงจำนวนครั้งที่แทนที่สำเร็จใน MessageBox
