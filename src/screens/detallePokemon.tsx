import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function DetallePokemon() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(res => res.json())
            .then(data => {
                setPokemon(data);
                setCargando(false);
            });
    }, [id]);

    if (cargando) return <h1 style={{ textAlign: 'center' }}>Cargando datos del Pokémon...</h1>;
    if (!pokemon) return <h1>No se encontró el Pokémon</h1>;

    return (
        <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
            <button
                onClick={() => navigate(-1)}
                style={{ marginBottom: '20px', padding: '10px 20px', border: '1px solid', backgroundColor: '#a2f089', borderRadius: '6px', cursor: 'pointer' }}
            >
                Volver
            </button>

            <div style={{ display: 'flex', gap: '50px', alignItems: 'start' }}>
                <img
                    src={pokemon.sprites.other["official-artwork"].front_default}
                    alt={pokemon.name}
                    style={{ width: '400px', backgroundColor: '#f5f5f5', borderRadius: '20px' }}
                />

                <div style={{ flex: 1 }}>
                    <h1 style={{ fontSize: '3rem', margin: '0 0 20px 0', textTransform: 'capitalize' }}>
                        {pokemon.name}
                    </h1>

                    <div style={{ marginBottom: '20px' }}>
                        {pokemon.types.map(t => (
                            <span key={t.type.name} style={{
                                fontSize: '1.2rem',
                                marginRight: '10px',
                                background: '#333',
                                color: 'white',
                                padding: '5px 15px',
                                borderRadius: '20px'
                            }}>
                                {t.type.name}
                            </span>
                        ))}
                    </div>

                    <div style={{ fontSize: '1.5rem', marginBottom: '20px', display: 'flex', gap: '30px' }}>
                        <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
                        <p><strong>Altura:</strong> {pokemon.height / 10} m</p>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '1.8rem' }}>Habilidades:</h3>
                        <ul style={{ fontSize: '1.3rem' }}>
                            {pokemon.abilities.map(a => (
                                <li key={a.ability.name}>{a.ability.name}</li>
                            ))}
                        </ul>
                    </div>

                    <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '10px' }}>
                        <h3 style={{ fontSize: '1.8rem', marginTop: 0 }}>Estadísticas Base:</h3>
                        <ul style={{ fontSize: '1.4rem', listStyle: 'none', padding: 0 }}>
                            {pokemon.stats.map(stat => (
                                <li key={stat.stat.name} style={{ marginBottom: '10px', borderBottom: '1px solid #ddd' }}>
                                    <strong style={{ textTransform: 'capitalize' }}>{stat.stat.name}:</strong> {stat.base_stat}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetallePokemon;