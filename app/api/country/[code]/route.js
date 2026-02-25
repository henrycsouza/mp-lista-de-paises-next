export async function GET(request) {
  try {
    // pega o código da URL manualmente
    const { pathname } = new URL(request.url);
    const code = pathname.split("/").pop();

    const res = await fetch(
      `https://restcountries.com/v3.1/alpha/${code}`
    );

    if (!res.ok) {
      return new Response(
        JSON.stringify({ error: "País não encontrado" }),
        { status: 404 }
      );
    }

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Erro interno" }),
      { status: 500 }
    );
  }
}