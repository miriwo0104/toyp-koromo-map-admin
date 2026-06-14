import Link from "next/link";
import { db } from "@/db";
import { trips } from "@/db/schema";
import { desc } from "drizzle-orm";
import { deleteTrip } from "./actions";
import { DeleteButton } from "@/components/DeleteButton";

export default async function TripsPage() {
  const allTrips = await db
    .select()
    .from(trips)
    .orderBy(desc(trips.visitedAt));

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">旅の記録</h1>
        <Link
          href="/trips/new"
          className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          ＋ 新しい旅行を追加
        </Link>
      </div>

      {allTrips.length === 0 ? (
        <p className="text-gray-400 text-sm">旅行がまだありません。</p>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-5 py-3 font-medium text-gray-600">タイトル</th>
                <th className="text-left px-5 py-3 font-medium text-gray-600">エリア</th>
                <th className="text-left px-5 py-3 font-medium text-gray-600">都道府県</th>
                <th className="text-left px-5 py-3 font-medium text-gray-600">訪問日</th>
                <th className="text-left px-5 py-3 font-medium text-gray-600">公開</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {allTrips.map((trip) => (
                <tr key={trip.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-medium text-gray-900">{trip.title}</td>
                  <td className="px-5 py-3 text-gray-600">{trip.area}</td>
                  <td className="px-5 py-3 text-gray-600">{trip.pref}</td>
                  <td className="px-5 py-3 text-gray-600">{trip.visitedAt}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                        trip.published
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {trip.published ? "公開" : "非公開"}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right space-x-3">
                    <Link
                      href={`/trips/${trip.id}`}
                      className="text-orange-600 hover:text-orange-700 font-medium"
                    >
                      編集
                    </Link>
                    <DeleteButton
                      action={deleteTrip.bind(null, trip.id)}
                      confirmMessage={`「${trip.title}」を削除しますか？`}
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
