import { useEffect, useState } from "react";
import { usePokemon } from "../hooks/usePokemon";
import PokeTarjeta from "../components/pokeTarjeta";

function Home() {

    const { pokemons, cargando, error, fetchAllPokemons } = usePokemon();
    const [busqueda, setBusqueda] = useState("");
    const [tipoFiltro, setTipoFiltro] = useState("");

    useEffect(() => { fetchAllPokemons(); }, []);

    const pokemonsFiltrados = pokemons.filter((pokemon) => {
        const coincideNombre = pokemon.name.toLowerCase().includes(busqueda.toLowerCase());
        const coincideTipo = tipoFiltro === "" || pokemon.types.some((t) => t.type.name === tipoFiltro);
        return coincideNombre && coincideTipo;
    });

    if (cargando) {
        return <h1>Cargando pokémons...</h1>;
    }

    if (error) {
        return <h1>{error}</h1>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1>Pokédex</h1>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }} >
                <input type="text" placeholder="Buscar Pokémon..." value={busqueda} onChange={(e) => setBusqueda(e.target.value) } style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc', width: '250px' }} />
                <select value={tipoFiltro} onChange={(e) => setTipoFiltro(e.target.value) } style={{ padding: '10px', borderRadius: '8px' }} >
                    <option value="">Todos</option>
                    <option value="fire">Fuego</option>
                    <option value="water">Agua</option>
                    <option value="grass">Planta</option>
                    <option value="electric">Rayo</option>
                    <option value="psychic">Psiquico</option>
                    <option value="rock">Piedra</option>
                    <option value="ghost">Fantasma</option>
                </select>
            </div>
            {
                pokemonsFiltrados.length === 0 ? (<h2>No se encontraron pokémons</h2>) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px' }} >
                        {
                            pokemonsFiltrados.map((pokemon) => (
                                <PokeTarjeta key={pokemon.id} pokemon={pokemon} />
                            ))
                        }
                    </div>
                )
            }
        </div>
    );
}

export default Home;