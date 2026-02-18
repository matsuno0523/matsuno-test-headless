import { getArticles } from "@/lib/api";

export default async function DetailPage({ params }) {
  const { slug, id } = await params;
  
  // 特定のIDの記事だけを取得 (APIのpost_idパラメータを利用)
  const articles = await getArticles(slug, id);
  const article = articles?.[0];

  if (!article) return <div>記事が見つかりません</div>;

  return (
    <div className="container mx-auto p-10 text-red-500">
      {/* 共通の「詳細ページデザイン」をここに書く */}
      <h1 className="text-4xl font-bold">{article.title}</h1>
      <div className="mt-8" dangerouslySetInnerHTML={{ __html: article.body }} />
    </div>
  );
}