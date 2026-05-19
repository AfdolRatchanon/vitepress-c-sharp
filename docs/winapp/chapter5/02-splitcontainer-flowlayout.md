# 02 - SplitContainer & FlowLayoutPanel

> 💡 **เป้าหมาย:** เรียนรู้การสร้าง Layout แบบแบ่งพื้นที่สองส่วนด้วย SplitContainer (เหมือน Windows Explorer ที่มีต้นไม้ซ้าย-เนื้อหาขวา) และการจัดวาง Control แบบไหล (Flow) อัตโนมัติด้วย FlowLayoutPanel เพื่อสร้าง UI ที่ยืดหยุ่นและ Responsive

## 📖 ทฤษฎีและแนวคิด UI (UI Concept & Theory)

### SplitContainer — แบ่งพื้นที่สองส่วน
SplitContainer แบ่งฟอร์มออกเป็น 2 ส่วนด้วย Splitter Bar ที่ผู้ใช้สามารถลากเพื่อปรับขนาดได้ นิยมใช้สร้าง UI แบบ "เนื้อหา 2 คอลัมน์" เช่น Windows Explorer (ต้นไม้โฟลเดอร์ + รายการไฟล์)

### FlowLayoutPanel — จัดวางแบบไหล
FlowLayoutPanel จัดวาง Control ที่อยู่ข้างในโดยอัตโนมัติ ไปจากซ้ายไปขวา แล้วขึ้นบรรทัดใหม่เมื่อพื้นที่ไม่พอ คล้ายกับ CSS Flexbox ในเว็บพัฒนา เหมาะสำหรับสร้าง Gallery ปุ่ม หรือ Tag Cloud

```text
[ตัวอย่าง: File Explorer Layout ด้วย SplitContainer]
+-----------------------------------------------+
| 🗔 File Browser                       _ □ X |
+-----------------------------------------------+
| (SplitContainer)                             |
| ┌─────────────┐ ║ ┌─────────────────────────┐ |
| │ 📁 ต้นไม้   │ ║ │ 📄 รายการไฟล์           │ |
| │ > โฟลเดอร์A│ ║ │  file1.txt              │ |
| │ > โฟลเดอร์B│ ║ │  file2.pdf              │ |
| │             │ ║ │  image.png              │ |
| └─────────────┘ ║ └─────────────────────────┘ |
|    Panel1       Splitter   Panel2             |
+-----------------------------------------------+
```

```text
[ตัวอย่าง: FlowLayoutPanel แสดง Tag]
+-----------------------------------------------+
| [C#] [.NET] [WinForms] [OOP] [Database]       |
| [SQL] [LINQ] [Async]                          |
| ↑ Control ล้นบรรทัดจะขึ้นบรรทัดใหม่อัตโนมัติ |
+-----------------------------------------------+
```

### 🔑 Properties ที่สำคัญ

**SplitContainer:**
| Property | การทำงาน | ค่าแนะนำ |
| :--- | :--- | :--- |
| `Orientation` | ทิศทาง Splitter (แนวตั้ง/นอน) | `Vertical` |
| `SplitterDistance` | ระยะห่างของ Splitter จากขอบซ้าย/บน | `200` |
| `Panel1MinSize` | ขนาดเล็กสุดของ Panel1 | `100` |
| `Panel2MinSize` | ขนาดเล็กสุดของ Panel2 | `100` |
| `FixedPanel` | กำหนดว่า Panel ไหนขนาดคงที่เมื่อ Resize Form | `Panel1` |
| `IsSplitterFixed` | ล็อก Splitter ไม่ให้ลาก | `false` |

**FlowLayoutPanel:**
| Property | การทำงาน | ค่าแนะนำ |
| :--- | :--- | :--- |
| `FlowDirection` | ทิศทางการไหล | `LeftToRight` |
| `WrapContents` | ขึ้นบรรทัดใหม่เมื่อพื้นที่ไม่พอ | `true` |
| `AutoScroll` | เพิ่ม Scrollbar อัตโนมัติ | `true` |

---

## 🛠️ การตั้งค่า Properties (UI Setup)

| Control | Property | ค่าที่ตั้ง |
| :--- | :--- | :--- |
| `Form1` | `Text` | `"File Browser"` |
| `Form1` | `Size` | `800, 500` |
| `SplitContainer` | `Name` | `splitMain` |
| `SplitContainer` | `Dock` | `Fill` |
| `SplitContainer` | `SplitterDistance` | `220` |
| `SplitContainer` | `Panel1MinSize` | `150` |
| `SplitContainer` | `Panel2MinSize` | `200` |
| `TreeView` (ใน Panel1) | `Name` | `tvFolders` |
| `TreeView` | `Dock` | `Fill` |
| `ListView` (ใน Panel2) | `Name` | `lvFiles` |
| `ListView` | `Dock` | `Fill` |
| `ListView` | `View` | `Details` |

---

## 💻 ตัวอย่างโค้ด (Code Implementation)

