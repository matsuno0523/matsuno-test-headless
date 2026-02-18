import Link from "next/link";

export default function Footer({ siteName, menu }) {
  return (
    <footer className="p-4 border-b shadow-sm">
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
      <p>&copy; 2025 {siteName}</p>
    </footer>
  );
}