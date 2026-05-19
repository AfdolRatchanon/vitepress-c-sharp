# 💻 Lab: สร้างฟอร์มสมัครสมาชิก (Registration Form)

> 💡 **เป้าหมาย:** สังเคราะห์ความรู้จากบทที่ 3 มาสร้างฟอร์มสมัครสมาชิกที่สมบูรณ์แบบ รวม RadioButton, CheckBox, ComboBox และ ListBox พร้อมระบบ Validation ครบทุกช่อง

## 📖 ภาพรวมของโปรแกรม (Program Overview)

สร้างฟอร์มสมัครสมาชิกระบบห้องสมุดออนไลน์ที่มีข้อมูลครบถ้วน

```text
[Wireframe: Registration Form]
+----------------------------------------------------+
| 🗔 สมัครสมาชิกห้องสมุด                     _ □ X |
+----------------------------------------------------+
|                                                    |
|  ┌─ ข้อมูลส่วนตัว ──────────────────────────────┐ |
|  │  เพศ:    (●) ชาย  ( ) หญิง  ( ) ไม่ระบุ     │ |
|  │  จังหวัด: [▼ ComboBox                    ]   │ |
|  └────────────────────────────────────────────────┘ |
|                                                    |
|  ┌─ ประเภทหนังสือที่สนใจ ────────────────────────┐ |
|  │  [✓] นิยาย   [✓] วิทยาศาสตร์  [ ] ประวัติ  │ |
|  │  [ ] การ์ตูน [ ] วิทยาศาสตร์                │ |
|  └────────────────────────────────────────────────┘ |
|                                                    |
|  สรุปข้อมูล: [lblSummary                       ]  |
|                                                    |
|        [ btnRegister ]    [ btnClear ]             |
|                                                    |
+----------------------------------------------------+
```

## ⏱️ เวลาที่ใช้: 75 นาที

## 📝 ขั้นตอนการทำงาน (Step-by-Step)

### ขั้นตอนที่ 1: การออกแบบหน้าจอ (UI Design)

- [ ] สร้างโปรเจกต์ใหม่ ชื่อ `LibraryRegistration`
- [ ] ลาก GroupBox 2 อัน: "ข้อมูลส่วนตัว" และ "ประเภทหนังสือที่สนใจ"
- [ ] ใน GroupBox แรก: RadioButton 3 อัน (rdoMale, rdoFemale, rdoNotSpecify) และ ComboBox (cboProvince)
- [ ] ใน GroupBox สอง: CheckBox 5 อัน (chkFiction, chkScience, chkHistory, chkComic, chkBusiness)
- [ ] Label สำหรับสรุปข้อมูล (lblSummary) และปุ่ม btnRegister, btnClear

### ขั้นตอนที่ 2: การเขียนโค้ดหลังบ้าน (Code-Behind)

- [ ] โหลด 10 จังหวัดลง ComboBox ใน `Form_Load` (ใช้ Event `Load` ของ Form)
- [ ] เขียนโค้ด `btnRegister_Click` พร้อม Validation ครบทุกช่อง
- [ ] เขียนโค้ด `btnClear_Click` รีเซ็ตทุก Control

::: code-group
```csharp [Form1.cs - โค้ดสมบูรณ์]
using System;
using System.Collections.Generic;
using System.Windows.Forms;

namespace LibraryRegistration
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            // โหลดจังหวัดลง ComboBox
            cboProvince.Items.AddRange(new string[] {
                "-- เลือกจังหวัด --", "กรุงเทพมหานคร", "เชียงใหม่",
                "ขอนแก่น", "นครราชสีมา", "สงขลา",
                "ชลบุรี", "ภูเก็ต", "อุดรธานี", "เชียงราย", "พิษณุโลก"
            });
            cboProvince.SelectedIndex = 0;

            // ค่าเริ่มต้น: เลือก "ชาย"
            rdoMale.Checked = true;
        }

        private void btnRegister_Click(object sender, EventArgs e)
        {
            // --- VALIDATION ---
            if (cboProvince.SelectedIndex == 0)
            {
                MessageBox.Show("กรุณาเลือกจังหวัด!", "ข้อมูลไม่ครบ",
                    MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            // รวบรวมประเภทหนังสือที่เลือก
            var books = new List<string>();
            if (chkFiction.Checked)  books.Add("นิยาย");
            if (chkScience.Checked)  books.Add("วิทยาศาสตร์");
            if (chkHistory.Checked)  books.Add("ประวัติศาสตร์");
            if (chkComic.Checked)    books.Add("การ์ตูน");
            if (chkBusiness.Checked) books.Add("ธุรกิจ");

            if (books.Count == 0)
            {
                MessageBox.Show("กรุณาเลือกประเภทหนังสืออย่างน้อย 1 ประเภท!", "ข้อมูลไม่ครบ",
                    MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            // --- แสดงสรุป ---
            string gender = rdoMale.Checked ? "ชาย" :
                           rdoFemale.Checked ? "หญิง" : "ไม่ระบุ";
            string province = cboProvince.SelectedItem.ToString();
            string bookList = string.Join(", ", books);

            lblSummary.Text = $"เพศ: {gender} | จังหวัด: {province}\nสนใจ: {bookList}";

            MessageBox.Show("สมัครสมาชิกสำเร็จ! 🎉", "สำเร็จ",
                MessageBoxButtons.OK, MessageBoxIcon.Information);
        }

        private void btnClear_Click(object sender, EventArgs e)
        {
            rdoMale.Checked = true;
            cboProvince.SelectedIndex = 0;
            chkFiction.Checked = false;
            chkScience.Checked = false;
            chkHistory.Checked = false;
            chkComic.Checked = false;
            chkBusiness.Checked = false;
            lblSummary.Text = "";
        }
    }
}
```
:::

---

## 🔥 Challenge (โจทย์ท้าทาย!)

**โจทย์:** เพิ่มระบบ **ระดับสมาชิก** โดยใช้ ComboBox เพิ่มเติม (ทองแดง/เงิน/ทอง) และแต่ละระดับมีสิทธิ์ยืมหนังสือต่างกัน แสดงข้อมูลสิทธิ์ใน Label ทันทีที่เลือกระดับ
