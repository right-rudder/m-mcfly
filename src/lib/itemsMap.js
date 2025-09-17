/**
 * Maps Astro collection entries from `trainings` into ProductSuite-compatible items
 *
 * @param {Array} programs - result of await getCollection("trainings")
 * @returns {Array} items array for <ProductSuite />
 */
export function itemsMap(trainings) {
  return trainings.map(({ id, data }) => ({
    id,
    path: data.path,
    kicker: data.tagline || data.level || "Program",
    h1: data.shortTitle || "", // small label under kicker
    segment: data.shortTitle || data.title, // right-side label
    description: data.summary,
    img:
      typeof data.heroImage === "object" && data.heroImage?.src
        ? data.heroImage.src
        : data.heroImage?.src || data.heroImage || "/placeholder.jpg",
  }));
}
