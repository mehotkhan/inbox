<script setup lang="ts">
// const { $dexieDb } = useNuxtApp();

const props = defineProps({
  pub: { type: String, required: true, default: "" },
});
const userName = ref("نام کاربری");

// onMounted(() => {
//   profileStream(props.pub);
// });

// onMounted(async () => {
//   await $dexieDb?.profiles.get({ pubkey: props.pub }).then((profile: any) => {
//     if (profile) {
//       const json = JSON.parse(profile.content);
//       userName.value = json?.displayName;
//     } else {
//       userName.value = "کاربر مهمان";
//     }
//   });
// });
</script>

<template>
  <span class="">{{ userName }} </span>
</template>
