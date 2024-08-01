<script setup lang="ts">
const { currentTicket, currentChat } = useSupport();
const { certs } = useUser();
const { decryptMessage } = useMessages();

// onUpdated(() => {
//   if (supportTimeLine?.value?.length > 0 && conversation?.value) {
//     conversation.value.scrollTop = conversation?.value?.scrollHeight - 20;
//   }
// });
</script>
<template>
  <div class="flex bg-white flex-col-reverse h-full">
    <div
      ref="conversation"
      class="w-full px-4 overflow-x-auto flex flex-col-reverse pb-5"
    >
      <div
        v-for="message in currentChat"
        :key="message?.id"
        class="w-full flex mt-4 last:bg-red"
        :class="!message?.selfAuthored ? 'justify-start' : 'justify-end'"
      >
        <div class="w-full">
          <div
            class="flex items-center justify-between relative"
            :class="!message?.selfAuthored ? 'flex-row' : 'flex-row-reverse'"
          >
            <p
              class="font-semibold text-sm text-slate-600"
              :class="
                !message?.selfAuthored
                  ? 'justify-start mr-3 '
                  : 'justify-end ml-3'
              "
            >
              <span class="text-slate-400 text-xs">
                {{ eventFormatTimeAgo(message?.created_at) }}
              </span>
            </p>
            <div class="flex items-center">
              <h3
                v-if="message.pubkey === certs.pub"
                class="text-sm text-gray-500"
              >
                شما
              </h3>
              <h3 v-else class="text-sm text-gray-500">
                {{ currentTicket?.topic }}
              </h3>
              <span>
                {{ message.seen ? "Send" : "Sending" }}
              </span>
            </div>

            <span
              class="absolute top-4 left-0 w-5 mr-2 text-[15px] flex"
              :class="message?.send ? 'text-green-500' : 'text-gray-400'"
            >
              <UIcon
                v-if="message?.send"
                name="i-heroicons-check />
               <UIcon name="
                i-heroicons-check
                class="-mr-3"
              />
            </span>
          </div>

          <div
            class="mt-3 w-full p-4 message-body relative"
            :class="[
              message?.selfAuthored
                ? 'bg-gray-200 border-brown border-r-4 rounded-tl-xl rounded-bl-xl'
                : 'bg-brown-100 border-brown border-l-4  rounded-tr-xl rounded-br-xl',
            ]"
          >
            <p class="text-md break-words">
              {{ decryptMessage(message.content) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- !isRTL(message?.rawMessage) ? 'ltr' : 'rtl', -->
