import { NextResponse } from "next/server";

export default async function getCategories() {
  const res = await fetch(`${process.env.KINDE_SITE_URL}/api/categories`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return NextResponse.error();
  }
  return res.json();
}
