# 💻 Lab: สร้างระบบออกรายงานประจำวัน (Excel & PDF)

> 💡 **เป้าหมาย:** สร้างแอปพลิเคชันที่ดึงข้อมูลรายชื่อสินค้า/รายรับรายจ่าย มาแสดงบน Grid แล้วผู้ใช้สามารถเลือกออกรายงานเป็นไฟล์ Excel สวยงาม หรือ PDF เป็นใบเสร็จก็ได้

## 📖 ภาพรวมของโปรแกรม

```text
[Wireframe: Report Generator]
+----------------------------------------------------------+
| 🗔 ระบบออกรายงาน                                 _ □ X  |
+----------------------------------------------------------+
|                                                          |
|  [ DataGridView แสดงรายการที่โหลดมาจำลอง ]                  |
|                                                          |
|  +----------------------------------------------------+  |
|  | รหัส | ชื่อสินค้า             | ราคา      | ยอดขาย  |  |
|  | 001  | กาแฟอเมริกาโน่เย็น      | 55.00     | 45     |  |
|  | 002  | ลาเต้ร้อน              | 45.00     | 30     |  |
|  +----------------------------------------------------+  |
|                                                          |
|  รวมยอดขายทั้งหมด: 3,825.00 บาท                            |
|                                                          |
|  [ 📊 ส่งออกเป็น Excel ]        [ 📄 พิมพ์ใบรายงาน PDF ]    |
|                                                          |
+----------------------------------------------------------+
```

## ⏱️ เวลาที่ใช้: 90 นาที

## 📝 ขั้นตอนการทำงาน

โปรเจกต์นี้ต้องใช้ NuGet Packages:
1. `ClosedXML` สำหรับ Export Excel
2. `itext7.bouncy-castle-adapter` สำหรับ PDF

