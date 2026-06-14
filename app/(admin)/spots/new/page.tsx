import { SpotForm } from "../_components/SpotForm";
import { createSpot } from "../actions";

export default function NewSpotPage() {
  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-xl font-bold text-gray-900 mb-6">スポットを追加</h1>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <SpotForm action={createSpot} />
      </div>
    </div>
  );
}
