<template>
  <div class="min-h-screen bg-ink font-sans antialiased">
    <a
      href="#hero"
      class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
    >
      Skip to content
    </a>
    <TheNavbar />
    <main>
      <slot />
    </main>
    <TheFooter />
  </div>
</template>
