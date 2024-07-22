<template>
  <main>
    <ContentDoc>
      <template #default="{ doc }">
        <section class="flex flex-col">
          <LazyPageIntro :data="doc" />

          <h3 class="border-b pb-3">جدیدترین ورودی‌ها</h3>

          <LazyLatestItems :category="doc.title" class="mx-[4rem]" />
        </section>
      </template>
    </ContentDoc>
  </main>
</template>
