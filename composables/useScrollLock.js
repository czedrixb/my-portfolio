/**
 * Freezes page scrolling while a modal dialog is open.
 *
 * `dialog.showModal()` puts the dialog in the top layer but does not stop the
 * page behind it from scrolling, so that part is on us.
 *
 * The lock lives on <html> rather than <body>: the navbar is `sticky top-0`,
 * and padding added to <html> shrinks the containing block so the navbar and
 * every `container mx-auto` recentre together. Padding on <body> would leave
 * the sticky header sitting off to one side.
 */

let depth = 0;
let previousOverflow = "";
let previousPaddingRight = "";

export function useScrollLock() {
  const lock = () => {
    if (!import.meta.client) return;
    // Ref-counted, so a double open cannot leave the page permanently frozen.
    if (depth++ > 0) return;

    const html = document.documentElement;
    const scrollbarWidth = window.innerWidth - html.clientWidth;

    previousOverflow = html.style.overflow;
    previousPaddingRight = html.style.paddingRight;

    html.style.overflow = "hidden";
    if (scrollbarWidth > 0) html.style.paddingRight = `${scrollbarWidth}px`;
    document.body.classList.add("modal-open");
  };

  const unlock = () => {
    if (!import.meta.client || depth === 0) return;
    if (--depth > 0) return;

    const html = document.documentElement;
    // Restore what was there before rather than assuming it was empty.
    html.style.overflow = previousOverflow;
    html.style.paddingRight = previousPaddingRight;
    document.body.classList.remove("modal-open");
  };

  return { lock, unlock };
}
