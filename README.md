# 📘 C# Zero to Hero — เอกสารประกอบการเรียนการสอน

เอกสารประกอบการเรียนการสอนวิชาภาษา C# แบบ Zero to Hero สร้างด้วย [VitePress](https://vitepress.dev/) เน้น Console Application เป็นหลัก

## 🚀 วิธีรันโปรเจกต์

```bash
# ติดตั้ง dependencies
npm install

# รัน Development Server
npm run docs:dev

# Build สำหรับ Production
npm run docs:build
```

---

## 📁 โครงสร้างโปรเจกต์

```
docs/
├── .vitepress/        ← Config และ Theme ของ VitePress
│   └── config.ts
├── chapterX/          ← เนื้อหาแต่ละบท
│   ├── index.md       ← ภาพรวมบท
│   ├── 01-topic.md    ← เนื้อหาทฤษฎี
│   ├── 09-lab-topic.md← แล็บปฏิบัติประจำบท
│   └── answers/       ← ⬅ ไฟล์เฉลย (ไม่แสดงใน Sidebar)
│       └── 09-lab-topic-answers.md
└── index.md           ← หน้าแรก
```

---

## 🔑 วิธีเข้าถึงไฟล์เฉลย (Answers)

> ⚠️ ไฟล์เฉลยถูกซ่อนออกจากเมนูนำทาง (Sidebar) โดยตั้งใจ เพื่อให้นักเรียนลองทำด้วยตนเองก่อน
> 
> 💡 **ทางลัด:** คุณสามารถดูสารบัญเฉลยทั้งหมดได้ที่: [**สารบัญไฟล์เฉลย (All Answers)**](./answers.md)

### วิธีที่ 1 — เปิดผ่าน Dev Server (URL โดยตรง)

เมื่อรัน `npm run docs:dev` แล้ว ให้พิมพ์ URL ต่อไปนี้ในเบราว์เซอร์โดยตรง:

```
http://localhost:5173/chapterX/answers/XX-topic-answers
```

**ตัวอย่าง:**
```
http://localhost:5173/chapter1/answers/09-lab-calculator-answers
```

### วิธีที่ 2 — เปิดไฟล์ `.md` โดยตรง

เปิดไฟล์เฉลยใน VS Code หรือ Editor อื่นได้โดยตรงจาก path:

```
docs/chapterX/answers/XX-topic-answers.md
```

**ตัวอย่าง:**
```
docs/chapter1/answers/09-lab-calculator-answers.md
```

---

## 📐 มาตรฐานการเขียนเนื้อหา

ดู [course pattern.md](./course%20pattern.md) สำหรับกฎและโครงสร้างมาตรฐานในการสร้างไฟล์เนื้อหาใหม่
