---
title: آشنایی با WASM
thumbnail: /content/web-assembly-logo.png
description: "وب‌اسمبلی (انگلیسی: WebAssembly) یا وَسم (انگلیسی: Wasm، اغلب به
  طور مخفف) استانداردی باز است که یک فرمت کدی باینری و قابل حمل برای برنامه‌های
  اجرایی، و زبان اسمبلی متناظری را نیز، به همراه همچنین واسطه‌هایی برای تسهیل
  تعاملات میان چنین برنامه‌هایی و محیط میزبانشان تعریف می‌کند.[و ۱] هدف اصلی
  وب‌اسمبلی میسر کردن اپلیکیشن‌های با کارایی-بالا در صفحهات وب است، اما فرمت
  طوری طراحی شده که بتواند در محیط‌های دیگر، هم اجرا و تعبیه گردد."
date: 2023-09-09T08:49:55.892Z
category: آموزش
banner: false
comment: true
tags:
  - wasm
  - golang
  - tinygo
---

## ۱. وسم (Web Assembly - WASM)

### ۱.۱. مقدمه

وب اسمبلی یا اسمبلی برای وب ،پیاده سازی چیزی شبیه به اسمبلی برای مرورگر ها و وب سایت ها بوده است و همینطور که میدونیم زبان های برنامه نویسی وقتی کامپیال میشوند کارایی و سرعت خیلی بهتری نسبت به نسخه های اسکریپتی دارند ، در وسم سورس های اولیه را با زبان های مختلفی می توانید بنیوید (‌مثل Go ,C++,python+...) و سپس کامپایل به فایل های باینری بیس کنید و توانایی منحصر به فردی که به شما می دهد ،قایلیت اجرا در اغلب مرور گر ها و حتی سیستم های کلود بیس است .

پیاده سازی لاجیک های نرم افزاری به کمک وسم به شما سرعت و کارایی خیلی بالایی در اجرای کد ها می دهد و البته در نسخه های کامپایل شده برای مرورگر شما قابلیت تعامل با DOM ها رو هم دارید .به راحتی می توانید پردازش های پیچیده و سنگین را به کمک وسم نوشته و به سورت مالتی ترد ،در مرورگر انجام دهید . تکنولوژی وسم چشم انداز های وسیعی را برای توسعه دهندگان وب باز میکند. از بهینه کردن موتور های بازی برای مرورگر ها که نیاز بالایی به سرعت و پردازش بالا دارند تا نوشتن بعضی از لاجیک های نرم افزاری که توسعه دهنده برای مخفی نگه داشتن الگوریتم ها و سورس های نرم افزار .

به کم وسم شما می توانید به سرعت نزدیک به سطح ماشین (‌به دلیل باینری بیس بودن کد ها ) را داشته باشید و در عین حال در رنج وسیعی از پلتفرم ها رو پشتیباین کنید .

###  ۱.۱. زبان برنامه نوسی گو (Golang)



### ۲.۱. TinyGO

تاینی گو یک کامپایل برای زبان گو است که به کمک llvm زبان گو را در محیط های کوچک کامپایل می کند .

به کمک تاینی‌گو می توانید برای محیط هایی محدود کدها را کم حجم و سبک کامپایل کنید . ما در این آموزش به کمک کامپایل تاینی گو ،اسکریپت های Go را به وسم کامپایل میکنید .

ابتدا برای شروع وسم باید یا قالب اولیه HTML + JS را آماده کنید تا بتوانید فایل های باینری وسم را اجرا کنید .





### ۳.۱.  پیوند ها و منابع بیشتر 

- tinygo
- llvm
- wasm
- golang
- 

## ۲. نوشتن برنامه با WASM



### ۱.۲. آماده سازی ساختارهای کلی

۱- برای شروع ابتدا مطمن شوید تاینی گو روی سیستم شما نصب شده است :

صفحه رسمی نصبت تاینی گو :‌https://tinygo.org/getting-started/install/

۲- سپس یک فایل HTML با این محتویات ایجاد کنید (index.html) :

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Tinygo WebAssembly</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script src="wasm_exec.js"></script>
    <script src="wasm.js"></script>
  </head>
  <body>
    <h1>WebAssembly</h1>
    </script>
  </body>
</html>
```

۳- فایل wasm.js برای اجرا کردن فایل وسم :

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
      }
    );
  }
};
initWasm();
```

