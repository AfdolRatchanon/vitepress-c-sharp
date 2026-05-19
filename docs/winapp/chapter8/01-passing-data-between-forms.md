# 01 - การส่งข้อมูลระหว่างฟอร์ม

> 💡 **เป้าหมาย:** เรียนรู้เทคนิคการส่งข้อมูลระหว่างฟอร์ม 3 แบบ ได้แก่ ผ่าน Constructor, Property สาธารณะ และ Static Variable พร้อมทำความเข้าใจ Lifecycle ของฟอร์มและวิธีจัดการหน่วยความจำอย่างถูกต้อง

## 📖 ทฤษฎีและแนวคิด UI (UI Concept & Theory)

ในแอปพลิเคชันจริงมักมีหลายหน้าจอที่ต้องส่งข้อมูลหากัน เช่น หน้ารายการสินค้า → หน้าแก้ไขสินค้า มีเทคนิค 3 วิธีหลัก:

```text
[วิธีส่งข้อมูลระหว่างฟอร์ม]

วิธีที่ 1: ผ่าน Constructor
FormA                    FormB(data)
  |                          |
  |--ส่ง data ตอนสร้าง-->    |
  |                     รับ data ใน Constructor

วิธีที่ 2: ผ่าน Property สาธารณะ
FormA                    FormB
  |--สร้าง FormB          |
  |--formB.Data = x -->   |
  |--formB.ShowDialog()   |
  |<--อ่าน formB.Result-- |

วิธีที่ 3: Static (ไม่แนะนำสำหรับ OOP แต่ใช้บ่อยในชีวิตจริง)
static class AppState { public static string Username; }
ทุก Form อ่าน/เขียนได้โดยตรง
```

**Best Practice:** วิธีที่ 2 (Property) ดีที่สุดสำหรับ Dialog ที่ต้องส่งค่ากลับมา เพราะ Clean และ Testable

---

## 🛠️ การตั้งค่า Properties (UI Setup)

สร้างโปรเจกต์ที่มี 2 Form:

**Form1 (MainForm) — เมนูหลัก:**
| Control | Property | ค่าที่ตั้ง |
| :--- | :--- | :--- |
| `Form1` | `Text` | `"เมนูหลัก"` |
| `Button` | `Name` | `btnOpenEdit` |
| `Button` | `Text` | `"แก้ไขข้อมูล"` |
| `Label` | `Name` | `lblResult` |

**Form2 (EditForm) — ฟอร์มแก้ไข:**
| Control | Property | ค่าที่ตั้ง |
| :--- | :--- | :--- |
| `Form2` | `Text` | `"แก้ไขข้อมูล"` |
| `Form2` | `FormBorderStyle` | `FixedDialog` |
| `Form2` | `StartPosition` | `CenterParent` |
| `TextBox` | `Name` | `txtName` |
| `TextBox` | `Name` | `txtAge` |
| `Button` (บันทึก) | `Name` | `btnSave` |
| `Button` (ยกเลิก) | `Name` | `btnCancel` |
| `Button` (ยกเลิก) | `DialogResult` | `Cancel` |

---

## 💻 ตัวอย่างโค้ด (Code Implementation)

::: code-group
```csharp [EditForm.cs — ฟอร์มที่ 2]
using System;
using System.Windows.Forms;

namespace MultiFormDemo
{
    public partial class EditForm : Form
    {
        // [1] Property สาธารณะสำหรับรับข้อมูลเข้า
        public string CustomerName
        {
            get => txtName.Text;
            set => txtName.Text = value;
        }

        public int CustomerAge
        {
            get
            {
                int.TryParse(txtAge.Text, out int age);
                return age;
            }
            set => txtAge.Text = value.ToString();
        }

        public EditForm()
        {
            InitializeComponent();
            this.AcceptButton = btnSave;
            this.CancelButton = btnCancel;
        }

        private void btnSave_Click(object sender, EventArgs e)
        {
            if (string.IsNullOrWhiteSpace(txtName.Text))
            {
                MessageBox.Show("กรุณากรอกชื่อ!", "แจ้งเตือน",
                    MessageBoxButtons.OK, MessageBoxIcon.Warning);
                txtName.Focus();
                return;
            }

            if (!int.TryParse(txtAge.Text, out int age) || age <= 0 || age > 120)
            {
                MessageBox.Show("อายุไม่ถูกต้อง! (1-120)", "แจ้งเตือน",
                    MessageBoxButtons.OK, MessageBoxIcon.Warning);
                txtAge.Focus();
                return;
            }

            this.DialogResult = DialogResult.OK;
            this.Close();
        }
    }
}
```

