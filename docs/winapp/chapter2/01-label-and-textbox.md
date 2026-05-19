# 01 - Label & TextBox: รับและแสดงข้อมูล

> 💡 **เป้าหมาย:** เรียนรู้การใช้ Label เพื่อแสดงข้อความ และ TextBox เพื่อรับข้อมูลจากผู้ใช้อย่างละเอียด พร้อมเจาะลึก Properties ที่สำคัญ เช่น PlaceholderText, PasswordChar, MaxLength รวมถึงการใช้ Event `TextChanged` และ `KeyPress`

## 📖 ทฤษฎีและแนวคิด UI (UI Concept & Theory)

ใน Windows Forms การแสดงผลและรับข้อมูลเป็นสิ่งที่เกิดขึ้นควบคู่กันเสมอ โดยมี 2 Control หลักที่ทำหน้าที่นี้:

- **Label** คือ Control แสดงข้อความที่ **ผู้ใช้ไม่สามารถแก้ไขได้** เหมาะสำหรับป้ายกำกับช่องกรอก หรือแสดงผลลัพธ์
- **TextBox** คือกล่องข้อความที่ **ผู้ใช้สามารถพิมพ์ข้อมูลลงไปได้** เป็น Control ที่ใช้บ่อยที่สุดในการสร้างฟอร์ม

```text
[ตัวอย่าง Form: ระบบล็อกอิน]
+-------------------------------------------+
| 🗔 ระบบจัดการนักเรียน              _ □ X |
+-------------------------------------------+
|                                           |
|   ชื่อผู้ใช้:  [  txtUsername        ]   |
|                                           |
|   รหัสผ่าน:    [  txtPassword ••••• ]   |
|                                           |
|   ผลลัพธ์:     [ lblResult          ]   |
|                                           |
|              [ btnLogin ]                 |
|                                           |
+-------------------------------------------+
```

### 🔑 TextBox Properties ที่ต้องรู้

| Property | การทำงาน | ตัวอย่างค่า |
| :--- | :--- | :--- |
| `Text` | ข้อความที่อยู่ใน TextBox (ดึงข้อมูลด้วย `.Text`) | `""` |
| `PlaceholderText` | ข้อความสีเทาแสดงตอนช่องว่าง | `"กรุณากรอกชื่อ..."` |
| `PasswordChar` | ซ่อนข้อความเป็นสัญลักษณ์ | `'*'` |
| `MaxLength` | จำนวนอักขระสูงสุดที่พิมพ์ได้ | `50` |
| `Multiline` | อนุญาตให้พิมพ์หลายบรรทัด | `true` |
| `ReadOnly` | ผู้ใช้ไม่สามารถแก้ไขได้ | `true` |
| `CharacterCasing` | บังคับพิมพ์ใหญ่/เล็ก | `Upper` |

---

## 🛠️ การตั้งค่า Properties (UI Setup)

| Control | Property | ค่าที่ตั้ง |
| :--- | :--- | :--- |
| `Form1` | `Text` | `"ระบบจัดการข้อมูลนักเรียน v1.0"` |
| `Form1` | `StartPosition` | `CenterScreen` |
| `Label` (ชื่อ) | `Name` | `lblUsernameText` |
| `Label` (ชื่อ) | `Text` | `"ชื่อผู้ใช้:"` |
| `TextBox` (ชื่อ) | `Name` | `txtUsername` |
| `TextBox` (ชื่อ) | `PlaceholderText` | `"กรุณากรอกชื่อผู้ใช้..."` |
| `TextBox` (ชื่อ) | `MaxLength` | `30` |
| `Label` (รหัส) | `Name` | `lblPasswordText` |
| `Label` (รหัส) | `Text` | `"รหัสผ่าน:"` |
| `TextBox` (รหัส) | `Name` | `txtPassword` |
| `TextBox` (รหัส) | `PasswordChar` | `*` |
| `TextBox` (รหัส) | `MaxLength` | `20` |
| `Label` (ผล) | `Name` | `lblResult` |
| `Label` (ผล) | `Text` | `""` |
| `Button` | `Name` | `btnLogin` |
| `Button` | `Text` | `"เข้าสู่ระบบ"` |
| `Button` | `Cursor` | `Hand` |

---

## 💻 ตัวอย่างโค้ด (Code Implementation)

ดับเบิลคลิกที่ปุ่ม `btnLogin` บนหน้า Design เพื่อสร้าง Event Handler:

::: code-group
```csharp [Form1.cs]
using System;
using System.Windows.Forms;

namespace LoginApp
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void btnLogin_Click(object sender, EventArgs e)
        {
            // [1] ดึงข้อมูลจาก TextBox ออกมาเก็บในตัวแปร
            string username = txtUsername.Text;
            string password = txtPassword.Text;

            // [2] ตรวจสอบว่าผู้ใช้กรอกข้อมูลหรือเปล่า
            // .Trim() ตัดช่องว่างหัวท้ายออก
            if (string.IsNullOrWhiteSpace(username))
            {
                lblResult.Text = "❌ กรุณากรอกชื่อผู้ใช้!";
                lblResult.ForeColor = System.Drawing.Color.Red;
                txtUsername.Focus(); // ย้าย Cursor ไปที่ช่องที่ว่าง
                return;
            }

            if (string.IsNullOrWhiteSpace(password))
            {
                lblResult.Text = "❌ กรุณากรอกรหัสผ่าน!";
                lblResult.ForeColor = System.Drawing.Color.Red;
                txtPassword.Focus();
                return;
            }

            // [3] ตรวจสอบข้อมูล Login
            if (username == "admin" && password == "1234")
            {
                lblResult.Text = $"✅ ยินดีต้อนรับ คุณ {username}!";
                lblResult.ForeColor = System.Drawing.Color.DarkGreen;
                txtPassword.Clear();
            }
            else
            {
                lblResult.Text = "❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
                lblResult.ForeColor = System.Drawing.Color.Red;
                txtPassword.Clear();
                txtPassword.Focus();
            }
        }
    }
}
```
:::