۴- فایل https://github.com/mehotkhan/tinygo-wasm-tuts/blob/master/wasm_exec.js را دانلود کنید (‌این فایل مروبو به کامپایل تاینی گو است )

خب ،الان چهاچوب لازم برای اجرا کردن فایل های وسم رو آماده کنید .



### ۲.۲. اجرای برنامه سلام دنیا



برای شروع برنامه سلام دنیا رو در گولنگ مینویسم :

```go
package main

import "fmt"

func main() {
	fmt.Println("Hello world from Go :)")
}


```

و سپس به کمک دستور زیر به وسم کامپایل میکنیم :

```bash
tinygo build -o wasm.wasm -target wasm ./main.go

```

که نهایتا یک فایل چند کیلوبایتی باینری با فرمت wasm رو ایجاد میکند .

![image-20230910124129148](/content/image-20230910124129148.png)

برای اجرا دقت کنید همه ی فایل ها در پوشه روت باشند .

با نصب بودن npm روی سیستمتون کامند زیر رو اجرا کنید تا وب‌سرور لوکال روی پورت ۳۰۰۰ اجرا بشه :

```bash
npx serve .
```

حالا با رفتن به آدرست

```bash
http://localhost:3000

```

و بازکردن کونسول پیام hello worlf from go رو ببینید :)

![image-20230910124542599](/content/image-20230910124542599.png)

###  ۳.۲. اجرا کردن توابع گو در جاوا اسکریپت

بعد از اجرا کردن برنامه سلام دنیا و اینکه با فرآیند کلی کار با وسم آشنا شدید .

توی این مرحله یک سری داده ها رو از ورودی های html به سمت فایل وسم می فرستیم (‌صدا زدن توابع داخلی ) و سپس خروجی رو نماش میدیم :

برای شروع فایل index.html رو به این صورت تغییر بدید :

```html
<!doctype html>

<html>
  <head>
    <meta charset="utf-8" />
    <title>Tinygo WebAssembly</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script src="wasm_exec.js"></script>
    <script src="wasm.js"></script>
  </head>

  <body>
    <h1>WebAssembly</h1>
    <p>
      Add two numbers, using WebAssembly calling an add() method written in Go:
    </p>
    <input type="number" id="a" value="2" /> +
    <input type="number" id="b" value="2" /> =
    <input type="number" id="result" />
    <button>Calculate</button>
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

ورودی های a و n رو به تابع add که به صورت زیر در گو نوشته شده است می فرستیم و سپس خروجی ها رو در صفحه نمایش میدهیم :

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

تابع add رو اضاف میکنیم
دوباره کامپایل میکنیم :

```bash
tinygo build -o wasm.wasm -target wasm ./main.go
```

و صفحه رو رفرش میکنیم :
خروجی :

![image-20230910125312646](/content/image-20230910125312646.png)

## ۴.۲. تغییرات در DOM ها

در این مثال به کمک کتابخانه

```
 	"syscall/js"

```

یک المان P را در صفحه ایجاد میکنیم و استایل بندی میکنیم ،

دقت کنید که صرفا برای آشنایی با نحوه ی کار است این مثال :

کدهای main.go رو به این صورت تغییر بدید :

```go
package main

import "fmt"
// import js syscall lib
import 	"syscall/js"


func main() {
	fmt.Println("Hello world from Go :)")

    // 1- find document in page
	document := js.Global().Get("document")
	//2 - create p
    p := document.Call("createElement", "p")
    // 3- add some text to p
    p.Set("innerHTML", "Hello WASM from Go!")
    // 4- do some style
    p.Set("style", "font-size:30px;border-top:1px solid #ddd;padding-top:5px")
    //5- finaly : append  P to the body
    document.Get("body").Call("appendChild", p)
}

//export add
func add(x, y int) int {
	return x + y
}

```

کامپایل و صفحه رو رفرش کنید :

![image-20230910131055636](/content/image-20230910131055636.png)

## ۳. سخن پایانی

در این آموزش کوتاه سعی کردیم یک آشنایی خیلی ابتدایی با وسم و کاربرد های اصلی اون داشته باشیم . دایره و قابلیت های وسم برای وب خیلی وسیع است و با کمی دقت و جستجو میتونید بخش هایی از فرانت رو که نیاز به سرعت و دقت بیشتری دارید ،به سمت وسم ببرید .
