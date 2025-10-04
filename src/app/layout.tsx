import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <SmoothScroll/>
        {children}
        <Footer />
      </body>
    </html>
  );
}
