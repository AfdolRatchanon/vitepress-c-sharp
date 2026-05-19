# 02 - ListView, TreeView & ErrorProvider

> 💡 **เป้าหมาย:** เรียนรู้ ListView สำหรับแสดงรายการแบบไอคอน/รายละเอียด, TreeView สำหรับข้อมูลแบบลำดับชั้น และ ErrorProvider สำหรับแสดงข้อผิดพลาด Inline บน Control แบบมืออาชีพ

## 📖 ทฤษฎีและแนวคิด UI (UI Concept & Theory)

### ListView — 4 มุมมอง
ListView แสดงรายการได้ 4 รูปแบบ (เปลี่ยนได้ผ่าน Property `View`):
- **Details**: ตารางคล้าย DataGridView (ใช้บ่อยที่สุด)
- **LargeIcon**: ไอคอนใหญ่ (เหมือน Desktop)
- **SmallIcon**: ไอคอนเล็ก
- **List**: รายการเรียงคอลัมน์

### TreeView — แสดงข้อมูลแบบต้นไม้
TreeView เหมาะสำหรับข้อมูลที่มีลำดับชั้น เช่น โครงสร้างโฟลเดอร์, ผังองค์กร, หมวดหมู่สินค้า

### ErrorProvider — Validation แบบ Inline
แทนที่จะ Pop MessageBox เมื่อข้อมูลผิด ErrorProvider จะแสดงไอคอน ⚠️ ติดกับ Control นั้นๆ ทำให้ผู้ใช้รู้ทันทีว่าช่องไหนมีปัญหา

```text
[ErrorProvider บน Form]
+----------------------------------------+
|  ชื่อ:  [                ] ⚠️          |
|  อายุ:  [ abc            ] ⚠️ ต้องเป็นตัวเลข |
|  อีเมล: [  user@         ] ⚠️          |
|            [ ตกลง ]                    |
+----------------------------------------+
```

---

## 🛠️ การตั้งค่า Properties (UI Setup)

| Control | Property | ค่าที่ตั้ง |
| :--- | :--- | :--- |
| `ListView` | `Name` | `lvFiles` |
| `ListView` | `View` | `Details` |
| `ListView` | `FullRowSelect` | `true` |
| `ListView` | `GridLines` | `true` |
| `TreeView` | `Name` | `tvCategories` |
| `TreeView` | `ShowLines` | `true` |
| `TreeView` | `ShowPlusMinus` | `true` |
| `ErrorProvider` | `Name` | `errValidator` |
| `ErrorProvider` | `BlinkStyle` | `AlwaysFlash` |

> **วิธีเพิ่ม ErrorProvider:** ลาก ErrorProvider จาก Toolbox มาวางบน Form (จะไปอยู่ที่ด้านล่างของ Designer เหมือน Timer)

---

## 💻 ตัวอย่างโค้ด (Code Implementation)

::: code-group
```csharp [Form1.cs — ListView & TreeView]
using System;
using System.Windows.Forms;

namespace DataPresentation
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
            SetupListView();
            SetupTreeView();
        }

        private void SetupListView()
        {
            // [1] เพิ่ม Column ให้ ListView
            lvFiles.Columns.Clear();
            lvFiles.Columns.Add("ชื่อ", 200);
            lvFiles.Columns.Add("แผนก", 120);
            lvFiles.Columns.Add("เงินเดือน", 100);
            lvFiles.Columns.Add("สถานะ", 80);

            // [2] เพิ่มข้อมูลด้วย ListViewItem
            AddEmployee("สมชาย ใจดี", "IT", 45000, "ปกติ");
            AddEmployee("วิชัย รักดี", "HR", 38000, "ปกติ");
            AddEmployee("สุดา สวยงาม", "Finance", 52000, "ลาพัก");
        }

        private void AddEmployee(string name, string dept, decimal salary, string status)
        {
            ListViewItem item = new ListViewItem(name);
            item.SubItems.Add(dept);
            item.SubItems.Add(salary.ToString("N0"));
            item.SubItems.Add(status);

            // ตั้งสีแถวตามสถานะ
            if (status == "ลาพัก")
                item.BackColor = System.Drawing.Color.LightYellow;

            lvFiles.Items.Add(item);
        }

        private void SetupTreeView()
        {
            // [3] สร้าง Node ในแบบลำดับชั้น
            tvCategories.Nodes.Clear();

            TreeNode root = new TreeNode("🏢 บริษัท ABC จำกัด");

            TreeNode itDept = new TreeNode("💻 แผนก IT");
            itDept.Nodes.Add("Frontend Team");
            itDept.Nodes.Add("Backend Team");
            itDept.Nodes.Add("DevOps Team");

            TreeNode hrDept = new TreeNode("👥 แผนก HR");
            hrDept.Nodes.Add("สรรหาบุคลากร");
            hrDept.Nodes.Add("พัฒนาบุคลากร");

            TreeNode financeDept = new TreeNode("💰 แผนก Finance");
            financeDept.Nodes.Add("บัญชี");
            financeDept.Nodes.Add("การเงิน");

            root.Nodes.Add(itDept);
            root.Nodes.Add(hrDept);
            root.Nodes.Add(financeDept);

            tvCategories.Nodes.Add(root);
            root.ExpandAll(); // เปิดทุก Node
        }

        // [4] Event เมื่อคลิก Node ใน TreeView
        private void tvCategories_AfterSelect(object sender, TreeViewEventArgs e)
        {
            lblSelected.Text = $"เลือก: {e.Node.FullPath}";
        }
    }
}
```

