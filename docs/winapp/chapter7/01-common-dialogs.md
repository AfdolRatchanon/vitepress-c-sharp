# 01 - Common Dialogs: File, Color, Font, Folder

> 💡 **เป้าหมาย:** เรียนรู้การใช้งาน Common Dialog ของ Windows ที่ Built-in มาให้ ได้แก่ OpenFileDialog, SaveFileDialog, ColorDialog, FontDialog และ FolderBrowserDialog พร้อมเทคนิคการตั้งค่า Filter, Initial Directory และการรับค่ากลับมาใช้งาน

## 📖 ทฤษฎีและแนวคิด UI (UI Concept & Theory)

Windows มี Dialog มาตรฐานที่ทุกโปรแกรมใช้ร่วมกัน ทำให้ผู้ใช้คุ้นเคยกับ UI และไม่ต้องเรียนรู้ใหม่ทุกครั้ง ใน C# WinForms เรานำ Dialog เหล่านี้มาใช้ได้ทันทีโดยไม่ต้องออกแบบ UI เอง

**หลักการสำคัญ:** Dialog ทุกตัวต้องใช้ `using` statement เพื่อ Dispose Resource อัตโนมัติ และต้องตรวจ `DialogResult.OK` ก่อนอ่านค่า

```text
[Common Dialogs ที่มีให้ใช้]
┌──────────────────────────────────────────────┐
│  OpenFileDialog  → เลือกไฟล์เพื่อเปิด       │
│  SaveFileDialog  → ระบุชื่อไฟล์ที่จะบันทึก  │
│  ColorDialog     → เลือกสีจาก Color Picker  │
│  FontDialog      → เลือก Font, ขนาด, สไตล์  │
│  FolderBrowserDialog → เลือกโฟลเดอร์        │
└──────────────────────────────────────────────┘
```

### 🔑 OpenFileDialog Properties สำคัญ

| Property | การทำงาน | ตัวอย่าง |
| :--- | :--- | :--- |
| `Filter` | กรองประเภทไฟล์ที่แสดง | `"Images\|*.jpg;*.png\|All\|*.*"` |
| `Title` | หัวข้อของ Dialog | `"เลือกรูปภาพ"` |
| `InitialDirectory` | โฟลเดอร์เริ่มต้น | `Environment.GetFolderPath(...)` |
| `Multiselect` | เลือกหลายไฟล์พร้อมกัน | `true` |
| `FileName` | ชื่อไฟล์ที่เลือก (หลัง OK) | อ่านค่า |
| `FileNames` | อาร์เรย์ชื่อไฟล์ (กรณี Multiselect) | อ่านค่า |

---

## 🛠️ การตั้งค่า Properties (UI Setup)

สร้างฟอร์มสำหรับสาธิต Dialog ทั้งหมด:

| Control | Property | ค่าที่ตั้ง |
| :--- | :--- | :--- |
| `Form1` | `Text` | `"สาธิต Common Dialogs"` |
| `Button` (เปิดไฟล์) | `Name` | `btnOpenFile` |
| `Button` (เปิดไฟล์) | `Text` | `"📂 เปิดไฟล์"` |
| `Button` (บันทึก) | `Name` | `btnSaveFile` |
| `Button` (บันทึก) | `Text` | `"💾 บันทึกไฟล์"` |
| `Button` (เลือกสี) | `Name` | `btnPickColor` |
| `Button` (เลือกสี) | `Text` | `"🎨 เลือกสี"` |
| `Button` (เลือกฟอนต์) | `Name` | `btnPickFont` |
| `Button` (เลือกฟอนต์) | `Text` | `"🔤 เลือกฟอนต์"` |
| `Button` (เลือกโฟลเดอร์) | `Name` | `btnPickFolder` |
| `Button` (เลือกโฟลเดอร์) | `Text` | `"📁 เลือกโฟลเดอร์"` |
| `Label` (ผล) | `Name` | `lblResult` |
| `Panel` (พรีวิว) | `Name` | `pnlPreview` |
| `Panel` | `BorderStyle` | `FixedSingle` |

