<template>
  <section id="hero" class="relative overflow-hidden">
    <!-- Decorative background: dot grid + a single accent glow. -->
    <div
      class="bg-dots pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_72%)]"
      aria-hidden="true"
    ></div>
    <div
      class="bg-glow pointer-events-none absolute left-1/2 top-[-14rem] h-[34rem] w-[34rem] -translate-x-1/2"
      aria-hidden="true"
    ></div>

    <div
      class="relative mx-auto max-w-3xl px-5 pb-20 pt-20 md:pb-28 md:pt-28 lg:max-w-4xl"
    >
      <p
        class="mb-8 inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-3 py-1.5 font-mono text-xs text-muted animate-fade-up"
      >
        <span
          class="status-dot h-1.5 w-1.5 rounded-full bg-accent"
          aria-hidden="true"
        ></span>
        Available for work
      </p>

      <h1
        class="mb-6 text-4xl font-bold leading-[1.05] tracking-tightest text-[#EDEDED] animate-fade-up sm:text-5xl md:text-6xl"
        style="animation-delay: 60ms"
      >
        Czedrix Barcena
      </h1>

      <p
        class="mb-10 max-w-xl text-lg leading-relaxed text-muted animate-fade-up md:text-xl"
        style="animation-delay: 120ms"
      >
        Full-stack engineer building production
        <span class="text-[#EDEDED]">web</span>,
        <span class="text-[#EDEDED]">mobile</span> and
        <span class="text-[#EDEDED]">AI</span> products — from the database and
        API through to the interface and the deploy.
      </p>

      <div
        class="mb-14 flex flex-wrap items-center gap-3 animate-fade-up"
        style="animation-delay: 180ms"
      >
        <a
          rel="noopener"
          target="_blank"
          href="/pdf/RESUME-2025-CZEDRIX-BARCENA.pdf"
          class="rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-ink transition-opacity hover:opacity-85"
        >
          View CV
        </a>
        <a
          rel="noopener"
          target="_blank"
          href="https://github.com/czedrixb"
          class="inline-flex items-center gap-1.5 rounded-full border border-hairline px-6 py-2.5 text-sm font-medium text-[#EDEDED] transition-colors hover:border-muted hover:bg-surface"
        >
          GitHub
          <svg
            class="h-3 w-3"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M5 11L11 5M11 5H6M11 5V10" />
          </svg>
        </a>
      </div>

      <div class="animate-fade-up" style="animation-delay: 240ms">
        <div class="rule-fade mb-5" aria-hidden="true"></div>
        <ul
          class="flex flex-wrap items-center gap-x-2 gap-y-2 font-mono text-xs text-muted"
        >
          <li
            v-for="(item, index) in headline"
            :key="item"
            class="flex items-center gap-x-2 whitespace-nowrap"
          >
            {{ item }}
            <span
              v-if="index < headline.length - 1"
              class="text-muted/50"
              aria-hidden="true"
              >·</span
            >
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
const headline = [
  "TypeScript",
  "Laravel",
  "Nuxt",
  "React",
  "Next.js",
  "FastAPI",
  "Kotlin",
  "PostgreSQL",
  "Docker",
  "AWS",
];
</script>
