# 02 - CRUD Operations: เพิ่ม-แก้ไข-ลบข้อมูล

> 💡 **เป้าหมาย:** เรียนรู้การประยุกต์ใช้ทั้ง `SELECT` (ผ่าน DataAdapter), `INSERT`, `UPDATE`, และ `DELETE` เพื่อสร้างหน้าจอจัดการข้อมูล (CRUD Form) ฉบับสมบูรณ์ที่สามารถโต้ตอบกับ DataGridView ได้

## 📖 ทฤษฎีและแนวคิด UI (UI Concept & Theory)

**CRUD** เป็นหัวใจสำคัญของโปรแกรมระบบฐานข้อมูล ประกอบด้วย:
- **C**reate (`INSERT`): เพิ่มข้อมูลใหม่
- **R**ead (`SELECT`): อ่านและแสดงข้อมูล
- **U**pdate (`UPDATE`): แก้ไขข้อมูลที่มีอยู่
- **D**elete (`DELETE`): ลบข้อมูลทิ้ง

```text
[Flow การทำงานแบบ CRUD ใน WinForms]
  1. เปิด Form → (Read) โหลดข้อมูลใส่ DataGridView
  2. ผู้ใช้พิมพ์ข้อมูลใหม่ + กด "เพิ่ม" → (Create) INSERT ลง DB → (Read) รีเฟรช Grid
  3. ผู้ใช้คลิกเลือกแถวใน Grid → โหลดข้อมูลนั้นลงใน TextBox
  4. ผู้ใช้แก้ข้อมูล + กด "บันทึกแก้ไข" → (Update) UPDATE ลง DB → (Read) รีเฟรช Grid
  5. ผู้ใช้กด "ลบ" → ยืนยัน → (Delete) DELETE ลง DB → (Read) รีเฟรช Grid
```

---

## 💻 ตัวอย่างโค้ด (Code Implementation)

ในตัวอย่างนี้ เราจะสร้างหน้าจอจัดการข้อมูล "พนักงาน" โดยมี TextBox ให้กรอกข้อมูล และปุ่ม 3 ปุ่ม: เพิ่ม, บันทึกแก้ไข, และลบ

