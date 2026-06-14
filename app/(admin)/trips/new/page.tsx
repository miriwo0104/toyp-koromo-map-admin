import { TripForm } from "../_components/TripForm";
import { createTrip } from "../actions";

export default function NewTripPage() {
  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-xl font-bold text-gray-900 mb-6">旅行を追加</h1>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <TripForm action={createTrip} />
      </div>
    </div>
  );
}