```csharp [Form1.cs — Form หลัก]
using System;
using System.Windows.Forms;

namespace MultiFormDemo
{
    public partial class Form1 : Form
    {
        // [2] เก็บข้อมูลปัจจุบัน
        private string currentName = "สมชาย ใจดี";
        private int currentAge = 25;

        public Form1()
        {
            InitializeComponent();
            UpdateDisplay();
        }

        private void UpdateDisplay()
        {
            lblResult.Text = $"ชื่อ: {currentName} | อายุ: {currentAge} ปี";
        }

        private void btnOpenEdit_Click(object sender, EventArgs e)
        {
            // [3] สร้าง EditForm และส่งข้อมูลปัจจุบันเข้าไปผ่าน Property
            using (EditForm editForm = new EditForm())
            {
                // ตั้งค่าข้อมูลเดิมให้ EditForm
                editForm.CustomerName = currentName;
                editForm.CustomerAge = currentAge;

                // เปิดแบบ Modal
                if (editForm.ShowDialog(this) == DialogResult.OK)
                {
                    // [4] รับข้อมูลที่แก้ไขแล้วกลับมา
                    currentName = editForm.CustomerName;
                    currentAge = editForm.CustomerAge;
                    UpdateDisplay();

                    MessageBox.Show("อัพเดตข้อมูลสำเร็จ!", "สำเร็จ",
                        MessageBoxButtons.OK, MessageBoxIcon.Information);
                }
            }
        }
    }
}
```
:::

**Expected Output:**
```text
Form1 แสดง "ชื่อ: สมชาย ใจดี | อายุ: 25 ปี"
กดปุ่ม "แก้ไขข้อมูล" → EditForm เปิดมา พร้อมข้อมูลเดิม
แก้ชื่อเป็น "วิชัย รักดี" อายุ 30 → กด "บันทึก"
Form1 อัพเดต: "ชื่อ: วิชัย รักดี | อายุ: 30 ปี"
```

---

## 🚀 เทคนิคขั้นสูง: Static Session Class

```csharp
// สร้าง Static Class เก็บข้อมูลที่ทุก Form เข้าถึงได้ (เหมือน Session)
public static class AppSession
{
    public static string Username { get; set; } = "";
    public static string Role { get; set; } = "Guest";
    public static int UserId { get; set; } = 0;

    public static bool IsLoggedIn => !string.IsNullOrEmpty(Username);

    public static void Clear()
    {
        Username = "";
        Role = "Guest";
        UserId = 0;
    }
}

// ใช้งานในทุก Form ได้ทันที
private void Form1_Load(object sender, EventArgs e)
{
    if (!AppSession.IsLoggedIn)
    {
        // ยังไม่ Login → เปิดหน้า Login แล้วปิดตัวเอง
        LoginForm loginForm = new LoginForm();
        loginForm.Show();
        this.Hide();
    }
    else
    {
        lblWelcome.Text = $"ยินดีต้อนรับ {AppSession.Username} ({AppSession.Role})";
    }
}
```

---

## 🎯 โจทย์ฝึกปฏิบัติเสริมความเข้าใจ (Mini Exercise)

**โจทย์ที่ 1: ระบบ Login → Dashboard**
สร้างโปรเจกต์ที่มี LoginForm (username/password) และ DashboardForm เมื่อ Login สำเร็จให้ซ่อน LoginForm และแสดง DashboardForm โดยผ่านชื่อผู้ใช้ผ่าน AppSession

**โจทย์ที่ 2: ฟอร์มเพิ่มสินค้าใน List**
สร้าง MainForm มี ListBox และปุ่ม "เพิ่มสินค้า" เมื่อกดเปิด AddProductForm (ชื่อ, ราคา) เมื่อกด OK รายการใหม่จะเพิ่มใน ListBox

::: details 💡 คำใบ้ (Hint)
ใช้ `this.Hide()` แทน `this.Close()` เพื่อซ่อน LoginForm โดยไม่ปิดโปรแกรม และใช้ Event `DashboardForm.FormClosed` เรียก `Application.Exit()` เพื่อออกโปรแกรมเมื่อปิด Dashboard
:::

---

## 🔥 Challenge (โจทย์ท้าทาย!)

**โจทย์: ระบบ Wizard แบบ 3 ขั้นตอน (3 Forms)**
สร้างระบบสมัครสมาชิกแบบ Wizard ที่มี 3 Form (Step1: ข้อมูลส่วนตัว, Step2: ที่อยู่, Step3: ยืนยัน) โดยส่งข้อมูลสะสมไปเรื่อยๆ ผ่าน AppSession และ Form สุดท้ายแสดงสรุปข้อมูลทั้งหมด

---

## 🗣️ ทบทวน (Review)

::: details ❓ คำถามทบทวน 1:
**คำถาม:** ควรใช้ Static Session Class ในสถานการณ์ใด และมีข้อเสียอะไร?

**แนวคำตอบ:** เหมาะสำหรับข้อมูลที่ต้องใช้ทั่วทั้งแอปพลิเคชัน เช่น ข้อมูลผู้ใช้ที่ Login อยู่ ข้อเสียคือทำให้โค้ด Tightly Coupled และยากต่อการ Unit Test เพราะทุก Class ขึ้นอยู่กับ Global State
:::

::: details ❓ คำถามทบทวน 2:
**คำถาม:** เหตุใด `this.Hide()` จึงดีกว่า `this.Close()` ในบางกรณี?

**แนวคำตอบ:** `this.Close()` ทำลาย Form และทรัพยากรทั้งหมด โปรแกรมจะออกถ้า Form นั้นเป็น StartupForm ส่วน `this.Hide()` แค่ซ่อน Form ไว้ ทรัพยากรยังอยู่ เหมาะสำหรับ LoginForm ที่ต้องการซ่อนไว้ก่อน แล้วค่อยแสดงคืนหรือปิดโปรแกรมผ่าน `Application.Exit()` ที่หลัง
:::
