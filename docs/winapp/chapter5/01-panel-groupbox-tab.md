# 01 - Panel, GroupBox & TabControl

> 💡 **เป้าหมาย:** เรียนรู้การจัดระเบียบ Control บนฟอร์มให้เป็นกลุ่มที่มีความหมาย ด้วย Panel สำหรับการจัดกลุ่มแบบยืดหยุ่น GroupBox สำหรับกลุ่มที่มีป้ายกำกับ และ TabControl สำหรับสร้างฟอร์มแบบหลาย Tab ที่ใช้งานได้อย่างมืออาชีพ

## 📖 ทฤษฎีและแนวคิด UI (UI Concept & Theory)

เมื่อฟอร์มมี Control หลายสิบตัว การวางทุกอย่างบนฟอร์มโดยตรงจะทำให้หน้าจอดูรก และยากต่อการใช้งาน Container Controls แก้ปัญหานี้ด้วยการจัดกลุ่ม Control ที่เกี่ยวข้องกันเข้าด้วยกัน

### Panel vs GroupBox
- **Panel**: Container แบบง่าย ไม่มีป้ายกำกับ สามารถมีขอบหรือไม่มีก็ได้ ดีสำหรับการจัดกลุ่มภายในและซ่อน/แสดงทั้งกลุ่มพร้อมกัน
- **GroupBox**: Container ที่มีขอบและป้ายกำกับ เหมาะสำหรับกลุ่ม RadioButton หรือกลุ่ม Control ที่ต้องบอกผู้ใช้ว่าเป็นหมวดหมู่อะไร

### TabControl
TabControl สร้างแถบ Tab คล้าย Browser หรือหน้าต่าง Settings ของ Windows แต่ละ Tab เป็น TabPage ที่เป็นอิสระและสามารถมี Control แยกจากกันได้

```text
[ตัวอย่าง Form: ตั้งค่าระบบแบบ Tab]
+-----------------------------------------------+
| 🗔 ตั้งค่าระบบ                        _ □ X |
+-----------------------------------------------+
| [ ทั่วไป ] [ การแสดงผล ] [ ความปลอดภัย ]    |
+-----------------------------------------------+
|  (TabPage ที่กำลังแสดงอยู่)                 |
|                                               |
|  ┌─ ข้อมูลผู้ใช้ ──────────────────────────┐ |
|  │  ชื่อ: [ txtName         ]              │ |
|  │  อีเมล: [ txtEmail       ]             │ |
|  └─────────────────────────────────────────┘ |
|                                               |
|  ┌─ ภาษา ──────────────────────────────────┐ |
|  │  (●) ภาษาไทย  ( ) English              │ |
|  └─────────────────────────────────────────┘ |
|                                               |
+-----------------------------------------------+
```

### 🔑 Properties ที่สำคัญ

**Panel:**
| Property | การทำงาน | ค่าแนะนำ |
| :--- | :--- | :--- |
| `BorderStyle` | รูปแบบขอบ | `FixedSingle` |
| `AutoScroll` | เพิ่ม Scrollbar อัตโนมัติเมื่อ Control เกินพื้นที่ | `true` |
| `Visible` | ซ่อน/แสดง Panel พร้อม Control ทั้งหมดในนั้น | `true` |
| `Enabled` | ปิด/เปิด Control ทั้งหมดใน Panel พร้อมกัน | `true` |

**TabControl:**
| Property | การทำงาน | ค่าแนะนำ |
| :--- | :--- | :--- |
| `TabPages` | Collection ของ Tab ทั้งหมด | เพิ่มผ่าน Designer |
| `SelectedIndex` | Index ของ Tab ที่กำลังแสดง | `0` |
| `SelectedTab` | TabPage ที่กำลังแสดง | - |
| `Alignment` | ตำแหน่งของแถบ Tab | `Top` (ค่าเริ่มต้น) |

---

## 🛠️ การตั้งค่า Properties (UI Setup)

| Control | Property | ค่าที่ตั้ง |
| :--- | :--- | :--- |
| `Form1` | `Text` | `"ตั้งค่าระบบ"` |
| `Form1` | `Size` | `600, 450` |
| `TabControl` | `Name` | `tabSettings` |
| `TabControl` | `Dock` | `Fill` (เต็มฟอร์ม) |
| `TabPage` 1 | `Name` | `tabGeneral` |
| `TabPage` 1 | `Text` | `"ทั่วไป"` |
| `TabPage` 2 | `Name` | `tabDisplay` |
| `TabPage` 2 | `Text` | `"การแสดงผล"` |
| `TabPage` 3 | `Name` | `tabSecurity` |
| `TabPage` 3 | `Text` | `"ความปลอดภัย"` |
| GroupBox ใน Tab1 | `Text` | `"ข้อมูลผู้ใช้"` |
| GroupBox ใน Tab1 | `Name` | `grpUserInfo` |

> **วิธีเพิ่ม TabPage:** คลิก TabControl แล้วดูที่ Properties > TabPages > คลิกปุ่ม `...` เพื่อเปิด TabPage Collection Editor

---

## 💻 ตัวอย่างโค้ด (Code Implementation)

