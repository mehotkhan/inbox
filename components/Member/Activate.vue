<script setup lang="ts">
import { z } from "zod";
// import { startRegistration } from "@simplewebauthn/browser";
import type { FormSubmitEvent } from "#ui/types";
const { t } = useI18n();
const { profile, certs, login } = useUser();

const toast = useToast();
const submitting = ref(false);
const isOpen = ref(false);
const form = ref();

const schema = z.object({
  firstName: z.string().min(3, t("Must be at least 3 characters")),
  lastName: z.string().min(3, t("Must be at least 3 characters")),
  about: z.string().min(3, t("Must be at least 3 characters")),
  displayName: z.string().min(3, t("Must be at least 3 characters")),
  email: z.string().email(5, t("Must be at least 5 characters")),
  userName: z.string().min(3, t("Must be at least 3 characters")),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  firstName: profile.value.firstName,
  lastName: profile.value.lastName,
  about: profile.value.about,
  displayName: profile.value.displayName,
  email: profile.value.email,
  userName: profile.value.userName,
});

// Start WebAuthn registration and handle form submission
const profileActivate = async (event: FormSubmitEvent<Schema>) => {
  try {
    submitting.value = true;

    // Fetch registration options from the server
    // const data = await singedApi("/serverless-api/members/webauth-activate", {
    //   method: "post",
    //   body: {
    //     userName: event.data.userName,
    //     displayName: event.data.displayName,
    //     pubKey: certs.value.pub,
    //   },
    // });

    // Start WebAuthn registration using updated object-based argument
    // const attResp = await startRegistration({
    //   optionsJSON: data, // Pass options inside an object as per v11 changes
    // });

    // Handle the WebAuthn response
    // const userAuth = await handleResponse(attResp, event.data);

    // login(userAuth); // Update user state after successful activation
    submitting.value = false;
    isOpen.value = false; // Close the modal
    toast.add({
      title: t("ok"),
      description: t("User Activation Successfully"),
    });
  } catch (error) {
    console.error(error);
    toast.add({
      color: "red",
      title: t("error"),
      description: t("WebAuthn activation failed"),
    });
    submitting.value = false;
  }
};

// Handle the response from WebAuthn and submit it to the server
const handleResponse = async (attResp, formData) => {
  try {
    const data = await singedApi(
      "/serverless-api/members/webauth-activation-response",
      {
        method: "post",
        body: {
          attResp, // WebAuthn attestation response
          formData, // Form data (user details)
          userPub: certs.value.pub,
          userPriv: certs.value.priv,
        },
      }
    );
    return JSON.parse(data);
  } catch (error) {
    console.error("Failed to handle WebAuthn response", error);
  }
};
</script>

<template>
  <div>
    <UButton
      :label="$t('Activation Profile')"
      size="md"
      color="primary"
      variant="ghost"
      @click="isOpen = true"
    />

    <UModal v-model="isOpen">
      <UForm
        ref="form"
        :schema="schema"
        :state="state"
        @submit="profileActivate"
      >
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
            <h4 class="text-xl">{{ $t("ActiveProfile") }}</h4>
          </template>
          <div class="flex flex-col gap-4">
            <USeparator :label="$t('publicDetails')" />

            <div class="flex gap-3">
              <UFormField
                :label="$t('firstName')"
                name="firstName"
                class="basis-1/2"
              >
                <UInput
                  v-model="state.firstName"
                  :placeholder="$t('firstNamePlaceHolder')"
                />
              </UFormField>
              <UFormField
                :label="$t('lastName')"
                name="lastName"
                class="basis-1/2"
              >
                <UInput
                  v-model="state.lastName"
                  :placeholder="$t('lastNamePlaceHolder')"
                />
              </UFormField>
            </div>

            <UFormField
              :label="$t('displayName')"
              name="displayName"
              class="basis-2/2"
            >
              <UInput
                v-model="state.displayName"
                :placeholder="$t('displayNamePlaceHolder')"
              />
            </UFormField>
            <UFormField :label="$t('about')" name="about" class="basis-2/2">
              <UTextarea v-model="state.about" />
            </UFormField>
            <USeparator :label="$t('uniqueDetails')" />

            <div class="flex gap-3">
              <UFormField :label="$t('email')" name="email" class="basis-1/2">
                <UInput
                  v-model="state.email"
                  :placeholder="$t('emailPlaceHolder')"
                />
              </UFormField>
              <UFormField
                :label="$t('userName')"
                name="userName"
                class="basis-1/2"
              >
                <UInput
                  v-model="state.userName"
                  :placeholder="$t('userNamePlaceHolder')"
                />
              </UFormField>
            </div>
          </div>
          <template #footer>
            <div class="flex w-full justify-between">
              <UButton
                variant="outline"
                :label="$t('Clear')"
                size="xl"
                class="ml-2"
                @click="form.clear()"
              />

              <UButton
                variant="outline"
                type="submit"
                :label="$t('Active Profile')"
                size="xl"
                :loading="submitting"
                color="primary"
              />
            </div>
          </template>
        </UCard>
      </UForm>
    </UModal>
  </div>
</template>
