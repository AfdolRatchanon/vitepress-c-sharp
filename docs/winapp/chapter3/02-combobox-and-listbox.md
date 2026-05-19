# 02 - ComboBox, ListBox & CheckedListBox

> 💡 **เป้าหมาย:** เรียนรู้การใช้ Control สำหรับแสดงรายการตัวเลือก 3 แบบ ได้แก่ ComboBox (เลือกจาก Dropdown), ListBox (รายการแบบยาว) และ CheckedListBox (รายการแบบติ๊กได้) พร้อมการเพิ่ม/ลบรายการแบบ Dynamic ผ่านโค้ด

## 📖 ทฤษฎีและแนวคิด UI (UI Concept & Theory)

เมื่อมีตัวเลือกหลายรายการ การใช้ RadioButton จะทำให้หน้าจอแน่นมาก เราจึงใช้ Control แบบรายการ (List-based Control) แทน:

| Control | เหมาะกับสถานการณ์ | ตัวอย่างการใช้ |
| :--- | :--- | :--- |
| **ComboBox** | รายการที่มีมาก แต่เลือกได้ทีละอัน พื้นที่น้อย | เลือกจังหวัด, เลือกประเทศ |
| **ListBox** | รายการยาว ผู้ใช้มองเห็นหลายรายการพร้อมกัน | รายชื่อสินค้าในตะกร้า |
| **CheckedListBox** | รายการยาว แต่เลือกได้หลายรายการพร้อมกัน | เลือกทักษะหลายอย่าง |

```text
[ตัวอย่าง Form: เลือกสินค้า]
+-----------------------------------------------+
| 🗔 ระบบสั่งซื้อสินค้า                  _ □ X |
+-----------------------------------------------+
|                                               |
|  หมวดหมู่:  [▼ ComboBox cboCategory  ]       |
|                                               |
|  ┌─ สินค้าทั้งหมด ─┐  ┌─ รายการสั่ง ───┐    |
|  │ แอปเปิล          │  │ กล้วย           │    |
|  │ ส้ม               │  │ สับปะรด         │    |
|  │ มะม่วง           │  └─────────────────┘    |
|  └──────────────────┘                         |
|   [lstAll]   [>>Add>>]  [lstCart]             |
|                                               |
+-----------------------------------------------+
```

### 🔑 ComboBox Properties ที่สำคัญ

| Property | การทำงาน | ค่าแนะนำ |
| :--- | :--- | :--- |
| `Items` | รายการทั้งหมดใน ComboBox | เพิ่มผ่าน Designer หรือโค้ด |
| `SelectedItem` | รายการที่ถูกเลือกอยู่ (object) | - |
| `SelectedIndex` | Index ของรายการที่เลือก (-1 = ยังไม่เลือก) | - |
| `Text` | ข้อความที่พิมพ์ใน ComboBox | - |
| `DropDownStyle` | รูปแบบ: `DropDown` (พิมพ์ได้), `DropDownList` (เลือกอย่างเดียว) | `DropDownList` |

---

## 🛠️ การตั้งค่า Properties (UI Setup)

| Control | Property | ค่าที่ตั้ง |
| :--- | :--- | :--- |
| `Form1` | `Text` | `"ระบบสั่งซื้อสินค้า"` |
| `Label` | `Name` | `lblCategory` |
| `Label` | `Text` | `"หมวดหมู่สินค้า:"` |
| `ComboBox` | `Name` | `cboCategory` |
| `ComboBox` | `DropDownStyle` | `DropDownList` |
| `ListBox` (ซ้าย) | `Name` | `lstAll` |
| `ListBox` (ขวา) | `Name` | `lstCart` |
| `Button` (เพิ่ม) | `Name` | `btnAdd` |
| `Button` (เพิ่ม) | `Text` | `">>"` |
| `Button` (ลบ) | `Name` | `btnRemove` |
| `Button` (ลบ) | `Text` | `"<<"` |
| `Label` (ยอด) | `Name` | `lblTotal` |

---

## 💻 ตัวอย่างโค้ด (Code Implementation)

