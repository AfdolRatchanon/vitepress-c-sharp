# เฉลย: Comparison & Logical Operators

## 🎯 เฉลย Mini Exercise

**โจทย์ที่ 1:** แปลงกฎการโจมตีคริติคอล ("accuracy > 80 และ ไม่ถูกศัตรูบล็อค") เป็นโค้ด
**เฉลย:**
การแปลประโยคภาษามนุษย์ให้เป็นตรรกะทางคอมพิวเตอร์เป็นทักษะที่สำคัญ

```csharp
// สมมติว่ามีตัวแปร 2 ตัวนี้อยู่แล้ว
int accuracy = 85;
bool isBlocked = false;

// คำนวณความน่าจะเป็นของการติดคริติคอล
bool isCritical = (accuracy > 80) && !isBlocked;

// หรือเขียนแบบเต็มๆ คือ (accuracy > 80) && (isBlocked == false);
Console.WriteLine("ติดคริติคอลหรือไม่? " + isCritical);
```
*(ในกรณีนี้ผลลัพธ์จะได้ `true` เพราะ 85 มากกว่า 80 และการบล็อคเป็นเท็จ ซึ่งพอเจอเครื่องหมาย NOT `!` ก็จะกลับเป็นจริง กลายเป็น `true && true`)*

**โจทย์ที่ 2:** เดาผลลัพธ์ True/False ด้วยตาเปล่า
```csharp
int x = 10;
int y = 5;
bool result1 = (x > y) && (x == 10);
bool result2 = (x < 5) || (y != 5);
bool result3 = !(x == 10);
```
**เฉลยและการวิเคราะห์ทีละขั้นตอน:**

**result1:** `(10 > 5) && (10 == 10)`
- ประเมินปีกกาซ้าย: `true`
- ประเมินปีกกาขวา: `true`
- สรุป: `true && true` -> ได้ผลลัพธ์เป็น **`true`**

**result2:** `(10 < 5) || (5 != 5)`
- ประเมินปีกกาซ้าย: `false` (10 ไม่ได้น้อยกว่า 5)
- ประเมินปีกกาขวา: `false` (5 ย่อมเท่ากับ 5 เสมอ ดังนั้น "5 ไม่เท่ากับ 5" จึงเป็นเท็จ)
- สรุป: `false || false` -> ได้ผลลัพธ์เป็น **`false`**

**result3:** `!(10 == 10)`
- ประเมินปีกกาข้างใน: `true` (10 เท่ากับ 10 แน่นอน)
- โดนตัวดำเนินการ NOT (`!`) กลับค่าจากจริงเป็นเท็จ
- สรุป: `!(true)` -> ได้ผลลัพธ์เป็น **`false`**

---

## 🔥 เฉลย Challenge

**โจทย์:** พิสูจน์ทฤษฎี De Morgan's Laws: `!(A && B) == !A || !B`
**เฉลย:**
กฏของเดอมอร์แกนบอกว่า ถ้าคุณกระจายนิเสธ (`!`) เข้าไปในวงเล็บที่มี AND (`&&`) เครื่องหมาย AND จะถูกกลับด้านกลายเป็น OR (`||`) และในทางกลับกันด้วย

โค้ดจำลองการพิสูจน์:
```csharp
Console.WriteLine("=== De Morgan's Laws Prover ===");

bool A = true;
bool B = false;

// ฝั่งซ้าย: นำ A และ B มา AND กันก่อน แล้วค่อยกลับค่า
// true && false = false
// !(false) = true
bool leftSide = !(A && B);

// ฝั่งขวา: กลับค่า A และ B ก่อน แล้วนำมา OR กัน
// !true = false
// !false = true
// false || true = true
bool rightSide = !A || !B;

Console.WriteLine("A = " + A + ", B = " + B);
Console.WriteLine("ฝั่งซ้าย !(A && B) ได้ค่า: " + leftSide);
Console.WriteLine("ฝั่งขวา  !A || !B ได้ค่า: " + rightSide);

// เปรียบเทียบผลลัพธ์สุดท้าย
bool isTheoryCorrect = leftSide == rightSide;
Console.WriteLine("ทฤษฎีนี้ถูกต้องหรือไม่? : " + isTheoryCorrect);
```

**ผลลัพธ์:**
```text
A = True, B = False
ฝั่งซ้าย !(A && B) ได้ค่า: True
ฝั่งขวา  !A || !B ได้ค่า: True
ทฤษฎีนี้ถูกต้องหรือไม่? : True
```
*(ถ้าคุณลองสลับค่า A และ B เป็นทุกกรณีที่เป็นไปได้ (เช่น true/true, false/false) คุณจะพบว่าฝั่งซ้ายและฝั่งขวาจะให้ผลลัพธ์ตรงกันเสมอ 100%)*
