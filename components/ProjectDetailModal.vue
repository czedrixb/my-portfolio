<template>
  <!-- A real <dialog> opened with showModal(). That buys the focus trap, the
       inert background, Escape, and the top layer — which is what lets the
       panel escape the Projects section's `overflow-hidden` and the sticky
       navbar's z-index without an arms race.

       The dialog is always mounted and empty; the panel inside it is what
       gets transitioned, because showModal() has to run after mount and
       close() has to run after the leave animation finishes. -->
  <dialog
    ref="dialogEl"
    class="project-dialog"
    :aria-labelledby="project ? 'project-detail-title' : undefined"
    @cancel.prevent="requestClose"
    @close="onNativeClose"
  >
    <!-- Only opacity is transitioned here, and only on the backdrop. The rise
         belongs to the panel itself (.panel-rise): transforming this
         full-viewport container would shrink it away from the screen edges
         for the length of the animation, so a click in a corner during those
         300ms would fall through to nothing instead of closing the dialog. -->
    <Transition
      enter-active-class="transition-opacity duration-200 ease-out"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-200 ease-in"
      leave-to-class="opacity-0"
      @after-leave="onAfterLeave"
    >
      <div v-if="shown" class="fixed inset-0 overflow-y-auto overscroll-contain bg-black/60">
        <!-- min-h-full + items-center keeps a short panel centred while a tall
             one still scrolls from its top rather than being clipped. -->
        <div
          class="flex min-h-full items-center justify-center p-4 sm:p-6"
          @pointerdown="onPointerDown"
          @click="onSurfaceClick"
        >
          <div
            v-if="project"
            :key="project.name"
            ref="panelEl"
            tabindex="-1"
            class="panel-rise relative w-full max-w-3xl rounded-2xl bg-surface p-5 shadow-2xl outline-none sm:p-7"
          >
            <button
              type="button"
              class="absolute right-3 top-3 z-20 grid h-9 w-9 place-items-center rounded-full text-xl leading-none text-black/50 transition hover:bg-black/5 hover:text-black"
              aria-label="Close"
              @click="requestClose"
            >
              &times;
            </button>

            <!-- Gallery ------------------------------------------------- -->
            <!-- Border and cream ground matter here: most of these screenshots
                 are light UIs, and on a white panel with no edge they read as
                 blank space rather than as a picture. -->
            <div
              class="group/stage relative aspect-[16/10] overflow-hidden rounded-xl border border-hairline bg-primary"
              role="group"
              tabindex="0"
              :aria-label="`${project.name} screenshots`"
              @keydown.left.prevent="show(activeIndex - 1)"
              @keydown.right.prevent="show(activeIndex + 1)"
            >
              <Transition
                enter-active-class="absolute inset-0 transition duration-[260ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                :enter-from-class="
                  direction > 0 ? 'opacity-0 translate-x-8' : 'opacity-0 -translate-x-8'
                "
                leave-active-class="absolute inset-0 transition duration-200 ease-in"
                :leave-to-class="
                  direction > 0 ? 'opacity-0 -translate-x-6' : 'opacity-0 translate-x-6'
                "
              >
                <img
                  :key="activeIndex"
                  :src="shots[activeIndex].src"
                  :alt="shots[activeIndex].alt"
                  width="1440"
                  height="900"
                  decoding="async"
                  class="absolute inset-0 h-full w-full object-contain"
                />
              </Transition>

              <template v-if="shots.length > 1">
                <button
                  type="button"
                  class="absolute left-2 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-lg shadow-md opacity-0 transition-opacity duration-200 hover:bg-white focus-visible:opacity-100 group-hover/stage:opacity-100"
                  aria-label="Previous screenshot"
                  @click="show(activeIndex - 1)"
                >
                  &lsaquo;
                </button>
                <button
                  type="button"
                  class="absolute right-2 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-lg shadow-md opacity-0 transition-opacity duration-200 hover:bg-white focus-visible:opacity-100 group-hover/stage:opacity-100"
                  aria-label="Next screenshot"
                  @click="show(activeIndex + 1)"
                >
                  &rsaquo;
                </button>
              </template>
            </div>

            <p class="sr-only" aria-live="polite">
              Screenshot {{ activeIndex + 1 }} of {{ shots.length }}
            </p>

            <!-- Both captions share one grid cell, so the outgoing and incoming
                 text overlap during the crossfade instead of the box collapsing
                 to zero height and snapping the thumbnails up and back.
                 `mode="out-in"` is exactly what caused that jump. -->
            <div v-if="hasCaptions" class="mt-3 grid">
              <Transition
                enter-active-class="transition-opacity duration-200 ease-out"
                enter-from-class="opacity-0"
                leave-active-class="transition-opacity duration-150 ease-in"
                leave-to-class="opacity-0"
              >
                <p
                  v-if="shots[activeIndex].caption"
                  :key="activeIndex"
                  class="col-start-1 row-start-1 text-sm leading-relaxed text-muted"
                >
                  {{ shots[activeIndex].caption }}
                </p>
              </Transition>
            </div>

            <!-- pl-1/pt-1 are not decoration: the active thumb's ring-2 +
                 ring-offset-2 paints 4px outside the button, and
                 `overflow-x-auto` clips both axes (overflow-y: visible computes
                 to auto when the other axis is not visible), so without them the
                 ring is shaved on the left and top edges. pb-1 was already
                 doing this for the bottom. -->
            <div v-if="shots.length > 1" class="mt-4 flex gap-2 overflow-x-auto pb-1 pl-1 pt-1">
              <button
                v-for="(shot, i) in shots"
                :key="shot.src"
                type="button"
                :aria-current="i === activeIndex ? 'true' : undefined"
                :aria-label="`Show screenshot ${i + 1}`"
                class="shrink-0 overflow-hidden rounded-md border border-hairline transition-all duration-200"
                :class="
                  i === activeIndex
                    ? 'opacity-100 ring-2 ring-ink ring-offset-2 ring-offset-surface'
                    : 'opacity-60 hover:opacity-100'
                "
                @click="show(i)"
              >
                <!-- Cropped to the top rather than fitted whole: a full page
                     shrunk to 48px tall is unreadable, and these pages carry
                     their identity in the header and the first rows. -->
                <img
                  :src="shot.src"
                  alt=""
                  width="1440"
                  height="900"
                  loading="lazy"
                  decoding="async"
                  class="h-14 w-24 bg-primary object-cover object-top"
                />
              </button>
            </div>

            <!-- Copy ---------------------------------------------------- -->
            <!-- The id sits on the name alone: aria-labelledby pointing at the
                 whole heading would make the dialog announce itself as
                 "Sentrix Source available". -->
            <h2 class="mt-6 flex flex-wrap items-center gap-2 text-2xl font-bold tracking-tightest text-ink">
              <span id="project-detail-title">{{ project.name }}</span>
              <span class="badge" :class="statusClass(project.status)">
                {{ project.status }}
              </span>
            </h2>

            <p class="mt-2 text-muted">{{ body }}</p>

            <template v-if="bullets.length">
              <h3 class="mt-6 text-sm font-semibold uppercase tracking-widest text-black/40">
                What it does
              </h3>
              <ul class="mt-3 space-y-2">
                <li
                  v-for="(feature, i) in bullets"
                  :key="feature"
                  class="flex animate-fade-up gap-3 text-sm text-ink/80"
                  :style="{ animationDelay: `${140 + i * 70}ms` }"
                >
                  <span
                    aria-hidden="true"
                    class="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  ></span>
                  {{ feature }}
                </li>
              </ul>
            </template>

            <div class="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-hairline pt-4">
              <a
                v-if="project.url"
                :href="project.url"
                target="_blank"
                rel="noopener"
                class="text-sm font-medium text-success underline"
                >{{ project.urlLabel }}</a
              >
              <div v-else></div>

              <ul class="flex flex-wrap justify-end gap-1">
                <li v-for="tech in project.tech" :key="tech">
                  <TechTag :label="tech" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </dialog>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, ref, watch } from "vue";

