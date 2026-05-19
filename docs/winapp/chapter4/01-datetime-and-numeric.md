# 01 - DateTimePicker & NumericUpDown

> 💡 **เป้าหมาย:** เรียนรู้การใช้ DateTimePicker เพื่อรับวันที่จากผู้ใช้อย่างถูกต้อง (ป้องกันการพิมพ์วันที่ผิดรูปแบบ) และ NumericUpDown เพื่อรับตัวเลขในช่วงที่กำหนดอย่างปลอดภัย พร้อมการจัดรูปแบบการแสดงผลวันที่แบบต่างๆ

## 📖 ทฤษฎีและแนวคิด UI (UI Concept & Theory)

### DateTimePicker — รับวันที่อย่างมืออาชีพ
เมื่อต้องการให้ผู้ใช้กรอกวันที่ การใช้ TextBox แล้วให้พิมพ์เองจะเกิดปัญหามากมาย เช่น พิมพ์ "32/13/2025" หรือ "มกราคม 1" ซึ่งไม่สามารถแปลงเป็น Date ได้ **DateTimePicker** แก้ปัญหานี้ได้ทั้งหมด โดยผู้ใช้จะต้องเลือกผ่าน Calendar UI เท่านั้น

### NumericUpDown — รับตัวเลขในช่วงที่ปลอดภัย
เมื่อต้องการรับตัวเลขที่มีช่วงจำกัด เช่น จำนวนสินค้า (1-100) หรืออายุ (1-120) การใช้ NumericUpDown จะป้องกันผู้ใช้พิมพ์ตัวอักษรหรือตัวเลขนอกช่วงได้อัตโนมัติ

```text
[ตัวอย่าง Form: ระบบจองโรงแรม]
+-----------------------------------------------+
| 🗔 ระบบจองโรงแรม                      _ □ X |
+-----------------------------------------------+
|                                               |
|  วันที่เช็คอิน:   [📅 DateTimePicker  ]       |
|  วันที่เช็คเอาท์: [📅 DateTimePicker  ]       |
|                                               |
|  จำนวนห้อง:   [▲ 1 ▼]  (NumericUpDown)       |
|  จำนวนผู้เข้าพัก: [▲ 2 ▼]                   |
|                                               |
|  สรุป: [lblSummary                    ]       |
|         [ btnBook ]    [ btnReset ]           |
|                                               |
+-----------------------------------------------+
```

### 🔑 DateTimePicker Properties ที่สำคัญ

| Property | การทำงาน | ค่าแนะนำ |
| :--- | :--- | :--- |
| `Value` | วันที่ที่ถูกเลือก (ประเภท `DateTime`) | `DateTime.Now` |
| `MinDate` | วันที่น้อยสุดที่เลือกได้ | `DateTime.Today` |
| `MaxDate` | วันที่มากสุดที่เลือกได้ | `DateTime.Today.AddYears(1)` |
| `Format` | รูปแบบการแสดงผล | `Short`, `Long`, `Time`, `Custom` |
| `CustomFormat` | รูปแบบ Custom เช่น "dd/MM/yyyy" | `"dd MMMM yyyy"` |
| `ShowUpDown` | แสดงแบบลูกศรขึ้น-ลง แทน Dropdown | `false` |

### 🔑 NumericUpDown Properties ที่สำคัญ

| Property | การทำงาน | ค่าแนะนำ |
| :--- | :--- | :--- |
| `Value` | ค่าปัจจุบัน (ประเภท `decimal`) | `1` |
| `Minimum` | ค่าน้อยสุด | `1` |
| `Maximum` | ค่ามากสุด | `10` |
| `Increment` | ค่าที่เพิ่ม/ลดเมื่อกดลูกศร | `1` |
| `DecimalPlaces` | จำนวนทศนิยม | `0` |

---

## 🛠️ การตั้งค่า Properties (UI Setup)

| Control | Property | ค่าที่ตั้ง |
| :--- | :--- | :--- |
| `Form1` | `Text` | `"ระบบจองโรงแรม"` |
| `Form1` | `StartPosition` | `CenterScreen` |
| `DateTimePicker` (เช็คอิน) | `Name` | `dtpCheckIn` |
| `DateTimePicker` (เช็คอิน) | `Format` | `Custom` |
| `DateTimePicker` (เช็คอิน) | `CustomFormat` | `"dd MMMM yyyy"` |
| `DateTimePicker` (เช็คอิน) | `MinDate` | `DateTime.Today` (ตั้งในโค้ด) |
| `DateTimePicker` (เช็คเอาท์) | `Name` | `dtpCheckOut` |
| `DateTimePicker` (เช็คเอาท์) | `CustomFormat` | `"dd MMMM yyyy"` |
| `NumericUpDown` (ห้อง) | `Name` | `nudRooms` |
| `NumericUpDown` (ห้อง) | `Minimum` | `1` |
| `NumericUpDown` (ห้อง) | `Maximum` | `5` |
| `NumericUpDown` (ห้อง) | `Value` | `1` |
| `NumericUpDown` (ผู้เข้าพัก) | `Name` | `nudGuests` |
| `NumericUpDown` (ผู้เข้าพัก) | `Minimum` | `1` |
| `NumericUpDown` (ผู้เข้าพัก) | `Maximum` | `10` |
| `Label` | `Name` | `lblSummary` |
| `Button` | `Name` | `btnBook` |
| `Button` | `Text` | `"ยืนยันการจอง"` |

---

## 💻 ตัวอย่างโค้ด (Code Implementation)