::: code-group
```csharp [Form1.cs]
using System;
using System.Windows.Forms;

namespace FileBrowser
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            // [1] ตั้งค่า ListView
            lvFiles.Columns.Add("ชื่อไฟล์", 200);
            lvFiles.Columns.Add("ประเภท", 100);
            lvFiles.Columns.Add("ขนาด", 100);
            lvFiles.FullRowSelect = true;
            lvFiles.GridLines = true;

            // [2] โหลดข้อมูลจำลองลง TreeView
            TreeNode root = new TreeNode("💻 คอมพิวเตอร์");
            root.Nodes.Add(new TreeNode("📁 เอกสาร"));
            root.Nodes.Add(new TreeNode("📁 รูปภาพ"));
            root.Nodes.Add(new TreeNode("📁 ดาวน์โหลด"));
            root.Nodes.Add(new TreeNode("📁 โปรเจกต์ C#"));

            tvFolders.Nodes.Add(root);
            root.Expand(); // เปิด Node ราก
        }

        // [3] เมื่อคลิก Node ใน TreeView ให้แสดงรายการใน ListView
        private void tvFolders_AfterSelect(object sender, TreeViewEventArgs e)
        {
            lvFiles.Items.Clear();

            // จำลองการแสดงไฟล์ตามโฟลเดอร์ที่เลือก
            string selected = e.Node.Text;

            if (selected == "📁 เอกสาร")
            {
                AddFileToList("รายงาน.docx", "Word Document", "245 KB");
                AddFileToList("สรุป.pdf", "PDF Document", "1.2 MB");
                AddFileToList("งบประมาณ.xlsx", "Excel Spreadsheet", "89 KB");
            }
            else if (selected == "📁 รูปภาพ")
            {
                AddFileToList("vacation.jpg", "JPEG Image", "3.4 MB");
                AddFileToList("profile.png", "PNG Image", "512 KB");
            }
            else if (selected == "📁 โปรเจกต์ C#")
            {
                AddFileToList("Form1.cs", "C# Source File", "4.5 KB");
                AddFileToList("Program.cs", "C# Source File", "1.2 KB");
                AddFileToList("MyApp.sln", "Solution File", "8 KB");
            }
        }

        private void AddFileToList(string name, string type, string size)
        {
            ListViewItem item = new ListViewItem(name);
            item.SubItems.Add(type);
            item.SubItems.Add(size);
            lvFiles.Items.Add(item);
        }

        // [4] ตัวอย่าง FlowLayoutPanel — สร้างปุ่ม Tag แบบ Dynamic
        private void btnAddTag_Click(object sender, EventArgs e)
        {
            string tagText = txtTagInput.Text.Trim();
            if (string.IsNullOrEmpty(tagText)) return;

            Button tagButton = new Button
            {
                Text = tagText,
                AutoSize = true,
                FlatStyle = FlatStyle.Flat,
                BackColor = System.Drawing.Color.SteelBlue,
                ForeColor = System.Drawing.Color.White,
                Margin = new System.Windows.Forms.Padding(4),
                Cursor = System.Windows.Forms.Cursors.Hand
            };

            // คลิกที่ Tag เพื่อลบออก
            tagButton.Click += (s, ev) =>
            {
                flowTags.Controls.Remove(tagButton);
            };

            flowTags.Controls.Add(tagButton);
            txtTagInput.Clear();
        }
    }
}
```
:::

---

## 🎯 โจทย์ฝึกปฏิบัติเสริมความเข้าใจ (Mini Exercise)

**โจทย์ที่ 1: แบ่งหน้าจอแนวนอน**
สร้างโปรแกรมที่มี SplitContainer แนวนอน (Orientation = Horizontal): Panel บนสำหรับ RichTextBox (แก้ไขข้อความ) และ Panel ล่างสำหรับ Label แสดงสถิติ (จำนวนคำ, จำนวนบรรทัด)

**โจทย์ที่ 2: แกลเลอรีปุ่มสี**
สร้างโปรแกรมที่มี FlowLayoutPanel และ ColorDialog เมื่อกดปุ่ม "เพิ่มสี" ให้เลือกสีแล้วสร้าง Panel สีสี่เหลี่ยมเล็กๆ เพิ่มลงใน FlowLayoutPanel

::: details 💡 คำใบ้ (Hint)
สร้าง Panel ใหม่ด้วย `new Panel { Size = new Size(50,50), BackColor = selectedColor }` แล้ว `flowColors.Controls.Add(newPanel)`
:::

---

## 🔥 Challenge (โจทย์ท้าทาย!)

**โจทย์: Mini Windows Explorer**
สร้างโปรแกรมที่ใช้ `System.IO.Directory.GetDirectories()` และ `System.IO.Directory.GetFiles()` อ่านไดเรกทอรีจริงบนเครื่อง แสดงโฟลเดอร์จริงใน TreeView และไฟล์จริงใน ListView

---

## 🗣️ ทบทวน (Review)

::: details ❓ คำถามทบทวน 1:
**คำถาม:** `SplitContainer.FixedPanel` มีประโยชน์ในกรณีใด?

**แนวคำตอบ:** เมื่อผู้ใช้ย่อขยายหน้าต่าง การตั้ง `FixedPanel = Panel1` จะทำให้ Panel1 มีขนาดคงที่ ส่วน Panel2 จะขยายตามหน้าต่าง เหมาะสำหรับ Sidebar ที่ควรมีความกว้างคงที่ ส่วน Content Area ด้านขวาควรขยายเต็มพื้นที่
:::

::: details ❓ คำถามทบทวน 2:
**คำถาม:** เหตุใด FlowLayoutPanel จึงเหมาะสำหรับการสร้าง Control แบบ Dynamic มากกว่าการวาง Control ตรงๆ บนฟอร์ม?

**แนวคำตอบ:** เพราะ FlowLayoutPanel จัดตำแหน่ง Control ให้อัตโนมัติ เมื่อเพิ่ม Control ใหม่เข้าไปในโค้ดด้วย `.Controls.Add()` ระบบจะจัดเรียงให้เองโดยไม่ต้องคำนวณ X, Y ด้วยมือ หากใช้ Panel ธรรมดาต้องกำหนด Location ทุกครั้ง
:::
