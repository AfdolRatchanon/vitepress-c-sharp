# 01 - HttpClient & REST API เบื้องต้น

> 💡 **เป้าหมาย:** ทำความรู้จักกับ API และ HttpClient สำหรับส่ง HTTP Request (เช่น GET) เพื่อดึงข้อมูลจากอินเทอร์เน็ต

## 📖 ทฤษฎีและแนวคิด UI (UI Concept & Theory)

**REST API (Application Programming Interface)** คือช่องทางให้โปรแกรมของเราไปขอดึงข้อมูลจาก Server บนอินเทอร์เน็ต (เช่น ขอสภาพอากาศ, ขออัตราแลกเปลี่ยน) ข้อมูลที่ตอบกลับมามักอยู่ในรูปแบบ **JSON**

**HttpClient** คือคลาสใน C# ที่ใช้จำลองการทำงานเหมือนเบราว์เซอร์ เพื่อส่งคำขอไปหา Server:
1. การเรียก API ต้องใช้เวลา (ขึ้นอยู่กับอินเทอร์เน็ต) จึง **ต้องใช้ `async/await`** เสมอเพื่อไม่ให้หน้าจอ WinForms ค้าง
2. **Best Practice:** ควรมี `HttpClient` ตัวเดียวใช้ร่วมกันทั้งแอปพลิเคชัน (Static)

---

## 💻 ตัวอย่างโค้ด (Code Implementation)

ในตัวอย่างนี้ เราจะเรียก API สาธารณะเพื่อดึงข้อความ Random Joke (มุกตลก) จาก `https://official-joke-api.appspot.com/random_joke`

::: code-group
```csharp [Form1.cs]
using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace ApiDemo
{
    public partial class Form1 : Form
    {
        // [1] สร้าง HttpClient เป็น static (ใช้ตัวเดียวตลอดโปรแกรม)
        private static readonly HttpClient client = new HttpClient();

        public Form1()
        {
            InitializeComponent();
        }

        // [2] ต้องมี async นำหน้าเสมอ
        private async void btnGetJoke_Click(object sender, EventArgs e)
        {
            btnGetJoke.Enabled = false;
            lblStatus.Text = "กำลังโหลดข้อมูล...";

            try
            {
                // [3] ดึงข้อมูลเป็น String (JSON)
                string url = "https://official-joke-api.appspot.com/random_joke";
                string jsonResponse = await client.GetStringAsync(url);

                // แสดง JSON ดิบใน TextBox ไปก่อน (บทหน้าเราจะแปลงมัน)
                txtResult.Text = jsonResponse;
                lblStatus.Text = "โหลดสำเร็จ";
            }
            catch (HttpRequestException netEx)
            {
                MessageBox.Show("เชื่อมต่ออินเทอร์เน็ตล้มเหลว หรือ Server มีปัญหา", "Network Error");
                lblStatus.Text = "ข้อผิดพลาดเครือข่าย";
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message, "Error");
                lblStatus.Text = "ข้อผิดพลาดทั่วไป";
            }
            finally
            {
                btnGetJoke.Enabled = true; // เปิดปุ่มคืนเสมอ
            }
        }
    }
}
```
:::

---

## 🎯 โจทย์ฝึกปฏิบัติเสริมความเข้าใจ (Mini Exercise)

**โจทย์: ลองดึงข้อมูลสุนัข (Dog API)**
แก้ไข URL เป็น `https://dog.ceo/api/breeds/image/random` และดึง JSON ที่มี URL ของรูปสุนัขมาแสดงผลใน `txtResult`

---

## 🗣️ ทบทวน (Review)

::: details ❓ คำถามทบทวน 1:
**คำถาม:** ทำไมถึงต้องใช้ `try..catch` ครอบการเรียก HttpClient เสมอ?

**แนวคำตอบ:** เพราะการเรียกข้อมูลผ่านอินเทอร์เน็ตมีความไม่แน่นอนสูง (เช่น สายแลนหลุด, Wi-Fi หลุด, Server ล่ม, หรือ Timeout) การไม่ใช้ try..catch จะทำให้โปรแกรมเด้งปิด (Crash) ทันทีเมื่อเกิดปัญหาเหล่านี้
:::
