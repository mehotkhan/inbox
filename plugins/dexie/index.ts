import dexieDb from "./models";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      dexieDb,
    },
  };
});
