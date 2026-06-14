"use client";

import { type spots } from "@/db/schema";

type Spot = typeof spots.$inferSelect;

const field =
  "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent";
const label = "block text-sm font-medium text-gray-700 mb-1";

const CATEGORIES = [
  { value: "stay", label: "宿・ホテル" },
  { value: "cafe", label: "カフェ・グルメ" },
  { value: "nature", label: "公園・自然" },
  { value: "sight", label: "観光・体験" },
];

const DOG_TAGS = [
  "店内同伴OK",
  "ドッグラン有",
  "テラス席可",
  "小型犬向け",
  "大型犬可",
  "ノーリードエリア有",
  "貸切風呂",
  "おやつ提供",
];

export function SpotForm({
  spot,
  action,
}: {
  spot?: Spot | null;
  action: (formData: FormData) => Promise<void>;
}) {
  return (
    <form action={action} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className={label}>スポット名 *</label>
          <input
            type="text"
            name="name"
            defaultValue={spot?.name}
            required
            className={field}
          />
        </div>

        <div>
          <label className={label}>種別 *</label>
          <select name="category" defaultValue={spot?.category} required className={field}>
            <option value="">選択してください</option>
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={label}>エリア名 *</label>
          <input
            type="text"
            name="area"
            defaultValue={spot?.area}
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
            defaultValue={spot?.pref}
            required
            placeholder="例: 長野県"
            className={field}
          />
        </div>

        <div>
          <label className={label}>住所</label>
          <input
            type="text"
            name="address"
            defaultValue={spot?.address ?? ""}
            className={field}
          />
        </div>

        <div>
          <label className={label}>緯度</label>
          <input
            type="number"
            step="any"
            name="lat"
            defaultValue={spot?.lat ?? ""}
            placeholder="例: 36.348"
            className={field}
          />
        </div>

        <div>
          <label className={label}>経度</label>
          <input
            type="number"
            step="any"
            name="lng"
            defaultValue={spot?.lng ?? ""}
            placeholder="例: 138.592"
            className={field}
          />
        </div>

        <div className="col-span-2">
          <label className={label}>リード文（一覧カード用） *</label>
          <textarea
            name="lead"
            defaultValue={spot?.lead}
            required
            rows={2}
            className={field}
          />
        </div>

        <div className="col-span-2">
          <label className={label}>詳細説明</label>
          <textarea
            name="body"
            defaultValue={spot?.body ?? ""}
            rows={5}
            className={field}
          />
        </div>

        <div className="col-span-2">
          <label className={label}>行く前メモ（1行1項目）</label>
          <textarea
            name="tips"
            defaultValue={spot?.tips?.join("\n") ?? ""}
            rows={3}
            placeholder={"朝9時台は空いていて写真も撮りやすい\n湖畔は風が出るので薄手の服を1枚"}
            className={field}
          />
        </div>

        <div>
          <label className={label}>公式サイト URL</label>
          <input
            type="url"
            name="websiteUrl"
            defaultValue={spot?.websiteUrl ?? ""}
            placeholder="https://..."
            className={field}
          />
        </div>

        <div>
          <label className={label}>YouTube 動画ID</label>
          <input
            type="text"
            name="youtubeId"
            defaultValue={spot?.youtubeId ?? ""}
            placeholder="例: dQw4w9WgXcQ"
            className={field}
          />
        </div>

        <div className="col-span-2">
          <label className={label}>犬OK条件</label>
          <div className="grid grid-cols-2 gap-2 mt-1">
            {DOG_TAGS.map((tag) => (
              <label key={tag} className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  name="dogTags"
                  value={tag}
                  defaultChecked={spot?.dogTags?.includes(tag) ?? false}
                  className="rounded border-gray-300 text-orange-600"
                />
                {tag}
              </label>
            ))}
          </div>
        </div>

        <div className="col-span-2 flex items-center gap-2">
          <input
            type="checkbox"
            id="published"
            name="published"
            defaultChecked={spot?.published ?? false}
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
          href="/spots"
          className="px-5 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg transition-colors"
        >
          キャンセル
        </a>
      </div>
    </form>
  );
}
