# 02 - Custom Dialog Forms

> 💡 **เป้าหมาย:** เรียนรู้การสร้าง Dialog Form แบบกำหนดเองในกรณีที่ Common Dialog ของ Windows ไม่ตรงกับความต้องการ เช่น ฟอร์มยืนยันรหัสผ่าน, ฟอร์มกรอกข้อมูลเพิ่มเติม หรือฟอร์มตั้งค่า พร้อมการส่งข้อมูลระหว่างฟอร์ม

## 📖 ทฤษฎีและแนวคิด UI (UI Concept & Theory)

Custom Dialog คือ Form ธรรมดาที่เราออกแบบและเปิดในโหมด **Modal** (บังคับให้ผู้ใช้ตอบสนองก่อนกลับ) ด้วยคำสั่ง `.ShowDialog()` แทน `.Show()`

```text
[Modal vs Modeless]
Modal (.ShowDialog()):          Modeless (.Show()):
+------------------+           +------------------+
| Form หลัก (ล็อก)|           | Form หลัก (ใช้ได้)|
+------------------+           +------------------+
      ↑ บล็อก                        ↑ ไม่บล็อก
+------------------+           +------------------+
| Dialog (ต้องตอบ) |           | Dialog (เสริม)   |
+------------------+           +------------------+
ผู้ใช้ต้องกด OK/Cancel         ผู้ใช้เปิดทิ้งไว้ได้
ก่อนกลับฟอร์มหลัก              (เช่น หน้าต่าง Find)
```

**วิธีส่งข้อมูลออกจาก Custom Dialog:**
1. ใช้ `public Property` บน Dialog Form
2. ตั้ง `this.DialogResult = DialogResult.OK` เมื่อผู้ใช้กดยืนยัน

---

## 🛠️ การตั้งค่า Properties (UI Setup)

**การสร้าง Custom Dialog Form:**
1. คลิกขวาที่ Project > Add > Windows Form
2. ตั้งชื่อไฟล์ว่า `InputDialog.cs`
3. ออกแบบ UI ของ Dialog ใน InputDialog.cs

| Control (บน InputDialog) | Property | ค่าที่ตั้ง |
| :--- | :--- | :--- |
| `InputDialog Form` | `Text` | `"กรอกข้อมูล"` |
| `InputDialog Form` | `FormBorderStyle` | `FixedDialog` |
| `InputDialog Form` | `MaximizeBox` | `false` |
| `InputDialog Form` | `MinimizeBox` | `false` |
| `InputDialog Form` | `StartPosition` | `CenterParent` |
| `InputDialog Form` | `Size` | `350, 180` |
| `Label` | `Text` | `"กรุณากรอกข้อมูล:"` |
| `TextBox` | `Name` | `txtInput` |
| `Button` (ยืนยัน) | `Name` | `btnOK` |
| `Button` (ยืนยัน) | `Text` | `"ตกลง"` |
| `Button` (ยืนยัน) | `DialogResult` | `OK` |
| `Button` (ยกเลิก) | `Name` | `btnCancel` |
| `Button` (ยกเลิก) | `Text` | `"ยกเลิก"` |
| `Button` (ยกเลิก) | `DialogResult` | `Cancel` |

> ⚠️ **เคล็ดลับ:** การตั้ง `Button.DialogResult = OK` จะทำให้การกดปุ่มนั้น ปิด Dialog และ Return `DialogResult.OK` โดยอัตโนมัติ โดยไม่ต้องเขียนโค้ดเพิ่ม

---

## 💻 ตัวอย่างโค้ด (Code Implementation)

::: code-group
```csharp [InputDialog.cs — ตัว Dialog เอง]
using System;
using System.Windows.Forms;

namespace MultiFormApp
{
    public partial class InputDialog : Form
    {
        // [1] Property สาธารณะสำหรับส่งค่ากลับไปยัง Form หลัก
        public string InputValue { get; private set; } = "";
        public string DialogTitle
        {
            set { this.Text = value; }
        }

        public InputDialog()
        {
            InitializeComponent();
            // ตั้ง AcceptButton และ CancelButton
            this.AcceptButton = btnOK;
            this.CancelButton = btnCancel;
        }

        // [2] เมื่อผู้ใช้กด "ตกลง" ตรวจสอบข้อมูลก่อน
        private void btnOK_Click(object sender, EventArgs e)
        {
            if (string.IsNullOrWhiteSpace(txtInput.Text))
            {
                MessageBox.Show("กรุณากรอกข้อมูลก่อน!", "แจ้งเตือน",
                    MessageBoxButtons.OK, MessageBoxIcon.Warning);
                txtInput.Focus();
                return; // ไม่ปิด Dialog
            }

            InputValue = txtInput.Text.Trim();
            this.DialogResult = DialogResult.OK; // ปิด Dialog พร้อม OK
            this.Close();
        }
    }
}
```

