import { config } from "dotenv";
config({ path: ".env.local" });

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const client = postgres(process.env.DATABASE_URL!, { ssl: "require" });
const db = drizzle(client, { schema });

// ─── Seed Data ───────────────────────────────────────────────────────────────

const tripsData: (typeof schema.trips.$inferInsert)[] = [
  {
    title: "軽井沢で高原さんぽ",
    area: "軽井沢",
    pref: "長野県",
    visitedAt: "2025-09-01",
    nights: "1泊2日",
    lead: "湖畔の庭園、丘の上のカフェ、森のコテージ。涼しい高原をころもとのんびり歩いた2日間。",
    body: null,
    thumbnailUrl: null,
    youtubeId: null,
    published: true,
  },
  {
    title: "伊豆高原 海さんぽ",
    area: "伊豆高原",
    pref: "静岡県",
    visitedAt: "2025-06-01",
    nights: "1泊2日",
    lead: "断崖のつり橋から海の見えるカフェ、貸切露天の宿へ。潮風を浴びた初夏の伊豆。",
    body: null,
    thumbnailUrl: null,
    youtubeId: null,
    published: true,
  },
  {
    title: "河口湖 富士山ビュー旅",
    area: "河口湖",
    pref: "山梨県",
    visitedAt: "2025-04-01",
    nights: "1泊2日",
    lead: "どこへ行っても富士山。芝生の公園、絶景ドッグラン、湖畔のペンションを巡る春旅。",
    body: null,
    thumbnailUrl: null,
    youtubeId: null,
    published: true,
  },
  {
    title: "那須高原 のんびりリゾート",
    area: "那須高原",
    pref: "栃木県",
    visitedAt: "2024-10-01",
    nights: "1泊2日",
    lead: "動物パーク、湖畔テラス、ドッグラン直結のリゾート。すべて犬と一緒の那須旅。",
    body: null,
    thumbnailUrl: null,
    youtubeId: null,
    published: true,
  },
];

