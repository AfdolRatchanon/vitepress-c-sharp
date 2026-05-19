# 01 - NuGet Package Manager & EPPlus Excel Export

> 💡 **เป้าหมาย:** เรียนรู้วิธีดาวน์โหลดและติดตั้ง Library ภายนอกจาก NuGet (คล้ายๆ npm ใน Node.js หรือ pip ใน Python) และนำไลบรารี `ClosedXML` มาใช้สำหรับสร้างไฟล์ Excel (.xlsx)

## 📖 ทฤษฎีและแนวคิด UI (UI Concept & Theory)

**NuGet** คือศูนย์รวม Library (หรือที่เรียกว่า Package) สำหรับ .NET หากเราต้องการเขียนโปรแกรมสร้างไฟล์ Excel การเขียนโค้ดเองตั้งแต่ศูนย์ (จากโครงสร้าง XML ของ Excel) จะยากมาก เราจึงติดตั้ง Package ที่คนอื่นเขียนแจกฟรีไว้มาใช้งานแทน

**ขั้นตอนการใช้งาน NuGet ใน Visual Studio:**
1. คลิกขวาที่โปรเจกต์ใน Solution Explorer
2. เลือก **Manage NuGet Packages...**
3. ไปที่แท็บ **Browse** แล้วค้นหาชื่อ Package
4. กด Install

> สำหรับการสร้าง Excel ในบทนี้ เราจะใช้ **`ClosedXML`** เพราะฟรี ไม่มีข้อจำกัดด้าน License และใช้งานง่ายมาก

---

## 💻 ตัวอย่างโค้ด (Code Implementation)

สมมติว่าเรามี `DataGridView` (ชื่อ `dgvData`) ที่มีข้อมูลสินค้าอยู่แล้ว และต้องการ Export ออกเป็นไฟล์ `.xlsx`

::: code-group
```csharp [Form1.cs — Export Excel]
using System;
using System.Data;
using System.Windows.Forms;
using ClosedXML.Excel; // อย่าลืม using หลังจากติดตั้ง Package ผ่าน NuGet

namespace ReportExportDemo
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
            LoadSampleData();
        }

        private void LoadSampleData()
        {
            // สร้างข้อมูลจำลอง
            DataTable dt = new DataTable("Products");
            dt.Columns.Add("รหัส", typeof(string));
            dt.Columns.Add("ชื่อสินค้า", typeof(string));
            dt.Columns.Add("ราคา", typeof(decimal));
            
            dt.Rows.Add("P01", "โน้ตบุ๊ก", 25000);
            dt.Rows.Add("P02", "เมาส์ไร้สาย", 500);
            dt.Rows.Add("P03", "คีย์บอร์ดกลไก", 2500);

            dgvData.DataSource = dt;
        }

        private void btnExportExcel_Click(object sender, EventArgs e)
        {
            // ดึง DataTable ออกมาจาก DataGridView
            DataTable dt = dgvData.DataSource as DataTable;
            if (dt == null || dt.Rows.Count == 0)
            {
                MessageBox.Show("ไม่มีข้อมูลให้ Export", "แจ้งเตือน");
                return;
            }

            using (SaveFileDialog sfd = new SaveFileDialog())
            {
                sfd.Filter = "Excel Files|*.xlsx";
                sfd.FileName = "รายงานสินค้า_" + DateTime.Now.ToString("yyyyMMdd");
                
                if (sfd.ShowDialog() == DialogResult.OK)
                {
                    ExportToExcel(dt, sfd.FileName);
                }
            }
        }

        // ฟังก์ชันสำหรับสร้างและเซฟ Excel ด้วย ClosedXML
        private void ExportToExcel(DataTable dt, string filePath)
        {
            try
            {
                // [1] สร้าง Workbook (ไฟล์ Excel) และ Worksheet (แผ่นงาน)
                using (XLWorkbook wb = new XLWorkbook())
                {
                    // [2] ใส่ข้อมูลจาก DataTable ลงไปที่ Cell A1
                    var ws = wb.Worksheets.Add(dt, "ข้อมูลสินค้า");

                    // [3] จัดรูปแบบ (ตัวอย่าง: ทำให้ Header เป็นตัวหนาและมีสีพื้นหลัง)
                    ws.Row(1).Style.Font.Bold = true;
                    ws.Row(1).Style.Fill.BackgroundColor = XLColor.LightBlue;
                    
                    // ปรับความกว้างคอลัมน์อัตโนมัติ
                    ws.Columns().AdjustToContents();

                    // [4] บันทึกไฟล์
                    wb.SaveAs(filePath);
                }
                
                MessageBox.Show("ส่งออกไฟล์ Excel สำเร็จ!", "สำเร็จ", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
            catch (Exception ex)
            {
                MessageBox.Show($"เกิดข้อผิดพลาดขณะบันทึก: {ex.Message}", "Error");
            }
        }
    }
}
```
:::

---

## 🎯 โจทย์ฝึกปฏิบัติเสริมความเข้าใจ (Mini Exercise)

**โจทย์: จัด Format ตัวเลขใน Excel**
ไฟล์ Excel ที่ Export ออกไปในคอลัมน์ "ราคา" ยังไม่มีจุลภาคคั่น ให้ค้นหาวิธีการกำหนด NumberFormat ด้วย ClosedXML แล้วเพิ่มโค้ดเพื่อตั้งให้คอลัมน์ราคา (คอลัมน์ที่ 3) แสดงผลแบบมีจุลภาคและทศนิยม 2 ตำแหน่ง (เช่น `25,000.00`)

::: details 💡 คำใบ้ (Hint)
`ws.Column(3).Style.NumberFormat.Format = "#,##0.00";`
:::

---

## 🗣️ ทบทวน (Review)

::: details ❓ คำถามทบทวน 1:
**คำถาม:** อะไรคือข้อแตกต่างระหว่างการ Export เป็นไฟล์ CSV กับการใช้ไลบรารีอย่าง ClosedXML Export เป็น .xlsx?

**แนวคำตอบ:** CSV เป็นแค่ข้อความ (Plain text) ที่มีคอมม่าคั่น ไม่สามารถเก็บการจัดรูปแบบ เช่น สีตัวอักษร, การผสานเซลล์ (Merge Cells), หรือสูตรคำนวณได้ แต่ไฟล์ `.xlsx` (ผ่าน ClosedXML) เป็นรูปแบบ Excel เต็มรูปแบบ เราสามารถจัดฟอนต์ ใส่สี กำหนดความกว้างคอลัมน์ และใส่สูตรได้เลย
:::
