# 01 - Timer & ProgressBar

> 💡 **เป้าหมาย:** เรียนรู้การใช้ Timer เพื่อทำงานซ้ำๆ ในพื้นหลัง และ ProgressBar เพื่อแสดงความคืบหน้าของกระบวนการ เช่น การนับถอยหลัง, นาฬิกา Real-time และ Progress งานที่ใช้เวลานาน

## 📖 ทฤษฎีและแนวคิด UI (UI Concept & Theory)

**ปัญหาหลักของ WinForms:** เมื่อเราเขียน Loop ที่ทำงานนานในปุ่ม Click Event UI จะค้าง (Freeze) เพราะ C# รันโค้ดทั้งหมดบน UI Thread เดียวกัน Timer แก้ปัญหานี้โดยแบ่งงานเป็น Tick เล็กๆ ที่ไม่บล็อก UI

```text
❌ วิธีผิด — UI จะค้าง:
private void btnProcess_Click(object sender, EventArgs e)
{
    for (int i = 0; i <= 100; i++)
    {
        Thread.Sleep(50);           // ← บล็อก UI Thread!
        progressBar.Value = i;      // ← ไม่ Repaint เพราะ Thread ยุ่ง
    }
}

✅ วิธีถูก — ใช้ Timer:
Timer processTimer; int progress = 0;
private void btnStart_Click(...) { processTimer.Start(); }
private void processTimer_Tick(...) {
    progress++;
    progressBar.Value = progress;
    if (progress >= 100) processTimer.Stop();
}
```

### 🔑 Properties ที่สำคัญ

**Timer:**
| Property | การทำงาน | ค่าแนะนำ |
| :--- | :--- | :--- |
| `Interval` | ระยะเวลาระหว่าง Tick (มิลลิวินาที) | `1000` = 1 วินาที |
| `Enabled` | เปิด/ปิด Timer | `false` (เริ่มต้น) |

**ProgressBar:**
| Property | การทำงาน | ค่าแนะนำ |
| :--- | :--- | :--- |
| `Minimum` | ค่าน้อยสุด | `0` |
| `Maximum` | ค่ามากสุด | `100` |
| `Value` | ค่าปัจจุบัน | `0` |
| `Style` | `Blocks`, `Continuous`, `Marquee` | `Continuous` |
| `Step` | ค่าที่เพิ่มเมื่อเรียก `.PerformStep()` | `10` |

---

## 🛠️ การตั้งค่า Properties (UI Setup)

| Control | Property | ค่าที่ตั้ง |
| :--- | :--- | :--- |
| `Form1` | `Text` | `"Timer & ProgressBar Demo"` |
| `ProgressBar` | `Name` | `pbProgress` |
| `ProgressBar` | `Minimum` | `0` |
| `ProgressBar` | `Maximum` | `100` |
| `ProgressBar` | `Style` | `Continuous` |
| `Label` (เปอร์เซ็นต์) | `Name` | `lblPercent` |
| `Label` (นาฬิกา) | `Name` | `lblClock` |
| `Label` (นับถอยหลัง) | `Name` | `lblCountdown` |
| `Button` (เริ่ม) | `Name` | `btnStart` |
| `Button` (หยุด) | `Name` | `btnStop` |
| `Button` (รีเซ็ต) | `Name` | `btnReset` |
| `Timer` (นาฬิกา) | `Name` | `timerClock` |
| `Timer` (นาฬิกา) | `Interval` | `1000` |
| `Timer` (Progress) | `Name` | `timerProgress` |
| `Timer` (Progress) | `Interval` | `100` |

---

## 💻 ตัวอย่างโค้ด (Code Implementation)

