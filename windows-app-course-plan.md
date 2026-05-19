# 📘 C# Windows App .NET: Course Plan & Standard

คู่มือและมาตรฐานการเขียนเนื้อหาสำหรับเอกสารประกอบการเรียนการสอนวิชาภาษา C# สำหรับการพัฒนา Windows Application (เน้น Windows Forms/GUI) แบบ Zero to Hero 

---

## ⚙️ กฎการสร้างเนื้อหาบทเรียน (Content Generation Rules)

เมื่อต้องสร้างเนื้อหาใหม่ ผู้เขียน/ผู้สร้าง ต้องปฏิบัติตามกฎเหล็กดังนี้:

1. **Naming Convention ตรงตามโครงสร้าง:** ใช้รูปแบบโฟลเดอร์รายบท เช่น `chapter1/` และไฟล์ย่อย `01-topic.md`
2. **Visual & UI First:** ทุกหัวข้อต้องเริ่มต้นด้วยการอธิบายหน้าตาของโปรแกรม (UI) ก่อนการเขียนโค้ด (Code-Behind) เสมอ
3. **Shift to Event-Driven:** เน้นการสอนกระบวนทัศน์การเขียนโปรแกรมที่ตอบสนองต่อเหตุการณ์ (Event-Driven) เช่น ผู้ใช้คลิกปุ่ม, พิมพ์ข้อความ หรือเลือกรายการ
4. **Comprehensive Theory & Visuals:** ทฤษฎีต้องอธิบายให้เห็นภาพรวมผ่าน **ASCII Art จำลองหน้าต่าง Form** เพื่อให้นักเรียนเข้าใจ Layout ก่อนลากวาง Control จริง
5. **Step-by-Step Properties Setup:** ต้องมีการระบุค่า Properties (เช่น `Name`, `Text`, `BackColor`) ที่จำเป็นต้องตั้งค่าก่อนรันอย่างชัดเจน
6. **Usable Code Examples:** โค้ดตัวอย่างต้องสมบูรณ์ มีการระบุชัดเจนว่าโค้ดชุดนี้นำไปวางไว้ใน Event ใด (เช่น `private void btnLogin_Click(...)`) คัดลอกแล้วรันได้ทันที
7. **Creative yet Accessible Exercises:** โจทย์ Mini Exercise ต้องมีความคิดสร้างสรรค์ แต่ห้ามยากเกินขอบเขตของ Control ที่เพิ่งเรียน
8. **เนื้อหาต้องครบองค์ประกอบ:** ทุกไฟล์ต้องมี ทฤษฎี + ASCII Form Mockup + การตั้งค่า Properties + โค้ดที่รันได้ + Mini Exercise
9. **Progressive Difficulty ระหว่างบท:** แต่ละบทต้อง build on ความรู้จากบทก่อนหน้า และโปรเจกต์ควรมีความซับซ้อนขึ้นเรื่อยๆ
10. **ความยาวและความลึกซึ้งของเนื้อหา (Depth & Length):** อัดแน่นไปด้วยรายละเอียดของการจัดการ Control ต่างๆ, Edge Cases (เช่น ผู้ใช้ไม่กรอกข้อมูล), และ Best Practices โดยต้องมีความยาวไม่น้อยกว่า 300 บรรทัดต่อ 1 ไฟล์

---

## 📁 Naming Convention (โครงสร้างโฟลเดอร์และไฟล์)

โครงสร้างหลักจะแบ่งตาม **บท (Chapter)** -> **หัวข้อย่อย (Topic)**

| ประเภท | รูปแบบโฟลเดอร์/ไฟล์ | ตัวอย่าง |
| :--- | :--- | :--- |
| โฟลเดอร์บท | `winapp/chapterX` | `winapp/chapter1/` |
| ไฟล์ภาพรวมบท | `index.md` | `winapp/chapter1/index.md` |
| ไฟล์เนื้อหาทฤษฎี | `XX-topic-name.md` (มีเลขลำดับ) | `winapp/chapter1/01-intro-to-winforms.md` |
| ไฟล์แล็บปฏิบัติ | `99-lab-topic.md` (ใช้เลข **99 เสมอ** เพื่อให้ไฟล์ Lab ไปอยู่ท้ายสุด) | `winapp/chapter1/99-lab-calculator-ui.md` |
| ไฟล์เฉลย | `answers/XX-topic-answers.md` (อยู่ใน subfolder `answers/`) | `winapp/chapter1/answers/09-lab-calculator-answers.md` |

