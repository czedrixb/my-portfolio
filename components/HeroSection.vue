<template>
  <section id="hero" class="relative overflow-hidden">
    <!-- Decorative drifting tile pattern. -->
    <div
      class="bg-hero fx-mask-hero pointer-events-none absolute inset-0 opacity-50"
      aria-hidden="true"
    ></div>

    <BackgroundFx variant="hero" />

    <div
      class="container relative mx-auto max-w-sm px-5 py-8 pb-16 md:max-w-screen-sm md:px-0 md:py-5 md:pb-20 lg:max-w-screen-md"
    >
      <div
        class="mb-8 grid grid-cols-1 items-center justify-items-center gap-3 md:mb-12 md:grid-cols-2 lg:max-w-screen-xl"
      >
        <div class="mb-12 md:mb-0">
          <div class="flex items-center gap-x-2 animate-fade-left">
            <div class="pb-5 text-2xl md:pb-0 md:pt-10 lg:text-4xl">👋</div>
            <h1
              class="relative mb-3 text-left text-3xl font-bold text-black md:pt-16 lg:text-4xl"
            >
              Hi there! I'm Czed.
              <span
                class="absolute bottom-[8%] left-[61%] -z-10 h-2 w-[14rem] -translate-x-1/2 transform bg-secondary md:bottom-[3%] md:w-[15rem]"
                aria-hidden="true"
              ></span>
            </h1>
          </div>

          <p
            class="text-md mb-8 text-left font-medium text-black animate-fade-left md:text-lg lg:text-xl"
            style="animation-delay: 150ms"
          >
            I'm a <b>full stack developer</b> building production web, mobile
            and AI products — from the database and API through to the interface
            and the deploy.
          </p>

          <div
            class="text-center animate-fade-left"
            style="animation-delay: 300ms"
          >
            <a
              rel="noopener"
              target="_blank"
              href="/pdf/RESUME-2025-CZEDRIX-BARCENA.pdf"
              class="btn text-md rounded-full border-0 bg-secondary px-8 shadow-sm transition-shadow hover:bg-[#ddbe08] hover:shadow-lg hover:shadow-yellow-200"
            >
              View my CV
            </a>
          </div>
        </div>

        <div class="float-slow">
          <!-- width/height are the intrinsic size: they only reserve the aspect ratio
               so the page below does not shift once this 875 KB image decodes.
               h-auto/max-w-full keep it fluid. -->
          <img
            src="/images/img-hero.png"
            width="2000"
            height="1499"
            class="h-auto max-w-full"
            alt="Illustration of a developer at a desk"
          />
        </div>
      </div>

      <div class="flex justify-center" data-aos="fade-up">
        <a
          href="#work"
          class="btn text-md flex items-center gap-3 rounded-full border-0 bg-secondary px-8 shadow-sm transition-shadow hover:bg-[#ddbe08] hover:shadow-lg hover:shadow-yellow-200"
        >
          Work Experience
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"
            />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>
