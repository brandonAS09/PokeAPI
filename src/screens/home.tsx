import { useEffect, useState } from "react";
import { usePokemon } from "../hooks/usePokemon";
import PokeTarjeta from "../components/pokeTarjeta";
import Comparador from "../components/comparador.jsx";

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

    const inputStyle = {
        padding: '12px 16px',
        borderRadius: '12px',
        border: '2px solid #e2e8f0',
        backgroundColor: '#f8fafc',
        fontSize: '1rem',
        outline: 'none',
        color: '#334155'
    };

    if (cargando) {
        return <h1 style={{ textAlign: 'center', marginTop: '50px', color: '#64748b' }}>Cargando pokémons...</h1>;
    }

    if (error) {
        return <h1 style={{ textAlign: 'center', marginTop: '50px', color: '#ef4444' }}>{error}</h1>;
    }

    return (
        <div style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            padding: '30px 20px',
            fontFamily: 'system-ui, -apple-system, sans-serif' 
        }}>
            <h1 style={{ 
                textAlign: 'center', 
                color: '#e3350d', 
                fontSize: '2.5rem', 
                marginBottom: '30px' 
            }}>
                Pokédex
            </h1>

            <div style={{ 
                display: 'flex', 
                gap: '15px', 
                marginBottom: '30px', 
                justifyContent: 'center',
            }}>
                <input 
                    type="text" 
                    placeholder="Buscar Pokémon..." 
                    value={busqueda} 
                    onChange={(e) => setBusqueda(e.target.value)} 
                    style={{ ...inputStyle, width: '100%', maxWidth: '300px' }} 
                />
                <select 
                    value={tipoFiltro} 
                    onChange={(e) => setTipoFiltro(e.target.value)} 
                    style={{ ...inputStyle, cursor: 'pointer', minWidth: '150px' }} 
                >
                    <option value="">Todos los tipos</option>
                    <option value="fire">Fuego</option>
                    <option value="water">Agua</option>
                    <option value="grass">Planta</option>
                    <option value="electric">Eléctrico</option>
                    <option value="psychic">Psíquico</option>
                    <option value="rock">Roca</option>
                    <option value="ghost">Fantasma</option>
                </select>
            </div>

            <div style={{ marginBottom: '30px' }}>
                <Comparador />
            </div>

            {pokemonsFiltrados.length === 0 ? (
                <h2 style={{ textAlign: 'center', color: '#64748b', marginTop: '40px' }}>
                    No se encontraron pokémons con esa búsqueda.
                </h2>
            ) : (
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
                    gap: '25px' 
                }}>
                    {pokemonsFiltrados.map((pokemon) => (
                        <PokeTarjeta key={pokemon.id} pokemon={pokemon} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;