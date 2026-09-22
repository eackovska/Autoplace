import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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

export const metadata: Metadata = {
  title: "Top Cars",
  description: "Discover the best cars in town",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <nav className="navbar">
          <div className="logo">
            <Link href="/">
              <img src="/logo.png" alt="Logo"/>
              </Link>
          </div>

          <div className="nav-links">
            <a href="/">Почетна</a>
            <a href="/cars">Автомобили</a>
            <a href="/about">За Нас</a>
            <a href="/services">Услуги</a>
            <a href="/news">Новости</a>
            <a href="/contact">Контакт</a>
          </div>

          <Link href="/contact">Контактирај нè</Link>
        </nav>

        <main className="flex-1">{children}</main>

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-col">
              <img src="/logo.png" alt="Logo" className="footer-logo"/>
              <p>Проверени возила по најдобри цени. Безбедно, брзо и лесно!</p>
            </div>

            <div className="footer-col">
              <h4>Локација</h4>
              <p>
                <a href="https://maps.app.goo.gl/U9PW74M4YhTwLx3K7" target="_blank" rel="noopener noreferrer" className="footer-maps">ул. Шишка бр. 47
                <br/>
                Кавадарци, Македонија
                </a>
              </p>
            </div>

            <div className="footer-col">
              <h4>Контакт</h4>
              <p>
                Тел: 078 513 569
              </p>
              <p>Пон - Пет: 08:00 - 15:00</p>
              <p>Пауза: 11:00 - 11:30</p>
              <p>Саб: 08:00 - 13:00</p>
              <a href="https://www.facebook.com/p/TOP-CARS-100026836156246/" target="_blank" rel="noopener noreferrer" className="footer-facebook">Посети нè на Facebook</a>
            </div>

            <div className="footer-col">
              <h4>Брзи линкови</h4>
              <Link href="/">Почетна</Link>
              <Link href="/cars">Автомобили</Link>
              <Link href="/about">За Нас</Link>
              <Link href="/services">Услуги</Link>
              <Link href="/news">Новости</Link>
              <Link href="/contact">Контакт</Link>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Автоплац TopCars. Сите права задржани.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