> ⚠️ **หมายเหตุเรื่องไฟล์เฉลย:** โฟลเดอร์ `answers/` จะ **ไม่ถูกเชื่อมต่อกับ Sidebar** โดยตรง การเข้าถึงเฉลยและวิธีเปิดไฟล์เหล่านี้จะระบุไว้ใน `README.md` เท่านั้น ห้ามใส่ลิงก์เฉลยในเนื้อหาบทเรียนโดยเด็ดขาด

---

## 🏅 Content Standard — Layout Blueprint

โครงสร้างหน้าเว็บ (Markdown) ต้องใช้ Layout ด้านล่างนี้เป็นแกนกลางในการสร้างไฟล์เนื้อหาทุกครั้ง เพื่อความสม่ำเสมอ:

```markdown
# ชื่อหัวข้อ

> 💡 **เป้าหมาย:** สรุปสั้นๆ 1-2 บรรทัดว่าหัวข้อนี้สำคัญอย่างไร Control นี้ใช้ทำอะไร ในแอปพลิเคชันจริงมีประโยชน์อย่างไร

## 📖 ทฤษฎีและแนวคิด UI (UI Concept & Theory)
[อธิบายทฤษฎีการทำงานของ Control หรือระบบนั้นๆ โดยต้องลงรายละเอียดจากง่ายไปยาก พร้อมวาดภาพประกอบแบบ ASCII Art]

` ` `text
[ตัวอย่าง ASCII Art จำลองหน้าต่าง Form]
+-----------------------------------+
| 🗔 Form1                     _ □ X |
+-----------------------------------+
|                                   |
|   Username: [ txtUsername     ]   |
|   Password: [ txtPassword     ]   |
|                                   |
|       ( btnLogin )                |
+-----------------------------------+
` ` `

## 🛠️ การตั้งค่า Properties (UI Setup)
[ตารางหรือรายการแสดง Properties ที่ต้องตั้งค่าให้กับ Control ก่อนเขียนโค้ด]
- `txtUsername` -> เปลี่ยน `Name` เป็น `txtUsername`
- `btnLogin` -> เปลี่ยน `Name` เป็น `btnLogin`, เปลี่ยน `Text` เป็น `Login`

## 💻 ตัวอย่างโค้ด (Code Implementation)
[อธิบายว่าต้องนำโค้ดไปใส่ใน Event ใด เช่น ดับเบิลคลิกที่ปุ่ม btnLogin]

::: code-group
` ` `csharp [Form1.cs]
private void btnLogin_Click(object sender, EventArgs e)
{
    // [1] คอมเมนต์อธิบายบรรทัดสำคัญ
    string user = txtUsername.Text;
    MessageBox.Show("Welcome, " + user);
}
` ` `
:::

**Expected Output (เมื่อกดปุ่ม):**
` ` `text
(จะปรากฏ MessageBox เขียนว่า "Welcome, ...")
` ` `

## 🎯 โจทย์ฝึกปฏิบัติเสริมความเข้าใจ (Mini Exercise)
[โจทย์ที่สั่ง **ต้องแตกต่าง** จากตัวอย่างโค้ดด้านบนอย่างสิ้นเชิง เพื่อบังคับให้นักเรียนประยุกต์ใช้ความรู้ (Apply)]
- **โจทย์ที่ 1:** ให้นักเรียน...
- **โจทย์ที่ 2:** ให้นักเรียนแก้ไขโปรแกรมเพื่อ...

::: details 💡 คำใบ้ (Hint)
[ใส่คำใบ้เล็กน้อยเพื่อช่วยนักเรียนทบทวน โดยให้ซ่อนเอาไว้ในกล่อง details]
:::

## 🔥 Challenge (โจทย์ท้าทาย!)
[เพิ่มความท้าทายให้นักเรียนคิดด้วยตัวเอง]
- **โจทย์:** ให้นักเรียนลองสร้าง... โดย **ห้าม** เลื่อนกลับไปดูโค้ดตัวอย่างด้านบน ให้ใช้ความจำและความเข้าใจเขียนขึ้นมาใหม่ทั้งหมด

## 🗣️ ทบทวน (Review)
::: details ❓ คำถามทบทวนความเข้าใจ
**คำถาม:** ทำไมเราต้องกำหนด Name ให้กับ TextBox ก่อนใช้งานในโค้ด?
**แนวคำตอบ:** เพื่อให้สามารถอ้างอิงและดึงข้อมูลจาก TextBox นั้นๆ ใน C# ได้อย่างถูกต้อง...
:::
```

---

## 📝 Lab Pattern (โครงสร้างแล็บปฏิบัติประจำบท)

สำหรับไฟล์ `99-lab-topic.md` ซึ่งจะเป็นการนำเนื้อหาย่อยทั้งหมดในบทนั้นๆ มารวมกันเพื่อสร้าง Windows Application จริง โครงสร้างจะเน้นไปที่เป้าหมายและขั้นตอนการทำ:

