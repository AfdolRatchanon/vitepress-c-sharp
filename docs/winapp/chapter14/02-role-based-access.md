# 02 - Role-Based Access Control (RBAC)

> 💡 **เป้าหมาย:** เรียนรู้การจัดการสิทธิ์การใช้งาน (Authorization) ตามกลุ่มผู้ใช้ เช่น Admin, Manager, หรือ Staff โดยการดึง Role จาก Database มาเก็บไว้ใน Global State แล้วนำมาใช้เปิด-ปิดเมนูในหน้าต่างหลัก

## 📖 ทฤษฎีและแนวคิด UI (UI Concept & Theory)

**RBAC (Role-Based Access Control)** คือการควบคุมสิทธิ์ผ่าน "บทบาท" (Role) 
เมื่อผู้ใช้เข้าสู่ระบบสำเร็จ นอกจากตรวจสอบรหัสผ่านแล้ว เรายังดึงข้อมูล Role ออกมาด้วย แล้วใช้ Role นี้ในการกำหนด UI ว่าเขาจะเห็นปุ่ม หรือเมนูอะไรบ้าง

```text
[ตาราง Users ใน DB]
Id  | Username | PasswordHash         | Role
------------------------------------------------
1   | admin    | 8d969eef6ecad3c29... | Admin
2   | somchai  | ef797c8118f02dfb6... | Staff
```

---

## 💻 ตัวอย่างโค้ด (Code Implementation)

::: code-group
```csharp [AppSession.cs — เก็บสถานะผู้ใช้]
namespace AuthDemo
{
    // ใช้เพื่อเก็บข้อมูลผู้ใช้ที่ล็อกอินเข้ามา เพื่อให้ทุก Form เข้าถึงได้
    public static class AppSession
    {
        public static string Username { get; set; }
        public static string Role { get; set; }

        public static bool IsAdmin => Role == "Admin";
        public static bool IsManager => Role == "Manager";
        public static bool IsStaff => Role == "Staff";

        public static void Clear()
        {
            Username = null;
            Role = null;
        }
    }
}
```

```csharp [LoginForm.cs — แก้ไขการ Login เพื่อเก็บ Role]
private bool AuthenticateUser(string username, string hashedPassword)
{
    bool isValid = false;
    // อ่าน Role กลับมาด้วย
    string sql = "SELECT Role FROM Users WHERE Username = @usr AND PasswordHash = @pwd";

    using (SqlConnection conn = new SqlConnection(connStr))
    using (SqlCommand cmd = new SqlCommand(sql, conn))
    {
        cmd.Parameters.AddWithValue("@usr", username);
        cmd.Parameters.AddWithValue("@pwd", hashedPassword);

        conn.Open();
        object result = cmd.ExecuteScalar();
        
        if (result != null)
        {
            isValid = true;
            // บันทึกข้อมูลลง AppSession
            AppSession.Username = username;
            AppSession.Role = result.ToString();
        }
    }
    return isValid;
}
```

```csharp [MainForm.cs — ควบคุม UI ตาม Role]
using System;
using System.Windows.Forms;

namespace AuthDemo
{
    public partial class MainForm : Form
    {
        public MainForm()
        {
            InitializeComponent();
        }

        private void MainForm_Load(object sender, EventArgs e)
        {
            lblWelcome.Text = $"ยินดีต้อนรับ: {AppSession.Username} (สิทธิ์: {AppSession.Role})";

            // [1] ควบคุมสิทธิ์การมองเห็น/คลิกเมนู
            ApplyRoleBasedSecurity();
        }

        private void ApplyRoleBasedSecurity()
        {
            // ซ่อน/แสดงเมนูตามสิทธิ์
            if (AppSession.IsStaff)
            {
                // Staff ทำได้แค่ดูรายงาน ห้ามแก้ไขระบบ
                menuSystemSettings.Visible = false;
                menuManageUsers.Visible = false;
                btnDeleteData.Enabled = false;
            }
            else if (AppSession.IsManager)
            {
                // Manager ทำได้เยอะขึ้น แต่ยังห้ามแก้ User
                menuManageUsers.Visible = false;
            }
            // ถ้าเป็น Admin (ไม่ต้องเขียนเพิ่ม เพราะเห็นทุกอย่างอยู่แล้วโดย Default)
        }

        private void MainForm_FormClosed(object sender, FormClosedEventArgs e)
        {
            // ปิดโปรแกรมทั้งหมดเมื่อปิดหน้าต่างหลัก
            Application.Exit();
        }
    }
}
```
:::

---

## 🎯 โจทย์ฝึกปฏิบัติเสริมความเข้าใจ (Mini Exercise)

**โจทย์: จำกัดสิทธิ์ระดับปุ่มกด**
ในหน้า `ProductForm` (จัดการสินค้า) ให้เช็คว่า ถ้าไม่ใช่ `Admin` ให้ Disable ปุ่มลบ และปุ่มแก้ไขให้ทำได้เฉพาะเปลี่ยนราคาเท่านั้น ห้ามเปลี่ยนชื่อสินค้า

---

## 🗣️ ทบทวน (Review)

::: details ❓ คำถามทบทวน 1:
**คำถาม:** การเก็บข้อมูลผู้ใช้ไว้ในคลาส `AppSession` แบบ `static` มีข้อควรระวังอะไรบ้าง?

**แนวคำตอบ:** เนื่องจากข้อมูลเป็น Global state หากผู้ใช้ออกจากระบบ (Logout) ต้องอย่าลืมเรียกฟังก์ชัน `AppSession.Clear()` เพื่อล้างค่าเสมอ ไม่เช่นนั้นผู้ใช้คนถัดไปที่ล็อกอินเข้ามา (โดยไม่ปิดโปรแกรม) อาจได้สิทธิ์ตกค้างจากคนก่อนหน้า
:::
