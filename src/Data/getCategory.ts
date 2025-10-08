export default async function getCategories() {
  const res = await fetch(`${process.env.KINDE_SITE_URL}/api/categories`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  return res.json();
}