---

## 💻 ตัวอย่างโค้ด (Code Implementation)

::: code-group
```csharp [Form1.cs]
using System;
using System.IO;
using System.Windows.Forms;

namespace DialogDemo
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        // ===== OpenFileDialog =====
        private void btnOpenFile_Click(object sender, EventArgs e)
        {
            using (OpenFileDialog ofd = new OpenFileDialog())
            {
                // [1] ตั้งค่า Filter: "ชื่อที่แสดง|นามสกุลไฟล์"
                // ใช้ ; คั่นนามสกุลหลายแบบ ใช้ | แบ่งกลุ่ม
                ofd.Title = "เลือกไฟล์ข้อความ";
                ofd.Filter = "Text Files|*.txt|CSV Files|*.csv|All Files|*.*";
                ofd.FilterIndex = 1; // เริ่มที่ Filter แรก
                ofd.InitialDirectory = Environment.GetFolderPath(
                    Environment.SpecialFolder.MyDocuments);

                if (ofd.ShowDialog() == DialogResult.OK)
                {
                    // [2] อ่านไฟล์ที่เลือก
                    string content = File.ReadAllText(ofd.FileName);
                    lblResult.Text = $"เปิดไฟล์: {Path.GetFileName(ofd.FileName)}\n" +
                                     $"ขนาด: {new FileInfo(ofd.FileName).Length:N0} bytes";
                }
            }
        }

        // ===== SaveFileDialog =====
        private void btnSaveFile_Click(object sender, EventArgs e)
        {
            using (SaveFileDialog sfd = new SaveFileDialog())
            {
                sfd.Title = "บันทึกไฟล์";
                sfd.Filter = "Text Files|*.txt|All Files|*.*";
                sfd.DefaultExt = "txt"; // ใส่นามสกุลอัตโนมัติถ้าผู้ใช้ไม่ใส่
                sfd.FileName = "my_document"; // ชื่อไฟล์เริ่มต้น

                if (sfd.ShowDialog() == DialogResult.OK)
                {
                    // [3] บันทึกข้อความลงไฟล์
                    File.WriteAllText(sfd.FileName, "ข้อความที่บันทึก", System.Text.Encoding.UTF8);
                    lblResult.Text = $"บันทึกที่: {sfd.FileName}";
                }
            }
        }

        // ===== ColorDialog =====
        private void btnPickColor_Click(object sender, EventArgs e)
        {
            using (ColorDialog cd = new ColorDialog())
            {
                cd.Color = pnlPreview.BackColor; // ตั้งค่าเริ่มต้นเป็นสีปัจจุบัน
                cd.FullOpen = true; // เปิดหน้าต่างเลือกสีแบบเต็ม

                if (cd.ShowDialog() == DialogResult.OK)
                {
                    // [4] นำสีที่เลือกไปใช้กับ Panel
                    pnlPreview.BackColor = cd.Color;
                    lblResult.Text = $"สีที่เลือก: R={cd.Color.R}, G={cd.Color.G}, B={cd.Color.B}";
                }
            }
        }

        // ===== FontDialog =====
        private void btnPickFont_Click(object sender, EventArgs e)
        {
            using (FontDialog fd = new FontDialog())
            {
                fd.Font = lblResult.Font; // ตั้งค่าเริ่มต้นเป็นฟอนต์ปัจจุบัน
                fd.ShowColor = true;      // แสดงตัวเลือกสีด้วย

                if (fd.ShowDialog() == DialogResult.OK)
                {
                    // [5] เปลี่ยนฟอนต์ของ Label
                    lblResult.Font = fd.Font;
                    lblResult.ForeColor = fd.Color;
                    lblResult.Text = $"ฟอนต์: {fd.Font.Name}, {fd.Font.Size}pt";
                }
            }
        }

        // ===== FolderBrowserDialog =====
        private void btnPickFolder_Click(object sender, EventArgs e)
        {
            using (FolderBrowserDialog fbd = new FolderBrowserDialog())
            {
                fbd.Description = "เลือกโฟลเดอร์สำหรับบันทึกไฟล์";
                fbd.ShowNewFolderButton = true; // อนุญาตสร้างโฟลเดอร์ใหม่

                if (fbd.ShowDialog() == DialogResult.OK)
                {
                    // [6] อ่าน Path ของโฟลเดอร์ที่เลือก
                    string folderPath = fbd.SelectedPath;
                    string[] files = Directory.GetFiles(folderPath);
                    lblResult.Text = $"โฟลเดอร์: {folderPath}\nมีไฟล์: {files.Length} ไฟล์";
                }
            }
        }
    }
}
```
:::

