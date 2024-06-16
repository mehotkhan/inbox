import { sha256 } from "@noble/hashes/sha256";

const animals = [
  "گربه",
  "گاو",
  "سگ",
  "خر",
  "بز",
  "اسب",
  "خوک",
  "خرگوش",
  "مورچه خوار",
  "گرگ قرمز",
  "آلباتروس",
  "تمساح",
  "آلپاکا",
  "دوزیست",
  "آناکوندا",
  "فرشته ماهی",
  "مورچه",
  "بزکوهی",
  "بوزینه",
  "شته",
  "آرمادیلو",
  "بابون",
  "گورکن",
  "باندیکوت",
  "بارناکل",
  "باراکودا",
  "خفاش",
  "خرس",
  "سگ ابی",
  "ساس",
  "زنبور عسل",
  "سوسک",
  "پرنده",
  "گاومیش کوهان دار امریکایی",
  "پرنده سیاه",
  "بوآ",
  "گراز",
  "گربه وحشي",
  "حشره",
  "پروانه",
  "زوزک",
  "شتر",
  "کپور",
  "کوسه گربه ای",
  "کرم ابریشم",
  "گربه ماهی",
  "هزار پا",
  "آفتابپرست",
  "یوزپلنگ",
  "جوجه",
  "شامپانزه",
  "سنجاب",
  "صدف",
  "دلقک ماهی",
  "کبرا",
  "مرجان",
  "گربه وحشی پشمالو",
  "کایوت",
  "خرچنگ",
  "کلاغ",
  "گوزن",
  "دایناسور",
  "دلفین",
  "کبوتر",
  "سنجاقک",
  "اژدها",
  "اردک",
  "عقاب",
  "کرم خاکی",
  "مارماهی",
  "فیل",
  "شاهین",
  "موش خرما",
  "فینچ",
  "کرم شب تاب",
  "ماهی",
  "فلامینگو",
  "کک",
  "پرواز",
  "ماهی پرنده",
  "مرغ",
  "روباه",
  "قورباغه",
  "غزال",
  "گیبون",
  "زرافه",
  "ماهی قرمز",
  "غاز",
  "گوریل",
  "ملخ",
  "مرغ گینه",
  "هادوک",
  "نوعی ماهی پهن بزرگ",
  "همستر",
  "خارپشت",
  "حواصیل",
  "اسب ابی",
  "کرم قلابدار",
  "هور مگس",
  "کفتار",
  "ایگوانا",
  "ایمپالا",
  "شغال",
  "جگوار",
  "عروس دریایی",
  "پرنده جنگلی",
  "کانگورو",
  "شنگ ماهی",
  "بادبادک",
  "کیوی",
  "کوآلا",
  "کفشدوزک",
  "زالو",
  "لمینگ",
  "لمور",
  "پلنگ",
  "لئوپون",
  "شیر نر",
  "مارمولک",
  "لاما",
  "لون",
  "شپش",
  "ماهی ریه",
  "سیاه گوش",
  "ماکائو",
  "ماهی خال مخالی",
  "زاغی",
  "پستاندار",
  "گانه دریایی",
  "جانور کیسه دار",
  "راسو",
];