::: code-group
```csharp [Form1.cs]
using System;
using System.Windows.Forms;

namespace ShoppingCart
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
            LoadData(); // โหลดข้อมูลตอนเปิดฟอร์ม
        }

        private void LoadData()
        {
            // [1] เพิ่มรายการใน ComboBox ผ่านโค้ด
            cboCategory.Items.AddRange(new string[] {
                "-- เลือกหมวดหมู่ --",
                "ผลไม้",
                "ผัก",
                "เครื่องดื่ม"
            });
            cboCategory.SelectedIndex = 0; // เลือกรายการแรก

            // [2] เพิ่มรายการใน ListBox (ฝั่งซ้าย)
            lstAll.Items.AddRange(new string[] {
                "แอปเปิล", "กล้วย", "ส้ม", "มะม่วง", "สับปะรด",
                "ผักบุ้ง", "มะเขือเทศ", "น้ำอัดลม", "ชาเขียว"
            });
        }

        private void cboCategory_SelectedIndexChanged(object sender, EventArgs e)
        {
            // [3] กรองรายการตามหมวดหมู่ที่เลือก
            lstAll.Items.Clear();

            string selected = cboCategory.SelectedItem.ToString();

            if (selected == "ผลไม้")
                lstAll.Items.AddRange(new string[] { "แอปเปิล", "กล้วย", "ส้ม", "มะม่วง", "สับปะรด" });
            else if (selected == "ผัก")
                lstAll.Items.AddRange(new string[] { "ผักบุ้ง", "มะเขือเทศ", "ผักกาด" });
            else if (selected == "เครื่องดื่ม")
                lstAll.Items.AddRange(new string[] { "น้ำอัดลม", "ชาเขียว", "กาแฟ" });
        }

        private void btnAdd_Click(object sender, EventArgs e)
        {
            // [4] เพิ่มรายการที่เลือกจาก lstAll ไปใน lstCart
            if (lstAll.SelectedItem == null)
            {
                MessageBox.Show("กรุณาเลือกสินค้าก่อน!", "แจ้งเตือน",
                    MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            string item = lstAll.SelectedItem.ToString();

            // ตรวจสอบว่าสินค้าอยู่ในตะกร้าแล้วหรือยัง
            if (lstCart.Items.Contains(item))
            {
                MessageBox.Show($"'{item}' อยู่ในตะกร้าแล้ว!", "แจ้งเตือน",
                    MessageBoxButtons.OK, MessageBoxIcon.Information);
                return;
            }

            lstCart.Items.Add(item);
            UpdateTotal();
        }

        private void btnRemove_Click(object sender, EventArgs e)
        {
            // [5] ลบรายการออกจาก lstCart
            if (lstCart.SelectedItem == null)
            {
                MessageBox.Show("กรุณาเลือกสินค้าที่ต้องการลบก่อน!", "แจ้งเตือน",
                    MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            lstCart.Items.Remove(lstCart.SelectedItem);
            UpdateTotal();
        }

        private void UpdateTotal()
        {
            // [6] อัพเดตยอดรวม
            lblTotal.Text = $"สินค้าในตะกร้า: {lstCart.Items.Count} รายการ";
        }
    }
}
```
:::

**Expected Output:**
```text
เลือก "ผลไม้" ใน ComboBox → lstAll แสดงรายการผลไม้
คลิก "แอปเปิล" แล้วกด >> → แอปเปิลย้ายไป lstCart
กด << เมื่อเลือกสินค้าใน lstCart → ลบออก
lblTotal: "สินค้าในตะกร้า: 2 รายการ"
```

---

## 🚀 CheckedListBox

```csharp
// ตัวอย่างการอ่านค่าจาก CheckedListBox
private void btnGetSkills_Click(object sender, EventArgs e)
{
    // .CheckedItems คือ Collection ของรายการที่ถูกติ๊กทั้งหมด
    var selectedSkills = new System.Collections.Generic.List<string>();

    foreach (object item in chkListSkills.CheckedItems)
    {
        selectedSkills.Add(item.ToString());
    }

    if (selectedSkills.Count == 0)
    {
        lblSkills.Text = "ยังไม่ได้เลือกทักษะ";
        return;
    }

    lblSkills.Text = "ทักษะที่เลือก: " + string.Join(", ", selectedSkills);
}
```

---

## 🎯 โจทย์ฝึกปฏิบัติเสริมความเข้าใจ (Mini Exercise)

**โจทย์ที่ 1: เลือกจังหวัดและแสดงข้อมูล**
สร้างฟอร์มที่มี ComboBox รายการจังหวัด (อย่างน้อย 5 จังหวัด) และ Label แสดงภาคที่จังหวัดนั้นสังกัด เมื่อเลือกจังหวัดจาก ComboBox ให้ Label อัพเดตทันที (ใช้ Event `SelectedIndexChanged`)

**โจทย์ที่ 2: รายการ To-Do List**
สร้างโปรแกรม To-Do List ที่มี TextBox สำหรับพิมพ์งาน, ListBox แสดงรายการงาน และปุ่ม "เพิ่ม" กับ "ลบ" ต้องป้องกันการเพิ่มรายการซ้ำและรายการว่าง

::: details 💡 คำใบ้ (Hint)
ใช้ `.Items.Contains()` ตรวจสอบรายการซ้ำ และ `.Items.Remove(lstTodo.SelectedItem)` เพื่อลบรายการที่เลือก
:::

---

## 🔥 Challenge (โจทย์ท้าทาย!)

**โจทย์: ระบบลงทะเบียนเรียนวิชา**
สร้างโปรแกรมที่มี ListBox 2 อัน (วิชาที่เปิด vs วิชาที่ลงทะเบียน) และปุ่ม >> และ << เพื่อย้ายรายการ โดยต้องมีข้อจำกัด: ลงทะเบียนได้สูงสุด 5 วิชา และแสดงจำนวนหน่วยกิตรวม

---

## 🗣️ ทบทวน (Review)

::: details ❓ คำถามทบทวน 1:
**คำถาม:** ความแตกต่างระหว่าง `SelectedItem` และ `SelectedIndex` ของ ListBox คืออะไร?

**แนวคำตอบ:** `SelectedItem` คือตัว Object ที่ถูกเลือก (เช่น string "แอปเปิล") ส่วน `SelectedIndex` คือตำแหน่ง (0, 1, 2...) ของรายการนั้นในรายการทั้งหมด หาก index = -1 แปลว่ายังไม่มีรายการใดถูกเลือก
:::

::: details ❓ คำถามทบทวน 2:
**คำถาม:** เหตุใดควรใช้ `DropDownStyle = DropDownList` สำหรับ ComboBox ในหลายกรณี?

**แนวคำตอบ:** เพราะ `DropDownList` บังคับให้ผู้ใช้เลือกจากรายการที่กำหนดเท่านั้น ไม่สามารถพิมพ์ค่าอื่นเองได้ ทำให้ข้อมูลที่ได้รับมีความสม่ำเสมอ ลดความผิดพลาดในการประมวลผลต่อ
:::
