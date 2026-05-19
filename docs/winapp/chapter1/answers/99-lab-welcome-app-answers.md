# เฉลย Lab: Welcome Application

## 📝 เฉลยขั้นตอนการเขียนโค้ด (Code-Behind)

นี่คือโค้ดฉบับสมบูรณ์ที่นักเรียนควรได้หลังจากทำ Step 2 ครบทุกข้อ:

```csharp
using System;
using System.Windows.Forms;

namespace WelcomeApp
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        // Task 2.1 & 2.2: โค้ดสำหรับปุ่มทักทาย
        private void btnSayHello_Click(object sender, EventArgs e)
        {
            // ดึงข้อความที่ผู้ใช้พิมพ์ใน TextBox มาเก็บในตัวแปร name
            string name = txtName.Text;
            
            // แสดงข้อความต้อนรับ
            MessageBox.Show("ยินดีต้อนรับคุณ " + name + " เข้าสู่โปรแกรม!", "Welcome");
        }

        // Task 2.3: โค้ดสำหรับปุ่มล้างข้อมูล
        private void btnClear_Click(object sender, EventArgs e)
        {
            // สามารถใช้ txtName.Text = ""; ก็ได้เช่นกัน
            txtName.Clear();
            
            // (เสริม) สั่งให้ Cursor เมาส์ไปกระพริบรอที่ TextBox หลังจากล้างข้อมูล
            txtName.Focus();
        }

        // Task 2.4: โค้ดสำหรับปุ่มออกโปรแกรม
        private void btnExit_Click(object sender, EventArgs e)
        {
            this.Close();
        }
    }
}
```

---

## 🔥 เฉลย Challenge (การดักจับข้อผิดพลาด / Validation)

**โจทย์:** เช็คว่าถ้าช่องใส่ชื่อว่างเปล่า ให้แจ้งเตือน "คุณยังไม่ได้กรอกชื่อเลย!"
**วิธีทำ:** เราจะนำ `if-else` มาเช็คเงื่อนไขที่ปุ่ม `btnSayHello_Click` ก่อนที่จะแสดงข้อความต้อนรับ

```csharp
private void btnSayHello_Click(object sender, EventArgs e)
{
    string name = txtName.Text;

    // ตรวจสอบว่าช่องว่างเปล่าหรือไม่ (ใช้ .Trim() เพื่อตัดช่องว่างที่เผื่อผู้ใช้กด Spacebar เล่นๆ)
    if (name.Trim() == "")
    {
        // กรณีที่ผู้ใช้ไม่พิมพ์อะไรเลย
        MessageBox.Show("คุณยังไม่ได้กรอกชื่อเลย!", "แจ้งเตือน", MessageBoxButtons.OK, MessageBoxIcon.Warning);
    }
    else
    {
        // กรณีที่ใส่ข้อมูลมาปกติ
        MessageBox.Show("ยินดีต้อนรับคุณ " + name + " เข้าสู่โปรแกรม!", "Welcome");
    }
}
```

> **ข้อสังเกต:** การทำแบบนี้เรียกว่า **Input Validation** ซึ่งมีความสำคัญมากในการเขียนโปรแกรมจริง เพื่อป้องกันไม่ให้ข้อมูลขยะ (Empty string หรือ null) เข้าสู่ระบบของเรา
