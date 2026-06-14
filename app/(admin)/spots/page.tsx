import Link from "next/link";
import { db } from "@/db";
import { spots } from "@/db/schema";
import { desc } from "drizzle-orm";
import { deleteSpot } from "./actions";
import { DeleteButton } from "@/components/DeleteButton";

const CATEGORY_LABEL: Record<string, string> = {
  stay: "宿・ホテル",
  cafe: "カフェ・グルメ",
  nature: "公園・自然",
  sight: "観光・体験",
};

export default async function SpotsPage() {
  const allSpots = await db.select().from(spots).orderBy(desc(spots.createdAt));

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">スポット</h1>
        <Link
          href="/spots/new"
          className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          ＋ スポットを追加
        </Link>
      </div>

      {allSpots.length === 0 ? (
        <p className="text-gray-400 text-sm">スポットがまだありません。</p>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-5 py-3 font-medium text-gray-600">スポット名</th>
                <th className="text-left px-5 py-3 font-medium text-gray-600">種別</th>
                <th className="text-left px-5 py-3 font-medium text-gray-600">エリア</th>
                <th className="text-left px-5 py-3 font-medium text-gray-600">都道府県</th>
                <th className="text-left px-5 py-3 font-medium text-gray-600">公開</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {allSpots.map((spot) => (
                <tr key={spot.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-medium text-gray-900">{spot.name}</td>
                  <td className="px-5 py-3 text-gray-600">
                    {CATEGORY_LABEL[spot.category] ?? spot.category}
                  </td>
                  <td className="px-5 py-3 text-gray-600">{spot.area}</td>
                  <td className="px-5 py-3 text-gray-600">{spot.pref}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                        spot.published
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {spot.published ? "公開" : "非公開"}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right space-x-3">
                    <Link
                      href={`/spots/${spot.id}`}
                      className="text-orange-600 hover:text-orange-700 font-medium"
                    >
                      編集
                    </Link>
                    <DeleteButton
                      action={deleteSpot.bind(null, spot.id)}
                      confirmMessage={`「${spot.name}」を削除しますか？`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
