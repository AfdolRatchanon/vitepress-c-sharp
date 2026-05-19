# 💻 Lab: สร้างระบบจัดการรายชื่อนักเรียน

> 💡 **เป้าหมาย:** สร้างระบบจัดการนักเรียนที่ใช้ DataGridView แสดงข้อมูล, ErrorProvider ตรวจสอบข้อมูล และ TreeView แสดงโครงสร้างห้องเรียน

## 📖 ภาพรวมของโปรแกรม

```text
[Wireframe: Student Manager]
+----------------------------------------------------------+
| 🗔 ระบบจัดการนักเรียน                           _ □ X  |
+----------------------------------------------------------+
| ┌─ ห้องเรียน ──────┐  ┌─ รายชื่อนักเรียน ────────────┐ |
| │ 📁 ชั้น ม.1       │  │ รหัส | ชื่อ | คะแนน | เกรด  │ |
| │  ├ ม.1/1          │  │ 001  | ...  | 85    | A     │ |
| │  ├ ม.1/2          │  │ 002  | ...  | 72    | B     │ |
| │ 📁 ชั้น ม.2       │  └────────────────────────────────┘ |
| │  ├ ม.2/1          │                                    |
| └────────────────────┘  [ เพิ่ม ] [ แก้ไข ] [ ลบ ]     |
+----------------------------------------------------------+
| ┌─ ฟอร์มกรอกข้อมูล ──────────────────────────────────┐  |
| │ รหัส: [txt] ⚠️  ชื่อ: [txt] ⚠️  คะแนน: [num]    │  |
| └────────────────────────────────────────────────────────┘ |
+----------------------------------------------------------+
```

## ⏱️ เวลาที่ใช้: 90 นาที

## 📝 ขั้นตอนการทำงาน

