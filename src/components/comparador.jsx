import { useState } from "react";
import { usePokemon } from "../hooks/usePokemon";
import { useEffect } from "react";

function Comparador() {
    const { pokemons, cargando, fetchAllPokemons } = usePokemon();
    const [poke1Name, setPoke1Name] = useState("");
    const [poke2Name, setPoke2Name] = useState("");

    useEffect(() => {fetchAllPokemons();}, []);

    if (cargando) {
        return <h2 style={{ textAlign: "center" }}>Cargando comparador...</h2>;
    }
    const pokemon1 = pokemons.find((p) => p.name === poke1Name);
    const pokemon2 = pokemons.find((p) => p.name === poke2Name);

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center' }}>Comparador de Pokémon</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', marginBottom: '30px' }}>
                <select
                    value={poke1Name}
                    onChange={(e) => setPoke1Name(e.target.value)}
                    style={{ padding: '10px', borderRadius: '8px', fontSize: '1.1rem', minWidth: '200px' }}
                >
                    <option value="">Selecciona el Pokémon 1</option>
                    {pokemons.map(p => <option key={p.id} value={p.name}>{p.name.toUpperCase()}</option>)}
                </select>

                <h3 style={{ margin: '10px 0' }}>VS</h3>

                <select
                    value={poke2Name}
                    onChange={(e) => setPoke2Name(e.target.value)}
                    style={{ padding: '10px', borderRadius: '8px', fontSize: '1.1rem', minWidth: '200px' }}
                >
                    <option value="">Selecciona el Pokémon 2</option>
                    {pokemons.map(p => <option key={p.id} value={p.name}>{p.name.toUpperCase()}</option>)}
                </select>
            </div>

            {pokemon1 && pokemon2 && (
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '20px',
                    justifyContent: 'center',
                    backgroundColor: '#f9f9f9',
                    padding: '20px',
                    borderRadius: '15px',
                    border: '1px solid #ddd'
                }}>

                    <div style={{ textAlign: 'center', flex: '1', minWidth: '200px' }}>
                        <h3 style={{ textTransform: 'capitalize', fontSize: '1.5rem', color: '#e74c3c' }}>{pokemon1.name}</h3>
                        <img src={pokemon1.sprites.other["official-artwork"].front_default} alt={pokemon1.name} style={{ width: '150px' }} />
                        <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px' }}>
                            {pokemon1.stats.map(stat => (
                                <li key={stat.stat.name} style={{ padding: '8px 0', borderBottom: '1px solid #ccc' }}>
                                    <strong style={{ textTransform: 'capitalize' }}>{stat.stat.name}:</strong> {stat.base_stat}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div style={{ textAlign: 'center', flex: '1', minWidth: '200px' }}>
                        <h3 style={{ textTransform: 'capitalize', fontSize: '1.5rem', color: '#3498db' }}>{pokemon2.name}</h3>
                        <img src={pokemon2.sprites.other["official-artwork"].front_default} alt={pokemon2.name} style={{ width: '150px' }} />
                        <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px' }}>
                            {pokemon2.stats.map(stat => (
                                <li key={stat.stat.name} style={{ padding: '8px 0', borderBottom: '1px solid #ccc' }}>
                                    <strong style={{ textTransform: 'capitalize' }}>{stat.stat.name}:</strong> {stat.base_stat}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Comparador;