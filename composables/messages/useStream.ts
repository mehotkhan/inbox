import { useStorage } from "@vueuse/core";

export const useStream = () => {
  const streamSorting = useStorage("stream-sorting", streamOrder?.[0]);
  const streamTimeLimit = useStorage("stream-time-limit", timeFilter?.[1]);
  const streamLimit = ref(5);

  const getSince = computed(() => {
    return Math.floor(Date.now() / 1000) - streamTimeLimit.value.filter;
  });

  return {
    streamTimeLimit,
    getSince,
    streamSorting,
    streamLimit,
  };
};