::: code-group
```csharp [Form1.cs]
using System;
using System.Windows.Forms;

namespace SettingsForm
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            // [1] ตั้งค่าเริ่มต้นของแต่ละ Tab
            txtName.Text = "ผู้ใช้ระบบ";
            rdoThaiLanguage.Checked = true;

            // [2] ใส่ค่า ComboBox ใน Tab การแสดงผล
            cboFontSize.Items.AddRange(new string[] { "เล็ก (10px)", "กลาง (14px)", "ใหญ่ (18px)" });
            cboFontSize.SelectedIndex = 1;
        }

        // [3] Event SelectedIndexChanged ของ TabControl
        // ทำงานทุกครั้งที่ผู้ใช้คลิกเปลี่ยน Tab
        private void tabSettings_SelectedIndexChanged(object sender, EventArgs e)
        {
            // แสดง Tab ที่กำลังใช้งานใน Title Bar
            this.Text = $"ตั้งค่าระบบ — {tabSettings.SelectedTab.Text}";
        }

        // [4] ปุ่มบันทึกใน Tab ทั่วไป
        private void btnSaveGeneral_Click(object sender, EventArgs e)
        {
            if (string.IsNullOrWhiteSpace(txtName.Text))
            {
                MessageBox.Show("กรุณากรอกชื่อผู้ใช้!", "แจ้งเตือน",
                    MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            string language = rdoThaiLanguage.Checked ? "ภาษาไทย" : "English";
            MessageBox.Show($"บันทึกแล้ว! ชื่อ: {txtName.Text} | ภาษา: {language}", "สำเร็จ",
                MessageBoxButtons.OK, MessageBoxIcon.Information);
        }

        // [5] ซ่อน/แสดง Panel ด้วยโค้ด
        private void chkAdvancedOptions_CheckedChanged(object sender, EventArgs e)
        {
            pnlAdvanced.Visible = chkAdvancedOptions.Checked;
        }
    }
}
```
:::

**Expected Output:**
```text
กดแท็บ "การแสดงผล" → Title Bar เปลี่ยนเป็น "ตั้งค่าระบบ — การแสดงผล"
ติ๊ก "ตัวเลือกขั้นสูง" → Panel ที่ซ่อนอยู่ปรากฏขึ้น
กด "บันทึก" ใน Tab ทั่วไป → MessageBox สรุปข้อมูล
```

---

## 🎯 โจทย์ฝึกปฏิบัติเสริมความเข้าใจ (Mini Exercise)

**โจทย์ที่ 1: Wizard แบบ Step-by-Step**
สร้างโปรแกรมที่มี Panel 3 อัน (แต่ละอันเป็น 1 ขั้นตอน) แสดงเพียง Panel เดียวในแต่ละเวลา และมีปุ่ม "ถัดไป" / "ย้อนกลับ" เพื่อสลับ Panel

**โจทย์ที่ 2: TabControl แบบ Dynamic**
สร้างโปรแกรมที่มีปุ่ม "เพิ่ม Tab" และ "ปิด Tab" สามารถเพิ่ม TabPage ใหม่และลบ TabPage ที่เลือกอยู่ผ่านโค้ดได้

::: details 💡 คำใบ้ (Hint)
ใช้ `tabControl.TabPages.Add(newPage)` และ `tabControl.TabPages.Remove(tabControl.SelectedTab)` ในการเพิ่ม/ลบ TabPage แบบ Dynamic
:::

---

## 🔥 Challenge (โจทย์ท้าทาย!)

**โจทย์: เมนูหลักระบบโรงเรียน**
สร้างหน้าหลักที่มี TabControl 4 Tab (นักเรียน, ครู, วิชา, รายงาน) แต่ละ Tab มี Panel ข้างในสำหรับแสดงฟอร์มย่อย โดย Tab นักเรียนต้องมีฟอร์มกรอกชื่อ-นามสกุล ห้องเรียน และ GPA พร้อม Validation

---

## 🗣️ ทบทวน (Review)

::: details ❓ คำถามทบทวน 1:
**คำถาม:** ความแตกต่างหลักระหว่าง Panel และ GroupBox คืออะไร?

**แนวคำตอบ:** Panel เป็น Container แบบ General ที่ซ่อนตัวเองได้ง่าย เหมาะสำหรับจัดกลุ่มและซ่อน/แสดงทั้งกลุ่มพร้อมกัน ส่วน GroupBox มีป้ายกำกับ (Title) บอกว่ากลุ่มนี้คืออะไร และมีขอบรูปแบบเฉพาะ เหมาะสำหรับ RadioButton กลุ่มหรือข้อมูลที่ต้องการให้ผู้ใช้เห็นหมวดหมู่ชัดเจน
:::

::: details ❓ คำถามทบทวน 2:
**คำถาม:** ทำไมการตั้ง `Panel.Visible = false` จึงซ่อน Control ทุกอย่างใน Panel ไปพร้อมกัน?

**แนวคำตอบ:** เพราะ Control ที่อยู่ใน Panel เป็น "ลูก" (Children) ของ Panel นั้น เมื่อ Parent Control ถูกซ่อน ลูกทุกตัวก็จะถูกซ่อนตามไปด้วยโดยอัตโนมัติ ซึ่งสะดวกมากในการทำ Wizard หรือ Multi-step Form
:::
