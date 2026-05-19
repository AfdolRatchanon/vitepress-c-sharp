# 02 - Properties.Settings & JSON Serialization

> 💡 **เป้าหมาย:** เรียนรู้การบันทึกการตั้งค่าผู้ใช้ (User Preferences) ด้วย Properties.Settings ของ WinForms และการแปลง Object เป็น JSON และกลับด้วย `System.Text.Json` เพื่อให้แอปพลิเคชันจำการตั้งค่าระหว่างรอบการใช้งาน

## 📖 ทฤษฎีและแนวคิด UI (UI Concept & Theory)

ผู้ใช้มักต้องการให้แอปพลิเคชัน "จำ" ค่าที่ตั้งไว้ เช่น ธีมสี, ชื่อผู้ใช้, ตำแหน่งหน้าต่าง:

**วิธีที่ 1: Properties.Settings** — เหมาะสำหรับค่าง่ายๆ เช่น string, int, bool ที่ Windows จัดการให้ผ่าน Registry/AppData

**วิธีที่ 2: JSON File** — เหมาะสำหรับข้อมูลซับซ้อนที่ต้องการ Portability (ย้ายไฟล์ได้)

---

## 🛠️ การตั้งค่า Properties.Settings

**วิธีเพิ่ม Setting:**
1. คลิกขวาที่ Project > Properties > Settings
2. คลิก "Click here to create..." เพื่อเปิด Settings Designer
3. เพิ่มรายการ: Name=`LastUsername`, Type=`string`, Scope=`User`, Value=`""`
4. เพิ่ม: Name=`ThemeColor`, Type=`string`, Scope=`User`, Value=`"SteelBlue"`
5. เพิ่ม: Name=`WindowWidth`, Type=`int`, Scope=`User`, Value=`800`

---

## 💻 ตัวอย่างโค้ด (Code Implementation)

::: code-group
```csharp [Form1.cs — Properties.Settings]
using System;
using System.Drawing;
using System.Windows.Forms;

namespace SettingsDemo
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            // [1] โหลดการตั้งค่าที่บันทึกไว้ครั้งก่อน
            txtUsername.Text = Properties.Settings.Default.LastUsername;
            this.Width = Properties.Settings.Default.WindowWidth > 0
                ? Properties.Settings.Default.WindowWidth : 800;

            // โหลดสีธีม
            try
            {
                this.BackColor = ColorTranslator.FromHtml(
                    Properties.Settings.Default.ThemeColor);
            }
            catch { this.BackColor = Color.SteelBlue; }
        }

        private void btnSaveSettings_Click(object sender, EventArgs e)
        {
            // [2] บันทึกค่าลง Settings
            Properties.Settings.Default.LastUsername = txtUsername.Text;
            Properties.Settings.Default.WindowWidth = this.Width;
            Properties.Settings.Default.ThemeColor =
                ColorTranslator.ToHtml(this.BackColor);

            // [3] ต้องเรียก .Save() เพื่อ Persist ลง Disk
            Properties.Settings.Default.Save();

            MessageBox.Show("บันทึกการตั้งค่าสำเร็จ!", "สำเร็จ",
                MessageBoxButtons.OK, MessageBoxIcon.Information);
        }

        private void btnChangeTheme_Click(object sender, EventArgs e)
        {
            using (ColorDialog cd = new ColorDialog())
            {
                if (cd.ShowDialog() == DialogResult.OK)
                    this.BackColor = cd.Color;
            }
        }
    }
}
```

```csharp [JsonHelper.cs — JSON Serialization]
using System.Collections.Generic;
using System.IO;
using System.Text.Json;

namespace SettingsDemo
{
    public class AppConfig
    {
        public string Username { get; set; } = "";
        public string Theme { get; set; } = "Blue";
        public bool ShowWelcome { get; set; } = true;
        public List<string> RecentFiles { get; set; } = new();
    }

    public static class JsonHelper
    {
        private static readonly string configPath = Path.Combine(
            System.Environment.GetFolderPath(System.Environment.SpecialFolder.MyDocuments),
            "MyApp", "config.json");

        // [4] บันทึก Object เป็น JSON
        public static void Save(AppConfig config)
        {
            Directory.CreateDirectory(Path.GetDirectoryName(configPath));
            var options = new JsonSerializerOptions { WriteIndented = true };
            string json = JsonSerializer.Serialize(config, options);
            File.WriteAllText(configPath, json, System.Text.Encoding.UTF8);
        }

        // [5] โหลด JSON กลับเป็น Object
        public static AppConfig Load()
        {
            if (!File.Exists(configPath))
                return new AppConfig(); // ส่งค่าเริ่มต้นถ้ายังไม่มีไฟล์

            string json = File.ReadAllText(configPath, System.Text.Encoding.UTF8);
            return JsonSerializer.Deserialize<AppConfig>(json) ?? new AppConfig();
        }
    }
}
```
:::

**Expected Output:**
```text
รอบแรก: ฟอร์มเปิด ชื่อว่าง, ขนาด 800px
ตั้งค่า username = "สมชาย" กด "บันทึก"
ปิดโปรแกรมแล้วเปิดใหม่ → txtUsername แสดง "สมชาย" อัตโนมัติ!
```

---

## 🎯 โจทย์ฝึกปฏิบัติเสริมความเข้าใจ (Mini Exercise)

**โจทย์: จำตำแหน่งหน้าต่าง**
บันทึก `this.Location.X`, `this.Location.Y` และ `this.Size` ลง Settings ทุกครั้งที่ปิดหน้าต่าง (`Form_FormClosing`) โหลดและ Restore ตำแหน่งเดิมทุกครั้งที่เปิด

---

## 🔥 Challenge (โจทย์ท้าทาย!)

**โจทย์: Recent Files Menu**
ใช้ JSON บันทึกรายชื่อไฟล์ที่เปิดล่าสุด (สูงสุด 5 ไฟล์) เมื่อเปิดโปรแกรมให้โหลดรายชื่อและแสดงเป็น MenuItem ใต้เมนู `ไฟล์ > เปิดล่าสุด` โดยแต่ละรายการกดแล้วเปิดไฟล์นั้นได้ทันที
