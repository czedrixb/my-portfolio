import { expect, test } from "@playwright/test";

const trigger = (page, name) => page.getByRole("button", { name: `View details for ${name}` });

/**
 * Loads the page, waits for hydration, and scrolls the Projects grid into view.
 *
 * The wait matters: the cards are server-rendered, so a trigger is visible and
 * clickable well before Vue has attached its handler — click in that window and
 * nothing happens. AOS only stamps `aos-init` once it boots on the client, so
 * it doubles as a hydration marker.
 */
async function gotoProjects(page) {
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));

  await page.goto("/");
  // Generous: against `nuxt dev` the first request after a code change pays
  // for an on-demand compile, which can exceed the default 5s.
  await expect(page.locator("[data-aos].aos-init").first()).toBeAttached({ timeout: 30_000 });
  await page.locator("#projects").scrollIntoViewIfNeeded();
  await expect(trigger(page, "Sentrix")).toBeVisible();

  return errors;
}

test("card click opens the dialog for that project", async ({ page }) => {
  await gotoProjects(page);

  await trigger(page, "Sentrix").click();

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  // Validates the aria-labelledby wiring, not just that a panel appeared.
  await expect(dialog).toHaveAccessibleName("Sentrix");
  await expect(dialog.getByRole("heading", { name: "Sentrix" })).toBeVisible();
});

test("the dialog lists the project's features", async ({ page }) => {
  await gotoProjects(page);
  await trigger(page, "Sentrix").click();

  const features = page.getByRole("dialog").getByRole("listitem");
  // Six feature bullets plus five tech pills.
  await expect(page.getByRole("dialog").locator("ul").first().getByRole("listitem")).toHaveCount(6);
  await expect(features.first()).toContainText("branch");
});

