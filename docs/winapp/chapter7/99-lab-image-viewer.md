# 💻 Lab: สร้างโปรแกรมจัดการรูปภาพ (Image Viewer)

> 💡 **เป้าหมาย:** สร้าง Image Viewer ที่ใช้ OpenFileDialog เปิดรูปภาพ, SaveFileDialog บันทึก, ColorDialog เปลี่ยนสีพื้นหลัง และ FolderBrowserDialog สำหรับ Batch Loading รูปจากโฟลเดอร์

## 📖 ภาพรวมของโปรแกรม

```text
[Wireframe: Image Viewer]
+----------------------------------------------------------+
| 🗔 Image Viewer                                  _ □ X  |
+----------------------------------------------------------+
| [ไฟล์▼] [แสดงผล▼]                                       |
+----------------------------------------------------------+
| [📂 เปิด] [📁 โฟลเดอร์] [💾 บันทึก] | [⬅] [➡] [🔍+] |
+----------------------------------------------------------+
|                                                          |
|        ┌─────────────────────────────────┐              |
|        │                                 │              |
|        │    [ PictureBox pbMain ]        │              |
|        │                                 │              |
|        └─────────────────────────────────┘              |
|                                                          |
| ┌─ รายการรูป ──────────────────────────────────────────┐ |
| │ [lstImages — ListBox แสดงชื่อไฟล์]                 │ |
| └──────────────────────────────────────────────────────┘ |
+----------------------------------------------------------+
| ชื่อไฟล์: photo.jpg | ขนาด: 1920x1080 | 2.3 MB         |
+----------------------------------------------------------+
```

## ⏱️ เวลาที่ใช้: 90 นาที

## 📝 ขั้นตอนการทำงาน

### ขั้นตอนที่ 1: UI Design
- [ ] สร้างโปรเจกต์ `ImageViewer`
- [ ] MenuStrip: ไฟล์ (เปิด/เปิดโฟลเดอร์/บันทึก/ออก), แสดงผล (สีพื้นหลัง/ขนาดต้นฉบับ)
- [ ] ToolStrip: เปิด, เปิดโฟลเดอร์, บันทึก, เส้น, ย้อนกลับ, ถัดไป, ซูมเพิ่ม, ซูมลด
- [ ] SplitContainer: Panel1 = ListBox รายการไฟล์, Panel2 = PictureBox
- [ ] StatusStrip: ชื่อไฟล์, ขนาดรูป, ขนาดไฟล์

### ขั้นตอนที่ 2: Code-Behind

::: code-group
```csharp [Form1.cs — โค้ดสมบูรณ์]
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Windows.Forms;

namespace ImageViewer
{
    public partial class Form1 : Form
    {
        private List<string> imageFiles = new List<string>();
        private int currentIndex = -1;

        public Form1()
        {
            InitializeComponent();
            pbMain.SizeMode = PictureBoxSizeMode.Zoom;
            pbMain.BackColor = Color.Black;
        }

        private void menuFileOpen_Click(object sender, EventArgs e)
        {
            using (OpenFileDialog ofd = new OpenFileDialog())
            {
                ofd.Title = "เลือกรูปภาพ";
                ofd.Filter = "Images|*.jpg;*.jpeg;*.png;*.bmp;*.gif;*.webp|All|*.*";
                ofd.Multiselect = true;
                if (ofd.ShowDialog() == DialogResult.OK)
                {
                    imageFiles.Clear();
                    imageFiles.AddRange(ofd.FileNames);
                    LoadFileList();
                    ShowImage(0);
                }
            }
        }

        private void menuFileOpenFolder_Click(object sender, EventArgs e)
        {
            using (FolderBrowserDialog fbd = new FolderBrowserDialog())
            {
                fbd.Description = "เลือกโฟลเดอร์ที่มีรูปภาพ";
                if (fbd.ShowDialog() == DialogResult.OK)
                {
                    string[] extensions = { "*.jpg", "*.jpeg", "*.png", "*.bmp", "*.gif" };
                    imageFiles.Clear();
                    foreach (string ext in extensions)
                        imageFiles.AddRange(Directory.GetFiles(fbd.SelectedPath, ext));

                    if (imageFiles.Count == 0)
                    {
                        MessageBox.Show("ไม่พบรูปภาพในโฟลเดอร์นี้!", "แจ้งเตือน",
                            MessageBoxButtons.OK, MessageBoxIcon.Information);
                        return;
                    }
                    LoadFileList();
                    ShowImage(0);
                }
            }
        }

        private void menuFileSave_Click(object sender, EventArgs e)
        {
            if (pbMain.Image == null) return;
            using (SaveFileDialog sfd = new SaveFileDialog())
            {
                sfd.Filter = "JPEG|*.jpg|PNG|*.png|BMP|*.bmp";
                sfd.FileName = Path.GetFileNameWithoutExtension(imageFiles[currentIndex]) + "_copy";
                if (sfd.ShowDialog() == DialogResult.OK)
                {
                    pbMain.Image.Save(sfd.FileName);
                    MessageBox.Show("บันทึกสำเร็จ!", "สำเร็จ", MessageBoxButtons.OK, MessageBoxIcon.Information);
                }
            }
        }

        private void menuDisplayBgColor_Click(object sender, EventArgs e)
        {
            using (ColorDialog cd = new ColorDialog { Color = pbMain.BackColor })
            {
                if (cd.ShowDialog() == DialogResult.OK)
                    pbMain.BackColor = cd.Color;
            }
        }

        private void LoadFileList()
        {
            lstImages.Items.Clear();
            foreach (string file in imageFiles)
                lstImages.Items.Add(Path.GetFileName(file));
        }

        private void ShowImage(int index)
        {
            if (index < 0 || index >= imageFiles.Count) return;
            currentIndex = index;
            lstImages.SelectedIndex = index;

            Image img = Image.FromFile(imageFiles[index]);
            pbMain.Image = img;

            FileInfo fi = new FileInfo(imageFiles[index]);
            stsFileName.Text = Path.GetFileName(imageFiles[index]);
            stsSize.Text = $"{img.Width} x {img.Height} px";
            stsFileSize.Text = $"{fi.Length / 1024.0:F1} KB";
            stsIndex.Text = $"{index + 1} / {imageFiles.Count}";
        }

        private void tsbPrev_Click(object sender, EventArgs e)
        {
            if (currentIndex > 0) ShowImage(currentIndex - 1);
        }

        private void tsbNext_Click(object sender, EventArgs e)
        {
            if (currentIndex < imageFiles.Count - 1) ShowImage(currentIndex + 1);
        }

        private void lstImages_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (lstImages.SelectedIndex >= 0)
                ShowImage(lstImages.SelectedIndex);
        }
    }
}
```
:::

---

## 🔥 Challenge (โจทย์ท้าทาย!)

**โจทย์:** เพิ่มฟีเจอร์ Slideshow อัตโนมัติโดยใช้ Timer ที่สลับรูปทุก 3 วินาที มีปุ่ม "เล่น Slideshow" และ "หยุด" บน ToolStrip และเมื่อถึงรูปสุดท้ายให้วนกลับมารูปแรก
