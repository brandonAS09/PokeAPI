const URL_BASE = 'https://pokeapi.co/api/v2';

export const getPokemonList = async (limit: number) => {
    const response = await fetch(`${URL_BASE}/pokemon?limit=${limit}`);

    if (!response.ok) {
        throw new Error("Error al traer la lista de pokemons");
    }

    return response.json();
};

export const getPokemonDetalle = async (url: string) => {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Error al traer el detalle del pokemon");
    }
    return response.json();
}