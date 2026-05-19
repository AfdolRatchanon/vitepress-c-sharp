# 01 - RadioButton & CheckBox

> 💡 **เป้าหมาย:** เรียนรู้การใช้ RadioButton เพื่อให้ผู้ใช้เลือกได้เพียง 1 ตัวเลือกจากกลุ่ม และ CheckBox เพื่อเลือกหลายตัวเลือกพร้อมกัน ซึ่งเป็นหัวใจของฟอร์มสมัครสมาชิกและหน้าตั้งค่าทุกประเภท

## 📖 ทฤษฎีและแนวคิด UI (UI Concept & Theory)

### RadioButton — เลือกได้เพียงอย่างเดียว
RadioButton ใช้เมื่อต้องการให้ผู้ใช้ **เลือกได้เพียง 1 ตัวเลือกเท่านั้น** จากกลุ่มที่กำหนด เหมือนปุ่มเลือกสถานีวิทยุในรถยนต์ยุคเก่า ที่เมื่อกดอันหนึ่ง อันเดิมจะดีดออกเอง

**กฎสำคัญ:** RadioButton ที่อยู่บน Container เดียวกัน (เช่น Form, Panel, GroupBox) จะทำงานร่วมกันเป็นกลุ่ม คือ เลือกอันหนึ่งแล้วอีกอันจะถูกยกเลิกอัตโนมัติ ถ้าต้องการกลุ่มที่แยกจากกัน ต้องใช้ Panel หรือ GroupBox แยก

### CheckBox — เลือกได้หลายอย่าง
CheckBox ใช้เมื่อต้องการให้ผู้ใช้ **เลือกได้หลายตัวเลือกพร้อมกัน** เหมือนการติ๊กถูกในแบบฟอร์มบนกระดาษ

```text
[ตัวอย่าง Form: แบบสอบถามความสนใจ]
+-----------------------------------------------+
| 🗔 แบบสอบถามความสนใจ                  _ □ X |
+-----------------------------------------------+
|                                               |
|  ┌─── เพศ ─────────────────────────────┐     |
|  │  (●) ชาย      ( ) หญิง             │     |
|  └─────────────────────────────────────┘     |
|                                               |
|  ┌─── ความสนใจ (เลือกได้หลาย) ──────────┐   |
|  │  [✓] กีฬา    [✓] ดนตรี             │   |
|  │  [ ] ศิลปะ   [✓] เทคโนโลยี         │   |
|  └─────────────────────────────────────┘     |
|                                               |
|   ผลลัพธ์: [ lblResult               ]       |
|              [ btnSubmit ]                    |
|                                               |
+-----------------------------------------------+
```

### 🔑 Properties ที่สำคัญ

**RadioButton:**
| Property | การทำงาน | ค่าแนะนำ |
| :--- | :--- | :--- |
| `Text` | ข้อความข้างๆ ปุ่ม | `"ชาย"` |
| `Checked` | สถานะว่าถูกเลือกหรือเปล่า | `true` (ค่าเริ่มต้น) |
| `CheckedChanged` | Event เมื่อสถานะเปลี่ยน | - |

**CheckBox:**
| Property | การทำงาน | ค่าแนะนำ |
| :--- | :--- | :--- |
| `Text` | ข้อความข้างๆ กล่อง | `"กีฬา"` |
| `Checked` | สถานะว่าติ๊กอยู่หรือเปล่า | `false` |
| `CheckState` | สถานะ 3 แบบ: Checked, Unchecked, Indeterminate | `Unchecked` |
| `ThreeState` | เปิดใช้งานสถานะ Indeterminate (ไม่แน่ใจ) | `false` |

---

## 🛠️ การตั้งค่า Properties (UI Setup)

| Control | Property | ค่าที่ตั้ง |
| :--- | :--- | :--- |
| `Form1` | `Text` | `"แบบสอบถามความสนใจ"` |
| `GroupBox` (เพศ) | `Text` | `"เพศ"` |
| `GroupBox` (เพศ) | `Name` | `grpGender` |
| `RadioButton` (ชาย) | `Name` | `rdoMale` |
| `RadioButton` (ชาย) | `Text` | `"ชาย"` |
| `RadioButton` (ชาย) | `Checked` | `true` |
| `RadioButton` (หญิง) | `Name` | `rdoFemale` |
| `RadioButton` (หญิง) | `Text` | `"หญิง"` |
| `GroupBox` (ความสนใจ) | `Text` | `"ความสนใจ (เลือกได้หลายอย่าง)"` |
| `CheckBox` (กีฬา) | `Name` | `chkSports` |
| `CheckBox` (กีฬา) | `Text` | `"กีฬา"` |
| `CheckBox` (ดนตรี) | `Name` | `chkMusic` |
| `CheckBox` (ดนตรี) | `Text` | `"ดนตรี"` |
| `CheckBox` (ศิลปะ) | `Name` | `chkArt` |
| `CheckBox` (ศิลปะ) | `Text` | `"ศิลปะ"` |
| `CheckBox` (เทค) | `Name` | `chkTech` |
| `CheckBox` (เทค) | `Text` | `"เทคโนโลยี"` |
| `Label` | `Name` | `lblResult` |
| `Button` | `Name` | `btnSubmit` |
| `Button` | `Text` | `"ส่งแบบสอบถาม"` |

---

