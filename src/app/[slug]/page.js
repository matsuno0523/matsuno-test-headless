import { getArticles, getCategories, getLayout, getInitData } from "@/lib/api";
import DefaultListLayout from "@/components/layouts/DefaultListLayout";
import ContactLayout from "@/components/layouts/ContactLayout";

export default async function SlugPage({ params, searchParams }) {
  const { slug } = await params;
  const { cat } = await searchParams;

  const [initData, layout, articles, categories] = await Promise.all([
    getInitData(),
    getLayout(slug),
    getArticles(slug, '', cat),
    getCategories(slug)
  ]);

  const contentConfig = initData.modules?.find(m => m.slug === slug);
  const isContact = contentConfig?.module === 'content7' || contentConfig?.id === 'content7';

  if (isContact) {
    return <ContactLayout slug={slug} layout={layout} />;
  }

  return (
    <DefaultListLayout
      slug={slug}
      layout={layout}
      articles={articles}
      categories={categories}
      cat={cat}
    />
  );
}