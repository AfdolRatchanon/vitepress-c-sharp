# 01 - DataGridView: ตารางข้อมูลขั้นสูง

> 💡 **เป้าหมาย:** เรียนรู้การใช้ DataGridView แสดงข้อมูลแบบตาราง, การตั้งค่า Column, การเลือกแถว, การเพิ่ม/ลบ/แก้ไขข้อมูลผ่าน DataGridView และการ Bind ข้อมูลจาก List ได้อย่างคล่องแคล่ว

## 📖 ทฤษฎีและแนวคิด UI (UI Concept & Theory)

**DataGridView** คือ Control ที่ทรงพลังที่สุดใน WinForms สำหรับแสดงข้อมูลแบบตาราง (Spreadsheet Style) เหมาะสำหรับแสดงรายการสินค้า, รายชื่อนักเรียน, ประวัติการทำรายการ ฯลฯ

```text
[DataGridView Layout]
+----------------------------------------------------------+
|  รหัส  |  ชื่อสินค้า        |  ราคา    |  จำนวน  |      |
+----------------------------------------------------------+
|  001   |  กาแฟดำ           |  35.00   |  100    |  [×] |
|  002   |  ลาเต้             |  55.00   |  85     |  [×] |
|  003   |  ชาเขียว          |  45.00   |  200    |  [×] |
+----------------------------------------------------------+
```

### 🔑 DataGridView Properties สำคัญ

| Property | การทำงาน | ค่าแนะนำ |
| :--- | :--- | :--- |
| `AllowUserToAddRows` | อนุญาตให้ผู้ใช้เพิ่มแถวเองใน Grid | `false` (ควบคุมผ่านโค้ดแทน) |
| `AllowUserToDeleteRows` | อนุญาตให้ผู้ใช้ลบแถวใน Grid | `false` |
| `ReadOnly` | ป้องกันการแก้ไขข้อมูลใน Grid | `true` |
| `SelectionMode` | โหมดการเลือก | `FullRowSelect` |
| `MultiSelect` | เลือกหลายแถวพร้อมกัน | `false` |
| `RowHeadersVisible` | แสดงหัวแถวด้านซ้าย | `false` |
| `AutoSizeColumnsMode` | ปรับความกว้าง Column อัตโนมัติ | `Fill` |
| `AlternatingRowsDefaultCellStyle` | สีแถวสลับ | ตั้งสีใน Properties |

---

## 🛠️ การตั้งค่า Properties (UI Setup)

| Control | Property | ค่าที่ตั้ง |
| :--- | :--- | :--- |
| `Form1` | `Text` | `"รายการสินค้า"` |
| `Form1` | `Size` | `800, 500` |
| `DataGridView` | `Name` | `dgvProducts` |
| `DataGridView` | `Dock` | `Fill` |
| `DataGridView` | `AllowUserToAddRows` | `false` |
| `DataGridView` | `AllowUserToDeleteRows` | `false` |
| `DataGridView` | `ReadOnly` | `true` |
| `DataGridView` | `SelectionMode` | `FullRowSelect` |
| `DataGridView` | `MultiSelect` | `false` |
| `DataGridView` | `RowHeadersVisible` | `false` |
| `DataGridView` | `AutoSizeColumnsMode` | `Fill` |
| `Panel` (ด้านล่าง) | `Dock` | `Bottom` |
| `Panel` | `Height` | `50` |
| `Button` (เพิ่ม) | `Name` | `btnAdd` |
| `Button` (เพิ่ม) | `Text` | `"เพิ่ม"` |
| `Button` (แก้ไข) | `Name` | `btnEdit` |
| `Button` (แก้ไข) | `Text` | `"แก้ไข"` |
| `Button` (ลบ) | `Name` | `btnDelete` |
| `Button` (ลบ) | `Text` | `"ลบ"` |

---

## 💻 ตัวอย่างโค้ด (Code Implementation)

