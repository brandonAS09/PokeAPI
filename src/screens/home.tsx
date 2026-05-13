import { useEffect } from "react";
import { usePokemon } from "../hooks/usePokemon";

function Home() {
    const { pokemons, cargando, fetchAllPokemons } = usePokemon();

    useEffect(() => {
        fetchAllPokemons();
    }, []);

    if (cargando) return <h1>Cargando pokemons...</h1>;

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '20px' }}>
            {pokemons.map((pokemon) => (
                <div key={pokemon.id} style={{ border: '1px solid #ccc', textAlign: 'center', padding: '10px' }}>
                    <h3>{pokemon.name}</h3>
                    <img
                        src={pokemon.sprites.other["official-artwork"].front_default}
                        alt={pokemon.name}
                        style={{ width: '100px' }}
                    />
                </div>
            ))}
        </div>
    );
}

export default Home;