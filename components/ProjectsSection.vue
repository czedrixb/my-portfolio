<template>
  <section id="projects" class="relative border-t border-hairline/60 bg-ink">
    <div class="mx-auto max-w-3xl px-5 py-20 md:py-28 lg:max-w-4xl">
      <div class="mb-6 flex items-baseline gap-4" data-aos="fade-up">
        <span class="font-mono text-xs text-accent">02</span>
        <h2 class="text-2xl font-bold tracking-tight text-[#EDEDED] md:text-3xl">
          Side projects
        </h2>
      </div>

      <p class="mb-14 max-w-xl leading-relaxed text-muted" data-aos="fade-up">
        Things I build outside of client work, usually to learn a tool properly
        rather than just read about it.
      </p>

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <article
          v-for="(project, index) in projects"
          :key="project.name"
          class="group flex flex-col overflow-hidden rounded-xl border border-hairline bg-surface transition-colors duration-300 hover:border-muted/50"
          data-aos="fade-up"
          :data-aos-delay="(index % 2) * 60"
        >
          <img
            :src="project.image"
            :alt="`${project.name} screenshot`"
            class="aspect-[16/10] w-full border-b border-hairline object-cover"
            loading="lazy"
            decoding="async"
          />

          <div class="flex flex-1 flex-col p-5">
            <div class="mb-3 flex items-center justify-between gap-3">
              <h3 class="font-semibold text-[#EDEDED]">{{ project.name }}</h3>
              <span
                class="shrink-0 rounded-full border px-2 py-0.5 font-mono text-[10px] leading-relaxed"
                :class="
                  project.status === 'In progress'
                    ? 'border-hairline text-muted'
                    : 'border-accent/30 text-accent'
                "
              >
                {{ project.status }}
              </span>
            </div>

            <p class="mb-5 flex-1 text-sm leading-relaxed text-muted">
              {{ project.description }}
            </p>

            <ul class="mb-5 flex flex-wrap gap-1.5">
              <li v-for="tech in project.tech" :key="tech">
                <TechTag :label="tech" />
              </li>
            </ul>

            <a
              v-if="project.url"
              :href="project.url"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-1.5 font-mono text-xs text-[#EDEDED] transition-colors hover:text-accent"
            >
              {{ project.urlLabel }}
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
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import projects from "~/assets/data/projects.json";
</script>
