# 💻 Lab: สร้างระบบจัดการสินค้าคงคลัง CRUD

> 💡 **เป้าหมาย:** สังเคราะห์ความรู้เรื่อง Data Binding และ CRUD Operations เพื่อสร้างระบบจัดการสินค้าคงคลัง (Inventory System) เต็มรูปแบบ โดยแยกชั้นของฐานข้อมูล (Repository Layer) กับ UI ออกจากกันเพื่อความเป็นมืออาชีพ

## 📖 ภาพรวมของโปรแกรม

```text
[Wireframe: Inventory System]
+----------------------------------------------------------+
| 🗔 ระบบคลังสินค้า                                 _ □ X  |
+----------------------------------------------------------+
|  ค้นหา: [txtSearch      ] [🔍 ค้นหา]                      |
|                                                          |
|  ┌─ ข้อมูลสินค้า ─────────────────────────────────────┐  |
|  │ รหัส: [txtId   ] (อ่านอย่างเดียว)                       │  |
|  │ ชื่อ: [txtName                        ]            │  |
|  │ ราคา: [nudPrice] ฿    จำนวน: [nudStock] ชิ้น       │  |
|  │ [ + เพิ่มใหม่ ] [ 💾 บันทึกแก้ไข ] [ 🗑️ ลบ ] [ ✖ ล้าง ] │  |
|  └──────────────────────────────────────────────────────┘ |
|                                                          |
|  [ DataGridView แสดงรายการสินค้าทั้งหมด ]                     |
|                                                          |
+----------------------------------------------------------+
```

## ⏱️ เวลาที่ใช้: 90 นาที

## 📝 ขั้นตอนการทำงาน

::: code-group
```csharp [ProductRepository.cs — Layer เชื่อมต่อ DB]
using System;
using System.Data;
using Microsoft.Data.SqlClient;

namespace InventoryApp
{
    // สร้าง Class รับส่งข้อมูล (DTO)
    public class Product
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public decimal Price { get; set; }
        public int Stock { get; set; }
    }

    public class ProductRepository
    {
        private readonly string _connStr;
        public ProductRepository(string connStr) => _connStr = connStr;

        // READ: ดึงข้อมูลเป็น DataTable (สำหรับ Binding)
        public DataTable GetAllProducts(string searchKeyword = "")
        {
            DataTable dt = new DataTable();
            string sql = "SELECT ProductId, ProductName, Price, Stock FROM Products";
            
            if (!string.IsNullOrEmpty(searchKeyword))
                sql += " WHERE ProductName LIKE @kw";

            using (SqlConnection conn = new SqlConnection(_connStr))
            using (SqlCommand cmd = new SqlCommand(sql, conn))
            {
                if (!string.IsNullOrEmpty(searchKeyword))
                    cmd.Parameters.AddWithValue("@kw", $"%{searchKeyword}%");

                using (SqlDataAdapter adapter = new SqlDataAdapter(cmd))
                {
                    adapter.Fill(dt);
                }
            }
            return dt;
        }

        // CREATE
        public void AddProduct(Product p)
        {
            string sql = "INSERT INTO Products (ProductName, Price, Stock) VALUES (@name, @price, @stock)";
            ExecuteNonQuery(sql, cmd =>
            {
                cmd.Parameters.AddWithValue("@name", p.ProductName);
                cmd.Parameters.AddWithValue("@price", p.Price);
                cmd.Parameters.AddWithValue("@stock", p.Stock);
            });
        }

        // UPDATE
        public void UpdateProduct(Product p)
        {
            string sql = "UPDATE Products SET ProductName=@name, Price=@price, Stock=@stock WHERE ProductId=@id";
            ExecuteNonQuery(sql, cmd =>
            {
                cmd.Parameters.AddWithValue("@name", p.ProductName);
                cmd.Parameters.AddWithValue("@price", p.Price);
                cmd.Parameters.AddWithValue("@stock", p.Stock);
                cmd.Parameters.AddWithValue("@id", p.ProductId);
            });
        }

        // DELETE
        public void DeleteProduct(int id)
        {
            string sql = "DELETE FROM Products WHERE ProductId=@id";
            ExecuteNonQuery(sql, cmd => cmd.Parameters.AddWithValue("@id", id));
        }

        private void ExecuteNonQuery(string sql, Action<SqlCommand> addParams)
        {
            using (SqlConnection conn = new SqlConnection(_connStr))
            using (SqlCommand cmd = new SqlCommand(sql, conn))
            {
                addParams(cmd);
                conn.Open();
                cmd.ExecuteNonQuery();
            }
        }
    }
}
```

