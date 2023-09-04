<script setup lang="ts">
const { createNewDefault } = useContact();
</script>
<template>
  <div class="w-full flex flex-col h-full overflow-x-auto">
    <div class="p-5 flex flex-col justify-start">
      <div class="mb-5">
        <h3 class="text-2xl mb-5 mt-5 font-bold opacity-80">
          سلام، خوش آمدید .
        </h3>
        <h4 class="text-2xl font-bold text-shadow">
          چه کمکی از من بر می یاد ؟
        </h4>
      </div>
      <div
        class="bg-white cursor-pointer rounded-xl w-full p-4 my-0 transition-all shadow-2xl text-sm relative"
        @click="createNewDefault()"
      >
        <div>یک پیام ارسال کنید</div>

        <div class="text-gray-500 mt-2">
          در سریعترین زمان ممکن پاسخ می دیم :)
        </div>
        <div class="absolute left-4 top-0 text-brown h-full flex items-center">
          <IconUil:message class="flex text-xl text-brown" aria-hidden="true" />
        </div>
      </div>
      <br />
      <ContactHelpIntro />
      <ContactContactsIntro />
      <ContactSocialIntro />
    </div>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 17px;
}
::-webkit-scrollbar-track {
  background: transparent;
  border-left: 1px solid transparent;
}
::-webkit-scrollbar-thumb {
  border: 4px solid transparent;
  background-clip: padding-box;
  border-radius: 9999px;
  background-color: white;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #ddd;
}
</style>
