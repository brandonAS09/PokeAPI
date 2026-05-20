import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PokeTarjeta({ pokemon }) {
    const navigate = useNavigate();
    const [favorito, setFavorito] = useState(false);

    useEffect(() => {
        const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
        setFavorito(favoritos.includes(pokemon.id));
    }, [pokemon.id]);

    const toggleFavorito = () => {
        let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
        if (favoritos.includes(pokemon.id)) {
            favoritos = favoritos.filter((id) => id !== pokemon.id);
            setFavorito(false);
        } 
        else 
        {
            favoritos.push(pokemon.id);
            setFavorito(true);
        }

        localStorage.setItem("favoritos", JSON.stringify(favoritos));
    };

    return (
        <div style={{ border: '1px solid #ccc', textAlign: 'center', padding: '15px', borderRadius: '10px', backgroundColor: '#f9f9f9'}}>
            <h3 style={{ textTransform: 'capitalize' }}>
                {pokemon.name}
            </h3>
            <img src={ pokemon.sprites.other["official-artwork"].front_default } alt={pokemon.name} style={{ width: '120px', height: '120px', objectFit: 'contain' }} />
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '10px' }} >
                <button style={{ border: '1px solid', backgroundColor: '#a2f089', borderRadius: '6px', padding: '8px 12px', cursor: 'pointer' }} onClick={() => navigate(`/detalle/${pokemon.id}`) } >
                    Detalles
                </button>

                <button onClick={toggleFavorito} style={{ border: 'none', background: 'transparent', fontSize: '24px', cursor: 'pointer' }} >
                    {favorito ? '<3' : '</3'}
                </button>
            </div>
        </div>
    );
}

export default PokeTarjeta;