```markdown
# 💻 Lab: ชื่อโปรแกรมประจำบท

> 💡 **เป้าหมาย:** สังเคราะห์ความรู้ทั้งหมดที่เรียนในบทนี้ออกมาเป็น Windows Application ที่ใช้งานได้จริง

## 📖 ภาพรวมของโปรแกรม (Program Overview)
[อธิบายว่าจะสร้างแอปอะไร รับ Input อะไร ทำงานอย่างไร พร้อมวาด ASCII Art หรือ Wireframe ของหน้า UI]

` ` `text
[Wireframe ของแอปพลิเคชัน]
` ` `

## ⏱️ เวลาที่ใช้: [ระบุเวลา เช่น 60 นาที]

## 📝 ขั้นตอนการทำงาน (Step-by-Step)
### ขั้นตอนที่ 1: การออกแบบหน้าจอ (UI Design)
- [ ] Task 1: ลาก Control...
- [ ] Task 2: ตั้งค่า Properties...

### ขั้นตอนที่ 2: การเขียนโค้ดหลังบ้าน (Code-Behind)
- [ ] Task 1: ดักจับเหตุการณ์...

## 🔥 Challenge (โจทย์ท้าทาย สำหรับคนที่ทำเสร็จก่อนเวลา!)
- **โจทย์:** [โจทย์ที่สั่งให้เพิ่มฟีเจอร์ หรือการตรวจสอบความถูกต้องของข้อมูล (Validation)]
```

---

## 📋 Chapter Index Blueprint (โครงสร้าง `index.md` ภาพรวมบท)

ไฟล์ `index.md` ทุกไฟล์ต้องประกอบด้วย 4 ส่วนนี้เสมอ เพื่อให้นักเรียนเข้าใจภาพรวมและเตรียมตัวได้ก่อนเรียน:

```markdown
# บทที่ X: ชื่อบท

> 💡 **ภาพรวม:** อธิบายสั้นๆ ว่าบทนี้สอนสร้าง UI/App แบบไหน และนักเรียนจะพัฒนาอะไรได้บ้าง

## 🎯 สิ่งที่จะได้เรียนรู้ในบทนี้
- ✅ [หัวข้อที่ 1]
- ✅ [หัวข้อที่ 2]

## 🔗 Prerequisite (ความรู้ที่ต้องมีก่อน)
> ⚠️ นักเรียนควรเข้าใจสิ่งต่อไปนี้ก่อนเริ่มบทนี้:
- [ความรู้ C# พื้นฐาน เช่น if-else, loops, classes หรือบทก่อนหน้า]

## 📚 หัวข้อในบทนี้
| ลำดับ | หัวข้อ | ไฟล์ |
| :---: | :--- | :--- |
| 01 | [ชื่อหัวข้อ] | `01-topic.md` |
| 02 | [ชื่อหัวข้อ] | `02-topic.md` |
| 🧪 Lab | [ชื่อ Lab] | `99-lab-topic.md` |
```

---

## 🚫 Anti-Patterns (สิ่งที่ต้องหลีกเลี่ยง)

| ❌ ห้ามทำ | ✅ ควรทำแทน |
| :--- | :--- |
| โค้ดล้วนไม่มีทฤษฎี | ต้องอธิบายทฤษฎีและมี **ASCII Art ของ Form UI** เพื่อให้เห็นภาพรวมก่อนเสมอ |
| ไม่ระบุ Name ของ Control ที่ชัดเจน | ต้องมีตารางบอกการตั้งค่า Properties หรือชื่อ `Name` ของ Control ก่อนเสมอ ไม่งั้นผู้เรียนจะงงว่าโค้ดอ้างอิงถึงอะไร |
| ให้โค้ดแต่ไม่บอกว่าใส่ที่ Event ไหน | ต้องระบุชัดเจนว่าดับเบิลคลิกที่ไหน และใช้ Event อะไร (เช่น `Form_Load` หรือ `Button_Click`) |
| โจทย์แบบฝึกหัดเหมือนกับตัวอย่างโค้ดเป๊ะ | โจทย์ (Mini Exercise) ต้อง **แตกต่าง** จากตัวอย่าง เพื่อบังคับให้ประยุกต์ใช้ความรู้ |
| เนื้อหาไม่มีการจัดการข้อผิดพลาด (Exception) | ควรฝึกให้นักเรียนทำ UI Validation เสมอ เช่น แจ้งเตือนเมื่อไม่ใส่ข้อมูล |
| ใส่ลิงก์เฉลยในเนื้อหาบทเรียนหรือ Sidebar | เฉลยต้องอยู่ใน `answers/` subfolder เท่านั้น ห้ามระบุที่อยู่ในเนื้อหา |

