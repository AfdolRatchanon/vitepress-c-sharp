# 02 - Deployment & สร้างตัวติดตั้ง (Setup.exe)

> 💡 **เป้าหมาย:** เรียนรู้วิธีการทำ Publish โปรเจกต์ WinForms และการสร้างตัวติดตั้ง (Setup) แบบมาตรฐานเพื่อให้ลูกค้านำไปติดตั้งบนเครื่องของเขาได้โดยไม่ต้องใช้ Visual Studio

## 📖 ทฤษฎีและแนวคิด UI (UI Concept & Theory)

**การ Publish**
เมื่อเรากดปุ่ม `Start (F5)` ใน Visual Studio โค้ดจะถูกคอมไพล์ในโหมด **Debug** ซึ่งทำงานช้าและมีไฟล์ส่วนเกินสำหรับการหาบั๊ก 
เมื่อโปรแกรมเสร็จพร้อมส่งมอบ เราต้องเปลี่ยนเป็นโหมด **Release** ซึ่งโค้ดจะถูกรีดประสิทธิภาพให้ทำงานเร็วที่สุด

**วิธีการนำโปรแกรมไปติดตั้งมี 2 แบบหลัก:**
1. **Portable (Standalone):** คัดลอกไฟล์ `.exe` และ `.dll` ทั้งหมดในโฟลเดอร์ `/bin/Release/` ไปวางที่เครื่องลูกค้าแล้วดับเบิลคลิกใช้งานได้เลย (แต่ลูกค้าต้องมี .NET Runtime ติดตั้งอยู่ก่อน)
2. **Setup Installer:** สร้างไฟล์ `Setup.exe` ที่คลิก Next > Next เพื่อติดตั้ง สร้าง Shortcut บน Desktop และตรวจสอบ .NET Runtime ให้อัตโนมัติ

---

## 💻 ขั้นตอนการสร้าง Setup.exe (ด้วย ClickOnce)

วิธีที่ง่ายที่สุดที่ติดมากับ Visual Studio คือ **ClickOnce Deployment**

1. คลิกขวาที่ชื่อ Project ใน Solution Explorer -> เลือก **Publish...**
2. หน้าจอ Publish จะขึ้นมา:
   - **Target:** เลือก **Folder**
   - **Specific Target:** เลือก **ClickOnce**
3. กำหนด Publish Location: เช่น `C:\Deploy\MyPosApp\`
4. กำหนด Install Location: เลือก **From a CD, DVD, or USB drive**
5. ไปที่เมนู **Settings** -> **Prerequisites...**
   - ติ๊กถูกที่ `Create setup program to install prerequisite components`
   - ติ๊กเลือก `.NET Runtime` เวอร์ชันที่คุณใช้ (เช่น .NET 8.0 Desktop Runtime)
   - เลือก **Download prerequisites from the component vendor's web site**
6. กดปุ่ม **Publish**

**ผลลัพธ์ที่ได้:**
ในโฟลเดอร์ `C:\Deploy\MyPosApp\` คุณจะได้ไฟล์ `setup.exe` พร้อมกับแฟ้ม Application Files
คุณสามารถนำโฟลเดอร์นี้ใส่ Flash Drive ไปให้ลูกค้าติดตั้งได้เลย เมื่อลูกค้ากดติดตั้ง โปรแกรมจะตรวจสอบว่าเครื่องลูกค้ามี .NET หรือไม่ ถ้าไม่มีจะโหลดมาลงให้ก่อน แล้วจึงลงโปรแกรมของเราพร้อมสร้างไอคอนที่ Start Menu

---

## 🎯 โจทย์ฝึกปฏิบัติเสริมความเข้าใจ (Mini Exercise)

**โจทย์: การฝัง Database**
หากโปรแกรมของคุณใช้ LocalDB (`.mdf`) ค้นหาวิธีการตั้งค่าไฟล์ `.mdf` ให้เปลี่ยน Property `Copy to Output Directory` เป็น `Copy if newer` เพื่อให้ไฟล์ Database ถูกนำไปรวมในตัวติดตั้งด้วย

---

## 🗣️ ทบทวน (Review)

::: details ❓ คำถามทบทวน 1:
**คำถาม:** การส่งโฟลเดอร์ `bin/Debug` ไปให้ลูกค้าใช้งานโดยตรง มีข้อเสียอย่างไร?

**แนวคำตอบ:** 1. โปรแกรมทำงานช้ากว่าที่ควรจะเป็น เพราะถูกแทรกคำสั่งสำหรับการ Debug ของ Visual Studio เข้าไป 2. ผู้ใช้อาจเผลอลบไฟล์ .dll บางตัวทำให้โปรแกรมพัง 3. ไม่มีตัวเช็คว่าเครื่องลูกค้ามี .NET รันไทม์ครบหรือไม่ ทำให้เปิดโปรแกรมไม่ขึ้นโดยไม่มีหน้าต่างแจ้งเตือนสาเหตุที่ชัดเจน การสร้าง Setup.exe ช่วยแก้ปัญหาเหล่านี้ทั้งหมด
:::