```csharp [Form1.cs — UI Layer]
using System;
using System.Windows.Forms;

namespace InventoryApp
{
    public partial class Form1 : Form
    {
        private readonly ProductRepository _repo;
        private int _currentEditId = 0;

        public Form1()
        {
            InitializeComponent();
            _repo = new ProductRepository(@"Server=.\SQLEXPRESS;Database=ShopDB;Integrated Security=true;TrustServerCertificate=true;");
            
            SetupGrid();
            RefreshGrid();
        }

        private void SetupGrid()
        {
            dgvProducts.AutoGenerateColumns = false; // ปิดการสร้างคอลัมน์อัตโนมัติ เพื่อจัดรูปแบบเอง
            dgvProducts.Columns.Clear();
            dgvProducts.Columns.Add(new DataGridViewTextBoxColumn { DataPropertyName="ProductId", HeaderText="รหัส", Width=60 });
            dgvProducts.Columns.Add(new DataGridViewTextBoxColumn { DataPropertyName="ProductName", HeaderText="ชื่อสินค้า", AutoSizeMode=DataGridViewAutoSizeColumnMode.Fill });
            dgvProducts.Columns.Add(new DataGridViewTextBoxColumn { DataPropertyName="Price", HeaderText="ราคา", DefaultCellStyle = new DataGridViewCellStyle { Format = "N2", Alignment = DataGridViewContentAlignment.MiddleRight } });
            dgvProducts.Columns.Add(new DataGridViewTextBoxColumn { DataPropertyName="Stock", HeaderText="จำนวน", DefaultCellStyle = new DataGridViewCellStyle { Alignment = DataGridViewContentAlignment.MiddleCenter } });
        }

        private void RefreshGrid()
        {
            dgvProducts.DataSource = _repo.GetAllProducts(txtSearch.Text.Trim());
            ClearForm();
        }

        private void btnSearch_Click(object sender, EventArgs e) => RefreshGrid();

        private void dgvProducts_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            if (e.RowIndex < 0) return;
            DataGridViewRow row = dgvProducts.Rows[e.RowIndex];

            _currentEditId = Convert.ToInt32(row.Cells[0].Value);
            txtId.Text = _currentEditId.ToString();
            txtName.Text = row.Cells[1].Value.ToString();
            nudPrice.Value = Convert.ToDecimal(row.Cells[2].Value);
            nudStock.Value = Convert.ToInt32(row.Cells[3].Value);

            btnAdd.Enabled = false;
            btnUpdate.Enabled = true;
            btnDelete.Enabled = true;
        }

        private void btnAdd_Click(object sender, EventArgs e)
        {
            if (string.IsNullOrWhiteSpace(txtName.Text)) return;
            
            _repo.AddProduct(new Product 
            { 
                ProductName = txtName.Text.Trim(),
                Price = nudPrice.Value,
                Stock = (int)nudStock.Value
            });
            RefreshGrid();
        }

        private void btnUpdate_Click(object sender, EventArgs e)
        {
            if (_currentEditId == 0 || string.IsNullOrWhiteSpace(txtName.Text)) return;

            _repo.UpdateProduct(new Product
            {
                ProductId = _currentEditId,
                ProductName = txtName.Text.Trim(),
                Price = nudPrice.Value,
                Stock = (int)nudStock.Value
            });
            RefreshGrid();
        }

        private void btnDelete_Click(object sender, EventArgs e)
        {
            if (_currentEditId == 0) return;
            if (MessageBox.Show("ยืนยันการลบ?", "ลบข้อมูล", MessageBoxButtons.YesNo) == DialogResult.Yes)
            {
                _repo.DeleteProduct(_currentEditId);
                RefreshGrid();
            }
        }

        private void btnClear_Click(object sender, EventArgs e) => ClearForm();

        private void ClearForm()
        {
            _currentEditId = 0;
            txtId.Clear();
            txtName.Clear();
            nudPrice.Value = 0;
            nudStock.Value = 0;
            btnAdd.Enabled = true;
            btnUpdate.Enabled = false;
            btnDelete.Enabled = false;
            txtSearch.Focus();
        }
    }
}
```
:::

## 🔥 Challenge (โจทย์ท้าทาย!)

**โจทย์:** สร้างหน้าจอ Popup ใหม่ชื่อ `CategoryManagerForm` เพื่อจัดการข้อมูลหมวดหมู่ (CRUD หมวดหมู่) และเพิ่มเมนูใน Form หลักเพื่อเปิดหน้าจอนี้ (ทำเหมือนระบบ Back-office ที่จัดการ Master Data ได้ครบวงจร)
