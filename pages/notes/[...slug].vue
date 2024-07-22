<script setup lang="ts"></script>
<template>
  <main>
    <ContentDoc>
      <template #default="{ doc }">
        <section
          class="flex flex-col node-page"
          :class="doc?.dir === 'ltr' ? 'ltr' : 'rtl'"
        >
          <LazyPageIntro :data="doc" />

          <div class="flex">
            <div class="basis-8/12 pl-4">
              <ContentRenderer :value="doc" class="content mb-10" />
              <LazyComments />
            </div>

            <div class="basis-4/12 pr-4">
              <div class="sticky top-10 right-10 w-full flex justify-end">
                <LazySidebar :post="doc" />
              </div>
            </div>
          </div>
        </section>
      </template>
    </ContentDoc>
  </main>
</template>
<style lang="scss">
.content {
  h1,
  h2,
  h3,
  h4 {
    scroll-margin-top: 7rem;
  }
}
</style>
