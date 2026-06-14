import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { spots } from "@/db/schema";
import { SpotForm } from "../_components/SpotForm";
import { updateSpot, deleteSpot } from "../actions";
import { DeleteButton } from "@/components/DeleteButton";

export default async function EditSpotPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [spot] = await db.select().from(spots).where(eq(spots.id, id));
  if (!spot) notFound();

  const update = updateSpot.bind(null, id);

  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">スポットを編集</h1>
        <DeleteButton
          action={deleteSpot.bind(null, id)}
          confirmMessage="このスポットを削除しますか？"
          variant="outline"
        />
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <SpotForm spot={spot} action={update} />
      </div>
    </div>
  );
}
