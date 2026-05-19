# 💻 Lab: สร้างโปรแกรมดูรายชื่อสินค้าจาก Database

> 💡 **เป้าหมาย:** สร้างระบบจัดการสินค้าที่เชื่อมต่อ SQL Server ได้จริง มีระบบค้นหา, กรองตามหมวดหมู่ และแสดงสถิติ

## 📖 ภาพรวมของโปรแกรม

```text
[SQL Table ที่ต้องสร้างก่อน]
CREATE TABLE Categories (
    CategoryId INT PRIMARY KEY IDENTITY,
    CategoryName NVARCHAR(100) NOT NULL
);
CREATE TABLE Products (
    ProductId INT PRIMARY KEY IDENTITY,
    ProductName NVARCHAR(200) NOT NULL,
    Price DECIMAL(10,2) NOT NULL,
    Stock INT NOT NULL DEFAULT 0,
    CategoryId INT REFERENCES Categories(CategoryId)
);
```

## ⏱️ เวลาที่ใช้: 90 นาที

::: code-group
```csharp [DatabaseService.cs — Service Layer]
using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;

namespace ProductViewer
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int Stock { get; set; }
        public string Category { get; set; }
    }

    public class DatabaseService
    {
        private readonly string _connStr;
        public DatabaseService(string connStr) => _connStr = connStr;

        public List<ProductDto> GetProducts(string keyword = "", int categoryId = 0)
        {
            var result = new List<ProductDto>();
            string sql = @"SELECT p.ProductId, p.ProductName, p.Price, p.Stock,
                                  ISNULL(c.CategoryName, 'ไม่มีหมวด') AS Category
                           FROM Products p
                           LEFT JOIN Categories c ON p.CategoryId = c.CategoryId
                           WHERE (@keyword = '' OR p.ProductName LIKE '%' + @keyword + '%')
                             AND (@catId = 0 OR p.CategoryId = @catId)
                           ORDER BY p.ProductName";

            using var conn = new SqlConnection(_connStr);
            using var cmd = new SqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("@keyword", keyword);
            cmd.Parameters.AddWithValue("@catId", categoryId);
            conn.Open();
            using var reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                result.Add(new ProductDto
                {
                    Id = (int)reader["ProductId"],
                    Name = reader["ProductName"].ToString(),
                    Price = (decimal)reader["Price"],
                    Stock = (int)reader["Stock"],
                    Category = reader["Category"].ToString()
                });
            }
            return result;
        }

        public List<(int Id, string Name)> GetCategories()
        {
            var result = new List<(int, string)> { (0, "-- ทั้งหมด --") };
            using var conn = new SqlConnection(_connStr);
            using var cmd = new SqlCommand("SELECT CategoryId, CategoryName FROM Categories ORDER BY CategoryName", conn);
            conn.Open();
            using var reader = cmd.ExecuteReader();
            while (reader.Read())
                result.Add(((int)reader["CategoryId"], reader["CategoryName"].ToString()));
            return result;
        }

        public void InsertProduct(string name, decimal price, int stock, int categoryId)
        {
            string sql = "INSERT INTO Products (ProductName, Price, Stock, CategoryId) VALUES (@n,@p,@s,@c)";
            using var conn = new SqlConnection(_connStr);
            using var cmd = new SqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("@n", name);
            cmd.Parameters.AddWithValue("@p", price);
            cmd.Parameters.AddWithValue("@s", stock);
            cmd.Parameters.AddWithValue("@c", categoryId == 0 ? (object)DBNull.Value : categoryId);
            conn.Open();
            cmd.ExecuteNonQuery();
        }

        public void DeleteProduct(int productId)
        {
            using var conn = new SqlConnection(_connStr);
            using var cmd = new SqlCommand("DELETE FROM Products WHERE ProductId = @id", conn);
            cmd.Parameters.AddWithValue("@id", productId);
            conn.Open();
            cmd.ExecuteNonQuery();
        }
    }
}
```