::: code-group
```csharp [Form1.cs]
using System;
using System.Collections.Generic;
using System.Windows.Forms;

namespace ProductList
{
    // [1] สร้าง Model Class แยกต่างหาก (ไม่เขียนทุกอย่างใน Form)
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int Stock { get; set; }
    }

    public partial class Form1 : Form
    {
        // [2] เก็บข้อมูลใน List
        private List<Product> products = new List<Product>();

        public Form1()
        {
            InitializeComponent();
            SetupGrid();
            LoadSampleData();
        }

        private void SetupGrid()
        {
            // [3] กำหนด Column ด้วยโค้ด (แนะนำแทนการใช้ Designer)
            dgvProducts.Columns.Clear();
            dgvProducts.Columns.Add(new DataGridViewTextBoxColumn
            {
                Name = "colId",
                HeaderText = "รหัส",
                DataPropertyName = "Id",
                Width = 60
            });
            dgvProducts.Columns.Add(new DataGridViewTextBoxColumn
            {
                Name = "colName",
                HeaderText = "ชื่อสินค้า",
                DataPropertyName = "Name"
            });
            dgvProducts.Columns.Add(new DataGridViewTextBoxColumn
            {
                Name = "colPrice",
                HeaderText = "ราคา (บาท)",
                DataPropertyName = "Price",
                DefaultCellStyle = new DataGridViewCellStyle
                {
                    Format = "N2",
                    Alignment = DataGridViewContentAlignment.MiddleRight
                },
                Width = 100
            });
            dgvProducts.Columns.Add(new DataGridViewTextBoxColumn
            {
                Name = "colStock",
                HeaderText = "คงเหลือ",
                DataPropertyName = "Stock",
                DefaultCellStyle = new DataGridViewCellStyle
                {
                    Alignment = DataGridViewContentAlignment.MiddleCenter
                },
                Width = 80
            });

            // [4] ตั้งค่าสีแถวสลับ
            dgvProducts.AlternatingRowsDefaultCellStyle.BackColor =
                System.Drawing.Color.AliceBlue;
        }

        private void LoadSampleData()
        {
            products = new List<Product>
            {
                new Product { Id=1, Name="กาแฟดำ", Price=35, Stock=100 },
                new Product { Id=2, Name="ลาเต้", Price=55, Stock=85 },
                new Product { Id=3, Name="ชาเขียว", Price=45, Stock=200 },
                new Product { Id=4, Name="เค้ก", Price=65, Stock=50 },
            };
            RefreshGrid();
        }

        private void RefreshGrid()
        {
            // [5] Bind List เข้า DataGridView ผ่าน DataSource
            dgvProducts.DataSource = null;
            dgvProducts.DataSource = products;
        }

        private Product GetSelectedProduct()
        {
            if (dgvProducts.CurrentRow == null) return null;
            int index = dgvProducts.CurrentRow.Index;
            if (index < 0 || index >= products.Count) return null;
            return products[index];
        }

        private void btnAdd_Click(object sender, EventArgs e)
        {
            // เปิดฟอร์มเพิ่มสินค้า (ดูบทที่ 8 เรื่องส่งข้อมูลระหว่างฟอร์ม)
            MessageBox.Show("เปิดฟอร์มเพิ่มสินค้า...", "เพิ่มสินค้า");
        }

        private void btnDelete_Click(object sender, EventArgs e)
        {
            Product selected = GetSelectedProduct();
            if (selected == null)
            {
                MessageBox.Show("กรุณาเลือกสินค้าก่อน!", "แจ้งเตือน",
                    MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            // [6] ยืนยันก่อนลบ
            DialogResult confirm = MessageBox.Show(
                $"ต้องการลบ '{selected.Name}' หรือไม่?",
                "ยืนยันการลบ", MessageBoxButtons.YesNo, MessageBoxIcon.Warning);

            if (confirm == DialogResult.Yes)
            {
                products.Remove(selected);
                RefreshGrid();
            }
        }

        // [7] Event เมื่อคลิกที่แถว
        private void dgvProducts_SelectionChanged(object sender, EventArgs e)
        {
            Product selected = GetSelectedProduct();
            if (selected != null)
                lblSelected.Text = $"เลือก: {selected.Name} ราคา {selected.Price:N2} บาท";
        }

        // [8] Event เมื่อดับเบิลคลิกที่แถว (เปิดฟอร์มแก้ไข)
        private void dgvProducts_CellDoubleClick(object sender, DataGridViewCellEventArgs e)
        {
            if (e.RowIndex < 0) return; // คลิกที่ Header Row → ไม่ทำอะไร
            Product selected = products[e.RowIndex];
            MessageBox.Show($"แก้ไขสินค้า: {selected.Name}", "แก้ไข");
        }
    }
}
```
:::

