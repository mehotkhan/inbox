<script setup>
const items = [
  {
    slot: "text",
    label: "Text",
  },
  // {
  //     slot: 'deepai',
  //     label: 'Deep Ai'

  // },
  {
    slot: "imagine",
    label: "Imagine",
  },
  {
    slot: "voice",
    label: "Voice (Alpha)",
    disabled: true,
  },
];
</script>

<template>
  <UTabs :items="items" class="w-full">
    <template #text="{ item }">
      <AITextInput />
    </template>

    <template #imagine="{ item }">
      <AIImagineScene />
    </template>
    <!-- <template #deepai="{ item }">
            <DeepAi />
        </template> -->

    <template #voice="{ item }">
      <AiVoiceInput />
    </template>
  </UTabs>
</template>