const spotsData: (typeof schema.spots.$inferInsert & { _tripIndex: number; _position: number; _timeLabel: string; _note: string | null })[] = [
  // 軽井沢
  {
    _tripIndex: 0, _position: 1, _timeLabel: "1日目 / 午前", _note: "到着後すぐ湖畔の庭園へ。芝生でウォームアップ。",
    name: "軽井沢タリアセン",
    category: "nature",
    area: "軽井沢",
    pref: "長野県",
    lead: "塩沢湖を囲む広い庭園。湖畔の芝生をころもと散歩できる、軽井沢らしい一日のはじまり。",
    body: "塩沢湖を中心に美術館やレストランが点在する庭園エリア。リードを付けていれば園内のほとんどを一緒に歩けます。湖畔の芝生が広く、トイプードルでも歩きやすい平坦な道。朝早い時間帯は人も少なく、ころもものびのび。",
    address: null, lat: null, lng: null,
    websiteUrl: null, youtubeId: null,
    tips: ["朝9時台は空いていて写真も撮りやすい", "湖畔は風が出るので秋以降は薄手の服を1枚", "園内は飲食店のテラスのみ同伴可"],
    dogTags: ["ドッグラン有", "ノーリードエリア有", "テラス席可"],
    published: true,
  },
  {
    _tripIndex: 0, _position: 2, _timeLabel: "1日目 / お昼", _note: "丘の上のカフェでランチ。犬用プレートにころも大満足。",
    name: "丘の上のドッグカフェ",
    category: "cafe",
    area: "軽井沢",
    pref: "長野県",
    lead: "テラスからカラマツ林を望むカフェ。犬用プレートがあり、ころもも一緒にランチ。",
    body: "旧軽井沢から少し外れた静かな丘の上。店内・テラスとも犬同伴OKで、犬用のさつまいもプレートが人気です。土日のお昼は混むので、開店直後か14時以降がねらい目。",
    address: null, lat: null, lng: null,
    websiteUrl: null, youtubeId: null,
    tips: ["犬用プレートは数量限定、早めの来店が安心", "店内は段差が少なくカートでも入りやすい", "水飲み場あり"],
    dogTags: ["店内同伴OK", "テラス席可", "おやつ提供"],
    published: true,
  },
  {
    _tripIndex: 0, _position: 3, _timeLabel: "1日目 / 夕方", _note: "森のコテージにチェックイン。専用ランで遊んでから焚き火。",
    name: "森のペット可コテージ",
    category: "stay",
    area: "軽井沢",
    pref: "長野県",
    lead: "一棟貸しのコテージ。専用の小さなドッグランがあり、夜は焚き火を囲んで。",
    body: "客室から直接出られる専用ドッグラン付きのコテージ。室内は床がフローリングだけど滑り止めマットの貸出があり、トイプードルの足腰にもやさしい設計。貸切風呂で旅の疲れを癒せます。",
    address: null, lat: null, lng: null,
    websiteUrl: null, youtubeId: null,
    tips: ["滑り止めマットは無料貸出（フロントで申告）", "夜は冷えるので犬用の上着があると安心", "近くにコンビニはないので食材は手前で調達"],
    dogTags: ["店内同伴OK", "ドッグラン有", "貸切風呂", "小型犬向け"],
    published: true,
  },
  // 伊豆高原
  {
    _tripIndex: 1, _position: 1, _timeLabel: "1日目 / 午前", _note: "まずは城ヶ崎海岸へ。つり橋はころもを抱っこで。",
    name: "城ヶ崎海岸 門脇つり橋",
    category: "sight",
    area: "伊豆高原",
    pref: "静岡県",
    lead: "断崖に架かるつり橋と、潮風の遊歩道。海を背景にころもの記念写真を。",
    body: "溶岩がつくった断崖絶壁に架かる門脇つり橋。橋はリード必須ですが、犬連れで渡れます。遊歩道は整備されていて歩きやすく、海の眺めが抜群。",
    address: null, lat: null, lng: null,
    websiteUrl: null, youtubeId: null,
    tips: ["つり橋は揺れるので怖がる子は抱っこで", "夏の地面は熱くなるので朝夕がおすすめ", "遊歩道は一部岩場、肉球ケアを"],
    dogTags: ["ノーリードエリア有", "テラス席可"],
    published: true,
  },
  {
    _tripIndex: 1, _position: 2, _timeLabel: "1日目 / お昼", _note: "海の見えるカフェでランチ＆ドッグラン。",
    name: "海の見えるドッグカフェ",
    category: "cafe",
    area: "伊豆高原",
    pref: "静岡県",
    lead: "相模灘を一望するテラス席。食後はそのまま海沿いのドッグランへ。",
    body: "高台にあり、テラスからは相模灘が広がります。併設のドッグランは芝生で、ランチのあとに少し遊ばせるのにちょうど良いサイズ。犬用メニューも充実していて、ささみのおやつが人気。",
    address: null, lat: null, lng: null,
    websiteUrl: null, youtubeId: null,
    tips: ["小型犬専用タイムは平日午前", "テラスはひざ掛けの貸出あり", "海風が強い日は店内席へ"],
    dogTags: ["店内同伴OK", "テラス席可", "ドッグラン有", "おやつ提供"],
    published: true,
  },
  {
    _tripIndex: 1, _position: 3, _timeLabel: "1日目 / 夕方", _note: "貸切露天の宿へ。部屋食でゆっくり。",
    name: "貸切露天のペット宿",
    category: "stay",
    area: "伊豆高原",
    pref: "静岡県",
    lead: "客室で一緒に眠れる温泉宿。夕食は部屋食で、気兼ねなくころもと過ごせる。",
    body: "全室に犬用アメニティ（食器・トイレシート・消臭剤）が揃う温泉宿。夕食は部屋食なので、食事中もころもと一緒。貸切の露天風呂は予約制で、湯上がりに客室のテラスで涼めます。",
    address: null, lat: null, lng: null,
    websiteUrl: null, youtubeId: null,
    tips: ["貸切露天は到着時に予約を", "犬用ベッドは数に限りあり、普段の寝具を持参すると安心", "館内はカート移動が基本"],
    dogTags: ["店内同伴OK", "貸切風呂", "小型犬向け", "おやつ提供"],
    published: true,
  },
  // 河口湖
  {
    _tripIndex: 2, _position: 1, _timeLabel: "1日目 / 午前", _note: "大石公園で富士山と記念撮影。",
    name: "大石公園 富士見の芝生",
    category: "nature",
    area: "河口湖",
    pref: "山梨県",
    lead: "河口湖越しに富士山。季節の花畑とのコントラストが映える絶景スポット。",
    body: "河口湖の北岸にある公園で、富士山を真正面に望めます。季節ごとにラベンダーやコキアが彩り、犬連れの記念写真の定番。湖畔の遊歩道は平坦で歩きやすく、ベンチも多め。",
    address: null, lat: null, lng: null,
    websiteUrl: null, youtubeId: null,
    tips: ["富士山がきれいなのは空気の澄んだ朝", "花畑のシーズンは混むので早めに", "湖風が冷たいので一枚羽織りを"],
    dogTags: ["ノーリードエリア有", "テラス席可"],
    published: true,
  },
  {
    _tripIndex: 2, _position: 2, _timeLabel: "1日目 / お昼", _note: "富士見ドッグガーデンで走り回る。",
    name: "富士見ドッグガーデン",
    category: "nature",
    area: "河口湖",
    pref: "山梨県",
    lead: "富士山を眺めながら走れる大きなドッグラン。小型犬エリアが分かれていて安心。",
    body: "標高が高く、富士山を背景に走れる開放的なドッグラン。小型犬・大型犬でエリアが分かれていて、ころものような小型犬も安心して遊べます。夏でも涼しく、避暑をかねた立ち寄りに最適。",
    address: null, lat: null, lng: null,
    websiteUrl: null, youtubeId: null,
    tips: ["小型犬エリアは入口左手", "夏も朝晩は冷えるので上着を", "ワクチン証明の提示が必要な場合あり"],
    dogTags: ["ドッグラン有", "小型犬向け", "大型犬可", "おやつ提供"],
    published: true,
  },
  {
    _tripIndex: 2, _position: 3, _timeLabel: "1日目 / 夕方", _note: "湖畔のペンションへ。手作り夕食に舌鼓。",
    name: "湖畔のドッグペンション",
    category: "stay",
    area: "河口湖",
    pref: "山梨県",
    lead: "オーナー手作りの夕食と、貸切ドッグラン。家庭的であたたかい一棟宿。",
    body: "河口湖のほとりにある小さなペンション。宿泊者専用の貸切ドッグランがあり、人目を気にせず遊ばせられます。夕食はオーナー手作りの洋食コースで、犬用の取り分けメニューも。",
    address: null, lat: null, lng: null,
    websiteUrl: null, youtubeId: null,
    tips: ["貸切ドッグランは時間制、チェックイン時に枠を確認", "暖炉のそばは床が暖かくおすすめ", "朝の散歩コースを教えてもらえる"],
    dogTags: ["店内同伴OK", "ドッグラン有", "おやつ提供", "小型犬向け"],
    published: true,
  },
  // 那須高原
  {
    _tripIndex: 3, _position: 1, _timeLabel: "1日目 / 午前", _note: "動物ふれあい園で一日遊ぶ。",
    name: "那須高原の動物ふれあい園",
    category: "sight",
    area: "那須高原",
    pref: "栃木県",
    lead: "犬と一緒に入れる動物テーマパーク。屋内エリアが多く雨の日でも楽しめる。",
    body: "犬連れで入園できる動物テーマパーク。屋内エリアが充実していて、天気が崩れても楽しめます。園内はカート移動がしやすく、ドッグランも併設。",
    address: null, lat: null, lng: null,
    websiteUrl: null, youtubeId: null,
    tips: ["カートの貸出は数に限りあり", "屋内エリアは段差が少なく快適", "ショー会場はリード短めで"],
    dogTags: ["店内同伴OK", "テラス席可", "ドッグラン有"],
    published: true,
  },
  {
    _tripIndex: 3, _position: 2, _timeLabel: "1日目 / お昼", _note: "りんどう湖のテラスでランチ＆ボート。",
    name: "りんどう湖の湖畔テラス",
    category: "cafe",
    area: "那須高原",
    pref: "栃木県",
    lead: "湖を眺めるテラスでひと休み。遊覧ボートにも犬と一緒に乗れる。",
    body: "りんどう湖を望むテラスカフェ。犬と一緒に遊覧ボートに乗れるのがここならでは。テラスでは地元のソフトクリームが人気で、犬用のおやつも販売しています。",
    address: null, lat: null, lng: null,
    websiteUrl: null, youtubeId: null,
    tips: ["ボートはライフジャケット着用が安心", "テラスは日陰の席が涼しい", "夕方は湖面が穏やかで写真向き"],
    dogTags: ["テラス席可", "おやつ提供", "ドッグラン有"],
    published: true,
  },
  {
    _tripIndex: 3, _position: 3, _timeLabel: "1日目 / 夕方", _note: "ドッグリゾートにチェックイン。温泉でほっこり。",
    name: "高原のドッグリゾート",
    category: "stay",
    area: "那須高原",
    pref: "栃木県",
    lead: "ドッグラン直結の客室。温泉も食事もすべて犬と一緒の本格リゾート。",
    body: "客室から直接ドッグランに出られる本格的なドッグリゾート。レストランも犬同伴OKで、コース料理を一緒に楽しめます。温泉は貸切利用ができ、湯上がりに犬用の休憩スペースも。",
    address: null, lat: null, lng: null,
    websiteUrl: null, youtubeId: null,
    tips: ["人気宿のため週末は早めの予約を", "客室直結ランは小型犬も安心", "館内移動はカートが便利"],
    dogTags: ["店内同伴OK", "ドッグラン有", "貸切風呂", "大型犬可", "おやつ提供"],
    published: true,
  },
];

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log("🌱 Seeding database...");

  // 既存データを削除（trip_spots → spot_images → spots → trips の順）
  await db.delete(schema.tripSpots);
  await db.delete(schema.spotImages);
  await db.delete(schema.spots);
  await db.delete(schema.trips);
  console.log("  ✓ Cleared existing data");

  // trips を挿入
  const insertedTrips = await db.insert(schema.trips).values(tripsData).returning();
  console.log(`  ✓ Inserted ${insertedTrips.length} trips`);

  // spots を挿入 & trip_spots を作成
  for (const { _tripIndex, _position, _timeLabel, _note, ...spotData } of spotsData) {
    const [insertedSpot] = await db.insert(schema.spots).values(spotData).returning();

    await db.insert(schema.tripSpots).values({
      tripId: insertedTrips[_tripIndex].id,
      spotId: insertedSpot.id,
      position: _position,
      timeLabel: _timeLabel,
      note: _note,
    });
  }
  console.log(`  ✓ Inserted ${spotsData.length} spots with timeline`);

  console.log("✅ Seed complete!");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
