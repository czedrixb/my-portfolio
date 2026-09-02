<template>
  <!-- bg-primary matters: the experience section above pulls this one up 1px
       (-mb-px) so it covers the wave SVG's antialiased bottom row, which would
       otherwise blend with the yellow band into a hairline. A transparent
       section cannot cover anything. -->
  <section class="relative overflow-hidden bg-primary pb-8">
    <!-- Decorative drifting tile pattern. -->
    <div
      class="bg-projects fx-mask-projects pointer-events-none absolute inset-0 opacity-60"
      aria-hidden="true"
    ></div>

    <BackgroundFx variant="projects" />

    <div
      class="container relative mx-auto max-w-sm px-5 py-8 md:max-w-screen-sm md:px-0 md:py-5 lg:max-w-screen-md"
    >
      <h2
        id="projects"
        class="mb-3 scroll-mt-24 text-center text-2xl font-bold text-black md:text-left md:text-4xl"
        data-aos="fade-down"
      >
        Projects
      </h2>

      <p
        class="text-md mb-16 text-left font-medium text-black md:text-lg lg:text-xl"
        data-aos="fade-up"
      >
        As a developer, I work on side projects out of passion and curiosity.
        These projects let me explore new technologies and expand my skill set,
        usually to learn a tool properly rather than just read about it.
      </p>

      <div class="grid grid-cols-1 justify-items-center gap-8 lg:grid-cols-2">
        <article
          v-for="(project, index) in projects"
          :key="project.name"
          class="card w-[22rem] transform bg-base-100 shadow-xl transition duration-300 ease-in-out hover:-translate-y-2 sm:w-96"
          data-aos="zoom-in-up"
          :data-aos-delay="(index % 2) * 100"
        >
          <figure>
            <img
              :src="project.image"
              :alt="`${project.name} screenshot`"
              loading="lazy"
              decoding="async"
            />
          </figure>

          <div class="card-body">
            <h3 class="card-title items-center">
              {{ project.name }}
              <span class="badge" :class="statusClass(project.status)">
                {{ project.status }}
              </span>
            </h3>

            <p>{{ project.description }}</p>

            <div class="card-actions items-center justify-between">
              <div v-if="project.url">
                Visit
                <a
                  target="_blank"
                  rel="noopener"
                  class="text-success underline"
                  :href="project.url"
                  >{{ project.urlLabel === "View source" ? "source" : "here" }}</a
                >
              </div>
              <div v-else></div>

              <div class="flex flex-wrap justify-end gap-1">
                <span
                  v-for="tech in project.tech"
                  :key="tech"
                  class="badge border-black/10 bg-white/70 font-mono text-[11px] text-black/70"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import projects from "~/assets/data/projects.json";

const statusClass = (status) => {
  if (status === "Live") return "text-white bg-success border-0";
  if (status === "Source available") return "text-white bg-info border-0";
  return "badge-secondary";
};
</script>