const props = defineProps({
  project: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["closed"]);

const { lock, unlock } = useScrollLock();

const dialogEl = ref(null);
const panelEl = ref(null);
const shown = ref(false);
const closing = ref(false);

const activeIndex = ref(0);
const direction = ref(1);

/*
 | Projects without a gallery fall back to a single shot built from the card
 | image, so every project opens a working dialog and the template needs no
 | branching beyond hiding the thumbnail strip.
 */
const shots = computed(() => {
  if (!props.project) return [];
  if (props.project.gallery?.length) return props.project.gallery;
  return [
    {
      src: props.project.image,
      alt: `${props.project.name} screenshot`,
      caption: null,
    },
  ];
});

// Gallery-less projects get no caption row at all, rather than an empty one.
const hasCaptions = computed(() => shots.value.some((shot) => shot.caption));

const bullets = computed(() => props.project?.features ?? []);
const body = computed(() => props.project?.detail || props.project?.description || "");

const statusClass = (status) => {
  if (status === "Live") return "text-white bg-success border-0";
  if (status === "Source available") return "text-white bg-info border-0";
  return "badge-secondary";
};

const show = (index) => {
  const total = shots.value.length;
  if (total < 2) return;
  const next = ((index % total) + total) % total;
  direction.value = index > activeIndex.value ? 1 : -1;
  activeIndex.value = next;
};

watch(
  () => props.project,
  (project) => {
    if (!project) return;
    activeIndex.value = 0;
    direction.value = 1;
    if (!shown.value) open();
  },
);

// Warm the neighbouring shots so advancing never shows a blank frame.
watch([activeIndex, shots], ([index, list]) => {
  if (!import.meta.client || list.length < 2) return;
  for (const offset of [1, -1]) {
    const shot = list[(index + offset + list.length) % list.length];
    if (shot) new Image().src = shot.src;
  }
});

async function open() {
  dialogEl.value?.showModal();
  lock();
  shown.value = true;
  // Move focus onto the panel so Tab walks forward into the content rather
  // than starting from the dialog itself. The panel only exists once the
  // `shown` render has flushed, so await it — a rAF fires too early.
  await nextTick();
  panelEl.value?.focus();
}

function requestClose() {
  if (closing.value) return; // a second Escape mid-close must be a no-op
  closing.value = true;
  shown.value = false;
}

function onAfterLeave() {
  dialogEl.value?.close();
}

/*
 | The single unlock point. Every path that ends with the dialog closed
 | arrives here, so scroll is released exactly once.
 */
function onNativeClose() {
  unlock();
  closing.value = false;
  emit("closed");
}

/*
 | Backdrop click. The press and the release both have to land outside the
 | panel — otherwise selecting caption text and releasing over the backdrop
 | would close the dialog.
 */
let pressedOutside = false;
const onPointerDown = (event) => {
  pressedOutside = event.target === event.currentTarget;
};
const onSurfaceClick = (event) => {
  if (event.target === event.currentTarget && pressedOutside) requestClose();
  pressedOutside = false;
};

onBeforeUnmount(() => {
  unlock();
  if (dialogEl.value?.open) dialogEl.value.close();
});
</script>
