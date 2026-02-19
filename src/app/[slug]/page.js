export const dynamic = "force-static";
import { getArticles, getCategories, getLayout, getInitData } from "@/lib/api";
import DefaultListLayout from "@/components/layouts/DefaultListLayout";
import ContactLayout from "@/components/layouts/ContactLayout";

export async function generateStaticParams() {
  const data = await getInitData();

  return data.modules.map((m) => ({
    slug: m.slug,
  }));
}

export default async function SlugPage({ params, searchParams }) {
  const { slug } = await params;
  const { cat } = await searchParams;
  console.log(cat);

  const initData = await getInitData();
  const contentConfig = initData.modules?.find(m => m.slug === slug);
  const isContact = contentConfig?.module === 'content7' || contentConfig?.id === 'content7';

  if (isContact) {
    const layout = await getLayout(slug);
    return <ContactLayout slug={slug} layout={layout} />;
  }

  const [layout, articles, categories] = await Promise.all([
    getLayout(slug),
    getArticles(slug, '', cat),
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
      cat={cat}
    />
  );
}