---

## 🗺️ Syllabus & Course Outline (แผนการสอนฉบับสมบูรณ์ 18 บท)

เพื่อให้เนื้อหาครอบคลุมสำหรับการเรียนการสอนในระดับอุดมศึกษาหรืออาชีวศึกษา (ซึ่งมักจะมี 18 สัปดาห์พอดี) และปั้นนักเรียนให้เป็น Full-Stack Desktop Developer ที่พร้อมทำงานจริง จึงได้ขยายเนื้อหาเป็น **18 บท (Chapters)** โดยเพิ่มหัวข้อระดับโปรที่ขาดไม่ได้ในโปรแกรมธุรกิจ:

### Part 1: Windows Forms Fundamentals
- **Chapter 1: Intro to Windows App & Visual Studio IDE** (แนะนำ WinForms, โครงสร้างโปรเจกต์, Toolbox, Properties Window, เหตุการณ์ Event-Driven)
- **Chapter 2: Essential Input & Output Controls** (Label, TextBox, Button, MessageBox และการรับส่งข้อมูลพื้นฐาน)
- **Chapter 3: Selection & Choice Controls** (RadioButton, CheckBox, ComboBox, ListBox, CheckedListBox)
- **Chapter 4: Advanced Standard Controls** (DateTimePicker, PictureBox, NumericUpDown, RichTextBox, LinkLabel)
- **Chapter 5: Layout & Containers** (การจัดระเบียบ UI ให้สวยงามด้วย Panel, GroupBox, TabControl, SplitContainer, FlowLayoutPanel)

### Part 2: Application Architecture & Navigation
- **Chapter 6: Menus, Toolbars & Status** (MenuStrip, ToolStrip, StatusStrip, ContextMenuStrip)
- **Chapter 7: Dialog Windows** (Common Dialogs: OpenFileDialog, SaveFileDialog, ColorDialog, FontDialog, FolderBrowserDialog)
- **Chapter 8: Multi-Form Navigation & OOP in UI** (การเปิด-ปิดฟอร์ม, Modal vs Modeless, การส่งข้อมูลระหว่างฟอร์ม, โครงสร้าง MDI, การแยก Business Logic)

### Part 3: Advanced Presentation, I/O & Threading
- **Chapter 9: Data Presentation & UI Validation** (การใช้ DataGridView, ListView, TreeView, ErrorProvider, Global Exception Handling)
- **Chapter 10: Multi-threading & Background Processing** (Timer, ProgressBar, Async-Await, Task, ปัญหา UI Thread และการใช้ `Control.InvokeRequired`)
- **Chapter 11: File I/O & State Management** (การอ่าน-เขียนไฟล์ Text/CSV, การบันทึกการตั้งค่าผู้ใช้ด้วย `Properties.Settings` เช่น จำรหัสผ่าน, บันทึกธีม)

### Part 4: Database, API & Security (Core Business Logic)
- **Chapter 12: Database Integration with ADO.NET** (การเชื่อมต่อ SQL Server, `SqlConnection`, `SqlCommand`, `SqlDataReader`)
- **Chapter 13: Data Binding & CRUD Operations** (การดึงข้อมูลลงตาราง, เพิ่ม-ลบ-แก้ไข ข้อมูล)
- **Chapter 14: Authentication & Security** (ระบบ Login, การเข้ารหัสผ่าน (Password Hashing), การกำหนดสิทธิ์ผู้ใช้ (Role-based access))
- **Chapter 15: Consuming Web APIs & JSON** (การดึงข้อมูลจากอินเทอร์เน็ตด้วย `HttpClient`, การแปลงข้อมูล JSON)

### Part 5: Specialized Topics, Reporting & Deployment
- **Chapter 16: NuGet Packages & Data Exporting** (การติดตั้งไลบรารีภายนอกด้วย NuGet, การ Export ข้อมูลจากตารางเป็น Excel และ PDF)
- **Chapter 17: Graphics, Localization & UI Modernization** (GDI+, การทำระบบหลายภาษา (i18n) ด้วย Resource Files, การตกแต่ง UI ให้ดูทันสมัย)
- **Chapter 18: Final Project, Git & Deployment** (สร้างระบบ POS หรือคลังสินค้าฉบับสมบูรณ์, การใช้ Git สำหรับโปรเจกต์ WinForms, และการสร้างตัวติดตั้ง (Setup/ClickOnce))

*(แต่ละบทจะมีหัวข้อย่อย 01, 02,... และบังคับให้จบด้วยไฟล์ `99-lab-xxx` เพื่อสร้างโปรเจกต์เล็กๆ รวบยอดประจำบทเสมอ)*
