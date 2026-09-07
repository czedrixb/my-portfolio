<template>
  <!-- AOS owns this wrapper and nothing else.

       It has to be a separate element: aos.css styles the reveal with
       `[data-aos^=zoom][data-aos^=zoom].aos-animate`, whose specificity beats
       Tailwind's `hover:` utilities, and AOS writes its transition duration
       and delay inline. Put both on one element and the card's hover lift is
       silently overridden — which is what used to happen here. -->
  <div class="h-full" data-aos="zoom-in-up" :data-aos-delay="(index % 2) * 100">
    <article
      class="card group relative h-full w-[22rem] bg-base-100 shadow-xl transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:shadow-2xl focus-within:-translate-y-2 focus-within:shadow-2xl active:translate-y-0 active:scale-[0.985] active:duration-100 sm:w-96"
    >
      <!-- Stretched trigger. The card stays a plain container and this sits
           over it, so the "View source" link below can be a sibling rather
           than a link nested inside a button. -->
      <button
        type="button"
        class="absolute inset-0 z-10 rounded-2xl"
        aria-haspopup="dialog"
        :aria-label="`View details for ${project.name}`"
        @click="open"
      ></button>

      <!-- Cream ground, not white: these are light UI screenshots, and on a
           white card the letterboxing would be invisible and the image would
           bleed into the body. -->
      <figure class="relative aspect-[16/10] overflow-hidden border-b border-hairline bg-primary">
        <img
          :src="project.image"
          :alt="`${project.name} screenshot`"
          width="1440"
          height="900"
          loading="lazy"
          decoding="async"
          class="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />

        <!-- Accent hairline unfurling under the screenshot on hover. scale-x,
             so it never touches layout. -->
        <span
          aria-hidden="true"
          class="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-within:scale-x-100"
        ></span>
      </figure>

      <div class="card-body">
        <h3 class="card-title items-center">
          {{ project.name }}
          <span class="badge" :class="statusClass(project.status)">
            {{ project.status }}
          </span>
        </h3>

        <p>{{ project.description }}</p>

        <p class="text-sm font-medium text-black/50 transition-colors duration-300 group-hover:text-black">
          View details
          <span
            aria-hidden="true"
            class="ml-0.5 inline-block transition-transform duration-300 group-hover:translate-x-1"
            >&rarr;</span
          >
        </p>

        <!-- mt-auto pins the footer to the bottom of the (now equal-height)
             card, so the links and tech pills line up across the grid
             regardless of how long each description runs. -->
        <div class="card-actions mt-auto items-center justify-between pt-2">
          <!-- z-20 lifts the link above the stretched trigger so its own
               click wins. -->
          <a
            v-if="project.url"
            :href="project.url"
            target="_blank"
            rel="noopener"
            class="relative z-20 text-success underline"
            >{{ project.urlLabel }}</a
          >
          <div v-else></div>

          <ul class="relative z-20 flex flex-wrap justify-end gap-1">
            <li v-for="tech in project.tech" :key="tech">
              <TechTag :label="tech" />
            </li>
          </ul>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup>
defineProps({
  project: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["open"]);

const statusClass = (status) => {
  if (status === "Live") return "text-white bg-success border-0";
  if (status === "Source available") return "text-white bg-info border-0";
  return "badge-secondary";
};

/*
 | The trigger element travels with the event so the section can put focus
 | back on it when the dialog closes. Reading currentTarget here is safe —
 | emit runs synchronously inside the dispatch, before the event is recycled.
 */
const open = (event) => emit("open", event.currentTarget);
</script>
