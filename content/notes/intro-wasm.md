---
title: آشنایی با WASM
thumbnail: web-assembly-logo.png
description: " وب‌اسمبلی (انگلیسی: WebAssembly) یا وَسم (انگلیسی: Wasm، اغلب به
  طور مخفف) استانداردی باز است که یک فرمت کدی باینری و قابل حمل برای برنامه‌های
  اجرایی،برای اجرا در محیط های جاوا اسکریپ است .هدف اصلی وب‌اسمبلی میسر کردن
  اپلیکیشن‌های با کارایی-بالا در صفحهات وب است، اما فرمت طوری طراحی شده که
  بتواند در محیط‌های دیگر، هم اجرا و تعبیه گردد."
date: 2023-09-12T16:33:46.294Z
category: آموزش
banner: false
comment: true
dir: rtl
tags:
  - wasm
  - golang
  - tinygo
---

## وسم (Web Assembly - WASM)

### مقدمه

یکی از موضوعات مهم و اساسی در توسعه‌ی ابزار‌های تحت وب، سرعت و کارایی است. اینکه نرم افزار های تحت وب چقدر سریع و بهینه اجرا شوند تأثیر مستقیمی بر روی مخاطبین و مصرف‌کننده‌های نهایی نرم افزار شما دارد.

> طبق بررسی‌های و گزارش‌های آماری شرکت گوگل، اگر وبسایت شما بیشتر ۳ ثانیه لود شود چیزی حدود ۴۰ درصد از مخاطبین خود را از دست می‌دهد برای همین سرعت و کارایی برنامه‌های نوشته شده در وب همیشه یکی از چالش‌های مهم در این حوزه بوده است.

جاوا اسکرپت تنها زبان برنامه‌نویسی تحت وب است، هرچند تا به امروز تلاش‌های زیادی توسط کمپانی‌های بزرگ برای بهتر و بهینه‌تر شدن اجرای جاوا اسکریپت انجام شده است. کار‌هایی مثل مرورگر‌های وب و موتور‌های جاوا اسکریپت مدرن که سرعت و اجرای کدهای جاوا اسکریپ را نسبت به سال‌های قبل خیلی بهینه‌تر و بهتر کرده‌اند.

کتابخانه‌های مدرنی مثل React یا Vue و... ، باندلر‌های مدرن مثل WebPack یا Vite و... همه به نوعی در تلاش بوده‌اند که کارایی صفحات وب را بهینه‌تر و سریعتر کنند. نسبت به سال‌های اولیه وب، نرم‌افزار‌های نوشته شده با جاوا اسکریپت خیلی سریعتر و بهتر شده‌اند ولی همیشه‌ یک مشکل اساسی وجود داشته برای عبور از کارایی کد‌ها، مخصوصاً وقتی شما در حال توسعه یک بازی تحت وب هستید و مقدار زیادی کد پردازشتی و محاسباتی دارید.

ولی پرسش اصلی با وجود جاوا اسکریپ همیشه پابرجا بوده است .آیا سرعت و کارایی بیشتر باز هم امکان‌پذیر است؟

> برای حل این مشکل ابتدا تکنولوژی asm. js توسط موزیلا ارایه شد و بعداً مدل‌های اولیه وب اسمبلی یا WASM

اگر کلیات زبان‌های برنامه‌نویسی آشنا باشید می‌دونید که زبان‌های برنامه‌نویسی برای اجرای کد‌های نوشته شده دو دسته کلی دارند:

۱- زبان‌های کامپایلیری که کد‌های نوشته شده ابتدا توسط کامپایلر به زبان سطح ماشین (assembly) تبدیل می‌شوند و سپس این فایل‌های باینری توسط ماشین اجرا می‌شوند. زبان‌هایی مثل C، C++، GO و...

۲- زبان‌های مفسری (interpreter language ) که کد‌های نوشته شده در زمان اجرا توسط یک برنامه واسط به اسم مفسر ابتدا خوانده و سپس تبدیل به کد‌های اجرایی ماشین می‌شوند و سپس اجرا می‌شوند. زبان‌هایی مثل PHP، Python، Javascript

هر کدام از این زبان‌ها ویژگی‌ها و توانایی خاص خود را دارند و برای کار‌های خاصی مورد استفاده قرار می‌گیرند ،ولی وقتی در مورد سرعت و کارایی اجرای کد‌ها صحبت کنیم همیشه زبان‌های کامپایلری بهترین کارایی و سرعت را نسبت به زبان‌های مفسری دارند.

ایده‌ی کلی و اولیه وسم پیاده‌سازی چیزی شبیه به فایل‌های باینری اسمبلی بوده است با این تفاوت که وابستگی خاصی به معماری ماشین نداشته باشند و در عین حال بتوانیم تجربه‌ی در سطح ماشین داشته باشیم و به راحتی هم بتواند در محیط مرورگر اجرا شود!

