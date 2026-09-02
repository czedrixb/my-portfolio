<template>
  <section id="work" class="relative border-t border-hairline/60 bg-ink">
    <div class="mx-auto max-w-3xl px-5 py-20 md:py-28 lg:max-w-4xl">
      <div class="mb-14 flex items-baseline gap-4" data-aos="fade-up">
        <span class="font-mono text-xs text-accent">01</span>
        <h2 class="text-2xl font-bold tracking-tight text-[#EDEDED] md:text-3xl">
          Experience
        </h2>
      </div>

      <ol class="space-y-14">
        <li
          v-for="(job, index) in experience"
          :key="job.company"
          class="relative border-l border-hairline pl-6 md:pl-8"
          data-aos="fade-up"
          :data-aos-delay="index * 60"
        >
          <!-- Timeline node -->
          <span
            class="absolute left-0 top-1.5 h-2 w-2 -translate-x-1/2 rounded-full"
            :class="job.current ? 'bg-accent' : 'bg-hairline'"
            aria-hidden="true"
          ></span>

          <p class="mb-2 font-mono text-xs text-muted">{{ job.period }}</p>

          <h3 class="text-lg font-semibold text-[#EDEDED] md:text-xl">
            {{ job.company }}
          </h3>
          <p class="mb-4 text-sm text-accent">{{ job.role }}</p>

          <p class="mb-5 max-w-2xl leading-relaxed text-muted">
            {{ job.summary }}
          </p>

          <ul class="flex flex-wrap gap-1.5">
            <li v-for="tech in job.tech" :key="tech">
              <TechTag :label="tech" />
            </li>
          </ul>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup>
import experience from "~/assets/data/experience.json";
</script>
