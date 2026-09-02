<template>
  <span
    class="inline-flex items-center rounded-full border border-black/10 bg-white/70 px-2.5 py-1 font-mono text-[11px] leading-none tracking-tight text-black/70 transition-colors duration-200 hover:border-black/30 hover:bg-white hover:text-black"
  >
    {{ label }}
  </span>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
});
</script>
