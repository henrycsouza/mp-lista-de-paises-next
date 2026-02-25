import "./globals.css";

export const metadata = {
  title: "Countries Explorer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <header className="site-header">
          <div className="header-content">
            <span>🌎</span> Países do mundo
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}