import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { trips } from "@/db/schema";
import { TripForm } from "../_components/TripForm";
import { updateTrip, deleteTrip } from "../actions";
import { DeleteButton } from "@/components/DeleteButton";

export default async function EditTripPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [trip] = await db.select().from(trips).where(eq(trips.id, id));
  if (!trip) notFound();

  const update = updateTrip.bind(null, id);

  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">旅行を編集</h1>
        <DeleteButton
          action={deleteTrip.bind(null, id)}
          confirmMessage="この旅行を削除しますか？"
          variant="outline"
        />
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <TripForm trip={trip} action={update} />
      </div>
    </div>
  );
}