```csharp [Form1.cs — Form หลักที่เรียกใช้ Dialog]
using System;
using System.Windows.Forms;

namespace MultiFormApp
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void btnAddItem_Click(object sender, EventArgs e)
        {
            // [3] สร้าง Dialog และเปิดแบบ Modal
            using (InputDialog dialog = new InputDialog())
            {
                dialog.DialogTitle = "เพิ่มรายการสินค้า";

                // ShowDialog() หยุดรอจนผู้ใช้ตอบสนอง แล้วค่อย Return
                if (dialog.ShowDialog(this) == DialogResult.OK)
                {
                    // [4] อ่านค่าจาก Property ของ Dialog
                    string newItem = dialog.InputValue;
                    lstItems.Items.Add(newItem);
                    lblCount.Text = $"จำนวน: {lstItems.Items.Count} รายการ";
                }
                // ถ้าผู้ใช้กด "ยกเลิก" → ไม่ทำอะไร
            }
        }
    }
}
```
:::

**Expected Output:**
```text
กดปุ่ม "เพิ่มรายการ"
→ Dialog เปิดขึ้นมา (Form หลักถูก Disable ชั่วคราว)
→ พิมพ์ "แอปเปิล" และกด "ตกลง"
→ Dialog ปิด Form หลักกลับมา Active
→ lstItems เพิ่ม "แอปเปิล" เข้าไป
```

---

## 🎯 โจทย์ฝึกปฏิบัติเสริมความเข้าใจ (Mini Exercise)

**โจทย์ที่ 1: Dialog ยืนยันรหัสผ่าน**
สร้าง Custom Dialog ที่มี TextBox 2 ช่อง (รหัสผ่านใหม่, ยืนยันรหัสผ่าน) และปุ่ม OK/Cancel ต้องตรวจสอบว่ารหัสผ่านทั้งสองตรงกันก่อน OK

**โจทย์ที่ 2: Dialog กรอกข้อมูลสินค้า**
สร้าง Dialog ที่มีช่องกรอก: ชื่อสินค้า, ราคา (NumericUpDown), จำนวน ผู้ใช้กรอกแล้วกด OK ข้อมูลจะไปแสดงใน ListView บน Form หลัก

::: details 💡 คำใบ้ (Hint)
สร้าง Properties บน Dialog Form หลายตัว เช่น `ProductName`, `Price`, `Quantity` แล้วอ่านหลัง `ShowDialog() == OK`
:::

---

## 🔥 Challenge (โจทย์ท้าทาย!)

**โจทย์: หน้าต่าง "เกี่ยวกับโปรแกรม" (About Box)**
สร้าง AboutForm ที่มี PictureBox แสดงโลโก้, RichTextBox แสดงรายละเอียดโปรแกรม, LinkLabel ลิงก์เว็บไซต์ และปุ่มปิด โดยเปิดด้วยเมนู `วิธีใช้ > เกี่ยวกับโปรแกรม`

---

## 🗣️ ทบทวน (Review)

::: details ❓ คำถามทบทวน 1:
**คำถาม:** ความแตกต่างระหว่าง `.Show()` และ `.ShowDialog()` คืออะไร?

**แนวคำตอบ:** `.Show()` เปิดฟอร์มแบบ Modeless คือฟอร์มหลักยังใช้งานได้ขณะที่ Dialog เปิดอยู่ ส่วน `.ShowDialog()` เปิดแบบ Modal คือบล็อกการทำงานของฟอร์มหลัก โค้ดหลังบรรทัดนี้จะไม่ทำงานจนกว่าผู้ใช้จะปิด Dialog
:::

::: details ❓ คำถามทบทวน 2:
**คำถาม:** ทำไมต้อง `using (InputDialog dialog = new InputDialog())` แทนแค่ `InputDialog dialog = new InputDialog()`?

**แนวคำตอบ:** Form เป็น IDisposable และมี Handle ของ Windows ผูกอยู่ การใช้ `using` ทำให้ `.Dispose()` ถูกเรียกอัตโนมัติหลัง Block สิ้นสุด ทำให้ทรัพยากรระบบถูกคืนทันที ป้องกัน Handle Leak ที่สะสมได้หากเปิดปิด Dialog หลายครั้ง
:::
