# 💻 Lab: สร้าง Currency Converter ใช้ API อัตราแลกเปลี่ยน

> 💡 **เป้าหมาย:** สร้างโปรแกรมแปลงสกุลเงินแบบ Real-time โดยดึงข้อมูลอัตราแลกเปลี่ยนจริงจาก Public API 

## 📖 ภาพรวมของโปรแกรม

```text
[Wireframe: Currency Converter]
+----------------------------------------------------------+
| 🗔 ตัวแปลงสกุลเงิน                              _ □ X   |
+----------------------------------------------------------+
|  จำนวนเงิน: [ 1000     ]                               |
|  จากสกุล:   [ USD ▼    ]                               |
|  แปลงเป็น:  [ THB ▼    ]                               |
|                                                          |
|  [ 💱 แปลงเงิน ]                                        |
|                                                          |
|  ผลลัพธ์: 1,000 USD = 34,500.00 THB                     |
|                                                          |
|  * อัปเดตล่าสุด: 2026-05-18                             |
+----------------------------------------------------------+
```

## ⏱️ เวลาที่ใช้: 60 นาที

## 📝 ขั้นตอนการทำงาน

เราจะใช้ API ฟรีจาก `https://api.exchangerate-api.com/v4/latest/USD` 
(API นี้ไม่ต้องใช้ API Key และคืนค่า Base เป็น USD โดยมีอัตรารายสกุลเงินใน property `rates`)

::: code-group
```csharp [ExchangeRateModel.cs — Model ของ JSON]
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace CurrencyConverterApp
{
    // โครงสร้างที่รับมาจาก API
    public class ExchangeRateResponse
    {
        [JsonPropertyName("base")]
        public string BaseCurrency { get; set; }

        [JsonPropertyName("date")]
        public string Date { get; set; }

        // ดึง rates เป็น Dictionary เพราะเป็น Object คู่ Key-Value
        [JsonPropertyName("rates")]
        public Dictionary<string, decimal> Rates { get; set; }
    }
}
```

```csharp [Form1.cs — โค้ดหลัก]
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Windows.Forms;

namespace CurrencyConverterApp
{
    public partial class Form1 : Form
    {
        private static readonly HttpClient client = new HttpClient();
        private ExchangeRateResponse exchangeData = null; // เก็บข้อมูลที่โหลดมา

        public Form1()
        {
            InitializeComponent();
        }

        private async void Form1_Load(object sender, EventArgs e)
        {
            try
            {
                lblStatus.Text = "กำลังโหลดอัตราแลกเปลี่ยนล่าสุด...";
                string url = "https://api.exchangerate-api.com/v4/latest/USD"; // Base เป็น USD
                
                string json = await client.GetStringAsync(url);
                exchangeData = JsonSerializer.Deserialize<ExchangeRateResponse>(json);

                if (exchangeData != null && exchangeData.Rates != null)
                {
                    // โหลดรายการสกุลเงินลงใน ComboBox
                    List<string> currencies = new List<string>(exchangeData.Rates.Keys);
                    currencies.Sort();

                    cboFrom.DataSource = new List<string>(currencies);
                    cboTo.DataSource = new List<string>(currencies);

                    // ตั้งค่าเริ่มต้น
                    cboFrom.SelectedItem = "USD";
                    cboTo.SelectedItem = "THB";
                    
                    lblStatus.Text = $"อัปเดตล่าสุด: {exchangeData.Date}";
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้: " + ex.Message, "Error");
                lblStatus.Text = "การโหลดล้มเหลว ตรวจสอบอินเทอร์เน็ต";
            }
        }

        private void btnConvert_Click(object sender, EventArgs e)
        {
            if (exchangeData == null)
            {
                MessageBox.Show("รอโหลดข้อมูลสักครู่ หรือรีสตาร์ตโปรแกรม", "แจ้งเตือน");
                return;
            }

            if (!decimal.TryParse(txtAmount.Text, out decimal amount))
            {
                MessageBox.Show("กรุณากรอกตัวเลขจำนวนเงินที่ถูกต้อง", "แจ้งเตือน");
                return;
            }

            string fromCurrency = cboFrom.SelectedItem.ToString();
            string toCurrency = cboTo.SelectedItem.ToString();

            // คำนวณ (เนื่องจาก Base ของ API คือ USD เราจึงต้องคำนวณผ่าน USD ก่อน)
            // สูตร: (จำนวนเงิน / อัตราของสกุลต้นทาง) * อัตราของสกุลปลายทาง
            decimal rateFrom = exchangeData.Rates[fromCurrency];
            decimal rateTo = exchangeData.Rates[toCurrency];

            decimal amountInUsd = amount / rateFrom;
            decimal result = amountInUsd * rateTo;

            lblResult.Text = $"{amount:N2} {fromCurrency} = {result:N2} {toCurrency}";
        }
    }
}
```
:::

## 🔥 Challenge (โจทย์ท้าทาย!)

**โจทย์:** เพิ่มปุ่ม **สลับสกุลเงิน (Swap)** ระหว่างช่อง `cboFrom` และ `cboTo` เมื่อกดปุ่มนี้ สกุลเงินทั้งสองจะสลับที่กันอัตโนมัติ และทำการคำนวณใหม่แสดงผลทันที
