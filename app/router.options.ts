import type { RouterConfig } from '@nuxt/schema'

// The navbar is sticky, so a raw jump to #work / #projects parks the heading
// underneath it. Nuxt's router does the scrolling on hash navigation and
// ignores the element's scroll-margin, so apply the offset here instead.
const NAVBAR_OFFSET = 88

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition

    if (to.hash) {
      const el = document.querySelector(to.hash)
      if (el) {
        return {
          top: el.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET,
        }
      }
    }

    return { top: 0 }
  },
}
