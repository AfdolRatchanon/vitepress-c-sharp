# 💻 Lab: สร้างโปรแกรมคำนวณ BMI

> 💡 **เป้าหมาย:** สังเคราะห์ความรู้จากบทที่ 2 ทั้งหมด ได้แก่ Label, TextBox, Button และ Input Validation มาสร้าง Windows Application ที่ใช้งานได้จริง — โปรแกรมคำนวณดัชนีมวลกาย (Body Mass Index)

## 📖 ภาพรวมของโปรแกรม (Program Overview)

โปรแกรมจะรับน้ำหนัก (กก.) และส่วนสูง (ซม.) จากผู้ใช้ คำนวณค่า BMI แล้วแสดงผลพร้อมคำแนะนำสุขภาพ

```text
[Wireframe: BMI Calculator]
+-----------------------------------------------+
| 🗔 โปรแกรมคำนวณ BMI                   _ □ X |
+-----------------------------------------------+
|                                               |
|   ╔═══════════════════════════════════╗       |
|   ║      กรอกข้อมูลของคุณ           ║       |
|   ╠═══════════════════════════════════╣       |
|   ║  น้ำหนัก (กก.):  [ txtWeight  ] ║       |
|   ║  ส่วนสูง (ซม.):  [ txtHeight  ] ║       |
|   ╚═══════════════════════════════════╝       |
|                                               |
|   ┌─────────────────────────────────┐         |
|   │   ผลลัพธ์: [lblBmiValue]       │         |
|   │   สถานะ:   [lblStatus  ]       │         |
|   └─────────────────────────────────┘         |
|                                               |
|      [ btnCalculate ]  [ btnReset ]           |
|                                               |
+-----------------------------------------------+
```

## ⏱️ เวลาที่ใช้: 60 นาที

## 📝 ขั้นตอนการทำงาน (Step-by-Step)

### ขั้นตอนที่ 1: การออกแบบหน้าจอ (UI Design)

- [ ] สร้างโปรเจกต์ Windows Forms ใหม่ ชื่อ `BMICalculator`
- [ ] ตั้งค่า Form: `Text = "โปรแกรมคำนวณ BMI"`, `Size = 480, 380`, `StartPosition = CenterScreen`
- [ ] ลาก Label 2 อัน สำหรับ "น้ำหนัก (กก.):" และ "ส่วนสูง (ซม.):" ตั้งชื่อ `lblWeightText`, `lblHeightText`
- [ ] ลาก TextBox 2 อัน ตั้งชื่อ `txtWeight` และ `txtHeight`, ตั้ง `PlaceholderText` ให้เหมาะสม
- [ ] ลาก Label 2 อันสำหรับแสดงผล ตั้งชื่อ `lblBmiValue` (Text: "-") และ `lblStatus` (Text: "")
- [ ] ลาก Button 2 ปุ่ม: `btnCalculate` (Text: "คำนวณ BMI") และ `btnReset` (Text: "เริ่มใหม่")
- [ ] ตกแต่ง Button ให้ดูสวยงาม: `BackColor`, `ForeColor`, `FlatStyle = Flat`, `Cursor = Hand`

### ขั้นตอนที่ 2: การเขียนโค้ดหลังบ้าน (Code-Behind)

- [ ] ดับเบิลคลิก `btnCalculate` เพื่อสร้าง Event
- [ ] เขียน Validation: ตรวจสอบว่าทั้งสองช่องไม่ว่าง
- [ ] ใช้ `double.TryParse()` แปลงค่าจาก TextBox
- [ ] ตรวจสอบว่าน้ำหนัก > 0 และส่วนสูง > 0
- [ ] คำนวณ BMI ด้วยสูตร: `BMI = น้ำหนัก(กก.) / (ส่วนสูง(เมตร))²`
- [ ] ดับเบิลคลิก `btnReset` และเขียนโค้ดล้างหน้าจอ