```csharp [Form2.cs — ErrorProvider Validation]
using System;
using System.Windows.Forms;

namespace DataPresentation
{
    public partial class Form2 : Form
    {
        public Form2()
        {
            InitializeComponent();
        }

        private void btnSubmit_Click(object sender, EventArgs e)
        {
            bool isValid = true;

            // [5] ล้าง Error เก่าทั้งหมดก่อน
            errValidator.Clear();

            // [6] ตรวจสอบแต่ละ Field และแสดง Error แบบ Inline
            if (string.IsNullOrWhiteSpace(txtName.Text))
            {
                errValidator.SetError(txtName, "กรุณากรอกชื่อ");
                isValid = false;
            }

            if (!int.TryParse(txtAge.Text, out int age) || age < 1 || age > 120)
            {
                errValidator.SetError(txtAge, "อายุต้องเป็นตัวเลข 1-120");
                isValid = false;
            }

            if (!txtEmail.Text.Contains("@") || !txtEmail.Text.Contains("."))
            {
                errValidator.SetError(txtEmail, "รูปแบบอีเมลไม่ถูกต้อง");
                isValid = false;
            }

            if (!isValid) return;

            // ข้อมูลถูกต้องทั้งหมด
            MessageBox.Show("บันทึกข้อมูลสำเร็จ!", "สำเร็จ",
                MessageBoxButtons.OK, MessageBoxIcon.Information);
        }

        // [7] ล้าง Error เมื่อผู้ใช้แก้ไขช่องนั้น
        private void txtName_TextChanged(object sender, EventArgs e)
        {
            errValidator.SetError(txtName, "");
        }

        private void txtAge_TextChanged(object sender, EventArgs e)
        {
            errValidator.SetError(txtAge, "");
        }
    }
}
```
:::

---

## 🎯 โจทย์ฝึกปฏิบัติเสริมความเข้าใจ (Mini Exercise)

**โจทย์ที่ 1: ListView แบบเปลี่ยน View**
เพิ่ม RadioButton 4 ปุ่ม (Details, LargeIcon, SmallIcon, List) เมื่อเลือกให้เปลี่ยน `lvFiles.View` ตามนั้น

**โจทย์ที่ 2: TreeView แบบ Dynamic**
สร้าง TextBox + ปุ่ม "เพิ่ม Node" ที่เพิ่ม Child Node ลงใน Node ที่เลือกอยู่ใน TreeView และปุ่ม "ลบ Node" ที่ลบ Node ที่เลือก

::: details 💡 คำใบ้ (Hint)
`tvCategories.SelectedNode.Nodes.Add("ชื่อ Node ใหม่")` และ `tvCategories.SelectedNode.Remove()`
:::

---

## 🔥 Challenge (โจทย์ท้าทาย!)

**โจทย์: ระบบ Validation Form สมัครงาน**
สร้างฟอร์มสมัครงานที่มี 6 ช่อง (ชื่อ, นามสกุล, อายุ, อีเมล, เบอร์โทร, วุฒิการศึกษา) ใช้ ErrorProvider แสดงข้อผิดพลาดทุกช่องพร้อมกันเมื่อกด Submit และล้าง Error ทีละช่องเมื่อผู้ใช้แก้ไข

---

## 🗣️ ทบทวน (Review)

::: details ❓ คำถามทบทวน 1:
**คำถาม:** ErrorProvider ดีกว่า MessageBox อย่างไรในการแสดงข้อผิดพลาด?

**แนวคำตอบ:** MessageBox บังคับให้ผู้ใช้กด OK ก่อนจึงจะแก้ไขได้ และถ้ามีหลายข้อผิดพลาดต้องแสดงทีละครั้ง ErrorProvider แสดงข้อผิดพลาดทุกช่องพร้อมกันโดยไม่รบกวนผู้ใช้ ทำให้ผู้ใช้รู้ทันทีว่าช่องไหนต้องแก้
:::

::: details ❓ คำถามทบทวน 2:
**คำถาม:** `e.Node.FullPath` ใน TreeView คืออะไร?

**แนวคำตอบ:** `FullPath` คือ path เต็มของ Node ตั้งแต่ Node ราก เช่น "บริษัท ABC\แผนก IT\Frontend Team" โดยใช้ `\` เป็น Separator ตามค่า `TreeView.PathSeparator`
:::