::: code-group
```csharp [Form1.cs — CRUD Form สมบูรณ์]
using System;
using System.Data;
using System.Windows.Forms;
using Microsoft.Data.SqlClient;

namespace CrudDemo
{
    public partial class Form1 : Form
    {
        private readonly string connStr = @"Server=.\SQLEXPRESS;Database=CompanyDB;Integrated Security=true;TrustServerCertificate=true;";
        private int currentEditId = 0; // เก็บ ID ที่กำลังแก้ไข (0 = กำลังเพิ่มใหม่)

        public Form1()
        {
            InitializeComponent();
            LoadData(); // (Read) ทำงานตอนเปิดหน้าจอ
        }

        // ====== READ ======
        private void LoadData()
        {
            string sql = "SELECT EmpId, FullName, Position FROM Employees ORDER BY EmpId";
            using (SqlDataAdapter adapter = new SqlDataAdapter(sql, connStr))
            {
                DataTable dt = new DataTable();
                adapter.Fill(dt);
                dgvEmployees.DataSource = dt;
            }
            ClearForm();
        }

        // ====== CREATE ======
        private void btnAdd_Click(object sender, EventArgs e)
        {
            if (string.IsNullOrWhiteSpace(txtName.Text)) return;

            string sql = "INSERT INTO Employees (FullName, Position) VALUES (@name, @pos)";
            ExecuteQuery(sql, cmd =>
            {
                cmd.Parameters.AddWithValue("@name", txtName.Text.Trim());
                cmd.Parameters.AddWithValue("@pos", txtPosition.Text.Trim());
            });

            MessageBox.Show("เพิ่มพนักงานใหม่แล้ว", "สำเร็จ", MessageBoxButtons.OK, MessageBoxIcon.Information);
            LoadData(); // รีเฟรชข้อมูล
        }

        // ====== เลือกรหัสที่จะแก้ไข ======
        private void dgvEmployees_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            if (e.RowIndex < 0) return; // คลิกโดน Header
            
            DataGridViewRow row = dgvEmployees.Rows[e.RowIndex];
            currentEditId = Convert.ToInt32(row.Cells["EmpId"].Value);
            txtName.Text = row.Cells["FullName"].Value.ToString();
            txtPosition.Text = row.Cells["Position"].Value.ToString();
            
            btnAdd.Enabled = false; // ปิดปุ่มเพิ่ม เปิดปุ่มบันทึก
            btnUpdate.Enabled = true;
            btnDelete.Enabled = true;
        }

        // ====== UPDATE ======
        private void btnUpdate_Click(object sender, EventArgs e)
        {
            if (currentEditId == 0 || string.IsNullOrWhiteSpace(txtName.Text)) return;

            string sql = "UPDATE Employees SET FullName = @name, Position = @pos WHERE EmpId = @id";
            ExecuteQuery(sql, cmd =>
            {
                cmd.Parameters.AddWithValue("@name", txtName.Text.Trim());
                cmd.Parameters.AddWithValue("@pos", txtPosition.Text.Trim());
                cmd.Parameters.AddWithValue("@id", currentEditId);
            });

            MessageBox.Show("อัปเดตข้อมูลสำเร็จ", "สำเร็จ", MessageBoxButtons.OK, MessageBoxIcon.Information);
            LoadData();
        }

        // ====== DELETE ======
        private void btnDelete_Click(object sender, EventArgs e)
        {
            if (currentEditId == 0) return;

            if (MessageBox.Show("ต้องการลบข้อมูลพนักงานคนนี้หรือไม่?", "ยืนยันการลบ",
                MessageBoxButtons.YesNo, MessageBoxIcon.Warning) == DialogResult.Yes)
            {
                string sql = "DELETE FROM Employees WHERE EmpId = @id";
                ExecuteQuery(sql, cmd =>
                {
                    cmd.Parameters.AddWithValue("@id", currentEditId);
                });

                LoadData();
            }
        }

        // ฟังก์ชันล้างฟอร์ม
        private void btnClear_Click(object sender, EventArgs e) => ClearForm();
        
        private void ClearForm()
        {
            currentEditId = 0;
            txtName.Clear();
            txtPosition.Clear();
            btnAdd.Enabled = true;
            btnUpdate.Enabled = false;
            btnDelete.Enabled = false;
        }

        // ====== Helper Method สำหรับลดความซ้ำซ้อนของโค้ด ======
        private void ExecuteQuery(string sql, Action<SqlCommand> addParams)
        {
            using (SqlConnection conn = new SqlConnection(connStr))
            using (SqlCommand cmd = new SqlCommand(sql, conn))
            {
                addParams(cmd); // ใส่ Parameters ตามที่ส่งเข้ามาแบบ Lambda
                conn.Open();
                cmd.ExecuteNonQuery();
            }
        }
    }
}
```
:::

---

## 🎯 โจทย์ฝึกปฏิบัติเสริมความเข้าใจ (Mini Exercise)

**โจทย์: เพิ่มฟิลด์ "เงินเดือน"**
ขยายโค้ดจากตัวอย่างโดยเพิ่มช่องรับ "เงินเดือน" (`NumericUpDown`) และปรับปรุงคำสั่ง INSERT และ UPDATE ให้บันทึกข้อมูลเงินเดือนลงฐานข้อมูลด้วย

---

## 🔥 Challenge (โจทย์ท้าทาย!)

**โจทย์: สร้าง Class Database Layer**
การเขียน SQL ปะปนอยู่ในโค้ด UI (Code-Behind) ทำให้โค้ดยุ่งเหยิง ให้แยกฟังก์ชัน Database ทั้งหมด (GetEmployees, AddEmployee, UpdateEmployee, DeleteEmployee) ออกไปอยู่ในคลาสใหม่ชื่อ `EmployeeRepository.cs` เพื่อแยกชั้น (Layered Architecture) อย่างเหมาะสม
