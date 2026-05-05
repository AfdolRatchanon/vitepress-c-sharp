# เฉลย: โครงสร้างโปรแกรม C#

## 🎯 เฉลย Mini Exercise

**โจทย์ที่ 1:** แปลง Top-level statements เป็น Traditional Style
**เฉลย:**
```csharp
namespace SchoolApp
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("สวัสดีจาก C#!");
            Console.WriteLine("วันนี้เรียนเรื่องโครงสร้างโปรแกรม");
        }
    }
}
```

**โจทย์ที่ 2:** สร้าง namespace ซ้อนกัน 2 ชั้น
**เฉลย:**
สามารถเขียนได้ 2 แบบ (แบบแรกนิยมกว่า):

**แบบที่ 1: ใช้จุด (Dot Notation)**
```csharp
namespace School.Management
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("ระบบจัดการโรงเรียน");
        }
    }
}
```

**แบบที่ 2: เขียนซ้อนกันด้วยปีกกา (Nested Namespace)**
```csharp
namespace School
{
    namespace Management
    {
        class Program
        {
            static void Main(string[] args)
            {
                Console.WriteLine("ระบบจัดการโรงเรียน");
            }
        }
    }
}
```

---

## 🔥 เฉลย Challenge

**โจทย์:** ใช้ `Environment.CommandLine` แสดงคำสั่งรันโปรแกรมใน Traditional Style
**เฉลย:**
```csharp
namespace AppInfo
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("คุณรันโปรแกรมด้วยคำสั่ง:");
            Console.WriteLine(Environment.CommandLine);
        }
    }
}
```