::: code-group
```csharp [Form1.cs — โค้ดสมบูรณ์]
using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows.Forms;

namespace StudentManager
{
    public class Student
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public int Score { get; set; }
        public string Grade => Score >= 80 ? "A" : Score >= 70 ? "B" :
                               Score >= 60 ? "C" : Score >= 50 ? "D" : "F";
        public string Room { get; set; }
    }

    public partial class Form1 : Form
    {
        private List<Student> students = new List<Student>();
        private string selectedRoom = "";

        public Form1()
        {
            InitializeComponent();
            SetupGrid();
            SetupTree();
            LoadSampleData();
        }

        private void SetupGrid()
        {
            dgvStudents.Columns.Clear();
            dgvStudents.Columns.Add(new DataGridViewTextBoxColumn { Name="colId", HeaderText="รหัส", DataPropertyName="Id", Width=70 });
            dgvStudents.Columns.Add(new DataGridViewTextBoxColumn { Name="colName", HeaderText="ชื่อ-นามสกุล", DataPropertyName="Name" });
            dgvStudents.Columns.Add(new DataGridViewTextBoxColumn { Name="colScore", HeaderText="คะแนน", DataPropertyName="Score", Width=80,
                DefaultCellStyle = new DataGridViewCellStyle { Alignment = DataGridViewContentAlignment.MiddleCenter }});
            dgvStudents.Columns.Add(new DataGridViewTextBoxColumn { Name="colGrade", HeaderText="เกรด", DataPropertyName="Grade", Width=60,
                DefaultCellStyle = new DataGridViewCellStyle { Alignment = DataGridViewContentAlignment.MiddleCenter }});
            dgvStudents.AllowUserToAddRows = false;
            dgvStudents.ReadOnly = true;
            dgvStudents.SelectionMode = DataGridViewSelectionMode.FullRowSelect;
            dgvStudents.AlternatingRowsDefaultCellStyle.BackColor = System.Drawing.Color.AliceBlue;
        }

        private void SetupTree()
        {
            tvRooms.Nodes.Clear();
            var m1 = new TreeNode("📚 ชั้น ม.1");
            m1.Nodes.Add(new TreeNode("ม.1/1") { Tag = "ม.1/1" });
            m1.Nodes.Add(new TreeNode("ม.1/2") { Tag = "ม.1/2" });
            var m2 = new TreeNode("📚 ชั้น ม.2");
            m2.Nodes.Add(new TreeNode("ม.2/1") { Tag = "ม.2/1" });
            m2.Nodes.Add(new TreeNode("ม.2/2") { Tag = "ม.2/2" });
            tvRooms.Nodes.Add(m1);
            tvRooms.Nodes.Add(m2);
            tvRooms.ExpandAll();
        }

        private void LoadSampleData()
        {
            students = new List<Student>
            {
                new Student { Id="001", Name="สมชาย ใจดี", Score=85, Room="ม.1/1" },
                new Student { Id="002", Name="วิชัย รักดี", Score=72, Room="ม.1/1" },
                new Student { Id="003", Name="สุดา สวยงาม", Score=58, Room="ม.1/2" },
                new Student { Id="004", Name="มานะ พยายาม", Score=91, Room="ม.2/1" },
            };
            RefreshGrid();
        }

        private void RefreshGrid()
        {
            var filtered = string.IsNullOrEmpty(selectedRoom)
                ? students
                : students.Where(s => s.Room == selectedRoom).ToList();
            dgvStudents.DataSource = null;
            dgvStudents.DataSource = filtered;
            lblCount.Text = $"จำนวน: {filtered.Count} คน";
        }

        private void tvRooms_AfterSelect(object sender, TreeViewEventArgs e)
        {
            selectedRoom = e.Node.Tag?.ToString() ?? "";
            lblRoom.Text = selectedRoom == "" ? "ทั้งหมด" : $"ห้อง {selectedRoom}";
            RefreshGrid();
        }

        private bool ValidateInput()
        {
            errValidator.Clear();
            bool ok = true;
            if (string.IsNullOrWhiteSpace(txtId.Text))
            { errValidator.SetError(txtId, "กรุณากรอกรหัส"); ok = false; }
            if (string.IsNullOrWhiteSpace(txtStudentName.Text))
            { errValidator.SetError(txtStudentName, "กรุณากรอกชื่อ"); ok = false; }
            int score = (int)nudScore.Value;
            if (score < 0 || score > 100)
            { errValidator.SetError(nudScore, "คะแนน 0-100"); ok = false; }
            return ok;
        }

        private void btnAdd_Click(object sender, EventArgs e)
        {
            if (!ValidateInput()) return;
            if (students.Any(s => s.Id == txtId.Text.Trim()))
            { errValidator.SetError(txtId, "รหัสซ้ำ!"); return; }

            students.Add(new Student
            {
                Id = txtId.Text.Trim(),
                Name = txtStudentName.Text.Trim(),
                Score = (int)nudScore.Value,
                Room = cboRoom.Text
            });
            RefreshGrid();
            ClearForm();
        }

        private void btnDelete_Click(object sender, EventArgs e)
        {
            if (dgvStudents.CurrentRow == null) return;
            var id = dgvStudents.CurrentRow.Cells["colId"].Value?.ToString();
            var student = students.FirstOrDefault(s => s.Id == id);
            if (student == null) return;

            if (MessageBox.Show($"ลบนักเรียน '{student.Name}' หรือไม่?", "ยืนยัน",
                MessageBoxButtons.YesNo, MessageBoxIcon.Warning) == DialogResult.Yes)
            {
                students.Remove(student);
                RefreshGrid();
            }
        }

        private void ClearForm()
        {
            txtId.Clear(); txtStudentName.Clear(); nudScore.Value = 0;
            errValidator.Clear(); txtId.Focus();
        }
    }
}
```
:::

## 🔥 Challenge (โจทย์ท้าทาย!)

**โจทย์:** เพิ่มฟีเจอร์ค้นหาชื่อนักเรียน (TextBox + ปุ่ม "ค้นหา") และแสดงสถิติของห้องที่เลือก เช่น คะแนนเฉลี่ย, คะแนนสูงสุด, คะแนนต่ำสุด ใน Label ด้านล่าง
