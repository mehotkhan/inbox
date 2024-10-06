<script setup lang="ts">
import { z } from "zod";
import { startAuthentication } from "@simplewebauthn/browser";
import type { FormSubmitEvent } from "#ui/types";
const { t } = useI18n();
const { login } = useUser();
const form = ref();

const props = defineProps({
  isOpen: { type: Boolean, required: true },
});
const emit = defineEmits(["update:isOpen"]);

const modelIsOpen = computed({
  get() {
    return props.isOpen;
  },
  set(value: boolean) {
    emit("update:isOpen", value);
  },
});

const toast = useToast();
const submitting = ref(false);

const schema = z.object({
  userName: z.string().min(3, t("Must be at least 3 characters")),
});

type Schema = z.output<typeof schema>;

const state = reactive<Schema>({
  userName: undefined,
});

// Start WebAuthn authentication and handle form submission
const profileSwitch = async (event: FormSubmitEvent<Schema>) => {
  try {
    submitting.value = true;

    // Fetch authentication options from server
    const data = await singedApi("/serverless-api/members/webauth-switch", {
      method: "post",
      body: {
        userName: event.data.userName,
      },
    });

    // Start WebAuthn authentication
    const authResp = await startAuthentication(data);

    // Send the credential data back to the server
    const userAuth = await handleResponse(authResp, event.data.userName);

    login(userAuth); // Update user state after successful login
    submitting.value = false;
    modelIsOpen.value = false; // Close the modal
    toast.add({
      title: t("ok"),
      description: t("User login successfully"),
    });
  } catch (error) {
    console.error(error);
    toast.add({
      color: "red",
      title: t("error"),
      description: t("WebAuthn login failed"),
    });
    submitting.value = false;
  }
};

// Handle the response from WebAuthn and submit it to the server
const handleResponse = async (authResp, userName: string) => {
  try {
    const response = await $fetch(
      "/serverless-api/members/webauth-switch-response",
      {
        method: "post",
        body: {
          authResp, // WebAuthn authentication response
          userName, // Username provided by the user
        },
      }
    );
    return JSON.parse(response);
  } catch (error) {
    console.error("Failed to handle WebAuthn response", error);
    throw error;
  }
};
</script>

<template>
  <UModal v-model="modelIsOpen">
    <UForm ref="form" :schema="schema" :state="state" @submit="profileSwitch">
      <UCard
        :ui="{
          body: {
            base: 'min-h-[20rem]',
          },
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <h4 class="text-xl">{{ $t("SwitchProfile") }}</h4>
        </template>
        <div class="flex flex-col gap-4">
          <div class="flex gap-3">
            <UFormGroup
              :label="$t('userName')"
              name="userName"
              class="basis-full"
            >
              <UInput
                v-model="state.userName"
                :placeholder="$t('userNamePlaceHolder')"
              />
            </UFormGroup>
          </div>
        </div>
        <template #footer>
          <div class="flex w-full justify-between">
            <UButton
              variant="outline"
              :label="$t('Clear')"
              size="xl"
              class="ml-2"
              @click="form.value.clear()"
            />

            <UButton
              variant="outline"
              type="submit"
              :label="$t('SwitchProfileSubmit')"
              size="xl"
              :loading="submitting"
              color="primary"
            />
          </div>
        </template>
      </UCard>
    </UForm>
  </UModal>
</template>