**Expected Output:**
```text
DataGridView แสดง 4 แถว สลับสีฟ้า/ขาว
คอลัมน์ราคาชิดขวา, รหัสชิดซ้าย
กด "ลบ" เมื่อเลือกแถว → Confirm Dialog → ลบแถวออก
ดับเบิลคลิกแถว → MessageBox แสดงชื่อสินค้า
```

---

## 🎯 โจทย์ฝึกปฏิบัติเสริมความเข้าใจ (Mini Exercise)

**โจทย์ที่ 1: ค้นหาข้อมูลใน DataGridView**
เพิ่ม TextBox ค้นหาและปุ่ม "ค้นหา" ที่กรองข้อมูลใน List ตามชื่อสินค้า แล้ว Refresh DataGridView โดยแสดงเฉพาะแถวที่ตรงกัน

**โจทย์ที่ 2: เรียงลำดับข้อมูล**
เพิ่ม ComboBox เลือกเรียงตาม: ชื่อ (A-Z), ราคา (น้อย-มาก), จำนวน (มาก-น้อย) แล้วใช้ LINQ `.OrderBy()` จัดเรียง List ก่อน Refresh Grid

::: details 💡 คำใบ้ (Hint)
`products.OrderBy(p => p.Name).ToList()` และ `products.OrderByDescending(p => p.Stock).ToList()`
:::

---

## 🔥 Challenge (โจทย์ท้าทาย!)

**โจทย์: Column ปุ่ม Delete ใน DataGridView**
แทนที่ปุ่ม "ลบ" ด้านล่าง ให้เพิ่ม `DataGridViewButtonColumn` ตรงในตาราง (คอลัมน์ปุ่ม "ลบ" ในทุกแถว) เมื่อคลิกปุ่มในแถวนั้น ให้ลบสินค้านั้นออก

---

## 🗣️ ทบทวน (Review)

::: details ❓ คำถามทบทวน 1:
**คำถาม:** ทำไมต้อง `dgvProducts.DataSource = null` ก่อนตั้ง DataSource ใหม่?

**แนวคำตอบ:** เพื่อ Force DataGridView ให้ Refresh ข้อมูลใหม่ทั้งหมด ถ้าตั้งเป็น List เดิมซ้ำโดยตรง DataGridView บางกรณีจะไม่ตรวจพบว่าข้อมูลเปลี่ยน การ Set เป็น null ก่อน แล้วค่อย Set ค่าใหม่ บังคับให้ Rebind เสมอ
:::

::: details ❓ คำถามทบทวน 2:
**คำถาม:** `SelectionMode = FullRowSelect` ดีกว่า Default อย่างไร?

**แนวคำตอบ:** Default คือ `CellSelect` ที่เลือกแค่ช่องเดียว ทำให้ผู้ใช้ต้องคลิกตรงๆ ที่ Cell เพื่อเลือก `FullRowSelect` ทำให้การคลิกที่ใดก็ตามในแถวนั้นเลือกทั้งแถว ซึ่งใช้งานง่ายกว่าและเป็น UX ที่ดีกว่าสำหรับระบบจัดการข้อมูล
:::
