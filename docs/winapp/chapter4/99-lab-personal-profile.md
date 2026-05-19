# 💻 Lab: สร้างโปรแกรมโปรไฟล์ส่วนตัว (Personal Profile)

> 💡 **เป้าหมาย:** สังเคราะห์ความรู้จากบทที่ 4 มาสร้างโปรแกรมโปรไฟล์ส่วนตัวที่สมบูรณ์แบบ รวม DateTimePicker, NumericUpDown, PictureBox, RichTextBox และ LinkLabel

## 📖 ภาพรวมของโปรแกรม (Program Overview)

สร้างโปรแกรม "บัตรประจำตัวดิจิทัล" ที่รวบรวมข้อมูลส่วนตัว แสดงรูปภาพ และคำนวณอายุอัตโนมัติ

```text
[Wireframe: Personal Profile]
+-----------------------------------------------------------+
| 🗔 บัตรประจำตัวดิจิทัล                           _ □ X  |
+-----------------------------------------------------------+
|  +----------+  ชื่อ: [txtName          ]                  |
|  |          |  วันเกิด: [📅 dtpBirth   ]                  |
|  |  รูปภาพ  |  อายุ: [ lblAge         ] ปี               |
|  |  [pbImg] |  ส่วนสูง: [▲ 170 ▼] ซม.                   |
|  +----------+  น้ำหนัก: [▲  60 ▼] กก.                   |
|  [btnLoadImg]  BMI: [ lblBMI           ]                  |
|                                                           |
|  ┌─ ประวัติ ──────────────────────────────────────────┐   |
|  │  [RichTextBox rtbBio                           ]   │   |
|  └────────────────────────────────────────────────────┘   |
|                                                           |
|  เว็บไซต์: [lnkSite]    อีเมล: [lnkEmail]               |
|                                                           |
|  [ B ] [ I ] [ U ]    [ btnSave ]  [ btnClear ]          |
+-----------------------------------------------------------+
```

## ⏱️ เวลาที่ใช้: 90 นาที

## 📝 ขั้นตอนการทำงาน (Step-by-Step)

### ขั้นตอนที่ 1: การออกแบบหน้าจอ (UI Design)
- [ ] สร้างโปรเจกต์ ชื่อ `PersonalProfile`
- [ ] ลาก PictureBox (pbProfile, Size=120,120, SizeMode=Zoom, BorderStyle=FixedSingle)
- [ ] ปุ่ม "โหลดรูป" (btnLoadImage)
- [ ] TextBox สำหรับชื่อ (txtName)
- [ ] DateTimePicker วันเกิด (dtpBirthday, MaxDate=Today)
- [ ] Label แสดงอายุ (lblAge)
- [ ] NumericUpDown ส่วนสูง (nudHeight, Min=100, Max=250, Value=170)
- [ ] NumericUpDown น้ำหนัก (nudWeight, Min=20, Max=300, Value=60)
- [ ] Label แสดง BMI (lblBMI)
- [ ] RichTextBox ประวัติ (rtbBio)
- [ ] LinkLabel เว็บไซต์ และ อีเมล
- [ ] ปุ่ม Bold, Italic, Underline, Save, Clear

### ขั้นตอนที่ 2: การเขียนโค้ดหลังบ้าน (Code-Behind)
- [ ] `Form_Load`: ตั้งค่า Default ทั้งหมด
- [ ] `dtpBirthday_ValueChanged`: คำนวณอายุอัตโนมัติ
- [ ] `nudHeight/Weight_ValueChanged`: คำนวณ BMI อัตโนมัติ
- [ ] `btnLoadImage_Click`: OpenFileDialog โหลดรูป
- [ ] ปุ่ม B/I/U: จัดรูปแบบข้อความใน RichTextBox
- [ ] `btnSave_Click`: แสดงสรุปข้อมูลทั้งหมด

