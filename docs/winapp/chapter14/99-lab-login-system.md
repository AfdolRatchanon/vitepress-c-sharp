# 💻 Lab: สร้างระบบ Login พร้อม Role Admin/User

> 💡 **เป้าหมาย:** สร้างระบบยืนยันตัวตนเต็มรูปแบบที่มีหน้า Login, การตรวจสอบรหัสผ่านแบบ Hash และเมื่อล็อกอินสำเร็จ ให้เปิดฟอร์มหลักพร้อมจำกัดสิทธิ์ (เมนู) ตาม Role

## 📖 ภาพรวมของโปรแกรม

```text
[Wireframe: System Login]
+----------------------------------------------------------+
| 🗔 เข้าสู่ระบบ                                      _ □ X |
+----------------------------------------------------------+
|                                                          |
|        ชื่อผู้ใช้งาน: [txtUser          ]                  |
|        รหัสผ่าน:   [txtPassword      ]                 |
|                                                          |
|                  [ 🔑 เข้าสู่ระบบ ]                        |
|                                                          |
+----------------------------------------------------------+
```

## ⏱️ เวลาที่ใช้: 60 นาที

## 📝 ขั้นตอนการทำงาน

::: code-group
```csharp [Script สร้างตารางใน SQL Server]
-- รันสคริปต์นี้ใน SQL Server Management Studio
CREATE TABLE SystemUsers (
    UserId INT PRIMARY KEY IDENTITY(1,1),
    Username NVARCHAR(50) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(256) NOT NULL,
    UserRole NVARCHAR(20) NOT NULL -- 'Admin', 'Staff'
);

-- ใส่ข้อมูลเบื้องต้น
-- รหัสผ่านคือ "1234" (SHA-256 ของ 1234 คือ 03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4)
INSERT INTO SystemUsers (Username, PasswordHash, UserRole) 
VALUES ('admin', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 'Admin');

INSERT INTO SystemUsers (Username, PasswordHash, UserRole) 
VALUES ('user1', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 'Staff');
```

```csharp [LoginForm.cs]
using System;
using System.Security.Cryptography;
using System.Text;
using System.Windows.Forms;
using Microsoft.Data.SqlClient;

namespace SystemLoginApp
{
    public partial class LoginForm : Form
    {
        public LoginForm()
        {
            InitializeComponent();
            txtPassword.UseSystemPasswordChar = true; // ซ่อนรหัสผ่านเป็นจุด
        }

        private string HashPassword(string password)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                    builder.Append(bytes[i].ToString("x2"));
                return builder.ToString();
            }
        }

        private void btnLogin_Click(object sender, EventArgs e)
        {
            string username = txtUser.Text.Trim();
            string password = txtPassword.Text;

            string hashedPwd = HashPassword(password);
            string sql = "SELECT UserRole FROM SystemUsers WHERE Username = @usr AND PasswordHash = @pwd";

            using (SqlConnection conn = new SqlConnection(@"Server=.\SQLEXPRESS;Database=CompanyDB;Integrated Security=true;TrustServerCertificate=true;"))
            using (SqlCommand cmd = new SqlCommand(sql, conn))
            {
                cmd.Parameters.AddWithValue("@usr", username);
                cmd.Parameters.AddWithValue("@pwd", hashedPwd);

                conn.Open();
                object role = cmd.ExecuteScalar();

                if (role != null)
                {
                    // เก็บสถานะแบบง่าย
                    MainForm mainForm = new MainForm(username, role.ToString());
                    mainForm.Show();
                    this.Hide();
                }
                else
                {
                    MessageBox.Show("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
                    txtPassword.Clear();
                }
            }
        }
    }
}
```

```csharp [MainForm.cs]
using System;
using System.Windows.Forms;

namespace SystemLoginApp
{
    public partial class MainForm : Form
    {
        private string _username;
        private string _role;

        // รับค่ามาจากตอน Login
        public MainForm(string username, string role)
        {
            InitializeComponent();
            _username = username;
            _role = role;
        }

        private void MainForm_Load(object sender, EventArgs e)
        {
            lblUser.Text = $"User: {_username} | Role: {_role}";

            // ตรวจสอบสิทธิ์
            if (_role != "Admin")
            {
                menuAdminPanel.Visible = false; // ซ่อนเมนูผู้ดูแลระบบ
                btnManageUsers.Enabled = false; // ปิดปุ่มจัดการ User
            }
        }

        private void btnLogout_Click(object sender, EventArgs e)
        {
            LoginForm login = new LoginForm();
            login.Show();
            this.Close(); // ปิดหน้านี้
        }
    }
}
```
:::

## 🔥 Challenge (โจทย์ท้าทาย!)

**โจทย์:** เพิ่มฟีเจอร์ "แสดงรหัสผ่าน" (Show Password) ในหน้า Login โดยทำ CheckBox ไว้ใต้ช่องใส่รหัสผ่าน หากติ๊กถูก ให้เปลี่ยน `txtPassword.UseSystemPasswordChar = false;` เพื่อเปิดให้เห็นข้อความ
