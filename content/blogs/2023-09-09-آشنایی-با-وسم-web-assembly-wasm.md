---
title: آشنایی با وسم ( Web Assembly - WASM )
thumbnail: /content/web-assembly-logo.png
description: "وب‌اسمبلی (انگلیسی: WebAssembly) یا وَسم (انگلیسی: Wasm، اغلب به
  طور مخفف) استانداردی باز است که یک فرمت کدی باینری و قابل حمل برای برنامه‌های
  اجرایی، و زبان اسمبلی متناظری را نیز، به همراه همچنین واسطه‌هایی برای تسهیل
  تعاملات میان چنین برنامه‌هایی و محیط میزبانشان تعریف می‌کند.[و ۱] هدف اصلی
  وب‌اسمبلی میسر کردن اپلیکیشن‌های با کارایی-بالا در صفحهات وب است، اما فرمت
  طوری طراحی شده که بتواند در محیط‌های دیگر، هم اجرا و تعبیه گردد."
date: 2023-09-09T08:49:55.892Z
category: یادداشت
banner: false
comment: false
---
## مقدمه :

در این آموزش به کمک زبان برنامه نویسی Golang   و کامپایلر TinyGo  اسکریپت های وسم را می نویسم .

## مثال :‌سلام دنیا

```go
package main

import "fmt"

func main() {
	fmt.Println("hello world")
}

// This function is exported to JavaScript, so can be called using
// exports.add() in JavaScript.
//
//export add
func add(x, y int) int {
	return x + y
}
```

```shell
tinygo build -o wasm.wasm -target wasm ./main.go
```