::: code-group
```csharp [Form1.cs - โค้ดสมบูรณ์]
using System;
using System.Drawing;
using System.Windows.Forms;

namespace PersonalProfile
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            dtpBirthday.MaxDate = DateTime.Today;
            dtpBirthday.Value = DateTime.Today.AddYears(-20);
            CalculateAge();
            CalculateBMI();
        }

        private void CalculateAge()
        {
            DateTime today = DateTime.Today;
            DateTime birth = dtpBirthday.Value;
            int age = today.Year - birth.Year;
            if (birth.Date > today.AddYears(-age)) age--;
            lblAge.Text = $"อายุ: {age} ปี";
        }

        private void CalculateBMI()
        {
            double height = (double)nudHeight.Value / 100.0;
            double weight = (double)nudWeight.Value;
            double bmi = weight / (height * height);

            string status = bmi < 18.5 ? "น้อยเกินไป" :
                           bmi < 25 ? "ปกติ ✅" :
                           bmi < 30 ? "เกิน" : "อ้วน ⚠️";

            lblBMI.Text = $"BMI: {bmi:F1} ({status})";
        }

        private void dtpBirthday_ValueChanged(object sender, EventArgs e)
        {
            CalculateAge();
        }

        private void nudHeight_ValueChanged(object sender, EventArgs e)
        {
            CalculateBMI();
        }

        private void nudWeight_ValueChanged(object sender, EventArgs e)
        {
            CalculateBMI();
        }

        private void btnLoadImage_Click(object sender, EventArgs e)
        {
            using (OpenFileDialog ofd = new OpenFileDialog())
            {
                ofd.Filter = "Image Files|*.jpg;*.jpeg;*.png;*.bmp;*.gif";
                ofd.Title = "เลือกรูปโปรไฟล์";
                if (ofd.ShowDialog() == DialogResult.OK)
                {
                    pbProfile.Image = Image.FromFile(ofd.FileName);
                }
            }
        }

        private void ApplyStyle(FontStyle style)
        {
            if (rtbBio.SelectionLength == 0) return;
            Font cf = rtbBio.SelectionFont;
            bool hasStyle = (cf.Style & style) != 0;
            FontStyle newStyle = hasStyle ? cf.Style & ~style : cf.Style | style;
            rtbBio.SelectionFont = new Font(cf, newStyle);
        }

        private void btnBold_Click(object sender, EventArgs e) => ApplyStyle(FontStyle.Bold);
        private void btnItalic_Click(object sender, EventArgs e) => ApplyStyle(FontStyle.Italic);
        private void btnUnderline_Click(object sender, EventArgs e) => ApplyStyle(FontStyle.Underline);

        private void btnSave_Click(object sender, EventArgs e)
        {
            if (string.IsNullOrWhiteSpace(txtName.Text))
            {
                MessageBox.Show("กรุณากรอกชื่อ!", "แจ้งเตือน", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                txtName.Focus();
                return;
            }

            MessageBox.Show(
                $"บันทึกโปรไฟล์ของ {txtName.Text} สำเร็จ!\n" +
                $"{lblAge.Text} | {lblBMI.Text}",
                "สำเร็จ", MessageBoxButtons.OK, MessageBoxIcon.Information);
        }

        private void lnkEmail_LinkClicked(object sender, LinkLabelLinkClickedEventArgs e)
        {
            lnkEmail.LinkVisited = true;
            System.Diagnostics.Process.Start(new System.Diagnostics.ProcessStartInfo
            {
                FileName = "mailto:example@email.com",
                UseShellExecute = true
            });
        }
    }
}
```
:::

---

## 🔥 Challenge (โจทย์ท้าทาย!)

**โจทย์:** เพิ่มฟีเจอร์ **Export โปรไฟล์เป็น Text** โดยปุ่ม "ส่งออก" จะบันทึกข้อมูลทั้งหมดลงไฟล์ `.txt` ด้วย `System.IO.File.WriteAllText()` และแสดงข้อความยืนยันพร้อม path ที่บันทึก
