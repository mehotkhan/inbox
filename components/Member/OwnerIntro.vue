<script setup lang="ts">
import { DateTime } from "luxon";
import { useI18n } from "vue-i18n";
const { locale, t } = useI18n();

function formatDate(inputDate: string) {
  if (locale.value === "fa") {
    return DateTime.fromISO(inputDate)
      .reconfigure({ outputCalendar: "persian" })
      .setLocale("fa")
      .toFormat("cccc dd MMMM yyyy");
  } else {
    return DateTime.fromISO(inputDate)
      .reconfigure({ outputCalendar: "iso8601" })
      .setLocale("en")
      .toFormat("cccc dd MMMM yyyy");
  }
}

function getGreeting() {
  const hour = DateTime.now().setLocale(locale.value).hour;
  if (hour >= 5 && hour < 12) {
    return t("Good morning :)");
  } else if (hour >= 12 && hour < 17) {
    return t("Good afternoon :)");
  } else {
    return t("Good evening :)");
  }
}

const today = DateTime.now().toISO();
const formattedDate = formatDate(today);
const greeting = getGreeting();
</script>

<template>
  <div>
    <div
      class="flex flex-col-reverse md:flex-row justify-between h-screen-sm pb-10"
    >
      <div class="basis-2/2 md:basis-2/5 flex flex-col justify-between w-full">
        <div>
          <h2>{{ greeting }}</h2>
          <h3>{{ $t("Today") }} {{ formattedDate }}</h3>
          <p>
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز،
            و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای
            زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و
            متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان
            رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد
            کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه
            راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل
            حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود
            طراحی اساسا مورد استفاده قرار گیرد.
          </p>
        </div>
      </div>
      <div class="basis-2/2 md:basis-2/5 h-full">
        <CalendarWeek />
      </div>
    </div>
  </div>
</template>
