# ติดตั้ง .NET SDK และ VS Code

> 💡 **เป้าหมาย:** ติดตั้ง Environment ที่จำเป็นและสร้างโปรเจกต์ C# แรกได้ด้วยตัวเอง ก่อนจะเขียนโค้ดอะไรได้ต้องมีเครื่องมือก่อน

## 📖 ทฤษฎีและแนวคิด (Theory & Concepts)

### เครื่องมือที่ต้องติดตั้ง

```text
สิ่งที่ต้องมีในเครื่อง:

  ┌──────────────────────────────────────────────┐
  │              Development Setup               │
  │                                              │
  │  ┌─────────────────┐  ┌──────────────────┐  │
  │  │   .NET SDK      │  │    VS Code       │  │
  │  │                 │  │                  │  │
  │  │ - dotnet CLI    │  │ - Text Editor    │  │
  │  │ - Compiler      │  │ - C# Extension   │  │
  │  │ - Runtime       │  │ - Terminal Built-in│ │
  │  └─────────────────┘  └──────────────────┘  │
  │           │                    │             │
  │           └────────┬───────────┘             │
  │                    ▼                         │
  │           เขียนและรันโปรแกรมได้!            │
  └──────────────────────────────────────────────┘
```

### dotnet CLI คืออะไร?

dotnet CLI คือคำสั่งที่ใช้ผ่าน Terminal เพื่อจัดการโปรเจกต์ C# ทุกอย่าง:

```text
คำสั่ง dotnet ที่ใช้บ่อย:

  dotnet --version          ← ตรวจสอบ version ที่ติดตั้ง
  dotnet new console        ← สร้างโปรเจกต์ Console App ใหม่
  dotnet run                ← compile และรันโปรแกรม
  dotnet build              ← compile โดยไม่รัน
  dotnet new list           ← ดูรายการ template ทั้งหมด
```

### โครงสร้าง Project ที่ dotnet สร้างให้

เมื่อรัน `dotnet new console` จะได้โครงสร้างดังนี้:

```text
my-first-app/
├── my-first-app.csproj    ← Project file (config ของโปรเจกต์)
├── Program.cs             ← ไฟล์โค้ดหลัก (เริ่มเขียนที่นี่)
└── obj/                   ← โฟลเดอร์ build cache (ไม่ต้องสนใจ)
```

**ไฟล์ `.csproj`** คือ Project Configuration บอก .NET ว่า:
- ใช้ .NET version อะไร
- มี Library (NuGet Package) อะไรบ้าง
- Build settings เป็นอย่างไร

```xml
<!-- ตัวอย่าง my-first-app.csproj -->
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>Exe</OutputType>        <!-- สร้างเป็น executable -->
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>
</Project>
```

## 💻 ขั้นตอนการติดตั้งและตั้งค่า

### ขั้นตอนที่ 1: ติดตั้ง .NET SDK

1. ไปที่ **https://dotnet.microsoft.com/download**
2. ดาวน์โหลด **.NET 8 SDK** (หรือใหม่กว่า) ให้ตรงกับ OS ของตัวเอง
3. ติดตั้งตาม wizard
4. เปิด Terminal แล้วตรวจสอบ:

::: code-group
```bash [Terminal]
dotnet --version
```
:::

**Expected Output:**
```
8.0.xxx
```

### ขั้นตอนที่ 2: ติดตั้ง VS Code + Extension

1. ดาวน์โหลด VS Code จาก **https://code.visualstudio.com**
2. ติดตั้ง VS Code
3. เปิด VS Code → ไปที่ Extensions (Ctrl+Shift+X)
4. ค้นหาและติดตั้ง: **"C# Dev Kit"** (ของ Microsoft)

### ขั้นตอนที่ 3: สร้างโปรเจกต์แรก

::: code-group
```bash [Terminal]
# [1] สร้างโฟลเดอร์และเข้าไป
mkdir my-first-app
cd my-first-app

# [2] สร้างโปรเจกต์ Console App
dotnet new console

# [3] รันโปรแกรม
dotnet run
```
:::

**Expected Output:**
```
Hello, World!
```

### ขั้นตอนที่ 4: เปิดโปรเจกต์ใน VS Code

::: code-group
```bash [Terminal]
# เปิดโฟลเดอร์ปัจจุบันใน VS Code
code .
```
:::

## 🎯 โจทย์ฝึกปฏิบัติเสริมความเข้าใจ (Mini Exercise)

- **โจทย์ที่ 1:** สร้างโปรเจกต์ใหม่ชื่อ `hello-csharp` แล้วรันให้แสดงผล `Hello, World!` ได้สำเร็จ จากนั้นรัน `dotnet --version` และจด version ที่ได้ลงในไฟล์ README.md ของโปรเจกต์

- **โจทย์ที่ 2:** ไฟล์ `Program.cs` เริ่มต้นมีโค้ดอะไรอยู่? ลองเปิดดูและอธิบายว่าแต่ละบรรทัดทำหน้าที่อะไร (เดาจากโค้ดที่เห็น)

::: details 💡 คำใบ้ (Hint)
- สำหรับ `dotnet new console` ใน .NET 6+ จะใช้ **Top-level statements** ทำให้โค้ดสั้นกว่าเดิมมาก
- ลองเปิดไฟล์ `my-first-app.csproj` ดูด้วย จะเห็น `<TargetFramework>` บอก version ที่ใช้
:::

## 🔥 Challenge (โจทย์ท้าทาย!)

- **โจทย์:** สร้างโปรเจกต์ใหม่อีกโปรเจกต์หนึ่งในโฟลเดอร์อื่น โดยใช้คำสั่ง `dotnet new console -n MyChallenge` แล้วหาวิธีรันทั้ง 2 โปรเจกต์แยกกันโดยไม่ต้องลบโปรเจกต์เดิม (**ห้าม** เปิด Google)

## 🗣️ ทบทวน (Review)

::: details ❓ คำถามทบทวนความเข้าใจ

**คำถาม 1:** ไฟล์ `.csproj` มีหน้าที่อะไร?
**แนวคำตอบ:** เป็น Project Configuration File ที่บอก .NET SDK ว่าโปรเจกต์นี้ใช้ .NET version อะไร, build เป็นประเภทไหน (Exe หรือ Library), และมี dependencies อะไรบ้าง

**คำถาม 2:** ความต่างระหว่าง `dotnet run` และ `dotnet build` คืออะไร?
**แนวคำตอบ:** `dotnet build` แค่ compile โค้ดให้เป็น IL แต่ไม่รัน ส่วน `dotnet run` จะ build ก่อนแล้วรันเลย `dotnet build` ใช้เมื่อต้องการตรวจสอบ Error โดยไม่รัน
:::
