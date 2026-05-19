# 💻 Lab: สร้างระบบ POS เบื้องต้น (เมนูหลัก + ฟอร์มสั่งซื้อ)

> 💡 **เป้าหมาย:** สร้างระบบ Point of Sale (POS) เบื้องต้นที่มีหน้าเมนูหลัก, ฟอร์มสั่งซื้อสินค้า และฟอร์มสรุปยอด โดยใช้การส่งข้อมูลระหว่างฟอร์มที่เรียนมา

## 📖 ภาพรวมของโปรแกรม

```text
[MainForm] → [OrderForm] → [SummaryForm]
เมนูหลัก     ฟอร์มสั่งซื้อ    สรุปยอด
```

## ⏱️ เวลาที่ใช้: 90 นาที

## 📝 ขั้นตอนการทำงาน

### ขั้นตอนที่ 1: สร้าง 3 Forms

**MainForm:** ปุ่ม "สั่งซื้อสินค้า", "ดูประวัติ", "ออกจากระบบ" + Label แสดง AppSession

**OrderForm:** ListBox สินค้า + ListBox ตะกร้า + NumericUpDown จำนวน + Label ราคารวม + ปุ่ม "ชำระเงิน"

**SummaryForm:** Label สรุปรายการ + Label ยอดรวม + ปุ่ม "พิมพ์ใบเสร็จ" + ปุ่ม "ปิด"

::: code-group
```csharp [AppSession.cs — Global State]
namespace POSApp
{
    public static class AppSession
    {
        public static string CashierName { get; set; } = "พนักงาน A";
        public static int OrderCount { get; set; } = 0;
        public static decimal TotalSales { get; set; } = 0;
    }
}
```

```csharp [OrderForm.cs — ฟอร์มสั่งซื้อ]
using System;
using System.Collections.Generic;
using System.Windows.Forms;

namespace POSApp
{
    public partial class OrderForm : Form
    {
        private Dictionary<string, decimal> menu = new Dictionary<string, decimal>
        {
            {"กาแฟดำ", 35}, {"ลาเต้", 55}, {"ชาเขียว", 45},
            {"เค้ก", 65}, {"แซนวิช", 75}, {"พิซซ่า", 120}
        };

        private List<(string name, int qty, decimal price)> cart = new();

        public decimal TotalAmount { get; private set; }
        public string OrderSummary { get; private set; } = "";

        public OrderForm()
        {
            InitializeComponent();
            LoadMenu();
        }

        private void LoadMenu()
        {
            lstMenu.Items.Clear();
            foreach (var item in menu)
                lstMenu.Items.Add($"{item.Key} — {item.Value:N0} บาท");
        }

        private void btnAddToCart_Click(object sender, EventArgs e)
        {
            if (lstMenu.SelectedIndex < 0) return;

            var keys = new List<string>(menu.Keys);
            string selectedKey = keys[lstMenu.SelectedIndex];
            decimal price = menu[selectedKey];
            int qty = (int)nudQty.Value;

            cart.Add((selectedKey, qty, price * qty));
            RefreshCart();
        }

        private void RefreshCart()
        {
            lstCart.Items.Clear();
            decimal total = 0;
            foreach (var item in cart)
            {
                lstCart.Items.Add($"{item.name} x{item.qty} = {item.price:N0}฿");
                total += item.price;
            }
            TotalAmount = total;
            lblTotal.Text = $"รวม: {total:N0} บาท";
        }

        private void btnCheckout_Click(object sender, EventArgs e)
        {
            if (cart.Count == 0)
            {
                MessageBox.Show("กรุณาเลือกสินค้าก่อน!", "แจ้งเตือน",
                    MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            var lines = new System.Text.StringBuilder();
            foreach (var item in cart)
                lines.AppendLine($"{item.name} x{item.qty} = {item.price:N0}฿");
            OrderSummary = lines.ToString();

            AppSession.OrderCount++;
            AppSession.TotalSales += TotalAmount;

            this.DialogResult = DialogResult.OK;
            this.Close();
        }
    }
}
```

```csharp [MainForm.cs — หน้าหลัก]
using System.Windows.Forms;

namespace POSApp
{
    public partial class MainForm : Form
    {
        public MainForm()
        {
            InitializeComponent();
            lblCashier.Text = $"พนักงาน: {AppSession.CashierName}";
        }

        private void btnOrder_Click(object sender, EventArgs e)
        {
            using (OrderForm orderForm = new OrderForm())
            {
                if (orderForm.ShowDialog(this) == DialogResult.OK)
                {
                    using (SummaryForm summary = new SummaryForm(
                        orderForm.OrderSummary, orderForm.TotalAmount))
                    {
                        summary.ShowDialog(this);
                    }
                    lblStats.Text = $"ออร์เดอร์วันนี้: {AppSession.OrderCount} | ยอดรวม: {AppSession.TotalSales:N0}฿";
                }
            }
        }

        private void btnExit_Click(object sender, EventArgs e)
        {
            if (MessageBox.Show("ออกจากระบบหรือไม่?", "ยืนยัน",
                MessageBoxButtons.YesNo, MessageBoxIcon.Question) == DialogResult.Yes)
                Application.Exit();
        }
    }
}
```
:::

---

## 🔥 Challenge (โจทย์ท้าทาย!)

**โจทย์:** เพิ่มฟีเจอร์ส่วนลด (Discount) โดยมี TextBox รับเปอร์เซ็นต์ส่วนลด (0-50%) และคำนวณราคาหลังหักส่วนลดแสดงใน SummaryForm พร้อมแสดงยอดที่ลดได้ด้วย
