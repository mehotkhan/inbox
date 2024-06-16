<template>
  <UCard class="text-center py-4 space-x-4">
    <tapir-widget
      class="p-10 b-1 shadow-sm max-w-2xl"
      :time="2"
      backend-endpoint="https://your-endpoint.com/.netlify/functions/audio-message"
      button-color="green"
    />
  </UCard>
</template>

<script>
import TapirWidget from "vue-audio-tapir";
export default {
  name: "App",
  components: {
    TapirWidget,
  },
};
</script>
<style></style>
