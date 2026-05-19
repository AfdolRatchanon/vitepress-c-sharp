# 02 - SqlCommand, SqlDataReader & Parameterized Query

> 💡 **เป้าหมาย:** เรียนรู้การส่ง SQL Command ไปยัง Database, การอ่านผลลัพธ์แถวต่อแถวด้วย SqlDataReader และการป้องกัน SQL Injection ด้วย Parameterized Query ซึ่งเป็นหลักการความปลอดภัยขั้นพื้นฐาน

## 📖 ทฤษฎีและแนวคิด UI (UI Concept & Theory)

### SQL Injection คืออะไร?
เมื่อเราต่อ String เพื่อสร้าง SQL ผู้ใช้ที่ไม่หวังดีสามารถพิมพ์ SQL Code ลงในช่องกรอกข้อมูล เพื่อ "ฉีด" คำสั่ง SQL ที่เป็นอันตราย:

```text
❌ ต่อ String ตรงๆ — เสี่ยงมาก!
string sql = "SELECT * FROM Users WHERE Name='" + txtName.Text + "'";
// ถ้าผู้ใช้พิมพ์: ' OR '1'='1
// SQL กลายเป็น: SELECT * FROM Users WHERE Name='' OR '1'='1'
// ผลคือดึงข้อมูล User ทั้งหมดออกมา!

✅ Parameterized Query — ปลอดภัย
string sql = "SELECT * FROM Users WHERE Name = @name";
cmd.Parameters.AddWithValue("@name", txtName.Text);
// ค่าจาก TextBox จะถูก Escape อัตโนมัติ ไม่สามารถฉีด SQL ได้
```

---

## 💻 ตัวอย่างโค้ด (Code Implementation)

::: code-group
```csharp [Form1.cs — CRUD ด้วย Parameterized Query]
using System;
using System.Collections.Generic;
using System.Windows.Forms;
using Microsoft.Data.SqlClient;

namespace ProductViewer
{
    public partial class Form1 : Form
    {
        private readonly string connStr = @"Server=.\SQLEXPRESS;Database=ShopDB;Integrated Security=true;TrustServerCertificate=true;";

        public Form1()
        {
            InitializeComponent();
            LoadProducts();
        }

        // [1] SELECT ด้วย SqlDataReader
        private void LoadProducts(string searchName = "")
        {
            dgvProducts.Rows.Clear();

            string sql = "SELECT ProductId, ProductName, Price, Stock FROM Products";
            if (!string.IsNullOrEmpty(searchName))
                sql += " WHERE ProductName LIKE @name";
            sql += " ORDER BY ProductId";

            try
            {
                using (SqlConnection conn = new SqlConnection(connStr))
                using (SqlCommand cmd = new SqlCommand(sql, conn))
                {
                    if (!string.IsNullOrEmpty(searchName))
                        cmd.Parameters.AddWithValue("@name", $"%{searchName}%");

                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            // [2] อ่านค่าจาก Reader ด้วยชื่อ Column หรือ Index
                            dgvProducts.Rows.Add(
                                reader["ProductId"],
                                reader["ProductName"],
                                ((decimal)reader["Price"]).ToString("N2"),
                                reader["Stock"]
                            );
                        }
                    }
                }
                lblCount.Text = $"พบ {dgvProducts.Rows.Count} รายการ";
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error: {ex.Message}", "Database Error",
                    MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        // [3] INSERT ด้วย ExecuteNonQuery
        private void btnAdd_Click(object sender, EventArgs e)
        {
            if (string.IsNullOrWhiteSpace(txtProductName.Text)) return;

            string sql = @"INSERT INTO Products (ProductName, Price, Stock)
                           VALUES (@name, @price, @stock)";
            try
            {
                using (SqlConnection conn = new SqlConnection(connStr))
                using (SqlCommand cmd = new SqlCommand(sql, conn))
                {
                    // [4] ใช้ @parameter แทนค่าทุกครั้ง
                    cmd.Parameters.AddWithValue("@name", txtProductName.Text.Trim());
                    cmd.Parameters.AddWithValue("@price", nudPrice.Value);
                    cmd.Parameters.AddWithValue("@stock", (int)nudStock.Value);

                    conn.Open();
                    int rowsAffected = cmd.ExecuteNonQuery();
                    if (rowsAffected > 0)
                    {
                        MessageBox.Show("เพิ่มสินค้าสำเร็จ!", "สำเร็จ",
                            MessageBoxButtons.OK, MessageBoxIcon.Information);
                        LoadProducts();
                        ClearForm();
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error: {ex.Message}", "Error",
                    MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        // [5] DELETE
        private void btnDelete_Click(object sender, EventArgs e)
        {
            if (dgvProducts.CurrentRow == null) return;
            int id = Convert.ToInt32(dgvProducts.CurrentRow.Cells[0].Value);

            if (MessageBox.Show("ต้องการลบสินค้านี้หรือไม่?", "ยืนยัน",
                MessageBoxButtons.YesNo, MessageBoxIcon.Warning) != DialogResult.Yes) return;

            string sql = "DELETE FROM Products WHERE ProductId = @id";
            using (SqlConnection conn = new SqlConnection(connStr))
            using (SqlCommand cmd = new SqlCommand(sql, conn))
            {
                cmd.Parameters.AddWithValue("@id", id);
                conn.Open();
                cmd.ExecuteNonQuery();
            }
            LoadProducts();
        }

        private void btnSearch_Click(object sender, EventArgs e)
        {
            LoadProducts(txtSearch.Text.Trim());
        }

        private void ClearForm()
        {
            txtProductName.Clear();
            nudPrice.Value = 0;
            nudStock.Value = 0;
        }
    }
}
```
:::

**Expected Output:**
```text
DataGridView แสดงรายการสินค้าจาก SQL Server
ค้นหา "กาแฟ" → แสดงเฉพาะสินค้าที่ชื่อมีคำว่า "กาแฟ"
เพิ่มสินค้าใหม่ → INSERT สำเร็จ → DataGridView อัพเดต
ลบสินค้า → DELETE สำเร็จ → แถวหายไป
```

---

## 🎯 โจทย์ฝึกปฏิบัติเสริมความเข้าใจ (Mini Exercise)

**โจทย์: UPDATE สินค้า**
เมื่อดับเบิลคลิกที่แถวใน DataGridView ให้โหลดข้อมูลมาใส่ TextBox และ NumericUpDown แล้วปุ่ม "แก้ไข" จะเปลี่ยนเป็น "บันทึก" ที่เรียก `UPDATE Products SET ... WHERE ProductId = @id`

---

## 🔥 Challenge (โจทย์ท้าทาย!)

**โจทย์: Stored Procedure**
สร้าง Stored Procedure `usp_SearchProducts(@name, @minPrice, @maxPrice)` ใน SQL Server แล้วเรียกจาก WinForms โดยตั้ง `cmd.CommandType = CommandType.StoredProcedure`
