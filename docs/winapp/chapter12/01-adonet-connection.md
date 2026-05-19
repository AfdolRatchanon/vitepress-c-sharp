# 01 - เชื่อมต่อฐานข้อมูลด้วย ADO.NET

> 💡 **เป้าหมาย:** เรียนรู้การสร้าง Connection String, เปิด-ปิด SqlConnection อย่างปลอดภัย, ตรวจสอบการเชื่อมต่อ และดึงข้อมูลอย่างง่ายด้วย SqlCommand

## 📖 ทฤษฎีและแนวคิด UI (UI Concept & Theory)

**ADO.NET** คือ Technology ของ .NET สำหรับติดต่อกับ Database โดยมีขั้นตอนหลักเสมอ:

```text
[ขั้นตอน ADO.NET ทุกครั้ง]
1. สร้าง Connection String (รายละเอียดการเชื่อมต่อ)
2. สร้าง SqlConnection และเปิด (.Open())
3. สร้าง SqlCommand พร้อม SQL Statement
4. Execute Command (ExecuteReader / ExecuteNonQuery / ExecuteScalar)
5. อ่านข้อมูล (ถ้ามี)
6. ปิด Connection (.Close() หรือ using)
```

### 🔑 Connection String รูปแบบต่างๆ

```text
// SQL Server Express (Local):
"Server=.\SQLEXPRESS;Database=MyDB;Integrated Security=true;"

// SQL Server ใช้ Username/Password:
"Server=localhost;Database=MyDB;User Id=sa;Password=1234;"

// SQL Server Azure:
"Server=myserver.database.windows.net;Database=MyDB;User Id=admin;Password=Pass;"
```

---

## 🛠️ การตั้งค่า Properties (UI Setup)

| Control | Property | ค่าที่ตั้ง |
| :--- | :--- | :--- |
| `Form1` | `Text` | `"ADO.NET Connection Demo"` |
| `TextBox` (Server) | `Name` | `txtServer` |
| `TextBox` (Server) | `Text` | `".\SQLEXPRESS"` |
| `TextBox` (Database) | `Name` | `txtDatabase` |
| `Button` (ทดสอบ) | `Name` | `btnTest` |
| `Button` (ทดสอบ) | `Text` | `"ทดสอบการเชื่อมต่อ"` |
| `Label` (สถานะ) | `Name` | `lblStatus` |
| `RichTextBox` (ผล) | `Name` | `rtbResult` |

---

## 💻 ตัวอย่างโค้ด (Code Implementation)

::: code-group
```csharp [DatabaseHelper.cs — Helper Class]
using System;
using Microsoft.Data.SqlClient; // หรือ System.Data.SqlClient สำหรับ .NET Framework

namespace ProductViewer
{
    public static class DatabaseHelper
    {
        // [1] สร้าง Connection String จากค่าที่รับมา
        public static string BuildConnectionString(string server, string database)
        {
            return $"Server={server};Database={database};Integrated Security=true;TrustServerCertificate=true;";
        }

        // [2] ทดสอบการเชื่อมต่อ
        public static (bool success, string message) TestConnection(string connectionString)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    conn.Open();
                    return (true, $"เชื่อมต่อสำเร็จ! Version: {conn.ServerVersion}");
                }
            }
            catch (Exception ex)
            {
                return (false, $"เชื่อมต่อล้มเหลว: {ex.Message}");
            }
        }
    }
}
```

```csharp [Form1.cs]
using System;
using System.Windows.Forms;
using Microsoft.Data.SqlClient;

namespace ProductViewer
{
    public partial class Form1 : Form
    {
        private string connectionString = "";

        public Form1()
        {
            InitializeComponent();
        }

        private void btnTest_Click(object sender, EventArgs e)
        {
            connectionString = DatabaseHelper.BuildConnectionString(
                txtServer.Text.Trim(),
                txtDatabase.Text.Trim());

            lblStatus.Text = "กำลังทดสอบ...";
            this.Cursor = Cursors.WaitCursor;

            var (success, message) = DatabaseHelper.TestConnection(connectionString);

            this.Cursor = Cursors.Default;
            lblStatus.Text = message;
            lblStatus.ForeColor = success
                ? System.Drawing.Color.DarkGreen
                : System.Drawing.Color.Red;

            if (success)
            {
                // [3] ดึงรายชื่อ Table ทั้งหมดใน Database
                LoadTableList();
            }
        }

        private void LoadTableList()
        {
            rtbResult.Clear();
            string sql = "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE='BASE TABLE' ORDER BY TABLE_NAME";

            try
            {
                using (SqlConnection conn = new SqlConnection(connectionString))
                using (SqlCommand cmd = new SqlCommand(sql, conn))
                {
                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        rtbResult.AppendText("ตารางในฐานข้อมูล:\n");
                        while (reader.Read())
                        {
                            rtbResult.AppendText($"  📋 {reader["TABLE_NAME"]}\n");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                rtbResult.Text = $"Error: {ex.Message}";
            }
        }
    }
}
```
:::

---

## 🎯 โจทย์ฝึกปฏิบัติเสริมความเข้าใจ (Mini Exercise)

**โจทย์: นับจำนวน Record ในตาราง**
หลังจากเชื่อมต่อสำเร็จ ให้แสดงจำนวน Record ในตาราง Products ด้วย `SELECT COUNT(*) FROM Products` และ `ExecuteScalar()`

::: details 💡 คำใบ้ (Hint)
`int count = (int)cmd.ExecuteScalar();` — `ExecuteScalar()` ส่งค่าเดียวกลับมาจากแถวแรกคอลัมน์แรก
:::

---

## 🗣️ ทบทวน (Review)

::: details ❓ คำถามทบทวน 1:
**คำถาม:** เหตุใดต้องใช้ `using` กับ SqlConnection เสมอ?

**แนวคำตอบ:** SqlConnection ใช้ Network Resource และ Database Connection Pool ถ้าไม่ปิด Connection จะเกิด Connection Leak ส่งผลให้ Database ไม่มี Connection ให้ใช้ในที่สุด `using` รับประกันว่า `.Dispose()` จะถูกเรียกเสมอ แม้เกิด Exception
:::

::: details ❓ คำถามทบทวน 2:
**คำถาม:** `Integrated Security=true` ต่างจากการใช้ Username/Password อย่างไร?

**แนวคำตอบ:** `Integrated Security=true` ใช้ Windows Account ของผู้ใช้ที่กำลัง Run โปรแกรมในการ Authenticate กับ SQL Server ไม่ต้องฝัง Username/Password ในโค้ด ปลอดภัยกว่าแต่ใช้ได้เฉพาะบน Windows เดียวกับ SQL Server ส่วน Username/Password เหมาะกับ Remote Server
:::
