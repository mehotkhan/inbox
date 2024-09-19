<script setup lang="ts">
const { profile } = useUser();
const { isDev } = useOwner();
</script>

<template>
  <div
    class="flex flex-col-reverse md:flex-row justify-between h-screen-sm pb-10"
  >
    <div class="basis-2/2 md:basis-3/5 flex flex-col justify-between w-full">
      <div>
        <h2 class="">صبح بخیر :)</h2>
        <h3 class="">امروز دوشنبه ۱۵ مرداد ۱۴۰۳</h3>
      </div>
      <div>
        <p>۱ پیام جدید، ۵ فروش جدید، ۳ دیدگاه جدید</p>
      </div>
    </div>
    <div class="basis-2/2 md:basis-2/5 h-full">
      <CalendarWeek />
    </div>
  </div>
</template>
