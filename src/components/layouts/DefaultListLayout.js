import Link from "next/link";

export default function DefaultListLayout({ slug, layout, articles, categories, cat }) {
  return (
    <div className="container mx-auto p-10">
      {layout.map((block) => {
        // --- カテゴリブロック（パターン6） ---
        if (block.layout_pattern === '6') {
          if (categories.length === 0) return null;
          return (
            <nav key={block.id} className="mb-8 p-4 rounded">
              <h3 className="font-bold mb-3">{block.name}</h3>
              <ul className="flex flex-wrap gap-4">
                <li>
                  <Link 
                    href={`/${slug}/`} 
                    className={!cat ? "text-blue-600 font-bold" : "text-gray-600"}
                  >
                    すべて
                  </Link>
                </li>
                {categories.map((c) => (
                  <li key={c.id}>
                    <Link 
                      href={`/${slug}/?cat=${c.id}`}
                      className={cat === c.id ? "text-blue-600 font-bold" : "text-gray-600"}
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          );
        }

        // --- メイン一覧部分 ---
        if (block.mod_name === 'MODULE_TITLE_FLG') {
          const currentCat = categories.find(c => c.id === cat);
          return (
            <section key={block.id} className="mt-10">
              <h2 className="text-2xl font-bold mb-6 border-b pb-2">
                {slug.toUpperCase()} 
                {currentCat ? `：${currentCat.name}` : ' 一覧'}
              </h2>
              
              <div className="grid gap-4">
                {articles.length > 0 ? (
                  articles.map((item) => (
                    <Link 
                      key={item.id} 
                      href={`/${slug}/${item.id}`} // 詳細ページへ
                      className="flex gap-4 p-4 border rounded hover:bg-gray-50 transition"
                    >
                      <img src={item.thumb} alt="" className="w-24 h-24 object-cover rounded" />
                      <div>
                        <h3 className="font-bold text-lg">{item.title}</h3>
                        <p className="text-sm text-gray-500">{item.date}</p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-gray-500">記事が見つかりませんでした。</p>
                )}
              </div>
            </section>
          );
        }
        return null;
      })}
    </div>
  )
}