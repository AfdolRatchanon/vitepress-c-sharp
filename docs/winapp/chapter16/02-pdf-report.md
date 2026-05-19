# 02 - การสร้างรายงาน PDF ด้วย iText7

> 💡 **เป้าหมาย:** เรียนรู้การใช้ไลบรารี `iText7` ผ่าน NuGet สำหรับสร้างและส่งออก (Export) ข้อมูลให้อยู่ในรูปแบบเอกสาร PDF พร้อมรองรับฟอนต์ภาษาไทย

## 📖 ทฤษฎีและแนวคิด UI (UI Concept & Theory)

ไฟล์ PDF นิยมใช้สำหรับการสร้างเอกสารแบบทางการ เช่น ใบเสร็จรับเงิน, ใบกำกับภาษี หรือรายงานสรุป เพราะรูปแบบจะไม่เพี้ยนเวลาไปเปิดบนเครื่องอื่น 

การเขียนโค้ดสร้าง PDF จะมีคอนเซปต์คล้ายกับการเขียนโค้ดต่อบล็อก (Building Blocks):
1. สร้างเอกสาร (Document)
2. สร้างข้อความ (Paragraph), ตาราง (Table), รูปภาพ (Image)
3. นำแต่ละอย่างมา .Add() เข้าไปใน Document
4. ปิด Document (บันทึกไฟล์)

> **ข้อควรระวังเรื่องภาษาไทย:** โดยปกติ PDF มาตรฐาน (ที่ไม่ได้ฝังฟอนต์) จะ**ไม่รองรับภาษาไทย** ถ้าเราสั่งพิมพ์ข้อความไทย มันจะออกมาเป็นช่องสี่เหลี่ยมหรือตัวหนังสือหาย ดังนั้นเราจำเป็นต้องอ่านไฟล์ฟอนต์ `.ttf` (เช่น ฟอนต์ Tahoma หรือ Sarabun) แล้วฝังลงไปในเอกสาร

---

## 💻 ตัวอย่างโค้ด (Code Implementation)

ก่อนเริ่มเขียนโค้ด ให้ไปที่ **Manage NuGet Packages** แล้วค้นหาคำว่า **`itext7.bouncy-castle-adapter`** และติดตั้ง (ซึ่งมันจะติดตั้ง `itext7` ตัวหลักพ่วงมาด้วยอัตโนมัติ)