وب‌اسمبلی یا وسم (WASM ) یک دستورالعمل نوشتن فایل‌های باینری است که شما می‌توانید کد‌های اصلی خود را به زبان‌های مخلتف بنویسید و سپس به فایل‌های اجرایی WASM کامپایل کنید. استفاده از WASM برای توسعه ابزار‌های وب، پتانیسل‌های زیادی را برای توسعه دهنده به ارمغان می‌آورد. فایل‌های WASM به دلیل اینکه در Javascript VM اجرا می‌شوند، علاوه بر امنیت و اجرا شدن در محیط‌های ایزوله جاوا اسکریپت، قابلیت دسترسی به API‌های اصلی مرورگر را نیز دارند.

به کمک WASM می‌توانید کد‌های مالتی ترد بنویسید، DOM‌ها را تغییر دهید و با DOM‌ها تعامل کنید.برای مثال برای پردازش‌های سنگین مثل بازی‌های تحت وبمیتوانید فایل‌های Wasm را در WebWorker اجرا کنید تا از تمام تمان پردازشی سیستم استفاده کنید و در عین حال صفحه وب تجربه روان و سبکی را ارایه دهد. حتی سرویس‌های کلود‌بیسی وجود دارند که می توانید کد‌های WASM را در کلود اجرا کنید .
...

شما می‌توانید فایل‌های WASM را به زبان‌های مختلفی بنویسید. در این آموزش سورس‌های اصلی به زبان محبوب Golang نوشته می‌شوند و سپس به کمک کامپایلر Tinygo به فایل‌های وسم کامپایل می‌شوند.

دلیل استفاده از tinygo حجم بهینه فایل‌های وسم است.

برای مثال:

۱- یک برنامه سلام دنیای ساده وقتی به کمک کامپایل پیشفرض Golang کامپایل می‌شود حدود ۲ مگابایت است.

۲- وقتی با tinygo کامپایل شود حدود ۸۵ کیلوبایایت: )

```go
package main

import "fmt"

func main() {
	fmt.Println("Hello world from Go :)")

}
```

```bash
# build by default go compiler
GOOS=js GOARCH=wasm go build -o hello-go.wasm ./main.go
 2059063 hello-go.wasm --> KB

# build by tinygo
tinygo build -o hello-tinygo.wasm  -no-debug -opt=2 helloWorld.go
hello-tinygo.wasm ->>  85935 KB
```

## نوشتن برنامه با WASM

برای شروع کار ابتدا مطمن شوید آخرین ورژن Go و TinyGo بر روی سیستم شما نصب شده باشند

(ورژن ها ی مورد استفاده در این آموزش )

```bash
❯ go version
go version go1.21.0 linux/amd64
❯ tinygo version
tinygo version 0.29.0 linux/amd64 (using go version go1.21.0 and LLVM version 15.0.0)
```

### آماده سازی ساختارهای کلی

۱- یک فایل HTML با ساختار زیر : `index.html`

```html
<!doctype html>
<html dir="rtl">
  <head>
    <meta charset="utf-8" />
    <title>وسم با تاینی‌گو</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script src="wasm_exec.js"></script>
    <script src="wasm.js"></script>
  </head>
  <body>
    <h1>وب‌اسمبلی (Wasm)</h1>
  </body>
</html>
```

۲- فایل wasm.js برای اجرا کردن فایل وسم :

```js
const WASM_URL = "wasm.wasm";
let wasm;

const initWasm = () => {
  const go = new Go();
  if ("instantiateStreaming" in WebAssembly) {
    WebAssembly.instantiateStreaming(fetch(WASM_URL), go.importObject).then(
      function (obj) {
        wasm = obj.instance;
        go.run(wasm);
      },
    );
  }
};
initWasm();
```

۳- فایل wasm_exec.js را دانلود کنید (‌این فایل مروبط به کامپایلر Tinygo گو است )

- دانلود از گیتهاب تاینی گو : [wasm_exec.js](https://github.com/tinygo-org/tinygo/blob/release/targets/wasm_exec.js)

خیلی خب ،الان چهاچوب لازم برای اجرا کردن فایل های Wasm در وب آماده شده است .

### اجرای برنامه سلام دنیا

برای شروع برنامه سلام دنیا رو در Go می نویسم :

```go
package main

import "fmt"

func main() {
	fmt.Println("Hello world from Go :)")
}
```

و سپس به کمک دستور زیر به وسم کامپایل میکنیم :

```bash
tinygo build -o main.wasm  -no-debug -opt=2 main.go
```

که نهایتا یک فایل چند کیلوبایتی باینری با فرمت wasm رو ایجاد میکند .

> برای اجرا دقت کنید همه ی فایل ها در پوشه روت باشند .

![image-20230912155002189](image-20230912155002189.png)

با نصب بودن npm روی سیستمتون کامند زیر رو اجرا کنید تا وب‌سرور لوکال روی پورت ۳۰۰۰ اجرا بشه :

```bash
npx serve .
```

حالا با رفتن به آدرس

```bash
http://localhost:3000
```

و بازکردن کونسول پیام hello world from go رو ببینید :)

