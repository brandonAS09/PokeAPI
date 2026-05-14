import { useNavigate } from "react-router-dom";

function PokeTarjeta({ pokemon }) {
    const navigate = useNavigate();

    if (!pokemon) {
        return null;
    }

    return (
        <div style={{ border: '1px solid #ccc', textAlign: 'center', padding: '10px', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
            <h3>{pokemon.name}</h3>
            <img src={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name} style={{ width: '100px', height: '100px', objectFit: 'contain' }}
            />

            <button style={{border: '1px solid', backgroundColor: '#a2f089', borderRadius: '6px'}} onClick={() => navigate(`/detalle/${pokemon.id}`)}>Detalles</button>
        </div>
    );
}

export default PokeTarjeta;