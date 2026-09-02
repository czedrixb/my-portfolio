<template>
  <!-- Decorative drifting colour wash. Scoped to the section it sits in and
       faded out well before the section's edges, so it never meets an opaque
       neighbour (a wave fill, the navbar) at a hard line. -->
  <div
    class="fx-layer fx-mask-soft pointer-events-none absolute inset-0 overflow-hidden"
    aria-hidden="true"
  >
    <template v-if="variant === 'hero'">
      <div
        class="fx-blob fx-blob-a left-[-12%] top-[-6%] h-[26rem] w-[26rem] bg-[radial-gradient(circle,rgba(254,219,11,0.42)_0%,rgba(254,219,11,0)_70%)] md:h-[34rem] md:w-[34rem]"
      ></div>
      <div
        class="fx-blob fx-blob-b right-[-14%] top-[8%] h-[24rem] w-[24rem] bg-[radial-gradient(circle,rgba(255,214,165,0.45)_0%,rgba(255,214,165,0)_70%)] md:h-[32rem] md:w-[32rem]"
      ></div>
    </template>

    <template v-else>
      <div
        class="fx-blob fx-blob-c bottom-[-8%] left-[8%] h-[22rem] w-[22rem] bg-[radial-gradient(circle,rgba(156,146,172,0.3)_0%,rgba(156,146,172,0)_70%)] md:h-[30rem] md:w-[30rem]"
      ></div>
      <div
        class="fx-blob fx-blob-a right-[-12%] top-[12%] h-[24rem] w-[24rem] bg-[radial-gradient(circle,rgba(254,219,11,0.3)_0%,rgba(254,219,11,0)_70%)] md:h-[32rem] md:w-[32rem]"
      ></div>
    </template>
  </div>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: "hero",
    validator: (value) => ["hero", "projects"].includes(value),
  },
});
</script>
