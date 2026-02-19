export const dynamic = "force-static";
import { getArticles, getCategories, getLayout, getInitData } from "@/lib/api";
import DefaultListLayout from "@/components/layouts/DefaultListLayout";

// 1. 全スラッグ × 全カテゴリーの組み合わせをリスト化してNext.jsに教える
export async function generateStaticParams() {
  const data = await getInitData();
  const paths = [];

  for (const m of data.modules) {
    try {
      const categories = await getCategories(m.slug);
      if (Array.isArray(categories)) {
        categories.forEach((c) => {
          paths.push({
            slug: m.slug,
            cat: String(c.id), // [cat] の部分。必ず文字列にする
          });
        });
      }
    } catch (e) {
      console.warn(`Skip category params for: ${m.slug}`);
    }
  }
  return paths;
}

// 2. 実際の表示処理
export default async function CategorySlugPage({ params }) {
  // searchParamsではなく params から取り出すのがポイント！
  const { slug, cat } = await params;

  const [layout, articles, categories] = await Promise.all([
    getLayout(slug),
    getArticles(slug, '', cat), // カテゴリーIDを渡して取得
    getCategories(slug)
  ]);

  const safeLayout = Array.isArray(layout) ? layout : [];
  const safeArticles = Array.isArray(articles) ? articles : [];
  const safeCategories = Array.isArray(categories) ? categories : [];

  return (
    <DefaultListLayout
      slug={slug}
      layout={safeLayout}
      articles={safeArticles}
      categories={safeCategories}
      cat={cat} // 現在選択中のカテゴリーID
    />
  );
}