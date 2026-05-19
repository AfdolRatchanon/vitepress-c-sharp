# 02 - MDI และการจัดการหลายหน้าจอ

> 💡 **เป้าหมาย:** เรียนรู้การสร้างแอปพลิเคชันแบบ Multiple Document Interface (MDI) ซึ่งมีหน้าต่างหลัก (MDI Parent) และหน้าต่างลูกหลายอัน (MDI Child) ที่ทำงานอยู่ภายในกันแบบ Windows Explorer หรือ Microsoft Word รุ่นเก่า

## 📖 ทฤษฎีและแนวคิด UI (UI Concept & Theory)

**MDI (Multiple Document Interface)** คือรูปแบบแอปพลิเคชันที่มี:
- **MDI Parent**: หน้าต่างหลักที่เป็น Container
- **MDI Child**: หน้าต่างลูกที่วิ่งอยู่ใน Parent (ออกนอก Parent ไม่ได้)

```text
[MDI Application Layout]
+----------------------------------------------------------+
| 🗔 ระบบจัดการข้อมูล (MDI Parent)              _ □ X    |
+----------------------------------------------------------+
| [ไฟล์] [หน้าต่าง] [วิธีใช้]                             |
+----------------------------------------------------------+
| +---------------------------+  +----------------------+  |
| | 🗔 ฟอร์มนักเรียน  _ □ X |  | 🗔 ฟอร์มวิชา _ □ X |  |
| |                           |  |                      |  |
| |  [DataGridView]           |  |  [DataGridView]      |  |
| |                           |  |                      |  |
| +---------------------------+  +----------------------+  |
|                                                          |
+----------------------------------------------------------+
```

### วิธีสร้าง MDI Application:
1. ตั้ง Form หลักให้เป็น MDI Parent ด้วย `IsMdiContainer = true`
2. เวลาเปิด Child Form ให้ตั้ง `childForm.MdiParent = this`

---

## 🛠️ การตั้งค่า Properties (UI Setup)

**MainForm (MDI Parent):**
| Control | Property | ค่าที่ตั้ง |
| :--- | :--- | :--- |
| `MainForm` | `IsMdiContainer` | `true` |
| `MainForm` | `Text` | `"ระบบจัดการข้อมูล"` |
| `MainForm` | `WindowState` | `Maximized` |
| `MenuStrip` | เมนู "หน้าต่าง" | เพิ่ม: "จัดเรียง", "ย่อทั้งหมด" |

---

## 💻 ตัวอย่างโค้ด (Code Implementation)

::: code-group
```csharp [MainForm.cs — MDI Parent]
using System;
using System.Windows.Forms;

namespace MDIApp
{
    public partial class MainForm : Form
    {
        public MainForm()
        {
            InitializeComponent();
            this.IsMdiContainer = true;
        }

        private void menuOpenStudent_Click(object sender, EventArgs e)
        {
            // [1] ตรวจสอบว่า Child นี้เปิดอยู่แล้วหรือยัง (ป้องกันเปิดซ้ำ)
            foreach (Form child in this.MdiChildren)
            {
                if (child is StudentForm)
                {
                    child.Activate(); // ให้ Focus กับหน้าต่างที่เปิดอยู่
                    return;
                }
            }

            // [2] สร้าง Child Form และตั้ง MdiParent
            StudentForm studentForm = new StudentForm();
            studentForm.MdiParent = this;
            studentForm.Show();
        }

        private void menuOpenSubject_Click(object sender, EventArgs e)
        {
            SubjectForm subjectForm = new SubjectForm();
            subjectForm.MdiParent = this;
            subjectForm.Show();
        }

        // [3] จัดเรียงหน้าต่างลูก
        private void menuArrangeCascade_Click(object sender, EventArgs e)
        {
            this.LayoutMdi(MdiLayout.Cascade);
        }

        private void menuArrangeTile_Click(object sender, EventArgs e)
        {
            this.LayoutMdi(MdiLayout.TileHorizontal);
        }

        private void menuMinimizeAll_Click(object sender, EventArgs e)
        {
            foreach (Form child in this.MdiChildren)
                child.WindowState = FormWindowState.Minimized;
        }

        private void menuCloseAll_Click(object sender, EventArgs e)
        {
            foreach (Form child in this.MdiChildren)
                child.Close();
        }
    }
}
```
:::

---

## 🎯 โจทย์ฝึกปฏิบัติเสริมความเข้าใจ (Mini Exercise)

**โจทย์: MDI Application ระบบโรงเรียน**
สร้าง MDI Application ที่มีเมนูเปิดหน้าต่างต่างๆ: นักเรียน, ครู, วิชา โดยแต่ละหน้าต่างแสดง DataGridView จำลองข้อมูล และป้องกันไม่ให้เปิดหน้าต่างเดิมซ้ำสองครั้ง

::: details 💡 คำใบ้ (Hint)
ใช้ `foreach (Form f in this.MdiChildren)` เพื่อตรวจสอบหน้าต่างที่เปิดอยู่ และ `child is StudentForm` เพื่อตรวจว่าเป็นประเภทใด
:::

---

## 🔥 Challenge (โจทย์ท้าทาย!)

**โจทย์:** เพิ่มเมนู "หน้าต่าง" ที่แสดงรายชื่อหน้าต่างที่เปิดอยู่ทั้งหมดแบบ Dynamic (เพิ่ม MenuItem เมื่อเปิดหน้าต่างใหม่ และลบออกเมื่อปิด) คล้าย Taskbar ขนาดเล็กใน MDI Application

---

## 🗣️ ทบทวน (Review)

::: details ❓ คำถามทบทวน 1:
**คำถาม:** MDI Application เหมาะกับแอปพลิเคชันประเภทไหน?

**แนวคำตอบ:** เหมาะกับแอปพลิเคชันที่ต้องเปิดทำงานหลายหน้าจอพร้อมกัน เช่น ระบบโรงพยาบาล (เปิดแฟ้มผู้ป่วยหลายคนพร้อมกัน), Software บัญชี หรือ IDE ที่เปิดไฟล์หลายไฟล์ ปัจจุบัน MDI ถูกแทนที่ด้วย TabControl หรือ Docking Panel มากขึ้น
:::

::: details ❓ คำถามทบทวน 2:
**คำถาม:** `this.MdiChildren` ใช้ทำอะไรได้บ้าง?

**แนวคำตอบ:** `MdiChildren` เป็น Array ของ Form ทั้งหมดที่เปิดอยู่ภายใน MDI Parent สามารถ Loop เพื่อตรวจสอบ, ย่อ, ขยาย, ปิด หรือส่ง Message ไปยังหน้าต่างลูกทุกอัน
:::
