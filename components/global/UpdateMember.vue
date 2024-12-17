<script setup lang="ts">
import { z } from "zod";

import type { FormSubmitEvent } from "#ui/types";
const { user, fetch: fetchSession }: any = useUserSession();

const { t } = useI18n();

const toast = useToast();
const submitting = ref(false);
const props = defineProps({
  isOpen: { type: Boolean, required: true },
});
const emit = defineEmits(["update:isOpen"]);

const modelIsOpen = computed({
  get: () => props.isOpen,
  set: (value: boolean) => emit("update:isOpen", value),
});

// Validation schema
const schema = z.object({
  firstName: z.string().min(3, t("Must be at least 3 characters")),
  lastName: z.string().min(3, t("Must be at least 3 characters")),
  about: z.string().min(3, t("Must be at least 3 characters")),
});

type Schema = z.output<typeof schema>;

const state = reactive<Schema>({
  firstName:user? user?.value?.firstName :'',
  lastName: user?user?.value?.lastName:'',
  about: user? user?.value?.about : '',
});

// Handle form submission
const updateProfile = async (event: FormSubmitEvent<Schema>) => {
  submitting.value = true;

  try {
    await $fetch("/api/member/update-profile", {
      method: "PUT",
      body: JSON.stringify(event.data),
    });
    await fetchSession();
    submitting.value = false;
    modelIsOpen.value = false;

    toast.add({
      title: t("Success"),
      description: t("Profile updated successfully"),
      color: "green",
    });

    // Optionally refresh the page or update the session
    // window.location.reload();
  } catch (error: any) {
    submitting.value = false;

    toast.add({
      title: t("Error"),
      description: error.data?.message || error.message,
      color: "red",
    });
  }
};
</script>

<template>
  <UModal v-model:open="modelIsOpen">
    <template #content>
      <UForm ref="form" :schema="schema" :state="state" @submit="updateProfile">
        <UCard
          :ui="{
            body: { base: 'min-h-[20rem]' },
            divide: 'divide-y divide-gray-100 dark:divide-gray-800',
          }"
        >
          <template #header>
            <h4 class="text-xl">{{ $t("Update Your Profile Information") }}</h4>
          </template>
          <div class="flex flex-col gap-5">
            <div class="flex gap-3">
              <UFormField
                :label="$t('First Name')"
                name="firstName"
                class="basis-1/2"
              >
                <UInput
                  v-model="state.firstName"
                  :placeholder="$t('Your First Name')"
                  class="w-full"
                />
              </UFormField>
              <UFormField
                :label="$t('Last Name')"
                name="lastName"
                class="basis-1/2"
              >
                <UInput
                  v-model="state.lastName"
                  :placeholder="$t('Your Last Name')"
                  class="w-full"
                />
              </UFormField>
            </div>
            <UFormField :label="$t('About')" name="about">
              <UTextarea
                v-model="state.about"
                class="w-full"
                :placeholder="$t('Ex: Developer Lead')"
              />
            </UFormField>
          </div>
          <template #footer>
            <UButton
              block
              variant="outline"
              type="submit"
              :label="$t('Update Profile')"
              size="xl"
              :loading="submitting"
              color="primary"
            />
          </template>
        </UCard>
      </UForm>
    </template>
  </UModal>
</template>
