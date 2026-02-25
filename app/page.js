import Link from "next/link";

async function getCountries() {
  const res = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,cca3,translations");
  return res.json();
}

export default async function Home() {
  const countries = await getCountries();
  const sorted = countries.sort((a, b) => 
    (a.translations?.por?.common || a.name.common).localeCompare(b.translations?.por?.common || b.name.common)
  );

  return (
    <main className="container">
      {/* REMOVIDO: h1 que causava a duplicidade */}
      <div className="country-grid">
        {sorted.map((country) => (
          <Link key={country.cca3} href={`/country/${country.cca3}`} className="card">
            <img src={country.flags.svg} alt={country.name.common} className="flag" />
            <h2 className="country-name">{country.translations?.por?.common || country.name.common}</h2>
          </Link>
        ))}
      </div>
    </main>
  );
}