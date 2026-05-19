# 01 - GDI+ และการวาดกราฟิก

> 💡 **เป้าหมาย:** เรียนรู้การใช้คลาส `Graphics`, `Pen`, และ `Brush` ใน Namespace `System.Drawing` เพื่อวาดเส้นและรูปร่างลงบนหน้าจอด้วยตนเอง

## 📖 ทฤษฎีและแนวคิด UI (UI Concept & Theory)

**GDI+ (Graphics Device Interface)** เป็น API ของ Windows ที่ให้เราสามารถสั่งจอมอนิเตอร์ให้แสดงเส้น สี และกราฟิกได้ 
การวาดบน WinForms ต้องวาดใน Event **`Paint`** เท่านั้น! เพราะถ้าวาดนอก Event นี้ เมื่อหน้าต่างถูกย่อหรือมีหน้าต่างอื่นมาบัง รูปที่เราวาดไว้จะหายไป (เนื่องจาก Windows ไม่รู้ว่าต้องวาดซ้ำ)

**คลาสสำคัญ:**
- `Graphics` : ผืนผ้าใบและพู่กันหลัก
- `Pen` : ปากกาสำหรับวาด "เส้นรอบนอก" (Outline)
- `Brush` : แปรงสำหรับ "เทสี" พื้นที่ด้านใน (Fill)
- `Rectangle` : โครงสร้างสี่เหลี่ยม (ตำแหน่ง X, Y และความกว้าง, ความสูง)

---

## 💻 ตัวอย่างโค้ด (Code Implementation)

ในตัวอย่างนี้ เราจะสร้างโปรแกรมวาดรูปวงกลมและเส้นอย่างง่าย 

::: code-group
```csharp [Form1.cs — วาดกราฟิก]
using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Windows.Forms;

namespace GdiGraphicsDemo
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
            
            // เปิดการลบรอยหยัก (Anti-Aliasing) เพื่อให้เส้นเนียนขึ้น
            this.DoubleBuffered = true; 
        }

        // [1] เขียนโค้ดวาดรูปใน Event: Paint ของฟอร์มหรือ Panel
        private void Form1_Paint(object sender, PaintEventArgs e)
        {
            // ดึงออบเจ็กต์ Graphics ออกมาจาก Event
            Graphics g = e.Graphics;

            // ทำให้เส้นโค้งมีความสมูท ไม่แตกเป็นเม็ดพิกเซล
            g.SmoothingMode = SmoothingMode.AntiAlias;

            // [2] วาดเส้นตรง (Pen)
            using (Pen redPen = new Pen(Color.Red, 3)) // ปากกาสีแดง หนา 3px
            {
                // จุดเริ่มต้น (x:50, y:50) ถึง (x:250, y:50)
                g.DrawLine(redPen, 50, 50, 250, 50);
            }

            // [3] วาดสี่เหลี่ยมโปร่ง (DrawRectangle)
            using (Pen bluePen = new Pen(Color.Blue, 2))
            {
                g.DrawRectangle(bluePen, 50, 80, 100, 100);
            }

            // [4] วาดวงกลม/วงรีทึบ (FillEllipse)
            using (SolidBrush greenBrush = new SolidBrush(Color.ForestGreen))
            {
                g.FillEllipse(greenBrush, 180, 80, 100, 100);
            }

            // [5] วาดข้อความ (DrawString)
            using (Font myFont = new Font("Tahoma", 16, FontStyle.Bold))
            using (SolidBrush textBrush = new SolidBrush(Color.Black))
            {
                g.DrawString("สวัสดี GDI+", myFont, textBrush, 50, 200);
            }

            // [6] วาดกราดิเอนต์ (LinearGradientBrush)
            Rectangle gradientRect = new Rectangle(50, 250, 250, 50);
            using (LinearGradientBrush gradBrush = new LinearGradientBrush(
                gradientRect, Color.DarkBlue, Color.LightBlue, 45f))
            {
                g.FillRectangle(gradBrush, gradientRect);
            }
        }
    }
}
```
:::

---

## 🎯 โจทย์ฝึกปฏิบัติเสริมความเข้าใจ (Mini Exercise)

**โจทย์: มินิโปรแกรมวาดรูป (Paint App)**
วาง `Panel` ลงบนฟอร์ม เมื่อผู้ใช้คลิกและลากเมาส์บน Panel ให้วาดเส้นตามเมาส์

::: details 💡 คำใบ้ (Hint)
1. ใช้ Event `MouseDown`, `MouseMove`, `MouseUp` ของ Panel
2. เก็บพิกัดล่าสุดไว้ในตัวแปร `Point lastPoint;`
3. ใน `MouseMove` หากกดเมาส์ค้างอยู่ ให้สร้าง `Graphics g = pnlCanvas.CreateGraphics();` แล้วเรียก `g.DrawLine(pen, lastPoint, e.Location);` แล้วอัพเดต `lastPoint = e.Location;`
:::

---

## 🗣️ ทบทวน (Review)

::: details ❓ คำถามทบทวน 1:
**คำถาม:** เหตุใดเราจึงใช้บล็อก `using` หรือเรียก `.Dispose()` เมื่อสร้าง `Pen`, `Brush`, และ `Font`?

**แนวคำตอบ:** ทรัพยากรเหล่านี้ (GDI objects) อ้างอิงกับทรัพยากรระดับระบบปฏิบัติการ (OS Handles) ซึ่งมีจำนวนจำกัด หากเราสร้างขึ้นมาใหม่เรื่อยๆ ใน Event Paint แต่ไม่คืนหน่วยความจำ ระบบปฏิบัติการจะ Handle ไม่ไหวและแอพจะล่มแบบ Out of Memory การใช้ `using` รับประกันการคืนหน่วยความจำทันทีที่วาดเสร็จ
:::