::: code-group
```csharp [Form1.cs]
using System;
using System.Windows.Forms;

namespace TimerDemo
{
    public partial class Form1 : Form
    {
        private int countdown = 60; // นับถอยหลัง 60 วินาที
        private int progressValue = 0;

        public Form1()
        {
            InitializeComponent();
            timerClock.Start(); // เริ่มนาฬิกาทันที
        }

        // [1] นาฬิกา Real-time — Tick ทุก 1 วินาที
        private void timerClock_Tick(object sender, EventArgs e)
        {
            lblClock.Text = DateTime.Now.ToString("HH:mm:ss");

            // นับถอยหลัง
            if (countdown > 0)
            {
                countdown--;
                lblCountdown.Text = $"นับถอยหลัง: {countdown} วินาที";
                if (countdown == 0)
                    lblCountdown.ForeColor = System.Drawing.Color.Red;
            }
        }

        // [2] ProgressBar — เพิ่มทีละ 1% ทุก 100ms
        private void timerProgress_Tick(object sender, EventArgs e)
        {
            if (progressValue < 100)
            {
                progressValue++;
                pbProgress.Value = progressValue;
                lblPercent.Text = $"{progressValue}%";

                // เปลี่ยนสีเมื่อครบ 100%
                if (progressValue == 100)
                {
                    timerProgress.Stop();
                    lblPercent.Text = "✅ เสร็จสมบูรณ์!";
                    lblPercent.ForeColor = System.Drawing.Color.Green;
                    btnStart.Enabled = true;
                    btnStop.Enabled = false;
                    MessageBox.Show("ประมวลผลเสร็จสมบูรณ์!", "สำเร็จ",
                        MessageBoxButtons.OK, MessageBoxIcon.Information);
                }
            }
        }

        private void btnStart_Click(object sender, EventArgs e)
        {
            timerProgress.Start();
            btnStart.Enabled = false;
            btnStop.Enabled = true;
            lblPercent.ForeColor = System.Drawing.Color.Black;
        }

        private void btnStop_Click(object sender, EventArgs e)
        {
            timerProgress.Stop();
            btnStart.Enabled = true;
            btnStop.Enabled = false;
        }

        private void btnReset_Click(object sender, EventArgs e)
        {
            timerProgress.Stop();
            progressValue = 0;
            pbProgress.Value = 0;
            lblPercent.Text = "0%";
            lblPercent.ForeColor = System.Drawing.Color.Black;
            btnStart.Enabled = true;
            btnStop.Enabled = false;
        }
    }
}
```
:::

**Expected Output:**
```text
lblClock อัพเดตทุกวินาที: "14:32:05", "14:32:06" ...
กดปุ่ม "เริ่ม" → pbProgress เพิ่มทุก 100ms
เมื่อครบ 100% → timerProgress หยุด → MessageBox "เสร็จสมบูรณ์!"
นับถอยหลัง: เริ่มที่ 60 ลดทีละ 1 ทุกวินาที
```

---

## 🎯 โจทย์ฝึกปฏิบัติเสริมความเข้าใจ (Mini Exercise)

**โจทย์ที่ 1: ไฟจราจร**
สร้างโปรแกรมจำลองไฟจราจรด้วย 3 Label วงกลม (แดง/เหลือง/เขียว) ที่สลับสี อัตโนมัติตาม Timer: เขียว 5 วิ → เหลือง 2 วิ → แดง 5 วิ → วนซ้ำ

**โจทย์ที่ 2: Pomodoro Timer**
สร้าง Pomodoro Timer ที่มี ProgressBar นับถอยหลัง 25 นาที เมื่อครบให้ Pop MessageBox "หยุดพัก 5 นาที!" แล้วเริ่มนับ 5 นาทีพักต่อ

::: details 💡 คำใบ้ (Hint)
ใช้ Timer Interval = 1000 และตัวแปร `int remainingSeconds = 25 * 60` ลดทีละ 1 ทุก Tick ปรับ `pbProgress.Value = remainingSeconds`
:::

---

## 🔥 Challenge (โจทย์ท้าทาย!)

**โจทย์: ProgressBar แบบ Marquee Loading Screen**
สร้างหน้า Loading Screen ที่มี ProgressBar Style=Marquee (เลื่อนไม่หยุด) แสดงระหว่าง "กำลังโหลด..." เป็นเวลา 3 วินาที แล้วเปลี่ยนไปแสดงหน้าหลักอัตโนมัติ

---

## 🗣️ ทบทวน (Review)

::: details ❓ คำถามทบทวน 1:
**คำถาม:** ทำไม UI จึง Freeze เมื่อเรา Loop ใน Button Click Event?

**แนวคำตอบ:** WinForms ทำงานบน Single Thread (UI Thread) เดียว ทุก Event Handler รวมถึง Paint (Repaint UI) ทำงานบน Thread เดียวกัน เมื่อ Button Click Handler วน Loop อยู่ Thread จะไม่มีโอกาสประมวลผล Message อื่น รวมถึง WM_PAINT ทำให้ UI ค้างและไม่ตอบสนอง
:::

::: details ❓ คำถามทบทวน 2:
**คำถาม:** `ProgressBar.Style = Marquee` ต่างจาก `Continuous` อย่างไร?

**แนวคำตอบ:** `Continuous` แสดงความคืบหน้าตามค่า `Value` (0-100) เหมาะเมื่อรู้เปอร์เซ็นต์ความสำเร็จ ส่วน `Marquee` เป็นแถบเคลื่อนไหวต่อเนื่องโดยไม่สนใจ Value เหมาะเมื่อไม่รู้ว่าจะใช้เวลานานแค่ไหน เช่น กำลังเชื่อมต่อ Server
:::
