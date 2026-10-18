import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import Link from "next/link";
import { getDictionary } from "@/lib/i18n";
import "./globals.css";
import "./footer.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Top Cars",
  description: "Discover the best cars in town",
};

export default async function RootLayout({
  children,
}: LayoutProps<"/">) {
  const { locale, t } = await getDictionary();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className={`${montserrat.className} min-h-full flex flex-col`}>
        <nav className="navbar">
          <div className="logo">
            <Link href="/">
              <img src="/logo.png" alt="Logo"/>
              </Link>
          </div>

          <div className="nav-links">
            <a href="/">{t.nav.home}</a>
            <a href="/cars">{t.nav.cars}</a>
            <a href="/about">{t.nav.about}</a>
            <a href="/services">{t.nav.services}</a>
            <a href="/news">{t.nav.news}</a>
            <a href="/contact">{t.nav.contact}</a>
          </div>

          <div className="nav-right">
            <div className="lang-switch">
              <a href="/api/set_locale?lang=mk" className={locale === "mk" ? "lang-active" : ""} aria-label="Македонски" title="Македонски">
                <img src="republic-of-macedonia.png" alt="MK"/>
              </a>
              <a href="/api/set_locale?lang=en" className={locale === "en" ? "lang-active" : ""} aria-label="English" title="English">
                <img src="united-kingdom.png" alt="UK"/>
              </a>
            </div>

            <Link href="/contact" className="nav-button">{t.nav.contactButton}</Link>
          </div>
        </nav>

        <main className="flex-1">{children}</main>

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-col">
              <img src="/logo.png" alt="Logo" className="footer-logo"/>
              <p>{t.footer.tagline}</p>
            </div>

            <div className="footer-col">
              <h4>{t.footer.location}</h4>
              <p>
                <a href="https://maps.app.goo.gl/U9PW74M4YhTwLx3K7" target="_blank" rel="noopener noreferrer" className="footer-maps">{t.footer.addressLine1}
                <br/>
                {t.footer.addressLine2}
                </a>
              </p>
            </div>

            <div className="footer-col">
              <h4>{t.footer.contact}</h4>
              <p>
                {t.footer.phone}
              </p>
              <p>{t.footer.hoursLine1}</p>
              <p>{t.footer.hoursLine2}</p>
              <p>{t.footer.hoursLine3}</p>
              <a href="https://www.facebook.com/p/TOP-CARS-100026836156246/" target="_blank" rel="noopener noreferrer" className="footer-facebook">{t.footer.facebook}</a>
            </div>

            <div className="footer-col">
              <h4>{t.footer.quickLinks}</h4>
              <Link href="/">{t.nav.home}</Link>
              <Link href="/cars">{t.nav.cars}</Link>
              <Link href="/about">{t.nav.about}</Link>
              <Link href="/services">{t.nav.services}</Link>
              <Link href="/news">{t.nav.news}</Link>
              <Link href="/contact">{t.nav.contact}</Link>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Автоплац TopCars. {t.footer.rights}</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
