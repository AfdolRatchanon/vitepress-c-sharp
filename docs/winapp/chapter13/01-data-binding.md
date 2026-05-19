# 01 - Data Binding และการดึงข้อมูลลง DataGridView

> 💡 **เป้าหมาย:** เรียนรู้วิธีดึงข้อมูลจาก Database มาแสดงผลบน DataGridView ด้วย `SqlDataAdapter` และ `DataTable` ซึ่งเป็นวิธีที่สะดวกและเขียนโค้ดสั้นกว่าการใช้ `SqlDataReader`

## 📖 ทฤษฎีและแนวคิด UI (UI Concept & Theory)

บทที่แล้วเราใช้ `SqlDataReader` อ่านข้อมูลทีละแถว (Read-only, Forward-only) เพื่อสร้าง Object ทีละอันแล้วนำไปใส่ List หรือ DataGridView วิธีนั้นมีประสิทธิภาพสูงแต่เขียนโค้ดยาว

**วิธีใหม่: Data Binding ด้วย `DataTable`**
1. สร้าง `SqlDataAdapter` พร้อมคำสั่ง `SELECT`
2. สร้าง `DataTable` ว่างๆ
3. สั่ง `adapter.Fill(dataTable)` (ตัว Adapter จะเปิด Connection, อ่านข้อมูล, ปิด Connection ให้อัตโนมัติ)
4. กำหนด `dataGridView.DataSource = dataTable`

```text
[SqlDataReader vs SqlDataAdapter]
SqlDataReader  = ดื่มน้ำจากสายยาง (อ่านเร็วมาก แต่ต้องวนลูปทำเองทีละแถว)
SqlDataAdapter = รองน้ำใส่ถัง (DataTable) ก่อนแล้วยกไปเท (ไม่ต้องวนลูปเอง)
```

---

## 🛠️ การตั้งค่า Properties (UI Setup)

| Control | Property | ค่าที่ตั้ง |
| :--- | :--- | :--- |
| `Form1` | `Text` | `"Data Binding Demo"` |
| `DataGridView` | `Name` | `dgvEmployees` |
| `DataGridView` | `DataSource` | *(กำหนดผ่านโค้ด)* |
| `DataGridView` | `AutoSizeColumnsMode` | `Fill` |
| `DataGridView` | `ReadOnly` | `true` |
| `DataGridView` | `SelectionMode` | `FullRowSelect` |
| `Button` | `Name` | `btnLoad` |
| `Button` | `Text` | `"โหลดข้อมูลพนักงาน"` |

---

## 💻 ตัวอย่างโค้ด (Code Implementation)

::: code-group
```csharp [Form1.cs]
using System;
using System.Data;
using System.Windows.Forms;
using Microsoft.Data.SqlClient;

namespace DataBindingDemo
{
    public partial class Form1 : Form
    {
        private readonly string connStr = @"Server=.\SQLEXPRESS;Database=CompanyDB;Integrated Security=true;TrustServerCertificate=true;";

        public Form1()
        {
            InitializeComponent();
        }

        private void btnLoad_Click(object sender, EventArgs e)
        {
            // [1] เขียนคำสั่ง SQL
            string sql = "SELECT EmpId AS 'รหัส', FullName AS 'ชื่อ-สกุล', Position AS 'ตำแหน่ง', Salary AS 'เงินเดือน' FROM Employees";

            try
            {
                // [2] สร้าง DataAdapter โดยส่ง SQL และ Connection String เข้าไป
                using (SqlDataAdapter adapter = new SqlDataAdapter(sql, connStr))
                {
                    // [3] สร้าง DataTable ว่างๆ
                    DataTable dt = new DataTable();

                    // [4] ใช้ Fill() เพื่อดึงข้อมูลมาใส่ DataTable
                    // (Fill จะเปิดและปิด Connection ให้อัตโนมัติ)
                    adapter.Fill(dt);

                    // [5] นำ DataTable ไปแสดงผลใน DataGridView ทันที
                    dgvEmployees.DataSource = dt;
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"เกิดข้อผิดพลาด: {ex.Message}", "Error",
                    MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
    }
}
```
:::

**Expected Output:**
```text
กดปุ่ม "โหลดข้อมูลพนักงาน"
→ ข้อมูลทั้งหมดจะปรากฏใน DataGridView ทันที
→ Header ของคอลัมน์จะเปลี่ยนตามที่ตั้ง Alias ไว้ใน SQL (เช่น 'ชื่อ-สกุล')
```

---

## 🎯 โจทย์ฝึกปฏิบัติเสริมความเข้าใจ (Mini Exercise)

**โจทย์: ค้นหาข้อมูลด้วย Data Binding**
เพิ่ม TextBox ให้ผู้ใช้พิมพ์ค้นหา "ชื่อ" หรือ "ตำแหน่ง" แล้วปรับแก้โค้ดโดยเพิ่ม Parameter ลงใน `SqlDataAdapter` เพื่อให้ค้นหาตามเงื่อนไข `LIKE` ก่อนนำไปแสดงผล

::: details 💡 คำใบ้ (Hint)
คุณไม่สามารถใส่ Parameter เข้าไปใน Constructor ของ `SqlDataAdapter` ได้โดยตรง ให้สร้าง `SqlCommand` ก่อนแบบนี้:
`SqlCommand cmd = new SqlCommand(sql, conn);`
`cmd.Parameters.AddWithValue(...);`
`SqlDataAdapter adapter = new SqlDataAdapter(cmd);`
:::

---

## 🔥 Challenge (โจทย์ท้าทาย!)

**โจทย์: จัดรูปแบบเงินเดือน**
เมื่อใช้ `DataTable` เป็น DataSource การจัดรูปแบบตัวเลขจะไม่สามารถทำได้โดยตรงบน DataGridView แบบง่ายๆ ให้คุณเขียนโค้ดที่ Event `dgvEmployees.CellFormatting` ตรวจสอบถ้ากำลังแสดงคอลัมน์ 'เงินเดือน' ให้เติม " บาท" ต่อท้าย และจัดรูปแบบคั่นหลักพัน

---

## 🗣️ ทบทวน (Review)

::: details ❓ คำถามทบทวน 1:
**คำถาม:** `SqlDataAdapter` ทำงานต่างจาก `SqlDataReader` อย่างไรในแง่ของ Connection?

**แนวคำตอบ:** `SqlDataReader` เราต้องสั่ง `conn.Open()` เอง และเมื่ออ่านเสร็จต้องสั่ง `conn.Close()` เองเสมอ แต่ `SqlDataAdapter.Fill()` จะตรวจสอบถ้า Connection ปิดอยู่ มันจะเปิดให้ ดึงข้อมูล แล้วก็ปิดให้เราโดยอัตโนมัติ (แต่ถ้าเราเปิดค้างไว้ก่อนเรียก Fill มันก็จะไม่ปิดให้)
:::

::: details ❓ คำถามทบทวน 2:
**คำถาม:** ข้อเสียของการใช้ DataTable Binding เทียบกับการทำ Object Mapping (`List<T>`) คืออะไร?

**แนวคำตอบ:** `DataTable` เป็น Weakly Typed (ไม่รู้ว่าแต่ละคอลัมน์เป็นประเภทข้อมูลอะไรล่วงหน้า) การเข้าถึงค่าต้องทำผ่าน string index เช่น `row["Salary"]` ทำให้มีโอกาสสะกดชื่อผิดตอนรันไทม์ ขณะที่ Object Mapping จะมี Compile-time checking ชัดเจน เช่น `employee.Salary`
:::