ดับเบิลคลิกที่ Form เพื่อสร้าง `Form_Load` และดับเบิลคลิกปุ่ม `btnBook`:

::: code-group
```csharp [Form1.cs]
using System;
using System.Windows.Forms;

namespace HotelBooking
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            // [1] ตั้งค่า MinDate เพื่อป้องกันเลือกวันในอดีต
            dtpCheckIn.MinDate = DateTime.Today;
            dtpCheckOut.MinDate = DateTime.Today.AddDays(1);

            // [2] ตั้ง Default ให้ Check-out = Check-in + 1 วัน
            dtpCheckIn.Value = DateTime.Today;
            dtpCheckOut.Value = DateTime.Today.AddDays(1);
        }

        private void dtpCheckIn_ValueChanged(object sender, EventArgs e)
        {
            // [3] เมื่อเปลี่ยนวันเช็คอิน ให้บังคับ Check-out ต้องมากกว่า
            if (dtpCheckOut.Value <= dtpCheckIn.Value)
            {
                dtpCheckOut.Value = dtpCheckIn.Value.AddDays(1);
            }
            dtpCheckOut.MinDate = dtpCheckIn.Value.AddDays(1);
        }

        private void btnBook_Click(object sender, EventArgs e)
        {
            // [4] คำนวณจำนวนคืน
            TimeSpan duration = dtpCheckOut.Value - dtpCheckIn.Value;
            int nights = (int)duration.TotalDays;

            // [5] ดึงค่าจาก NumericUpDown ด้วย .Value
            int rooms = (int)nudRooms.Value;
            int guests = (int)nudGuests.Value;

            // [6] คำนวณราคา (สมมติห้องละ 1,200 บาท/คืน)
            decimal pricePerNight = 1200;
            decimal totalPrice = pricePerNight * rooms * nights;

            // [7] จัดรูปแบบวันที่เพื่อแสดงผล
            string checkIn = dtpCheckIn.Value.ToString("dd/MM/yyyy");
            string checkOut = dtpCheckOut.Value.ToString("dd/MM/yyyy");

            lblSummary.Text =
                $"เช็คอิน: {checkIn} | เช็คเอาท์: {checkOut}\n" +
                $"จำนวน: {nights} คืน | {rooms} ห้อง | {guests} ท่าน\n" +
                $"ราคารวม: {totalPrice:N0} บาท";

            MessageBox.Show($"จองสำเร็จ! ราคารวม {totalPrice:N0} บาท", "ยืนยันการจอง",
                MessageBoxButtons.OK, MessageBoxIcon.Information);
        }
    }
}
```
:::

**Expected Output:**
```text
เช็คอิน: 01/06/2025 | เช็คเอาท์: 03/06/2025
จำนวน: 2 คืน | 2 ห้อง | 3 ท่าน
ราคารวม: 4,800 บาท
```

---

## 🎯 โจทย์ฝึกปฏิบัติเสริมความเข้าใจ (Mini Exercise)

**โจทย์ที่ 1: คำนวณอายุ**
สร้างโปรแกรมที่มี DateTimePicker รับวันเกิด และปุ่มคำนวณอายุ โดยแสดงผลว่า "อายุ X ปี Y เดือน Z วัน"

**โจทย์ที่ 2: ตั้งเวลาปลุก**
สร้างโปรแกรมที่มี DateTimePicker แบบ `Format = Time` (แสดงแค่เวลา) และ NumericUpDown รับจำนวนนาทีที่ต้องการ Snooze แสดงเวลาปลุกครั้งต่อไปใน Label

::: details 💡 คำใบ้ (Hint)
ใช้ `DateTime.Today.Year - dtpBirthday.Value.Year` คำนวณอายุเบื้องต้น และ `dtpAlarm.Value.AddMinutes((double)nudSnooze.Value)` เพื่อเพิ่มเวลา
:::

---

## 🔥 Challenge (โจทย์ท้าทาย!)

**โจทย์: ระบบคำนวณเงินเดือนรายวัน**
สร้างโปรแกรมที่มี DateTimePicker 2 อัน (วันเริ่มทำงาน-วันสิ้นสุด) และ NumericUpDown สำหรับค่าแรงต่อวัน คำนวณเงินเดือนรวม โดยต้องตรวจสอบว่าวันสิ้นสุดต้องมากกว่าวันเริ่มต้น และแสดงผลว่าทำงานกี่วัน

---

## 🗣️ ทบทวน (Review)

::: details ❓ คำถามทบทวน 1:
**คำถาม:** เหตุใด DateTimePicker จึงดีกว่า TextBox ในการรับวันที่?

**แนวคำตอบ:** DateTimePicker บังคับให้ผู้ใช้เลือกวันที่จาก Calendar UI เท่านั้น ทำให้ข้อมูลที่ได้รับเป็นวันที่ที่ถูกต้องเสมอ ไม่มีปัญหาเรื่องรูปแบบวันที่ผิด (เช่น 32/13) และค่าที่อ่านได้เป็น `DateTime` object โดยตรง ไม่ต้อง Parse เพิ่มเติม
:::

::: details ❓ คำถามทบทวน 2:
**คำถาม:** ทำไม `nudRooms.Value` จึงมีประเภทเป็น `decimal` แทนที่จะเป็น `int`?

**แนวคำตอบ:** NumericUpDown รองรับทั้งตัวเลขจำนวนเต็มและทศนิยม จึงเก็บค่าเป็น `decimal` เพื่อรองรับกรณี `DecimalPlaces > 0` เมื่อต้องการใช้เป็น `int` ต้องแปลงด้วย `(int)nudRooms.Value`
:::