**Expected Output:**
```text
กดปุ่ม "เปิดไฟล์" → หน้าต่าง Windows เปิดไฟล์ปรากฏ → เลือกไฟล์ .txt
→ lblResult: "เปิดไฟล์: document.txt | ขนาด: 2,048 bytes"

กดปุ่ม "เลือกสี" → Color Picker ปรากฏ → เลือกสีแดง
→ pnlPreview เปลี่ยนเป็นสีแดง, lblResult: "สีที่เลือก: R=255, G=0, B=0"
```

---

## 🎯 โจทย์ฝึกปฏิบัติเสริมความเข้าใจ (Mini Exercise)

**โจทย์ที่ 1: เปิดไฟล์รูปภาพหลายไฟล์**
ใช้ OpenFileDialog ที่ตั้ง `Multiselect = true` และ Filter เป็นรูปภาพ (*.jpg;*.png;*.bmp) เมื่อเลือกไฟล์แล้ว แสดงชื่อไฟล์ทั้งหมดใน ListBox

**โจทย์ที่ 2: เปลี่ยนธีมสีทั้งฟอร์ม**
สร้างปุ่ม "เปลี่ยนสีธีม" ที่เปิด ColorDialog แล้วนำสีที่เลือกไปตั้งเป็น `BackColor` ของฟอร์ม พร้อมปรับ `ForeColor` ของ Label ทุกอันให้ Contrast กัน

::: details 💡 คำใบ้ (Hint)
ใช้ `this.BackColor = cd.Color` เปลี่ยนสีฟอร์ม และ `foreach (Control c in this.Controls) { if (c is Label lbl) lbl.ForeColor = ...; }`
:::

---

## 🔥 Challenge (โจทย์ท้าทาย!)

**โจทย์: Batch File Renamer**
สร้างโปรแกรมที่ใช้ FolderBrowserDialog เลือกโฟลเดอร์ แล้วแสดงไฟล์ทั้งหมดใน ListBox มีช่อง Prefix และ Suffix เมื่อกดปุ่ม "เปลี่ยนชื่อทั้งหมด" ให้เพิ่ม Prefix และ Suffix ให้ชื่อไฟล์ทุกไฟล์ในโฟลเดอร์นั้น

---

## 🗣️ ทบทวน (Review)

::: details ❓ คำถามทบทวน 1:
**คำถาม:** เหตุใดจึงต้องใช้ `using` กับ Dialog ทุกตัว?

**แนวคำตอบ:** Dialog Controls เป็น Disposable Object ที่ใช้ Resource ของระบบ (Window Handle, Memory) การใช้ `using` จะทำให้ C# เรียก `.Dispose()` อัตโนมัติเมื่อออกจาก Block ทำให้ Resource ถูก Release ทันที ป้องกัน Memory Leak ในโปรแกรมระยะยาว
:::

::: details ❓ คำถามทบทวน 2:
**คำถาม:** `Filter` ของ OpenFileDialog ต้องเขียนในรูปแบบใด?

**แนวคำตอบ:** รูปแบบคือ `"ชื่อที่แสดง|*.นามสกุล"` และถ้ามีหลาย Filter ให้ใช้ `|` คั่น เช่น `"Images|*.jpg;*.png|Text|*.txt|All|*.*"` สำหรับหลายนามสกุลในกลุ่มเดียวให้ใช้ `;` คั่น เช่น `*.jpg;*.png;*.gif`
:::
