# 01 - ระบบ Login และ Password Hashing

> 💡 **เป้าหมาย:** เรียนรู้การตรวจสอบสิทธิ์ผู้ใช้ (Authentication) และการจัดเก็บรหัสผ่านอย่างปลอดภัยในฐานข้อมูลด้วยวิธี Hashing แทนการเก็บเป็นข้อความธรรมดา (Plain text)

## 📖 ทฤษฎีและแนวคิด UI (UI Concept & Theory)

**กฎทองของการเก็บรหัสผ่าน:** ห้ามเก็บรหัสผ่านจริงในฐานข้อมูลเด็ดขาด!
หาก Database รั่วไหล Hacker จะได้รหัสผ่านของทุกคนไป เราจึงต้องเก็บรหัสผ่านในรูปแบบ Hash เท่านั้น

**Hashing คืออะไร?**
เป็นการนำข้อความมาผ่านสมการทางคณิตศาสตร์แบบ One-way ทำให้ได้ข้อความยาวๆ ที่ไม่สามารถแปลงกลับเป็นรหัสผ่านเดิมได้
- รหัส "123456" ผ่าน SHA-256 → `8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92`

**กระบวนการ Login ที่ปลอดภัย:**
1. ผู้ใช้กรอก Username และ Password
2. โปรแกรมนำ Password ไปทำ Hash
3. นำ Hash ไปเปรียบเทียบกับ Hash ที่เก็บไว้ใน DB

---

## 💻 ตัวอย่างโค้ด (Code Implementation)

::: code-group
```csharp [HashHelper.cs — คลาสสำหรับเข้ารหัส]
using System;
using System.Security.Cryptography;
using System.Text;

namespace AuthDemo
{
    public static class HashHelper
    {
        // ฟังก์ชันเข้ารหัส SHA-256
        public static string ComputeSha256Hash(string rawData)
        {
            using (SHA256 sha256Hash = SHA256.Create())
            {
                // แปลง string เป็น byte array
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(rawData));

                // แปลง byte array กลับเป็น string เพื่อเก็บลง DB
                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2")); // แปลงเป็นเลขฐาน 16 (hex)
                }
                return builder.ToString();
            }
        }
    }
}
```

```csharp [LoginForm.cs — หน้าจอ Login]
using System;
using System.Windows.Forms;
using Microsoft.Data.SqlClient;

namespace AuthDemo
{
    public partial class LoginForm : Form
    {
        private readonly string connStr = @"Server=.\SQLEXPRESS;Database=AppDB;Integrated Security=true;TrustServerCertificate=true;";

        public LoginForm()
        {
            InitializeComponent();
        }

        private void btnLogin_Click(object sender, EventArgs e)
        {
            string username = txtUsername.Text.Trim();
            string password = txtPassword.Text; // ไม่ต้อง Trim รหัสผ่าน

            if (string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(password))
            {
                MessageBox.Show("กรุณากรอก Username และ Password", "แจ้งเตือน", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            // [1] เข้ารหัส Password ที่ผู้ใช้กรอกมา
            string hashedPassword = HashHelper.ComputeSha256Hash(password);

            // [2] เช็คกับฐานข้อมูล
            if (AuthenticateUser(username, hashedPassword))
            {
                MessageBox.Show("เข้าสู่ระบบสำเร็จ!", "ยินดีต้อนรับ", MessageBoxButtons.OK, MessageBoxIcon.Information);
                
                // [3] เปิดหน้าหลัก
                MainForm mainForm = new MainForm();
                mainForm.Show();
                this.Hide(); // ซ่อนหน้า Login
            }
            else
            {
                MessageBox.Show("Username หรือ Password ไม่ถูกต้อง", "เกิดข้อผิดพลาด", MessageBoxButtons.OK, MessageBoxIcon.Error);
                txtPassword.Clear();
                txtPassword.Focus();
            }
        }

        private bool AuthenticateUser(string username, string hashedPassword)
        {
            bool isValid = false;
            string sql = "SELECT COUNT(1) FROM Users WHERE Username = @usr AND PasswordHash = @pwd";

            using (SqlConnection conn = new SqlConnection(connStr))
            using (SqlCommand cmd = new SqlCommand(sql, conn))
            {
                cmd.Parameters.AddWithValue("@usr", username);
                cmd.Parameters.AddWithValue("@pwd", hashedPassword);

                conn.Open();
                int count = Convert.ToInt32(cmd.ExecuteScalar());
                if (count == 1) isValid = true;
            }

            return isValid;
        }
    }
}
```
:::

---

## 🎯 โจทย์ฝึกปฏิบัติเสริมความเข้าใจ (Mini Exercise)

**โจทย์: หน้าจอลงทะเบียน (Register)**
สร้างฟอร์มลงทะเบียนที่รับ Username และ Password (มีช่องยืนยันรหัสผ่านด้วย) เมื่อผู้ใช้กดสมัค ให้ใช้ `HashHelper.ComputeSha256Hash()` เข้ารหัสผ่าน แล้วบันทึก (INSERT) ลงตาราง `Users`

::: details 💡 คำใบ้ (Hint)
เช็คก่อนเสมอว่า Username นี้มีคนใช้หรือยังด้วย `SELECT COUNT(1) FROM Users WHERE Username = @usr`
:::

---

## 🗣️ ทบทวน (Review)

::: details ❓ คำถามทบทวน 1:
**คำถาม:** เหตุใดเราจึงใช้ SHA-256 แทนที่ MD5 ในการเข้ารหัสรหัสผ่าน?

**แนวคำตอบ:** MD5 ปัจจุบันถูกมองว่าไม่ปลอดภัยอีกต่อไป เพราะสามารถเกิด Collision (ข้อมูลสองชุดให้ Hash ตรงกัน) และคอมพิวเตอร์ปัจจุบันสามารถเดารหัส MD5 ได้เร็วมาก (Brute-force) SHA-256 มีความยาวและความปลอดภัยที่สูงกว่ามาก
:::
