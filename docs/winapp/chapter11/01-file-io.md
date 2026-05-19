# 01 - File I/O: อ่าน-เขียนไฟล์ Text และ CSV

> 💡 **เป้าหมาย:** เรียนรู้การอ่านและเขียนไฟล์ข้อความด้วย `System.IO.File`, `StreamReader`, `StreamWriter` และการจัดการไฟล์ CSV สำหรับนำเข้า-ส่งออกข้อมูล

## 📖 ทฤษฎีและแนวคิด UI (UI Concept & Theory)

ข้อมูลที่เก็บในตัวแปรจะหายไปเมื่อปิดโปรแกรม การ "Persist" ข้อมูลด้วยการเขียนลงไฟล์ช่วยให้ข้อมูลอยู่ถาวร:

```text
[ประเภทของไฟล์ที่นิยมใช้]
┌────────────────────────────────────────────────────┐
│  .txt  → ข้อความธรรมดา, Log Files                 │
│  .csv  → ข้อมูลตาราง (Comma-Separated Values)      │
│  .json → ข้อมูล Structured ที่อ่านง่าย            │
│  .xml  → ข้อมูล Structured แบบ Verbose            │
└────────────────────────────────────────────────────┘

[ตัวอย่างไฟล์ CSV]
รหัส,ชื่อ,ราคา,จำนวน
001,กาแฟดำ,35,100
002,ลาเต้,55,85
```

### 🔑 File Class Methods สำคัญ

| Method | การทำงาน |
| :--- | :--- |
| `File.ReadAllText(path)` | อ่านทั้งไฟล์เป็น string เดียว |
| `File.ReadAllLines(path)` | อ่านทั้งไฟล์เป็น string[] แบบแยกบรรทัด |
| `File.WriteAllText(path, text)` | เขียน string ลงไฟล์ (ทับไฟล์เดิม) |
| `File.AppendAllText(path, text)` | ต่อท้ายข้อความในไฟล์เดิม |
| `File.Exists(path)` | ตรวจสอบว่ามีไฟล์อยู่หรือไม่ |
| `File.Delete(path)` | ลบไฟล์ |
| `Path.Combine(dir, file)` | สร้าง Path อย่างปลอดภัย |

---

## 🛠️ การตั้งค่า Properties (UI Setup)

| Control | Property | ค่าที่ตั้ง |
| :--- | :--- | :--- |
| `Form1` | `Text` | `"File I/O Demo"` |
| `Button` (บันทึก) | `Name` | `btnSave` |
| `Button` (โหลด) | `Name` | `btnLoad` |
| `Button` (นำเข้า CSV) | `Name` | `btnImportCsv` |
| `Button` (ส่งออก CSV) | `Name` | `btnExportCsv` |
| `RichTextBox` | `Name` | `rtbContent` |
| `DataGridView` | `Name` | `dgvData` |
| `Label` | `Name` | `lblStatus` |

---

## 💻 ตัวอย่างโค้ด (Code Implementation)

