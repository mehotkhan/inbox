<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import { object, string, type InferType } from "yup";
import * as Structured from "@worker-tools/structured-json";
const { profile } = useUser();
const toast = useToast();
const submitting = ref(false);
const isOpen = ref(false);
const state = reactive({
  title: "",
});

const schema = object({
  username: string()
    .min(3, "Must be at least 3 characters")
    .required("Required"),
});
type Schema = InferType<typeof schema>;

const Register = async (event: FormSubmitEvent<Schema>) => {
  try {
    submitting.value = true;
    const body: any = await useApi("/api/members/register", {
      method: "post",
      body: { username: event.data.username, displayName: profile.displayName },
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

const Login = async (username: string) => {
  try {
    submitting.value = true;
    const body: any = await useApi("/api/members/login", {
      method: "post",
      body: { username: "test" },
    });
    const publicKey = await Structured.fromJSON(body);
    console.log("public key: ", publicKey);

    await handleResponse(publicKey);

    submitting.value = false;
  } catch (error) {
    console.log(error);
    submitting.value = false;
  }
};

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
    <UButton label="Webauth" size="md" @click="isOpen = true" />

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
            <UInput v-model="state.title" placeholder="write your username" />
          </UFormGroup>
          <template #header>
            <h4 class="text-xl">Webauth</h4>
          </template>
          <div class="min-h-[20rem]">
            <MemberWebauthTips />
          </div>

          <div class="flex justify-start space-x-3">
            <!-- <UButton label="Enable WebAuth" @click="Register" size="xl" :loading="submitting" /> -->
            <UButton
              label="Login"
              size="xl"
              :loading="submitting"
              @click="Login"
            />
            <UButton type="submit" size="xl" :loading="submitting">
              Register
            </UButton>
          </div>
        </UForm>
      </UCard>
    </UModal>
  </div>
</template>
