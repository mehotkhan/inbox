<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
const { profile } = useUser();

const toast = useToast();
const submitting = ref(false);
const isOpen = ref(false);

const schema = z.object({
  username: z.string().min(3, "Must be at least 3 characters"),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  username: undefined,
});

const Register = async (event: FormSubmitEvent<Schema>) => {
  try {
    submitting.value = true;
    const body: any = await $fetch("/api/members/webauth-enable", {
      method: "post",
      body: {
        username: event.data.username,
        displayName: profile.value.displayName,
      },
    });
    const publicKey = await Structured.fromJSON(body);
    console.log("public key: ", publicKey);

    await handleResponse(publicKey);

    toast.add({
      title: "ok",
      description: "Register successfully",
    });

    submitting.value = false;
  } catch (error) {
    console.log(error);
    submitting.value = false;
  }
};

// const Login = async (username: string) => {
//   try {
//     submitting.value = true;
//     const body: any = await useApi("/api/members/login", {
//       method: "post",
//       body: { username: "test" },
//     });
//     const publicKey = await Structured.fromJSON(body);
//     console.log("public key: ", publicKey);

//     await handleResponse(publicKey);

//     submitting.value = false;
//   } catch (error) {
//     console.log(error);
//     submitting.value = false;
//   }
// };

const handleResponse = async (publicKey: any) => {
  if (publicKey) {
    const cred =
      "attestation" in publicKey
        ? await navigator.credentials.create({ publicKey })
        : await navigator.credentials.get({ publicKey });
    const crdBody = await Structured.toJSON(credToJSON(cred));
    console.log("cred : ", crdBody);
    const response: any = await useApi("/api/members/webauth-response", {
      method: "post",
      body: crdBody,
    });
    console.log("response : ", response);
  }
};
</script>

<template>
  <div>
    <UButton
      label="فعال سازی حساب"
      size="md"
      color="primary"
      variant="ghost"
      @click="isOpen = true"
    />

    <UModal v-model="isOpen">
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <UForm
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit="Register"
        >
          <UFormGroup label="User Name" name="username">
            <UInput
              v-model="state.username"
              placeholder="write your username"
            />
          </UFormGroup>
          <template #header>
            <h4 class="text-xl">Webauth</h4>
          </template>
          <div class="min-h-[20rem]">
            <MemberWebauthTips />
          </div>

          <div class="flex justify-start space-x-3">
            <UButton
              type="submit"
              label="Enable WebAuth"
              size="xl"
              :loading="submitting"
              color="primary"
              variant="ghost"
              @click="Register()"
            />
          </div>
        </UForm>
      </UCard>
    </UModal>
  </div>
</template>
