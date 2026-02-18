import Link from "next/link";

export default function Header({ siteName, menu }) {
  return (
    <header className="flex items-center justify-between p-4 border-b shadow-sm">
      <h1 className="text-xl font-bold">
        <Link href="/">{siteName}</Link>
      </h1>
      <nav>
        <ul className="flex gap-4">
          {menu
            ?.filter((item) => item.turn < 90 && item.id !== "home")
            .map((item) => (
              <li key={item.id}>
                <Link 
                  href={`/${item.slug}`} 
                  className="text-gray-600 hover:text-blue-500 transition"
                >
                  {item.name}
                </Link>
              </li>
            ))
          }
        </ul>
      </nav>
    </header>
  );
}