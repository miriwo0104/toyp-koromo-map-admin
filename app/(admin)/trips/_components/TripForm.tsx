"use client";

import { type trips } from "@/db/schema";

type Trip = typeof trips.$inferSelect;

const field =
  "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent";

const label = "block text-sm font-medium text-gray-700 mb-1";

export function TripForm({
  trip,
  action,
}: {
  trip?: Trip | null;
  action: (formData: FormData) => Promise<void>;
}) {
  return (
    <form action={action} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className={label}>タイトル *</label>
          <input
            type="text"
            name="title"
            defaultValue={trip?.title}
            required
            className={field}
          />
        </div>
        <div>
          <label className={label}>エリア名 *</label>
          <input
            type="text"
            name="area"
            defaultValue={trip?.area}
            required
            placeholder="例: 軽井沢"
            className={field}
          />
        </div>
        <div>
          <label className={label}>都道府県 *</label>
          <input
            type="text"
            name="pref"
            defaultValue={trip?.pref}
            required
            placeholder="例: 長野県"
            className={field}
          />
        </div>
        <div>
          <label className={label}>訪問日 *</label>
          <input
            type="date"
            name="visitedAt"
            defaultValue={trip?.visitedAt ?? ""}
            required
            className={field}
          />
        </div>
        <div>
          <label className={label}>宿泊数</label>
          <input
            type="text"
            name="nights"
            defaultValue={trip?.nights ?? ""}
            placeholder="例: 1泊2日"
            className={field}
          />
        </div>
        <div className="col-span-2">
          <label className={label}>リード文（一覧カード用） *</label>
          <textarea
            name="lead"
            defaultValue={trip?.lead}
            required
            rows={2}
            className={field}
          />
        </div>
        <div className="col-span-2">
          <label className={label}>本文（旅行記）</label>
          <textarea
            name="body"
            defaultValue={trip?.body ?? ""}
            rows={6}
            className={field}
          />
        </div>
        <div className="col-span-2">
          <label className={label}>YouTube 動画ID</label>
          <input
            type="text"
            name="youtubeId"
            defaultValue={trip?.youtubeId ?? ""}
            placeholder="例: dQw4w9WgXcQ"
            className={field}
          />
        </div>
        <div className="col-span-2 flex items-center gap-2">
          <input
            type="checkbox"
            id="published"
            name="published"
            defaultChecked={trip?.published ?? false}
            className="rounded border-gray-300 text-orange-600"
          />
          <label htmlFor="published" className="text-sm text-gray-700">
            公開する
          </label>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          保存する
        </button>
        <a
          href="/trips"
          className="px-5 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg transition-colors"
        >
          キャンセル
        </a>
      </div>
    </form>
  );
}
