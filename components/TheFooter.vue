<template>
  <footer class="bg-black">
    <div
      class="mx-auto max-w-sm px-5 py-8 text-white md:max-w-screen-md md:px-0 lg:max-w-screen-lg"
    >
      <p class="mb-8 max-w-md text-lg font-medium leading-snug" data-aos="fade-up">
        Open to full-time and freelance work.
        <a
          href="mailto:czedrixb@gmail.com"
          class="text-secondary underline decoration-secondary/40 underline-offset-4 transition-colors hover:decoration-secondary"
          >Get in touch</a
        >.
      </p>

      <ul class="grid grid-cols-1 justify-center gap-y-5 md:grid-cols-2 lg:grid-cols-3">
        <li
          v-for="(link, index) in links"
          :key="link.label"
          class="flex items-center gap-x-3"
          data-aos="fade-up"
          :data-aos-delay="index * 80"
        >
          <span
            class="flex w-10 shrink-0 justify-center rounded-full bg-white p-2 transition-transform duration-200 hover:scale-110"
          >
            <svg
              class="w-5 fill-black"
              :viewBox="link.viewBox"
              aria-hidden="true"
            >
              <path :d="link.path" />
            </svg>
          </span>
          <a
            :href="link.href"
            :target="link.external ? '_blank' : undefined"
            rel="noopener"
            class="truncate underline-offset-4 hover:underline"
            >{{ link.label }}</a
          >
        </li>
      </ul>

      <div
        class="mt-10 flex flex-col gap-2 border-t border-white/15 pt-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between"
      >
        <p>&copy; {{ year }} Czedrix Barcena</p>
        <p>Built with Nuxt &amp; Tailwind</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear();

const links = [
  {
    label: "czedrixb@gmail.com",
    href: "mailto:czedrixb@gmail.com",
    external: false,
    viewBox: "0 0 512 512",
    path: "M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z",
  },
  {
    label: "linkedin.com/in/czedrix-barcena",
    href: "https://www.linkedin.com/in/czedrix-barcena/",
    external: true,
    viewBox: "0 0 448 512",
    path: "M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z",
  },
  {
    label: "github.com/czedrixb",
    href: "https://github.com/czedrixb",
    external: true,
    viewBox: "0 0 16 16",
    path: "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8",
  },
];
</script>
