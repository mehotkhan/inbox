<template>
  <section class="flex flex-col justify-center content-center">
    <ContentDoc path="/pages/contact">
      <template #default="{ doc }">
        <section class="flex flex-col">
          <LazyBasePageIntro :data="doc" />
          <div class="flex relative mx-3 md:m-0 w-full border-t">
            <ContentRenderer :value="doc" />
          </div>
        </section>
      </template>
    </ContentDoc>
  </section>
</template>
