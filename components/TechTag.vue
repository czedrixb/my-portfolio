<template>
  <span
    class="inline-flex items-center rounded-full border border-hairline bg-surface px-2.5 py-1 font-mono text-[11px] leading-none tracking-tight text-muted transition-colors duration-200 hover:border-accent/40 hover:text-[#EDEDED]"
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