test("gallery advances by thumbnail, arrow key and next button", async ({ page }) => {
  await gotoProjects(page);
  await trigger(page, "Sentrix").click();

  const dialog = page.getByRole("dialog");
  const stage = dialog.locator("img").first();
  // sr-only, and its text is split across template lines — target the live region.
  const counter = dialog.locator('[aria-live="polite"]');

  await expect(dialog.getByRole("button", { name: /^Show screenshot/ })).toHaveCount(5);
  await expect(counter).toHaveText("Screenshot 1 of 5");
  await expect(stage).toHaveAttribute("src", /storefront/);

  await dialog.getByRole("button", { name: "Show screenshot 4" }).click();
  await expect(counter).toHaveText("Screenshot 4 of 5");
  await expect(dialog.locator("img").first()).toHaveAttribute("src", /admin-dashboard/);

  await dialog.getByRole("group", { name: "Sentrix screenshots" }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(counter).toHaveText("Screenshot 5 of 5");

  await dialog.getByRole("button", { name: "Next screenshot" }).click();
  // Wraps back around rather than dead-ending.
  await expect(counter).toHaveText("Screenshot 1 of 5");
});

test("the Forkcast gallery has four screenshots and links to its source", async ({ page }) => {
  await gotoProjects(page);
  await trigger(page, "Forkcast").click();

  const dialog = page.getByRole("dialog");
  const stage = dialog.locator("img").first();
  const counter = dialog.locator('[aria-live="polite"]');

  await expect(dialog).toHaveAccessibleName("Forkcast");
  await expect(dialog.getByRole("button", { name: /^Show screenshot/ })).toHaveCount(4);
  await expect(counter).toHaveText("Screenshot 1 of 4");
  await expect(stage).toHaveAttribute("src", /today/);

  await dialog.getByRole("button", { name: "Show screenshot 3" }).click();
  await expect(counter).toHaveText("Screenshot 3 of 4");
  await expect(dialog.locator("img").first()).toHaveAttribute("src", /search/);

  await dialog.getByRole("button", { name: "Next screenshot" }).click();
  await expect(counter).toHaveText("Screenshot 4 of 4");
  await expect(dialog.locator("img").first()).toHaveAttribute("src", /insights/);

  await expect(dialog.getByRole("link", { name: "View source" })).toHaveAttribute(
    "href",
    "https://github.com/czedrixb/forkcast",
  );
});

test("Escape closes the dialog and returns focus to the card", async ({ page }) => {
  await gotoProjects(page);
  await trigger(page, "Sentrix").click();
  await expect(page.getByRole("dialog")).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
  await expect(trigger(page, "Sentrix")).toBeFocused();
});

test("a second Escape while closing does not error", async ({ page }) => {
  const errors = await gotoProjects(page);
  await trigger(page, "Sentrix").click();

  await page.keyboard.press("Escape");
  await page.keyboard.press("Escape");

  await expect(page.getByRole("dialog")).toBeHidden();
  expect(errors).toEqual([]);
});

test("backdrop click closes, panel click does not", async ({ page }) => {
  await gotoProjects(page);
  await trigger(page, "Sentrix").click();

  await page.getByRole("dialog").getByRole("heading", { name: "Sentrix" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();

  await page.mouse.click(12, 12);
  await expect(page.getByRole("dialog")).toBeHidden();
});

test("dragging a selection out onto the backdrop does not close", async ({ page }) => {
  await gotoProjects(page);
  await trigger(page, "Sentrix").click();

  const heading = page.getByRole("dialog").getByRole("heading", { name: "Sentrix" });
  const box = await heading.boundingBox();

  await page.mouse.move(box.x + 4, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(12, 12, { steps: 10 });
  await page.mouse.up();

  await expect(page.getByRole("dialog")).toBeVisible();
});

test("page scroll is locked while open and released after", async ({ page }) => {
  await gotoProjects(page);

  await trigger(page, "Sentrix").click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect
    .poll(() => page.evaluate(() => document.documentElement.style.overflow))
    .toBe("hidden");

  // The guarantee is that the page behind cannot move. Where it sits after
  // close is a separate matter — restoring focus to the card is *meant* to
  // scroll that card back into view.
  const locked = await page.evaluate(() => window.scrollY);
  await page.mouse.wheel(0, 600);
  expect(await page.evaluate(() => window.scrollY)).toBe(locked);

  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
  await expect.poll(() => page.evaluate(() => document.documentElement.style.overflow)).toBe("");
});

test("a project with one screenshot degrades without a thumbnail strip", async ({ page }) => {
  await gotoProjects(page);
  await trigger(page, "Pokéfinder").click();

  const dialog = page.getByRole("dialog");
  await expect(dialog).toHaveAccessibleName("Pokéfinder");
  await expect(dialog.getByRole("button", { name: /^Show screenshot/ })).toHaveCount(0);
  await expect(dialog.getByRole("button", { name: "Next screenshot" })).toHaveCount(0);
  // This project does have a url, unlike the gallery it has none of — the link still renders.
  await expect(dialog.getByRole("link", { name: "Visit site" })).toBeVisible();
});

test("the card lift is not overridden by AOS", async ({ page }) => {
  await gotoProjects(page);

  const card = page.locator("article.card").filter({ hasText: "Sentrix" });
  const resting = await card.evaluate((el) => getComputedStyle(el).transform);

  await card.hover();
  await expect
    .poll(() => card.evaluate((el) => getComputedStyle(el).transform))
    .not.toBe(resting);
});

test.describe("with reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("the dialog still opens, shows its features and closes", async ({ page }) => {
    await gotoProjects(page);
    await trigger(page, "Sentrix").click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    // The stagger uses `both` fill mode; without the reduced-motion delay
    // reset the last bullet would sit at opacity 0.
    const lastBullet = dialog.locator("ul").first().getByRole("listitem").last();
    await expect(lastBullet).toBeVisible();
    await expect
      .poll(() => lastBullet.evaluate((el) => getComputedStyle(el).opacity))
      .toBe("1");

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger(page, "Sentrix")).toBeFocused();
  });
});

test("every project card is the same height with its footer pinned", async ({ page }) => {
  await gotoProjects(page);
  await page.waitForTimeout(1200); // let the AOS reveal settle

  // offsetHeight, not boundingBox: AOS's zoom transform scales the rendered
  // box and would make equal-height cards look unequal.
  const rows = await page.locator("article.card").evaluateAll((els) =>
    els.map((e) => {
      const footer = e.querySelector(".card-actions");
      return {
        card: e.offsetHeight,
        wrapper: e.parentElement.offsetHeight,
        footerBottom: footer.offsetTop + footer.offsetHeight,
      };
    }),
  );

  expect(rows).toHaveLength(4);
  const heights = rows.map((r) => r.card);
  expect(Math.max(...heights)).toBe(Math.min(...heights));
  // Each card fills its grid cell rather than sitting short inside it.
  rows.forEach((r) => expect(r.card).toBe(r.wrapper));
  // Footers bottom-align even though the descriptions differ in length.
  const bottoms = rows.map((r) => r.footerBottom);
  expect(Math.max(...bottoms) - Math.min(...bottoms)).toBeLessThanOrEqual(1);
});

