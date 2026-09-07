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

    <!-- The anchor id lives here, not on the <h2>: the heading is an AOS reveal
         target, and its pre-reveal translate3d would offset the scroll landing. -->
    <div
      id="projects"
      class="container relative mx-auto max-w-sm px-5 py-8 md:max-w-screen-sm md:px-0 md:py-5 lg:max-w-screen-md"
    >
      <h2
        class="mb-3 text-center text-2xl font-bold text-black md:text-left md:text-4xl"
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

      <!-- auto-rows-fr makes every row the same height, so all four cards
           match rather than each row sizing to its own tallest card. -->
      <div class="grid auto-rows-fr grid-cols-1 justify-items-center gap-8 lg:grid-cols-2">
        <ProjectCard
          v-for="(project, index) in projects"
          :key="project.name"
          :project="project"
          :index="index"
          @open="(trigger) => openProject(project, trigger)"
        />
      </div>
    </div>

    <!-- One dialog for the whole section, not one per card. -->
    <ProjectDetailModal :project="selected" @closed="onClosed" />
  </section>
</template>

<script setup>
import { nextTick, ref } from "vue";
import projects from "~/assets/data/projects.json";

const selected = ref(null);
const trigger = ref(null);

const openProject = (project, element) => {
  trigger.value = element;
  selected.value = project;
};

/*
 | Cleared only once the dialog has finished leaving — the panel still reads
 | `project` while its exit animation plays. Focus goes back to the card that
 | opened it; the browser's own restoration is unreliable here because the
 | cards live in a v-for and any re-render invalidates its saved reference.
 */
const onClosed = () => {
  const element = trigger.value;
  selected.value = null;
  trigger.value = null;
  nextTick(() => element?.focus());
};
</script>
