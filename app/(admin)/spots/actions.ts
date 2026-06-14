"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { spots } from "@/db/schema";
import type { InferInsertModel } from "drizzle-orm";

type SpotCategory = "stay" | "cafe" | "nature" | "sight";

function parseSpotForm(formData: FormData): InferInsertModel<typeof spots> {
  const tipsRaw = (formData.get("tips") as string) ?? "";
  const tips = tipsRaw
    .split("\n")
    .map((t) => t.trim())
    .filter(Boolean);

  const dogTags = formData.getAll("dogTags") as string[];

  const lat = formData.get("lat") ? Number(formData.get("lat")) : null;
  const lng = formData.get("lng") ? Number(formData.get("lng")) : null;

  return {
    name: formData.get("name") as string,
    category: formData.get("category") as SpotCategory,
    area: formData.get("area") as string,
    pref: formData.get("pref") as string,
    lead: formData.get("lead") as string,
    body: (formData.get("body") as string) || null,
    address: (formData.get("address") as string) || null,
    lat,
    lng,
    websiteUrl: (formData.get("websiteUrl") as string) || null,
    youtubeId: (formData.get("youtubeId") as string) || null,
    tips: tips.length > 0 ? tips : null,
    dogTags: dogTags.length > 0 ? dogTags : null,
    published: formData.get("published") === "on",
  };
}

export async function createSpot(formData: FormData) {
  await db.insert(spots).values(parseSpotForm(formData));
  revalidatePath("/spots");
  redirect("/spots");
}

export async function updateSpot(id: string, formData: FormData) {
  await db
    .update(spots)
    .set({ ...parseSpotForm(formData), updatedAt: new Date() })
    .where(eq(spots.id, id));
  revalidatePath("/spots");
  redirect("/spots");
}

export async function deleteSpot(id: string) {
  await db.delete(spots).where(eq(spots.id, id));
  revalidatePath("/spots");
  redirect("/spots");
}
