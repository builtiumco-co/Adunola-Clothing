import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("home communicates the brand and the FAQ works", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Simple.",
  );
  await expect(page.getByRole("heading", { level: 1 })).toContainText("You.");
  await expect(page.locator(".photo-caption")).toContainText(
    "Style inspiration",
  );
  await expect
    .poll(() =>
      page
        .locator(".hero-photo img")
        .evaluate(
          (img: HTMLImageElement) => img.complete && img.naturalWidth >= 700,
        ),
    )
    .toBe(true);
  await page
    .locator("summary", {
      hasText: "Can I bring my own inspiration or fabric?",
    })
    .click();
  await expect(
    page.getByText("Absolutely. A photograph", { exact: false }),
  ).toBeVisible();
  await page
    .locator("summary", { hasText: "How do deposits and payments work?" })
    .click();
  await expect(
    page.getByText("Absolutely. A photograph", { exact: false }),
  ).toBeHidden();
  await expect(page.locator("details[open]")).toContainText("70%");
  await expect(page.locator("details[open]")).toContainText("30%");
  expect(errors).toEqual([]);
});

test("portfolio and shop remain on hold, including old look links", async ({
  page,
}) => {
  for (const path of ["/our-work", "/our-work/the-scarlet-bloom", "/shop"]) {
    await page.goto(path);
    await expect(page.locator(".collection-pending")).toContainText(
      "Coming soon",
    );
    await expect(page.locator(".look-card")).toHaveCount(0);
    await expect(
      page.getByRole("button", { name: /add to cart|buy now|checkout/i }),
    ).toHaveCount(0);
    await expect(page.locator("main img")).toHaveCount(0);
    await page.getByRole("link", { name: "Explore our services" }).click();
    await expect(page).toHaveURL(/\/services$/);
  }
});

test("a service starts an enquiry with the correct selection", async ({
  page,
}) => {
  await page.goto("/services");
  await expect(page.locator(".service-card")).toHaveCount(7);
  const card = page
    .locator(".service-card")
    .filter({
      has: page.getByRole("heading", {
        name: "Your fabric, our craftsmanship",
      }),
    });
  await card.getByRole("link", { name: "Let’s discuss your outfit" }).click();
  await expect(page).toHaveURL(/service=customer-fabric/);
  await expect(page.getByLabel("Your outfit", { exact: false })).toHaveValue(
    "customer-fabric",
  );
});

test("custom enquiry validates and prepares the owner’s WhatsApp message", async ({
  page,
}) => {
  await page.goto("/enquire?service=dresses-and-gowns");
  await page.evaluate(() => {
    window.open = (url?: string | URL) => {
      (window as Window & { preparedEnquiry?: string }).preparedEnquiry =
        String(url);
      return null;
    };
  });
  await page.getByRole("button", { name: "Continue on WhatsApp" }).click();
  await expect(page.getByRole("status")).toHaveCount(0);
  await page.getByLabel("Your name").fill("Ada Okafor");
  await page.getByLabel("Email address").fill("ada@example.com");
  await page.getByLabel("The occasion").selectOption("Evening event");
  await page
    .getByLabel("Fabric preference")
    .selectOption("I will supply my fabric");
  await page.getByLabel("Your budget in NGN").fill("25,000");
  await page
    .getByLabel("Collection or delivery")
    .selectOption("Nationwide delivery");
  await page.getByLabel("Delivery city / state").fill("Lagos, Lagos State");
  await page
    .getByLabel("Tell us a little about your idea")
    .fill("I would love a custom dress with bell sleeves.");
  await expect(page.locator(".enquiry-order-note")).toContainText("70%");
  await expect(page.locator(".enquiry-order-note")).toContainText(
    "3–5 working days",
  );
  await page.getByRole("button", { name: "Continue on WhatsApp" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Your enquiry is ready.",
  );
  const prepared = await page.evaluate(
    () => (window as Window & { preparedEnquiry?: string }).preparedEnquiry,
  );
  const url = new URL(prepared!);
  expect(url.hostname).toBe("wa.me");
  expect(url.pathname).toBe("/2349032022101");
  for (const line of [
    "Name: Ada Okafor",
    "Email: ada@example.com",
    "Occasion: Evening event",
    "Outfit: Dresses & gowns",
    "Fabric: I will supply my fabric",
    "Budget (NGN): 25,000",
    "Collection / delivery: Nationwide delivery",
    "Delivery location: Lagos, Lagos State",
    "I would love a custom dress with bell sleeves.",
  ]) {
    expect(url.searchParams.get("text")).toContain(line);
  }
  await expect(
    page.getByRole("link", { name: "Open WhatsApp", exact: true }),
  ).toHaveAttribute("href", prepared!);
  await page.reload();
  await expect(page.getByLabel("Your name")).toHaveValue("Ada Okafor");
  await expect(page.getByLabel("Delivery city / state")).toHaveValue(
    "Lagos, Lagos State",
  );
  await page.getByRole("button", { name: "Clear my draft" }).click();
  await expect(page.getByLabel("Your name")).toHaveValue("");
  await page.reload();
  await expect(page.getByLabel("Your name")).toHaveValue("");
});

test("navigation works with a keyboard and on a small screen", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "Open navigation menu" }).click();
    const dialog = page.getByRole("dialog", { name: "Navigation menu" });
    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await page.getByRole("button", { name: "Open navigation menu" }).click();
    await dialog.getByRole("link", { name: "How to order" }).click();
    await expect(dialog).toBeHidden();
  } else {
    await page
      .getByRole("navigation", { name: "Main navigation", exact: true })
      .getByRole("link", { name: "How to order" })
      .click();
  }
  await expect(page).toHaveURL(/\/the-experience$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "with you.",
  );
  await expect(
    page.getByRole("heading", { name: "Made with care", exact: true }),
  ).toBeVisible();
  await expect(page.locator(".process-grid")).toContainText("70%");
});

