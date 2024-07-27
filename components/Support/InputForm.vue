<script setup lang="ts">
const { sendTicket, currentTicket } = useSupport();

const chatMessage = ref("");

const send = () => {
  sendTicket(chatMessage.value);
  chatMessage.value = "";
};
</script>
<template>
  <div
    :key="currentTicket.id"
    class="w-full px-5 py-3 bg-gray-100 absolute bottom-0"
  >
    <div
      :class="[chatMessage.length && !isRTL(chatMessage) ? 'ltr' : 'rtl']"
      class="min-h-12 flex justify-between items-center border-transparent bg-slate-50 border-0 focus-within:border-slate-300"
    >
      <input
        v-model="chatMessage"
        type="text"
        class="w-full px-3 bg-transparent outline-none placeholder:text-slate-400 border-0 rounded-sm"
        placeholder="پاسختان را بنویسید ..."
        @keyup.enter="send"
        @click="send"
      >
      <div
        class="flex items-center justify-around mr-3 text-gray-500 gap-2 text-xl"
      >
        <UIcon
          name="i-heroicons-paper-airplane"
          class="cursor-pointer"
          aria-hidden="true"
        />
        <UIcon
          v-if="chatMessage.length === 0"
          name="i-heroicons-paper-clip"
          class="text-lg"
          aria-hidden="true"
        />
        <UIcon
          v-if="chatMessage.length === 0"
          name="i-heroicons-photo"
          class="mr-1"
          aria-hidden="true"
        />
      </div>
    </div>
  </div>
</template>