```csharp [Form1.cs — UI Layer]
using System;
using System.Linq;
using System.Windows.Forms;

namespace ProductViewer
{
    public partial class Form1 : Form
    {
        private DatabaseService _db;
        private readonly string connStr = @"Server=.\SQLEXPRESS;Database=ShopDB;Integrated Security=true;TrustServerCertificate=true;";

        public Form1()
        {
            InitializeComponent();
            _db = new DatabaseService(connStr);
            SetupGrid();
            LoadCategories();
            LoadProducts();
        }

        private void SetupGrid()
        {
            dgvProducts.Columns.Clear();
            dgvProducts.Columns.Add(new DataGridViewTextBoxColumn { DataPropertyName = "Id", HeaderText = "รหัส", Width = 60 });
            dgvProducts.Columns.Add(new DataGridViewTextBoxColumn { DataPropertyName = "Name", HeaderText = "ชื่อสินค้า" });
            dgvProducts.Columns.Add(new DataGridViewTextBoxColumn { DataPropertyName = "Category", HeaderText = "หมวดหมู่", Width = 120 });
            dgvProducts.Columns.Add(new DataGridViewTextBoxColumn { DataPropertyName = "Price", HeaderText = "ราคา", Width = 100,
                DefaultCellStyle = new DataGridViewCellStyle { Format = "N2", Alignment = DataGridViewContentAlignment.MiddleRight } });
            dgvProducts.Columns.Add(new DataGridViewTextBoxColumn { DataPropertyName = "Stock", HeaderText = "คงเหลือ", Width = 80,
                DefaultCellStyle = new DataGridViewCellStyle { Alignment = DataGridViewContentAlignment.MiddleCenter } });
            dgvProducts.AllowUserToAddRows = false;
            dgvProducts.ReadOnly = true;
            dgvProducts.SelectionMode = DataGridViewSelectionMode.FullRowSelect;
        }

        private void LoadCategories()
        {
            cboCategory.DataSource = _db.GetCategories();
            cboCategory.DisplayMember = "Item2";
            cboCategory.ValueMember = "Item1";
        }

        private void LoadProducts()
        {
            try
            {
                int catId = cboCategory.SelectedValue is int id ? id : 0;
                var products = _db.GetProducts(txtSearch.Text.Trim(), catId);
                dgvProducts.DataSource = null;
                dgvProducts.DataSource = products;

                decimal avg = products.Count > 0 ? products.Average(p => p.Price) : 0;
                lblStats.Text = $"พบ {products.Count} รายการ | ราคาเฉลี่ย: {avg:N2}฿";
            }
            catch (Exception ex)
            {
                MessageBox.Show($"ไม่สามารถโหลดข้อมูลได้: {ex.Message}", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void btnSearch_Click(object sender, EventArgs e) => LoadProducts();
        private void cboCategory_SelectedIndexChanged(object sender, EventArgs e) => LoadProducts();

        private void btnAdd_Click(object sender, EventArgs e)
        {
            if (string.IsNullOrWhiteSpace(txtName.Text)) return;
            _db.InsertProduct(txtName.Text.Trim(), nudPrice.Value, (int)nudStock.Value,
                cboAddCategory.SelectedValue is int id ? id : 0);
            LoadProducts();
            txtName.Clear(); nudPrice.Value = 0; nudStock.Value = 0;
        }

        private void btnDelete_Click(object sender, EventArgs e)
        {
            if (dgvProducts.CurrentRow?.DataBoundItem is not ProductDto product) return;
            if (MessageBox.Show($"ลบ '{product.Name}' หรือไม่?", "ยืนยัน",
                MessageBoxButtons.YesNo, MessageBoxIcon.Warning) == DialogResult.Yes)
            {
                _db.DeleteProduct(product.Id);
                LoadProducts();
            }
        }
    }
}
```
:::

## 🔥 Challenge (โจทย์ท้าทาย!)

**โจทย์:** เพิ่มฟีเจอร์ "แจ้งเตือนสินค้าใกล้หมด" โดยเมื่อโหลดข้อมูลเสร็จ หากมีสินค้าที่ Stock < 10 ให้แสดง MessageBox รายชื่อสินค้าเหล่านั้นและไฮไลต์แถวเป็นสีแดงใน DataGridView
