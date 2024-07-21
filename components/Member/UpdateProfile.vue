<script setup lang="ts">
const submitting = ref(false);
const isOpen = ref(false);

const Update = async () => {
  // try {
  //     submitting.value = true
  //     const body: any = await $fetch('/api/members/webauth-active', {
  //         method: 'post',
  //         body: { username: 'test', displayName: 'test' }
  //     })
  //     const publicKey = await Structured.fromJSON(body);
  //     console.log('public key: ', publicKey)
  //     await handleResponse(publicKey);
  //     submitting.value = false
  // } catch (error) {
  //     console.log(error)
  //     submitting.value = false
  // }
};
</script>

<template>
  <div>
    <UButton
      label="تنظیمات حساب"
      size="md"
      @click="isOpen = true"
      color="primary"
      variant="ghost"
    />

    <UModal v-model="isOpen">
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <h4 class="text-xl">تنظیمات حساب</h4>
        </template>
        <div class="min-h-[20rem]">
          <!-- <UPlaceholder /> -->
        </div>

        <template #footer>
          <div class="flex justify-start space-x-3">
            <UButton label="Update" size="md" @click="Update" />
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>
