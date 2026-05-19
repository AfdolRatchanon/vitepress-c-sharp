# 💻 Lab: สร้างหน้าตั้งค่าโปรแกรม (Settings Panel)

> 💡 **เป้าหมาย:** สร้างหน้าตั้งค่าโปรแกรมที่สมบูรณ์แบบโดยใช้ TabControl 3 แท็บ, GroupBox, Panel และ FlowLayoutPanel รวมกัน

## 📖 ภาพรวมของโปรแกรม (Program Overview)

```text
[Wireframe: Settings Panel]
+-----------------------------------------------------------+
| 🗔 ตั้งค่าโปรแกรม                                _ □ X  |
+-----------------------------------------------------------+
| [ ทั่วไป ] [ ธีมสี ] [ ทางลัด ]                         |
+-----------------------------------------------------------+
|  Tab "ทั่วไป":                                            |
|  ┌─ ข้อมูลผู้ใช้ ────────────────────────────────────┐   |
|  │  ชื่อแสดง:  [ txtDisplayName       ]              │   |
|  │  ภาษา:      (●) ไทย  ( ) English                 │   |
|  └────────────────────────────────────────────────────┘   |
|  ┌─ ตัวเลือก ─────────────────────────────────────────┐   |
|  │  [✓] เปิดอัตโนมัติเมื่อเริ่ม Windows              │   |
|  │  [✓] แจ้งเตือนการอัพเดต                           │   |
|  └────────────────────────────────────────────────────┘   |
|                                                           |
|  Tab "ธีมสี":                                             |
|  [FlowLayoutPanel แสดงปุ่มสีที่เลือกได้]                 |
|  [ 🔵 น้ำเงิน ] [ 🟢 เขียว ] [ 🟣 ม่วง ] [ 🔴 แดง ]   |
+-----------------------------------------------------------+
```

## ⏱️ เวลาที่ใช้: 90 นาที

## 📝 ขั้นตอนการทำงาน

### ขั้นตอนที่ 1: UI Design
- [ ] สร้างโปรเจกต์ `SettingsApp`
- [ ] ลาก TabControl ตั้ง Dock = Fill, สร้าง 3 TabPage (ทั่วไป, ธีมสี, ทางลัด)
- [ ] Tab ทั่วไป: GroupBox 2 อัน พร้อม TextBox, RadioButton, CheckBox
- [ ] Tab ธีมสี: FlowLayoutPanel พร้อมปุ่มสี 5 สี
- [ ] Tab ทางลัด: ListView แสดงรายการคีย์ลัด
- [ ] ปุ่ม "บันทึก" และ "ยกเลิก" ด้านล่าง

### ขั้นตอนที่ 2: Code-Behind
- [ ] `Form_Load`: โหลดค่าเริ่มต้น, สร้างปุ่มสีใน FlowLayoutPanel, โหลดข้อมูลลง ListView
- [ ] `btnSave_Click`: Validate และแสดงสรุปการตั้งค่า
- [ ] Event ปุ่มสี: เมื่อคลิกปุ่มสีให้เปลี่ยนสีพื้นหลัง Form

::: code-group
```csharp [Form1.cs - โค้ดสมบูรณ์]
using System;
using System.Drawing;
using System.Windows.Forms;

namespace SettingsApp
{
    public partial class Form1 : Form
    {
        private Color selectedThemeColor = Color.SteelBlue;

        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            // ตั้งค่าเริ่มต้น
            txtDisplayName.Text = "ผู้ใช้ระบบ";
            rdoThai.Checked = true;
            chkAutoStart.Checked = true;
            chkNotify.Checked = true;

            // สร้างปุ่มสีใน FlowLayoutPanel
            CreateColorButton("น้ำเงิน", Color.SteelBlue);
            CreateColorButton("เขียว", Color.ForestGreen);
            CreateColorButton("ม่วง", Color.MediumPurple);
            CreateColorButton("แดง", Color.Crimson);
            CreateColorButton("ส้ม", Color.DarkOrange);

            // โหลด Shortcut ลง ListView
            lvShortcuts.Columns.Add("คำสั่ง", 200);
            lvShortcuts.Columns.Add("คีย์ลัด", 150);
            lvShortcuts.View = View.Details;
            lvShortcuts.FullRowSelect = true;
            lvShortcuts.GridLines = true;

            AddShortcut("บันทึก", "Ctrl + S");
            AddShortcut("เปิดไฟล์", "Ctrl + O");
            AddShortcut("พิมพ์", "Ctrl + P");
            AddShortcut("ค้นหา", "Ctrl + F");
            AddShortcut("ออกจากโปรแกรม", "Alt + F4");
        }

        private void CreateColorButton(string name, Color color)
        {
            Button btn = new Button
            {
                Text = name,
                BackColor = color,
                ForeColor = Color.White,
                Size = new Size(100, 40),
                FlatStyle = FlatStyle.Flat,
                Cursor = Cursors.Hand,
                Margin = new Padding(5),
                Tag = color
            };
            btn.FlatAppearance.BorderSize = 0;
            btn.Click += ColorButton_Click;
            flowColors.Controls.Add(btn);
        }

        private void ColorButton_Click(object sender, EventArgs e)
        {
            if (sender is Button btn && btn.Tag is Color color)
            {
                selectedThemeColor = color;
                lblColorPreview.BackColor = color;
                lblColorPreview.Text = $"ธีมที่เลือก: {btn.Text}";
            }
        }

        private void AddShortcut(string command, string key)
        {
            ListViewItem item = new ListViewItem(command);
            item.SubItems.Add(key);
            lvShortcuts.Items.Add(item);
        }

        private void btnSave_Click(object sender, EventArgs e)
        {
            if (string.IsNullOrWhiteSpace(txtDisplayName.Text))
            {
                MessageBox.Show("กรุณากรอกชื่อแสดงผล!", "แจ้งเตือน",
                    MessageBoxButtons.OK, MessageBoxIcon.Warning);
                tabSettings.SelectedIndex = 0;
                txtDisplayName.Focus();
                return;
            }

            string lang = rdoThai.Checked ? "ภาษาไทย" : "English";
            MessageBox.Show(
                $"บันทึกการตั้งค่าสำเร็จ!\n" +
                $"ชื่อ: {txtDisplayName.Text}\n" +
                $"ภาษา: {lang}\n" +
                $"ธีม: {ColorTranslator.ToHtml(selectedThemeColor)}",
                "สำเร็จ", MessageBoxButtons.OK, MessageBoxIcon.Information);
        }

        private void btnCancel_Click(object sender, EventArgs e)
        {
            if (MessageBox.Show("ยกเลิกการตั้งค่าและปิดหน้าต่างหรือไม่?", "ยืนยัน",
                MessageBoxButtons.YesNo, MessageBoxIcon.Question) == DialogResult.Yes)
            {
                this.Close();
            }
        }
    }
}
```
:::

---

## 🔥 Challenge (โจทย์ท้าทาย!)

**โจทย์:** เพิ่ม Tab "แบบอักษร" ที่มี ComboBox เลือกชื่อ Font, NumericUpDown เลือกขนาด และ Label Preview แสดงตัวอย่างข้อความในฟอนต์ที่เลือก อัพเดต Preview แบบ Realtime
