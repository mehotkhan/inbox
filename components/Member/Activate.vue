<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
const { t } = useI18n();
const { profile } = useUser();

const toast = useToast();
const submitting = ref(false);
const isOpen = ref(true);

const schema = z.object({
  firstName: z.string().min(3, t("Must be at least 3 characters")),
  lastName: z.string().min(3, t("Must be at least 3 characters")),
  about: z.string().min(3, t("Must be at least 3 characters")),
  displayName: z.string().min(3, t("Must be at least 3 characters")),
  email: z.string().email(5, t("Must be at least 3 characters")),
  username: z.string().min(3, t("Must be at least 3 characters")),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  firstName: profile.value.firstName,
  lastName: profile.value.lastName,
  about: profile.value.about,
  displayName: profile.value.displayName,
  email: profile.value.email,
  username: profile.value.username,
});

const profileActivate = async (event: FormSubmitEvent<Schema>) => {
  console.log(event.data);
  try {
    submitting.value = true;
    const body = await $fetch("/api/members/webauth-enable", {
      method: "post",
      body: {
        username: event.data.username,
        displayName: profile.value.displayName,
      },
    });
    const publicKey = await body.toJSON();
    console.log("public key: ", publicKey);

    await handleResponse(publicKey);

    toast.add({
      title: "ok",
      description: t("User Activation Successfully"),
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
                :label="$t('username')"
                name="username"
                class="basis-1/2"
              >
                <UInput
                  v-model="state.username"
                  :placeholder="$t('usernamePlaceHolder')"
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