test("the thumbnail strip does not shift as captions swap", async ({ page }) => {
  await page.setViewportSize({ width: 900, height: 1200 }); // narrow: captions wrap
  await gotoProjects(page);
  await trigger(page, "Sentrix").click();
  await expect(page.getByRole("dialog")).toBeVisible();
  // Let the panel's own 320ms entrance animation (.panel-rise) finish before
  // sampling: "visible" doesn't wait for opacity/transform to settle, so
  // without this the first couple of samples below can catch the tail of the
  // rise (translateY easing to 0) and register as drift that has nothing to
  // do with the caption swap under test.
  await page.waitForTimeout(400);

  const strip = page.locator(".panel-rise div.flex.gap-2.overflow-x-auto");
  const top = () => strip.evaluate((e) => Math.round(e.getBoundingClientRect().top));

  const samples = [];
  for (const n of [5, 2, 4, 1]) {
    await page.getByRole("button", { name: `Show screenshot ${n}` }).click();
    // Sample mid-transition, where an out-in swap would collapse the caption.
    for (let i = 0; i < 5; i += 1) {
      await page.waitForTimeout(50);
      samples.push(await top());
    }
  }
  expect(Math.max(...samples) - Math.min(...samples)).toBe(0);
});

test.describe("on a mobile viewport", () => {
  test.use({ viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: true });

  test("the close button stays reachable after scrolling the panel", async ({ page }) => {
    await gotoProjects(page);
    await trigger(page, "Sentrix").click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    const closeButton = dialog.getByRole("button", { name: "Close" });

    // The panel is taller than a phone screen; scroll it to the bottom the
    // way a reader would. On `main` the close button is `absolute` on the
    // panel and scrolls away with it — this is exactly what left the dialog
    // unclosable on mobile.
    await dialog.locator(".panel-rise").evaluate((panel) => {
      panel.closest(".overflow-y-auto").scrollTo(0, panel.scrollHeight);
    });
    await expect(closeButton).toBeInViewport();

    await closeButton.click();
    await expect(dialog).toBeHidden();
  });

  test("the close button is a comfortable touch target", async ({ page }) => {
    await gotoProjects(page);
    await trigger(page, "Sentrix").click();
    await expect(page.getByRole("dialog")).toBeVisible();
    // Let the panel's .panel-rise entrance animation (320ms, scales from 0.96
    // to 1) finish — measuring mid-animation would catch a shrunk box and
    // report a false-negative on the target size.
    await page.waitForTimeout(400);

    const box = await page
      .getByRole("dialog")
      .getByRole("button", { name: "Close" })
      .boundingBox();
    expect(box.width).toBeGreaterThanOrEqual(44);
    expect(box.height).toBeGreaterThanOrEqual(44);
  });

  test("gallery arrows are visible without a hover", async ({ page }) => {
    await gotoProjects(page);
    await trigger(page, "Sentrix").click();

    const dialog = page.getByRole("dialog");
    const nextChip = dialog.getByRole("button", { name: "Next screenshot" }).locator("span");
    // No hover and no focus performed — on `main` this chip is `opacity-0`
    // and only ever reached via `group-hover`/`focus-visible`, so it would
    // never be visible on a device with no pointer to hover with.
    await expect.poll(() => nextChip.evaluate((el) => getComputedStyle(el).opacity)).toBe("1");
  });

  test("tapping either half of the screenshot navigates the gallery", async ({ page }) => {
    await gotoProjects(page);
    await trigger(page, "Sentrix").click();

    const dialog = page.getByRole("dialog");
    const counter = dialog.locator('[aria-live="polite"]');
    const stage = dialog.getByRole("group", { name: "Sentrix screenshots" });
    const box = await stage.boundingBox();

    await expect(counter).toHaveText("Screenshot 1 of 5");

    // Left quarter: previous, wrapping back to the last screenshot.
    await page.mouse.click(box.x + box.width * 0.25, box.y + box.height / 2);
    await expect(counter).toHaveText("Screenshot 5 of 5");

    // Right quarter: next, wrapping forward to the first again.
    await page.mouse.click(box.x + box.width * 0.75, box.y + box.height / 2);
    await expect(counter).toHaveText("Screenshot 1 of 5");
  });
});

test("tapping either half of the screenshot navigates the gallery on desktop too", async ({
  page,
}) => {
  await gotoProjects(page);
  await trigger(page, "Sentrix").click();

  const dialog = page.getByRole("dialog");
  const counter = dialog.locator('[aria-live="polite"]');
  const stage = dialog.getByRole("group", { name: "Sentrix screenshots" });
  const box = await stage.boundingBox();

  await expect(counter).toHaveText("Screenshot 1 of 5");

  await page.mouse.click(box.x + box.width * 0.75, box.y + box.height / 2);
  await expect(counter).toHaveText("Screenshot 2 of 5");

  await page.mouse.click(box.x + box.width * 0.25, box.y + box.height / 2);
  await expect(counter).toHaveText("Screenshot 1 of 5");
});