::: code-group
```csharp [Form1.cs - โค้ดสมบูรณ์]
using System;
using System.Windows.Forms;

namespace BMICalculator
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
            // กด Enter = กดปุ่มคำนวณ
            this.AcceptButton = btnCalculate;
        }

        private void btnCalculate_Click(object sender, EventArgs e)
        {
            // --- VALIDATION BLOCK ---
            if (string.IsNullOrWhiteSpace(txtWeight.Text))
            {
                MessageBox.Show("กรุณากรอกน้ำหนัก!", "ข้อมูลไม่ครบ",
                    MessageBoxButtons.OK, MessageBoxIcon.Warning);
                txtWeight.Focus();
                return;
            }

            if (string.IsNullOrWhiteSpace(txtHeight.Text))
            {
                MessageBox.Show("กรุณากรอกส่วนสูง!", "ข้อมูลไม่ครบ",
                    MessageBoxButtons.OK, MessageBoxIcon.Warning);
                txtHeight.Focus();
                return;
            }

            if (!double.TryParse(txtWeight.Text, out double weight))
            {
                MessageBox.Show("น้ำหนักต้องเป็นตัวเลขเท่านั้น!", "ข้อผิดพลาด",
                    MessageBoxButtons.OK, MessageBoxIcon.Error);
                txtWeight.SelectAll();
                txtWeight.Focus();
                return;
            }

            if (!double.TryParse(txtHeight.Text, out double height))
            {
                MessageBox.Show("ส่วนสูงต้องเป็นตัวเลขเท่านั้น!", "ข้อผิดพลาด",
                    MessageBoxButtons.OK, MessageBoxIcon.Error);
                txtHeight.SelectAll();
                txtHeight.Focus();
                return;
            }

            if (weight <= 0 || weight > 300)
            {
                MessageBox.Show("น้ำหนักต้องอยู่ระหว่าง 1-300 กก.", "ข้อผิดพลาด",
                    MessageBoxButtons.OK, MessageBoxIcon.Error);
                return;
            }

            if (height <= 0 || height > 250)
            {
                MessageBox.Show("ส่วนสูงต้องอยู่ระหว่าง 1-250 ซม.", "ข้อผิดพลาด",
                    MessageBoxButtons.OK, MessageBoxIcon.Error);
                return;
            }

            // --- CALCULATION ---
            // แปลงส่วนสูงจากซม. เป็นเมตร
            double heightInMeter = height / 100.0;
            double bmi = weight / (heightInMeter * heightInMeter);

            // แสดงค่า BMI ทศนิยม 2 ตำแหน่ง
            lblBmiValue.Text = $"BMI = {bmi:F2}";

            // --- CLASSIFICATION ---
            string status;
            System.Drawing.Color statusColor;

            if (bmi < 18.5)
            {
                status = "⚠️ น้ำหนักน้อยเกินไป (Underweight)";
                statusColor = System.Drawing.Color.DodgerBlue;
            }
            else if (bmi < 25.0)
            {
                status = "✅ น้ำหนักปกติ (Normal)";
                statusColor = System.Drawing.Color.DarkGreen;
            }
            else if (bmi < 30.0)
            {
                status = "⚠️ น้ำหนักเกิน (Overweight)";
                statusColor = System.Drawing.Color.Orange;
            }
            else
            {
                status = "🚨 อ้วน (Obese) — ควรปรึกษาแพทย์";
                statusColor = System.Drawing.Color.Red;
            }

            lblStatus.Text = status;
            lblStatus.ForeColor = statusColor;
        }

        private void btnReset_Click(object sender, EventArgs e)
        {
            txtWeight.Clear();
            txtHeight.Clear();
            lblBmiValue.Text = "-";
            lblStatus.Text = "";
            lblStatus.ForeColor = System.Drawing.Color.Black;
            txtWeight.Focus();
        }
    }
}
```
:::

**Expected Output:**
```text
น้ำหนัก 70 กก. + ส่วนสูง 175 ซม. → BMI = 22.86 → ✅ น้ำหนักปกติ (Normal)
น้ำหนัก 90 กก. + ส่วนสูง 170 ซม. → BMI = 31.14 → 🚨 อ้วน (Obese)
น้ำหนัก 0 กก. → MessageBox: "น้ำหนักต้องอยู่ระหว่าง 1-300 กก."
```

---

## 🔥 Challenge (โจทย์ท้าทาย สำหรับคนที่ทำเสร็จก่อนเวลา!)

**โจทย์ที่ 1:** เพิ่ม ComboBox ให้ผู้ใช้เลือกเพศ (ชาย/หญิง) และแสดงคำแนะนำสุขภาพที่ต่างกันสำหรับแต่ละเพศ

**โจทย์ที่ 2:** เพิ่มฟีเจอร์รับน้ำหนักเป็นปอนด์ (Pounds) ด้วย CheckBox ที่ชื่อ "ป้อนน้ำหนักเป็นปอนด์" เมื่อติ๊กแล้ว ระบบจะแปลงปอนด์เป็น กก. ก่อนคำนวณ (1 ปอนด์ = 0.453592 กก.)
