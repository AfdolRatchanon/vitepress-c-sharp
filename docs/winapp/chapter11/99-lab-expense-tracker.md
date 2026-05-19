# 💻 Lab: สร้าง Expense Tracker (บันทึกรายจ่าย)

> 💡 **เป้าหมาย:** สร้างโปรแกรมบันทึกรายรับ-รายจ่ายที่บันทึกข้อมูลลง JSON อัตโนมัติ และโหลดข้อมูลกลับเมื่อเปิดโปรแกรมใหม่

## 📖 ภาพรวมของโปรแกรม

```text
[Wireframe: Expense Tracker]
+----------------------------------------------------------+
| 🗔 บันทึกรายรับ-รายจ่าย                         _ □ X  |
+----------------------------------------------------------+
|  วันที่: [📅 dtpDate] ประเภท: [▼ cboType]               |
|  รายการ: [txtDesc            ] จำนวน: [▲100▼]          |
|  [ + เพิ่มรายการ ]           [ ลบรายการที่เลือก ]       |
+----------------------------------------------------------+
|  รหัส | วันที่    | ประเภท | รายการ     | จำนวน (฿)    |
|  001  | 18/5/25  | รายจ่าย| ค่าอาหาร  | -120.00      |
|  002  | 18/5/25  | รายรับ | เงินเดือน  | +30,000.00  |
+----------------------------------------------------------+
|  💰 รายรับรวม: 30,000฿ | รายจ่ายรวม: 120฿ | คงเหลือ: 29,880฿  |
+----------------------------------------------------------+
```

## ⏱️ เวลาที่ใช้: 90 นาที

::: code-group
```csharp [ExpenseEntry.cs — Model]
using System;

namespace ExpenseTracker
{
    public class ExpenseEntry
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Type { get; set; } // "รายรับ" / "รายจ่าย"
        public string Description { get; set; }
        public decimal Amount { get; set; }
    }
}
```

```csharp [Form1.cs — โค้ดหลัก]
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Windows.Forms;

namespace ExpenseTracker
{
    public partial class Form1 : Form
    {
        private List<ExpenseEntry> entries = new();
        private int nextId = 1;
        private readonly string dataFile = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments),
            "ExpenseTracker", "expenses.json");

        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            SetupGrid();
            SetupControls();
            LoadData();
        }

        private void SetupControls()
        {
            cboType.Items.AddRange(new[] { "รายรับ", "รายจ่าย" });
            cboType.SelectedIndex = 1; // ค่าเริ่มต้น: รายจ่าย
            dtpDate.Value = DateTime.Today;
        }

        private void SetupGrid()
        {
            dgvExpenses.Columns.Clear();
            dgvExpenses.Columns.Add(new DataGridViewTextBoxColumn { Name="colId", HeaderText="รหัส", DataPropertyName="Id", Width=50 });
            dgvExpenses.Columns.Add(new DataGridViewTextBoxColumn { Name="colDate", HeaderText="วันที่", DataPropertyName="Date", Width=100,
                DefaultCellStyle = new DataGridViewCellStyle { Format = "dd/MM/yyyy" }});
            dgvExpenses.Columns.Add(new DataGridViewTextBoxColumn { Name="colType", HeaderText="ประเภท", DataPropertyName="Type", Width=80 });
            dgvExpenses.Columns.Add(new DataGridViewTextBoxColumn { Name="colDesc", HeaderText="รายการ", DataPropertyName="Description" });
            dgvExpenses.Columns.Add(new DataGridViewTextBoxColumn { Name="colAmount", HeaderText="จำนวน (฿)", DataPropertyName="Amount", Width=100,
                DefaultCellStyle = new DataGridViewCellStyle { Format = "N2", Alignment = DataGridViewContentAlignment.MiddleRight }});
            dgvExpenses.AllowUserToAddRows = false;
            dgvExpenses.ReadOnly = true;
            dgvExpenses.SelectionMode = DataGridViewSelectionMode.FullRowSelect;
        }

        private void btnAdd_Click(object sender, EventArgs e)
        {
            if (string.IsNullOrWhiteSpace(txtDesc.Text))
            { MessageBox.Show("กรุณากรอกรายการ!", "แจ้งเตือน", MessageBoxButtons.OK, MessageBoxIcon.Warning); return; }
            if (cboType.SelectedIndex < 0)
            { MessageBox.Show("กรุณาเลือกประเภท!", "แจ้งเตือน", MessageBoxButtons.OK, MessageBoxIcon.Warning); return; }

            decimal amount = (decimal)nudAmount.Value;
            entries.Add(new ExpenseEntry
            {
                Id = nextId++,
                Date = dtpDate.Value,
                Type = cboType.SelectedItem.ToString(),
                Description = txtDesc.Text.Trim(),
                Amount = cboType.SelectedItem.ToString() == "รายจ่าย" ? -amount : amount
            });

            SaveData();
            RefreshGrid();
            txtDesc.Clear();
        }

        private void btnDelete_Click(object sender, EventArgs e)
        {
            if (dgvExpenses.CurrentRow == null) return;
            int id = (int)dgvExpenses.CurrentRow.Cells["colId"].Value;
            var entry = entries.FirstOrDefault(x => x.Id == id);
            if (entry == null) return;

            if (MessageBox.Show($"ลบรายการ '{entry.Description}' หรือไม่?", "ยืนยัน",
                MessageBoxButtons.YesNo, MessageBoxIcon.Warning) == DialogResult.Yes)
            {
                entries.Remove(entry);
                SaveData();
                RefreshGrid();
            }
        }

        private void RefreshGrid()
        {
            dgvExpenses.DataSource = null;
            dgvExpenses.DataSource = entries.OrderByDescending(e => e.Date).ToList();

            decimal totalIncome  = entries.Where(x => x.Amount > 0).Sum(x => x.Amount);
            decimal totalExpense = entries.Where(x => x.Amount < 0).Sum(x => Math.Abs(x.Amount));
            decimal balance      = totalIncome - totalExpense;

            lblSummary.Text = $"💰 รายรับ: {totalIncome:N0}฿  |  รายจ่าย: {totalExpense:N0}฿  |  คงเหลือ: {balance:N0}฿";
            lblSummary.ForeColor = balance >= 0 ? System.Drawing.Color.DarkGreen : System.Drawing.Color.Red;
        }

        private void SaveData()
        {
            Directory.CreateDirectory(Path.GetDirectoryName(dataFile));
            var options = new JsonSerializerOptions { WriteIndented = true };
            File.WriteAllText(dataFile, JsonSerializer.Serialize(entries, options), System.Text.Encoding.UTF8);
        }

        private void LoadData()
        {
            if (!File.Exists(dataFile)) { RefreshGrid(); return; }
            string json = File.ReadAllText(dataFile, System.Text.Encoding.UTF8);
            entries = JsonSerializer.Deserialize<List<ExpenseEntry>>(json) ?? new();
            nextId = entries.Count > 0 ? entries.Max(x => x.Id) + 1 : 1;
            RefreshGrid();
        }
    }
}
```
:::

## 🔥 Challenge (โจทย์ท้าทาย!)

**โจทย์:** เพิ่มฟีเจอร์ Export รายงานสรุปรายเดือนเป็นไฟล์ CSV โดยรายงานต้องจัดกลุ่มตามเดือน แสดงยอดรายรับ รายจ่าย และคงเหลือของแต่ละเดือน
