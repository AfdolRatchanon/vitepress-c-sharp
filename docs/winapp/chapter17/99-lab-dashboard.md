# 💻 Lab: สร้าง Dashboard พร้อมกราฟแท่งแบบ Custom

> 💡 **เป้าหมาย:** บูรณาการความรู้ GDI+ และ Modern UI สร้างหน้าจอ Dashboard แสดงยอดขายที่มีดีไซน์สวยงาม โทนสีเข้ม (Dark Theme) และวาดกราฟแท่ง (Bar Chart) ขึ้นมาเองด้วยคลาส `Graphics`

## 📖 ภาพรวมของโปรแกรม

```text
[Wireframe: Modern Dashboard]
+----------------------------------------------------------+
| 🗔 Dashboard                                      _ □ X |
+----------------------------------------------------------+
|  [ Panel สรุปข้อมูล (โค้งมน) ]                             |
|  ยอดขายรวม        จำนวนออร์เดอร์       ผู้เข้าชม            |
|  $14,500        125             842                |
+----------------------------------------------------------+
|                                                          |
|  [ กราฟยอดขาย 7 วันล่าสุด (วาดด้วย GDI+) ]                  |
|                                                          |
|   |          [===]                                       |
|   |   [===]  [===]                [===]                  |
|   |   [===]  [===]  [===]  [===]  [===]  [===]           |
|   +------------------------------------------------      |
|        จ      อ     พ     พฤ     ศ     ส      อา       |
|                                                          |
+----------------------------------------------------------+
```

## ⏱️ เวลาที่ใช้: 60 นาที

## 📝 ขั้นตอนการทำงาน

::: code-group
```csharp [Form1.cs — โค้ดวาด Dashboard]
using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Runtime.InteropServices;
using System.Windows.Forms;

namespace DashboardApp
{
    public partial class Form1 : Form
    {
        // ข้อมูลจำลองยอดขาย 7 วัน
        private int[] salesData = { 1500, 3200, 2100, 1800, 4500, 3800, 2900 };
        private string[] days = { "จ", "อ", "พ", "พฤ", "ศ", "ส", "อา" };

        // โค้ดลากหน้าต่าง (จากบทเรียนที่ 2)
        public const int WM_NCLBUTTONDOWN = 0xA1;
        public const int HT_CAPTION = 0x2;
        [DllImport("user32.dll")] public static extern int SendMessage(IntPtr hWnd, int Msg, int wParam, int lParam);
        [DllImport("user32.dll")] public static extern bool ReleaseCapture();

        public Form1()
        {
            InitializeComponent();
            
            // ตั้งค่า Modern UI
            this.FormBorderStyle = FormBorderStyle.None;
            this.BackColor = Color.FromArgb(32, 33, 36); // สีเทาเข้ม
            
            // สมมติว่ามี Panel ชื่อ pnlChart สำหรับวาดกราฟ
            pnlChart.Paint += PnlChart_Paint;
            pnlChart.Resize += (s, e) => pnlChart.Invalidate(); // วาดใหม่เมื่อปรับขนาด
        }

        private void pnlTopBar_MouseDown(object sender, MouseEventArgs e)
        {
            if (e.Button == MouseButtons.Left)
            {
                ReleaseCapture();
                SendMessage(Handle, WM_NCLBUTTONDOWN, HT_CAPTION, 0);
            }
        }

        private void btnClose_Click(object sender, EventArgs e) => Application.Exit();

        // ฟังก์ชันวาดกราฟแท่ง
        private void PnlChart_Paint(object sender, PaintEventArgs e)
        {
            Graphics g = e.Graphics;
            g.SmoothingMode = SmoothingMode.AntiAlias;

            int width = pnlChart.Width;
            int height = pnlChart.Height;
            
            // กำหนดขอบ (Margin)
            int marginLeft = 50;
            int marginBottom = 40;
            int marginTop = 20;
            int marginRight = 20;

            // วาดแกน X และ Y
            using (Pen axisPen = new Pen(Color.Gray, 2))
            {
                g.DrawLine(axisPen, marginLeft, marginTop, marginLeft, height - marginBottom); // แกน Y
                g.DrawLine(axisPen, marginLeft, height - marginBottom, width - marginRight, height - marginBottom); // แกน X
            }

            // คำนวณความกว้างของแต่ละแท่ง
            int barCount = salesData.Length;
            int availableWidth = width - marginLeft - marginRight;
            int spacing = 15;
            int barWidth = (availableWidth / barCount) - spacing;

            // หาค่าสูงสุดเพื่อเทียบอัตราส่วนความสูง
            int maxValue = 5000; // สมมติค่าสูงสุดที่ 5000
            int maxBarHeight = height - marginTop - marginBottom;

            using (Font textFont = new Font("Segoe UI", 10))
            using (SolidBrush textBrush = new SolidBrush(Color.LightGray))
            using (SolidBrush barBrush = new SolidBrush(Color.FromArgb(92, 124, 250))) // สีฟ้าน้ำทะเล
            {
                for (int i = 0; i < barCount; i++)
                {
                    // คำนวณความสูงแท่งนี้
                    int barHeight = (int)(((double)salesData[i] / maxValue) * maxBarHeight);
                    
                    // คำนวณพิกัด
                    int x = marginLeft + (i * (barWidth + spacing)) + (spacing / 2);
                    int y = height - marginBottom - barHeight;

                    // วาดแท่งกราฟ (สี่เหลี่ยม)
                    g.FillRectangle(barBrush, x, y, barWidth, barHeight);

                    // วาดตัวเลขบนแท่ง
                    string valText = salesData[i].ToString();
                    SizeF valSize = g.MeasureString(valText, textFont);
                    g.DrawString(valText, textFont, Brushes.White, x + (barWidth - valSize.Width) / 2, y - 20);

                    // วาดชื่อวันใต้แกน X
                    SizeF daySize = g.MeasureString(days[i], textFont);
                    g.DrawString(days[i], textFont, textBrush, x + (barWidth - daySize.Width) / 2, height - marginBottom + 10);
                }
            }
        }
    }
}
```
:::

## 🔥 Challenge (โจทย์ท้าทาย!)

**โจทย์:** เพิ่ม Animation ให้กราฟแท่ง! 
โดยแทนที่จะให้กราฟโผล่มาเต็มความสูงทันที ให้สร้าง `Timer` ที่จะค่อยๆ เพิ่มความสูงของแท่งกราฟจาก 0 ขึ้นไปจนถึงค่าจริง (วาดซ้ำด้วย `Invalidate()`) 