**Expected Output:**
```text
กรณีที่ 1: ไม่กรอกชื่อผู้ใช้ → lblResult แสดง "❌ กรุณากรอกชื่อผู้ใช้!"
กรณีที่ 2: admin/1234 → lblResult แสดง "✅ ยินดีต้อนรับ คุณ admin!"
กรณีที่ 3: รหัสผ่านผิด → lblResult แสดง "❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง"
```

---

## 🚀 เทคนิคขั้นสูง: Event KeyPress

```csharp
// Event KeyPress: กรองให้ TextBox รับเฉพาะตัวเลข
private void txtAge_KeyPress(object sender, KeyPressEventArgs e)
{
    // char.IsDigit() = เช็คว่าเป็นตัวเลขหรือเปล่า
    // (char)8 = ปุ่ม Backspace ต้องอนุญาตไว้เสมอ
    if (!char.IsDigit(e.KeyChar) && e.KeyChar != (char)8)
    {
        e.Handled = true; // ไม่แสดงอักขระนั้น
    }
}

// Event TextChanged: นับจำนวนอักขระแบบ Realtime
private void txtMessage_TextChanged(object sender, EventArgs e)
{
    int count = txtMessage.Text.Length;
    lblCount.Text = $"จำนวน: {count}/200 อักขระ";

    if (count > 150)
        lblCount.ForeColor = System.Drawing.Color.Red;
    else
        lblCount.ForeColor = System.Drawing.Color.DarkGray;
}
```

---

## 🎯 โจทย์ฝึกปฏิบัติเสริมความเข้าใจ (Mini Exercise)

**โจทย์ที่ 1: โปรแกรมแปลงตัวพิมพ์**
สร้างฟอร์มที่มี TextBox 1 ช่อง (ชื่อ `txtName`) และปุ่ม 3 ปุ่ม:
- ปุ่ม `btnUpper`: แปลงข้อความเป็นตัวพิมพ์ใหญ่ทั้งหมด แสดงผลใน Label
- ปุ่ม `btnLower`: แปลงเป็นตัวพิมพ์เล็กทั้งหมด
- ปุ่ม `btnClear`: ล้างข้อมูล TextBox และ Label

**โจทย์ที่ 2: นับจำนวนอักขระแบบ Realtime**
1. สร้าง TextBox ขนาดใหญ่ (ตั้ง `Multiline = true`, `MaxLength = 200`)
2. สร้าง Label แสดงจำนวนอักขระที่พิมพ์
3. เชื่อม Event `TextChanged` อัพเดต Label แบบ Realtime
4. เมื่อพิมพ์เกิน 150 อักขระ ให้ Label แสดงสีแดง

::: details 💡 คำใบ้ (Hint)
ใช้ `.Text.ToUpper()`, `.Text.ToLower()` และ `.Clear()` สำหรับโจทย์ 1
ใช้ Event `TextChanged` และ `txtInput.Text.Length` สำหรับโจทย์ 2
:::

---

## 🔥 Challenge (โจทย์ท้าทาย!)

**โจทย์: Password Strength Checker**
สร้างโปรแกรมที่มี TextBox สำหรับพิมพ์รหัสผ่าน (ตั้ง `PasswordChar`) และ Label แสดงระดับความแข็งแกร่งแบบ Realtime:
- **อ่อน (Weak):** ยาวน้อยกว่า 6 ตัว → สีแดง
- **ปานกลาง (Medium):** 6-11 ตัว → สีส้ม
- **แข็งแกร่ง (Strong):** 12 ตัวขึ้นไป + มีตัวเลขด้วย → สีเขียว

*(ห้ามดูโค้ดด้านบน ให้ใช้ `string.Length` และ `if-else if-else` เขียนเองจากความเข้าใจ)*

---

## 🗣️ ทบทวน (Review)

::: details ❓ คำถามทบทวน 1:
**คำถาม:** ทำไมต้องใช้ `string.IsNullOrWhiteSpace()` แทนการเช็คแบบ `txtUsername.Text == ""`?

**แนวคำตอบ:** เพราะ `== ""` ไม่สามารถตรวจจับกรณีที่ผู้ใช้กดแค่ Spacebar ได้ `IsNullOrWhiteSpace()` ตรวจสอบทั้ง `null`, `""` และ `"   "` (มีแต่ช่องว่าง) ทำให้แอปพลิเคชันของเรา Robust มากขึ้น
:::

::: details ❓ คำถามทบทวน 2:
**คำถาม:** `txtPassword.Focus()` ทำงานอย่างไร และเหตุใดจึงควรใส่ไว้หลังการแสดง Error?

**แนวคำตอบ:** `Focus()` ย้าย Cursor ไปยัง Control นั้นๆ ทันที การใส่ไว้หลัง Error Message ช่วยให้ผู้ใช้ไม่ต้องคลิกเองเพื่อพิมพ์ใหม่ ซึ่งช่วยปรับปรุง User Experience (UX) ได้มาก
:::