const adjectives = [
  "بزرگ",
  "غول آسا",
  "چاق",
  "غول پیکر",
  "عالی",
  "عظیم",
  "طولانی",
  "مینیاتور",
  "کوچک",
  "کوتاه",
  "کم اهمیت",
  "بلند قد",
  "سرد",
  "عجیب و غریب",
  "کج",
  "فرفری",
  "آسیب دیده",
  "کثیف",
  "خشک",
  "غبارآلود",
  "پوسته پوسته",
  "کرکی",
  "خیس",
  "گسترده",
  "چاق و چله",
  "توخالی",
  "گرد",
  "لاغر",
  "کهن",
  "مختصر",
  "سریع",
  "نوین",
  "قدیمی",
  "جوان",
  "خالی",
  "سنگین",
  "سبک",
  "خشن",
  "خاموش",
  "ملودیک",
  "لال",
  "پر سر و صدا",
  "ساکت",
  "تیز",
  "بی صدا",
  "نرم",
  "تلخ",
  "شور",
  "ترش",
  "تند",
  "کهنه",
  "قوی",
  "شیرین",
  "بی مزه",
  "خوش طعم",
  "تشنه",
  "درهم",
  "چرب",
  "خاکی",
  "سخت",
  "داغ",
  "یخی",
  "شل",
  "ذوب شده",
  "خاردار",
  "بارانی",
  "ابریشمی",
  "لزخی",
  "صاف",
  "جامد",
  "ثابت",
  "ضعیف",
  "چوبی",
  "خشمگین",
  "مشتاق",
  "متکبر",
  "شرمنده",
  "بد",
  "گیج",
  "خسته",
  "مبارزه",
  "محکوم",
  "سردرگم",
  "ظالمانه",
  "خطرناک",
  "متعصب",
  "افسرده",
  "منزجر",
  "مختل",
  "وهم انگیز",
  "خجالت زده",
  "حسادت",
  "شر",
  "احمق",
  "از کوره در رفته",
  "وحشت زده",
  "غمگین",
  "درمانده",
  "خانه به دوش",
  "گرسنه",
  "صدمه",
  "بیمار",
  "تنها",
  "اسرار آمیز",
  "شیطون",
  "عصبی",
  "ترسناک",
  "مسخره",
  "خود خواه",
  "وحشتناک",
  "بی فکر",
  "مشکل دار",
  "ناراحت",
  "شرور",
  "نگران",
  "موافق",
  "سرگرم شده",
  "شجاع",
  "آرام",
  "بشاش",
  "راحت",
  "خوشحال",
  "افسون کننده",
  "تشویق کننده",
  "پر انرژی",
  "شوق",
  "برانگیخته",
  "با ایمان",
  "خارق العاده",
  "خوب",
  "دوستانه",
  "خنده دار",
  "لطیف",
  "با شکوه",
  "سالم",
  "مفید",
  "شاد",
  "زنده",
  "دوست داشتني",
  "خوش شانس",
  "دلپذیر",
  "مغرور",
  "احمقانه",
  "خندان",
  "متفکر",
  "پیروز",
  "سرزنده",
  "شوخ",
  "شگفت انگیز",
  "غیور",
  "دیوونه",
  "جدید",
  "ناهمسان",
  "محلی",
  "اجتماعی",
  "مهم",
  "ملی",
  "بریتانیایی",
  "سیاسی",
  "توانا",
  "عمومی",
  "در دسترس",
  "اصلی",
  "مطمئن",
  "روشن",
  "اقتصادی",
  "واقعی",
  "سیاه",
  "خاص",
  "بین المللی",
  "ویژه",
  "دشوار",
  "کل",
  "سفید",
  "رایگان",
  "آسان",
  "اروپایی",
  "مرکزی",
  "مشابه",
  "انسان",
  "مشترک",
  "لازم",
  "شخصی",
  "خصوصی",
  "فقیر",
  "خارجی",
  "ساده",
  "آمریکایی",
  "انگلیسی",
  "حاضر",
  "سلطنتی",
  "طبیعی",
  "فرانسوی",
  "نیهیلیست",
  "سالیپسیست",
  "ماتریالیست",
  "سوررئالیست",
  "چرند",
  "جاری",
  "مجاز",
  "نهایی",
  "قرمز",
  "معمولی",
  "جدی",
  "قبلی",
  "جمع",
  "نخست",
  "صنعتی",
  "متاسف",
  "مرده",
  "مناسب",
  "شوروی",
  "نظامی",
  "آگاه",
  "عزیز",
  "محبوب",
  "حرفه ای",
  "تاریک",
  "سبز",
  "تاثیر گذار",
  "غربی",
  "سنتی",
  "اسکاتلندی",
  "آلمانی",
  "مستقل",
  "گرفتار",
  "مسئول",
  "پزشکی",
  "آبی",
  "اضافی",
  "نر",
  "علاقه مند",
  "ضروری",
  "زیبا",
  "مدنی",
  "اولیه",
  "واضح",
  "آینده",
  "محیطی",
  "مثبت",
  "ارشد",
  "هسته ای",
  "سالانه",
  "ثروتمند",
  "تجاری",
  "بی خطر",
  "کاربردی",
  "رسمی",
  "رئیس",
  "منظم",
  "فعال",
  "قدرتمند",
  "پیچیده",
  "استاندارد",
  "غیرممکن",
  "متحد",
  "فنی",
  "ارزان",
  "عجیب",
  "شمالی",
  "دینی",
  "مشهور",
  "فرهنگی",
  "محدود",
  "محافظه کار",
  "معمول",
  "با مسئولیت محدود",
  "ناتوان",
  "روستایی",
  "میانگین",
  "معقول",
  "مونث",
  "دموکراتیک",
  "رو به رشد",
  "کافی",
  "علمی",
  "شرقی",
  "ایرلندی",
  "گران",
  "آموزشی",
  "ذهنی",
  "بحرانی",
  "آشنا",
  "بعید",
  "تاریخی",
  "روزانه",
  "جنوبی",
  "افزایش",
  "وحشی",
  "شهری",
  "متاهل",
  "لیبرال",
  "آشکار",
  "مشغول",
  "خونین",
  "روسی",
  "اخلاقی",
  "مراقب",
  "تمیز",
  "جذاب",
  "ژاپنی",
  "حیاتی",
  "ضخیم",
  "جایگزین",
  "مسن",
  "نادر",
  "قادر",
  "خاکستری",
  "ایده آل",
  "جزئی",
  "راضی",
  "شدید",
  "منفی",
  "دائمی",
  "جنایی",
  "امروزی",
  "نزدیک",
  "رومی",
  "منحصر بفرد",
  "پارلمان",
  "آفریقایی",
  "ناشناخته",
  "گناهکار",
  "زرد",
  "غیر معمول",
  "خالص",
  "بسيار خوب",
  "ایتالیایی",
  "مدیر",
  "کارآمد",
  "خفیف",
  "ارزشمند",
  "نمایشی",
  "طلایی",
  "موقت",
  "فدرال",
  "هندی",
  "رنگ پریده",
  "قانونی",
  "وابسته",
  "محکم",
  "رقابتی",
  "مسلح",
  "افراطی",
  "قابل قبول",
  "حساس",
  "جهانی",
  "عاطفی",
  "اداری",
  "همه جانبه",
  "شگفت آور",
  "درخشان",
  "مطلق",
  "الکترونیکی",
  "الکتریکی",
  "اسپانیایی",
  "ادبی",
  "شیمیایی",
  "اصل",
  "هیجان انگیز",
  "پیشرفته",
  "مفرط",
  "کلاسیک",
  "متمایز",
  "دیوانه",
  "معلول",
  "استوار",
  "پایدار",
  "مشروطه",
  "در حال توسعه",
  "راهبردی",
  "مقدس",
  "غالب",
  "نظری",
  "بی نظیر",
  "بالینی",
  "صادق",
  "چشمگیر",
  "جلگه",
  "قابل رویت",
  "دقیق",
  "غیر صمیمی",
  "یونانی",
  "بغرنج",
  "موسیقی",
  "شکسته شده",
  "پولی",
  "بیکار",
  "اجتناب ناپذیر",
  "سپاسگزار",
  "ساختاری",
  "کر",
  "کور",
  "خارج از کشور",
  "حق",
  "گاه به گاه",
  "مشهود",
  "مستاصل",
  "همکار",
  "پر فکر",
  "خلاق",
  "گمشده",
  "قرون وسطایی",
  "باهوش",
  "متقاعد",
  "قضایی",
  "خام",
  "خواب",
  "آسیب پذیر",
  "غیر مجاز",
  "بیرونی",
  "انقلابی",
  "استرالیایی",
  "بومی",
  "امپراتوری",
  "دوستانه و غیر رسمی",
  "قابل انعطاف",
  "جمعی",
  "تجربی",
  "معنوی",
  "سخاوتمندانه",
  "ناکافی",
  "برجسته",
  "منطقی",
  "لخت",
  "فروتن",
  "هلندی",
  "حاد",
  "معتبر",
  "هفتگی",
  "اتوماتیک",
  "قابل اعتماد",
  "متقابل",
  "باردار",
  "لاتین",
  "همسان",
  "رضایتبخش",
  "حاشیه ای",
  "انتخابی",
  "بحث برانگیز",
  "ارگانیک. آلی",
  "آماری",
  "مطلوب",
  "بی گناه",
  "بهبود یافته",
  "انحصاری",
  "علامت گذاری شده",
  "با تجربه",
  "غیر منتظره",
  "ناامید",
  "معده",
  "رومانتیک",
  "برهنه",
  "بی میل",
  "باشکوه",
  "ایجاد",
  "بسته",
  "نا معلوم",
  "ساختگی",
  "دیپلماتیک",
  "دریایی",
  "مکانیکی",
  "سازمانی",
  "مخلوط",
  "بیولوژیکی",
  "شناخته شده",
  "عملکردی",
  "راست",
  "برتر",
  "دیجیتال",
  "ناراضی",
  "غیر منصفانه",
  "خشونت آمیز",
  "یدکی",
  "دردناک",
  "چکیده",
  "آسیایی",
  "ماهانه",
  "صریح",
  "زننده",
  "رنگی",
  "واقع بین",
  "نجیب",
  "غیر متمرکز",
  "غیر ضروری",
  "پرواز",
  "تصادفی",
  "موثر",
  "کدر",
  "ژنتیکی",
  "شیک",
  "غول",
  "پایین",
  "ماهر",
  "نامحسوس",
  "ظریف",
  "کمتر",
  "موازی",
  "متمرکز",
  "گرمسیری",
  "جزئي",
  "دستیار",
  "ترقی خواه",
  "استثنایی",
  "یکپارچه",
  "ترکیب شده",
  "خوش قیافه",
  "مزمن",
  "اجباری",
  "مجبور",
  "ناگوار",
  "ایدئولوژیک",
  "اطراف",
  "صلح آمیز",
  "نخستین",
  "عملیاتی",
  "فناوری",
  "مشاوره",
  "خصومت آمیز",
  "گرانبها",
  "هوشمندانه",
  "بی پایان",
  "جدا شده",
  "مست",
  "جغرافیایی",
  "پویا",
  "حوصله سر بر",
  "مایه تاسف",
  "قطعی",
  "فوق العاده",
  "غیر مستقیم",
  "سفت",
  "خنثی",
  "هنری",
  "محتوا",
  "بالغ",
  "استعماری",
  "جاه طلب",
  "مغناطیسی",
  "کلامی",
  "مشروع",
  "همدل",
  "مبهم",
  "اضافه",
  "بهت زده",
  "واجد شرایط",
  "غایب",
  "لهستانی",
  "اسرائیلی",
  "توسعه یافته",
  "نماینده",
  "ساحلی",
  "تمدید شده",
  "کانادایی",
  "جسورانه",
  "متناظر",
  "متفقین",
  "مقایسه ای",
  "حفاظت",
  "سازنده",
  "سودمند",
  "سیار",
  "ترکی",
  "نارنجی",
  "منفعل",
  "مشکوک",
  "غافلگیر کننده",
  "کشنده",
  "نمادین",
  "ثبت شده",
  "همسایه",
  "غیر مرتبط",
  "صبور",
  "سودآور",
  "رقیب",
  "وفادار",
  "در حد متوسط",
  "متغیر",
  "مدیریتی",
  "مولکولی",
  "المپیک",
  "خطی",
  "آینده نگر",
  "چاپ شده",
  "عصبانی",
  "بلا استفاده",
  "ذاتی",
  "فلسفی",
  "بیدار",
  "امیدبخش",
  "ناخوشایند",
  "متنوع",
  "پنهان",
  "شایسته",
  "حد واسط",
  "محافظت کننده",
  "خوشبخت",
  "دفاعی",
  "الهی",
  "نامرئی",
  "گمراه کننده",
  "ریاضی",
  "نامناسب",
  "مایع",
  "خورشیدی",
  "معماری",
  "باورنکردنی",
  "فداکار",
  "تراژیک",
  "قابل احترام",
  "خوش بینانه",
  "قانع کننده",
  "غیر قابل قبول",
  "قاطع",
  "لایق",
  "فضایی",
  "الزام آور",
  "پرستاری",
  "سمی",
  "زائد",
  "احتمالی",
  "آماتور",
  "عاشق",
  "سرزمینی",
  "افقی",
  "شناختی",
  "تنظیمی",
  "بدبخت",
  "ساکن",
  "با ادب",
  "ترسیده",
  "گوتیک",
  "غیرنظامی",
  "کره ای",
  "ناخودآگاه",
  "ناشناس",
  "ارتدوکس",
  "ایستا",
  "غافل",
  "هزینه بر",
  "سازگار",
  "کوچولو",
  "ضمنی",
  "دوگانه",
  "رو به جلو",
  "احتیاط",
  "نوجوان",
  "در حال مرگ",
  "فاجعه بار",
  "محرمانه",
  "زیرزمینی",
  "خود مختار",
  "اتمی",
  "منجمد",
  "رنگارنگ",
  "مجروح",
  "کم رو",
  "رمان",
  "متعادل",
  "خودسرانه",
  "همجوار",
  "نگران کننده",
  "متحرک",
  "تکاملی",
  "صمیمی",
  "ورزشی",
  "انضباطی",
  "تدریجی",
  "متهم",
  "بازنشسته",
  "شرم آور",
  "ارجح",
  "مخوف",
  "تخیلی",
  "پذیرفته شده",
  "متحیر",
  "آفتابی",
  "خود جوش",
  "بی ادب",
  "وزارتی",
  "خلاقانه",
  "کنترل شده",
  "مفهومی",
  "معنی دار",
  "مغز",
  "شکستنی",
  "کنجکاو",
  "شکننده",
  "خواب آلود",
  "بی علاقه",
  "سرگردان",
  "شایستگی",
  "ابری",
  "شلوغ",
  "تفننی",
  "فریبنده",
  "درخشنده",
  "برازنده",
  "خانگی",
  "مه آلود",
  "بی حرکت",
  "گل آلود",
  "براق",
  "دودی",
  "بی عیب",
  "طوفانی",
  "زشت",
  "بهتر",
  "دست و پا چلفتی",
  "سرگیجه",
  "نحیف",
  "بد خلق",
  "خارش‌دار",
  "پریشانی",
  "تنبل",
  "ارغوانی",
  "خوشگل",
  "فضول",
  "مغذی",
  "برشته شده",
  "خسیس",
  "راه راه",
  "لکه دار",
  "تارت",
  "برنزه",
  "آزموده",
  "بی فایده",
  "لذیذ",
];

/**
 * deterministically create adjective + animal names
 */
export default function (seed: string) {
  if (!seed) {
    throw new Error("No seed provided");
  }
  const uint8array = new TextEncoder().encode(seed);

  const hash = sha256(uint8array); // Uint8Array
  const adjective = adjectives[hash[0] % adjectives.length];
  const animal = animals[hash[1] % animals.length];
  return `${animal} ${adjective}`;
}
