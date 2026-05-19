# 02 - async/await & Task ใน WinForms

> 💡 **เป้าหมาย:** เรียนรู้การเขียนโค้ด Asynchronous ด้วย `async/await` และ `Task` เพื่อทำงานหนักๆ เช่น โหลดข้อมูลจาก Database หรือเรียก API โดยไม่ทำให้ UI ค้าง พร้อมแก้ปัญหา Cross-Thread Exception

## 📖 ทฤษฎีและแนวคิด UI (UI Concept & Theory)

Timer เหมาะกับงาน "ทำซ้ำทุก X วินาที" แต่สำหรับงานที่ "ทำครั้งเดียวแต่นาน" เช่น อ่านไฟล์ขนาดใหญ่ หรือดึงข้อมูลจาก API เราใช้ `async/await` แทน

```text
[ปัญหาและวิธีแก้]

❌ Synchronous (บล็อก UI):
private void btnLoad_Click(...)
{
    Thread.Sleep(5000);       // ← UI ค้าง 5 วินาที!
    lblResult.Text = "Done";
}

✅ Asynchronous (ไม่บล็อก):
private async void btnLoad_Click(...)
{
    lblStatus.Text = "กำลังโหลด...";
    btnLoad.Enabled = false;

    await Task.Delay(5000);   // ← รอโดยไม่บล็อก UI

    lblResult.Text = "Done";
    btnLoad.Enabled = true;
}
```

**กฎ Cross-Thread:** ห้ามอัพเดต UI Control จาก Thread ที่ไม่ใช่ UI Thread โดยตรง ต้องใช้ `Invoke()` หรือเปลี่ยนมาใช้ `async/await` ซึ่งจัดการให้อัตโนมัติ

---

## 🛠️ การตั้งค่า Properties (UI Setup)

| Control | Property | ค่าที่ตั้ง |
| :--- | :--- | :--- |
| `Form1` | `Text` | `"Async Demo"` |
| `ProgressBar` | `Name` | `pbAsync` |
| `ProgressBar` | `Style` | `Marquee` |
| `ProgressBar` | `Visible` | `false` |
| `Label` (สถานะ) | `Name` | `lblStatus` |
| `Button` (โหลด) | `Name` | `btnLoad` |
| `Button` (โหลด) | `Text` | `"โหลดข้อมูล"` |
| `ListBox` | `Name` | `lstResults` |

---

## 💻 ตัวอย่างโค้ด (Code Implementation)

::: code-group
```csharp [Form1.cs — Async/Await]
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace AsyncDemo
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        // [1] Event Handler ต้องเป็น async void
        private async void btnLoad_Click(object sender, EventArgs e)
        {
            // [2] แสดงสถานะกำลังโหลด
            SetLoadingState(true);
            lstResults.Items.Clear();

            try
            {
                // [3] เรียกงานหนักแบบ Async — UI ยังใช้งานได้ขณะรอ
                List<string> data = await LoadDataAsync();

                // [4] เมื่อได้ข้อมูลแล้ว อัพเดต UI ได้เลย
                // เพราะ async/await ต่อ Thread กลับที่ UI Thread อัตโนมัติ
                foreach (string item in data)
                    lstResults.Items.Add(item);

                lblStatus.Text = $"โหลดสำเร็จ: {data.Count} รายการ";
            }
            catch (Exception ex)
            {
                MessageBox.Show($"เกิดข้อผิดพลาด: {ex.Message}", "Error",
                    MessageBoxButtons.OK, MessageBoxIcon.Error);
                lblStatus.Text = "โหลดล้มเหลว";
            }
            finally
            {
                SetLoadingState(false);
            }
        }

        // [5] Method ที่ทำงานใน Background Thread
        private async Task<List<string>> LoadDataAsync()
        {
            // จำลองการโหลดข้อมูลที่ใช้เวลา 3 วินาที
            await Task.Delay(3000);

            // ส่งข้อมูลคืน
            return new List<string>
            {
                "รายการที่ 1: สินค้า A",
                "รายการที่ 2: สินค้า B",
                "รายการที่ 3: สินค้า C",
                "รายการที่ 4: สินค้า D",
                "รายการที่ 5: สินค้า E",
            };
        }

        private void SetLoadingState(bool isLoading)
        {
            btnLoad.Enabled = !isLoading;
            pbAsync.Visible = isLoading;
            lblStatus.Text = isLoading ? "กำลังโหลดข้อมูล..." : "";
        }

        // [6] ตัวอย่าง Progress แบบ Report จาก Background Task
        private async void btnLoadWithProgress_Click(object sender, EventArgs e)
        {
            pbProgress.Value = 0;
            pbProgress.Style = ProgressBarStyle.Continuous;
            btnLoadWithProgress.Enabled = false;

            var progress = new Progress<int>(percent =>
            {
                // Callback นี้ทำงานบน UI Thread อัตโนมัติ
                pbProgress.Value = percent;
                lblStatus.Text = $"กำลังประมวลผล {percent}%";
            });

            await Task.Run(() => ProcessWithProgress(progress));

            lblStatus.Text = "เสร็จสมบูรณ์!";
            btnLoadWithProgress.Enabled = true;
        }

        private void ProcessWithProgress(IProgress<int> progress)
        {
            for (int i = 0; i <= 100; i++)
            {
                System.Threading.Thread.Sleep(30);
                progress?.Report(i); // ส่ง Progress กลับไปอัพเดต UI
            }
        }
    }
}
```
:::

