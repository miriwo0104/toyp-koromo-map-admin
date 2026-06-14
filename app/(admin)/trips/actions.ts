"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { trips } from "@/db/schema";

export async function createTrip(formData: FormData) {
  await db.insert(trips).values({
    title: formData.get("title") as string,
    area: formData.get("area") as string,
    pref: formData.get("pref") as string,
    visitedAt: formData.get("visitedAt") as string,
    nights: (formData.get("nights") as string) || null,
    lead: formData.get("lead") as string,
    body: (formData.get("body") as string) || null,
    youtubeId: (formData.get("youtubeId") as string) || null,
    published: formData.get("published") === "on",
  });
  revalidatePath("/trips");
  redirect("/trips");
}

export async function updateTrip(id: string, formData: FormData) {
  await db
    .update(trips)
    .set({
      title: formData.get("title") as string,
      area: formData.get("area") as string,
      pref: formData.get("pref") as string,
      visitedAt: formData.get("visitedAt") as string,
      nights: (formData.get("nights") as string) || null,
      lead: formData.get("lead") as string,
      body: (formData.get("body") as string) || null,
      youtubeId: (formData.get("youtubeId") as string) || null,
      published: formData.get("published") === "on",
      updatedAt: new Date(),
    })
    .where(eq(trips.id, id));
  revalidatePath("/trips");
  redirect("/trips");
}

export async function deleteTrip(id: string) {
  await db.delete(trips).where(eq(trips.id, id));
  revalidatePath("/trips");
  redirect("/trips");
}
