export default async function getProducts() {
  const res = await fetch(`${process.env.KINDE_SITE_URL}/api/products`, {
    cache: "no-store",
    method: "GET",
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}