**Expected Output:**
```text
กด "โหลดข้อมูล"
→ ProgressBar แบบ Marquee ปรากฏ + ปุ่มถูก Disable
→ UI ยังตอบสนอง เลื่อน Scroll ได้ คลิกได้
→ หลัง 3 วินาที: ProgressBar หายไป + ListBox แสดง 5 รายการ
→ lblStatus: "โหลดสำเร็จ: 5 รายการ"
```

---

## 🎯 โจทย์ฝึกปฏิบัติเสริมความเข้าใจ (Mini Exercise)

**โจทย์ที่ 1: อ่านไฟล์ขนาดใหญ่แบบ Async**
สร้างปุ่ม "เปิดไฟล์ขนาดใหญ่" ที่ใช้ `await File.ReadAllTextAsync()` อ่านไฟล์ .txt แสดงจำนวนบรรทัดและคำใน Label โดย UI ไม่ค้าง

**โจทย์ที่ 2: ยกเลิก Task ด้วย CancellationToken**
เพิ่มปุ่ม "ยกเลิก" ที่ทำงานขณะกำลังโหลด โดยใช้ `CancellationTokenSource` และ `token.ThrowIfCancellationRequested()` เพื่อหยุดการโหลดกลางคัน

::: details 💡 คำใบ้ (Hint)
`var cts = new CancellationTokenSource();` แล้วส่ง `cts.Token` เข้า Task กด "ยกเลิก" เรียก `cts.Cancel()` ใช้ `try-catch (OperationCanceledException)` จัดการ
:::

---

## 🔥 Challenge (โจทย์ท้าทาย!)

**โจทย์: Parallel Download Simulator**
จำลองการดาวน์โหลดไฟล์ 5 ไฟล์พร้อมกัน แต่ละไฟล์มี ProgressBar ของตัวเอง ใช้ `Task.WhenAll()` รอให้ทุก Task เสร็จ แล้วแสดง MessageBox "ดาวน์โหลดทั้งหมดเสร็จสมบูรณ์!"

---

## 🗣️ ทบทวน (Review)

::: details ❓ คำถามทบทวน 1:
**คำถาม:** ทำไม Event Handler สำหรับ Async ถึงต้องเป็น `async void` แทน `async Task`?

**แนวคำตอบ:** Event Handler ของ WinForms กำหนด Signature เป็น `void` ไว้ก่อนแล้ว เราจึงต้องใช้ `async void` แทน `async Task` ซึ่งเป็นข้อยกเว้นของ Async Best Practice เฉพาะ Event Handler เท่านั้น ในทุก Method อื่นควรใช้ `async Task`
:::

::: details ❓ คำถามทบทวน 2:
**คำถาม:** `IProgress<T>` และ `Progress<T>` ช่วยแก้ปัญหาอะไร?

**แนวคำตอบ:** เมื่อ Task ทำงานใน Background Thread การอัพเดต UI Control โดยตรงจะเกิด Cross-Thread Exception `IProgress<T>` เป็น Interface ที่ส่ง Report ข้ามกลับมาทำงานบน UI Thread โดยอัตโนมัติ ทำให้อัพเดต ProgressBar หรือ Label ได้อย่างปลอดภัย
:::
