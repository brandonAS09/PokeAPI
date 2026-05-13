import { useState } from "react";
import { getPokemonList, getPokemonDetalle } from "../services/pokeService";

export const usePokemon = () => {
    const [pokemons, setPokemons] = useState<any[]>([]);
    const [cargando, setcargando] = useState(false);

    const fetchAllPokemons = async () => {
        try {
            setcargando(true);
            const listData = await getPokemonList(30);
            
            const detailPromises = listData.results.map((p: any) => 
                getPokemonDetalle(p.url)
            );
            
            const fullDetails = await Promise.all(detailPromises);
            setPokemons(fullDetails);
        } catch (error) {
            console.error('Error fetching pokemons: ', error);
        } finally {
            setcargando(false);
        }
    };

    return { pokemons, cargando, fetchAllPokemons };
};