![image-20230912190101019](image-20230912190101019.png)

### اجرا کردن توابع گو در جاوا اسکریپت

بعد از اجرا کردن برنامه سلام دنیا و اینکه با فرآیند کلی کار با وسم آشنا شدید در این مرحله یک سری داده ها رو از ورودی های html به سمت فایل وسم می فرستیم (‌صدا زدن توابع داخلی ) و سپس خروجی رو نمایش می دهیم :

برای شروع فایل `index.html` رو به این صورت تغییر بدید :

```html
<!doctype html>

<html dir="rtl">
  <head>
    <meta charset="utf-8" />
    <title>وسم با تاینی‌گو</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script src="wasm_exec.js"></script>
    <script src="wasm.js"></script>
  </head>

  <body>
    <h1>وب‌اسمبلی (Wasm)</h1>
    <p>
      دو عدد را وارد کنید و و نتیجه را به کمک صدا زدن تابع add در فایل Wasm
      محاسبه کنید .
    </p>
    <input type="number" id="a" value="2" /> +
    <input type="number" id="b" value="2" /> =
    <input type="number" id="result" />
    <button>محاسبه</button>
    <script>
      const button = document.querySelector("button");

      button.addEventListener("click", (event) => {
        var a = parseInt(document.getElementById("a").value);
        var b = parseInt(document.getElementById("b").value);
        var res = wasm.exports.add(a, b);
        var sum_box = document.getElementById("result");
        sum_box.value = res;
      });
    </script>
  </body>
</html>
```

در مثال بالا به کمک

```js
var res = wasm.exports.add(a, b);
```

ورودی های a و b رو به تابع add که به صورت زیر در گو نوشته شده است می فرستیم و سپس خروجی ها رو در HTML نمایش می دهیم :

```go
package main

import "fmt"

func main() {
	fmt.Println("Hello world from Go :)")
}

//export add
func add(x, y int) int {
	return x + y
}
```

دوباره کامپایل میکنیم :

```bash
tinygo build -o main.wasm  -no-debug -opt=2 main.go
```

و صفحه رو رفرش میکنیم :
خروجی :

![image-20230912155340616](image-20230912155340616.png)

- برای اینکه بتوانید به توابع WASM را در جاوا اسکریپ دسترسی داشته باشید (در تاینی‌گو) ابتدای نام تابع `//export` را بنویسید مثال :

```go
//export add
func add(x, y int) int {
	return x + y
}
```

## تغییرات در DOM

در این مثال به کمک کتابخانه

```go
 	"syscall/js"
```

یک المان P را در صفحه ایجاد میکنیم و استایل بندی میکنیم :

کدهای main.go رو به این صورت تغییر بدید :

```go
package main

import (
	"fmt"
	"syscall/js"
)

// import js syscall lib

func main() {
	fmt.Println("Hello world from Go :)")

	// 1- find document in page
	document := js.Global().Get("document")
	// 2 - create p
	p := document.Call("createElement", "p")
	// 3- add some text to p
	p.Set("innerHTML", "Hello WASM from Go!")
	// 4- do some style
	p.Set("style", "font-size:30px;border-top:1px solid #ddd;padding-top:5px")
	//5- finally : append  P to the body
	document.Get("body").Call("appendChild", p)
}

//export add
func add(x, y int) int {
	return x + y
}
```

کامپایل و صفحه رو رفرش کنید :

![image-20230912155516660](image-20230912155516660.png)

## سخن پایانی

در این آموزش کوتاه سعی کردیم یک آشنایی خیلی ابتدایی با وسم و کاربرد های اصلی اون داشته باشیم . دایره و قابلیت های وسم برای وب خیلی وسیع است و با کمی دقت و جستجو میتونید بخش هایی از فرانت رو که نیاز به سرعت و دقت بیشتری دارید ،به سمت وسم ببرید .

## پیوند ها و منابع بیشتر

- [TinyGO](https://tinygo.org/)
- [llvm](https://llvm.org/)
- [wasm](https://webassembly.org/)
- [golang](https://go.dev/)
- سورس های این آموزش :‌ [tinygo-wasm-tuts](https://github.com/mehotkhan/tinygo-wasm-tuts)
