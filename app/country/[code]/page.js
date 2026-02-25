import Link from "next/link";
import { notFound } from "next/navigation";

function formatPopulation(number) {
  if (number >= 1000000) return (number / 1000000).toFixed(1) + "M";
  if (number >= 1000) return (number / 1000).toFixed(1) + "K";
  return number;
}

async function getCountryData(code) {
  const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
  if (!res.ok) return null;
  const data = await res.json();
  return data[0];
}

export default async function CountryDetail({ params }) {
  const { code } = await params;
  const country = await getCountryData(code);

  if (!country) notFound();

  let borders = [];
  if (country.borders) {
    const res = await fetch(`https://restcountries.com/v3.1/alpha?codes=${country.borders.join(",")}`);
    borders = await res.json();
  }

  return (
    <main className="container">
      <h1 className="country-title">{country.translations?.por?.common || country.name.common}</h1>
      
      <Link href="/" className="back-btn">← Voltar</Link>

      <div className="country-card">
        <div className="country-info">
          <p><strong>🏙️ Capital:</strong> {country.capital?.[0] || "N/A"}</p>
          <p><strong>🌍 Continente:</strong> {country.continents?.join(", ")}</p>
          <p><strong>👨‍👩‍👧‍👦 População:</strong> {formatPopulation(country.population)}</p>
          <p><strong>🗣️ Línguas faladas:</strong></p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '10px' }}>
            {Object.values(country.languages || {}).map(lang => (
              <span key={lang} className="language-badge">{lang}</span>
            ))}
          </div>
        </div>

        {/* Imagem agora no lado direito por conta do grid no CSS */}
        <img src={country.flags.svg} alt="Bandeira" className="country-flag-large" />
      </div>

      <section className="border-section">
        <h3>Países que fazem fronteira</h3>
        <div className="country-grid">
          {borders.map((b) => (
            <Link key={b.cca3} href={`/country/${b.cca3}`} className="card">
              <img src={b.flags.svg} className="flag" alt="" />
              <div className="country-name">{b.translations?.por?.common || b.name.common}</div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}