# 💻 Lab: สร้างโปรแกรมดาวน์โหลดไฟล์พร้อม Progress

> 💡 **เป้าหมาย:** สร้างโปรแกรม Download Simulator ที่ใช้ async/await, Progress Reporting และ CancellationToken ครบทั้ง 3 อย่าง

## 📖 ภาพรวมของโปรแกรม

```text
[Wireframe: Download Simulator]
+----------------------------------------------------------+
| 🗔 Download Manager                             _ □ X   |
+----------------------------------------------------------+
|  URL: [ txtUrl                              ] [เพิ่ม]    |
|                                                          |
|  ┌─ รายการดาวน์โหลด ─────────────────────────────────┐  |
|  │ ชื่อ     | ขนาด  | สถานะ   | Progress             │  |
|  │ file1.zip| 50MB  | กำลังโหลด| [=======.....] 70%  │  |
|  │ file2.pdf| 10MB  | เสร็จแล้ว| [===========] 100%  │  |
|  └──────────────────────────────────────────────────────┘ |
|                                                          |
|  [ เริ่มดาวน์โหลดทั้งหมด ]  [ ยกเลิกทั้งหมด ]          |
|                                                          |
|  สถานะรวม: กำลังดาวน์โหลด 1/2 ไฟล์ ...                  |
+----------------------------------------------------------+
```

## ⏱️ เวลาที่ใช้: 90 นาที

## 📝 ขั้นตอนการทำงาน

::: code-group
```csharp [Form1.cs — โค้ดสมบูรณ์]
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace DownloadManager
{
    public class DownloadItem
    {
        public string Name { get; set; }
        public int FileSizeMB { get; set; }
        public int Progress { get; set; } = 0;
        public string Status { get; set; } = "รอดาวน์โหลด";
        public ProgressBar ProgressBar { get; set; }
        public Label StatusLabel { get; set; }
    }

    public partial class Form1 : Form
    {
        private List<DownloadItem> downloadQueue = new();
        private CancellationTokenSource cts;

        public Form1()
        {
            InitializeComponent();
        }

        private void btnAddFile_Click(object sender, EventArgs e)
        {
            // จำลองการเพิ่มไฟล์
            string[] sampleFiles = { "document.pdf", "image_pack.zip", "video.mp4", "software.exe", "data.csv" };
            var rnd = new Random();
            string fileName = sampleFiles[rnd.Next(sampleFiles.Length)];
            int sizeMB = rnd.Next(5, 100);

            AddDownloadRow(fileName, sizeMB);
        }

        private void AddDownloadRow(string name, int sizeMB)
        {
            // สร้าง Panel แสดงแถวใหม่ใน FlowLayoutPanel
            Panel row = new Panel { Width = flowDownloads.Width - 20, Height = 50 };

            Label lblName = new Label { Text = $"{name} ({sizeMB} MB)", Location = new System.Drawing.Point(0, 5), Width = 200 };
            ProgressBar pb = new ProgressBar { Location = new System.Drawing.Point(210, 10), Width = 250, Height = 20 };
            Label lblStatus = new Label { Text = "รอ", Location = new System.Drawing.Point(470, 5), Width = 120 };

            row.Controls.AddRange(new Control[] { lblName, pb, lblStatus });
            flowDownloads.Controls.Add(row);

            var item = new DownloadItem
            {
                Name = name,
                FileSizeMB = sizeMB,
                ProgressBar = pb,
                StatusLabel = lblStatus
            };
            downloadQueue.Add(item);
        }

        private async void btnStartAll_Click(object sender, EventArgs e)
        {
            if (downloadQueue.Count == 0)
            {
                MessageBox.Show("ไม่มีไฟล์ในคิว!", "แจ้งเตือน",
                    MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            cts = new CancellationTokenSource();
            btnStartAll.Enabled = false;
            btnCancelAll.Enabled = true;
            lblOverallStatus.Text = "กำลังดาวน์โหลด...";

            try
            {
                // ดาวน์โหลดทีละไฟล์ (Sequential)
                foreach (var item in downloadQueue)
                {
                    if (item.Progress >= 100) continue;
                    await SimulateDownload(item, cts.Token);
                }
                lblOverallStatus.Text = "✅ ดาวน์โหลดทั้งหมดเสร็จสมบูรณ์!";
                MessageBox.Show("ดาวน์โหลดเสร็จสมบูรณ์!", "สำเร็จ",
                    MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
            catch (OperationCanceledException)
            {
                lblOverallStatus.Text = "⛔ ยกเลิกการดาวน์โหลด";
            }
            finally
            {
                btnStartAll.Enabled = true;
                btnCancelAll.Enabled = false;
            }
        }

        private async Task SimulateDownload(DownloadItem item, CancellationToken token)
        {
            item.StatusLabel.Text = "กำลังโหลด...";
            item.StatusLabel.ForeColor = System.Drawing.Color.DodgerBlue;

            var progress = new Progress<int>(percent =>
            {
                item.ProgressBar.Value = percent;
                item.Progress = percent;
            });

            await Task.Run(() =>
            {
                for (int i = 0; i <= 100; i++)
                {
                    token.ThrowIfCancellationRequested();
                    Thread.Sleep(item.FileSizeMB * 2); // ขนาดใหญ่ = โหลดนานกว่า
                    ((IProgress<int>)progress).Report(i);
                }
            }, token);

            item.StatusLabel.Text = "✅ เสร็จแล้ว";
            item.StatusLabel.ForeColor = System.Drawing.Color.Green;
        }

        private void btnCancelAll_Click(object sender, EventArgs e)
        {
            cts?.Cancel();
        }
    }
}
```
:::

## 🔥 Challenge (โจทย์ท้าทาย!)

**โจทย์:** เปลี่ยนจาก Sequential Download (ทีละไฟล์) เป็น Parallel Download (พร้อมกันทุกไฟล์) โดยใช้ `Task.WhenAll()` และจำกัดให้ดาวน์โหลดพร้อมกันได้สูงสุด 3 ไฟล์ด้วย `SemaphoreSlim(3)`
