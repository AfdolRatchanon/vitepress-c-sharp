# 02 - Modern UI & Localization

> 💡 **เป้าหมาย:** เรียนรู้วิธีปรับแต่ง UI ให้ดูทันสมัย (Flat Design แบบไร้กรอบ) และการสร้างแอปพลิเคชันที่สลับภาษา (ไทย-อังกฤษ) ได้แบบ Real-time โดยใช้ไฟล์ Resource

## 📖 ทฤษฎีและแนวคิด UI (UI Concept & Theory)

**1. Modern UI (Flat Design)**
WinForms เดิมๆ จะมีกรอบหน้าต่างและสีพื้นหลังสีเทาแบบยุค Windows XP/7 การทำ Modern UI คือการ:
- ซ่อนขอบหน้าต่าง (`FormBorderStyle = None`)
- ใช้สีเรียบๆ หรือสีเข้ม (Dark Mode)
- สร้าง Custom Control ที่โค้งมน

**2. Localization (การรองรับหลายภาษา)**
แทนที่จะกำหนด `Text = "บันทึก"` ฝังในโค้ด เราจะดึงข้อความจากไฟล์ Resource (`.resx`) ซึ่งเปรียบเสมือนดิกชันนารีเก็บคำแปล ทำให้แอปสามารถเปลี่ยนภาษาได้

---

## 💻 ตัวอย่างโค้ด (Code Implementation)

### ส่วนที่ 1: Modern UI & Borderless Form

เมื่อตั้ง `FormBorderStyle = None` เราจะขยับหน้าต่างไม่ได้ เราจึงต้องสร้าง Panel ขอบบนมาทำหน้าที่แทน Title Bar

::: code-group
```csharp [Form1.cs — ลากหน้าต่างไร้ขอบ]
using System;
using System.Drawing;
using System.Runtime.InteropServices;
using System.Windows.Forms;

namespace ModernUiDemo
{
    public partial class Form1 : Form
    {
        // โค้ดสำหรับเรียกใช้ Windows API เพื่อลากหน้าต่าง
        public const int WM_NCLBUTTONDOWN = 0xA1;
        public const int HT_CAPTION = 0x2;

        [DllImportAttribute("user32.dll")]
        public static extern int SendMessage(IntPtr hWnd, int Msg, int wParam, int lParam);
        
        [DllImportAttribute("user32.dll")]
        public static extern bool ReleaseCapture();

        public Form1()
        {
            InitializeComponent();
            
            // ลบกรอบ
            this.FormBorderStyle = FormBorderStyle.None;
            // ตั้งสีพื้นเป็นสีเข้ม (Dark Mode)
            this.BackColor = Color.FromArgb(45, 45, 48);
        }

        // นำโค้ดนี้ไปผูกกับ Event MouseDown ของ Panel ด้านบน (pnlTopBar)
        private void pnlTopBar_MouseDown(object sender, MouseEventArgs e)
        {
            if (e.Button == MouseButtons.Left)
            {
                ReleaseCapture();
                SendMessage(Handle, WM_NCLBUTTONDOWN, HT_CAPTION, 0);
            }
        }

        // ปุ่มปิด X ที่สร้างขึ้นเอง
        private void btnClose_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }
    }
}
```
:::

---

### ส่วนที่ 2: Localization (การทำ 2 ภาษา)

**วิธีทำ:**
1. ไปที่ `Solution Explorer` คลิกขวาที่โปรเจกต์ -> Add -> New Item -> มองหา **Resources File**
2. ตั้งชื่อไฟล์ว่า `Lang.resx` (ภาษา Default)
3. เพิ่มค่าลงตาราง: Name = `lblGreeting`, Value = `Hello, Welcome!`
4. สร้างอีกไฟล์ชื่อ `Lang.th.resx` (ภาษาไทย)
5. เพิ่มค่าลงตาราง: Name = `lblGreeting`, Value = `สวัสดี, ยินดีต้อนรับ!`

::: code-group
```csharp [Form1.cs — สลับภาษา]
using System;
using System.Globalization;
using System.Threading;
using System.Windows.Forms;

namespace ModernUiDemo
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
            ApplyLanguage(); // โหลดภาษาเริ่มต้น
        }

        // ฟังก์ชันอัปเดต UI 
        private void ApplyLanguage()
        {
            // ดึงข้อความจากไฟล์ Resource ตามภาษาที่เลือกปัจจุบัน
            // (ถือว่าโปรเจกต์คุณชื่อ ModernUiDemo)
            lblGreeting.Text = ModernUiDemo.Lang.lblGreeting;
            btnSettings.Text = ModernUiDemo.Lang.btnSettings;
        }

        private void btnThai_Click(object sender, EventArgs e)
        {
            // เปลี่ยน Culture ของทั้งโปรแกรมเป็นไทย
            Thread.CurrentThread.CurrentUICulture = new CultureInfo("th-TH");
            ApplyLanguage(); // อัพเดตข้อความบนหน้าจอใหม่
        }

        private void btnEnglish_Click(object sender, EventArgs e)
        {
            // เปลี่ยน Culture เป็นอังกฤษ
            Thread.CurrentThread.CurrentUICulture = new CultureInfo("en-US");
            ApplyLanguage();
        }
    }
}
```
:::

---

## 🎯 โจทย์ฝึกปฏิบัติเสริมความเข้าใจ (Mini Exercise)

**โจทย์: สลับ Dark/Light Mode**
สร้างปุ่มที่เมื่อกดแล้ว สลับสีของฟอร์ม หากพื้นหลังเป็นสีเข้ม ให้สลับเป็นสีขาวตัวหนังสือดำ และหากเป็นสีขาวอยู่ ให้สลับกลับเป็นสีเข้มตัวหนังสือขาว

---

## 🗣️ ทบทวน (Review)

::: details ❓ คำถามทบทวน 1:
**คำถาม:** การตั้งชื่อไฟล์ Resource เป็น `Lang.th.resx` มีความสำคัญอย่างไร?

**แนวคำตอบ:** ตัวย่อ `th` คือรหัส Culture ของภาษาไทย เมื่อเราสั่ง `CurrentUICulture = new CultureInfo("th-TH")` ระบบ .NET จะมองหาไฟล์นามสกุล `.th.resx` อัตโนมัติ หากไม่พบ มันจะตกลงไปใช้ไฟล์ `.resx` (Default) แทน นี่คือกลไก Resource Fallback ของ .NET
:::