test("empty ideas and past dates do not prepare an enquiry", async ({
  page,
}) => {
  await page.goto("/enquire?service=two-piece-outfits");
  await page.getByLabel("Your name").fill("    ");
  await page.getByLabel("The occasion").selectOption("Birthday");
  await page
    .getByLabel("Tell us a little about your idea")
    .fill("            ");
  await page.getByRole("button", { name: "Continue on WhatsApp" }).click();
  await expect(page.getByRole("status")).toHaveCount(0);
  await expect(page.getByLabel("Your name")).toHaveJSProperty(
    "validationMessage",
    "Please enter your name.",
  );
  await page.getByLabel("Your name").fill("Ada");
  await page
    .getByLabel("Tell us a little about your idea")
    .fill("A bright birthday outfit with bell sleeves.");
  await page.getByLabel("Occasion date").fill("2000-01-01");
  await page.getByRole("button", { name: "Continue on WhatsApp" }).click();
  await expect(page.getByRole("status")).toHaveCount(0);
  expect(
    await page
      .getByLabel("Occasion date")
      .evaluate((input: HTMLInputElement) => input.validity.rangeUnderflow),
  ).toBe(true);
});

test("contact links use verified details and delivery anchors work", async ({
  page,
}) => {
  await page.goto("/contact");
  await expect(page.locator("main")).toContainText("09032022101");
  await expect(page.locator("main")).toContainText(
    "Akure, Ondo State, Nigeria",
  );
  await expect(
    page.locator('main a[href="mailto:olawalebunmi05@gmail.com"]'),
  ).toHaveCount(1);
  await expect(
    page.locator('main a[href="https://www.instagram.com/_adunclothing/"]'),
  ).toHaveCount(1);
  for (const link of await page.locator('a[href^="https://wa.me/"]').all()) {
    expect(new URL((await link.getAttribute("href"))!).pathname).toBe(
      "/2349032022101",
    );
  }
  await page
    .getByRole("link", { name: "Delivery details", exact: true })
    .click();
  await expect(page).toHaveURL(/\/policies#delivery$/);
  await expect
    .poll(() =>
      page
        .locator("#delivery")
        .evaluate(
          (element) => Math.abs(element.getBoundingClientRect().top) < 180,
        ),
    )
    .toBe(true);
  await expect(page.locator("#delivery")).toContainText("nationwide");
});

test("pages fit the viewport and meet core accessibility checks", async ({
  page,
}) => {
  for (const path of [
    "/",
    "/about",
    "/services",
    "/contact",
    "/policies",
    "/privacy",
    "/the-experience",
    "/enquire",
    "/our-work",
    "/shop",
  ]) {
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
      path,
    ).toBe(true);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      results.violations.map((violation) => ({
        id: violation.id,
        nodes: violation.nodes.map((node) => node.target),
      })),
      path,
    ).toEqual([]);
  }
});

test("unknown routes have a useful return path", async ({ page }) => {
  await page.goto("/not-a-page");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "way back.",
  );
  await page.getByRole("link", { name: "Back to home" }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Simple.",
  );
});