::: code-group
```csharp [Form1.cs — โค้ดฉบับเต็ม]
using System;
using System.Data;
using System.IO;
using System.Windows.Forms;
using ClosedXML.Excel;
using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Element;
using iText.Kernel.Font;
using iText.IO.Font;
using iText.Layout.Properties;

namespace DailyReportApp
{
    public partial class Form1 : Form
    {
        private DataTable salesData;
        private decimal totalRevenue = 0;

        public Form1()
        {
            InitializeComponent();
            SetupData();
        }

        private void SetupData()
        {
            salesData = new DataTable("Sales");
            salesData.Columns.Add("รหัสสินค้า", typeof(string));
            salesData.Columns.Add("ชื่อสินค้า", typeof(string));
            salesData.Columns.Add("ราคาต่อหน่วย", typeof(decimal));
            salesData.Columns.Add("จำนวนที่ขาย", typeof(int));
            salesData.Columns.Add("ยอดรวม (บาท)", typeof(decimal));

            // ข้อมูลจำลอง
            AddRow("P01", "กาแฟอเมริกาโน่", 55, 45);
            AddRow("P02", "ลาเต้ร้อน", 45, 30);
            AddRow("P03", "เค้กส้ม", 80, 12);
            AddRow("P04", "ชาเขียวมัทฉะ", 65, 25);

            dgvSales.DataSource = salesData;
            
            // ปรับ Format
            dgvSales.Columns["ราคาต่อหน่วย"].DefaultCellStyle.Format = "N2";
            dgvSales.Columns["ยอดรวม (บาท)"].DefaultCellStyle.Format = "N2";
            dgvSales.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill;

            lblTotal.Text = $"ยอดขายสุทธิ: {totalRevenue:N2} บาท";
        }

        private void AddRow(string id, string name, decimal price, int qty)
        {
            decimal total = price * qty;
            salesData.Rows.Add(id, name, price, qty, total);
            totalRevenue += total;
        }

        // ====== ฟังก์ชัน Export Excel ======
        private void btnExcel_Click(object sender, EventArgs e)
        {
            using (SaveFileDialog sfd = new SaveFileDialog { Filter = "Excel|*.xlsx", FileName = "Sales_Report" })
            {
                if (sfd.ShowDialog() == DialogResult.OK)
                {
                    try
                    {
                        using (XLWorkbook wb = new XLWorkbook())
                        {
                            var ws = wb.Worksheets.Add(salesData, "สรุปยอดขาย");
                            
                            // จัด Format Header
                            ws.Row(1).Style.Font.Bold = true;
                            ws.Row(1).Style.Fill.BackgroundColor = XLColor.LightGray;

                            // จัด Format คอลัมน์ตัวเลข
                            ws.Column(3).Style.NumberFormat.Format = "#,##0.00";
                            ws.Column(5).Style.NumberFormat.Format = "#,##0.00";
                            
                            // เพิ่มบรรทัดสรุปยอด
                            int lastRow = salesData.Rows.Count + 1;
                            ws.Cell(lastRow + 1, 4).Value = "รวมสุทธิ:";
                            ws.Cell(lastRow + 1, 4).Style.Font.Bold = true;
                            ws.Cell(lastRow + 1, 5).Value = totalRevenue;
                            ws.Cell(lastRow + 1, 5).Style.NumberFormat.Format = "#,##0.00";
                            ws.Cell(lastRow + 1, 5).Style.Font.Bold = true;

                            ws.Columns().AdjustToContents();
                            wb.SaveAs(sfd.FileName);
                        }
                        MessageBox.Show("ส่งออก Excel สำเร็จ!");
                    }
                    catch (Exception ex) { MessageBox.Show("Error: " + ex.Message); }
                }
            }
        }

        // ====== ฟังก์ชัน Export PDF ======
        private void btnPdf_Click(object sender, EventArgs e)
        {
            using (SaveFileDialog sfd = new SaveFileDialog { Filter = "PDF|*.pdf", FileName = "Sales_Report" })
            {
                if (sfd.ShowDialog() == DialogResult.OK)
                {
                    try
                    {
                        string fontPath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.Fonts), "tahoma.ttf");
                        PdfFont thaiFont = PdfFontFactory.CreateFont(fontPath, PdfEncodings.IDENTITY_H);

                        using (PdfWriter writer = new PdfWriter(sfd.FileName))
                        using (PdfDocument pdf = new PdfDocument(writer))
                        using (Document doc = new Document(pdf))
                        {
                            doc.SetFont(thaiFont);

                            doc.Add(new Paragraph("รายงานสรุปยอดขายประจำวัน")
                                .SetTextAlignment(TextAlignment.CENTER).SetFontSize(16).SetBold());
                            doc.Add(new Paragraph("วันที่: " + DateTime.Now.ToString("dd/MM/yyyy HH:mm")).SetTextAlignment(TextAlignment.RIGHT));
                            doc.Add(new Paragraph("\n"));

                            // สร้างตาราง 5 คอลัมน์
                            Table table = new Table(UnitValue.CreatePercentArray(new float[] { 2, 4, 2, 2, 2 })).UseAllAvailableWidth();

                            // สร้าง Header
                            foreach (DataColumn col in salesData.Columns)
                            {
                                table.AddHeaderCell(new Cell().Add(new Paragraph(col.ColumnName).SetBold().SetTextAlignment(TextAlignment.CENTER)));
                            }

                            // เพิ่มข้อมูลทีละบรรทัด
                            foreach (DataRow row in salesData.Rows)
                            {
                                table.AddCell(new Paragraph(row[0].ToString()).SetTextAlignment(TextAlignment.CENTER));
                                table.AddCell(new Paragraph(row[1].ToString()));
                                table.AddCell(new Paragraph(Convert.ToDecimal(row[2]).ToString("N2")).SetTextAlignment(TextAlignment.RIGHT));
                                table.AddCell(new Paragraph(row[3].ToString()).SetTextAlignment(TextAlignment.CENTER));
                                table.AddCell(new Paragraph(Convert.ToDecimal(row[4]).ToString("N2")).SetTextAlignment(TextAlignment.RIGHT));
                            }
                            doc.Add(table);

                            // บรรทัดสรุป
                            doc.Add(new Paragraph($"\nยอดรวมสุทธิ: {totalRevenue:N2} บาท")
                                .SetTextAlignment(TextAlignment.RIGHT).SetFontSize(14).SetBold());
                        }
                        MessageBox.Show("สร้างเอกสาร PDF สำเร็จ!");
                    }
                    catch (Exception ex) { MessageBox.Show("Error: " + ex.Message); }
                }
            }
        }
    }
}
```
:::

## 🔥 Challenge (โจทย์ท้าทาย!)

**โจทย์:** ในรายงาน PDF ให้เพิ่มโลโก้ร้านค้า (ภาพจากเครื่องหรือ Resources) ไว้ที่มุมซ้ายบนของหน้าเอกสาร โดยใช้คลาส `Image` และ `ImageDataFactory` ของ iText7
