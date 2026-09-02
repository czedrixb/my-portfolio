<template>
  <header
    class="sticky top-0 z-50 border-b border-hairline/70 bg-ink/80 backdrop-blur-md"
  >
    <nav
      class="mx-auto flex h-14 max-w-3xl items-center justify-between px-5 lg:max-w-4xl"
      aria-label="Primary"
    >
      <a
        href="#hero"
        class="font-mono text-sm font-bold tracking-tightest text-[#EDEDED] transition-colors hover:text-accent"
      >
        CZ<span class="text-accent">.</span>
      </a>

      <div class="flex items-center gap-1 sm:gap-2">
        <a
          href="#work"
          class="hidden rounded-full px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:text-[#EDEDED] sm:inline-block"
        >
          Experience
        </a>
        <a
          href="#projects"
          class="hidden rounded-full px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:text-[#EDEDED] sm:inline-block"
        >
          Projects
        </a>
        <a
          rel="noopener"
          target="_blank"
          href="/pdf/RESUME-2025-CZEDRIX-BARCENA.pdf"
          class="rounded-full px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:text-[#EDEDED]"
        >
          Resume
        </a>
        <a
          href="mailto:czedrixb@gmail.com"
          class="rounded-full bg-accent px-4 py-1.5 font-mono text-xs font-semibold text-ink transition-opacity hover:opacity-85"
        >
          Hire me
        </a>
      </div>
    </nav>
  </header>
</template>
