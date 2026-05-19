# 02 - JSON Deserialization & แสดงข้อมูล

> 💡 **เป้าหมาย:** เรียนรู้การแปลงข้อความ (String) ในรูปแบบ JSON กลับมาเป็น C# Object เพื่อนำค่าในตัวแปรมาใช้งานบนหน้าจอ เช่น นำข้อความไปใส่ใน Label หรือ นำ List ไปแสดงใน DataGridView

## 📖 ทฤษฎีและแนวคิด UI (UI Concept & Theory)

**JSON (JavaScript Object Notation)** เป็นรูปแบบมาตรฐานในการส่งข้อมูล โครงสร้างประกอบด้วย `{ }` สำหรับ Object และ `[ ]` สำหรับ Array

ตัวอย่าง JSON ที่ได้จาก API:
```json
{
  "setup": "Why do programmers prefer dark mode?",
  "punchline": "Because light attracts bugs."
}
```

**Deserialization** คือการเอา String เหล่านี้มาใส่ใน Class C# (Mapping Property ให้ตรงกับ Key ของ JSON) เราจะใช้ Library มาตรฐานคือ `System.Text.Json`

---

## 💻 ตัวอย่างโค้ด (Code Implementation)

จากบทที่ 1 เราได้ JSON มาแล้ว ตอนนี้จะแปลงมันเป็น Object เพื่อแสดงผลสวยงาม

::: code-group
```csharp [Joke.cs — สร้าง Class ให้ตรงกับ JSON]
using System.Text.Json.Serialization;

namespace ApiDemo
{
    // โครงสร้างต้องตรงกับ JSON (ชื่อ Key)
    public class Joke
    {
        // ใช้ [JsonPropertyName] เพื่อ Map ชื่อ Key ใน JSON (ตัวพิมพ์เล็ก) 
        // ให้เข้ากับชื่อ Property ใน C# (ตัวพิมพ์ใหญ่ตามหลัก C#)
        [JsonPropertyName("setup")]
        public string Setup { get; set; }

        [JsonPropertyName("punchline")]
        public string Punchline { get; set; }
    }
}
```

```csharp [Form1.cs — แปลง JSON]
using System;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace ApiDemo
{
    public partial class Form1 : Form
    {
        private static readonly HttpClient client = new HttpClient();

        public Form1()
        {
            InitializeComponent();
        }

        private async void btnGetJoke_Click(object sender, EventArgs e)
        {
            try
            {
                string url = "https://official-joke-api.appspot.com/random_joke";
                string jsonResponse = await client.GetStringAsync(url);

                // [1] แปลง JSON String เป็น Object
                Joke jokeObj = JsonSerializer.Deserialize<Joke>(jsonResponse);

                // [2] นำ Property ไปใช้งานได้เหมือน Object ปกติ
                lblSetup.Text = jokeObj.Setup;
                lblPunchline.Text = jokeObj.Punchline;
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error: " + ex.Message);
            }
        }
    }
}
```
:::

---

## 🎯 โจทย์ฝึกปฏิบัติเสริมความเข้าใจ (Mini Exercise)

**โจทย์: อ่านข้อมูล Array จาก API**
บาง API ส่งข้อมูลมาเป็น Array (ขึ้นต้นด้วย `[ ]`) ให้เขียนโค้ดอ่านข้อมูลผู้ใช้จาก `https://jsonplaceholder.typicode.com/users` แล้วใช้ `JsonSerializer.Deserialize<List<User>>(json)` มา Bind ใส่ DataGridView

::: details 💡 คำใบ้ (Hint)
สร้าง Class `User` ที่มี Property: `name`, `email`, `phone` 
แล้วตั้ง DataGridView.DataSource เป็น List ที่ได้มา
:::

---

## 🗣️ ทบทวน (Review)

::: details ❓ คำถามทบทวน 1:
**คำถาม:** การใช้ `[JsonPropertyName("...")]` มีประโยชน์อย่างไร?

**แนวคำตอบ:** JSON มมักใช้การตั้งชื่อแบบ `camelCase` (ตัวพิมพ์เล็กนำ) หรือ `snake_case` แต่มาตรฐาน C# ใช้ `PascalCase` การใช้ Attribute นี้ทำให้เราสามารถรักษามาตรฐานการตั้งชื่อของ C# ไว้ได้ โดยที่สามารถ Map ค่าจาก JSON ได้ถูกต้อง
:::