## 💻 ตัวอย่างโค้ด (Code Implementation)

ดับเบิลคลิกที่ปุ่ม `btnSubmit` บนหน้า Design:

::: code-group
```csharp [Form1.cs]
using System;
using System.Windows.Forms;

namespace SurveyForm
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void btnSubmit_Click(object sender, EventArgs e)
        {
            // [1] อ่านค่าจาก RadioButton ด้วย Property .Checked
            string gender = rdoMale.Checked ? "ชาย" : "หญิง";

            // [2] รวบรวมความสนใจที่ถูกติ๊ก
            // ใช้ List เก็บรายการที่เลือก
            var interests = new System.Collections.Generic.List<string>();

            if (chkSports.Checked) interests.Add("กีฬา");
            if (chkMusic.Checked)  interests.Add("ดนตรี");
            if (chkArt.Checked)    interests.Add("ศิลปะ");
            if (chkTech.Checked)   interests.Add("เทคโนโลยี");

            // [3] ตรวจสอบว่าเลือกอย่างน้อย 1 ความสนใจ
            if (interests.Count == 0)
            {
                MessageBox.Show("กรุณาเลือกความสนใจอย่างน้อย 1 อย่าง!", "แจ้งเตือน",
                    MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            // [4] สรุปผลและแสดง
            string interestList = string.Join(", ", interests);
            lblResult.Text = $"เพศ: {gender} | ความสนใจ: {interestList}";
        }
    }
}
```
:::

**Expected Output:**
```text
เลือก: ชาย, ติ๊ก: กีฬา, เทคโนโลยี
→ lblResult: "เพศ: ชาย | ความสนใจ: กีฬา, เทคโนโลยี"

ไม่ติ๊กอะไรเลย → MessageBox: "กรุณาเลือกความสนใจอย่างน้อย 1 อย่าง!"
```

---

## 🚀 เทคนิคขั้นสูง: Event CheckedChanged

```csharp
// ใช้ Event CheckedChanged ของ CheckBox เพื่อทำ Logic แบบ Realtime
// เช่น: เมื่อติ๊ก "ทำงาน" ให้ช่องกรอกชื่อบริษัทปรากฏขึ้น
private void chkWorking_CheckedChanged(object sender, EventArgs e)
{
    // ซ่อน/แสดง Control ตาม Checkbox
    txtCompanyName.Enabled = chkWorking.Checked;
    lblCompanyName.Enabled = chkWorking.Checked;

    if (!chkWorking.Checked)
        txtCompanyName.Clear(); // ล้างข้อมูลเมื่อยกเลิกการติ๊ก
}
```

---

## 🎯 โจทย์ฝึกปฏิบัติเสริมความเข้าใจ (Mini Exercise)

**โจทย์ที่ 1: ตัวเลือกขนาดเสื้อ**
สร้างฟอร์มที่มี RadioButton 4 ปุ่ม (S, M, L, XL) และปุ่ม "เพิ่มลงตะกร้า"
เมื่อกดปุ่ม ให้แสดง MessageBox ว่า "เพิ่มเสื้อขนาด XL ลงตะกร้าแล้ว!"

**โจทย์ที่ 2: คำนวณราคาอาหาร**
สร้างฟอร์มเมนูอาหาร:
- CheckBox: "เพิ่มชีส (+20 บาท)", "เพิ่มเบคอน (+30 บาท)", "ไม่เผ็ด"
- Label แสดงราคาที่อัพเดตทันทีเมื่อติ๊ก (ใช้ Event `CheckedChanged`)

::: details 💡 คำใบ้ (Hint)
ใช้ Event `CheckedChanged` บน CheckBox แต่ละอัน และเขียนเมธอดแสดงราคาแยก แล้วเรียกใช้จากทุก Event
:::

---

## 🔥 Challenge (โจทย์ท้าทาย!)

**โจทย์: ระบบสั่งพิซซ่า**
สร้างโปรแกรมสั่งพิซซ่าที่มี:
- RadioButton สำหรับขนาด (S=150, M=250, L=350 บาท)
- CheckBox สำหรับ Topping เพิ่มเติม (ชีสเพิ่ม +30, เห็ด +20, ไส้กรอก +40)
- Label แสดงราคาสุทธิแบบ Realtime

---

## 🗣️ ทบทวน (Review)

::: details ❓ คำถามทบทวน 1:
**คำถาม:** เหตุใด RadioButton ที่อยู่ใน GroupBox เดียวกันจึงเลือกได้ทีละอันเท่านั้น?

**แนวคำตอบ:** Windows Forms จัดการ RadioButton ที่อยู่ใน Container เดียวกันให้เป็น "กลุ่ม" โดยอัตโนมัติ เมื่อ Checked ของ RadioButton ใด=true ระบบจะ Set Checked ของ RadioButton อื่นในกลุ่มเดิมให้=false ทันที
:::

::: details ❓ คำถามทบทวน 2:
**คำถาม:** `string.Join(", ", interests)` ทำงานอย่างไร?

**แนวคำตอบ:** `string.Join()` รับ separator (ตัวคั่น) และ collection (เช่น List) แล้วนำสมาชิกทุกตัวมาต่อกันด้วย separator นั้น ผลลัพธ์จะเป็น `"กีฬา, ดนตรี"` แทนที่จะต้องวนลูปต่อ string เอง
:::