::: code-group
```csharp [Form1.cs — Export PDF]
using System;
using System.IO;
using System.Windows.Forms;
// นำเข้า Namespaces ของ iText7
using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Element;
using iText.Kernel.Font;
using iText.IO.Font;
using iText.Layout.Properties;

namespace ReportExportDemo
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void btnExportPdf_Click(object sender, EventArgs e)
        {
            using (SaveFileDialog sfd = new SaveFileDialog())
            {
                sfd.Filter = "PDF Files|*.pdf";
                sfd.FileName = "รายงานประจำวัน";
                
                if (sfd.ShowDialog() == DialogResult.OK)
                {
                    CreatePdf(sfd.FileName);
                }
            }
        }

        private void CreatePdf(string filePath)
        {
            try
            {
                // [1] กำหนดไฟล์ Font ภาษาไทย (เอาจากโฟลเดอร์ Windows/Fonts)
                string fontPath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.Fonts), "tahoma.ttf");
                
                // สร้าง Font Program เพื่อใช้ใน iText
                PdfFont thaiFont = PdfFontFactory.CreateFont(fontPath, PdfEncodings.IDENTITY_H);

                // [2] เตรียมการเขียนไฟล์ PDF
                using (PdfWriter writer = new PdfWriter(filePath))
                using (PdfDocument pdf = new PdfDocument(writer))
                using (Document document = new Document(pdf))
                {
                    // บังคับให้ทั้งเอกสารใช้ฟอนต์ไทย
                    document.SetFont(thaiFont);

                    // [3] เขียนหัวเอกสาร
                    Paragraph header = new Paragraph("รายงานสรุปยอดขาย (Sales Report)")
                        .SetTextAlignment(TextAlignment.CENTER)
                        .SetFontSize(18)
                        .SetBold();
                    document.Add(header);

                    document.Add(new Paragraph("วันที่พิมพ์: " + DateTime.Now.ToString("dd/MM/yyyy HH:mm"))
                        .SetTextAlignment(TextAlignment.RIGHT));

                    // เว้นบรรทัด
                    document.Add(new Paragraph("\n"));

                    // [4] สร้างตาราง (ระบุสัดส่วนความกว้างของคอลัมน์ 10%, 60%, 30%)
                    float[] columnWidths = { 1, 6, 3 };
                    Table table = new Table(UnitValue.CreatePercentArray(columnWidths)).UseAllAvailableWidth();

                    // เพิ่ม Header ของตาราง
                    table.AddHeaderCell(new Cell().Add(new Paragraph("ลำดับ").SetBold()));
                    table.AddHeaderCell(new Cell().Add(new Paragraph("รายการสินค้า").SetBold()));
                    table.AddHeaderCell(new Cell().Add(new Paragraph("จำนวนเงิน (บาท)").SetBold()));

                    // [5] วนลูปสร้างแถวข้อมูลจำลอง
                    table.AddCell("1");
                    table.AddCell("ชุดเมาส์และคีย์บอร์ด");
                    table.AddCell(new Cell().Add(new Paragraph("1,250.00").SetTextAlignment(TextAlignment.RIGHT)));

                    table.AddCell("2");
                    table.AddCell("หูฟังไร้สาย");
                    table.AddCell(new Cell().Add(new Paragraph("890.00").SetTextAlignment(TextAlignment.RIGHT)));

                    // รวมตารางเข้ากับเอกสาร
                    document.Add(table);
                    
                    // [6] สรุปยอด
                    document.Add(new Paragraph("\nยอดรวมทั้งหมด: 2,140.00 บาท")
                        .SetTextAlignment(TextAlignment.RIGHT)
                        .SetFontSize(14)
                        .SetBold());
                } // using จะเรียก document.Close() และ writer.Close() ให้เอง

                MessageBox.Show("สร้างไฟล์ PDF สำเร็จ!", "สำเร็จ", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
            catch (Exception ex)
            {
                MessageBox.Show("เกิดข้อผิดพลาด: " + ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
    }
}
```
:::

---

## 🎯 โจทย์ฝึกปฏิบัติเสริมความเข้าใจ (Mini Exercise)

**โจทย์: การดึงข้อมูลจาก DataGridView ลง PDF**
แก้ไขโค้ดจากตัวอย่าง ให้จำนวนแถวและข้อมูลใน `Table` ของ PDF วนลูปอ่านข้อมูลมาจาก `dgvData.Rows` (DataGrid บนหน้าจอของคุณ) แทนการ Fix ค่าตายตัว

::: details 💡 คำใบ้ (Hint)
```csharp
foreach (DataGridViewRow row in dgvData.Rows) {
    if (row.IsNewRow) continue;
    table.AddCell(row.Cells[0].Value?.ToString() ?? "");
    // ...
}
```
:::

---

## 🗣️ ทบทวน (Review)

::: details ❓ คำถามทบทวน 1:
**คำถาม:** เหตุใดการสร้างเอกสาร PDF จึงต้องมีขั้นตอนการฝังฟอนต์ (`IDENTITY_H`) สำหรับภาษาไทยด้วย?

**แนวคำตอบ:** ไฟล์ PDF ถูกออกแบบมาให้แสดงผลเหมือนกันในทุกอุปกรณ์ โดยค่าเริ่มต้นมันจะมีฟอนต์เพียงแค่กลุ่มภาษาละติน (อังกฤษ) เบสิกมาให้เท่านั้น หากมีอักขระภาษาอื่นที่เครื่องปลายทางไม่มี PDF จะแสดงผลไม่ได้ การสั่งฝังฟอนต์ลงไป จะทำให้ขนาดไฟล์ใหญ่ขึ้นเล็กน้อย แต่มั่นใจได้ว่าไปเปิดเครื่องไหนภาษาไทยก็จะไม่เพี้ยน
:::