::: code-group
```csharp [Form1.cs]
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Windows.Forms;

namespace FileIODemo
{
    public class Product
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int Stock { get; set; }
    }

    public partial class Form1 : Form
    {
        // [1] สร้าง Path ที่ปลอดภัยด้วย Path.Combine
        private readonly string dataDir = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments),
            "MyApp");
        private readonly string textFile;
        private readonly string csvFile;

        private List<Product> products = new();

        public Form1()
        {
            InitializeComponent();
            textFile = Path.Combine(dataDir, "notes.txt");
            csvFile  = Path.Combine(dataDir, "products.csv");

            // สร้างโฟลเดอร์ถ้ายังไม่มี
            Directory.CreateDirectory(dataDir);
            SetupGrid();
        }

        // ===== Text File =====
        private void btnSave_Click(object sender, EventArgs e)
        {
            try
            {
                // [2] เขียนข้อความลงไฟล์ด้วย Encoding UTF8
                File.WriteAllText(textFile, rtbContent.Text, Encoding.UTF8);
                lblStatus.Text = $"บันทึกแล้ว: {textFile}";
            }
            catch (Exception ex)
            {
                MessageBox.Show($"บันทึกล้มเหลว: {ex.Message}", "Error",
                    MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void btnLoad_Click(object sender, EventArgs e)
        {
            if (!File.Exists(textFile))
            {
                MessageBox.Show("ยังไม่มีไฟล์บันทึก", "แจ้งเตือน",
                    MessageBoxButtons.OK, MessageBoxIcon.Information);
                return;
            }
            rtbContent.Text = File.ReadAllText(textFile, Encoding.UTF8);
            lblStatus.Text = "โหลดสำเร็จ";
        }

        // ===== CSV File =====
        private void btnImportCsv_Click(object sender, EventArgs e)
        {
            using (OpenFileDialog ofd = new OpenFileDialog { Filter = "CSV|*.csv" })
            {
                if (ofd.ShowDialog() != DialogResult.OK) return;
                products.Clear();

                // [3] อ่านไฟล์ CSV ทีละบรรทัด ข้ามบรรทัดแรก (Header)
                string[] lines = File.ReadAllLines(ofd.FileName, Encoding.UTF8);
                for (int i = 1; i < lines.Length; i++)
                {
                    string line = lines[i].Trim();
                    if (string.IsNullOrEmpty(line)) continue;

                    string[] parts = line.Split(',');
                    if (parts.Length < 4) continue;

                    if (decimal.TryParse(parts[2], out decimal price) &&
                        int.TryParse(parts[3], out int stock))
                    {
                        products.Add(new Product
                        {
                            Id = parts[0].Trim(),
                            Name = parts[1].Trim(),
                            Price = price,
                            Stock = stock
                        });
                    }
                }
                RefreshGrid();
                lblStatus.Text = $"นำเข้าแล้ว: {products.Count} รายการ";
            }
        }

        private void btnExportCsv_Click(object sender, EventArgs e)
        {
            if (products.Count == 0)
            {
                MessageBox.Show("ไม่มีข้อมูลสำหรับส่งออก!", "แจ้งเตือน",
                    MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            using (SaveFileDialog sfd = new SaveFileDialog { Filter = "CSV|*.csv", FileName = "products_export" })
            {
                if (sfd.ShowDialog() != DialogResult.OK) return;

                // [4] เขียน CSV ด้วย StringBuilder
                var sb = new StringBuilder();
                sb.AppendLine("รหัส,ชื่อสินค้า,ราคา,จำนวน"); // Header
                foreach (var p in products)
                    sb.AppendLine($"{p.Id},{p.Name},{p.Price},{p.Stock}");

                File.WriteAllText(sfd.FileName, sb.ToString(), Encoding.UTF8);
                lblStatus.Text = $"ส่งออกแล้ว: {sfd.FileName}";
            }
        }

        private void SetupGrid()
        {
            dgvData.Columns.Add("Id", "รหัส");
            dgvData.Columns.Add("Name", "ชื่อสินค้า");
            dgvData.Columns.Add("Price", "ราคา");
            dgvData.Columns.Add("Stock", "จำนวน");
            dgvData.AllowUserToAddRows = false;
        }

        private void RefreshGrid()
        {
            dgvData.DataSource = null;
            dgvData.DataSource = products;
        }
    }
}
```
:::

---

## 🎯 โจทย์ฝึกปฏิบัติเสริมความเข้าใจ (Mini Exercise)

**โจทย์ที่ 1: บันทึก Log ของแอปพลิเคชัน**
สร้างโปรแกรมที่บันทึก Log ทุกครั้งที่ผู้ใช้กดปุ่มใดๆ ลงไฟล์ `app.log` ในรูปแบบ `[วันที่-เวลา] ชื่อ Event` โดยใช้ `File.AppendAllText()`

**โจทย์ที่ 2: อ่านไฟล์ CSV และแสดงสถิติ**
อ่านไฟล์ CSV สินค้า แสดงสินค้าที่ราคาแพงที่สุด, ถูกที่สุด และราคาเฉลี่ยใน Label ด้วย LINQ

::: details 💡 คำใบ้ (Hint)
`products.Max(p => p.Price)`, `products.Min(p => p.Price)`, `products.Average(p => (double)p.Price)`
:::

---

## 🔥 Challenge (โจทย์ท้าทาย!)

**โจทย์:** สร้างระบบ Backup อัตโนมัติที่ทุกครั้งที่กด "บันทึก" ระบบจะสร้างสำเนาไฟล์เดิมก่อนทับ โดยตั้งชื่อเป็น `notes_backup_yyyyMMdd_HHmmss.txt` และเก็บไว้ในโฟลเดอร์ `backup/` แสดงรายชื่อไฟล์ Backup ทั้งหมดใน ListBox

---

## 🗣️ ทบทวน (Review)

::: details ❓ คำถามทบทวน 1:
**คำถาม:** ทำไมควรใช้ `Path.Combine()` แทนการต่อ String เป็น Path โดยตรง?

**แนวคำตอบ:** `Path.Combine()` จัดการ Separator (`\` บน Windows, `/` บน Linux) ให้อัตโนมัติ หากต่อ String เองอาจเกิด Path ผิดรูปแบบ เช่น `"C:\folder" + "\file.txt"` ให้ผลถูกแต่ `"C:\folder\" + "\file.txt"` จะได้ `"C:\folder\\file.txt"` ซึ่งผิด
:::

::: details ❓ คำถามทบทวน 2:
**คำถาม:** เหตุใดจึงต้องระบุ `Encoding.UTF8` ทุกครั้งที่อ่าน/เขียนไฟล์?

**แนวคำตอบ:** ถ้าไม่ระบุ C# จะใช้ Encoding เริ่มต้นของระบบ ซึ่งใน Windows เป็น Windows-1252 (ANSI) ทำให้ภาษาไทยและอักขระพิเศษแสดงผลผิดเพี้ยน การระบุ UTF-8 ตลอดทำให้ข้อมูลถูกต้องและพกพาได้ทุก OS
:::
