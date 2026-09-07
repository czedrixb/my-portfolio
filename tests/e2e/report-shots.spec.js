/**
 * Capture-only spec for the verification report. Not a test of behaviour —
 * set BASELINE_URL as well to capture the pre-change comparison.
 *
 *   SHOT_DIR=... BASELINE_URL=http://localhost:3001 npx playwright test report-shots
 */
import { expect, test } from "@playwright/test";
import { mkdirSync } from "node:fs";

const OUT = process.env.SHOT_DIR;
const BASELINE = process.env.BASELINE_URL;

test.skip(!OUT, "SHOT_DIR not set");
test.use({ reducedMotion: null });

/**
 * Loads the page and waits until the Projects grid is genuinely settled:
 * hydrated, AOS reveal finished on every card, and every lazy image decoded.
 */
async function ready(page, url) {
  await page.goto(url);
  await expect(page.locator("[data-aos].aos-init").first()).toBeAttached({ timeout: 30_000 });

  // The dev-tools badge floats over the bottom of the viewport.
  await page.addStyleTag({
    content: "#nuxt-devtools-anchor, .nuxt-devtools-anchor { display: none !important; }",
  });

  await page.locator("#projects").scrollIntoViewIfNeeded();
  // Walk past the grid and back so every lazy card image is requested.
  await page.evaluate(async () => {
    const grid = document.querySelector("#projects")?.closest("section");
    grid?.scrollIntoView({ behavior: "instant", block: "end" });
    await new Promise((r) => setTimeout(r, 400));
    grid?.scrollIntoView({ behavior: "instant", block: "start" });
  });

  // AOS marks each revealed element; wait for the cards to finish.
  await page.waitForFunction(
    () => document.querySelectorAll("[data-aos].aos-animate").length >= 4,
    null,
    { timeout: 15_000 },
  );
  await page.waitForLoadState("networkidle");
  await page
    .waitForFunction(() => Array.from(document.images).every((i) => i.complete), null, {
      timeout: 15_000,
    })
    .catch(() => {});
  // Let the 700ms AOS transition and the image decode land.
  await page.evaluate(() => new Promise((r) => setTimeout(r, 1200)));
}

// The Sentrix panel and the four-card grid are both taller than a 900px
// viewport; give the shots room so each is captured whole and in place.
const TALL = { width: 1440, height: 1500 };

// The cards are wider than their max-w-screen-md container and overflow it, so
// an element shot of the grid itself clips the right column. Take the section.
const cards = (page) => page.locator("section").filter({ has: page.locator("article.card") });

test("after — projects grid", async ({ page }) => {
  mkdirSync(OUT, { recursive: true });
  await page.setViewportSize(TALL);
  await ready(page, "/");
  await cards(page).screenshot({ path: `${OUT}/grid-after.png` });
});

test("after — card hover", async ({ page }) => {
  await ready(page, "/");
  const card = page.locator("article.card").filter({ hasText: "Sentrix" });
  await card.hover();
  await page.evaluate(() => new Promise((r) => setTimeout(r, 800)));
  await card.screenshot({ path: `${OUT}/card-hover-after.png` });
});

test("after — modal open on Sentrix", async ({ page }) => {
  await page.setViewportSize(TALL);
  await ready(page, "/");
  await page.getByRole("button", { name: "View details for Sentrix" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.evaluate(() => new Promise((r) => setTimeout(r, 1200)));
  await page.screenshot({ path: `${OUT}/modal-sentrix.png` });
});

test("after — modal gallery advanced", async ({ page }) => {
  await page.setViewportSize(TALL);
  await ready(page, "/");
  await page.getByRole("button", { name: "View details for Sentrix" }).click();
  await page.getByRole("button", { name: "Show screenshot 4" }).click();
  await page.evaluate(() => new Promise((r) => setTimeout(r, 900)));
  await page.screenshot({ path: `${OUT}/modal-gallery.png` });
});

test("after — modal degraded (Pet Pals)", async ({ page }) => {
  await page.setViewportSize(TALL);
  await ready(page, "/");
  await page.getByRole("button", { name: "View details for Pet Pals" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.evaluate(() => new Promise((r) => setTimeout(r, 1200)));
  await page.screenshot({ path: `${OUT}/modal-petpals.png` });
});

test("after — modal on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await ready(page, "/");
  await page.getByRole("button", { name: "View details for Sentrix" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.evaluate(() => new Promise((r) => setTimeout(r, 1200)));
  await page.screenshot({ path: `${OUT}/modal-mobile.png` });
});

test("before — projects grid and hover", async ({ page }) => {
  test.skip(!BASELINE, "BASELINE_URL not set");

  await page.setViewportSize(TALL);
  await ready(page, `${BASELINE}/`);
  await cards(page).screenshot({ path: `${OUT}/grid-before.png` });

  const card = page.locator("article.card").filter({ hasText: "Receiptify" });
  await card.hover();
  await page.evaluate(() => new Promise((r) => setTimeout(r, 800)));
  await card.screenshot({ path: `${OUT}/card-hover-before.png` });
});
