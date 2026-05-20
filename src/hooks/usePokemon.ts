import { useState } from "react";
import { getPokemonDetalle, getPokemonList } from "../services/pokeService";

export const usePokemon = () => {

    const [pokemons, setPokemons] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");

    const fetchAllPokemons = async () => {
        try {
            setCargando(true);
            setError("");
            const data = await getPokemonList(50);
            const detalles = await Promise.all(
                data.results.map(async (pokemon) => {
                    return await getPokemonDetalle(pokemon.url);
                })
            );

            setPokemons(detalles);

        } catch (err) {
            setError("Error al cargar los pokémons");
        } finally {
            setCargando(false);
        }
    };

    return { pokemons, cargando, error, fetchAllPokemons };
};