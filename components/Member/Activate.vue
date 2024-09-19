<script setup lang="ts">
import { z } from "zod";
import { startRegistration } from "@simplewebauthn/browser";
import type { FormSubmitEvent } from "#ui/types";
const { t } = useI18n();
const { profile, certs } = useUser();

const toast = useToast();
const submitting = ref(false);
const isOpen = ref(true);

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
  email: "test@test.cc",
  userName: "test",
});

// Start WebAuthn registration and handle form submission
const profileActivate = async (event: FormSubmitEvent<Schema>) => {
  try {
    submitting.value = true;

    // Fetch registration options from server
    const options = await $fetch("/api/members/webauth-activate", {
      method: "post",
      body: {
        userName: event.data.userName,
        displayName: event.data.displayName,
        pubKey: profile.value.pub,
      },
    });

    // Start WebAuthn registration
    const attResp = await startRegistration(options);

    // Send the credential data back to the server
    await handleResponse(attResp, event.data);

    toast.add({
      title: t("ok"),
      description: t("User Activation Successfully"),
    });

    submitting.value = false;
    isOpen.value = false;
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
    const response = await $fetch("/api/members/webauth-response", {
      method: "post",
      body: {
        attResp, // WebAuthn attestation response
        formData, // Form data (user details)
        userPub: certs.value.pub,
        userPriv: certs.value.priv,
      },
    });

    console.log("Server response: ", response);
  } catch (error) {
    console.error("Failed to handle WebAuthn response", error);
  }
};
</script>

<template>
  <div>
    <UButton
      :label="$t('ActiveProfile')"
      size="md"
      color="primary"
      variant="ghost"
      @click="isOpen = true"
    />

    <UModal v-model="isOpen">
      <UForm :schema="schema" :state="state" @submit="profileActivate">
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
            <UDivider :label="$t('publicDetails')" />

            <div class="flex gap-3">
              <UFormGroup
                :label="$t('firstName')"
                name="firstName"
                class="basis-1/2"
              >
                <UInput
                  v-model="state.firstName"
                  :placeholder="$t('firstNamePlaceHolder')"
                />
              </UFormGroup>
              <UFormGroup
                :label="$t('lastName')"
                name="lastName"
                class="basis-1/2"
              >
                <UInput
                  v-model="state.lastName"
                  :placeholder="$t('lastNamePlaceHolder')"
                />
              </UFormGroup>
            </div>

            <UFormGroup
              :label="$t('displayName')"
              name="displayName"
              class="basis-2/2"
            >
              <UInput
                v-model="state.displayName"
                :placeholder="$t('displayNamePlaceHolder')"
              />
            </UFormGroup>
            <UFormGroup :label="$t('about')" name="about" class="basis-2/2">
              <UTextarea v-model="state.about" />
            </UFormGroup>
            <UDivider :label="$t('uniqueDetails')" />

            <div class="flex gap-3">
              <UFormGroup :label="$t('email')" name="email" class="basis-1/2">
                <UInput
                  v-model="state.email"
                  :placeholder="$t('emailPlaceHolder')"
                />
              </UFormGroup>
              <UFormGroup
                :label="$t('userName')"
                name="userName"
                class="basis-1/2"
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
                @click="form.clear()"
              />

              <UButton
                variant="outline"
                type="submit"
                :label="$t('ActiveProfileSubmit')"
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
