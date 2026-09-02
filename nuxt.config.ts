// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  app: {
    head: {
      htmlAttrs: { lang: 'en', 'data-theme': 'mytheme' },
      meta: [
        { name: 'theme-color', content: '#0B0B0F' },
        { name: 'color-scheme', content: 'dark' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ['nuxt-aos'],

  aos: {
    duration: 450,
    easing: 'ease-out',
    once: true,
    offset: 60,
    disableMutationObserver: false,
  },
})
