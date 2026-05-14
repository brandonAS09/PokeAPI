import { useEffect } from "react";
import { usePokemon } from "../hooks/usePokemon";
import PokeTarjeta from "../components/pokeTarjeta";

function Home() {
    const { pokemons, cargando, fetchAllPokemons } = usePokemon();

    useEffect(() => {
        fetchAllPokemons();
    }, []);

    if (cargando) return <h1>Cargando pokemons...</h1>;

    return (
        <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', 
            gap: '20px' 
        }}>
            {pokemons.map((pokemon) => (
                <PokeTarjeta key={pokemon.id} pokemon={pokemon} />
            ))}
        </div>
    );
}

export default Home;