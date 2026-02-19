import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getInitData } from "@/lib/api";
import "./globals.css";

export async function generateMetadata() {
  const data = await getInitData();
  return {
    title : {
      default: data.profile.SITE_NAME,
      template: `%s | ${data.profile.SITE_NAME}`,
    },
    description: data.profile.SITE_DESCRIPTION || "サイトの説明文",
    keywords: data.profile.KEYWORDS?.split(",") || [],
    openGraph: {
      type: "website",
      locale: "ja_JP",
      siteName: data.profile.SITE_NAME,
    },
    robots: {
      index: false,
      follow: false,
    }
  };
}

export default async function RootLayout({ children }) {
  const data = await getInitData();

  return (
    <html lang="ja">
      <body>
        <div id="allbox">
          <Header siteName={data.profile.SITE_NAME} menu={data.modules} />
          <main>{children}</main>
          <Footer siteName={data.profile.SITE_NAME} menu={data.modules} />
        </div>
      </body>
    </html>
  );
}
