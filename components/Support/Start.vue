<script lang="ts" setup>
const {
  changeView,
  modalMode,
  modalBoxIsOpen,
  viewTitle,
  currentTicket,
  expanded,
  expandView,
} = useSupport();

// const { supportLists, getSupportLists } = useManage()

function closeModal() {
  modalBoxIsOpen.value = false;
}

function toggleModal() {
  modalBoxIsOpen.value = !modalBoxIsOpen.value;
}
// const cleanedSupportLists: any = computed(() => [
//   ...new Set(supportLists?.value?.map((item: any) => item.pub)),
// ])
// onMounted(() => {
//   getSupportLists()
// })
</script>

<template>
  <div>
    <UButton
      class="fixed left-2 bottom-2 shadow-md rounded-full cursor-pointer text-4xl z-20 support-button p-3 transition-all text-black bg-gray-200 dark:bg-slate-700 border-2 border-gray-300 dark:border-slate-800"
      @click="toggleModal"
    >
      <UIcon v-if="!modalBoxIsOpen" name="i-heroicons-chat-bubble-left-right" />
      <UIcon v-else name="i-heroicons-chevron-double-down" />
    </UButton>
    <UCard
      v-if="modalBoxIsOpen"
      :ui="{
        body: {
          base: 'h-full border-0 overflow-hidden bg-gray-100',
          padding: 'p-0 sm:p-0',
        },
        rounded: 'rounded-xl md:rounded-xl',
        divide: 'divide-0',
        ring: 'ring-1',
        header: {
          base: 'z-10 h-30 relative',
          background: 'bg-gray-300 h-30',
          padding: 'px-5 pt-4 pb-2',
        },
        footer: {
          base: 'absolute bottom-0 w-full grid w-full grid-cols-3  items-center border-t-2 border-gray-100 ',
          background: 'bg-gray-100',
          padding: 'px-0 py-3',
        },
      }"
      :class="
        expanded
          ? 'md:w-[60%] md:h-[97%] md:left-4 md:bottom-[1rem]'
          : 'md:w-[23%] md:h-[80%] md:left-4 md:bottom-[4.5rem]'
      "
      class="fixed z-40 left-0 bottom-0 h-full w-full transition-all shadow-2xl border-0 overflow-hidden"
    >
      <div class="absolute h-[40rem] top-0 w-full z-0" />
      <template #header>
        <div
          class="flex justify-between items-center w-full z-10 relative text-black"
        >
          <div class="flex items-center">
            <UTooltip v-if="modalMode === 'chat'" text="پیام ها">
              <UIcon
                name="i-heroicons-chevron-double-right"
                class="z-10 text-2xl text-black cursor-pointer"
                @click="changeView('chats')"
              />
            </UTooltip>

            <UTooltip v-if="modalMode === 'home'" text="بستن">
              <UIcon
                name="i-heroicons-chevron-double-down"
                class="text-xl text-black cursor-pointer"
                aria-hidden="true"
                @click="toggleModal()"
              />
            </UTooltip>

            <div
              v-if="modalMode !== 'home' && modalMode !== 'chat'"
              class="text-xl flex text-black z-10 w-full font-bold mr-3"
            >
              {{ viewTitle }}
            </div>

            <span
              v-if="modalMode === 'chat'"
              class="text-md flex text-black z-10 w-full font-bold items-center gap-3 mr-2"
            >
              <UAvatar
                chip-color="primary"
                chip-text=""
                chip-position="top-right"
                size="sm"
                src="https://avatars.githubusercontent.com/u/739984?v=4"
                alt="Avatar"
              />
              <span> username </span>

              <div v-if="modalMode === 'chat'" class="flex items-center">
                <div class="flex gap-2">
                  <UBadge
                    size="xs"
                    :label="currentTicket?.topic"
                    color="gray"
                  />
                  <!-- <UBadge
                  size="xs"
                  :label="
                    ticketStatus.find(
                      (item: any) => item.id === currentTicket?.status
                    )?.label
                  "
                  color="gray"
                /> -->
                </div>
              </div>
            </span>
          </div>

          <div class="flex items-center gap-1">
            <div class="flex items-center">
              <UTooltip v-if="!expanded" text="بزرگ‌نمایی">
                <UIcon
                  name="i-heroicons-arrows-pointing-out"
                  class="text-md text-black cursor-pointer"
                  aria-hidden="true"
                  @click="expandView()"
                />
              </UTooltip>
              <UTooltip v-else text="کوچک‌نمایی">
                <UIcon
                  name="i-heroicons-arrows-pointing-in"
                  class="text-md text-black cursor-pointer"
                  aria-hidden="true"
                  @click="expandView()"
                />
              </UTooltip>
            </div>

            <UTooltip v-if="modalMode !== 'home'" text="بستن">
              <UIcon
                name="i-heroicons-chevron-double-down"
                class="text-2xl text-black cursor-pointer"
                aria-hidden="true"
                @click="toggleModal()"
              />
            </UTooltip>
          </div>
        </div>
      </template>

      <div class="absolute w-full top-[4rem] bottom-[4rem]">
        <SupportConversation
          v-if="modalMode === 'chat'"
          @close-modal="closeModal"
        />

        <SupportChats
          v-if="modalMode === 'chats'"
          class=" "
          @close-modal="closeModal"
        />
        <SupportHome v-if="modalMode === 'home'" @close-modal="closeModal" />
        <!-- <SupportSocial
          v-if="modalMode === 'social'"
          @close-modal="closeModal"
        /> -->
      </div>

      <template v-if="modalMode !== 'chat'" #footer>
        <div
          class="cursor-pointer flex flex-col item-center justify-center text-center"
          @click="changeView('home')"
        >
          <div :class="modalMode === 'home' ? 'text-black' : 'text-gray-600'">
            <UIcon
              name="i-heroicons-home-alt"
              class="w-full text-xl"
              aria-hidden="true"
            />
            <div class="pt-1 text-md">خانه</div>
          </div>
        </div>

        <div
          class="cursor-pointer flex flex-col item-center justify-center text-center"
          @click="changeView('chats')"
        >
          <div :class="modalMode === 'chats' ? 'text-black' : 'text-gray-600'">
            <UIcon
              name="i-heroicons-envelope-alt"
              class="w-full text-xl"
              aria-hidden="true"
            />
            <div class="pt-1 text-md">پیام</div>
          </div>
        </div>

        <div
          class="cursor-pointer flex flex-col item-center justify-center text-center"
          @click="changeView('social')"
        >
          <div :class="modalMode === 'social' ? 'text-black' : 'text-gray-600'">
            <UIcon
              name="i-heroicons-coffee"
              class="w-full text-xl"
              aria-hidden="true"
            />
            <div class="pt-1 text-md">افراد</div>
          </div>
        </div>
      </template>
      <template v-else #footer>
        <SupportInputForm />
      </template>
    </UCard>
  </div>
</template>

<style scoped>
.support-button {
  line-height: 0;
}
</style>
